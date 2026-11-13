// src/lib/store.ts — minimal reactive store (no extra dep).
type Listener = () => void;
class Store<T> {
  private state: T;
  private listeners = new Set<Listener>();
  constructor(initial: T) { this.state = initial; }
  get() { return this.state; }
  set(next: T | ((s: T) => T)) {
    this.state = typeof next === 'function' ? (next as (s: T) => T)(this.state) : next;
    this.listeners.forEach((l) => l());
  }
  subscribe(l: Listener) { this.listeners.add(l); return () => this.listeners.delete(l); }
}

export const store = {
  ready: new Store<boolean>(false),
  onboarded: new Store<boolean>(false),
  profile: new Store<any>(null),
  todaySession: new Store<any>(null),
  todayWorkout: new Store<any>(null),
  todayMeals: new Store<any[]>([]),
  theme: new Store<string>('pitch'),
  liteMode: new Store<boolean>(false),
  coachOpen: new Store<boolean>(false),
  activePillar: new Store<string>('football'),
  cameraRunning: new Store<boolean>(false),
};