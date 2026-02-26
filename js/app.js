document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const btn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  /* ========= HAMBURGUESA ========= */
  const openMenu = () => {
    btn.classList.add("is-open");
    menu.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    btn.classList.remove("is-open");
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn?.addEventListener("click", () => {
    const isOpen = menu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Cierra el menú al hacer click en un link
  menu?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeMenu();
  });

  // Cierra con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ========= HEADER DESAPARECE AL BAJAR ========= */
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;

      // si el menú está abierto en móvil, no escondas el header (para que no se pierda)
      const menuOpen = menu?.classList.contains("is-open");

      if (currentScroll <= 10) {
        header?.classList.remove("header-hidden");
        lastScroll = currentScroll;
        return;
      }

      if (!menuOpen) {
        if (currentScroll > lastScroll) {
          header?.classList.add("header-hidden"); // baja → desaparece
        } else {
          header?.classList.remove("header-hidden"); // sube → aparece
        }
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );

  /* ========= EFECTO CINE ========= */
  const cineElements = document.querySelectorAll(".btn-descubre.cine, .btn-descubre.cine-pro");

  if (cineElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // se anima solo una vez
          }
        });
      },
      { threshold: 0.2 }
    );

    cineElements.forEach((el) => observer.observe(el));
  }
});