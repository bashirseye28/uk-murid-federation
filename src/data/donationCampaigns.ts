// donationCampaigns.ts
export type DonationItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  /** default → 'donation'; use 'registration' for items that need attendee details */
  formType?: 'donation' | 'registration';
};

export type DonationCampaign = {
  id: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate:   string; // YYYY-MM-DD
  items: DonationItem[];
};

export const donationCampaigns: DonationCampaign[] = [
  {
    id: 'bambaDay',
    name: 'Barkeelu – Bamba Day 2025',
    startDate: '2025-01-01',
    endDate:   '2025-07-01',
    items: [
      {
        id: 1,
        title: '1 Lamb (Xar)',
        description: 'Help provide a sheep for communal meals during Bamba Day.',
        image: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746762980/closeup-shot-argali-blurred-background_181624-34583_ytzkhn.jpg',
        price: 200,
      },
      {
        id: 2,
        title: 'Carte Barkeelu',
        description: 'Register your attendance and support Bamba Day.',
        image: 'https://res.cloudinary.com/drulwmdhg/image/upload/v1748300816/WhatsApp_Image_2025-05-21_at_10.35.45_1_d6oqzm.jpg',
        price: 30,
        formType: 'registration',              //  ➜ triggers the special form
      },
      {
        id: 3,
        title: 'Drinks & Beverages',
        description: 'Refreshments to keep attendees hydrated.',
        image: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746762453/healthy-juice-bottles-assortment_23-2148785310_hwczgf.jpg',
        price: 20,
      },
      {
        id: 4,
        title: 'Water Packs',
        description: 'Supply clean water for the entire event.',
        image: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746762337/realistic-plastic-water-bottle-packaging-set-with-isolated-images-branded-transparent-bottles-different-size-vector-illustration_1284-69181_tbz7vv.jpg',
        price: 15,
      },
      {
        id: 5,
        title: 'Rice (Sack)',
        description: 'Contribute a sack of rice to support meals.',
        image: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746762268/sack-white-rice-wooden-spoon-place-wooden-floor_1150-34314_o51wir.jpg',
        price: 25,
      },
      {
        id: 6,
        title: 'Cooking Oil',
        description: 'Support food preparation with cooking oil.',
        image: 'https://res.cloudinary.com/drulwmdhg/image/upload/v1748301113/79476815724574_dkifre.webp',
        price: 50,
      },
    ],
  },
  {
    id: 'addiya',
    name: 'Addiya – Grand Magal 2025',
    startDate: '2025-07-02',
    endDate:   '2025-09-30',
    items: [
      {
        id: 1,
        title: 'General Addiya',
        description: 'Contribute to Addiya to support the Grand Magal of Touba.',
        image: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746762980/closeup-shot-argali-blurred-background_181624-34583_ytzkhn.jpg',
        price: 100,
      },
    ],
  },
  {
    id: 'social',
    name: 'Janazah Support – Repatriation Fund',
    startDate: '2025-10-01',
    endDate:   '9999-12-31',
    items: [
      {
        id: 1,
        title: 'Repatriation Support',
        description: 'Help cover costs to transport deceased Murid members back to Senegal for proper Islamic burial.',
        image: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746762337/realistic-plastic-water-bottle-packaging-set-with-isolated-images-branded-transparent-bottles-different-size-vector-illustration_1284-69181_tbz7vv.jpg',
        price: 200,
      },
    ],
  },
];