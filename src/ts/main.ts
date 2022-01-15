import Firework from './Firework';
import Particle from './Particle';
import Random from './Random';
// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim

// class Data {
//     public static ctx: CanvasRenderingContext2D;
// }

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        ((callback: TimerHandler): number => {
            return window.setTimeout(callback, 1000 / 60);
        });
})() as ((callback: TimerHandler) => number);

// now we will setup our basic variables for the demo
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
//Data.ctx = ctx;
ctx.globalAlpha = 0;
// full screen dimensions
const cw = window.innerWidth;
const ch = window.innerHeight;

let once = true;

Firework.fireworks = [];
Particle.particles = [];

let limiterTotal = 5;
let limiterTick = 0;
// this will time the auto launches of fireworks, one launch per 80 loop ticks
let timerTotal = 40;
let timerTick = 0;
let mousedown = false;
// mouse x coordinate,
let mx: number = 0;
// mouse y coordinate
let my: number = 0;
const div = document.getElementById('con') as HTMLDivElement;
const h1 = document.getElementById('head') as HTMLHeadingElement;
const h2 = document.getElementById('head2') as HTMLHeadingElement;
const player = document.getElementById('bgMusic') as HTMLAudioElement;
const tips = document.getElementById('tips') as HTMLDivElement;
const imgdiv = document.getElementById('imgdiv') as HTMLDivElement;
const img = document.getElementById('img') as HTMLImageElement;
// set canvas dimensions
canvas.width = cw;
canvas.height = ch;

function setName() {
    const nameurl = location.href.split('html?n=')[1];
    const reg = new RegExp('&', 'g');
    let name: string;
    if (nameurl) {
        name = decodeURI(nameurl.replace(reg, '%'));
    }
    else {
        name = '我的朋友';
    }
    //let h1 = document.getElementById('head') as HTMLHeadingElement;
    //let h2 = document.getElementById('head2') as HTMLHeadingElement;
    h1.innerText = name;
    h2.innerText = '春节快乐!';
    div.style.display = 'block';
    
    //player.loop = true;
    setTimeout(() => {
        h1.innerText = '祝虎年';
        h2.innerText = '幸福平安!';
    }, 3500);
    setTimeout(() => {
        h1.innerText = '财源广进!';
        h2.innerText = '万事如意!';
        //img.style.width = '600px';
        //img.style.height = '600px';
    }, 4100);
    setTimeout(() => {
        div.style.display = 'none';
        h2.innerText = '';
        img.style.width = '500px';
        img.style.height = '500px';
        imgdiv.style.display = 'block';
        //img.style.width = '700px';
        //img.style.height = '700px';
    }, 4700);
    setTimeout(() => {
        imgdiv.style.display = 'none';
        once = true;
        //player.pause();
    }, 7000);
}

function showTimer(msecond: number) {
    h1.innerText = '';
    h1.innerText = '';
    player.play();
    div.style.display = 'block';
    let len = Math.floor(msecond / 1000);
    let handle = setInterval(()=>{
        h2.innerText = len.toFixed(0);
        len--;
        if(len < 0) {
            clearInterval(handle);
            setName();
        }
    }, 1000);
    
}

// main demo loop
function loop() {
    //const ctx = Data.ctx;
    // this function will run endlessly with requestAnimationFrame
    window.requestAnimFrame!(loop);

    // increase the hue to get different colored fireworks over time
    Firework.hue += 0.5;

    // normally, clearRect() would be used to clear the canvas
    // we want to create a trailing effect though
    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    ctx.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, cw, ch);
    // change the composite operation back to our main mode
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    ctx.globalCompositeOperation = 'lighter';

    // loop over each firework, draw it, update it
    var i = Firework.fireworks.length;
    while (i--) {
        Firework.fireworks[i].draw(ctx);
        Firework.fireworks[i].update(i);
    }

    // loop over each particle, draw it, update it
    var i = Particle.particles.length;
    while (i--) {
        Particle.particles[i].draw(ctx);
        Particle.particles[i].update(i);
    }

    // launch fireworks automatically to random coordinates, when the mouse isn't down
    if (timerTick >= timerTotal) {
        if (!mousedown) {
            // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
            Firework.fireworks.push(new Firework(cw / 2, ch, Random.random(0, cw), Random.random(0, ch / 2)));
            timerTick = 0;
        }
    } else {
        timerTick++;
    }

    // limit the rate at which fireworks get launched when mouse is down
    if (limiterTick >= limiterTotal) {
        if (mousedown) {
            // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
            Firework.fireworks.push(new Firework(cw / 2, ch, mx, my));
            limiterTick = 0;
        }
    } else {
        limiterTick++;
    }
}

let dx = 0;
// mouse event bindings
// update the mouse coordinates on mousemove
canvas.addEventListener('mousemove', (e) => {
    mx = e.pageX - canvas.offsetLeft;
    my = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener('mousedown', (e) => {
    if (once) {
        dx = e.pageX - canvas.offsetLeft;
    }
    e.preventDefault();
    mousedown = true;
});

canvas.addEventListener('mouseup', (e) => {
    if (once) {
        dx -= e.pageX - canvas.offsetLeft;
        dx = Math.abs(dx);
        if (dx > cw / 2) {
            once = false;
            showTimer(5000);
            // setTimeout(() => {
            //     setName();
            // }, 5000);
        }

    }
    e.preventDefault();
    mousedown = false;
});

canvas.addEventListener('touchstart', (e) => {
    if (once) {
        dx = e.touches[0].pageX - canvas.offsetLeft;
    }
    e.preventDefault();
    mousedown = true;
});

canvas.addEventListener('touchend', (e) => {
    if (once) {
        dx -= e.changedTouches[0].pageX - canvas.offsetLeft;
        dx = Math.abs(dx);
        if (dx > cw / 2) {
            once = false;
            showTimer(5000);
            // setTimeout(() => {
            //     setName();
            // }, 5000);
        }

    }
    e.preventDefault();
    mousedown = false;
});

canvas.addEventListener('touchmove', (e) => {
    mx = e.touches[0].pageX - canvas.offsetLeft;
    my = e.touches[0].pageY - canvas.offsetTop;
});

// once the window loads, we are ready for some fireworks!
window.onload = () => {

    loop();
    tips.style.animation = 'fade 3s cubic-bezier(0, 0, 1, 1) infinite';
    setTimeout(() => {
        tips.style.display = 'none';
    }, 2900);
};

