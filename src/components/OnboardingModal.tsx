"use client";

import React, { useState } from 'react';
import { db, UserProfile } from '../lib/db';

export default function OnboardingModal({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState(17);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(68);
  const [position, setPosition] = useState('Winger');
  const [level, setLevel] = useState('Academy');
  const [dominantFoot, setDominantFoot] = useState('Right');
  const [country, setCountry] = useState('Kenya');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['speed', 'dribbling']);

  const goalsList = [
    { id: 'speed', label: '⚡ Speed & Acceleration' },
    { id: 'stamina', label: '🔋 Match Stamina' },
    { id: 'dribbling', label: '⚽ Dribbling & Close Control' },
    { id: 'finishing', label: '🎯 Clinical Finishing' },
    { id: 'passing', label: '📐 Crisp Passing & Vision' },
    { id: 'weak-foot', label: '👟 Weak Foot Mastery' },
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    const profile: UserProfile = {
      name: name || 'Aspirant Pro',
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      dominantFoot,
      position,
      level,
      country,
      goals: selectedGoals,
      xp: 0,
      levelNum: 1,
      streak: 1,
      createdAt: new Date(),
    };

    await db.profile.clear();
    await db.profile.add(profile);
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center font-black text-3xl shadow-lg shadow-emerald-500/20">
            ⚽
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">WELCOME TO TOUCHLINE</h1>
          <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Step {step} of 3 • Pro Profile Setup</p>
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name or Player Alias</label>
              <input
                type="text"
                placeholder="e.g. Marcus Rashford"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/20 mt-4"
            >
              Next: Playing Details
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Playing Position</label>
                <select
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Striker">Striker</option>
                  <option value="Winger">Winger</option>
                  <option value="Attacking Mid">Attacking Mid</option>
                  <option value="Central Mid">Central Mid</option>
                  <option value="Centre Back">Centre Back</option>
                  <option value="Full Back">Full Back</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Current Level</label>
                <select
                  value={level}
                  onChange={e => setLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Amateur">Amateur / School</option>
                  <option value="Academy">Academy U15-U19</option>
                  <option value="Semi-Pro">Semi-Pro</option>
                  <option value="Pro">Professional</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Dominant Foot</label>
                <select
                  value={dominantFoot}
                  onChange={e => setDominantFoot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Right">Right Foot</option>
                  <option value="Left">Left Foot</option>
                  <option value="Both">Both (Two-Footed)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Country / Region</label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/20"
              >
                Next: Training Goals
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <label className="text-xs text-slate-400 block">Select Your Top Football Goals (Pick multiple)</label>
            <div className="grid grid-cols-2 gap-2.5">
              {goalsList.map(g => {
                const selected = selectedGoals.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`p-3 rounded-2xl cursor-pointer border text-sm font-semibold transition flex items-center justify-between ${
                      selected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{g.label}</span>
                    {selected && <span className="text-emerald-400 text-xs font-bold">✓</span>}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/20"
              >
                Launch Academy (Level 1) 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
