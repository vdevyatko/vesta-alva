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

const fieldLabels = {
  company: "Компания",
  contact: "Контактное лицо",
  phone_or_email: "Телефон или email",
  interest: "Интерес",
  comment: "Комментарий",
  email: "Email для прайса",
};

function buildMailtoLink(form) {
  const recipient = form.dataset.emailTo || "irina@vesta-alva.ru";
  const subject = form.dataset.emailSubject || "Заявка с сайта Vesta Alva";
  const formData = new FormData(form);
  const bodyLines = ["Здравствуйте!", "", "Новая заявка с сайта Vesta Alva:", ""];

  formData.forEach((value, key) => {
    const text = String(value).trim();

    if (text) {
      bodyLines.push(`${fieldLabels[key] || key}: ${text}`);
    }
  });

  bodyLines.push("", `Страница: ${window.location.href}`);

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const button = form.querySelector("button");
    const originalText = button?.textContent;

    if (button) {
      button.textContent = "Открыть почту";
    }

    window.location.href = buildMailtoLink(form);

    window.setTimeout(() => {
      if (button && originalText) {
        button.textContent = originalText;
      }
    }, 1600);
  });
});
