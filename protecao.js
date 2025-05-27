import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = 'login.html';
});

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth)
    .then(() => window.location.href = 'login.html')
    .catch(e => alert('Erro: ' + e.message));
});
