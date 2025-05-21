const form = document.querySelector("form");
const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");

const focoDiv = document.getElementById("foco");
const tarefaFoco = document.getElementById("tarefa-foco");
const barra = document.getElementById("barra-progresso");
const tempoTexto = document.getElementById("tempo-restante");

let tempoTotal = 25 * 60; // 25 minutos
let tempoRestante = tempoTotal;
let timer = null;

document.addEventListener("DOMContentLoaded", carregarTarefasSalvas);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto !== "") {
    adicionarTarefa(texto);
    salvarTarefa(texto);
    input.value = "";
  }
});

function adicionarTarefa(texto) {
  const li = document.createElement("li");
  li.textContent = texto;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "🗑️";
  botaoRemover.style.marginLeft = "10px";
  botaoRemover.onclick = function () {
    lista.removeChild(li);
    removerTarefa(texto);
  };

  const botaoFoco = document.createElement("button");
  botaoFoco.textContent = "⏱️ Iniciar Foco";
  botaoFoco.style.marginLeft = "10px";
  botaoFoco.onclick = function () {
    iniciarFoco(texto);
  };

  li.appendChild(botaoRemover);
  li.appendChild(botaoFoco);
  lista.appendChild(li);
}

function salvarTarefa(texto) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
  tarefas.push(texto);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function removerTarefa(texto) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
  tarefas = tarefas.filter(tarefa => tarefa !== texto);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefasSalvas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
  tarefas.forEach(adicionarTarefa);
}

function iniciarFoco(tarefa) {
  clearInterval(timer);
  tempoRestante = tempoTotal;
  tarefaFoco.textContent = `Foco em: ${tarefa}`;
  focoDiv.style.display = "block";
  atualizarBarra();

  timer = setInterval(() => {
    tempoRestante--;
    atualizarBarra();

    if (tempoRestante <= 0) {
      clearInterval(timer);
      tempoTexto.textContent = "Concluído!";
      barra.style.width = "100%";
    }
  }, 1000);
}

function atualizarBarra() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  tempoTexto.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

  const progresso = ((tempoTotal - tempoRestante) / tempoTotal) * 100;
  barra.style.width = `${progresso}%`;
}