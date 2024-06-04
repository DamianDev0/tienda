import { navigateTo } from "../../../Router";

export function AllProducts() {
    const $content = /*html*/`
        <div id="products-container"></div>
    `;

    const logic = async () => {
        const getRol = localStorage.getItem('role_id');
        const $productsContainer = document.getElementById('products-container');

        const fetchProducts = await fetch('http://localhost:3000/products');
        const products = await fetchProducts.json();

        let productsHTML = products.map(product => {
            let buttonsHTML = '';
            if (getRol === "2") {
                buttonsHTML = /*html*/`
                    <button class="edit-product" data-id="${product.id}">Edit</button>
                    <button class="delete-product" data-id="${product.id}">Delete</button>
                `;
            } else if (getRol === "1") {
                buttonsHTML = /*html*/`
                    <button class="buy-product" data-id="${product.id}">Buy</button>
                `;
            }
            return /*html*/`
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Category: ${product.category}</p>
                    ${buttonsHTML}
                </div>
            `;
        }).join('');

        $productsContainer.innerHTML = /*html*/`
            <h2>Welcome to all products</h2>
            <div class="products-container">
                ${productsHTML}
            </div>
        `;

        // Agregar event listener solo a los botones de edición
        const $editButtons = $productsContainer.querySelectorAll('.edit-product');
        $editButtons.forEach($btnEdit => {
            $btnEdit.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(`/dashboard/admin/edit/${$btnEdit.getAttribute('data-id')}`);
            });
        });
    };

    return {
        $content,
        logic
    };
}
