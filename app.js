"use strict";

const companies = {
  nvidia: {
    name: "NVIDIA",
    role: "Sells the chips and systems other labs train on. NVIDIA does not make ChatGPT, Claude, Gemini, or Grok."
  },
  openai: {
    name: "OpenAI",
    role: "Builds the models behind ChatGPT. It rents other companies’ computers. It does not design the chip in this drawing."
  },
  anthropic: {
    name: "Anthropic",
    role: "Builds Claude. Its announced primary cloud is Amazon Web Services, with Trainium and Inferentia used beside chips it already had."
  },
  google: {
    name: "Google and DeepMind",
    role: "One company designs Gemini, runs the products people already use, and builds its own data-center chip. It also rents NVIDIA GPUs on Google Cloud."
  },
  xai: {
    name: "xAI and X",
    role: "xAI builds Grok. X is the social network, formerly Twitter. X is distribution, not a chip. Since February 2026, SpaceX owns the lab."
  }
};

const nodes = {
  "openai-product": { born: 2022, labels: [{ from: 2015, text: "Research releases" }, { from: 2022, text: "ChatGPT" }] },
  "anthropic-product": { born: 2023, labels: [{ from: 2021, text: "Research systems" }, { from: 2023, text: "Claude" }] },
  "google-product": { born: 1998, labels: [{ from: 1998, text: "Search and products" }, { from: 2023, text: "Gemini" }] },
  "xai-product": { born: 2022, labels: [{ from: 2022, text: "Twitter, then X" }, { from: 2023, text: "Grok on X" }] },
  "openai-lab": { born: 2015, labels: [{ from: 2015, text: "OpenAI" }] },
  "anthropic-lab": { born: 2021, labels: [{ from: 2021, text: "Anthropic" }] },
  "google-lab": {
    born: 1998,
    labels: [
      { from: 1998, text: "Google" },
      { from: 2010, text: "DeepMind is separate" },
      { from: 2014, text: "DeepMind at Google" },
      { from: 2023, text: "Google DeepMind" }
    ]
  },
  "xai-lab": { born: 2023, labels: [{ from: 2023, text: "xAI" }] },
  "openai-cloud": { born: 2015, labels: [{ from: 2015, text: "Research compute" }, { from: 2019, text: "Microsoft Azure" }] },
  "anthropic-cloud": { born: 2021, labels: [{ from: 2021, text: "Rented compute" }, { from: 2023, text: "AWS" }] },
  "google-cloud": { born: 1998, labels: [{ from: 1998, text: "Google data centers" }, { from: 2016, text: "Google Cloud" }] },
  "xai-cloud": { born: 2023, labels: [{ from: 2023, text: "NVIDIA clusters" }] },
  gpu: { born: 1993, labels: [{ from: 1993, text: "Graphics chips" }, { from: 1999, text: "NVIDIA GPU" }] },
  trainium: { born: 2022, labels: [{ from: 2022, text: "AWS Trainium" }] },
  tpu: { born: 2016, labels: [{ from: 2016, text: "Google Cloud TPU" }] }
};

const links = [
  { from: "openai-product", to: "openai-lab", companies: ["openai"], start: 2022 },
  { from: "openai-lab", to: "openai-cloud", companies: ["openai"], start: 2015 },
  { from: "openai-cloud", to: "gpu", companies: ["openai", "nvidia"], start: 2015 },
  { from: "anthropic-product", to: "anthropic-lab", companies: ["anthropic"], start: 2023 },
  { from: "anthropic-lab", to: "anthropic-cloud", companies: ["anthropic"], start: 2021 },
  { from: "anthropic-cloud", to: "trainium", companies: ["anthropic"], start: 2023 },
  { from: "anthropic-cloud", to: "gpu", companies: ["anthropic", "nvidia"], start: 2021, dashed: true },
  { from: "google-product", to: "google-lab", companies: ["google"], start: 1998 },
  { from: "google-lab", to: "google-cloud", companies: ["google"], start: 1998 },
  { from: "google-cloud", to: "tpu", companies: ["google"], start: 2016 },
  { from: "google-cloud", to: "gpu", companies: ["google", "nvidia"], start: 2016, dashed: true },
  { from: "xai-product", to: "xai-lab", companies: ["xai"], start: 2023 },
  { from: "xai-lab", to: "xai-cloud", companies: ["xai"], start: 2023 },
  { from: "xai-cloud", to: "gpu", companies: ["xai", "nvidia"], start: 2023 }
];

const events = [
  { id: "nv-1993", year: 1993, month: 4, company: "nvidia", label: "NVIDIA founded", text: "Founded on April 5, 1993, by Jensen Huang, Chris Malachowsky, and Curtis Priem. NVIDIA’s timeline says the aim was 3D graphics for games and multimedia." },
  { id: "g-1998", year: 1998, month: 9, company: "google", label: "Google founded", text: "Google is founded in 1998 by Larry Page and Sergey Brin. It is a product company. It is not yet an AI lab, and the TPU does not exist." },
  { id: "nv-1999", year: 1999, month: 1, company: "nvidia", label: "The GPU", text: "NVIDIA says it invented the GPU in 1999. The name marked a graphics chip that could take on more of the drawing. A separate CPU still ran the computer." },
  { id: "nv-2006", year: 2006, month: 1, company: "nvidia", label: "CUDA", text: "CUDA opened the GPU’s parallel processors to science, not only to games. That software path is why later labs could train neural networks on NVIDIA hardware without writing graphics code." },
  { id: "g-2010", year: 2010, month: 1, company: "google", label: "DeepMind founded", text: "DeepMind is founded in London by Demis Hassabis, Shane Legg, and Mustafa Suleyman. It is independent. Google has not bought it." },
  { id: "nv-2012", year: 2012, month: 1, company: "nvidia", label: "AlexNet on GPUs", text: "AlexNet, a 2012 neural network trained on GPUs, became a marker of the current deep-learning boom. NVIDIA’s timeline treats that result as the start of its AI era. The research was the scientists’ work. The chips were NVIDIA’s." },
  { id: "g-2014", year: 2014, month: 1, company: "google", label: "Google acquires DeepMind", text: "Google acquires DeepMind in 2014. The lab keeps working inside the larger company. It is not yet merged with Google Brain." },
  { id: "o-2015", year: 2015, month: 12, company: "openai", label: "OpenAI founded", text: "Announced on December 11, 2015, as a nonprofit. Sam Altman and Elon Musk were co-chairs. Ilya Sutskever was research director. Greg Brockman was CTO. The founding post said the lab wanted digital intelligence that benefits people, without having to make a financial return." },
  { id: "g-2016a", year: 2016, month: 3, company: "google", label: "AlphaGo", text: "In March 2016, DeepMind’s AlphaGo defeats Lee Sedol at Go. It is a public demonstration, not a consumer chat product." },
  { id: "g-2016b", year: 2016, month: 5, company: "google", label: "TPU is public", text: "Google discusses its Tensor Processing Unit in 2016. It is a data-center accelerator for neural-network math. It is not an NVIDIA GPU, and it is not the Tensor chip that later sits inside Pixel phones." },
  { id: "g-2017", year: 2017, month: 6, company: "google", label: "Transformer paper", text: "In 2017, Vaswani and colleagues at Google publish Attention Is All You Need. The Transformer architecture spreads far outside Google. Later chat models, including GPT, descend from this paper. The paper itself is not a product." },
  { id: "o-2018", year: 2018, month: 2, company: "openai", label: "Musk leaves the board", text: "Musk leaves OpenAI’s board in 2018. He later founds xAI. This map does not try to settle the argument about OpenAI’s mission. OpenAI’s legal form has also changed since the 2015 nonprofit post. Use the company’s current about page for who owns it today." },
  { id: "a-2021", year: 2021, month: 5, company: "anthropic", label: "Anthropic announced", text: "On May 28, 2021, Anthropic announces a research company led by Dario Amodei, CEO, and Daniela Amodei, president. The post describes systems meant to be steerable, interpretable, and robust. Several of the people had worked at OpenAI." },
  { id: "x-2022", year: 2022, month: 10, company: "xai", label: "Twitter deal closes", text: "Musk’s purchase of Twitter closes in October 2022. The figure widely reported was about $44 billion. The service is a social network. xAI does not exist yet, and this network is not a training chip." },
  { id: "o-2022", year: 2022, month: 11, company: "openai", label: "ChatGPT", text: "ChatGPT opens to the public on November 30, 2022. When people say OpenAI, they usually mean this product or the models behind it. In this map the training hardware is NVIDIA GPUs, reached largely through Microsoft Azure." },
  { id: "g-2023", year: 2023, month: 4, company: "google", label: "Google DeepMind", text: "On April 20, 2023, Google combines DeepMind with the Brain team from Google Research. Demis Hassabis leads the unit, called Google DeepMind. Gemini is the model family Google then puts in its products. The company both designs TPUs and offers NVIDIA GPUs through Google Cloud." },
  { id: "a-2023", year: 2023, month: 9, company: "anthropic", label: "Claude and AWS", text: "Claude is the product people use. In September 2023 Anthropic says Amazon will invest up to $4 billion, AWS will be the primary cloud for mission-critical work, and future models will train and run on Trainium and Inferentia in addition to existing solutions. Google has also invested. The solid line is the AWS chip path. The dashed line is the NVIDIA hardware AWS still rents." },
  { id: "x-2023", year: 2023, month: 7, company: "xai", label: "xAI, X, and Grok", text: "In July 2023 Musk announces xAI. The network is renamed X. Grok is the chatbot on that network. The training path drawn here is NVIDIA hardware in xAI’s own clusters." },
  { id: "x-2025", year: 2025, month: 3, company: "xai", label: "xAI acquires X", text: "On March 28, 2025, Musk says xAI has acquired X so the two can combine data, models, compute, distribution, and talent. He states values of $80 billion for xAI and $33 billion for X. Reuters reports that the $45 billion headline includes $12 billion of debt. X is still a network, not a chip." },
  { id: "x-2026", year: 2026, month: 2, company: "xai", label: "SpaceX acquires xAI", text: "On February 2, 2026, Musk says SpaceX has acquired xAI. Reuters reports values of $1 trillion for SpaceX and $250 billion for xAI, citing a person familiar with the matter. A February 5 Reuters report says xAI remains a wholly owned subsidiary and still runs X and Grok. Data centers in orbit are a stated ambition in that coverage, not a finished machine on this drawing." },
  { id: "nv-2026", year: 2026, month: 10, company: "nvidia", label: "Still the shared chip", text: "NVIDIA still sells the GPU systems the other labs buy or rent. The job on this drawing is unchanged: parallel math, Tensor Cores for the matrix work, and CUDA as the software path. New product generations do not make it a different kind of company, and this map does not rank chips by speed." },
  { id: "o-2026", year: 2026, month: 10, company: "openai", label: "ChatGPT’s hardware path", text: "ChatGPT is still the product people meet. The hardware path drawn here is still NVIDIA GPUs, largely through Microsoft Azure. OpenAI’s ownership structure has changed more than once since 2015. Use the company’s current about page before treating any one description of that structure as final." },
  { id: "a-2026", year: 2026, month: 10, company: "anthropic", label: "Claude’s chip path", text: "Claude is still the product. The diagram keeps the September 2023 path: AWS as the primary cloud, Trainium and Inferentia beside chips Anthropic already used. Later funding announcements are left off the drawing. The chip relationship is the point." },
  { id: "g-2026", year: 2026, month: 10, company: "google", label: "Gemini, TPU, and GPUs", text: "Gemini is the model family in Google’s products, and Google DeepMind is the lab. TPUs remain Google’s own accelerator. Google Cloud also offers NVIDIA GPUs. Both lines stay on the drawing." }
].sort((a, b) => a.year - b.year || a.month - b.month);

const state = { mode: "map", company: "openai", year: 2026, eventId: "o-2026", chip: "gpu" };

const panel = document.getElementById("panel");
const yearInput = document.getElementById("year");
const yearOut = document.getElementById("year-out");
const eventsEl = document.getElementById("events");
const stack = document.getElementById("stack");
const wires = document.getElementById("wires");

function labelFor(id) {
  const node = nodes[id];
  const applicable = node.labels.filter((item) => state.year >= item.from);
  const chosen = applicable.length ? applicable[applicable.length - 1] : node.labels[0];
  const future = state.year < node.born;
  return { text: chosen.text, future };
}

function nodeClass(id, meta) {
  if (meta.future) return "node is-future";
  const touched = links.filter((link) => state.year >= link.start && link.companies.includes(state.company) && (link.from === id || link.to === id));
  if (touched.some((link) => !link.dashed)) return "node is-hot";
  if (touched.some((link) => link.dashed)) return "node is-also";
  return "node is-dim";
}

function linkClass(link) {
  if (state.year < link.start) return "hide";
  const on = link.companies.includes(state.company);
  if (!on) return "hide";
  if (link.dashed) return "dash-hot";
  return "hot";
}

function latestEvent() {
  if (state.eventId) {
    const chosen = events.find((event) => event.id === state.eventId);
    if (chosen && chosen.company === state.company && chosen.year <= state.year) return chosen;
  }
  const upToYear = events.filter((event) => event.company === state.company && event.year <= state.year);
  return upToYear[upToYear.length - 1] || null;
}

function renderPanel() {
  const company = companies[state.company];
  const current = latestEvent();
  const born = Math.min(...events.filter((event) => event.company === state.company).map((event) => event.year));
  const note = state.year < born
    ? `<p><strong>${state.year}.</strong> ${company.name} is not on this map yet.</p>`
    : "";
  const body = current
    ? `<p><strong>${current.year}.</strong> ${current.text}</p>`
    : "";
  const items = events.filter((event) => event.company === state.company).map((event) => {
    const currentAttr = current && event.id === current.id ? ' aria-current="true"' : "";
    const ahead = event.year > state.year ? "is-ahead" : "";
    return `<li><button type="button" class="${ahead}" data-event="${event.id}"${currentAttr}>${event.year} · ${event.label}</button></li>`;
  }).join("");
  panel.innerHTML = `<p class="kicker">${state.year}</p><h2>${company.name}</h2><p class="role"><strong>As of October 2026.</strong> ${company.role}</p>${note}${body}<ol class="timeline">${items}</ol><p class="sources">The full source list is below the timeline.</p>`;
}

function renderNodes() {
  document.querySelectorAll(".node").forEach((button) => {
    const id = button.dataset.node;
    const meta = labelFor(id);
    button.className = nodeClass(id, meta);
    button.innerHTML = `${meta.text}${meta.future ? "<small>Not yet</small>" : ""}`;
  });
  document.querySelectorAll(".companies button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.company === state.company));
  });
}

function renderEvents() {
  const current = latestEvent();
  eventsEl.innerHTML = events.map((event) => {
    const on = current && event.id === current.id ? ' aria-current="true"' : "";
    const ahead = event.year > state.year ? "is-ahead" : "";
    return `<button type="button" class="${ahead}" data-event="${event.id}"${on}>${event.year} ${event.label}</button>`;
  }).join("");
}

function renderModes() {
  const chips = state.mode === "chips";
  document.getElementById("map").hidden = chips;
  document.getElementById("chips").hidden = !chips;
  document.getElementById("mode-map").setAttribute("aria-pressed", String(!chips));
  document.getElementById("mode-chips").setAttribute("aria-pressed", String(chips));
  document.querySelectorAll(".chip-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.chip === state.chip));
  });
  document.querySelectorAll("#diff [data-col]").forEach((cell) => {
    cell.classList.toggle("is-col", cell.dataset.col === state.chip);
  });
}

function drawWires() {
  const box = stack.getBoundingClientRect();
  wires.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  wires.replaceChildren();
  const ns = "http://www.w3.org/2000/svg";
  links.forEach((link) => {
    const kind = linkClass(link);
    if (kind === "hide") return;
    const from = stack.querySelector(`[data-node="${link.from}"]`);
    const to = stack.querySelector(`[data-node="${link.to}"]`);
    if (!from || !to) return;
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    const x1 = a.left + a.width / 2 - box.left;
    const y1 = a.bottom - box.top;
    const x2 = b.left + b.width / 2 - box.left;
    const y2 = b.top - box.top;
    const mid = (y1 + y2) / 2;
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`);
    path.setAttribute("class", `wire ${kind}`);
    wires.appendChild(path);
  });
}

function render() {
  yearInput.value = String(state.year);
  yearOut.textContent = String(state.year);
  renderModes();
  renderNodes();
  renderEvents();
  renderPanel();
  if (state.mode === "map") requestAnimationFrame(() => {
    drawWires();
    const scroller = document.querySelector(".stack-scroll");
    document.querySelector(".hint").hidden = scroller.scrollWidth <= scroller.clientWidth + 2;
  });
  const next = `#${state.company}`;
  if (location.hash !== next) history.replaceState(null, "", next);
}

function selectCompany(id) {
  if (!companies[id]) return;
  state.company = id;
  const fit = events.filter((event) => event.company === id && event.year <= state.year);
  state.eventId = fit.length ? fit[fit.length - 1].id : events.find((event) => event.company === id).id;
  if (!fit.length) state.year = events.find((event) => event.company === id).year;
  render();
}

document.querySelector(".companies").addEventListener("click", (event) => {
  const button = event.target.closest("[data-company]");
  if (button) selectCompany(button.dataset.company);
});

stack.addEventListener("click", (event) => {
  const button = event.target.closest("[data-company]");
  if (button) selectCompany(button.dataset.company);
});

document.body.addEventListener("click", (event) => {
  const button = event.target.closest("[data-event]");
  if (!button) return;
  const item = events.find((entry) => entry.id === button.dataset.event);
  if (!item) return;
  state.company = item.company;
  state.year = item.year;
  state.eventId = item.id;
  state.mode = "map";
  render();
});

document.getElementById("mode-map").addEventListener("click", () => {
  state.mode = "map";
  render();
});

document.getElementById("mode-chips").addEventListener("click", () => {
  state.mode = "chips";
  render();
});

document.getElementById("chips").addEventListener("click", (event) => {
  const button = event.target.closest("[data-chip]");
  if (!button) return;
  state.chip = button.dataset.chip;
  render();
});

yearInput.addEventListener("input", () => {
  state.year = Number(yearInput.value);
  const fit = events.filter((event) => event.company === state.company && event.year <= state.year);
  state.eventId = fit.length ? fit[fit.length - 1].id : null;
  render();
});

window.addEventListener("resize", () => {
  if (state.mode === "map") {
    drawWires();
    const scroller = document.querySelector(".stack-scroll");
    document.querySelector(".hint").hidden = scroller.scrollWidth <= scroller.clientWidth + 2;
  }
});

const fromHash = location.hash.replace("#", "");
if (companies[fromHash]) {
  state.company = fromHash;
  const fit = events.filter((event) => event.company === fromHash && event.year <= state.year);
  state.eventId = fit.length ? fit[fit.length - 1].id : null;
}
render();
