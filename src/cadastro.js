import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { initTogglePassword } from './toggle-password.js';

const registerForm = document.getElementById('register-form');
const errorDisplay = document.getElementById('register-error');

initTogglePassword();

// Flag para impedir redirecionamento prematuro pelo onAuthStateChanged
let isRegistering = false;

// Se já estiver logado (e não estiver no meio de um cadastro), vai direto pro jogo
onAuthStateChanged(auth, (user) => {
    if (user && !isRegistering) window.location.replace('game.html');
}); // Alterado para './game.html'

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Sanitização e Captura Segura
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!email || !password || !confirmPassword) {
        errorDisplay.textContent = "Preencha todos os campos.";
        return;
    }

    if (password !== confirmPassword) {
        errorDisplay.textContent = "As senhas não coincidem!";
        return;
    }

    if (password.length < 6) {
        errorDisplay.textContent = "A senha deve ter pelo menos 6 caracteres.";
        return;
    }

    errorDisplay.textContent = "Criando sua conta...";
    isRegistering = true;
    const btnSubmit = registerForm.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // IMPORTANTE: setDoc usa o UID como ID do documento
        // Usamos setDoc em vez de addDoc para garantir ID == UID
        const userDocRef = doc(db, "usuarios", user.uid);
        await setDoc(userDocRef, {
            email: user.email,
            nivel: 0,
            vitorias: 0,
            pontos: 0,
            tentativas: 3,
            createdAt: serverTimestamp()
        });

        // Agora que o documento foi criado com sucesso, podemos redirecionar
        window.location.replace('game.html');
    } catch (error) {
        btnSubmit.disabled = false;
        isRegistering = false;
        const messages = {
            'auth/email-already-in-use': 'Este e-mail já está em uso.',
            'auth/invalid-email': 'E-mail inválido.',
            'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.'
        };
        errorDisplay.textContent = messages[error.code] || "Erro ao criar conta. Tente novamente.";
    }
});