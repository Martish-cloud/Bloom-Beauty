// ========================================================
// BLOOM BEAUTY — PRODUCT CATALOG & BRAND DATA
// ========================================================

window.BloomData = {
  announcements: [
    "✨ Discover Your Beauty, Your Way | Complimentary Deluxe Sample on Orders over $45",
    "🌸 Free Express Shipping on All Cosmetics & Skincare over $35",
    "💄 Exclusive: Up to 40% Off Selected Luxury Cosmetics & Fragrances",
    "🌿 100% Authentic Products Sourced Directly from Global Brands"
  ],

  heroSlides: [
    {
      id: 1,
      badge: "NEW LAUNCH COLLECTION",
      title: "The Art of Velvet Radiance",
      subtitle: "Ultra-pigmented cushiony mattes infused with nourishing botanical oils for weightless, 12-hour all-day comfort.",
      ctaPrimary: "Shop Lipsticks",
      ctaSecondary: "Explore Shades",
      category: "Makeup",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1600&q=85",
      accentColor: "#C98498"
    },
    {
      id: 2,
      badge: "CLINICAL SKINCARE",
      title: "Clinical Actives, Visible Glow",
      subtitle: "Transformative barrier-repairing ceramides, pure hyaluronic acid, and active niacinamide for luminous glass skin.",
      ctaPrimary: "Shop Skincare",
      ctaSecondary: "Build Routine",
      category: "Skincare",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=85",
      accentColor: "#DDA6B3"
    },
    {
      id: 3,
      badge: "HAIR REVOLUTION",
      title: "Salon Molecular Repair at Home",
      subtitle: "Patented bond-building technologies and keratin smoothing treatments to reverse years of styling damage.",
      ctaPrimary: "Shop Haircare",
      ctaSecondary: "View Treatments",
      category: "Haircare",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85",
      accentColor: "#C5A880"
    }
  ],

  categories: [
    {
      id: "makeup",
      name: "Makeup",
      tagline: "Lipsticks, Foundations, Eyes & Blushes",
      itemCount: "240+ Products",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      subcategories: ["Lipsticks & Glosses", "Foundations & Concealers", "Eyeshadow & Mascara", "Blush & Highlighters", "Primers & Setting Sprays"],
      popularBrands: ["Maybelline New York", "L'Oréal Paris", "MAC Cosmetics", "Huda Beauty", "NYX Professional"]
    },
    {
      id: "skincare",
      name: "Skincare",
      tagline: "Serums, Cleansers, SPF & Moisturizers",
      itemCount: "190+ Products",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      subcategories: ["Cleansers & Toners", "Serums & Essences", "Moisturizers & Creams", "Sunscreen SPF 50+", "Face Masks & Peels"],
      popularBrands: ["The Ordinary", "CeraVe", "Cetaphil", "Minimalist", "Dot & Key"]
    },
    {
      id: "haircare",
      name: "Haircare",
      tagline: "Bond Repair, Shampoos & Masks",
      itemCount: "150+ Products",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      subcategories: ["Bond Repair & Masks", "Shampoos & Conditioners", "Hair Oils & Serums", "Scalp Care & Scrubs", "Styling & Heat Protect"],
      popularBrands: ["Olaplex", "L'Oréal Professionnel", "Schwarzkopf", "TRESemmé", "Matrix"]
    },
    {
      id: "bath-body",
      name: "Bath & Body",
      tagline: "Body Butters, Scrubs & Shower Gels",
      itemCount: "95+ Products",
      image: "https://images.unsplash.com/photo-1556228722-d0b5d033a7f8?auto=format&fit=crop&w=800&q=80",
      subcategories: ["Body Butters & Lotions", "Shower Gels & Washes", "Body Scrubs & Exfoliators", "Hand & Foot Care", "Bath Salts & Soaks"],
      popularBrands: ["Bloom Beauty", "Cetaphil", "Plum", "Mamaearth"]
    },
    {
      id: "fragrance",
      name: "Fragrance",
      tagline: "Eau de Parfum, Mists & Travel Sets",
      itemCount: "80+ Products",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      subcategories: ["Eau de Parfum", "Eau de Toilette", "Body Mists & Sprays", "Perfume Oils", "Discovery Sets"],
      popularBrands: ["Bloom Beauty Atelier", "Luxe Paris", "Rose & Amber Co."]
    },
    {
      id: "nail-care",
      name: "Nail Care",
      tagline: "Gel Polish, Cuticle Oils & Sets",
      itemCount: "65+ Products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
      subcategories: ["Gel Finish Polish", "Nail Treatments", "Cuticle Oils & Creams", "Base & Top Coats", "Nail Tools"],
      popularBrands: ["Bloom Beauty Nails", "Colorbar", "Kay Beauty"]
    },
    {
      id: "beauty-tools",
      name: "Beauty Tools",
      tagline: "Rollers, Gua Sha & Brushes",
      itemCount: "75+ Products",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      subcategories: ["Facial Rollers & Gua Sha", "Makeup Brushes & Sponges", "Eyelash Curlers", "Cleansing Brushes", "Vanity Organizers"],
      popularBrands: ["Bloom Beauty Studio", "Swiss Beauty", "Kay Beauty"]
    }
  ],

  brands: [
    // Makeup
    { id: "maybelline", name: "Maybelline New York", category: "Makeup", tag: "ICONIC", desc: "Trendsetting global cosmetics" },
    { id: "loreal-paris", name: "L'Oréal Paris", category: "Makeup", tag: "GLOBAL BEST", desc: "Because you're worth it" },
    { id: "mac", name: "MAC Cosmetics", category: "Makeup", tag: "PRO ARTISTRY", desc: "All ages, all races, all genders" },
    { id: "huda-beauty", name: "Huda Beauty", category: "Makeup", tag: "TRENDING", desc: "Award-winning glam formulas" },
    { id: "nyx", name: "NYX Professional Makeup", category: "Makeup", tag: "POPULAR", desc: "Pro pigments accessible to all" },
    { id: "lakme", name: "Lakmé", category: "Makeup", tag: "CLASSIC", desc: "Runway-inspired beauty looks" },
    { id: "colorbar", name: "Colorbar", category: "Makeup", tag: "CLEAN", desc: "Gender-neutral cruelty-free cosmetics" },
    { id: "swiss-beauty", name: "Swiss Beauty", category: "Makeup", tag: "VALUE", desc: "High-definition velvet finish" },
    { id: "kay-beauty", name: "Kay Beauty", category: "Makeup", tag: "LOVED", desc: "Care-infused makeup essentials" },
    { id: "elf", name: "e.l.f. Cosmetics", category: "Makeup", tag: "VIRAL", desc: "100% clean & vegan favorites" },

    // Skincare
    { id: "the-ordinary", name: "The Ordinary", category: "Skincare", tag: "HOLY GRAIL", desc: "Clinical formulations with integrity" },
    { id: "cetaphil", name: "Cetaphil", category: "Skincare", tag: "DERM PICK", desc: "Gentle skin barrier defence" },
    { id: "neutrogena", name: "Neutrogena", category: "Skincare", tag: "HYDRO BOOST", desc: "Dermatologist recommended" },
    { id: "cerave", name: "CeraVe", category: "Skincare", tag: "CERAMIDES", desc: "Restores protective skin barrier" },
    { id: "minimalist", name: "Minimalist", category: "Skincare", tag: "TRANSPARENT", desc: "Active-led science-backed care" },
    { id: "mamaearth", name: "Mamaearth", category: "Skincare", tag: "PLANT-BASED", desc: "Gentle toxin-free ingredients" },
    { id: "dot-and-key", name: "Dot & Key", category: "Skincare", tag: "FRUIT ACTIVES", desc: "Skin barrier repair formulas" },
    { id: "plum", name: "Plum", category: "Skincare", tag: "100% VEGAN", desc: "Goodness that delivers glow" },
    { id: "the-derma-co", name: "The Derma Co.", category: "Skincare", tag: "CLINICAL", desc: "Designed by dermatologists" },

    // Haircare
    { id: "loreal-prof", name: "L'Oréal Professionnel", category: "Haircare", tag: "SALON GRADE", desc: "Molecular hair transformation" },
    { id: "schwarzkopf", name: "Schwarzkopf", category: "Haircare", tag: "BOND RESCUE", desc: "German hair technology" },
    { id: "tresemme", name: "TRESemmé", category: "Haircare", tag: "RUNWAY", desc: "Salon quality smooth hair" },
    { id: "matrix", name: "Matrix", category: "Haircare", tag: "SMOOTHPROOF", desc: "Biolage botanical science" },
    { id: "olaplex", name: "Olaplex", category: "Haircare", tag: "PATENTED", desc: "Complete bond repair" }
  ],

  products: [
    // 1. Maybelline Ultimatte Lipstick
    {
      id: "prod-maybelline-burgundy-glow",
      name: "Color Sensational Ultimatte Luxe Lipstick",
      brand: "Maybelline New York",
      category: "Makeup",
      subcategory: "Lipstick",
      price: 14.99,
      originalPrice: 19.99,
      discountPercent: 25,
      rating: 4.8,
      reviewCount: 1420,
      images: [
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isFeaturedValue: true,
      dealLabel: "Flat 25% Off",
      description: "A cushiony, lightweight matte finish infused with nourishing jojoba oil and high-impact pigments. Delivers up to 12 hours of velvet softness without drying.",
      keyBenefits: ["Non-drying airy matte formula", "Enriched with vitamin E & jojoba oil", "Ultra-pigmented single swipe coverage"],
      ingredients: "Dimethicone, Bis-Diglyceryl Polyacyladipate-2, Diisostearyl Malate, Hydrogenated Polyisobutene, Phenyl Trimethicone, Kaolin, HDI/Trimethylol Hexyllactone Crosspolymer, Isostearyl Isostearate, Polyethylene, Vinyl Dimethicone/Methicone Silsesquioxane Crosspolymer, Nylon-12, Pentylene Glycol, Caprylyl Glycol, Ethylhexylglycerin.",
      howToUse: "Step 1: Apply lipstick in the center of your upper lip and follow the contours of your mouth. Step 2: Glide the lipstick across the entire bottom lip.",
      shades: [
        { name: "Burgundy Glow", hex: "#681B2B" },
        { name: "Berry Velvet", hex: "#872545" },
        { name: "Warm Rosewood", hex: "#9E4B5B" },
        { name: "Classic Scarlet", hex: "#B51A2B" },
        { name: "Nude Petal", hex: "#C28383" },
        { name: "Mocha Dream", hex: "#6E433C" }
      ],
      inStock: true
    },

    // 2. The Ordinary Niacinamide Serum
    {
      id: "prod-ordinary-niacinamide",
      name: "Niacinamide 10% + Zinc 1% Blemish & Pore Serum",
      brand: "The Ordinary",
      category: "Skincare",
      subcategory: "Serums",
      price: 11.20,
      originalPrice: 14.00,
      discountPercent: 20,
      rating: 4.9,
      reviewCount: 3820,
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1608248597359-2911b3ef30b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isFeaturedValue: true,
      dealLabel: "Save 20%",
      description: "A high-strength vitamin and mineral blemish formula designed to reduce the appearance of skin blemishes, congestion, and sebum activity.",
      keyBenefits: ["Visibly reduces pore size", "Balances oil and sebum production", "Smoothes textural irregularities"],
      ingredients: "Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan Gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin.",
      howToUse: "Apply to entire face morning and evening before heavier creams. Do not combine with pure Vitamin C in the same routine.",
      sizes: ["30ml", "60ml"],
      inStock: true
    },

    // 3. Olaplex No. 3 Hair Perfector
    {
      id: "prod-olaplex-no3",
      name: "No. 3 Hair Perfector Bond Repair Treatment",
      brand: "Olaplex",
      category: "Haircare",
      subcategory: "Hair Treatments",
      price: 24.00,
      originalPrice: 30.00,
      discountPercent: 20,
      rating: 4.9,
      reviewCount: 2740,
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isFeaturedValue: true,
      dealLabel: "Special $6 Off",
      description: "The global holy-grail at-home hair bond builder that repairs broken bonds caused by heat styling, chemical coloring, and environmental damage.",
      keyBenefits: ["Repairs damaged and compromised hair", "Strengthens and protects hair structure", "Restores healthy appearance and texture"],
      ingredients: "Water (Aqua/Eau), Bis-Aminopropyl Diglycol Dimaleate, Propylene Glycol, Cetearyl Alcohol, Behentrimonium Methosulfate, Cetyl Alcohol, Phenoxyethanol, Glycerin, Hydroxyethyl Ethylcellulose.",
      howToUse: "Apply generously to damp hair from roots to ends. Leave on for 10-20 minutes before shampooing and conditioning.",
      sizes: ["100ml", "250ml"],
      inStock: true
    },

    // 4. MAC Studio Fix Powder Plus Foundation
    {
      id: "prod-mac-studio-fix",
      name: "Studio Fix Powder Plus Foundation",
      brand: "MAC Cosmetics",
      category: "Makeup",
      subcategory: "Foundation",
      price: 33.60,
      originalPrice: 42.00,
      discountPercent: 20,
      rating: 4.8,
      reviewCount: 1890,
      images: [
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BEST VALUE",
      isFeaturedValue: true,
      dealLabel: "Save $8.40",
      description: "A one-step powder and foundation that gives skin a smooth, flawless, all-matte finish with medium-to-full buildable coverage and 24hr wear.",
      keyBenefits: ["Long-wearing, 24 hours", "Controls oil and shine", "Non-caking, non-settling, non-streaking"],
      ingredients: "Talc, Silica, Isostearyl Neopentanoate, Octyldodecyl Stearoyl Stearate, Pentaerythrityl Tetraisostearate, Dimethicone, Tocopheryl Acetate, Triethoxycaprylylsilane, Caprylyl Glycol.",
      howToUse: "Apply to well-moisturized skin with a fluffy brush for light coverage or the included sponge for fuller coverage.",
      shades: [
        { name: "NC15 Fair Warm", hex: "#F3DEC9" },
        { name: "NC25 Light Warm", hex: "#E6CCA8" },
        { name: "NC35 Medium Warm", hex: "#D2AF85" },
        { name: "NC42 Tan Warm", hex: "#BA9265" },
        { name: "NW45 Deep Neutral", hex: "#8C5A3E" }
      ],
      inStock: true
    },

    // 5. CeraVe Hydrating Facial Cleanser
    {
      id: "prod-cerave-hydrating-cleanser",
      name: "Hydrating Facial Cleanser with Ceramides & Hyaluronic Acid",
      brand: "CeraVe",
      category: "Skincare",
      subcategory: "Cleansers",
      price: 13.50,
      originalPrice: 18.00,
      discountPercent: 25,
      rating: 4.9,
      reviewCount: 4120,
      images: [
        "https://images.unsplash.com/photo-1556228722-d0b5d033a7f8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isSavingsDeal: true,
      dealLabel: "Limited 25% Off",
      description: "Developed with dermatologists, this gentle face wash cleanses, hydrates, and helps restore the protective skin barrier with 3 essential ceramides.",
      keyBenefits: ["Cleanses without stripping moisture", "Contains Ceramides 1, 3, 6-II", "Fragrance-free & non-comedogenic"],
      ingredients: "Aqua/Water/Eau, Glycerin, Cetearyl Alcohol, PEG-40 Stearate, Stearyl Alcohol, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Glyceryl Stearate.",
      howToUse: "Wet skin with lukewarm water. Massage cleanser into skin in a gentle, circular motion. Rinse well and pat dry.",
      sizes: ["236ml", "473ml"],
      inStock: true
    },

    // 6. Huda Beauty Liquid Matte Lipstick
    {
      id: "prod-huda-liquid-matte",
      name: "Liquid Matte Ultra-Comfort Transfer-Proof Lipstick",
      brand: "Huda Beauty",
      category: "Makeup",
      subcategory: "Lipstick",
      price: 21.60,
      originalPrice: 27.00,
      discountPercent: 20,
      rating: 4.8,
      reviewCount: 1650,
      images: [
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isSavingsDeal: true,
      dealLabel: "Save $5.40",
      description: "Infused with the exclusive L.O.V.E. complex for an ultra-thin, velvety finish that wears for 8 hours without transfer.",
      keyBenefits: ["Weightless veil comfort", "100% transfer-proof wear", "Enriched with antioxidants"],
      ingredients: "Isododecane, Cyclopentasiloxane, Synthetic Beeswax, Trimethylsiloxysilicate, Polypropylsilsesquioxane, Octyldodecanol, Disteardimonium Hectorite, Mica, Alcohol, Ethyl Vanillin.",
      howToUse: "Define lip edges with the precision applicator tip, then fill in with a smooth single coat. Allow 30 seconds to dry down.",
      shades: [
        { name: "Bombshell Blush Nude", hex: "#BA7A73" },
        { name: "Venus Soft Terracotta", hex: "#B86558" },
        { name: "Icon Spiced Rose", hex: "#9E444B" },
        { name: "Cheerleader Rich Berry", hex: "#7E2A3B" }
      ],
      inStock: true
    },

    // 7. Minimalist 2% Salicylic Acid Serum
    {
      id: "prod-minimalist-salicylic",
      name: "Salicylic Acid 2% Face Serum for Blackheads & Sebum",
      brand: "Minimalist",
      category: "Skincare",
      subcategory: "Serums",
      price: 9.60,
      originalPrice: 12.00,
      discountPercent: 20,
      rating: 4.7,
      reviewCount: 1530,
      images: [
        "https://images.unsplash.com/photo-1608248597359-2911b3ef30b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BEST VALUE",
      isFeaturedValue: true,
      dealLabel: "Special Value",
      description: "An oil-soluble BHA daily exfoliating serum that penetrates deep inside pores to clear trapped dirt, blackheads, and excess oils while soothing inflammation.",
      keyBenefits: ["Unclogs pores and prevents blackheads", "Formulated with Aloe Vera extract", "Fragrance-free and hypoallergenic"],
      ingredients: "Aloe Barbadensis Leaf Juice, Dimethyl Isosorbide, Propylene Glycol, Salicylic Acid, Ethoxydiglycol, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin.",
      howToUse: "Apply 2-3 drops after cleansing in the evening. Gently pat onto dry face until absorbed. Follow with moisturizer.",
      sizes: ["30ml"],
      inStock: true
    },

    // 8. L'Oréal Paris Revitalift Hyaluronic Acid Serum
    {
      id: "prod-loreal-revitalift-ha",
      name: "Revitalift 1.5% Pure Hyaluronic Acid Plumping Serum",
      brand: "L'Oréal Paris",
      category: "Skincare",
      subcategory: "Serums",
      price: 19.99,
      originalPrice: 28.99,
      discountPercent: 31,
      rating: 4.8,
      reviewCount: 3200,
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isSavingsDeal: true,
      dealLabel: "Save 31% Off",
      description: "Formulated with high and low molecular weight hyaluronic acid to immediately plump skin, replenish lost moisture, and visibly reduce fine lines.",
      keyBenefits: ["Replenishes 100% moisture retention", "Visibly plumps fine lines in 1 week", "Fast-absorbing non-sticky texture"],
      ingredients: "Aqua / Water, Glycerin, Hydroxyethylpiperazine Ethane Sulfonic Acid, Sodium Hyaluronate, PEG-60 Hydrogenated Castor Oil, Secale Cereale Seed Extract, Calcium Pantothenate.",
      howToUse: "Smooth 2-3 drops over cleansed face and neck every morning and evening. Pair with Revitalift cream.",
      sizes: ["30ml", "50ml"],
      inStock: true
    },

    // 9. L'Oréal Professionnel Absolut Repair Molecular
    {
      id: "prod-loreal-prof-absolut",
      name: "Absolut Repair Molecular Leave-In Mask & Serum",
      brand: "L'Oréal Professionnel",
      category: "Haircare",
      subcategory: "Hair Treatments",
      price: 31.50,
      originalPrice: 42.00,
      discountPercent: 25,
      rating: 4.9,
      reviewCount: 940,
      images: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "NEW ARRIVAL",
      isNewArrival: true,
      isFeaturedValue: true,
      dealLabel: "Save 25% Today",
      description: "Deconstructs peptides to inject their components separately into the hair fiber, restoring strength, elasticity, and movement from the inside out.",
      keyBenefits: ["Repairs 2 years of hair damage in 1 use", "Deep molecular penetration", "Heat protection up to 230°C/450°F"],
      ingredients: "Aqua / Water / Eau, Isopropyl Myristate, Dimethicone, Amodimethicone, Triethanolamine, Phenoxyethanol, Carbomer, Polyquaternium-4, Potato Starch Modified.",
      howToUse: "Towel-dry hair, detangle, divide into 2 sections. Press one pump per section. Distribute evenly from lengths to ends.",
      sizes: ["100ml", "250ml"],
      inStock: true
    },

    // 10. NYX Professional Butter Gloss
    {
      id: "prod-nyx-butter-gloss",
      name: "Butter Gloss Non-Sticky Nourishing Lip Gloss",
      brand: "NYX Professional Makeup",
      category: "Makeup",
      subcategory: "Lipstick",
      price: 6.30,
      originalPrice: 9.00,
      discountPercent: 30,
      rating: 4.8,
      reviewCount: 4890,
      images: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isSavingsDeal: true,
      dealLabel: "Hot Deal 30% Off",
      description: "America's #1 Lip Gloss delivers silky smooth sheer-to-medium coverage that melts onto lips. Never sticky, perfectly soft and kissable.",
      keyBenefits: ["Buttery soft texture with brilliant shine", "Leaves lips supple and conditioned", "Delicious sweet scent"],
      ingredients: "Polybutene, Mineral Oil/Paraffinum Liquidum/Huile Minérale, Hydrogenated Polyisobutene, Diisostearyl Malate, Silica Dimethyl Silylate, Tocopheryl Acetate, Fragrance/Parfum.",
      howToUse: "Swipe on using the soft wand applicator. Layer over your favourite lipstick for high-shine dimension.",
      shades: [
        { name: "Crème Brûlée Pink Nude", hex: "#D7948E" },
        { name: "Madeleine Warm Brown Nude", hex: "#BD7A6F" },
        { name: "Praline Deep Nude", hex: "#94584E" },
        { name: "Angel Food Cake Mauve", hex: "#A35D6E" },
        { name: "Red Velvet Vibrant Berry", hex: "#A8253B" }
      ],
      inStock: true
    },

    // 11. Dot & Key Barrier Repair Ceramides Cream
    {
      id: "prod-dot-key-ceramides",
      name: "Ceramides & Hyaluronic Acid Skin Barrier Hydrating Moisturizer",
      brand: "Dot & Key",
      category: "Skincare",
      subcategory: "Moisturizers",
      price: 12.75,
      originalPrice: 17.00,
      discountPercent: 25,
      rating: 4.8,
      reviewCount: 1120,
      images: [
        "https://images.unsplash.com/photo-1608248597359-2911b3ef30b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556228722-d0b5d033a7f8?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "NEW ARRIVAL",
      isNewArrival: true,
      isFeaturedValue: true,
      dealLabel: "Flat 25% Off",
      description: "An intensely soothing daily cream with 5 essential ceramides and Japanese rice water that shields against dryness and accelerates moisture retention.",
      keyBenefits: ["Repairs damaged skin barrier in 24 hours", "Balances microbiome with probiotics", "Velvety smooth, non-greasy absorption"],
      ingredients: "Aqua, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Oryza Sativa (Rice) Bran Water, Sodium Hyaluronate, Tocopherol.",
      howToUse: "Dot evenly across face and neck after cleansing and serum application. Gently massage until fully absorbed.",
      sizes: ["100g"],
      inStock: true
    },

    // 12. Kay Beauty 9-in-1 Palette
    {
      id: "prod-kay-beauty-palette",
      name: "Eyeshadow Palette with 9 Luxe Pigments & Mattes",
      brand: "Kay Beauty",
      category: "Makeup",
      subcategory: "Eyeshadow",
      price: 19.50,
      originalPrice: 26.00,
      discountPercent: 25,
      rating: 4.8,
      reviewCount: 880,
      images: [
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "NEW ARRIVAL",
      isNewArrival: true,
      dealLabel: "New Launch 25% Off",
      description: "A curated palette of velvety smooth, ultra-blendable mattes, shimmering metallics, and sparkling toppers infused with macadamia oil.",
      keyBenefits: ["One-swipe color intensity", "Zero fallout creamy powder formula", "Versatile day-to-night transitions"],
      ingredients: "Mica, Talc, Zinc Stearate, Dimethicone, Ethylhexyl Palmitate, Polybutene, Macadamia Ternifolia Seed Oil, Phenoxyethanol, Tocopheryl Acetate.",
      howToUse: "Use a fluffy blending brush to sweep transition shade across crease. Pat metallic shades onto eyelid using fingertip for maximum shimmer.",
      inStock: true
    },

    // 13. e.l.f. Power Grip Primer
    {
      id: "prod-elf-power-grip",
      name: "Power Grip Primer with 4% Niacinamide & Hyaluronic Acid",
      brand: "e.l.f. Cosmetics",
      category: "Makeup",
      subcategory: "Primer",
      price: 8.50,
      originalPrice: 10.00,
      discountPercent: 15,
      rating: 4.9,
      reviewCount: 3670,
      images: [
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isSavingsDeal: true,
      dealLabel: "Viral Favorite",
      description: "A gel-based primer that grips your makeup like a magnet while visibly smoothing skin and evens out tone with 4% niacinamide.",
      keyBenefits: ["Sticky gel formula grips foundation for all-day wear", "Dewy glowing skin finish", "Enriched with skin-loving niacinamide"],
      ingredients: "Water (Aqua), Butylene Glycol, Glycerin, Niacinamide, PEG-150 Distearate, Polysorbate 80, Tocopherol, Sodium Ascorbyl Phosphate, Sodium Hyaluronate.",
      howToUse: "Apply evenly to face before makeup using fingertips. Allow 30 seconds to set before applying foundation.",
      inStock: true
    },

    // 14. Cetaphil Moisturizing Cream
    {
      id: "prod-cetaphil-moisturizing-cream",
      name: "Moisturizing Cream for Very Dry & Sensitive Skin",
      brand: "Cetaphil",
      category: "Skincare",
      subcategory: "Moisturizers",
      price: 15.99,
      originalPrice: 21.99,
      discountPercent: 27,
      rating: 4.9,
      reviewCount: 2980,
      images: [
        "https://images.unsplash.com/photo-1556228722-d0b5d033a7f8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1608248597359-2911b3ef30b8?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BEST VALUE",
      isFeaturedValue: true,
      dealLabel: "Save 27%",
      description: "Clinically proven to provide immediate and lasting 48-hour relief from dry to very dry, sensitive skin. Enriched with sweet almond oil, niacinamide, and panthenol.",
      keyBenefits: ["Locks in 48-hour moisture", "Restores skin moisture barrier in 1 week", "Hypoallergenic and fragrance free"],
      ingredients: "Water, Glycerin, Petrolatum, Dicaprylyl Ether, Dimethicone, Glyceryl Stearate, Cetyl Alcohol, Helianthus Annuus (Sunflower) Seed Oil, PEG-30 Stearate, Panthenol, Niacinamide.",
      howToUse: "Smooth generously over body and face daily or as often as needed for soothing hydration.",
      sizes: ["250g", "500g"],
      inStock: true
    },

    // 15. TRESemmé Keratin Smooth Mask
    {
      id: "prod-tresemme-keratin-mask",
      name: "Keratin Smooth Deep Smoothing Anti-Frizz Hair Mask",
      brand: "TRESemmé",
      category: "Haircare",
      subcategory: "Hair Treatments",
      price: 9.80,
      originalPrice: 14.00,
      discountPercent: 30,
      rating: 4.7,
      reviewCount: 1340,
      images: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "LIMITED OFFER",
      isSavingsDeal: true,
      dealLabel: "30% Off Deal",
      description: "Specially formulated with keratin protein and marula oil to deliver 72 hours of frizz control, radiant shine, and silky salon-smooth softness.",
      keyBenefits: ["72-hour humidity & frizz control", "Detangles and seals split ends", "Ultra-luxurious salon shine"],
      ingredients: "Water (Aqua), Cetearyl Alcohol, Stearamidopropyl Dimethylamine, Behentrimonium Chloride, Sclerocarya Birrea (Marula) Seed Oil, Hydrolyzed Keratin, Dimethicone.",
      howToUse: "Apply evenly from mid-shaft to ends of wet hair. Leave for 3 to 5 minutes, then rinse thoroughly.",
      sizes: ["300ml"],
      inStock: true
    },

    // 16. Plum Green Tea Pore Cleansing Face Wash
    {
      id: "prod-plum-green-tea",
      name: "Green Tea Pore Cleansing Face Wash with Glycolic Acid",
      brand: "Plum",
      category: "Skincare",
      subcategory: "Cleansers",
      price: 8.90,
      originalPrice: 11.50,
      discountPercent: 23,
      rating: 4.6,
      reviewCount: 910,
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "NEW ARRIVAL",
      isNewArrival: true,
      dealLabel: "Save 23%",
      description: "Soap-free, non-drying foaming cleanser with real green tea extracts and soft cellulose beads that gently buff away dead cells without irritating acne.",
      keyBenefits: ["Antioxidant-rich green tea reduces blemishes", "Gentle glycolic acid clarifies pores", "Cruelty-free & 100% vegan"],
      ingredients: "Aqua, Camellia Sinensis (Green Tea) Leaf Extract, Glycolic Acid, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Cellulose Beads, Phenoxyethanol, Fragrance.",
      howToUse: "Take coin-sized amount on wet palms, lather and gently massage in upward circular motions on damp face. Rinse thoroughly.",
      sizes: ["100ml", "200ml"],
      inStock: true
    },

    // 17. Swiss Beauty Real Makeup Base Highlighter
    {
      id: "prod-swiss-beauty-highlighter",
      name: "Real Makeup Base Highlighting Primer",
      brand: "Swiss Beauty",
      category: "Makeup",
      subcategory: "Primer",
      price: 7.20,
      originalPrice: 9.99,
      discountPercent: 28,
      rating: 4.7,
      reviewCount: 1040,
      images: [
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BEST VALUE",
      isFeaturedValue: true,
      dealLabel: "28% Off",
      description: "An illuminating primer that doubles as a liquid highlighter, giving skin a radiant glass-skin sheen while blurring pores and holding makeup.",
      keyBenefits: ["Glass-skin instant glow", "Lightweight hydrating formula", "Can be worn alone or mixed with foundation"],
      ingredients: "Water, Mica, Propylene Glycol, Dimethicone, Ethylhexyl Palmitate, Caprylic/Capric Triglyceride, Phenoxyethanol, Ethylhexylglycerin.",
      howToUse: "Wear underneath makeup for an all-over glow, or dab onto cheekbones, brow bones, and Cupid bow as a liquid highlighter.",
      shades: [
        { name: "01 Natural Glow", hex: "#F0D5C3" },
        { name: "02 Golden Hour", hex: "#DEB592" },
        { name: "03 Rosy Tint", hex: "#E7B8B8" }
      ],
      inStock: true
    },

    // 18. Schwarzkopf BC Bonacure Peptide Repair
    {
      id: "prod-schwarzkopf-bonacure",
      name: "BC Bonacure Peptide Repair Rescue Deep Treatment Mask",
      brand: "Schwarzkopf",
      category: "Haircare",
      subcategory: "Hair Treatments",
      price: 22.00,
      originalPrice: 28.00,
      discountPercent: 21,
      rating: 4.8,
      reviewCount: 780,
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "LIMITED OFFER",
      isSavingsDeal: true,
      dealLabel: "Limited Offer",
      description: "Intensively reconstructs the inner and outer hair structure with Cell Equalizer technology and peptides to reverse 3 years of hair damage.",
      keyBenefits: ["Restores inner hair elasticity up to 95%", "Smooths porous surface cuticle", "Provides lasting moisture and shine"],
      ingredients: "Aqua (Water, Eau), Cetearyl Alcohol, Isopropyl Myristate, Behentrimonium Chloride, Distearoylethyl Hydroxyethylmonium Methosulfate, Stearamidopropyl Dimethylamine.",
      howToUse: "Work through clean damp hair. Leave for 5-10 minutes. Rinse thoroughly. Use 1-2 times weekly.",
      sizes: ["200ml", "500ml"],
      inStock: true
    },

    // 19. The Derma Co 1% Hyaluronic Sunscreen Aqua Gel
    {
      id: "prod-derma-co-sunscreen",
      name: "1% Hyaluronic Sunscreen Aqua Gel SPF 50 PA++++",
      brand: "The Derma Co.",
      category: "Skincare",
      subcategory: "Sunscreen",
      price: 11.90,
      originalPrice: 15.90,
      discountPercent: 25,
      rating: 4.9,
      reviewCount: 3450,
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isSavingsDeal: true,
      dealLabel: "Save 25%",
      description: "Ultra-lightweight gel sunscreen that absorbs like water with zero white cast. Infused with hyaluronic acid and vitamin E for deep hydration and broad-spectrum UV protection.",
      keyBenefits: ["Zero white cast, non-greasy finish", "Broad spectrum UVA/UVB + Blue light defense", "Hydrates with 1% Pure Hyaluronic Acid"],
      ingredients: "Aqua, Ethylhexyl Methoxycinnamate, Butyl Methoxydibenzoylmethane, Benzophenone-3, Phospholipids, 1,3-Butylene Glycol, Sodium Hyaluronate, Tocopheryl Acetate.",
      howToUse: "Take 2 finger lengths and apply evenly over face, neck, and exposed skin 15 minutes before sun exposure. Reapply every 2 hours.",
      sizes: ["50g", "80g"],
      inStock: true
    },

    // 20. Matrix Biolage Smoothproof Treatment
    {
      id: "prod-matrix-biolage",
      name: "Biolage Smoothproof Deep Smoothing Hair Treatment Pack",
      brand: "Matrix",
      category: "Haircare",
      subcategory: "Hair Treatments",
      price: 14.40,
      originalPrice: 18.00,
      discountPercent: 20,
      rating: 4.7,
      reviewCount: 650,
      images: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "NEW ARRIVAL",
      isNewArrival: true,
      dealLabel: "Save 20%",
      description: "Inspired by natures water-resistant camellia, this paraben-free treatment polishes frizz and encapsulates hair with silky moisture.",
      keyBenefits: ["Controls rebellious humidity frizz", "Provides 8x more smoothness", "Formulated with Camellia flower seed extract"],
      ingredients: "Aqua / Water / Eau, Cetearyl Alcohol, Behentrimonium Chloride, Amodimethicone, Candelilla Cera / Candelilla Wax, Cetyl Esters, Glycerin, Camellia Oleifera Seed Oil.",
      howToUse: "Apply to wet hair after shampooing. Leave on for 3 to 5 minutes for salon-fresh hydration. Rinse thoroughly.",
      sizes: ["100ml", "500ml"],
      inStock: true
    },

    // 21. Luxury Rose & Oud Eau de Parfum
    {
      id: "prod-bloom-rose-oud",
      name: "Velvet Rose & Smoked Oud Eau de Parfum",
      brand: "Bloom Beauty",
      category: "Fragrance",
      subcategory: "Perfume",
      price: 52.00,
      originalPrice: 65.00,
      discountPercent: 20,
      rating: 4.9,
      reviewCount: 420,
      images: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BESTSELLER",
      isBestseller: true,
      isFeaturedValue: true,
      dealLabel: "Signature Scent",
      description: "An intoxicating blend of Damask rose petals, warm amber, and smoked oud wood wrapped in creamy vanilla and white musk. An unforgettable feminine presence.",
      keyBenefits: ["Up to 14 hours lasting sillage", "Crafted in Grasse, France", "Cruelty-free & phthalate-free"],
      ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Ethylhexyl Methoxycinnamate, Butyl Methoxydibenzoylmethane, Limonene, Linalool, Citronellol, Geraniol, Coumarin.",
      howToUse: "Spritz onto pulse points: wrists, collarbone, behind ears, and inside elbows. Do not rub wrists together.",
      sizes: ["50ml", "100ml"],
      inStock: true
    },

    // 22. Rose Quartz Facial Sculpting Roller & Gua Sha Set
    {
      id: "prod-rose-quartz-roller",
      name: "Pure Rose Quartz Facial Sculpting Roller & Gua Sha Set",
      brand: "Bloom Beauty",
      category: "Beauty Tools",
      subcategory: "Face Tools",
      price: 22.50,
      originalPrice: 30.00,
      discountPercent: 25,
      rating: 4.9,
      reviewCount: 680,
      images: [
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "BEST VALUE",
      isFeaturedValue: true,
      dealLabel: "Save 25%",
      description: "Hand-carved from 100% natural Brazilian rose quartz crystal. Boosts lymphatic drainage, depuffs morning eyes, and enhances absorption of facial oils.",
      keyBenefits: ["Cooling natural crystal relieves facial tension", "Sculpts jawline and cheekbones", "Enhances serum penetration"],
      ingredients: "100% Authentic Brazilian Rose Quartz, Zinc Alloy Gold-tone Frame with silent silicone bumper.",
      howToUse: "Apply 3-4 drops of facial oil. Glide roller or gua sha gently upwards from jawline to ear and forehead to hairline.",
      inStock: true
    },

    // 23. Whipped Rose & Shea Butter Body Cream
    {
      id: "prod-whipped-body-butter",
      name: "Whipped French Rose & Organic Shea Body Soufflé",
      brand: "Bloom Beauty",
      category: "Bath & Body",
      subcategory: "Body Cream",
      price: 18.00,
      originalPrice: 24.00,
      discountPercent: 25,
      rating: 4.8,
      reviewCount: 510,
      images: [
        "https://images.unsplash.com/photo-1556228722-d0b5d033a7f8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1608248597359-2911b3ef30b8?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "NEW ARRIVAL",
      isNewArrival: true,
      dealLabel: "25% Off",
      description: "Air-whipped to cloud-like perfection with raw organic shea butter, French rose water, and cold-pressed sweet almond oil for 24-hour hydration without stickiness.",
      keyBenefits: ["Melts instantly into dry skin", "Subtle romantic floral scent", "Leaves skin velvet-smooth"],
      ingredients: "Butyrospermum Parkii (Shea) Butter, Aqua, Rosa Damascena Flower Water, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Glycerin.",
      howToUse: "Smooth generously over entire body after shower or bath while skin is slightly damp.",
      sizes: ["200ml"],
      inStock: true
    },

    // 24. Gel Couture Longwear Nail Polish
    {
      id: "prod-gel-nail-polish",
      name: "Gel Couture High-Gloss Salon Finish Nail Polish",
      brand: "Bloom Beauty",
      category: "Nail Care",
      subcategory: "Nail Polish",
      price: 9.00,
      originalPrice: 12.00,
      discountPercent: 25,
      rating: 4.8,
      reviewCount: 390,
      images: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
      ],
      badge: "LIMITED OFFER",
      dealLabel: "Save 25%",
      description: "2-step gel-like manicure system that provides up to 14 days of chip-resistant, cushiony gel shine without any UV lamp required.",
      keyBenefits: ["Flawless salon gel shine without UV lamp", "Patented curve-hugging brush for neat application", "Removes easily with standard remover"],
      ingredients: "Butyl Acetate, Ethyl Acetate, Nitrocellulose, Tosylamide/Epoxy Resin, Isopropyl Alcohol, Acetyl Tributyl Citrate, Dipropylene Glycol Dibenzoate, Stearalkonium Hectorite.",
      howToUse: "Apply 2 coats of Gel Couture color to clean nails. Finish with 1 coat of Gel Couture Top Coat.",
      shades: [
        { name: "Blush Macaron", hex: "#E8B6BA" },
        { name: "Dusty Rose Petal", hex: "#C98498" },
        { name: "Spiced Burgundy", hex: "#631B2A" },
        { name: "Champagne Shimmer", hex: "#D8C5A8" }
      ],
      inStock: true
    }
  ],

  editorialCollections: [
    {
      id: "everyday-makeup",
      title: "Everyday Makeup Essentials",
      subtitle: "Effortless radiance in under 10 minutes",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      badge: "CURATED EDIT",
      category: "Makeup",
      ctaText: "Shop the Look"
    },
    {
      id: "glowing-skin",
      title: "Glowing Skin Collection",
      subtitle: "Deeply hydrated, dewy glass-skin formulas",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      badge: "DERM LOVED",
      category: "Skincare",
      ctaText: "Discover Glow"
    },
    {
      id: "lipstick-obsession",
      title: "Lipstick Obsession",
      subtitle: "From iconic velvet berries to nude rosewoods",
      image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
      badge: "TRENDING NOW",
      category: "Makeup",
      ctaText: "Find Your Shade"
    },
    {
      id: "skincare-routine",
      title: "Skincare Routine Builder",
      subtitle: "Cleanse, treat, hydrate & protect with clinical actives",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      badge: "STEP-BY-STEP",
      category: "Skincare",
      ctaText: "Build Routine"
    },
    {
      id: "hair-repair",
      title: "Hair Repair Essentials",
      subtitle: "Molecular bond builders for silk-like transformation",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      badge: "SALON SECRETS",
      category: "Haircare",
      ctaText: "Revive Hair"
    },
    {
      id: "party-makeup",
      title: "Party Makeup Favourites",
      subtitle: "High-pigment shimmers and 24h transfer-proof wear",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      badge: "NIGHT OUT",
      category: "Makeup",
      ctaText: "Shop Party Glam"
    },
    {
      id: "luxury-beauty",
      title: "Luxury Beauty Picks",
      subtitle: "Artisanal fragrances and gold-standard crystal tools",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      badge: "PREMIUM LUXE",
      category: "Fragrance",
      ctaText: "Indulge in Luxe"
    },
    {
      id: "self-care",
      title: "Self-Care Essentials",
      subtitle: "Whipped French shea butter and calming rose rituals",
      image: "https://images.unsplash.com/photo-1556228722-d0b5d033a7f8?auto=format&fit=crop&w=800&q=80",
      badge: "WELLNESS EDIT",
      category: "Bath & Body",
      ctaText: "Shop Rituals"
    }
  ],

  reviews: {
    "prod-maybelline-burgundy-glow": [
      {
        id: "rev-1",
        author: "Sophia Martinez",
        rating: 5,
        date: "2 days ago",
        title: "The best matte lipstick I own!",
        comment: "The burgundy shade is stunning! Unlike other matte lipsticks, this does not crack or dry out my lips after 6 hours. High pigmentation with just one swipe.",
        verified: true,
        helpfulCount: 38
      },
      {
        id: "rev-2",
        author: "Aria Chen",
        rating: 5,
        date: "1 week ago",
        title: "Comfortable & long-lasting",
        comment: "Feels weightless. I got so many compliments at dinner. The color payoff is rich and luxurious.",
        verified: true,
        helpfulCount: 19
      }
    ],
    "prod-ordinary-niacinamide": [
      {
        id: "rev-3",
        author: "Elena Rostova",
        rating: 5,
        date: "3 days ago",
        title: "Shrank my pores in 2 weeks",
        comment: "Holy grail for oily T-zone. My skin texture is visibly smoother and I haven't had any breakouts since starting.",
        verified: true,
        helpfulCount: 52
      }
    ]
  }
};
