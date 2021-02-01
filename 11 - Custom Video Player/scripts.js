//Get our elements
const player = document.querySelector('.player');
const vedio = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay(){
	if(vedio.paused) vedio.play();
	else vedio.pause();

}
function UpdateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
	console.log(icon);
}
function skip() {
	//console.log('skipping');
	vedio.currentTime += parseFloat(this.dataset.skip);
}

function range_value() {
	vedio[this.name] = this.value;
}

function handleProgress() {
	const percent = (vedio.currentTime/vedio.duration)*100;
	progressBar.style.flexBasis = `${percent}%`;
	//console.log('hello');
}
function updateTime(e) {
	const scrub = (e.offsetX/progress.offsetWidth)*vedio.duration;
	vedio.currentTime = scrub;
}

//Hook up the event listener
let mousedown = false;
vedio.addEventListener('click',togglePlay);
vedio.addEventListener('play',UpdateButton);
vedio.addEventListener('pause',UpdateButton);
vedio.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);

skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',range_value));
progress.addEventListener('mousemove',(e) => mousedown && updateTime(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
