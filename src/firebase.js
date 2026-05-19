import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeNYjhYqq8cq53wKsHXcX4wIBfXtncZxk",
  authDomain: "jogo-da-velha-74c64.firebaseapp.com",
  projectId: "jogo-da-velha-74c64",
  storageBucket: "jogo-da-velha-74c64.firebasestorage.app",
  messagingSenderId: "187969962704",
  appId: "1:187969962704:web:ced799592cb61cd68f54d5",
  measurementId: "G-DYPH93BTEX"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };