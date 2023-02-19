import { TiledImage } from "../TiledImage.js";
export class Special1 {
	constructor(x, y) {
		let loopColumns = true;
		let scale = 1.0;

		this.node = document.createElement("div");
		document.querySelector("#game").append(this.node);

		this.spe1 = new TiledImage("/client/img/spritesheet/special1.png", 9, 1, 60, loopColumns, scale, this.node);
		this.spe1.changeRow(0);
		this.spe1.changeMinMaxInterval(0, 8);

        this.X = x;
        this.Y = y;
        this.timer = 0
        this.tick();
    }

    tick = () => {
        this.spe1.tick(this.X, this.Y);
        if (this.timer > 60) { 
            this.node.remove();
        }
        this.timer++;
    }
}
