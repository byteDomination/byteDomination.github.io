const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuIcon = menuButton?.querySelector("svg");

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
  header?.classList.toggle("menu-active", open);

  const icon = menuIcon || menuButton.querySelector("[data-lucide]");
  if (icon) {
    icon.setAttribute("data-lucide", open ? "x" : "menu");
    refreshIcons();
  }
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  revealObserver.observe(element);
});

const clock = document.querySelector("[data-clock]");
const year = document.querySelector("[data-year]");

function updateClock() {
  if (clock) {
    clock.textContent = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}

if (year) year.textContent = new Date().getFullYear();
updateClock();
setInterval(updateClock, 1000);

function startSignalCanvas() {
  const canvas = document.querySelector("[data-signal-canvas]");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const particles = Array.from({ length: 70 }, (_, index) => ({
    angle: (index / 70) * Math.PI * 2,
    radius: 0.12 + Math.random() * 0.36,
    speed: 0.0008 + Math.random() * 0.0018,
    size: 0.7 + Math.random() * 2.1,
    color: index % 6 === 0 ? "#ff4d36" : "#c9ff27",
  }));

  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const maxRadius = Math.min(width, height);

    particles.forEach((particle, index) => {
      particle.angle += particle.speed * 16;
      const wobble = Math.sin(time * 0.0015 + index) * 12;
      const radius = particle.radius * maxRadius + wobble;
      const x = centerX + Math.cos(particle.angle) * radius * 1.65;
      const y = centerY + Math.sin(particle.angle * 1.2) * radius;

      context.beginPath();
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fillStyle = particle.color;
      context.fill();

      if (index % 4 === 0) {
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(x, y);
        context.strokeStyle =
          particle.color === "#ff4d36"
            ? "rgba(255, 77, 54, 0.18)"
            : "rgba(201, 255, 39, 0.13)";
        context.lineWidth = 0.7;
        context.stroke();
      }
    });

    context.beginPath();
    context.arc(centerX, centerY, 8 + Math.sin(time * 0.004) * 3, 0, Math.PI * 2);
    context.fillStyle = "#ffffff";
    context.fill();

    frame = requestAnimationFrame(draw);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    frame = requestAnimationFrame(draw);
  } else {
    draw(0);
    cancelAnimationFrame(frame);
  }
}

window.addEventListener("load", () => {
  refreshIcons();
  startSignalCanvas();
});
