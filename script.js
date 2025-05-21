const form = document.getElementById("form-tarefa");
const lista = document.getElementById("lista");
const relatorio = document.getElementById("relatorio");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function atualizarRelatorio() {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.status === "Concluída").length;

  relatorio.innerHTML = `
    <p>Total de tarefas: ${total}</p>
    <p>Concluídas: ${concluidas}</p>
  `;
}

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
  lista.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${tarefa.nome}</strong>
      <p>${tarefa.descricao}</p>
      <p>Prazo: ${tarefa.data}</p>
      <p>Prioridade: ${tarefa.prioridade}</p>
      <p>Status: ${tarefa.status}</p>
      <button onclick="concluirTarefa(${index})">Concluir</button>
      <button onclick="removerTarefa(${index})">🗑️ Remover</button>
    `;
    lista.appendChild(li);
  });

  atualizarRelatorio();
}

function concluirTarefa(index) {
  tarefas[index].status = "Concluída";
  salvarTarefas();
  renderizarTarefas();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  renderizarTarefas();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("tarefa").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const data = document.getElementById("data").value;
  const prioridade = document.getElementById("prioridade").value;

  if (nome && data) {
    const novaTarefa = {
      nome,
      descricao,
      data,
      prioridade,
      status: "A Fazer"
    };

    tarefas.push(novaTarefa);
    salvarTarefas();
    renderizarTarefas();

    form.reset();
  }
});

renderizarTarefas();
