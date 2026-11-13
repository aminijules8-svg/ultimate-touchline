import { DrillPart, SKILL_FOCUSES, PHYS_FOCUSES, FOOTWORK_PATTERNS, CONSTRAINTS, EQUIPMENT, SPACES, POSITIONS, GOALS, BODY_GOALS, MOVEMENT_FAMILIES, pick, hashStr, seeded } from './drillParts';

export interface Drill {
  id: string;
  title: string;
  skillFocus: string;
  physFocus: string;
  footworkPattern: string;
  constraint: string;
  equipment: string;
  space: string;
  position: string;
  difficulty: number;
  durationMinutes: number;
  workRest: string;
  sets: number;
  reps: number;
  description: string;
  instructions: string[];
  coachingCues: string[];
  progression: string;
  regression: string;
  energySystem: 'ATP-PC' | 'Glycolytic' | 'Aerobic';
  estimatedCalories: number;
}

export function generateDrill(seedStr: string, overrideGoal?: string): Drill {
  const h = hashStr(seedStr);
  const skill = pick(SKILL_FOCUSES, h);
  const phys = pick(PHYS_FOCUSES, h + 1);
  const fw = pick(FOOTWORK_PATTERNS, h + 2);
  const constraint = pick(CONSTRAINTS, h + 3);
  const equipment = pick(EQUIPMENT, h + 4);
  const space = pick(SPACES, h + 5);
  const position = pick(POSITIONS, h + 6);
  const diff = Math.floor(seeded(h, 7) * 10) + 1;
  const duration = Math.max(3, Math.floor(seeded(h, 8) * 15) + 3);
  const sets = Math.floor(seeded(h, 9) * 4) + 2;
  const reps = Math.floor(seeded(h, 10) * 10) + 5;

  const title = formatTitle(skill, phys, constraint);
  const energy = diff > 7 ? 'Glycolytic' : diff > 4 ? 'ATP-PC' : 'Aerobic';
  const cals = duration * (diff > 7 ? 14 : diff > 4 ? 11 : 8);

  return {
    id: `drill-${h}`,
    title,
    skillFocus: skill,
    physFocus: phys,
    footworkPattern: fw,
    constraint,
    equipment,
    space,
    position,
    difficulty: diff,
    durationMinutes: duration,
    workRest: diff > 6 ? '30s work / 15s rest' : '40s work / 20s rest',
    sets,
    reps,
    description: `A high-intensity ${skill.replace('-', ' ')} session designed to integrate ${phys.replace('-', ' ')} under match-realistic fatigue using ${equipment}.`,
    instructions: [
      `Set up your training area in your ${space.replace('-', ' ')} using ${equipment}.`,
      `Focus on the ${fw.replace('-', ' ')} rhythm throughout every repetition.`,
      `Maintain strict adherence to the constraint: ${constraint.replace('-', ' ')}.`
    ],
    coachingCues: [
      `Stay light on your toes during ${fw}.`,
      `Scan the imaginary space before receiving or accelerating.`,
      `Keep your core braced during explosive changes of direction.`
    ],
    progression: `Increase speed by 15% or add a second defender cone.`,
    regression: `Perform at 50% speed without the constraint until movement pattern is locked in.`,
    energySystem: energy,
    estimatedCalories: cals,
  };
}

function formatTitle(skill: string, phys: string, constraint: string): string {
  const cap = (s: string) => s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  return `${cap(skill)} x ${cap(phys)} (${cap(constraint)})`;
}

export function generateSessionWorkout(goal: string, level: string, durationMinutes: number): { title: string; subtitle: string; drills: Drill[] } {
  const seed = hashStr(goal + level + durationMinutes);
  const count = Math.max(3, Math.floor(durationMinutes / 10));
  const drills: Drill[] = [];
  for (let i = 0; i < count; i++) {
    drills.push(generateDrill(`${seed}-${i}`, goal));
  }
  return {
    title: `${goal.toUpperCase()} & Match Fitness Pro`,
    subtitle: `Custom tailored for ${level} level players • ${durationMinutes} Minutes • Pro Circuit`,
    drills,
  };
}
