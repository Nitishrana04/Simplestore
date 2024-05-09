$(document).ready(function () {
    // Sample data for mobiles


    // Function to populate mobiles in the DOM
    function populateMobiles() {
        var mobilesContainer = $("#mobilesContainer");
        mobiles.forEach(function (mobile) {
            var cardHtml = `
                <div class="col-md-3 mb-4">
                    <div class="card h-100">
                        <img src="${mobile.images[0]}" class="card-img-top" alt="${mobile.name}" style="height: 200px; object-fit: contain;">
                        <div class="card-body">
                            <h5 class="card-title">${mobile.name}</h5>
                            <p class="card-text">${mobile.features}</p>
                            <p class="card-text">Price: ₹${mobile.price.toFixed(2)}</p> <!-- Display price -->
                            <button class="btn btn-primary view-details" data-mobile='${JSON.stringify(mobile)}'>View Details</button>
                            <button class="btn btn-success add-to-cart" data-mobile='${JSON.stringify(mobile)}'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            mobilesContainer.append(cardHtml);
        });
    }

    populateMobiles();

    // Event handler for View Details button click
    $(document).on('click', '.view-details', function () {
        var mobileData = $(this).data('mobile');
        // Store the selected mobile's data in session storage
        sessionStorage.setItem('selectedMobile', JSON.stringify(mobileData));
        // Redirect to the product details page
        window.location.href = 'product-details.html';
    });

    // Event handler for Add to Cart button click
    $(document).on('click', '.add-to-cart', function (e) {
        e.preventDefault();
        var mobileData = $(this).data('mobile');
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(mobileData);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Added to cart:', mobileData.name);
        alert('Item added to cart successfully!');
    });
});
