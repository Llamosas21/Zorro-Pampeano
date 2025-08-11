import { iniciarBucle } from './bucleJuego.js';
import { configurarControles } from './motor/entrada.js';

function ajustarCanvas() {
    const canvas = document.getElementById('lienzoJuego');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', ajustarCanvas);

document.addEventListener('DOMContentLoaded', () => {
    ajustarCanvas();
    configurarControles();
    iniciarBucle();
});



