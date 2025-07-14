// Bucle principal del juego (update + draw)
export function startGameLoop(update, draw, isGameOver) {
    function loop() {
        update();
        draw();
        if (!isGameOver()) requestAnimationFrame(loop);
    }
    loop();
}
