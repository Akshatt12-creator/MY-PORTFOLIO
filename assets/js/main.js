const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const navMenu = $("#nav-menu");
const navToggle = $("#nav-toggle");
const navLinks = $$(".nav__link");
const header = $("#header");
const progressBar = $("#progress-bar");
const cursorGlow = $("#cursor-glow");
const themeToggle = $("#theme-toggle");
const loader = $("#loader");
const contactForm = $("#contact-form");
const contactButton = $("#contact-button");
const toast = $("#toast");

const savedTheme = localStorage.getItem("akshat-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark-theme");
}

const EMAILJS_PUBLIC_KEY = "FrWoTYMUexJvjTe2n";
const EMAILJS_SERVICE_ID = "service_jokyi3k";
const EMAILJS_TEMPLATE_ID = "template_gnifejk";

// EmailJS initialization: connects the browser SDK to your EmailJS account.
if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

window.addEventListener("load", () => {
  loader.classList.add("hide");
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show-menu");
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("akshat-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");

  if (window.gsap) {
    gsap.fromTo(themeToggle, { rotate: -20, scale: .9 }, { rotate: 0, scale: 1, duration: .45, ease: "back.out(2)" });
  }
});

const showToast = (message, type = "success") => {
  if (!toast) return;

  const icon = $("i", toast);
  const text = $("span", toast);

  toast.classList.remove("show", "error");
  toast.classList.toggle("error", type === "error");
  icon.className = type === "error" ? "ri-error-warning-line" : "ri-checkbox-circle-line";
  text.textContent = message;

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3600);
};

if (contactForm && contactButton) {
  const buttonLabel = $("span", contactButton);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (!window.emailjs) {
      showToast("Email service is still loading. Please try again.", "error");
      return;
    }

    contactButton.classList.add("is-sending");
    contactButton.disabled = true;
    buttonLabel.textContent = "Sending...";

    // Form submission logic: sends all named form fields through the configured EmailJS template.
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        // Success handling: notify the user and clear the form for the next message.
        showToast("Message sent successfully. I will get back to you soon.", "success");
        contactForm.reset();
      })
      .catch(() => {
        // Error handling: keep the typed message intact and show a clear retry prompt.
        showToast("Message failed to send. Please try again in a moment.", "error");
      })
      .finally(() => {
        contactButton.classList.remove("is-sending");
        contactButton.disabled = false;
        buttonLabel.textContent = "Send Message";
      });
  });
}

const updateScrollUI = () => {
  const scrollY = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? scrollY / pageHeight : 0;

  header.classList.toggle("scroll-header", scrollY >= 40);
  progressBar.style.transform = `scaleX(${progress})`;
};

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const sections = $$("section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const id = entry.target.getAttribute("id");
    navLinks.forEach((link) => {
      link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
    });
  });
}, { rootMargin: "-42% 0px -54% 0px", threshold: 0 });

sections.forEach((section) => observer.observe(section));

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.transform = `translate(${event.clientX - 120}px, ${event.clientY - 120}px)`;
  }, { passive: true });
}

const particles = $("#particles");
const particleCount = window.innerWidth < 768 ? 18 : 34;

for (let i = 0; i < particleCount; i += 1) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.setProperty("--x", `${Math.random() * 100}%`);
  particle.style.setProperty("--y", `${Math.random() * 100}%`);
  particle.style.setProperty("--size", `${Math.random() * 5 + 3}px`);
  particle.style.setProperty("--speed", `${Math.random() * 4 + 4}s`);
  particles.appendChild(particle);
}

if (window.Typed) {
  new Typed("#typed", {
    strings: ["AI Systems", "NLP", "Full Stack Apps", "Generative AI", "Scalable Platforms"],
    typeSpeed: 48,
    backSpeed: 28,
    backDelay: 1300,
    loop: true
  });
}

if (window.anime) {
  anime({
    targets: "#morph-shape",
    d: [
      { value: "M423.5 95.5C484.5 135.1 527.2 203.8 518.6 268.6C510.1 333.4 450.2 394.4 387.9 441.5C325.6 488.7 260.8 522.1 201.3 500.3C141.8 478.6 87.5 401.7 70.8 321.2C54.1 240.7 75 156.5 128.2 108.8C181.4 61.1 266.9 50 339.9 60.5C412.9 71 362.5 55.9 423.5 95.5Z" },
      { value: "M438.5 122.4C506.5 175.8 536.1 264.1 501.3 336.5C466.5 408.9 367.3 465.3 279.8 477.1C192.3 488.8 116.4 455.9 83.1 391.4C49.7 326.9 58.9 230.7 110.8 158.1C162.7 85.4 257.3 36.1 328.7 51.2C400.2 66.2 370.4 69 438.5 122.4Z" },
      { value: "M418.2 80.5C493.8 114.3 545.8 195.6 534.3 278.6C522.8 361.7 447.9 446.4 361.3 489.3C274.8 532.3 176.7 533.5 114.6 480.6C52.5 427.8 26.4 320.9 55.1 231.1C83.8 141.2 167.4 68.2 250.6 52.2C333.8 36.2 342.5 46.7 418.2 80.5Z" }
    ],
    duration: 9000,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true
  });
}

if (window.Swiper) {
  new Swiper(".project-swiper", {
    loop: true,
    grabCursor: true,
    centeredSlides: false,
    spaceBetween: 18,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".project-swiper__button--next",
      prevEl: ".project-swiper__button--prev"
    },
    autoplay: {
      delay: 4200,
      disableOnInteraction: false
    },
    breakpoints: {
      576: { slidesPerView: 1.25 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  });
}

if (window.ScrollReveal) {
  const sr = ScrollReveal({
    distance: "36px",
    duration: 850,
    easing: "cubic-bezier(.2,.65,.2,1)",
    interval: 90,
    reset: false
  });

  sr.reveal(".section__header, .hero__content", { origin: "bottom" });
  sr.reveal(".hero__visual", { origin: "right", delay: 120 });
  sr.reveal(".glass, .education__card, .timeline__item", { origin: "bottom" });
}

const magneticItems = $$(".magnetic");

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * .12}px, ${y * .18}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

const tiltCards = $$(".project-card, .tilt");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - .5) * 10;
    const rotateX = ((y / rect.height) - .5) * -10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

if (window.gsap) {
  gsap.to(".hero__blob--one", {
    x: 80,
    y: 40,
    scale: 1.12,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".hero__blob--two", {
    x: -70,
    y: -45,
    scale: .92,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}
