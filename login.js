import { auth } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initTogglePassword } from './toggle-password.js';

const loginForm = document.getElementById('login-form');
const errorDisplay = document.getElementById('login-error');

initTogglePassword();

// Se já estiver logado, vai direto pro jogo
onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = 'game.html';
}); // Alterado para './game.html'

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    errorDisplay.textContent = "Verificando resistência...";

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // O onAuthStateChanged cuidará do redirecionamento
    } catch (error) {
        const messages = {
            'auth/invalid-credential': 'Credenciais inválidas.',
            'auth/user-not-found': 'Usuário não encontrado.'
        };
        errorDisplay.textContent = messages[error.code] || "Erro ao entrar: " + error.message;
    }
});