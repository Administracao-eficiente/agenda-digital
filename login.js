import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();

document.getElementById('login-google').addEventListener('click', () => {
  signInWithPopup(auth, googleProvider)
    .then(() => window.location.href = 'index.html')
    .catch(e => alert('Erro: ' + e.message));
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = 'index.html')
    .catch(e => alert('Erro: ' + e.message));
});
