// Global State
let currentLang = localStorage.getItem("org25_lang") || "en";
let currentTheme = localStorage.getItem("org25_theme") || "dark";
let deferredInstallPrompt = null;
let activeData = window.APP_DATA;

// UI Translations
const UI_I18N = {
  en: {
    nav_home: "Home",
    nav_styles: "Styles",
    nav_learn: "Learn",
    nav_free: "Free",
    nav_contact: "Contact",
    open_bot: "Open the Bot",
    buy_in_bot: "Buy in the bot",
    ask_in_bot: "Ask in the bot",
    featured_badge: "FEATURED PACK",
    size: "Size",
    tested_on: "Tested on",
    what_inside: "What's Included",
    description: "Description",
    search_placeholder: "Search styles, rhythms, instruments...",
    tut_empty: "Videos coming soon",
    faq_empty: "No FAQs available.",
    copy: "Copy",
    copied: "Copied!",
    share: "Share App",
    install: "Install App",
    ios_hint: "To install on iOS: Tap Share (⎋) then 'Add to Home Screen' (+).",
    warning_title: "Payment Warning",
    delivery_title: "Instant Delivery",
    support_btn: "Chat with Support",
    channel_btn: "Join Channel",
    group_btn: "Join Group",
    about_founder: "About the founder",
    referral_title: "Earn with Referral",
    editor_title: "Owner Data Editor",
    editor_note: "Notice: Changes made here only generate a new data.js file for your GitHub repository. It does not alter your live site directly."
  },
  am: {
    nav_home: "መነሻ",
    nav_styles: "ስታይሎች",
    nav_learn: "መመሪያ",
    nav_free: "ነፃ",
    nav_contact: "አግኙን",
    open_bot: "ቦቱን ክፈት",
    buy_in_bot: "በቦቱ ግዛ",
    ask_in_bot: "ዋጋውን በቦቱ ጠይቁ",
    featured_badge: "ተወዳጅ ስብስብ",
    size: "መጠን",
    tested_on: "የተሞከረበት",
    what_inside: "የተካተቱ ዝርዝሮች",
    description: "ዝርዝር መግለጫ",
    search_placeholder: "ስታይሎችን፣ ሪትሞችን ወይም ድምጾችን ፈልግ...",
    tut_empty: "ቪዲዮዎች በቅርቡ ይጫናሉ",
    faq_empty: "ምንም ተደጋጋሚ ጥያቄዎች አልተገኙም።",
    copy: "ቅዳ",
    copied: "ተቀድቷል!",
    share: "መተግበሪያውን አጋራ",
    install: "መተግበሪያውን ጫን",
    ios_hint: "በ iOS ለመጫን፡ የ Share ምልክትን ነክተው 'Add to Home Screen' የሚለውን ይምረጡ።",
    warning_title: "የክፍያ ማሳሰቢያ",
    delivery_title: "ፈጣን አቅርቦት",
    support_btn: "የደንበኞች ድጋፍ",
    channel_btn: "ቻናሉን ተቀላቀሉ",
    group_btn: "ግሩፑን ተቀላቀሉ",
    about_founder: "ስለ መስራቹ",
    referral_title: "በሪፈራል ገንዘብ ያግኙ",
    editor_title: "የዳታ ማስተካከያ እና ማውረጃ",
    editor_note: "ማሳሰቢያ፡ እዚህ የሚደረጉ ለውጦች አዲስ data.js ፋይል ያዘጋጃሉ። በቀጥታ በድህረ-ገጹ ላይ እንዲታዩ ፋይሉን አውርደው GitHub ላይ ይጫኑት።"
  }
};

// Lifecycle
document.addEventListener("DOMContentLoaded", async () => {
  applyTheme(currentTheme);
  updateLangButton();

  if (typeof LIVE_API_URL === "string" && LIVE_API_URL.trim() !== "") {
    try {
      const res = await fetch(LIVE_API_URL);
      if (res.ok) {
        const liveJson = await res.json();
        if (liveJson && typeof liveJson === "object") {
          activeData = Object.assign({}, activeData, liveJson);
        }
      }
    } catch (_) {
      // Fallback cleanly to local data
    }
  }

  setupEventListeners();
  renderAnnouncement();
  handleRouting();
});

function setupEventListeners() {
  window.addEventListener("hashchange", handleRouting);

  document.getElementById("theme-toggle-btn").addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("org25_theme", currentTheme);
    applyTheme(currentTheme);
  });

  document.getElementById("lang-toggle-btn").addEventListener("click", () => {
    currentLang = currentLang === "en" ? "am" : "en";
    localStorage.setItem("org25_lang", currentLang);
    updateLangButton();
    updateNavTranslations();
    renderAnnouncement();
    handleRouting();
  });

  const sheetBackdrop = document.getElementById("detail-sheet-backdrop");
  document.getElementById("sheet-close-btn").addEventListener("click", closeSheet);
  sheetBackdrop.addEventListener("click", (e) => {
    if (e.target === sheetBackdrop) closeSheet();
  });

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const btn = document.getElementById("pwa-install-btn");
    if (btn) btn.style.display = "inline-flex";
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = document.getElementById("theme-icon");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

function updateLangButton() {
  const lbl = document.getElementById("lang-label");
  if (lbl) lbl.textContent = currentLang === "en" ? "አማ" : "EN";
}

function updateNavTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (UI_I18N[currentLang][key]) {
      el.textContent = UI_I18N[currentLang][key];
    }
  });
}

function renderAnnouncement() {
  const banner = document.getElementById("announcement-banner");
  const textEl = document.getElementById("announcement-text");
  const txt = activeData.announcement?.[currentLang] || activeData.announcement?.en;
  if (txt && txt.trim() !== "") {
    textEl.textContent = txt;
    banner.style.display = "flex";
  } else {
    banner.style.display = "none";
  }
}

// Router
function handleRouting() {
  const hash = window.location.hash || "#home";
  const main = document.getElementById("app-content");

  document.querySelectorAll(".bottom-nav .nav-item").forEach((el) => {
    if (el.getAttribute("href") === hash) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });

  window.scrollTo(0, 0);

  if (hash === "#styles") renderStylesScreen(main);
  else if (hash === "#learn") renderLearnScreen(main);
  else if (hash === "#free") renderFreeScreen(main);
  else if (hash === "#contact") renderContactScreen(main);
  else if (hash === "#editor") renderEditorScreen(main);
  else renderHomeScreen(main);
}

// 1. HOME SCREEN
function renderHomeScreen(container) {
  const t = UI_I18N[currentLang];
  const feat = activeData.products.find(p => p.featured) || activeData.products[0];
  const tag = activeData.tagline?.[currentLang] || activeData.tagline?.en;

  let featHtml = "";
  if (feat) {
    const featPrice = feat.price ? `${feat.price} ETB` : t.ask_in_bot;
    const featBuyUrl = feat.botId ? `${activeData.links.bot}?start=buy_${feat.botId}` : activeData.links.bot;
    const featDesc = feat.shortDesc?.[currentLang] || feat.shortDesc?.en;
    featHtml = `
      <section class="glass-card product-card" onclick="openProductSheet('${feat.id}')">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="gold-badge">${t.featured_badge}</span>
          <span class="product-price">${featPrice}</span>
        </div>
        <h3 style="font-size:1.15rem; margin-top:4px;">${feat.name}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem;">${featDesc}</p>
        <div class="product-meta">
          <span class="product-size">${t.size}: ${feat.size}</span>
          <span style="font-size:0.8rem; color:var(--gold-primary);">★ ${feat.rating || "5.0"} (${feat.reviewsCount || 0})</span>
        </div>
        <a href="${featBuyUrl}" class="btn-gold" style="margin-top:6px;" onclick="event.stopPropagation();" target="_blank" rel="noopener">
          ${t.buy_in_bot}
        </a>
      </section>
    `;
  }

  container.innerHTML = `
    <section class="glass-card hero-card">
      <img src="assets/logo.png" alt="ORG 25 PRO Logo" class="hero-logo" onerror="this.style.display='none'">
      <h1 style="font-size: 1.4rem;">ORG 25 <span style="color:var(--gold-primary)">PRO</span></h1>
      <p class="hero-tagline">${tag}</p>
      <a href="${activeData.links.bot}" class="btn-gold" target="_blank" rel="noopener">
        ⚡ ${t.open_bot}
      </a>
      <div class="social-grid">
        <a href="${activeData.links.channel}" class="btn-outline" target="_blank" rel="noopener">📢 ${t.channel_btn}</a>
        <a href="${activeData.links.group}" class="btn-outline" target="_blank" rel="noopener">👥 ${t.group_btn}</a>
      </div>
    </section>

    <div class="quick-tiles">
      <a href="#styles" class="tile-btn"><span>🎹</span><span>${t.nav_styles}</span></a>
      <a href="#learn" class="tile-btn"><span>📖</span><span>${t.nav_learn}</span></a>
      <a href="#free" class="tile-btn"><span>🎁</span><span>${t.nav_free}</span></a>
      <a href="#contact" class="tile-btn"><span>💬</span><span>${t.nav_contact}</span></a>
    </div>

    ${featHtml}

    <section class="glass-card">
      <h3 style="font-size: 1rem; margin-bottom: 6px;">${currentLang === "en" ? "About ORG 25" : "ስለ ORG 25"}</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
        ${activeData.about?.[currentLang] || activeData.about?.en}
      </p>
    </section>
  `;
}

// 2. STYLES SCREEN
function renderStylesScreen(container) {
  const t = UI_I18N[currentLang];
  container.innerHTML = `
    <input type="text" id="style-search" class="search-bar" placeholder="${t.search_placeholder}">
    <div id="styles-container" class="product-list"></div>
  `;

  const searchInput = document.getElementById("style-search");
  const listContainer = document.getElementById("styles-container");

  const renderFiltered = (query = "") => {
    const q = query.toLowerCase().trim();
    const filtered = activeData.products.filter(p => {
      const name = p.name.toLowerCase();
      const desc = (p.shortDesc?.[currentLang] || p.shortDesc?.en || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:30px;">No styles found matching "${query}".</p>`;
      return;
    }

    listContainer.innerHTML = filtered.map(p => {
      const priceText = p.price ? `${p.price} ETB` : t.ask_in_bot;
      const buyUrl = p.botId ? `${activeData.links.bot}?start=buy_${p.botId}` : activeData.links.bot;
      const desc = p.shortDesc?.[currentLang] || p.shortDesc?.en;
      return `
        <div class="glass-card product-card" onclick="openProductSheet('${p.id}')">
          <div class="product-meta">
            <h3 style="font-size: 1.05rem;">${p.name}</h3>
            <span class="product-price">${priceText}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${desc}</p>
          <div class="product-meta">
            <span class="product-size">${t.size}: ${p.size}</span>
            <span style="font-size: 0.8rem; color: var(--gold-primary);">★ ${p.rating || "5.0"}</span>
          </div>
          <a href="${buyUrl}" class="btn-gold" style="margin-top:4px;" onclick="event.stopPropagation();" target="_blank" rel="noopener">
            ${t.buy_in_bot}
          </a>
        </div>
      `;
    }).join("");
  };

  searchInput.addEventListener("input", (e) => renderFiltered(e.target.value));
  renderFiltered();
}

// 3. LEARN SCREEN
let currentLearnSegment = "tutorials";
function renderLearnScreen(container) {
  container.innerHTML = `
    <div class="segment-bar">
      <button class="segment-btn ${currentLearnSegment === 'tutorials' ? 'active' : ''}" onclick="switchLearnTab('tutorials')">
        ${currentLang === "en" ? "Tutorials" : "ቪዲዮዎች"}
      </button>
      <button class="segment-btn ${currentLearnSegment === 'faq' ? 'active' : ''}" onclick="switchLearnTab('faq')">
        ${currentLang === "en" ? "FAQ" : "ጥያቄዎች"}
      </button>
      <button class="segment-btn ${currentLearnSegment === 'guide' ? 'active' : ''}" onclick="switchLearnTab('guide')">
        ${currentLang === "en" ? "Guide" : "መመሪያ"}
      </button>
    </div>
    <div id="learn-tab-content"></div>
  `;

  renderLearnTabContent();
}

window.switchLearnTab = function(segment) {
  currentLearnSegment = segment;
  document.querySelectorAll(".segment-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", (idx === 0 && segment === "tutorials") || (idx === 1 && segment === "faq") || (idx === 2 && segment === "guide"));
  });
  renderLearnTabContent();
};

function renderLearnTabContent() {
  const cont = document.getElementById("learn-tab-content");
  if (!cont) return;
  const t = UI_I18N[currentLang];

  if (currentLearnSegment === "tutorials") {
    if (!activeData.tutorials || activeData.tutorials.length === 0) {
      cont.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:30px;">${t.tut_empty}</p>`;
      return;
    }

    const categories = [
      { id: "how_to_buy", title: currentLang === "en" ? "How to buy" : "እንዴት እንደሚገዛ" },
      { id: "save_and_use", title: currentLang === "en" ? "How to save and use" : "አጠቃቀም እና አቀማመጥ" },
      { id: "other", title: currentLang === "en" ? "Other" : "ሌሎች" }
    ];

    let renderedAny = false;
    const catHtml = categories.map(cat => {
      const items = activeData.tutorials.filter(x => x.category === cat.id);
      if (items.length === 0) return "";
      renderedAny = true;

      const itemsHtml = items.map(item => {
        const title = item.title?.[currentLang] || item.title?.en;
        let mediaHtml = "";

        if (item.url.includes("youtube") || item.url.includes("youtu.be")) {
          mediaHtml = `
            <div class="video-wrapper">
              <iframe src="${item.url}" title="${title}" loading="lazy" allowfullscreen></iframe>
            </div>
          `;
        } else if (item.url.endsWith(".mp4")) {
          mediaHtml = `
            <div class="video-wrapper">
              <video src="${item.url}" controls preload="metadata"></video>
            </div>
          `;
        } else {
          mediaHtml = `
            <a href="${item.url}" class="btn-outline" style="margin-top:8px;" target="_blank" rel="noopener">
              🔗 Open Tutorial
            </a>
          `;
        }

        return `
          <div class="glass-card" style="margin-bottom:12px;">
            <h4 style="font-size:0.95rem;">${title}</h4>
            ${mediaHtml}
          </div>
        `;
      }).join("");

      return `
        <div style="margin-bottom:16px;">
          <h3 style="color:var(--gold-primary); font-size:0.95rem; margin-bottom:8px;">${cat.title}</h3>
          ${itemsHtml}
        </div>
      `;
    }).join("");

    cont.innerHTML = renderedAny ? catHtml : `<p style="text-align:center; color:var(--text-muted); padding:30px;">${t.tut_empty}</p>`;
  } else if (currentLearnSegment === "faq") {
    if (!activeData.faqs || activeData.faqs.length === 0) {
      cont.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:30px;">${t.faq_empty}</p>`;
      return;
    }

    cont.innerHTML = `
      <div class="glass-card">
        ${activeData.faqs.map(f => {
          const q = f.q?.[currentLang] || f.q?.en;
          const a = f.a?.[currentLang] || f.a?.en;
          return `
            <div class="faq-item" id="${f.id}">
              <button class="faq-question" onclick="toggleFaq('${f.id}')">
                <span>${q}</span>
                <span class="faq-arrow">▼</span>
              </button>
              <div class="faq-answer">
                <p>${a}</p>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  } else if (currentLearnSegment === "guide") {
    cont.innerHTML = `
      <div class="glass-card" style="margin-bottom:14px;">
        <h3 style="color:var(--gold-primary); font-size:1rem; margin-bottom:8px;">
          ${currentLang === "en" ? "How to buy (4 steps)" : "የአገዛዝ ቅደም ተከተል (4 ደረጃዎች)"}
        </h3>
        <div class="step-list">
          ${activeData.howToBuySteps.map(s => `
            <div class="step-row">
              <span class="step-num">${s.step}</span>
              <p style="font-size:0.85rem; color:var(--text-main);">${s[currentLang] || s.en}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="glass-card" style="margin-bottom:14px;">
        <h3 style="color:var(--gold-primary); font-size:1rem; margin-bottom:8px;">
          ${currentLang === "en" ? "How to use your files (3 steps)" : "ፋይሎችን አጠቃቀም (3 ደረጃዎች)"}
        </h3>
        <div class="step-list">
          ${activeData.howToUseSteps.map(s => `
            <div class="step-row">
              <span class="step-num">${s.step}</span>
              <p style="font-size:0.85rem; color:var(--text-main);">${s[currentLang] || s.en}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="glass-card">
        <h3 style="color:var(--gold-primary); font-size:1rem; margin-bottom:4px;">
          ${currentLang === "en" ? "Payment Accounts" : "የክፍያ አማራጮች"}
        </h3>
        <p style="font-size:0.8rem; color:var(--eth-yellow); margin-bottom:10px;">
          ⚠️ ${activeData.paymentWarning?.[currentLang] || activeData.paymentWarning?.en}
        </p>
        ${activeData.paymentAccounts.map(acc => `
          <div class="payment-card">
            <div>
              <div style="font-weight:700; font-size:0.85rem;">${acc.bank}</div>
              <div style="font-size:0.85rem; color:var(--text-muted); font-family:monospace;">${acc.account} (${acc.holder})</div>
            </div>
            <button class="copy-btn" onclick="copyText('${acc.account}')">${t.copy}</button>
          </div>
        `).join("")}
      </div>
    `;
  }
}

window.toggleFaq = function(id) {
  const item = document.getElementById(id);
  if (item) item.classList.toggle("open");
};

// 4. FREE SCREEN
function renderFreeScreen(container) {
  const t = UI_I18N[currentLang];
  const samples = activeData.freeItems?.samples || [];
  const apps = activeData.freeItems?.apps || [];
  const note = activeData.freeItems?.note?.[currentLang] || activeData.freeItems?.note?.en;

  container.innerHTML = `
    <div class="glass-card" style="text-align:center; padding:18px;">
      <span style="font-size:2rem;">🎁</span>
      <h2 style="font-size:1.15rem; margin-top:6px;">${currentLang === "en" ? "Free Samples & Apps" : "ነፃ ናሙናዎች እና መተግበሪያዎች"}</h2>
      <p style="font-size:0.85rem; color:var(--gold-primary); margin-top:4px;">${note}</p>
    </div>

    <div style="margin-top:10px;">
      <h3 style="color:var(--gold-primary); font-size:0.95rem; margin-bottom:10px;">
        ${currentLang === "en" ? "Free Samples" : "ነፃ ናሙና ስታይሎች"}
      </h3>
      ${samples.map(s => `
        <div class="glass-card" style="margin-bottom:10px;">
          <h4 style="font-size:0.95rem;">${s.name}</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin:4px 0 10px;">${s.desc?.[currentLang] || s.desc?.en}</p>
          <a href="${s.botUrl}" class="btn-outline" target="_blank" rel="noopener">${t.open_bot}</a>
        </div>
      `).join("")}
    </div>

    <div style="margin-top:14px;">
      <h3 style="color:var(--gold-primary); font-size:0.95rem; margin-bottom:10px;">
        ${currentLang === "en" ? "Free Apps" : "ነፃ መተግበሪያዎች"}
      </h3>
      ${apps.map(a => `
        <div class="glass-card" style="margin-bottom:10px;">
          <h4 style="font-size:0.95rem;">${a.name}</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin:4px 0 10px;">${a.desc?.[currentLang] || a.desc?.en}</p>
          <a href="${a.botUrl}" class="btn-outline" target="_blank" rel="noopener">${t.open_bot}</a>
        </div>
      `).join("")}
    </div>
  `;
}

// 5. CONTACT SCREEN
function renderContactScreen(container) {
  const t = UI_I18N[currentLang];
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  container.innerHTML = `
    <div class="glass-card">
      <h3 style="color:var(--gold-primary); font-size:1.05rem; margin-bottom:12px;">
        ${currentLang === "en" ? "Get in Touch" : "አግኙን"}
      </h3>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <a href="${activeData.links.support}" class="btn-gold" target="_blank" rel="noopener">💬 ${t.support_btn}</a>
        <a href="tel:${activeData.links.phoneInt}" class="btn-outline">📞 Phone: ${activeData.links.phone}</a>
        <a href="https://wa.me/${activeData.links.whatsapp}" class="btn-outline" target="_blank" rel="noopener">🟢 WhatsApp</a>
        <a href="mailto:${activeData.links.email}" class="btn-outline">✉️ ${activeData.links.email}</a>
        <a href="${activeData.links.channel}" class="btn-outline" target="_blank" rel="noopener">📢 ${t.channel_btn}</a>
        <a href="${activeData.links.group}" class="btn-outline" target="_blank" rel="noopener">👥 ${t.group_btn}</a>
      </div>
    </div>

    <div class="glass-card">
      <h3 style="color:var(--gold-primary); font-size:1rem; margin-bottom:6px;">💰 ${t.referral_title}</h3>
      <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
        ${activeData.referral?.[currentLang] || activeData.referral?.en}
      </p>
    </div>

    <div class="glass-card">
      <h3 style="font-size:1rem; margin-bottom:6px;">👨‍💻 ${t.about_founder}</h3>
      <p style="font-weight:700; font-size:0.95rem;">${activeData.founder.name}</p>
      <p style="font-size:0.8rem; color:var(--gold-primary); margin-bottom:6px;">
        📍 ${activeData.founder.location?.[currentLang] || activeData.founder.location?.en}
      </p>
      <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
        ${activeData.founder.bio?.[currentLang] || activeData.founder.bio?.en}
      </p>
    </div>

    <div class="glass-card" style="display:flex; flex-direction:column; gap:10px;">
      <button class="btn-outline" onclick="shareApp()">🔗 ${t.share}</button>
      <button id="pwa-install-btn" class="btn-gold" style="display:none;" onclick="installPWA()">📲 ${t.install}</button>
      ${isIOS ? `<p style="font-size:0.75rem; color:var(--text-muted); text-align:center;">${t.ios_hint}</p>` : ""}
    </div>
  `;

  if (deferredInstallPrompt) {
    const btn = document.getElementById("pwa-install-btn");
    if (btn) btn.style.display = "inline-flex";
  }
}

// 6. OWNER EDITOR SCREEN (#editor)
function renderEditorScreen(container) {
  const t = UI_I18N[currentLang];
  container.innerHTML = `
    <div class="glass-card">
      <h2 style="font-size:1.15rem; color:var(--gold-primary);">${t.editor_title}</h2>
      <p style="font-size:0.8rem; color:var(--text-muted); margin-top:6px; line-height:1.4;">${t.editor_note}</p>
      <div style="display:flex; gap:10px; margin-top:14px;">
        <button class="btn-gold" onclick="copyDataJS()">📋 Copy data.js</button>
        <button class="btn-outline" onclick="downloadDataJS()">💾 Download data.js</button>
      </div>
    </div>

    <div class="glass-card">
      <h3 style="font-size:1rem; margin-bottom:8px;">Banner Notice Text</h3>
      <label style="font-size:0.8rem; color:var(--text-muted);">English:</label>
      <input type="text" id="ed-banner-en" class="editor-input" value="${activeData.announcement?.en || ''}">
      <label style="font-size:0.8rem; color:var(--text-muted);">Amharic:</label>
      <input type="text" id="ed-banner-am" class="editor-input" value="${activeData.announcement?.am || ''}">
      <button class="btn-outline" onclick="saveBannerEdits()">Update Banner Memory</button>
    </div>

    <div class="glass-card">
      <h3 style="font-size:1rem; margin-bottom:8px;">Products Price Manager</h3>
      <div id="ed-products-list"></div>
    </div>
  `;

  const pContainer = document.getElementById("ed-products-list");
  pContainer.innerHTML = activeData.products.map((p, idx) => `
    <div style="border:1px solid var(--border-glass); border-radius:10px; padding:10px; margin-bottom:10px;">
      <p><strong>${p.name}</strong> (Bot ID: ${p.botId || 'none'})</p>
      <label style="font-size:0.8rem;">Price (ETB - leave blank for 'Ask in bot'):</label>
      <input type="number" id="ed-price-${idx}" class="editor-input" value="${p.price !== null ? p.price : ''}" placeholder="null">
      <button class="btn-outline" onclick="updateProductPrice(${idx})">Save Price</button>
    </div>
  `).join("");
}

window.saveBannerEdits = function() {
  activeData.announcement = {
    en: document.getElementById("ed-banner-en").value,
    am: document.getElementById("ed-banner-am").value
  };
  renderAnnouncement();
  showToast("Banner updated in memory!");
};

window.updateProductPrice = function(index) {
  const val = document.getElementById(`ed-price-${index}`).value;
  activeData.products[index].price = val === "" ? null : Number(val);
  showToast("Price updated in memory!");
};

window.copyDataJS = function() {
  const jsContent = "const LIVE_API_URL = " + JSON.stringify(LIVE_API_URL) + ";\n\nconst APP_DATA = " + JSON.stringify(activeData, null, 2) + ";";
  navigator.clipboard.writeText(jsContent).then(() => showToast("data.js copied to clipboard!"));
};

window.downloadDataJS = function() {
  const jsContent = "const LIVE_API_URL = " + JSON.stringify(LIVE_API_URL) + ";\n\nconst APP_DATA = " + JSON.stringify(activeData, null, 2) + ";";
  const blob = new Blob([jsContent], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.js";
  a.click();
  URL.revokeObjectURL(url);
  showToast("data.js downloaded!");
};

// Sheet Detail Modal
window.openProductSheet = function(productId) {
  const p = activeData.products.find(x => x.id === productId);
  if (!p) return;
  const t = UI_I18N[currentLang];
  const priceText = p.price ? `${p.price} ETB` : t.ask_in_bot;
  const buyUrl = p.botId ? `${activeData.links.bot}?start=buy_${p.botId}` : activeData.links.bot;
  const shortD = p.shortDesc?.[currentLang] || p.shortDesc?.en;
  const fullD = p.fullDesc?.[currentLang] || p.fullDesc?.en;

  const content = document.getElementById("sheet-content");
  content.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
      <h2 id="sheet-title" style="font-size:1.3rem;">${p.name}</h2>
      <span class="product-price">${priceText}</span>
    </div>
    <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:14px;">${shortD}</p>

    <div style="display:flex; gap:16px; margin-bottom:16px; font-size:0.85rem; color:var(--gold-primary);">
      <span>📦 ${t.size}: <strong>${p.size}</strong></span>
      <span>🎹 ${t.tested_on}: <strong>${p.testedOn || 'ORG 25'}</strong></span>
    </div>

    ${fullD ? `
      <div style="margin-bottom:18px;">
        <h4 style="font-size:0.95rem; margin-bottom:4px;">${t.what_inside}</h4>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${fullD}</p>
      </div>
    ` : ""}

    <a href="${buyUrl}" class="btn-gold" target="_blank" rel="noopener">
      ${t.buy_in_bot}
    </a>
  `;

  document.getElementById("detail-sheet-backdrop").classList.add("open");
};

function closeSheet() {
  document.getElementById("detail-sheet-backdrop").classList.remove("open");
}

// Global Helpers
window.copyText = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(UI_I18N[currentLang].copied);
  }).catch(() => {
    showToast(text);
  });
};

window.showToast = function(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
};

window.shareApp = function() {
  if (navigator.share) {
    navigator.share({
      title: "ORG 25 PRO",
      text: "Ethiopia's #1 Keyboard Style & Rhythm Store for ORG 25",
      url: window.location.href
    }).catch(() => {});
  } else {
    copyText(window.location.href);
  }
};

window.installPWA = function() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(() => {
      deferredInstallPrompt = null;
      const btn = document.getElementById("pwa-install-btn");
      if (btn) btn.style.display = "none";
    });
  }
};

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
