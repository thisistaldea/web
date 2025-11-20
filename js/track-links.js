// public/js/track-links.js
(function () {
  function log(eventName, props) {
    try {
      if (window.amplitude && amplitude.getInstance) {
        amplitude.getInstance().logEvent(eventName, props || {});
      }
    } catch (_) {}
  }

  function handleClick(e) {
    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href") || "";
    const text = (
      a.getAttribute("data-track-text") ||
      a.textContent ||
      ""
    ).trim();
    const page = location.pathname;

    if (a.hasAttribute("data-track")) {
      const name = a.getAttribute("data-track") || "click_link";
      log(name, { page, text, url: href });
      return;
    }

    if (/marketplace\.atlassian\.com/.test(href)) {
      log("click_marketplace_button", {
        page,
        text: text || "Marketplace CTA",
        url: href,
      });
      return;
    }
  }

  document.addEventListener("click", handleClick, true);
})();
