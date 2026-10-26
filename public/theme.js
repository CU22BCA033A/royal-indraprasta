// Applies a saved light or dark theme before the page paints, so there is no flash.
// Loaded as a blocking script in <head>; kept as a file so the CSP needs no inline hashes.
(function () {
  try {
    var t = localStorage.getItem('ri-theme');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    /* storage blocked: system theme applies */
  }
})();
