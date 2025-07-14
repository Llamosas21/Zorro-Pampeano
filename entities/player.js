// entities/player.js: Define al jugador (el cuadrado).

import { CONFIG } from '../utils/config.js';

export class Player {
    constructor(canvasWidth, canvasHeight) {
        this.canvasHeight = canvasHeight;
        this.groundY = canvasHeight - CONFIG.GROUND_HEIGHT;

        this.width = CONFIG.PLAYER_SIZE;
        this.height = CONFIG.PLAYER_SIZE;

        this.x = 50;
        this.y = this.groundY - this.height;
        this.velocityY = 0;
        this.isJumping = false;
    }

    update(deltaTime) {
        // Seleccionar la gravedad según si está subiendo o bajando
        const gravity = this.velocityY < 0
            ? CONFIG.GRAVITY * CONFIG.JUMP_GRAVITY_MULTIPLIER
            : CONFIG.GRAVITY * CONFIG.FALL_GRAVITY_MULTIPLIER;

        this.velocityY += gravity * deltaTime;
        this.y += this.velocityY;

        // Si toca el suelo, lo reposicionamos
        if (this.y > this.groundY - this.height) {
            this.y = this.groundY - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff6347'; // Color Tomate
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = -CONFIG.PLAYER_JUMP_FORCE;
        }
    }

    getHitbox() {
        return { x: this.x, y: this.y, w: this.width, h: this.height };
    }
}
