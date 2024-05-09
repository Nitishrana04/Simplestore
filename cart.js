// Function to populate cart items
function populateCartItems() {
    var cartItemsContainer = $("#cartItemsContainer");
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear previous items in the container
    cartItemsContainer.empty();

    // Iterate through each item in the cart and populate the container
    cart.forEach(function (item, index) {
        var itemHtml = `
            <div class="cart-item" data-index="${index}">
                <img src="${item.images[0]}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.features}</p>
                    <p>Price: ${item.price}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="btn btn-sm btn-outline-secondary decrement">-</button>
                    <span class="quantity">${item.quantity || 1}</span>
                    <button class="btn btn-sm btn-outline-secondary increment">+</button>
                </div>
                <button class="btn btn-danger cart-item-remove">Remove</button>
            </div>
        `;
        cartItemsContainer.append(itemHtml);
    });

    // Update total price after populating cart items
    updateTotalPrice(cart);
}

// Function to update total price
function updateTotalPrice(cart) {
    var totalPrice = 0;
    cart.forEach(function (item) {
        totalPrice += item.price * (item.quantity || 1);
    });
    $("#totalPrice").text("Total Price: $" + totalPrice.toFixed(2));
}

// Populate cart items and update total price initially
populateCartItems();

// Event handler for remove button click
$(document).on('click', '.cart-item-remove', function (e) {
    e.preventDefault();
    var index = $(this).closest('.cart-item').data('index');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove item from the cart array
    cart.splice(index, 1);

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Repopulate the cart items container and update total price after item removal
    populateCartItems();
});

// Event handler for increment button click
$(document).on('click', '.increment', function (e) {
    e.preventDefault();
    var index = $(this).closest('.cart-item').data('index');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Increment item quantity
    cart[index].quantity = (cart[index].quantity || 1) + 1;

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Repopulate the cart items container and update total price after quantity change
    populateCartItems();
});

// Event handler for decrement button click
$(document).on('click', '.decrement', function (e) {
    e.preventDefault();
    var index = $(this).closest('.cart-item').data('index');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Decrement item quantity, ensuring it doesn't go below 1
    cart[index].quantity = Math.max((cart[index].quantity || 1) - 1, 1);

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Repopulate the cart items container and update total price after quantity change
    populateCartItems();
});

// Event handler for place order button click
$('#placeOrderBtn').on('click', function (e) {
    e.preventDefault();

    // Redirect the user to the order details page
    window.location.href = 'order_details.html';
});
