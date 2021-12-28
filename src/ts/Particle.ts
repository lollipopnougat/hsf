import Random from './Random';

export default class Particle {
    private constructor(x: number, y: number, hue: number) {
        this.x = x;
        this.y = y;
        // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
        this.coordinates = [];
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        // set a random angle in all possible directions, in radians
        this.angle = Random.random(0, Math.PI * 2);
        this.speed = Random.random(1, 15);

        this.friction = 0.95;

        // set the hue to a random number +-20 of the overall hue variable
        this.hue = Random.random(hue - 20, hue + 20);
        this.brightness = Random.random(50, 80);
        // 淡出速度(越小持续时间越长)
        this.decay = Random.random(0.005, 0.01);
    }
    private x: number;
    private y: number;
    private alpha = 1;
    private angle: number;
    private brightness: number;
    private coordinates: number[][];
    private coordinateCount: number = 5;
    private decay: number;
    // 摩擦系数（减缓速度）
    private friction = 0.95;
    // 重力（下落）
    private gravity = 1;
    private hue: number;
    // 烟火颗粒大小
    private size = 4;
    private speed: number;
    public static particles: Particle[] = [];
    public static createParticles(x:number, y:number, hue: number, num = 30) {
        for(let i = 0; i < num; i++) {
            Particle.particles.push(new Particle(x, y, hue));
        }
    }
    public update(index: number) {
        // remove last item in coordinates array
        this.coordinates.pop();
        // add current coordinates to the start of the array
        this.coordinates.unshift([this.x, this.y]);
        // slow down the particle
        this.speed *= this.friction;
        // apply velocity
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        // fade out the particle
        this.alpha -= this.decay;

        // remove the particle once the alpha is low enough, based on the passed in index
        if (this.alpha <= this.decay) {
            Particle.particles.splice(index, 1);
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        // move to the last tracked coordinates in the set, then draw a line to the current x and y
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.lineTo(this.x, this.y);
        //ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.stroke();
    }

}