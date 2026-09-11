import Papa from 'papaparse';
import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export interface ExtractionResult {
  text: string;
  sourceType: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  pageCount?: number;
  rowCount?: number;
  wordCount: number;
  warning?: string;
  error?: string;
}

export async function extractTextFromFile(file: File): Promise<ExtractionResult> {
  const fileName = file.name;
  const fileSize = file.size;
  const fileType = file.type || fileName.split('.').pop()?.toUpperCase() || 'UNKNOWN';
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  try {
    if (ext === 'txt') {
      const text = await file.text();
      if (!text || text.trim().length === 0) {
        throw new Error('The TXT file is empty.');
      }
      return {
        text: text.trim(),
        sourceType: 'TXT',
        fileName,
        fileSize,
        fileType: 'text/plain',
        wordCount: text.trim().split(/\s+/).length,
      };
    }

    if (ext === 'csv') {
      const text = await file.text();
      return new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (!results.data || results.data.length === 0) {
              reject(new Error('The CSV file contains no readable records.'));
              return;
            }
            
            // Auto-detect narrative / description columns
            const rows = results.data as Record<string, string>[];
            const candidateKeys = ['narrative', 'description', 'details', 'incident_description', 'observation', 'report', 'remarks', 'event'];
            
            const firstRowKeys = Object.keys(rows[0] || {});
            const narrativeKey = firstRowKeys.find(k => candidateKeys.some(c => k.toLowerCase().includes(c))) || firstRowKeys[0];
            
            const extractedNarratives = rows
              .map((row, idx) => {
                const parts: string[] = [];
                Object.entries(row).forEach(([k, v]) => {
                  if (v && typeof v === 'string' && v.trim()) {
                    parts.push(`${k}: ${v.trim()}`);
                  }
                });
                return `[Record #${idx + 1}]\n${parts.join('\n')}`;
              })
              .join('\n\n---\n\n');

            resolve({
              text: extractedNarratives.trim(),
              sourceType: 'CSV',
              fileName,
              fileSize,
              fileType: 'text/csv',
              rowCount: rows.length,
              wordCount: extractedNarratives.split(/\s+/).length,
            });
          },
          error: (err) => {
            reject(new Error(`CSV parsing error: ${err.message}`));
          }
        });
      });
    }

    if (ext === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value.trim();

      if (!text || text.length === 0) {
        throw new Error('Unable to extract meaningful text from this DOCX document.');
      }

      return {
        text,
        sourceType: 'DOCX',
        fileName,
        fileSize,
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        wordCount: text.split(/\s+/).length,
        warning: result.messages.length > 0 ? result.messages.map(m => m.message).join(', ') : undefined
      };
    }

    if (ext === 'pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const fullTextParts: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ')
          .replace(/\s+/g, ' ');
        if (pageText.trim()) {
          fullTextParts.push(`[Page ${i}]\n${pageText.trim()}`);
        }
      }

      const extractedText = fullTextParts.join('\n\n').trim();

      // Check for scanned / image-based PDF
      if (!extractedText || extractedText.length < 15) {
        return {
          text: '',
          sourceType: 'PDF',
          fileName,
          fileSize,
          fileType: 'application/pdf',
          pageCount: numPages,
          wordCount: 0,
          warning: 'This PDF appears to contain scanned/image-based content without selectable text. Please paste the report text or provide an OCR-capable version.'
        };
      }

      return {
        text: extractedText,
        sourceType: 'PDF',
        fileName,
        fileSize,
        fileType: 'application/pdf',
        pageCount: numPages,
        wordCount: extractedText.split(/\s+/).length,
      };
    }

    throw new Error(`Unsupported file format (.${ext}). Please upload a PDF, DOCX, TXT, or CSV file.`);
  } catch (err: any) {
    return {
      text: '',
      sourceType: ext.toUpperCase() || 'UNKNOWN',
      fileName,
      fileSize,
      fileType,
      wordCount: 0,
      error: err.message || 'An unexpected error occurred while parsing the file.'
    };
  }
}
