// Areas and operations: Boolean, pixel-by-pixel shape drawing.
//
// Each shape is a predicate function (x, y) -> boolean that answers
// "is the pixel at (x, y) inside this shape?". Those predicates are
// combined with Boolean operators, and the final expression is evaluated
// for every pixel of the canvas to decide whether it is drawn.

'use strict';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

// --- Shape primitive ----------------------------------------------------

// Circle membership test: (x - cx)^2 + (y - cy)^2 <= r^2
function inCircle(x, y, cx, cy, r) {
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= r * r;
}

// --- Boolean combinators over predicates ---------------------------------
// Each takes one or two predicates and returns a new predicate, so the
// final "is this pixel drawn?" is just a Boolean expression.

const NOT = (shape) => (x, y) => !shape(x, y);
const AND = (a, b) => (x, y) => a(x, y) && b(x, y);
const OR = (a, b) => (x, y) => a(x, y) || b(x, y);
const XOR = (a, b) => (x, y) => a(x, y) !== b(x, y);

// --- Scene 1: A minus B (ring) -------------------------------------------
// Circle B is entirely inside circle A, so A - B is a ring (annulus).

const circleA = (x, y) => inCircle(x, y, 250, 150, 110);
const circleB = (x, y) => inCircle(x, y, 250, 150, 45);
const ring = AND(circleA, NOT(circleB)); // A AND NOT B

// --- Scene 2: C XOR D (symmetric difference) ------------------------------
// Circle D is partially inside and partially outside circle C.
// Fill the part of D outside C and draw C without the part of D inside C,
// i.e. (C AND NOT D) OR (D AND NOT C), which is the symmetric difference.

const circleC = (x, y) => inCircle(x, y, 200, 385, 95);
const circleD = (x, y) => inCircle(x, y, 315, 385, 95);
const symmetricDifference = XOR(circleC, circleD); // (C AND NOT D) OR (D AND NOT C)

// --- Scene list ------------------------------------------------------------
// Each entry is drawn with its own color. A pixel takes the color of the
// first shape it is inside (checked top to bottom); otherwise the
// background color is used.

const scene = [
    { shape: ring, color: [232, 90, 70] },                 // warm red
    { shape: symmetricDifference, color: [45, 140, 190] }  // teal
];

const BACKGROUND = [248, 248, 245];

// --- Render ------------------------------------------------------------------

function render() {
    const imageData = ctx.createImageData(W, H);
    const data = imageData.data;

    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            // Sample at the pixel center for slightly better accuracy.
            const px = x + 0.5;
            const py = y + 0.5;

            let color = BACKGROUND;
            for (const entry of scene) {
                if (entry.shape(px, py)) {
                    color = entry.color;
                    break;
                }
            }

            const i = (y * W + x) * 4;
            data[i] = color[0];
            data[i + 1] = color[1];
            data[i + 2] = color[2];
            data[i + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    // Labels (drawn on top of the rendered image).
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.fillText('A − B  (circle A minus circle B)', 250, 22);
    ctx.fillText('C XOR D  (symmetric difference)', 250, 282);
}

render();

// NOTE: hard Boolean tests produce jagged (aliased) edges. For smooth
// edges you can supersample each pixel (average several sub-pixel
// samples) or keep a continuous "signed distance" value and map it to
// coverage/alpha instead of a plain true/false.
