// Entrada de usuario (teclado y toque)
export function setupInput(player, canvas, onRestart) {
    let touchStartY = null;
    let agachando = false;

    canvas.addEventListener('touchstart', function(e) {
        if (player.gameOver) {
            onRestart();
            return;
        }
        if (e.touches.length === 1) {
            touchStartY = e.touches[0].clientY;
            agachando = false;
        }
    });

    canvas.addEventListener('touchmove', function(e) {
        if (touchStartY !== null && e.touches.length === 1) {
            var deltaY = e.touches[0].clientY - touchStartY;
            if (deltaY < -40 && !player.saltando && !player.gameOver) {
                player.vy = -canvas.height * 0.045;
                player.saltando = true;
                player.agachado = false;
                agachando = false;
            }
        }
    });

    canvas.addEventListener('touchend', function(e) {
        touchStartY = null;
        agachando = false;
    });

    canvas.addEventListener('mousedown', function(e) {
        if (player.gameOver) {
            onRestart();
            return;
        }
        // Puedes agregar salto con click si quieres
    });

    document.addEventListener('keydown', function(e) {
        if ((e.code === 'Space' || e.code === 'ArrowUp') && !player.saltando && !player.gameOver) {
            player.vy = -canvas.height * 0.045;
            player.saltando = true;
        }
        if ((e.code === 'ArrowDown' || e.code === 'KeyS') && !player.gameOver) {
            player.agachado = true;
        }
        if ((e.code === 'ArrowLeft' || e.code === 'KeyA') && !player.gameOver) {
            player.izq = true;
        }
        if ((e.code === 'ArrowRight' || e.code === 'KeyD') && !player.gameOver) {
            player.der = true;
        }
    });
    document.addEventListener('keyup', function(e) {
        if (e.code === 'ArrowDown' || e.code === 'KeyS') {
            player.agachado = false;
        }
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
            player.izq = false;
        }
        if (e.code === 'ArrowRight' || e.code === 'KeyD') {
            player.der = false;
        }
    });
}
