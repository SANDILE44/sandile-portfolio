// ========================================================
// DEMO.JS
// Sandile SystemsWorks Demo Interface Logic
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================================
  // SIDEBAR MOBILE
  // ========================================================

  const hamburger = document.getElementById("hamburger");
  const sidebar = document.querySelector(".sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
      hamburger.classList.toggle("is-open");
    });
  }

  // ========================================================
  // ACCOUNT MENU
  // ========================================================

  const accountBtn = document.getElementById("accountBtn");
  const accountMenu = document.getElementById("accountMenu");

  if (accountBtn && accountMenu) {
    accountBtn.addEventListener("click", () => {
      accountMenu.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (
        !accountBtn.contains(e.target) &&
        !accountMenu.contains(e.target)
      ) {
        accountMenu.classList.remove("open");
      }
    });
  }

  // ========================================================
  // DEMO DATA
  // ========================================================

  const demoProjects = [
    {
      title: "Construction Profitability Engine",
      description:
        "AI-assisted construction profitability analysis with risk intelligence and cost simulations.",
      profit: 148000,
      roi: 36,
      status: "LIVE"
    },

    {
      title: "Logistics Decision Engine",
      description:
        "Fleet route profitability and delivery contract intelligence platform.",
      profit: 92000,
      roi: 24,
      status: "BETA"
    },

    {
      title: "Enterprise Operations Dashboard",
      description:
        "Business intelligence system with forecasting, exports and operational insights.",
      profit: 212000,
      roi: 41,
      status: "LIVE"
    }
  ];

  // ========================================================
  // RENDER DEMO CARDS
  // ========================================================

  const demoGrid = document.getElementById("demoGrid");

  const money = (value) => {
    return `R ${Number(value).toLocaleString()}`;
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "live":
        return "live";

      case "beta":
        return "beta";

      default:
        return "locked";
    }
  };

  if (demoGrid) {

    demoProjects.forEach((project) => {

      const card = document.createElement("div");
      card.className = "demo-card";

      card.innerHTML = `
        <div class="status-pill ${getStatusClass(project.status)}">
          ${project.status}
        </div>

        <h3>${project.title}</h3>

        <p>${project.description}</p>

        <div class="metric-row">
          <div class="metric-label">Projected Profit</div>
          <div class="metric-value positive">
            ${money(project.profit)}
          </div>
        </div>

        <div class="metric-row">
          <div class="metric-label">ROI</div>
          <div class="metric-value positive">
            ${project.roi}%
          </div>
        </div>

        <button class="demo-btn">
          Launch Demo
        </button>
      `;

      demoGrid.appendChild(card);
    });
  }

  // ========================================================
  // BUTTON INTERACTIONS
  // ========================================================

  document.addEventListener("click", (e) => {

    // Launch Demo
    if (e.target.classList.contains("demo-btn")) {

      showLoader("Launching System...");

      setTimeout(() => {
        hideLoader();

        alert(
          "Demo Preview Loaded Successfully.\n\nThis is a frontend showcase environment."
        );

      }, 1800);
    }

  });

  // ========================================================
  // LOADER SYSTEM
  // ========================================================

  const createLoader = () => {

    const existing = document.querySelector(".loader-overlay");

    if (existing) return existing;

    const overlay = document.createElement("div");
    overlay.className = "loader-overlay";

    overlay.innerHTML = `
      <div class="spinner"></div>
      <div class="loader-text">
        Initializing...
      </div>
    `;

    document.body.appendChild(overlay);

    return overlay;
  };

  const showLoader = (message = "Loading...") => {

    const overlay = createLoader();

    const text = overlay.querySelector(".loader-text");

    if (text) {
      text.textContent = message;
    }

    overlay.style.display = "flex";
  };

  const hideLoader = () => {

    const overlay = document.querySelector(".loader-overlay");

    if (overlay) {
      overlay.style.display = "none";
    }
  };

  // ========================================================
  // FAKE SYSTEM BOOT
  // ========================================================

  showLoader("Booting Sandile SystemsWorks...");

  setTimeout(() => {
    hideLoader();
  }, 1400);

  // ========================================================
  // AUTO YEAR
  // ========================================================

  const yearEl = document.getElementById("currentYear");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
