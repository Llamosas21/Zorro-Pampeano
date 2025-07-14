// entities/obstacle.js: Define los obstáculos.

import { CONFIG } from '../utils/config.js';

export class Obstacle {
    constructor(canvasWidth, canvasHeight, startOffset = 0) {
        this.canvasWidth = canvasWidth;
        this.groundY = canvasHeight - CONFIG.GROUND_HEIGHT;
        this.spawnX = canvasWidth + startOffset;
        
        this.width = CONFIG.OBSTACLE_WIDTH;
        this.height = CONFIG.OBSTACLE_HEIGHT;

        this.x = this.spawnX;
        this.y = this.groundY - this.height;
    }

    update(deltaTime) {
        this.x -= CONFIG.GAME_SPEED * deltaTime;
    }

    draw(ctx) {
        ctx.fillStyle = '#708090'; // Color Gris Pizarra
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isOffscreen() {
        return this.x + this.width < 0;
    }

    reset() {
        this.x = this.canvasWidth + Math.random() * 200; // Posición aleatoria
    }

    getHitbox() {
        return { x: this.x, y: this.y, w: this.width, h: this.height };
    }
}