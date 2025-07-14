// Detección de colisiones
export function colisionRect(r1, r2) {
    return (
        r1.x < r2.x + r2.w &&
        r1.x + r1.w > r2.x &&
        r1.y < r2.y + r2.h &&
        r1.y + r1.h > r2.y
    );
}

export function colisionCirculoRect(c, r) {
    // c: {x, y, r}, r: {x, y, w, h}
    let distX = Math.abs(c.x - r.x - r.w / 2);
    let distY = Math.abs(c.y - r.y - r.h / 2);
    if (distX > (r.w / 2 + c.r)) return false;
    if (distY > (r.h / 2 + c.r)) return false;
    if (distX <= (r.w / 2)) return true;
    if (distY <= (r.h / 2)) return true;
    let dx = distX - r.w / 2;
    let dy = distY - r.h / 2;
    return (dx * dx + dy * dy <= c.r * c.r);
}
