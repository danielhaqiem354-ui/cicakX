
/* CicakX - Form Validation and Subscription Calculator */

function validateForm() {

    // Clear previous error messages
    document.getElementById("customerNameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("packageError").innerHTML = "";
    document.getElementById("durationError").innerHTML = "";
    document.getElementById("result").innerHTML = "";

    // 1. Get form values
    const customerName = document.getElementById("customerName").value;
    const email = document.getElementById("email").value;
    const packageValue = document.getElementById("package").value;
    const durationValue = document.getElementById("duration").value;

    let isValid = true;

    // 2 Validate Customer Name
    if (customerName.trim() === "") {
        document.getElementById("customerNameError").innerHTML =
            "Customer Name must be filled out.";
        isValid = false;
    }

    // 3 Validate Email Address
    if (email.trim() === "") {
        document.getElementById("emailError").innerHTML =
            "Email is required.";
        isValid = false;
    } else if (!document.getElementById("email").checkValidity()) {
        document.getElementById("emailError").innerHTML =
            "Please enter a valid email address.";
        isValid = false;
    }

    // 4 Validate Package
    if (packageValue === "") {
        document.getElementById("packageError").innerHTML =
            "Please select a package.";
        isValid = false;
    } else if (packageValue !== "50" &&
               packageValue !== "100" &&
               packageValue !== "150") {
        document.getElementById("packageError").innerHTML =
            "Invalid package selected.";
        isValid = false;
    }

    // 5 Validate Duration
    if (durationValue === "") {
        document.getElementById("durationError").innerHTML =
            "Please select a subscription duration.";
        isValid = false;
    } else if (durationValue !== "1" &&
               durationValue !== "6" &&
               durationValue !== "12") {
        document.getElementById("durationError").innerHTML =
            "Invalid subscription duration.";
        isValid = false;
    }

    // 6 Focus on the first invalid input
    if (isValid === false) {

        if (document.getElementById("customerNameError").innerHTML !== "") {
            document.getElementById("customerName").focus();

        } else if (document.getElementById("emailError").innerHTML !== "") {
            document.getElementById("email").focus();

        } else if (document.getElementById("packageError").innerHTML !== "") {
            document.getElementById("package").focus();

        } else if (document.getElementById("durationError").innerHTML !== "") {
            document.getElementById("duration").focus();
        }

        return false;
    }

    // 7 Convert values to numbers
    const packagePrice = Number(packageValue);
    const duration = Number(durationValue);

    // 8. Calculate Subscription
    calculateSubscription(customerName, email, packagePrice, duration);

    alert("Calculation complete!");

    return false;
}


/* Subscription Calculation Function */

function calculateSubscription(customerName, email, packagePrice, duration) {

    // 1 Identify Package
    let packageName = "";

 
    if (packagePrice === 50) {
        packageName = "Mask & Gloves";
    } else if (packagePrice === 100) {
        packageName = "Superhero suit";
    } else {
        packageName = "Complete Hero Equipment";
    }


    // 2 Calculate Subtotal
    let subtotal = packagePrice * duration;

    // 3 Determine Discount
    let discountRate = 0;

    if (duration === 6) {
        discountRate = 0.10;
    } else if (duration === 12) {
        discountRate = 0.15;
    }

    // 4. Calculate Final Price
    let discountAmount = subtotal * discountRate;
    let finalTotal = subtotal - discountAmount;

    // 5. Display Result
    document.getElementById("result").innerHTML =
        "<h3>Subscription Summary</h3>" +
        "<p>Customer Name: <span id='resultName'></span></p>" +
        "<p>Email: <span id='resultEmail'></span></p>" +
        "<p>Package: " + packageName + "</p>" +
        "<p>Monthly Price: RM" + packagePrice.toFixed(2) + "</p>" +
        "<p>Duration: " + duration + " Month(s)</p>" +
        "<p>Subtotal: RM" + subtotal.toFixed(2) + "</p>" +
        "<p>Discount: " + (discountRate * 100) + "%</p>" +
        "<p>Discount Amount: RM" + discountAmount.toFixed(2) + "</p>" +
        "<h4>Final Total: RM" + finalTotal.toFixed(2) + "</h4>";

    document.getElementById("resultName").textContent = customerName;
    document.getElementById("resultEmail").textContent = email;
}

