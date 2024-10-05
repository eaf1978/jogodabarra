// Setup inicial
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variáveis do jogador (barra azul)
let playerX = canvas.width / 2 - 40;
let playerY = canvas.height - 30;
let playerWidth = 80;
let playerHeight = 10;
let moveLeft = false;
let moveRight = false;

// Variáveis dos blocos que caem (vermelhos)
let blocks = [];
let blockWidth = 20;
let blockHeight = 20;
let blockSpeed = 2;
let gameOver = false;

// Função para criar novos blocos
function createBlock() {
    let x = Math.random() * (canvas.width - blockWidth);
    blocks.push({ x: x, y: 0 });
}

// Função para desenhar o jogador (barra azul)
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Função para desenhar os blocos que caem (vermelhos)
function drawBlocks() {
    ctx.fillStyle = "red";
    blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
    });
}

// Função para mover os blocos que caem
function moveBlocks() {
    blocks.forEach(block => {
        block.y += blockSpeed;

        // Verifica se o bloco toca a barra azul (bloqueio)
        if (block.y + blockHeight >= playerY && 
            block.x < playerX + playerWidth && 
            block.x + blockWidth > playerX) {
            // Remove o bloco se ele colidir com a barra azul
            blocks.splice(blocks.indexOf(block), 1);
        }

        // Verifica se o bloco passou da barra azul (jogador perdeu)
        if (block.y > canvas.height) {
            gameOver = true;
        }
    });
}

// Limpar a tela
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Função principal do jogo
function gameLoop() {
    if (!gameOver) {
        clearCanvas();
        drawPlayer();
        drawBlocks();
        moveBlocks();

        if (moveLeft && playerX > 0) {
            playerX -= 5;
        }
        if (moveRight && playerX < canvas.width - playerWidth) {
            playerX += 5;
        }

        requestAnimationFrame(gameLoop);
    } else {
        // Exibe mensagem de fim de jogo
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Fim de jogo!", canvas.width / 2 - 80, canvas.height / 2);
        
        // Reiniciar o jogo após 3 segundos
        setTimeout(resetGame, 3000);
    }
}

// Função para resetar o jogo
function resetGame() {
    playerX = canvas.width / 2 - 40;
    blocks = [];
    gameOver = false;
    gameLoop();
}

// Controles do jogador
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeft = true;
    } else if (event.key === 'ArrowRight') {
        moveRight = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeft = false;
    } else if (event.key === 'ArrowRight') {
        moveRight = false;
    }
});

// Criar blocos caindo a cada segundo
setInterval(createBlock, 1000);

// Iniciar o jogo
gameLoop();
