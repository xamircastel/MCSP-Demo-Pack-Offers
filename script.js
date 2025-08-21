// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Back button functionality
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback to home page or previous page
        window.location.href = '/';
    }
}

// Wishlist functionality
document.addEventListener('DOMContentLoaded', function() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const heartIcon = wishlistBtn.querySelector('i');
    
    let isInWishlist = false;
    
    wishlistBtn.addEventListener('click', () => {
        isInWishlist = !isInWishlist;
        
        if (isInWishlist) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            wishlistBtn.style.background = 'var(--error-color)';
            wishlistBtn.style.color = 'white';
            wishlistBtn.style.borderColor = 'var(--error-color)';
            
            // Show success message
            showToast('Añadido a favoritos', 'success');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            wishlistBtn.style.background = 'var(--bg-secondary)';
            wishlistBtn.style.color = 'var(--text-secondary)';
            wishlistBtn.style.borderColor = 'var(--border-color)';
            
            // Show removal message
            showToast('Eliminado de favoritos', 'info');
        }
    });
});

// Subscribe button functionality
document.addEventListener('DOMContentLoaded', function() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    subscribeBtn.addEventListener('click', () => {
        // Add loading state
        subscribeBtn.classList.add('loading');
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        
        // Simulate API call
        setTimeout(() => {
            subscribeBtn.classList.remove('loading');
            subscribeBtn.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
            subscribeBtn.style.background = 'var(--success-color)';
            
            showToast('¡Suscripción exitosa! Bienvenido a Kokoro KIDS', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                subscribeBtn.innerHTML = '<i class="fas fa-play"></i> Subscribir';
                subscribeBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
            }, 3000);
        }, 2000);
    });
});

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartBadge = document.querySelector('.cart-badge');
    let cartCount = parseInt(cartBadge.textContent) || 0;
    
    cartBtn.addEventListener('click', () => {
        cartCount++;
        cartBadge.textContent = cartCount;
        cartBadge.style.display = 'block';
        
        // Add animation
        cartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 150);
        
        showToast('Producto añadido al carrito', 'success');
    });
});

// Recommendation cards click functionality
document.addEventListener('DOMContentLoaded', function() {
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    
    recommendationCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-4px)';
            }, 100);
            
            // Simulate navigation to content detail
            const title = card.querySelector('h3').textContent;
            showToast(`Navegando a ${title}...`, 'info');
            
            // In a real app, you would navigate to the content detail page
            // window.location.href = `/content/${contentId}`;
        });
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');
    
    searchInput.addEventListener('focus', () => {
        searchContainer.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchContainer.style.transform = 'scale(1)';
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length > 2) {
            // Simulate search functionality
            console.log('Searching for:', query);
            // In a real app, you would make an API call here
        }
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active state from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active state to clicked item
            item.classList.add('active');
            
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
            
            const navText = item.querySelector('span').textContent;
            showToast(`Navegando a ${navText}`, 'info');
        });
    });
});

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 20px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    toast.style.background = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.recommendation-card, .feature-item, .feature-detail');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close modals or go back
    if (e.key === 'Escape') {
        goBack();
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Performance optimization - Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Error handling for failed image loads
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Imagen+no+disponible';
            this.alt = 'Imagen no disponible';
        });
    });
});

// Auto-hide header on scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
