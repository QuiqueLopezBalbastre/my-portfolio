// ===== TOOLTIP SYSTEM =====

class TooltipManager {
    constructor() {
        this.tooltip = document.getElementById('tooltip');
        this.tooltipTitle = document.getElementById('tooltip-title');
        this.tooltipDescription = document.getElementById('tooltip-description');
        this.isTooltipVisible = false;
        this.hideTimeout = null;
        this.showDelay = 300; // ms
        this.hideDelay = 100; // ms
        
        this.init();
    }
    
    init() {
        if (!this.tooltip) {
            this.createTooltipElement();
        }
        
        this.setupTooltipBehavior();
    }
    
    createTooltipElement() {
        // Create tooltip if it doesn't exist
        this.tooltip = document.createElement('div');
        this.tooltip.id = 'tooltip';
        this.tooltip.className = 'tooltip';
        this.tooltip.innerHTML = `
            <h3 id="tooltip-title"></h3>
            <p id="tooltip-description"></p>
            <span class="tooltip-cta">Clic para ver proyecto</span>
        `;
        
        document.body.appendChild(this.tooltip);
        
        // Update references
        this.tooltipTitle = document.getElementById('tooltip-title');
        this.tooltipDescription = document.getElementById('tooltip-description');
    }
    
    setupTooltipBehavior() {
        // Prevent tooltip from interfering with mouse events
        if (this.tooltip) {
            this.tooltip.addEventListener('mouseenter', () => {
                this.clearHideTimeout();
            });
            
            this.tooltip.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        }
    }
    
    showTooltip(event, projectData, delay = this.showDelay) {
        // Don't show tooltips on touch devices
        if ('ontouchstart' in window) {
            return;
        }
        
        this.clearHideTimeout();
        
        if (delay > 0) {
            this.showTimeout = setTimeout(() => {
                this.displayTooltip(event, projectData);
            }, delay);
        } else {
            this.displayTooltip(event, projectData);
        }
    }
    
    displayTooltip(event, projectData) {
        if (!this.tooltip || !projectData) return;
        
        // Update tooltip content
        this.updateTooltipContent(projectData);
        
        // Position tooltip
        this.updateTooltipPosition(event);
        
        // Show tooltip with animation
        this.tooltip.classList.add('show');
        this.isTooltipVisible = true;
        
        // Add accessibility
        this.tooltip.setAttribute('role', 'tooltip');
        this.tooltip.setAttribute('aria-live', 'polite');
    }
    
    hideTooltip(delay = this.hideDelay) {
        this.clearShowTimeout();
        
        if (delay > 0) {
            this.hideTimeout = setTimeout(() => {
                this.executeHide();
            }, delay);
        } else {
            this.executeHide();
        }
    }
    
    executeHide() {
        if (this.tooltip) {
            this.tooltip.classList.remove('show');
            this.isTooltipVisible = false;
        }
    }
    
    updateTooltipContent(projectData) {
        if (this.tooltipTitle) {
            this.tooltipTitle.textContent = projectData.title || 'Proyecto';
        }
        
        if (this.tooltipDescription) {
            this.tooltipDescription.textContent = projectData.description || '';
        }
        
        // Add project-specific styling
        if (this.tooltip && projectData.project) {
            this.tooltip.className = `tooltip tooltip-${projectData.project}`;
            this.tooltip.classList.add('show');
        }
    }
    
    updateTooltipPosition(event) {
        if (!this.tooltip || !this.isTooltipVisible) return;
        
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let x = event.clientX;
        let y = event.clientY;
        
        // Offset para separar el tooltip del cursor
        const offsetX = 15;
        const offsetY = 15;
        
        // Horizontal positioning - centrar alrededor del cursor
        if (x + tooltipRect.width/2 + offsetX > viewportWidth) {
            // Si no cabe a la derecha, ponerlo a la izquierda
            x = x - tooltipRect.width - offsetX;
        } else if (x - tooltipRect.width/2 - offsetX < 0) {
            // Si no cabe a la izquierda, ponerlo a la derecha
            x = x + offsetX;
        } else {
            // Si cabe centrado, centrarlo
            x = x - tooltipRect.width/2;
        }
        
        // Vertical positioning - centrar alrededor del cursor
        if (y + tooltipRect.height/2 + offsetY > viewportHeight) {
            // Si no cabe abajo, ponerlo arriba
            y = y - tooltipRect.height - offsetY;
        } else if (y - tooltipRect.height/2 - offsetY < 0) {
            // Si no cabe arriba, ponerlo abajo
            y = y + offsetY;
        } else {
            // Si cabe centrado, centrarlo
            y = y - tooltipRect.height/2;
        }
        
        // Ensure tooltip stays within viewport bounds with margins
        const margin = 10;
        x = Math.max(margin, Math.min(x, viewportWidth - tooltipRect.width - margin));
        y = Math.max(margin, Math.min(y, viewportHeight - tooltipRect.height - margin));
        
        // Apply position with GPU acceleration
        this.tooltip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        this.tooltip.style.left = '0';
        this.tooltip.style.top = '0';
    }
    
    clearShowTimeout() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }
    
    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
    
    isVisible() {
        return this.isTooltipVisible;
    }
    
    // Advanced tooltip features
    showCustomTooltip(element, content, options = {}) {
        const defaultOptions = {
            delay: this.showDelay,
            position: 'auto',
            theme: 'default',
            arrow: true
        };
        
        const config = { ...defaultOptions, ...options };
        
        const rect = element.getBoundingClientRect();
        const fakeEvent = {
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2
        };
        
        const projectData = {
            title: content.title || '',
            description: content.description || '',
            project: config.theme
        };
        
        this.showTooltip(fakeEvent, projectData, config.delay);
    }
    
    updateTooltipTheme(theme) {
        if (this.tooltip) {
            // Remove existing theme classes
            this.tooltip.className = this.tooltip.className.replace(/tooltip-\w+/g, '');
            // Add new theme
            this.tooltip.classList.add(`tooltip-${theme}`);
        }
    }
    
    preloadTooltipContent(projectsData) {
        // Preload content for better performance
        Object.keys(projectsData).forEach(projectId => {
            const project = projectsData[projectId];
            if (project.title && project.description) {
                // Cache tooltip content
                this.tooltipCache = this.tooltipCache || {};
                this.tooltipCache[projectId] = {
                    title: project.title,
                    description: project.shortDescription || project.description,
                    project: projectId
                };
            }
        });
    }
    
    // Accessibility methods
    announceTooltip(content) {
        // Create a live region for screen readers
        let announcer = document.getElementById('tooltip-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'tooltip-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }
        
        announcer.textContent = `${content.title}: ${content.description}`;
    }
    
    // Performance optimization
    throttledPositionUpdate = this.throttle((event) => {
        this.updateTooltipPosition(event);
    }, 16); // ~60fps
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Cleanup method
    destroy() {
        this.clearShowTimeout();
        this.clearHideTimeout();
        
        if (this.tooltip && this.tooltip.parentNode) {
            this.tooltip.parentNode.removeChild(this.tooltip);
        }
        
        const announcer = document.getElementById('tooltip-announcer');
        if (announcer && announcer.parentNode) {
            announcer.parentNode.removeChild(announcer);
        }
    }
}

// Export for use in main.js
window.TooltipManager = TooltipManager;