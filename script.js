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
    ".programs, .program-card, .youtube-section, .video-card, .features, .feature-card, .campus, .counselling, .footer"
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
/* ===== DOUBLE SLIDER ===== */

const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {
  const slides = slider.querySelectorAll(".slide");
  let index = 0;

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
  let bgIndex = 0;

  setInterval(() => {
    bgSlides[bgIndex].classList.remove("active");
    bgIndex = (bgIndex + 1) % bgSlides.length;
    bgSlides[bgIndex].classList.add("active");
  }, 4000);
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
let popup = document.getElementById("popup");
let closeBtn = document.querySelector(".close-popup");

if (popup && closeBtn) {
  // FUNCTION TO SHOW POPUP
  function showPopup(){
    popup.style.display = "flex";
  }

  // FUNCTION TO HIDE POPUP
  function hidePopup(){
    popup.style.display = "none";
  }

  // SHOW EVERY 5 SECONDS
  setInterval(showPopup, 20000);

  // CLOSE BUTTON
  closeBtn.onclick = function(){
    hidePopup();
  }
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
