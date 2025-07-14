// utils/config.js: Variables de configuración globales del juego.

export const CONFIG = {
    // Velocidades físicas realistas (en píxeles por segundo)
    GAME_SPEED: 600,               // Velocidad del scroll (px/s)
    GRAVITY: 150,                 // Gravedad base (px/s²)
    PLAYER_JUMP_FORCE: 55,        // Fuerza de salto (velocidad hacia arriba en px/s)

    // Multiplicadores de gravedad
    JUMP_GRAVITY_MULTIPLIER: 3.5,  // Subida: menos gravedad
    FALL_GRAVITY_MULTIPLIER: 0.5,  // Bajada: más gravedad

    // Tamaños
    GROUND_HEIGHT: 50,             // Altura del suelo (px)
    PLAYER_SIZE: 40,               // Tamaño del jugador (cuadrado)
    OBSTACLE_WIDTH: 30,            // Obstáculo (ancho)
    OBSTACLE_HEIGHT: 60,           // Obstáculo (alto)
};
