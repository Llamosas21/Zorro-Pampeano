// game.js: El punto de entrada que une todo.

import { CONFIG } from './utils/config.js';
import { Engine } from './core/engine.js';
import { InputHandler } from './core/input.js';
import { Player } from './entities/player.js';
import { Obstacle } from './entities/obstacle.js';
import { Background } from './entities/background.js';
import { checkCollision } from './utils/collision.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const gameOverScreen = document.getElementById('game-over-screen');
    const restartButton = document.getElementById('restart-button');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let player, obstacles, background, input, engine;

    function init() {
        // Ocultar pantalla de Game Over
        gameOverScreen.style.display = 'none';

        // Crear instancias de las entidades
        background = new Background(canvas.width, canvas.height);
        player = new Player(canvas.width, canvas.height);
        
        obstacles = [
            new Obstacle(canvas.width, canvas.height, 0),
            new Obstacle(canvas.width, canvas.height, canvas.width / 2)
        ];
        
        // Configurar manejador de entrada
        input = new InputHandler(player);

        // Definir la lógica de actualización y dibujado
        const update = (deltaTime) => {
            player.update(deltaTime);
            obstacles.forEach(obstacle => {
                obstacle.update(deltaTime);
                if (obstacle.isOffscreen()) {
                    obstacle.reset();
                }
                // Comprobar colisión
                if (checkCollision(player.getHitbox(), obstacle.getHitbox())) {
                    engine.stop();
                    gameOverScreen.style.display = 'flex';
                }
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background.draw(ctx);
            player.draw(ctx);
            obstacles.forEach(obstacle => obstacle.draw(ctx));
        };

        // Iniciar el motor del juego
        engine = new Engine(update, draw);
        engine.start();
    }

    // Evento para reiniciar
    restartButton.addEventListener('click', init);

    // Iniciar el juego por primera vez
    init();
});