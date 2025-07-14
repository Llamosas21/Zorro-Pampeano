// HUD y pantalla de Game Over
export function dibujarHUD(ctx, canvas, puntos, vidas) {
    ctx.fillStyle = "#222";
    let hudW = Math.max(180, canvas.width * 0.22);
    let hudH = Math.max(60, canvas.height * 0.09);
    ctx.fillRect(10, 10, hudW, hudH);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, hudW, hudH);
    ctx.fillStyle = "#fff";
    ctx.font = Math.max(canvas.height * 0.035, 18) + "px monospace";
    ctx.fillText("Puntos: " + puntos, 22, 10 + hudH * 0.5);
    ctx.fillText("Vidas: " + vidas, 22, 10 + hudH * 0.85);
}

export function dibujarGameOver(ctx, canvas) {
    let boxW = canvas.width * 0.6;
    let boxH = canvas.height * 0.18;
    let boxX = canvas.width * 0.2;
    let boxY = canvas.height * 0.38;
    ctx.fillStyle = '#fff';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = "#e07a1b";
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxW, boxH);
    ctx.fillStyle = '#e33';
    ctx.font = Math.max(canvas.height * 0.07, 32) + 'px monospace';
    ctx.textAlign = "center";
    ctx.fillText('GAME OVER', canvas.width * 0.5, boxY + boxH * 0.55);
    // Botón
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#e07a1b";
    ctx.lineWidth = 3;
    let btnW = boxW * 0.7, btnH = boxH * 0.28;
    let btnX = canvas.width * 0.5 - btnW / 2, btnY = boxY + boxH * 0.68;
    ctx.fillRect(btnX, btnY, btnW, btnH);
    ctx.strokeRect(btnX, btnY, btnW, btnH);
    ctx.fillStyle = "#e07a1b";
    ctx.font = Math.max(canvas.height * 0.035, 18) + 'px monospace';
    ctx.fillText('Toca para reiniciar', canvas.width * 0.5, btnY + btnH * 0.7);
    ctx.textAlign = "start";
}
