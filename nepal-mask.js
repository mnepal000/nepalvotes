/* NepalVotes outside-Nepal mask.
   The mask is one opaque polygon covering the whole world, with one hole
   for each Nepal district polygon. It sits in its own pane above the base
   tiles and below the district polygons, it is non-interactive, and it
   therefore covers every base tile and label outside Nepal with blank
   paper colour, while Nepal itself stays visible through the holes.
   It does not draw, guess, or change any district boundary. */
(function () {
  var PAPER = "#ffffff";
  var WORLD_RING = [[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]];
  function buildMaskFeature(geo) {
    var holes = [];
    (geo.features || []).forEach(function (f) {
      if (!f.geometry || !f.geometry.coordinates) { return; }
      if (f.geometry.type === "Polygon" && f.geometry.coordinates[0]) {
        holes.push(f.geometry.coordinates[0]);
      } else if (f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach(function (poly) {
          if (poly && poly[0]) { holes.push(poly[0]); }
        });
      }
    });
    return {
      type: "Feature",
      properties: { name: "Outside Nepal mask" },
      geometry: { type: "Polygon", coordinates: [WORLD_RING].concat(holes) }
    };
  }
  function nepalBounds() {
    if (typeof L === "undefined") { return null; }
    return L.latLngBounds([[25.9, 79.0], [30.9, 89.0]]);
  }
  function addNepalMask(map, geo) {
    if (typeof L === "undefined" || !map || !geo) { return null; }
    var paneName = "nepalMaskPane";
    try {
      if (!map.getPane(paneName)) { map.createPane(paneName); }
      var pane = map.getPane(paneName);
      pane.style.zIndex = 300;
      pane.style.pointerEvents = "none";
    } catch (e) {}
    var mask = L.geoJSON(buildMaskFeature(geo), {
      pane: paneName,
      interactive: false,
      style: { color: PAPER, weight: 0, fillColor: PAPER, fillOpacity: 1 }
    });
    mask.addTo(map);
    return mask;
  }
  window.NepalVotesMask = {
    PAPER: PAPER,
    buildMaskFeature: buildMaskFeature,
    addNepalMask: addNepalMask,
    nepalBounds: nepalBounds
  };
})();
