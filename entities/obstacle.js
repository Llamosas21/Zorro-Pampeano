// Obstáculos con movimiento lateral y reset
export function crearObstaculo(canvas) {
    var W = canvas.width, H = canvas.height;
    var sueloH = H * 0.22;
    var alturas = [H - sueloH - H * 0.13, H - sueloH - H * 0.26, H - sueloH - H * 0.39];
    return {
        x: W + Math.random() * W * 0.8,
        y: alturas[Math.floor(Math.random() * alturas.length)],
        w: W * 0.06,
        h: H * 0.13
    };
}

export function moverObstaculo(obstaculo, scrollX, velocidadScroll, canvas) {
    obstaculo.x -= velocidadScroll;
    if (obstaculo.x - scrollX + obstaculo.w < 0) {
        Object.assign(obstaculo, crearObstaculo(canvas));
        obstaculo.x = scrollX + canvas.width + Math.random() * canvas.width * 0.5;
    }
}

export function dibujarObstaculo(ctx, obstaculo, scrollX) {
    ctx.fillStyle = '#7c4a1b';
    ctx.fillRect(obstaculo.x - scrollX, obstaculo.y, obstaculo.w, obstaculo.h);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(obstaculo.x - scrollX, obstaculo.y, obstaculo.w, obstaculo.h);
}
