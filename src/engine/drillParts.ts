// Composable parts of the procedural drill generator.
export const SKILL_FOCUSES = [
  'first-touch', 'ball-mastery', 'close-control', 'dribbling', '1v1-moves', 'turns',
  'passing-short', 'passing-long', 'passing-driven', 'passing-lofted', 'receiving-half-turn',
  'finishing-placed', 'finishing-power', 'finishing-volley', 'finishing-one-touch',
  'weak-foot', 'heading', 'crossing', 'juggling', 'shielding', 'scanning', 'deception',
  'tackling-footwork', 'recovery-runs', 'set-pieces', 'goalkeeping', 'decision-making',
];
export const PHYS_FOCUSES = [
  'acceleration', 'top-speed', 'deceleration', 'change-of-direction', 'reactive-agility',
  'vertical-jump', 'horizontal-jump', 'repeated-sprint', 'aerobic-base', 'anaerobic-capacity',
  'single-leg-strength', 'hip-stability', 'core-stiffness', 'landing-mechanics', 'balance',
  'hamstring-resilience', 'ankle-stiffness', 'footwork-cadence', 'lateral-agility',
];
export const FOOTWORK_PATTERNS = [
  'forward', 'backward', 'lateral', 'diagonal', 'crossover', 'hop', 'skip', 'bound',
  'shuffle', 'carrioca', 'high-knees', 'butt-kickers', 'butt-kick-side', 'toe-taps',
  'quick-feet', 'reaction-step', 'multi-directional', 'lateral-cut', 'turn-and-go',
  'backpedal', 'sidestep', 'step-over', 'fake-shot', 'inside-out', 'outside-in',
  'chop', 'hook-turn', 'u-turn', 'half-turn', 'spin', 'swivel', 'toe-heel', 'heel-toe',
  'spring-step', 'hop-over', 'jump-landing', 'single-leg-hold', 'balance-switch',
];
export const CONSTRAINTS = [
  'weak-foot-only', 'one-touch', 'two-touch', 'eyes-up', 'eyes-closed-segment',
  'reaction-cue', 'time-pressure', 'accuracy-target', 'small-space', 'no-ball',
  'music-beat', 'fatigue-state', 'coaching-voice', 'mirror-drill', 'target-count',
  'directional', 'no-dominant-hand', 'continuous', 'shadow', 'wall-only',
];
export const EQUIPMENT = ['none', 'ball', 'wall', 'cones-or-bottles'];
export const SPACES = ['tiny-room', 'yard', 'pitch'];
export const POSITIONS = ['striker', 'winger', 'attacking-mid', 'central-mid', 'full-back', 'centre-back', 'goalkeeper'];

export const GOALS = [
  'speed', 'acceleration', 'stamina', 'dribbling', 'first-touch', 'passing',
  'shooting-power', 'finishing', 'agility', 'jumping', 'strength', 'weak-foot',
];
export const BODY_GOALS = [
  'shoulder-strength', 'v-line', 'chest', 'arms', 'core', 'leg-power', 'glutes',
  'posture', 'athletic-look',
];

export const MOVEMENT_FAMILIES = [
  'push', 'pull-horizontal', 'squat', 'lunge', 'hinge', 'core-anti-extension',
  'core-anti-rotation', 'core-rotation', 'core-flexion', 'core-lateral', 'calves',
  'hips-groin', 'plyometric', 'balance', 'mobility', 'flexibility', 'breathing',
  'yoga', 'posture', 'neck-trap', 'foot-arch', 'grip-forearm',
];

export type DrillPart = {
  skill: string;
  phys: string;
  footwork: string;
  constraint: string;
  equipment: string;
  space: string;
  position: string;
  difficulty: number; // 1-10
  duration: number; // minutes
  workRest: string; // e.g. "30s work / 15s rest"
  sets: number;
  reps: number;
  scenario?: string;
  goal?: string;
  metric?: string;
};

export function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor((seed * 9301 + 49297) % 2330) % arr.length];
}
export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export function seeded(seed: number, n: number): number {
  // deterministic pseudo-random in [0,1)
  let x = Math.sin(seed + n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}