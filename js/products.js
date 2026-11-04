// Curated Haute Joaillerie Exhibition & Diamond Spec Catalog

export const DEFAULT_EXHIBITION_PIECES = [
  {
    id: "exhibit-01",
    num: "N° 01",
    name: "The Royal Nizam Emerald Choker",
    provenance: "Imperial Collection • Place Vendôme",
    price: 4850000,
    priceFormatted: "₹48,50,000",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=90",
    stone: "Untreated Zambian Royal Emeralds",
    carat: "18.40 cts Emeralds • 12.20 cts VVS Diamonds",
    metal: "18K Hallmarked Yellow Gold & Natural Basra Pearls",
    quote: "A symphony of imperial green beryl, framed in brilliance that echoes the courtly jewelry of the Nizams.",
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
    provenance: "Solitaires & Bridal • London Mayfair",
    price: 3200000,
    priceFormatted: "₹32,00,000",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1400&q=90",
    stone: "D-Flawless Earth-Mined Solitaire",
    carat: "3.20 ct Oval Brilliant • 1.10 ct Pavé Halo",
    metal: "Platinum 950 & Hidden Diamond Gallery",
    quote: "An uncut ray of absolute celestial purity, faceted to reflect 98.4% of ambient light back to the beholder.",
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
    provenance: "Nocturne Pearls • Geneva Atelier",
    price: 1750000,
    priceFormatted: "₹17,50,000",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1400&q=90",
    stone: "Natural Golden South Sea Pearls",
    carat: "14.2mm Pearls • 4.60 cts Marquise Diamonds",
    metal: "18K Rose Gold & Platinum Prongs",
    quote: "Harvested from the pristine deep waters of the Kimberley coast, radiating a warm liquid golden sheen.",
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
    provenance: "Modern Sovereign • Mumbai Atelier",
    price: 2600000,
    priceFormatted: "₹26,00,000",
    image: "https://images.unsplash.com/photo-1611591475152-47775438f7c4?auto=format&fit=crop&w=1400&q=90",
    secondaryImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90",
    stone: "Calibrated Baguette & Brilliant Diamonds",
    carat: "8.80 cts Diamonds (Total Weight)",
    metal: "18K Sculpted White & Yellow Gold",
    quote: "Precision channel-set baguettes form an unbroken circle of brilliance with micro-articulated hinges for supreme comfort.",
    gemology: {
      origin: "Kimberley Process Certified",
      clarity: "VVS-VS Grade, E-F Colorless",
      diamonds: "Custom Lapidary Tapered Baguettes",
      metalPurity: "18K (750) Two-Tone Gold Alloy",
      report: "IGI Master Vault Certificate #59012"
    }
  }
];

export const DEFAULT_SITE_SETTINGS = {
  cursorEnabled: true,
  stardustEnabled: true,
  primaryGold: "#e5c47a",
  bgDeep: "#07070a",
  goldGlow: "#c9a456"
};

export const DEFAULT_SITE_CONTENT = {
  heroMetaTag: "HAUTE JOAILLERIE • PLACE VENDÔME",
  heroTitle: "Sculpting<br /><em>The Stars</em>",
  heroSubtitle: "Where primordial light crystallizes into timeless wearable art.",
  heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
  heroTagTitle: "The Royal Nizam Choker",
  heroTagSub: "Untreated Zambian Royal Emeralds",
  heroTagCarat: "18.40 cts",
  marqueeText: "HAUTE JOAILLERIE ✦ D-FLAWLESS SOLITAIRES ✦ NATURAL UNTREATED GEMSTONES ✦ PLACE VENDÔME • LONDON • GENEVA • MUMBAI ✦ GIA HERITAGE CERTIFIED",
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
