import { TiledImage } from "../TiledImage.js";

export class Ennemi {
	constructor(attaque, xRayman) {
		let rowCount = 1;
		let refreshDelay = 60;
		let loopColumns = true;
		let scale = 1.;

		this.node = document.createElement("div");
        this.nodeAttack = document.createElement("div");
		this.node.style.bottom = 20 + "%";
        this.node.style.left = 75+ "%";
		document.querySelector("#game").append(this.node);
        document.querySelector("#game").append(this.nodeAttack);

		this.main = new TiledImage("/client/img/spritesheet/enemy-run.png", 5, rowCount, refreshDelay, loopColumns, scale, this.node);
		this.main.changeRow(0);
        this.main.setFlipped(true);
		this.main.changeMinMaxInterval(0, 19);

        this.touch = new TiledImage("/client/img/spritesheet/ennemi-touch.png", 3, rowCount, refreshDelay, loopColumns, scale, this.node);
        this.touch.changeRow(0);
        this.touch.changeMinMaxInterval(0, 2);

        this.run = new TiledImage("/client/img/spritesheet/ennemi-run.png", 9, rowCount, refreshDelay, loopColumns, scale, this.nodeAttack);
        this.run.changeRow(0);
        this.run.changeMinMaxInterval(0, 8);

        this.attack = new TiledImage("/client/img/spritesheet/ennemi-attack.png", 11, rowCount, refreshDelay, loopColumns, scale, this.nodeAttack);
        this.attack.changeRow(0);
        this.attack.changeMinMaxInterval(0, 10);

        this.action = attaque;

        this.xRayman = xRayman;
        this.timer = 0;
		this.ground = this.node.offsetTop - 100;
		this.x = this.node.offsetLeft;
		this.y = this.node.offsetTop - 100;

        this.xSave = this.node.offsetLeft;
        this.ySave = this.node.offsetTop - 100;
	}

	getX() { return this.x}
	getY() { return this.y}

    hit() {
        this.touch.tick(this.x, this.y);
    }

    delete () {
        this.node.remove()
    }

	tick () {
        if (this.action){
            
        
            if (this.x > this.xRayman + 300) {
                this.run.tick(this.x, this.y)
                this.x -= 6;
            } else {
                this.attack.tick(this.x, this.y)
                this.timer++;
                this.x -= 4;
                if(this.x <= this.xRayman){
                    this.nodeAttack.remove();
                }
            }
        } else {
            this.main.tick(this.x, this.y);
		    return this.getX();
        }
		
	}
}