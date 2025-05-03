const places = [
  {
    category: "Cultural Triangle (Ancient Cities)",
    icon: "🏯",
    provinces: ["North Central", "Central"],
    places: [
      "Sigiriya Rock",
      "Dambulla Caves",
      "Anuradhapura Stupas",
      "Polonnaruwa Ruins"
    ],
  },
  {
    category: "Hill Country & Scenic Highlands",
    icon: "🏞️",
    provinces: ["Central", "Uva", "Sabaragamuwa"],
    places: [
      "Nine-Arches Bridge",
      "World’s End",
      "Nuwara Eliya",
      "Lipton’s Seat"
    ],
  },
  {
    category: "Wildlife Safari",
    icon: "🐘",
    provinces: ["Southern", "Uva", "North Western"],
    places: [
      "Yala NP",
      "Udawalawe NP",
      "Wilpattu NP",
      "Minneriya / Kaudulla"
    ],
  },
  {
    category: "South Coast Beaches",
    icon: "🏖️",
    provinces: ["Southern"],
    places: ["Mirissa", "Unawatuna", "Tangalle", "Weligama"],
  },
  {
    category: "East Coast Beaches",
    icon: "🏖️",
    provinces: ["Eastern"],
    places: ["Arugam Bay", "Nilaveli", "Passikudah", "Whisky Point"],
  },
  {
    category: "Remote & Untouched Beaches",
    icon: "🏝️",
    provinces: ["Northern", "North Western"],
    places: [
      "Kalpitiya Sand-Spit",
      "Casuarina Beach",
      "Delft Island"
    ],
  },
  {
    category: "Buddhist Pilgrimage Sites",
    icon: "☸️",
    provinces: ["Central", "North Central", "Sabaragamuwa"],
    places: [
      "Temple of Tooth",
      "Mihintale",
      "Sri Maha Bodhi",
      "Adam’s Peak"
    ],
  },
  {
    category: "Hindu Religious Heritage",
    icon: "🕌",
    provinces: ["Northern", "Eastern", "North Western"],
    places: ["Nallur Kovil", "Koneswaram", "Munneswaram"],
  },
  {
    category: "Rock Formations & Mountain Peaks",
    icon: "🌋",
    provinces: ["Central", "Uva", "North Central"],
    places: [
      "Pidurangala",
      "Little Adam’s Peak",
      "Riverston",
      "Ella Rock"
    ],
  },
  {
    category: "Rainforests & Nature Reserves",
    icon: "🌲",
    provinces: ["Sabaragamuwa", "Southern"],
    places: [
      "Sinharaja",
      "Kanneliya",
      "Kitulgala Makandawa"
    ],
  },
  {
    category: "Colonial Forts & History",
    icon: "🏰",
    provinces: ["Southern", "Western", "Northern"],
    places: [
      "Galle Fort",
      "Jaffna Fort",
      "Colombo Dutch Hospital"
    ],
  },
  {
    category: "City Life & Urban Exploration",
    icon: "🌆",
    provinces: ["Western"],
    places: ["Colombo (Lotus Tower, Galle Face)", "Negombo"],
  },
  {
    category: "Tea Country & Plantations",
    icon: "🌄",
    provinces: ["Central", "Uva"],
    places: [
      "Pedro Tea Estate",
      "Hatton Trails",
      "Haputale"
    ],
  },
  {
    category: "Eco & Adventure Tourism",
    icon: "🚴",
    provinces: ["Uva", "Central", "Eastern"],
    places: [
      "Diyaluma Falls",
      "Knuckles",
      "Meemure",
      "Kitulgala"
    ],
  },
  {
    category: "Scenic Viewpoints & Sunsets",
    icon: "🌅",
    provinces: ["Uva", "Southern", "Central"],
    places: [
      "Lipton’s Seat",
      "Coconut Tree Hill",
      "Gregory Lake"
    ],
  },
  {
    category: "Marine Life & Whale Watching",
    icon: "🐳",
    provinces: ["Southern", "Eastern", "North Western"],
    places: ["Mirissa", "Trincomalee", "Kalpitiya"],
  },
  {
    category: "Shopping & Nightlife",
    icon: "🛍️",
    provinces: ["Western"],
    places: ["One Galle Face", "Pettah", "Dutch Hospital"],
  },
  {
    category: "Museums & Arts (Libraries)",
    icon: "🖼️",
    provinces: ["Western", "Central", "Northern"],
    places: [
      "Colombo Museum",
      "Kandy Museum",
      "Jaffna Library"
    ],
  },
  {
    category: "Water Sports & Diving",
    icon: "⛵",
    provinces: ["Southern", "Eastern", "North Western"],
    places: [
      "Weligama Surf",
      "Nilaveli Dive",
      "Kalpitiya Kite"
    ],
  },
  {
    category: "Spiritual & Meditation Retreats",
    icon: "🧘",
    provinces: ["Central", "Southern", "Sabaragamuwa"],
    places: [
      "Nilambe",
      "Bodhinagala",
      "Dambulla Monastery"
    ],
  },
  {
    category: "Hiking & Nature Trails",
    icon: "🥾",
    provinces: ["Central", "Uva", "Sabaragamuwa"],
    places: [
      "Knuckles Five-Peaks",
      "Horton Plains",
      "Namunukula"
    ],
  },
  {
    category: "Fishing Villages & Lagoons",
    icon: "🎣",
    provinces: ["North Western", "Northern", "Eastern"],
    places: ["Kalpitiya Lagoon", "Batticaloa", "Mannar"],
  },
  {
    category: "Cultural Shows & Dance Rituals",
    icon: "🎭",
    provinces: ["Central", "Western", "Southern"],
    places: [
      "Kandy Show",
      "Nelum Pokuna",
      "Kohomba Kankariya"
    ],
  },
  {
    category: "Ayurveda & Wellness (Yoga)",
    icon: "🍃",
    provinces: ["Western", "Central", "Southern"],
    places: [
      "Bentota Spa",
      "Siddhalepa Wadduwa",
      "Kandy Retreats"
    ],
  },
  {
    category: "Camping, Glamping & Eco Lodges",
    icon: "⛺",
    provinces: ["Central", "Southern", "North Central"],
    places: [
      "Knuckles Camps",
      "Udawalawe Tents",
      "Sigiriya Ecolodges"
    ],
  },
  {
    category: "Turtle Watching & Conservation",
    icon: "🐢",
    provinces: ["Southern"],
    places: ["Kosgoda", "Rekawa", "Koggala"],
  },
  {
    category: "River & Water Adventures",
    icon: "🚣",
    provinces: ["Sabaragamuwa", "Southern", "Western"],
    places: ["Kitulgala", "Madu Ganga", "Kelani River"],
  },
  {
    category: "Bird Watching",
    icon: "🐦",
    provinces: ["Eastern", "North Central", "North Western"],
    places: ["Kumana", "Bundala", "Anawilundawa"],
  },
  {
    category: "Archaeological Ruins & Excavations",
    icon: "🏛️",
    provinces: ["North Central", "Eastern"],
    places: ["Jetavanaramaya", "Ritigala", "Seruwila"],
  },
  {
    category: "Rock Climbing & Caving",
    icon: "🧗",
    provinces: ["Central", "North Western"],
    places: [
      "Sigiriya Face Climb",
      "Batatotalena Cave"
    ],
  },
  {
    category: "Island Hopping & Boat Safaris",
    icon: "🛶",
    provinces: ["Northern", "Eastern"],
    places: [
      "Delft Island",
      "Pigeon Island",
      "Mannar Sandbanks"
    ],
  }
];

module.exports = places;