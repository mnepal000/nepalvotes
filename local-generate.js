/* NepalVotes local government page generator.
   Run: node local-generate.js
   Reads local-governments.js (753 local levels, verified totals), districts.geojson
   (province per district), and local-reps.js (only verified representatives,
   contacts and websites; everything else is To confirm on the page).
   Writes local/<district>-<name>.html for all 753, plus local/index.html.
   This script is separate from generate.js because generate.js rebuilds
   elections, articles, homepage and sitemap. generate.js also adds the
   local pages to sitemap.xml and the Local governments link to navigation,
   so run generate.js after this script, then run this script again: the
   local pages use the same header, footer, styles.css?v=10 and site.js, and
   survive regeneration. Do not hand edit files under local/; edit
   local-governments.js or local-reps.js and rerun this script. */
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
var LOCALS = loadGlobal("local-governments.js", "NEPALVOTES_LOCAL_GOVERNMENTS");
var REPS = {};
try { REPS = loadGlobal("local-reps.js", "NEPALVOTES_LOCAL_REPS") || {}; } catch (e) { REPS = {}; }
var geo = JSON.parse(fs.readFileSync(path.join(DIR, "districts.geojson"), "utf8"));
var PROVINCE = {};
geo.features.forEach(function (f) { PROVINCE[f.properties.district] = f.properties.province; });
var PROVINCE_NE = { Koshi: "कोशी", Madhesh: "मधेश", Bagmati: "बागमती", Gandaki: "गण्डकी", Lumbini: "लुम्बिनी", Karnali: "कर्णाली", Sudurpashchim: "सुदूरपश्चिम" };
var TYPE_NE = { "Metropolitan City": "महानगरपालिका", "Sub-Metropolitan City": "उपमहानगरपालिका", "Municipality": "नगरपालिका", "Rural Municipality": "गाउँपालिका" };
var TYPE_SUFFIX_NE = { "Metropolitan City": "महानगरपालिका", "Sub-Metropolitan City": "उपमहानगरपालिका", "Municipality": "नगरपालिका", "Rural Municipality": "गाउँपालिका" };
function esc(s) {
  return String(s === null || s === undefined ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function bi(en, ne) { return '<span class="t-en">' + esc(en) + '</span><span class="t-ne">' + esc(ne || en) + "</span>"; }
function slug(district, name) { return slugify(district + "-" + name); }
function chrome(prefix, titleEN, titleNE, crumbs, body) {
  var nav = '<nav class="topnav" aria-label="Site">' +
    '<a href="' + prefix + 'index.html">' + bi("Home", "गृहपृष्ठ") + "</a>" +
    '<a href="' + prefix + 'elections.html">' + bi("Elections", "निर्वाचनहरू") + "</a>" +
    '<a href="' + prefix + 'articles.html">' + bi("Articles", "लेखहरू") + "</a>" +
    '<a href="' + prefix + 'map.html">' + bi("Map", "नक्सा") + "</a>" +
    '<a href="' + prefix + 'local/index.html">' + bi("Local governments", "स्थानीय सरकारहरू") + "</a>" +
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
    '<link rel="stylesheet" href="' + prefix + 'styles.css?v=10">\n</head>\n<body>\n' +
    "<header>\n<div class=\"wrap\">\n<div class=\"brand\">\n<div>\n" +
    '<h1><a href="' + prefix + 'index.html" class="brand-link">Nepal <span>Votes</span></a></h1>\n' +
    '<p class="tagline">' + bi("A digital media platform for free and fair elections in Nepal", "नेपालमा स्वतन्त्र र निष्पक्ष निर्वाचनका लागि डिजिटल मिडिया प्लेटफर्म") + "</p>\n</div>\n" +
    '<div class="lang" role="group" aria-label="Language">' +
    '<button type="button" id="lang-en">English</button>' +
    '<button type="button" id="lang-ne">नेपाली</button></div>\n</div>\n' + nav + "\n</div>\n</header>\n" +
    '<main class="wrap">\n<nav class="crumbs" aria-label="Breadcrumbs">' + crumbHtml + "</nav>\n" +
    body + "\n</main>\n" +
    '<footer><div class="wrap footer-inner"><p>' + bi("NepalVotes is an independent archive. It is not affiliated with the Election Commission of Nepal or any political party, and it carries no party logos or endorsements.", "नेपालभोट्स स्वतन्त्र अभिलेख हो। यो नेपाल निर्वाचन आयोग वा कुनै राजनीतिक दलसँग सम्बद्ध छैन र यसले कुनै दलको लोगो वा समर्थन राख्दैन।") + "</p></div></footer>\n" +
    '<script src="' + prefix + 'site.js"></script>\n</body>\n</html>\n';
}
function chiefLabel(type) { return type === "Rural Municipality" ? "Chairperson" : "Mayor"; }
function chiefLabelNE(type) { return type === "Rural Municipality" ? "अध्यक्ष" : "प्रमुख"; }
function deputyLabel(type) { return type === "Rural Municipality" ? "Vice-Chairperson" : "Deputy Mayor"; }
function deputyLabelNE(type) { return type === "Rural Municipality" ? "उपाध्यक्ष" : "उपप्रमुख"; }
function fullTypeName(name, type) { return name + " " + type; }
fs.mkdirSync(path.join(DIR, "local"), { recursive: true });
var pages = [];
var seen = {};
var unmatched = [];
var coverage = { chief: 0, deputy: 0, phone: 0, email: 0, website: 0, address: 0 };
Object.keys(LOCALS).sort().forEach(function (district) {
  var province = PROVINCE[district] || "To confirm";
  LOCALS[district].forEach(function (entry) {
    var name = entry[0], nameNE = entry[1], type = entry[2];
    var s = slug(district, name);
    if (seen[s]) { console.log("DUPLICATE SLUG: " + s); }
    seen[s] = true;
    var rep = REPS[district + "|" + name] || null;
    if (rep && !rep.chief && !rep.website && !rep.phone) { rep = null; }
    if (rep) {
      if (rep.chief) { coverage.chief++; }
      if (rep.deputy) { coverage.deputy++; }
      if (rep.phone) { coverage.phone++; }
      if (rep.email) { coverage.email++; }
      if (rep.website) { coverage.website++; }
      if (rep.address) { coverage.address++; }
    }
    var titleEN = fullTypeName(name, type);
    var titleNE = nameNE + " " + (TYPE_SUFFIX_NE[type] || type);
    var chiefHtml, deputyHtml;
    if (rep && rep.chief) {
      chiefHtml = esc(rep.chief) + (rep.chiefParty ? " (" + esc(rep.chiefParty) + ")" : " (party: To confirm)") + (rep.year ? ", elected " + rep.year : "");
    } else { chiefHtml = "To confirm"; }
    if (rep && rep.deputy) {
      deputyHtml = esc(rep.deputy) + (rep.deputyParty ? " (" + esc(rep.deputyParty) + ")" : " (party: To confirm)") + (rep.year ? ", elected " + rep.year : "");
    } else { deputyHtml = "To confirm"; }
    var websiteHtml;
    if (rep && rep.website) {
      websiteHtml = '<a href="' + esc(rep.website) + '" target="_blank" rel="noopener">' + esc(rep.website) + "</a>";
    } else { websiteHtml = "No official website verified"; }
    var srcItems = [
      '<li>Local level name, type, district and Nepali name: ritushishir/nepali-canonical, name-of-places/municipalities.json, checked against the MoFAGA local level portal in October 2026. Totals: 753 local levels, 6 metropolitan cities, 11 sub-metropolitan cities, 276 municipalities, 460 rural municipalities.</li>'
    ];
    if (rep && rep.source) { srcItems.push("<li>Elected representative, contact or website, where shown: " + esc(rep.source) + ".</li>"); }
    var body = "<h2>" + bi(titleEN, titleNE) + "</h2>" +
      '<div class="fact-strip">' +
      '<div><span class="fact-label">' + bi("Type", "प्रकार") + "</span><strong>" + bi(type, TYPE_NE[type] || type) + "</strong></div>" +
      '<div><span class="fact-label">' + bi("District", "जिल्ला") + "</span><strong>" + esc(district) + "</strong></div>" +
      '<div><span class="fact-label">' + bi("Province", "प्रदेश") + "</span><strong>" + bi(province, PROVINCE_NE[province] || province) + "</strong></div>" +
      '<div><span class="fact-label">' + bi("Nepali name", "नेपाली नाम") + "</span><strong>" + esc(nameNE) + "</strong></div></div>" +
      "<h2>" + bi("Elected representatives", "निर्वाचित प्रतिनिधिहरू") + "</h2>" +
      '<div class="table-wrap"><table><tbody>' +
      "<tr><td>" + bi(chiefLabel(type), chiefLabelNE(type)) + "</td><td>" + chiefHtml + "</td></tr>" +
      "<tr><td>" + bi(deputyLabel(type), deputyLabelNE(type)) + "</td><td>" + deputyHtml + "</td></tr>" +
      "</tbody></table></div>" +
      "<p>" + bi("Representative names shown here are those elected in 2022 where a source is given. Later by-elections and changes after 2022 are not fully covered here, so a name shown may no longer be the current holder. Where a field says To confirm, it has not been verified for this page and no name has been guessed.", "यहाँ देखाइएका प्रतिनिधिका नामहरू स्रोत दिइएको खण्डमा सन् २०२२ मा निर्वाचित भएकाहरू हुन्। सन् २०२२ पछिका उपनिर्वाचन र परिवर्तनहरू यहाँ पूर्ण रूपमा समेटिएका छैनन्, त्यसैले देखाइएको नाम हालको धारक नहुन सक्छ। जहाँ To confirm लेखिएको छ, त्यो क्षेत्र यस पृष्ठका लागि प्रमाणित भएको छैन र कुनै नाम अनुमान गरिएको छैन।") + "</p>" +
      "<h2>" + bi("Office contact", "कार्यालय सम्पर्क") + "</h2>" +
      '<div class="table-wrap"><table><tbody>' +
      "<tr><td>" + bi("Office address", "कार्यालय ठेगाना") + "</td><td>" + (rep && rep.address ? esc(rep.address) : "To confirm") + "</td></tr>" +
      "<tr><td>" + bi("Phone", "फोन") + "</td><td>" + (rep && rep.phone ? esc(rep.phone) : "To confirm") + "</td></tr>" +
      "<tr><td>" + bi("Email", "इमेल") + "</td><td>" + (rep && rep.email ? esc(rep.email) : "To confirm") + "</td></tr>" +
      "<tr><td>" + bi("Official website", "आधिकारिक वेबसाइट") + "</td><td>" + websiteHtml + "</td></tr>" +
      "</tbody></table></div>" +
      "<p>" + bi("Where no official website is verified, this page says so and does not link to a guessed domain, a social media page presented as official, or a news article as if it were the office site.", "जहाँ कुनै आधिकारिक वेबसाइट प्रमाणित भएको छैन, यो पृष्ठले त्यही भन्छ र अनुमानित डोमेन, आधिकारिक भनेर देखाइएको सामाजिक सञ्जाल पृष्ठ, वा कार्यालय साइट जस्तो समाचार लेखमा लिङ्क गर्दैन।") + "</p>" +
      "<h2>" + bi("Sources", "स्रोतहरू") + "</h2><ul>" + srcItems.join("") + "</ul>" +
      "<p><a href=\"index.html\">" + bi("All local governments", "सबै स्थानीय सरकारहरू") + "</a> | <a href=\"../map.html\">" + bi("Constituency map", "निर्वाचन क्षेत्र नक्सा") + "</a> | <a href=\"../elections/2022-local-elections.html\">" + bi("2022 local elections", "सन् २०२२ को स्थानीय निर्वाचन") + "</a></p>";
    pages.push({ district: district, province: province, name: name, nameNE: nameNE, type: type, slug: s, file: s + ".html", titleEN: titleEN, titleNE: titleNE });
    fs.writeFileSync(path.join(DIR, "local", s + ".html"), chrome("../", titleEN, titleNE,
      [{ en: "Home", ne: "गृहपृष्ठ", href: "../index.html" }, { en: "Local governments", ne: "स्थानीय सरकारहरू", href: "index.html" }, { en: titleEN, ne: titleNE }], body));
  });
});
Object.keys(REPS).forEach(function (k) {
  var parts = k.split("|");
  var list = LOCALS[parts[0]] || [];
  var found = list.some(function (e) { return e[0] === parts[1]; });
  if (!found) { unmatched.push(k); }
});
fs.mkdirSync(path.join(DIR, "local"), { recursive: true });
var provinces = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];
var indexBody = "<h2>" + bi("Local governments", "स्थानीय सरकारहरू") + "</h2>" +
  "<p>" + bi("All 753 local governments of Nepal, grouped by province and district. Click a name to open its individual page, with its elected representatives, office contact and official website where verified, and To confirm where not verified.", "नेपालका सबै ७५३ स्थानीय सरकारहरू, प्रदेश र जिल्ला अनुसार। नाममा क्लिक गरेर त्यसको छुट्टै पृष्ठ खोल्नुहोस्, जहाँ प्रमाणित भएमा निर्वाचित प्रतिनिधि, कार्यालय सम्पर्क र आधिकारिक वेबसाइट छन्, र प्रमाणित नभएमा To confirm लेखिएको छ।") + "</p>" +
  '<p><input type="search" id="local-search" placeholder="Search a local government, for example Kathmandu, Pokhara, or Gajuri" aria-label="Search local governments"></p>' +
  '<p><label>Filter by type: <select id="local-type"><option value="">All types</option><option value="Metropolitan City">Metropolitan City</option><option value="Sub-Metropolitan City">Sub-Metropolitan City</option><option value="Municipality">Municipality</option><option value="Rural Municipality">Rural Municipality</option></select></label> ' +
  '<label>Filter by district: <select id="local-district"><option value="">All districts</option>' +
  Object.keys(LOCALS).sort().map(function (d) { return '<option value="' + esc(d) + '">' + esc(d) + "</option>"; }).join("") + "</select></p>" +
  '<p><span id="local-count">753 local governments</span></p>';
provinces.forEach(function (prov) {
  var districts = Object.keys(LOCALS).filter(function (d) { return PROVINCE[d] === prov; }).sort();
  if (!districts.length) { return; }
  indexBody += '<section class="local-province" data-province="' + esc(prov) + '"><h3>' + bi(prov, PROVINCE_NE[prov] || prov) + "</h3>";
  districts.forEach(function (d) {
    indexBody += '<div class="local-district" data-district="' + esc(d) + '"><h4>' + esc(d) + " District</h4><ul>";
    pages.filter(function (p) { return p.district === d; }).forEach(function (p) {
      indexBody += '<li class="local-card" data-name="' + esc(p.name.toLowerCase()) + '" data-type="' + esc(p.type) + '" data-district="' + esc(d) + '"><a href="' + p.file + '">' + bi(p.titleEN, p.titleNE) + "</a></li>";
    });
    indexBody += "</ul></div>";
  });
  indexBody += "</section>";
});
indexBody += '<script>document.getElementById("local-search").addEventListener("input",filterLocal);document.getElementById("local-type").addEventListener("change",filterLocal);document.getElementById("local-district").addEventListener("change",filterLocal);function filterLocal(){var q=document.getElementById("local-search").value.trim().toLowerCase();var t=document.getElementById("local-type").value;var d=document.getElementById("local-district").value;var n=0;document.querySelectorAll(".local-card").forEach(function(c){var ok=(!q||c.textContent.toLowerCase().indexOf(q)!==-1)&&(!t||c.getAttribute("data-type")===t)&&(!d||c.getAttribute("data-district")===d);c.style.display=ok?"":"none";if(ok){n++;}});document.querySelectorAll(".local-district").forEach(function(sec){var vis=sec.querySelectorAll(".local-card:not([style*=none])").length;sec.style.display=vis?"":"none";});document.getElementById("local-count").textContent=n+" local governments shown";}</script>';
fs.writeFileSync(path.join(DIR, "local", "index.html"), chrome("../", "Local governments", "स्थानीय सरकारहरू",
  [{ en: "Home", ne: "गृहपृष्ठ", href: "../index.html" }, { en: "Local governments", ne: "स्थानीय सरकारहरू" }], indexBody));
console.log("Local pages: " + pages.length);
console.log("Coverage: chief " + coverage.chief + ", deputy " + coverage.deputy + ", phone " + coverage.phone + ", email " + coverage.email + ", website " + coverage.website + ", address " + coverage.address);
console.log("Unmatched rep entries: " + (unmatched.length ? unmatched.join(", ") : "none"));
console.log("Slugs unique: " + Object.keys(seen).length);
