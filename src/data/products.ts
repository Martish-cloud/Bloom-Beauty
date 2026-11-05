// @ts-nocheck
import { Product, Brand, Review } from '../types';

export const POPULAR_BRANDS: Brand[] = [
  {
    "id": "chanel-paris",
    "name": "Chanel Paris",
    "category": "Fragrance",
    "tag": "HAUTE LUXE",
    "desc": "Timeless Parisian elegance and iconic perfumery"
  },
  {
    "id": "maybelline",
    "name": "Maybelline New York",
    "category": "Makeup",
    "tag": "ICONIC",
    "desc": "Trendsetting global cosmetics"
  },
  {
    "id": "bath-body-works",
    "name": "Bath & Body Works",
    "category": "Bath & Body",
    "tag": "FAN FAVORITE",
    "desc": "Signature fine mists and decadent body care"
  },
  {
    "id": "kronzam",
    "name": "Kronzam",
    "category": "Haircare",
    "tag": "BOTANICAL",
    "desc": "Active rosemary & rice water hair wellness"
  },
  {
    "id": "loreal-paris",
    "name": "L'Oréal Paris",
    "category": "Haircare",
    "tag": "GLOBAL BEST",
    "desc": "Advanced haircare formulas engineered for results"
  },
  {
    "id": "praush-beauty",
    "name": "Praush Beauty",
    "category": "Makeup",
    "tag": "PRO PIGMENT",
    "desc": "High-impact velvety rose-gold lip artistry"
  },
  {
    "id": "rose-lily",
    "name": "Rose & Lily",
    "category": "Nail Care",
    "tag": "SALON CARE",
    "desc": "Intensive nail strengthening and cuticle therapy"
  },
  {
    "id": "body-earth",
    "name": "Body & Earth",
    "category": "Bath & Body",
    "tag": "AROMATHERAPY",
    "desc": "Calming French lavender spa collections"
  },
  {
    "id": "lunair",
    "name": "Lunair",
    "category": "Fragrance",
    "tag": "EXTRAIT DE LUXE",
    "desc": "Artisanal long-wearing luxury extrait fragrances"
  },
  {
    "id": "nail-republic",
    "name": "Nail Republic",
    "category": "Nail Care",
    "tag": "GEL SYSTEM",
    "desc": "Professional cat-eye and UV salon finishes"
  },
  {
    "id": "maheorthe",
    "name": "Maheorthe",
    "category": "Haircare",
    "tag": "AYURVEDIC HERBAL",
    "desc": "Pure coconut and red hibiscus hair remedies"
  },
  {
    "id": "miss-nails",
    "name": "Miss Nails",
    "category": "Nail Care",
    "tag": "HIGH SHINE",
    "desc": "Quick-drying chip-resistant mini lacquers"
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": "prod-chanel-coco-mademoiselle",
    "name": "Coco Mademoiselle Eau De Parfum Intense",
    "brand": "Chanel Paris",
    "category": "Fragrance",
    "subcategory": "Eau de Parfum",
    "price": 4899,
    "originalPrice": 5800,
    "discountPercent": 16,
    "rating": 4.9,
    "reviewCount": 3820,
    "images": [
      "Docs/Fragance/Chanel Coco Mademoiselle on Pink Satin.png",
      "Docs/Fragance/chanel-coco-mademoiselle-cp77-duo-fragrance-02.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Top Iconic Scent",
    "description": "An intense, woody and ambery oriental fragrance with a full-bodied character. Sensual notes of patchouli warmed by an amber accord of vanilla extract and tonka bean.",
    "keyBenefits": [
      "Eau de Parfum Intense concentration",
      "Lasts 14+ hours on skin",
      "Luxurious faceted glass bottle"
    ],
    "ingredients": "Alcohol, Parfum (Fragrance), Aqua (Water), Linalool, Limonene, Benzyl Salicylate, Coumarin, Citronellol, Geraniol.",
    "howToUse": "Mist onto pulse points including wrists, inner elbows, and base of the neck for an all-day captivating sillage."
  },
  {
    "id": "prod-lunair-her-aura",
    "name": "Her Aura Luxury Extrait De Parfum (25% Parfum)",
    "brand": "Lunair",
    "category": "Fragrance",
    "subcategory": "Extrait de Parfum",
    "price": 3499,
    "originalPrice": 4200,
    "discountPercent": 17,
    "rating": 4.8,
    "reviewCount": 1640,
    "images": [
      "Docs/Fragance/Her Aura Luxury Perfume Ad.png",
      "Docs/Fragance/Chanel Coco Mademoiselle on Pink Satin.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "Save ₹701",
    "description": "Crafted with 25% pure parfum oils imported from France and Switzerland. Non-irritant, IFRA certified with up to 12 hours of projection and intoxicating floral amber warmth.",
    "keyBenefits": [
      "25% Parfum Concentration",
      "Up to 12 Hours Long Lasting",
      "IFRA Certified Skin-Safe Formula"
    ],
    "ingredients": "Perfume Oils (France/Switzerland), Organic Alcohol Denat, Purified Aqua, Hedione, Amber Core, Rose Absolute.",
    "howToUse": "Spray on clean, moisturized skin. Focus on collarbones, behind ears, and hair ends."
  },
  {
    "id": "prod-chanel-cp77-duo",
    "name": "Coco Mademoiselle & CP-77 Extrait De Parfum Luxury Duo (60ml)",
    "brand": "Chanel Paris & CP-77",
    "category": "Fragrance",
    "subcategory": "Perfume Set",
    "price": 3999,
    "originalPrice": 4800,
    "discountPercent": 17,
    "rating": 4.7,
    "reviewCount": 940,
    "images": [
      "Docs/Fragance/chanel-coco-mademoiselle-cp77-duo-fragrance-02.png",
      "Docs/Fragance/Chanel Coco Mademoiselle on Pink Satin.png"
    ],
    "badge": "LIMITED OFFER",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Save ₹801",
    "description": "The ultimate twin fragrance pairing: full-size Chanel Coco Mademoiselle Eau De Parfum paired with the concentrated CP-77 Extrait de Parfum (60ml).",
    "keyBenefits": [
      "Two iconic fragrance silhouettes in one curated set",
      "Layerable for day-to-night transitions",
      "Collector edition bottles"
    ],
    "ingredients": "Alcohol Denat., Parfum, Aqua, Linalool, Alpha-Isomethyl Ionone, Eugenol, Benzyl Benzoate.",
    "howToUse": "Layer CP-77 as a base note on pulse points, followed by a mist of Coco Mademoiselle over garments."
  },
  {
    "id": "prod-titan-skinn-nude",
    "name": "SKINN Nude Eau De Parfum Pour Femme (50ml Gift Box)",
    "brand": "SKINN by Titan",
    "category": "Fragrance",
    "subcategory": "Eau de Parfum",
    "price": 2499,
    "originalPrice": 2995,
    "discountPercent": 17,
    "rating": 4.8,
    "reviewCount": 2210,
    "images": [
      "Docs/Fragance/titan-skinn-nude-eau-de-parfum-fragrance-01.png",
      "Docs/Fragance/Her Aura Luxury Perfume Ad.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Top Seller",
    "description": "Created by master French perfumers for Titan. Opening with luscious lychee and raspberry, blossoming into rose petals and peach, drying down to velvety sandalwood and tonka bean.",
    "keyBenefits": [
      "Fine French perfumery crafted for Indian climates",
      "Comes in a presentation luxury rigid box",
      "Faceted diamond-cut crystal cap"
    ],
    "ingredients": "Ethyl Alcohol (95% v/v), Fragrance, Aqua, Butylated Hydroxytoluene, Diethyl Phthalate.",
    "howToUse": "Apply onto pulse points after a shower. Allow to settle naturally without rubbing wrists together."
  },
  {
    "id": "prod-arabian-aroma-flora",
    "name": "Flora Extrait De Parfum Floral Seduction (50ml)",
    "brand": "Arabian Aroma",
    "category": "Fragrance",
    "subcategory": "Extrait de Parfum",
    "price": 2199,
    "originalPrice": 2750,
    "discountPercent": 20,
    "rating": 4.6,
    "reviewCount": 880,
    "images": [
      "Docs/Fragance/arabian-aroma-flora-extrait-fragrance-03.png",
      "Docs/Fragance/titan-skinn-nude-eau-de-parfum-fragrance-01.png"
    ],
    "badge": "HOT DEAL",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Save 20%",
    "description": "An opulent floral tribute featuring velvety gardenia, sun-drenched jasmine sambac, and warm pear nectar over a golden sandalwood base.",
    "keyBenefits": [
      "High concentration Extrait de Parfum",
      "Long-lasting vintage botanical aroma",
      "Artisan floral illustrated bottle"
    ],
    "ingredients": "Pure Perfume Oil, Alcohol Denat, Fragrance, Aqua, Benzyl Alcohol, Benzyl Salicylate.",
    "howToUse": "Spray on pulse points or in the air and walk through the fragrant cloud."
  },
  {
    "id": "prod-body-earth-lavender-set",
    "name": "Lavender Relaxing Spa Bath & Body 6-Piece Gift Set",
    "brand": "Body & Earth",
    "category": "Bath & Body",
    "subcategory": "Spa Gift Set",
    "price": 1399,
    "originalPrice": 1899,
    "discountPercent": 26,
    "rating": 4.9,
    "reviewCount": 2950,
    "images": [
      "Docs/Bath & Body/Lavender Body & Earth Gift Set.png",
      "Docs/Bath & Body/Lavender Mother’s Day Gift Display.png",
      "Docs/Bath & Body/Lavender Spa Skincare Collection.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Deluxe Spa Box",
    "description": "Indulge in a tranquil French lavender spa ritual. Complete 6-piece boxed set contains Shower Gel (184ml), Bubble Bath (184ml), Body Lotion (55ml), Hand Cream (55ml), Lavender Face Cream (50ml), and Artisan Bar Soap (100g) tied with satin ribbon.",
    "keyBenefits": [
      "Complete 6-piece aromatherapy spa regimen",
      "Infused with pure natural lavender essential oils",
      "Ready-to-gift keepsake presentation box with ribbon"
    ],
    "ingredients": "Lavandula Angustifolia (Lavender) Oil, Shea Butter, Sunflower Seed Oil, Vitamin E, Glycerin, Aloe Barbadensis Leaf Extract.",
    "howToUse": "Cleanse with Shower Gel or Bubble Bath, then massage Body Lotion and Hand Cream into towel-dried skin."
  },
  {
    "id": "prod-bbw-always-fleur-duo",
    "name": "Always Fleur & Eau de Coconut Fine Fragrance Mist Duo (236ml x 2)",
    "brand": "Bath & Body Works",
    "category": "Bath & Body",
    "subcategory": "Body Mist",
    "price": 1299,
    "originalPrice": 1700,
    "discountPercent": 24,
    "rating": 4.8,
    "reviewCount": 1410,
    "images": [
      "Docs/Bath & Body/Always Fleur and Eau de Coconut Duo.png",
      "Docs/Bath & Body/Salted Shorelines Fragrance Mist.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "Save ₹401",
    "description": "Dermatologist-tested luxury twin pack. Always Fleur delivers crisp sparkling pink florals, while Eau de Coconut envelopes you in sun-warmed coconut milk, creamy vanilla, and solar amber.",
    "keyBenefits": [
      "Two full-sized 236ml (8 fl oz) faceted bottles",
      "Dermatologist tested with conditioning aloe",
      "Day and night tropical layering harmony"
    ],
    "ingredients": "Alcohol Denat., Water (Aqua, Eau), Fragrance (Parfum), Aloe Barbadensis Leaf Extract, Propylene Glycol, Ethylhexyl Methoxycinnamate.",
    "howToUse": "Generously mist over chest, arms, and hair throughout the day for an instant refresh."
  },
  {
    "id": "prod-bbw-pink-obsessed-duo",
    "name": "Pink Obsessed Fragrance Mist & Ultimate Hydration Body Cream Duo",
    "brand": "Bath & Body Works",
    "category": "Bath & Body",
    "subcategory": "Body Care Duo",
    "price": 1249,
    "originalPrice": 1650,
    "discountPercent": 24,
    "rating": 4.8,
    "reviewCount": 1780,
    "images": [
      "Docs/Bath & Body/Pink Obsessed Fragrance Duo.png",
      "Docs/Bath & Body/bbw-pink-obsessed-duo-alt-bath-body-04.png",
      "Docs/Bath & Body/bbw-pink-obsessed-body-wash-bath-body-02.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Viral Duo",
    "description": "The viral fragrance phenomenon. Includes full-sized Fine Fragrance Mist (236ml) and 48-Hour Ultimate Hydration Body Cream (226g) packed with rich shea butter and plumping hyaluronic acid.",
    "keyBenefits": [
      "48-Hour clinically tested moisture lock",
      "Ultra-nourishing shea butter + hyaluronic acid cream",
      "Long-lasting warm spun-sugar & velvet berry sillage"
    ],
    "ingredients": "Water (Aqua), Glycerin, Caprylic/Capric Triglyceride, Glyceryl Stearate, Butyrospermum Parkii (Shea) Butter, Hyaluronic Acid, Fragrance.",
    "howToUse": "Smooth body cream over clean skin after bathing, then seal in the aroma with fine fragrance mist."
  },
  {
    "id": "prod-bbw-touch-of-gold-wash",
    "name": "Touch of Gold Shea Butter Moisturizing Body Wash (295ml)",
    "brand": "Bath & Body Works",
    "category": "Bath & Body",
    "subcategory": "Shower Gel",
    "price": 899,
    "originalPrice": 1199,
    "discountPercent": 25,
    "rating": 4.7,
    "reviewCount": 820,
    "images": [
      "Docs/Bath & Body/bbw-touch-of-gold-body-wash-bath-body-01.png",
      "Docs/Bath & Body/bbw-pink-obsessed-body-wash-bath-body-02.png"
    ],
    "badge": "LIMITED OFFER",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Save 25%",
    "description": "Moisturizes after one single shower. Formulated with rich African shea butter and conditioning coconut oil, wrapping your skin in warm golden amber and shimmering sparkles.",
    "keyBenefits": [
      "Clinically moisturizes in just one shower",
      "Infused with pure shea butter for all-day softness",
      "Rich, cushiony lather with warm amber fragrance"
    ],
    "ingredients": "Water (Aqua), Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Butyrospermum Parkii (Shea) Butter, Fragrance, Tocopherol.",
    "howToUse": "Lather into damp skin using hands or a shower puff, then rinse thoroughly."
  },
  {
    "id": "prod-bbw-pink-obsessed-wash",
    "name": "Pink Obsessed Pro-Vitamin B5 & Aloe Body Wash (295ml)",
    "brand": "Bath & Body Works",
    "category": "Bath & Body",
    "subcategory": "Shower Gel",
    "price": 849,
    "originalPrice": 1099,
    "discountPercent": 23,
    "rating": 4.7,
    "reviewCount": 910,
    "images": [
      "Docs/Bath & Body/bbw-pink-obsessed-body-wash-bath-body-02.png",
      "Docs/Bath & Body/Pink Obsessed Fragrance Duo.png"
    ],
    "badge": "POPULAR",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Save ₹250",
    "description": "Gentle yet deeply refreshing daily cleanser formulated with soothing Aloe Vera and Pro-Vitamin B5. Housed in a faceted ruby jewel-toned collectible bottle.",
    "keyBenefits": [
      "Infused with soothing Pro-Vitamin B5 & Aloe",
      "Gentle, non-drying foaming cleanser",
      "Signature Pink Obsessed sweet berry scent"
    ],
    "ingredients": "Water (Aqua), Sodium Laureth Sulfate, Aloe Barbadensis Leaf Juice, Panthenol (Pro-Vitamin B5), Fragrance, Citric Acid.",
    "howToUse": "Dispense into wet palm, work into rich bubbles, and cleanse entire body."
  },
  {
    "id": "prod-ag-totally-tropical-duo",
    "name": "American Girl Real Beauty Totally Tropical Lotion & Splash Duo",
    "brand": "Bath & Body Works x American Girl",
    "category": "Bath & Body",
    "subcategory": "Body Care Duo",
    "price": 1099,
    "originalPrice": 1450,
    "discountPercent": 24,
    "rating": 4.8,
    "reviewCount": 670,
    "images": [
      "Docs/Bath & Body/Retro Tropical Body Care Duo.png",
      "Docs/Bath & Body/American Girl Take Your Vitamins Lotion.png"
    ],
    "badge": "LIMITED OFFER",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Save 24%",
    "description": "A joyful burst of island sunshine! Includes Take Your Vitamins Daily Body Lotion (236ml) and Get Scent, Go Fragrance Splash (236ml) with uplifting tropical passionfruit and guava extracts.",
    "keyBenefits": [
      "Vitamin-rich nourishing lotion + matching fragrance splash",
      "Infused with botanical fruit vitamins",
      "Fun retro striped collectible packaging"
    ],
    "ingredients": "Aqua, Mineral Oil, Glyceryl Stearate, Fragrance, Passionfruit Extract, Vitamin E Acetate, Retinyl Palmitate.",
    "howToUse": "Apply lotion all over body, followed by a mist of fragrance splash."
  },
  {
    "id": "prod-ag-vitamins-lotion",
    "name": "American Girl Take Your Vitamins Daily Body Lotion in Fresh Flowers (236ml)",
    "brand": "Bath & Body Works x American Girl",
    "category": "Bath & Body",
    "subcategory": "Body Lotion",
    "price": 829,
    "originalPrice": 1050,
    "discountPercent": 21,
    "rating": 4.7,
    "reviewCount": 540,
    "images": [
      "Docs/Bath & Body/American Girl Take Your Vitamins Lotion.png",
      "Docs/Bath & Body/Retro Tropical Body Care Duo.png"
    ],
    "badge": "POPULAR",
    "isBestseller": false,
    "isFeaturedValue": false,
    "dealLabel": "Save 21%",
    "description": "Delivers lightweight, fast-absorbing daily moisture. Scented with fresh spring flower petals and enriched with essential multivitamins to keep skin silky and supple.",
    "keyBenefits": [
      "Fast-absorbing non-greasy texture",
      "Fresh bouquet floral aroma",
      "Enriched with essential daily multivitamins"
    ],
    "ingredients": "Water, Cetyl Alcohol, Stearic Acid, Fragrance, Flower Extracts, Niacinamide, Panthenol, Glycerin.",
    "howToUse": "Massage daily onto arms, legs, and dry areas."
  },
  {
    "id": "prod-bbw-salted-shorelines",
    "name": "Salted Shorelines Dermatologist Tested Fine Fragrance Mist (236ml)",
    "brand": "Bath & Body Works",
    "category": "Bath & Body",
    "subcategory": "Body Mist",
    "price": 899,
    "originalPrice": 1199,
    "discountPercent": 25,
    "rating": 4.6,
    "reviewCount": 480,
    "images": [
      "Docs/Bath & Body/Salted Shorelines Fragrance Mist.png",
      "Docs/Bath & Body/Always Fleur and Eau de Coconut Duo.png"
    ],
    "badge": "POPULAR",
    "isBestseller": false,
    "isFeaturedValue": false,
    "dealLabel": "Save ₹300",
    "description": "Breathe in the crisp sea breeze! A captivating aquatic mist combining sea salt crystals, sunlit coastal citrus, and driftwood cedar in a multifaceted aquamarine bottle.",
    "keyBenefits": [
      "Crisp aquatic ocean scent with coastal citrus",
      "Dermatologist tested with conditioning aloe",
      "Ultra-fine continuous mist nozzle"
    ],
    "ingredients": "Alcohol Denat., Water, Fragrance, Sea Salt Extract, Aloe Vera Leaf Extract, Benzyl Salicylate.",
    "howToUse": "Spritz all over body for an invigorating burst of fresh ocean energy."
  },
  {
    "id": "prod-kronzam-rosemary-spray",
    "name": "Kronzam Rosemary & Rice Water Hair Re-Growth Spray (Pack of 2, 100ml each)",
    "brand": "Kronzam",
    "category": "Haircare",
    "subcategory": "Hair Treatment",
    "price": 899,
    "originalPrice": 1199,
    "discountPercent": 25,
    "rating": 4.9,
    "reviewCount": 3120,
    "images": [
      "Docs/Haircare/Rosemary & Rice Water Spray Duo.png",
      "Docs/Haircare/Glossy Haircare Spray Beauty Portrait.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "isNewArrival": true,
    "dealLabel": "Twin Pack 25% Off",
    "description": "Clinically proven hair re-growth treatment. Dual water-based spray pack harnesses pure steam-distilled rosemary leaf extract and fermented rice water to reactivate dormant hair follicles.",
    "keyBenefits": [
      "Strengthens hair roots & stimulates active follicle growth",
      "100% natural water-based formula: non-greasy, non-sticky",
      "Free from parabens, sulfates, silicones, and alcohol"
    ],
    "ingredients": "Fermented Oryza Sativa (Rice) Water, Rosmarinus Officinalis (Rosemary) Extract, Biotin, Caffeine, Niacinamide, Glycerin.",
    "howToUse": "Spray directly onto clean scalp morning and evening. Gently massage with fingertips for 2 minutes. Do not rinse."
  },
  {
    "id": "prod-loreal-total-repair-1l",
    "name": "Total Repair 5 Keratinxs Repairing Shampoo (1 Litre Mega Size)",
    "brand": "L'Oréal Paris",
    "category": "Haircare",
    "subcategory": "Shampoo",
    "price": 949,
    "originalPrice": 1250,
    "discountPercent": 24,
    "rating": 4.8,
    "reviewCount": 4560,
    "images": [
      "Docs/Haircare/L’Oréal Total Repair Shampoo 1L.png",
      "Docs/Haircare/Glossy Chocolate Waves Studio Portrait.png"
    ],
    "badge": "MEGA VALUE",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Mega 1L Pack",
    "description": "Mega salon-sized 1 Litre bottle with convenient pump dispenser. Powered by 4% Repair Concentrate with Keratinxs to target the 5 signs of damaged hair: hairfall, dryness, roughness, dullness, and split ends.",
    "keyBenefits": [
      "Enriched with 4% Keratinxs micro-protein complex",
      "Mega 1000ml value pack with salon pump dispenser",
      "Reduces hair breakage by up to 98%"
    ],
    "ingredients": "Aqua, Sodium Laureth Sulfate, Coco-Betaine, Dimethicone, Glycol Distearate, Hydrolyzed Keratin, Citric Acid, Arginine, Salicylic Acid.",
    "howToUse": "Apply pump onto wet hair, massage into a dense lather from roots to ends, then rinse thoroughly."
  },
  {
    "id": "prod-maheorthe-hibiscus-duo",
    "name": "Maheorthe Natural Hibiscus Hair Oil (100ml) & Coconut Shampoo (300ml) Duo",
    "brand": "Maheorthe",
    "category": "Haircare",
    "subcategory": "Hair Care Set",
    "price": 799,
    "originalPrice": 1050,
    "discountPercent": 24,
    "rating": 4.7,
    "reviewCount": 1180,
    "images": [
      "Docs/Haircare/Hibiscus Hair Care Duo with Coconuts.png",
      "Docs/Haircare/Glossy Espresso Hair Cascade.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "Special 24% Off",
    "description": "Complete Ayurvedic hair strengthening ritual. Pure Hibiscus Hair Oil deeply conditions the scalp and promotes thick hair growth, while Coconut Hibiscus Shampoo cleanses gently without stripping moisture.",
    "keyBenefits": [
      "100% natural botanicals with real red hibiscus petals",
      "Sulfate-free and paraben-free cleansing",
      "Imparts deep natural glossy bounce to dry hair"
    ],
    "ingredients": "Cold-Pressed Coconut Oil, Hibiscus Rosa-Sinensis Flower Extract, Bhringraj, Amla, Almond Oil, Vitamin E.",
    "howToUse": "Massage Hibiscus Hair Oil into scalp 1 hour before wash. Follow with Coconut Hibiscus Shampoo and rinse clean."
  },
  {
    "id": "prod-olaplex-no3",
    "name": "No. 3 Hair Perfector Patented Bond Building Treatment",
    "brand": "Olaplex",
    "category": "Haircare",
    "subcategory": "Bond Repair",
    "price": 1149,
    "originalPrice": 1500,
    "discountPercent": 23,
    "rating": 4.9,
    "reviewCount": 5200,
    "images": [
      "Docs/Haircare/Voluminous Waves Beauty Portrait.png",
      "Docs/Haircare/Serene Waves Beauty Portrait.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Salon Treatment",
    "description": "The global benchmark in hair repair. Patented Bis-Aminopropyl Diglycol Dimaleate permanently links broken disulfide bonds caused by bleaching, heat styling, and chemical treatments.",
    "keyBenefits": [
      "Patented single active ingredient restores broken bonds",
      "Visible results after just one 10-minute application",
      "Suitable for all hair textures and color-treated hair"
    ],
    "ingredients": "Water (Aqua), Bis-Aminopropyl Diglycol Dimaleate, Propylene Glycol, Cetearyl Alcohol, Behentrimonium Methosulfate, Phenoxyethanol.",
    "howToUse": "Apply damp from roots to ends before shampooing. Leave on for 10-20 minutes, then shampoo and condition."
  },
  {
    "id": "prod-tresemme-keratin-mask",
    "name": "Keratin Smooth Deep Smoothing Anti-Frizz Treatment Mask",
    "brand": "TRESemmé",
    "category": "Haircare",
    "subcategory": "Hair Mask",
    "price": 499,
    "originalPrice": 650,
    "discountPercent": 23,
    "rating": 4.6,
    "reviewCount": 1890,
    "images": [
      "Docs/Haircare/Glossy Waves in Profile.png",
      "Docs/Haircare/Serene Satin Robe Portrait.png"
    ],
    "badge": "LIMITED OFFER",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Save ₹151",
    "description": "Infused with salon-grade Keratin and precious Marula Oil. Delivers 5 benefits in 1 wash: up to 72 hours of frizz control, detangling, radiant shine, soft feel, and flyaway tame.",
    "keyBenefits": [
      "Controls frizz for up to 72 continuous hours",
      "Infused with nourishing African Marula Oil",
      "Salon silkiness at home"
    ],
    "ingredients": "Aqua, Cetearyl Alcohol, Stearamidopropyl Dimethylamine, Keratin, Sclerocarya Birrea (Marula) Seed Oil, Behentrimonium Chloride.",
    "howToUse": "Apply through mid-lengths and ends after shampooing. Leave for 3 to 5 minutes, then rinse."
  },
  {
    "id": "prod-bloom-ceramide-barrier-cream",
    "name": "Ceramide Barrier Defense Deep Hydrating Face Cream (50ml)",
    "brand": "Bloom Beauty",
    "category": "Skincare",
    "subcategory": "Moisturizer",
    "price": 1399,
    "originalPrice": 1799,
    "discountPercent": 22,
    "rating": 4.9,
    "reviewCount": 1890,
    "images": [
      "Docs/Skincare/ceramide-barrier-cream-skincare-01.png",
      "Docs/Skincare/Freckled Skincare Cream Portrait.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "isNewArrival": true,
    "dealLabel": "Barrier Shield",
    "description": "Intensive barrier restoration cream enriched with 5 essential ceramides, plant squalane, and oat colloidal extract. Plumps dehydrated skin and restores moisture barrier balance.",
    "keyBenefits": [
      "5 essential biomimetic ceramides (EOP, NP, AP, AS, NS)",
      "Deep non-greasy 24-hour hydration lock",
      "Soothes redness, flaking, and sensitivity"
    ],
    "ingredients": "Aqua, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Squalane, Cholesterol, Sodium Hyaluronate, Avena Sativa (Oat) Kernel Flour.",
    "howToUse": "Smooth a hazelnut-sized amount over face and neck morning and night following serums."
  },
  {
    "id": "prod-bloom-mineral-clay-mask",
    "name": "Purifying Mineral Clay & Matcha Detox Face Mask (100ml)",
    "brand": "Bloom Beauty",
    "category": "Skincare",
    "subcategory": "Face Mask",
    "price": 1199,
    "originalPrice": 1499,
    "discountPercent": 20,
    "rating": 4.8,
    "reviewCount": 1420,
    "images": [
      "Docs/Skincare/mineral-clay-mask-skincare-02.png",
      "Docs/Skincare/Glowing Clay Mask Skincare Portrait.png"
    ],
    "badge": "LIMITED OFFER",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Pore Detox",
    "description": "Formulated with ultra-fine French Kaolin Clay, antioxidant-rich ceremonial Japanese Matcha, and Salicylic Acid (BHA). Draws out pore congestion without stripping natural moisture.",
    "keyBenefits": [
      "Unclogs enlarged pores and reduces excess sebum",
      "Non-drying creamy clay texture with soothing matcha",
      "Smooths skin texture in 10 minutes"
    ],
    "ingredients": "Kaolin Clay, Bentonite, Camellia Sinensis (Matcha) Leaf Extract, Salicylic Acid, Glycerin, Allantoin, Aloe Barbadensis Leaf Juice.",
    "howToUse": "Apply an even layer to clean, dry skin. Relax for 10-15 minutes until set, then gently rinse with warm water."
  },
  {
    "id": "prod-bloom-radiance-glow-serum",
    "name": "10% Niacinamide & Vitamin C Radiance Booster Serum (30ml)",
    "brand": "Bloom Beauty",
    "category": "Skincare",
    "subcategory": "Face Serum",
    "price": 1499,
    "originalPrice": 1899,
    "discountPercent": 21,
    "rating": 4.9,
    "reviewCount": 3410,
    "images": [
      "Docs/Skincare/radiance-glow-serum-skincare-03.png",
      "Docs/Skincare/Radiant Serum Skincare Close-Up.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "isNewArrival": true,
    "dealLabel": "Save ₹400",
    "description": "Dual-action brightening booster combining 10% pure Niacinamide with stabilized Ethyl Ascorbic Acid (Vitamin C). Fades dark spots, evens discoloration, and imparts an ethereal glass glow.",
    "keyBenefits": [
      "10% High-potency Niacinamide for refined pores",
      "Stabilized Vitamin C fades post-acne marks and hyperpigmentation",
      "Lightweight, fast-absorbing amber elixir with zero tackiness"
    ],
    "ingredients": "Aqua, Niacinamide, 3-O-Ethyl Ascorbic Acid, Zinc PCA, Centella Asiatica Extract, Sodium Hyaluronate, Ferulic Acid.",
    "howToUse": "Apply 3-4 drops directly to cleansed face morning and evening before heavier creams."
  },
  {
    "id": "prod-bloom-hyaluronic-serum",
    "name": "2% Pure Hyaluronic Acid & Ceramide Deep Hydration Plumping Serum (30ml)",
    "brand": "Bloom Beauty",
    "category": "Skincare",
    "subcategory": "Face Serum",
    "price": 1599,
    "originalPrice": 1999,
    "discountPercent": 20,
    "rating": 4.9,
    "reviewCount": 2840,
    "images": [
      "Docs/Skincare/hyaluronic-hydration-serum-skincare-04.png",
      "Docs/Skincare/Radiant Serum Skincare Glow.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Glass Skin Serum",
    "description": "Multi-molecular weight hyaluronic acid complex that penetrates deep epidermal layers. Infuses skin with instant dewy plumping bounce and binds 1000x its weight in water.",
    "keyBenefits": [
      "Multi-molecular 2% Hyaluronic Acid delivers multi-depth moisture",
      "Infused with Vitamin B5 (Panthenol) for barrier repair",
      "Instant dewy plumping effect for smooth, bouncy glass skin"
    ],
    "ingredients": "Aqua, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate, Panthenol, Glycerin, Ahnfeltia Concinna Extract.",
    "howToUse": "Smooth 3-5 drops onto damp skin immediately after cleansing or toning to lock in maximum hydration."
  },
  {
    "id": "prod-bloom-peptide-lotion",
    "name": "Multi-Peptide & Squalane Restorative Daily Radiance Lotion (75ml)",
    "brand": "Bloom Beauty",
    "category": "Skincare",
    "subcategory": "Face Lotion",
    "price": 1699,
    "originalPrice": 2199,
    "discountPercent": 23,
    "rating": 4.8,
    "reviewCount": 1530,
    "images": [
      "Docs/Skincare/peptide-radiance-lotion-skincare-05.png",
      "Docs/Skincare/Radiant Skincare Glow.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Award Winner",
    "description": "A weightless anti-aging peptide lotion that fortifies skin firmness and bounce. Combines copper tripeptide-1, matrixyl 3000, and bio-squalane for a silky luminous veil.",
    "keyBenefits": [
      "Matrixyl 3000 & Copper Tripeptides promote collagen density",
      "Featherlight lotion absorbs instantly under makeup",
      "Leaves a luminous, dewy satin finish with 0 shine"
    ],
    "ingredients": "Aqua, Squalane, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Niacinamide, Glycerin, Sodium Hyaluronate, Jojoba Esters.",
    "howToUse": "Dispense 1-2 pumps onto fingertips and gently smooth over face and neck with upward motions."
  },
  {
    "id": "prod-bloom-glass-skin-essence",
    "name": "Centella & Green Tea Calming Dewy Glass Skin Essence (120ml)",
    "brand": "Bloom Beauty",
    "category": "Skincare",
    "subcategory": "Essence & Toner",
    "price": 1299,
    "originalPrice": 1650,
    "discountPercent": 21,
    "rating": 4.8,
    "reviewCount": 970,
    "images": [
      "Docs/Skincare/calming-glass-skin-essence-skincare-06.png",
      "Docs/Skincare/Serene Skincare Portrait with Gold Ear Piercings.png"
    ],
    "badge": "NEW ARRIVAL",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isNewArrival": true,
    "dealLabel": "Calming Dew",
    "description": "Formulated with 85% Centella Asiatica Leaf Water and fermented Jeju Green Tea. Rapidly calms redness, soothes post-acne irritation, and drenches skin in dewy moisture.",
    "keyBenefits": [
      "85% Centella Asiatica calms sensitivity and redness",
      "Fermented Green Tea provides potent antioxidant shield",
      "Prepares skin to absorb serums and moisturizers deeply"
    ],
    "ingredients": "Centella Asiatica Leaf Water, Camellia Sinensis (Green Tea) Leaf Extract, Glycerin, Butylene Glycol, Panthenol, Madecassoside, Asiaticoside.",
    "howToUse": "Pour a few drops into palms and gently pat into face until fully absorbed."
  },
  {
    "id": "prod-rose-lily-nail-set",
    "name": "Rose & Lily Natural Glow Nail Strengthener & Cuticle Repair Oil",
    "brand": "Rose & Lily",
    "category": "Nail Care",
    "subcategory": "Nail Treatment",
    "price": 899,
    "originalPrice": 1150,
    "discountPercent": 22,
    "rating": 4.9,
    "reviewCount": 1650,
    "images": [
      "Docs/Nail Care/Rose & Lily Natural Glow Set.png",
      "Docs/Nail Care/Glossy Nude Manicure Product Flat Lay.png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": false,
    "dealLabel": "Strengthening Oil",
    "description": "Professional glass-pipette elixir enriched with sweet almond oil, jojoba seed, and biotin. Rescues weak, brittle, peeling nails and conditions cuticles to healthy perfection.",
    "keyBenefits": [
      "Reinforces thin, fragile nails in 7 days",
      "Deeply softens and conditions dry cuticles",
      "Imparts a high-gloss natural healthy sheen"
    ],
    "ingredients": "Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Tocopherol (Vitamin E), Biotin, Keratin.",
    "howToUse": "Apply one drop to each nail bed and cuticle nightly. Massage gently in circular motions."
  },
  {
    "id": "prod-mii-metallic-pink",
    "name": "MI Fashion High Shine Metallic Pink Nail Polish (Vernis à Ongles)",
    "brand": "MI Fashion",
    "category": "Nail Care",
    "subcategory": "Nail Polish",
    "price": 649,
    "originalPrice": 850,
    "discountPercent": 24,
    "rating": 4.8,
    "reviewCount": 1420,
    "images": [
      "Docs/Nail Care/MII Fashion Metallic Pink Nail Polish.png",
      "Docs/Nail Care/Champagne Gold Nails and Filigree Ring.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "High Shine",
    "description": "Mirror-finish metallic rose pink lacquer with micro-shimmer pigments. Glides on smoothly with a wide fan brush for opaque, chip-resistant salon luster lasting up to 8 days.",
    "keyBenefits": [
      "High-impact metallic chrome reflection",
      "Chip-resistant wear up to 8 days without UV lamp",
      "Precision wide-curve applicator brush"
    ],
    "ingredients": "Butyl Acetate, Ethyl Acetate, Nitrocellulose, Acetyl Tributyl Citrate, Isopropyl Alcohol, Synthetic Mica (CI 77019), CI 77891, CI 15850.",
    "howToUse": "Apply two thin coats over base coat. Allow 2 minutes drying between coats, then seal with glossy top coat."
  },
  {
    "id": "prod-nail-republic-cat-eye",
    "name": "Silk Cat-Eye UV/LED Gel Polish in Shimmering Teal",
    "brand": "Nail Republic",
    "category": "Nail Care",
    "subcategory": "Gel Polish",
    "price": 749,
    "originalPrice": 999,
    "discountPercent": 25,
    "rating": 4.8,
    "reviewCount": 980,
    "images": [
      "Docs/Nail Care/Silk Cat-Eye Teal Nail Ad.png",
      "Docs/Nail Care/Emerald Gloss Nail Color Close-Up.png"
    ],
    "badge": "LIMITED OFFER",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "25% Off",
    "description": "Mesmerizing magnetic cat-eye gel polish. High-density magnetic particles create a luminous dimensional velvet silk light bar that shimmers in ocean teal under lighting.",
    "keyBenefits": [
      "Dynamic magnetic 3D velvet light effect",
      "Salon wear for 21+ days without chipping or peeling",
      "Cures in 60 seconds under standard UV/LED lamp"
    ],
    "ingredients": "Acrylates Copolymer, Hydroxypropyl Methacrylate, Trimethylbenzoyl Diphenylphosphine Oxide, Magnetic Iron Oxide, Mica, CI 77288.",
    "howToUse": "Apply gel layer, hover magnetic wand 2mm over wet coat for 5 seconds to form cat-eye line, then cure under UV/LED."
  },
  {
    "id": "prod-pro-manicure-kit",
    "name": "Professional Stainless Steel Manicure & Pedicure Nail Tool Kit (14-Piece)",
    "brand": "Bloom Beauty Studio",
    "category": "Beauty Tools",
    "subcategory": "Nail Tools",
    "price": 1299,
    "originalPrice": 1699,
    "discountPercent": 24,
    "rating": 4.9,
    "reviewCount": 2190,
    "images": [
      "Docs/Nail Care/Professional Nail Care Tools Flat Lay.png",
      "Docs/Nail Care/Pink Polish Cleanup Tutorial.png"
    ],
    "badge": "PRO SET",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "14-Piece Kit",
    "description": "Surgical-grade stainless steel manicure and pedicure suite. Includes precision cuticle nipper, dual nail clippers, curved nail scissors, sapphire file, 4-way buffer block, dual-ended cuticle pushers, and cleanup tools.",
    "keyBenefits": [
      "14 professional grade salon tools in luxury layout",
      "Surgical stainless steel: rust-resistant and sterilizable",
      "Ultra-sharp hand-sharpened cutting blades for clean trims"
    ],
    "ingredients": "100% Medical Grade Stainless Steel & High Density EVA Buffing Block.",
    "howToUse": "Use clippers straight across, file smoothly in one direction, and gently push cuticles after a warm soak."
  },
  {
    "id": "prod-bloom-nail-trio",
    "name": "Vitamin Cuticle Elixir, Strengthening Base Coat & Hand Soufflé Trio",
    "brand": "Bloom Beauty Nails",
    "category": "Nail Care",
    "subcategory": "Nail Care Trio",
    "price": 1149,
    "originalPrice": 1499,
    "discountPercent": 23,
    "rating": 4.8,
    "reviewCount": 780,
    "images": [
      "Docs/Nail Care/Glossy Nude Manicure Product Flat Lay.png",
      "Docs/Nail Care/Rose & Lily Natural Glow Set.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "Complete Trio",
    "description": "Everything for a salon-grade natural nude manicure at home. Complete 3-piece set includes Vitamin-Rich Cuticle Elixir, Strengthening Base Coat, and Hydrating Hand Soufflé with shea butter and aloe.",
    "keyBenefits": [
      "3-in-1 complete hand and nail renewal ritual",
      "Strengthens nail beds while hydrating dry knuckles and cuticles",
      "Delivers elegant high-gloss natural manicure glow"
    ],
    "ingredients": "Shea Butter, Vitamin E, Keratin Protein, Sweet Almond Oil, Aloe Vera, Calcium Pantothenate.",
    "howToUse": "Massage Hand Soufflé into hands, apply Cuticle Elixir to nail contours, and finish with Strengthening Base Coat."
  },
  {
    "id": "prod-miss-nails-sage",
    "name": "Miss Nails Minis Pastel Sage High-Gloss Polish",
    "brand": "Miss Nails",
    "category": "Nail Care",
    "subcategory": "Nail Polish",
    "price": 619,
    "originalPrice": 799,
    "discountPercent": 23,
    "rating": 4.7,
    "reviewCount": 620,
    "images": [
      "Docs/Nail Care/Glossy Sage Nails and Mini Polish.png",
      "Docs/Nail Care/Emerald Nail Gel Close-Up.png"
    ],
    "badge": "HOT DEAL",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "Save ₹180",
    "description": "Chic muted pastel sage green lacquer with mirror shine. Quick-drying 5-free formula that glides effortlessly on natural nails.",
    "keyBenefits": [
      "Trend-forward pastel sage green cream finish",
      "Fast-drying formula ready in under 60 seconds",
      "Toxin-free 5-free healthy lacquer"
    ],
    "ingredients": "Ethyl Acetate, Butyl Acetate, Nitrocellulose, Acetyl Tributyl Citrate, Isopropyl Alcohol, CI 77891, CI 77288.",
    "howToUse": "Apply 2 coats over base coat and finish with clear top coat."
  },
  {
    "id": "prod-maybelline-burgundy-glow",
    "name": "Color Sensational Ultimatte Luxe Crimson Red Lipstick",
    "brand": "Maybelline New York",
    "category": "Makeup",
    "subcategory": "Lipstick",
    "price": 799,
    "originalPrice": 999,
    "discountPercent": 20,
    "rating": 4.8,
    "reviewCount": 3820,
    "images": [
      "Docs/Lipsticks/Glossy Red Maybelline Lipstick Duo.png",
      "Docs/Lipsticks/Velvety Red Lips Macro Portrait.png",
      "Docs/Lipsticks/Red Lips and Golden Glamour.png",
      "Docs/Lipsticks/Vivid Red Lips Macro Portrait (1).png"
    ],
    "badge": "BESTSELLER",
    "isBestseller": true,
    "isFeaturedValue": true,
    "dealLabel": "Flat 20% Off",
    "description": "A cushiony, lightweight matte finish infused with nourishing jojoba oil and high-impact pigments. Delivers up to 12 hours of velvet softness without drying.",
    "keyBenefits": [
      "Non-drying airy matte formula",
      "Enriched with vitamin E & jojoba oil",
      "Ultra-pigmented single swipe coverage"
    ],
    "ingredients": "Dimethicone, Bis-Diglyceryl Polyacyladipate-2, Hydrogenated Polyisobutene, Phenyl Trimethicone, Jojoba Seed Oil, Tocopheryl Acetate, Red 7 Lake (CI 15850).",
    "howToUse": "Apply lipstick starting in the center of your upper lip and glide along contours to the corners.",
    "shades": [
      {
        "name": "Crimson Red",
        "hex": "#B81424"
      },
      {
        "name": "Burgundy Velvet",
        "hex": "#6B1D2F"
      },
      {
        "name": "Berry Plum",
        "hex": "#8A244B"
      },
      {
        "name": "Rose Nude",
        "hex": "#C47B89"
      }
    ]
  },
  {
    "id": "prod-praush-rosegold-plum",
    "name": "Praush Beauty Rose-Gold Luxury Matte Lipstick in Plum Berry",
    "brand": "Praush Beauty",
    "category": "Makeup",
    "subcategory": "Matte Lipstick",
    "price": 899,
    "originalPrice": 1199,
    "discountPercent": 25,
    "rating": 4.8,
    "reviewCount": 1420,
    "images": [
      "Docs/Lipsticks/Rose-Gold Lipstick Beauty Shot.png",
      "Docs/Lipsticks/Rose-Gold Lipstick with Berry Pigment Swipe.png",
      "Docs/Lipsticks/Rose-Gold Lipstick with Dusty Rose Swatch.png"
    ],
    "badge": "BEST VALUE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "Save 25%",
    "description": "Housed in a bespoke octagonal rose-gold metallic casing. Highly saturated matte bullet lipstick that glides like silk, wrapping lips in rich plum berry pigment.",
    "keyBenefits": [
      "Bespoke weighted rose-gold metal packaging",
      "Intense one-stroke color payoff",
      "Transfer-resistant velvety comfort finish"
    ],
    "ingredients": "Octyldodecanol, Candelilla Wax, Cera Microcristallina, Caprylic/Capric Triglyceride, Vitamin E, Iron Oxides (CI 77491, CI 77492, CI 77499).",
    "howToUse": "Glide directly from the bullet onto lips, starting at the cupid's bow and working outward.",
    "shades": [
      {
        "name": "Plum Berry",
        "hex": "#8B1E41"
      },
      {
        "name": "Dusty Rose",
        "hex": "#C76E78"
      },
      {
        "name": "Velvet Mauve",
        "hex": "#9E4760"
      }
    ]
  },
  {
    "id": "prod-prime-matte-trio",
    "name": "Prime Matte Velvet Long-Wear Lipstick Trio (Mauve, Crimson & Nude)",
    "brand": "Prime Matte",
    "category": "Makeup",
    "subcategory": "Lipstick Set",
    "price": 1299,
    "originalPrice": 1699,
    "discountPercent": 24,
    "rating": 4.8,
    "reviewCount": 960,
    "images": [
      "Docs/Lipsticks/Three Matte Lipsticks in Vibrant Swatches.png",
      "Docs/Lipsticks/Winking Glossy Kiss Portrait.png",
      "Docs/Lipsticks/Split-Tone Matte Lipstick Comparison.png"
    ],
    "badge": "LIMITED OFFER",
    "isBestseller": false,
    "isFeaturedValue": false,
    "isSavingsDeal": true,
    "dealLabel": "3-Shade Set",
    "description": "Curated 3-piece lipstick vault featuring the three essential everyday shades: Mauve Berry, Classic Crimson Red, and Warm Dusty Nude in soft-touch matte casings.",
    "keyBenefits": [
      "Complete 3-piece lipstick wardrobe in one box",
      "10-Hour comfortable matte wear without feathering",
      "Formulated with hydrating argan oil"
    ],
    "ingredients": "Isododecane, Trimethylsiloxysilicate, Argania Spinosa (Argan) Kernel Oil, Cera Alba, Tocopherol, Mica, CI 15850, CI 77491.",
    "howToUse": "Choose your mood: Nude for work, Mauve for brunch, Crimson for evening glam.",
    "shades": [
      {
        "name": "Dusty Nude",
        "hex": "#BA766E"
      },
      {
        "name": "Classic Crimson",
        "hex": "#C6182C"
      },
      {
        "name": "Mauve Berry",
        "hex": "#9D4B66"
      }
    ]
  },
  {
    "id": "prod-signature-four-shades",
    "name": "Signature 4-Shade Velvet Matte Lipstick Quad Collection",
    "brand": "Bloom Beauty",
    "category": "Makeup",
    "subcategory": "Lipstick Set",
    "price": 1499,
    "originalPrice": 1999,
    "discountPercent": 25,
    "rating": 4.9,
    "reviewCount": 2100,
    "images": [
      "Docs/Lipsticks/Four Shades, One Signature Pout.png",
      "Docs/Lipsticks/Glossy Curls and Crimson Lips.png",
      "Docs/Lipsticks/Velvet Burgundy Lips Close-Up.png"
    ],
    "badge": "NEW LAUNCH",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "4-Piece Quad",
    "description": "Four iconic signature shades in one premier collection: Bordeaux Wine, Scarlet Velvet, Terracotta Sunset, and Petal Blush. Formulated for all Indian skin tones.",
    "keyBenefits": [
      "4 universally flattering couture lip shades",
      "Enriched with camellia seed oil and hyaluronic spheres",
      "Lightweight, feather-resistant all-day comfort"
    ],
    "ingredients": "Polyglyceryl-2 Triisostearate, Dimethicone, Camellia Japonica Seed Oil, Sodium Hyaluronate, CI 77491, CI 15850, CI 45410.",
    "howToUse": "Wear individually or ombre two shades together for an editorial lip contour."
  },
  {
    "id": "prod-nail-cherry-glaze",
    "name": "Cherry Glaze High-Shine UV Gel Nail Polish (15ml)",
    "brand": "Nail Republic",
    "category": "Nail Care",
    "subcategory": "Gel Polish",
    "price": 699,
    "originalPrice": 899,
    "discountPercent": 22,
    "rating": 4.8,
    "reviewCount": 1240,
    "images": [
      "Docs/Nail Care/Glossy Cherry Red Manicure Application.png",
      "Docs/Nail Care/Emerald Gloss Nail Color Close-Up.png"
    ],
    "badge": "SALON GLOSS",
    "isBestseller": true,
    "isFeaturedValue": true,
    "dealLabel": "Salon Red",
    "description": "Ultra-pigmented salon gel polish delivering up to 21 days of chip-resistant, mirror-like red shine without UV lamp damage.",
    "keyBenefits": [
      "21-day chip-free high-gloss wear",
      "Pro-glide curved brush for streak-free application",
      "Strengthens natural nails with calcium and vitamin E"
    ],
    "ingredients": "Ethyl Acetate, Butyl Acetate, Nitrocellulose, Acetyl Tributyl Citrate, Isopropyl Alcohol, Calcium Pantothenate, Vitamin E Acetate.",
    "howToUse": "Apply thin layer over base coat. Cure 60s under LED or air dry 2 minutes. Seal with high-shine top coat."
  },
  {
    "id": "prod-nail-molten-bronze",
    "name": "Molten Bronze Metallic Shimmer Nail Lacquer (12ml)",
    "brand": "MI Fashion",
    "category": "Nail Care",
    "subcategory": "Metallic Polish",
    "price": 649,
    "originalPrice": 849,
    "discountPercent": 24,
    "rating": 4.7,
    "reviewCount": 980,
    "images": [
      "Docs/Nail Care/Luxe Bronze Nail Polish Beauty Shot.png",
      "Docs/Nail Care/Champagne Gold Nails and Filigree Ring.png"
    ],
    "badge": "METALLIC FOIL",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "Molten Foil",
    "description": "Luminous foil metallic formula embedded with micro-fine pearl pigments for multidimensional chrome brilliance in two coats.",
    "keyBenefits": [
      "Liquid-metal metallic finish",
      "Quick-drying 60-second formula",
      "Toxin-free 10-Free formula safe for sensitive nails"
    ],
    "ingredients": "Butyl Acetate, Ethyl Acetate, Nitrocellulose, Mica (CI 77019), Iron Oxides (CI 77491), Titanium Dioxide, Dimethicone.",
    "howToUse": "Roll bottle gently between palms. Apply two even coats over bare or prepped nails."
  },
  {
    "id": "prod-nail-velvet-burgundy",
    "name": "Velvet Burgundy Matte Fast-Dry Nail Enamel (12ml)",
    "brand": "Rose & Lily",
    "category": "Nail Care",
    "subcategory": "Matte Polish",
    "price": 749,
    "originalPrice": 999,
    "discountPercent": 25,
    "rating": 4.8,
    "reviewCount": 1150,
    "images": [
      "Docs/Nail Care/Luxury Matte Burgundy Nail Polish Close-Up.png",
      "Docs/Nail Care/Rose & Lily Natural Glow Set.png"
    ],
    "badge": "MATTE LUXE",
    "isBestseller": true,
    "isSavingsDeal": true,
    "dealLabel": "Deep Velvet",
    "description": "Deep burgundy couture nail enamel that dries down instantly to a soft-touch suede matte finish with zero streaks.",
    "keyBenefits": [
      "Instant soft-touch velvet matte finish",
      "Non-fading rich wine pigments",
      "Enriched with argan oil to prevent nail brittleness"
    ],
    "ingredients": "Ethyl Acetate, Butyl Acetate, Silica, Nitrocellulose, Argania Spinosa Kernel Oil, Red 7 Lake (CI 15850).",
    "howToUse": "Apply 2 thin coats onto clean nails. Do not use glossy topcoat to preserve the bespoke velvet matte texture."
  },
  {
    "id": "prod-nail-midnight-sapphire",
    "name": "Midnight Sapphire High-Gloss Pro Nail Lacquer (15ml)",
    "brand": "MI Fashion",
    "category": "Nail Care",
    "subcategory": "Gel Lacquer",
    "price": 689,
    "originalPrice": 899,
    "discountPercent": 23,
    "rating": 4.8,
    "reviewCount": 860,
    "images": [
      "Docs/Nail Care/Navy Gloss Nail Polish Beauty Shot.png",
      "Docs/Nail Care/Silk Cat-Eye Teal Nail Ad.png"
    ],
    "badge": "DEEP SHINE",
    "isBestseller": false,
    "isFeaturedValue": true,
    "dealLabel": "Sapphire Glow",
    "description": "Intense midnight navy blue gel lacquer with high refractive index resins for gel-like plumping and deep jewel depth.",
    "keyBenefits": [
      "Plumping gel effect without a UV lamp",
      "High-pigment single coat coverage",
      "Anti-chip resin shields tips against wear"
    ],
    "ingredients": "Ethyl Acetate, Butyl Acetate, Adipic Acid Neopentyl Glycol Copolymer, Ferric Ammonium Ferrocyanide (CI 77510).",
    "howToUse": "Apply one to two coats. Allow 90 seconds to set. Top with Gel Top Coat."
  },
  {
    "id": "prod-makeup-velvet-mauve",
    "name": "Velvet Cushion Lip Glaze & Liner in Petal Mauve",
    "brand": "Prime Matte",
    "category": "Makeup",
    "subcategory": "Lip Glaze",
    "price": 699,
    "originalPrice": 949,
    "discountPercent": 26,
    "rating": 4.8,
    "reviewCount": 1420,
    "images": [
      "Docs/Lipsticks/Mauve Gloss Beauty Close-Up.png",
      "Docs/Lipsticks/Three Matte Lipsticks in Vibrant Swatches.png"
    ],
    "badge": "NEW SHADE",
    "isBestseller": true,
    "isSavingsDeal": true,
    "dealLabel": "Cushion Mauve",
    "description": "Cushiony non-sticky lip lacquer infused with jojoba butter and hyaluronic microspheres for juicy, plump mauve lips.",
    "keyBenefits": [
      "Non-sticky cushion glass shine",
      "Hydrates and conditions dry lips for 8 hours",
      "Flattering nude mauve tone suited for all Indian skin tones"
    ],
    "ingredients": "Polybutene, Hydrogenated Polyisobutene, Simmondsia Chinensis (Jojoba) Seed Oil, Sodium Hyaluronate, Tocopherol.",
    "howToUse": "Glide doe-foot applicator across bare lips or layer over matte lipstick for added vinyl depth."
  },
  {
    "id": "prod-makeup-joyful-berry",
    "name": "Praush Beauty Weightless Matte Lipstick in Berry Wine",
    "brand": "Praush Beauty",
    "category": "Makeup",
    "subcategory": "Matte Lipstick",
    "price": 899,
    "originalPrice": 1199,
    "discountPercent": 25,
    "rating": 4.9,
    "reviewCount": 2120,
    "images": [
      "Docs/Lipsticks/Joyful Beauty Close-Up with Hand Gesture.png",
      "Docs/Lipsticks/Rose-Gold Lipstick with Berry Pigment Swipe.png",
      "Docs/Lipsticks/Velvety Berry Lips and Radiant Smile.png"
    ],
    "badge": "FAN FAVORITE",
    "isBestseller": true,
    "isFeaturedValue": true,
    "dealLabel": "Berry Luxe",
    "description": "Featherlight matte lipstick with intense berry wine payoff that hugs lips comfortably all day without cracking.",
    "keyBenefits": [
      "12-hour transfer-resistant matte formula",
      "Enriched with sweet almond oil and shea butter",
      "High pigment bullet with precision teardrop tip"
    ],
    "ingredients": "Dimethicone, Isononyl Isononanoate, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Butyrospermum Parkii (Shea) Butter.",
    "howToUse": "Apply from center of Cupid's bow outward toward corners. Blot lightly with tissue for soft-focus blur."
  }
];

export const FEATURED_CATEGORIES = [
  {
    "id": "makeup",
    "name": "Makeup",
    "tagline": "Lipsticks, Foundations, Eyes & Blushes",
    "itemCount": "240+ Products",
    "image": "Docs/Lipsticks/Luxury Red Lipstick Mood Board.png",
    "subcategories": [
      "Lipsticks & Glosses",
      "Foundations & Concealers",
      "Eyeshadow & Mascara",
      "Blush & Highlighters",
      "Primers & Setting Sprays"
    ],
    "popularBrands": [
      "Maybelline New York",
      "Praush Beauty",
      "Prime Matte",
      "L'Oréal Paris",
      "Praush Beauty",
      "Huda Beauty"
    ]
  },
  {
    "id": "skincare",
    "name": "Skincare",
    "tagline": "Serums, Cleansers, SPF & Moisturizers",
    "itemCount": "190+ Products",
    "image": "Docs/Skincare/Radiant Serum Skincare Glow.png",
    "subcategories": [
      "Cleansers & Toners",
      "Serums & Essences",
      "Moisturizers & Creams",
      "Sunscreen SPF 50+",
      "Face Masks & Peels"
    ],
    "popularBrands": [
      "Bloom Beauty",
      "Bloom Beauty",
      "CeraVe",
      "Cetaphil",
      "Minimalist"
    ]
  },
  {
    "id": "haircare",
    "name": "Haircare",
    "tagline": "Bond Repair, Shampoos & Masks",
    "itemCount": "150+ Products",
    "image": "Docs/Haircare/Voluminous Waves Beauty Portrait.png",
    "subcategories": [
      "Bond Repair & Masks",
      "Shampoos & Conditioners",
      "Hair Oils & Serums",
      "Scalp Care & Scrubs",
      "Styling & Heat Protect"
    ],
    "popularBrands": [
      "Kronzam",
      "L'Oréal Paris",
      "Maheorthe",
      "Olaplex",
      "TRESemmé"
    ]
  },
  {
    "id": "bath-body",
    "name": "Bath & Body",
    "tagline": "Body Butters, Scrubs & Shower Gels",
    "itemCount": "95+ Products",
    "image": "Docs/Bath & Body/Lavender Body & Earth Gift Set.png",
    "subcategories": [
      "Body Butters & Lotions",
      "Shower Gels & Washes",
      "Body Scrubs & Exfoliators",
      "Hand & Foot Care",
      "Bath Salts & Soaks"
    ],
    "popularBrands": [
      "Bath & Body Works",
      "Body & Earth",
      "American Girl",
      "Bloom Beauty"
    ]
  },
  {
    "id": "fragrance",
    "name": "Fragrance",
    "tagline": "Eau de Parfum, Mists & Travel Sets",
    "itemCount": "80+ Products",
    "image": "Docs/Fragance/Chanel Coco Mademoiselle on Pink Satin.png",
    "subcategories": [
      "Eau de Parfum",
      "Eau de Toilette",
      "Body Mists & Sprays",
      "Perfume Oils",
      "Discovery Sets"
    ],
    "popularBrands": [
      "Chanel Paris",
      "Lunair",
      "SKINN by Titan",
      "Arabian Aroma",
      "Bloom Beauty"
    ]
  },
  {
    "id": "nail-care",
    "name": "Nail Care",
    "tagline": "Gel Polish, Cuticle Oils & Sets",
    "itemCount": "65+ Products",
    "image": "Docs/Nail Care/MII Fashion Metallic Pink Nail Polish.png",
    "subcategories": [
      "Gel Finish Polish",
      "Nail Treatments",
      "Cuticle Oils & Creams",
      "Base & Top Coats",
      "Nail Tools"
    ],
    "popularBrands": [
      "Rose & Lily",
      "MI Fashion",
      "Nail Republic",
      "Miss Nails",
      "Bloom Beauty Nails"
    ]
  },
  {
    "id": "beauty-tools",
    "name": "Beauty Tools",
    "tagline": "Rollers, Gua Sha & Brushes",
    "itemCount": "75+ Products",
    "image": "Docs/Nail Care/Professional Nail Care Tools Flat Lay.png",
    "subcategories": [
      "Facial Rollers & Gua Sha",
      "Makeup Brushes & Sponges",
      "Eyelash Curlers",
      "Cleansing Brushes",
      "Vanity Organizers"
    ],
    "popularBrands": [
      "Bloom Beauty Studio",
      "Swiss Beauty",
      "Kay Beauty"
    ]
  }
];

export const SITE_NAVIGATION = undefined;
