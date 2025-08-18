export const locations = [
    'Damascus - Damascus',
    'Damascus - Old city',
    'Damascus - Barzeh',
    'Damascus - Dummar',
    'Damascus - Jobar',
    'Damascus - Qanawat',
    'Damascus - Kafr Souseh',
    'Damascus - Mezzeh',
    'Damascus - Al-Maidan',
    'Damascus - Muhajreen',
    'Damascus - Qaboun',
    'Damascus - Qadam',
    'Damascus - Rukn ad-Din',
    'Damascus - Al-Salihiyah',
    'Damascus - Sarouja',
    'Damascus - Al-Shghour',
    'Damascus - Yarmouk',
    'Rif Dimashq - Markaz Rif Dimashq',
    'Rif Dimashq - Qudsiya',
    'Rif Dimashq - Al-kiswah',
    'Rif Dimashq - Yabroud',
    'Rif Dimashq - Douma',
    'Rif Dimashq - Al-qtaifa',
    'Rif Dimashq - Al-tal',
    'Rif Dimashq - Al-zabadani',
    'Rif Dimashq - Darayya',
    'Rif Dimashq - Qatana',
    'Rif Dimashq - An-Nabek',
    'Aleppo - Aleppo',
    'Aleppo - Manbij',
    'Aleppo - Afrin',
    'Aleppo - Al-Bab',
    'Aleppo - Azaz',
    'Aleppo - Atarib',
    'Aleppo - Ayn al-arab',
    'Aleppo - Jarabulus',
    'Aleppo - As-Safira',
    'Homs - Homs',
    'Homs - Palmyra',
    'Homs - Rastan',
    'Homs - Talkalkh',
    'Homs - Al-Qusayr',
    'Homs - Almkharam',
    'Hama - Hama',
    'Hama - Salamiyah',
    'Hama - Mhardeh',
    'Hama - Salhab',
    'Hama - Suqaylabiyah',
    'Hama - Misyaf',
    'Latakia - Latakia',
    'Latakia - Jableh',
    'Latakia - Qardaha',
    'Latakia - Alhaffa',
    'Tartus - Tartus',
    'Tartus - Baniyas',
    'Tartus - Safita',
    'Tartus - Dreikish',
    'Tartus - Al-shikh badr',
    'Idlib - Idlib',
    'Idlib - Maarrat al-Numan',
    'Idlib - Jisr al-Shughur',
    'Idlib - harim',
    'Idlib - Ariha',
    'Deir ez-Zor - Deir ez-Zor',
    'Deir ez-Zor - Al-Bukamal',
    'Deir ez-Zor - Mayadin',
    'Raqqa - Raqqa',
    'Raqqa - Al-thaura',
    'Raqqa - Tal abiad',
    'Al-Hasakah - Al-Hasakah',
    'Al-Hasakah - Qamishli',
    'Al-Hasakah - Ras-alain',
    'Al-Hasakah - AL-malkiya',
    'Daraa - Daraa',
    'Daraa - Izra',
    'Daraa - Alsanmien',
    'As-Suwayda - As-Suwayda',
    'As-Suwayda - Shahba',
    'As-Suwayda - Salkhad',
    'Quneitra - Quneitra',
    'Quneitra - Fiq'
  ];

  export const muhafazat = [
    'Damascus',
    'Rif Dimashq',
    'Aleppo',
    'Homs',
    'Hama',
    'Latakia',
    'Tartus',
    'Idlib',
    'Deir ez-Zor',
    'Raqqa',
    'Al-Hasakah',
    'Daraa',
    'As-Suwayda',
    'Quneitra'
  ];

  export const locationOptions = locations.map(loc => ({
    value: loc,
    label: loc
  }));
  


export const brands = [
  'Abarth', 'Acura', 'Afeela', 'AlfaRomeo', 'AstonMartin', 'Audi', 'Aurus',
  'Bentley', 'BMW', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Changan',
  'Chevrolet', 'Chery', 'Citroën', 'Dacia', 'Daihatsu', 'Dodge', 'Dongfeng', 'FAW',
  'Ferrari', 'Fiat', 'Ford', 'Geely', 'Genesis', 'GMC', 'GreatWall', 'Honda',
  'Hummer', 'Hongqi', 'Hyundai', 'IMMotors', 'Infiniti', 'IranKhodro', 'Isuzu', 'Iveco', 'Jaguar', 'Jeep', 'Kia',
  'Lamborghini', 'Lancia', 'LandRover', 'Lexus', 'LiAuto', 'Lincoln',
  'Lotus', 'Lucid', 'Maserati', 'Mazda', 'McLaren', 'MercedesBenz', 'Mercury',
  'MG', 'Mini', 'Mitsubishi', 'NIO', 'Nissan', 'Opel', 'Peugeot', 'Porsche',
  'Polestar', 'Proton', 'Ram', 'Renault', 'Rivian', 'Roewe', 'RollsRoyce', 'Saab',
  'Saipa', 'Sapa', 'Saturn', 'Scion', 'SEAT', 'Seres', 'Skoda', 'Smart', 'Subaru', 'Suzuki',
  'Tata', 'Tesla', 'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo', 'Wey', 'Xpeng', 'Zenvo', 'Other'
].map(brand => ({
  value: brand.toLowerCase().replace(/\s+/g, '-'),
  label: brand
}));;

export const brand = [
  'Abarth', 'Acura', 'Afeela', 'AlfaRomeo', 'AstonMartin', 'Audi', 'Aurus',
  'Bentley', 'BMW', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Changan',
  'Chevrolet', 'Chery', 'Citroën', 'Dacia', 'Daihatsu', 'Dodge', 'Dongfeng', 'FAW',
  'Ferrari', 'Fiat', 'Ford', 'Geely', 'Genesis', 'GMC', 'GreatWall', 'Honda',
  'Hummer', 'Hongqi', 'Hyundai', 'IMMotors', 'Infiniti', 'IranKhodro', 'Isuzu', 'Iveco', 'Jaguar', 'Jeep', 'Kia',
  'Lamborghini', 'Lancia', 'LandRover', 'Lexus', 'LiAuto', 'Lincoln',
  'Lotus', 'Lucid', 'Maserati', 'Mazda', 'McLaren', 'MercedesBenz', 'Mercury',
  'MG', 'Mini', 'Mitsubishi', 'NIO', 'Nissan', 'Opel', 'Peugeot', 'Porsche',
  'Polestar', 'Proton', 'Ram', 'Renault', 'Rivian', 'Roewe', 'RollsRoyce', 'Saab',
  'Saipa', 'Sapa', 'Saturn', 'Scion', 'SEAT', 'Seres', 'Skoda', 'Smart', 'Subaru', 'Suzuki',
  'Tata', 'Tesla', 'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo', 'Wey', 'Xpeng', 'Zenvo', 'Other'
];


export const models = {
  Abarth: ['500', '500C', '500e', '595', '595C', '695', '124 Spider', 'Pulse', 'Fastback', '600e'],
  Acura: ['ILX', 'TLX', 'RLX', 'Integra', 'NSX', 'MDX', 'RDX', 'ZDX'],
  Afeela: ['Prototype 2020', 'AFEELA Sedan', 'AFEELA SUV (upcoming)'],
  AlfaRomeo: ['Giulia', 'Stelvio', 'Tonale', '4C', '8C Competizione', 'MiTo', 'Giulietta', 'Spider'],
  AstonMartin: ['DB11', 'DB12', 'DBS', 'Vantage', 'Valhalla', 'Valkyrie', 'Rapide', 'Lagonda', 'DBX'],
  Audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'e-tron GT', 'TT', 'R8'],
  Aurus: ['Senat', 'Arsenal', 'Komendant'],
  Bentley: ['Continental GT', 'Flying Spur', 'Bentayga', 'Mulsanne', 'Azure', 'Brooklands'],
  BMW: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'i7', 'iX', 'iX3'],
  Bugatti: ['Veyron', 'Chiron', 'Divo', 'Centodieci', 'La Voiture Noire', 'Bolide', 'Mistral', 'EB110'],
  Buick: ['Enclave', 'Encore', 'Encore GX', 'Envision', 'Regal', 'LaCrosse', 'Cascade'],
  BYD: ["Atto 3", "Dolphin", "Seal", "Seal U", "Seagull", "Han", "Tang", "Song Plus", "Yuan Plus", "Frigate 07", "Destroyer 05", "e2", "e3", "e6", "T3"],
  Cadillac: ['Escalade', 'XT4', 'XT5', 'XT6', 'CT4', 'CT5', 'CT6', 'Lyriq', 'ELR'],
  Changan: ['CS35 Plus', 'CS55 Plus', 'CS75 Plus', 'CS85 Coupe', 'Eado', 'UNI-K', 'UNI-T', 'Benni', 'Raeton'],
  Chevrolet: ['Silverado', 'Equinox', 'Tahoe', 'Traverse', 'Malibu', 'Camaro', 'Colorado', 'Blazer', 'Impala', 'Trailblazer'],
  Chery: ['Tiggo 3', 'Tiggo 5', 'Tiggo 7', 'Tiggo 8', 'Arrizo 5', 'Arrizo 6', 'Arrizo GX', 'QQ', 'Fulwin', 'Eastar'],
  Citroën: ['C3', 'C4', 'C5 Aircross', 'Berlingo', 'Spacetourer', 'C1', 'C-Elysée', 'C4 Cactus', 'C5 X'],
  Dacia: ['Logan', 'Sandero', 'Duster', 'Lodgy', 'Dokker', 'Spring', 'Jogger', 'Bigster'],
  Daihatsu: ['Terios', 'Rocky', 'Charade', 'Move', 'Mira', 'Hijet', 'Copen', 'Sirion', 'Cuore'],
  Dodge: ['Charger', 'Challenger', 'Durango', 'Journey', 'Ram 1500', 'Ram 2500', 'Ram 3500'],
  Dongfeng: ['Fengguang 580', 'Fengxing T5', 'Fengxing T5 Evo', 'Fengxing SX6', 'Fengshen AX7', 'Rich 6', 'Rich 7'],
  FAW: ["Hongqi H5", "Hongqi H7", "Hongqi H9", "Hongqi E-HS9", "Hongqi LS7", "Bestune B70", "Bestune T55", "Bestune T77", "Bestune T99", "Jiefang CA-30", "Jiefang J6", "Oley", "Vita"],
  Ferrari: ['488 GTB', 'F8 Tributo', 'Roma', 'Portofino', 'SF90 Stradale', 'GTC4Lusso', '812 Superfast', 'Monza SP1', 'Purosangue'],
  Fiat: ['500', 'Panda', 'Tipo', 'Punto', 'Doblo', '124 Spider', '500X', '500L', 'Freemont'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Ranger', 'Bronco', 'Fusion', 'Expedition'],
  Geely: ['Coolray', 'Emgrand', 'Boyue', 'Azkarra', 'Geometry A', 'Atlas', 'Emgrand X7', 'Pioneer'],
  Genesis: ['G70', 'G80', 'G90', 'GV70', 'GV80'],
  GMC: ['Sierra', 'Yukon', 'Terrain', 'Acadia', 'Canyon', 'Envoy', 'Denali'],
  GreatWall: ['Pajero', 'Haval H6', 'Wingle 7', 'Poer', 'Ora Good Cat', 'Wingle 5', 'Haval F7'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Fit', 'Odyssey', 'Ridgeline', 'Insight', 'Passport', 'Clarity', 'Element', 'CR-Z'],
  Hummer: ['H1', 'H2', 'H3', 'EV Pickup', 'EV SUV'],
  Hongqi: ["Hongqi H5", "Hongqi H6", "Hongqi H7", "Hongqi H9", "Hongqi HQ9", "Hongqi LS7", "Hongqi E-HS9", "Hongqi E-QM5", "Hongqi E-HS3", "Hongqi S9 (Hypercar)"],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Venue', 'Palisade', 'Accent', 'Ioniq', 'Venue', 'Ioniq 5', 'Ioniq 6'],
  IMMotors: ["L7", "LS7", "L9", "LS6", "IM Zero Concept"],
  Infiniti: ['Q50', 'Q60', 'Q70', 'QX50', 'QX55', 'QX60', 'QX80'],
  IranKhodro: ['Samand', 'Dena', 'Runna', 'Soren', 'Tara'],
  Isuzu: ['D-Max', 'MU-X', 'N-Series', 'Elf', 'Giga'],
  Iveco: ['Daily', 'EuroCargo', 'Stralis', 'S-Way', 'T-Way', 'Massif'],
  Jaguar: ['XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'],
  Jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Liberty'],
  Kia: ['Rio', 'Soul', 'Sportage', 'Sorento', 'Stinger', 'Telluride', 'Seltos', 'K5', 'Carnival', 'Optima', 'Forte', 'Seltos', 'Niro', 'Sedona', 'Cadenza', 'EV6'],
  Lamborghini: ['Aventador', 'Huracán', 'Urus', 'Gallardo', 'Murciélago', 'Sian', 'Reventón', 'Countach', 'Veneno', 'Estoque'],
  Lancia: ['Delta', 'Ypsilon', 'Stratos', 'Fulvia', 'Thesis', 'Beta', 'Montecarlo', 'Prisma'],
  LandRover: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Discovery', 'Discovery Sport', 'Defender', 'Freelander'],
  Lexus: ['IS', 'ES', 'GS', 'LS', 'NX', 'RX', 'UX', 'LX', 'RC', 'LC', 'CT', 'GX', 'HS', 'SC', 'RX Hybrid', 'NX Hybrid', 'ES Hybrid', 'LS Hybrid'],
  LiAuto: ['Li ONE', 'Li L9', 'Li L7'],
  Lincoln: ['Nautilus', 'Aviator', 'Corsair', 'Navigator', 'Continental', 'MKZ', 'MKX'],
  Lotus: ['Elise', 'Exige', 'Evora', 'Emira', 'Eletre'],
  Lucid: ['Air', 'Gravity', 'Project Gravity'],
  Maserati: ['Ghibli', 'Quattroporte', 'Levante', 'GranTurismo', 'MC20', 'Grecale'],
  Mazda: ['Mazda3', 'Mazda6', 'CX-3', 'CX-30', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-50'],
  McLaren: ['720S', '570S', '650S', 'P1', 'Senna', 'Artura', 'GT', 'Speedtail'],
  MercedesBenz: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'G-Class', 'CLA', 'CLS', 'AMG GT', 'EQC', 'EQB', 'EQS', 'EQE'],
  Mercury: ['Marauder', 'Grand Marquis', 'Monterey', 'Mountaineer', 'Cougar', 'Capri', 'Sable'],
  MG: ['ZS', 'HS', 'HS EV', 'EHS', '5', '6', 'MG3', 'MG5 EV', 'MG6'],
  Mini: ['Cooper', 'Cooper S', 'Countryman', 'Clubman', 'John Cooper Works', 'Electric'],
  Mitsubishi: ['Outlander', 'Eclipse Cross', 'ASX', 'Lancer', 'Mirage', 'Pajero', 'Triton', 'Montero Sport'],
  NIO: ['ES6', 'ES8', 'EC6', 'ET7', 'ET5'],
  Nissan: ['Altima', 'Maxima', 'Sentra', 'Leaf', 'Rogue', 'Pathfinder', 'Frontier', 'Murano', 'Titan', 'Juke'],
  Opel: ['Corsa', 'Astra', 'Insignia', 'Crossland', 'Grandland', 'Mokka', 'Zafira'],
  Peugeot: ['108', '208', '308', '2008', '3008', '5008', '508', 'Rifter', 'Traveller', 'Expert', 'Partner', 'Boxer', '407', '607', '4007', '807'],
  Porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Cayman', '718 Boxster', '918 Spyder', 'Carrera GT', '924', '928', '944', '968', 'Boxster (987)', 'Boxster (981)'],
  Polestar: ['Polestar 1', 'Polestar 2', 'Polestar 3', 'Polestar 4', 'Polestar 5'],
  Proton: ['Saga', 'Persona', 'X70', 'X50', 'Exora', 'Iriz', 'Preve'],
  Ram: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'],
  Renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Duster', 'Twingo', 'Zoe', 'Koleos', 'Scenic', 'Alaskan'],
  Rivian: ['R1T', 'R1S'],
  Roewe: ["i5", "i6", "i6 MAX", "RX5", "RX5 PLUS", "RX8", "RX9", "Marvel X", "Marvel R", "Clever", "Ei5", "eRX5"],
  RollsRoyce: ['Phantom', 'Ghost', 'Wraith', 'Dawn', 'Cullinan', 'Spectre'],
  Saab: ['9-3', '9-5', '9-4X', '900', '9000', 'Sonett'],
  Saipa: ['Pride', 'Tiba', 'Saina', 'Quik', 'Shiraz', 'Spacio'],
  Sapa: ['Brilliance H230', 'Brilliance H330', 'Brilliance V5', 'Brilliance V7'],
  Saturn: ["SL", "SL1", "SL2", "SC", "SC1", "SC2", "SW", "SW1", "SW2", "ION", "ION Quad Coupe", "ION Sedan", "VUE", "Relay", "Aura", "Outlook", "Sky", "Sky Red Line", "ASTRA"],
  Scion: ["xA", "xB", "tC", "xD", "iQ", "FR-S", "iA", "iM"],
  SEAT: ["Alhambra", "Altea", "Arona", "Ateca", "Cordoba", "Exeo", "Ibiza", "Leon", "Mii", "Tarraco", "Toledo"],
  Seres: ["SERES 3", "SERES 5", "SERES 7", "SERES 9", "AITO M5", "AITO M7", "AITO M9", "Fengon E1", "Fengon E3", "Fengon 500"],
  Skoda: ["Citigo", "Fabia", "Favorit", "Felicia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Praktik", "Rapid", "Roomster", "Scala", "Superb", "Yeti"],
  Smart: ["Fortwo", "Forfour", "Roadster", "Crossblade"],
  Subaru: ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "WRX", "XV", "Baja", "SVX", "Tribeca"],
  Suzuki: ["Alto", "Baleno", "Cappuccino", "Celerio", "Ciaz", "Equator", "Esteem", "Forenza", "Grand Vitara", "Ignis", "Jimny", "Kizashi", "Liana", "Reno", "Samurai", "Sidekick", "Solio", "Splash", "Swift", "SX4", "Verona", "Vitara", "Wagon R", "X-90", "XL-7"],
  Tata: ["Altroz", "Harrier", "Nexon", "Punch", "Safari", "Tiago", "Tigor", "Nano", "Indica", "Indigo", "Sumo"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Roadster", "Semi"],
  Toyota: ["4Runner", "Alphard", "Avalon", "bZ4X", "C-HR", "Camry", "Corolla", "Crown", "FJ Cruiser", "Fortuner", "GR86", "GR Corolla", "GR Supra", "Highlander", "Hilux", "Land Cruiser", "Mirai", "Prius", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza", "Yaris", "Yaris Cross", "Celica", "Echo", "MR2", "Previa", "Solara", "Starlet", "Tercel"],
  Vauxhall: ["Adam", "Astra", "Corsa", "Crossland", "Grandland", "Insignia", "Mokka", "Viva", "Zafira"],
  Volkswagen: ["Arteon", "Atlas", "Beetle", "Bora", "Caddy", "Corrado", "Eos", "Fox", "Golf", "ID.3", "ID.4", "ID. Buzz", "Jetta", "Lupo", "Passat", "Phaeton", "Polo", "Scirocco", "Sharan", "T-Roc", "Tiguan", "Touareg", "Touran", "Up", "Vento"],
  Volvo: ["EX30", "EX90", "C40", "XC40", "XC60", "XC90", "S60", "S90", "V60", "V90"],
  Wey: ["Coffee 01", "Coffee 02", "Latte", "Macchiato", "Mocha", "Pai", "VV5", "VV6", "VV7", "VV7 GT"],
  Xpeng: ["G3", "G3i", "G6", "G9", "P5", "P7", "P7i", "X9"],
  Zenvo: ["TS1", "TS1 GT", "TSR", "TSR-S", "ST1", "Aurora"],
  Other: ['Other']
};


  export const years = Array.from({ length: 2025 - 1955 + 1 }, (_, i) => 2025 - i);

  export const yearOptions = years.map(year => ({
      value: year,
      label: year.toString()
    }));

    export const types = [
      { value: 'Sedan', label: 'Sedan' },
      { value: 'SUV', label: 'SUV' },
      { value: 'Coupe', label: 'Coupe' },
      { value: 'Hatchback', label: 'Hatchback' },
      { value: 'Wagon', label: 'Wagon' },
      { value: 'Van', label: 'Van' },
      { value: 'Convertible', label: 'Convertible' },
      { value: 'Sports Car', label: 'Sports Car' },
      { value: 'Crossover', label: 'Crossover' },
      { value: 'Minivan', label: 'Minivan' },
      { value: 'Pickup', label: 'Pickup' },
      { value: 'Staiton wagon', label: 'Staiton wagon' },
    ];
    
    export const colors = [
      { value: 'Black', label: 'Black' },
      { value: 'White', label: 'White' },
      { value: 'Silver', label: 'Silver' },
      { value: 'Gray', label: 'Gray' },
      { value: 'Red', label: 'Red' },
      { value: 'Blue', label: 'Blue' },
      { value: 'Green', label: 'Green' },
      { value: 'Yellow', label: 'Yellow' },
      { value: 'Brown', label: 'Brown' },
      { value: 'Gold', label: 'Gold' },
      { value: 'Orange', label: 'Orange' },
      { value: 'Purple', label: 'Purple' },
      { value: 'Beige', label: 'Beige' },
      { value: 'Bronze', label: 'Bronze' },
      { value: 'Burgundy', label: 'Burgundy' },
      { value: 'Navy', label: 'Navy' }
    ];
    
    export const doorOptions = [
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' }
    ];
    
    export const seatOptions = [
      { value: 2, label: '2' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 12, label: '12' },
      { value: 13, label: '13' },
      { value: 14, label: '14' },
      { value: 15, label: '15' }
    ];
    
    export const conditions = [
      { value: 'Excellent', label: 'Excellent' },
      { value: 'Very Good', label: 'Very Good' },
      { value: 'Good', label: 'Good' },
      { value: 'Fair', label: 'Fair' },
      { value: 'Poor', label: 'Poor' }
    ];
    

    export const laptopBrandOptions = [
      { value: 'Acer', label: 'Acer' },
      { value: 'ASUS', label: 'ASUS' },
      { value: 'Apple', label: 'Apple' },
      { value: 'Dell', label: 'Dell' },
      { value: 'Huawei', label: 'Huawei' },
      { value: 'HP', label: 'HP' },
      { value: 'Lenovo', label: 'Lenovo' },
      { value: 'LG', label: 'LG' },
      { value: 'Microsoft', label: 'Microsoft' },
      { value: 'MSI', label: 'MSI' },
      { value: 'Razer', label: 'Razer' },
      { value: 'Samsung', label: 'Samsung' },
      { value: 'Toshiba', label: 'Toshiba' },
      { value: 'Xiaomi', label: 'Xiaomi' },
      { value: 'Other', label: 'Other' }
    ];
  
    export const laptop = [
      'Acer', 'ASUS', 'Apple', 'Dell',
      'Huawei', 'HP', 'Lenovo', 'LG', 'Microsoft', 'MSI',
      'Razer', 'Samsung', 'Toshiba', 'Xiaomi', 'Other'
    ];
  
  export const bookTypeOptions = [
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Educational', label: 'Educational' },
    { value: 'Academic', label: 'Academic' },
    { value: 'Children', label: 'Children' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Self-Help', label: 'Self-Help' },
    { value: 'Business', label: 'Business' },
    { value: 'Literature', label: 'Literature' },
    { value: 'Other', label: 'Other' }
  ];


  const gpus = [
    "RTX 4090", "RTX 4080", "RTX 4070",
    "RTX 3090", "RTX 3080", "RTX 3060",
    "RTX 2080 Ti", "RTX 2070",
    "GTX 1080 Ti", "GTX 1070", "GTX 1660 Ti",
  
    "RX 7900 XTX", "RX 7800 XT",
    "RX 6900 XT", "RX 6800 XT",
    "RX 5700 XT", "RX 5600 XT",
    "RX Vega 64", "RX 580",
  
    "Arc A770", "Arc A750", 
  
    "Apple M2 Max GPU",
    "AMD Radeon Pro 5700 XT (Mac)",

    "Integrated GPU", "other"
  ];

  export const gpuOptions = gpus.map(gpu => ({
    value: gpu,
    label: gpu
  }));


  const processors = [
    "Core i9-13980HX", "Core i7-13700H", "Core i5-13500H",
    "Core i9-12900H", "Core i7-12700H", "Core i5-12500H",
    "Core i9-11980HK", "Core i7-11800H", "Core i5-11400H",
    "Core i7-10875H", "Core i7-10710U", "Core i5-1035G7",
    "Core i7-9750H", "Core i5-9300H", "Core i7-8750H",
    "Core i7-7700HQ", "Core i5-7300HQ", "Core i7-6700HQ",
  
    "Ryzen 9 7945HX", "Ryzen 7 7840HS", "Ryzen 5 7640HS",
    "Ryzen 9 6980HX", "Ryzen 7 6800H", "Ryzen 5 6600H",
    "Ryzen 9 5980HX", "Ryzen 7 5800H", "Ryzen 5 5600H",
    "Ryzen 7 4800H", "Ryzen 5 4600H", "Ryzen 7 3750H",
  
    "M3 Max", "M3 Pro", "M3",
    "M2 Max", "M2 Pro", "M2",
    "M1 Max", "M1 Pro", "M1",

    "Core i3-1115G4", "Ryzen 3 5425U",
    "Pentium Gold 7505", "Athlon Gold 3150U",

    "other"
  ];

  export const processorOptions = processors.map(processor => ({
    value: processor,
    label: processor
  }));

  const storages = [
    "500GB HDD (5400RPM, SATA)",
    "1TB HDD (5400RPM, SATA)",
    "1TB HDD (7200RPM, SATA)",
    "2TB HDD (5400RPM, SATA)",

    "128GB SSD (SATA)",
    "256GB SSD (SATA)",
    "512GB SSD (SATA)", 
    "1TB SSD (SATA)",
    "2TB SSD (SATA)",

    "256GB NVMe SSD (PCIe 3.0)",
    "512GB NVMe SSD (PCIe 3.0/4.0)",
    "1TB NVMe SSD (PCIe 3.0/4.0)",
    "2TB NVMe SSD (PCIe 4.0)",
    "4TB NVMe SSD (PCIe 4.0)",

    "256GB Mac SSD (PCIe)",
    "512GB Mac SSD (PCIe)",
    "1TB Mac SSD (PCIe)",
    "2TB Mac SSD (PCIe)",
    "4TB Mac SSD (PCIe)",
    "8TB Mac SSD (PCIe)",

    "128GB SSD + 1TB HDD",
    "256GB SSD + 1TB HDD",
    "512GB SSD + 2TB HDD",
    
    "other"
  ];

  export const storageOptions = storages.map(storage => ({
    value: storage,
    label: storage
  }));

  const rams= [
    "4GB DDR3 (1600MHz)",          // Older budget laptops
  "4GB DDR4 (2133MHz)",          // Basic Chromebooks/entry-level
  "8GB DDR4 (2400MHz)",          // Most common budget option
  "8GB LPDDR4 (4266MHz)",        // Thin-and-lights (soldered)

  "8GB DDR4 (2666MHz)",          // Typical for mid-range
  "8GB DDR4 (3200MHz)",          // Common in 2020-2022 models
  "16GB DDR4 (2666MHz)",         // Power users/gaming
  "16GB DDR4 (3200MHz)",         // Modern standard (2023)
  "16GB LPDDR4 (4266MHz)",       // Premium ultrabooks
  "16GB LPDDR5 (6400MHz)",       // 2023+ thin-and-lights

  "16GB DDR5 (4800MHz)",         // Newer gaming laptops
  "32GB DDR4 (3200MHz)",         // Workstations/content creation
  "32GB DDR5 (5200MHz)",         // High-end 2023+ models

  "8GB Unified (M1/M2)",         // Base MacBook Air
  "16GB Unified (M1/M2)",        // Recommended for pros
  "24GB Unified (M2 Pro/Max)",   // Video editors
  "32GB Unified (M1/M2 Max)",
  "other"    // Extreme work
  ];

  export const ramOptions = rams.map(ram => ({
    value: ram,
    label: ram
  }));