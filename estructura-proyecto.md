# 📦 Estructura del Proyecto - Zorro Pampeano

```batch 
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

```

| Ruta / Archivo           | Descripción                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `index.html`             | Página principal con canvas del juego y pantalla de Game Over.               |
| `style.css`              | Estilos generales del juego (canvas, HUD, pantalla de Game Over, etc).       |
| `game.js`                | Punto de entrada que inicia el juego, carga entidades y gestiona colisiones. |
| `core/engine.js`         | Bucle principal del juego (`update` y `draw`).                               |
| `core/input.js`          | Maneja la entrada del usuario (teclado y táctil).                            |
| `entities/player.js`     | Comportamiento del jugador: salto, gravedad, dibujado.                       |
| `entities/obstacle.js`   | Obstáculos móviles: lógica de aparición, movimiento y reinicio.              |
| `entities/background.js` | Renderizado del fondo y suelo (parallax opcional).                           |
| `utils/config.js`        | Parámetros del juego (velocidades, tamaños, gravedad, etc).                  |
| `utils/collision.js`     | Lógica para detectar colisiones entre jugador y obstáculos.                  |
| `README.md`              | Documentación principal del proyecto.                                        |
| `estructura-proyecto.md` | Explicación de la estructura del código y convenciones.                      |

--- 

## Buenas prácticas

- Separar lógica (core), datos (config), y entidades del juego.

- Mantener el código modular y reutilizable.

- Documentar cualquier cambio relevante en estructura-proyecto.md.

