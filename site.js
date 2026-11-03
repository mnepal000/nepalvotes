/* NepalVotes shared site script: language toggle that persists across pages.
   Language is stored in localStorage under nepalvotes-lang, as in v1. */
(function () {
  var lang = "en";
  try { lang = localStorage.getItem("nepalvotes-lang") || "en"; } catch (e) { lang = "en"; }
  if (lang !== "ne") { lang = "en"; }
  function apply() {
    document.body.classList.toggle("lang-ne", lang === "ne");
    document.body.classList.toggle("lang-en", lang !== "ne");
    var enBtn = document.getElementById("lang-en");
    var neBtn = document.getElementById("lang-ne");
    if (enBtn) { enBtn.classList.toggle("active", lang === "en"); }
    if (neBtn) { neBtn.classList.toggle("active", lang === "ne"); }
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
  }
  function setLang(next) {
    lang = next;
    try { localStorage.setItem("nepalvotes-lang", lang); } catch (e) {}
    apply();
    if (typeof window.NepalVotesApplyLang === "function") { window.NepalVotesApplyLang(lang); }
  }
  document.addEventListener("DOMContentLoaded", function () {
    var enBtn = document.getElementById("lang-en");
    var neBtn = document.getElementById("lang-ne");
    if (enBtn) { enBtn.addEventListener("click", function () { setLang("en"); }); }
    if (neBtn) { neBtn.addEventListener("click", function () { setLang("ne"); }); }
    apply();
  });
  apply();
})();
