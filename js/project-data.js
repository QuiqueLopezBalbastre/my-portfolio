// ===== PROJECT DATA - HISPANIA ROMANA =====

const projectData = {
    'rpg-celta': {
        title: 'RPG Celta: Gallaecia',
        subtitle: 'Aventura RPG ambientada en los pueblos celtas del noroeste hispano',
        description: 'Aventura RPG ambientada en los pueblos celtas del noroeste hispano',
        longDescription: 'Un RPG épico que sigue las tradiciones celtas de Gallaecia antes y durante la llegada de Roma. Los jugadores encarnan a un druida que debe preservar las tradiciones ancestrales mientras navega las complejas relaciones con las tribus locales y los invasores romanos.',
        technologies: ['Unreal Engine 5', 'C++', 'Blueprints', 'Celtic Mythology System', 'Weather Magic', 'Tribe Relations AI'],
        features: [
            'Sistema de magia druídica basado en elementos naturales',
            'Relaciones complejas entre tribus celtas y romanos',
            'Mundo abierto inspirado en la Galicia antigua',
            'Rituales sagrados en castros y bosques druídicos',
            'Sistema de estaciones que afecta la magia y gameplay',
            'Narrativa ramificada basada en decisiones morales'
        ],
        images: [
            { url: 'images/gallaecia/castro-celta.jpg', alt: 'Castro celta en las montañas gallegas' },
            { url: 'images/gallaecia/druida-ritual.jpg', alt: 'Ritual druídico en el bosque sagrado' },
            { url: 'images/gallaecia/guerreros-celtas.jpg', alt: 'Guerreros celtas defendiendo su territorio' }
        ],
        links: {
            github: 'https://github.com/tuusuario/gallaecia-rpg',
            demo: 'https://youtu.be/demo-gallaecia-rpg',
            documentation: 'https://docs.gallaecia-rpg.com'
        },
        status: 'En Desarrollo',
        duration: '12 meses',
        team: 'Desarrollo individual + historiador consultor',
        region: 'gallaecia'
    },
    
    'strategy-romano': {
        title: 'Estrategia Romana: Tarraconensis',
        subtitle: 'RTS sobre la conquista romana de la costa mediterránea',
        description: 'RTS sobre la conquista romana de la costa mediterránea',
        longDescription: 'Un juego de estrategia en tiempo real que recrea la conquista romana de Tarraconensis. Los jugadores pueden elegir liderar las legiones romanas o defender las ciudades ibéricas en una campaña épica que abarca desde Emporion hasta Cartago Nova.',
        technologies: ['Unreal Engine 5', 'C++', 'Legion Formation AI', 'Siege Mechanics', 'Economic Simulation', 'Historical Database'],
        features: [
            'Formaciones militares históricamente precisas',
            'Sistema de asedio avanzado con maquinaria romana',
            'Gestión de provincias y tributos',
            'Campaña histórica con 20 batallas épicas',
            'Modo multijugador hasta 8 jugadores',
            'Editor de mapas con herramientas topográficas'
        ],
        images: [
            { url: 'images/tarraconensis/legion-marcha.jpg', alt: 'Legión romana marchando por Tarragona' },
            { url: 'images/tarraconensis/asedio-ciudad.jpg', alt: 'Asedio romano a una ciudad ibérica' },
            { url: 'images/tarraconensis/anfiteatro.jpg', alt: 'Construcción del anfiteatro de Tarraco' }
        ],
        links: {
            github: 'https://github.com/tuusuario/tarraconensis-strategy',
            demo: 'https://youtu.be/demo-tarraconensis',
            download: 'https://steam.tarraconensis-game.com'
        },
        status: 'Beta',
        duration: '18 meses',
        team: 'Equipo de 3 desarrolladores + arqueólogo',
        region: 'tarraconensis'
    },
    
    'tactical-punico': {
        title: 'Guerra Púnica: Cartaginensis',
        subtitle: 'Simulador táctico de las guerras entre Roma y Cartago',
        description: 'Simulador táctico de las guerras entre Roma y Cartago',
        longDescription: 'Un simulador táctico centrado en los conflictos entre Roma y Cartago en territorio hispano. Recrea batallas famosas como la toma de Cartago Nova por Escipión y las campañas de Aníbal antes de cruzar los Alpes.',
        technologies: ['Unreal Engine 5', 'C++', 'Battle Simulation', 'Elephant Warfare', 'Naval Combat', 'Weather Systems'],
        features: [
            'Batallas terrestres y navales históricas',
            'Unidades únicas: elefantes cartagineses vs. legiones',
            'Sistema meteorológico que afecta las batallas',
            'Campaña de Aníbal con decisiones estratégicas',
            'Modo academia con tutoriales históricos',
            'Recreación fiel de armaduras y tácticas'
        ],
        images: [
            { url: 'images/cartaginensis/batalla-naval.jpg', alt: 'Batalla naval entre flotas romana y cartaginesa' },
            { url: 'images/cartaginensis/elefantes-guerra.jpg', alt: 'Elefantes de guerra cartagineses' },
            { url: 'images/cartaginensis/cartago-nova.jpg', alt: 'Asedio de Cartago Nova' }
        ],
        links: {
            github: 'https://github.com/tuusuario/cartaginensis-tactics',
            demo: 'https://youtu.be/demo-cartaginensis',
            documentation: 'https://wiki.carthage-wars.com'
        },
        status: 'Completado',
        duration: '15 meses',
        team: 'Desarrollo individual',
        region: 'cartaginensis'
    },
    
    'action-viriato': {
        title: 'Viriato: El Último Guerrero',
        subtitle: 'Action-adventure sobre la resistencia lusitana contra Roma',
        description: 'Action-adventure sobre la resistencia lusitana contra Roma',
        longDescription: 'Un juego de acción y aventura que narra la épica historia de Viriato, el pastor que se convirtió en el terror de Roma. Combina combate táctico, sigilo y diplomacia tribal en la lucha por la independencia lusitana.',
        technologies: ['Unreal Engine 5', 'C++', 'Guerrilla Warfare AI', 'Tribal Diplomacy', 'Stealth Mechanics', 'Historical Narrative'],
        features: [
            'Combate híbrido: combate directo y tácticas de guerrilla',
            'Sistema de sigilo en terrenos montañosos',
            'Diplomacia tribal para unir clanes lusitanos',
            'Recreación de paisajes lusitanos históricos',
            'Narrativa basada en fuentes históricas',
            'Mecánicas de liderazgo y moral de tropas'
        ],
        images: [
            { url: 'images/lusitania/viriato-portrait.jpg', alt: 'Retrato de Viriato, líder lusitano' },
            { url: 'images/lusitania/emboscada-montana.jpg', alt: 'Emboscada lusitana en terreno montañoso' },
            { url: 'images/lusitania/consejo-tribal.jpg', alt: 'Consejo de guerra entre jefes tribales' }
        ],
        links: {
            github: 'https://github.com/tuusuario/viriato-adventure',
            demo: 'https://youtu.be/demo-viriato',
            download: 'https://epic-games.viriato-game.com'
        },
        status: 'Lanzado',
        duration: '20 meses',
        team: 'Equipo de 5 desarrolladores',
        region: 'lusitania'
    },
    
    'economic-hispalis': {
        title: 'Comercio en Hispalis',
        subtitle: 'Simulador económico del comercio en la Bética romana',
        description: 'Simulador económico del comercio en la Bética romana',
        longDescription: 'Un simulador económico profundo centrado en el comercio romano en la próspera provincia de la Bética. Los jugadores gestionan rutas comerciales, producción de aceite de oliva y exportación a todo el Imperio Romano.',
        technologies: ['Unreal Engine 5', 'C++', 'Economic AI', 'Trade Route System', 'Production Chains', 'Market Simulation'],
        features: [
            'Sistema económico complejo basado en recursos reales',
            'Rutas comerciales desde Hispalis hasta Roma',
            'Producción de aceite, vino y metales preciosos',
            'Gestión de villas y latifundios romanos',
            'Mercados dinámicos con fluctuación de precios',
            'Eventos históricos que afectan el comercio'
        ],
        images: [
            { url: 'images/baetica/puerto-hispalis.jpg', alt: 'Puerto comercial de Hispalis (Sevilla)' },
            { url: 'images/baetica/olivar-romano.jpg', alt: 'Plantación de olivos en villa romana' },
            { url: 'images/baetica/anforas-aceite.jpg', alt: 'Ánforas de aceite listas para exportar' }
        ],
        links: {
            github: 'https://github.com/tuusuario/hispalis-economy',
            demo: 'https://youtu.be/demo-hispalis',
            download: 'https://gog.hispalis-trade.com'
        },
        status: 'Early Access',
        duration: '10 meses (en desarrollo)',
        team: 'Desarrollo individual + economista consultor',
        region: 'baetica'
    },
    
    'naval-baleares': {
        title: 'Navegación Balear',
        subtitle: 'Simulador naval de las rutas comerciales baleares',
        description: 'Simulador naval de las rutas comerciales baleares',
        longDescription: 'Un simulador naval especializado en la navegación mediterránea desde las Islas Baleares. Los jugadores gestionan flotas comerciales, exploran rutas marítimas y defienden sus barcos de piratas mientras transportan mercancías por todo el Mediterráneo.',
        technologies: ['Unreal Engine 5', 'C++', 'Naval Physics', 'Weather Simulation', 'Pirate AI', 'Trade Networks'],
        features: [
            'Física naval realista con vientos y corrientes',
            'Sistema meteorológico que afecta la navegación',
            'Rutas comerciales entre islas mediterráneas',
            'Combate naval contra piratas y rivales',
            'Gestión de flotas y tripulaciones',
            'Exploración de rutas marítimas desconocidas'
        ],
        images: [
            { url: 'images/baleares/galera-romana.jpg', alt: 'Galera romana navegando entre islas' },
            { url: 'images/baleares/puerto-palmaria.jpg', alt: 'Puerto de Palmaria (Palma de Mallorca)' },
            { url: 'images/baleares/combate-piratas.jpg', alt: 'Combate naval contra piratas' }
        ],
        links: {
            github: 'https://github.com/tuusuario/baleares-naval',
            demo: 'https://youtu.be/demo-baleares',
            documentation: 'https://docs.mediterranean-trade.com'
        },
};

// Utility functions for project data management - Updated for Hispania
const ProjectDataManager = {
    // Get all projects
    getAllProjects() {
        return projectData;
    },
    
    // Get project by ID
    getProject(projectId) {
        return projectData[projectId] || null;
    },
    
    // Get projects by status
    getProjectsByStatus(status) {
        return Object.values(projectData).filter(project => 
            project.status.toLowerCase() === status.toLowerCase()
        );
    },
    
    // Get projects by technology
    getProjectsByTechnology(tech) {
        return Object.values(projectData).filter(project =>
            project.technologies.some(technology => 
                technology.toLowerCase().includes(tech.toLowerCase())
            )
        );
    },
    
    // Get projects by region (new method for Hispania)
    getProjectsByRegion(region) {
        return Object.values(projectData).filter(project =>
            project.region === region
        );
    },
    
    // Get projects by historical period
    getProjectsByPeriod(period) {
        const periodMap = {
            'prerromano': ['rpg-celta'],
            'conquista': ['strategy-romano', 'tactical-punico', 'action-viriato'],
            'imperial': ['economic-hispalis', 'naval-baleares']
        };
        
        return (periodMap[period] || []).map(id => projectData[id]).filter(Boolean);
    },
    
    // Get random project
    getRandomProject() {
        const projects = Object.keys(projectData);
        const randomIndex = Math.floor(Math.random() * projects.length);
        return projectData[projects[randomIndex]];
    },
    
    // Search projects
    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        return Object.values(projectData).filter(project => {
            return project.title.toLowerCase().includes(searchTerm) ||
                   project.description.toLowerCase().includes(searchTerm) ||
                   project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
                   project.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
                   project.region.toLowerCase().includes(searchTerm);
        });
    },
    
    // Get project statistics
    getStatistics() {
        const projects = Object.values(projectData);
        const totalProjects = projects.length;
        const completedProjects = projects.filter(p => p.status === 'Completado' || p.status === 'Lanzado').length;
        const inDevelopment = projects.filter(p => p.status.includes('Desarrollo') || p.status === 'Beta' || p.status === 'Early Access').length;
        
        const technologies = projects.reduce((acc, project) => {
            project.technologies.forEach(tech => {
                acc[tech] = (acc[tech] || 0) + 1;
            });
            return acc;
        }, {});
        
        const regions = projects.reduce((acc, project) => {
            acc[project.region] = (acc[project.region] || 0) + 1;
            return acc;
        }, {});
        
        return {
            total: totalProjects,
            completed: completedProjects,
            inDevelopment: inDevelopment,
            technologies: technologies,
            regions: regions,
            averageDuration: this.calculateAverageDuration(projects)
        };
    },
    
    calculateAverageDuration(projects) {
        const durations = projects
            .map(p => p.duration)
            .filter(d => d.includes('meses'))
            .map(d => parseInt(d.match(/\d+/)[0]));
        
        if (durations.length === 0) return 'N/A';
        
        const average = durations.reduce((a, b) => a + b, 0) / durations.length;
        return `${Math.round(average)} meses`;
    },
    
    // Get regional information
    getRegionInfo(regionId) {
        const regionInfo = {
            'gallaecia': {
                name: 'Gallaecia',
                description: 'Región noroccidental de Hispania, hogar de pueblos celtas',
                capital: 'Bracara Augusta',
                characteristics: ['Cultura celta', 'Castros fortificados', 'Tradición druídica']
            },
            'tarraconensis': {
                name: 'Tarraconensis',
                description: 'Provincia romana más extensa, centro administrativo',
                capital: 'Tarraco',
                characteristics: ['Administración romana', 'Vía Augusta', 'Mediterráneo']
            },
            'cartaginensis': {
                name: 'Cartaginensis',
                description: 'Región central, escenario de conflictos púnicos',
                capital: 'Cartago Nova',
                characteristics: ['Conflictos púnicos', 'Minería', 'Rutas comerciales']
            },
            'lusitania': {
                name: 'Lusitania',
                description: 'Territorio occidental, cuna de la resistencia contra Roma',
                capital: 'Emerita Augusta',
                characteristics: ['Resistencia lusitana', 'Viriato', 'Guerrilla']
            },
            'baetica': {
                name: 'Baetica',
                description: 'Provincia más romanizada y próspera',
                capital: 'Corduba',
                characteristics: ['Comercio', 'Aceite de oliva', 'Romanización']
            },
            'baleares': {
                name: 'Islas Baleares',
                description: 'Archipiélago estratégico en rutas mediterráneas',
                capital: 'Palmaria',
                characteristics: ['Navegación', 'Comercio marítimo', 'Honderos']
            }
        };
        
        return regionInfo[regionId] || null;
    },
    
    // Validate project data
    validateProject(projectId) {
        const project = this.getProject(projectId);
        if (!project) return { valid: false, errors: ['Project not found'] };
        
        const errors = [];
        const required = ['title', 'description', 'technologies', 'status', 'region'];
        
        required.forEach(field => {
            if (!project[field]) {
                errors.push(`Missing required field: ${field}`);
            }
        });
        
        if (project.technologies && !Array.isArray(project.technologies)) {
            errors.push('Technologies must be an array');
        }
        
        if (project.features && !Array.isArray(project.features)) {
            errors.push('Features must be an array');
        }
        
        // Validate region
        const validRegions = ['gallaecia', 'tarraconensis', 'cartaginensis', 'lusitania', 'baetica', 'baleares'];
        if (project.region && !validRegions.includes(project.region)) {
            errors.push(`Invalid region: ${project.region}`);
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
};

// Export project data and utilities
window.projectData = projectData;
window.ProjectDataManager = ProjectDataManager;

// For development/debugging
if (typeof console !== 'undefined') {
    console.log('Hispania Project Data loaded:', Object.keys(projectData).length, 'projects');
    console.log('Statistics:', ProjectDataManager.getStatistics());
    console.log('Regions represented:', Object.keys(ProjectDataManager.getStatistics().regions));
}'C++', 'Blueprints', 'Multiplayer Networking', 'Lumen', 'Nanite'],
        features: [
            'Sistema de combate táctico con mecánicas realistas de balística',
            'Multijugador online para hasta 32 jugadores simultáneos',
            'Sistema de clases y personalización de armamento',
            'Mapas destructibles con física avanzada',
            'Sistema de comunicación por voz integrado',
            'Interfaz de usuario intuitiva y responsive'
        ],
        images: [
            { url: 'images/fps-shooter/screenshot1.jpg', alt: 'Combate táctico en entorno urbano' },
            { url: 'images/fps-shooter/screenshot2.jpg', alt: 'Sistema de personalización de armas' },
            { url: 'images/fps-shooter/screenshot3.jpg', alt: 'Mapa multijugador con destructibilidad' }
        ],
        links: {
            github: 'https://github.com/quiquelopezbalbastre/fps-tactical-shooter',
            demo: 'https://youtu.be/demo-fps-shooter',
            documentation: 'https://docs.fps-shooter-project.com'
        },
        status: 'En Desarrollo',
        duration: '8 meses',
        team: 'Desarrollo individual',
        continent: 'north-america'
    },
    
    'adventure-rpg': {
        title: 'Adventure RPG',
        subtitle: 'RPG de aventuras con mundo abierto y mecánicas de supervivencia',
        description: 'RPG de aventuras con mundo abierto y mecánicas de supervivencia',
        longDescription: 'Un RPG de mundo abierto que combina exploración, supervivencia y combate en un vasto continente lleno de secretos. El jugador debe gestionar recursos, construir refugios y enfrentarse a criaturas míticas mientras desentraña una historia épica.',
        technologies: ['Unreal Engine 5', 'C++', 'Blueprints', 'World Composition', 'Behavior Trees', 'Save System'],
        features: [
            'Mundo abierto de más de 50 km² completamente explorable',
            'Sistema de supervivencia con hambre, sed y temperatura',
            'Crafting y construcción de bases avanzado',
            'Sistema de combate dinámico con diferentes estilos de lucha',
            'NPCs con IA avanzada y diálogos ramificados',
            'Ciclo día/noche que afecta al gameplay'
        ],
        images: [
            { url: 'images/adventure-rpg/screenshot1.jpg', alt: 'Paisaje de mundo abierto' },
            { url: 'images/adventure-rpg/screenshot2.jpg', alt: 'Sistema de crafting' },
            { url: 'images/adventure-rpg/screenshot3.jpg', alt: 'Combate contra criaturas míticas' }
        ],
        links: {
            github: 'https://github.com/quiquelopezbalbastre/adventure-rpg',
            demo: 'https://youtu.be/demo-adventure-rpg',
            download: 'https://releases.adventure-rpg.com/latest'
        },
        status: 'Beta',
        duration: '14 meses',
        team: 'Desarrollo individual + 2 artistas freelance',
        continent: 'south-america'
    },
    
    'strategy-rts': {
        title: 'Medieval RTS',
        subtitle: 'Juego de estrategia en tiempo real ambientado en la época medieval',
        description: 'Juego de estrategia en tiempo real ambientado en la época medieval',
        longDescription: 'Un RTS clásico con mecánicas modernas ambientado en la Europa medieval. Los jugadores deben gestionar recursos, construir ciudades, entrenar ejércitos y conquistar territorios en campañas históricamente inspiradas.',
        technologies: ['Unreal Engine 5', 'C++', 'AI Behavior Trees', 'Pathfinding', 'Networking', 'UI Framework'],
        features: [
            'Campañas históricas basadas en eventos reales',
            'Sistema de construcción de ciudades detallado',
            'IA enemiga con diferentes niveles de dificultad',
            'Multijugador competitivo hasta 8 jugadores',
            'Sistema económico realista con comercio',
            'Batallas épicas con hasta 1000 unidades simultáneas'
        ],
        images: [
            { url: 'images/medieval-rts/screenshot1.jpg', alt: 'Vista general de ciudad medieval' },
            { url: 'images/medieval-rts/screenshot2.jpg', alt: 'Batalla épica entre ejércitos' },
            { url: 'images/medieval-rts/screenshot3.jpg', alt: 'Interfaz de gestión de recursos' }
        ],
        links: {
            github: 'https://github.com/quiquelopezbalbastre/medieval-rts',
            demo: 'https://youtu.be/demo-medieval-rts',
            documentation: 'https://wiki.medieval-rts.com'
        },
        status: 'Completado',
        duration: '10 meses',
        team: 'Desarrollo individual',
        continent: 'europe'
    },
    
    'racing-game': {
        title: 'Safari Racing',
        subtitle: 'Juego de carreras off-road por paisajes africanos',
        description: 'Juego de carreras off-road por paisajes africanos',
        longDescription: 'Una experiencia de carreras única que lleva a los jugadores a través de los paisajes más espectaculares de África. Con física de vehículos realista y entornos dinámicos, cada carrera es una aventura diferente.',
        technologies: ['Unreal Engine 5', 'C++', 'Chaos Physics', 'Landscape System', 'Vehicle Physics', 'Weather System'],
        features: [
            'Física de vehículos realista con diferentes tipos de terreno',
            'Entornos dinámicos con cambios climáticos',
            'Modo carrera con historia y personajes únicos',
            'Personalización completa de vehículos',
            'Modo multijugador online y local',
            'Sistema de daño realista que afecta el rendimiento'
        ],
        images: [
            { url: 'images/safari-racing/screenshot1.jpg', alt: 'Carrera en la sabana africana' },
            { url: 'images/safari-racing/screenshot2.jpg', alt: 'Personalización de vehículos' },
            { url: 'images/safari-racing/screenshot3.jpg', alt: 'Carrera nocturna con efectos climáticos' }
        ],
        links: {
            github: 'https://github.com/quiquelopezbalbastre/safari-racing',
            demo: 'https://youtu.be/demo-safari-racing',
            download: 'https://store.safari-racing.com'
        },
        status: 'Lanzado',
        duration: '12 meses',
        team: 'Equipo de 4 desarrolladores',
        continent: 'africa'
    },
    
    'fighting-game': {
        title: 'Martial Arts Fighter',
        subtitle: 'Juego de lucha con artes marciales tradicionales asiáticas',
        description: 'Juego de lucha con artes marciales tradicionales asiáticas',
        longDescription: 'Un fighting game que honra las tradiciones de las artes marciales asiáticas. Cada personaje representa un estilo de lucha diferente, con movimientos únicos capturados mediante motion capture de maestros reales.',
        technologies: ['Unreal Engine 5', 'C++', 'Animation Blueprints', 'Motion Capture', 'Fighting Game Framework', 'Networking'],
        features: [
            'Sistema de combate profundo con combos únicos por personaje',
            '12 luchadores con estilos de artes marciales auténticos',
            'Modo historia que explora la filosofía de cada arte marcial',
            'Multijugador online con rollback netcode',
            'Sistema de entrenamiento con tutoriales interactivos',
            'Torneos online y ranking global'
        ],
        images: [
            { url: 'images/martial-arts/screenshot1.jpg', alt: 'Combate entre maestros de kung fu' },
            { url: 'images/martial-arts/screenshot2.jpg', alt: 'Dojo tradicional japonés' },
            { url: 'images/martial-arts/screenshot3.jpg', alt: 'Sistema de combos y movimientos especiales' }
        ],
        links: {
            github: 'https://github.com/quiquelopezbalbastre/martial-arts-fighter',
            demo: 'https://youtu.be/demo-martial-arts',
            download: 'https://steam.martialartsfighter.com'
        },
        status: 'Completado',
        duration: '18 meses',
        team: 'Desarrollo individual + motion capture studio',
        continent: 'asia'
    },
    
    'survival-game': {
        title: 'Island Survival',
        subtitle: 'Simulador de supervivencia en islas tropicales',
        description: 'Simulador de supervivencia en islas tropicales',
        longDescription: 'Una experiencia de supervivencia inmersiva en un archipiélago tropical. Los jugadores deben utilizar su ingenio para sobrevivir, explorar islas misteriosas y descubrir los secretos de una civilización perdida.',
        technologies: ['Unreal Engine 5', 'C++', 'Procedural Generation', 'Water System', 'Survival Mechanics', 'Crafting System'],
        features: [
            'Generación procedural de islas con ecosistemas únicos',
            'Sistema de supervivencia realista con necesidades básicas',
            'Construcción de refugios y herramientas desde cero',
            'Exploración submarina con fauna marina',
            'Cultivo y domesticación de animales',
            'Misterios arqueológicos para desentrañar'
        ],
        images: [
            { url: 'images/island-survival/screenshot1.jpg', alt: 'Isla tropical con playa paradisíaca' },
            { url: 'images/island-survival/screenshot2.jpg', alt: 'Construcción de refugio en la playa' },
            { url: 'images/island-survival/screenshot3.jpg', alt: 'Exploración submarina' }
        ],
        links: {
            github: 'https://github.com/quiquelopezbalbastre/island-survival',
            demo: 'https://youtu.be/demo-island-survival',
            download: 'https://early-access.island-survival.com'
        },
        status: 'Early Access',
        duration: '6 meses (en desarrollo)',
        team: 'Desarrollo individual',
        continent: 'oceania'
    },
    
    'puzzle-platformer': {
        title: 'Ice Puzzle Platformer',
        subtitle: 'Plataformas y puzzles en un mundo helado post-apocalíptico',
        description: 'Plataformas y puzzles en un mundo helado post-apocalíptico',
        longDescription: 'Un juego de plataformas con elementos de puzzle ambientado en un mundo post-apocalíptico cubierto de hielo. Los jugadores deben usar la física del hielo y las mecánicas de temperatura para resolver desafíos únicos.',
        technologies: ['Unreal Engine 5', 'C++', 'Physics System', 'Puzzle Mechanics', 'Temperature System', 'Procedural Ice'],
        features: [
            'Mecánicas únicas basadas en temperatura y estados del agua',
            'Puzzles que requieren manipular el entorno helado',
            'Sistema de física avanzado para interacciones con hielo',
            'Historia emotiva contada a través del entorno',
            'Banda sonora dinámica que responde al progreso',
            'Efectos visuales impresionantes con Lumen y Nanite'
        ],
        images: [
            { url: 'images/ice-platformer/screenshot1.jpg', alt: 'Paisaje helado post-apocalíptico' },
            { url: 'images/ice-platformer/screenshot2.jpg', alt: 'Puzzle con mecánicas de hielo' },
            { url: 'images/ice-platformer/screenshot3.jpg', alt: 'Plataformas en cavernas de hielo' }
        ],
        links: {
            github: 'https://github.com/quiquelopezbalbastre/ice-puzzle-platformer',
            demo: 'https://youtu.be/demo-ice-platformer',
            documentation: 'https://devlog.ice-platformer.com'
        },
        status: 'En Desarrollo',
        duration: '4 meses (en desarrollo)',
        team: 'Desarrollo individual',
        continent: 'antarctica'
    }
};

// Utility functions for project data management
const ProjectDataManager = {
    // Get all projects
    getAllProjects() {
        return projectData;
    },
    
    // Get project by ID
    getProject(projectId) {
        return projectData[projectId] || null;
    },
    
    // Get projects by status
    getProjectsByStatus(status) {
        return Object.values(projectData).filter(project => 
            project.status.toLowerCase() === status.toLowerCase()
        );
    },
    
    // Get projects by technology
    getProjectsByTechnology(tech) {
        return Object.values(projectData).filter(project =>
            project.technologies.some(technology => 
                technology.toLowerCase().includes(tech.toLowerCase())
            )
        );
    },
    
    // Get projects by continent
    getProjectsByContinent(continent) {
        return Object.values(projectData).filter(project =>
            project.continent === continent
        );
    },
    
    // Get random project
    getRandomProject() {
        const projects = Object.keys(projectData);
        const randomIndex = Math.floor(Math.random() * projects.length);
        return projectData[projects[randomIndex]];
    },
    
    // Search projects
    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        return Object.values(projectData).filter(project => {
            return project.title.toLowerCase().includes(searchTerm) ||
                   project.description.toLowerCase().includes(searchTerm) ||
                   project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
                   project.features.some(feature => feature.toLowerCase().includes(searchTerm));
        });
    },
    
    // Get project statistics
    getStatistics() {
        const projects = Object.values(projectData);
        const totalProjects = projects.length;
        const completedProjects = projects.filter(p => p.status === 'Completado').length;
        const inDevelopment = projects.filter(p => p.status.includes('Desarrollo')).length;
        
        const technologies = projects.reduce((acc, project) => {
            project.technologies.forEach(tech => {
                acc[tech] = (acc[tech] || 0) + 1;
            });
            return acc;
        }, {});
        
        return {
            total: totalProjects,
            completed: completedProjects,
            inDevelopment: inDevelopment,
            technologies: technologies,
            averageDuration: this.calculateAverageDuration(projects)
        };
    },
    
    calculateAverageDuration(projects) {
        const durations = projects
            .map(p => p.duration)
            .filter(d => d.includes('meses'))
            .map(d => parseInt(d.match(/\d+/)[0]));
        
        if (durations.length === 0) return 'N/A';
        
        const average = durations.reduce((a, b) => a + b, 0) / durations.length;
        return `${Math.round(average)} meses`;
    },
    
    // Validate project data
    validateProject(projectId) {
        const project = this.getProject(projectId);
        if (!project) return { valid: false, errors: ['Project not found'] };
        
        const errors = [];
        const required = ['title', 'description', 'technologies', 'status'];
        
        required.forEach(field => {
            if (!project[field]) {
                errors.push(`Missing required field: ${field}`);
            }
        });
        
        if (project.technologies && !Array.isArray(project.technologies)) {
            errors.push('Technologies must be an array');
        }
        
        if (project.features && !Array.isArray(project.features)) {
            errors.push('Features must be an array');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
};

// Export project data and utilities
window.projectData = projectData;
window.ProjectDataManager = ProjectDataManager;

// For development/debugging
if (typeof console !== 'undefined') {
    console.log('Project Data loaded:', Object.keys(projectData).length, 'projects');
    console.log('Statistics:', ProjectDataManager.getStatistics());
}