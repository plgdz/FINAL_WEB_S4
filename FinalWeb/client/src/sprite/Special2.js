import { TiledImage } from "../TiledImage.js";
import { Ennemi } from './Ennemi.js';
export class Special2 {
	constructor(ground, x, y, xEnnemi) {
		let loopColumns = true;
		let scale = 1.0;

        this.xEnnemi = xEnnemi;
        this.ennemi = new Ennemi();
        this.nbExplode = 10;
        this.canvas = [];
        this.explosion = [];

        for (let i = 0; i < this.nbExplode; i++){
            this.canvas[i] = document.createElement("div");
            document.querySelector("#game").append(this.canvas[i]);
            this.explosion[i] = new TiledImage("/client/img/spritesheet/boom.png", 13, 1, 60, loopColumns, 1, this.canvas[i]);
            this.explosion[i].changeRow(0);
		    this.explosion[i].changeMinMaxInterval(0, 12);
        }
        
		this.node = document.createElement("div");
        this.node.style.opacity = 0.5;
		document.querySelector("#game").append(this.node);

		this.spe2 = new TiledImage("/client/img/spritesheet/attaque2.png", 2, 1, 60, loopColumns, scale, this.node);
		this.spe2.changeRow(0);
		this.spe2.changeMinMaxInterval(0, 1);

        this.ground = ground;
        this.X = x;
        this.Y = y;
        this.timer = 0;
        this.tick();
    }

    tick = () => {
        this.timer++;
        this.spe2.tick(this.X, this.Y);
        if (this.timer < 240) {      
            this.Y -= 2.5;
        } else if (this.timer < 300) {
            this.ennemi.hit();
            for (let i = 0; i < this.nbExplode; i++){
                this.explosion[i].tick(this.xEnnemi - 100 + Math.random() * 200, this.ground - 50 + Math.random() * 100);
            }
        } else { 
            this.node.remove();
            this.ennemi.delete();
            for (let i = 0; i < this.nbExplode; i++){
                this.canvas[i].remove();
            }
        }
    }
}
