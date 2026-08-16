# BaZi Compass — 命盤羅盤

A self-contained Progressive Web App for **BaZi (八字 · Four Pillars of Destiny)**. From an exact birth
moment it casts the natal chart, judges the favourable element through three classical methods, lays out the
decade luck cycles, reads the day, scans the year ahead for notable and best/worst days, and distils
everything into a plain-English Summary covering wealth, investments, ventures, career and home.

Everything runs **client-side** — no server, no API key, no account, and **no data leaves the device**.
It installs to the home screen and works **offline** after the first load.

> **App version this README reflects:** `v2026:06:14-10:30`
> The version stamp lives in the app footer (format `vYYYY:MM:DD-HH:MM`); the HH:MM segment is a same-day
> build marker, not a wall-clock claim.

---

## What it is — and isn't

The dividing line that governs the whole project: **calculation is deterministic; interpretation is traditional.**

| Layer | Source | Status |
|---|---|---|
| Four pillars, hidden stems, Ten Gods, Na Yin, 12-stages, Tai Yuan / Ming Gong / Shen Gong | `lunar-javascript` engine | **Deterministic** — calendar maths from solar terms + the sexagenary cycle |
| Luck cycles (大運) direction & timing | `lunar-javascript` (`getYun(sex)`) | **Deterministic** |
| Daily 宜/忌, 沖, directions, Nine Star, 黄道/黑道, 吉神/凶煞 | `lunar-javascript` (老黃曆) | **Deterministic** (same for everyone that calendar day) |
| 六沖 / 六合 / 三合 / 六害 relationships; true-solar-time correction | canonical tables + NOAA equation-of-time, encoded in `index.html` | **Deterministic** |
| Day-Master strength, 用神 (favourable element), personality, life-domain reads, best/worst-day ranking | classical Zǐ-píng (子平) conventions | **Interpretation** — a traditional framework, **not** prediction |

No figure on screen is invented: every value is computed, anything unavailable shows **N/A**, and the
strength method shows its signals rather than a fabricated "strength %". BaZi has **no validated predictive
power** — the app is a *mirror and a calendar*, not a forecast of events.

---

## Features (by tab)

- **概要 Summary** (landing tab) — the whole assessment distilled:
  - *Headlines*: Day Master & nature, strength lean, favourable element, strongest life-theme, element balance, current decade.
  - *Wealth · Investments · Ventures · Career · Home*: five life-domains read from your Ten Gods —
    財 (wealth), 偏財 (investments/windfall), 食傷生財 (own business/ventures), 官殺 + Month "career palace" (career),
    and 印 + Earth (home/property, read indirectly). Money domains carry explicit *not financial/business advice* caveats.
  - *Right now & ahead*: today vs your chart, next key year, next key day.
  - *Best & worst days — the year ahead*: the 5 most favourable / 5 most challenging days in the next 12 months,
    each with its reasons (chart interactions + favourable element + 黄道/黑道 almanac quality).
- **命盤 Natal chart** — the vertical 命盤 with stems/branches coloured by element, hidden stems, Ten Gods,
  Na Yin, 12-stages; Day-Master strength factors; five-element tally; the **用神 panel** (three methods + chooser); reference points.
- **大運 Luck cycles** — the decade pillars, current decade highlighted, with its interactions against your chart.
- **今日 Today** — today's pillar, its Ten-God relation to you, clash/combination with your Day branch, and the day's almanac (宜/忌, directions, Nine Star).
- **流年 Key dates** — deterministic scan of notable upcoming years and days (clash/combination with your chart).
- **指南 What it means** — a plain-English guide: a 30-second version, a personalised **Do / Don't** (where/what/when/why
  from your favourable element), and deeper sections on every concept. Anchors to your actual Day Master.

### The 用神 (favourable element) keystone
The Natal tab shows **three classical methods side by side** — 扶抑 (strength), 调候 (climatic), 通关 (mediation) —
each with its own inputs, and **lets you choose** rather than asserting one answer. Your choice then personalises
the whole app: favourable/draining marks on luck cycles, years, days and elements; favourable directions & colours;
and the best/worst-day ranking. Applying it jumps you to the now-personalised Summary.

### Save on this device
A "Remember my details" toggle stores your birth particulars **and** your chosen element in the browser's local
storage (device-only, private, no account). On next open the app auto-fills, auto-casts and restores your element
choice. A "Forget" button clears it. (Works on the deployed site; browser storage is sandboxed inside preview frames.)

---

## Calculation engine & sources

- **Engine:** 6tail [`lunar-javascript`](https://github.com/6tail/lunar-javascript) **v1.7.7** (MIT) — solar terms,
  sexagenary pillars, Ten Gods, Na Yin, luck cycles, daily 老黃曆 (宜/忌, 黄道/黑道, 吉神/凶煞, Nine Star). English
  terms for Na Yin and the daily almanac come from the engine's own i18n (switched in/out cleanly so the chart glyphs stay Chinese).
- **Relationship tables** (六沖/六合/三合/六害) and **Ten-God derivation** are canonical Zǐ-píng definitions, encoded
  transparently in `index.html`. The Ten-God logic was cross-checked against the engine's own output on 600 stem
  comparisons (0 mismatches).
- **True solar time:** longitude offset from the zone's standard meridian (4 min/°) + the standard **NOAA equation-of-time** approximation.
- **Five-element correspondences** (directions, colours, seasons, trades) are standard 五行 associations; the
  best/worst-day ranking is a transparent, factor-based heuristic with every factor shown.

---

## Accuracy & inputs

- **Sex is required** — it sets the direction of the luck cycles (大運).
- **Time matters.** Mark *time unknown* to omit the hour pillar honestly rather than guess it.
- **True solar time (真太陽時)** is optional and off by default; it only shifts the chart near a 2-hour 時辰 boundary.

---

## Privacy & data

100% client-side. No backend, no analytics, no account. Birth details and the element choice are stored only in
**this browser on this device** via `localStorage`, and only if you keep "Remember my details" ticked. "Forget"
removes them. Clearing browser/site data also removes them. Nothing is ever transmitted.

---

## Install / deploy (GitHub Pages)

1. Put all files (below) at the **repo root** (not in a subfolder).
2. **Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.**
3. Open the URL; on mobile, **Add to Home Screen** to install. After first load it works offline.
4. **On every change**, bump *both* the `VERSION` in `index.html` and the `CACHE` constant in
   `service-worker.js`, so installed clients fetch the new build instead of the cached one.

The engine loads from the jsDelivr CDN first (so previews work) and **falls back to the bundled `lunar.js`** if the
CDN is blocked — so the app also runs fully offline / from `file://`.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire app (markup, styles, logic). The only file you normally edit. |
| `lunar.js` | Bundled 6tail engine v1.7.7 (offline fallback). |
| `manifest.json` | PWA manifest (name, icons, theme, standalone display). |
| `service-worker.js` | Offline cache; bump `CACHE` on every change. |
| `icon-192.png`, `icon-512.png` | App icons (five-element ring on a cinnabar seal). |
| `README.md` | This file. |

---

## Version history

| Version | Change |
|---|---|
| `v2026:06:13-12:00` | Initial build — four pillars, luck cycles, today's almanac, key-dates scan, optional true-solar-time, honesty model. |
| `v2026:06:14-02:00` | English translation beneath/beside all Chinese (verified tables + engine i18n). |
| `v2026:06:14-03:30` | 用神 favourable-element panel — three classical methods + chooser, personalising all views. |
| `v2026:06:14-04:30` | "What it means" plain-English guide tab. |
| `v2026:06:14-05:30` | Guide: 30-second summary + personalised Do/Don't (where/what/when/why). |
| `v2026:06:14-06:30` | Summary tab (key highlights) as the landing view. |
| `v2026:06:14-07:30` | Surface the personalised Summary after applying favourable elements. |
| `v2026:06:14-08:30` | Best/worst days of the year ahead in Summary (factor-based, reasons shown). |
| `v2026:06:14-09:30` | Save details on device (auto-load) + House/Career/Wealth in Summary. |
| `v2026:06:14-10:30` | Added Investments (偏財) and Ventures (食傷生財) to the Summary domains. |

---

## Known limitations (stated honestly)

- **Home/property** is the weakest fit for Four Pillars; it is read *indirectly* (印 + Earth + favourable
  directions) and labelled as such. A true property reading belongs to feng-shui / Zǐ Wēi Dǒu Shù.
- **调候 climatic method** uses the seasonal principle; the full per-Day-Master 穷通宝鉴 lookup (120 entries) is a
  known refinement that is **not** encoded (shown as N/A for temperate months rather than guessed).
- **Day-Master strength** uses the eight characters' primary element as a transparent count; a professional also
  weights hidden stems, the month, and branch combinations. Borderline cases are reported as ambiguous.
- **Nine Star** shows the engine's value, which is partly Chinese for that compound term.
- **Money domains** (investments, ventures, wealth) describe traditional *disposition* only — **not** financial or
  business advice, and **not** a prediction of returns or success.

---

## Possible next steps

- AI narrative reading (a server-side Edge Function that interprets the computed facts in flowing prose, with
  strict no-fabrication guardrails) — the one place a backend would earn its keep.
- Date-selection (擇日): pick a purpose (sign / move / launch / travel) and rank upcoming days by your chart fit
  plus the day's specific 宜/忌 for that activity.
- Full 穷通宝鉴 climatic table (sourced and verified before encoding).
- Two-chart compatibility (合婚).

---

*This tool informs; it does not decide. For a consequential decision, consult a qualified practitioner and your
own judgement.*
