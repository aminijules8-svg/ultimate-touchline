import Dexie, { Table } from 'dexie';

export interface UserProfile {
  id?: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  dominantFoot: string;
  position: string;
  level: string;
  country: string;
  goals: string[];
  xp: number;
  levelNum: number;
  streak: number;
  createdAt: Date;
}

export interface TrainingLog {
  id?: number;
  drillTitle: string;
  category: string;
  durationSeconds: number;
  repsCompleted: number;
  formScore: number;
  date: Date;
}

export interface MealLog {
  id?: number;
  mealType: string;
  foodName: string;
  calories: number;
  protein: number;
  completed: boolean;
  date: string;
}

class TouchlineDatabase extends Dexie {
  profile!: Table<UserProfile, number>;
  trainingLogs!: Table<TrainingLog, number>;
  mealLogs!: Table<MealLog, number>;

  constructor() {
    super('TouchlineProDB');
    this.version(1).stores({
      profile: '++id, name, level, xp',
      trainingLogs: '++id, drillTitle, date',
      mealLogs: '++id, mealType, date, completed',
    });
  }
}

export const db = new TouchlineDatabase();
