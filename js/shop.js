document.addEventListener("DOMContentLoaded", () => {
    const seeMoreButton = document.querySelector(".see-more-btn");
    const productContainer = document.querySelector(".container");

    // Generar productos simulados con precios y descuentos aleatorios
    const generateRandomProducts = (count) => {
        const products = [];
        for (let i = 1; i <= count; i++) {
            const price = Math.floor(Math.random() * (1500 - 300 + 1)) + 300; // Precio entre $300 y $1500
            const discount = price + Math.floor(Math.random() * (500 - 100 + 1)) + 100; // Descuento mayor al precio
            const rating = (Math.random() * (5 - 3) + 3).toFixed(1); // Calificación entre 3.0 y 5.0
            products.push({
                name: `Producto ${i + 1}`,
                price: price,
                discount: discount,
                rating: rating,
                image: `../img/marble.webp`,
            });
        }
        return products;
    };

    // Productos simulados
    const products = generateRandomProducts(5);
    seeMoreButton.addEventListener("click", () => {
        if (!productContainer) {
            console.error("Contenedor de productos no encontrado");
            return;
        }

        products.forEach(product => {
            // Crear tarjeta para cada producto
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <span class="badge-discount">-${Math.round(((product.discount - product.price) / product.discount) * 100)}%</span>
                <img src="${product.image}" alt="${product.name}" onerror="this.src='../img/default-product.png';">
                <h4>${product.name}</h4>
                <p><span class="price">$${product.price}</span> <span class="discount">$${product.discount}</span></p>
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}☆ (${Math.round(product.rating * 20)})</div>
                <button class="add-to-cart-btn basic-btn">More Info</button>
                <button class="buy-card-product basic-btn">Buy Now</button>
            `;
            productContainer.appendChild(card);
        });

        // Deshabilitar el botón después de cargar productos
        seeMoreButton.disabled = true;
        seeMoreButton.textContent = "No hay más productos";
    });
    // Carrito básico
    productContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart-btn")) {
            alert("Producto añadido al carrito!");
        }
    });

    // Simulación de compra básica
    productContainer.addEventListener("click", (event) =>{
        if(event.target.classList.contains("buy-card-product")){
            alert("Producto comprado!")
        }
    });
});
