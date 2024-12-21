$(document).ready(() => {
    let allProducts = []; // Almacenamos todos los productos cargados
    let currentLimit = 5; // Número de productos a mostrar

    // Función para cargar productos
    const fetchProducts = () => {
        $.ajax({
            url: 'http://localhost:3000/productos.php',
            method: 'GET',
            dataType: 'json',
            success: (products) => {
                localStorage.removeItem('products');
                localStorage.setItem('products', JSON.stringify(products));
                allProducts = products;
                displayProducts(allProducts.slice(0, currentLimit));

                if (allProducts.length > currentLimit) {
                    $('.see-more-btn').show();
                }
            },
            error: () => {
                alert('Error al cargar los productos.');
            }
        });
    };

    const displayProducts = (products) => {
        const productContainer = $('#product-container');
        productContainer.empty(); 

        products.forEach(product => {
            const productCard = $(`
                <div class="card">
                    <span class="badge-discount">-${Math.round(((product.discount - product.price) / product.discount) * 100)}%</span>
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='/img/default-product.png';">
                    <h4>${product.name}</h4>
                    <p><span class="price">$${product.price}</span> <span class="discount">$${product.discount}</span></p>
                    <div class="stars">${'★'.repeat(Math.floor(product.rating))}☆ (${Math.round(product.rating * 20)})</div>
                    <button 
                        class="add-to-cart-btn basic-btn" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-summary="${product.summary || 'Sin descripción'}" 
                        data-price="${product.price}" 
                        data-quantity="1" 
                        data-image="${product.image}">
                        Añadir al carrito
                    </button>
                    <button 
                        class="buy-card-product basic-btn" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-summary="${product.summary || 'Sin descripción'}" 
                        data-price="${product.price}" 
                        data-quantity="1" 
                        data-image="${product.image}">Comprar ahora</button>
                </div>
            `);
            productContainer.append(productCard);
        });
    };

    $('.see-more-btn').on('click', () => {
        displayProducts(allProducts);
        $('#filter-value').val(''); 
        $('.see-more-btn').hide();
    });

    const searchProducts = (searchValue) => {
        $.ajax({
            url: 'http://localhost:3000/productos.php', 
            method: 'GET',
            dataType: 'json',
            success: (products) => {
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchValue.toLowerCase())
                );
                localStorage.setItem('products', JSON.stringify(filteredProducts));
                displayProducts(filteredProducts);
            },
            error: () => {
                alert('Error al realizar la búsqueda.');
            }
        });
    };

    $('#filter-btn').on('click', () => {
        const searchValue = $('#filter-value').val();
        if (searchValue) {
            searchProducts(searchValue); 
        } else {
            displayProducts(allProducts.slice(0, currentLimit));
        }
    });

    $('#filter-value').on('keyup', () => {
        const searchValue = $('#filter-value').val();
        if (searchValue) {
            searchProducts(searchValue); 
        } else {
            displayProducts(allProducts.slice(0, currentLimit));
        }
    });

    fetchProducts();
});