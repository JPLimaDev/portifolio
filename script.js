const projetos = [
  {
    tipo: "dados",
    titulo: "Análise de Dados: Café",
    desc: "Miniprojeto de exploração e visualização de dados sobre café em Jupyter Notebook.",
    tags: ["Python", "Pandas", "Jupyter"],
    link: "https://github.com/JPLimaDev/miniprojeto-cafe"
  },
  {
    tipo: "dados",
    titulo: "Análise de Vendas",
    desc: "KPIs, sazonalidade e ranking de produtos para entender quais itens geram mais receita.",
    tags: ["SQL", "Python", "Power BI"],
    link: ""
  },
  {
    tipo: "dados",
    titulo: "Análise Epidemiológica",
    desc: "Séries temporais e comparação entre períodos e regiões para explorar tendências.",
    tags: ["Python", "Pandas"],
    link: ""
  },
  {
    tipo: "dev",
    titulo: "Pata Amiga",
    desc: "Aplicativo offline-first de gestão veterinária, com sincronização para backend, desenvolvido como TCC.",
    tags: ["React Native", "Expo", "SQLite", "Django"],
    link: ""
  },
  {
    tipo: "dev",
    titulo: "Sistema de Notificações",
    desc: "Serviço assíncrono para entrega de mensagens ao Rocket.Chat.",
    tags: ["FastAPI", "Redis Streams", "Pydantic"],
    link: ""
  },
  {
    tipo: "dev",
    titulo: "Pipeline RAG com n8n",
    desc: "Ingestão de PDFs e agente de IA que responde pelo Rocket.Chat.",
    tags: ["n8n", "Gemini", "PGVector"],
    link: ""
  }
];

const stack = [
  "SQL", "Python", "Pandas", "Power BI", "Excel", "Estatística", "Git",
  "GitHub", "Django REST", "FastAPI", "React Native", "PostgreSQL",
  "Redis", "n8n", "Docker"
];

const contatos = [
  {
    nome: "WhatsApp",
    valor: "(82) 98739-3901",
    url: "https://wa.me/5582987393901",
    icone: '<path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.3a8.5 8.5 0 1 1 15.6-4.5Z"></path><path d="M9 8.5c.3 2.9 2.6 5.2 5.5 5.5l1-1.4-2-1-1 .8a3.7 3.7 0 0 1-1.9-1.9l.8-1-1-2Z"></path>'
  },
  {
    nome: "LinkedIn",
    valor: "in/joão-paulo-jp",
    url: "https://www.linkedin.com/in/jo%C3%A3o-paulo-jp-363415248",
    icone: '<rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"></path>'
  },
  {
    nome: "GitHub",
    valor: "@JPLimaDev",
    url: "https://github.com/JPLimaDev",
    icone: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path>'
  }
];

const redes = contatos.filter(contato => contato.nome !== "WhatsApp");

const grid = document.getElementById("grid");
const tags = document.getElementById("tags");
const iconArrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"></path></svg>';

function criarTag(texto) {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = texto;
  return tag;
}

function renderProjetos(filtro = "todos") {
  grid.replaceChildren();
  const filtrados = projetos.filter(projeto => filtro === "todos" || projeto.tipo === filtro);

  filtrados.forEach(projeto => {
    const card = document.createElement("article");
    card.className = "card";

    const topo = document.createElement("div");
    topo.className = "card-top";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = projeto.tipo === "dados" ? "Dados" : "Desenvolvimento";
    const numero = document.createElement("span");
    numero.className = "card-number";
    numero.textContent = String(projetos.indexOf(projeto) + 1).padStart(2, "0");
    topo.append(badge, numero);

    const titulo = document.createElement("h3");
    titulo.textContent = projeto.titulo;
    const descricao = document.createElement("p");
    descricao.textContent = projeto.desc;
    const listaTags = document.createElement("div");
    listaTags.className = "tags";
    projeto.tags.forEach(tag => listaTags.append(criarTag(tag)));
    card.append(topo, titulo, descricao, listaTags);

    if (isSafeExternalUrl(projeto.link)) {
      const link = document.createElement("a");
      link.className = "card-link";
      link.href = projeto.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.append(document.createTextNode("Ver projeto "), document.createRange().createContextualFragment(iconArrow));
      card.append(link);
    }

    grid.append(card);
  });
}

function isSafeExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

renderProjetos();
tags.replaceChildren(...stack.map(criarTag));

document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    const filtroAtivo = document.querySelector(".filtro.ativo");
    filtroAtivo?.classList.remove("ativo");
    filtroAtivo?.setAttribute("aria-pressed", "false");
    botao.classList.add("ativo");
    botao.setAttribute("aria-pressed", "true");
    renderProjetos(botao.dataset.f);
  });
});

const contactList = document.getElementById("contact-list");
contatos.filter(contato => isSafeExternalUrl(contato.url)).forEach(contato => {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.className = "contact-item";
  link.href = contato.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.innerHTML = `<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true">${contato.icone}</svg>`;

  const textos = document.createElement("span");
  const nome = document.createElement("span");
  nome.className = "contact-name";
  nome.textContent = contato.nome;
  const valor = document.createElement("span");
  valor.className = "contact-value";
  valor.textContent = contato.valor;
  textos.append(nome, valor);

  link.append(textos, document.createRange().createContextualFragment(iconArrow));
  item.append(link);
  contactList.append(item);
});

const socialLinks = document.getElementById("social-links");
redes.filter(rede => isSafeExternalUrl(rede.url)).forEach(rede => {
  const link = document.createElement("a");
  link.href = rede.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = rede.nome;
  socialLinks.append(link);
});

document.getElementById("ano").textContent = new Date().getFullYear();

const raiz = document.documentElement;
const botaoTema = document.getElementById("tema");
let temaSalvo;
try {
  temaSalvo = localStorage.getItem("tema");
} catch (error) {
  temaSalvo = null;
}

const temaInicial = temaSalvo === "escuro" || temaSalvo === "claro"
  ? temaSalvo
  : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro");

function definirTema(tema) {
  raiz.dataset.tema = tema;
  const escuro = tema === "escuro";
  botaoTema.setAttribute("aria-pressed", String(escuro));
  botaoTema.setAttribute("aria-label", escuro ? "Alternar para tema claro" : "Alternar para tema escuro");
  botaoTema.innerHTML = escuro
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"></path></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>';
}

definirTema(temaInicial);
botaoTema.addEventListener("click", () => {
  const novoTema = raiz.dataset.tema === "escuro" ? "claro" : "escuro";
  definirTema(novoTema);
  try {
    localStorage.setItem("tema", novoTema);
  } catch (error) {
    // O tema continua funcional durante esta visita, mesmo sem armazenamento disponível.
  }
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function fecharMenu() {
  navLinks.classList.remove("aberto");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const aberto = menuToggle.getAttribute("aria-expanded") !== "true";
  navLinks.classList.toggle("aberto", aberto);
  menuToggle.setAttribute("aria-expanded", String(aberto));
  menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", fecharMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") fecharMenu();
});
