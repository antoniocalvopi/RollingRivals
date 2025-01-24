$(document).ready(function () {
    var $cartModal = $('#cart-modal');
    var $closeCartBtn = $('#close-cart');
    var $cartBadge = $('.cart-count'); 
    var $cartTotal = $('#cart-total');
    var $cartContainer = $('#cart-container');
    var $checkoutBtn = $('#checkout-btn');
    $cartBadge.hide();
    
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const setCookie = (name, value, days) => {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); 
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    };

    const getCartFromCookies = () => {
        const cart = getCookie("cart");
        return cart ? JSON.parse(cart) : [];  
    };

    const saveCartToCookies = (cart) => {
        setCookie("cart", JSON.stringify(cart), 365);  
        $cartBadge.text(cart.length); 
        if (cart.length === 0) {
            $cartBadge.hide();
        } else {
            $cartBadge.show();
        }
    };

    if (!getCookie("saldo")) {
        setCookie("saldo", 5000, 365); 
    }

    const updateBalanceDisplay = () => {
        const balance = getCookie("saldo");
        $('#saldo').text(`$${parseFloat(balance).toFixed(2)}`); 
    };

    const updateCart = () => {
        const cartItems = getCartFromCookies();  
        $cartContainer.empty();  

        if (cartItems.length === 0) {
            $cartContainer.append('<p>Tu carrito está vacío.</p>');
            $cartTotal.text('0');
        } else {
            let total = 0;
            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                $cartContainer.append(`
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h5>${item.name}</h5>
                            <p>Precio: $${item.price}</p>
                            <p>Cantidad: ${item.quantity}</p>
                            <p>Total: $${itemTotal.toFixed(2)}</p>
                        </div>
                        <button class="btn btn-danger product-remove">Eliminar</button>
                    </div>
                `);
            });
            
            $cartTotal.text(total.toFixed(2));
            $cartBadge.text(cartItems.length)
        }
    };

    $('#cart-icon').on('click', function () {
        updateCart();  
        $cartModal.fadeIn();  
    });

    $closeCartBtn.on('click', function () {
        $cartModal.fadeOut();  
    });

    $(window).on('click', function (event) {
        if ($(event.target).is($cartModal)) {
            $cartModal.fadeOut();
        }
    });

    const addToCart = (product) => {
        let cartItems = getCartFromCookies(); 
        let existingProduct = cartItems.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 }); 
        }

        saveCartToCookies(cartItems); 
        updateCart();  
    };

    $(document).on('click', '.product-remove', function () {
        let cartItems = getCartFromCookies();  
        const productId = $(this).closest('.cart-item').data('id');
        cartItems = cartItems.filter(item => item.id !== productId); 
        saveCartToCookies(cartItems);  
        updateCart();  
    });

    $(document).on('click', '.add-to-cart-btn', function () {
        const product = {
            id: $(this).data('id'),
            name: $(this).data('name'),
            price: $(this).data('price'),
            image: $(this).data('image')
        };
        addToCart(product);  
    });

    $(document).on('click', '.buy-card-product', function () {
        const product = {
            id: $(this).data('id'),
            name: $(this).data('name'),
            price: $(this).data('price'),
            image: $(this).data('image')
        };

        const balance = parseFloat(getCookie("saldo"));
        const total = product.price;  

        if (total > balance) {
            alert('No tienes suficiente saldo para realizar la compra.');
        } else {
            const newBalance = balance - total;
            setCookie("saldo", newBalance.toFixed(2), 365);
            alert('Compra realizada con éxito.');
            updateBalanceDisplay(); 
        }
    });

    $checkoutBtn.on('click', function () {
        const cartItems = getCartFromCookies(); 
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);  
        const balance = parseFloat(getCookie("saldo"));

        if (total > balance) {
            alert('No tienes suficiente saldo para realizar la compra.');
        } else {
            const newBalance = balance - total;
            setCookie("saldo", newBalance.toFixed(2), 365); 

            saveCartToCookies([]);  
            updateCart(); 
            updateBalanceDisplay(); 
    
            alert('Compra realizada con éxito.');
        }
    });

    updateCart();

    updateBalanceDisplay();
});