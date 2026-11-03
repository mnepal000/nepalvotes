/* NepalVotes encyclopedia articles. Party, system, and era articles are added
   after verified research; glossary articles below are general definitions plus
   Nepal facts already verified in v1 data.js. Never invent a date, seat, or
   threshold here; use To confirm where a figure is not verified. */
window.NEPALVOTES_ARTICLES = [
  {
    id: "first-past-the-post",
    category: "glossary",
    titleEN: "First past the post",
    titleNE: "पहिलो हुने निर्वाचित हुने प्रणाली",
    summaryEN: "The candidate with the most votes in a constituency wins the seat, even without a majority of votes.",
    summaryNE: "कुनै निर्वाचन क्षेत्रमा सबैभन्दा बढी मत पाउने उम्मेदवारले सिट जित्छन्, बहुमत नपाए पनि।",
    bodyEN: [
      "In a first past the post election, each constituency elects one member. Voters choose one candidate, and the candidate with the highest number of valid votes wins. There is no second round and no redistribution of votes.",
      "In Nepal, first past the post is used for 165 seats in the House of Representatives, 330 seats in provincial assemblies, and for directly elected local posts such as mayors and chairs. It is the direct part of Nepal's mixed system, alongside proportional representation."
    ],
    bodyNE: [
      "पहिलो हुने निर्वाचित हुने प्रणालीमा प्रत्येक निर्वाचन क्षेत्रबाट एक जना सदस्य निर्वाचित हुन्छन्। सबैभन्दा बढी सदर मत पाउने उम्मेदवार विजयी हुन्छन्।",
      "नेपालमा यो प्रणाली प्रतिनिधि सभाका १६५ सिट, प्रदेश सभाका ३३० सिट र मेयर तथा अध्यक्षजस्ता प्रत्यक्ष स्थानीय पदका लागि प्रयोग हुन्छ।"
    ],
    facts: [
      { labelEN: "Seats in the House of Representatives", labelNE: "प्रतिनिधि सभामा सिट", valueEN: "165", valueNE: "१६५" },
      { labelEN: "Seats in provincial assemblies", labelNE: "प्रदेश सभामा सिट", valueEN: "330", valueNE: "३३०" }
    ],
    related: ["proportional-representation", "mixed-electoral-system"],
    sources: [
      { label: "2017 general election", url: "https://en.wikipedia.org/wiki/2017_Nepalese_general_election" },
      { label: "2022 general election", url: "https://en.wikipedia.org/wiki/2022_Nepalese_general_election" }
    ]
  },
  {
    id: "proportional-representation",
    category: "glossary",
    titleEN: "Proportional representation",
    titleNE: "समानुपातिक प्रतिनिधित्व",
    summaryEN: "Seats are shared between parties in proportion to their share of votes, using closed party lists in Nepal.",
    summaryNE: "मतको अनुपातअनुसार दलहरूबीच सिट बाँडिन्छ। नेपालमा बन्द सूची प्रयोग हुन्छ।",
    bodyEN: [
      "Under proportional representation, voters vote for a party list rather than a single candidate in that part of the election. Seats are then allocated in proportion to each party's share of the vote, subject to any threshold that applies.",
      "In Nepal, proportional representation provides 110 seats in the House of Representatives and 220 seats in provincial assemblies. Parties submit closed lists, and the Election Commission allocates seats from those lists after the vote. The exact threshold rules are covered in the electoral systems article, and any figure not verified there is marked To confirm."
    ],
    bodyNE: [
      "समानुपातिक प्रतिनिधित्वमा मतदाताले उम्मेदवारको सट्टा दलको सूचीमा मतदान गर्छन्। त्यसपछि मतको अनुपातअनुसार सिट बाँडिन्छ।",
      "नेपालमा समानुपातिक प्रणालीबाट प्रतिनिधि सभामा ११० र प्रदेश सभामा २२० सिट भरिन्छन्।"
    ],
    facts: [
      { labelEN: "Seats in the House of Representatives", labelNE: "प्रतिनिधि सभामा सिट", valueEN: "110", valueNE: "११०" },
      { labelEN: "Seats in provincial assemblies", labelNE: "प्रदेश सभामा सिट", valueEN: "220", valueNE: "२२०" }
    ],
    related: ["first-past-the-post", "mixed-electoral-system"],
    sources: [
      { label: "2017 general election", url: "https://en.wikipedia.org/wiki/2017_Nepalese_general_election" },
      { label: "2022 general election", url: "https://en.wikipedia.org/wiki/2022_Nepalese_general_election" }
    ]
  },
  {
    id: "mixed-electoral-system",
    category: "glossary",
    titleEN: "Mixed electoral system",
    titleNE: "मिश्रित निर्वाचन प्रणाली",
    summaryEN: "A system that combines directly elected constituency seats with proportional list seats.",
    summaryNE: "प्रत्यक्ष निर्वाचन क्षेत्रका सिट र समानुपातिक सूचीका सिटलाई जोड्ने प्रणाली।",
    bodyEN: [
      "A mixed system uses two ballots or two parts of one election. One part elects local members directly, and the other part tops up representation so that the overall result is closer to each party's share of the vote.",
      "Nepal's House of Representatives has 275 seats in total: 165 first past the post seats and 110 proportional seats. Provincial assemblies have 550 seats in total: 330 first past the post seats and 220 proportional seats. The Constituent Assembly elections of 2008 and 2013 used a similar mixed system, with 240 first past the post seats and 335 proportional seats out of 601 total seats."
    ],
    bodyNE: [
      "मिश्रित प्रणालीमा एउटा भागबाट स्थानीय सदस्य प्रत्यक्ष निर्वाचित हुन्छन् र अर्को भागले मतको अनुपात मिलाउँछ।",
      "नेपालको प्रतिनिधि सभामा २७५ सिट छन्: १६५ प्रत्यक्ष र ११० समानुपातिक। प्रदेश सभामा ५५० सिट छन्: ३३० प्रत्यक्ष र २२० समानुपातिक।"
    ],
    facts: [
      { labelEN: "House of Representatives total", labelNE: "प्रतिनिधि सभा जम्मा", valueEN: "275 (165 direct, 110 proportional)", valueNE: "२७५ (१६५ प्रत्यक्ष, ११० समानुपातिक)" },
      { labelEN: "Provincial assemblies total", labelNE: "प्रदेश सभा जम्मा", valueEN: "550 (330 direct, 220 proportional)", valueNE: "५५० (३३० प्रत्यक्ष, २२० समानुपातिक)" }
    ],
    related: ["first-past-the-post", "proportional-representation"],
    sources: [
      { label: "2022 general election", url: "https://en.wikipedia.org/wiki/2022_Nepalese_general_election" },
      { label: "2022 provincial elections", url: "https://en.wikipedia.org/wiki/2022_Nepalese_provincial_elections" }
    ]
  },
  {
    id: "voter-roll",
    category: "glossary",
    titleEN: "Voter roll",
    titleNE: "मतदाता नामावली",
    summaryEN: "The official list of people eligible to vote in an election.",
    summaryNE: "निर्वाचनमा मतदान गर्न योग्य व्यक्तिहरूको आधिकारिक सूची।",
    bodyEN: [
      "A voter roll, also called an electoral roll, lists every registered voter for an area. Election officials use it to check identity at the polling centre and to prevent double voting.",
      "In Nepal, the Election Commission prepares and updates the voter roll. Details of registration drives and the total number of registered voters vary by election, so this article does not state a single total. Election pages give the turnout figure where it was verified for that election."
    ],
    bodyNE: [
      "मतदाता नामावलीमा कुनै क्षेत्रका सबै दर्ता भएका मतदाताको नाम हुन्छ। मतदान केन्द्रमा पहिचान जाँच्न र दोहोरो मतदान रोक्न यसको प्रयोग हुन्छ।",
      "नेपालमा निर्वाचन आयोगले मतदाता नामावली तयार र अद्यावधिक गर्छ।"
    ],
    facts: [
      { labelEN: "Prepared by", labelNE: "तयार गर्ने निकाय", valueEN: "Election Commission of Nepal", valueNE: "निर्वाचन आयोग, नेपाल" }
    ],
    related: ["turnout"],
    sources: [
      { label: "Election Commission of Nepal", url: "https://election.gov.np/" }
    ]
  },
  {
    id: "constituency",
    category: "glossary",
    titleEN: "Constituency",
    titleNE: "निर्वाचन क्षेत्र",
    summaryEN: "A defined area that elects one or more members to a legislature.",
    summaryNE: "विधायिकामा एक वा बढी सदस्य निर्वाचित गर्ने निश्चित क्षेत्र।",
    bodyEN: [
      "A constituency is the geographic area whose voters elect a representative. In a first past the post election, each constituency elects one member.",
      "Nepal has 165 federal constituencies for the House of Representatives and 330 provincial constituencies. Constituency boundaries were set through delimitation before the 2017 elections. The delimitation article covers that process in detail."
    ],
    bodyNE: [
      "निर्वाचन क्षेत्र भनेको प्रतिनिधि निर्वाचित गर्ने भौगोलिक क्षेत्र हो। प्रत्यक्ष निर्वाचनमा प्रत्येक क्षेत्रबाट एक जना सदस्य निर्वाचित हुन्छन्।",
      "नेपालमा प्रतिनिधि सभाका लागि १६५ र प्रदेश सभाका लागि ३३० निर्वाचन क्षेत्र छन्।"
    ],
    facts: [
      { labelEN: "Federal constituencies", labelNE: "संघीय निर्वाचन क्षेत्र", valueEN: "165", valueNE: "१६५" },
      { labelEN: "Provincial constituencies", labelNE: "प्रदेश निर्वाचन क्षेत्र", valueEN: "330", valueNE: "३३०" }
    ],
    related: ["delimitation"],
    sources: [
      { label: "2017 general election", url: "https://en.wikipedia.org/wiki/2017_Nepalese_general_election" }
    ]
  },
  {
    id: "turnout",
    category: "glossary",
    titleEN: "Turnout",
    titleNE: "मतदान प्रतिशत",
    summaryEN: "The share of registered or eligible voters who cast a ballot.",
    summaryNE: "दर्ता भएका वा योग्य मतदातामध्ये मतदान गर्नेहरूको हिस्सा।",
    bodyEN: [
      "Turnout is usually reported as a percentage. It can be calculated against registered voters or against all eligible voters, and different sources sometimes use different bases, so small differences between reports are common.",
      "NepalVotes shows the turnout figure from the source read for each election, and notes where sources disagree, for example for 2013. Turnout alone does not show how many votes were valid, spoiled, or rejected."
    ],
    bodyNE: [
      "मतदान प्रतिशत सामान्यतया प्रतिशतमा देखाइन्छ। यो दर्ता भएका वा योग्य मतदाताको आधारमा निकाल्न सकिन्छ, त्यसैले स्रोतअनुसार सानो फरक पर्न सक्छ।",
      "नेपालभोट्सले प्रत्येक निर्वाचनका लागि पढिएको स्रोतको मतदान प्रतिशत देखाउँछ।"
    ],
    facts: [],
    related: ["voter-roll"],
    sources: [
      { label: "2013 Constituent Assembly election", url: "https://en.wikipedia.org/wiki/Nepalese_Constituent_Assembly_election,_2013" }
    ]
  },
  {
    id: "by-election",
    category: "glossary",
    titleEN: "By-election",
    titleNE: "उपनिर्वाचन",
    summaryEN: "An election held between general elections to fill a vacant seat.",
    summaryNE: "सामान्य निर्वाचनबीच खाली सिट भर्न गरिने निर्वाचन।",
    bodyEN: [
      "A by-election is held when a seat becomes vacant during a term, for example after a resignation or death. Only voters in that constituency or area take part.",
      "By-election results are not yet included as separate pages in NepalVotes v1 or v2. They are listed as a gap in the README, and will need direct Election Commission sourcing before they are added."
    ],
    bodyNE: [
      "कुनै सिट कार्यकालबीच खाली भएमा उपनिर्वाचन हुन्छ, जस्तै राजीनामा वा निधनपछि। त्यस क्षेत्रका मतदाताले मात्र मतदान गर्छन्।",
      "नेपालभोट्समा उपनिर्वाचन नतिजा अझै छुट्टै पृष्ठका रूपमा समावेश छैनन्।"
    ],
    facts: [
      { labelEN: "Coverage in NepalVotes", labelNE: "नेपालभोट्समा समावेश", valueEN: "Not yet, To confirm from Election Commission sources", valueNE: "अझै छैन, निर्वाचन आयोग स्रोतबाट पुष्टि गर्न बाँकी" }
    ],
    related: [],
    sources: []
  },
  {
    id: "electoral-college",
    category: "glossary",
    titleEN: "Electoral college",
    titleNE: "निर्वाचक मण्डल",
    summaryEN: "A body of elected representatives that chooses an office holder indirectly.",
    summaryNE: "अप्रत्यक्ष रूपमा पदाधिकारी छान्ने निर्वाचित प्रतिनिधिहरूको समूह।",
    bodyEN: [
      "In an indirect election, voters do not choose the office holder directly. Instead, members of an electoral college vote, and their votes may be weighted.",
      "Nepal's president is chosen by an electoral college made up of members of the federal parliament and provincial assemblies, with weighted votes. Presidential election pages in NepalVotes show those weighted votes, not public votes."
    ],
    bodyNE: [
      "अप्रत्यक्ष निर्वाचनमा मतदाताले पदाधिकारीलाई सीधै छान्दैनन्। निर्वाचक मण्डलका सदस्यहरूले मतदान गर्छन् र तिनका मत भारित हुन सक्छन्।",
      "नेपालका राष्ट्रपति संघीय संसद र प्रदेश सभाका सदस्यहरू रहेको निर्वाचक मण्डलबाट भारित मतद्वारा छानिन्छन्।"
    ],
    facts: [
      { labelEN: "Used for", labelNE: "प्रयोग", valueEN: "Presidential election in Nepal", valueNE: "नेपालमा राष्ट्रपति निर्वाचन" }
    ],
    related: [],
    sources: [
      { label: "2023 presidential election", url: "https://en.wikipedia.org/wiki/2023_Nepalese_presidential_election" }
    ]
  },
  {
    id: "inclusion-quota",
    category: "glossary",
    titleEN: "Inclusion quota",
    titleNE: "समावेशी कोटा",
    summaryEN: "Reserved places or list requirements that ensure representation of groups that are otherwise underrepresented.",
    summaryNE: "अन्यथा कम प्रतिनिधित्व हुने समूहको प्रतिनिधित्व सुनिश्चित गर्न आरक्षित स्थान वा सूची व्यवस्था।",
    bodyEN: [
      "Inclusion quotas can take the form of reserved seats, or requirements that party lists include candidates from specified groups. Their exact form varies by country and by election.",
      "In Nepal, proportional lists must reflect inclusion of women and other groups under the constitution and election law. The exact percentages and group categories are covered in the inclusion quotas article, and any figure not verified there is marked To confirm. This glossary entry does not state a percentage on its own."
    ],
    bodyNE: [
      "समावेशी कोटा आरक्षित सिट वा दलको सूचीमा निश्चित समूहका उम्मेदवार समावेश गर्नुपर्ने व्यवस्था हुन सक्छ।",
      "नेपालमा समानुपातिक सूचीले संविधान र निर्वाचन कानुनअनुसार महिला तथा अन्य समूहको समावेशिता देखाउनुपर्छ।"
    ],
    facts: [
      { labelEN: "Exact percentages", labelNE: "ठ्याक्कै प्रतिशत", valueEN: "To confirm in the inclusion quotas article", valueNE: "समावेशी कोटा लेखमा पुष्टि गर्न बाँकी" }
    ],
    related: [],
    sources: []
  },
  {
    id: "delimitation",
    category: "glossary",
    titleEN: "Delimitation",
    titleNE: "निर्वाचन क्षेत्र निर्धारण",
    summaryEN: "The process of drawing constituency boundaries, usually based on population.",
    summaryNE: "सामान्यतया जनसंख्याका आधारमा निर्वाचन क्षेत्रको सीमा कोर्ने प्रक्रिया।",
    bodyEN: [
      "Delimitation divides a country into constituencies of broadly comparable population, so that each vote carries broadly similar weight. Boundaries are normally reviewed after a census or a constitutional change.",
      "Nepal's current 165 federal constituencies and 330 provincial constituencies were set through delimitation before the 2017 elections. The delimitation article covers the commission and criteria in detail, with unverified points marked To confirm."
    ],
    bodyNE: [
      "निर्वाचन क्षेत्र निर्धारणले देशलाई करिब बराबर जनसंख्या भएका क्षेत्रमा बाँड्छ, ताकि प्रत्येक मतको भार करिब बराबर होस्।",
      "नेपालका हालका १६५ संघीय र ३३० प्रदेश निर्वाचन क्षेत्र २०१७ को निर्वाचनअघि निर्धारण गरिएका हुन्।"
    ],
    facts: [
      { labelEN: "Federal constituencies set", labelNE: "संघीय क्षेत्र संख्या", valueEN: "165", valueNE: "१६५" },
      { labelEN: "Provincial constituencies set", labelNE: "प्रदेश क्षेत्र संख्या", valueEN: "330", valueNE: "३३०" }
    ],
    related: ["constituency"],
    sources: [
      { label: "2017 general election", url: "https://en.wikipedia.org/wiki/2017_Nepalese_general_election" }
    ]
  },
  {
    id: "ballot",
    category: "glossary",
    titleEN: "Ballot",
    titleNE: "मतपत्र",
    summaryEN: "The paper or device on which a voter records a choice.",
    summaryNE: "मतदाताले आफ्नो रोजाइ टिप्ने कागज वा साधन।",
    bodyEN: [
      "A ballot lists the candidates or parties standing in an election. A voter marks a choice, and officials count valid ballots to decide the result.",
      "In Nepal's mixed elections, voters receive separate ballots for the first past the post part and the proportional part. Spoiled or invalid ballots are not counted as votes for any candidate or party."
    ],
    bodyNE: [
      "मतपत्रमा निर्वाचनमा उभिएका उम्मेदवार वा दलको सूची हुन्छ। मतदाताले रोजाइ चिन्ह लगाउँछन् र अधिकारीहरूले सदर मतपत्र गन्छन्।",
      "नेपालको मिश्रित निर्वाचनमा प्रत्यक्ष र समानुपातिक भागका लागि छुट्टाछुट्टै मतपत्र दिइन्छ।"
    ],
    facts: [],
    related: ["first-past-the-post", "proportional-representation"],
    sources: []
  },
  {
    id: "polling-centre",
    category: "glossary",
    titleEN: "Polling centre",
    titleNE: "मतदान केन्द्र",
    summaryEN: "A place where voters cast their ballots on election day.",
    summaryNE: "निर्वाचनका दिन मतदाताले मतदान गर्ने ठाउँ।",
    bodyEN: [
      "A polling centre is set up for voters assigned to that centre, usually near their place of residence. Staff check the voter roll, issue ballots, and secure the ballot boxes after voting ends.",
      "The number and location of polling centres in Nepal vary by election and by district, so this article does not state a single national total."
    ],
    bodyNE: [
      "मतदान केन्द्र त्यस केन्द्रमा तोकिएका मतदाताका लागि, सामान्यतया बसोबास नजिकै, स्थापना गरिन्छ। कर्मचारीले नामावली जाँच्छन्, मतपत्र दिन्छन् र मतदानपछि मतपेटिका सुरक्षित गर्छन्।",
      "नेपालमा मतदान केन्द्रको संख्या र स्थान निर्वाचन र जिल्लाअनुसार फरक हुन्छ।"
    ],
    facts: [
      { labelEN: "National total", labelNE: "राष्ट्रिय जम्मा", valueEN: "To confirm, varies by election", valueNE: "पुष्टि गर्न बाँकी, निर्वाचनअनुसार फरक पर्छ" }
    ],
    related: ["voter-roll"],
    sources: []
  }
];
