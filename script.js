const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('current-level');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const levelCompleteScreen = document.getElementById('level-complete-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
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
let ROWS = 15;
let COLS = 14;

// Mapas por nivel - 1 = Wall, 0 = Empty, 2 = Dot, 3 = Power Pellet (Quiz), 4 = Ghost Spawn
const levelMaps = {
    1: {
        rows: 15,
        cols: 14,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 3, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
            [1, 1, 1, 2, 1, 4, 4, 4, 4, 1, 2, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 3, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 3, 1],
            [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
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
            [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 2, 1, 1, 1, 4, 4, 1, 1, 1, 2, 1, 1, 1],
            [1, 1, 1, 2, 1, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 3, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 3, 1],
            [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1],
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
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
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
let walls = [];
let player = null;
let ghosts = [];
let animationId;

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
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
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
function initGame(resetLevel = true) {
    if (resetLevel) {
        currentGameLevel = 1;
        score = 0;
        lives = 3;
    }
    
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
    ghosts = [];

    ghostSpeed = 1 + (level - 1) * 0.3; // Incrementar velocidad por nivel

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
        animationId = requestAnimationFrame(animate);
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

    let playerDied = false;
    ghosts.forEach(g => {
        if(playerDied) return;
        const dist = Math.hypot(player.x - g.x, player.y - g.y);
        if (dist < player.radius + g.radius) {
            if (g.isScared) {
                g.x = 6.5 * TILE_SIZE; 
                g.y = 6.5 * TILE_SIZE;
                g.isScared = false;
                score += 200;
                scoreEl.innerText = score;
            } else {
                playerDied = true;
            }
        }
    });

    if (playerDied) {
        handleDeath();
    }

    // Verificar si completó el nivel
    if (pellets.every(p => !p.active) && powerPellets.every(p => !p.active)) {
        gameRunning = false;
        
        if (currentGameLevel < 3) {
            // Mostrar pantalla de nivel completado
            levelCompleteScreen.classList.remove('hidden');
            
            // Pasar al siguiente nivel
            currentGameLevel++;
            score += 500; // Bonus por completar nivel
            scoreEl.innerText = score;
            
            setTimeout(() => {
                levelCompleteScreen.classList.add('hidden');
                loadLevel(currentGameLevel);
            }, 3000);
        } else {
            // Ganó el juego completo
            showGameOver(true);
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
        
        ghostSpeed += 0.1; // Aumentar un poco al morir
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
        ghostSpeed += 0.2; // Aumentar velocidad si falla
        ghosts.forEach(g => g.isScared = false);
    }
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
    if (!gameRunning) return;
    switch (e.key) {
        case 'ArrowUp': player.nextDir = { x: 0, y: -1 }; break;
        case 'ArrowDown': player.nextDir = { x: 0, y: 1 }; break;
        case 'ArrowLeft': player.nextDir = { x: -1, y: 0 }; break;
        case 'ArrowRight': player.nextDir = { x: 1, y: 0 }; break;
    }
});

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    initGame(true); // Reiniciar desde el nivel 1
});

restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    initGame(true); // Reiniciar desde el nivel 1
});