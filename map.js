/* NepalVotes constituency map.
   Map polygons are district boundaries only, not constituency polygons.
   See map.html for the full honesty note and sources. Constituency
   data comes from constituencies.js. No winner is shown anywhere here;
   winner is always To confirm. */
(function () {
  var PROVINCES = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];
  var PROVINCE_NE = { Koshi: "कोशी", Madhesh: "मधेश", Bagmati: "बागमती", Gandaki: "गण्डकी", Lumbini: "लुम्बिनी", Karnali: "कर्णाली", Sudurpashchim: "सुदूरपश्चिम" };
  var PROVINCE_COLORS = { Koshi: "#2f6f8f", Madhesh: "#b5651d", Bagmati: "#5b7a3a", Gandaki: "#7a5c9e", Lumbini: "#a41222", Karnali: "#2a7f7f", Sudurpashchim: "#3a5a8c" };
  var data = window.NEPALVOTES_CONSTITUENCIES || [];
  var selectedDistrict = null;
  var selectedConstituency = null;
  var districtLayers = {};
  var geoLayer = null;
  var map = null;

  function fmt(n) { return n.toLocaleString("en-US"); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function byDistrict(d) { return data.filter(function (c) { return c.d === d; }); }
  function districtsInOrder() {
    var seen = {}, out = [];
    data.forEach(function (c) { if (!seen[c.d]) { seen[c.d] = true; out.push(c.d); } });
    return out;
  }

  function showConstituency(c) {
    selectedConstituency = c;
    selectedDistrict = c.d;
    var el = document.getElementById("map-detail");
    if (!el) { return; }
    var segA = c.name + " (A)";
    var segB = c.name + " (B)";
    el.innerHTML =
      "<h3>" + esc(c.name) + "</h3>" +
      "<p><strong>Province:</strong> " + esc(c.p) + " (" + esc(PROVINCE_NE[c.p] || c.p) + ")<br>" +
      "<strong>District:</strong> " + esc(c.d) + "<br>" +
      "<strong>Provincial segments:</strong> " + esc(segA) + ", " + esc(segB) + "<br>" +
      "<strong>Electorate (2022):</strong> " + fmt(c.e) + "<br>" +
      "<strong>Winner:</strong> To confirm</p>" +
      "<p>This constituency is shown at district level on the map. Its exact boundary inside " + esc(c.d) + " District is not drawn, because no verified constituency polygon file was used for this map.</p>" +
      "<p><a href=\"elections/2026-general-election.html\">2026 general election</a> | " +
      "<a href=\"elections/2022-general-election.html\">2022 general election</a></p>";
    paintDistricts();
    if (map && districtLayers[c.d]) {
      try { map.fitBounds(districtLayers[c.d].getBounds(), { padding: [20, 20], maxZoom: 10 }); } catch (e) {}
    }
    document.querySelectorAll(".const-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-name") === c.name);
    });
  }

  function showDistrict(d) {
    selectedDistrict = d;
    selectedConstituency = null;
    var list = byDistrict(d);
    var prov = list.length ? list[0].p : "To confirm";
    var el = document.getElementById("map-detail");
    if (!el) { return; }
    el.innerHTML =
      "<h3>" + esc(d) + " District</h3>" +
      "<p><strong>Province:</strong> " + esc(prov) + "<br>" +
      "<strong>Federal constituencies:</strong> " + list.length + "</p>" +
      "<p>Choose a constituency below to see its details. The shaded area is the whole district, not one constituency.</p>" +
      "<ul>" + list.map(function (c) {
        return "<li><button type=\"button\" class=\"const-btn\" data-name=\"" + esc(c.name) + "\">" + esc(c.name) + "</button></li>";
      }).join("") + "</ul>";
    el.querySelectorAll(".const-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var c = data.filter(function (x) { return x.name === b.getAttribute("data-name"); })[0];
        if (c) { showConstituency(c); }
      });
    });
    paintDistricts();
  }

  function baseStyle(district, province) {
    return { color: "#ffffff", weight: 1, fillColor: PROVINCE_COLORS[province] || "#5b84ad", fillOpacity: 0.55 };
  }
  function paintDistricts() {
    if (!geoLayer) { return; }
    geoLayer.eachLayer(function (layer) {
      var p = layer.feature.properties;
      var isSelected = p.district === selectedDistrict;
      layer.setStyle({
        color: isSelected ? "#a41222" : "#ffffff",
        weight: isSelected ? 3 : 1,
        fillColor: PROVINCE_COLORS[p.province] || "#5b84ad",
        fillOpacity: isSelected ? 0.75 : 0.55
      });
    });
  }
  function dimByProvince(province) {
    if (!geoLayer) { return; }
    geoLayer.eachLayer(function (layer) {
      var p = layer.feature.properties;
      var keep = !province || p.province === province;
      layer.setStyle({ fillOpacity: keep ? 0.55 : 0.15 });
      if (layer._path) { layer._path.style.display = ""; }
    });
    paintDistricts();
  }

  function renderList() {
    var province = document.getElementById("province-filter").value;
    var q = (document.getElementById("map-search").value || "").trim().toLowerCase();
    var listEl = document.getElementById("const-list");
    if (!listEl) { return; }
    var count = 0;
    var html = "";
    PROVINCES.forEach(function (prov) {
      if (province && prov !== province) { return; }
      var provCons = data.filter(function (c) { return c.p === prov; });
      var provHtml = "";
      var districts = [];
      provCons.forEach(function (c) {
        if (q && (c.name.toLowerCase().indexOf(q) === -1 && c.d.toLowerCase().indexOf(q) === -1)) { return; }
        if (districts.indexOf(c.d) === -1) { districts.push(c.d); }
      });
      districts.forEach(function (d) {
        provHtml += "<h4>" + esc(d) + " District</h4><ul>";
        provCons.filter(function (c) { return c.d === d; }).forEach(function (c) {
          if (q && (c.name.toLowerCase().indexOf(q) === -1 && c.d.toLowerCase().indexOf(q) === -1)) { return; }
          provHtml += "<li><button type=\"button\" class=\"const-btn\" data-name=\"" + esc(c.name) + "\">" + esc(c.name) + " <span class=\"muted\">(" + fmt(c.e) + " voters, 2022)</span></button></li>";
          count += 1;
        });
        provHtml += "</ul>";
      });
      if (provHtml) {
        html += "<h3>" + esc(prov) + " (" + esc(PROVINCE_NE[prov]) + ")</h3>" + provHtml;
      }
    });
    listEl.innerHTML = html || "<p>No constituency matches that search.</p>";
    document.getElementById("map-count").textContent = count + " of 165 constituencies shown";
    listEl.querySelectorAll(".const-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var c = data.filter(function (x) { return x.name === b.getAttribute("data-name"); })[0];
        if (c) { showConstituency(c); var d = document.getElementById("map-detail"); if (d && typeof d.scrollIntoView === "function") { d.scrollIntoView({ behavior: "smooth", block: "start" }); } }
      });
    });
  }

  function init() {
    renderList();
    var mapEl = document.getElementById("map");
    if (!mapEl) { return; }
    if (typeof L === "undefined") {
      mapEl.innerHTML = "<p>Map library could not load. The constituency list below still works without the map.</p>";
      return;
    }
    map = L.map("map", { scrollWheelZoom: true }).setView([28.0, 84.0], 7);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 12,
      attribution: "Map data: OpenStreetMap contributors. District boundaries: Acesmndr nepal-geojson (MIT)."
    }).addTo(map);
    fetch("districts.geojson").then(function (r) { return r.json(); }).then(function (geo) {
      geoLayer = L.geoJSON(geo, {
        style: function (f) { return baseStyle(f.properties.district, f.properties.province); },
        onEachFeature: function (f, layer) {
          var p = f.properties;
          districtLayers[p.district] = layer;
          layer.bindTooltip(p.district + " District, " + p.province + " (" + p.constituencies + " federal constituencies)");
          layer.on("mouseover", function () { layer.setStyle({ weight: 3, fillOpacity: 0.8 }); });
          layer.on("mouseout", function () { paintDistricts(); });
          layer.on("click", function () { showDistrict(p.district); });
        }
      }).addTo(map);
      try { map.fitBounds(geoLayer.getBounds(), { padding: [10, 10] }); } catch (e) {}
    }).catch(function () {
      mapEl.innerHTML = "<p>District boundary file could not load. The constituency list below still works without the map.</p>";
    });
    document.getElementById("province-filter").addEventListener("change", function (ev) {
      var province = ev.target.value;
      dimByProvince(province);
      renderList();
      if (province && geoLayer) {
        var bounds = null;
        geoLayer.eachLayer(function (layer) {
          if (layer.feature.properties.province === province) {
            bounds = bounds ? bounds.extend(layer.getBounds()) : layer.getBounds();
          }
        });
        if (bounds) { map.fitBounds(bounds, { padding: [20, 20] }); }
      } else if (geoLayer) {
        map.fitBounds(geoLayer.getBounds(), { padding: [10, 10] });
      }
    });
    document.getElementById("map-search").addEventListener("input", renderList);
    document.getElementById("map-reset").addEventListener("click", function () {
      document.getElementById("province-filter").value = "";
      document.getElementById("map-search").value = "";
      selectedDistrict = null;
      selectedConstituency = null;
      renderList();
      dimByProvince("");
      if (geoLayer) { map.fitBounds(geoLayer.getBounds(), { padding: [10, 10] }); }
      var el = document.getElementById("map-detail");
      if (el) { el.innerHTML = "<p>Click a district on the map, or choose a constituency from the list below.</p>"; }
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
