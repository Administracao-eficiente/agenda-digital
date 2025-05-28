import { auth, provider } from './firebase.js';
import { signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById('google-login').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = 'index.html')
    .catch(e => alert('Erro: ' + e.message));
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = 'index.html')
    .catch(e => alert('Erro: ' + e.message));
});
