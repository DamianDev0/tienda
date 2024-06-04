import { navigateTo } from "../../../Router";

export function CreateProduct() {
    const $content = /*html*/ `
        <h2>desde la vista crear</h2>
        <form name="form">
            <input type="text" placeholder="name product" id="nameP">
            <input type="text" placeholder="description product" id="descriptionP">
            <input type="number" placeholder="price" id="price">
            <input type="number" placeholder="stock" id="stock">
            <select id="category">
                <option value="">--Categoría--</option>
                <option value="Maquillaje">Maquillaje</option>
                <option value="Cuidado de la piel">Cuidado de la piel</option>
                <option value="Cuidado del cabello">Cuidado del cabello</option>
                <option value="Fragancias">Fragancias</option>
                <option value="Accesorios de belleza">Accesorios de belleza</option>
            </select>
            <button id="btnCreate">Create Product</button>
            <button id="btnback">Back</button>
        </form>
    `;

    const logic = () => {
        const $form = document.getElementsByName('form')[0];
        const $nameProduct = document.getElementById('nameP');
        const $descriptionProduct = document.getElementById('descriptionP');
        const $priceProduct = document.getElementById('price');
        const $stockProduct = document.getElementById('stock');
        const $categoryProduct = document.getElementById('category');
        const $btnback = document.getElementById('btnback');

        $btnback.addEventListener('click', () => {
           navigateTo('/dasboard/admin')
        });

        $form.addEventListener('submit', async (e) => {
            e.preventDefault(); // 
          
            const name = $nameProduct.value;
            const description = $descriptionProduct.value;
            const price = $priceProduct.value;
            const stock = $stockProduct.value;
            const category = $categoryProduct.value;

            // Create data object to send in the request body
            const data = {
                name,
                description,
                price,
                stock,
                category
            };

            try {
                // Send POST request to the server
                const response = await fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                // Check if the product was created successfully
                if (response.status === 201) {
                    alert('Producto creado');
                    window.location.reload()
                }
            } catch (error) {
                console.log(error); // Log any errors
            }
        });
    };

    return {
        $content,
        logic
    };
}
