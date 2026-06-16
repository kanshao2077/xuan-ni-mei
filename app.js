const STORAGE_KEY = "xuan-ni-mei-state-v1";
const MAX_HISTORY = 8;

const form = document.querySelector("#chooser-form");
const choicesInput = document.querySelector("#choices");
const resultText = document.querySelector("#result-text");
const resultMeta = document.querySelector("#result-meta");
const clearButton = document.querySelector("#clear-button");
const historyClearButton = document.querySelector("#history-clear-button");
const historyList = document.querySelector("#history-list");
const historyTemplate = document.querySelector("#history-item-template");
const primaryButton = document.querySelector(".primary-button");

let history = [];

function parseChoices(value) {
  return value
    .split(/\n|,|，|、/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function pickChoice(choices) {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function saveState() {
  const state = {
    choices: choicesInput.value,
    history,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    if (typeof state.choices === "string") {
      choicesInput.value = state.choices;
    }

    if (Array.isArray(state.history)) {
      history = state.history.slice(0, MAX_HISTORY);
    }
  } catch {
    history = [];
  }
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach((item) => {
    const node = historyTemplate.content.cloneNode(true);
    const choice = node.querySelector(".history-choice");
    const time = node.querySelector(".history-time");

    choice.textContent = item.choice;
    time.textContent = formatTime(item.createdAt);
    historyList.append(node);
  });
}

function showResult(choice, total) {
  resultText.textContent = choice;
  resultMeta.textContent = `从 ${total} 个候选项里打印出来。`;
  resultText.classList.remove("flash");
  window.requestAnimationFrame(() => resultText.classList.add("flash"));
}

function setIdleMessage() {
  const total = parseChoices(choicesInput.value).length;
  resultMeta.textContent = total < 2 ? "至少写两个选项。" : `当前有 ${total} 个候选项。`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const choices = parseChoices(choicesInput.value);

  if (choices.length < 2) {
    resultText.textContent = "不够打";
    resultMeta.textContent = "至少写两个不同选项。";
    return;
  }

  primaryButton.classList.add("is-spinning");

  window.setTimeout(() => {
    const choice = pickChoice(choices);
    history = [{ choice, createdAt: Date.now() }, ...history].slice(0, MAX_HISTORY);

    primaryButton.classList.remove("is-spinning");
    showResult(choice, choices.length);
    renderHistory();
    saveState();
  }, 380);
});

choicesInput.addEventListener("input", () => {
  setIdleMessage();
  saveState();
});

clearButton.addEventListener("click", () => {
  choicesInput.value = "";
  resultText.textContent = "未开签";
  setIdleMessage();
  saveState();
  choicesInput.focus();
});

historyClearButton.addEventListener("click", () => {
  history = [];
  renderHistory();
  saveState();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

loadState();
setIdleMessage();
renderHistory();
