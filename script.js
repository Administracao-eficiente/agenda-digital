let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function atualizarLista() {
  const lista = document.getElementById('lista-tarefas');
  const filtro = document.getElementById('filtro').value;
  lista.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    if (filtro === 'concluidas' && !tarefa.concluida) return;
    if (filtro === 'afazer' && tarefa.concluida) return;

    const li = document.createElement('li');
    if (tarefa.concluida) li.classList.add('completed');

    li.innerHTML = `
      <strong>${tarefa.nome}</strong>
      <p>${tarefa.descricao}</p>
      <p>Prazo: ${tarefa.prazo}</p>
      <p>Prioridade: ${tarefa.prioridade}</p>
      <p>Status: ${tarefa.concluida ? 'Concluída' : 'A Fazer'}</p>
      <div class="button-group">
        <button onclick="concluirTarefa(${index})">✅ Concluir</button>
        <button onclick="editarTarefa(${index})">✏️ Editar</button>
        <button onclick="removerTarefa(${index})">🗑️ Remover</button>
      </div>
    `;
    lista.appendChild(li);
  });

  atualizarRelatorio();
}

function atualizarRelatorio() {
  const relatorio = document.getElementById('relatorio');
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  relatorio.innerHTML = `
    Total de tarefas: ${total} <br>
    Concluídas: ${concluidas}
  `;
}

document.getElementById('form-tarefa').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const prazo = document.getElementById('prazo').value;
  const prioridade = document.getElementById('prioridade').value;

  tarefas.push({ nome, descricao, prazo, prioridade, concluida: false });
  salvarTarefas();
  atualizarLista();
  this.reset();
});

function concluirTarefa(index) {
  tarefas[index].concluida = true;
  salvarTarefas();
  atualizarLista();
}

function editarTarefa(index) {
  const tarefa = tarefas[index];
  document.getElementById('nome').value = tarefa.nome;
  document.getElementById('descricao').value = tarefa.descricao;
  document.getElementById('prazo').value = tarefa.prazo;
  document.getElementById('prioridade').value = tarefa.prioridade;

  tarefas.splice(index, 1);
  salvarTarefas();
  atualizarLista();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  atualizarLista();
}

document.getElementById('filtro').addEventListener('change', atualizarLista);

// Inicializa a lista ao abrir a página
atualizarLista();
