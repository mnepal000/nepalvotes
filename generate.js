/* NepalVotes generator: builds the multi-page static site from data.js and
   articles.js. Source of truth is data.js (v1 election numbers, untouched) and
   articles.js (encyclopedia articles). Run: node generate.js
   Generated pages are written into this folder and work when served statically.
   Do not hand edit generated pages; edit data.js or articles.js and rerun.
   Exception: map.html is hand maintained (it needs Leaflet and its own
   scripts), but its link is in the generated navigation, homepage and
   elections index, so it is not orphaned. See README.md. */
var fs = require("fs");
var path = require("path");
var vm = require("vm");
var DIR = __dirname;

function loadGlobal(file, key) {
  var code = fs.readFileSync(path.join(DIR, file), "utf8");
  var sandbox = { window: {}, console: console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window[key];
}
var DATA = loadGlobal("data.js", "NEPALVOTES_DATA");
var UI = loadGlobal("data.js", "NEPALVOTES_UI");
var ARTICLES = [];
if (fs.existsSync(path.join(DIR, "articles.js"))) {
  ARTICLES = ARTICLES.concat(loadGlobal("articles.js", "NEPALVOTES_ARTICLES") || []);
}
if (fs.existsSync(path.join(DIR, "articles-parties.js"))) {
  ARTICLES = ARTICLES.concat(loadGlobal("articles-parties.js", "NEPALVOTES_ARTICLES_PARTIES") || []);
}
if (fs.existsSync(path.join(DIR, "articles-systems.js"))) {
  ARTICLES = ARTICLES.concat(loadGlobal("articles-systems.js", "NEPALVOTES_ARTICLES_SYSTEMS") || []);
}

function esc(s) {
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function fmt(n) {
  if (n === null || n === undefined) { return "To confirm"; }
  return n.toLocaleString("en-US");
}
function bi(en, ne) {
  return '<span class="t-en">' + esc(en) + "</span><span class=\"t-ne\">" + esc(ne || en) + "</span>";
}
function levelLabelEN(l) {
  return l === "national" ? "National" : l === "provincial" ? "Provincial" : "Local";
}
function levelLabelNE(l) {
  return l === "national" ? "राष्ट्रिय" : l === "provincial" ? "प्रदेश" : "स्थानीय";
}
function catLabelEN(c) {
  return c === "parties" ? "Parties" : c === "systems" ? "Systems and institutions" : c === "eras" ? "Eras and concepts" : "Glossary";
}
function catLabelNE(c) {
  return c === "parties" ? "दलहरू" : c === "systems" ? "प्रणाली र संस्थाहरू" : c === "eras" ? "युग र अवधारणाहरू" : "शब्दावली";
}
function electionSlug(e) { return slugify(e.titleEN); }
function electionUrl(e) { return "elections/" + electionSlug(e) + ".html"; }
function articleUrl(a) { return a.category + "/" + a.id + ".html"; }

var SOURCES = {
  "nat-1959": [{ label: "1959 general election", url: "https://en.wikipedia.org/wiki/1959_Nepalese_general_election" }],
  "nat-1981": [{ label: "1981 Rastriya Panchayat election", url: "https://en.wikipedia.org/wiki/1981_Nepalese_Rastriya_Panchayat_election" }],
  "nat-1986": [{ label: "1986 Rastriya Panchayat election", url: "https://en.wikipedia.org/wiki/1986_Nepalese_general_election" }],
  "nat-1991": [{ label: "1991 general election", url: "https://en.wikipedia.org/wiki/1991_Nepalese_general_election" }],
  "nat-1994": [{ label: "1994 general election", url: "https://en.wikipedia.org/wiki/1994_Nepalese_general_election" }],
  "nat-1999": [{ label: "1999 general election", url: "https://en.wikipedia.org/wiki/1999_Nepalese_general_election" }],
  "nat-2008": [
    { label: "2008 Constituent Assembly election", url: "https://en.wikipedia.org/wiki/Nepalese_Constituent_Assembly_election,_2008" },
    { label: "IPU Parline 2008", url: "https://data.ipu.org/election-summary/HTML/2386_08.htm" }
  ],
  "nat-2013": [
    { label: "2013 Constituent Assembly election", url: "https://en.wikipedia.org/wiki/Nepalese_Constituent_Assembly_election,_2013" },
    { label: "IPU Parline 2013", url: "https://data.ipu.org/election-summary/HTML/2386_13.htm" }
  ],
  "nat-2017": [{ label: "2017 general election", url: "https://en.wikipedia.org/wiki/2017_Nepalese_general_election" }],
  "nat-2022": [
    { label: "2022 general election", url: "https://en.wikipedia.org/wiki/2022_Nepalese_general_election" },
    { label: "IPU Parline 2022", url: "https://data.ipu.org/parliament/NP/NP-LC01/election/NP-LC01-E20221120/" }
  ],
  "nat-2026": [
    { label: "2026 general election", url: "https://en.wikipedia.org/wiki/2026_Nepalese_general_election" },
    { label: "UK Parliament Commons Library, Nepal 2026", url: "https://commonslibrary.parliament.uk/research-briefings/cbp-10622/" }
  ],
  "pres-2008": [{ label: "2008 presidential election", url: "https://en.wikipedia.org/wiki/2008_Nepalese_presidential_election" }],
  "pres-2015": [{ label: "2015 presidential election", url: "https://en.wikipedia.org/wiki/2015_Nepalese_presidential_election" }],
  "pres-2018": [{ label: "2018 presidential election", url: "https://en.wikipedia.org/wiki/2018_Nepalese_presidential_election" }],
  "pres-2023": [{ label: "2023 presidential election", url: "https://en.wikipedia.org/wiki/2023_Nepalese_presidential_election" }],
  "prov-2017": [{ label: "2017 provincial elections", url: "https://en.wikipedia.org/wiki/2017_Nepalese_provincial_elections" }],
  "prov-2022": [{ label: "2022 provincial elections", url: "https://en.wikipedia.org/wiki/2022_Nepalese_provincial_elections" }],
  "local-2017": [{ label: "2017 local elections", url: "https://en.wikipedia.org/wiki/Nepalese_local_elections,_2017" }],
  "local-2022": [{ label: "2022 local elections", url: "https://en.wikipedia.org/wiki/2022_Nepalese_local_elections" }]
};

function chrome(prefix, titleEN, titleNE, crumbs, body, scripts) {
  var nav = '<nav class="topnav" aria-label="Site">' +
    '<a href="' + prefix + 'index.html">' + bi("Home", "गृहपृष्ठ") + "</a>" +
    '<a href="' + prefix + 'elections.html">' + bi("Elections", "निर्वाचनहरू") + "</a>" +
    '<a href="' + prefix + 'articles.html">' + bi("Articles", "लेखहरू") + "</a>" +
    '<a href="' + prefix + 'map.html">' + bi("Map", "नक्सा") + "</a>" +
    '<a href="' + prefix + 'search.html">' + bi("Search", "खोज्नुहोस्") + "</a></nav>";
  var crumbHtml = crumbs.map(function (c, i) {
    var sep = i ? " / " : "";
    if (c.href) { return sep + '<a href="' + c.href + '">' + bi(c.en, c.ne) + "</a>"; }
    return sep + "<span>" + bi(c.en, c.ne) + "</span>";
  }).join("");
  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n" +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    "<title>" + esc(titleEN) + " | NepalVotes</title>\n" +
    '<meta name="description" content="' + esc(titleEN) + '">\n' +
    '<meta name="theme-color" content="#14365e">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&family=Mukta:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@600;700&display=swap" rel="stylesheet">\n' +
    '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">\n' +
    '<link rel="stylesheet" href="' + prefix + 'styles.css?v=8">\n</head>\n<body>\n' +
    "<header>\n<div class=\"wrap\">\n<div class=\"brand\">\n<div>\n" +
    '<h1><a href="' + prefix + 'index.html" class="brand-link">Nepal <span>Votes</span></a></h1>\n' +
    '<p class="tagline">' + bi(UI.en.tagline, UI.ne.tagline) + "</p>\n</div>\n" +
    '<div class="lang" role="group" aria-label="Language">' +
    '<button type="button" id="lang-en">English</button>' +
    '<button type="button" id="lang-ne">नेपाली</button></div>\n</div>\n' + nav + "\n</div>\n</header>\n" +
    '<main class="wrap">\n<nav class="crumbs" aria-label="Breadcrumbs">' + crumbHtml + "</nav>\n" +
    body + "\n</main>\n" +
    '<footer><div class="wrap footer-inner"><p>' + bi(UI.en.footerNote, UI.ne.footerNote) + "</p>" +
    "<p>" + bi("NepalVotes is an independent archive. It is not affiliated with the Election Commission of Nepal or any political party, and it carries no party logos or endorsements.",
      "नेपालभोट्स स्वतन्त्र अभिलेख हो। यो नेपाल निर्वाचन आयोग वा कुनै राजनीतिक दलसँग सम्बद्ध छैन र यसले कुनै दलको लोगो वा समर्थन राख्दैन।") + "</p></div></footer>\n" +
    '<script src="' + prefix + 'site.js"></script>\n' + (scripts || "") + "\n</body>\n</html>\n";
}

function articleById(id) { return ARTICLES.filter(function (a) { return a.id === id; })[0]; }
function electionById(id) { return DATA.filter(function (e) { return e.id === id; })[0]; }
function relatedArticlesForElection(e) {
  var keys = e.parties.map(function (p) { return p.key; });
  return ARTICLES.filter(function (a) {
    if (a.partyKeys && a.partyKeys.some(function (k) { return keys.indexOf(k) !== -1; })) { return true; }
    if (a.relatedElections && a.relatedElections.indexOf(e.id) !== -1) { return true; }
    return false;
  });
}
function relatedElectionsForArticle(a) {
  var ids = [];
  if (a.relatedElections) { ids = ids.concat(a.relatedElections); }
  if (a.partyKeys) {
    DATA.forEach(function (e) {
      if (e.parties.some(function (p) { return a.partyKeys.indexOf(p.key) !== -1; })) { ids.push(e.id); }
    });
  }
  var seen = {};
  return ids.filter(function (id) { if (seen[id]) { return false; } seen[id] = true; return !!electionById(id); });
}

function electionPage(e) {
  var prefix = "../";
  var rows = e.parties.slice().sort(function (a, b) {
    var av = (a.seats !== null && a.seats !== undefined) ? a.seats : a.votes || 0;
    var bv = (b.seats !== null && b.seats !== undefined) ? b.seats : b.votes || 0;
    return bv - av;
  }).map(function (p) {
    var partyArticle = ARTICLES.filter(function (a) { return a.partyKeys && a.partyKeys.indexOf(p.key) !== -1; })[0];
    var name = '<span class="t-en">' + esc(p.nameEN) + '</span><span class="t-ne">' + esc(p.nameNE) + "</span>";
    if (partyArticle) { name = '<a href="../' + articleUrl(partyArticle) + '">' + name + "</a>"; }
    return "<tr><td>" + name + "</td><td class=\"num\">" + (p.votes === null ? "To confirm" : fmt(p.votes)) +
      "</td><td class=\"num\">" + (p.pct === null ? "To confirm" : p.pct.toFixed(2) + "%") +
      "</td><td class=\"num\">" + (p.seats === null ? "To confirm" : fmt(p.seats)) + "</td></tr>";
  }).join("");
  var related = relatedArticlesForElection(e);
  var relHtml = related.length ? "<h2>" + bi("Related articles", "सम्बन्धित लेखहरू") + "</h2><ul>" +
    related.map(function (a) { return '<li><a href="../' + articleUrl(a) + '">' + bi(a.titleEN, a.titleNE) + "</a></li>"; }).join("") + "</ul>" : "";
  var note = "";
  if (e.kind === "local") { note = "<p>" + bi(UI.en.localNote, UI.ne.localNote) + "</p>"; }
  if (e.kind === "presidential") { note = "<p>" + bi(UI.en.presNote, UI.ne.presNote) + "</p>"; }
  var src = SOURCES[e.id] || [];
  var srcHtml = src.length ? "<h2>" + bi("Sources", "स्रोतहरू") + "</h2><ul>" +
    src.map(function (s) { return '<li><a href="' + s.url + '">' + esc(s.label) + "</a></li>"; }).join("") + "</ul>" : "";
  var body = "<h2>" + bi(e.titleEN, e.titleNE) + "</h2>" +
    '<div class="fact-strip">' +
    '<div><span class="fact-label">' + bi("Date", "मिति") + "</span><strong>" + bi(e.dateEN, e.dateNE) + "</strong></div>" +
    '<div><span class="fact-label">' + bi("Level", "तह") + "</span><strong>" + bi(levelLabelEN(e.level), levelLabelNE(e.level)) + "</strong></div>" +
    '<div><span class="fact-label">' + bi("Seats", "सिट") + "</span><strong>" + (e.seats === null ? "To confirm" : fmt(e.seats)) + "</strong></div>" +
    '<div><span class="fact-label">' + bi("Turnout", "मतदान प्रतिशत") + "</span><strong>" + (e.turnout || "To confirm") + "</strong></div>" +
    '<div><span class="fact-label">' + bi("System", "प्रणाली") + "</span><strong>" + bi(e.systemEN, e.systemNE) + "</strong></div></div>" +
    '<p class="outcome">' + bi(e.outcomeEN, e.outcomeNE) + "</p>" +
    "<p>" + bi(e.contextEN, e.contextNE) + "</p>" + note +
    "<h2>" + bi("Top parties", "मुख्य दल") + "</h2>" +
    '<div class="table-wrap"><table><thead><tr><th>' + bi("Party", "दल") + '</th><th class="num">' + bi("Votes", "मत") +
    '</th><th class="num">' + bi("Vote share", "मत प्रतिशत") + '</th><th class="num">' + bi("Seats", "सिट") +
    "</th></tr></thead><tbody>" + rows + "</tbody></table></div>" + relHtml + srcHtml;
  return chrome(prefix, e.titleEN, e.titleNE,
    [{ en: "Home", ne: "गृहपृष्ठ", href: "../index.html" }, { en: "Elections", ne: "निर्वाचनहरू", href: "../elections.html" }, { en: e.titleEN, ne: e.titleNE }],
    body, "");
}

function articlePage(a) {
  var prefix = "../";
  var facts = (a.facts || []).map(function (f) {
    return "<tr><td>" + bi(f.labelEN, f.labelNE) + "</td><td>" + bi(f.valueEN, f.valueNE) + "</td></tr>";
  }).join("");
  var factsHtml = facts ? "<h2>" + bi("Key facts", "मुख्य तथ्यहरू") + "</h2>" + '<div class="table-wrap"><table><tbody>' + facts + "</tbody></table></div>" : "";
  var bodyParas = (a.bodyEN || []).map(function (p, i) {
    var ne = (a.bodyNE || [])[i];
    return "<p>" + bi(p, ne || p) + "</p>";
  }).join("");
  var srcHtml = (a.sources || []).length ? "<h2>" + bi("Sources and further reading", "स्रोत र थप पठन") + "</h2><ul>" +
    a.sources.map(function (s) { return '<li><a href="' + s.url + '">' + esc(s.label) + "</a></li>"; }).join("") + "</ul>" : "";
  var relArticles = (a.related || []).map(articleById).filter(Boolean);
  var relElections = relatedElectionsForArticle(a).map(electionById);
  var seeHtml = "";
  if (relArticles.length || relElections.length) {
    seeHtml = "<h2>" + bi("See also", "यो पनि हेर्नुहोस्") + "</h2><ul>" +
      relArticles.map(function (r) { return '<li><a href="../' + articleUrl(r) + '">' + bi(r.titleEN, r.titleNE) + "</a></li>"; }).join("") +
      relElections.map(function (e) { return '<li><a href="../' + electionUrl(e) + '">' + bi(e.titleEN, e.titleNE) + "</a></li>"; }).join("") + "</ul>";
  }
  var body = "<h2>" + bi(a.titleEN, a.titleNE) + "</h2>" +
    "<p class=\"article-cat\">" + bi(catLabelEN(a.category), catLabelNE(a.category)) + "</p>" +
    "<p class=\"summary\">" + bi(a.summaryEN, a.summaryNE) + "</p>" + factsHtml + '<div class="article-body">' + bodyParas + "</div>" + srcHtml + seeHtml;
  return chrome(prefix, a.titleEN, a.titleNE,
    [{ en: "Home", ne: "गृहपृष्ठ", href: "../index.html" }, { en: "Articles", ne: "लेखहरू", href: "../articles.html" }, { en: a.titleEN, ne: a.titleNE }],
    body, "");
}

function cardList(items, prefix) {
  return items.map(function (it) {
    return '<a class="card link-card" href="' + prefix + it.url + '"><div class="meta"><span>' + bi(it.metaEN, it.metaNE) + "</span><span>" + esc(it.year || "") + "</span></div>" +
      "<h2>" + bi(it.titleEN, it.titleNE) + "</h2><p>" + bi(it.summaryEN, it.summaryNE) + "</p></a>";
  }).join("\n");
}

function main() {
  var sorted = DATA.slice().sort(function (a, b) { return b.year - a.year; });
  // Election pages
  fs.mkdirSync(path.join(DIR, "elections"), { recursive: true });
  sorted.forEach(function (e) {
    fs.writeFileSync(path.join(DIR, "elections", electionSlug(e) + ".html"), electionPage(e));
  });
  // Article pages
  ["parties", "systems", "eras", "glossary"].forEach(function (c) { fs.mkdirSync(path.join(DIR, c), { recursive: true }); });
  ARTICLES.forEach(function (a) {
    fs.writeFileSync(path.join(DIR, a.category, a.id + ".html"), articlePage(a));
  });
  // Elections index
  var byLevel = {};
  sorted.forEach(function (e) { (byLevel[e.level] = byLevel[e.level] || []).push(e); });
  var electionsBody = "<h2>" + bi("All elections", "सबै निर्वाचनहरू") + "</h2>" +
    '<p><a href="map.html">' + bi("Interactive map of all 165 constituencies", "सबै १६५ निर्वाचन क्षेत्रहरूको अन्तरक्रियात्मक नक्सा") + "</a></p>" +
    ["national", "provincial", "local"].map(function (lvl) {
      var items = (byLevel[lvl] || []).map(function (e) {
        return { url: electionUrl(e), titleEN: e.titleEN, titleNE: e.titleNE, summaryEN: e.outcomeEN, summaryNE: e.outcomeNE, metaEN: levelLabelEN(lvl), metaNE: levelLabelNE(lvl), year: e.year };
      });
      return "<h3>" + bi(levelLabelEN(lvl), levelLabelNE(lvl)) + "</h3><div class=\"grid\">" + cardList(items, "") + "</div>";
    }).join("");
  fs.writeFileSync(path.join(DIR, "elections.html"), chrome("", "Elections", "निर्वाचनहरू",
    [{ en: "Home", ne: "गृहपृष्ठ", href: "index.html" }, { en: "Elections", ne: "निर्वाचनहरू" }], electionsBody, ""));
  // Articles index
  var cats = ["parties", "systems", "eras", "glossary"];
  var articlesBody = "<h2>" + bi("Articles", "लेखहरू") + "</h2>" +
    '<p><input type="search" id="article-search" placeholder="Search articles" aria-label="Search articles"></p>' +
    cats.map(function (c) {
      var items = ARTICLES.filter(function (a) { return a.category === c; }).map(function (a) {
        return { url: articleUrl(a), titleEN: a.titleEN, titleNE: a.titleNE, summaryEN: a.summaryEN, summaryNE: a.summaryNE, metaEN: catLabelEN(c), metaNE: catLabelNE(c), year: "" };
      });
      if (!items.length) { return ""; }
      return "<h3>" + bi(catLabelEN(c), catLabelNE(c)) + "</h3><div class=\"grid article-grid\">" + cardList(items, "") + "</div>";
    }).join("") +
    '<script>document.getElementById("article-search").addEventListener("input",function(ev){var q=ev.target.value.trim().toLowerCase();document.querySelectorAll(".article-grid .link-card").forEach(function(card){card.style.display=!q||card.textContent.toLowerCase().indexOf(q)!==-1?"":"none";});});</script>';
  fs.writeFileSync(path.join(DIR, "articles.html"), chrome("", "Articles", "लेखहरू",
    [{ en: "Home", ne: "गृहपृष्ठ", href: "index.html" }, { en: "Articles", ne: "लेखहरू" }], articlesBody, ""));
  // Search page: static list of every page
  var allItems = sorted.map(function (e) {
    return { url: electionUrl(e), titleEN: e.titleEN, titleNE: e.titleNE, summaryEN: e.outcomeEN, summaryNE: e.outcomeNE, metaEN: "Election", metaNE: "निर्वाचन" };
  }).concat(ARTICLES.map(function (a) {
    return { url: articleUrl(a), titleEN: a.titleEN, titleNE: a.titleNE, summaryEN: a.summaryEN, summaryNE: a.summaryNE, metaEN: catLabelEN(a.category), metaNE: catLabelNE(a.category) };
  }));
  var searchBody = "<h2>" + bi("Search all pages", "सबै पृष्ठ खोज्नुहोस्") + "</h2>" +
    '<p><input type="search" id="site-search" placeholder="Search elections and articles" aria-label="Search all pages"></p>' +
    '<div class="grid" id="search-grid">' + cardList(allItems, "") + "</div>" +
    '<script>document.getElementById("site-search").addEventListener("input",function(ev){var q=ev.target.value.trim().toLowerCase();document.querySelectorAll("#search-grid .link-card").forEach(function(card){card.style.display=!q||card.textContent.toLowerCase().indexOf(q)!==-1?"":"none";});});</script>';
  fs.writeFileSync(path.join(DIR, "search.html"), chrome("", "Search", "खोज्नुहोस्",
    [{ en: "Home", ne: "गृहपृष्ठ", href: "index.html" }, { en: "Search", ne: "खोज्नुहोस्" }], searchBody, ""));
  // Homepage: keep v1 controls and grid, but add article and navigation links.
  // The homepage body is assembled here so its links always match generated pages.
  var articlePreview = ARTICLES.slice(0, 6).map(function (a) {
    return { url: articleUrl(a), titleEN: a.titleEN, titleNE: a.titleNE, summaryEN: a.summaryEN, summaryNE: a.summaryNE, metaEN: catLabelEN(a.category), metaNE: catLabelNE(a.category), year: "" };
  });
  var latest = sorted[0];
  var heroBody = '<section class="hero"><p class="kicker">' + bi("Encyclopedia of elections in Nepal", "नेपालका निर्वाचनहरूको विश्वकोश") + "</p>" +
    "<h2>" + bi("Nepal Votes", "नेपाल भोट्स") + "</h2>" +
    "<p>" + bi(UI.en.tagline, UI.ne.tagline) + "</p>" +
    '<div class="stats">' +
    '<div class="stat"><strong>' + sorted.length + "</strong><span>" + bi("Elections", "निर्वाचनहरू") + "</span></div>" +
    '<div class="stat"><strong>' + ARTICLES.length + "</strong><span>" + bi("Articles", "लेखहरू") + "</span></div>" +
    '<div class="stat"><strong>3</strong><span>' + bi("Levels: national, provincial, local", "तह: राष्ट्रिय, प्रदेश, स्थानीय") + "</span></div>" +
    '<div class="stat"><strong>1959</strong><span>' + bi("First election to today", "पहिलो निर्वाचनदेखि आजसम्म") + "</span></div></div></section>";
  var featureBody = latest ? '<section class="feature"><div><p class="kicker">' + bi("Latest election", "पछिल्लो निर्वाचन") + "</p>" +
    "<h2><a href=\"" + electionUrl(latest) + "\">" + bi(latest.titleEN, latest.titleNE) + "</a></h2>" +
    '<p class="meta-line">' + bi(latest.dateEN, latest.dateNE) + " | " + bi(levelLabelEN(latest.level), levelLabelNE(latest.level)) + " | " + (latest.seats === null ? "To confirm" : fmt(latest.seats)) + " " + bi("seats", "सिट") + "</p>" +
    "<p>" + bi(latest.outcomeEN, latest.outcomeNE) + "</p></div>" +
    '<a class="btn" href="' + electionUrl(latest) + '">' + bi("View election", "निर्वाचन हेर्नुहोस्") + "</a></section>" : "";
  var mapSection = '<section class="map-section" aria-label="Constituency map"><h2>' + bi("Explore constituencies on the map", "नक्सामा निर्वाचन क्षेत्रहरू हेर्नुहोस्") + "</h2>" +
    "<p>" + bi("All 165 federal constituencies, by province and district. Click a district to see its constituencies.", "सबै १६५ सङ्घीय निर्वाचन क्षेत्रहरू, प्रदेश र जिल्ला अनुसार। जिल्लामा क्लिक गरेर त्यसका निर्वाचन क्षेत्रहरू हेर्नुहोस्।") + "</p>" +
    '<div class="sources map-note"><p><span class="t-en">This map shows district boundaries, NOT exact constituency polygons. No verified open file of all 165 constituency polygons was found for this build, so constituency boundaries inside a district are not drawn and are not guessed. This is a polygon map with no base map, so there are no roads, place labels, or neighbouring country labels. Only Nepal is shown, on a blank background. Click a district to also see its local governments: the count, the breakdown by type, and their names. Local level data: 753 local levels in total, 6 metropolitan cities, 11 sub-metropolitan cities, 276 municipalities, 460 rural municipalities, from nepali-canonical, checked against the MoFAGA local level portal.</span>' +
    '<span class="t-ne">यो नक्साले जिल्ला सीमाहरू देखाउँछ, निर्वाचन क्षेत्रका ठ्याक्कै सीमाहरू होइन। सबै १६५ निर्वाचन क्षेत्रका प्रमाणित खुला फाइल भेटिएन, त्यसैले जिल्लाभित्रका निर्वाचन क्षेत्र सीमाहरू कोरिएका छैनन् र अनुमान गरिएका छैनन्। यो आधार नक्सा बिनाको बहुभुज नक्सा हो, त्यसैले यहाँ सडक, स्थान लेबल वा छिमेकी देशका लेबल छैनन्। खाली पृष्ठभूमिमा नेपाल मात्र देखाइएको छ। जिल्लामा क्लिक गर्दा त्यसका स्थानीय सरकारहरू पनि देखिन्छन्: सङ्ख्या, प्रकार अनुसारको विवरण र तिनका नामहरू। स्थानीय तहको डाटा: कुल ७५३ स्थानीय तह, ६ महानगरपालिका, ११ उपमहानगरपालिका, २७६ नगरपालिका, ४६० गाउँपालिका, nepali-canonical बाट, MoFAGA स्थानीय तह पोर्टलसँग जाँच गरिएको।</span></p></div>' +
    '<div id="home-map" aria-label="Interactive map of Nepal districts"></div>' +
    '<div class="province-legend" aria-label="Province colours"><span><i style="background:#2f6f8f"></i>Koshi (कोशी)</span><span><i style="background:#b5651d"></i>Madhesh (मधेश)</span><span><i style="background:#5b7a3a"></i>Bagmati (बागमती)</span><span><i style="background:#7a5c9e"></i>Gandaki (गण्डकी)</span><span><i style="background:#a41222"></i>Lumbini (लुम्बिनी)</span><span><i style="background:#2a7f7f"></i>Karnali (कर्णाली)</span><span><i style="background:#3a5a8c"></i>Sudurpashchim (सुदूरपश्चिम)</span></div>' +
    '<div id="home-map-detail" class="map-panel"><p><span class="t-en">Click a district on the map to see its constituencies and its local governments.</span><span class="t-ne">नक्सामा जिल्लामा क्लिक गरेर त्यसका निर्वाचन क्षेत्रहरू र स्थानीय सरकारहरू हेर्नुहोस्।</span></p></div>' +
    '<p><a class="btn" href="map.html">' + bi("Open the full map", "पूर्ण नक्सा खोल्नुहोस्") + "</a></p></section>";
  var homeBody = heroBody + featureBody + mapSection + '<p class="intro" data-i18n="intro">' + esc(UI.en.intro) + "</p>" +
    '<section class="controls" aria-label="Search and filters">' +
    '<input type="search" id="search" placeholder="Search a party or an election, for example Congress, UML, or 2022" aria-label="Search">' +
    '<div class="filters">' +
    '<button type="button" class="level-btn active" data-level="all">All levels</button>' +
    '<button type="button" class="level-btn" data-level="national">National</button>' +
    '<button type="button" class="level-btn" data-level="provincial">Provincial</button>' +
    '<button type="button" class="level-btn" data-level="local">Local</button>' +
    '<select id="year-select" aria-label="Year"><option value="all">All years</option></select>' +
    '<span class="count" id="count"></span></div></section>' +
    '<section id="grid" class="grid" aria-live="polite"></section>' +
    '<p><a href="elections.html">' + bi("See all elections", "सबै निर्वाचनहरू हेर्नुहोस्") + "</a> | " +
    '<a href="articles.html">' + bi("Browse encyclopedia articles", "विश्वकोश लेखहरू हेर्नुहोस्") + "</a> | " +
    '<a href="map.html">' + bi("Interactive map of constituencies", "निर्वाचन क्षेत्रहरूको अन्तरक्रियात्मक नक्सा") + "</a> | " +
    '<a href="search.html">' + bi("Search all pages", "सबै पृष्ठ खोज्नुहोस्") + "</a></p>" +
    (articlePreview.length ? "<section><h2>" + bi("Encyclopedia articles", "विश्वकोश लेखहरू") + "</h2><div class=\"grid\">" + cardList(articlePreview, "") + "</div><p><a href=\"articles.html\">" + bi("See all articles", "सबै लेखहरू हेर्नुहोस्") + "</a></p></section>" : "") +
    '<section class="history" aria-label="Party history"><h2 data-i18n="partyHistory">' + esc(UI.en.partyHistory) + "</h2>" +
    '<p data-i18n="partyHistoryHint">' + esc(UI.en.partyHistoryHint) + '</p>' +
    '<select id="history-select" aria-label="Choose a party"></select><div id="history-body"></div></section>' +
    '<section class="sources" aria-label="Sources"><h2 data-i18n="sourcesTitle">' + esc(UI.en.sourcesTitle) + "</h2>" +
    '<p data-i18n="sourcesIntro">' + esc(UI.en.sourcesIntro) + "</p>" +
    "<p>" + bi("Each election page also lists its own sources.", "प्रत्येक निर्वाचन पृष्ठमा त्यसका आफ्नै स्रोतहरू पनि दिइएका छन्।") + "</p></section>";
  fs.writeFileSync(path.join(DIR, "index.html"), chrome("", "Nepal Votes", "नेपाल भोट्स",
    [{ en: "Home", ne: "गृहपृष्ठ" }], homeBody,
    '<script src="data.js"></script>\n<script src="articles.js"></script>\n<script src="app.js"></script>\n<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\n<script src="constituencies.js?v=8"></script>\n<script src="local-governments.js?v=8"></script>\n<script src="home-map.js?v=8"></script>'));
  // Sitemap
  var urls = ["index.html", "elections.html", "articles.html", "map.html", "search.html"]
    .concat(sorted.map(electionUrl))
    .concat(ARTICLES.map(articleUrl));
  var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(function (u) { return "  <url><loc>https://nepalvotes.com/" + u + "</loc></url>"; }).join("\n") + "\n</urlset>\n";
  fs.writeFileSync(path.join(DIR, "sitemap.xml"), sitemap);
  console.log("Elections: " + sorted.length + ", Articles: " + ARTICLES.length + ", Pages: " + urls.length);
  console.log(urls.join("\n"));
}
main();
