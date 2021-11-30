const canvas = document.getElementById('mycanvas')
const ctx = canvas.getContext('2d');

const scl = 20;

ctx.scale(scl, scl);

class Snake {
	constructor() {
		this.tail = [];
		this.x = canvas.width/(2*scl);
		this.y = canvas.height/(2*scl);	
		this.dx = 1;
		this.dy = 0;
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

	die() {
		if(
			(this.x > (canvas.width/scl) || this.x < 0) || 
			(this.y > (canvas.height/scl) || this.y < 0)
		) {
			this.reset();
		}

		for(let i = 0; i < this.tail.length; i++) {
			if(Math.abs(this.x - this.tail[i].x) == 0 && Math.abs(this.y - this.tail[i].y) == 0) {
				this.reset();
			}
		}
	}

	eat(food) {
		if(Math.abs(this.x - food.x) < 1 && Math.abs(this.y - food.y) < 1) {	
			this.tail.push({'x':this.x, 'y':this.y});
			return true;
		}
	}

	update() {
		if (this.tail.length > 0) {
			if (this.tail.length > 1) {
				for(let i = 0; i < this.tail.length-1; i++) {
					this.tail[i] = this.tail[i+1];
				}
			}
			this.tail[this.tail.length-1] = {x:this.x, y:this.y};
		}


		this.x += this.dx;
		this.y += this.dy;
	}

	show() {
		ctx.fillStyle = '#fff';
		ctx.fillRect(this.x, this.y, 1, 1); 

		for(let i = 0; i < this.tail.length; i++) {
			ctx.fillRect(this.tail[i].x, this.tail[i].y, 1, 1);
		}
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
	snake.die();
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
	if((time-start) >= 100) {
		start = time;
		renderGame();
	}
	window.requestAnimationFrame(showGame);
} 
window.requestAnimationFrame(showGame);

