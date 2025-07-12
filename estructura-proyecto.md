

zorro-pampeano/
├── index.html          # Página principal con canvas y pantalla de Game Over
├── style.css           # Estilos generales y para el estado Game Over
├── game.js             # Punto de entrada: inicia motor, entidades, colisiones
├── /core
│   ├── engine.js       # Bucle principal del juego (update + draw)
│   └── input.js        # Entrada de usuario (teclado y toque)
├── /entities
│   ├── player.js       # Lógica del jugador (salto, gravedad, dibujo)
│   ├── obstacle.js     # Obstáculos con movimiento lateral y reset
│   └── background.js   # Fondo y suelo del escenario
├── /utils
│   ├── config.js       # Constantes del juego
│   └── collision.js    # Detección de colisiones
