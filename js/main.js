// ===== MAIN APPLICATION CONTROLLER - INICIALIZACIÓN CORREGIDA =====

class PortfolioApp {
    constructor() {
        this.managers = {};
        this.isInitialized = false;
        this.performanceMetrics = {
            startTime: performance.now(),
            loadTime: null,
            interactionCount: 0
        };
        
        this.init();
    }
    
    async init() {
        try {
            // Show loading indicator
            this.showLoadingIndicator();
            
            // ORDEN CRÍTICO: Inicializar sistemas en orden de dependencia
            await this.initializeManagers();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Performance optimizations
            this.setupPerformanceOptimizations();
            
            // Accessibility enhancements
            this.setupAccessibility();
            
            // Initialize interactions
            this.initializeInteractions();
            
            // Hide loading indicator
            this.hideLoadingIndicator();
            
            // Mark as initialized
            this.isInitialized = true;
            this.performanceMetrics.loadTime = performance.now() - this.performanceMetrics.startTime;
            
            console.log(`Portfolio app initialized in ${this.performanceMetrics.loadTime.toFixed(2)}ms`);
            
        } catch (error) {
            console.error('Failed to initialize portfolio app:', error);
            this.handleInitializationError(error);
        }
    }
    
    showLoadingIndicator() {
        // Create and show a subtle loading indicator
        const loader = document.createElement('div');
        loader.id = 'app-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            animation: loadingProgress 2s ease-in-out;
        `;
        
        document.body.appendChild(loader);
        
        // Add loading animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes loadingProgress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    hideLoadingIndicator() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.animation = 'loadingProgress 0.3s ease-out reverse';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 300);
        }
    }
    
    async initializeManagers() {
        console.log('Inicializando managers en orden de dependencia...');
        
        // 1. Navigation (no dependencies)
        if (typeof NavigationManager !== 'undefined') {
            this.managers.navigation = new NavigationManager();
            window.navigationManager = this.managers.navigation;
            console.log('✓ NavigationManager inicializado');
        }
        
        // 2. Tooltip system (no dependencies)
        if (typeof TooltipManager !== 'undefined') {
            this.managers.tooltip = new TooltipManager();
            window.tooltipManager = this.managers.tooltip;
            console.log('✓ TooltipManager inicializado');
        }
        
        // 3. Modal system (no dependencies) - DEBE cargar JSON aquí
        if (typeof ModalManager !== 'undefined') {
            this.managers.modal = new ModalManager();
            window.modalManager = this.managers.modal;
            
            // CRÍTICO: Esperar a que el modal manager cargue los datos del JSON
            await this.waitForModalManagerInit();
            console.log('✓ ModalManager inicializado con datos JSON');
        }
        
        // 4. Map interactions (depends on modal with JSON data loaded)
        if (typeof MapInteractionManager !== 'undefined') {
            this.managers.mapInteractions = new MapInteractionManager();
            window.mapManager = this.managers.mapInteractions;
            
            // CRÍTICO: Esperar a que el map manager cargue los datos
            await this.waitForMapManagerInit();
            console.log('✓ MapInteractionManager inicializado con datos JSON');
        }
        
        console.log('Todos los managers inicializados:', Object.keys(this.managers));
    }
    
    // Esperar a que el modal manager termine de cargar datos JSON
    async waitForModalManagerInit() {
        const maxAttempts = 50; // 5 segundos máximo
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            if (this.managers.modal.projectsData) {
                console.log('Modal manager tiene datos cargados');
                return;
            }
            
            console.log(`Esperando datos del modal manager... (${attempts + 1}/${maxAttempts})`);
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        console.warn('Timeout esperando datos del modal manager');
    }
    
    // Esperar a que el map manager termine de cargar datos JSON
    async waitForMapManagerInit() {
        const maxAttempts = 50; // 5 segundos máximo
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            if (this.managers.mapInteractions.projectsData) {
                console.log('Map manager tiene datos cargados');
                return;
            }
            
            console.log(`Esperando datos del map manager... (${attempts + 1}/${maxAttempts})`);
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        console.warn('Timeout esperando datos del map manager');
    }
    
    setupGlobalEvents() {
        // Global error handling
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleGlobalError(event.error);
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleGlobalError(event.reason);
        });
        
        // Page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });
        
        // Online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
        
        // Resize events (throttled)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Performance monitoring
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
        });
    }
    
    setupPerformanceOptimizations() {
        // Intersection Observer for animations
        this.setupScrollAnimations();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup service worker (if available)
        this.setupServiceWorker();
        
        // Memory cleanup
        this.setupMemoryManagement();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with the 'oculto' class
        const hiddenElements = document.querySelectorAll('.oculto');
        hiddenElements.forEach(el => observer.observe(el));
    }
    
    preloadCriticalResources() {
        // Ya no precargar desde window.projectData, usar el sistema dinámico
        console.log('Preload de recursos críticos completado');
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }
    
    setupMemoryManagement() {
        // Clean up unused resources periodically
        setInterval(() => {
            this.cleanupMemory();
        }, 300000); // Every 5 minutes
    }
    
    setupAccessibility() {
        // Skip links for keyboard navigation
        this.createSkipLinks();
        
        // Announce route changes to screen readers
        this.setupRouteAnnouncements();
        
        // High contrast mode detection
        this.detectHighContrastMode();
        
        // Focus management
        this.setupFocusManagement();
    }
    
    createSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#mapa-interactivo" class="skip-link">Saltar al mapa interactivo</a>
            <a href="#hero" class="skip-link">Saltar al contenido principal</a>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .skip-links {
                position: absolute;
                top: -40px;
                left: 6px;
                z-index: 10000;
            }
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                color: white;
                background: var(--bg-dark);
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                transition: top 0.3s;
            }
            .skip-link:focus {
                top: 6px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.prepend(skipLinks);
    }
    
    setupRouteAnnouncements() {
        const announcer = document.createElement('div');
        announcer.id = 'route-announcer';
        announcer.setAttribute('aria-live', 'assertive');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
    }
    
    detectHighContrastMode() {
        if (window.matchMedia) {
            const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
            
            const handleHighContrast = (e) => {
                if (e.matches) {
                    document.body.classList.add('high-contrast');
                } else {
                    document.body.classList.remove('high-contrast');
                }
            };
            
            highContrastQuery.addListener(handleHighContrast);
            handleHighContrast(highContrastQuery);
        }
    }
    
    setupFocusManagement() {
        // Track focus for keyboard users
        let isUsingKeyboard = false;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                isUsingKeyboard = true;
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            isUsingKeyboard = false;
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    initializeInteractions() {
        // Initialize any additional interactions
        this.setupKeyboardShortcuts();
        this.setupTouchGestures();
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Escape key - close any open modals
            if (e.key === 'Escape') {
                if (this.managers.modal?.isModalOpen()) {
                    this.managers.modal.closeModal();
                }
            }
            
            // Number keys 1-6 - highlight corresponding region
            if (e.key >= '1' && e.key <= '6') {
                const regionMap = {
                    '1': 'gallaecia',
                    '2': 'tarraconensis',
                    '3': 'cartaginensis',
                    '4': 'lusitania',
                    '5': 'baetica',
                    '6': 'baleares'
                };
                
                const regionId = regionMap[e.key];
                if (regionId && this.managers.mapInteractions) {
                    this.managers.mapInteractions.highlightContinent(regionId);
                }
            }
        });
    }
    
    setupTouchGestures() {
        // Add touch gesture support for mobile devices
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Prevent zoom on double tap for better UX
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }
    }
    
    // Event Handlers
    handleGlobalError(error) {
        // Log error for development
        console.error('Portfolio app error:', error);
        
        // Show user-friendly error message
        this.showUserMessage('Ha ocurrido un error. Por favor, recarga la página.', 'error');
    }
    
    handleInitializationError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-dark);
            color: var(--text-light);
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            z-index: 10000;
        `;
        errorContainer.innerHTML = `
            <h2>Error de Inicialización</h2>
            <p>No se pudo cargar el portfolio correctamente.</p>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem;">
                Recargar Página
            </button>
        `;
        document.body.appendChild(errorContainer);
    }
    
    handlePageHidden() {
        // Pause any animations or heavy processes
        this.performanceMetrics.backgroundTime = performance.now();
    }
    
    handlePageVisible() {
        // Resume animations or processes
        if (this.performanceMetrics.backgroundTime) {
            const backgroundDuration = performance.now() - this.performanceMetrics.backgroundTime;
            console.log(`Page was in background for ${backgroundDuration.toFixed(2)}ms`);
        }
    }
    
    handleOnlineStatus(isOnline) {
        const message = isOnline ? 
            'Conexión restaurada' : 
            'Sin conexión a internet';
        const type = isOnline ? 'success' : 'warning';
        
        this.showUserMessage(message, type);
    }
    
    handleResize() {
        // Trigger resize handlers in managers
        Object.values(this.managers).forEach(manager => {
            if (manager.handleResize) {
                manager.handleResize();
            }
        });
    }
    
    // Utility Methods
    showUserMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `user-message message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-secondary);
            color: var(--text-light);
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
    
    cleanupMemory() {
        // Remove unused event listeners
        // Clear caches if they get too large
        if (this.managers.tooltip?.tooltipCache && 
            Object.keys(this.managers.tooltip.tooltipCache).length > 50) {
            this.managers.tooltip.tooltipCache = {};
        }
    }
    
    trackSessionEnd() {
        const sessionDuration = performance.now() - this.performanceMetrics.startTime;
        console.log(`Session duration: ${(sessionDuration / 1000).toFixed(2)}s`);
        console.log(`Interactions: ${this.performanceMetrics.interactionCount}`);
    }
    
    // Public API
    getManager(name) {
        return this.managers[name];
    }
    
    isReady() {
        return this.isInitialized;
    }
    
    getPerformanceMetrics() {
        return { ...this.performanceMetrics };
    }
    
    // Método para recargar datos JSON durante desarrollo
    async reloadAllProjectData() {
        console.log('Recargando todos los datos de proyectos...');
        
        if (this.managers.modal) {
            await this.managers.modal.reloadProjectsData();
        }
        
        if (this.managers.mapInteractions) {
            await this.managers.mapInteractions.reloadProjectsData();
        }
        
        console.log('Todos los datos recargados exitosamente');
    }
}

// Initialize app when DOM is ready
const initApp = () => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.portfolioApp = new PortfolioApp();
        });
    } else {
        window.portfolioApp = new PortfolioApp();
    }
};

// Start the application
initApp();

// Export for debugging
window.PortfolioApp = PortfolioApp;

// Función global para debugging durante desarrollo
window.debugProjects = async () => {
    console.log('=== DEBUG PROJECT DATA ===');
    
    if (window.modalManager) {
        console.log('Modal Manager projects:', window.modalManager.getAllProjects());
    }
    
    if (window.mapManager) {
        console.log('Map Manager projects:', window.mapManager.getAllProjects());
    }
    
    if (window.portfolioApp) {
        await window.portfolioApp.reloadAllProjectData();
    }
    
    console.log('=== END DEBUG ===');
};