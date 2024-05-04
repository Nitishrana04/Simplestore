$(document).ready(function() {
    // Event listener for order details form submission
    $('#orderDetailsForm').submit(function(e) {
        e.preventDefault();
        
        // Retrieve form data
        var formData = {
            fullName: $('#fullName').val(),
            deliveryAddress: $('#deliveryAddress').val(),
            pinCode: $('#pinCode').val(),
            country: $('#country').val(),
            city: $('#city').val(),
            mobileNumber: $('#mobileNumber').val(),
            email: $('#email').val()
        };
        
        // Store form data in localStorage
        localStorage.setItem('orderDetails', JSON.stringify(formData));
        
        // Redirect the user to the payment page
        window.location.href = 'payment.html';
    });
});
