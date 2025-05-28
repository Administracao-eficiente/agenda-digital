// auth.js
import { auth, provider } from './firebase.js';
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = "index.html")
    .catch(err => alert("Erro: " + err.message));
}

export function logout() {
  signOut(auth).then(() => window.location.href = "login.html");
}

export function loginWithEmail(email, senha) {
  signInWithEmailAndPassword(auth, email, senha)
    .then(() => window.location.href = "index.html")
    .catch(err => alert("Erro: " + err.message));
}

export function registerWithEmail(email, senha) {
  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => window.location.href = "index.html")
    .catch(err => alert("Erro: " + err.message));
}
