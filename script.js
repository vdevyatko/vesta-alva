const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.querySelector("#catalog-search");
const categoryLinks = document.querySelectorAll("[data-category-link]");

let activeFilter = "all";

function applyCatalogFilter() {
  const query = (searchInput?.value || "").trim().toLowerCase();

  productCards.forEach((card) => {
    const categories = card.dataset.category || "";
    const haystack = `${card.dataset.search || ""} ${card.textContent}`.toLowerCase();
    const categoryMatch = activeFilter === "all" || categories.includes(activeFilter);
    const searchMatch = !query || haystack.includes(query);

    card.classList.toggle("hidden", !(categoryMatch && searchMatch));
  });
}

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyCatalogFilter();
  });
});

categoryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const filter = link.dataset.categoryLink;
    const button = document.querySelector(`[data-filter="${filter}"]`);

    if (button) {
      activeFilter = filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      applyCatalogFilter();
    }
  });
});

searchInput?.addEventListener("input", applyCatalogFilter);

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("sent");

    const button = form.querySelector("button");
    if (button) {
      const original = button.textContent;
      button.textContent = "Заявка подготовлена";
      window.setTimeout(() => {
        button.textContent = original;
        form.classList.remove("sent");
      }, 2200);
    }
  });
});
