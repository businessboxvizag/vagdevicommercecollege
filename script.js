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
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
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
    ".programs, .program-card, .youtube-section, .features, .feature-card, .campus, .counselling, .footer, .trust-strip, .about-preview, .results-section, .faq-section, .faq-item"
  );
  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 120){ el.classList.add("active"); }
  });
}

/* =========================
   FAQ ACCORDION
========================= */
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", function () { this.classList.toggle("open"); });
});

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
document.querySelectorAll("button:not(.hamburger)").forEach(btn => {
  btn.style.position = "relative";
  btn.style.overflow = "hidden";
  btn.addEventListener("click", function(e){
    const circle = document.createElement("span");
    circle.style.cssText = "position:absolute;width:100px;height:100px;background:rgba(255,255,255,0.3);border-radius:50%;transform:translate(-50%,-50%);";
    circle.style.top = e.offsetY + "px";
    circle.style.left = e.offsetX + "px";
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
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
    inputs.forEach(input => { if(input.value.trim() === "") valid = false; });
    if(!valid){ alert("Please fill all fields"); return; }
    alert("Form submitted successfully!");
    form.reset();
  });
}

/* =========================
   APPLY NOW BUTTON
========================= */
document.querySelectorAll(".apply-btn, .primary, .apply").forEach(btn => {
  btn.addEventListener("click", function(){
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSfu3JSvOhOb-tE8sUu1uAsKMGfql8P62Brrf7xEUqzdOnVZ5A/viewform?usp=header","_blank");
  });
});

/* ===== HERO IMAGE SLIDER ===== */
document.querySelectorAll(".slider").forEach(slider => {
  const slides = Array.from(slider.children).filter(el => el.tagName === "IMG");
  if (!slides.length) return;
  let index = Math.max(0, slides.findIndex(img => img.classList.contains("active")));
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

/* ===== STATS COUNTER — triggered on scroll ===== */
const statCounters = document.querySelectorAll(".stat h3[data-target]");

function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  // Don't re-animate if already done
  if (counter.dataset.animated === "1") return;
  counter.dataset.animated = "1";
  let count = 0;
  const step = Math.max(1, target / 120);
  const updateCount = () => {
    count += step;
    if (count < target) {
      counter.innerText = Math.floor(count);
      setTimeout(updateCount, 16);
    } else {
      counter.innerText = target + "+";
    }
  };
  updateCount();
}

if ("IntersectionObserver" in window) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statCounters.forEach(counter => {
    counter.innerText = "0";
    statsObserver.observe(counter);
  });
} else {
  // Fallback for old browsers
  statCounters.forEach(counter => animateCounter(counter));
}

/* ===== POPUP ===== */
const popup = document.getElementById("popup");
if (popup) {
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfu3JSvOhOb-tE8sUu1uAsKMGfql8P62Brrf7xEUqzdOnVZ5A/viewform?usp=header";
  const YT_URL   = "https://www.youtube.com/@caravikiranballa6671";
  const hide = () => popup.style.display = "none";
  setInterval(() => popup.style.display = "flex", 20000);
  const closeBtn = document.querySelector(".close-popup");
  if (closeBtn) closeBtn.addEventListener("click", e => { e.stopPropagation(); hide(); });
  const applyBtn = document.querySelector(".popup-apply-btn");
  if (applyBtn) applyBtn.addEventListener("click", () => { hide(); window.open(FORM_URL,"_blank"); });
  const ytBtn = document.querySelector(".popup-youtube-btn");
  if (ytBtn) ytBtn.addEventListener("click", () => { hide(); window.open(YT_URL,"_blank"); });
  popup.addEventListener("click", e => { if(e.target === popup) hide(); });
}

/* ===== REVIEWS CAROUSEL ===== */
(function(){
  function debounce(fn, ms){ let t; return function(){ clearTimeout(t); t = setTimeout(fn,ms); }; }
  const track = document.querySelector(".reviews-scroll");
  const dots  = document.querySelector(".review-dots");
  if (!track) return;
  let idx = 0;
  const cards = () => Array.from(track.querySelectorAll(".review-card"));

  function goTo(i){
    const cs = cards(); if(!cs.length) return;
    idx = ((i % cs.length) + cs.length) % cs.length;
    const c = cs[idx];
    track.scrollTo({ left: Math.max(0, Math.min(c.offsetLeft-(track.clientWidth-c.offsetWidth)/2, track.scrollWidth-track.clientWidth)), behavior:"smooth" });
    if(dots) dots.querySelectorAll(".review-dot").forEach((d,n) => { d.classList.toggle("current",n===idx); d.setAttribute("aria-current",n===idx?"true":"false"); });
  }

  function buildDots(){
    if(!dots) return;
    dots.innerHTML = "";
    cards().forEach((_,n) => {
      const b = document.createElement("button");
      b.type="button"; b.className="review-dot"+(n===0?" current":"");
      b.setAttribute("aria-label","Go to review "+(n+1));
      if(n===0) b.setAttribute("aria-current","true");
      b.addEventListener("click",()=>goTo(n));
      dots.appendChild(b);
    });
  }

  buildDots();
  const prev = document.querySelector(".review-nav.prev");
  const next = document.querySelector(".review-nav.next");
  if(prev) prev.addEventListener("click",()=>goTo(idx-1));
  if(next) next.addEventListener("click",()=>goTo(idx+1));

  let timer = setInterval(()=>goTo(idx+1), 6000);
  track.addEventListener("mouseenter",()=>clearInterval(timer));
  track.addEventListener("mouseleave",()=>{ clearInterval(timer); timer=setInterval(()=>goTo(idx+1),6000); });
  window.addEventListener("resize", debounce(()=>{ buildDots(); goTo(idx); },150));
})();

}); // end DOMContentLoaded

/* =========================
   SCROLL TO SECTION
========================= */
function scrollToSection(id){
  const s = document.getElementById(id);
  if(s) s.scrollIntoView({ behavior:"smooth" });
}

/* =========================
   ACTIVE NAV ON SCROLL
========================= */
(function(){
  const sections = document.querySelectorAll("section[id], footer[id]");
  const links    = document.querySelectorAll("nav a");
  if(!sections.length||!links.length) return;
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting)
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href")==="#"+entry.target.id));
    });
  },{ rootMargin:"-40% 0px -55% 0px" }).observe && sections.forEach(s =>
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting)
          links.forEach(l => l.classList.toggle("active", l.getAttribute("href")==="#"+entry.target.id));
      });
    },{ rootMargin:"-40% 0px -55% 0px" }).observe(s)
  );
})();

/* =============================================================
   AUTH MODAL
============================================================= */
let _pendingMaterial = "";

function openAuthModal(materialName) {
  _pendingMaterial = materialName || "";
  const modal = document.getElementById("authModal");
  if (!modal) return;
  const user = _getUser();
  if (user) { _showSuccess("👋 Hi, "+user.name+"!", "You are logged in as "+user.email, materialName); }
  else { switchTab("login"); }
  modal.classList.add("open");
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.remove("open");
}
document.addEventListener("click", function(e){
  const modal = document.getElementById("authModal");
  if(modal && e.target===modal) closeAuthModal();
});

function switchTab(tab) {
  ["panelLogin","panelSignup","panelSuccess"].forEach(id => {
    const el = document.getElementById(id); if(el) el.style.display="none";
  });
  ["tabLogin","tabSignup"].forEach(id => {
    const el = document.getElementById(id); if(el) el.classList.remove("active");
  });
  if(tab==="login"){
    document.getElementById("panelLogin").style.display="block";
    document.getElementById("tabLogin").classList.add("active");
  } else {
    document.getElementById("panelSignup").style.display="block";
    document.getElementById("tabSignup").classList.add("active");
  }
}

function _getUsers(){ return JSON.parse(localStorage.getItem("vcc_users")||"{}"); }
function _getUser() { return JSON.parse(localStorage.getItem("vcc_me")||"null"); }
function _setUser(u){ localStorage.setItem("vcc_me",JSON.stringify(u)); }

function clearErr(errId,inputId){
  const e=document.getElementById(errId); const i=document.getElementById(inputId);
  if(e)e.textContent=""; if(i)i.classList.remove("input-err");
}
function _err(errId,inputId,msg){
  const e=document.getElementById(errId); const i=document.getElementById(inputId);
  if(e)e.textContent="⚠ "+msg; if(i)i.classList.add("input-err"); return false;
}
function _validEmail(email){ return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim()); }
function toggleEye(inputId,btn){
  const el=document.getElementById(inputId); if(!el) return;
  if(el.type==="password"){ el.type="text"; btn.innerHTML='<i class="fas fa-eye-slash"></i>'; }
  else { el.type="password"; btn.innerHTML='<i class="fas fa-eye"></i>'; }
}

function doSignup(){
  const name    = (document.getElementById("suName").value||"").trim();
  const email   = (document.getElementById("suEmail").value||"").trim().toLowerCase();
  const phone   = (document.getElementById("suPhone").value||"").trim();
  const course  = (document.getElementById("suCourse").value||"").trim();
  const pw      = document.getElementById("suPw").value||"";
  const confirm = document.getElementById("suConfirm").value||"";

  ["suNameErr","suEmailErr","suPhoneErr","suCourseErr","suPwErr","suConfirmErr"].forEach(id=>{ const el=document.getElementById(id); if(el)el.textContent=""; });
  ["suName","suEmail","suPhone","suCourse","suPw","suConfirm"].forEach(id=>{ const el=document.getElementById(id); if(el)el.classList.remove("input-err"); });

  if(!name)    return _err("suNameErr","suName","Please enter your full name.");
  if(!email)   return _err("suEmailErr","suEmail","Email address is required.");
  if(!_validEmail(email)) return _err("suEmailErr","suEmail","Enter a valid email (e.g. you@gmail.com).");
  if(!phone)   return _err("suPhoneErr","suPhone","Phone number is required.");
  if(!/^[6-9]\d{9}$/.test(phone)) return _err("suPhoneErr","suPhone","Enter a valid 10-digit Indian mobile number.");
  if(!course)  return _err("suCourseErr","suCourse","Please select the course you are preparing for.");

  const users=_getUsers();
  if(users[email]) return _err("suEmailErr","suEmail","This email is already registered — please login.");
  if(!pw)      return _err("suPwErr","suPw","Password is required.");
  if(pw.length<6) return _err("suPwErr","suPw","Password must be at least 6 characters.");
  if(!/[a-zA-Z]/.test(pw)) return _err("suPwErr","suPw","Password must contain at least one letter.");
  if(!confirm) return _err("suConfirmErr","suConfirm","Please confirm your password.");
  if(pw!==confirm) return _err("suConfirmErr","suConfirm","Passwords do not match.");

  users[email]={name,email,phone,course,pw};
  users[phone]={name,email,phone,course,pw};
  localStorage.setItem("vcc_users",JSON.stringify(users));
  _setUser({name,email,phone,course});

  new Image().src='https://script.google.com/macros/s/AKfycbyqeBe0pj7MVF3DB5FQquZtxaje5HmR8uxOSYMw6bwpS8DY9VIO7U_dJE6R52E83_t2/exec?name='+encodeURIComponent(name)+'&email='+encodeURIComponent(email)+'&phone='+encodeURIComponent(phone)+'&course='+encodeURIComponent(course)+'&action=signup';
  _showSuccess("🎉 Account Created!","Welcome, "+name+"!",_pendingMaterial);
}

function doLogin(){
  const rawInput=(document.getElementById("loginEmail").value||"").trim();
  const pw=document.getElementById("loginPw").value||"";

  ["loginEmailErr","loginPwErr"].forEach(id=>{ const el=document.getElementById(id); if(el)el.textContent=""; });
  ["loginEmail","loginPw"].forEach(id=>{ const el=document.getElementById(id); if(el)el.classList.remove("input-err"); });

  if(!rawInput) return _err("loginEmailErr","loginEmail","Email or phone number is required.");
  if(!pw)       return _err("loginPwErr","loginPw","Password is required.");

  const users=_getUsers();
  const key=/^[6-9]\d{9}$/.test(rawInput)?rawInput:rawInput.toLowerCase();
  if(!users[key]) return _err("loginEmailErr","loginEmail","No account found. Please sign up first.");
  if(users[key].pw!==pw) return _err("loginPwErr","loginPw","Incorrect password. Please try again.");

  const u=users[key];
  _setUser({name:u.name,email:u.email,phone:u.phone,course:u.course});
  new Image().src='https://script.google.com/macros/s/AKfycbyqeBe0pj7MVF3DB5FQquZtxaje5HmR8uxOSYMw6bwpS8DY9VIO7U_dJE6R52E83_t2/exec?name='+encodeURIComponent(u.name)+'&email='+encodeURIComponent(u.email||'')+'&phone='+encodeURIComponent(u.phone||'')+'&action=login';
  _showSuccess("✅ Login Successful!","Welcome back, "+u.name+"!",_pendingMaterial);
}

function doGoogle(){
  const name="Google Student"; const email="googlestudent@gmail.com";
  const users=_getUsers();
  if(!users[email]){ users[email]={name,email,pw:null}; localStorage.setItem("vcc_users",JSON.stringify(users)); }
  _setUser({name,email});
  _showSuccess("✅ Signed in with Google!","Welcome, "+name+"!",_pendingMaterial);
}

function _showSuccess(title,body,material){
  document.getElementById("panelLogin").style.display="none";
  document.getElementById("panelSignup").style.display="none";
  document.getElementById("panelSuccess").style.display="block";
  document.getElementById("tabLogin").classList.remove("active");
  document.getElementById("tabSignup").classList.remove("active");
  document.getElementById("successTitle").textContent=title;
  document.getElementById("successBody").textContent=body;
  const matEl=document.getElementById("successMaterial");
  if(material){ matEl.textContent="📄 "+material; matEl.style.display="block"; }
  else { matEl.style.display="none"; }
}

function goToMaterials(){ window.open('materials.html','_blank'); }

/* =====================================================
   MATERIALS OVERLAY
===================================================== */

// Shared fallback PDF
const PDF_GENERAL = 'https://drive.google.com/file/d/10q7UrAiiUND7YroHyVTO3sYQJHtbgQcv/preview';

// CA & CMA — Model Test Papers / Previous Year QPs
const PDF_CA_CMA_QP = 'https://drive.google.com/file/d/1xmulyOHos-yK8SqrCzGMOwMfdX3sToQY/preview';

// CA & CMA — Answer Keys
const PDF_CA_CMA_ANSKEY = 'https://drive.google.com/file/d/17JbvWre_ciuTrz0RyIImteYx-4H68uyX/preview';

const MAT_COURSES = {
  'ca-foundation': {
    icon:'📘', title:'CA Foundation', desc:'Entry-level CA course',
    groups:[
      { label:null, subjects:[
        'Accounting','Business Laws','Quantitative Aptitude','Business Economics'
      ]},
      { label:'Practice Papers', subjects:[
        'CA Foundation – Model Test Papers',
        'CA Foundation – Previous Year Question Papers',
        'CA Foundation – Answer Key'
      ]}
    ]
  },
  'ca-inter': {
    icon:'📗', title:'CA Intermediate', desc:'Group 1 & Group 2',
    groups:[
      { label:'Group 1', subjects:[
        'Advanced Accounting','Corporate and Other Laws','Taxation'
      ]},
      { label:'Group 2', subjects:[
        'Cost and Management Accounting','Auditing and Ethics','Financial Management','Strategic Management'
      ]},
      { label:'Practice Papers', subjects:[
        'CA Inter – Model Test Papers',
        'CA Inter – Previous Year Question Papers',
        'CA Inter – Answer Key'
      ]}
    ]
  },
  'ca-final': {
    icon:'🏆', title:'CA Final', desc:'Group 1 & Group 2',
    groups:[
      { label:'Group 1', subjects:[
        'Financial Reporting','Advanced Financial Management','Advanced Auditing, Assurance & Professional Ethics'
      ]},
      { label:'Group 2', subjects:[
        'Direct Tax Laws & International Taxation','Indirect Tax Laws','Integrated Business Solutions'
      ]},
      { label:'Practice Papers', subjects:[
        'CA Final – Model Test Papers',
        'CA Final – Previous Year Question Papers',
        'CA Final – Answer Key'
      ]}
    ]
  },
  'cma-foundation': {
    icon:'📙', title:'CMA Foundation', desc:'Fundamentals level',
    groups:[
      { label:null, subjects:[
        'Business Laws and Business Communication','Financial and Cost Accounting',
        'Business Mathematics and Statistics','Business Economics and Management'
      ]},
      { label:'Practice Papers', subjects:[
        'CMA Foundation – Model Test Papers',
        'CMA Foundation – Previous Year Question Papers',
        'CMA Foundation – Answer Key'
      ]}
    ]
  },
  'cma-inter': {
    icon:'📒', title:'CMA Intermediate', desc:'Group 1 & Group 2',
    groups:[
      { label:'Group 1', subjects:[
        'Business Laws and Ethics','Financial Accounting','Direct and Indirect Taxation','Cost Accounting'
      ]},
      { label:'Group 2', subjects:[
        'Operations Management and Strategic Management','Corporate Accounting and Auditing',
        'Financial Management and Business Data Analytics','Management Accounting'
      ]},
      { label:'Practice Papers', subjects:[
        'CMA Inter – Model Test Papers',
        'CMA Inter – Previous Year Question Papers',
        'CMA Inter – Answer Key'
      ]}
    ]
  },
  'cma-final': {
    icon:'🎯', title:'CMA Final', desc:'Group 3 & Group 4',
    groups:[
      { label:'Group 3', subjects:[
        'Corporate and Economic Laws','Strategic Financial Management',
        'Direct Tax Laws and International Taxation','Strategic Cost Management'
      ]},
      { label:'Group 4', subjects:[
        'Cost & Management Audit','Corporate Financial Reporting',
        'Indirect Tax Laws and Practice','SPMBV','RMBI','ENTS'
      ]},
      { label:'Practice Papers', subjects:[
        'CMA Final – Model Test Papers',
        'CMA Final – Previous Year Question Papers',
        'CMA Final – Answer Key'
      ]}
    ]
  },
  'inter-cec': {
    icon:'📐', title:'Inter CEC', desc:'Commerce · Economics · Civics',
    groups:[
      { label:null, subjects:['Commerce','Economics','Civics','English','Sanskrit'] },
      { label:'Practice Papers', subjects:[
        'Inter CEC – Model Test Papers',
        'Inter CEC – Previous Year Question Papers',
        'Inter CEC – Answer Key'
      ]}
    ]
  },
  'inter-mec': {
    icon:'📏', title:'Inter MEC', desc:'Mathematics · Economics · Commerce',
    groups:[
      { label:null, subjects:['Mathematics','Economics','Commerce','English','Sanskrit'] },
      { label:'Practice Papers', subjects:[
        'Inter MEC – Model Test Papers',
        'Inter MEC – Previous Year Question Papers',
        'Inter MEC – Answer Key'
      ]}
    ]
  }
};

const MAT_PDFS = {
  // ── CA Foundation subjects ──
  'Accounting': PDF_GENERAL,
  'Business Laws': PDF_GENERAL,
  'Quantitative Aptitude': PDF_GENERAL,
  'Business Economics': PDF_GENERAL,
  // CA Foundation practice papers (CA/CMA links)
  'CA Foundation – Model Test Papers':             PDF_CA_CMA_QP,
  'CA Foundation – Previous Year Question Papers': PDF_CA_CMA_QP,
  'CA Foundation – Answer Key':                    PDF_CA_CMA_ANSKEY,

  // ── CA Intermediate subjects ──
  'Advanced Accounting': PDF_GENERAL,
  'Corporate and Other Laws': PDF_GENERAL,
  'Taxation': PDF_GENERAL,
  'Cost and Management Accounting': PDF_GENERAL,
  'Auditing and Ethics': PDF_GENERAL,
  'Financial Management': PDF_GENERAL,
  'Strategic Management': PDF_GENERAL,
  // CA Inter practice papers
  'CA Inter – Model Test Papers':             PDF_CA_CMA_QP,
  'CA Inter – Previous Year Question Papers': PDF_CA_CMA_QP,
  'CA Inter – Answer Key':                    PDF_CA_CMA_ANSKEY,

  // ── CA Final subjects ──
  'Financial Reporting': PDF_GENERAL,
  'Advanced Financial Management': PDF_GENERAL,
  'Advanced Auditing, Assurance & Professional Ethics': PDF_GENERAL,
  'Direct Tax Laws & International Taxation': PDF_GENERAL,
  'Indirect Tax Laws': PDF_GENERAL,
  'Integrated Business Solutions': PDF_GENERAL,
  // CA Final practice papers
  'CA Final – Model Test Papers':             PDF_CA_CMA_QP,
  'CA Final – Previous Year Question Papers': PDF_CA_CMA_QP,
  'CA Final – Answer Key':                    PDF_CA_CMA_ANSKEY,

  // ── CMA Foundation subjects ──
  'Business Laws and Business Communication': PDF_GENERAL,
  'Financial and Cost Accounting': PDF_GENERAL,
  'Business Mathematics and Statistics': PDF_GENERAL,
  'Business Economics and Management': PDF_GENERAL,
  // CMA Foundation practice papers
  'CMA Foundation – Model Test Papers':             PDF_CA_CMA_QP,
  'CMA Foundation – Previous Year Question Papers': PDF_CA_CMA_QP,
  'CMA Foundation – Answer Key':                    PDF_CA_CMA_ANSKEY,

  // ── CMA Intermediate subjects ──
  'Business Laws and Ethics': PDF_GENERAL,
  'Financial Accounting': PDF_GENERAL,
  'Direct and Indirect Taxation': PDF_GENERAL,
  'Cost Accounting': PDF_GENERAL,
  'Operations Management and Strategic Management': PDF_GENERAL,
  'Corporate Accounting and Auditing': PDF_GENERAL,
  'Financial Management and Business Data Analytics': PDF_GENERAL,
  'Management Accounting': PDF_GENERAL,
  // CMA Inter practice papers
  'CMA Inter – Model Test Papers':             PDF_CA_CMA_QP,
  'CMA Inter – Previous Year Question Papers': PDF_CA_CMA_QP,
  'CMA Inter – Answer Key':                    PDF_CA_CMA_ANSKEY,

  // ── CMA Final subjects ──
  'Corporate and Economic Laws': PDF_GENERAL,
  'Strategic Financial Management': PDF_GENERAL,
  'Direct Tax Laws and International Taxation': PDF_GENERAL,
  'Strategic Cost Management': PDF_GENERAL,
  'Cost & Management Audit': PDF_GENERAL,
  'Corporate Financial Reporting': PDF_GENERAL,
  'Indirect Tax Laws and Practice': PDF_GENERAL,
  'SPMBV': PDF_GENERAL,
  'RMBI': PDF_GENERAL,
  'ENTS': PDF_GENERAL,
  // CMA Final practice papers
  'CMA Final – Model Test Papers':             PDF_CA_CMA_QP,
  'CMA Final – Previous Year Question Papers': PDF_CA_CMA_QP,
  'CMA Final – Answer Key':                    PDF_CA_CMA_ANSKEY,

  // ── Inter CEC subjects ──
  'Commerce': PDF_GENERAL,
  'Economics': PDF_GENERAL,
  'Civics': PDF_GENERAL,
  'English': PDF_GENERAL,
  'Sanskrit': PDF_GENERAL,
  // Inter CEC practice papers (general link until specific ones are available)
  'Inter CEC – Model Test Papers':             PDF_GENERAL,
  'Inter CEC – Previous Year Question Papers': PDF_GENERAL,
  'Inter CEC – Answer Key':                    PDF_GENERAL,

  // ── Inter MEC subjects ──
  'Mathematics': PDF_GENERAL,
  // Inter MEC practice papers
  'Inter MEC – Model Test Papers':             PDF_GENERAL,
  'Inter MEC – Previous Year Question Papers': PDF_GENERAL,
  'Inter MEC – Answer Key':                    PDF_GENERAL,
};

let _matCurrentCourse = null;

function openMaterialsPage(){
  closeAuthModal();
  const ov = document.getElementById('materialsOverlay');
  if(ov){ ov.classList.add('open'); matShowCourses(); }
}

function closeMaterialsPage(){
  const ov = document.getElementById('materialsOverlay');
  if(ov) ov.classList.remove('open');
}

function matGoBack(){
  if(_matCurrentCourse) matShowCourses();
  else closeMaterialsPage();
}

function matShowCourses(){
  _matCurrentCourse = null;
  document.getElementById('matViewCourses').style.display  = 'block';
  document.getElementById('matViewSubjects').style.display = 'none';
  document.getElementById('matBreadcrumb').innerHTML =
    '<span style="color:#1b2b3c;font-weight:600">All Courses</span>';
}

function matShowSubjects(key){
  const course = MAT_COURSES[key];
  if(!course) return;
  _matCurrentCourse = key;

  document.getElementById('matViewCourses').style.display  = 'none';
  document.getElementById('matViewSubjects').style.display = 'block';

  document.getElementById('matBreadcrumb').innerHTML = `
    <a onclick="matShowCourses()">All Courses</a>
    <span class="mat-bc-sep"> › </span>
    <span style="color:#1b2b3c;font-weight:600">${course.title}</span>`;

  document.getElementById('matCourseHeader').innerHTML = `
    <span class="ch-icon">${course.icon}</span>
    <div><h3>${course.title}</h3><p>${course.desc}</p></div>`;

  let html = '';
  course.groups.forEach(group => {
    if(group.label) html += `<div class="mat-group-label">${group.label}</div>`;
    html += '<div class="mat-subjects-grid">';
    group.subjects.forEach(sub => {
      const hasPdf = !!MAT_PDFS[sub];

      // Icon + badge based on entry type
      let icon = '📄', badge = '';
      if(sub.includes('Answer Key')){
        icon  = '🗝️';
        badge = '<span style="font-size:10px;font-weight:700;background:#fef9c3;color:#854d0e;padding:2px 8px;border-radius:10px;margin-left:6px;white-space:nowrap">ANS KEY</span>';
      } else if(sub.includes('Model Test')){
        icon  = '📝';
        badge = '<span style="font-size:10px;font-weight:700;background:#eff6ff;color:#1d4ed8;padding:2px 8px;border-radius:10px;margin-left:6px;white-space:nowrap">TEST</span>';
      } else if(sub.includes('Previous Year')){
        icon  = '📋';
        badge = '<span style="font-size:10px;font-weight:700;background:#f0fdf4;color:#166534;padding:2px 8px;border-radius:10px;margin-left:6px;white-space:nowrap">PYQ</span>';
      }

      const onclick = hasPdf
        ? `onclick="window.open('${MAT_PDFS[sub]}','_blank')"`
        : `onclick="matPdfSoon('${sub.replace(/'/g,"\\'")}')"`; 

      html += `
        <div class="mat-subject-card" ${onclick}>
          <div class="msc-icon">${icon}</div>
          <div class="msc-text">
            <h5 style="display:flex;align-items:center;flex-wrap:wrap;gap:3px">${sub}${badge}</h5>
            <p>${hasPdf ? 'Tap to open PDF' : 'PDF coming soon'}</p>
          </div>
          <i class="fas fa-chevron-right msc-arrow"></i>
        </div>`;
    });
    html += '</div>';
  });

  document.getElementById('matSubjectsList').innerHTML = html;
  document.getElementById('matBody').scrollTop = 0;
}

function matPdfSoon(name){
  const old = document.querySelector('.mat-toast');
  if(old) old.remove();
  const t = document.createElement('div');
  t.className = 'mat-toast';
  t.innerHTML = `<i class="fas fa-clock" style="margin-right:8px;color:#f59e0b"></i>PDF for <strong>${name}</strong> will be available soon!`;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 3000);
}
/* =========================
   RANKER IMAGE SLIDESHOW
========================= */
let rankerCurrentSlide = 0;
const rankerSlides = document.querySelectorAll('.ranker-slide');
const rankerDots   = document.querySelectorAll('.ranker-dot');

function goToSlide(index) {
  if (!rankerSlides.length) return;
  rankerSlides[rankerCurrentSlide].classList.remove('active');
  rankerDots[rankerCurrentSlide].classList.remove('active');
  rankerCurrentSlide = (index + rankerSlides.length) % rankerSlides.length;
  rankerSlides[rankerCurrentSlide].classList.add('active');
  rankerDots[rankerCurrentSlide].classList.add('active');
}

// Auto-advance every 3 seconds
if (rankerSlides.length) {
  setInterval(() => goToSlide(rankerCurrentSlide + 1), 3000);
}
