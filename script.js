// Product data
const products = [
    {
        id: 1,
        name: "Orange Juice",
        description: "Fresh squeezed orange juice packed with Vitamin C",
        price: 1500,
        icon: "🍊",
        ingredients: ["100% Fresh Oranges", "Natural Vitamin C", "No Added Sugar", "No Preservatives"],
        benefits: ["Rich in Vitamin C", "Boosts Immunity", "Natural Antioxidants", "Supports Skin Health"]
    },
    {
        id: 2,
        name: "Apple Juice",
        description: "Crisp and refreshing apple juice from organic apples",
        price: 1800,
        icon: "🍎",
        ingredients: ["100% Organic Apples", "Natural Fiber", "No Added Sugar", "Cold Pressed"],
        benefits: ["Rich in Fiber", "Heart Healthy", "Natural Energy", "Digestive Support"]
    },
    {
        id: 3,
        name: "Carrot Juice",
        description: "Nutrient-rich carrot juice for healthy vision",
        price: 2000,
        icon: "🥕",
        ingredients: ["100% Fresh Carrots", "Beta Carotene", "Natural Vitamins", "No Additives"],
        benefits: ["Improves Vision", "Rich in Beta Carotene", "Skin Health", "Immune Support"]
    },
    {
        id: 4,
        name: "Green Smoothie",
        description: "Spinach, kale, and apple blend for ultimate nutrition",
        price: 2500,
        icon: "🥬",
        ingredients: ["Fresh Spinach", "Organic Kale", "Green Apples", "Cucumber", "Lemon"],
        benefits: ["Detox Support", "Rich in Iron", "Alkalizing", "Energy Boost"]
    },
    {
        id: 5,
        name: "Pineapple Juice",
        description: "Tropical pineapple juice with natural enzymes",
        price: 2200,
        icon: "🍍",
        ingredients: ["100% Fresh Pineapple", "Natural Enzymes", "Bromelain", "No Added Sugar"],
        benefits: ["Digestive Enzymes", "Anti-inflammatory", "Tropical Vitamins", "Metabolism Support"]
    },
    {
        id: 6,
        name: "Watermelon Juice",
        description: "Hydrating watermelon juice perfect for hot days",
        price: 1600,
        icon: "🍉",
        ingredients: ["100% Fresh Watermelon", "Natural Electrolytes", "Lycopene", "No Additives"],
        benefits: ["Hydrating", "Rich in Lycopene", "Natural Electrolytes", "Cooling Effect"]
    }
];

// Cart functionality
let cart = [];

// Floating fruits animation
function initFloatingFruits() {
    const fruitsContainer = document.getElementById('floating-fruits');
    if (!fruitsContainer) return;
    
    const fruits = ['🍊', '🍎', '🥕', '🍍', '🍉', '🥬', '🍋', '🍒', '🍇', '🥝'];
    
    function createFruit() {
        const fruit = document.createElement('div');
        fruit.className = 'fruit-emoji';
        fruit.textContent = fruits[Math.floor(Math.random() * fruits.length)];
        fruit.style.left = (Math.random() * 90 + 5) + '%';
        const duration = Math.random() * 4 + 6;
        fruit.style.animationDuration = duration + 's';
        fruit.style.fontSize = (Math.random() * 1 + 2) + 'rem';
        
        fruitsContainer.appendChild(fruit);
        
        setTimeout(() => fruit.remove(), duration * 1000);
    }
    
    for (let i = 0; i < 8; i++) {
        setTimeout(createFruit, i * 400);
    }
    
    setInterval(createFruit, 600);
}

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartDisplay();
    initScrollAnimations();
    initSmoothScrolling();
    initFloatingFruits();
});

// Smooth scrolling function
function smoothScroll(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If element not found, navigate to appropriate page
        const pageMap = {
            'home': 'index.html',
            'products': 'products.html',
            'about': 'about.html',
            'contact': 'contact.html'
        };
        if (pageMap[targetId]) {
            window.location.href = pageMap[targetId];
        }
    }
}

// Initialize smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
}

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">₦${product.price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="detail-btn" onclick="showProductDetail(${product.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
}

function showCartNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #7cb342, #8bc34a);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        z-index: 1002;
        animation: slideInBounce 0.5s ease;
        box-shadow: 0 5px 15px rgba(124, 179, 66, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
    `;
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Item added to cart!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Create WhatsApp message
    let message = "Hello! I'd like to order the following juices from Eatwell & StayOrganic:\n\n";
    
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: ₦${total.toLocaleString()}\n\nPlease confirm my order. Thank you!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2347036496552?text=${encodedMessage}`;
    
    // Open WhatsApp with success animation
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.innerHTML;
    
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        checkoutBtn.innerHTML = '<i class="fas fa-check"></i> Order Sent!';
        
        setTimeout(() => {
            checkoutBtn.innerHTML = originalText;
            checkoutBtn.disabled = false;
        }, 2000);
    }, 1000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInBounce {
        0% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
        60% {
            transform: translateX(-10px) scale(1.05);
            opacity: 1;
        }
        100% {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .navbar {
        backdrop-filter: blur(10px);
        background: rgba(45, 80, 22, 0.95) !important;
    }
    
    .product-card {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(45, 80, 22, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(45, 80, 22, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Product detail modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${product.icon} ${product.name}</h2>
                <button class="close-modal" onclick="closeProductDetail()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="product-detail-price">₦${product.price.toLocaleString()}</div>
                <p class="product-detail-desc">${product.description}</p>
                
                <div class="detail-section">
                    <h3><i class="fas fa-leaf"></i> Ingredients</h3>
                    <ul class="ingredients-list">
                        ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-heart"></i> Health Benefits</h3>
                    <ul class="benefits-list">
                        ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="add-to-cart-modal" onclick="addToCart(${product.id}); closeProductDetail();">
                        <i class="fas fa-cart-plus"></i> Add to Cart - ₦${product.price.toLocaleString()}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeProductDetail() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// Initialize on load
window.addEventListener('load', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (navMenu) navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const whatsappMessage = `Hello! I'm ${name}\n\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/2347036496552?text=${encodedMessage}`, '_blank');
        });
    }
});