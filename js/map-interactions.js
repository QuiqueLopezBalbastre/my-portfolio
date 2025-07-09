// ===== MAP INTERACTIONS SYSTEM - SIMPLIFIED FOR JSON LOADING =====

class MapInteractionManager {
    constructor() {
        this.continents = document.querySelectorAll('.continent');
        this.mapContainer = document.querySelector('.map-container');
        this.activeContinent = null;
        this.interactionCooldown = false;
        
        this.init();
    }
    
    init() {
        console.log('MapInteractionManager: Inicializando...');
        console.log(`MapInteractionManager: Encontrados ${this.continents.length} continentes`);
        
        this.setupContinentEvents();
        this.setupAccessibility();
        
        console.log('MapInteractionManager: Inicialización completada');
    }
    
    setupContinentEvents() {
        this.continents.forEach((continent, index) => {
            console.log(`MapInteractionManager: Configurando eventos para continente ${index + 1}:`, continent.id);
            
            // Mouse events
            continent.addEventListener('mouseenter', (e) => this.handleContinentHover(e));
            continent.addEventListener('mouseleave', (e) => this.handleContinentLeave(e));
            continent.addEventListener('mousemove', (e) => this.handleContinentMouseMove(e));
            continent.addEventListener('click', (e) => this.handleContinentClick(e));
            
            // Touch events for mobile
            continent.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            continent.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
            
            // Keyboard accessibility
            continent.setAttribute('tabindex', '0');
            continent.setAttribute('role', 'button');
            continent.addEventListener('keydown', (e) => this.handleKeyboardInteraction(e));
        });
    }
    
    handleContinentHover(event) {
        if (this.interactionCooldown) return;
        
        const continent = event.target;
        const projectData = this.getProjectDataFromHTML(continent);
        
        console.log('MapInteractionManager: Hover en continente:', continent.id, projectData);
        
        if (projectData) {
            // Show tooltip
            window.tooltipManager?.showTooltip(event, projectData);
            
            // Add hover effects
            this.addHoverEffects(continent);
            
            // Update cursor
            continent.style.cursor = 'pointer';
        }
    }
    
    handleContinentLeave(event) {
        if (this.interactionCooldown) return;
        
        console.log('MapInteractionManager: Saliendo de continente:', event.target.id);
        
        const continent = event.target;
        
        // Hide tooltip
        window.tooltipManager?.hideTooltip();
        
        // Remove hover effects
        this.removeHoverEffects(continent);
    }
    
    handleContinentMouseMove(event) {
        if (window.tooltipManager?.isVisible()) {
            window.tooltipManager?.updateTooltipPosition(event);
        }
    }
    
    handleContinentClick(event) {
        event.preventDefault();
        
        console.log('MapInteractionManager: Click en continente:', event.target.id);
        
        if (this.interactionCooldown) {
            console.log('MapInteractionManager: Click ignorado por cooldown');
            return;
        }
        
        this.setCooldown(300); // Prevent rapid clicks
        
        const continent = event.target;
        const projectData = this.getProjectDataFromHTML(continent);
        
        console.log('MapInteractionManager: Datos del proyecto para click:', projectData);
        
        if (projectData) {
            // Create ripple effect
            this.createRippleEffect(event, continent);
            
            // Set active state
            this.setActiveContinent(continent);
            
            // Hide tooltip
            window.tooltipManager?.hideTooltip();
            
            // Verificar que modalManager esté disponible
            if (!window.modalManager) {
                console.error('MapInteractionManager: modalManager no está disponible');
                this.showErrorMessage('Sistema no inicializado. Recarga la página.');
                return;
            }
            
            // Verificar que modalManager tenga datos cargados
            if (!window.modalManager.isDataLoaded) {
                console.error('MapInteractionManager: modalManager no tiene datos cargados');
                this.showErrorMessage('Datos no cargados. Intenta de nuevo en unos segundos.');
                return;
            }
            
            console.log(`MapInteractionManager: Abriendo modal para proyecto: ${projectData.project}`);
            
            // Open project modal with the project ID
            setTimeout(() => {
                try {
                    window.modalManager.openProjectModal(projectData.project);
                } catch (error) {
                    console.error('MapInteractionManager: Error abriendo modal:', error);
                    this.showErrorMessage('Error abriendo proyecto. Intenta de nuevo.');
                }
            }, 200);
            
            // Analytics tracking
            this.trackInteraction('continent_click', projectData.project);
        } else {
            console.warn('MapInteractionManager: No hay datos de proyecto para este continente');
            this.showErrorMessage('Datos del proyecto no disponibles.');
        }
    }
    
    handleTouchStart(event) {
        const continent = event.target;
        console.log('MapInteractionManager: Touch start en:', continent.id);
        this.addHoverEffects(continent);
    }
    
    handleTouchEnd(event) {
        event.preventDefault();
        
        const continent = event.target;
        console.log('MapInteractionManager: Touch end en:', continent.id);
        
        const projectData = this.getProjectDataFromHTML(continent);
        
        if (projectData) {
            this.removeHoverEffects(continent);
            
            // Haptic feedback on supported devices
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            this.handleContinentClick(event);
        }
    }
    
    handleKeyboardInteraction(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            console.log('MapInteractionManager: Keyboard interaction:', event.key);
            event.preventDefault();
            this.handleContinentClick(event);
        }
    }
    
    // MÉTODO SIMPLIFICADO: Solo obtener datos básicos del HTML
    // El ModalManager se encarga de cargar los datos completos del JSON
    getProjectDataFromHTML(continent) {
        const projectId = continent.dataset.project;
        const title = continent.dataset.title;
        const description = continent.dataset.description;
        
        if (!projectId) {
            console.warn('MapInteractionManager: No project ID found for continent:', continent.id);
            return null;
        }
        
        console.log(`MapInteractionManager: Datos extraídos del HTML - ID: ${projectId}, Title: ${title}`);
        
        // Retornar datos básicos para tooltip
        // El modal manager se encargará de cargar el JSON completo
        return {
            project: projectId,
            title: title || 'Proyecto Sin Título',
            description: description || 'Descripción no disponible',
            element: continent
        };
    }
    
    addHoverEffects(continent) {
        continent.classList.add('hovered');
        
        if (this.mapContainer) {
            this.mapContainer.style.filter = 'brightness(1.1)';
        }
    }
    
    removeHoverEffects(continent) {
        continent.classList.remove('hovered');
        
        if (!this.activeContinent && this.mapContainer) {
            this.mapContainer.style.filter = '';
        }
    }
    
    setActiveContinent(continent) {
        // Remove active state from previous continent
        if (this.activeContinent) {
            this.activeContinent.classList.remove('active');
        }
        
        // Set new active continent
        this.activeContinent = continent;
        continent.classList.add('active');
        
        console.log('MapInteractionManager: Continente activo:', continent.id);
        
        // Auto-remove active state after modal closes
        setTimeout(() => {
            if (this.activeContinent === continent) {
                this.clearActiveContinent();
            }
        }, 5000);
    }
    
    clearActiveContinent() {
        if (this.activeContinent) {
            console.log('MapInteractionManager: Limpiando continente activo');
            this.activeContinent.classList.remove('active');
            this.activeContinent = null;
        }
        
        if (this.mapContainer) {
            this.mapContainer.style.filter = '';
        }
    }
    
    createRippleEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.classList.add('continent-ripple');
        ripple.style.position = 'absolute';
        ripple.style.left = (event.clientX - rect.left - 20) + 'px';
        ripple.style.top = (event.clientY - rect.top - 20) + 'px';
        ripple.style.width = '40px';
        ripple.style.height = '40px';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '10';
        
        this.mapContainer.style.position = 'relative';
        this.mapContainer.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    setCooldown(duration) {
        this.interactionCooldown = true;
        setTimeout(() => {
            this.interactionCooldown = false;
        }, duration);
    }
    
    setupAccessibility() {
        this.continents.forEach((continent) => {
            const projectData = this.getProjectDataFromHTML(continent);
            if (projectData) {
                continent.setAttribute('aria-label', 
                    `${projectData.title}: ${projectData.description}. Presiona Enter para ver detalles.`);
                continent.setAttribute('aria-describedby', `project-${projectData.project}`);
            }
        });
    }
    
    trackInteraction(action, projectId) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'portfolio_interaction',
                'event_label': projectId,
                'value': 1
            });
        }
        
        console.log(`MapInteractionManager: Interaction tracked: ${action} - ${projectId}`);
    }
    
    showErrorMessage(message) {
        // Crear mensaje de error temporal
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-family: 'Cinzel', serif;
            font-size: 0.9rem;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            max-width: 300px;
        `;
        errorMsg.textContent = message;
        
        document.body.appendChild(errorMsg);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (errorMsg.parentNode) {
                errorMsg.style.opacity = '0';
                errorMsg.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (errorMsg.parentNode) {
                        errorMsg.parentNode.removeChild(errorMsg);
                    }
                }, 300);
            }
        }, 3000);
    }
    
    // Public API methods
    highlightContinent(projectId) {
        const continent = document.querySelector(`[data-project="${projectId}"]`);
        if (continent) {
            this.setActiveContinent(continent);
            continent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    resetAllContinents() {
        this.clearActiveContinent();
        this.continents.forEach(continent => {
            this.removeHoverEffects(continent);
        });
    }
    
    // Método de debug
    debugInfo() {
        console.log('=== MAP INTERACTION MANAGER DEBUG ===');
        console.log('continents found:', this.continents.length);
        console.log('modalManager available:', !!window.modalManager);
        console.log('modalManager data loaded:', window.modalManager?.isDataLoaded);
        console.log('======================================');
    }
}

// Export for use in main.js
window.MapInteractionManager = MapInteractionManager;