const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('current-level');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const levelCompleteScreen = document.getElementById('level-complete-screen');
const levelSelectScreen = document.getElementById('level-select-screen');
const pauseScreen = document.getElementById('pause-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const selectLevelBtn = document.getElementById('select-level-btn');
const repeatLevelBtn = document.getElementById('repeat-level-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const levelSelectFromCompleteBtn = document.getElementById('level-select-from-complete-btn');
const backToStartBtn = document.getElementById('back-to-start-btn');
const resumeBtn = document.getElementById('resume-btn');
const pauseRestartBtn = document.getElementById('pause-restart-btn');
const pauseLevelSelectBtn = document.getElementById('pause-level-select-btn');
const finalScoreEl = document.getElementById('final-score');
const quizModal = document.getElementById('quiz-modal');
const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');

// Constants
const TILE_SIZE = 32;
const PACMAN_SPEED = 1;
let ghostSpeed = 1;

// Variables de nivel
let currentGameLevel = 1;
let unlockedLevels = 1; // Niveles desbloqueados (persistidos)
let ROWS = 15;
let COLS = 14;

// Mapas por nivel - 1 = Wall, 0 = Empty, 2 = Dot, 3 = Power Pellet (Quiz), 4 = Ghost Spawn
// Mapas por nivel - 1 = Wall, 0 = Empty, 2 = Dot, 3 = Power Pellet (Quiz), 4 = Ghost Spawn
// 5 = Coffee, 6 = Shield, 7 = Clock
const levelMaps = {
    1: {
        rows: 15,
        cols: 14,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 3, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1], // Removed Coffee (5)
            [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
            [1, 1, 1, 2, 1, 4, 4, 4, 4, 1, 2, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 3, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 3, 1],
            [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
            [1, 6, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 7, 1], // Added Shield (6) and Clock (7)
            [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        ghostCount: 3
    },
    2: {
        rows: 18,
        cols: 16,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
            [1, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3, 1],
            [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1], // Removed Coffees
            [1, 1, 1, 2, 1, 1, 1, 4, 4, 1, 1, 1, 2, 1, 1, 1],
            [1, 1, 1, 2, 1, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 3, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 3, 1],
            [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1],
            [1, 6, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 7, 1], // Shield and Clock
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        ghostCount: 4
    },
    3: {
        rows: 20,
        cols: 18,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 1],
            [1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1],
            [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
            [1, 2, 1, 4, 4, 4, 4, 2, 4, 4, 2, 4, 4, 4, 4, 1, 2, 1],
            [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
            [1, 3, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 3, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], // Removed Double Coffee
            [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 6, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 7, 1], // Shield and Clocks
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        ghostCount: 5
    }
};

let mapLayout = levelMaps[1].map;

// Game State
let score = 0;
let lives = 3;
let gameRunning = false;
let isPaused = false;
let pellets = [];
let powerPellets = [];
let items = []; // For power-ups
let walls = [];
let player = null;
let ghosts = [];
let animationId;
let ghostsFrozen = false;

// Classes
class Entity {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = TILE_SIZE / 2 - 2;
        this.dir = { x: 0, y: 0 };
        this.nextDir = { x: 0, y: 0 };
        this.speed = PACMAN_SPEED;
        this.originalSpeed = PACMAN_SPEED;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        // Player movement logic (Grid aligned)
        if (this.x % TILE_SIZE === TILE_SIZE / 2 && this.y % TILE_SIZE === TILE_SIZE / 2) {
            let nextCol = (this.x - TILE_SIZE / 2) / TILE_SIZE + this.nextDir.x;
            let nextRow = (this.y - TILE_SIZE / 2) / TILE_SIZE + this.nextDir.y;

            if (!this.isWall(nextRow, nextCol)) {
                this.dir = { ...this.nextDir };
            } else {
                let currCol = (this.x - TILE_SIZE / 2) / TILE_SIZE + this.dir.x;
                let currRow = (this.y - TILE_SIZE / 2) / TILE_SIZE + this.dir.y;
                if (this.isWall(currRow, currCol)) {
                    this.dir = { x: 0, y: 0 };
                }
            }
        }

        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
    }

    isWall(row, col) {
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return true;
        return mapLayout[row][col] === 1;
    }
}

class Player extends Entity {
    constructor(x, y) {
        super(x, y, '#ffff00');
        this.mouthOpen = 0.2;
        this.hasShield = false;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Dibuja el escudo si está activo
        if (this.hasShield) {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 4, 0, Math.PI * 2);
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }

        let angle = 0;
        if (this.dir.x === 1) angle = 0;
        else if (this.dir.x === -1) angle = Math.PI;
        else if (this.dir.y === 1) angle = Math.PI / 2;
        else if (this.dir.y === -1) angle = -Math.PI / 2;

        ctx.rotate(angle);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, this.mouthOpen * Math.PI, (2 - this.mouthOpen) * Math.PI);
        ctx.lineTo(0, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

class Ghost extends Entity {
    constructor(x, y, color) {
        super(x, y, color);
        this.startColor = color;
        this.isScared = false;
        this.dir = { x: 1, y: 0 };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI, 0);
        ctx.lineTo(this.x + this.radius, this.y + this.radius);
        ctx.lineTo(this.x - this.radius, this.y + this.radius);
        ctx.fillStyle = this.isScared ? '#0000ff' : this.color;
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x - 4, this.y - 2, 3, 0, Math.PI * 2);
        ctx.arc(this.x + 4, this.y - 2, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // FIX MAJOR BUG: Lógica de movimiento que tolera decimales
    update() {
        if (ghostsFrozen) return; // Do not move if frozen

        const currentSpeed = this.isScared ? ghostSpeed * 0.5 : ghostSpeed;

        const prevX = this.x;
        const prevY = this.y;

        // Mover
        this.x += this.dir.x * currentSpeed;
        this.y += this.dir.y * currentSpeed;

        // Detectar cruce de centro de casilla
        const centerOffset = TILE_SIZE / 2;
        const currentTileCol = Math.floor(prevX / TILE_SIZE);
        const currentTileRow = Math.floor(prevY / TILE_SIZE);

        const centerX = currentTileCol * TILE_SIZE + centerOffset;
        const centerY = currentTileRow * TILE_SIZE + centerOffset;

        // ¿Hemos cruzado el centro?
        let passed = false;
        if (this.dir.x > 0 && prevX < centerX && this.x >= centerX) passed = true;
        if (this.dir.x < 0 && prevX > centerX && this.x <= centerX) passed = true;
        if (this.dir.y > 0 && prevY < centerY && this.y >= centerY) passed = true;
        if (this.dir.y < 0 && prevY > centerY && this.y <= centerY) passed = true;

        if (passed) {
            // SNAP: Alinear exactamente al centro para evitar deriva y permitir giro
            this.x = centerX;
            this.y = centerY;
            this.chooseDirection();
        }
    }

    chooseDirection() {
        const directions = [
            { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }
        ];

        const validDirs = directions.filter(d => {
            // No reversa inmediata
            if (d.x === -this.dir.x && d.y === -this.dir.y) return false;

            // Calcular siguiente casilla basada en la actual (ya alineada)
            let currentGridX = Math.floor((this.x - TILE_SIZE / 2) / TILE_SIZE);
            let currentGridY = Math.floor((this.y - TILE_SIZE / 2) / TILE_SIZE);

            let nextCol = currentGridX + d.x;
            let nextRow = currentGridY + d.y;

            return !this.isWall(nextRow, nextCol);
        });

        if (validDirs.length > 0) {
            const pick = validDirs[Math.floor(Math.random() * validDirs.length)];
            this.dir = pick;
        } else {
            // Si es un callejón sin salida, dar la vuelta
            this.dir = { x: -this.dir.x, y: -this.dir.y };
        }
    }
}

// Game Logic
function loadProgress() {
    const saved = localStorage.getItem('togafArchitectProgress');
    if (saved) {
        unlockedLevels = parseInt(saved);
    }
}

function saveProgress() {
    localStorage.setItem('togafArchitectProgress', unlockedLevels.toString());
}

function initGame(startingLevel = 1, resetScore = true) {
    currentGameLevel = startingLevel;
    if (resetScore) {
        score = 0;
        lives = 3;
    }

    // Reset ghost speed to base value (always 1)
    ghostSpeed = 1;

    loadLevel(currentGameLevel);
}

function loadLevel(level) {
    if (animationId) cancelAnimationFrame(animationId);

    // Cargar datos del nivel
    const levelData = levelMaps[level];
    ROWS = levelData.rows;
    COLS = levelData.cols;
    mapLayout = levelData.map;

    // Ajustar canvas al tamaño del nivel
    canvas.width = COLS * TILE_SIZE;
    canvas.height = ROWS * TILE_SIZE;

    // Cargar preguntas del nivel
    questions = questionsByLevel[level];
    currentLevel = level;

    walls = [];
    pellets = [];
    powerPellets = [];
    items = [];
    ghosts = [];
    ghostsFrozen = false;

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const type = mapLayout[r][c];
            const x = c * TILE_SIZE + TILE_SIZE / 2;
            const y = r * TILE_SIZE + TILE_SIZE / 2;

            if (type === 1) {
                walls.push({ x: c * TILE_SIZE, y: r * TILE_SIZE, w: TILE_SIZE, h: TILE_SIZE });
            } else if (type === 2) {
                pellets.push({ x, y, active: true });
            } else if (type === 3) {
                powerPellets.push({ x, y, active: true });
            } else if (type === 6) {
                items.push({ x, y, type: 'shield', active: true, color: '#00ffff' }); // Shield
            } else if (type === 7) {
                items.push({ x, y, type: 'clock', active: true, color: '#ffffff' }); // Clock
            }
        }
    }

    player = new Player(1.5 * TILE_SIZE, 1.5 * TILE_SIZE);

    // Crear fantasmas según el nivel
    const ghostColors = ['#ff0000', '#ffb8ff', '#00ffff', '#ffb852', '#ff00ff'];
    const spawnPoints = findGhostSpawns();

    for (let i = 0; i < levelData.ghostCount; i++) {
        if (spawnPoints[i]) {
            ghosts.push(new Ghost(spawnPoints[i].x, spawnPoints[i].y, ghostColors[i]));
        }
    }

    levelEl.innerText = currentGameLevel;
    scoreEl.innerText = score;
    livesEl.innerText = lives;

    gameRunning = true;
    isPaused = false;
    animate();
}

function findGhostSpawns() {
    const spawns = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (mapLayout[r][c] === 4) {
                spawns.push({
                    x: c * TILE_SIZE + TILE_SIZE / 2,
                    y: r * TILE_SIZE + TILE_SIZE / 2
                });
            }
        }
    }
    return spawns;
}

function animate() {
    if (!gameRunning) return;
    if (isPaused) {
        // No requestAnimationFrame - el loop se detiene completamente
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0000ff';
    walls.forEach(w => {
        ctx.fillRect(w.x, w.y, w.w, w.h);
        ctx.fillStyle = '#000';
        ctx.fillRect(w.x + 4, w.y + 4, w.w - 8, w.h - 8);
        ctx.fillStyle = '#0000ff';
    });

    ctx.fillStyle = '#ffb8ae';
    pellets.forEach(p => {
        if (p.active) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    ctx.fillStyle = '#ffb8ae';
    powerPellets.forEach(p => {
        if (p.active) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw items
    items.forEach(p => {
        if (p.active) {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            if (p.type === 'shield') {
                ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.stroke();
            } else if (p.type === 'clock') {
                ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.fillRect(p.x - 1, p.y - 4, 2, 4); // Hand
                ctx.fillRect(p.x - 1, p.y - 1, 4, 2); // Hand
            }
            // Fallback fill for others or just fill
            if (p.type === 'shield') {
                // Already drawn
            }
        }
    });

    player.update();
    player.draw();

    ghosts.forEach(g => {
        g.update();
        g.draw();
    });

    checkCollisions();

    animationId = requestAnimationFrame(animate);
}

function checkCollisions() {
    pellets.forEach(p => {
        if (p.active) {
            const dist = Math.hypot(player.x - p.x, player.y - p.y);
            if (dist < player.radius) {
                p.active = false;
                score += 10;
                scoreEl.innerText = score;
            }
        }
    });

    powerPellets.forEach(p => {
        if (p.active) {
            const dist = Math.hypot(player.x - p.x, player.y - p.y);
            if (dist < player.radius) {
                p.active = false;
                triggerQuiz();
            }
        }
    });

    items.forEach(p => {
        if (p.active) {
            const dist = Math.hypot(player.x - p.x, player.y - p.y);
            if (dist < player.radius) {
                p.active = false;
                score += 50; // Bonus points
                scoreEl.innerText = score;

                if (p.type === 'shield') {
                    player.hasShield = true;
                } else if (p.type === 'clock') {
                    ghostsFrozen = true;
                    setTimeout(() => { ghostsFrozen = false; }, 5000); // 5s freeze
                }
            }
        }
    });

    let playerDied = false;
    ghosts.forEach(g => {
        if (playerDied) return;
        const dist = Math.hypot(player.x - g.x, player.y - g.y);
        if (dist < player.radius + g.radius) {
            if (g.isScared) {
                g.x = 6.5 * TILE_SIZE;
                g.y = 6.5 * TILE_SIZE;
                g.isScared = false;
                score += 200;
                scoreEl.innerText = score;
            } else {
                if (player.hasShield) {
                    player.hasShield = false;
                    // Reset ghost position nicely
                    g.x = 6.5 * TILE_SIZE;
                    g.y = 6.5 * TILE_SIZE;
                } else {
                    playerDied = true;
                }
            }
        }
    });

    if (playerDied) {
        handleDeath();
    }

    // Verificar si completó el nivel
    if (pellets.every(p => !p.active) && powerPellets.every(p => !p.active)) {
        gameRunning = false;

        // Desbloquear siguiente nivel si no está desbloqueado
        if (currentGameLevel < 3 && unlockedLevels < currentGameLevel + 1) {
            unlockedLevels = currentGameLevel + 1;
            saveProgress();
        }

        // Bonus por completar nivel
        score += 500;
        scoreEl.innerText = score;

        if (currentGameLevel >= 3) {
            // Ganó el juego completo
            showGameOver(true);
        } else {
            // Mostrar pantalla de nivel completado con opciones
            levelCompleteScreen.classList.remove('hidden');
            nextLevelBtn.style.display = 'block';
        }
    }
}

function handleDeath() {
    lives--;
    livesEl.innerText = lives;

    if (lives <= 0) {
        gameRunning = false;
        showGameOver(false);
    } else {
        player.x = 1.5 * TILE_SIZE;
        player.y = 1.5 * TILE_SIZE;
        player.dir = { x: 0, y: 0 };
        player.nextDir = { x: 0, y: 0 };

        // Reposicionar fantasmas en sus spawns
        const spawnPoints = findGhostSpawns();
        ghosts.forEach((ghost, idx) => {
            if (spawnPoints[idx]) {
                ghost.x = spawnPoints[idx].x;
                ghost.y = spawnPoints[idx].y;
                ghost.isScared = false;
            }
        });

        ghostSpeed += 0.05; // Aumentar un poco al morir (Reduced from 0.1)
    }
}

function triggerQuiz() {
    isPaused = true;
    const qIndex = Math.floor(Math.random() * questions.length);
    const qData = questions[qIndex];

    quizQuestionEl.innerText = qData.question;
    quizOptionsEl.innerHTML = '';

    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(idx, qData.answer);
        quizOptionsEl.appendChild(btn);
    });

    quizModal.classList.remove('hidden');
}

function handleAnswer(selected, correct) {
    const btns = document.querySelectorAll('.quiz-btn');
    if (selected === correct) {
        btns[selected].classList.add('correct');
        setTimeout(() => {
            closeQuiz(true);
        }, 1000);
    } else {
        btns[selected].classList.add('wrong');
        btns[correct].classList.add('correct');
        setTimeout(() => {
            closeQuiz(false);
        }, 1500);
    }
}

function closeQuiz(isCorrect) {
    quizModal.classList.add('hidden');
    isPaused = false;

    if (isCorrect) {
        ghosts.forEach(g => g.isScared = true);
        setTimeout(() => {
            ghosts.forEach(g => g.isScared = false);
        }, 8000);
    } else {
        ghostSpeed += 0.05; // Aumentar velocidad si falla (Reduced from 0.2)
        ghosts.forEach(g => g.isScared = false);
    }

    // Reiniciar el loop de animación
    animate();
}

function showGameOver(win) {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    gameOverScreen.classList.remove('hidden');

    if (win) {
        document.getElementById('game-over-title').innerText = "¡COMPLETASTE TODOS LOS NIVELES!";
    } else {
        document.getElementById('game-over-title').innerText = "GAME OVER - NIVEL " + currentGameLevel;
    }

    finalScoreEl.innerText = score;
}

window.addEventListener('keydown', (e) => {
    // ESC para pausar/reanudar
    if (e.key === 'Escape' && gameRunning) {
        togglePause();
        return;
    }

    if (!gameRunning || isPaused) return;
    switch (e.key) {
        case 'ArrowUp': player.nextDir = { x: 0, y: -1 }; break;
        case 'ArrowDown': player.nextDir = { x: 0, y: 1 }; break;
        case 'ArrowLeft': player.nextDir = { x: -1, y: 0 }; break;
        case 'ArrowRight': player.nextDir = { x: 1, y: 0 }; break;
    }
});

// Función para pausar/reanudar el juego
function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        pauseScreen.classList.remove('hidden');
    } else {
        pauseScreen.classList.add('hidden');
        // Reiniciar el loop de animación
        animate();
    }
}

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    loadProgress();
    initGame(1, true);
});

restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    // Reintentar en el nivel actual, no desde el nivel 1
    initGame(currentGameLevel, true);
});

// Botón para ir a selección de nivel desde game over
selectLevelBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    showLevelSelect();
});

// Botón para repetir nivel completado
repeatLevelBtn.addEventListener('click', () => {
    levelCompleteScreen.classList.add('hidden');
    // Repetir nivel actual, mantener score
    initGame(currentGameLevel, false);
});

// Botón para siguiente nivel
nextLevelBtn.addEventListener('click', () => {
    levelCompleteScreen.classList.add('hidden');
    currentGameLevel++;
    initGame(currentGameLevel, false);
});

// Botón para ir a selección desde nivel completado
levelSelectFromCompleteBtn.addEventListener('click', () => {
    levelCompleteScreen.classList.add('hidden');
    showLevelSelect();
});

// Botón volver desde selección de nivel
backToStartBtn.addEventListener('click', () => {
    levelSelectScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});

// Listeners para botones de nivel
document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const level = parseInt(btn.dataset.level);
        if (level <= unlockedLevels) {
            levelSelectScreen.classList.add('hidden');
            initGame(level, true);
        }
    });
});

// Función para mostrar selector de niveles
function showLevelSelect() {
    updateLevelButtons();
    levelSelectScreen.classList.remove('hidden');
}

// Función para actualizar estado visual de botones de nivel
function updateLevelButtons() {
    document.querySelectorAll('.level-btn').forEach(btn => {
        const level = parseInt(btn.dataset.level);
        const lockIcon = btn.querySelector('.level-lock');

        if (level <= unlockedLevels) {
            btn.classList.remove('locked');
            lockIcon.classList.add('hidden');
        } else {
            btn.classList.add('locked');
            lockIcon.classList.remove('hidden');
        }
    });
}

// Event listeners para menú de pausa
resumeBtn.addEventListener('click', () => {
    togglePause();
});

pauseRestartBtn.addEventListener('click', () => {
    pauseScreen.classList.add('hidden');
    isPaused = false;
    initGame(currentGameLevel, true);
});

pauseLevelSelectBtn.addEventListener('click', () => {
    pauseScreen.classList.add('hidden');
    isPaused = false;
    gameRunning = false;
    showLevelSelect();
});

// Cargar progreso al iniciar
// Cargar progreso al iniciar
loadProgress();

// Mobile Controls Logic
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

function handleDirectionInput(dx, dy) {
    if (!gameRunning || isPaused) return;
    player.nextDir = { x: dx, y: dy };
}

// Helper to add both touch and click listeners
function addControlListener(btn, dx, dy) {
    const handler = (e) => {
        e.preventDefault(); // Prevent default touch behavior (scrolling, zooming)
        handleDirectionInput(dx, dy);
    };
    btn.addEventListener('touchstart', handler, { passive: false });
    btn.addEventListener('mousedown', handler);
}

addControlListener(btnUp, 0, -1);
addControlListener(btnDown, 0, 1);
addControlListener(btnLeft, -1, 0);
addControlListener(btnRight, 1, 0);
