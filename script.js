let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let lixeira = JSON.parse(localStorage.getItem('lixeira')) || [];

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function salvarLixeira() {
  localStorage.setItem('lixeira', JSON.stringify(lixeira));
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
  if (confirm("Tem certeza que deseja mover esta tarefa para a lixeira?")) {
    const removida = tarefas.splice(index, 1)[0];
    lixeira.push(removida);
    salvarTarefas();
    salvarLixeira();
    atualizarLista();
    atualizarLixeira();
  }
}

function atualizarLixeira() {
  const lista = document.getElementById('lixeira-tarefas');
  if (!lista) return;
  lista.innerHTML = '';

  lixeira.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${tarefa.nome}</strong>
      <p>${tarefa.descricao}</p>
      <p>Prazo: ${tarefa.prazo}</p>
      <p>Prioridade: ${tarefa.prioridade}</p>
      <div class="button-group">
        <button onclick="restaurarTarefa(${index})">🔄 Restaurar</button>
        <button onclick="excluirPermanentemente(${index})">❌ Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function restaurarTarefa(index) {
  const restaurada = lixeira.splice(index, 1)[0];
  tarefas.push(restaurada);
  salvarLixeira();
  salvarTarefas();
  atualizarLista();
  atualizarLixeira();
}

function excluirPermanentemente(index) {
  if (confirm("Tem certeza que deseja excluir permanentemente esta tarefa?")) {
    lixeira.splice(index, 1);
    salvarLixeira();
    atualizarLixeira();
  }
}

document.getElementById('filtro').addEventListener('change', atualizarLista);

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const icon = document.getElementById('theme-icon');
  if (document.body.classList.contains('light-mode')) {
    icon.textContent = '☀️';
  } else {
    icon.textContent = '🌙';
  }
}

function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('open');
  atualizarLixeira();
}

atualizarLista();
