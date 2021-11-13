const canvas = document.getElementById('mycanvas')
const ctx = canvas.getContext('2d');

const scl = 20;

ctx.scale(scl, scl);

class Snake {
	constructor() {
		this.x = canvas.width/(2*scl);
		this.y = canvas.height/(2*scl);
		this.w = 1;
		this.h = 1;
		this.dx = 1;
		this.dy = 0;
		this.tail = [];
	}

	dir(dx, dy) {
		this.dx = dx;
		this.dy = dy;
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;
	}

	erase() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,canvas.width,canvas.height)
	}

	show() {
		ctx.fillStyle = '#ff0000';
		ctx.fillRect(this.x, this.y, this.w, this.h); //head of Snake	
	}
}

const snake = new Snake();

function renderGame() {
	snake.erase();
	snake.update();
	snake.show();
}

document.addEventListener('keydown', function(e) {
	if(e.keyCode == 39) {
		snake.dir(1, 0);
	} else if(e.keyCode == 37) {
		snake.dir(-1, 0);
	}
})

let start = 0;
function showGame(time) {
	if((time-start) >= 400) {
		start = time;
		renderGame();
	}
	window.requestAnimationFrame(showGame);
} 
window.requestAnimationFrame(showGame);

