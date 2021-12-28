import Random from './Random';
import Particle from './Particle';

export default class Fireworkex {
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.brightness = Random.random(50, 70);
        this.radius = 1;
        this.invoking = false;
    }
    private brightness: number;
    private x: number;
    private y: number;
    private radius: number;
    private invoking: boolean;
    private static validRadius = 8;
    private size = 6;
    // 色相
    public static set hue(value: number) {
        Fireworkex._hue = value;
    }
    public static get hue() {
        return Fireworkex._hue;
    }
    private static _hue = 120;
    public static fireworks: Fireworkex[] = [];
    public update(index: number) {
        // cycle the circle target indicator radius
        if (this.radius < 8) {
            this.radius += 0.3;
        } else {
            this.radius = 1;
        }
        if (this.invoking) {
            Particle.createParticles(this.x, this.y, Fireworkex._hue);
            Fireworkex.fireworks.splice(index, 1);
        }


    }
    // 计算距离（欧氏）
    private static calculateDistance(p1x: number, p1y: number, p2x: number, p2y: number) {
        let xDistance = p1x - p2x;
        let yDistance = p1y - p2y;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    public invoke(tx: number, ty: number) {
        let d = Fireworkex.calculateDistance(this.x, this.y, tx, ty);
        if(d <Fireworkex.validRadius) {
            this.invoking = true;
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // move to the last tracked coordinate in the set, then draw a line to the current x and y
        ctx.moveTo(this.x, this.y);
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';

        ctx.beginPath();
        // draw the target for this firework with a pulsing circle
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}
