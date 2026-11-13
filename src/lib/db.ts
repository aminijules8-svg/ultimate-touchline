// src/lib/db.ts — local-first Dexie/IndexedDB schema.
// Sync hook is stubbed so Supabase can be added without rewrites.
import Dexie, { type EntityTable } from 'dexie';

export interface Profile {
  id: string;
  name: string;
  age: number;
  heightCm: number;
  weightKg: number;
  dominantFoot: 'left' | 'right';
  country: string;
  positions: string[];
  level: 'beginner' | 'school' | 'academy' | 'semi-pro';
  goals: string[];
  bodyGoals: string[];
  weeklyDays: string[];
  weeklyMinutes: number;
  trainsAlone: boolean;
  space: 'small-room' | 'yard' | 'pitch';
  equipment: string[];
  foodsEat: string[];
  foodsDislike: string[];
  allergies: string[];
  mealsPerDay: number;
  budget: 'low' | 'medium' | 'high';
  cooking: 'quick' | 'moderate' | 'comfort';
  injuries: Injury[];
  baselineTests: BaselineTests;
  ageConfirmedUnder18: boolean | null;
  createdAt: number;
  updatedAt: number;
}

export interface Injury {
  id: string;
  area: string;
  side?: 'left' | 'right';
  severity: 'mild' | 'moderate' | 'severe';
  since: string;
  notes: string;
  clearedByDoctor: boolean;
}

export interface BaselineTests {
  pushups?: number;
  squats30s?: number;
  plankSec?: number;
  sprint10m?: number;
  sprint20m?: number;
  juggle?: number;
}

export interface Session {
  id: string;
  type: 'technical' | 'speed-agility' | 'power' | 'endurance' | 'finishing' | 'match-fitness' | 'recovery';
  date: number;
  durationMin: number;
  drills: DrillLog[];
  rpe?: number;
  completed: boolean;
  notes?: string;
  camera?: CameraResult[];
}

export interface DrillLog {
  drillId: string;
  name: string;
  sets: number;
  completed: boolean;
  score?: number;
  camera?: CameraResult;
}

export interface CameraResult {
  drillId: string;
  reps: number;
  formScore: number; // 0-100
  confidence: number; // 0-1
  metrics: Record<string, number>;
  cues: string[];
  timestamp: number;
}

export interface Attribute {
  key: string;
  name: string;
  value: number; // 0-100
  history: { date: number; value: number }[];
}

export interface MealLog {
  id: string;
  date: number;
  meal: string;
  foodIds: string[];
  eaten: boolean;
  swappedTo?: string[];
  photoDataUrl?: string;
}

export interface WaterLog {
  date: number;
  ml: number;
}

export interface ReadinessLog {
  date: number;
  sleepHours: number;
  soreness: number; // 1-5
  mood: number; // 1-5
  note?: string;
}

export interface WorkoutLog {
  id: string;
  date: number;
  durationMin: number;
  exercises: { exerciseId: string; sets: number; reps: number; rpe?: number }[];
  completed: boolean;
}

export interface MatchLog {
  id: string;
  date: number;
  minutes: number;
  position: string;
  rating: number;
  goals?: number;
  assists?: number;
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface UserSettings {
  theme: string;
  liteMode: boolean;
  reduceMotion: boolean;
  units: 'metric' | 'imperial';
  language: 'en' | 'fr' | 'rw' | 'sw';
  notifications: boolean;
  quietHours?: [string, string];
  soundEnabled: boolean;
  hapticsEnabled: boolean;
}

export interface CustomDrill {
  id: string;
  name: string;
  parts: any;
  createdAt: number;
  rating?: number;
}

class TouchlineDB extends Dexie {
  profile!: EntityTable<Profile>;
  sessions!: EntityTable<Session>;
  attributes!: EntityTable<Attribute>;
  meals!: EntityTable<MealLog>;
  water!: EntityTable<WaterLog>;
  readiness!: EntityTable<ReadinessLog>;
  workouts!: EntityTable<WorkoutLog>;
  matches!: EntityTable<MatchLog>;
  achievements!: EntityTable<Achievement>;
  settings!: EntityTable<UserSettings & { id: string }>;
  customDrills!: EntityTable<CustomDrill>;

  constructor() {
    super('touchline');
    this.version(1).stores({
      profile: 'id',
      sessions: 'id, date, type',
      attributes: 'key',
      meals: 'id, date',
      water: 'date',
      readiness: 'date',
      workouts: 'id, date',
      matches: 'id, date',
      achievements: 'id',
      settings: 'id',
      customDrills: 'id, createdAt',
    });
  }
}

export const db = new TouchlineDB();

// --- Sync hook (stub) ---
// When Supabase sync is enabled, wrap writes here. No app code changes needed.
export const sync = {
  enabled: false,
  push: async () => { /* TODO */ },
  pull: async () => { /* TODO */ },
};

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'pitch',
  liteMode: false,
  reduceMotion: false,
  units: 'metric',
  language: 'en',
  notifications: true,
  soundEnabled: false,
  hapticsEnabled: true,
};