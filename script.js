(function () {
  function getConfig() {
    if (window.OVERLAY_CONFIG && typeof window.OVERLAY_CONFIG === "object") {
      return window.OVERLAY_CONFIG;
    }
    console.warn("OVERLAY_CONFIG is missing. Using defaults.");
    return {};
  }

  function applyTheme(cfg) {
    var theme = cfg.theme || {};
    var root = document.documentElement;

    if (theme.background) root.style.setProperty("--overlay-bg", theme.background);
    if (theme.panel) root.style.setProperty("--overlay-panel", theme.panel);
    if (theme.border) root.style.setProperty("--overlay-border", theme.border);
    if (theme.primary) root.style.setProperty("--overlay-primary", theme.primary);
    if (theme.accent) root.style.setProperty("--overlay-accent", theme.accent);
    if (theme.textMain) root.style.setProperty("--overlay-text-main", theme.textMain);
    if (theme.textMuted) root.style.setProperty("--overlay-text-muted", theme.textMuted);
  }

  function setupBranding(cfg) {
    var logoEl = document.getElementById("brand-logo");
    var titleEl = document.getElementById("brand-title");
    var subEl = document.getElementById("brand-subtitle");
    if (logoEl && cfg.logoText) logoEl.textContent = cfg.logoText;
    if (titleEl && cfg.channelName) titleEl.textContent = cfg.channelName;
    if (subEl && cfg.tagline) subEl.textContent = cfg.tagline;
  }

  function setupClock(cfg) {
    var clockEl = document.getElementById("clock");
    if (!clockEl) return;

    if (!cfg.showClock) {
      clockEl.style.display = "none";
      return;
    }

    var format24h = cfg.clock && cfg.clock.format24h;
    var tzLabel = cfg.clock && cfg.clock.timezoneLabel ? " " + cfg.clock.timezoneLabel : "";

    function updateClock() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var suffix = "";

      if (!format24h) {
        suffix = hours >= 12 ? " PM" : " AM";
        hours = hours % 12;
        if (hours === 0) hours = 12;
      }

      var hh = String(hours).padStart(2, "0");
      var mm = String(minutes).padStart(2, "0");
      clockEl.textContent = hh + ":" + mm + (format24h ? "" : suffix) + tzLabel;
    }

    updateClock();
    setInterval(updateClock, 10 * 1000); // update every 10 seconds
  }

  function setupStatusPill(cfg) {
    var pillEl = document.getElementById("status-pill");
    if (!pillEl) return;
    if (!cfg.statusPill || cfg.statusPill.enabled === false) {
      pillEl.style.display = "none";
      return;
    }
    if (cfg.statusPill.text) {
      pillEl.textContent = cfg.statusPill.text;
    }
  }

  function setupPanels(cfg) {
    function setPanel(prefix, panelCfg) {
      if (!panelCfg) return;
      var labelEl = document.getElementById(prefix + "-label");
      var valueEl = document.getElementById(prefix + "-value");
      var detailEl = document.getElementById(prefix + "-detail");
      if (labelEl && panelCfg.label) labelEl.textContent = panelCfg.label;
      if (valueEl && panelCfg.value) valueEl.textContent = panelCfg.value;
      if (detailEl && panelCfg.detail) detailEl.textContent = panelCfg.detail;
    }

    setPanel("primary", cfg.primaryPanel);
    setPanel("secondary", cfg.secondaryPanel);
    setPanel("tertiary", cfg.tertiaryPanel);
  }

  function setupAlertBox(cfg) {
    var tagEl = document.getElementById("alert-tag");
    var areaEl = document.getElementById("alert-area");
    var bodyEl = document.getElementById("alert-body");

    var alertCfg = cfg.alertBox || {};
    if (tagEl && alertCfg.tag) tagEl.textContent = alertCfg.tag;
    if (areaEl && typeof alertCfg.area === "string") areaEl.textContent = alertCfg.area;
    if (bodyEl && alertCfg.body) bodyEl.textContent = alertCfg.body;
  }

  function setupTicker(cfg) {
    var trackEl = document.getElementById("ticker-track");
    var labelEl = document.getElementById("ticker-label");
    if (!trackEl) return;

    var tickerCfg = cfg.ticker || {};
    var items = Array.isArray(tickerCfg.items) ? tickerCfg.items : [];
    var label = tickerCfg.label || "HEADLINES";

    if (labelEl) labelEl.textContent = label;

    if (!items.length) {
      trackEl.textContent = "Edit OVERLAY_CONFIG.ticker.items in config.js to add your own messages.";
      return;
    }

    // Build the scrolling content string
    var separator = "   •   ";
    var text = items.join(separator) + separator;
    trackEl.textContent = text + text; // duplicate so the scroll loops smoothly

    // Calculate an approximate duration based on content width and desired px/sec
    // We wait a tick for layout
    requestAnimationFrame(function () {
      try {
        var width = trackEl.scrollWidth / 2; // half, because we duplicated the content
        var speed = typeof tickerCfg.speed === "number" && tickerCfg.speed > 0 ? tickerCfg.speed : 45;
        var duration = width / speed; // seconds
        if (!isFinite(duration) || duration <= 0) {
          duration = 30;
        }
        trackEl.style.animationDuration = duration.toFixed(1) + "s";
        trackEl.classList.add("ticker-animate");
      } catch (e) {
        console.warn("Could not calculate ticker animation duration:", e);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var cfg = getConfig();
    applyTheme(cfg);
    setupBranding(cfg);
    setupClock(cfg);
    setupStatusPill(cfg);
    setupPanels(cfg);
    setupAlertBox(cfg);
    setupTicker(cfg);
  });
})();
