// ===== MODAL SYSTEM - FIXED JSON LOADING =====

class ModalManager {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.modalContent = document.querySelector('.modal-content');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close');
        this.isOpen = false;
        this.currentProject = null;
        this.preloadedContent = new Map();
        this.projectsData = null;
        this.isDataLoaded = false;
        this.jsonPath = 'data/projects.json'; // Configurable path

        this.init();
    }

    async init() {
        console.log('ModalManager: Inicializando...');

        if (!this.modal) {
            this.createModalElement();
        }

        // Cargar datos del JSON
        await this.loadProjectsData();

        this.setupEventListeners();
        this.setupAccessibility();

        console.log('ModalManager: Inicialización completada');
    }

    // Cargar datos SOLO del JSON, con mejor manejo de errores
    async loadProjectsData() {
        console.log('ModalManager: Cargando datos de proyectos desde JSON...');

        try {
            // Intentar cargar desde JSON
            const response = await fetch(this.jsonPath);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType?.includes('application/json')) {
                throw new Error(`Invalid content type: ${contentType}`);
            }

            const data = await response.json();

            // Validar estructura del JSON
            if (!data.projects || typeof data.projects !== 'object') {
                throw new Error('Invalid JSON structure: missing projects object');
            }

            this.projectsData = data.projects;
            this.isDataLoaded = true;

            console.log(`ModalManager: JSON cargado exitosamente - ${Object.keys(this.projectsData).length} proyectos`);
            console.log('Proyectos disponibles:', Object.keys(this.projectsData));

            // Hacer disponible globalmente para debugging
            window.projectData = this.projectsData;

        } catch (error) {
            console.error('ModalManager: Error cargando JSON:', error);

            // Intentar con ruta alternativa
            if (this.jsonPath === 'data/projects.json') {
                console.log('ModalManager: Intentando ruta alternativa...');
                this.jsonPath = './data/projects.json';
                return this.loadProjectsData();
            }

            // Si falla todo, usar datos mínimos de emergencia
            console.warn('ModalManager: Usando datos de emergencia');
            this.projectsData = this.getEmergencyData();
            this.isDataLoaded = true;
            window.projectData = this.projectsData;
        }
    }

    // Datos mínimos de emergencia (solo si el JSON falla completamente)
    getEmergencyData() {
        return {
            "gallaecia": {
                "title": "Proyecto Gallaecia",
                "subtitle": "Datos de emergencia - JSON no disponible",
                "description": "Error cargando datos del proyecto",
                "longDescription": "No se pudieron cargar los datos del archivo projects.json. Verifica que el archivo existe y está correctamente formateado.",
                "technologies": ["Error de carga"],
                "features": ["Datos no disponibles"],
                "links": {},
                "status": "Error",
                "duration": "N/A",
                "team": "N/A"
            }
        };
    }

    // Obtener datos de un proyecto específico
    getProjectData(projectId) {
        if (!this.isDataLoaded) {
            console.error('ModalManager: Datos no cargados aún');
            return null;
        }

        if (!this.projectsData) {
            console.error('ModalManager: No hay datos de proyectos disponibles');
            return null;
        }

        const project = this.projectsData[projectId];
        if (!project) {
            console.warn(`ModalManager: Proyecto no encontrado: ${projectId}`);
            console.log('ModalManager: Proyectos disponibles:', Object.keys(this.projectsData));
            return null;
        }

        console.log(`ModalManager: Datos obtenidos para ${projectId}:`, project.title);
        return {
            project: projectId,
            ...project
        };
    }

    createModalElement() {
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

        this.modalContent = this.modal.querySelector('.modal-content');
        this.modalBody = this.modal.querySelector('#modal-body');
        this.closeBtn = this.modal.querySelector('.close');

        console.log('ModalManager: Elemento modal creado');
    }

    setupEventListeners() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                console.log('ModalManager: Botón cerrar clickeado');
                this.closeModal();
            });
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    console.log('ModalManager: Click fuera del modal');
                    this.closeModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (this.isOpen && e.key === 'Escape') {
                console.log('ModalManager: Escape presionado');
                this.closeModal();
            }
        });

        console.log('ModalManager: Event listeners configurados');
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

    openProjectModal(projectIdOrData) {
        console.log('ModalManager: openProjectModal llamado con:', projectIdOrData);

        if (this.isOpen) {
            console.log('ModalManager: Modal ya está abierto');
            return;
        }

        if (!this.isDataLoaded) {
            console.error('ModalManager: Datos no cargados, no se puede abrir modal');
            return;
        }

        let projectData;

        if (typeof projectIdOrData === 'string') {
            console.log(`ModalManager: Buscando proyecto por ID: ${projectIdOrData}`);
            projectData = this.getProjectData(projectIdOrData);
            if (!projectData) {
                console.error(`ModalManager: No se pudo cargar el proyecto: ${projectIdOrData}`);
                return;
            }
        } else if (projectIdOrData && projectIdOrData.project) {
            console.log('ModalManager: Usando datos del proyecto directamente');
            projectData = projectIdOrData;
        } else {
            console.error('ModalManager: Datos de proyecto inválidos:', projectIdOrData);
            return;
        }

        console.log('ModalManager: Abriendo modal para:', projectData.title);

        this.currentProject = projectData;
        this.showLoadingState();

        setTimeout(() => {
            this.loadProjectContent(projectData);
            this.showModal();
        }, 100);
    }

    showLoadingState() {
        if (this.modalBody) {
            this.modalBody.innerHTML = `
                <div class="loading-container" style="text-align: center; padding: 60px 20px;">
                    <div class="loading-spinner"></div>
                    <p style="margin-top: 20px; color: var(--text-cream);">Cargando proyecto...</p>
                </div>
            `;
        }
    }

    loadProjectContent(projectData) {
        console.log('ModalManager: Cargando contenido del proyecto');
        const content = this.generateProjectHTML(projectData);

        if (this.modalBody) {
            this.modalBody.innerHTML = content;
            console.log('ModalManager: Contenido HTML generado e insertado');
            this.animateModalContent();
        } else {
            console.error('ModalManager: modalBody no encontrado');
        }
    }

    // Dentro de la clase ModalManager, añade este método
    generateTeamHTML(team) {
        const teamLinks = {
            "Lucas Calatayud": {
                url: "https://calatayudbri.github.io/Portfolio/", // ⚠️ Reemplaza con la URL real
                title: "Ver portfolio de Lucas Calatayud",
                className: "team-link"
            },
            "Carlos García": {
                url: "https://portfolio.cgroig.com/index.html", // ⚠️ Reemplaza con la URL real
                title: "Ver portfolio de Carlos García",
                className: "team-link"
            }
            // Puedes añadir más colaboradores aquí
        };

        if (teamLinks[team]) {
            const linkConfig = teamLinks[team];
            return `<a href="${linkConfig.url}" target="_blank" rel="noopener noreferrer" 
                   class="${linkConfig.className}" 
                   title="${linkConfig.title}">
                   ${team}
                   <i class="fas fa-external-link-alt" style="margin-left: 5px; font-size: 0.8em;"></i>
                </a>`;
        }

        return team;
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
                    <h1 class="project-title">${title}</h1>
                    <p class="project-subtitle">${subtitle}</p>
                    <div class="project-meta">
                        <span class="meta-item">
                            <i class="fas fa-calendar meta-icon"></i> 
                            ${duration}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-users meta-icon"></i> 
                            ${this.generateTeamHTML(team)}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-check-circle meta-icon"></i> 
                            <span class="project-status status-${this.getStatusClass(status)}">${status}</span>
                        </span>
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
                    
                    <div class="project-links">
                        ${this.generateLinksHTML(links)}
                    </div>
                </div>
            </div>
        `;
    }

    getStatusClass(status) {
        const statusMap = {
            'Completed': 'completed',
            'Lauched': 'lanzado',
            'In Development': 'development',
            'Beta': 'beta',
            'Early Access': 'early-access',
            'Planning': 'planning'
        };

        return statusMap[status] || 'development';
    }

    generateLinksHTML(links) {
        const linkMap = {
            github: { icon: 'fab fa-github', text: 'See code' },
            demo: { icon: 'fas fa-play', text: 'Watch Demo' },
            video: { icon: 'fas fa-play', text: 'Watch video' },
            download: { icon: 'fas fa-download', text: 'Download' },
            documentation: { icon: 'fas fa-book', text: 'Docs' },
            website: { icon: 'fas fa-globe', text: 'Website' }
        };

        return Object.entries(links)
            .map(([key, url]) => {
                const linkInfo = linkMap[key] || { icon: 'fas fa-link', text: key.charAt(0).toUpperCase() + key.slice(1) };
                return `
                    <a href="${url}" target="_blank" rel="noopener" class="btn btn-primary">
                        <i class="${linkInfo.icon}"></i> ${linkInfo.text}
                    </a>
                `;
            })
            .join('');
    }

    showModal() {
        console.log('ModalManager: Mostrando modal');
        if (!this.modal) {
            console.error('ModalManager: Modal element no encontrado');
            return;
        }

        document.body.style.overflow = 'hidden';
        this.modal.classList.add('show');
        this.modal.setAttribute('aria-hidden', 'false');
        this.isOpen = true;

        console.log('ModalManager: Modal mostrado exitosamente');
        this.focusModal();
        this.trackModalOpen();
    }

    closeModal() {
        console.log('ModalManager: Cerrando modal');
        if (!this.modal || !this.isOpen) return;

        this.modal.classList.remove('show');
        this.modal.setAttribute('aria-hidden', 'true');
        this.isOpen = false;
        document.body.style.overflow = '';
        this.currentProject = null;

        console.log('ModalManager: Modal cerrado exitosamente');
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
    }

    focusModal() {
        if (this.closeBtn) {
            this.closeBtn.focus();
        }
    }

    trackModalOpen() {
        if (this.currentProject?.project) {
            console.log(`ModalManager: Modal abierto para proyecto: ${this.currentProject.project}`);
        }
    }

    // Public API methods
    isModalOpen() {
        return this.isOpen;
    }

    getCurrentProject() {
        return this.currentProject;
    }

    getAllProjects() {
        return this.projectsData;
    }

    async reloadProjectsData() {
        console.log('ModalManager: Recargando datos...');
        this.isDataLoaded = false;
        this.projectsData = null;
        await this.loadProjectsData();
        console.log('ModalManager: Datos recargados exitosamente');
    }

    // Método para cambiar la ruta del JSON (útil para desarrollo)
    setJsonPath(newPath) {
        this.jsonPath = newPath;
        console.log(`ModalManager: Ruta JSON cambiada a: ${this.jsonPath}`);
    }

    debugInfo() {
        console.log('=== MODAL MANAGER DEBUG ===');
        console.log('isDataLoaded:', this.isDataLoaded);
        console.log('jsonPath:', this.jsonPath);
        console.log('projectsData keys:', Object.keys(this.projectsData || {}));
        console.log('isOpen:', this.isOpen);
        console.log('modal element:', !!this.modal);
        console.log('modalBody element:', !!this.modalBody);
        console.log('protocol:', window.location.protocol);
        console.log('==========================');
    }
}

// Export for use in main.js
window.ModalManager = ModalManager;