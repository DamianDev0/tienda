import { navigateTo } from "../../../Router";

export function HomePage(){
    const root = document.getElementById('root')
    root.innerHTML = /*html*/`
        <div>Hola mi bro como vamos</div>
        <button id="btnLogin">Login</button>
        <button id="btnRegister">Register</button>
    `
    const $btnLogin = document.getElementById('btnLogin');
    $btnLogin.addEventListener('click', () => {
       navigateTo('/login')
    })

    const $btnRegister = document.getElementById('btnRegister');
    $btnRegister.addEventListener('click', () => {
       navigateTo('/register')
    })


}
