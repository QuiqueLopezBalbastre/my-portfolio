// ===== NAVIGATION SYSTEM =====

class NavigationManager {
    constructor() {
        this.burger = document.querySelector('.burger');
        this.nav = document.querySelector('.nav-links');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.header = document.querySelector('header');

        this.init();
    }

    init() {
        this.setupBurgerMenu();
        this.setupSmoothScrolling();
        this.setupActiveLinks();
        // this.setupHeaderScroll();
    }

    setupBurgerMenu() {
        if (this.burger && this.nav) {
            this.burger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.burger.contains(e.target) && !this.nav.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        this.nav.classList.toggle('nav-activo');
        this.burger.classList.toggle('toggle');

        // Prevent body scroll when menu is open
        if (this.nav.classList.contains('nav-activo')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.nav.classList.remove('nav-activo');
        this.burger.classList.remove('toggle');
        document.body.style.overflow = '';
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle internal links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        this.smoothScrollTo(targetElement);
                    }
                }
            });
        });
    }

    smoothScrollTo(element) {
        const headerHeight = this.header.offsetHeight;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');

        const observerOptions = {
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveLink(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');

            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

setupHeaderScroll() {
    let lastScrollTop = 0;
    let ticking = false;
    let isNavHidden = false;
    
    // Asegurar que tenemos el elemento nav correcto
    const navbar = document.querySelector('nav');
    if (!navbar) {
        console.error('No se encontró el elemento nav');
        return;
    }
    
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Debug temporal - descomenta para verificar
        console.log(`Scroll: ${scrollTop}, Last: ${lastScrollTop}, NavHidden: ${isNavHidden}`);
        console.log('Nav element:', navbar);
        
        // Evitar cálculos si el scroll es muy pequeño
        if (Math.abs(scrollTop - lastScrollTop) < 3) {
            ticking = false;
            return;
        }
        
        // Siempre mostrar el nav en la parte superior
        if (scrollTop <= 50) {
            this.showNav(navbar);
            isNavHidden = false;
        }
        // Ocultar al hacer scroll hacia abajo (después de 100px)
        else if (scrollTop > lastScrollTop && scrollTop > 100 && !isNavHidden) {
            this.hideNav(navbar);
            isNavHidden = true;
        }
        // Mostrar al hacer scroll hacia arriba
        else if (scrollTop < lastScrollTop && isNavHidden) {
            this.showNav(navbar);
            isNavHidden = false;
        }
        
        // Efecto de blur
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });
}
}

// Performance optimization: Initialize only when DOM is ready
const initNavigation = () => {
    return new NavigationManager();
};

// Export for use in main.js
window.NavigationManager = NavigationManager;
window.initNavigation = initNavigation;