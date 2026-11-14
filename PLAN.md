# PLAN.md — Touchline Pro Football Academy

## Architecture & Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **State & Storage**: IndexedDB (via Dexie) for local-first data persistence, offline support, and zero data loss.
- **Computer Vision (Pillar 1B)**: MediaPipe Pose Landmarker (`@mediapipe/tasks-vision`) running 100% on-device in the browser via `getUserMedia`. No video ever leaves the user's phone. Real-time joint-angle tracking for rep counting (push-ups, squats, planks) and form scoring.
- **Drill Engine**: Procedural generator producing millions of valid, safe, position-aware drills with automated validation.
- **AI Coach (Pillar 4)**: Serverless API route with streaming responses, tool use, and rule-based offline fallback.

---

## Milestone Breakdown & Implementation Status

### Milestone 1: Core Shell, Brand & Deployment ✅
- Official Touchline branding, SVG logo assets, responsive layout, dark theme tokens.
- Deployed and live.

### Milestone 2: Onboarding & IndexedDB Data Layer ✅
- Profile setup (name, age, position, level, dominant foot, goals).
- Local IndexedDB store initialized with zero starting stats (Level 1, 0 XP, real progressive tracking).

### Milestone 3: Drill Library & Personalized Programme Engine ✅
- 100+ curated drills + procedural generator.
- Session player with timer, sets/reps, work/rest intervals, and voice cues.

### Milestone 4: Live Camera Training Pipeline (MediaPipe Pose) ✅
- Real-time `getUserMedia` video feed with HTML5 canvas overlay.
- MediaPipe Pose Landmarker integration for live joint angle calculations, squat/push-up rep counting, form scoring ("go lower", "keep back straight"), and confidence indicators.

### Milestone 5: Analytics, Readiness & Stepped Path 🔄
- Attribute radar card, daily readiness check-in, XP progression starting from Level 1.

### Milestone 6: Diet & Fuelling Engine 🔄
- Macro calculators, matchday meal timing, East African & global food database with swaps.

### Milestone 7: Daily Bodyweight Workout Generator 🔄
- No-equipment workouts targeting specific body goals with progressive overload.

### Milestone 8: AI Coach & Offline Fallback 🔄
- Persona selection, streaming chat, tool use, and safety guardrails.
