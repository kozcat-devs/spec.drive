/* ===================================================
   SPEC.DRIVE — shared app.js
   Loaded on every page. Renders header/footer, handles
   language switching, loads the car/brand database, and
   wires up scroll-reveal + counter animations.
=================================================== */

const SD = (function () {

  // ---- Translations (shared across all pages) ----
  const translations = {
    en: {
      igBanner: "Check out the official instagram page!",
      igBannerBtn: "Click Here →",
      igMobileLabel: "Instagram page",
      igMobileBtn: "VISIT →",
      navHome: "Home",
      navAbout: "About",
      navLibrary: "Library",
      mobileHome: "HOME",
      mobileAbout: "ABOUT",
      heroLine1: "Nerdifying the",
      heroLine2: "automotive culture",
      tagline: "one car at a time...",
      searchPlaceholder: "Search engine code, chassis, specs...",
      searchBtn: "Search",
      noResults: 'No specs found matching "{q}". Try searching "S63", "V6", or "GT3".',
      viewSpec: "View Spec →",
      viewBrand: "View Brand →",
      exploreLibrary: "Explore the Library →",
      aboutTitlePrefix: "About",
      aboutP1: "Spec.drive was created on April 13th, 2026, with a simple passion: sharing the incredible world of automobiles with people around the globe.",
      aboutP2: "The journey started with our very first post, featuring the specifications of the legendary Nissan GT-R R35. What began as a small project from Sri Lanka quickly grew into a place where car enthusiasts could discover, learn, and appreciate the engineering behind some of the world's most amazing machines.",
      aboutP3: "The goal of Spec.drive is to give both car enthusiasts and beginners a quick glimpse into how bizarre, innovative, and fascinating the automotive industry really is. Every car has something unique — whether it's a groundbreaking engine, a racing legacy, a crazy design, or a story behind its creation.",
      aboutP4: "Our mission is to cover as many vehicles as possible and build a community for people who love exploring car specifications, performance, history, and automotive technology.",
      aboutP5: "This is only the beginning. We have many more exciting things planned, so stay tuned...",
      aboutP6: "More new things to come ;)",
      aboutFounderLabel: "- Founder of spec.drive",
      aboutVideoLabel: "Check out our first ever video! - The Nissan GT-R R35",
      returnHome: "← Return to Home",
      footerTagline: "Nerdifying the automotive culture",
      footerContactLabel: "Contact",
      libraryTitle: "Spec Library",
      librarySubtitle: "Browse by brand, or filter by country. New models get added over time.",
      libraryAllChip: "All",
      backToLibrary: "← Back to Library",
      backToBrand: "← Back to",
      comingSoonTitle: "No specs here yet",
      comingSoonBody: "We haven't written this brand up yet — check back soon.",
      statCountry: "Country",
      statPrice: "Price",
      statTopSpeed: "Top Speed",
      statZeroHundred: "0-100 km/h",
      statPeopleReached: "People Reached",
      statVehicles: "Vehicles",
      statPlatform: "Automotive Specifications Platform",
      watchOnInstagram: "Watch on Instagram",
      loading: "Loading...",
      brandNotFound: "Brand not found.",
      carNotFound: "Car not found."
    },
    de: {
      igBanner: "Schau dir unsere offizielle Instagram-Seite an!",
      igBannerBtn: "Hier klicken →",
      igMobileLabel: "Instagram-Seite",
      igMobileBtn: "BESUCHEN →",
      navHome: "Startseite",
      navAbout: "Über uns",
      navLibrary: "Bibliothek",
      mobileHome: "STARTSEITE",
      mobileAbout: "ÜBER UNS",
      heroLine1: "Wir verwandeln die",
      heroLine2: "Autokultur in Nerd-Wissen",
      tagline: "ein Auto nach dem anderen...",
      searchPlaceholder: "Motorcode, Fahrgestell, Spezifikationen suchen...",
      searchBtn: "Suchen",
      noResults: 'Keine Ergebnisse für "{q}" gefunden. Versuche "S63", "V6" oder "GT3".',
      viewSpec: "Details ansehen →",
      viewBrand: "Marke ansehen →",
      exploreLibrary: "Zur Bibliothek →",
      aboutTitlePrefix: "Über",
      aboutP1: "Spec.drive wurde am 13. April 2026 aus einer einfachen Leidenschaft heraus gegründet: die faszinierende Welt der Automobile mit Menschen auf der ganzen Welt zu teilen.",
      aboutP2: "Alles begann mit unserem allerersten Beitrag über die Spezifikationen des legendären Nissan GT-R R35. Was als kleines Projekt aus Sri Lanka startete, wurde schnell zu einem Ort, an dem Autoliebhaber die Technik hinter einigen der beeindruckendsten Maschinen der Welt entdecken und schätzen lernen konnten.",
      aboutP3: "Das Ziel von Spec.drive ist es, sowohl Autoenthusiasten als auch Einsteigern einen schnellen Einblick zu geben, wie ungewöhnlich, innovativ und faszinierend die Automobilindustrie wirklich ist. Jedes Auto hat etwas Besonderes — sei es ein bahnbrechender Motor, ein Rennerbe, ein verrücktes Design oder eine Geschichte hinter seiner Entstehung.",
      aboutP4: "Unsere Mission ist es, so viele Fahrzeuge wie möglich vorzustellen und eine Community für Menschen aufzubauen, die gerne Fahrzeugspezifikationen, Leistung, Geschichte und Automobiltechnik erkunden.",
      aboutP5: "Das ist erst der Anfang. Es gibt noch viele spannende Dinge, die wir planen, also bleib dran...",
      aboutP6: "Weitere Neuigkeiten folgen ;)",
      aboutFounderLabel: "- Gründer von spec.drive",
      aboutVideoLabel: "Schau dir unser allererstes Video an! - Der Nissan GT-R R35",
      returnHome: "← Zurück zur Startseite",
      footerTagline: "Wir verwandeln die Autokultur in Nerd-Wissen",
      footerContactLabel: "Kontakt",
      libraryTitle: "Spec-Bibliothek",
      librarySubtitle: "Nach Marke durchsuchen oder nach Land filtern. Neue Modelle kommen laufend dazu.",
      libraryAllChip: "Alle",
      backToLibrary: "← Zurück zur Bibliothek",
      backToBrand: "← Zurück zu",
      comingSoonTitle: "Noch keine Daten",
      comingSoonBody: "Für diese Marke haben wir noch nichts geschrieben — schau bald wieder vorbei.",
      statCountry: "Land",
      statPrice: "Preis",
      statTopSpeed: "Höchstgeschwindigkeit",
      statZeroHundred: "0-100 km/h",
      statPeopleReached: "Erreichte Personen",
      statVehicles: "Fahrzeuge",
      statPlatform: "Automotive Spezifikations-Plattform",
      watchOnInstagram: "Auf Instagram ansehen",
      loading: "Lädt...",
      brandNotFound: "Marke nicht gefunden.",
      carNotFound: "Auto nicht gefunden."
    },
    fr: {
      igBanner: "Découvrez notre page Instagram officielle !",
      igBannerBtn: "Cliquez ici →",
      igMobileLabel: "Page Instagram",
      igMobileBtn: "VISITER →",
      navHome: "Accueil",
      navAbout: "À propos",
      navLibrary: "Bibliothèque",
      mobileHome: "ACCUEIL",
      mobileAbout: "À PROPOS",
      heroLine1: "Rendre la",
      heroLine2: "culture automobile passionnante",
      tagline: "une voiture à la fois...",
      searchPlaceholder: "Rechercher un code moteur, un châssis, des specs...",
      searchBtn: "Rechercher",
      noResults: 'Aucun résultat pour "{q}". Essayez "S63", "V6" ou "GT3".',
      viewSpec: "Voir la fiche →",
      viewBrand: "Voir la marque →",
      exploreLibrary: "Voir la bibliothèque →",
      aboutTitlePrefix: "À propos de",
      aboutP1: "Spec.drive a été créé le 13 avril 2026, avec une passion simple : partager le monde incroyable de l'automobile avec des passionnés du monde entier.",
      aboutP2: "Tout a commencé avec notre tout premier post, consacré aux caractéristiques de la légendaire Nissan GT-R R35. Ce qui n'était au départ qu'un petit projet lancé depuis le Sri Lanka est rapidement devenu un lieu où les passionnés d'automobile peuvent découvrir et apprécier l'ingénierie derrière certaines des machines les plus impressionnantes au monde.",
      aboutP3: "L'objectif de Spec.drive est d'offrir aux passionnés comme aux débutants un aperçu de ce que l'industrie automobile a de plus surprenant, innovant et fascinant. Chaque voiture a quelque chose d'unique — un moteur révolutionnaire, un héritage de course, un design audacieux, ou une histoire derrière sa création.",
      aboutP4: "Notre mission est de couvrir un maximum de véhicules et de créer une communauté pour les passionnés de caractéristiques automobiles, de performance, d'histoire et de technologie.",
      aboutP5: "Ce n'est que le début. Nous avons encore beaucoup de projets passionnants en préparation, restez à l'écoute...",
      aboutP6: "D'autres nouveautés à venir ;)",
      aboutFounderLabel: "- Fondateur de spec.drive",
      aboutVideoLabel: "Découvrez notre toute première vidéo ! - La Nissan GT-R R35",
      returnHome: "← Retour à l'accueil",
      footerTagline: "Rendre la culture automobile passionnante",
      footerContactLabel: "Contact",
      libraryTitle: "Bibliothèque des specs",
      librarySubtitle: "Parcourez par marque ou filtrez par pays. De nouveaux modèles sont ajoutés régulièrement.",
      libraryAllChip: "Tous",
      backToLibrary: "← Retour à la bibliothèque",
      backToBrand: "← Retour à",
      comingSoonTitle: "Rien ici pour l'instant",
      comingSoonBody: "Cette marque n'a pas encore de fiche — revenez bientôt.",
      statCountry: "Pays",
      statPrice: "Prix",
      statTopSpeed: "Vitesse max.",
      statZeroHundred: "0-100 km/h",
      statPeopleReached: "Personnes touchées",
      statVehicles: "Véhicules",
      statPlatform: "Plateforme de fiches techniques automobiles",
      watchOnInstagram: "Voir sur Instagram",
      loading: "Chargement...",
      brandNotFound: "Marque introuvable.",
      carNotFound: "Voiture introuvable."
    }
  };

  const langFlags = { en: "gb", de: "de", fr: "fr" };
  let currentLang = localStorage.getItem("sd_lang") || "en";

  // Path prefix so pages work whether index.html is at root or in a subfolder
  const root = document.body.getAttribute('data-root') || '';

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    const flagEl = document.getElementById('langFlagIcon');
    if (flagEl) flagEl.src = `https://flagcdn.com/w40/${langFlags[currentLang]}.png`;
    document.dispatchEvent(new CustomEvent('sd:langchange', { detail: { lang: currentLang } }));
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('sd_lang', lang);
    applyTranslations();
    const menu = document.getElementById('langMenu');
    if (menu) menu.classList.add('hidden');
  }

  // ---- Header / Footer chrome ----
  function renderChrome(activePage) {
    const headerEl = document.getElementById('sd-header');
    const footerEl = document.getElementById('sd-footer');

    if (headerEl) {
      headerEl.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <a href="${root}index.html" class="flex items-center gap-3 group shrink-0">
          <img src="${root}assets/img/logo.png" alt="spec.drive logo"
               onerror="this.style.display='none';"
               class="w-10 h-10 rounded-full border border-r1 object-cover">
          <span class="font-logo text-3xl tracking-wider text-white uppercase group-hover:text-r3 transition-colors">
            spec<span class="text-r2">drive</span>
          </span>
        </a>

        <div class="hidden md:inline-flex items-center gap-2 lg:gap-3 bg-c1/80 border border-[#222222] hover:border-r1 rounded-full px-3.5 py-1.5 text-xs transition-all shadow-md">
          <i class="fa-brands fa-instagram text-r3 text-sm"></i>
          <span class="text-gray-300 font-body text-xs lg:text-sm" data-i18n="igBanner"></span>
          <a href="https://www.instagram.com/spec.drive/" target="_blank" rel="noopener noreferrer"
             class="btn-primary text-white font-heading px-3 py-1 rounded-full text-xs uppercase tracking-wider shrink-0" data-i18n="igBannerBtn"></a>
        </div>

        <div class="flex items-center gap-4 sm:gap-6 shrink-0">
          <a href="${root}index.html" class="nav-link font-heading text-lg tracking-wider text-white uppercase ${activePage==='home'?'active':''}" data-i18n="navHome"></a>
          <a href="${root}about.html" class="nav-link font-heading text-lg tracking-wider text-white uppercase ${activePage==='about'?'active':''}" data-i18n="navAbout"></a>
          <a href="${root}library.html" class="nav-link font-heading text-lg tracking-wider text-white uppercase ${(activePage==='library'||activePage==='brand'||activePage==='car')?'active':''}" data-i18n="navLibrary"></a>

          <div class="relative" id="langSwitcherWrap">
            <button onclick="SD.toggleLangMenu()" id="langSwitcherBtn" aria-label="Change language"
                    class="flex items-center gap-1.5 bg-c1/80 border border-[#222222] hover:border-r1 rounded-full pl-1.5 pr-2.5 py-1.5 transition-all">
              <img id="langFlagIcon" src="https://flagcdn.com/w40/gb.png" alt="EN" class="w-6 h-4 rounded-sm object-cover border border-[#2a2a2a]">
              <i class="fa-solid fa-chevron-down text-[10px] text-gray-400"></i>
            </button>
            <div id="langMenu" class="hidden absolute right-0 mt-2 w-40 bg-c2 border border-[#222222] rounded-lg shadow-2xl overflow-hidden z-50">
              <button onclick="SD.setLanguage('en')" class="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-c1 text-sm text-white transition-colors">
                <img src="https://flagcdn.com/w40/gb.png" class="w-6 h-4 rounded-sm object-cover border border-[#2a2a2a]"> English
              </button>
              <button onclick="SD.setLanguage('de')" class="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-c1 text-sm text-white transition-colors">
                <img src="https://flagcdn.com/w40/de.png" class="w-6 h-4 rounded-sm object-cover border border-[#2a2a2a]"> Deutsch
              </button>
              <button onclick="SD.setLanguage('fr')" class="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-c1 text-sm text-white transition-colors">
                <img src="https://flagcdn.com/w40/fr.png" class="w-6 h-4 rounded-sm object-cover border border-[#2a2a2a]"> Français
              </button>
            </div>
          </div>

          <button onclick="SD.toggleMobileMenu()" class="text-white hover:text-r2 p-2 focus:outline-none" aria-label="Menu">
            <i class="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      <div id="mobileMenu" class="hidden bg-c2 border-b border-[#1A1A1A] px-6 py-4 space-y-3 font-heading text-lg">
        <div class="md:hidden flex items-center justify-between bg-c1 border border-[#222222] rounded-lg p-3 text-xs mb-2">
          <div class="flex items-center gap-2">
            <i class="fa-brands fa-instagram text-r3"></i>
            <span class="text-gray-300" data-i18n="igMobileLabel"></span>
          </div>
          <a href="https://www.instagram.com/spec.drive/" target="_blank" class="bg-r1 text-white font-heading px-2 py-1 rounded text-xs" data-i18n="igMobileBtn"></a>
        </div>
        <a href="${root}index.html" class="block text-white hover:text-r2" data-i18n="mobileHome"></a>
        <a href="${root}about.html" class="block text-white hover:text-r2" data-i18n="mobileAbout"></a>
        <a href="${root}library.html" class="block text-white hover:text-r2" data-i18n="navLibrary"></a>
        <div class="flex items-center gap-2 pt-2 border-t border-[#1A1A1A] mt-2">
          <button onclick="SD.setLanguage('en')" class="flex items-center gap-1.5 bg-c1 border border-[#222222] hover:border-r1 rounded-full px-2.5 py-1.5 text-xs">
            <img src="https://flagcdn.com/w40/gb.png" class="w-5 h-3.5 rounded-sm object-cover">EN</button>
          <button onclick="SD.setLanguage('de')" class="flex items-center gap-1.5 bg-c1 border border-[#222222] hover:border-r1 rounded-full px-2.5 py-1.5 text-xs">
            <img src="https://flagcdn.com/w40/de.png" class="w-5 h-3.5 rounded-sm object-cover">DE</button>
          <button onclick="SD.setLanguage('fr')" class="flex items-center gap-1.5 bg-c1 border border-[#222222] hover:border-r1 rounded-full px-2.5 py-1.5 text-xs">
            <img src="https://flagcdn.com/w40/fr.png" class="w-5 h-3.5 rounded-sm object-cover">FR</button>
        </div>
      </div>`;

      document.addEventListener('click', function (e) {
        const wrap = document.getElementById('langSwitcherWrap');
        if (wrap && !wrap.contains(e.target)) {
          const menu = document.getElementById('langMenu');
          if (menu) menu.classList.add('hidden');
        }
      });
    }

    if (footerEl) {
      footerEl.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="font-logo text-xl text-white tracking-wider">spec<span class="text-r2">drive</span></div>
        <div>© 2026 specdrive • <span data-i18n="footerTagline"></span></div>
        <div class="flex gap-4 text-gray-400">
          <a href="https://www.instagram.com/spec.drive/" target="_blank" class="hover:text-r2"><i class="fa-brands fa-instagram"></i></a>
          <a href="mailto:spec.drive.official@gmail.com" class="hover:text-r2 flex items-center gap-1.5">
            <i class="fa-solid fa-envelope"></i><span data-i18n="footerContactLabel"></span> - spec.drive.official@gmail.com
          </a>
          <a href="#" class="hover:text-r2"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>`;
    }

    applyTranslations();
  }

  function toggleLangMenu() { document.getElementById('langMenu').classList.toggle('hidden'); }
  function toggleMobileMenu() { document.getElementById('mobileMenu').classList.toggle('hidden'); }

  // ---- Data loading (cars.json / brands.json) ----
  let dataPromise = null;
  function loadData() {
    if (dataPromise) return dataPromise;
    dataPromise = Promise.all([
      fetch(`${root}data/cars.json`).then(r => r.json()),
      fetch(`${root}data/brands.json`).then(r => r.json())
    ]).then(([cars, brands]) => ({ cars, brands }))
      .catch(err => {
        console.error('Could not load the car database. If opening via file://, run a local server instead.', err);
        return { cars: [], brands: [] };
      });
    return dataPromise;
  }

  // ---- Scroll reveal ----
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .livery-stripe');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => observer.observe(el));
  }

  // ---- Counter animation ----
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const strip = document.getElementById('achievementsStrip');
    if (!strip) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        strip.querySelectorAll('.achv-counter').forEach(animateCounter);
        observer.disconnect();
      });
    }, { threshold: 0.3 });
    observer.observe(strip);
  }

  // ---- Back to top ----
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 500);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function init(activePage) {
    renderChrome(activePage);
    initScrollReveal();
    initCounters();
    initBackToTop();
  }

  return {
    t, setLanguage, toggleLangMenu, toggleMobileMenu,
    loadData, init, initScrollReveal, applyTranslations,
    get lang() { return currentLang; }
  };
})();
