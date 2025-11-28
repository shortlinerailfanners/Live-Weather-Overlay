# Universal Weather Overlay

A clean, user‑friendly HTML/CSS/JS overlay inspired by the WeatherPower style — but generic so **anyone** can use it for weather streams, storm chasing, news, or status dashboards.

You can drop this straight into OBS as a Browser Source, or host it on a website / GitHub Pages and point OBS to the URL.

---

## Features

- ✅ Modern, neon‑style UI designed for 16:9 streams (1920×1080 recommended)
- ✅ Transparent background so your radar / video shows behind the cards
- ✅ Top bar with logo, channel name, tagline, clock, and LIVE pill
- ✅ Three quick‑info cards (current conditions, location, “next update”, etc.)
- ✅ Big alert box for warnings / key messages / sponsor text
- ✅ Scrolling headline ticker at the bottom, fully configurable
- ✅ All main settings live in **`config.js`** – no frameworks, no build step

---

## Files

- `index.html` – main overlay layout
- `style.css` – styling and animations
- `config.js` – simple config object for all the text and colors
- `script.js` – wiring between the config and the UI
- `README.md` – this file

---

## Quick Start (Local use / OBS)

1. **Download and unzip** this folder.
2. Open `config.js` in any text editor (VS Code, Notepad++, etc.).
3. Change:
   - `channelName`, `tagline`, and `logoText`
   - The left‑column panel text (`primaryPanel`, `secondaryPanel`, `tertiaryPanel`)
   - The alert box text (`alertBox`)
   - The ticker headlines (`ticker.items`)
4. In **OBS**:
   - Add → **Browser Source**
   - **Uncheck** “Local file”
   - Set the URL to something like `http://localhost/universal-overlay/index.html` if you’re hosting it locally **or** use your GitHub Pages URL (see below).
   - Set the width to **1920** and height to **1080** (or your canvas resolution).
   - Set **FPS** to 30 or 60.
5. Move and scale the browser source wherever you want it on your scene.

> 💡 If you don’t want to run a local web server, you can also:
> - Host these files on any simple web host, OR
> - Push them to GitHub and use GitHub Pages.

---

## Using with GitHub / GitHub Pages

1. Create a new repo (for example: `universal-weather-overlay`).
2. Drop these files into the repo root or a folder (e.g. `overlay/`).
3. Commit & push to GitHub.
4. In the repo settings, enable **GitHub Pages** (for example: Source: `main` / `/root` or `/docs`).
5. Your overlay will be available at a URL like:

   `https://<your-username>.github.io/<your-repo>/index.html`

   or, if you keep it in a folder:

   `https://<your-username>.github.io/<your-repo>/overlay/index.html`

6. Use that URL as the Browser Source in OBS.

---

## Configuration Guide (`config.js`)

All the knobs live in one place: **`OVERLAY_CONFIG`**.

### Branding

```js
channelName: "Your Channel Name",
tagline: "Weather · Storms · Live Coverage",
logoText: "WX",
```

- `channelName` – big text in the top bar
- `tagline` – smaller text under the name
- `logoText` – 2–3 letters shown in the round gradient logo

### Theme

```js
theme: {
  background: "rgba(3, 7, 18, 0.0)",
  panel: "rgba(15, 23, 42, 0.90)",
  border: "rgba(148, 163, 184, 0.40)",
  primary: "#0ea5e9",
  accent: "#f97316",
  textMain: "#e5e7eb",
  textMuted: "#9ca3af"
},
```

You can tweak colors to fit your brand. For a different “vibe”:

- Make `primary` and `accent` a matching pair (e.g. purple + pink, green + teal).
- Slightly increase `panel` opacity if you want less of your video to show through.

### Clock

```js
showClock: true,
clock: {
  timezoneLabel: "CT",
  format24h: false
},
```

- `showClock` – turn clock on/off.
- `timezoneLabel` – this is just a label added after the time (e.g. `CT`, `ET`, `UTC`).
- `format24h` – `true` for 24‑hour time, `false` for 12‑hour.

The time itself uses the viewer’s local system time.

### Status Pill

```js
statusPill: {
  enabled: true,
  text: "LIVE"
},
```

Turn it off or change text to something like `"REPLAY"`, `"OFF AIR"`, or `"TEST"`.

### Info Panels (left column)

```js
primaryPanel: {
  label: "Current Conditions",
  value: "72°",
  detail: "Mostly cloudy · Feels like 70°"
},
secondaryPanel: {
  label: "Location",
  value: "Idabel, OK",
  detail: "Edit OVERLAY_CONFIG.secondaryPanel in config.js"
},
tertiaryPanel: {
  label: "Next Update",
  value: "Every 10 minutes",
  detail: "Or whatever you want to show here"
},
```

You can rename them to whatever you want:
- Radar mode
- Camera location
- “On‑call meteorologist”
- “Target area”

### Alert Box

```js
alertBox: {
  tag: "No Active Alerts",
  area: "",
  body: "Use this box for warnings, key messages, sponsor text, or anything important."
},
```

- `tag` – the bright pill (e.g. `"Tornado Warning"`, `"Severe Thunderstorm Watch"`)
- `area` – smaller text to the right (e.g. `"McCurtain County, OK until 5:30 PM"`)
- `body` – main message paragraph

### Ticker

```js
ticker: {
  label: "HEADLINES",
  speed: 45, // pixels per second
  items: [
    "Edit OVERLAY_CONFIG.ticker.items in config.js to change these headlines.",
    "Use this space for timing, town lists, or important reminders.",
    "You can connect any data source you want by editing script.js."
  ]
}
```

- `label` – little tag on the left (e.g. `"HEADLINES"`, `"STORM REPORTS"`, `"SPONSORS"`).
- `speed` – how fast it scrolls (bigger number = faster).
- `items` – array of strings for each headline.

---

## Hooking It Up to Your Own Data

Out of the box this is **static**, so you just edit `config.js` manually.

If you want to auto‑update it from an API or your own backend:

- Use `fetch()` in `script.js` to call your API.
- When new data comes in, update `OVERLAY_CONFIG` and call the same helper functions used on load (for example, update the `primaryPanel` object and call `setupPanels` again).

This keeps the template simple, so you can wire it to:
- A weather API
- Your own Firebase / Realtime DB
- A small custom dashboard

---

## Notes

- Designed around a 16:9 canvas (1920×1080) but will scale down on smaller resolutions.
- Background is transparent so it plays nice as an overlay on top of radar/video.
- No frameworks or external CDNs – just open it and go.

---

Enjoy! If you publish this on GitHub, feel free to rename everything and brand it however you want.
