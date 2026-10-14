// Base client store data and language properties configuration.
// Modifying this config changes UI & Catalog items without touch routing logic.

const LIVE_API_URL = ""; 

const STORE_DATA = {
  brand: "ORG 25 PRO",
  tagline: {
    en: "Ethiopia's #1 Keyboard Style & Rhythm Store",
    am: "የኢትዮጵያ ቁጥር 1 የኪቦርድ ስታይል እና ሪትም መደብር"
  },
  about: {
    en: "ORG 25 sells Ethiopian keyboard styles, Yamaha styles, sound packs, voices and multipads for the ORG 25 phone app. The app can also look like the Yamaha PSR-SX900.",
    am: "ORG 25 ለስልክ መተግበሪያ የሚሆኑ የኢትዮጵያ ኪቦርድ ስታይሎችን፣ የያማሃ ስታይሎችን፣ የድምፅ ፓኮችን፣ ቮይሶችን እና መልቲፓዶችን ያቀርባል። መተግበሪያው ልክ እንደ Yamaha PSR-SX900 ሆኖ ሊሰራ ይችላል።"
  },
  notice: {
    en: "⚡ New Ethiopian styles updated for 2026. Get your packs directly via our Telegram Bot!",
    am: "⚡ አዳዲስ የ2026 የኢትዮጵያ ስታይሎች ተዘጋጅተዋል። በቴሌግራም ቦቷችን አማካኝነት በቀጥታ ያግኙ!"
  },
  links: {
    bot: "https://t.me/org25_et_bot",
    support: "https://t.me/CHAREORG25styles",
    channel: "https://t.me/org25_ethiopian_styles",
    group: "https://t.me/ORG2025iikeyamaha",
    phone: "0981764920",
    phoneInt: "+251981764920",
    whatsapp: "https://wa.me/251981764920",
    email: "charechanako6@gmail.com"
  },
  paymentAccounts: [
    { provider: "Commercial Bank of Ethiopia (CBE)", account: "1000718384552", holder: "Chare" },
    { provider: "Telebirr", account: "0981764920", holder: "Chare" },
    { provider: "M-Pesa", account: "0716690573", holder: "Chare" }
  ],
  paymentWarning: {
    en: "Pay only to the accounts listed here. Receipts sent to any other account are rejected.",
    am: "ክፍያዎችን እዚህ በተዘረዘሩት አካውንቶች ብቻ ይፈጽሙ። ወደ ሌላ አካውንት የተላከ ደረሰኝ ተቀባይነት የለውም።"
  },
  delivery: {
    en: "Your file is sent in the bot about 5 minutes after your receipt is verified.",
    am: "ደረሰኝዎ ከተረጋገጠ በ5 ደቂቃ ውስጥ ፋይልዎ በቦቱ በኩል ይላክልዎታል።"
  },
  howToBuySteps: {
    en: [
      "Open the bot and choose a product.",
      "Tap Buy and pay the exact amount to one of the accounts.",
      "Send the receipt screenshot or the transaction ID in the bot.",
      "Get your file in the bot."
    ],
    am: [
      "ቦቱን ከፍተው የሚፈልጉትን ምርት ይምረጡ።",
      "ግዛ የሚለውን ተጭነው ትክክለኛውን ክፍያ ከተዘረዘሩት አካውንቶች ወደ አንዱ ይክፈሉ።",
      "የከፈሉበትን የደረሰኝ ስክሪንሾት ወይም የሂሳብ ቁጥር (Transaction ID) በቦቱ ይላኩ።",
      "ፋይልዎን በቦቱ ውስጥ በቀጥታ ይቀበሉ።"
    ]
  },
  howToUseSteps: {
    en: [
      "Tap the file in the bot chat and download it.",
      "Save it to your phone storage.",
      "Open it in the ORG 25 app."
    ],
    am: [
      "በቦቱ ውስጥ የተላከውን ፋይል ተጭነው ያውርዱት።",
      "በስልክዎ ማከማቻ (Storage) ውስጥ ያስቀምጡት።",
      "በ ORG 25 መተግበሪያ ውስጥ ይክፈቱት።"
    ]
  },
  referralText: {
    en: "Invite friends with your referral link in the bot. You earn 10% when a friend makes their first purchase. Minimum withdrawal: 100 ETB.",
    am: "በቦቱ ውስጥ ያለዎትን የመጋበዣ ሊንክ (Referral) በመጠቀም ጓደኞችዎን ይጋብዙ። አንድ ሰው የመጀመሪያውን ግዢ ሲፈጽም የ 10% ኮሚሽን ያገኛሉ። ዝቅተኛው ወጪ የሚደረገው ገንዘብ፡ 100 የኢትዮጵያ ብር (ETB) ነው።"
  },
  founder: {
    name: "Chare Chanako",
    location: {
      en: "Konso, South Ethiopia",
      am: "ኮንሶ፣ ደቡብ ኢትዮጵያ"
    },
    bio: {
      en: "Aspiring software developer, AI and Telegram bot developer, and digital marketplace creator. Builds secure, modern, user-friendly digital products for students, creators, and entrepreneurs.",
      am: "የሶፍትዌር እና የ AI እንዲሁም የቴሌግራም ቦት አልሚ እና የዲጂታል ገበያ ፈጣሪ። ለተማሪዎች፣ ለፈጣሪዎች እና ለንግድ ድርጅቶች ደህንነታቸው የተጠበቁ እና ዘመናዊ መተግበሪያዎችን ይገነባል።"
    }
  },
  products: [
    {
      id: "charsha-2026",
      botId: "1",
      name: "Charsha 2026",
      featured: true,
      price: null, 
      size: "624.04 MB",
      desc: {
        en: "124 styles, 263 voices and all multipads, arranged, adjusted and balanced.",
        am: "124 ስታይሎች፣ 263 ቮይሶች እና ሁሉም መልቲፓዶች፣ በሚገባ ተስተካክለውና ሚዛናዊ ሆነው የቀረቡ።"
      },
      whatIsInside: {
        en: "Includes Waltz, Disco, Chik-chika, Rock, Ballad, Tayo, Wollo, Gurage, Tigrigna, Oromo, Shewa, Reggae and more coming soon.",
        am: "ዋልትዝ፣ ዲስኮ፣ ቺክ-ቺካ፣ ሮክ፣ ባላድ፣ ታዮ፣ ወሎ፣ ጉራጌ፣ ትግርኛ፣ ኦሮሞ፣ ሸዋ፣ ሬጌ እና ሌሎችም በቅርቡ የሚጨመሩ።"
      },
      testedOn: "ORG 2025 / ORG 2026",
      rating: 5.0,
      reviewsCount: 42
    }
  ],
  tutorials: [
    {
      id: "tut-1",
      category: "How to buy",
      categoryAm: "እንዴት መግዛት ይቻላል",
      title: {
        en: "How to order styles & send receipts in the bot",
        am: "በቦቱ ውስጥ ስታይሎችን እንዴት መርጠው ደረሰኝ እንደሚልኩ"
      },
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    },
    {
      id: "tut-2",
      category: "How to save and use",
      categoryAm: "ፋይሎችን አጠቃቀም",
      title: {
        en: "Importing SET and styles into ORG 25 app",
        am: "የወረደውን SET ፋይል ወደ ORG 25 ማስገባት"
      },
      url: "https://t.me/org25_ethiopian_styles"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      q: {
        en: "What is the delivery time?",
        am: "ፋይሉ ለመድረስ ምን ያህል ጊዜ ይወስዳል?"
      },
      a: {
        en: "Your file is sent directly in the bot about 5 minutes after your receipt verification.",
        am: "ደረሰኝዎ በተረጋገጠ በ5 ደቂቃ ውስጥ ፋይሉ በቀጥታ በቦቱ ይላክልዎታል።"
      }
    },
    {
      id: "faq-2",
      q: {
        en: "How do I make a payment?",
        am: "ክፍያ እንዴት መፈጸም እችላለሁ?"
      },
      a: {
        en: "You can pay using Telebirr, CBE (Commercial Bank of Ethiopia), or M-Pesa to the exact accounts registered under Chare.",
        am: "በቴሌብር፣ በኢትዮጵያ ንግድ ባንክ (CBE) ወይም በኤም-ፔሳ በቻሬ (Chare) ስም የተመዘገቡት ሂሳቦች ላይ መክፈል ይችላሉ።"
      }
    },
    {
      id: "faq-3",
      q: {
        en: "What if my payment is not verified automatically?",
        am: "ክፍያዬ በፍጥነት ባይረጋገጥ ምን ማድረግ አለብኝ?"
      },
      a: {
        en: "Send your receipt screenshot directly to our Telegram admin support (@CHAREORG25styles) with your Telegram ID.",
        am: "የከፈሉበትን ደረሰኝ ከቴሌግራም መታወቂያዎ ጋር በቀጥታ ለድጋፍ ሰጪያችን (@CHAREORG25styles) ይላኩ።"
      }
    },
    {
      id: "faq-4",
      q: {
        en: "How do I use the files after downloading?",
        am: "ፋይሎቹን ካወረድኩ በኋላ እንዴት እጠቀማለሁ?"
      },
      a: {
        en: "Download the file from the bot chat, locate it in your files app, and open or import it through the SET/Style menu in ORG 25.",
        am: "ፋይሉን ከቦቱ ያውርዱ፣ ከዚያም በስልክዎ ማከማቻ ፈልገው በ ORG 25 መተግበሪያ ውስጥ በ SET / Style ምርጫ በኩል ይክፈቱት።"
      }
    },
    {
      id: "faq-5",
      q: {
        en: "How does the referral system work?",
        am: "የመጋበዣ (ሪፈራል) ስርዓቱ እንዴት ይሰራል?"
      },
      a: {
        en: "Share your referral link from the bot with friends. You earn 10% on their first purchase, withdrawable starting at 100 ETB.",
        am: "የራስዎን ሊንክ ከቦቱ ወስደው ለጓደኞች ያጋሩ። የመጀመሪያ ግዢ ሲፈጽሙ 10% ያገኛሉ። 100 ብር ሲሞላ ማውጣት ይችላሉ።"
      }
    }
  ],
  freeSamples: [
    {
      id: "sample-1",
      name: "Chik-chika Demo Style",
      size: "4.5 MB",
      url: "https://t.me/org25_et_bot"
    }
  ],
  freeApps: [
    {
      id: "app-1",
      name: "ORG 25 Sound Engine Helper",
      desc: "Free companion utility for skinning and sound mapping.",
      url: "https://t.me/org25_et_bot"
    }
  ]
};
