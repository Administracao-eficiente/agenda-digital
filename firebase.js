import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQ7eXHRbbJBF3tK3OuFGcdia5mSfmgul0",
  authDomain: "agenda-digital-11.firebaseapp.com",
  projectId: "agenda-digital-11",
  storageBucket: "agenda-digital-11.appspot.com",
  messagingSenderId: "17145285998",
  appId: "1:17145285998:web:30f26aae5434a83786457f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
