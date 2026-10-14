// Progressive SPA & Real-time State Controller
class AppEngine {
  constructor() {
    this.currentLang = localStorage.getItem("org25_lang") || "en";
    this.currentTheme = localStorage.getItem("org25_theme") || "dark";
    this.state = STORE_DATA;
    this.installPrompt = null;
    
    this.i18n = {
      en: {
        brand: "ORG 25 PRO",
        tagline_sub: "Ethiopian Sound Hub",
        tagline: "Ethiopia's #1 Keyboard Style & Rhythm Store",
        about: "Ethiopian keyboard styles, sound packs, and rhythms for ORG 25. High-quality samples optimized for live performance.",
        openBot: "Open the Bot",
        featured: "FEATURED PACK",
        featured_title: "Featured Pack",
        quick_access: "Quick Access",
        community: "Join the Official Community",
        joinChannel: "Join Channel",
        joinGroup: "Join Group",
        tutorials: "Tutorials",
        faq: "FAQ",
        guide: "Guide",
        howToBuyTitle: "How to Buy",
        howToUseTitle: "How to Use Files",
        paymentAccounts: "Payment Accounts (Chare)",
        free_hub: "Free Styles & Tools",
        freeBotNote: "Free items are sent inside the bot.",
        freeSamples: "Free Sample Styles",
        freeApps: "Free Apps & Utilities",
        contactSupport: "Direct Support",
        telegramSupport: "Telegram Support",
        phoneCall: "Phone Support",
        referralTitle: "Referral Program (10% Bonus)",
        shareApp: "Share App",
        installApp: "Install App",
        iosInstall: "To install on iOS: tap share icon and select 'Add to Home Screen'",
        copy: "Copy",
        copied: "Copied!",
        emptyList: "No matching items found.",
        banner_badge: "NOTICE",
        navHome: "Home",
        navStyles: "Styles",
        navLearn: "Learn",
        navFree: "Free",
        navContact: "Contact",
        buy_in_bot: "Buy in the Bot",
        ask_in_bot: "Ask in the Bot"
      },
      am: {
        brand: "ORG 25 PRO",
        tagline_sub: "የኢትዮጵያ ድምፅ ማዕከል",
        tagline: "የኢትዮጵያ ቁጥር #1 የኪቦርድ ስታይል እና ሪትም መደብር",
        about: "ለ ORG 25 ስልክ መተግበሪያ የሚሆኑ የኢትዮጵያ ኪቦርድ ስታይሎች፣ የያማሃ ስታይሎች፣ የድምፅ ፓኮች፣ ቮይሶች እና መልቲፓዶች።",
        openBot: "ቦቱን ክፈት",
        featured: "ተመራጭ ምርት",
        featured_title: "ተመራጭ ስታይል",
        quick_access: "አቋራጮች",
        community: "ይፋዊ ማህበረሰባችንን ይቀላቀሉ",
        joinChannel: "ቻናሉን ይቀላቀሉ",
        joinGroup: "ግሩፑን ይቀላቀሉ",
        tutorials: "ቪዲዮዎች",
        faq: "ጥያቄዎች",
        guide: "መመሪያ",
        howToBuyTitle: "እንዴት መግዛት ይቻላል",
        howToUseTitle: "ፋይሎችን አጠቃቀም",
        paymentAccounts: "የክፍያ አካውንቶች (Chare)",
        free_hub: "ነፃ ስታይሎች እና መተግበሪያዎች",
        freeBotNote: "ነፃ እቃዎች የሚላኩት በቴሌግራም ቦት ውስጥ ነው።",
        freeSamples: "ነፃ የናሙና ስታይሎች",
        freeApps: "ነፃ መተግበሪያዎች",
        contactSupport: "ቀጥታ ግንኙነት እና ድጋፍ",
        telegramSupport: "ቴሌግራም",
        phoneCall: "በስልክ ይደውሉ",
        referralTitle: "የሪፈራል ፕሮግራም (10% ጉርሻ)",
        shareApp: "አጋራ",
        installApp: "መተግበሪያውን ጫን",
        iosInstall: "በ iOS ላይ ለመጫን: የሼር ምልክቱን ተጭነው 'Add to Home Screen' ይምረጡ",
        copy: "ኮፒ",
        copied: "ተቀድቷል!",
        emptyList: "ምንም የተገኘ ነገር የለም።",
        banner_badge: "ማስታወቂያ",
        navHome: "መነሻ",
        navStyles: "ስታይሎች",
        navLearn: "ትምህርት",
        navFree: "ነፃ",
        navContact: "አግኙን",
        buy_in_bot: "በቦቱ ይግዙ",
        ask_in_bot: "በቦቱ ይጠይቁ"
      }
    };
  }

  async init() {
    this.applyTheme(this.currentTheme);
    await this.trySyncLive();
    this.router();
    this.bindEvents();
    this.render();
    this.registerPWA();
    this.playInteractionSound("sound-tap");
  }

  async trySyncLive() {
    if (typeof LIVE_API_URL === "string" && LIVE_API_URL.trim() !== "") {
      try {
        const check = await fetch(LIVE_API_URL, { signal: AbortSignal.timeout(4000) });
        if (check.ok) {
          const remote = await check.json();
          if (remote && typeof remote === "object") {
            this.state = { ...this.state, ...remote };
          }
        }
      } catch (err) {
        // Transparent fallback to static data.js configuration
      }
    }
  }

  router() {
    const processHash = () => {
      const hash = window.location.hash.toLowerCase() || "#home";
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      document.querySelectorAll(".nav-tab").forEach(tab => tab.classList.remove("active"));
      
      const route = hash.replace("#", "view-");
      const activeEl = document.getElementById(route);
      if (activeEl) {
        activeEl.classList.add("active");
        activeEl.classList.add("fade-in");
      } else {
        document.getElementById("view-home").classList.add("active");
      }

      const activeTab = document.querySelector(`.nav-tab[href="${hash}"]`);
      if (activeTab) activeTab.classList.add("active");
    };

    window.addEventListener("hashchange", () => {
      processHash();
      this.playInteractionSound("sound-nav");
    });
    processHash();
  }

  applyTheme(target) {
    document.documentElement.setAttribute("data-theme", target);
    document.getElementById("theme-toggle").textContent = target === "dark" ? "☀️" : "🌙";
    document.getElementById("theme-meta").setAttribute("content", target === "dark" ? "#0a1020" : "#f0f3f8");
    localStorage.setItem("org25_theme", target);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === "en" ? "am" : "en";
    localStorage.setItem("org25_lang", this.currentLang);
    this.render();
  }

  bindEvents() {
    document.getElementById("theme-toggle").addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
      this.applyTheme(this.currentTheme);
    });

    document.getElementById("lang-toggle").addEventListener("click", () => {
      this.toggleLanguage();
    });

    document.getElementById("style-search").addEventListener("input", (e) => {
      this.renderStyles(e.target.value);
    });

    document.querySelectorAll(".segment-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        
        document.querySelectorAll(".subview").forEach(sv => sv.classList.remove("active"));
        const selected = document.getElementById(`learn-${e.target.dataset.subview}`);
        if (selected) selected.classList.add("active");
      });
    });

    document.getElementById("btn-close-sheet").addEventListener("click", () => {
      document.getElementById("bottom-sheet").classList.add("hidden");
    });

    document.getElementById("btn-share").addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: this.state.brand,
            text: this.state.tagline[this.currentLang] || this.state.tagline,
            url: window.location.origin
          });
        } catch (_) {}
      } else {
        navigator.clipboard.writeText(window.location.origin);
        this.fireToast(this.i18n[this.currentLang].copied);
      }
    });

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.installPrompt = e;
      const installBtn = document.getElementById("btn-pwa-install");
      installBtn.classList.remove("hidden");
      installBtn.addEventListener("click", async () => {
        if (this.installPrompt) {
          this.installPrompt.prompt();
          const { outcome } = await this.installPrompt.userChoice;
          if (outcome === "accepted") {
            installBtn.classList.add("hidden");
          }
          this.installPrompt = null;
        }
      });
    });

    document.addEventListener("click", (e) => {
      const copyBtn = e.target.closest(".copy-target");
      if (copyBtn) {
        const val = copyBtn.getAttribute("data-copy");
        navigator.clipboard.writeText(val).then(() => {
          this.fireToast(this.i18n[this.currentLang].copied);
        });
      }
    });

    // Custom sound triggering UI bindings
    document.querySelectorAll("[data-sound]").forEach(el => {
      el.addEventListener("click", () => {
        this.playInteractionSound(`sound-${el.dataset.sound}`);
      });
    });

    this.bindAdmin();
  }

  playInteractionSound(id) {
    const s = document.getElementById(id);
    if (s) {
      s.currentTime = 0;
      s.play().catch(() => {});
    }
  }

  fireToast(msg) {
    const t = document.getElementById("toast-outlet");
    t.textContent = msg;
    t.classList.remove("hidden");
    setTimeout(() => t.classList.add("hidden"), 3000);
  }

  render() {
    const t = this.i18n[this.currentLang];
    
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
      const [attr, key] = el.getAttribute("data-i18n-attr").split(":");
      if (t[key]) el.setAttribute(attr, t[key]);
    });

    document.getElementById("lang-toggle").textContent = this.currentLang === "en" ? "አማ" : "EN";

    // Setup Notice Banner
    const noticeText = this.state.notice[this.currentLang] || this.state.notice.en || "";
    if (noticeText.trim() !== "") {
      document.getElementById("banner-text").textContent = noticeText;
      document.getElementById("announcement").classList.remove("hidden");
    } else {
      document.getElementById("announcement").classList.add("hidden");
    }

    // Direct configuration hooks
    document.getElementById("hero-cta").href = this.state.links.bot;
    document.getElementById("home-channel").href = this.state.links.channel;
    document.getElementById("home-group").href = this.state.links.group;
    document.getElementById("contact-tg").href = this.state.links.support;
    document.getElementById("contact-ph").href = `tel:${this.state.links.phoneInt}`;
    document.getElementById("contact-wa").href = this.state.links.whatsapp;
    document.getElementById("contact-em").href = `mailto:${this.state.links.email}`;

    // Render features
    this.renderFeatured();
    this.renderStyles();
    this.renderTutorials();
    this.renderFAQ();
    this.renderGuide();
    this.renderFree();
    this.renderOwnerAdmin();
  }

  renderFeatured() {
    const ft = this.state.products.find(p => p.featured) || this.state.products[0];
    const target = document.getElementById("featured-outlet");
    target.innerHTML = "";
    if (!ft) return;

    const card = document.createElement("div");
    card.className = "glass-card product-card";
    const desc = ft.desc[this.currentLang] || ft.desc.en || "";
    card.innerHTML = `
      <div class="p-header">
        <h4 class="p-title">${ft.name}</h4>
        <span class="badge-accent">${ft.price ? ft.price + " ETB" : this.i18n[this.currentLang].ask_in_bot}</span>
      </div>
      <p class="text-small text-mute mt-4">${desc}</p>
      <div class="p-footer">
        <span class="p-meta">📦 ${ft.size} • ${ft.testedOn}</span>
        <button class="btn btn-gold btn-sm">${this.i18n[this.currentLang].buy_in_bot}</button>
      </div>
    `;
    card.addEventListener("click", () => this.showDetailSheet(ft));
    target.appendChild(card);
  }

  renderStyles(filter = "") {
    const list = document.getElementById("styles-outlet");
    list.innerHTML = "";
    const fVal = filter.toLowerCase();

    const matches = this.state.products.filter(p => {
      const d = (p.desc[this.currentLang] || p.desc.en || "").toLowerCase();
      return p.name.toLowerCase().includes(fVal) || d.includes(fVal);
    });

    if (!matches.length) {
      list.innerHTML = `<div class="glass-card text-center">${this.i18n[this.currentLang].emptyList}</div>`;
      return;
    }

    matches.forEach(p => {
      const card = document.createElement("div");
      card.className = "glass-card product-card";
      card.innerHTML = `
        <div class="p-header">
          <h4 class="p-title">${p.name}</h4>
          <span class="badge-accent">${p.price ? p.price + " ETB" : this.i18n[this.currentLang].ask_in_bot}</span>
        </div>
        <p class="text-small text-mute mt-4">${p.desc[this.currentLang] || p.desc.en}</p>
        <div class="p-footer">
          <span class="p-meta">📦 ${p.size}</span>
          <button class="btn btn-gold btn-sm">${this.i18n[this.currentLang].buy_in_bot}</button>
        </div>
      `;
      card.addEventListener("click", () => this.showDetailSheet(p));
      list.appendChild(card);
    });
  }

  showDetailSheet(p) {
    const sheet = document.getElementById("bottom-sheet");
    document.getElementById("sheet-p-title").textContent = p.name;
    document.getElementById("sheet-p-price").textContent = p.price ? p.price + " ETB" : this.i18n[this.currentLang].ask_in_bot;
    document.getElementById("sheet-p-size").textContent = `Size: ${p.size}`;
    document.getElementById("sheet-p-compat").textContent = p.testedOn;
    document.getElementById("sheet-p-desc").textContent = p.desc[this.currentLang] || p.desc.en;
    document.getElementById("sheet-p-inside").textContent = p.whatIsInside[this.currentLang] || p.whatIsInside.en;

    const btn = document.getElementById("sheet-p-btn");
    btn.href = p.botId ? `${this.state.links.bot}?start=buy_${p.botId}` : this.state.links.bot;
    btn.textContent = this.i18n[this.currentLang].buy_in_bot;

    sheet.classList.remove("hidden");
  }

  renderTutorials() {
    const target = document.getElementById("tutorials-outlet");
    target.innerHTML = "";
    
    if (!this.state.tutorials.length) {
      target.innerHTML = `<div class="glass-card text-center">Videos coming soon.</div>`;
      return;
    }

    const categories = [...new Set(this.state.tutorials.map(t => this.currentLang === "am" ? t.categoryAm : t.category))];

    categories.forEach(cat => {
      const wrap = document.createElement("div");
      wrap.className = "glass-card";
      wrap.innerHTML = `<h4 class="gold-text mb-10">${cat}</h4>`;

      this.state.tutorials.filter(t => (this.currentLang === "am" ? t.categoryAm : t.category) === cat).forEach(item => {
        const title = item.title[this.currentLang] || item.title.en;
        const row = document.createElement("div");
        row.className = "tut-row mt-10";

        if (item.url.includes("youtube.com") || item.url.includes("youtu.be")) {
          const ytId = item.url.split("v=")[1]?.split("&")[0] || item.url.split("youtu.be/")[1]?.split("?")[0];
          row.innerHTML = `
            <p class="text-small text-bold mb-4">▶ ${title}</p>
            <div class="video-responsive">
              <iframe src="https://www.youtube-nocookie.com/embed/${ytId}" loading="lazy" allowfullscreen title="${title}"></iframe>
            </div>
          `;
        } else if (item.url.endsWith(".mp4")) {
          row.innerHTML = `
            <p class="text-small text-bold mb-4">📹 ${title}</p>
            <video controls preload="none" src="${item.url}" style="width:100%; border-radius: 12px; border:1px solid var(--border-muted);"></video>
          `;
        } else {
          row.innerHTML = `
            <a href="${item.url}" target="_blank" rel="noopener" class="btn btn-outline full-width flex-row flex-between">
              <span>📹 ${title}</span> <span>🔗</span>
            </a>
          `;
        }
        wrap.appendChild(row);
      });
      target.appendChild(wrap);
    });
  }

  renderFAQ() {
    const target = document.getElementById("faqs-outlet");
    target.innerHTML = "";
    this.state.faqs.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "glass-card accordion-item";
      card.innerHTML = `
        <button class="accordion-trigger" aria-expanded="false" data-idx="${index}">
          <span>${item.q[this.currentLang] || item.q.en}</span>
          <span class="chevron">▼</span>
        </button>
        <div id="faq-ans-${index}" class="accordion-panel">${item.a[this.currentLang] || item.a.en}</div>
      `;
      card.querySelector(".accordion-trigger").addEventListener("click", (e) => {
        const tBtn = e.currentTarget;
        const panel = document.getElementById(`faq-ans-${tBtn.dataset.idx}`);
        const closed = panel.classList.contains("active");
        
        document.querySelectorAll(".accordion-panel").forEach(p => p.classList.remove("active"));
        document.querySelectorAll(".accordion-trigger").forEach(b => b.setAttribute("aria-expanded", "false"));
        document.querySelectorAll(".chevron").forEach(c => c.textContent = "▼");

        if (!closed) {
          panel.classList.add("active");
          tBtn.setAttribute("aria-expanded", "true");
          tBtn.querySelector(".chevron").textContent = "▲";
        }
      });
      target.appendChild(card);
    });
  }

  renderGuide() {
    const buyList = document.getElementById("guide-buy-steps");
    buyList.innerHTML = "";
    const bSteps = this.state.howToBuySteps[this.currentLang] || this.state.howToBuySteps.en;
    bSteps.forEach(st => { buyList.innerHTML += `<li>${st}</li>`; });

    const useList = document.getElementById("guide-use-steps");
    useList.innerHTML = "";
    const uSteps = this.state.howToUseSteps[this.currentLang] || this.state.howToUseSteps.en;
    uSteps.forEach(st => { useList.innerHTML += `<li>${st}</li>`; });

    document.getElementById("payment-warning").textContent = this.state.paymentWarning[this.currentLang] || this.state.paymentWarning.en;

    const accList = document.getElementById("accounts-outlet");
    accList.innerHTML = "";
    this.state.paymentAccounts.forEach(acc => {
      const c = document.createElement("div");
      c.className = "glass-card flex-row flex-between";
      c.innerHTML = `
        <div>
          <h5 class="gold-text">${acc.provider}</h5>
          <span class="text-mono" style="font-size:1.1rem;font-weight:800">${acc.account}</span>
          <p class="text-mute text-small">Name: ${acc.holder}</p>
        </div>
        <button class="btn btn-outline btn-sm copy-target" data-copy="${acc.account}">${this.i18n[this.currentLang].copy}</button>
      `;
      accList.appendChild(c);
    });
  }

  renderFree() {
    const sOutlet = document.getElementById("samples-outlet");
    sOutlet.innerHTML = "";
    this.state.freeSamples.forEach(sample => {
      sOutlet.innerHTML += `
        <div class="glass-card flex-row flex-between">
          <div>
            <h5>${sample.name}</h5>
            <span class="text-mute text-small">Size: ${sample.size}</span>
          </div>
          <a href="${sample.url}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">Get Pack</a>
        </div>
      `;
    });

    const tOutlet = document.getElementById("tools-outlet");
    tOutlet.innerHTML = "";
    this.state.freeApps.forEach(tool => {
      tOutlet.innerHTML += `
        <div class="glass-card flex-row flex-between">
          <div>
            <h5>${tool.name}</h5>
            <span class="text-mute text-small">${tool.desc}</span>
          </div>
          <a href="${tool.url}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Download</a>
        </div>
      `;
    });

    // Contact setup
    document.getElementById("referral-desc").textContent = this.state.referralText[this.currentLang] || this.state.referralText.en;
    document.getElementById("founder-name").textContent = this.state.founder.name;
    document.getElementById("founder-loc").textContent = this.state.founder.location[this.currentLang] || this.state.founder.location.en;
    document.getElementById("founder-bio").textContent = this.state.founder.bio[this.currentLang] || this.state.founder.bio.en;
  }

  registerPWA() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
      });
    }
  }

  // ================= ADMIN CONTROLLER (#editor) =================
  bindAdmin() {
    document.getElementById("btn-add-style").addEventListener("click", () => {
      this.state.products.push({
        id: "style_" + Date.now(),
        botId: "",
        name: "New Custom Pack",
        featured: false,
        price: null,
        size: "0 MB",
        desc: { en: "Description EN", am: "መግለጫ አማርኛ" },
        whatIsInside: { en: "Pack specs", am: "ይዘቶች" },
        testedOn: "ORG 25"
      });
      this.renderOwnerAdmin();
    });

    document.getElementById("btn-add-tut").addEventListener("click", () => {
      this.state.tutorials.push({
        id: "tut_" + Date.now(),
        category: "Other",
        categoryAm: "ሌሎች",
        title: { en: "How-to tutorial title", am: "መመሪያ ቪዲዮ ርዕስ" },
        url: "https://www.youtube.com/watch?v=EXAMPLE"
      });
      this.renderOwnerAdmin();
    });

    document.getElementById("btn-add-faq").addEventListener("click", () => {
      this.state.faqs.push({
        id: "faq_" + Date.now(),
        q: { en: "The Question?", am: "ጥያቄ?" },
        a: { en: "The answer answer.", am: "የጥያቄው መልስ።" }
      });
      this.renderOwnerAdmin();
    });

    const exportDataJs = () => {
      return `// Updated Store Configuration\nconst LIVE_API_URL = "${LIVE_API_URL}";\n\nconst STORE_DATA = ${JSON.stringify(this.state, null, 2)};\n`;
    };

    document.getElementById("btn-copy-config").addEventListener("click", () => {
      navigator.clipboard.writeText(exportDataJs()).then(() => {
        this.fireToast("Configuration copied!");
      });
    });

    document.getElementById("btn-download-config").addEventListener("click", () => {
      const blob = new Blob([exportDataJs()], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const temp = document.createElement("a");
      temp.href = url;
      temp.download = "data.js";
      temp.click();
      URL.revokeObjectURL(url);
      this.fireToast("Configuration downloaded!");
    });
  }

  renderOwnerAdmin() {
    // Sync Announcements Input
    document.getElementById("ed-notice-en").value = this.state.notice.en || "";
    document.getElementById("ed-notice-am").value = this.state.notice.am || "";

    const nEn = document.getElementById("ed-notice-en");
    const nAm = document.getElementById("ed-notice-am");

    const updateNotice = () => {
      this.state.notice = { en: nEn.value, am: nAm.value };
    };
    nEn.oninput = updateNotice;
    nAm.oninput = updateNotice;

    // Direct binding for items delete and inline values
    const sTarget = document.getElementById("ed-styles-outlet");
    sTarget.innerHTML = "";
    this.state.products.forEach((p, index) => {
      const wrap = document.createElement("div");
      wrap.className = "edit-box mt-10";
      wrap.innerHTML = `
        <div class="flex-row flex-between">
          <input type="text" class="input-glow" style="width: 70%" value="${p.name}" placeholder="Title">
          <button class="btn btn-outline btn-sm">Delete</button>
        </div>
      `;
      wrap.querySelector("input").addEventListener("input", (e) => {
        this.state.products[index].name = e.target.value;
      });
      wrap.querySelector("button").addEventListener("click", () => {
        this.state.products.splice(index, 1);
        this.renderOwnerAdmin();
      });
      sTarget.appendChild(wrap);
    });

    // Tutorials Bind
    const tTarget = document.getElementById("ed-tutorials-outlet");
    tTarget.innerHTML = "";
    this.state.tutorials.forEach((tut, index) => {
      const wrap = document.createElement("div");
      wrap.className = "edit-box mt-10";
      wrap.innerHTML = `
        <div class="flex-row flex-between">
          <input type="text" class="input-glow" style="width: 70%" value="${tut.title.en}" placeholder="Video Title">
          <button class="btn btn-outline btn-sm">Delete</button>
        </div>
      `;
      wrap.querySelector("input").addEventListener("input", (e) => {
        this.state.tutorials[index].title.en = e.target.value;
      });
      wrap.querySelector("button").addEventListener("click", () => {
        this.state.tutorials.splice(index, 1);
        this.renderOwnerAdmin();
      });
      tTarget.appendChild(wrap);
    });

    // FAQs Bind
    const fTarget = document.getElementById("ed-faqs-outlet");
    fTarget.innerHTML = "";
    this.state.faqs.forEach((item, index) => {
      const wrap = document.createElement("div");
      wrap.className = "edit-box mt-10";
      wrap.innerHTML = `
        <div class="flex-row flex-between">
          <input type="text" class="input-glow" style="width: 70%" value="${item.q.en}" placeholder="Question">
          <button class="btn btn-outline btn-sm">Delete</button>
        </div>
      `;
      wrap.querySelector("input").addEventListener("input", (e) => {
        this.state.faqs[index].q.en = e.target.value;
      });
      wrap.querySelector("button").addEventListener("click", () => {
        this.state.faqs.splice(index, 1);
        this.renderOwnerAdmin();
      });
      fTarget.appendChild(wrap);
    });
  }
}

// Kickstart UI Platform
window.addEventListener("DOMContentLoaded", () => {
  const kernel = new AppEngine();
  kernel.init();
});
