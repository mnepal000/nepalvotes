# NepalVotes v1, local preview build

Status: Built locally only. It is NOT live at nepalvotes.com. No DNS change, no Name.com change, no GitHub change, no Cloudflare change, and no purchase was made.

## Files

- index.html: homepage, timeline cards, filters, search, party history, sources section, detail dialog
- data.js: all election data plus English and Nepali UI text
- app.js: rendering, filtering, search, language toggle, detail view, party history
- styles.css: mobile friendly styles, no build step
- README.md: this file

Open index.html from this folder, or serve the folder locally. No build step is needed.

## Elections included, 19 in total

National, 11 general or Constituent Assembly or Panchayat elections:
1959, 1981, 1986, 1991, 1994, 1999, 2008, 2013, 2017, 2022, 2026

National, presidential, 4 elections:
2008, 2015, 2018, 2023

Provincial, 2 elections:
2017, 2022, each 550 seats across 7 provinces, 330 first-past-the-post and 220 proportional

Local, 2 elections:
2017, 2022, each 753 local units

The 2026 national election DID take place, on 5 March 2026, for the House of Representatives only. The seven provincial assemblies were not dissolved and did not vote in 2026. Provincial and local elections were reported as scheduled separately in 2027, so no 2026 provincial or local election is included.

## Fully sourced in v1

National party seats and proportional votes are sourced for 1959, 1991, 1994, 1999, 2008, 2013, 2017, 2022 and 2026, for the top parties shown. Presidential winners and electoral votes are sourced for 2008 (run-off), 2015, 2018 and 2023. Provincial seats are sourced for 2017 and 2022, with provincial proportional votes for 2022. Local chief posts (mayors or chairs won) are sourced for 2017 and 2022. Panchayat elected seats and turnout are sourced for 1981 and 1986, as partyless elections.

Main sources: Election Commission of Nepal results as reported in the linked tables, IPU Parline, and the UK Parliament Commons Library briefing for 2026. Full links are in the sources section of index.html.

## Gaps and discrepancies, do not fill by guessing

1. Constituency level winners: not in v1. No district or constituency table was built.
2. Ward level local results: not in v1. Local figures are chief posts only, plus popular votes where shown for 2022.
3. Province by province provincial results: not in v1. Only national provincial totals are shown.
4. Chief ministers by province: not in v1. The site says this plainly in the provincial outcome text.
5. Provincial 2017 votes: omitted. Only seats were verified from the sources read, so votes show as To confirm.
6. Small party votes: where a source table read for v1 did not give a vote total for a small party, the site shows To confirm rather than a guessed vote total.
7. 2013 turnout: v1 uses 78.34 percent, from the election article text. The same page infobox shows 79.82 percent, and IPU valid votes give 77.91 percent. The difference is total turnout versus valid votes, and it needs an Election Commission check before v1 is called final.
8. 2022 provincial totals: v1 uses Nepali Congress 174 and Rastriya Prajatantra Party 28, from the detailed results table. Another report gives Congress 176, and an infobox gives RPP 27. Needs an Election Commission check.
9. 2022 local UML chiefs: v1 uses 205, from the completed count reported by Xinhua and the Election Commission. The Wikipedia infobox shows 206. Needs an Election Commission check.
10. 1999 vote totals: v1 uses the current Wikipedia table, Nepali Congress 3,214,786 and CPN (UML) 2,734,568. An older mirror shows 3,214,068 and 2,728,725. Seat totals agree at 111 and 71.
11. 1991 seats: v1 uses Nepali Congress 110 and CPN (UML) 69, from the detailed table. An older IPU grouping shows 112 and 68 for grouped blocs. Seat totals for the detailed parties are the ones used.
12. 1959 end date: v1 uses 18 February to 3 April 1959, from the election page. Some summaries give 11 March as the end. Needs a source check if an exact end date is required.
13. 2026 party leadership: sources differ in shorthand, with Rabi Lamichhane as party chair and Balendra Shah as prime ministerial candidate. The site only states that Shah was sworn in as prime minister on 27 March 2026, and does not assign a single party leader label for 2026.
14. Not included: National Assembly elections, vice presidential elections, by-elections, and the indirect 1963 Panchayat election. These are v2 scope, not v1 gaps filled by summary.
15. No backup from the 2013 NepalVotes site was available, as confirmed by the user. Nothing from the old site was recovered or copied. The 2013 election entry is a new archive entry, not a restoration of old pages.

## NepalVotes v2, encyclopedia, multi-page, local preview build

Status: Built locally only. It is NOT live at nepalvotes.com. No DNS change, no Name.com change, no GitHub change, no Cloudflare change, and no purchase was made.

Architecture change at the user's direction: NepalVotes is now MULTI-PAGE, not a single-page app. Every election and every encyclopedia article is its own standalone HTML page with its own URL, title, breadcrumbs, and See also links. The homepage stays as an index and timeline, with links out to those pages. A detail dialog is no longer used.

How generation works: `generate.js` reads `data.js` (v1 election numbers, untouched) plus `articles.js` (glossary), `articles-parties.js` (parties), and `articles-systems.js` (systems and eras), and writes every page. Do not hand edit generated pages; edit the data files and run `node generate.js`. Shared header, navigation, footer, styles, and bilingual language toggle come from `site.js`, with language choice persisted in localStorage across pages.

Files added in v2:

- generate.js: generator for all pages, including index.html, elections.html, articles.html, search.html, and sitemap.xml
- site.js: shared language toggle across pages
- articles.js: 12 glossary articles
- articles-parties.js: 18 party articles
- articles-systems.js: 10 system and institution articles plus 5 era articles
- elections/: 19 standalone election pages
- parties/: 18 standalone party pages
- systems/: 10 standalone system and institution pages
- eras/: 5 standalone era pages
- glossary/: 12 standalone glossary pages

Total: 68 pages (19 elections, 45 articles, plus index, elections index, articles index, and search).

### Articles in v2, 45 in total

Parties, 18: Nepali Congress, CPN (UML), CPN (Maoist Centre), Nepali Communist Party (2025 merger), Rastriya Swatantra Party, Rastriya Prajatantra Party, Rastriya Prajatantra Party Nepal, People's Socialist Party, Nepal (Janata Samajbadi Party), Madhesi Jana Adhikar Forum, Nepal, Federal Socialist Forum, Nepal, Rastriya Janata Party Nepal, People's Socialist Party (Ashok Rai faction, 2024), Janamat Party, CPN (Unified Socialist), Nepal Workers and Peasants Party, Rastriya Janamorcha, Nagrik Unmukti Party, Loktantrik Samajwadi Party, Nepal.

Systems and institutions, 10: Election Commission of Nepal, House of Representatives, National Assembly, Provincial Assemblies, Local Government Structure, Electoral Systems in Nepal, Voter Registration in Nepal, Constituency Delimitation, Inclusion Quotas and Proportional Representation, Presidential Election System.

Eras and concepts, 5: The 1959 First Election, Panchayat Era Elections (1981 and 1986), Restoration of Democracy and the 1991 Election, Constituent Assembly Era (2008 and 2013), Federal Era After 2015.

Glossary, 12: First past the post, Proportional representation, Mixed electoral system, Voter roll, Constituency, Turnout, By-election, Electoral college, Inclusion quota, Delimitation, Ballot, Polling centre.

Each article has a short summary first, then history or context, then key facts, then sources and further reading, then See also links back to elections and related articles. Article titles and summaries switch with the language toggle. Anything unverified is marked To confirm, never invented.

### New gaps and conflicts flagged in v2, in addition to the v1 gaps above

1. Nepali Congress leadership is disputed in sources read (Thapa recognised by the Election Commission in January 2026, disputed by the Deuba faction, Supreme Court review reported as pending). Do not quote a single current leader as settled without an Election Commission check.
2. Election Commission term: six years in a 2026 ANFREL report, five years in one secondary summary. Check Article 245.
3. Panchayat turnout conflict: v1 pages use 52.2 percent for 1981 and 60.3 percent for 1986, while a research draft reported 63 percent and 60 percent. The era article flags this and does not settle it.
4. Constituent Assembly 2008 seat totals conflict: a research draft reported Maoist 229, Congress 115, UML 108, which conflicts with the v1 tables. The era article refers readers to the v1 election pages and does not restate those totals.
5. Delimitation dates conflict: commission formation 19 July 2017 (IFES) versus 20 July 2017 (International IDEA); report 31 August 2017 versus 30 August 2017 in one source.
6. Inclusion group percentages: only historical 2017 shares were found. They are not published as current quotas in v2. Check the current Election Commission directive first.
7. Sainte-Lague divisor sequence, including the reported 1.4 first divisor, is To confirm against the current Election Commission directive.
8. Voter ID presentation rule at polling stations, and current online National Identity Card registration steps, are To confirm.
9. Lumbini capital cited as Deukhuri is To confirm in the same form against the official provincial record. Metropolitan spelling Birgunj versus Birganj, and the full official sub-metropolitan list, are also To confirm.
10. National Assembly ballot categories (single transferable vote versus first past the post by seat type) are To confirm against current election act wording.
11. Party symbol and status items carried from the party research: RPP Nepal second iteration symbol, People's Socialist Party, Nepal symbol in text form, December 2025 JSP and LSP merger claim, CPN (Unified Socialist) final symbol (pen versus open book), Rastriya Janamorcha founding year (1995 versus 1999), Nagrik Unmukti Party post October 2025 status, Loktantrik Samajwadi Party status after January 2025, and Rastriya Swatantra Party 2022 total (20 in v1 versus 21 in another source).
12. Still not included: National Assembly elections as separate results pages, vice presidential elections, by-elections, constituency level winners, ward level local results, province by province provincial results, and chief ministers by province. Those need direct Election Commission sourcing.

### Verification done in v2

- Node syntax checks pass for data.js, articles.js, articles-parties.js, articles-systems.js, app.js, site.js, and generate.js.
- Generator output: 19 elections, 45 articles, 68 pages.
- All 1,043 internal links across the generated pages resolve to files that exist.
- jsdom loads with no JS errors for: homepage (19 cards, first card links to elections/2026-general-election.html), a system page (electoral systems page contains 3 percent, links to the 2022 election page and to the first past the post glossary page, language toggle sets localStorage to ne and body class lang-ne), a party page (Nepali Congress page contains Tree, links to the 1959 election page and to the CPN (UML) page), and an election page (2026 page contains 182 and links to the Rastriya Swatantra Party page).
- Cross-links verified both ways: election to party article, and party article back to elections.
- No em dashes or en dashes in the site files.
- A real browser visual screenshot check is still recommended before any public launch, as in v1, because the local Chromium binary could not be used for that check.

## Sitemap, all 68 pages

- index.html
- elections.html
- articles.html
- search.html
- elections/2026-general-election.html
- elections/2023-presidential-election.html
- elections/2022-general-election.html
- elections/2022-provincial-assembly-elections.html
- elections/2022-local-elections.html
- elections/2018-presidential-election.html
- elections/2017-general-election.html
- elections/2017-provincial-assembly-elections.html
- elections/2017-local-elections.html
- elections/2015-presidential-election.html
- elections/2013-constituent-assembly-election.html
- elections/2008-constituent-assembly-election.html
- elections/2008-presidential-election.html
- elections/1999-general-election.html
- elections/1994-general-election.html
- elections/1991-general-election.html
- elections/1986-rastriya-panchayat-election.html
- elections/1981-rastriya-panchayat-election.html
- elections/1959-general-election.html
- glossary/first-past-the-post.html
- glossary/proportional-representation.html
- glossary/mixed-electoral-system.html
- glossary/voter-roll.html
- glossary/constituency.html
- glossary/turnout.html
- glossary/by-election.html
- glossary/electoral-college.html
- glossary/inclusion-quota.html
- glossary/delimitation.html
- glossary/ballot.html
- glossary/polling-centre.html
- parties/nepali-congress.html
- parties/cpn-uml.html
- parties/cpn-maoist-centre.html
- parties/nepali-communist-party-2025.html
- parties/rastriya-swatantra-party.html
- parties/rastriya-prajatantra-party.html
- parties/rastriya-prajatantra-party-nepal.html
- parties/janata-samajbadi-party-nepal.html
- parties/madhesi-janaadhikar-forum-nepal.html
- parties/federal-socialist-forum-nepal.html
- parties/rastriya-janata-party-nepal.html
- parties/peoples-socialist-party-2024.html
- parties/janamat-party.html
- parties/cpn-unified-socialist.html
- parties/nepal-workers-peasants-party.html
- parties/rastriya-janamorcha.html
- parties/nagrik-unmukti-party.html
- parties/loktantrik-samajwadi-party-nepal.html
- systems/election-commission-of-nepal.html
- systems/house-of-representatives.html
- systems/national-assembly.html
- systems/provincial-assemblies.html
- systems/local-government-structure.html
- systems/electoral-systems-in-nepal.html
- systems/voter-registration-in-nepal.html
- systems/constituency-delimitation.html
- systems/inclusion-quotas.html
- systems/presidential-election-system.html
- eras/first-election-1959.html
- eras/panchayat-era-elections.html
- eras/restoration-1991.html
- eras/constituent-assembly-era.html
- eras/federal-era-after-2015.html

## Verification done

- Node syntax check passed for data.js and app.js.
- Grep for em dash and en dash in the site folder returned none.
- Local HTTP server served index.html, data.js, app.js and styles.css with HTTP 200 for each.
- A jsdom DOM test loaded index.html, data.js and app.js with no JS errors after a dialog fallback fix. Results: 19 cards on load, first card 2026 General Election, national filter 15 cards, local filter 2 cards, search for 2026 gave 1 card, Nepali toggle switched the tagline and first card title to Devanagari and stored the choice, the 2026 detail view contained 182 seats and 5,183,493 votes, Nepali Congress party history gave 13 rows, and no top party seat sum exceeded its election total.
- A local Chromium binary could not be used for a rendered screenshot check, because it exited on a host WebGL domain policy requirement. The jsdom DOM test above is the rendered logic evidence, not a visual screenshot check. A visual check in a real browser is still recommended before any public launch.

## Constituency map (added 2026-11-03)

- map.html: interactive map of Nepal plus a full constituency list. Hand maintained, not generated by generate.js, but linked from the generated navigation on every page, from the homepage, and from the elections index, so it is not orphaned. If generate.js is rerun, map.html is left untouched.
- constituencies.js: all 165 federal constituencies, in delimitation order, with province, district, constituency name, and 2022 electorate. Province totals: Koshi 28, Madhesh 32, Bagmati 33, Gandaki 18, Lumbini 26, Karnali 12, Sudurpashchim 16. Each federal constituency has two provincial segments, shown as (A) and (B). Winner is To confirm throughout, because constituency winners are not in the verified site data.
- districts.geojson: 77 district polygons, 1,006,322 bytes, from Acesmndr nepal-geojson (MIT licence), coordinates rounded to 4 decimal places only. District names were matched to the constituency list, including Dhanusa to Dhanusha, Kavrepalanchowk to Kavrepalanchok, and Parasi to Nawalparasi (Bardaghat Susta West). Province numbers in that file align with the constituency provinces for all 77 districts.
- map.js: Leaflet polygon-only map, full width, fixed. No base tiles, no zoom control, no zooming, dragging, or panning. Only the 77 district polygons, coloured by province, with a province legend, white district borders, hover highlight, click a district to see its constituencies, click a constituency to highlight its district and see province, district, segments, 2022 electorate, and links to the 2026 and 2022 general election pages. Province filter, district or constituency search, reset view (which refits Nepal, and does not reintroduce zoom or tiles), and a list grouped by province and district. The detail panel sits below the map, full width.
- Homepage map (added 2026-11-03, redesigned 2026-11-03 as polygon-only): the homepage now has its own map section, generated by generate.js, placed after the Latest election feature and before the timeline grid, with a link to the full map page. It is driven by home-map.js and reuses districts.geojson and constituencies.js, with no duplicated large data file. It is also full width, fixed, polygon-only, with a province legend and the detail panel below the map.
- Blank outside Nepal (redesigned 2026-11-03): the old tile-mask approach (nepal-mask.js, removed) is superseded. There is no base tile layer at all, so by construction there are no roads, place labels, or neighbouring country labels, and the background is blank paper colour. Only Nepal's districts are drawn.

### Honesty note, and what the map does not show

No verified open file of all 165 constituency polygons was found in the sources checked (including searches for a constituency GeoJSON repo and the Nepal Election 2082 voter demographics tool, whose underlying boundary file and licence could not be verified from public sources). The map therefore shows district boundaries, NOT exact constituency polygons, and says so on the page itself. Selecting a constituency highlights its whole district. Constituency boundaries inside a district are not drawn and are not guessed. The map also does not show constituency winners, candidates, or vote totals.

### Map verification

- Constituency data: 165 entries, sequence 1 to 165, no duplicate names, province totals match the task totals, 77 districts.
- District polygons: 77 features, every constituency district has a polygon, no unmatched district.
- jsdom logic test with a stubbed Leaflet layer and a stubbed fetch for districts.geojson: 165 list buttons on load, Kathmandu 1 detail shows segments Kathmandu 1 (A) and (B), electorate 45,018, winner To confirm, and a link to the 2026 election page; Koshi filter shows 28; search for Kailali shows 5; no-match search shows the no-match message; 77 district layers created; no JS errors after guarding scrollIntoView for jsdom.
- Link check: 69 HTML pages, 1,056 HTML links, 0 broken. Local server check: map.html, districts.geojson, map.js, and constituencies.js all return 200.
- A live browser visual check of the map itself was not done by this subagent (generic subagents cannot run a live browser). The parent should arrange one if a visual pass is wanted before calling the map fully verified live.
