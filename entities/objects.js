// Lógica de objetos/frutos
export function crearObjeto(canvas) {
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

export function inicializarObjetos(canvas, cantidad = 5) {
    let objetos = [];
    for (let i = 0; i < cantidad; i++) {
        objetos.push(crearObjeto(canvas));
    }
    return objetos;
}

export function dibujarObjeto(ctx, obj, scrollX) {
    if (obj.tomado) return;
    let bounce = Math.round(Math.sin(Date.now() / 180 + obj.x / 50) * 2);
    ctx.fillStyle = "#e33";
    ctx.fillRect(Math.round(obj.x - scrollX - obj.r), Math.round(obj.y + bounce - obj.r), obj.r * 2, obj.r * 2);
    ctx.fillStyle = "#fff";
    ctx.fillRect(Math.round(obj.x - scrollX - obj.r * 0.3), Math.round(obj.y + bounce - obj.r * 0.7), obj.r * 0.6, obj.r * 0.3);
    ctx.fillStyle = "#3a3";
    ctx.fillRect(Math.round(obj.x - scrollX + obj.r * 0.2), Math.round(obj.y + bounce - obj.r * 1.1), 2, 6);
}

export function dibujarObjetos(ctx, objetos, scrollX) {
    for (let obj of objetos) {
        dibujarObjeto(ctx, obj, scrollX);
    }
}
