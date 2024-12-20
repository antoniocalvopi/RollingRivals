/*
 * jQuery myCart - v1.9 - 2020-12-03
 * http://asraf-uddin-ahmed.github.io/
 * Copyright (c) 2017 Asraf Uddin Ahmed; Licensed None
 * Modified by Antonio Calvo Picón
 */

(function ($) {
    "use strict";

    var OptionManager = (function () {
        var objToReturn = {};
        var _options = null;
        var DEFAULT_OPTIONS = {
            currencySymbol: '$',
            classCartBadge: 'cart-count',
            classProductQuantity: 'product-quantity',
            classProductRemove: 'product-remove',
            classCheckoutCart: 'checkout-cart',
            showCheckoutModal: false, // Evitamos usar modal para permitir un carrito personalizado
            numberOfDecimals: 2,
            afterAddOnCart: function (products, totalPrice, totalQuantity) { },
            checkoutCart: function (products, totalPrice, totalQuantity) {
                return false;
            }
        };

        var loadOptions = function (customOptions) {
            console.log("Cargando opciones:", customOptions);  // Agrega este log para depurar
            _options = $.extend({}, DEFAULT_OPTIONS, customOptions);
        };
        var getOptions = function () {
            return _options;
        };

        objToReturn.loadOptions = loadOptions;
        objToReturn.getOptions = getOptions;
        return objToReturn;
    })();

    var MathHelper = (function () {
        var objToReturn = {};
        var getRoundedNumber = function (number) {
            if (isNaN(number)) throw new Error('Parameter is not a Number');
            var options = OptionManager.getOptions();
            return number.toFixed(options.numberOfDecimals);
        };
        objToReturn.getRoundedNumber = getRoundedNumber;
        return objToReturn;
    })();

    var ProductManager = (function () {
        var objToReturn = {};
        const STORAGE_NAME = "__mycart";
        localStorage[STORAGE_NAME] = localStorage[STORAGE_NAME] || "[]";

        var getAllProducts = function () {
            try {
                return JSON.parse(localStorage[STORAGE_NAME]);
            } catch (e) {
                return [];
            }
        };
        var setAllProducts = function (products) {
            localStorage[STORAGE_NAME] = JSON.stringify(products);
        };
        var getProductIndex = function (id) {
            return getAllProducts().findIndex(product => product.id == id);
        };
        var addProduct = function (product) {
            var products = getAllProducts();
            products.push(product);
            setAllProducts(products);
        };
        var updateProduct = function (id, quantity) {
            var products = getAllProducts();
            var index = getProductIndex(id);
            if (index >= 0) products[index].quantity += quantity;
            setAllProducts(products);
        };
        var setProduct = function (id, name, price, quantity, image) {
            if (!id || !name || !price || !image) {
                console.error("Missing required product fields.");
                return;
            }
            if (quantity <= 0) return;

            var index = getProductIndex(id);
            if (index >= 0) updateProduct(id, quantity);
            else addProduct({ id, name, price, quantity, image });
        };
        var removeProduct = function (id) {
            var products = getAllProducts().filter(product => product.id != id);
            setAllProducts(products);
        };
        var clearProducts = function () {
            setAllProducts([]);
        };
        var getTotalQuantity = function () {
            return getAllProducts().reduce((sum, product) => sum + product.quantity, 0);
        };
        var getTotalPrice = function () {
            return getAllProducts().reduce((sum, product) => sum + product.quantity * product.price, 0);
        };

        objToReturn.getAllProducts = getAllProducts;
        objToReturn.setProduct = setProduct;
        objToReturn.removeProduct = removeProduct;
        objToReturn.clearProducts = clearProducts;
        objToReturn.getTotalQuantity = getTotalQuantity;
        objToReturn.getTotalPrice = getTotalPrice;
        return objToReturn;
    })();

    var CartManager = function (targetSelector, options) {
        var $cartBadge = $("." + options.classCartBadge);
        var drawCart = function () {
            const products = ProductManager.getAllProducts();
            const $cartContainer = $("#cart-container");
            $cartContainer.empty();

            products.forEach(product => {
                const total = MathHelper.getRoundedNumber(product.quantity * product.price);
                $cartContainer.append(`
                  <div class="cart-item" data-id="${product.id}">
                      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                      <div class="cart-item-details">
                          <h5>${product.name}</h5>
                          <p>Precio: ${options.currencySymbol}${product.price}</p>
                          <p>Cantidad: ${product.quantity}</p>
                          <p>Total: ${options.currencySymbol}${total}</p>
                      </div>
                      <button class="btn btn-danger ${options.classProductRemove}">Eliminar</button>
                  </div>
              `);
            });

            const totalPrice = options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalPrice());
            $cartContainer.append(`<div class="cart-summary">Total: ${totalPrice}</div>`);
        };

        $(document).on("click", "." + options.classProductRemove, function () {
            const id = $(this).closest(".cart-item").data("id");
            ProductManager.removeProduct(id);
            drawCart();
            $cartBadge.text(ProductManager.getTotalQuantity());
        });

        $(document).on("click", targetSelector, function () {
            const $btn = $(this);
            const id = $btn.data("id");
            const name = $btn.data("name");
            const price = $btn.data("price");
            const quantity = $btn.data("quantity");
            const image = $btn.data("image");

            ProductManager.setProduct(id, name, price, quantity, image);
            drawCart();
            $cartBadge.text(ProductManager.getTotalQuantity());

            options.afterAddOnCart(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
        });

        drawCart();
    };

    $.fn.myCart = function (userOptions) {
        OptionManager.loadOptions(userOptions);
        const options = OptionManager.getOptions();
        new CartManager(this.selector, options);
        return this;
    };
})(jQuery);