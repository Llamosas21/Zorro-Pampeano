// Fondo y suelo del escenario
export function dibujarFondo(ctx, canvas) {
    ctx.fillStyle = "#8ecae6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4a7c3a";
    ctx.fillRect(0, canvas.height - canvas.height * 0.22, canvas.width, canvas.height * 0.04);
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 3; i++) {
        let nx = (canvas.width / 3) * i + 30;
        let ny = 30 + (i % 2) * 18;
        ctx.fillRect(nx, ny, 38, 14);
        ctx.fillRect(nx + 10, ny - 8, 18, 18);
        ctx.fillRect(nx - 12, ny + 6, 16, 10);
    }
}

export function dibujarSuelo(ctx, canvas) {
    var sueloH = canvas.height * 0.22;
    ctx.fillStyle = '#444';
    ctx.fillRect(0, canvas.height - sueloH, canvas.width, sueloH);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, canvas.height - sueloH, canvas.width, 3);
}

export function sueloY(canvas) {
    return canvas.height - canvas.height * 0.22;
}
