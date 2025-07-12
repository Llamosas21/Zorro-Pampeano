// entities/background.js: Dibuja el fondo y el suelo.

import { CONFIG } from '../utils/config.js';

export class Background {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.groundY = canvasHeight - CONFIG.GROUND_HEIGHT;
    }

    draw(ctx) {
        // Dibuja el suelo
        ctx.fillStyle = '#334b04ff'; // Verde Oliva
        ctx.fillRect(0, this.groundY, this.canvasWidth, CONFIG.GROUND_HEIGHT);
    }
}