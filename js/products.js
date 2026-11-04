// Curated Haute Joaillerie Exhibition & Diamond Spec Catalog
// Expanded with full luxury catalog matching atelier showcase standards

export const CATEGORIES = [
  { id: 'all', name: 'All Pieces', icon: '✦' },
  { id: 'rings', name: 'Rings', icon: '💍', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=85', description: 'Solitaires, Bands & Floral Rings' },
  { id: 'necklaces', name: 'Necklaces', icon: '📿', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=85', description: 'Chokers, Chains & Curvy Pendants' },
  { id: 'earrings', name: 'Earrings', icon: '✨', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=85', description: 'Gold Hoops, Solitaire Studs & Drops' },
  { id: 'bracelets', name: 'Bracelets & Cuffs', icon: '👑', image: 'https://images.unsplash.com/photo-1611591475152-47775438f7c4?auto=format&fit=crop&w=600&q=85', description: 'Tennis Bracelets & Baguette Cuffs' },
  { id: 'men', name: 'Men’s Gold', icon: '👔', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=85', description: 'Solid Chains, Signet Rings & Kadas' },
  { id: 'bridal', name: 'Bridal Sets', icon: '👰', image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=85', description: 'Polki Heirlooms & High Joaillerie' }
];

export const DEFAULT_EXHIBITION_PIECES = [
  {
    id: "exhibit-01",
    num: "N° 01",
    name: "The Royal Nizam Emerald Choker",
    category: "necklaces",
    provenance: "Imperial Collection • Place Vendôme",
    price: 485000,
    priceFormatted: "₹4,85,000",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=90",
    stone: "Untreated Zambian Royal Emeralds",
    carat: "18.40 cts Emeralds • 12.20 cts VVS Diamonds",
    metal: "18K Hallmarked Yellow Gold & Natural Basra Pearls",
    quote: "A symphony of imperial green beryl, framed in brilliance that echoes the courtly jewelry of the Nizams.",
    description: "Handcrafted in 18K yellow gold, this museum-grade choker features untreated Zambian emeralds accented by micro-pavé diamonds and strung with natural Basra seed pearls.",
    gemology: {
      origin: "Kagem Mine, Zambia (Certified Untreated)",
      clarity: "Transparent Royal Green with Silk Inclusions",
      diamonds: "Colorless (E-F Grade), VVS1 Clarity",
      metalPurity: "18K (750) Pure Hallmarked Gold",
      report: "SSEF & GIA Gemological Dossier #221489"
    }
  },
  {
    id: "exhibit-02",
    num: "N° 02",
    name: "L'Étoile Solitaire Diamond Ring",
    category: "rings",
    provenance: "Solitaires & Bridal • London Mayfair",
    price: 320000,
    priceFormatted: "₹3,20,000",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1400&q=90",
    stone: "D-Flawless Earth-Mined Solitaire",
    carat: "3.20 ct Oval Brilliant • 1.10 ct Pavé Halo",
    metal: "Platinum 950 & Hidden Diamond Gallery",
    quote: "An uncut ray of absolute celestial purity, faceted to reflect 98.4% of ambient light back to the beholder.",
    description: "A singular 3.20-carat oval brilliant diamond resting on a hidden diamond gallery in high-density Platinum 950. Laser-inscribed with GIA registration.",
    gemology: {
      origin: "Jwaneng Mine, Botswana",
      clarity: "Flawless (FL) • Type IIa Chemical Purity",
      diamonds: "Color D (Highest Possible Grade)",
      metalPurity: "Platinum 950 (High-Density Alloy)",
      report: "GIA Diamond Heritage Report #739410"
    }
  },
  {
    id: "exhibit-03",
    num: "N° 03",
    name: "Celestial South Sea Pearl Drops",
    category: "earrings",
    provenance: "Nocturne Pearls • Geneva Atelier",
    price: 175000,
    priceFormatted: "₹1,75,000",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1400&q=90",
    stone: "Natural Golden South Sea Pearls",
    carat: "14.2mm Pearls • 4.60 cts Marquise Diamonds",
    metal: "18K Rose Gold & Platinum Prongs",
    quote: "Harvested from the pristine deep waters of the Kimberley coast, radiating a warm liquid golden sheen.",
    description: "Flawless golden pearls with mirror luster, crowned by marquise and pear-cut diamonds cascading down 18K champagne rose gold.",
    gemology: {
      origin: "Broome, Western Australia",
      clarity: "Mirror Luster, Flawless Surface Grade AAA",
      diamonds: "Marquise & Pear-Cut F-G Color VVS",
      metalPurity: "18K Warm Champagne Rose Gold",
      report: "Gubelin Gem Lab Authenticated #41029"
    }
  },
  {
    id: "exhibit-04",
    num: "N° 04",
    name: "Aura Baguette Eternity Cuff",
    category: "bracelets",
    provenance: "Modern Sovereign • Mumbai Atelier",
    price: 260000,
    priceFormatted: "₹2,60,000",
    image: "https://images.unsplash.com/photo-1611591475152-47775438f7c4?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90",
    stone: "Calibrated Baguette & Brilliant Diamonds",
    carat: "8.80 cts Diamonds (Total Weight)",
    metal: "18K Sculpted White & Yellow Gold",
    quote: "Precision channel-set baguettes form an unbroken circle of brilliance with micro-articulated hinges for supreme comfort.",
    description: "An architectural cuff showcasing step-cut baguette diamonds hand-calibrated to line the wrist with razor-sharp fire.",
    gemology: {
      origin: "Kimberley Process Certified",
      clarity: "VVS-VS Grade, E-F Colorless",
      diamonds: "Custom Lapidary Tapered Baguettes",
      metalPurity: "18K (750) Two-Tone Gold Alloy",
      report: "IGI Master Vault Certificate #59012"
    }
  },
  {
    id: "exhibit-05",
    num: "N° 05",
    name: "Timeless Elegance Floral Gold Ring",
    category: "rings",
    provenance: "Heritage Gold • Jaipur Palace",
    price: 47000,
    priceFormatted: "₹47,000",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
    stone: "Carved Gold Petals with Diamond Heart",
    carat: "0.45 ct Solitaire Center • 22K Solid Gold",
    metal: "22K BIS 916 Hallmarked Yellow Gold",
    quote: "Inspired by the blooming lotus of Rajasthan, meticulously engraved by seventh-generation master goldsmiths.",
    description: "A breathtaking floral motif sculpted in pure 22K gold featuring intricate filigree openwork and a high-brilliance diamond pistil.",
    gemology: {
      origin: "Jaipur Heritage Goldsmith Guild",
      clarity: "VS1 Diamond Center with Satin Gold Bloom",
      diamonds: "Round Brilliant Color G-H",
      metalPurity: "22K (916) Government Hallmarked Pure Gold",
      report: "BIS Hallmark & SGL Certified #68412"
    }
  },
  {
    id: "exhibit-06",
    num: "N° 06",
    name: "Kundan Curvy Heritage Pendant Necklace",
    category: "necklaces",
    provenance: "Royal Rajputana • Mewar Vault",
    price: 62000,
    priceFormatted: "₹62,000",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=90",
    stone: "Uncut Jadau Polki Diamonds & Meenakari",
    carat: "2.10 cts Polki • Hand-Rolled 22K Chain",
    metal: "22K Yellow Gold with Traditional Foil Backing",
    quote: "A sinuous curved silhouette inspired by cascading temple vines, hand-enameled with secret reverse Meenakari.",
    description: "Features a dramatic crescent arc of uncut Polki diamonds set in pure 24K gold foil bezels, strung on a flexible handcrafted rope chain.",
    gemology: {
      origin: "Bikaner Royal Jadau Workshop",
      clarity: "Natural Uncut Diamonds (Syndicate Polki)",
      diamonds: "Lustrous Flat Uncut Polki Diamonds",
      metalPurity: "22K Base with 24K Foil Setting",
      report: "IGI Royal Heritage Authentication #88319"
    }
  },
  {
    id: "exhibit-07",
    num: "N° 07",
    name: "Studded Sovereign Gold Hoop Earrings",
    category: "earrings",
    provenance: "Everyday Luxury • Paris Salon",
    price: 42000,
    priceFormatted: "₹42,000",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=90",
    stone: "Micro-Pavé Brilliant Diamonds",
    carat: "0.85 ct Diamond Pavé",
    metal: "18K Polished Yellow Gold",
    quote: "Bold modern huggies with micro-set diamonds that capture ambient sunlight from every angle of movement.",
    description: "Sleek hinged click-closure hoops crafted in solid 18K yellow gold, studded with two parallel rows of hand-picked diamonds.",
    gemology: {
      origin: "Antwerp Diamond Bourse Sourced",
      clarity: "VVS2 Clarity, F-G Color",
      diamonds: "48 Round Brilliant Cut Diamonds",
      metalPurity: "18K (750) Yellow Gold",
      report: "SGL Certification Card #91024"
    }
  },
  {
    id: "exhibit-08",
    num: "N° 08",
    name: "Gold Solitaire Stud Earrings",
    category: "earrings",
    provenance: "Timeless Classics • London Mayfair",
    price: 160000,
    priceFormatted: "₹1,60,000",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1400&q=90",
    stone: "Certified Earth-Mined Solitaires",
    carat: "1.50 cts Total (0.75 ct each ear)",
    metal: "18K Four-Prong Yellow Gold Basket",
    quote: "The quintessential cornerstone of any fine jewelry repertoire. Pure, unadorned optical brilliance.",
    description: "A pair of matching 0.75ct round brilliant diamonds secured in low-profile four-prong baskets with screw-back closures.",
    gemology: {
      origin: "De Beers Diamond Consortium",
      clarity: "VVS1 Clarity, Color E",
      diamonds: "Triple Excellent Cut, Polish & Symmetry",
      metalPurity: "18K Hallmarked Yellow Gold",
      report: "Dual GIA Dossiers #542109 & #542110"
    }
  },
  {
    id: "exhibit-09",
    num: "N° 09",
    name: "Wavy Diamond Gold Band",
    category: "rings",
    provenance: "Modern Contour • Milan Atelier",
    price: 28000,
    priceFormatted: "₹28,000",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
    stone: "Micro-Set Graduated Diamonds",
    carat: "0.32 ct Scintillating Diamonds",
    metal: "18K Sculpted Yellow Gold",
    quote: "A gentle serpentine contour that hugs the finger or stacks harmoniously around a central solitaire ring.",
    description: "Designed for daily elegance, featuring a dynamic rippling wave profile cast in high-polish 18K gold and adorned with diamonds.",
    gemology: {
      origin: "Milan High Jewelry District",
      clarity: "VS Clarity, F-G Colorless",
      diamonds: "21 Micro-Pavé Round Diamonds",
      metalPurity: "18K (750) Yellow Gold",
      report: "Mahira Authenticity Guarantee & Hallmark"
    }
  },
  {
    id: "exhibit-10",
    num: "N° 10",
    name: "Imperial Sovereign Men’s Solid Gold Chain",
    category: "men",
    provenance: "Sovereign Men • Taj Mahal Salon",
    price: 215000,
    priceFormatted: "₹2,15,000",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1611591475152-47775438f7c4?auto=format&fit=crop&w=1400&q=90",
    stone: "Pure Sculpted Gold Links",
    carat: "38.50 Grams Solid 22K Gold",
    metal: "22K (916) Solid Hallmarked Yellow Gold",
    quote: "Substantial, masculine, and unapologetically royal. Hand-assembled interlocking links with double safety clasp.",
    description: "Hefty 22K gold curb links diamond-cut on four sides to produce rich reflections across the chest. Built to endure generations.",
    gemology: {
      origin: "Mumbai Sovereign Mint Goldsmiths",
      clarity: "Pure Hand-Polished Gold Specimen",
      diamonds: "N/A (Solid Gold Weight 38.5g)",
      metalPurity: "22K (916) BIS Government Hallmarked",
      report: "BIS Hallmark Certification Card #78190"
    }
  },
  {
    id: "exhibit-11",
    num: "N° 11",
    name: "Royal Maharaja Signet Ring For Men",
    category: "men",
    provenance: "Gentlemen’s Vault • London Mayfair",
    price: 145000,
    priceFormatted: "₹1,45,000",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
    stone: "Natural Black Onyx & Flush Diamond",
    carat: "1.20 ct Princess Diamond • Hand-Cut Onyx",
    metal: "22K Heavy Satin Yellow Gold (22 Grams)",
    quote: "A commanding heirloom signet carved from solid bullion, symbolizing fortitude, lineage, and sovereign poise.",
    description: "Features a dramatic matte black onyx tablet inlaid with a bezel-set princess diamond, encased in a hand-brushed 22K gold shank.",
    gemology: {
      origin: "Mayfair Men’s Bespoke Atelier",
      clarity: "VS1 Diamond, Flawless Brazilian Onyx",
      diamonds: "Color F Princess Cut Diamond",
      metalPurity: "22K Solid Cast Yellow Gold",
      report: "IGI Gentleman’s Dossier #45192"
    }
  },
  {
    id: "exhibit-12",
    num: "N° 12",
    name: "Nocturne Diamond Tennis Bracelet",
    category: "bracelets",
    provenance: "High Joaillerie • Place Vendôme",
    price: 385000,
    priceFormatted: "₹3,85,000",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1611591475152-47775438f7c4?auto=format&fit=crop&w=1400&q=90",
    stone: "Fifty-Four Matched Round Brilliants",
    carat: "5.40 cts Total Diamond Weight",
    metal: "18K White Gold & Double Hidden Clasp",
    quote: "A fluid ribbon of starlight. Every single stone matched for identical diameter, table percentage, and scintillation.",
    description: "Four-prong articulated links that drape with silk-like softness on the wrist. Engineered with double safety latches.",
    gemology: {
      origin: "Tel Aviv Diamond Exchange",
      clarity: "VVS-VS Clarity, Color E-F",
      diamonds: "54 Ideal Cut Natural Diamonds",
      metalPurity: "18K (750) High-Gloss White Gold",
      report: "GIA Batch Inscription Report #389214"
    }
  },
  {
    id: "exhibit-13",
    num: "N° 13",
    name: "Padma Lotus Polki Bridal Choker Set",
    category: "bridal",
    provenance: "Bridal Dynasty • Taj Mahal Palace",
    price: 650000,
    priceFormatted: "₹6,50,000",
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90",
    stone: "Natural Syndicate Polki & Burmese Rubies",
    carat: "24.50 cts Polki • 15.20 cts Pigeon Blood Rubies",
    metal: "22K Antique Hallmarked Gold & Basra Pearls",
    quote: "The crown jewel of Indian bridal heritage. Hand-fabricated over 640 atelier hours for an unforgettable royal wedding.",
    description: "A grand bridal collar set featuring five rows of open-set Polki diamonds culminating in teardrop untreated Burmese rubies with matching earrings.",
    gemology: {
      origin: "Mewar Royal Bridal Guild",
      clarity: "Untreated Natural Rubies & Polki Diamonds",
      diamonds: "Uncut Syndicate Polki Diamonds",
      metalPurity: "22K Antique Finish Hallmarked Gold",
      report: "SSEF Royal Gem Dossier #99241"
    }
  },
  {
    id: "exhibit-14",
    num: "N° 14",
    name: "Classic Six-Prong Diamond Engagement Ring",
    category: "rings",
    provenance: "Bridal Solitaires • Paris Salon",
    price: 290000,
    priceFormatted: "₹2,90,000",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
    stone: "Certified Round Brilliant Solitaire",
    carat: "2.10 cts Round Brilliant (GIA Triple Ex)",
    metal: "18K Knife-Edge Yellow Gold & Platinum Crown",
    quote: "The world’s most iconic ring design, lifting the diamond high above the band to drink in light from 360 degrees.",
    description: "Features a delicate knife-edge band in 18K yellow gold that tapers toward a six-prong platinum crown holding an extraordinary 2.10 ct diamond.",
    gemology: {
      origin: "Jwaneng Mine, Botswana",
      clarity: "VVS1 Clarity, Color D",
      diamonds: "Cut: Excellent, Polish: Excellent, Sym: Excellent",
      metalPurity: "18K Gold Shank with Platinum 950 Prongs",
      report: "GIA Diamond Dossier #6208941"
    }
  }
];

export const DEFAULT_SITE_SETTINGS = {
  cursorEnabled: true,
  stardustEnabled: true,
  primaryGold: "#e5c47a",
  bgDeep: "#07070a",
  goldGlow: "#c9a456",
  curtainAudioMode: "salon-chime",
  customCurtainAudio: null,
  customCurtainAudioName: ""
};

export const DEFAULT_SITE_CONTENT = {
  heroMetaTag: "HAUTE JOAILLERIE • PLACE VENDÔME",
  heroTitle: "Elevate Your Style With<br /><em>Timeless Fashion</em>",
  heroSubtitle: "Discover an opulent collection of handcrafted pure gold and certified diamond jewelry designed to celebrate your unique grace and sovereign legacy.",
  heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
  heroTagTitle: "The Royal Nizam Choker",
  heroTagSub: "Untreated Zambian Royal Emeralds",
  heroTagCarat: "18.40 cts",
  marqueeText: "✦ BIS 916 HALLMARKED GOLD ✦ GIA CERTIFIED NATURAL DIAMONDS ✦ 100% PURITY GUARANTEE ✦ LIFETIME MAINTENANCE ✦ BESPOKE PRIVATE ATELIER ✦",
  salonsList: "Paris Place Vendôme • London Mayfair • Geneva • Mumbai Taj Mahal • Dubai Mall"
};

export const DEFAULT_ADMIN_AUTH = {
  username: "admin",
  password: "mahira@admin2026"
};

/* ---------------- Persistence & Retrieval Functions ---------------- */

export function getExhibitionPieces() {
  try {
    const raw = localStorage.getItem('mahira_exhibition_pieces');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading stored exhibition pieces:', err);
  }
  return DEFAULT_EXHIBITION_PIECES;
}

export function saveExhibitionPieces(pieces) {
  try {
    localStorage.setItem('mahira_exhibition_pieces', JSON.stringify(pieces));
    exhibitionPieces = pieces;
    return true;
  } catch (err) {
    console.error('Error saving exhibition pieces:', err);
    return false;
  }
}

export function resetExhibitionPieces() {
  try {
    localStorage.removeItem('mahira_exhibition_pieces');
    exhibitionPieces = [...DEFAULT_EXHIBITION_PIECES];
    return true;
  } catch (err) {
    console.error('Error resetting exhibition pieces:', err);
    return false;
  }
}

export function getProductById(id) {
  const pieces = getExhibitionPieces();
  return pieces.find((p) => p.id === id) || pieces[0];
}

export function getProductsByCategory(category) {
  const pieces = getExhibitionPieces();
  if (!category || category === 'all') return pieces;
  return pieces.filter((p) => p.category === category);
}

export function getSiteSettings() {
  try {
    const raw = localStorage.getItem('mahira_site_settings');
    if (raw) {
      return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Error reading site settings:', err);
  }
  return { ...DEFAULT_SITE_SETTINGS };
}

export function saveSiteSettings(settings) {
  try {
    localStorage.setItem('mahira_site_settings', JSON.stringify(settings));
    return true;
  } catch (err) {
    console.error('Error saving site settings:', err);
    return false;
  }
}

export function resetSiteSettings() {
  try {
    localStorage.removeItem('mahira_site_settings');
    return true;
  } catch (err) {
    console.error('Error resetting site settings:', err);
    return false;
  }
}

export function getSiteContent() {
  try {
    const raw = localStorage.getItem('mahira_site_content');
    if (raw) {
      return { ...DEFAULT_SITE_CONTENT, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Error reading site content:', err);
  }
  return { ...DEFAULT_SITE_CONTENT };
}

export function saveSiteContent(content) {
  try {
    localStorage.setItem('mahira_site_content', JSON.stringify(content));
    return true;
  } catch (err) {
    console.error('Error saving site content:', err);
    return false;
  }
}

export function resetSiteContent() {
  try {
    localStorage.removeItem('mahira_site_content');
    return true;
  } catch (err) {
    console.error('Error resetting site content:', err);
    return false;
  }
}

export function getAdminAuth() {
  try {
    const raw = localStorage.getItem('mahira_admin_auth');
    if (raw) {
      return { ...DEFAULT_ADMIN_AUTH, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Error reading admin auth:', err);
  }
  return { ...DEFAULT_ADMIN_AUTH };
}

export function saveAdminAuth(auth) {
  try {
    localStorage.setItem('mahira_admin_auth', JSON.stringify(auth));
    return true;
  } catch (err) {
    console.error('Error saving admin auth:', err);
    return false;
  }
}

// Live mutable export initialized from storage
export let exhibitionPieces = getExhibitionPieces();

export function refreshExhibitionPieces() {
  exhibitionPieces = getExhibitionPieces();
  return exhibitionPieces;
}

export const diamondCuts = [
  {
    id: "emerald",
    name: "Emerald Cut",
    subtitle: "Hall of Mirrors",
    caratSample: "4.10 Carats",
    ratios: "1.45 Ratio • Step Cut",
    description: "Long, lean step facets that create a sophisticated optical interplay of light and dark reflection.",
    facets: 57,
    svgPoints: "30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
  },
  {
    id: "oval",
    name: "Oval Brilliant",
    subtitle: "Fire & Softness",
    caratSample: "3.20 Carats",
    ratios: "1.38 Ratio • Brilliant Cut",
    description: "An elongated profile that maximizes carat surface area while generating dazzling scintillation.",
    facets: 58,
    svgPoints: "50,8 78,20 92,50 78,80 50,92 22,80 8,50 22,20"
  },
  {
    id: "pear",
    name: "Pear Brilliant",
    subtitle: "The Teardrop Sovereign",
    caratSample: "3.80 Carats",
    ratios: "1.55 Ratio • Modified Cut",
    description: "Tapering to a dramatic point, combining the round brilliant fire with an aristocratic silhouette.",
    facets: 58,
    svgPoints: "50,5 75,25 90,55 75,85 50,95 25,85 10,55 25,25"
  },
  {
    id: "cushion",
    name: "Cushion Cut",
    subtitle: "Antique Romance",
    caratSample: "5.00 Carats",
    ratios: "1.08 Ratio • Pillow Cut",
    description: "Rounded corners and larger pavilion facets reminiscent of 19th-century candlelight brilliance.",
    facets: 64,
    svgPoints: "35,8 65,8 92,35 92,65 65,92 35,92 8,65 8,35"
  }
];
