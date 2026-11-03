(function () {
  var data = window.NEPALVOTES_DATA || [];
  var UI = window.NEPALVOTES_UI || { en: {}, ne: {} };
  var lang = "en";
  try { lang = localStorage.getItem("nepalvotes-lang") || "en"; } catch (e) { lang = "en"; }
  if (lang !== "ne") { lang = "en"; }
  var level = "all";
  var year = "all";
  var query = "";

  function t(key) {
    return (UI[lang] && UI[lang][key]) || (UI.en && UI.en[key]) || key;
  }
  function pick(obj) {
    return lang === "ne" ? (obj.titleNE || obj.nameNE || "") : (obj.titleEN || obj.nameEN || "");
  }
  function partyName(p) {
    return lang === "ne" ? p.nameNE : p.nameEN;
  }
  function levelLabel(l) {
    if (l === "national") { return t("levelNational"); }
    if (l === "provincial") { return t("levelProvincial"); }
    if (l === "local") { return t("levelLocal"); }
    return t("levelAll");
  }
  function fmt(n) {
    if (n === null || n === undefined) { return t("toConfirm"); }
    return n.toLocaleString("en-US");
  }
  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function electionUrl(e) { return "elections/" + slugify(e.titleEN) + ".html"; }
  function partyArticle(p) {
    var arts = window.NEPALVOTES_ARTICLES || [];
    for (var i = 0; i < arts.length; i++) {
      if (arts[i].partyKeys && arts[i].partyKeys.indexOf(p.key) !== -1) { return arts[i]; }
    }
    return null;
  }
  function rank(e) {
    if (e.level === "provincial") { return 2; }
    if (e.level === "local") { return 3; }
    if (e.kind === "presidential") { return 1; }
    return 0;
  }
  function filtered() {
    var q = query.trim().toLowerCase();
    return data.filter(function (e) {
      if (level !== "all" && e.level !== level) { return false; }
      if (year !== "all" && String(e.year) !== year) { return false; }
      if (!q) { return true; }
      var hay = [e.titleEN, e.titleNE, String(e.year), e.outcomeEN, e.outcomeNE].join(" ").toLowerCase();
      var partyHay = e.parties.map(function (p) { return p.nameEN + " " + p.nameNE; }).join(" ").toLowerCase();
      return hay.indexOf(q) !== -1 || partyHay.indexOf(q) !== -1;
    }).sort(function (a, b) {
      if (b.year !== a.year) { return b.year - a.year; }
      return rank(a) - rank(b);
    });
  }
  function maxValue(e) {
    var vals = e.parties.map(function (p) { return (p.seats !== null && p.seats !== undefined) ? p.seats : p.votes; });
    return Math.max.apply(null, vals.concat([1]));
  }
  function renderGrid() {
    var grid = document.getElementById("grid");
    var list = filtered();
    document.getElementById("count").textContent = list.length + " " + t("results");
    if (!list.length) {
      grid.innerHTML = "";
      var empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = t("noResults");
      grid.appendChild(empty);
      return;
    }
    grid.innerHTML = "";
    list.forEach(function (e) {
      var card = document.createElement("a");
      card.className = "card link-card";
      card.href = electionUrl(e);
      var max = maxValue(e);
      var top = e.parties.slice(0, 3).map(function (p, i) {
        var val = (p.seats !== null && p.seats !== undefined) ? p.seats : p.votes;
        var pct = Math.round((val / max) * 100);
        return "<div class=\"bar-row\"><span>" + partyName(p) + "</span><strong>" + fmt(val) + "</strong>" +
          "<div class=\"bar-track\"><div class=\"bar-fill" + (i === 1 ? " alt" : "") + "\" style=\"width:" + pct + "%\"></div></div></div>";
      }).join("");
      card.innerHTML = "<div class=\"meta\"><span>" + levelLabel(e.level) + "</span><span>" + e.year + "</span></div>" +
        "<h2>" + pick(e) + "</h2>" +
        "<p>" + (lang === "ne" ? e.dateNE : e.dateEN) + "</p>" +
        "<p><span class=\"leader\">" + t("seatsLabel") + ":</span> " + (e.seats === null ? t("toConfirm") : fmt(e.seats)) +
        " | <span class=\"leader\">" + t("turnoutLabel") + ":</span> " + (e.turnout || t("toConfirm")) + "</p>" +
        "<div class=\"bars\">" + top + "</div>";
      grid.appendChild(card);
    });
  }
  function buildHistoryOptions() {
    var sel = document.getElementById("history-select");
    var map = {};
    data.forEach(function (e) {
      e.parties.forEach(function (p) {
        if (p.seats === null || p.seats === undefined) { return; }
        if (!map[p.key]) { map[p.key] = { key: p.key, nameEN: p.nameEN, nameNE: p.nameNE, rows: [] }; }
        map[p.key].rows.push({ year: e.year, titleEN: e.titleEN, titleNE: e.titleNE, level: e.level, seats: p.seats, votes: p.votes, url: electionUrl(e) });
      });
    });
    var keys = Object.keys(map).sort(function (a, b) { return map[a].nameEN.localeCompare(map[b].nameEN); });
    sel.innerHTML = "<option value=\"\">" + t("chooseParty") + "</option>" + keys.map(function (k) {
      var label = lang === "ne" ? map[k].nameNE : map[k].nameEN;
      return "<option value=\"" + k + "\">" + label + "</option>";
    }).join("");
    sel.addEventListener("change", function () { renderHistory(map, sel.value); });
    renderHistory(map, "");
  }
  function renderHistory(map, key) {
    var body = document.getElementById("history-body");
    if (!key || !map[key]) { body.innerHTML = ""; return; }
    var rows = map[key].rows.slice().sort(function (a, b) { return a.year - b.year; }).map(function (r) {
      var title = lang === "ne" ? r.titleNE : r.titleEN;
      return "<tr><td>" + r.year + "</td><td><a href=\"" + r.url + "\">" + title + "</a></td><td>" + levelLabel(r.level) + "</td><td class=\"num\">" + fmt(r.seats) + "</td><td class=\"num\">" + (r.votes === null ? t("toConfirm") : fmt(r.votes)) + "</td></tr>";
    }).join("");
    body.innerHTML = "<table><thead><tr><th>Year</th><th>Election</th><th>Level</th><th class=\"num\">" + t("seatsShort") + "</th><th class=\"num\">" + t("votesLabel") + "</th></tr></thead><tbody>" + rows + "</tbody></table>";
  }
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    var search = document.getElementById("search");
    search.placeholder = t("searchPlaceholder");
    document.getElementById("lang-en").classList.toggle("active", lang === "en");
    document.getElementById("lang-ne").classList.toggle("active", lang === "ne");
    document.querySelectorAll(".level-btn").forEach(function (b) {
      b.textContent = b.getAttribute("data-level") === "all" ? t("levelAll") : levelLabel(b.getAttribute("data-level"));
      b.classList.toggle("active", b.getAttribute("data-level") === level);
    });
    var yearSel = document.getElementById("year-select");
    var first = yearSel.querySelector("option");
    if (first) { first.textContent = t("yearAll"); }
    renderGrid();
    buildHistoryOptions();
  }
  function init() {
    var years = [];
    data.forEach(function (e) { if (years.indexOf(e.year) === -1) { years.push(e.year); } });
    years.sort(function (a, b) { return b - a; });
    var yearSel = document.getElementById("year-select");
    years.forEach(function (y) {
      var opt = document.createElement("option");
      opt.value = String(y);
      opt.textContent = String(y);
      yearSel.appendChild(opt);
    });
    document.getElementById("lang-en").addEventListener("click", function () { lang = "en"; try { localStorage.setItem("nepalvotes-lang", lang); } catch (e) {} applyLang(); });
    document.getElementById("lang-ne").addEventListener("click", function () { lang = "ne"; try { localStorage.setItem("nepalvotes-lang", lang); } catch (e) {} applyLang(); });
    document.querySelectorAll(".level-btn").forEach(function (b) {
      b.addEventListener("click", function () { level = b.getAttribute("data-level"); applyLang(); });
    });
    yearSel.addEventListener("change", function () { year = yearSel.value; renderGrid(); });
    document.getElementById("search").addEventListener("input", function (ev) { query = ev.target.value; renderGrid(); });
    applyLang();
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();
