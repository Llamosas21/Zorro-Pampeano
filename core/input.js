// core/input.js: Maneja la entrada del usuario (teclado/táctil).

export class InputHandler {
    constructor(player) {
        // Salto con la barra espaciadora
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                player.jump();
            }
        });

        // Salto con toque en la pantalla
        window.addEventListener('touchstart', () => {
            player.jump();
        });
    }
}