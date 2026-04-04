document.addEventListener("DOMContentLoaded", function(){

/* =========================
   HAMBURGER MENU TOGGLE
========================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll("#nav-menu a");

if (hamburger) {
  hamburger.addEventListener("click", function() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function(event) {
    if (!event.target.closest(".navbar")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
function reveal(){
  const elements = document.querySelectorAll(
    ".programs, .program-card, .youtube-section, .features, .feature-card, .campus, .counselling, .footer"
  );

  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const visible = 120;

    if(elementTop < windowHeight - visible){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


/* =========================
   NAV ACTIVE CLICK
========================= */
const navLinkItems = document.querySelectorAll("nav a");

navLinkItems.forEach(link => {
  link.addEventListener("click", function(){
    navLinkItems.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});


/* =========================
   BUTTON RIPPLE EFFECT
========================= */
const buttons = document.querySelectorAll("button:not(.hamburger)");

buttons.forEach(btn => {
  btn.style.position = "relative";
  btn.style.overflow = "hidden";

  btn.addEventListener("click", function(e){
    const circle = document.createElement("span");

    circle.style.position = "absolute";
    circle.style.width = "100px";
    circle.style.height = "100px";
    circle.style.background = "rgba(255,255,255,0.3)";
    circle.style.borderRadius = "50%";
    circle.style.top = e.offsetY + "px";
    circle.style.left = e.offsetX + "px";
    circle.style.transform = "translate(-50%, -50%)";

    this.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 500);
  });
});


/* =========================
   FORM HANDLING
========================= */
const form = document.querySelector("form");

if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    let valid = true;

    inputs.forEach(input => {
      if(input.value.trim() === ""){
        valid = false;
      }
    });

    if(!valid){
      alert("Please fill all fields");
      return;
    }

    alert("Form submitted successfully!");
    form.reset();
  });
}


/* =========================
   APPLY NOW → OPEN GOOGLE FORM (UPDATED)
========================= */
const applyButtons = document.querySelectorAll(".apply-btn, .primary, .apply");

applyButtons.forEach(btn => {
  btn.addEventListener("click", function(){
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfu3JSvOhOb-tE8sUu1uAsKMGfql8P62Brrf7xEUqzdOnVZ5A/viewform?usp=header",
      "_blank"
    );
  });
});
/* ===== HERO IMAGE SLIDER ===== */
const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {
  const slides = Array.from(slider.children).filter(
    (el) => el.tagName === "IMG"
  );
  if (!slides.length) return;

  let index = Math.max(
    0,
    slides.findIndex((img) => img.classList.contains("active"))
  );
  slides.forEach((img, i) => img.classList.toggle("active", i === index));

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
});

/* ===== BACKGROUND IMAGE SLIDER ===== */
const backgroundSlider = document.querySelector(".background-slider");
if (backgroundSlider) {
  const bgSlides = backgroundSlider.querySelectorAll(".bg-slide");
  if (bgSlides.length) {
    let bgIndex = 0;
    setInterval(() => {
      bgSlides[bgIndex].classList.remove("active");
      bgIndex = (bgIndex + 1) % bgSlides.length;
      bgSlides[bgIndex].classList.add("active");
    }, 4000);
  }
}
const counters = document.querySelectorAll(".stat h3");

counters.forEach(counter => {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const updateCount = () => {
    const increment = target / 100;

    if(count < target){
      count += increment;
      counter.innerText = Math.floor(count);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCount();
});

/* ===== POPUP HANDLING ===== */
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-popup");
const popupApplyBtn = document.querySelector(".popup-apply-btn");
const popupYoutubeBtn = document.querySelector(".popup-youtube-btn");
const POPUP_APPLY_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfu3JSvOhOb-tE8sUu1uAsKMGfql8P62Brrf7xEUqzdOnVZ5A/viewform?usp=header";
const POPUP_YOUTUBE_URL = "https://www.youtube.com/@caravikiranballa6671";

if (popup) {
  function showPopup() {
    popup.style.display = "flex";
  }

  function hidePopup() {
    popup.style.display = "none";
  }

  setInterval(showPopup, 20000);

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      hidePopup();
    });
  }

  if (popupApplyBtn) {
    popupApplyBtn.addEventListener("click", function () {
      hidePopup();
      window.open(POPUP_APPLY_FORM_URL, "_blank");
    });
  }

  if (popupYoutubeBtn) {
    popupYoutubeBtn.addEventListener("click", function () {
      hidePopup();
      window.open(POPUP_YOUTUBE_URL, "_blank");
    });
  }

  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      hidePopup();
    }
  });
}

  /* =========================
     REVIEWS CAROUSEL (scroll + auto)
  ========================= */
  function debounce(fn, ms) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  const reviewsScroll = document.querySelector(".reviews-scroll");
  const reviewPrev = document.querySelector(".review-nav.prev");
  const reviewNext = document.querySelector(".review-nav.next");
  const reviewDots = document.querySelector(".review-dots");

  let reviewIndex = 0;
  let reviewCards = [];

  function getReviewCards() {
    if (!reviewsScroll) return [];
    return Array.from(reviewsScroll.querySelectorAll(".review-card"));
  }

  function scrollReviewsToIndex(i) {
    if (!reviewsScroll) return;
    reviewCards = getReviewCards();
    if (!reviewCards.length) return;

    reviewIndex = ((i % reviewCards.length) + reviewCards.length) % reviewCards.length;
    const card = reviewCards[reviewIndex];
    const target =
      card.offsetLeft - (reviewsScroll.clientWidth - card.offsetWidth) / 2;
    const max = reviewsScroll.scrollWidth - reviewsScroll.clientWidth;
    reviewsScroll.scrollTo({
      left: Math.max(0, Math.min(target, max)),
      behavior: "smooth",
    });

    if (reviewDots) {
      reviewDots.querySelectorAll(".review-dot").forEach((dot, idx) => {
        dot.classList.toggle("current", idx === reviewIndex);
        dot.setAttribute("aria-current", idx === reviewIndex ? "true" : "false");
      });
    }
  }

  function stepReviews(delta) {
    reviewCards = getReviewCards();
    if (!reviewCards.length) return;
    scrollReviewsToIndex(reviewIndex + delta);
  }

  function buildReviewDots() {
    if (!reviewDots || !reviewsScroll) return;
    reviewCards = getReviewCards();
    reviewDots.innerHTML = "";
    reviewCards.forEach((_, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "review-dot" + (idx === 0 ? " current" : "");
      btn.setAttribute("aria-label", "Go to review " + (idx + 1));
      if (idx === 0) btn.setAttribute("aria-current", "true");
      btn.addEventListener("click", () => scrollReviewsToIndex(idx));
      reviewDots.appendChild(btn);
    });
  }

  if (reviewsScroll) {
    buildReviewDots();
    reviewCards = getReviewCards();

    if (reviewPrev) reviewPrev.addEventListener("click", () => stepReviews(-1));
    if (reviewNext) reviewNext.addEventListener("click", () => stepReviews(1));

    let reviewScrollTimer = setInterval(() => stepReviews(1), 6000);

    reviewsScroll.addEventListener("mouseenter", () => {
      clearInterval(reviewScrollTimer);
    });
    reviewsScroll.addEventListener("mouseleave", () => {
      clearInterval(reviewScrollTimer);
      reviewScrollTimer = setInterval(() => stepReviews(1), 6000);
    });

    reviewsScroll.addEventListener("scroll", () => {
      const cards = getReviewCards();
      if (!cards.length) return;
      const mid = reviewsScroll.scrollLeft + reviewsScroll.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, idx) => {
        const cMid = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(cMid - mid);
        if (d < bestDist) {
          bestDist = d;
          best = idx;
        }
      });
      reviewIndex = best;
    });

    window.addEventListener(
      "resize",
      debounce(() => {
        buildReviewDots();
        scrollReviewsToIndex(reviewIndex);
      }, 150)
    );
  }
});

function scrollToSection(id){
  const section = document.getElementById(id);

  if(section){
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}
/* =============================================================
   AUTH MODAL — triggered by "Our Materials" scroll links
   - First visit: must Sign Up
   - Return visit: Login with email + password
   - Full email format validation + password rules
   - State saved in localStorage
============================================================= */

let _pendingMaterial = "";

function openAuthModal(materialName) {
  _pendingMaterial = materialName || "";
  const modal = document.getElementById("authModal");
  if (!modal) return;

  // If already logged in → show success directly
  const user = _getUser();
  if (user) {
    _showSuccess("👋 Hi, " + user.name + "!", "You are logged in as " + user.email, materialName);
  } else {
    switchTab("login");
  }
  modal.classList.add("open");
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.remove("open");
  // close on overlay click
}
document.addEventListener("click", function(e) {
  const modal = document.getElementById("authModal");
  if (modal && e.target === modal) closeAuthModal();
});

function switchTab(tab) {
  const lPanel = document.getElementById("panelLogin");
  const sPanel = document.getElementById("panelSignup");
  const xPanel = document.getElementById("panelSuccess");
  const tLogin  = document.getElementById("tabLogin");
  const tSignup = document.getElementById("tabSignup");

  lPanel.style.display = "none";
  sPanel.style.display = "none";
  xPanel.style.display = "none";
  tLogin.classList.remove("active");
  tSignup.classList.remove("active");

  if (tab === "login") {
    lPanel.style.display = "block";
    tLogin.classList.add("active");
  } else {
    sPanel.style.display = "block";
    tSignup.classList.add("active");
  }
}

/* ── Helpers ── */
function _getUsers() {
  return JSON.parse(localStorage.getItem("vcc_users") || "{}");
}
function _getUser() {
  return JSON.parse(localStorage.getItem("vcc_me") || "null");
}
function _setUser(u) {
  localStorage.setItem("vcc_me", JSON.stringify(u));
}

function clearErr(errId, inputId) {
  const e = document.getElementById(errId);
  const i = document.getElementById(inputId);
  if (e) e.textContent = "";
  if (i) i.classList.remove("input-err");
}

function _err(errId, inputId, msg) {
  const e = document.getElementById(errId);
  const i = document.getElementById(inputId);
  if (e) e.textContent = "⚠ " + msg;
  if (i) i.classList.add("input-err");
  return false;
}

function _validEmail(email) {
  // RFC-5321 style: must have text@domain.tld — no spaces, proper dot
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

function toggleEye(inputId, btn) {
  const el = document.getElementById(inputId);
  if (!el) return;
  if (el.type === "password") {
    el.type = "text";
    btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    el.type = "password";
    btn.innerHTML = '<i class="fas fa-eye"></i>';
  }
}

/* ── SIGN UP ── */
function doSignup() {
  const name    = (document.getElementById("suName").value || "").trim();
  const email   = (document.getElementById("suEmail").value || "").trim().toLowerCase();
  const phone   = (document.getElementById("suPhone").value || "").trim();
  const course  = (document.getElementById("suCourse").value || "").trim();
  const pw      = document.getElementById("suPw").value || "";
  const confirm = document.getElementById("suConfirm").value || "";

  // Clear all errors
  ["suNameErr","suEmailErr","suPhoneErr","suCourseErr","suPwErr","suConfirmErr"].forEach(id => {
    const el = document.getElementById(id); if(el) el.textContent="";
  });
  ["suName","suEmail","suPhone","suCourse","suPw","suConfirm"].forEach(id => {
    const el = document.getElementById(id); if(el) el.classList.remove("input-err");
  });

  if (!name)
    return _err("suNameErr","suName","Please enter your full name.");

  if (!email)
    return _err("suEmailErr","suEmail","Email address is required.");
  if (!_validEmail(email))
    return _err("suEmailErr","suEmail","Enter a valid email (e.g. you@gmail.com).");

  if (!phone)
    return _err("suPhoneErr","suPhone","Phone number is required.");
  if (!/^[6-9]\d{9}$/.test(phone))
    return _err("suPhoneErr","suPhone","Enter a valid 10-digit Indian mobile number.");

  if (!course)
    return _err("suCourseErr","suCourse","Please select the course you are preparing for.");

  const users = _getUsers();
  if (users[email])
    return _err("suEmailErr","suEmail","This email is already registered — please login.");

  if (!pw)
    return _err("suPwErr","suPw","Password is required.");
  if (pw.length < 6)
    return _err("suPwErr","suPw","Password must be at least 6 characters.");
  if (!/[a-zA-Z]/.test(pw))
    return _err("suPwErr","suPw","Password must contain at least one letter.");

  if (!confirm)
    return _err("suConfirmErr","suConfirm","Please confirm your password.");
  if (pw !== confirm)
    return _err("suConfirmErr","suConfirm","Passwords do not match.");

  users[email] = { name, email, phone, course, pw };
  users[phone]  = { name, email, phone, course, pw }; // also index by phone
  localStorage.setItem("vcc_users", JSON.stringify(users));
  _setUser({ name, email, phone, course });

  // ── Save to Google Sheets ──
  new Image().src = 'https://script.google.com/macros/s/AKfycbyqeBe0pj7MVF3DB5FQquZtxaje5HmR8uxOSYMw6bwpS8DY9VIO7U_dJE6R52E83_t2/exec?name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone) + '&course=' + encodeURIComponent(course) + '&action=signup';

  _showSuccess("🎉 Account Created!", "Welcome, " + name + "!", _pendingMaterial);
}

/* ── LOGIN ── */
function doLogin() {
  const rawInput = (document.getElementById("loginEmail").value || "").trim();
  const pw       = document.getElementById("loginPw").value || "";

  ["loginEmailErr","loginPwErr"].forEach(id => {
    const el = document.getElementById(id); if(el) el.textContent="";
  });
  ["loginEmail","loginPw"].forEach(id => {
    const el = document.getElementById(id); if(el) el.classList.remove("input-err");
  });

  if (!rawInput)
    return _err("loginEmailErr","loginEmail","Email or phone number is required.");

  if (!pw)
    return _err("loginPwErr","loginPw","Password is required.");

  const users = _getUsers();

  // Determine if input is phone or email
  const isPhone = /^[6-9]\d{9}$/.test(rawInput);
  const key     = isPhone ? rawInput : rawInput.toLowerCase();

  if (!users[key])
    return _err("loginEmailErr","loginEmail","No account found. Please sign up first.");

  if (users[key].pw !== pw)
    return _err("loginPwErr","loginPw","Incorrect password. Please try again.");

  const u = users[key];
  _setUser({ name: u.name, email: u.email, phone: u.phone, course: u.course });

  // ── Save to Google Sheets ──
  new Image().src = 'https://script.google.com/macros/s/AKfycbyqeBe0pj7MVF3DB5FQquZtxaje5HmR8uxOSYMw6bwpS8DY9VIO7U_dJE6R52E83_t2/exec?name=' + encodeURIComponent(u.name) + '&email=' + encodeURIComponent(u.email || '') + '&phone=' + encodeURIComponent(u.phone || '') + '&action=login';

  _showSuccess("✅ Login Successful!", "Welcome back, " + u.name + "!", _pendingMaterial);
}

/* ── GOOGLE (simulated) ── */
function doGoogle() {
  const name  = "Google Student";
  const email = "googlestudent@gmail.com";
  const users = _getUsers();
  if (!users[email]) {
    users[email] = { name, email, pw: null };
    localStorage.setItem("vcc_users", JSON.stringify(users));
  }
  _setUser({ name, email });
  _showSuccess("✅ Signed in with Google!", "Welcome, " + name + "!", _pendingMaterial);
}

/* ── SUCCESS ── */
function _showSuccess(title, body, material) {
  document.getElementById("panelLogin").style.display  = "none";
  document.getElementById("panelSignup").style.display = "none";
  document.getElementById("panelSuccess").style.display = "block";
  document.getElementById("tabLogin").classList.remove("active");
  document.getElementById("tabSignup").classList.remove("active");
  document.getElementById("successTitle").textContent = title;
  document.getElementById("successBody").textContent  = body;

  const matEl = document.getElementById("successMaterial");
  if (material) {
    matEl.textContent = "📄 " + material;
    matEl.style.display = "block";
  } else {
    matEl.style.display = "none";
  }
}

function goToMaterials() {
  window.open('materials.html', '_blank');
}

/* =====================================================
   MATERIALS OVERLAY — embedded in page, no new file
===================================================== */
const MAT_COURSES = {
  'ca-foundation': {
    icon:'📘', title:'CA Foundation', desc:'Entry-level CA course',
    groups:[
      { label:null, subjects:[
        'Accounting',
        'Business Laws',
        'Quantitative Aptitude',
        'Business Economics'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  },
  'ca-inter': {
    icon:'📗', title:'CA Intermediate', desc:'Group 1 & Group 2',
    groups:[
      { label:'Group 1', subjects:[
        'Advanced Accounting',
        'Corporate and Other Laws',
        'Taxation'
      ]},
      { label:'Group 2', subjects:[
        'Cost and Management Accounting',
        'Auditing and Ethics',
        'Financial Management',
        'Strategic Management'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  },
  'ca-final': {
    icon:'🏆', title:'CA Final', desc:'Group 1 & Group 2',
    groups:[
      { label:'Group 1', subjects:[
        'Financial Reporting',
        'Advanced Financial Management',
        'Advanced Auditing, Assurance & Professional Ethics'
      ]},
      { label:'Group 2', subjects:[
        'Direct Tax Laws & International Taxation',
        'Indirect Tax Laws',
        'Integrated Business Solutions'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  },
  'cma-foundation': {
    icon:'📙', title:'CMA Foundation', desc:'Fundamentals level',
    groups:[
      { label:null, subjects:[
        'Business Laws and Business Communication',
        'Financial and Cost Accounting',
        'Business Mathematics and Statistics',
        'Business Economics and Management'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  },
  'cma-inter': {
    icon:'📒', title:'CMA Intermediate', desc:'Group 1 & Group 2',
    groups:[
      { label:'Group 1', subjects:[
        'Business Laws and Ethics',
        'Financial Accounting',
        'Direct and Indirect Taxation',
        'Cost Accounting'
      ]},
      { label:'Group 2', subjects:[
        'Operations Management and Strategic Management',
        'Corporate Accounting and Auditing',
        'Financial Management and Business Data Analytics',
        'Management Accounting'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  },
  'cma-final': {
    icon:'🎯', title:'CMA Final', desc:'Group 3 & Group 4',
    groups:[
      { label:'Group 3', subjects:[
        'Corporate and Economic Laws',
        'Strategic Financial Management',
        'Direct Tax Laws and International Taxation',
        'Strategic Cost Management'
      ]},
      { label:'Group 4', subjects:[
        'Cost & Management Audit',
        'Corporate Financial Reporting',
        'Indirect Tax Laws and Practice',
        'SPMBV',
        'RMBI',
        'ENTS'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  },
  'inter-cec': {
    icon:'📐', title:'Inter CEC', desc:'Commerce · Economics · Civics',
    groups:[
      { label:null, subjects:[
        'Commerce',
        'Economics',
        'Civics',
        'English',
        'Sanskrit'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  },
  'inter-mec': {
    icon:'📏', title:'Inter MEC', desc:'Mathematics · Economics · Commerce',
    groups:[
      { label:null, subjects:[
        'Mathematics',
        'Economics',
        'Commerce',
        'English',
        'Sanskrit'
      ]},
      { label:'Practice Papers', subjects:[
        'Model Test Papers',
        'Previous Year Question Papers'
      ]}
    ]
  }
};

// PDF map — add file paths here when ready
// e.g. 'Advanced Accounting': 'pdfs/ca-inter-advanced-accounting.pdf'
const MAT_PDFS = {

  // CA Foundation
  'Accounting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Business Laws': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Quantitative Aptitude': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Business Economics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  
  // CA Intermediate
  'Advanced Accounting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Corporate and Other Laws': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Taxation': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Cost and Management Accounting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Auditing and Ethics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Financial Management': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Strategic Management': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',

  // CA Final
  'Financial Reporting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Advanced Financial Management': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Advanced Auditing, Assurance & Professional Ethics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Direct Tax Laws & International Taxation': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Indirect Tax Laws': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Integrated Business Solutions': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',

  // CMA Foundation
  'Business Laws and Business Communication': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Financial and Cost Accounting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Business Mathematics and Statistics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Business Economics and Management': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',

  // CMA Intermediate
  'Business Laws and Ethics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Financial Accounting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Direct and Indirect Taxation': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Cost Accounting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Operations Management and Strategic Management': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Corporate Accounting and Auditing': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Financial Management and Business Data Analytics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Management Accounting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',

  // CMA Final
  'Corporate and Economic Laws': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Strategic Financial Management': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Direct Tax Laws and International Taxation': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Strategic Cost Management': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Cost & Management Audit': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Corporate Financial Reporting': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Indirect Tax Laws and Practice': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'SPMBV': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'RMBI': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'ENTS': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',

  // Inter CEC
  'Commerce': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Economics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Civics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'English': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Sanskrit': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',

  // Practice Papers (shared across all courses)
  'Model Test Papers': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
  'Previous Year Question Papers': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',

  // Inter MEC
  'Mathematics': 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview',
};

let _matCurrentCourse = null;

function openMaterialsPage() {
  closeAuthModal();
  const ov = document.getElementById('materialsOverlay');
  if (ov) {
    ov.classList.add('open');
    matShowCourses();
  }
}

function closeMaterialsPage() {
  const ov = document.getElementById('materialsOverlay');
  if (ov) ov.classList.remove('open');
}

function matGoBack() {
  if (_matCurrentCourse) {
    matShowCourses();
  } else {
    closeMaterialsPage();
  }
}

function matShowCourses() {
  _matCurrentCourse = null;
  document.getElementById('matViewCourses').style.display  = 'block';
  document.getElementById('matViewSubjects').style.display = 'none';
  document.getElementById('matBreadcrumb').innerHTML =
    '<span style="color:#1b2b3c;font-weight:600">All Courses</span>';
}

function matShowSubjects(key) {
  const course = MAT_COURSES[key];
  if (!course) return;
  _matCurrentCourse = key;

  document.getElementById('matViewCourses').style.display  = 'none';
  document.getElementById('matViewSubjects').style.display = 'block';

  // breadcrumb
  document.getElementById('matBreadcrumb').innerHTML = `
    <a onclick="matShowCourses()">All Courses</a>
    <span class="mat-bc-sep"> › </span>
    <span style="color:#1b2b3c;font-weight:600">${course.title}</span>`;

  // course header
  document.getElementById('matCourseHeader').innerHTML = `
    <span class="ch-icon">${course.icon}</span>
    <div>
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
    </div>`;

  // subjects
  let html = '';
  course.groups.forEach(group => {
    if (group.label) {
      html += `<div class="mat-group-label">${group.label}</div>`;
    }
    html += '<div class="mat-subjects-grid">';
    group.subjects.forEach(sub => {
      const hasPdf = !!MAT_PDFS[sub];
      const onclick = hasPdf
        ? `onclick="window.open('${MAT_PDFS[sub]}','_blank')"`
        : `onclick="matPdfSoon('${sub.replace(/'/g,"\\'")}')"`;
      html += `
        <div class="mat-subject-card" ${onclick}>
          <div class="msc-icon">📄</div>
          <div class="msc-text">
            <h5>${sub}</h5>
            <p>${hasPdf ? 'Tap to open PDF' : 'PDF coming soon'}</p>
          </div>
          <i class="fas fa-chevron-right msc-arrow"></i>
        </div>`;
    });
    html += '</div>';
  });
  document.getElementById('matSubjectsList').innerHTML = html;

  // scroll to top
  document.getElementById('matBody').scrollTop = 0;
}

function matPdfSoon(name) {
  // Remove existing toast if any
  const old = document.querySelector('.mat-toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = 'mat-toast';
  t.innerHTML = `<i class="fas fa-clock" style="margin-right:8px;color:#f59e0b"></i>
    PDF for <strong>${name}</strong> will be available soon!`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
