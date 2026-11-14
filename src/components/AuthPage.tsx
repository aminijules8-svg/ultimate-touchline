"use client";

import React, { useState } from 'react';

export default function AuthPage({ onLogin }: { onLogin: (user: any) => void }) {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState('17');
  const [position, setPosition] = useState('Winger');
  const [level, setLevel] = useState('Academy');
  const [dominantFoot, setDominantFoot] = useState('Right');
  const [goal, setGoal] = useState('speed');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name: name || 'Aspirant Pro', age, position, level, dominantFoot, goal };
    localStorage.setItem('touchline_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-100">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center font-black text-3xl shadow-lg shadow-emerald-500/20">
            ⚽
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">ULTIMATE TOUCHLINE</h1>
          <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">AI Pro Football Academy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Rashford"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Dominant Foot</label>
                  <select
                    value={dominantFoot}
                    onChange={e => setDominantFoot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Position</label>
                  <select
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Striker">Striker</option>
                    <option value="Winger">Winger</option>
                    <option value="Attacking Mid">Attacking Mid</option>
                    <option value="Central Mid">Central Mid</option>
                    <option value="Centre Back">Centre Back</option>
                    <option value="Full Back">Full Back</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Level</label>
                  <select
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Academy">Academy</option>
                    <option value="Semi-Pro">Semi-Pro</option>
                    <option value="Amateur">Amateur</option>
                    <option value="Pro">Pro</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email / Username</label>
            <input
              type="text"
              required
              placeholder="player@touchline.app"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/20"
          >
            {isSignup ? 'Create Pro Account & Start' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-xs text-slate-400 hover:text-emerald-400 transition"
          >
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
