import Random from './Random';
import Particle from './Particle';

export default class Firework {
    public constructor(sx: number, sy: number, tx: number, ty: number) {
        // 实际坐标
        this.x = sx;
        this.y = sy;
        // 起始坐标
        this.sx = sx;
        this.sy = sy;
        // 目标坐标
        this.tx = tx;
        this.ty = ty;
        // 距离
        this.distanceToTarget = Firework.calculateDistance(sx, sy, tx, ty);
        // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
        this.coordinates = [];
        // populate initial coordinate collection with the current coordinates
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.brightness = Random.random(50, 70);

    }
    private acceleration = 1.03;
    private angle: number;
    private brightness: number;
    private distanceToTarget: number;
    private distanceTraveled = 0;
    private coordinates: number[][];
    private coordinateCount = 3;
    // 初始色相
    private static _hue = 120;
    // 烟花上升阶段大小
    private size = 6;
    private speed = 1;
    private sx: number;
    private sy: number;
    private targetRadius = 1;
    private tx: number;
    private ty: number;
    private x: number;
    private y: number;
    private particleCount = 30;
    // 色相
    public static set hue(value: number) {
        Firework._hue = value;
    }
    public static get hue() {
        return Firework._hue;
    }
    // 计算距离（欧氏）
    private static calculateDistance(p1x: number, p1y: number, p2x: number, p2y: number) {
        let xDistance = p1x - p2x;
        let yDistance = p1y - p2y;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
    public static fireworks: Firework[] = [];
    public update(index: number) {
        // remove last item in coordinates array
        this.coordinates.pop();
        // add current coordinates to the start of the array
        this.coordinates.unshift([this.x, this.y]);

        // cycle the circle target indicator radius
        if (this.targetRadius < 8) {
            this.targetRadius += 0.3;
        } else {
            this.targetRadius = 1;
        }// speed up the firework
        this.speed *= this.acceleration;

        // get the current velocities based on angle and speed
        let vx = Math.cos(this.angle) * this.speed;
        let vy = Math.sin(this.angle) * this.speed;
        // how far will the firework have traveled with velocities applied?
        this.distanceTraveled = Firework.calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

        // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
        if (this.distanceTraveled >= this.distanceToTarget) {
            Particle.createParticles(this.tx, this.ty, Firework._hue, this.particleCount);
            // remove the firework, use the index passed into the update function to determine which to remove
            Firework.fireworks.splice(index, 1);
        } else {
            // target not reached, keep traveling
            this.x += vx;
            this.y += vy;
        }
    }
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        // move to the last tracked coordinate in the set, then draw a line to the current x and y
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(${Firework._hue}, 100%, ${this.brightness}%)`;
        ctx.stroke();

        ctx.beginPath();
        // draw the target for this firework with a pulsing circle
        ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
        ctx.stroke();
    }
}