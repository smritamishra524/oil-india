import React, { useState } from 'react';
import { Shield, Sparkles, Lock, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, preloadFlagshipJudgeDemo } = useApp();

  const [name, setName] = useState('R. K. Barua');
  const [role, setRole] = useState('Chief HSE Manager');
  const [organization, setOrganization] = useState('Oil India Limited (Duliajan HQ)');
  const [password, setPassword] = useState('••••••••••••');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, role, organization);
    onClose();
  };

  const handleDemoMode = () => {
    login('SIH Evaluator', 'Lead Safety Assessor', 'Oil India Limited • Demo Environment');
    preloadFlagshipJudgeDemo();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-charcoal-900 text-white p-6 text-center space-y-2 border-b border-charcoal-800">
          <div className="w-12 h-12 rounded-xl bg-oil-600 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-lg border border-oil-700">
            OIL
          </div>
          <h2 className="text-lg font-black tracking-tight">OIL HSE INTELLIGENCE</h2>
          <p className="text-xs text-slate-400">Serious Injury &amp; Fatality (SIF) Precursor Early Warning</p>
          
          <div className="pt-2">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
              DEMO ENVIRONMENT • SYNTHETIC SAFETY DATA
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Quick Demo Mode Button */}
          <button
            type="button"
            onClick={handleDemoMode}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-charcoal-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 border border-amber-600"
          >
            <Sparkles className="w-4 h-4" />
            <span>ENTER INSTANT DEMO MODE (JUDGE FLOW)</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-[10px] font-bold uppercase text-slate-400">Or Sign In with Credentials</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <form onSubmit={handleSignIn} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-oil-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Organization / Role</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-oil-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-oil-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-oil-600 hover:bg-oil-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Sign In to Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
