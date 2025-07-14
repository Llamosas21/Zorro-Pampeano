// Lógica del jugador (salto, gravedad, dibujo)
import { ZORRO_W_FACTOR, ZORRO_H_FACTOR } from '../utils/config.js';

export function crearZorro(canvas) {
    var W = canvas.width, H = canvas.height;
    var sueloH = H * 0.22;
    return {
        x: W * 0.18,
        y: H - sueloH - (H * ZORRO_H_FACTOR),
        w: W * ZORRO_W_FACTOR,
        h: H * ZORRO_H_FACTOR,
        vy: 0,
        saltando: false,
        agachado: false,
        izq: false,
        der: false,
        gameOver: false,
        vidas: 3,
        puntos: 0
    };
}

export function actualizarZorro(zorro, canvas) {
    var sueloH = canvas.height * 0.22;
    var limiteSuelo = canvas.height - sueloH - zorro.h;
    zorro.vy += canvas.height * 0.004;
    zorro.y += zorro.vy;
    if (zorro.y >= limiteSuelo) {
        zorro.y = limiteSuelo;
        zorro.vy = 0;
        zorro.saltando = false;
    } else {
        zorro.saltando = true;
    }
    if (zorro.y + zorro.h > canvas.height) zorro.gameOver = true;
}

// Animación y dibujo del zorro
let zorroFrame = 0;
let zorroAnimTimer = 0;
let zorroAnimSpeed = 5;
let imgZorro1 = new Image();
let imgZorro2 = new Image();
imgZorro1.src = './assets/zorro1.png';
imgZorro2.src = './assets/zorro2.png';

export function animarZorro(zorro) {
    if (!zorro.saltando) {
        zorroAnimTimer++;
        if (zorroAnimTimer > zorroAnimSpeed) {
            zorroFrame = 1 - zorroFrame;
            zorroAnimTimer = 0;
        }
    } else {
        zorroFrame = 0;
        zorroAnimTimer = 0;
    }
}

export function dibujarZorro(ctx, zorro) {
    let scaleY = zorro.saltando ? 1.1 : (zorro.agachado ? 0.7 : 1);
    let scaleX = zorro.agachado ? 1.1 : 1;
    var img;
    if (zorro.saltando) {
        img = imgZorro1;
    } else {
        img = zorroFrame === 0 ? imgZorro1 : imgZorro2;
    }
    if (img.complete && img.naturalWidth > 0) {
        let h = zorro.h * scaleY * (zorro.agachado ? 0.7 : 1);
        let w = zorro.w * scaleX;
        let y = Math.max(zorro.y + (zorro.h - h), 0);
        let x = zorro.x + (zorro.w - w) / 2;
        ctx.drawImage(img, x, y, w, h);
    } else {
        ctx.fillStyle = '#e07a1b';
        let h = zorro.h * scaleY * (zorro.agachado ? 0.7 : 1);
        let w = zorro.w * scaleX;
        let y = Math.max(zorro.y + (zorro.h - h), 0);
        let x = zorro.x + (zorro.w - w) / 2;
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = "#fff";
        ctx.fillRect(x + w * 0.7, y + h * 0.7, w * 0.18, h * 0.18); // cola blanca
    }
}
