export const mockCities = [
  { id: 'city-1', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
  { id: 'city-2', name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80' },
  { id: 'city-3', name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
  { id: 'city-4', name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80' },
  { id: 'city-5', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  { id: 'city-6', name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
  { id: 'city-7', name: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' },
  { id: 'city-8', name: 'New York', country: 'United States', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
];

export const mockActivitiesByCity = {
  Paris: [
    { id: 'act-p1', name: 'Eiffel Tower Summit Tour', category: 'Sightseeing', duration: '2-3 hrs', cost: '€35' },
    { id: 'act-p2', name: 'Louvre Museum Guided Walk', category: 'Culture', duration: '3 hrs', cost: '€22' },
    { id: 'act-p3', name: 'Seine River Sunset Cruise', category: 'Sightseeing', duration: '1.5 hrs', cost: '€18' },
    { id: 'act-p4', name: 'Montmartre Food & Bakery Tour', category: 'Food & Drink', duration: '2.5 hrs', cost: '€45' },
  ],
  Rome: [
    { id: 'act-r1', name: 'Colosseum & Roman Forum Tour', category: 'Culture', duration: '3 hrs', cost: '€30' },
    { id: 'act-r2', name: 'Vatican Museums & Sistine Chapel', category: 'Culture', duration: '3.5 hrs', cost: '€38' },
    { id: 'act-r3', name: 'Trastevere Evening Pizza & Wine Walk', category: 'Food & Drink', duration: '2 hrs', cost: '€40' },
    { id: 'act-r4', name: 'Trevi Fountain & Spanish Steps Stroll', category: 'Sightseeing', duration: '1.5 hrs', cost: 'Free' },
  ],
  Tokyo: [
    { id: 'act-t1', name: 'Senso-ji Temple & Asakusa Walk', category: 'Culture', duration: '2 hrs', cost: 'Free' },
    { id: 'act-t2', name: 'Shibuya Crossing & Harajuku Food Tasting', category: 'Food & Drink', duration: '3 hrs', cost: '¥4,500' },
    { id: 'act-t3', name: 'teamLab Planets Digital Art Exhibition', category: 'Culture', duration: '2 hrs', cost: '¥3,800' },
    { id: 'act-t4', name: 'Tokyo Skytree Observation Deck', category: 'Sightseeing', duration: '1.5 hrs', cost: '¥2,700' },
  ],
  Barcelona: [
    { id: 'act-b1', name: 'Sagrada Família Fast-Track Entry', category: 'Culture', duration: '2 hrs', cost: '€26' },
    { id: 'act-b2', name: 'Park Güell & Gaudi Architecture Walk', category: 'Sightseeing', duration: '2.5 hrs', cost: '€10' },
    { id: 'act-b3', name: 'Gothic Quarter Tapas & Sangria Night', category: 'Food & Drink', duration: '3 hrs', cost: '€35' },
  ],
  Bali: [
    { id: 'act-ba1', name: 'Ubud Rice Terrace & Jungle Swing', category: 'Adventure', duration: '4 hrs', cost: '$25' },
    { id: 'act-ba2', name: 'Tanah Lot Temple Sunset Experience', category: 'Sightseeing', duration: '2 hrs', cost: '$15' },
  ],
  DEFAULT: [
    { id: 'act-d1', name: 'City Center Guided Walking Tour', category: 'Sightseeing', duration: '2 hrs', cost: 'Free' },
    { id: 'act-d2', name: 'Local Culinary & Market Experience', category: 'Food & Drink', duration: '2.5 hrs', cost: '$30' },
    { id: 'act-d3', name: 'Historic Landmark Exploration', category: 'Culture', duration: '2 hrs', cost: '$15' },
  ],
};
