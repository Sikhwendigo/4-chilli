/* ============================================================
   4 CHILLI — MENU DATA
   Transcribed from 4Chilli_Menu_A4.pdf · effective 01 June 2026
   ------------------------------------------------------------
   To update prices, edit only this file. Nothing else needs to change.

   item = {
     name    : string
     note    : string   (small grey text after the name, optional)
     diet    : 'meat' | 'veg' | 'vegan'
     heat    : 0-4      (indicative chilli rating — see README)
     prices  : array aligned to the section's `cols`. Use null for
               "not available in this size".
   }
   ============================================================ */

const MENU = [
  {
    id: 'curry-rice',
    name: 'Curry & Rice Combos',
    short: 'Curry & Rice',
    tagline: 'Prepared Durban-style · served with basmati rice',
    cols: [{ label: 'Med' }, { label: 'Large' }],
    groups: [
      {
        name: 'Meat',
        items: [
          { name: 'Mutton Curry & Rice', diet: 'meat', heat: 3, prices: [115, 129] },
          { name: 'Mutton Curry & Rice', note: 'deboned', diet: 'meat', heat: 3, prices: [124, 149] },
          { name: 'Mutton Mince Curry & Rice', diet: 'meat', heat: 3, prices: [135, 155] },
          { name: 'Chicken Curry & Rice', diet: 'meat', heat: 2, prices: [110, 125] },
          { name: 'Chicken Curry & Rice', note: 'deboned', diet: 'meat', heat: 2, prices: [120, 135] },
          { name: 'Lamb Curry Deboned with Chips', diet: 'meat', heat: 3, prices: [130, null] },
          { name: 'Mutton Curry on Chips', diet: 'meat', heat: 3, prices: [135, null] }
        ]
      },
      {
        name: 'Veg',
        note: 'vegan friendly',
        items: [
          { name: 'Bean Curry & Rice', diet: 'vegan', heat: 2, prices: [99, 115] },
          { name: 'Mix Veg Curry & Rice', diet: 'vegan', heat: 2, prices: [99, 115] },
          { name: 'Dhall & Rice', diet: 'vegan', heat: 1, prices: [70, 85] }
        ]
      },
      {
        name: 'Curries Only',
        note: 'no rice',
        items: [
          { name: 'Mutton Curry On Bone', diet: 'meat', heat: 3, prices: [109, 125] },
          { name: 'Mutton Curry', note: 'deboned', diet: 'meat', heat: 3, prices: [119, 135] },
          { name: 'Mutton Mince Curry', diet: 'meat', heat: 3, prices: [125, 139] },
          { name: 'Chicken Curry On Bone', diet: 'meat', heat: 2, prices: [99, 115] },
          { name: 'Chicken Curry', note: 'deboned', diet: 'meat', heat: 2, prices: [110, 130] },
          { name: 'Bean or Veg Curry', diet: 'vegan', heat: 2, prices: [89, 110] }
        ]
      }
    ]
  },

  {
    id: 'breyanis',
    name: "Breyani's",
    short: 'Breyani',
    tagline: 'Slow-cooked with basmati rice, potato and whole spice',
    cols: [{ label: 'Sml' }, { label: 'Med' }, { label: 'Lge' }],
    groups: [
      {
        items: [
          { name: 'Mutton Breyani', diet: 'meat', heat: 3, prices: [89, 119, 139] },
          { name: 'Mutton Breyani', note: 'deboned', diet: 'meat', heat: 3, prices: [110, 135, 159] },
          { name: 'Chicken Breyani', diet: 'meat', heat: 2, prices: [82, 115, 130] },
          { name: 'Chicken Breyani', note: 'deboned', diet: 'meat', heat: 2, prices: [95, 125, 145] },
          { name: 'Vegetable Breyani', diet: 'vegan', heat: 2, prices: [75, 99, 120] }
        ]
      }
    ]
  },

  {
    id: 'bunny-chows',
    name: 'Bunny Chows',
    short: 'Bunny Chow',
    tagline: 'Traditional Durban-style, served in a hollow loaf',
    cols: [
      /* `short` is appended to the price label on narrow screens, where the
         grouped column header is hidden and 1/4 alone would be ambiguous. */
      { label: '1/4', group: 'In a hollow loaf', short: 'loaf' },
      { label: '1/2', group: 'In a hollow loaf', short: 'loaf' },
      { label: '1/4', group: 'Deconstructed', short: 'packed' },
      { label: '1/2', group: 'Deconstructed', short: 'packed' }
    ],
    groups: [
      {
        items: [
          { name: 'Mutton On Bone', diet: 'meat', heat: 3, prices: [105, 170, 110, 180] },
          { name: 'Mutton', note: 'deboned', diet: 'meat', heat: 3, prices: [125, 190, 130, 205] },
          { name: 'Mutton Mince', diet: 'meat', heat: 3, prices: [130, 195, 135, 205] },
          { name: 'Chicken On Bone', diet: 'meat', heat: 2, prices: [99, 165, 105, 175] },
          { name: 'Chicken', note: 'deboned', diet: 'meat', heat: 2, prices: [115, 180, 120, 190] },
          { name: 'Beans', diet: 'vegan', heat: 2, prices: [90, 120, 95, 130] },
          { name: 'Mix Veg', diet: 'vegan', heat: 2, prices: [95, 135, 100, 135] }
        ]
      }
    ]
  },

  {
    id: 'roti-rolls',
    name: 'Roti Rolls',
    short: 'Roti Rolls',
    tagline: 'Rolled tight in a soft buttered roti',
    cols: [{ label: 'Roti' }, { label: '+ Chips' }],
    groups: [
      {
        items: [
          { name: 'Chips & Cheese Roti', diet: 'veg', heat: 1, prices: [55, 62] },
          { name: 'Chicken Roti', diet: 'meat', heat: 2, prices: [90, 99] },
          { name: 'Mutton Roti', diet: 'meat', heat: 3, prices: [95, 108] },
          { name: 'Mutton Mince Roti', diet: 'meat', heat: 3, prices: [99, 110] },
          { name: 'Mutton Kebaab Roti', diet: 'meat', heat: 3, prices: [105, 115] },
          { name: 'Bean Curry Roti', diet: 'vegan', heat: 2, prices: [80, 90] },
          { name: 'Mixed Veg Curry Roti', diet: 'vegan', heat: 2, prices: [85, 95] }
        ]
      }
    ]
  },

  {
    id: 'samoosas',
    name: "Samoosa's",
    short: 'Samoosas',
    tagline: 'Hand-folded, fried to order',
    cols: [{ label: "3's" }, { label: "6's" }, { label: "12's" }],
    groups: [
      {
        items: [
          { name: 'Mutton Mince', diet: 'meat', heat: 2, prices: [30, 55, 100] },
          { name: 'Chicken Mince', diet: 'meat', heat: 2, prices: [30, 55, 100] },
          { name: 'Corn & Onion', note: 'vegan', diet: 'vegan', heat: 1, prices: [30, 55, 100] },
          { name: 'Corn & Cheese', diet: 'veg', heat: 1, prices: [30, 55, 100] },
          { name: 'Yellow Potato', note: 'vegan', diet: 'vegan', heat: 1, prices: [30, 55, 100] }
        ]
      }
    ]
  },

  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    short: 'Butter Chicken',
    tagline: 'Creamy chicken fillet in butter gravy',
    cols: [{ label: 'Price' }],
    groups: [
      {
        items: [
          { name: 'Butter Chicken & Rice', diet: 'meat', heat: 1, prices: [120] },
          { name: "Butter Chicken & 2 Roti's", diet: 'meat', heat: 1, prices: [120] },
          { name: 'Butter Chicken Only', diet: 'meat', heat: 1, prices: [110] }
        ]
      }
    ]
  },

  {
    id: 'masala-chicken',
    name: 'Saucy Masala Chicken',
    short: 'Masala Chicken',
    tagline: 'Sticky, saucy and built to share',
    cols: [{ label: 'Price' }],
    groups: [
      {
        items: [
          { name: '4 Piece Masala Chicken', note: "2 roti's & chips", diet: 'meat', heat: 3, prices: [115] },
          { name: '6 Piece Masala Chicken', note: "3 roti's & chips", diet: 'meat', heat: 3, prices: [135] }
        ]
      }
    ]
  },

  {
    id: 'specialities',
    name: 'Specialities',
    short: 'Specialities',
    tagline: 'The CHEEZA — curry, cheese and a grilled finish',
    cols: [{ label: 'Price' }],
    groups: [
      {
        items: [
          { name: 'Mutton CHEEZA', diet: 'meat', heat: 3, prices: [135] },
          { name: 'Chicken CHEEZA', diet: 'meat', heat: 2, prices: [125] },
          { name: 'Bean CHEEZA', diet: 'veg', heat: 2, prices: [115] }
        ]
      }
    ]
  },

  {
    id: 'toasted',
    name: 'Toasted Sandwiches',
    short: 'Toasties',
    tagline: 'Served with chips',
    cols: [{ label: 'Price' }],
    groups: [
      {
        items: [
          { name: 'Curried Mutton', diet: 'meat', heat: 3, prices: [75] },
          { name: 'Curried Chicken', diet: 'meat', heat: 2, prices: [65] },
          { name: 'Curried Mutton Mince', diet: 'meat', heat: 3, prices: [80] },
          { name: 'Curried Bean Sandwich', diet: 'veg', heat: 2, prices: [60] },
          { name: 'Cheese & Tomato', diet: 'veg', heat: 0, prices: [55] }
        ]
      }
    ]
  },

  {
    id: 'sides',
    name: 'Sides',
    short: 'Sides',
    tagline: 'The supporting cast',
    cols: [{ label: 'Sml' }, { label: 'Med' }, { label: 'Lge' }],
    groups: [
      {
        items: [
          { name: 'Plain Chips', diet: 'vegan', heat: 0, prices: [29, 36, 46] },
          { name: 'Masala Chips', diet: 'vegan', heat: 2, prices: [35, 49, 60] },
          { name: 'Gravy', diet: 'meat', heat: 2, prices: [20, 35, 50] },
          { name: 'Carrot Salad', diet: 'vegan', heat: 1, prices: [20, 35, 45] },
          { name: 'Dhall', diet: 'vegan', heat: 1, prices: [29, 55, 75] },
          { name: 'Chicken Strips & Chips', note: 'kiddies', diet: 'meat', heat: 0, prices: [49, null, null] },
          { name: 'Roti', note: 'each', diet: 'veg', heat: 0, prices: [9.5, null, null] },
          { name: 'Pappadum', note: 'each', diet: 'veg', heat: 0, prices: [9.5, null, null] }
        ]
      }
    ]
  }
];

/* ── Homepage signature cards ─────────────────────────────────
   NOTE: images in /img are free-licence stock stand-ins (see
   CREDITS.md). Swap them for real photos of your own food —
   just drop replacements in at the same paths.
   ─────────────────────────────────────────────────────────── */
const SIGNATURES = [
  {
    tag: 'Most ordered',
    name: 'Mutton Breyani',
    desc: 'Bone-in mutton cooked down with basmati, potato and whole spice until the rice takes the colour and the meat gives way.',
    from: 89,
    heat: 3,
    jump: 'breyanis',
    img: 'img/breyani.jpg',
    alt: 'Mutton breyani in a copper bowl with potato, mint and whole green chillies'
  },
  {
    tag: 'The classic',
    name: '¼ Bunny Chow',
    desc: 'A quarter loaf hollowed out and filled to the rim with curry. Served with the scooped-out bread and a carrot salad.',
    from: 99,
    heat: 3,
    jump: 'bunny-chows',
    img: 'img/bunny-chow.jpg',
    alt: 'A quarter loaf of white bread hollowed out and filled with mutton curry, coriander on top and a carrot salad alongside'
  },
  {
    tag: 'Crowd pleaser',
    name: 'Butter Chicken',
    desc: 'Chicken fillet in a slow-reduced butter gravy. Mild, rich and dangerously easy to finish.',
    from: 110,
    heat: 1,
    jump: 'butter-chicken',
    img: 'img/butter-chicken.jpg',
    alt: 'Butter chicken in a copper karahi swirled with cream, served with basmati rice and roti beside a 4 Chilli branded bag'
  },
  {
    tag: 'Plant-based',
    name: 'Dhall & Rice',
    desc: 'Lentils cooked down slow with jeera, garlic and a whole-chilli tarka poured over at the end. Vegan as it comes.',
    from: 70,
    heat: 1,
    jump: 'curry-rice',
    img: 'img/dhall.jpg',
    alt: 'Golden dhall in a copper karahi finished with fresh curry leaves, served alongside breyani'
  },
  {
    tag: 'House speciality',
    name: 'The CHEEZA',
    desc: 'Curry and chips loaded onto a roti base, buried under melted cheese and finished on the grill. Comes with carrot salad.',
    from: 115,
    heat: 3,
    jump: 'specialities',
    img: 'img/cheeza.jpg',
    alt: 'A CHEEZA — curry and chips on a roti base under melted cheese, topped with coriander, with roti and carrot salad alongside'
  },
  {
    tag: 'The staple',
    name: 'Mutton Curry & Rice',
    desc: 'Mutton on the bone in a thick Durban gravy with potato, served with basmati, roti and a carrot salad.',
    from: 115,
    heat: 3,
    jump: 'curry-rice',
    img: 'img/curry-rice.jpg',
    alt: 'Mutton curry with potato in a copper karahi, served with a bowl of basmati rice, roti and carrot salad'
  }
];

/* ── Trading hours ────────────────────────────────────────────
   24h format. null = closed that day.
   ─────────────────────────────────────────────────────────── */
const HOURS = [
  { day: 'Monday', open: '09:00', close: '19:00' },
  { day: 'Tuesday', open: '09:00', close: '19:00' },
  { day: 'Wednesday', open: '09:00', close: '19:00' },
  { day: 'Thursday', open: '09:00', close: '19:00' },
  { day: 'Friday', open: '09:00', close: '19:00' },
  { day: 'Saturday', open: '09:00', close: '19:00' },
  { day: 'Sunday', open: '10:00', close: '17:00' }
];

/* ── Public holidays — closed ─────────────────────────────────
   South African public holidays. Without these the "Open now"
   badge would wrongly show open on a holiday.

   Includes the Public Holidays Act rule that a holiday falling on
   a Sunday is observed on the Monday. Good Friday and Family Day
   move with Easter, so they're listed explicitly per year.

   ⚠ Extend this list each year — after the last date below, the
   badge silently stops accounting for holidays.
   ─────────────────────────────────────────────────────────── */
const HOLIDAYS = {
  '2026-01-01': "New Year's Day",
  '2026-03-21': 'Human Rights Day',
  '2026-04-03': 'Good Friday',
  '2026-04-06': 'Family Day',
  '2026-04-27': 'Freedom Day',
  '2026-05-01': "Workers' Day",
  '2026-06-16': 'Youth Day',
  '2026-08-09': "National Women's Day",
  '2026-08-10': "National Women's Day",
  '2026-09-24': 'Heritage Day',
  '2026-12-16': 'Day of Reconciliation',
  '2026-12-25': 'Christmas Day',
  '2026-12-26': 'Day of Goodwill',

  '2027-01-01': "New Year's Day",
  '2027-03-21': 'Human Rights Day',
  '2027-03-22': 'Human Rights Day',
  '2027-03-26': 'Good Friday',
  '2027-03-29': 'Family Day',
  '2027-04-27': 'Freedom Day',
  '2027-05-01': "Workers' Day",
  '2027-06-16': 'Youth Day',
  '2027-08-09': "National Women's Day",
  '2027-09-24': 'Heritage Day',
  '2027-12-16': 'Day of Reconciliation',
  '2027-12-25': 'Christmas Day',
  '2027-12-26': 'Day of Goodwill',
  '2027-12-27': 'Day of Goodwill'
};

/* ── Business details ─────────────────────────────────────── */
const SHOP = {
  /* WhatsApp orders go here. International format, no +, spaces or leading zero.
     +27 83 786 4410  ->  27837864410 */
  whatsapp: '27837864410',
  phone: '+27127717863',
  /* The kitchen stops taking food orders this many minutes before the shop
     closes. Drives both the hours note and the "Open now" badge. */
  kitchenClosesEarlyMins: 30
};
