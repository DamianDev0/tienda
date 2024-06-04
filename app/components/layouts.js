import { navigateTo } from "../Router";
export function NavBarLayout($content, logic) {
    const $navbar = /*html*/ `
        
        <nav>
            <h2>Productos Actuales</h2>
            <ul>
                <li><a href="#/all-products">All produts</a></li>
                <li><a href="#/logout">Logout</a></li>
                <li><a href="#/home">Home</a></li>


            </ul>
        </nav>
    `;
    document.getElementById('root').innerHTML = /*html*/ `
        ${$navbar}
        ${$content}
    `;
    
    logic();

    const $logOut = document.querySelector("[href='#/logout']");
    const $showAllProducts = document.querySelector("[href='#/all-products']");
    const $home = document.querySelector("[href='#/home']");
    const $getRol = localStorage.getItem('role_id')

    if ($logOut) {
        $logOut.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('role_id')
            navigateTo('/login');
        });
    }

    if ($showAllProducts) {
        $showAllProducts.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('/dasboard/all/products');
        });
    }

    if($home){
        if($getRol === "1"){
            $home.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('/dashboard');
            });
            return
        }

        if($getRol === "2"){
            $home.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('/dashboard/admin');
            });
            return
        }
    }

   

}
