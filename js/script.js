/*jshint esversion: 6 */

const btn = document.getElementById('btn');
const mname = location.href.split('html?name=')[1];
let myname = ''; // = unescape();


if (mname) {
	btn.innerText = unescape(mname) + ', 春节快乐!';
}

function fire() {
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
		let nums = Math.floor(Math.random() * 500);
		for (let i = 0; i < nums; i++) {
			const innerP = document.createElement('span');
			innerP.classList.add('particle', 'move');
			innerP.style.transform = `translate(${x}, ${y})`;
			let radius = randint(0, 240);
			let rad = randint(0, 360) / 180 * Math.PI;
			let dx = randint(0, 50);
			let dy = randint(0, 50);
			const xs = radius * Math.cos(rad) - dx + 'px'; //Math.random() * 240 - 100 + 'px';
			const ys = radius * Math.sin(rad) - dy + 'px'; //Math.random() * 240 - 100 + 'px';
			console.log('xs', xs);
			console.log('ys', ys);
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
	fire();
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
	fire();
}, 500);