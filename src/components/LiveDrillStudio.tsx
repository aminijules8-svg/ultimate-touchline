import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Shield, Zap, Flame, Trophy, Award, ArrowRight, CheckCircle2, ChevronRight, Activity, Heart, Clock, Footprints } from 'lucide-react';
import { generateDrill, generateSessionWorkout, Drill } from '../engine/drillGenerator';

export default function LiveDrillStudio() {
  const [goal, setGoal] = useState('speed');
  const [level, setLevel] = useState('Elite Pro');
  const [duration, setDuration] = useState(20);
  const [workout, setWorkout] = useState(() => generateSessionWorkout('speed', 'Elite Pro', 20));

  const [activeDrillIndex, setActiveDrillIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40);
  const [isResting, setIsResting] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [completedDrills, setCompletedDrills] = useState<number[]>([]);

  const currentDrill = workout.drills[activeDrillIndex] || workout.drills[0];

  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      if (!isResting) {
        setIsResting(true);
        setTimeLeft(15);
      } else {
        if (currentSet < currentDrill.sets) {
          setCurrentSet(s => s + 1);
          setIsResting(false);
          setTimeLeft(40);
        } else {
          // Drill complete
          setCompletedDrills(prev => [...new Set([...prev, activeDrillIndex])]);
          setIsRunning(false);
          setIsResting(false);
        }
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isResting, currentSet, activeDrillIndex, currentDrill]);

  const handleGenerate = () => {
    const newW = generateSessionWorkout(goal, level, duration);
    setWorkout(newW);
    setActiveDrillIndex(0);
    setCurrentSet(1);
    setTimeLeft(40);
    setIsRunning(false);
    setIsResting(false);
    setCompletedDrills([]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in text-slate-100">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/90 via-slate-900 to-indigo-950 p-8 border border-emerald-500/30 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Zap size={300} className="text-emerald-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                AI Drill Master & Live Circuit
              </span>
              <span className="text-slate-400 text-xs">• Infinite Procedural Engine</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              {workout.title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl">
              {workout.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 backdrop-blur">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Skill / Goal</label>
              <select
                value={goal}
                onChange={e => setGoal(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="speed">Speed & Acceleration</option>
                <option value="dribbling">Dribbling & Close Control</option>
                <option value="finishing">Clinical Finishing</option>
                <option value="passing">Crisp Passing & Vision</option>
                <option value="agility">Agility & Footwork</option>
                <option value="stamina">Match Stamina & HIIT</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Intensity Level</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="Academy U15">Academy U15</option>
                <option value="Elite Pro">Elite Pro</option>
                <option value="Pro Matchday">Pro Matchday</option>
                <option value="Beast Mode">Beast Mode</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <RotateCcw size={16} /> Generate Workout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2 Cols: Active Drill Live Player */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">

            {/* Drill Status Bar */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black border border-emerald-500/30">
                  {activeDrillIndex + 1}
                </span>
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    {currentDrill.skillFocus} • {currentDrill.energySystem}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{currentDrill.title}</h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
                >
                  {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <span className="px-3 py-1 bg-slate-800 rounded-xl text-xs font-medium text-slate-300">
                  Difficulty: {currentDrill.difficulty}/10
                </span>
              </div>
            </div>

            {/* Timer & Live Execution HUD */}
            <div className="bg-slate-950/80 rounded-2xl p-8 border border-slate-800/80 text-center relative mb-8 shadow-inner">
              <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-slate-400">
                <Activity size={14} className="text-emerald-400 animate-pulse" />
                <span>Set {currentSet} of {currentDrill.sets}</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-slate-400">
                <Flame size={14} className="text-amber-400" />
                <span>Est. {currentDrill.estimatedCalories} kcal</span>
              </div>

              <div className="my-6">
                <div className={`text-6xl md:text-8xl font-black tracking-tight mb-2 ${isResting ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                  {isResting ? '☕ Rest & Recover' : '⚡ Execute with Maximum Intensity'}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => {
                    setIsRunning(!isRunning);
                  }}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition shadow-xl ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  }`}
                >
                  {isRunning ? <Pause size={22} /> : <Play size={22} />}
                  {isRunning ? 'Pause Drill' : 'Start Drill'}
                </button>

                <button
                  onClick={() => {
                    setTimeLeft(40);
                    setIsRunning(false);
                    setIsResting(false);
                  }}
                  className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-300 hover:text-white transition"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>

            {/* Drill Instructions & Coaching Cues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Footprints size={16} /> Setup & Execution
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {currentDrill.instructions.map((ins, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Trophy size={16} /> Pro Coaching Cues
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {currentDrill.coachingCues.map((cue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">★</span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Right Col: Playlist / Circuit Navigator */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Circuit Playlist</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                {workout.drills.length} Drills
              </span>
            </h3>

            <div className="space-y-3">
              {workout.drills.map((d, i) => {
                const isActive = i === activeDrillIndex;
                const isCompleted = completedDrills.includes(i);
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      setActiveDrillIndex(i);
                      setCurrentSet(1);
                      setTimeLeft(40);
                      setIsRunning(false);
                      setIsResting(false);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition border flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isCompleted ? 'bg-emerald-500 text-slate-950' : isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={16} /> : i + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white line-clamp-1">{d.title}</div>
                        <div className="text-xs text-slate-400">{d.durationMinutes} min • {d.sets} sets</div>
                      </div>
                    </div>
                    <ChevronRight size={16} className={isActive ? 'text-emerald-400' : 'text-slate-600'} />
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <button
                onClick={() => {
                  if (activeDrillIndex < workout.drills.length - 1) {
                    setActiveDrillIndex(activeDrillIndex + 1);
                    setCurrentSet(1);
                    setTimeLeft(40);
                    setIsRunning(false);
                    setIsResting(false);
                  }
                }}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                Next Drill in Circuit <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
