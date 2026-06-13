# BaZi Compass — 命盤羅盤

A self-contained Progressive Web App for **BaZi (八字 · Four Pillars of Destiny)**: it casts the natal
chart, lists the decade luck cycles (大運), gives a daily almanac reading, and scans the coming days/years
for the classical clash/combination dates worth watching.

Everything runs **client-side** — no server, no API key, no account, and **no data leaves the device**.
It is installable and works **offline** after the first load.

---

## What is calculated vs. interpreted (read this)

| Layer | Source | Status |
|---|---|---|
| Four pillars, hidden stems, Ten Gods, Na Yin, 12-stages, Tai Yuan / Ming Gong / Shen Gong | `lunar-javascript` engine | **Deterministic** — calendar mathematics from solar terms + the sexagenary cycle |
| Luck cycles (大運) direction & timing | `lunar-javascript` (`getYun(sex)`) | **Deterministic** |
| Daily 宜/忌, 沖, directions, Nine Star | `lunar-javascript` (老黃曆) | **Deterministic** (same for everyone that calendar day) |
| 六沖 / 六合 / 三合 / 六害 relationships, true-solar-time correction | canonical tables + NOAA equation-of-time, encoded transparently in `index.html` | **Deterministic** |
| Personality / Ten-God / strength / "years to watch" wording | classical Zǐ-píng (子平) conventions | **Interpretation** — a traditional framework, **not** prediction |

No figure on the page is invented. Where a value is unavailable it is shown as **N/A**. The app shows the
**classical structural facts** (e.g. whether the Day Master is in season) rather than a fabricated "strength %".

## Accuracy notes
- **Sex is required** — it sets the direction of the luck cycles (大運), per stem polarity.
- **Time matters.** Mark *time unknown* to omit the hour pillar honestly rather than guess it.
- **True solar time (真太陽時)** is optional and off by default. Traditional BaZi reads the hour pillar from
  *local apparent solar time*. The correction = longitude offset from the time-zone's standard meridian
  (4 min/°) + the equation of time. It only changes the chart near a 2-hour 時辰 boundary.

## Deploy to GitHub Pages
1. Put `index.html`, `manifest.json`, `service-worker.js`, `lunar.js`, `icon-192.png`, `icon-512.png` in a repo (e.g. `bazi-compass`).
2. Settings → Pages → deploy from the branch root.
3. Open the URL on a phone → "Add to Home Screen" to install. The service worker caches everything for offline use.
   Bump the `CACHE` constant in `service-worker.js` whenever you change a file, so clients refresh.

The engine loads from the jsDelivr CDN first (so it works in any preview) and **falls back to the bundled
`lunar.js`** if the CDN is blocked — so the app also runs fully offline / from `file://`.

## Sources
- **Engine:** 6tail `lunar-javascript` v1.7.7 (MIT) — https://github.com/6tail/lunar-javascript
- **Equation of time:** standard NOAA approximation (sun position / general-astronomy formula).
- **Relationship tables (六沖/六合/三合/六害)** and **Ten-God derivation** are canonical Zǐ-píng definitions;
  the Ten-God logic in this app was cross-checked against the engine's own output on 600 stem comparisons (0 mismatches).

## Version
App version is stamped in the footer as `vYYYY:MM:DD-HH:MM`. Current build: **v2026:06:14-02:00**.
(The HH:MM segment is a same-day build sequence marker, not a wall-clock claim.)

---
*This tool informs; it does not decide. For a consequential decision, consult a qualified practitioner and your own judgement.*
