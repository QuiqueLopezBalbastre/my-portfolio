// ===== MODAL SYSTEM =====

class ModalManager {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.modalContent = document.querySelector('.modal-content');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close');
        this.isOpen = false;
        this.currentProject = null;
        this.preloadedContent = new Map();
        
        this.init();
    }
    
    init() {
        if (!this.modal) {
            this.createModalElement();
        }
        
        this.setupEventListeners();
        this.setupAccessibility();
    }
    
    createModalElement() {
        // Create modal if it doesn't exist
        this.modal = document.createElement('div');
        this.modal.id = 'project-modal';
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div id="modal-body">
                    <!-- Content loaded dynamically -->
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
        
        // Update references
        this.modalContent = this.modal.querySelector('.modal-content');
        this.modalBody = this.modal.querySelector('#modal-body');
        this.closeBtn = this.modal.querySelector('.close');
    }
    
    setupEventListeners() {
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Click outside to close
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.isOpen && e.key === 'Escape') {
                this.closeModal();
            }
        });
        
        // Prevent body scroll when modal is open
        this.modal?.addEventListener('wheel', (e) => {
            if (this.isOpen) {
                e.stopPropagation();
            }
        }, { passive: true });
    }
    
    setupAccessibility() {
        if (this.modal) {
            this.modal.setAttribute('role', 'dialog');
            this.modal.setAttribute('aria-modal', 'true');
            this.modal.setAttribute('aria-hidden', 'true');
        }
        
        if (this.closeBtn) {
            this.closeBtn.setAttribute('aria-label', 'Cerrar modal');
        }
    }
    
    openProjectModal(projectData) {
        if (!projectData || this.isOpen) return;
        
        this.currentProject = projectData;
        
        // Show loading state
        this.showLoadingState();
        
        // Load content (with artificial delay for better UX)
        setTimeout(() => {
            this.loadProjectContent(projectData);
            this.showModal();
        }, 200);
    }
    
    showLoadingState() {
        if (this.modalBody) {
            this.modalBody.innerHTML = `
                <div class="loading-container" style="text-align: center; padding: 60px 20px;">
                    <div class="loading-spinner"></div>
                    <p style="margin-top: 20px; color: var(--text-gray);">Cargando proyecto...</p>
                </div>
            `;
        }
    }
    
    loadProjectContent(projectData) {
        const content = this.generateProjectHTML(projectData);
        
        if (this.modalBody) {
            this.modalBody.innerHTML = content;
            
            // Add staggered animations to elements
            this.animateModalContent();
        }
    }
    
    generateProjectHTML(project) {
        const {
            title = 'Proyecto Sin Título',
            subtitle = 'Desarrollado con Unreal Engine 5',
            description = 'Descripción no disponible',
            longDescription = description,
            technologies = ['Unreal Engine 5', 'C++', 'Blueprints'],
            features = [],
            images = [],
            links = {},
            status = 'Completado',
            duration = 'No especificado',
            team = 'Desarrollo individual'
        } = project;
        
        return `
            <div class="project-card">
                <div class="project-header">
                    <h1 class="project-title typewriter">${title}</h1>
                    <p class="project-subtitle">${subtitle}</p>
                    <div class="project-meta">
                        <span class="meta-item"><i class="fas fa-calendar"></i> ${duration}</span>
                        <span class="meta-item"><i class="fas fa-users"></i> ${team}</span>
                        <span class="meta-item"><i class="fas fa-check-circle"></i> ${status}</span>
                    </div>
                </div>
                
                <div class="project-content">
                    <div class="project-tags">
                        ${technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="project-description">
                        <p>${longDescription}</p>
                    </div>
                    
                    ${features.length > 0 ? `
                        <div class="project-section">
                            <h3>Características Principales</h3>
                            <ul class="project-features">
                                ${features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${images.length > 0 ? `
                        <div class="project-section">
                            <h3>Capturas de Pantalla</h3>
                            <div class="project-gallery">
                                ${images.map((img, index) => `
                                    <img src="${img.url}" alt="${img.alt || `${title} - Imagen ${index + 1}`}" 
                                         class="gallery-image" loading="lazy">
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="project-links">
                        ${links.github ? `
                            <a href="${links.github}" target="_blank" rel="noopener" class="btn btn-primary">
                                <i class="fab fa-github"></i> Ver Código
                            </a>
                        ` : ''}
                        ${links.demo ? `
                            <a href="${links.demo}" target="_blank" rel="noopener" class="btn btn-primary">
                                <i class="fas fa-play"></i> Ver Demo
                            </a>
                        ` : ''}
                        ${links.download ? `
                            <a href="${links.download}" target="_blank" rel="noopener" class="btn btn-secondary">
                                <i class="fas fa-download"></i> Descargar
                            </a>
                        ` : ''}
                        ${links.documentation ? `
                            <a href="${links.documentation}" target="_blank" rel="noopener" class="btn btn-secondary">
                                <i class="fas fa-book"></i> Documentación
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    showModal() {
        if (!this.modal) return;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Show modal
        this.modal.classList.add('show');
        this.modal.setAttribute('aria-hidden', 'false');
        this.isOpen = true;
        
        // Focus management
        this.focusModal();
        
        // Track analytics
        this.trackModalOpen();
    }
    
    closeModal() {
        if (!this.modal || !this.isOpen) return;
        
        // Hide modal
        this.modal.classList.remove('show');
        this.modal.setAttribute('aria-hidden', 'true');
        this.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Clear current project
        this.currentProject = null;
        
        // Return focus to triggering element
        this.restoreFocus();
        
        // Clear map active states
        if (window.mapManager) {
            window.mapManager.clearActiveContinent();
        }
    }
    
    animateModalContent() {
        const elements = this.modalBody?.querySelectorAll('.project-features li');
        if (elements) {
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        // Gallery images lazy loading
        const images = this.modalBody?.querySelectorAll('.gallery-image');
        if (images) {
            this.setupLazyLoading(images);
        }
    }
    
    setupLazyLoading(images) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    focusModal() {
        if (this.closeBtn) {
            this.closeBtn.focus();
        }
        
        // Trap focus within modal
        this.trapFocus();
    }
    
    trapFocus() {
        const focusableElements = this.modal?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        this.modal?.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    restoreFocus() {
        // Return focus to the continent that opened the modal
        if (this.currentProject?.element) {
            this.currentProject.element.focus();
        }
    }
    
    preloadProject(projectData) {
        if (!projectData.project) return;
        
        const content = this.generateProjectHTML(projectData);
        this.preloadedContent.set(projectData.project, content);
    }
    
    trackModalOpen() {
        if (this.currentProject?.project) {
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'modal_open', {
                    'event_category': 'project_interaction',
                    'event_label': this.currentProject.project,
                    'value': 1
                });
            }
            
            console.log(`Modal opened for project: ${this.currentProject.project}`);
        }
    }
    
    // Public API methods
    isModalOpen() {
        return this.isOpen;
    }
    
    getCurrentProject() {
        return this.currentProject;
    }
    
    updateProjectData(projectId, newData) {
        if (this.currentProject?.project === projectId) {
            this.currentProject = { ...this.currentProject, ...newData };
            this.loadProjectContent(this.currentProject);
        }
    }
}

// Export for use in main.js
window.ModalManager = ModalManager;