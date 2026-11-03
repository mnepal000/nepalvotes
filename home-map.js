/* NepalVotes homepage map: polygon-only, full-width, fixed.
   No base tiles, no zoom, no dragging, no panning. Only Nepal's 77
   district polygons from districts.geojson, coloured by province, on a
   blank paper background, like a US election polygon map. District
   boundaries only, not constituency polygons. */
(function () {
  var PROVINCE_NE = { Koshi: "कोशी", Madhesh: "मधेश", Bagmati: "बागमती", Gandaki: "गण्डकी", Lumbini: "लुम्बिनी", Karnali: "कर्णाली", Sudurpashchim: "सुदूरपश्चिम" };
  var PROVINCE_COLORS = { Koshi: "#2f6f8f", Madhesh: "#b5651d", Bagmati: "#5b7a3a", Gandaki: "#7a5c9e", Lumbini: "#a41222", Karnali: "#2a7f7f", Sudurpashchim: "#3a5a8c" };
  var data = window.NEPALVOTES_CONSTITUENCIES || [];
  var selectedDistrict = null;
  var geoLayer = null;
  var map = null;
  function fmt(n) { return n.toLocaleString("en-US"); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function byDistrict(d) { return data.filter(function (c) { return c.d === d; }); }
  function paintDistricts() {
    if (!geoLayer) { return; }
    geoLayer.eachLayer(function (layer) {
      var p = layer.feature.properties;
      var selected = p.district === selectedDistrict;
      layer.setStyle({ color: selected ? "#a41222" : "#ffffff", weight: selected ? 3 : 1, fillColor: PROVINCE_COLORS[p.province] || "#5b84ad", fillOpacity: selected ? 0.85 : 0.65 });
    });
  }
  function fitNepal() {
    if (map && geoLayer) { try { map.invalidateSize(); map.fitBounds(geoLayer.getBounds(), { padding: [8, 8] }); } catch (e) {} }
  }
  function showConstituency(c) {
    selectedDistrict = c.d;
    var el = document.getElementById("home-map-detail");
    if (!el) { return; }
    el.innerHTML =
      "<h3>" + esc(c.name) + "</h3>" +
      "<p><strong>Province:</strong> " + esc(c.p) + " (" + esc(PROVINCE_NE[c.p] || c.p) + ")<br>" +
      "<strong>District:</strong> " + esc(c.d) + "<br>" +
      "<strong>Provincial segments:</strong> " + esc(c.name) + " (A), " + esc(c.name) + " (B)<br>" +
      "<strong>Electorate (2022):</strong> " + fmt(c.e) + "<br>" +
      "<strong>Winner:</strong> To confirm</p>" +
      "<p>This constituency is shown at district level on the map. Its exact boundary inside " + esc(c.d) + " District is not drawn, because no verified constituency polygon file was used for this map.</p>" +
      '<p><a href="map.html">Open the full constituency map</a></p>';
    paintDistricts();
  }
  function showDistrict(d) {
    selectedDistrict = d;
    var list = byDistrict(d);
    var prov = list.length ? list[0].p : "To confirm";
    var el = document.getElementById("home-map-detail");
    if (!el) { return; }
    el.innerHTML =
      "<h3>" + esc(d) + " District</h3>" +
      "<p><strong>Province:</strong> " + esc(prov) + "<br>" +
      "<strong>Federal constituencies:</strong> " + list.length + "</p>" +
      "<p>Choose a constituency to see its details. The shaded area is the whole district, not one constituency.</p>" +
      "<ul>" + list.map(function (c) { return "<li><button type=\"button\" class=\"const-btn\" data-name=\"" + esc(c.name) + "\">" + esc(c.name) + "</button></li>"; }).join("") + "</ul>" +
      '<p><a href="map.html">Open the full constituency map</a></p>';
    el.querySelectorAll(".const-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var c = data.filter(function (x) { return x.name === b.getAttribute("data-name"); })[0];
        if (c) { showConstituency(c); }
      });
    });
    paintDistricts();
  }
  function init() {
    var mapEl = document.getElementById("home-map");
    if (!mapEl) { return; }
    if (typeof L === "undefined") {
      mapEl.innerHTML = "<p>Map library could not load. <a href=\"map.html\">Open the full constituency map</a>.</p>";
      return;
    }
    map = L.map("home-map", {
      zoomControl: false, attributionControl: false,
      dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
      touchZoom: false, boxZoom: false, keyboard: false,
      zoomSnap: 0.25, zoomDelta: 0
    }).setView([28.0, 84.0], 7);
    fetch("districts.geojson").then(function (r) { return r.json(); }).then(function (geo) {
      geoLayer = L.geoJSON(geo, {
        style: function (f) { return { color: "#ffffff", weight: 1, fillColor: PROVINCE_COLORS[f.properties.province] || "#5b84ad", fillOpacity: 0.65 }; },
        onEachFeature: function (f, layer) {
          var p = f.properties;
          layer.bindTooltip(p.district + " District, " + p.province + " (" + p.constituencies + " federal constituencies)");
          layer.on("mouseover", function () { layer.setStyle({ weight: 3, fillOpacity: 0.9 }); });
          layer.on("mouseout", function () { paintDistricts(); });
          layer.on("click", function () { showDistrict(p.district); });
        }
      }).addTo(map);
      fitNepal();
      window.addEventListener("resize", fitNepal);
    }).catch(function () {
      mapEl.innerHTML = "<p>District boundary file could not load. <a href=\"map.html\">Open the full constituency map</a>.</p>";
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
