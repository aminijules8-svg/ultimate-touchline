import React, { useState } from 'react';
import { Dumbbell, Plus, Trash2, Calendar, CheckCircle2, TrendingUp, Shield, Zap } from 'lucide-react';

export default function PlannerHub() {
  const [workouts, setWorkouts] = useState([
    { id: 1, day: 'Monday', title: 'Explosive Speed & 1v1 Agility', duration: '35 min', completed: true },
    { id: 2, day: 'Wednesday', title: 'First Touch Mastery & Wall Passing', duration: '40 min', completed: false },
    { id: 3, day: 'Friday', title: 'Clinical Finishing & Power Shooting', duration: '30 min', completed: false },
    { id: 4, day: 'Sunday', title: 'Recovery Mobility & Ball Mastery', duration: '25 min', completed: false },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDay, setNewDay] = useState('Tuesday');

  const addWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setWorkouts([...workouts, { id: Date.now(), day: newDay, title: newTitle, duration: '30 min', completed: false }]);
    setNewTitle('');
  };

  const toggleComplete = (id: number) => {
    setWorkouts(workouts.map(w => w.id === id ? { ...w, completed: !w.completed } : w));
  };

  const deleteWorkout = (id: number) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in text-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-indigo-500/30">
        <div>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            Pro Training Schedule
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Weekly Pro Planner</h1>
          <p className="text-slate-400 text-sm mt-1">Organize your weekly micro-cycle to peak on matchday.</p>
        </div>

        <div className="bg-slate-900/80 px-6 py-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div>
            <div className="text-xs text-slate-400">Completion Rate</div>
            <div className="text-2xl font-black text-emerald-400">
              {Math.round((workouts.filter(w => w.completed).length / workouts.length) * 100)}%
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="text-indigo-400" size={20} /> Scheduled Sessions
          </h2>

          <div className="space-y-3">
            {workouts.map(w => (
              <div
                key={w.id}
                className={`p-5 rounded-2xl border transition flex items-center justify-between ${
                  w.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                    : 'bg-slate-900/80 border-slate-800 text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleComplete(w.id)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center border transition ${
                      w.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700 bg-slate-800'
                    }`}
                  >
                    {w.completed && <CheckCircle2 size={16} />}
                  </button>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">{w.day}</div>
                    <div className={`font-bold text-base ${w.completed ? 'line-through text-slate-400' : 'text-white'}`}>{w.title}</div>
                    <div className="text-xs text-slate-500">{w.duration} session</div>
                  </div>
                </div>

                <button
                  onClick={() => deleteWorkout(w.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={18} className="text-emerald-400" /> Add Custom Session
            </h3>

            <form onSubmit={addWorkout} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Day of Week</label>
                <select
                  value={newDay}
                  onChange={e => setNewDay(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Workout Title</label>
                <input
                  type="text"
                  placeholder="e.g. Cone Dribbling & Plyometrics"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/20"
              >
                Add to Schedule
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
