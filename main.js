const burger = document.getElementById("hamburger");
const list = document.getElementById("navlist");

burger.addEventListener("click",()=>{
    
    list.classList.toggle("navlist-active");
})

document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    let cartCount = 0;

    const cartIcon = document.getElementById("cart-icon");
    const cartSection = document.getElementById("cart-section");
    const closeCart = document.getElementById("close-cart");
    const cartCountDisplay = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const productName = this.getAttribute("data-name");
            const productPrice = parseInt(this.getAttribute("data-price"));
            const productImage = this.getAttribute("data-image");

            // Check if product already exists in cart
            let existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    totalPrice: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            cartCount++;
            updateCartUI();
        });
    });

    // Update Cart UI
    function updateCartUI() {
        cartCountDisplay.textContent = cartCount;
        cartItemsContainer.innerHTML = "";

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-details">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: Rs.${item.price}</p>
                    <p>Total: Rs.${item.totalPrice}</p>
                </div>
                <div class="cart-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeItem(${index})">x</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Increase or Decrease Quantity
    window.updateQuantity = function (index, change) {
        cart[index].quantity += change;
        cart[index].totalPrice = cart[index].price * cart[index].quantity;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        updateCartUI();
    };

    // Remove Item
    window.removeItem = function (index) {
        cartCount -= cart[index].quantity;
        cart.splice(index, 1);
        updateCartUI();
    };

    // Show Cart
    cartIcon.addEventListener("click", function () {
        cartSection.style.display = "block";
    });

    // Close Cart
    closeCart.addEventListener("click", function () {
        cartSection.style.display = "none";
    });
});


 // Read More Button
document.getElementById("read-more-btn").addEventListener("click", function(event) {
    event.preventDefault();
    var moreText = document.getElementById("more-text");
    var btnText = document.getElementById("read-more-btn");
    
    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        btnText.textContent = "Read Less";
    } else {
        moreText.style.display = "none";
        btnText.textContent = "Read More";
    }
});

// Shop Now Button

document.getElementById("shop-now-btn").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "perfumes.html";
});


