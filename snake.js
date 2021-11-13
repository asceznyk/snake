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

	reset() {
		this.tail = [];
		this.x = canvas.width/(2*scl);
		this.y = canvas.height/(2*scl);
		this.dx = 1;
		this.dy = 0;
	}

	hold() {
		if(
			(this.x >= (canvas.width/scl)-1 || this.x <= 0) || 
			(this.y >= (canvas.height/scl)-1 || this.y <= 0)
		) {
			this.reset();
		}
	}

	eat(food) {
		if(Math.abs(this.x - food.x) <= 1 && Math.abs(this.y - food.y) <= 1) {	
			//do something to the snake!
			return true;
		}
	}

	update() {
		this.hold();
		this.x += this.dx;
		this.y += this.dy;
	}

	show() {
		ctx.fillStyle = '#fff';
		ctx.fillRect(this.x, this.y, this.w, this.h); //head of Snake	
	}
}

class Food {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.place();
	}

	place() {
		this.x = Math.floor(Math.random() * canvas.width/scl);
		this.y = Math.floor(Math.random() * canvas.height/scl);
	}

	show() {
		ctx.fillStyle = '#ff0000';
		ctx.fillRect(this.x, this.y, 1, 1);
	}
}

const snake = new Snake();
const food = new Food();

function renderGame() {
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	snake.update();
	if(snake.eat(food)) {
		food.place();
	}
	snake.show();
	food.show();
}

document.addEventListener('keydown', function(e) {
	if(e.keyCode == 39) {
		snake.dir(1, 0);
	} else if(e.keyCode == 37) {
		snake.dir(-1, 0);
	} else if (e.keyCode == 40) {
		snake.dir(0, 1);
	} else if (e.keyCode == 38) {
		snake.dir(0, -1);
	}
})

let start = 0;
function showGame(time) {
	if((time-start) >= 50) {
		start = time;
		renderGame();
	}
	window.requestAnimationFrame(showGame);
} 
window.requestAnimationFrame(showGame);

