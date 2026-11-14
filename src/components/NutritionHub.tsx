"use client";

import React, { useState } from 'react';
import { Apple, Flame, Dumbbell, Shield, Zap, TrendingUp, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function NutritionHub() {
  const [weight, setWeight] = useState(72);
  const [goal, setGoal] = useState('muscle');
  const [plan, setPlan] = useState<any>(null);

  const generateNutrition = () => {
    const cals = goal === 'muscle' ? 2800 : goal === 'lean' ? 2200 : 2500;
    const protein = Math.round(weight * 2.2);
    const carbs = Math.round((cals * 0.45) / 4);
    const fats = Math.round((cals * 0.25) / 9);

    setPlan({
      calories: cals,
      protein,
      carbs,
      fats,
      meals: [
        { title: 'Pre-Training Fuel', time: '2 Hours Before', food: 'Oats with banana, honey, and 1 scoop whey protein or egg whites.' },
        { title: 'Post-Training Recovery', time: 'Within 45 Mins', food: 'Grilled chicken breast, jasmine rice, roasted sweet potatoes, and avocado.' },
        { title: 'Hydration & Electrolytes', time: 'All Day', food: '3.5L water with sodium, potassium, and magnesium electrolytes.' },
        { title: 'Evening Repair', time: 'Before Sleep', food: 'Greek yogurt with berries and a handful of almonds or casein protein.' },
      ]
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in text-slate-100">
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            Pro Fuel & Recovery
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Football Nutrition Calculator</h1>
          <p className="text-slate-400 text-sm mt-1">Macronutrient prescriptions tailored for high-intensity matchday performance.</p>
        </div>

        <div className="flex flex-wrap gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              className="w-24 bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Goal</label>
            <select
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="muscle">Build Lean Muscle</option>
              <option value="lean">Cut & Match Shredded</option>
              <option value="maintain">Maintain Peak Weight</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateNutrition}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2"
            >
              <RefreshCw size={16} /> Calculate Macro Plan
            </button>
          </div>
        </div>
      </div>

      {plan && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl text-center">
              <div className="text-xs text-slate-400 mb-1">Daily Calories</div>
              <div className="text-3xl font-black text-emerald-400">{plan.calories} <span className="text-xs text-slate-400">kcal</span></div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl text-center">
              <div className="text-xs text-slate-400 mb-1">Protein Target</div>
              <div className="text-3xl font-black text-white">{plan.protein} <span className="text-xs text-slate-400">g</span></div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl text-center">
              <div className="text-xs text-slate-400 mb-1">Carbs (Fuel)</div>
              <div className="text-3xl font-black text-white">{plan.carbs} <span className="text-xs text-slate-400">g</span></div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl text-center">
              <div className="text-xs text-slate-400 mb-1">Healthy Fats</div>
              <div className="text-3xl font-black text-white">{plan.fats} <span className="text-xs text-slate-400">g</span></div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Apple className="text-emerald-400" size={20} /> Matchday Nutrition Schedule
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.meals.map((m: any, idx: number) => (
                <div key={idx} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white text-base">{m.title}</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">{m.time}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{m.food}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
