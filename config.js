// Universal Weather Overlay configuration
// Edit the values in this file to customize the overlay for your stream or project.

window.OVERLAY_CONFIG = {
  // Branding
  channelName: "Your Channel Name",
  tagline: "Weather · Storms · Live Coverage",
  logoText: "WX", // Short 2–3 letter code shown in the round logo

  // Theme colors (these override the CSS variables)
  theme: {
    background: "rgba(3, 7, 18, 0.0)",      // overall page background (keep transparent for OBS)
    panel: "rgba(15, 23, 42, 0.90)",        // card / bar background
    border: "rgba(148, 163, 184, 0.40)",    // thin outlines
    primary: "#0ea5e9",                     // blues
    accent: "#f97316",                      // highlight / alert accent
    textMain: "#e5e7eb",
    textMuted: "#9ca3af"
  },

  // Clock settings
  showClock: true,
  clock: {
    // "local" = use the viewer's local time
    // To lock it to a single time zone visually, just change the label you put in the overlay
    timezoneLabel: "CT", // shown next to the clock, not used for math
    format24h: false
  },

  // Status pill in the top right
  statusPill: {
    enabled: true,
    text: "LIVE"
  },

  // Left column panels
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

  // Alert box on the right
  alertBox: {
    tag: "No Active Alerts",
    area: "",
    body: "Use this box for warnings, key messages, sponsor text, or anything important."
  },

  // Scrolling bottom ticker
  ticker: {
    label: "HEADLINES",
    // Approximate speed in pixels per second (JS will calculate duration)
    speed: 45,
    items: [
      "Edit OVERLAY_CONFIG.ticker.items in config.js to change these headlines.",
      "Use this space for timing, town lists, or important reminders.",
      "You can connect any data source you want by editing script.js."
    ]
  }
};
