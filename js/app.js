document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const btn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

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

  menu?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;

      const menuOpen = menu?.classList.contains("is-open");

      if (currentScroll <= 10) {
        header?.classList.remove("header-hidden");
        lastScroll = currentScroll;
        return;
      }

      if (!menuOpen) {
        if (currentScroll > lastScroll) {
          header?.classList.add("header-hidden");
        } else {
          header?.classList.remove("header-hidden");
        }
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );

  const cineElements = document.querySelectorAll(".btn-descubre.cine, .btn-descubre.cine-pro");

  if (cineElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cineElements.forEach((el) => observer.observe(el));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => obs.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {

  const footer = document.querySelector(".footer");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("visible");
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(footer);

});

document.addEventListener("DOMContentLoaded", () => {
  const trioFilter = document.querySelector("#filtro-trio");
  const table = document.querySelector("#tabla-repertorio");
  const emptyState = document.querySelector("#repertorio-sin-resultados");

  if (!trioFilter || !table) return;

  const rows = Array.from(table.querySelectorAll("tbody tr"));

  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const getUniqueValues = (columnIndex) => {
    const seen = new Set();

    rows.forEach((row) => {
      const cellText = row.querySelectorAll("td")[columnIndex]?.textContent || "";
      const value = cellText.trim();
      if (value) seen.add(value);
    });

    return Array.from(seen).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));
  };

  const populateTrioOptions = () => {
    const options = getUniqueValues(1);

    trioFilter.innerHTML = "";

    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = "Todos los trios";
    trioFilter.appendChild(allOption);

    options.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      trioFilter.appendChild(option);
    });
  };

  const applyFilter = () => {
    const query = normalize(trioFilter.value);

    let visibleRows = 0;

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const cellText = normalize(cells[1]?.textContent || "");
      const matches = query === "" || cellText === query;

      row.style.display = matches ? "" : "none";
      if (matches) visibleRows += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleRows !== 0;
    }
  };

  trioFilter.addEventListener("change", applyFilter);

  populateTrioOptions();
  applyFilter();
});