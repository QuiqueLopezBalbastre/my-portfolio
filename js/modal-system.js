// ===== MODAL SYSTEM - CORS FIXED + EMBEDDED FALLBACK =====

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
        
        this.init();
    }
    
    async init() {
        console.log('ModalManager: Inicializando...');
        
        if (!this.modal) {
            this.createModalElement();
        }
        
        // Intentar cargar datos del JSON, con fallback embebido
        await this.loadProjectsData();
        
        this.setupEventListeners();
        this.setupAccessibility();
        
        console.log('ModalManager: Inicialización completada');
    }
    
    // Datos embebidos como fallback para CORS
    getEmbeddedProjectsData() {
        return {
            "gallaecia": {
                "title": "RPG Celta: Gallaecia",
                "subtitle": "Aventura RPG ambientada en los pueblos celtas del noroeste hispano",
                "description": "Aventura RPG ambientada en los pueblos celtas del noroeste hispano",
                "longDescription": "Un RPG épico que sigue las tradiciones celtas de Gallaecia antes y durante la llegada de Roma. Los jugadores encarnan a un druida que debe preservar las tradiciones ancestrales mientras navega las complejas relaciones con las tribus locales y los invasores romanos.",
                "technologies": ["Unreal Engine 5", "C++", "Blueprints", "Celtic Mythology System", "Weather Magic", "Tribe Relations AI"],
                "features": [
                    "Sistema de magia druídica basado en elementos naturales",
                    "Relaciones complejas entre tribus celtas y romanos",
                    "Mundo abierto inspirado en la Galicia antigua",
                    "Rituales sagrados en castros y bosques druídicos",
                    "Sistema de estaciones que afecta la magia y gameplay",
                    "Narrativa ramificada basada en decisiones morales"
                ],
                "images": [
                    { "url": "images/gallaecia/castro-celta.jpg", "alt": "Castro celta en las montañas gallegas" },
                    { "url": "images/gallaecia/druida-ritual.jpg", "alt": "Ritual druídico en el bosque sagrado" },
                    { "url": "images/gallaecia/guerreros-celtas.jpg", "alt": "Guerreros celtas defendiendo su territorio" }
                ],
                "links": {
                    "github": "https://github.com/tuusuario/gallaecia-rpg",
                    "demo": "https://youtu.be/demo-gallaecia-rpg",
                    "documentation": "https://docs.gallaecia-rpg.com"
                },
                "status": "En Desarrollo",
                "duration": "12 meses",
                "team": "Desarrollo individual + historiador consultor",
                "region": "gallaecia"
            },
            "tarraconensis": {
                "title": "Estrategia Romana: Tarraconensis",
                "subtitle": "RTS sobre la conquista romana de la costa mediterránea",
                "description": "RTS sobre la conquista romana de la costa mediterránea",
                "longDescription": "Un juego de estrategia en tiempo real que recrea la conquista romana de Tarraconensis. Los jugadores pueden elegir liderar las legiones romanas o defender las ciudades ibéricas en una campaña épica que abarca desde Emporion hasta Cartago Nova.",
                "technologies": ["Unreal Engine 5", "C++", "Legion Formation AI", "Siege Mechanics", "Economic Simulation", "Historical Database"],
                "features": [
                    "Formaciones militares históricamente precisas",
                    "Sistema de asedio avanzado con maquinaria romana",
                    "Gestión de provincias y tributos",
                    "Campaña histórica con 20 batallas épicas",
                    "Modo multijugador hasta 8 jugadores",
                    "Editor de mapas con herramientas topográficas"
                ],
                "images": [
                    { "url": "images/tarraconensis/legion-marcha.jpg", "alt": "Legión romana marchando por Tarragona" },
                    { "url": "images/tarraconensis/asedio-ciudad.jpg", "alt": "Asedio romano a una ciudad ibérica" },
                    { "url": "images/tarraconensis/anfiteatro.jpg", "alt": "Construcción del anfiteatro de Tarraco" }
                ],
                "links": {
                    "github": "https://github.com/tuusuario/tarraconensis-strategy",
                    "demo": "https://youtu.be/demo-tarraconensis",
                    "download": "https://steam.tarraconensis-game.com"
                },
                "status": "Beta",
                "duration": "18 meses",
                "team": "Equipo de 3 desarrolladores + arqueólogo",
                "region": "tarraconensis"
            },
            "cartaginensis": {
                "title": "Guerra Púnica: Cartaginensis",
                "subtitle": "Simulador táctico de las guerras entre Roma y Cartago",
                "description": "Simulador táctico de las guerras entre Roma y Cartago",
                "longDescription": "Un simulador táctico centrado en los conflictos entre Roma y Cartago en territorio hispano. Recrea batallas famosas como la toma de Cartago Nova por Escipión y las campañas de Aníbal antes de cruzar los Alpes.",
                "technologies": ["Unreal Engine 5", "C++", "Battle Simulation", "Elephant Warfare", "Naval Combat", "Weather Systems"],
                "features": [
                    "Batallas terrestres y navales históricas",
                    "Unidades únicas: elefantes cartagineses vs. legiones",
                    "Sistema meteorológico que afecta las batallas",
                    "Campaña de Aníbal con decisiones estratégicas",
                    "Modo academia con tutoriales históricos",
                    "Recreación fiel de armaduras y tácticas"
                ],
                "images": [
                    { "url": "images/cartaginensis/batalla-naval.jpg", "alt": "Batalla naval entre flotas romana y cartaginesa" },
                    { "url": "images/cartaginensis/elefantes-guerra.jpg", "alt": "Elefantes de guerra cartagineses" },
                    { "url": "images/cartaginensis/cartago-nova.jpg", "alt": "Asedio de Cartago Nova" }
                ],
                "links": {
                    "github": "https://github.com/tuusuario/cartaginensis-tactics",
                    "demo": "https://youtu.be/demo-cartaginensis",
                    "documentation": "https://wiki.carthage-wars.com"
                },
                "status": "Completado",
                "duration": "15 meses",
                "team": "Desarrollo individual",
                "region": "cartaginensis"
            },
            "lusitania": {
                "title": "Viriato: El Último Guerrero",
                "subtitle": "Action-adventure sobre la resistencia lusitana contra Roma",
                "description": "Action-adventure sobre la resistencia lusitana contra Roma",
                "longDescription": "Un juego de acción y aventura que narra la épica historia de Viriato, el pastor que se convirtió en el terror de Roma. Combina combate táctico, sigilo y diplomacia tribal en la lucha por la independencia lusitana.",
                "technologies": ["Unreal Engine 5", "C++", "Guerrilla Warfare AI", "Tribal Diplomacy", "Stealth Mechanics", "Historical Narrative"],
                "features": [
                    "Combate híbrido: combate directo y tácticas de guerrilla",
                    "Sistema de sigilo en terrenos montañosos",
                    "Diplomacia tribal para unir clanes lusitanos",
                    "Recreación de paisajes lusitanos históricos",
                    "Narrativa basada en fuentes históricas",
                    "Mecánicas de liderazgo y moral de tropas"
                ],
                "images": [
                    { "url": "images/lusitania/viriato-portrait.jpg", "alt": "Retrato de Viriato, líder lusitano" },
                    { "url": "images/lusitania/emboscada-montana.jpg", "alt": "Emboscada lusitana en terreno montañoso" },
                    { "url": "images/lusitania/consejo-tribal.jpg", "alt": "Consejo de guerra entre jefes tribales" }
                ],
                "links": {
                    "github": "https://github.com/tuusuario/viriato-adventure",
                    "demo": "https://youtu.be/demo-viriato",
                    "download": "https://epic-games.viriato-game.com"
                },
                "status": "Lanzado",
                "duration": "20 meses",
                "team": "Equipo de 5 desarrolladores",
                "region": "lusitania"
            },
            "baetica": {
                "title": "Comercio en Hispalis",
                "subtitle": "Simulador económico del comercio en la Bética romana",
                "description": "Simulador económico del comercio en la Bética romana",
                "longDescription": "Un simulador económico profundo centrado en el comercio romano en la próspera provincia de la Bética. Los jugadores gestionan rutas comerciales, producción de aceite de oliva y exportación a todo el Imperio Romano.",
                "technologies": ["Unreal Engine 5", "C++", "Economic AI", "Trade Route System", "Production Chains", "Market Simulation"],
                "features": [
                    "Sistema económico complejo basado en recursos reales",
                    "Rutas comerciales desde Hispalis hasta Roma",
                    "Producción de aceite, vino y metales preciosos",
                    "Gestión de villas y latifundios romanos",
                    "Mercados dinámicos con fluctuación de precios",
                    "Eventos históricos que afectan el comercio"
                ],
                "images": [
                    { "url": "images/baetica/puerto-hispalis.jpg", "alt": "Puerto comercial de Hispalis (Sevilla)" },
                    { "url": "images/baetica/olivar-romano.jpg", "alt": "Plantación de olivos en villa romana" },
                    { "url": "images/baetica/anforas-aceite.jpg", "alt": "Ánforas de aceite listas para exportar" }
                ],
                "links": {
                    "github": "https://github.com/tuusuario/hispalis-economy",
                    "demo": "https://youtu.be/demo-hispalis",
                    "download": "https://gog.hispalis-trade.com"
                },
                "status": "Early Access",
                "duration": "10 meses (en desarrollo)",
                "team": "Desarrollo individual + economista consultor",
                "region": "baetica"
            },
            "baleares": {
                "title": "Navegación Balear",
                "subtitle": "Simulador naval de las rutas comerciales baleares",
                "description": "Simulador naval de las rutas comerciales baleares",
                "longDescription": "Un simulador naval especializado en la navegación mediterránea desde las Islas Baleares. Los jugadores gestionan flotas comerciales, exploran rutas marítimas y defienden sus barcos de piratas mientras transportan mercancías por todo el Mediterráneo.",
                "technologies": ["Unreal Engine 5", "C++", "Naval Physics", "Weather Simulation", "Pirate AI", "Trade Networks"],
                "features": [
                    "Física naval realista con vientos y corrientes",
                    "Sistema meteorológico que afecta la navegación",
                    "Rutas comerciales entre islas mediterráneas",
                    "Combate naval contra piratas y rivales",
                    "Gestión de flotas y tripulaciones",
                    "Exploración de rutas marítimas desconocidas"
                ],
                "images": [
                    { "url": "images/baleares/galera-romana.jpg", "alt": "Galera romana navegando entre islas" },
                    { "url": "images/baleares/puerto-palmaria.jpg", "alt": "Puerto de Palmaria (Palma de Mallorca)" },
                    { "url": "images/baleares/combate-piratas.jpg", "alt": "Combate naval contra piratas" }
                ],
                "links": {
                    "github": "https://github.com/tuusuario/baleares-naval",
                    "demo": "https://youtu.be/demo-baleares",
                    "documentation": "https://docs.mediterranean-trade.com"
                },
                "status": "Completado",
                "duration": "8 meses",
                "team": "Desarrollo individual",
                "region": "baleares"
            }
        };
    }
    
    // Cargar datos del JSON con fallback embebido
    async loadProjectsData() {
        console.log('ModalManager: Intentando cargar datos de proyectos...');
        
        // Verificar si estamos en file:// protocol
        const isFileProtocol = window.location.protocol === 'file:';
        
        if (isFileProtocol) {
            console.warn('ModalManager: Detectado protocolo file://, usando datos embebidos para evitar CORS');
            this.projectsData = this.getEmbeddedProjectsData();
            this.isDataLoaded = true;
            console.log(`ModalManager: Datos embebidos cargados: ${Object.keys(this.projectsData).length} proyectos`);
            window.projectData = this.projectsData;
            return;
        }
        
        // Intentar cargar desde JSON si estamos en servidor
        try {
            console.log('ModalManager: Cargando desde JSON...');
            const response = await fetch('data/projects.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.projectsData = data.projects;
            this.isDataLoaded = true;
            
            console.log(`ModalManager: Datos JSON cargados: ${Object.keys(this.projectsData).length} proyectos`);
            window.projectData = this.projectsData;
            
        } catch (error) {
            console.error('ModalManager: Error cargando JSON, usando datos embebidos:', error);
            
            // Fallback a datos embebidos
            this.projectsData = this.getEmbeddedProjectsData();
            this.isDataLoaded = true;
            console.log(`ModalManager: Fallback embebido activado: ${Object.keys(this.projectsData).length} proyectos`);
            window.projectData = this.projectsData;
        }
    }
    
    // Obtener datos de un proyecto específico
    getProjectData(projectId) {
        if (!this.isDataLoaded) {
            console.error('ModalManager: Datos de proyectos no cargados aún');
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
                            ${team}
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
            'Completado': 'completed',
            'Lanzado': 'lanzado',
            'En Desarrollo': 'development',
            'Beta': 'beta',
            'Early Access': 'early-access',
            'Planificado': 'planning'
        };
        
        return statusMap[status] || 'development';
    }
    
    generateLinksHTML(links) {
        const linkMap = {
            github: { icon: 'fab fa-github', text: 'Ver Código' },
            demo: { icon: 'fas fa-play', text: 'Ver Demo' },
            download: { icon: 'fas fa-download', text: 'Descargar' },
            documentation: { icon: 'fas fa-book', text: 'Documentación' },
            website: { icon: 'fas fa-globe', text: 'Sitio Web' }
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
        await this.loadProjectsData();
        console.log('ModalManager: Datos recargados exitosamente');
    }
    
    debugInfo() {
        console.log('=== MODAL MANAGER DEBUG ===');
        console.log('isDataLoaded:', this.isDataLoaded);
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