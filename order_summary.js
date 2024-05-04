document.addEventListener("DOMContentLoaded", function() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {};

    function calculateItemTotalPrice(item) {
        var itemTotalPrice = (item.price ) * (item.quantity || 1);
        var  itemTotalPrice ;
        return itemTotalPrice ;
    }

    var totalPrice = 0;
    var cartItemsList = $('#cartItems');
    cart.forEach(function(item) {
        var itemTotalPrice = calculateItemTotalPrice(item);
        totalPrice += itemTotalPrice;
        cartItemsList.append('<li>' + item.name + ' (Qty: ' + (item.quantity || 1) + ') - ₹' + itemTotalPrice.toFixed(2) + '</li>');
    });

    $('#fullName').text(orderDetails.fullName || '');
    $('#deliveryAddress').text(orderDetails.deliveryAddress || '');
    $('#pincode').text(orderDetails.pinCode || '');
    $('#mobileModel').text(orderDetails.mobileModel || '');
    $('#mobilePrice').text('₹' + (orderDetails.mobilePrice || 0).toFixed(2));

    var gst = totalPrice * 0.12;
    var mobileTotalPrice = totalPrice + gst + 50;

    $('#gst').text('₹' + gst.toFixed(2));
    $('#totalPrice').text('₹' + mobileTotalPrice.toFixed(2));

    $('#paymentMethod').change(function() {
        var selectedMethod = $(this).val();
        if (selectedMethod === 'paytm') {
            $('#paytmDetails').show();
            $('#upiDetails').hide();
        } else if (selectedMethod === 'upi') {
            $('#upiDetails').show();
            $('#paytmDetails').hide();
        } else {
            $('#paytmDetails').hide();
            $('#upiDetails').hide();
        }
    });

    $('#payButton').click(function() {
        var paymentMethod = $('#paymentMethod').val();
        var paymentDetails = '';
        if (paymentMethod === 'paytm') {
            paymentDetails = 'Paytm Number: ' + $('#paytmNumber').val();
        } else if (paymentMethod === 'upi') {
            paymentDetails = 'UPI ID: ' + $('#upiId').val();
        } else {
            paymentDetails = 'Card Payment';
        }
        // Here you can perform further processing such as submitting payment details to a server-side endpoint
        console.log('Payment Method: ' + paymentMethod);
        console.log('Payment Details: ' + paymentDetails);
    });
    $('#payButton').click(function() {
        // Create the order
        var order = {
            fullName: orderDetails.fullName || '',
            deliveryAddress: orderDetails.deliveryAddress || '',
            pinCode: orderDetails.pinCode || '',
            mobileModel: orderDetails.mobileModel || '',
            mobilePrice: orderDetails.mobilePrice || 0,
            totalPrice: mobileTotalPrice.toFixed(2)
        };

        // Save the order to localStorage or send it to server-side for processing
        localStorage.setItem('order', JSON.stringify(order));

        // Redirect to the recipe page
        window.location.href = 'recipe.html';
    });
});