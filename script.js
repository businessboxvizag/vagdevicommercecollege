document.addEventListener("DOMContentLoaded", function(){

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
function reveal(){
  const elements = document.querySelectorAll(
    ".hero, .hero-left, .hero-right, .programs, .program-card, .achievements, .achieve-card, .features, .feature-card, .campus, .counselling, .cta, .footer"
  );

  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const visible = 120;

    if(elementTop < windowHeight - visible){
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    } else {
      el.style.opacity = "0";
      el.style.transform = "translateY(60px)";
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


/* =========================
   NAV ACTIVE CLICK
========================= */
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", function(){
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});


/* =========================
   BUTTON RIPPLE EFFECT
========================= */
const buttons = document.querySelectorAll("button");

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
});

function scrollToSection(id){
  const section = document.getElementById(id);

  if(section){
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}