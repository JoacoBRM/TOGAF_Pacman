// Preguntas TOGAF organizadas por nivel
const questionsByLevel = {
    1: [
        {
            question: "¿Qué significa ADM en TOGAF?",
            options: [
                "Architecture Design Method",
                "Architecture Development Method",
                "Application Development Model",
                "Agile Development Method"
            ],
            answer: 1
        },
        {
            question: "¿Cuál es la fase preliminar de ADM?",
            options: [
                "Vision",
                "Preliminary",
                "Requirements",
                "Architecture"
            ],
            answer: 1
        },
        {
            question: "¿Qué tipo de arquitectura describe la estructura de datos?",
            options: [
                "Business Architecture",
                "Application Architecture",
                "Data Architecture",
                "Technology Architecture"
            ],
            answer: 2
        },
        {
            question: "¿En qué fase se desarrolla la Architecture Vision?",
            options: [
                "Fase A",
                "Fase B",
                "Fase Preliminar",
                "Fase H"
            ],
            answer: 0
        }
    ],
    2: [
        {
            question: "¿Qué es el Repository en TOGAF?",
            options: [
                "Una base de datos de proyectos",
                "Un almacén de información arquitectónica",
                "Un gestor de código fuente",
                "Un registro de cambios"
            ],
            answer: 1
        },
        {
            question: "¿Qué fase de ADM se enfoca en la arquitectura de negocio?",
            options: [
                "Fase A - Vision",
                "Fase B - Business Architecture",
                "Fase C - Information Systems",
                "Fase D - Technology Architecture"
            ],
            answer: 1
        },
        {
            question: "¿Qué son los Building Blocks en TOGAF?",
            options: [
                "Componentes reutilizables de arquitectura",
                "Herramientas de desarrollo",
                "Diagramas de arquitectura",
                "Fases del ADM"
            ],
            answer: 0
        },
        {
            question: "¿Qué gestiona la fase E del ADM?",
            options: [
                "Opportunities and Solutions",
                "Migration Planning",
                "Implementation Governance",
                "Architecture Change Management"
            ],
            answer: 0
        },
        {
            question: "¿Cuál es el objetivo del Gap Analysis?",
            options: [
                "Comparar presupuestos",
                "Identificar diferencias entre arquitectura actual y objetivo",
                "Medir el rendimiento del equipo",
                "Validar código"
            ],
            answer: 1
        }
    ],
    3: [
        {
            question: "¿Qué es el Enterprise Continuum en TOGAF?",
            options: [
                "Un proceso de desarrollo continuo",
                "Una vista de la arquitectura empresarial desde lo genérico a lo específico",
                "Un framework de gestión de proyectos",
                "Una metodología ágil"
            ],
            answer: 1
        },
        {
            question: "¿Qué fase del ADM implementa la gobernanza de la arquitectura?",
            options: [
                "Fase E",
                "Fase F",
                "Fase G",
                "Fase H"
            ],
            answer: 2
        },
        {
            question: "¿Qué son los Stakeholders en TOGAF?",
            options: [
                "Solo los desarrolladores del proyecto",
                "Personas o grupos con interés en la arquitectura",
                "Los clientes externos únicamente",
                "El equipo de testing"
            ],
            answer: 1
        },
        {
            question: "¿Qué propósito tiene la Architecture Roadmap?",
            options: [
                "Documentar la historia del proyecto",
                "Planificar la transición de la arquitectura actual a la objetivo",
                "Definir los roles del equipo",
                "Establecer el presupuesto"
            ],
            answer: 1
        },
        {
            question: "¿Qué es un Viewpoint en TOGAF?",
            options: [
                "La opinión de un stakeholder",
                "Una perspectiva desde la cual se examina la arquitectura",
                "Un punto de referencia geográfico",
                "Un hito del proyecto"
            ],
            answer: 1
        },
        {
            question: "¿Qué gestiona la Requirements Management en TOGAF?",
            options: [
                "Solo los requisitos iniciales",
                "Los cambios en los requisitos a lo largo del ciclo ADM",
                "El presupuesto de requisitos",
                "La documentación de usuario"
            ],
            answer: 1
        }
    ]
};

// Variable global para compatibilidad (nivel actual)
let currentLevel = 1;
let questions = questionsByLevel[1];
