import { TiledImage } from "../TiledImage.js";
import {leftArrowOn, rightArrowOn, space, upArrow, downArrow} from "./deplacement.js";

export class Rayman {
	constructor(pos, game) {
		let columnCount = 16;
		let rowCount = 1;
		let refreshDelay = 33;
		let loopColumns = true;
		let scale = 1.;
		this.game = game;

		this.falling = false;
		this.attaque3 = false;

		this.node = document.createElement("div");
		this.node.style.bottom = 20 + "vh";
		this.node.style.left = pos + "%";
		document.querySelector("#game").append(this.node);

		this.walk = new TiledImage("/client/img/spritesheet/walk.png", columnCount, rowCount, refreshDelay, loopColumns, scale, this.node);
		this.walk.changeRow(0);
		this.walk.changeMinMaxInterval(0, 15);

		this.hit = new TiledImage("/client/img/spritesheet/hitt.png", 5, 3, refreshDelay, loopColumns, scale, this.node);
		this.hit.changeRow(0);
		this.hit.changeMinMaxInterval(0, 5);

		this.static = new TiledImage("/client/img/spritesheet/static.png", 12, 1, refreshDelay, loopColumns, scale, this.node);
		this.static.changeRow(0);
		this.static.changeMinMaxInterval(0, 11);

		this.jump = new TiledImage("/client/img/spritesheet/jump.png", 4, 1, 60, loopColumns, scale, this.node);
		this.jump.changeRow(0);
		this.jump.changeMinMaxInterval(0, 3);

		this.lay = new TiledImage("/client/img/spritesheet/lay.png", 7, 1, 60, loopColumns, scale, this.node);
		this.lay.changeRow(0);
		this.lay.changeMinMaxInterval(0, 6);

		this.fall = new TiledImage("/client/img/spritesheet/fall.png", 7, 1, 60, loopColumns, scale, this.node);
		this.fall.changeRow(0);
		this.fall.changeMinMaxInterval(0, 6);

		this.ground = this.node.offsetTop - 100;
		this.x = this.node.offsetLeft;
		this.y = this.node.offsetTop - 100;
		this.punchX = this.x + 50;
	}

	getX() { return this.x}
	getY() { return this.y}

	remove() {
		this.node.remove();
	}


	tick () {
		if (this.game) {
			this.walk.tick();
		} else {
			if (this.falling) {
				if (this.right) this.fall.setFlipped(false);
				else if (this.left) this.fall.setFlipped(true);			
				if (this.y <= this.ground) {
					this.y += 2;
				}
				if (this.y == this.ground) this.falling = false;		
			}
	
			if (leftArrowOn) {
				this.right = false;
				this.left = true;
				this.walk.changeRow(0);
				this.walk.setFlipped(true);
				this.x -= 1.5;
				this.punchX -= 1.5;
			}
	
			if (rightArrowOn) {
				this.left = false;
				this.right = true;
				this.walk.changeRow(0);
				this.walk.setFlipped(false);
				this.x += 1.5;
				this.punchX += 1.5;
			}
	
			if (space) {
				this.hit.changeRow(1)
				if (this.right) this.hit.setFlipped(false);
				else if (this.left) this.hit.setFlipped(true);
			}
	
			if (upArrow) {
				if (this.right) this.jump.setFlipped(false);
				else if (this.left) this.jump.setFlipped(true);
				this.falling = false;
				this.y--;
			}
			
			if (!upArrow) { this.falling = true;}
	
			if (downArrow) {
				if (this.right) this.lay.setFlipped(false);
				else if (this.left) this.lay.setFlipped(true);
			}
		
			if (this.falling && this.y < this.ground) {
				this.fall.tick(this.x, this.y);
			} else if (upArrow) {
				this.jump.tick(this.x, this.y);	
				if (rightArrowOn) this.jump.tick(this.x, this.y);
				if (leftArrowOn) this.jump.tick(this.x, this.y);			
			} else if (leftArrowOn || rightArrowOn) {
				this.walk.tick(this.x, this.y);
			} else if (space) {
				this.hit.tick(this.x, this.y);
			} else if (downArrow) {
				this.lay.tick(this.x, this.y);
			} else if (!leftArrowOn && !rightArrowOn) {
				if (this.right) this.static.setFlipped(false);
				else if (this.left) this.static.setFlipped(true);
				this.static.tick();
			} 
		}
	}
}