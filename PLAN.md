# Touchline — PLAN

Status: **BUILDING** (started 2026-11-13 ~23:20, target finish 07:00)

## 1. Architecture

- **Next.js 16 App Router** + TypeScript + Tailwind v4, PWA, mobile-first.
- **Client**: `src/app` routes, `src/components`, `src/lib` (state, DB, engines), `src/engine` (drill/diet/workout generators), `src/camera` (MediaPipe pose).
- **Server**: `src/app/api/**` route handlers (Netlify Functions) — AI coach (Claude API via env), health.
- **Data**: Dexie/IndexedDB local-first (`src/lib/db.ts`). Sync hook stubbed for Supabase later.
- **3D**: React Three Fiber + drei, lazy loaded, `Lite mode` switch swaps to gradients.
- **AI**: streaming Claude call from `/api/coach`, system prompt versioned in `src/ai/system.ts`, Zod-validated tool outputs, rule-based offline fallback coach.
- **Deploy**: GitHub repo `touchline` → Netlify, `netlify.toml`, `SITE_URL` env for canonical URLs.

## 2. Folder structure
```
touchline/
  public/brand/          # logo svgs, favicons, og-image
  src/
    app/                 # pages + api + layout
    components/          # ui, pillars, coach, camera
    lib/                 # db, store, theme, i18n, format
    engine/              # drill, diet, workout generators
    camera/              # mediapipe pose hook
    ai/                  # system prompt, coach client, knowledge base
    data/                # food db, exercise db, knowledge markdown
  knowledge/             # coach knowledge base md
  tests/                 # vitest + playwright
  PLAN.md, README.md, DEPLOY.md
```

## 3. Milestones (commit + run after each)
1. Setup, brand, tokens, themes, nav shell, 3D hero, **live Netlify deploy**
2. Onboarding + profile + data layer
3. Drill library + football programme engine + session player
4. Camera pipeline (pose overlay, setup helper, rep counter)
5. Football camera drills
6. Attributes, analytics, readiness, achievements, stepped path
7. Diet engine, food DB, meal plans, shopping list, logging, match-day
8. Daily bodyweight workout generator, progression ladders, body-focus map
9. Drill Engine: generator, validator, ranking, Drill Browser, Drill Lab, 100k validation test
10. AI Trainer: chat/voice, personas, tool use, camera feedback, memory, KB retrieval, offline fallback, safety, tests
11. Expanded workout: 600+ exercises, goal programs, daily generator, formats, body map, progress photos
12. Extra: match mode, calendar, video analysis, mental, injury, barcode, social, i18n, notifications
13. Polish: Lite mode, accessibility, perf, security
14. Tests, README, demo mode, e2e
15. Netlify launch + SEO: final address, HTTPS, install, sitemap/robots/metadata, GSC/Bing guide, Lighthouse 90+

## 4. Risks / decisions
- **MediaPipe** loads from CDN (esm.sh). On-device only; no video uploaded. Honest confidence UI; manual fallback.
- **Claude API key** in Netlify env only; route has rate limit + daily cap.
- **Under-18 safety**: no calorie restriction, no supplements/fat burners, no extreme loads.
- **Drill count**: procedural generator (composable parts) + 500 curated base drills → 1M+ space; validated, deduped, ranked.
- **Netlify name**: try `touchline`, then `touchline-app`, `touchline-fc`, `gettouchline`, `touchlinetraining`.
- **Lite mode**: detect weak device / battery; swap 3D for static gradients.