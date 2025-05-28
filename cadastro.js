import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Usuário cadastrado com sucesso!');
      window.location.href = 'login.html';
    })
    .catch(e => alert('Erro: ' + e.message));
});
