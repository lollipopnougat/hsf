/*jshint esversion: 6 */

const btn = document.getElementById('btn');
const mname = location.href.split('html?name=')[1];
const ptag = document.getElementById('ptag');
const pid = document.getElementById('pid');

let myname = '祝春节快乐哦!'; // = unescape();
let clickcount = 0;


if (mname) {
	myname = unescape(mname) + ', ' + myname;
}

function fire(size) {
	const particles = [];
	const color = randomColor();

	const particle = document.createElement('span');
	particle.classList.add('particle', 'move');

	const {
		x,
		y
	} = randomLocation();
	particle.style.setProperty('--x', x);
	particle.style.setProperty('--y', y);
	particle.style.background = color;
	btn.style.background = color;

	btn.appendChild(particle);

	particles.push(particle);

	setTimeout(() => {
		let nums = Math.floor(Math.random() * 500) * size;
		for (let i = 0; i < nums; i++) {
			const innerP = document.createElement('span');
			innerP.classList.add('particle', 'move');
			innerP.style.transform = `translate(${x}, ${y})`;
			let radius = randint(0, 240) * size;
			let rad = randint(0, 360) / 180 * Math.PI;
			let dx = randint(0, 50);
			let dy = randint(0, 50);
			const xs = radius * Math.cos(rad) - dx + 'px'; //Math.random() * 240 - 100 + 'px';
			const ys = radius * Math.sin(rad) - dy + 'px'; //Math.random() * 240 - 100 + 'px';
			//console.log('xs', xs);
			//console.log('ys', ys);
			innerP.style.setProperty('--x', `calc(${x} + ${xs})`);
			innerP.style.setProperty('--y', `calc(${y} + ${ys})`);
			innerP.style.animationDuration = Math.random() * 300 + 200 + 'ms';
			innerP.style.background = color;

			btn.appendChild(innerP);
			particles.push(innerP);
		}

		setTimeout(() => {
			particles.forEach(particle => {
				particle.remove();
			});
		}, 1000);
	}, 1000);
}

btn.addEventListener('click', () => {
	
	clickcount++;
	if (clickcount == 2) {
		btn.innerText = '点击查看祝福';
	}
	else if (clickcount % 2 == 0) {
		fire(2);
		fire(2);
	}
	else if(clickcount == 3) {
		btn.innerText = '春节快乐啊我的朋友!';
		pid.innerText = myname;
		ptag.style.display = 'block';
		fire(3);
		fire(3);
	}
	else {
		fire(1);
		fire(1);
	}
});

function randomLocation() {
	return {
		x: Math.random() * window.innerWidth - window.innerWidth / 2 + 'px',
		y: Math.random() * window.innerHeight - window.innerHeight / 2 + 'px',
	};
}

function randint(m, n) {
	return Math.floor(Math.random() * (n - m + 1)) + m;
}

function randomColor() {
	return `hsl(${Math.floor(Math.random() * 361)}, 100%, 50%)`;
}



setInterval(() => {
	fire(0.5);
}, 1500);