import React, { useState } from 'react';
import { Shield, Sparkles, TrendingUp, Zap, Award, CheckCircle2 } from 'lucide-react';

export default function ScoutingHub() {
  const [attributes, setAttributes] = useState({
    pace: 88,
    shooting: 82,
    passing: 85,
    dribbling: 90,
    defending: 65,
    physical: 78,
  });

  const [position, setPosition] = useState('Winger');
  const overall = Math.round(Object.values(attributes).reduce((a, b) => a + b, 0) / 6);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in text-slate-100">
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-blue-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/30">
            Pro Scouting & Card Generator
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Virtual Pro Card & DNA</h1>
          <p className="text-slate-400 text-sm mt-1">Generate your ultimate pro rating card and share your football attributes.</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 p-6 rounded-3xl border border-amber-500/40 text-center shadow-xl">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Overall Rating</div>
          <div className="text-5xl font-black text-white">{overall}</div>
          <div className="text-xs text-amber-300 font-semibold mt-1">{position} • Elite Pro</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attribute sliders */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-blue-400" size={20} /> Adjust Attributes
          </h3>

          <div className="space-y-4">
            {Object.entries(attributes).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="capitalize text-slate-300">{key}</span>
                  <span className="text-blue-400">{val}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={val}
                  onChange={e => setAttributes({ ...attributes, [key]: Number(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pro Card Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 flex items-center justify-center">
          <div className="w-72 h-[420px] rounded-3xl bg-gradient-to-b from-amber-500 via-amber-700 to-slate-950 p-6 text-slate-950 shadow-2xl relative border-4 border-amber-300 flex flex-col justify-between">
            <div className="flex justify-between items-start font-black text-white">
              <div className="text-4xl">{overall}</div>
              <div className="text-xl uppercase tracking-widest">{position}</div>
            </div>

            <div className="text-center my-auto">
              <div className="w-20 h-20 rounded-full bg-slate-900 text-amber-400 mx-auto flex items-center justify-center text-3xl font-black border-2 border-amber-300 shadow-inner mb-3">
                ⚽
              </div>
              <div className="text-2xl font-black text-white tracking-wide">YOUR PRO</div>
              <div className="text-xs text-amber-200 uppercase tracking-widest font-bold">Ultimate Touchline</div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-white font-bold text-sm bg-slate-950/60 p-4 rounded-2xl backdrop-blur">
              <div>PAC {attributes.pace}</div>
              <div>DRI {attributes.dribbling}</div>
              <div>SHO {attributes.shooting}</div>
              <div>DEF {attributes.defending}</div>
              <div>PAS {attributes.passing}</div>
              <div>PHY {attributes.physical}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
