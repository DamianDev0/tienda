import { encryptData } from "../../../../encrypt";
import { navigateTo } from "../../../Router";

export function RegisterPage() {
    const root = document.getElementById('root');

    root.innerHTML = /*html*/`
        <h1>Welcome to register</h1>
        <form id="registerForm">
            <input type="text" placeholder="Username" id="username" required>  
            <input type="email" placeholder="Email" id="email" required>
            <input type="password" placeholder="Password" id="password" required>
            <input type="hidden" id="role_id" name="role_id" value="1">
            <button type="submit" id="btnRegister">Register</button>
        </form>
    `;

    const $formCreate = document.getElementById("registerForm");
    $formCreate.addEventListener('submit', async (e) => {
        e.preventDefault();
        const $usernameInput = document.getElementById('username');
        const $emailInput = document.getElementById('email');
        const $passwordInput = document.getElementById('password');
        const $role_id = document.getElementById("role_id");

        if (!$usernameInput.value || !$emailInput.value || !$passwordInput.value) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/visits', {
                method: 'POST',
                body: JSON.stringify({
                    username: $usernameInput.value,
                    email: $emailInput.value,
                    password: encryptData($passwordInput.value),
                    role_id: $role_id.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error al crear el usuario");
            }

            alert('Usuario creado exitosamente');
            setTimeout(() => {
                navigateTo('/login');
            }, 2000);
        } catch (error) {
            alert(error.message);
        }
    });
}
