const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const accordions = Array.from(document.querySelectorAll("[data-accordion]"));
const assessment = document.querySelector("[data-assessment]");

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

if (assessment) {
  assessment.addEventListener("submit", (event) => {
    event.preventDefault();

    const result = assessment.querySelector("[data-assessment-result]");
    const answers = new FormData(assessment);
    const values = Array.from({ length: 6 }, (_, index) => answers.get(`q${index + 1}`));

    if (values.some((value) => value === null)) {
      result.innerHTML = "<p><strong>Complete all six questions</strong> so the recommendation reflects every skill.</p>";
      result.classList.add("is-visible");
      return;
    }

    const score = values.reduce((total, value) => total + Number(value), 0);
    const isAdvancedRoute = score >= 4;
    const routeName = isAdvancedRoute ? "B2 to C1" : "B1 to B2";
    const target = isAdvancedRoute ? "reading" : "grammar";
    const reason = isAdvancedRoute
      ? "Your answers show solid control of explicit meaning. Focus next on nuance, register, and supported argument."
      : "Your answers suggest that stronger control and reusable patterns will create the best foundation for advanced work.";

    result.innerHTML = `
      <p><strong>Recommended route: ${routeName}</strong></p>
      <p>${reason}</p>
      <a href="#${target}">Start with ${isAdvancedRoute ? "Reading" : "Grammar"}</a>
    `;
    result.classList.add("is-visible");
  });
}

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
