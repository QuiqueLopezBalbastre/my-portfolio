// ===== MAP INTERACTIONS SYSTEM =====

class MapInteractionManager {
    constructor() {
        this.continents = document.querySelectorAll('.continent');
        this.mapContainer = document.querySelector('.map-container');
        this.activeContinent = null;
        this.interactionCooldown = false;
        
        this.init();
    }
    
    init() {
        this.setupContinentEvents();
        this.setupAccessibility();
        this.preloadInteractions();
    }
    
    setupContinentEvents() {
        this.continents.forEach(continent => {
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
        const projectData = this.getProjectData(continent);
        
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
        
        const continent = event.target;
        
        // Hide tooltip
        window.tooltipManager?.hideTooltip();
        
        // Remove hover effects
        this.removeHoverEffects(continent);
    }
    
    handleContinentMouseMove(event) {
        if (window.tooltipManager?.isVisible()) {
            // Throttle el update del tooltip para elementos pequeños
            if (!this.tooltipUpdateThrottle) {
                this.tooltipUpdateThrottle = true;
                requestAnimationFrame(() => {
                    window.tooltipManager?.updateTooltipPosition(event);
                    this.tooltipUpdateThrottle = false;
                });
            }
        }
    }
    
    handleContinentClick(event) {
        event.preventDefault();
        
        if (this.interactionCooldown) return;
        this.setCooldown(300); // Prevent rapid clicks
        
        const continent = event.target;
        const projectData = this.getProjectData(continent);
        
        if (projectData) {
            // Create ripple effect
            this.createRippleEffect(event, continent);
            
            // Set active state
            this.setActiveContinent(continent);
            
            // Hide tooltip
            window.tooltipManager?.hideTooltip();
            
            // Open project modal with delay for better UX
            setTimeout(() => {
                window.modalManager?.openProjectModal(projectData);
            }, 200);
            
            // Analytics tracking (if implemented)
            this.trackInteraction('continent_click', projectData.project);
        }
    }
    
    handleTouchStart(event) {
        // Prevent default to avoid hover states on touch devices
        const continent = event.target;
        this.addHoverEffects(continent);
    }
    
    handleTouchEnd(event) {
        event.preventDefault();
        
        const continent = event.target;
        const projectData = this.getProjectData(continent);
        
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
            event.preventDefault();
            this.handleContinentClick(event);
        }
    }
    
    getProjectData(continent) {
        const projectId = continent.dataset.project;
        const title = continent.dataset.title;
        const description = continent.dataset.description;
        
        if (!projectId) return null;
        
        // Get full project data from project-data.js
        const fullProjectData = window.projectData?.[projectId];
        
        return {
            project: projectId,
            title: title || 'Proyecto Sin Título',
            description: description || 'Descripción no disponible',
            element: continent,
            ...fullProjectData
        };
    }
    
    addHoverEffects(continent) {
        continent.classList.add('hovered');
        
        // Add glow effect to surrounding area
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
        
        // Auto-remove active state after modal closes
        setTimeout(() => {
            if (this.activeContinent === continent) {
                this.clearActiveContinent();
            }
        }, 5000);
    }
    
    clearActiveContinent() {
        if (this.activeContinent) {
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
        this.continents.forEach((continent, index) => {
            const projectData = this.getProjectData(continent);
            if (projectData) {
                continent.setAttribute('aria-label', 
                    `${projectData.title}: ${projectData.description}. Presiona Enter para ver detalles.`);
                continent.setAttribute('aria-describedby', `project-${projectData.project}`);
            }
        });
    }
    
    preloadInteractions() {
        // Preload modal content for better performance
        this.continents.forEach(continent => {
            const projectData = this.getProjectData(continent);
            if (projectData && window.modalManager) {
                window.modalManager.preloadProject(projectData);
            }
        });
    }
    
    trackInteraction(action, projectId) {
        // Analytics tracking - implement with your preferred analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'portfolio_interaction',
                'event_label': projectId,
                'value': 1
            });
        }
        
        // Console log for development
        console.log(`Interaction tracked: ${action} - ${projectId}`);
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
}

// Export for use in main.js
window.MapInteractionManager = MapInteractionManager;