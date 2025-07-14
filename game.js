// --- Configuración de tamaño del zorro ---
var ZORRO_W_FACTOR = 0.07;
var ZORRO_H_FACTOR = 0.14;

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// --- Variables de scroll horizontal
var scrollX = 0;
var velocidadScroll = canvas.width * 0.008;

// --- Ajuste de tamaño dinámico ---
function ajustarCanvas() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    velocidadScroll = canvas.width * 0.008;
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

// --- Variables dependientes del canvas ---
function crearZorro() {
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
        der: false
    };
}

function crearObstaculo() {
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

// Objetos/frutos
var objetos = [];
var puntos = 0;

function crearObjeto() {
    var W = canvas.width, H = canvas.height;
    var sueloH = H * 0.22;
    var alturas = [H - sueloH - H * 0.13, H - sueloH - H * 0.26, H - sueloH - H * 0.39];
    return {
        x: W + Math.random() * W * 1.2,
        y: alturas[Math.floor(Math.random() * alturas.length)] + H * 0.03,
        r: Math.max(18, W * 0.025),
        tomado: false
    };
}

function inicializarObjetos() {
    objetos = [];
    for (var i = 0; i < 5; i++) {
        objetos.push(crearObjeto());
    }
}
inicializarObjetos();

var sueloY = function() { return canvas.height - canvas.height * 0.22; };

// --- Imagen del zorro (animación simple) ---
var imgZorro1 = new Image();
var imgZorro2 = new Image();
imgZorro1.src = './assets/zorro1.png';
imgZorro2.src = './assets/zorro2.png';
// El juego inicia siempre, no espera a que carguen las imágenes

var zorroFrame = 0;
var zorroAnimTimer = 0;
var zorroAnimSpeed = 5; // menor = más rápido

// --- Variables de juego ---
var vidas = 3;
var gameOver = false;

// --- Inicialización de zorro y obstáculo ---
var zorro = crearZorro();
var obstaculo = crearObstaculo();
var perdiste = false;

// --- Suelo pixel-art ---
function dibujarSuelo() {
    var sueloH = canvas.height * 0.22;
    ctx.fillStyle = '#444';
    ctx.fillRect(0, canvas.height - sueloH, canvas.width, sueloH);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, canvas.height - sueloH, canvas.width, 3);
}

// --- Fondo pixel-art ---
function dibujarFondo() {
    ctx.fillStyle = "#8ecae6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Césped pixel-art
    ctx.fillStyle = "#4a7c3a";
    ctx.fillRect(0, canvas.height - canvas.height * 0.22, canvas.width, canvas.height * 0.04);

    // Nubes pixel-art
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 3; i++) {
        let nx = (canvas.width / 3) * i + 30;
        let ny = 30 + (i % 2) * 18;
        ctx.fillRect(nx, ny, 38, 14);
        ctx.fillRect(nx + 10, ny - 8, 18, 18);
        ctx.fillRect(nx - 12, ny + 6, 16, 10);
    }
}

// --- Zorro pixel-art ---
function dibujarZorro() {
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

// --- Obstáculo pixel-art ---
function dibujarObstaculo() {
    ctx.fillStyle = '#7c4a1b';
    ctx.fillRect(obstaculo.x - scrollX, obstaculo.y, obstaculo.w, obstaculo.h);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(obstaculo.x - scrollX, obstaculo.y, obstaculo.w, obstaculo.h);
}

// --- Fruto pixel-art ---
function dibujarObjeto(obj) {
    if (obj.tomado) return;
    let bounce = Math.round(Math.sin(Date.now() / 180 + obj.x / 50) * 2);
    ctx.fillStyle = "#e33";
    ctx.fillRect(Math.round(obj.x - scrollX - obj.r), Math.round(obj.y + bounce - obj.r), obj.r * 2, obj.r * 2);
    ctx.fillStyle = "#fff";
    ctx.fillRect(Math.round(obj.x - scrollX - obj.r * 0.3), Math.round(obj.y + bounce - obj.r * 0.7), obj.r * 0.6, obj.r * 0.3);
    ctx.fillStyle = "#3a3";
    ctx.fillRect(Math.round(obj.x - scrollX + obj.r * 0.2), Math.round(obj.y + bounce - obj.r * 1.1), 2, 6);
}

// --- Dibujo de todos los objetos/frutos ---
function dibujarObjetos() {
    for (var i = 0; i < objetos.length; i++) {
        dibujarObjeto(objetos[i]);
    }
}

// --- HUD pixel-art ---
function dibujarHUD() {
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

// --- Game Over pixel-art ---
function dibujarGameOver() {
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

// --- Variables de juego ---
var vidas = 3;
var gameOver = false;

// --- Reinicio del juego ---
function reiniciarJuego() {
    scrollX = 0;
    puntos = 0;
    vidas = 3;
    perdiste = false;
    gameOver = false;
    zorro = crearZorro();
    obstaculo = crearObstaculo();
    inicializarObjetos();
    zorroFrame = 0;
    zorroAnimTimer = 0;
    bucle();
}

// --- Dibujo principal ---
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarFondo();
    dibujarSuelo();
    dibujarObjetos();
    dibujarZorro();
    dibujarObstaculo();
    dibujarHUD();
    if (gameOver) {
        dibujarGameOver();
    }
}

// --- Lógica principal ---
function actualizar() {
    if (gameOver) return;

    // Scroll automático horizontal
    scrollX += velocidadScroll;

    // Movimiento horizontal (no sale de pantalla)
    var vel = canvas.height * 0.012;
    if (zorro.izq) zorro.x = Math.max(0, zorro.x - vel);
    if (zorro.der) zorro.x = Math.min(canvas.width - zorro.w, zorro.x + vel);

    // Salto normal (gravedad constante)
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

    // Si cae fuera de la pantalla, pierde
    if (zorro.y + zorro.h > canvas.height) gameOver = true;

    // Obstáculo se mueve con el scroll horizontal
    obstaculo.x -= velocidadScroll;
    if (obstaculo.x - scrollX + obstaculo.w < 0) {
        Object.assign(obstaculo, crearObstaculo());
        obstaculo.x = scrollX + canvas.width + Math.random() * canvas.width * 0.5;
    }

    // Objetos/frutos se mueven con el scroll horizontal
    for (var i = 0; i < objetos.length; i++) {
        var obj = objetos[i];
        obj.x -= velocidadScroll;
        if (obj.x - scrollX > canvas.width + 50) continue;
        if (obj.x - scrollX + obj.r < 0) {
            Object.assign(obj, crearObjeto());
            obj.x = scrollX + canvas.width + Math.random() * canvas.width * 1.2;
            obj.tomado = false;
        }
        // Colisión con el zorro
        if (!obj.tomado) {
            var zx = zorro.x + zorro.w / 2;
            var zy = (zorro.agachado ? zorro.y + zorro.h * 0.75 : zorro.y + zorro.h / 2);
            var dx = zx - (obj.x - scrollX);
            var dy = zy - obj.y;
            var distancia = Math.sqrt(dx * dx + dy * dy);
            if (distancia < obj.r + Math.min(zorro.w, zorro.h) / 2) {
                obj.tomado = true;
                puntos++;
            }
        }
    }

    // Colisión con obstáculo (solo si está en pantalla)
    var zorroY = zorro.agachado ? zorro.y + zorro.h * 0.5 : zorro.y;
    var zorroH = zorro.agachado ? zorro.h * 0.5 : zorro.h;
    if (
        zorro.x < obstaculo.x - scrollX + obstaculo.w &&
        zorro.x + zorro.w > obstaculo.x - scrollX &&
        zorroY < obstaculo.y + obstaculo.h &&
        zorroY + zorroH > obstaculo.y
    ) {
        vidas--;
        if (vidas <= 0) {
            gameOver = true;
        } else {
            zorro = crearZorro();
            obstaculo = crearObstaculo();
        }
    }
}

// --- Reinicio por touch/click tras Game Over ---
canvas.addEventListener('touchstart', function(e) {
    if (gameOver) {
        reiniciarJuego();
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
        if (deltaY < -40 && !zorro.saltando && !gameOver) {
            zorro.vy = -canvas.height * 0.045;
            zorro.saltando = true;
            // audioSalto.play();
            zorro.agachado = false;
            agachando = false;
        }
    }
});

canvas.addEventListener('touchend', function(e) {
    touchStartY = null;
    agachando = false;
});

canvas.addEventListener('mousedown', function(e) {
    if (gameOver) {
        reiniciarJuego();
        return;
    }
    // ...puedes agregar salto con click si quieres...
});

// --- Controles de teclado ---
document.addEventListener('keydown', function(e) {
    if ((e.code === 'Space' || e.code === 'ArrowUp') && !zorro.saltando && !gameOver) {
        zorro.vy = -canvas.height * 0.045; // salto normal
        zorro.saltando = true;
        // audioSalto.play();
    }
    if ((e.code === 'ArrowDown' || e.code === 'KeyS') && !gameOver) {
        zorro.agachado = true;
    }
    if ((e.code === 'ArrowLeft' || e.code === 'KeyA') && !gameOver) {
        zorro.izq = true;
    }
    if ((e.code === 'ArrowRight' || e.code === 'KeyD') && !gameOver) {
        zorro.der = true;
    }
});
document.addEventListener('keyup', function(e) {
    if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        zorro.agachado = false;
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        zorro.izq = false;
    }
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        zorro.der = false;
    }
});

// --- Bucle principal ---
function bucle() {
    // Animación del zorro (más fluida)
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
    actualizar();
    dibujar();
    if (!gameOver) requestAnimationFrame(bucle);
}

// --- Iniciar juego ---
// El juego solo inicia cuando las imágenes están listas (por onload/onerror)
// reiniciarJuego(); // Elimina esta línea, ya que el inicio está en los eventos de imagen
reiniciarJuego();