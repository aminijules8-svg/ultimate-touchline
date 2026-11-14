"use client";

import React, { useState } from 'react';
import { Trophy, Award, Star, Zap, Flame, Shield, Target } from 'lucide-react';

export default function GamificationHub() {
  const [xp, setXp] = useState(2450);
  const [streak, setStreak] = useState(7);
  const [level, setLevel] = useState(12);

  const achievements = [
    { id: 1, title: '7-Day Warrior', desc: 'Completed daily training 7 days in a row', icon: '🔥', unlocked: true },
    { id: 2, title: 'Speed Demon', desc: 'Finished 10 high-intensity acceleration drills', icon: '⚡', unlocked: true },
    { id: 3, title: 'First Touch Maestro', desc: 'Logged over 1,000 wall passing touches', icon: '⚽', unlocked: true },
    { id: 4, title: 'Beast Mode', desc: 'Completed a workout at Level 10 difficulty', icon: '🦁', unlocked: false },
    { id: 5, title: 'Matchday Ready', desc: 'Complete 30 total training sessions', icon: '🏆', unlocked: false },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in text-slate-100">
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            Career Progression & Badges
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Player Trophy Room</h1>
          <p className="text-slate-400 text-sm mt-1">Level up your football career, unlock elite badges, and maintain your streak.</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Current Level</div>
            <div className="text-2xl font-black text-amber-400">Lvl {level}</div>
          </div>
          <div className="bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Day Streak</div>
            <div className="text-2xl font-black text-emerald-400">{streak} Days 🔥</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="text-amber-400" size={20} /> Unlocked & Locked Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(a => (
            <div
              key={a.id}
              className={`p-6 rounded-3xl border transition flex flex-col justify-between ${
                a.unlocked
                  ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{a.icon}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  a.unlocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {a.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-white mb-1">{a.title}</h3>
                <p className="text-slate-400 text-sm">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
