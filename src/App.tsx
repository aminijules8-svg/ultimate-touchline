"use client";

import React, { useState } from 'react';
import LiveDrillStudio from './components/LiveDrillStudio';
import PlannerHub from './components/PlannerHub';
import GamificationHub from './components/GamificationHub';
import NutritionHub from './components/NutritionHub';
import ScoutingHub from './components/ScoutingHub';
import { Zap, Calendar, Trophy, Apple, Shield, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'planner' | 'gamification' | 'nutrition' | 'scouting'>('studio');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">
              ⚽
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">ULTIMATE TOUCHLINE</span>
              <span className="text-xs text-emerald-400 block font-semibold">AI PRO FOOTBALL ACADEMY</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'studio' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Zap size={14} /> Drill Studio
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'planner' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Calendar size={14} /> Weekly Planner
            </button>
            <button
              onClick={() => setActiveTab('gamification')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'gamification' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Trophy size={14} /> Trophy Room
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'nutrition' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Apple size={14} /> Nutrition
            </button>
            <button
              onClick={() => setActiveTab('scouting')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'scouting' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Shield size={14} /> Pro Card
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        {activeTab === 'studio' && <LiveDrillStudio />}
        {activeTab === 'planner' && <PlannerHub />}
        {activeTab === 'gamification' && <GamificationHub />}
        {activeTab === 'nutrition' && <NutritionHub />}
        {activeTab === 'scouting' && <ScoutingHub />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Ultimate Touchline • AI Pro Football Academy & Drill Engine • Built for Elite Players
      </footer>
    </div>
  );
}
