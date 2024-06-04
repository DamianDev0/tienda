import { decryptData } from "../../../../encrypt";
import { navigateTo } from "../../../Router";

export function LoginPage() {
  const root = document.getElementById("root");

  root.innerHTML = /*html*/ `
    <form id="loginForm">
        <h1>Welcome to login</h1>
        <input type="email" placeholder="Email" id="userEmail" required>
        <input type="password" placeholder="Password" id="userPassword" required>
        <button type="submit">Login</button>
        <button type="button" id="createAccount">Create Account</button>
    </form>
  `;

  const $formLogin = document.getElementById("loginForm");
  $formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $userEmail = document.getElementById("userEmail");
    const $userPassword = document.getElementById("userPassword");

    if (!$userEmail.value || !$userPassword.value) {
      alert("Fill all the fields");
      return;
    }

    try {
      const [fetchData, fetchDataAdmin] = await Promise.all([
        fetch("http://localhost:3000/visits"),
        fetch("http://localhost:3000/admin"),
      ]);

      if (!fetchData.ok || !fetchDataAdmin.ok) {
        throw new Error("Error logging in");
      }

      const [dataJson, dataJsonAdmin] = await Promise.all([
        fetchData.json(),
        fetchDataAdmin.json(),
      ]);

      const userFound = dataJson.find((user) => user.email === $userEmail.value);
      const adminFound = dataJsonAdmin.find((admin) => admin.email === $userEmail.value);

      if (!userFound && !adminFound) {
        alert("User not found");
        return;
      }

      if (userFound && decryptData(userFound.password) !== $userPassword.value) {
        alert("Incorrect password");
        return;
      }

      if (adminFound && decryptData(adminFound.password) !== $userPassword.value) {
        alert("Incorrect password");
        return;
      }

      if (userFound) {
        localStorage.setItem("role_id", userFound.role_id);
      } else if (adminFound) {
        localStorage.setItem("role_id", adminFound.role_id);
      
      }

      const rolUser = localStorage.getItem('role_id')
      console.log(rolUser)

      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("token", token);

      if (rolUser === '1') {
        navigateTo('/dashboard');
        return
      }

      navigateTo('/dasboard/admin')



      

      
      
    } catch (error) {
      alert(error.message);
    }
  });

  const $btnCreateAccount = document.getElementById("createAccount");
  $btnCreateAccount.addEventListener("click", () => {
    navigateTo("/register");
  });
}
