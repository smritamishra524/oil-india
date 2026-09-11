import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, ArrowRight, Loader2, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeReportNarrative } from '../services/reportAnalyzer';

export const VoiceReporting: React.FC = () => {
  const { addReport, selectReport, setActiveTab } = useApp();

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript + ' ';
        }
        setTranscript(current.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, [selectedLanguage]);

  const toggleRecording = () => {
    if (!speechSupported) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleApplySampleHinglish = () => {
    // Exact example from Master Prompt Section 35!
    setTranscript("Maintenance ke time valve properly isolate nahi tha aur line mein residual pressure tha.");
  };

  const handleAnalyzeVoice = () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Analyze the spoken narrative (whether Hindi, Hinglish, or English)
      const analyzed = analyzeReportNarrative(transcript, {
        installation: 'Duliajan Central Field',
        asset: 'Workover Rig WOR-07',
        reportType: 'Near Miss'
      });

      analyzed.extractedFrom = `Voice Ingestion (${selectedLanguage === 'hi-IN' ? 'Hindi/Hinglish' : 'English'})`;
      analyzed.sourceType = 'voice';

      addReport(analyzed);
      selectReport(analyzed.id);
      setIsProcessing(false);
      setActiveTab('report-analyzer');
    }, 600);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">
                Frontline Voice AI
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Multilingual Ingestion</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">Voice Hazard Reporting (English / Hindi / Hinglish)</h1>
            <p className="text-xs text-slate-500">
              Speak observations directly in English, Hindi, or Hinglish. Automatically structured and analyzed for SIF precursors.
            </p>
          </div>
        </div>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as any)}
          className="text-xs p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium outline-none"
        >
          <option value="en-IN">English (India)</option>
          <option value="hi-IN">हिन्दी (Hindi / Hinglish)</option>
        </select>
      </div>

      {/* Voice Recording Interface Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center space-y-6">
        
        {/* Quick Hinglish Preset Button (Master Prompt Section 35 example) */}
        <div className="flex justify-center">
          <button
            onClick={handleApplySampleHinglish}
            className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-xs font-semibold text-purple-800 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Load Hinglish Sample: "Maintenance ke time valve isolate nahi tha..."</span>
          </button>
        </div>

        {/* Big Mic Button */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <button
            onClick={toggleRecording}
            disabled={!speechSupported}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${
              isRecording
                ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse'
                : 'bg-oil-600 text-white hover:bg-oil-700'
            } ${!speechSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>

          <span className="text-xs font-bold text-slate-700">
            {isRecording
              ? 'Listening in field microphone... Speak now'
              : speechSupported
              ? 'Tap microphone to start speaking'
              : 'Speech recognition not available in this browser. Please type or paste below.'}
          </span>
        </div>

        {/* Live Transcript / Editable Textarea */}
        <div className="max-w-xl mx-auto text-left space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Speech Transcript (Editable):
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your spoken words will appear here in real-time, or you can type directly..."
            rows={4}
            className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-oil-500"
          />
        </div>

        {/* Analyze button */}
        <div className="flex justify-center">
          <button
            disabled={!transcript.trim() || isProcessing}
            onClick={handleAnalyzeVoice}
            className="px-8 py-3 bg-oil-600 hover:bg-oil-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Spoken Narrative...
              </>
            ) : (
              <>
                <span>Process & Analyze with OIL HSE Intelligence</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
