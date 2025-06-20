// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggle());
    }
}

// Falling Leaves Animation
class FallingLeaves {
    constructor() {
        this.container = document.getElementById('leavesContainer');
        this.leaves = [];
        this.maxLeaves = 15;
        this.init();
    }

    init() {
        this.createLeaves();
        this.startAnimation();
    }

    createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Random positioning and animation properties
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 5 + 8; // 8-13 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        const size = Math.random() * 8 + 8; // 8-16px
        
        leaf.style.left = startX + 'px';
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = delay + 's';
        
        // Add some horizontal drift
        const drift = Math.random() * 100 - 50; // -50 to 50px
        leaf.style.setProperty('--drift', drift + 'px');
        
        return leaf;
    }

    createLeaves() {
        for (let i = 0; i < this.maxLeaves; i++) {
            const leaf = this.createLeaf();
            this.container.appendChild(leaf);
            this.leaves.push(leaf);
        }
    }

    startAnimation() {
        // Continuously add new leaves
        setInterval(() => {
            if (this.leaves.length < this.maxLeaves) {
                const leaf = this.createLeaf();
                this.container.appendChild(leaf);
                this.leaves.push(leaf);

                // Remove leaf after animation completes
                setTimeout(() => {
                    if (leaf.parentNode) {
                        leaf.parentNode.removeChild(leaf);
                        this.leaves = this.leaves.filter(l => l !== leaf);
                    }
                }, 15000); // Max animation time
            }
        }, 1000); // Add new leaf every second
    }
}

// Lightning Effects
class LightningEffects {
    constructor() {
        this.container = document.getElementById('lightningContainer');
        this.init();
    }

    init() {
        this.addRandomLightning();
    }

    createLightning() {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        
        const x = Math.random() * window.innerWidth;
        const intensity = Math.random() * 0.8 + 0.2; // 0.2 to 1
        
        lightning.style.left = x + 'px';
        lightning.style.opacity = intensity;
        lightning.style.width = Math.random() * 3 + 1 + 'px';
        
        return lightning;
    }

    addRandomLightning() {
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every interval
                const lightning = this.createLightning();
                this.container.appendChild(lightning);
                
                // Flash effect
                document.body.style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    document.body.style.filter = 'brightness(1)';
                }, 100);
                
                // Remove lightning after animation
                setTimeout(() => {
                    if (lightning.parentNode) {
                        lightning.parentNode.removeChild(lightning);
                    }
                }, 500);
            }
        }, 3000); // Check every 3 seconds
    }
}

// Particles Background
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particlesContainer');
        this.particles = [];
        this.maxParticles = 20;
        this.init();
    }

    init() {
        this.createParticles();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 4 + 4; // 4-8 seconds
        const delay = Math.random() * 2; // 0-2 seconds
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        return particle;
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
}

// Button Interactions
class ButtonManager {
    constructor() {
        this.buttons = document.querySelectorAll('.button-item');
        this.init();
    }

    init() {
        this.bindEvents();
        this.addRippleEffect();
    }

    bindEvents() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const link = button.getAttribute('data-link');
                if (link) {
                    // Add click animation
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = '';
                        window.open(link, '_blank');
                    }, 150);
                }
            });

            // Add hover sound effect (visual feedback)
            button.addEventListener('mouseenter', () => {
                this.addHoverEffect(button);
            });
        });
    }

    addRippleEffect() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                // Add ripple styles
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    addHoverEffect(button) {
        // Create a temporary glow effect
        const glow = document.createElement('div');
        glow.style.position = 'absolute';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.right = '0';
        glow.style.bottom = '0';
        glow.style.background = 'rgba(255, 215, 0, 0.1)';
        glow.style.borderRadius = '20px';
        glow.style.pointerEvents = 'none';
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 0.3s ease';
        
        button.style.position = 'relative';
        button.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            glow.remove();
        }, 300);
    }
}

// Smooth Animations and Page Load Effects
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.addLoadAnimations();
        this.addScrollAnimations();
        this.addMouseFollower();
    }

    addLoadAnimations() {
        // Stagger animation for buttons
        const buttons = document.querySelectorAll('.button-item');
        buttons.forEach((button, index) => {
            button.style.animationDelay = `${0.2 + index * 0.1}s`;
        });
    }

    addScrollAnimations() {
        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const leaves = document.querySelector('.leaves-container');
            if (leaves) {
                leaves.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    addMouseFollower() {
        // Subtle mouse follower effect
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth following animation
        const animate = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            // Apply subtle transform to profile image
            const profileImage = document.querySelector('.profile-circle');
            if (profileImage) {
                const rect = profileImage.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (followerX - centerX) * 0.01;
                const deltaY = (followerY - centerY) * 0.01;
                
                profileImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1)`;
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Keyboard Shortcuts
class KeyboardManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // T key for theme toggle
            if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey) {
                const themeToggle = document.getElementById('themeToggle');
                themeToggle.click();
            }
            
            // Number keys 1-5 for button shortcuts
            if (e.key >= '1' && e.key <= '5' && !e.ctrlKey && !e.altKey) {
                const buttonIndex = parseInt(e.key) - 1;
                const buttons = document.querySelectorAll('.button-item');
                if (buttons[buttonIndex]) {
                    buttons[buttonIndex].click();
                }
            }
        });
    }
}

// Performance Monitor
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        // Optimize animations based on device performance
        this.checkPerformance();
        this.addVisibilityHandling();
    }

    checkPerformance() {
        // Reduce effects on lower-end devices
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection && connection.effectiveType === 'slow-2g') {
            this.reduceAnimations();
        }
        
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.reduceAnimations();
        }
    }

    reduceAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    addVisibilityHandling() {
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const leaves = document.querySelectorAll('.leaf');
            const lightning = document.querySelectorAll('.lightning');
            
            if (document.hidden) {
                leaves.forEach(leaf => leaf.style.animationPlayState = 'paused');
                lightning.forEach(bolt => bolt.style.animationPlayState = 'paused');
            } else {
                leaves.forEach(leaf => leaf.style.animationPlayState = 'running');
                lightning.forEach(bolt => bolt.style.animationPlayState = 'running');
            }
        });
    }
}

// Gallery Animation Manager
class GalleryManager {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.addStaggeredAnimation();
        this.addClickEvents();
        this.addKeyboardNavigation();
    }

    addStaggeredAnimation() {
        this.galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${1 + index * 0.1}s`;
            item.style.opacity = '0';
            item.style.animation = `fadeInUp 0.6s ease-out ${1 + index * 0.1}s forwards`;
        });
    }

    addClickEvents() {
        this.galleryItems.forEach(item => {
            const card = item.querySelector('.gallery-card');
            
            // Click to flip
            item.addEventListener('click', () => {
                card.style.transform = card.style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
            });

            // Double click to reset
            item.addEventListener('dblclick', () => {
                card.style.transform = 'rotateY(0deg)';
            });
        });
    }

    addKeyboardNavigation() {
        let currentIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                this.focusGalleryItem(currentIndex);
            } else if (e.key === 'ArrowRight' && currentIndex < this.galleryItems.length - 1) {
                currentIndex++;
                this.focusGalleryItem(currentIndex);
            } else if (e.key === ' ' || e.key === 'Enter') {
                if (document.activeElement.closest('.gallery-item')) {
                    e.preventDefault();
                    document.activeElement.closest('.gallery-item').click();
                }
            }
        });
    }

    focusGalleryItem(index) {
        this.galleryItems[index].focus();
        this.galleryItems[index].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const themeManager = new ThemeManager();
    const fallingLeaves = new FallingLeaves();
    const lightningEffects = new LightningEffects();
    const particleSystem = new ParticleSystem();
    const buttonManager = new ButtonManager();
    const animationManager = new AnimationManager();
    const keyboardManager = new KeyboardManager();
    const performanceManager = new PerformanceManager();
    const galleryManager = new GalleryManager();
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Console greeting
    console.log('%c🌟 Personal Bio Website Loaded Successfully! 🌟', 
        'color: #ffd700; font-size: 16px; font-weight: bold;');
    console.log('%cKeyboard shortcuts:\n• Press "T" to toggle theme\n• Press 1-5 to click buttons', 
        'color: #74b9ff; font-size: 12px;');
});

// Handle window resize for responsive animations
window.addEventListener('resize', () => {
    // Recalculate particle positions
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
    });
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Service worker file would need to be created separately
        // This is just the registration code
        console.log('Service Worker support detected (not implemented in this demo)');
    });
}

// Export for potential module usage
window.PersonalBio = {
    ThemeManager,
    FallingLeaves,
    LightningEffects,
    ParticleSystem,
    ButtonManager,
    AnimationManager
};
