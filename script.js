const form = document.getElementById("form-tarefa");
const lista = document.getElementById("lista");
const relatorio = document.getElementById("relatorio");
const filtroStatus = document.getElementById("filtro-status");

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
  const filtro = filtroStatus.value;

  // Ordenar por prioridade e data
  const tarefasOrdenadas = [...tarefas].sort((a, b) => {
    const prioridade = {Alta: 1, Média: 2, Baixa: 3};
    if (prioridade[a.prioridade] !== prioridade[b.prioridade]) {
      return prioridade[a.prioridade] - prioridade[b.prioridade];
    }
    return new Date(a.data) - new Date(b.data);
  });

  tarefasOrdenadas.forEach((tarefa, index) => {
    if (filtro !== "Todas" && tarefa.status !== filtro) return;

    const li = document.createElement("li");
    li.classList.add(`prioridade-${tarefa.prioridade}`);
    if (tarefa.status === "Concluída") li.classList.add('status-Concluída');

    li.innerHTML = `
      <strong>${tarefa.nome}</strong>
      <p>${tarefa.descricao}</p>
      <p>Prazo: ${tarefa.data}</p>
      <p>Prioridade: ${tarefa.prioridade}</p>
      <p>Status: ${tarefa.status}</p>
      <button onclick="concluirTarefa(${index})">✅ Concluir</button>
      <button onclick="editarTarefa(${index})">✏️ Editar</button>
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

function editarTarefa(index) {
  const tarefa = tarefas[index];

  const novoNome = prompt("Novo nome:", tarefa.nome);
  const novaDescricao = prompt("Nova descrição:", tarefa.descricao);
  const novaData = prompt("Nova data (AAAA-MM-DD):", tarefa.data);
  const novaPrioridade = prompt("Nova prioridade (Alta, Média, Baixa):", tarefa.prioridade);

  if (novoNome && novaData && ["Alta", "Média", "Baixa"].includes(novaPrioridade)) {
    tarefas[index].nome = novoNome;
    tarefas[index].descricao = novaDescricao;
    tarefas[index].data = novaData;
    tarefas[index].prioridade = novaPrioridade;
    salvarTarefas();
    renderizarTarefas();
  } else {
    alert("Edição cancelada ou inválida.");
  }
}

function removerTarefa(index) {
  if (confirm("Tem certeza que deseja remover esta tarefa?")) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas();
  }
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
  } else {
    alert("Preencha todos os campos obrigatórios!");
  }
});

filtroStatus.addEventListener("change", renderizarTarefas);

renderizarTarefas();
