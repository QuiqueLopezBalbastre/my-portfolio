// ===== MAIN APPLICATION CONTROLLER - FIXED FOR JSON LOADING =====

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
            console.log('PortfolioApp: Iniciando aplicación...');
            
            // Show loading indicator
            this.showLoadingIndicator();
            
            // ORDEN CRÍTICO: Inicializar sistemas en orden de dependencia
            await this.initializeManagers();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Accessibility enhancements
            this.setupAccessibility();
            
            // Initialize interactions
            this.initializeInteractions();
            
            // Hide loading indicator
            this.hideLoadingIndicator();
            
            // Mark as initialized
            this.isInitialized = true;
            this.performanceMetrics.loadTime = performance.now() - this.performanceMetrics.startTime;
            
            console.log(`PortfolioApp: Aplicación inicializada en ${this.performanceMetrics.loadTime.toFixed(2)}ms`);
            
        } catch (error) {
            console.error('PortfolioApp: Error inicializando aplicación:', error);
            this.handleInitializationError(error);
        }
    }
    
    showLoadingIndicator() {
        const loader = document.createElement('div');
        loader.id = 'app-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, var(--gold-primary, #D4AF37), var(--bronze, #CD7F32));
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
        console.log('PortfolioApp: Inicializando managers...');
        
        // 1. Navigation (no dependencies)
        if (typeof NavigationManager !== 'undefined') {
            this.managers.navigation = new NavigationManager();
            window.navigationManager = this.managers.navigation;
            console.log('✓ NavigationManager inicializado');
        } else {
            console.warn('NavigationManager no disponible');
        }
        
        // 2. Tooltip system (no dependencies)
        if (typeof TooltipManager !== 'undefined') {
            this.managers.tooltip = new TooltipManager();
            window.tooltipManager = this.managers.tooltip;
            console.log('✓ TooltipManager inicializado');
        } else {
            console.warn('TooltipManager no disponible');
        }
        
        // 3. Modal system (DEBE cargar JSON aquí) - CRÍTICO
        if (typeof ModalManager !== 'undefined') {
            console.log('PortfolioApp: Inicializando ModalManager...');
            this.managers.modal = new ModalManager();
            window.modalManager = this.managers.modal;
            
            // CRÍTICO: Esperar a que el modal manager cargue los datos del JSON
            console.log('PortfolioApp: Esperando carga de datos JSON...');
            await this.waitForModalManagerInit();
            console.log('✓ ModalManager inicializado con datos JSON cargados');
        } else {
            console.error('ModalManager no disponible - CRÍTICO');
            throw new Error('ModalManager es requerido para la funcionalidad del portfolio');
        }
        
        // 4. Map interactions (depende de modal con datos JSON cargados)
        if (typeof MapInteractionManager !== 'undefined') {
            console.log('PortfolioApp: Inicializando MapInteractionManager...');
            this.managers.mapInteractions = new MapInteractionManager();
            window.mapManager = this.managers.mapInteractions;
            console.log('✓ MapInteractionManager inicializado');
        } else {
            console.warn('MapInteractionManager no disponible');
        }
        
        console.log('PortfolioApp: Todos los managers inicializados:', Object.keys(this.managers));
    }
    
    // Esperar a que el modal manager termine de cargar datos JSON
    async waitForModalManagerInit() {
        const maxAttempts = 100; // 10 segundos máximo
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            // Verificar que el modal manager esté completamente inicializado
            if (this.managers.modal && 
                this.managers.modal.isDataLoaded && 
                this.managers.modal.projectsData &&
                Object.keys(this.managers.modal.projectsData).length > 0) {
                
                console.log('PortfolioApp: Modal manager tiene datos JSON cargados');
                console.log('Proyectos disponibles:', Object.keys(this.managers.modal.projectsData));
                return;
            }
            
            if (attempts % 10 === 0) { // Log cada segundo
                console.log(`PortfolioApp: Esperando datos JSON... (${attempts/10}s)`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        console.error('PortfolioApp: TIMEOUT esperando datos JSON del modal manager');
        throw new Error('No se pudieron cargar los datos de proyectos');
    }
    
    setupGlobalEvents() {
        // Global error handling
        window.addEventListener('error', (event) => {
            console.error('PortfolioApp: Error global:', event.error);
            this.handleGlobalError(event.error);
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('PortfolioApp: Promise rejection:', event.reason);
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
        
        console.log('PortfolioApp: Event listeners globales configurados');
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
        
        console.log('PortfolioApp: Optimizaciones de rendimiento configuradas');
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
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with the 'oculto' class
        const hiddenElements = document.querySelectorAll('.oculto');
        hiddenElements.forEach(el => observer.observe(el));
    }
    
    preloadCriticalResources() {
        // Precargar recursos críticos basándose en los datos JSON cargados
        if (this.managers.modal?.projectsData) {
            console.log('PortfolioApp: Precargando recursos para proyectos:', 
                Object.keys(this.managers.modal.projectsData));
        }
        console.log('PortfolioApp: Preload de recursos críticos completado');
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
        
        console.log('PortfolioApp: Características de accesibilidad configuradas');
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
                background: #2C1810;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                transition: top 0.3s;
                border: 2px solid #CD7F32;
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
        
        console.log('PortfolioApp: Interacciones adicionales configuradas');
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
        console.error('PortfolioApp: Error global:', error);
        this.showUserMessage('Ha ocurrido un error. Por favor, recarga la página.', 'error');
    }
    
    handleInitializationError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #2C1810;
            color: #FFFFFF;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            z-index: 10000;
            border: 3px solid #CD7F32;
            font-family: 'Cinzel', serif;
        `;
        errorContainer.innerHTML = `
            <h2 style="color: #D4AF37; margin-bottom: 1rem;">Error de Inicialización</h2>
            <p style="margin-bottom: 1rem;">No se pudo cargar el portfolio correctamente.</p>
            <p style="margin-bottom: 1.5rem; font-size: 0.9rem; color: #CD7F32;">${error.message}</p>
            <button onclick="location.reload()" style="
                background: linear-gradient(135deg, #D4AF37, #B8941F);
                color: #2C1810;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-family: 'Cinzel', serif;
                font-weight: 600;
            ">
                Recargar Página
            </button>
        `;
        document.body.appendChild(errorContainer);
    }
    
    handlePageHidden() {
        this.performanceMetrics.backgroundTime = performance.now();
    }
    
    handlePageVisible() {
        if (this.performanceMetrics.backgroundTime) {
            const backgroundDuration = performance.now() - this.performanceMetrics.backgroundTime;
            console.log(`PortfolioApp: Página estuvo en background por ${backgroundDuration.toFixed(2)}ms`);
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
        
        const typeColors = {
            info: '#2C1810',
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336'
        };
        
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${typeColors[type] || typeColors.info};
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-family: 'Cinzel', serif;
            border: 2px solid #CD7F32;
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
        // Remove unused event listeners and clear caches
        if (this.managers.tooltip?.tooltipCache && 
            Object.keys(this.managers.tooltip.tooltipCache).length > 50) {
            this.managers.tooltip.tooltipCache = {};
        }
    }
    
    trackSessionEnd() {
        const sessionDuration = performance.now() - this.performanceMetrics.startTime;
        console.log(`PortfolioApp: Duración de sesión: ${(sessionDuration / 1000).toFixed(2)}s`);
        console.log(`PortfolioApp: Interacciones: ${this.performanceMetrics.interactionCount}`);
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
        console.log('PortfolioApp: Recargando todos los datos de proyectos...');
        
        if (this.managers.modal) {
            await this.managers.modal.reloadProjectsData();
        }
        
        console.log('PortfolioApp: Datos recargados exitosamente');
    }
    
    // Método de debug mejorado
    debugInfo() {
        console.log('=== PORTFOLIO APP DEBUG ===');
        console.log('Initialized:', this.isInitialized);
        console.log('Managers:', Object.keys(this.managers));
        console.log('Performance:', this.performanceMetrics);
        
        if (this.managers.modal) {
            console.log('Modal Manager Status:');
            this.managers.modal.debugInfo();
        }
        
        if (this.managers.mapInteractions) {
            console.log('Map Manager Status:');
            this.managers.mapInteractions.debugInfo();
        }
        
        console.log('=== END DEBUG ===');
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
window.debugProjects = () => {
    if (window.portfolioApp) {
        window.portfolioApp.debugInfo();
    } else {
        console.log('PortfolioApp no inicializada aún');
    }
};

// Función para recargar datos JSON manualmente
window.reloadProjectData = async () => {
    if (window.portfolioApp?.managers.modal) {
        await window.portfolioApp.reloadAllProjectData();
        console.log('Datos de proyectos recargados desde JSON');
    } else {
        console.log('ModalManager no disponible para recargar datos');
    }
};