# गीता — a sacred book you scroll through

A mobile-first reader for the Bhagavad Gita: one shloka per screen, scroll-snap
vertical feed, tap to unfold meaning, chapter-end interstitials, quiet progress.
No accounts, no gamification. Reading position persists in localStorage.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Installable as a PWA; `public/sw.js` precaches all 18 chapter files and fonts
for fully offline reading after first visit.

## Structure

- `lib/engine.js` — the reader engine (palettes, abstract chapter forms,
  scroll-snap feed with windowed rendering, ink-bloom expand overlay,
  chapter index, position/read-state persistence). Mounted by the
  `app/reader.jsx` client component.
- `app/globals.css` — design system: 18 chapter palettes via CSS variables,
  Tiro Devanagari Sanskrit embedded from `/public/fonts`.
- `public/data/index.json` — chapter meta (name, meaning, teaching,
  3 reflection questions, verse counts).
- `public/data/chapter-NN.json` — canonical verse data, lazy-loaded per chapter.

## Verse schema (`chapter-NN.json → verses[]`)

```json
{
  "chapter": 2, "verse": 47,
  "speaker": "श्रीभगवानुवाच",            // optional उवाच rubric
  "devanagari": "…", "transliteration": "…",
  "essence": "one line shown on the card",
  "translation": "Sivananda (public domain)",
  "anvaya": [{ "word": "कर्मणि एव", "meaning": "in action alone" }],  // optional
  "explanation": "…",                      // optional — व्याख्या
  "connection": "…",                       // optional — link to previous verse
  "schools_note": "…"                      // optional — दृष्टिभेद
}
```

The reader renders gracefully when optional fields are missing (shloka +
translation only). **Chapters 1 and 2 are fully enriched** (anvaya, explanation,
connection for all 119 verses, plus selective schools notes). To enrich
chapters 3–18, edit the chapter JSON and add the optional fields per verse —
no code changes needed.

## Sources

- Verse text/transliteration: vedicscriptures/bhagavad-gita dataset.
- Translation: Swami Sivananda (public domain).
- Essence lines, anvaya, explanations, connections, school notes for ch. 1–2:
  original prose written for this app.
