const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-30% 0px -60% 0px" });

sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("leadForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const interesse = document.getElementById("interesse").value;

  const message = [
    "Olá, VS Automóveis! Vim pelo site.",
    `Nome: ${nome}`,
    `Telefone/WhatsApp: ${telefone}`,
    email ? `E-mail: ${email}` : "",
    `Interesse: ${interesse}`
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/5595981086962?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
});
