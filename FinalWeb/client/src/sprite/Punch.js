import { TiledImage } from "../TiledImage.js";
import { Ennemi } from './Ennemi.js';

export class Punch {
	constructor(special1, ground, x, y, xEnnemi) {
		let loopColumns = true;

        this.ennemi = new Ennemi();
        
        this.special1 = special1;
		this.node = document.createElement("div");
		this.impactSpe = document.createElement("div");
        this.impactReg = document.createElement("div");

		document.querySelector("#game").append(this.node);
        document.querySelector("#game").append(this.impactReg);
        document.querySelector("#game").append(this.impactSpe);

		this.punch = new TiledImage("/client/img/spritesheet/punch.png", 4, 1, 60, loopColumns, special1 ? 3.0 : 1.0, this.node);
		this.punch.changeRow(0);
		this.punch.changeMinMaxInterval(0, 3);

        this.impactRegulier = new TiledImage("/client/img/spritesheet/hit-touch.png", 4, 1, 60, loopColumns, 1, this.impactReg);
        this.impactRegulier.changeRow(0);
		this.impactRegulier.changeMinMaxInterval(0, 3);

        this.impactSpecial = new TiledImage("/client/img/spritesheet/boom.png", 13, 1, 60, loopColumns, 1, this.impactSpe);
        this.impactSpecial.changeRow(0);
		this.impactSpecial.changeMinMaxInterval(0, 12);

        if(this.special1){
            this.punch.setRotationAngle(90);
        }
        
        this.xEnnemi = xEnnemi;
        console.log(xEnnemi)

        this.timer = 0;
        this.ground = ground;
        this.punchX = x + 50;
        this.punchY = y + 50;
        this.tick();
    }

    tick = () => {
        if (this.special1){
            this.punch.tick(this.xEnnemi, this.punchY);
            if (this.punchY > this.ground) { 
                this.node.remove();
                this.impactSpecial.tick( this.punchX - 100, this.punchY);
                this.ennemi.hit() 
                if (this.timer == 30) {
                    this.impactSpe.remove();
                    this.ennemi.delete(); 
                }
                this.timer++;
            } else {
                this.punchY+=6;
            }
            
        } else {
            this.punch.tick(this.punchX, this.punchY);
            if (this.punchX > this.xEnnemi) { 
                this.node.remove();
                this.impactRegulier.tick( this.punchX, this.punchY - 75 );
                this.ennemi.hit() 
                if (this.timer == 30) {
                    this.impactReg.remove();
                    this.ennemi.delete(); 
                }
                this.timer++;
            } else {
                this.punchX+=4;
            }
        }        
    }
}
