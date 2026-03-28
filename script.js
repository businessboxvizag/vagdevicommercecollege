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
