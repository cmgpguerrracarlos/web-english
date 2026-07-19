const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const accordions = Array.from(document.querySelectorAll("[data-accordion]"));

document.body.classList.add("js-enabled");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

accordions.forEach((accordion, index) => {
  const button = accordion.querySelector(".topic-toggle");
  if (!button) {
    return;
  }

  if (index > 0) {
    accordion.classList.add("is-collapsed");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    accordion.classList.toggle("is-collapsed", isExpanded);
  });
});

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) {
        return;
      }

      navLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${visibleEntry.target.id}`;
        link.classList.toggle("is-active", isMatch);
      });
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.5, 0.8]
    }
  );

  sections.forEach((section) => observer.observe(section));
}
