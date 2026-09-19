import { 
  AQIData, 
  EnvironmentalReport, 
  WasteCategoryInfo, 
  WasteItemLookup, 
  ScrapMaterial, 
  ScrapDealer, 
  Badge, 
  LeaderboardUser, 
  EcoReward, 
  UserProfile 
} from '../types';

export const AQI_LEVELS_INFO = [
  {
    range: '0 – 50',
    min: 0,
    max: 50,
    category: 'Good',
    categoryHi: 'अच्छा (Good)',
    colorCode: '#00E400',
    bgColor: 'bg-emerald-500',
    textColor: 'text-emerald-700',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    accentColor: '#10b981',
    healthSummary: 'Normal outdoor activity is fine.',
    healthSummaryHi: 'सामान्य बाहरी गतिविधियाँ सुरक्षित हैं। हवा ताज़ा और स्वच्छ है।',
    advice: 'Enjoy outdoor sports, walk freely, air quality is satisfactory.',
    maskRecommended: false
  },
  {
    range: '51 – 100',
    min: 51,
    max: 100,
    category: 'Moderate',
    categoryHi: 'मध्यम (Moderate)',
    colorCode: '#EAB308',
    bgColor: 'bg-amber-400',
    textColor: 'text-amber-800',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    accentColor: '#eab308',
    healthSummary: 'Fine for most; sensitive people should pay attention.',
    healthSummaryHi: 'अधिकतर लोगों के लिए ठीक; संवेदनशील व्यक्तियों को ध्यान देना चाहिए।',
    advice: 'Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion.',
    maskRecommended: false
  },
  {
    range: '101 – 150',
    min: 101,
    max: 150,
    category: 'Unhealthy for Sensitive Groups',
    categoryHi: 'संवेदनशील समूहों के लिए अस्वस्थ',
    colorCode: '#F97316',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-800',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-200',
    accentColor: '#f97316',
    healthSummary: 'Kids, older adults, and heart or lung conditions ease up.',
    healthSummaryHi: 'बच्चे, बुजुर्ग और सांस के रोगी बाहरी गतिविधियों में कमी करें।',
    advice: 'Members of sensitive groups should avoid long outdoor jogs. Wear a protective mask if near heavy traffic.',
    maskRecommended: true
  },
  {
    range: '151 – 200',
    min: 151,
    max: 200,
    category: 'Unhealthy',
    categoryHi: 'अस्वस्थ (Unhealthy)',
    colorCode: '#EF4444',
    bgColor: 'bg-red-500',
    textColor: 'text-red-800',
    lightBg: 'bg-red-50',
    borderColor: 'border-red-200',
    accentColor: '#ef4444',
    healthSummary: 'Everyone reduces heavy outdoor activity.',
    healthSummaryHi: 'सभी नागरिक भारी बाहरी व्यायाम कम करें।',
    advice: 'General public will begin to feel irritation. Sensitive groups should stay indoors. Keep windows closed.',
    maskRecommended: true
  },
  {
    range: '201 – 300',
    min: 201,
    max: 300,
    category: 'Very Unhealthy',
    categoryHi: 'बहुत अस्वस्थ (Very Unhealthy)',
    colorCode: '#8B5CF6',
    bgColor: 'bg-purple-600',
    textColor: 'text-purple-800',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    accentColor: '#8b5cf6',
    healthSummary: 'Move activities indoors.',
    healthSummaryHi: 'सभी गतिविधियाँ घर के भीतर करें।',
    advice: 'Health alert: increased risk for everyone. Run indoor HEPA air purifiers, wear N95 mask outside.',
    maskRecommended: true
  },
  {
    range: '301 – 500',
    min: 301,
    max: 500,
    category: 'Hazardous',
    categoryHi: 'खतरनाक (Hazardous)',
    colorCode: '#881337',
    bgColor: 'bg-rose-950',
    textColor: 'text-rose-900',
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    accentColor: '#881337',
    healthSummary: 'Avoid all outdoor exposure.',
    healthSummaryHi: 'सभी प्रकार के बाहरी संपर्क से बचें। आपातकालीन स्तर।',
    advice: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
    maskRecommended: true
  }
];

export const INITIAL_CITY_AQI: Record<string, AQIData> = {
  'Gurugram': {
    aqi: 79,
    category: 'Moderate',
    city: 'Gurugram',
    state: 'Haryana',
    temperature: 34,
    tempUnit: 'C',
    weatherCondition: 'Cloudy',
    timeString: 'Saturday, 3:00 pm',
    pm25: 25,
    pm10: 56,
    precipitation: 10,
    humidity: 58,
    windSpeed: 8,
    healthRecommendation: 'Air Quality is acceptable for most. Sensitive individuals may experience mild respiratory discomfort.',
    healthRecommendationHi: 'हवा की गुणवत्ता अधिकांश के लिए स्वीकार्य है। संवेदनशील लोगों को हल्की बेचैनी हो सकती है।'
  },
  'New Delhi': {
    aqi: 168,
    category: 'Unhealthy',
    city: 'New Delhi',
    state: 'Delhi NCR',
    temperature: 33,
    tempUnit: 'C',
    weatherCondition: 'Hazy Sun',
    timeString: 'Saturday, 3:00 pm',
    pm25: 88,
    pm10: 182,
    precipitation: 5,
    humidity: 52,
    windSpeed: 6,
    healthRecommendation: 'Air quality is Unhealthy. Limit strenuous outdoor activities and wear an N95 mask if outdoors.',
    healthRecommendationHi: 'हवा अस्वस्थ है। बाहरी व्यायाम कम करें और बाहर जाते समय मास्क पहनें।'
  },
  'Noida': {
    aqi: 142,
    category: 'Unhealthy for Sensitive Groups',
    city: 'Noida',
    state: 'Uttar Pradesh',
    temperature: 35,
    tempUnit: 'C',
    weatherCondition: 'Partly Cloudy',
    timeString: 'Saturday, 3:00 pm',
    pm25: 54,
    pm10: 120,
    precipitation: 0,
    humidity: 49,
    windSpeed: 9,
    healthRecommendation: 'Sensitive individuals such as children, elderly, and asthmatics should limit prolonged outdoor exertion.',
    healthRecommendationHi: 'बच्चे, बुजुर्ग और सांस के मरीज बाहर लंबे समय तक रहने से बचें।'
  },
  'Bengaluru': {
    aqi: 42,
    category: 'Good',
    city: 'Bengaluru',
    state: 'Karnataka',
    temperature: 26,
    tempUnit: 'C',
    weatherCondition: 'Light Breezy',
    timeString: 'Saturday, 3:00 pm',
    pm25: 11,
    pm10: 28,
    precipitation: 20,
    humidity: 68,
    windSpeed: 14,
    healthRecommendation: 'Clean and fresh air. Perfect conditions for outdoor recreation, cycling, and opening windows.',
    healthRecommendationHi: 'स्वच्छ और ताज़ी हवा। बाहरी खेल और ताज़ी हवा के लिए उत्तम समय।'
  },
  'Mumbai': {
    aqi: 92,
    category: 'Moderate',
    city: 'Mumbai',
    state: 'Maharashtra',
    temperature: 31,
    tempUnit: 'C',
    weatherCondition: 'Humid & Overcast',
    timeString: 'Saturday, 3:00 pm',
    pm25: 32,
    pm10: 74,
    precipitation: 35,
    humidity: 78,
    windSpeed: 16,
    healthRecommendation: 'Moderate air quality. Safe for standard daily commutes and normal outdoor routines.',
    healthRecommendationHi: 'मध्यम वायु गुणवत्ता। सामान्य दिनचर्या और काम के लिए सुरक्षित।'
  },
  'Jaipur': {
    aqi: 118,
    category: 'Unhealthy for Sensitive Groups',
    city: 'Jaipur',
    state: 'Rajasthan',
    temperature: 36,
    tempUnit: 'C',
    weatherCondition: 'Sunny & Dry',
    timeString: 'Saturday, 3:00 pm',
    pm25: 42,
    pm10: 135,
    precipitation: 0,
    humidity: 34,
    windSpeed: 11,
    healthRecommendation: 'Dust particles elevated due to dry winds. Sensitive groups should wear face coverings.',
    healthRecommendationHi: 'धूल के कणों के कारण हल्की बेचैनी संभव। मास्क का प्रयोग करें।'
  }
};

export const WASTE_CATEGORIES: WasteCategoryInfo[] = [
  {
    id: 'wet',
    name: 'Wet Waste (Organic / Kitchen)',
    nameHi: 'गीला कचरा (जैविक / रसोई)',
    binColor: '#16a34a', // Emerald Green
    binColorName: 'Green Bin (हरा डिब्बा)',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textColor: 'text-emerald-800',
    iconName: 'Apple',
    description: 'Biodegradable kitchen waste and organic food remains that decompose naturally into nutrient-rich compost.',
    examples: [
      'Fruit & vegetable peels',
      'Cooked food leftovers & rice',
      'Tea leaves & coffee grounds',
      'Eggshells & nutshells',
      'Garden leaves, flowers, & grass',
      'Rotten bread, roti & snacks'
    ],
    doNotMix: [
      'Plastic bags or wrappers',
      'Milk / curd packets',
      'Diapers and sanitary napkins',
      'Aluminum foil food wrappers'
    ],
    tips: 'Do not tie wet waste inside plastic polythenes. Use newspaper lining or directly deposit into the Green Bin for municipal composting.'
  },
  {
    id: 'dry',
    name: 'Dry Waste (Recyclable)',
    nameHi: 'सूखा कचरा (पुनर्चक्रण योग्य)',
    binColor: '#2563eb', // Royal Blue
    binColorName: 'Blue Bin (नीला डिब्बा)',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200',
    textColor: 'text-blue-800',
    iconName: 'Package',
    description: 'Non-biodegradable, clean and dry materials that can be sorted and transformed into recycled raw materials.',
    examples: [
      'Clean plastic bottles (PET) & containers',
      'Newspapers, books, magazines & cardboard',
      'Aluminium drink cans & tin containers',
      'Clean milk pouches (rinsed & dried)',
      'Glass bottles & jars (unbroken)',
      'Old fabric, clothes & textile scraps'
    ],
    doNotMix: [
      'Food-soiled greasy pizza boxes',
      'Wet kitchen food scraps',
      'Used tissues or face wipes',
      'Chemicals or paint containers'
    ],
    tips: 'Rinse liquid containers like milk pouches or juice boxes before tossing. Keep all dry waste free from food grease.'
  },
  {
    id: 'ewaste',
    name: 'Electronic Waste (E-Waste)',
    nameHi: 'ई-कचरा (इलेक्ट्रॉनिक्स)',
    binColor: '#ea580c', // Orange
    binColorName: 'Orange / Black Bin (ई-कचरा डिब्बा)',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    textColor: 'text-orange-800',
    iconName: 'Cpu',
    description: 'Discarded electrical or electronic equipment containing valuable metals and toxic heavy elements that require certified dismantling.',
    examples: [
      'Old smartphones, chargers & cables',
      'Dry cell & rechargeable batteries',
      'Broken headphones & remotes',
      'Computer motherboards, mice & keyboards',
      'Small kitchen appliances (toasters, blenders)',
      'LED bulbs, tube lights & PCB circuits'
    ],
    doNotMix: [
      'Standard wet kitchen waste',
      'Ordinary plastic wrapping',
      'General dry household trash'
    ],
    tips: 'Never burn or throw electronics in open land. Hand them over to our verified E-Waste recycling partners or scrap dealers for cash.'
  },
  {
    id: 'hazardous',
    name: 'Domestic Hazardous Waste',
    nameHi: 'घरेलू खतरनाक कचरा',
    binColor: '#dc2626', // Red
    binColorName: 'Red Bin (लाल डिब्बा)',
    bgLight: 'bg-red-50',
    borderLight: 'border-red-200',
    textColor: 'text-red-800',
    iconName: 'AlertTriangle',
    description: 'Toxic, flammable, corrosive, or chemically reactive items that pose acute environmental and sanitation worker hazards.',
    examples: [
      'Expired prescription medicines & syrups',
      'Pesticide sprays & insect repellant cans',
      'Paint cans, varnishes & chemical thinners',
      'Car motor oil & brake fluid bottles',
      'Mercury thermometers & compact fluorescent lamps',
      'Bleach, acid bathroom cleaners'
    ],
    doNotMix: [
      'Food waste or clean compostables',
      'Standard blue bin recyclables'
    ],
    tips: 'Wrap safely in marked containers. Inform sanitation collectors explicitly when handing over domestic hazardous waste.'
  },
  {
    id: 'sanitary',
    name: 'Sanitary Waste',
    nameHi: 'सेनेटरी कचरा',
    binColor: '#d97706', // Yellow / Red marking
    binColorName: 'Yellow Bin / Red Marked Pouch',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200',
    textColor: 'text-amber-900',
    iconName: 'ShieldAlert',
    description: 'Personal hygiene items containing bodily fluids, requiring safe incinerator processing to protect sanitation workers.',
    examples: [
      'Sanitary pads & tampons',
      'Baby & adult diapers',
      'Used band-aids, cotton swabs & dressings',
      'Medical syringes (capped safely)',
      'Incontinence pads'
    ],
    doNotMix: [
      'Dry recyclable paper or plastic',
      'Kitchen green compost waste'
    ],
    tips: 'Always wrap securely in paper/newspaper and mark with a visible RED "X" symbol so sanitation workers can handle with safety gloves.'
  }
];

export const WASTE_LOOKUP_ITEMS: WasteItemLookup[] = [
  { name: 'Banana Peel', hindiName: 'केले का छिलका', category: 'wet', categoryName: 'Green Bin (Wet Waste)', instruction: 'Put directly into the green bin for composting.' },
  { name: 'Plastic Water Bottle', hindiName: 'प्लास्टिक की पानी की बोतल', category: 'dry', categoryName: 'Blue Bin (Dry Waste)', instruction: 'Empty liquid, crush bottle, screw cap on, place in blue bin.' },
  { name: 'Used Battery (AA / AAA)', hindiName: 'पुरानी बैटरी', category: 'ewaste', categoryName: 'Orange Bin (E-Waste)', instruction: 'Keep dry in an e-waste pouch; drop at certified scrap or e-waste bin.' },
  { name: 'Expired Medicine Strip', hindiName: 'एक्सपायर्ड दवाइयां', category: 'hazardous', categoryName: 'Red Bin (Hazardous)', instruction: 'Do not flush down toilet; keep in sealed red pouch for safe medical disposal.' },
  { name: 'Milk Pouch / Packet', hindiName: 'दूध की थैली', category: 'dry', categoryName: 'Blue Bin (Dry Waste)', instruction: 'Rinse inside with a little water, dry completely, then toss in blue recycling bin.' },
  { name: 'Tea Leaves / Chai Patti', hindiName: 'चाय पत्ती', category: 'wet', categoryName: 'Green Bin (Wet Waste)', instruction: 'Rinse out excess sugar/milk, great for soil and home composting.' },
  { name: 'Cardboard Box / Delivery Carton', hindiName: 'गत्ते का डिब्बा', category: 'dry', categoryName: 'Blue Bin (Dry Waste)', instruction: 'Flatten box to save space, remove plastic tape, place in blue bin or sell to scrap dealer.' },
  { name: 'Broken Glass Tumbler', hindiName: 'टूटा हुआ कांच', category: 'dry', categoryName: 'Blue Bin (Dry Waste / Specially Wrapped)', instruction: 'Wrap securely in newspaper with a marker warning to protect collectors.' },
  { name: 'Baby Diaper', hindiName: 'डायपर', category: 'sanitary', categoryName: 'Sanitary Waste (Red-Marked Paper)', instruction: 'Wrap tightly in paper and mark with a red "X" for worker safety.' },
  { name: 'Old Smartphone / Charger', hindiName: 'पुराना मोबाइल / चार्जर', category: 'ewaste', categoryName: 'Orange Bin (E-Waste)', instruction: 'Valuable scrap! Sell via UrbanAtmo Junk portal for cash and GreenPoints.' },
  { name: 'Greasy Pizza Box', hindiName: 'चिकना पिज़्ज़ा बॉक्स', category: 'wet', categoryName: 'Wet / Non-Recyclable Compost', instruction: 'Grease-soaked paper cannot be recycled into dry paper; tear greasy parts into compost.' },
  { name: 'Aluminium Beverage Can', hindiName: 'कोल्ड ड्रिंक का कैन', category: 'dry', categoryName: 'Blue Bin (Dry Waste)', instruction: '100% infinitely recyclable! Crush and place in blue bin or scrap pile.' },
  { name: 'Egg Shells', hindiName: 'अंडे के छिलके', category: 'wet', categoryName: 'Green Bin (Wet Waste)', instruction: 'Rich in calcium; crush and add straight into compost/green bin.' },
  { name: 'Paint Can Residue', hindiName: 'पेंट का डिब्बा', category: 'hazardous', categoryName: 'Red Bin (Hazardous Waste)', instruction: 'Harmful chemical fumes; hand over during domestic hazardous collection.' },
  { name: 'Coconut Shell (Husk)', hindiName: 'नारियल की जटा / छिलका', category: 'wet', categoryName: 'Green Bin (Wet Waste)', instruction: 'Organic material, place in compost/green waste pile.' },
  { name: 'Potato & Onion Peels', hindiName: 'आलू और प्याज के छिलके', category: 'wet', categoryName: 'Green Bin (Wet Waste)', instruction: 'Directly into green kitchen bin.' },
  { name: 'Old Cotton Clothes / T-shirt', hindiName: 'पुराने कपड़े', category: 'dry', categoryName: 'Blue Bin / Scrap Recycling', instruction: 'Sell to UrbanAtmo textile scrap collector or donate if wearable.' },
  { name: 'Sanitary Pad', hindiName: 'सेनेटरी पैड', category: 'sanitary', categoryName: 'Sanitary Waste (Red-Marked Paper)', instruction: 'Never flush! Wrap in newspaper, mark with red dot/X.' },
  { name: 'CFL / Fluorescent Bulb', hindiName: 'सीएफएल बल्ब', category: 'hazardous', categoryName: 'Red / Hazardous Bin', instruction: 'Contains toxic mercury vapor. Pack carefully to avoid breakage.' },
  { name: 'Glass Pickle Jar', hindiName: 'अचार की कांच की बरनी', category: 'dry', categoryName: 'Blue Bin (Dry Waste)', instruction: 'Wash oily residue with warm soapy water, dry, and place with recyclables.' }
];

export const SCRAP_MATERIALS: ScrapMaterial[] = [
  { id: 'paper-news', name: 'Newspaper (अखबार)', hindiName: 'अखबार', ratePerKg: 14, icon: 'Newspaper', unit: 'kg', category: 'paper', popular: true },
  { id: 'paper-carton', name: 'Cardboard / Carton (गत्ता)', hindiName: 'गत्ता', ratePerKg: 12, icon: 'Box', unit: 'kg', category: 'paper', popular: true },
  { id: 'paper-books', name: 'Office Paper & Old Books (किताबें)', hindiName: 'किताबें व रद्दी', ratePerKg: 15, icon: 'BookOpen', unit: 'kg', category: 'paper' },
  { id: 'plastic-pet', name: 'PET Plastic Bottles (प्लास्टिक बोतलें)', hindiName: 'प्लास्टिक बोतलें', ratePerKg: 18, icon: 'Wine', unit: 'kg', category: 'plastic', popular: true },
  { id: 'plastic-hard', name: 'Hard Plastics & Buckets (बाल्टी/डब्बे)', hindiName: 'कड़ा प्लास्टिक', ratePerKg: 16, icon: 'Layers', unit: 'kg', category: 'plastic' },
  { id: 'plastic-pouches', name: 'Clean Polythene / Wrappers', hindiName: 'साफ पन्नी', ratePerKg: 10, icon: 'FileText', unit: 'kg', category: 'plastic' },
  { id: 'metal-iron', name: 'Iron & Steel Scrap (लोहा)', hindiName: 'लोहा', ratePerKg: 32, icon: 'Wrench', unit: 'kg', category: 'metal', popular: true },
  { id: 'metal-aluminum', name: 'Aluminium Utensils & Cans (एल्युमिनियम)', hindiName: 'एल्युमिनियम', ratePerKg: 110, icon: 'Zap', unit: 'kg', category: 'metal' },
  { id: 'metal-copper', name: 'Copper Wires & Pipes (तांबा)', hindiName: 'तांबा', ratePerKg: 460, icon: 'Shield', unit: 'kg', category: 'metal' },
  { id: 'metal-brass', name: 'Brass / Peetal (पीतल)', hindiName: 'पीतल', ratePerKg: 340, icon: 'Coins', unit: 'kg', category: 'metal' },
  { id: 'glass-bottles', name: 'Glass Bottles (कांच की बोतलें)', hindiName: 'कांच की बोतलें', ratePerKg: 4, icon: 'GlassWater', unit: 'kg', category: 'glass' },
  { id: 'ewaste-devices', name: 'Mixed Electronics & Phones (ई-कचरा)', hindiName: 'पुराने इलेक्ट्रॉनिक्स', ratePerKg: 45, icon: 'Smartphone', unit: 'kg', category: 'ewaste', popular: true },
  { id: 'clothes-scrap', name: 'Old Clothes & Fabric (पुराने कपड़े)', hindiName: 'पुराने कपड़े', ratePerKg: 8, icon: 'Shirt', unit: 'kg', category: 'cloth' }
];

export const MOCK_DEALERS: ScrapDealer[] = [
  {
    id: 'dlr-1',
    name: 'GreenEarth Kabadi & Recyclers',
    distance: '0.8 km away',
    distanceKm: 0.8,
    rating: 4.9,
    reviewsCount: 142,
    address: 'Shop 14, Main Market, Sector 14, Gurugram',
    openStatus: 'Open • Closes 7:30 PM',
    isOpen: true,
    phone: '+91 98112 40921',
    materials: ['Paper & Cardboard', 'Plastics', 'Iron & Metal', 'E-Waste'],
    timing: '9:00 AM - 7:30 PM (Mon-Sun)',
    verified: true,
    latitude: 28.4731,
    longitude: 77.0428
  },
  {
    id: 'dlr-2',
    name: 'Om Sai Scrap Traders & E-Waste Hub',
    distance: '1.4 km away',
    distanceKm: 1.4,
    rating: 4.8,
    reviewsCount: 98,
    address: 'Near Huda Market, Sector 23A, Gurugram',
    openStatus: 'Open • Closes 8:00 PM',
    isOpen: true,
    phone: '+91 98730 19842',
    materials: ['E-Waste', 'Copper & Brass', 'Aluminium', 'Batteries'],
    timing: '9:30 AM - 8:00 PM (Closed Tue)',
    verified: true,
    latitude: 28.5012,
    longitude: 77.0543
  },
  {
    id: 'dlr-3',
    name: 'DLF Phase-3 EcoClean Depot',
    distance: '2.1 km away',
    distanceKm: 2.1,
    rating: 4.7,
    reviewsCount: 215,
    address: 'U-Block Road, DLF Phase 3, Cyber City, Gurugram',
    openStatus: 'Open • Closes 7:00 PM',
    isOpen: true,
    phone: '+91 99104 88320',
    materials: ['Cardboard', 'PET Bottles', 'Glass', 'Old Clothes'],
    timing: '8:30 AM - 7:00 PM (Mon-Sat)',
    verified: true,
    latitude: 28.4921,
    longitude: 77.0984
  },
  {
    id: 'dlr-4',
    name: 'Swachh Bharat Citizen Drop-off Station',
    distance: '2.9 km away',
    distanceKm: 2.9,
    rating: 4.6,
    reviewsCount: 76,
    address: 'Opposite Community Centre, Sector 46, Gurugram',
    openStatus: 'Open • 24/7 Smart Bins',
    isOpen: true,
    phone: '+91 1800 180 2026',
    materials: ['Paper', 'Plastic', 'Glass', 'Sanitary Waste Safe-Box'],
    timing: '24 Hours Automated Kiosk',
    verified: true,
    latitude: 28.4352,
    longitude: 77.0621
  },
  {
    id: 'dlr-5',
    name: 'Suhana Metal & Electronic Recyclers',
    distance: '3.6 km away',
    distanceKm: 3.6,
    rating: 4.5,
    reviewsCount: 64,
    address: 'Old Railway Road, Near Shiv Murti, Gurugram',
    openStatus: 'Closes soon • 6:30 PM',
    isOpen: true,
    phone: '+91 97182 54310',
    materials: ['Iron Scrap', 'Copper', 'Aluminium', 'Computer Parts'],
    timing: '10:00 AM - 6:30 PM (Mon-Sat)',
    verified: true,
    latitude: 28.4682,
    longitude: 77.0187
  }
];

export const INITIAL_REPORTS: EnvironmentalReport[] = [
  {
    id: 'UA-2026-8491',
    category: 'garbage_dumping',
    categoryLabel: 'Garbage Dumping (कचरा फेंकना)',
    description: 'Large pile of mixed unsegregated household waste dumped near the park boundary corner, attracting stray cattle and flies.',
    location: 'Sector 14 Central Park Gate 2, Gurugram',
    urgency: 'High',
    status: 'In Review',
    createdAt: 'Yesterday, 4:15 PM',
    photoUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=60',
    statusNote: 'Assigned to Municipal Sanitation Inspector Ward 12. Cleanup scheduled tomorrow morning.',
    pointsAwarded: 50
  },
  {
    id: 'UA-2026-7910',
    category: 'open_burning',
    categoryLabel: 'Open Trash Burning (कचरा जलाना)',
    description: 'Dry leaves and plastic packets being burnt along the service lane, producing thick acrid smoke affecting morning joggers.',
    location: 'Near Golf Course Extension Road, Gurugram',
    urgency: 'Critical',
    status: 'Resolved',
    createdAt: '10 Sep 2026, 7:30 AM',
    photoUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=60',
    statusNote: 'Resolved! Rapid response enforcement team doused fire; offender issued warning under NGT clean air guidelines.',
    pointsAwarded: 50
  },
  {
    id: 'UA-2026-6824',
    category: 'overflowing_bins',
    categoryLabel: 'Overflowing Bins (भरे हुए कूड़ेदान)',
    description: 'Community wet waste bin overflowing onto the pedestrian footpath for past 48 hours.',
    location: 'Sector 23 Market, Gate 3, Gurugram',
    urgency: 'Medium',
    status: 'Resolved',
    createdAt: '08 Sep 2026, 11:20 AM',
    statusNote: 'Municipal truck emptied and sanitized bin area with bleaching powder.',
    pointsAwarded: 50
  }
];

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge-1',
    title: 'Green Starter',
    titleHi: 'ग्रीन स्टार्टर',
    description: 'Completed profile setup and logged your first eco action.',
    icon: 'Sprout',
    unlocked: true,
    unlockedDate: 'Joined 01 Sep 2026',
    progressPercent: 100
  },
  {
    id: 'badge-2',
    title: 'Waste Warrior',
    titleHi: 'वेस्ट वारियर',
    description: 'Successfully recycled over 25 kg of recyclable scrap materials.',
    icon: 'Recycle',
    unlocked: true,
    unlockedDate: 'Unlocked 09 Sep 2026',
    progressPercent: 100
  },
  {
    id: 'badge-3',
    title: 'Clean City Champion',
    titleHi: 'क्लीन सिटी चैंपियन',
    description: 'Reported 5 environmental hazards verified and cleared by municipal teams.',
    icon: 'Award',
    unlocked: false,
    progressPercent: 60
  },
  {
    id: 'badge-4',
    title: 'Eco Hero',
    titleHi: 'इको हीरो (सर्वोच्च स्तर)',
    description: 'Earn 2,000+ GreenPoints and divert 100+ kg waste from landfills.',
    icon: 'Crown',
    unlocked: false,
    progressPercent: 72
  },
  {
    id: 'badge-5',
    title: 'Compost Master',
    titleHi: 'कम्पोस्ट मास्टर',
    description: 'Zero wet waste streak: 100% kitchen wet segregation recorded for 14 days.',
    icon: 'Sparkles',
    unlocked: true,
    unlockedDate: 'Unlocked 05 Sep 2026',
    progressPercent: 100
  },
  {
    id: 'badge-6',
    title: 'Air Guardian',
    titleHi: 'वायु रक्षक',
    description: 'Reported an active open-burning smoke source within 30 minutes of detection.',
    icon: 'Wind',
    unlocked: true,
    unlockedDate: 'Unlocked 10 Sep 2026',
    progressPercent: 100
  }
];

export const LEADERBOARD_CITIZENS: LeaderboardUser[] = [
  { rank: 1, name: 'Aadarsh Pathak', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60', locality: 'Sector 45, Gurugram', points: 3420, badgesCount: 6 },
  { rank: 2, name: 'Ashoo Chandel', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60', locality: 'DLF Phase 4, Gurugram', points: 2980, badgesCount: 5 },
  { rank: 3, name: 'Utkarsha Srivastava', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60', locality: 'Sector 56, Gurugram', points: 2650, badgesCount: 5 },
  { rank: 4, name: 'Kunal Saini', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60', locality: 'South City 1, Gurugram', points: 2190, badgesCount: 4 },
  { rank: 5, name: 'Saloni Singh', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60', locality: 'Sector 15 Part 2', points: 1820, badgesCount: 4 },
  { rank: 6, name: 'Saliya Afreen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60', locality: 'Cyber Hub Resident', points: 1540, badgesCount: 4 },
  { rank: 7, name: 'Quantum coders (You)', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60', locality: 'Sector 14, Gurugram', points: 1450, isCurrentUser: true, badgesCount: 4 }
];

export const LEADERBOARD_COLLEGES = [
  { rank: 1, name: 'IIT Delhi - Eco Club', locality: 'Hauz Khas, New Delhi', points: 28450, members: 420 },
  { rank: 2, name: 'Delhi University (North Campus)', locality: 'Delhi', points: 24100, members: 390 },
  { rank: 3, name: 'Gurugram University Green Brigade', locality: 'Sector 51, Gurugram', points: 19800, members: 280 },
  { rank: 4, name: 'Amity University Eco Cell', locality: 'Manesar, Gurugram', points: 16400, members: 210 },
  { rank: 5, name: 'Ashoka University Sustainability Club', locality: 'Sonipat / NCR', points: 14200, members: 165 }
];

export const LEADERBOARD_WARDS = [
  { rank: 1, name: 'Ward 14 (Sector 14 & 15)', locality: 'Cleanliness Score 94%', points: 84200, wasteDivertedKg: 1420 },
  { rank: 2, name: 'Ward 28 (DLF Cyber City)', locality: 'Cleanliness Score 91%', points: 76500, wasteDivertedKg: 1290 },
  { rank: 3, name: 'Ward 33 (Sushant Lok 1)', locality: 'Cleanliness Score 88%', points: 64100, wasteDivertedKg: 1040 },
  { rank: 4, name: 'Ward 19 (Palam Vihar)', locality: 'Cleanliness Score 85%', points: 58900, wasteDivertedKg: 910 }
];

export const ECO_REWARDS: EcoReward[] = [
  {
    id: 'rew-1',
    title: '₹200 Off Organic India Grocery',
    provider: 'Organic India',
    pointsCost: 300,
    category: 'coupon',
    description: 'Valid on 100% certified organic foods, herbal teas, and chemical-free pantry staples.',
    code: 'URBAN-ORG-200',
    expiresIn: 'Valid for 30 days',
    claimed: false
  },
  {
    id: 'rew-2',
    title: 'Free Native Tree Sapling Planted in Your Name',
    provider: 'Haryana Forest Dept & GreenYatra NGO',
    pointsCost: 500,
    category: 'nature',
    description: 'A native Neem, Peepal, or Jamun sapling planted in Aravalli Biodiversity Park with GPS coordinates and digital certificate.',
    code: 'PLANT-ARAVALLI-88',
    expiresIn: 'Plantation drive scheduled this weekend',
    claimed: false
  },
  {
    id: 'rew-3',
    title: 'Municipal Citizen Green Certificate',
    provider: 'Smart India Hackathon & Municipal Corp',
    pointsCost: 400,
    category: 'certificate',
    description: 'Official downloadable PDF credential signed by urban commissioner recognizing your active civic sustainability leadership.',
    code: 'CERT-SIH-2026-ALEX',
    expiresIn: 'Permanent achievement credential',
    claimed: false
  },
  {
    id: 'rew-4',
    title: '₹150 Off Swiggy Green-Dine Eco Order',
    provider: 'Swiggy Gourmet / Eco Packaging',
    pointsCost: 250,
    category: 'coupon',
    description: 'Enjoy a discount at zero-plastic restaurants committed to 100% biodegradable bagasse containers.',
    code: 'SWIGGY-GREEN-150',
    expiresIn: 'Valid for 15 days',
    claimed: false
  },
  {
    id: 'rew-5',
    title: 'VIP Pass to NCR Clean Air Summit 2026',
    provider: 'Clean Air Network India',
    pointsCost: 800,
    category: 'event',
    description: 'Entry pass for citizen climate delegates, panel discussions, and environmental tech showcases.',
    code: 'PASS-AIRSUMMIT-26',
    expiresIn: 'Event date: 24 Oct 2026',
    claimed: false
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Quantum coders',
  email: 'quantumcoders@urbanatmo.org',
  phone: '+91 98712 34567',
  city: 'Gurugram',
  sector: 'Sector 14, Old Judicial Complex',
  points: 1450,
  level: 3,
  levelTitle: 'Waste Warrior',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  reportsSubmitted: 6,
  reportsResolved: 5,
  wasteRecycledKg: 48.5,
  co2SavedKg: 124.2,
  totalEarningsInr: 680,
  darkMode: false,
  highAqiAlerts: true,
  recyclingReminders: true,
  language: 'en'
};
