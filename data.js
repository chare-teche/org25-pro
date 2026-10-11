// Set to a JSON endpoint if desired, or leave empty to use this local file
const LIVE_API_URL = "";

const APP_DATA = {
  brand: "ORG 25 PRO",
  tagline: {
    en: "Ethiopia's #1 Keyboard Style & Rhythm Store",
    am: "የኢትዮጵያ ቁጥር 1 የኪቦርድ ስታይል እና ሪትም መደብር"
  },
  announcement: {
    en: "🔥 New Ethiopian 2026 rhythms updated! Fast delivery via Telegram bot.",
    am: "🔥 አዳዲስ የ2018/2026 የኢትዮጵያ ስታይሎች ተለቀቁ! በቴሌግራም ቦት በፍጥነት ይድረስዎ።"
  },
  about: {
    en: "ORG 25 sells Ethiopian keyboard styles, Yamaha styles, sound packs, voices and multipads for the ORG 25 phone app. The app can also look like the Yamaha PSR-SX900.",
    am: "ORG 25 ለስልክ ORG 25 መተግበሪያ የኢትዮጵያ ኪቦርድ ስታይሎችን፣ የያማሃ ስታይሎችን፣ የድምፅ ፓኮችን፣ ድምጾችን እና መልቲፓዶችን ያቀርባል። መተግበሪያው እንደ Yamaha PSR-SX900 ሆኖ ሊሰራ ይችላል።"
  },
  links: {
    bot: "https://t.me/org25_et_bot",
    support: "https://t.me/CHAREORG25styles",
    channel: "https://t.me/org25_ethiopian_styles",
    group: "https://t.me/ORG2025iikeyamaha",
    phone: "0981764920",
    phoneInt: "+251981764920",
    whatsapp: "251981764920",
    email: "charechanako6@gmail.com"
  },
  paymentAccounts: [
    { bank: "CBE (Commercial Bank of Ethiopia)", account: "1000718384552", holder: "Chare" },
    { bank: "Telebirr", account: "0981764920", holder: "Chare" },
    { bank: "M-Pesa", account: "0716690573", holder: "Chare" }
  ],
  paymentWarning: {
    en: "Pay only to the accounts listed here. Receipts sent to any other account are rejected.",
    am: "ክፍያዎችን እዚህ በተዘረዘሩት ሂሳቦች ላይ ብቻ ይፈጽሙ። ወደ ሌላ ሂሳብ የተላከ ደረሰኝ ተቀባይነት የለውም።"
  },
  delivery: {
    en: "Your file is sent in the bot about 5 minutes after your receipt is verified.",
    am: "ደረሰኝዎ በተረጋገጠ በ5 ደቂቃ ውስጥ ፋይልዎ በቦቱ ይላክልዎታል።"
  },
  howToBuySteps: [
    {
      step: 1,
      en: "Open the bot and choose a product.",
      am: "ቦቱን ይክፈቱ እና የሚፈልጉትን ምርት ይምረጡ።"
    },
    {
      step: 2,
      en: "Tap Buy and pay the exact amount to one of the accounts.",
      am: "ግዛ (Buy) የሚለውን ተጭነው ትክክለኛውን ገንዘብ ከተዘረዘሩት ሂሳቦች ወደ አንዱ ይክፈሉ።"
    },
    {
      step: 3,
      en: "Send the receipt screenshot or the transaction ID in the bot.",
      am: "የከፈሉበትን ደረሰኝ ፎቶ (screenshot) ወይም የትራንዛክሽን ቁጥር በቦቱ ይላኩ።"
    },
    {
      step: 4,
      en: "Get your file in the bot.",
      am: "ፋይልዎን በቀጥታ በቦቱ ውስጥ ይቀበሉ።"
    }
  ],
  howToUseSteps: [
    {
      step: 1,
      en: "Tap the file in the bot chat and download it.",
      am: "በቦቱ ቻት ውስጥ ፋይሉን ነክተው ያውርዱት።"
    },
    {
      step: 2,
      en: "Save it to your phone storage.",
      am: "ወደ ስልክዎ ማከማቻ (storage) ያስቀምጡት።"
    },
    {
      step: 3,
      en: "Open it in the ORG 25 app.",
      am: "በ ORG 25 መተግበሪያ ውስጥ ከፍተው ይጠቀሙበት።"
    }
  ],
  referral: {
    en: "Invite friends with your referral link in the bot. You earn 10% when a friend makes their first purchase. Minimum withdrawal: 100 ETB.",
    am: "በቦቱ ውስጥ የእርስዎን መጋበዣ ሊንክ ለጓደኞች ያጋሩ። ጓደኛዎ የመጀመሪያውን ግዢ ሲፈጽም 10% ያገኛሉ። ዝቅተኛው ወጪ ማድረጊያ፡ 100 ብር።"
  },
  founder: {
    name: "Chare Chanako",
    location: {
      en: "Konso, South Ethiopia",
      am: "ኮንሶ፣ ደቡብ ኢትዮጵያ"
    },
    bio: {
      en: "Aspiring software developer, AI and Telegram bot developer and digital marketplace creator. Builds secure, modern, user-friendly digital products for students, creators and entrepreneurs.",
      am: "ተስፋ ሰጪ የሶፍትዌር፣ የ AI እና የቴሌግራም ቦት ገንቢ እንዲሁም የዲጂታል ገበያ ፈጣሪ። ለተማሪዎች፣ ለፈጣሪዎች እና ለስራ ፈጣሪዎች ደህንነታቸው የተጠበቁ እና ዘመናዊ መተግበሪያዎችን ይገነባል።"
    }
  },
  products: [
    {
      id: "charsha-2026",
      botId: "1",
      name: "Charsha 2026",
      featured: true,
      price: null, // Displays "Ask in the bot" / "ዋጋውን በቦቱ ጠይቁ"
      size: "624.04 MB",
      shortDesc: {
        en: "124 styles, 263 voices and all multipads, arranged, adjusted and balanced.",
        am: "124 ስታይሎች፣ 263 ድምጾች እና ሁሉም መልቲፓዶች፣ በከፍተኛ ጥራት ተዘጋጅተው የተስተካከሉ።"
      },
      fullDesc: {
        en: "Includes Waltz, Disco, Chik-chika, Rock, Ballad, Tayo, Wollo, Gurage, Tigrigna, Oromo, Shewa, Reggae and more coming soon.",
        am: "ዋልትዝ፣ ዲዝኮ፣ ችክችካ፣ ሮክ፣ ባላድ፣ ታዮ፣ ወሎ፣ ጉራጌ፣ ትግርኛ፣ ኦሮሞ፣ ሸዋ፣ ሬጌ እና ሌሎችም በቅርቡ የሚካተቱበት ሙሉ ስብስብ።"
      },
      testedOn: "ORG 2025 / ORG 25",
      rating: 5.0,
      reviewsCount: 48
    }
  ],
  freeItems: {
    note: {
      en: "Free items are sent inside the bot.",
      am: "ነፃ እቃዎች የሚላኩት በቀጥታ በቦቱ ውስጥ ነው።"
    },
    samples: [
      {
        id: "free-chikchika",
        name: "Chik-chika Demo Style",
        desc: { en: "Sample Ethiopian rhythm style.", am: "የሙከራ የችክችካ ስታይል ሪትም።" },
        botUrl: "https://t.me/org25_et_bot?start=free_chikchika"
      },
      {
        id: "free-voices",
        name: "Yamaha Voice Soundfont Pack",
        desc: { en: "Selected Ethiopian lead instruments.", am: "የተመረጡ የባህል መሣሪያዎች ድምጾች።" },
        botUrl: "https://t.me/org25_et_bot?start=free_voices"
      }
    ],
    apps: [
      {
        id: "app-org25",
        name: "ORG 25 Latest Skin & APK",
        desc: { en: "Pre-configured Yamaha PSR-SX900 look.", am: "እንደ Yamaha PSR-SX900 የተዘጋጀ ስኪን።" },
        botUrl: "https://t.me/org25_et_bot?start=app_org"
      }
    ]
  },
  tutorials: [
    {
      id: "tut-1",
      category: "how_to_buy",
      title: {
        en: "How to purchase styles via Telegram Bot",
        am: "በቴሌግራም ቦት እንዴት ስታይሎችን መግዛት ይቻላል"
      },
      url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "tut-2",
      category: "save_and_use",
      title: {
        en: "How to save and use style files in ORG 25",
        am: "የስታይል ፋይሎችን በስልክ አስቀምጦ በ ORG 25 እንዴት መጠቀም ይቻላል"
      },
      url: "https://t.me/org25_ethiopian_styles"
    }
  ],
  faqs: [
    {
      id: "faq-delivery",
      q: {
        en: "How long does delivery take?",
        am: "ፋይሉ ለመድረስ ምን ያህል ጊዜ ይወስዳል?"
      },
      a: {
        en: "Your file is sent in the bot about 5 minutes after your receipt is verified.",
        am: "ደረሰኝዎ በተረጋገጠ በ5 ደቂቃ አካባቢ ፋይልዎ በቦቱ ይላክልዎታል።"
      }
    },
    {
      id: "faq-payment",
      q: {
        en: "How do I pay?",
        am: "እንዴት መክፈል እችላለሁ?"
      },
      a: {
        en: "Pay the exact amount to Chare on Commercial Bank of Ethiopia (CBE), Telebirr, or M-Pesa.",
        am: "ትክክለኛውን ገንዘብ ለ Chare በንግድ ባንክ (CBE)፣ በቴሌብር (Telebirr) ወይም በኤም-ፔሳ (M-Pesa) ይክፈሉ።"
      }
    },
    {
      id: "faq-missing-payment",
      q: {
        en: "What if my payment is not found?",
        am: "ክፍያዬ ካልተገኘ ምን ማድረግ አለብኝ?"
      },
      a: {
        en: "Message our Telegram support (@CHAREORG25styles) with your receipt screenshot and transaction ID.",
        am: "የከፈሉበትን ደረሰኝ ፎቶ እና የትራንዛክሽን ቁጥር ይዘው የቴሌግራም ድጋፋችንን (@CHAREORG25styles) ያነጋግሩ።"
      }
    },
    {
      id: "faq-usage",
      q: {
        en: "How do I use the files?",
        am: "ፋይሎቹን እንዴት መጠቀም እችላለሁ?"
      },
      a: {
        en: "Download the file from the bot chat, save it to your phone storage, and open it inside the ORG 25 app.",
        am: "ፋይሉን ከቦቱ ያውርዱ፣ ወደ ስልክዎ ማከማቻ ያስቀምጡት እና በ ORG 25 መተግበሪያ ውስጥ ከፍተው ይጠቀሙበት።"
      }
    },
    {
      id: "faq-referral",
      q: {
        en: "How does the referral work?",
        am: "የሪፈራል ፕሮግራሙ እንዴት ይሰራል?"
      },
      a: {
        en: "Invite friends with your referral link in the bot. You earn 10% when a friend makes their first purchase. Minimum withdrawal: 100 ETB.",
        am: "በቦቱ ውስጥ የእርስዎን መጋበዣ ሊንክ ለጓደኞች ያጋሩ። ጓደኛዎ የመጀመሪያውን ግዢ ሲፈጽም 10% ያገኛሉ። ዝቅተኛው ወጪ ማድረጊያ፡ 100 ብር።"
      }
    }
  ]
};
