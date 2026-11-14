"use client";

import React, { useState, useEffect } from 'react';
import LiveDrillStudio from './components/LiveDrillStudio';
import LiveCameraStudio from './components/LiveCameraStudio';
import PlannerHub from './components/PlannerHub';
import GamificationHub from './components/GamificationHub';
import NutritionHub from './components/NutritionHub';
import ScoutingHub from './components/ScoutingHub';
import OnboardingModal from './components/OnboardingModal';
import { db, UserProfile } from './lib/db';
import { Zap, Calendar, Trophy, Apple, Shield, Camera, LogOut, Activity } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'studio' | 'camera' | 'planner' | 'gamification' | 'nutrition' | 'scouting'>('studio');

  useEffect(() => {
    async function checkUser() {
      const profiles = await db.profile.toArray();
      if (profiles.length > 0) {
        setUser(profiles[0]);
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const handleResetProfile = async () => {
    await db.profile.clear();
    setUser(null);
  };

  const handleCameraSessionComplete = async (reps: number, score: number) => {
    if (!user) return;
    const earnedXp = reps * 10 + Math.round(score / 2);
    const newXp = user.xp + earnedXp;
    const newLevel = Math.floor(newXp / 1000) + 1;

    const updated = { ...user, xp: newXp, levelNum: newLevel };
    await db.profile.put(updated);
    setUser(updated);

    await db.trainingLogs.add({
      drillTitle: 'Live Camera Push-Up & Rep Session',
      category: 'Football Strength',
      durationSeconds: 120,
      repsCompleted: reps,
      formScore: score,
      date: new Date(),
    });

    setActiveTab('studio');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 font-bold">
        Loading Touchline Academy...
      </div>
    );
  }

  if (!user) {
    return <OnboardingModal onComplete={setUser} />;
  }

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
              <span className="font-extrabold text-lg text-white tracking-tight">TOUCHLINE</span>
              <span className="text-xs text-emerald-400 block font-semibold">AI PRO FOOTBALL ACADEMY</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'studio' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Zap size={14} /> Drills
            </button>
            <button
              onClick={() => setActiveTab('camera')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'camera' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Camera size={14} /> Train Live 🔴
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'planner' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Calendar size={14} /> Planner
            </button>
            <button
              onClick={() => setActiveTab('gamification')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'gamification' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Trophy size={14} /> Lvl {user.levelNum} ({user.xp} XP)
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'nutrition' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Apple size={14} /> Nutrition
            </button>
            <button
              onClick={() => setActiveTab('scouting')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'scouting' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Shield size={14} /> Pro Card
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-white block">{user.name}</span>
              <span className="text-[10px] text-emerald-400">{user.position} • {user.level}</span>
            </div>
            <button
              onClick={handleResetProfile}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              title="Reset Profile"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        {activeTab === 'studio' && <LiveDrillStudio />}
        {activeTab === 'camera' && <LiveCameraStudio onSessionComplete={handleCameraSessionComplete} />}
        {activeTab === 'planner' && <PlannerHub />}
        {activeTab === 'gamification' && <GamificationHub />}
        {activeTab === 'nutrition' && <NutritionHub />}
        {activeTab === 'scouting' && <ScoutingHub />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Touchline • AI Pro Football Academy & Live Camera Pose Tracker • Built for Elite Players
      </footer>
    </div>
  );
}
