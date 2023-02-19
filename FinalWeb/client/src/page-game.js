import {registerGameCallbacks,  gameLoop} from './sirius-api';
import {Rayman} from './sprite/Rayman.js'
import {Punch} from './sprite/Punch.js'
import {Special1} from './sprite/Special1.js'
import {Special2} from './sprite/Special2.js'
import { Ennemi } from './sprite/Ennemi.js';
import GameOver from './vue/GameOver.vue';
import { createApp } from 'vue';

let canvas;
let ctx;
let rayman;
let ennemi;
let ground = new Image();
ground.src = "img/ground.png";
let floorX = 0;
let floorY = 0;
let groundLevel = 0;
let punchList = [];
let spriteList = [];
let posPlayer = 15;
let other = 0;
let nbOther = 0;
let game = true;

window.addEventListener("load", () => {
	canvas = document.getElementById('canva');
	ctx = canvas.getContext("2d");
	

	rayman = new Rayman(20, game);
	ennemi = new Ennemi(false);
	groundLevel = rayman.getY()


    let nodeAttack1 = document.querySelector("#attack-1");
    let nodeAttack2 = document.querySelector("#attack-2");
    let nodeAttack3 = document.querySelector("#attack-3");

	nodeAttack1.addEventListener("click", () => {
		if (nodeAttack1.style.opacity == 1) {
			let punchLaunch = new Punch(false, groundLevel, rayman.getX(), rayman.getY(), ennemi.getX());
			punchList.push(punchLaunch);
		}
		
	})

	nodeAttack2.addEventListener("click", () => {
		if (nodeAttack1.style.opacity == 1) {
			let special = new Special1(rayman.getX(), rayman.getY());
			punchList.push(special);
			let punchSpe1 = new Punch(true, groundLevel, ennemi.getX() + 50, -300, ennemi.getX());
			punchList.push(punchSpe1);
		}
	})

	nodeAttack3.addEventListener("click", () => {
		if (nodeAttack1.style.opacity == 1) {
			let spe2 = new Special2(groundLevel, rayman.getX(), rayman.getY(), ennemi.getX());
			punchList.push(spe2);
		}
	})

    registerGameCallbacks(gameUpdate, gameOverCallback, attackCallback, nodeAttack1, nodeAttack2, nodeAttack3);
    gameLoop();
	
	tick();
})

/**
 * Fonction appelée automatiquement lorsque vous attaquez.
 *
 * @param {*} skill utilisé
 */
const attackCallback = skill => {
    console.log("You attacked !" , skill);
}

/**
 * Fonction appelée automatiquement lorsque la partie se termine. Vous devez afficher un message à l'écran,
 * puis faire en sorte que le joueur puisse retourner à la page lobby.html
 * @param {*} msg de fin de partie
 */
const gameOverCallback = msg => {
    console.log(msg);

	let bg = document.createElement("div");
	bg.id = "container";
	document.querySelector("#game").append(bg);

	let app = createApp(GameOver);
	let vueApp = app.mount("#container");
	vueApp.setMessage(msg);
}

/**
 * Fonction appelée automatiquement à chaque 2 secondes, qui inclut les informations de la partie en cours
 * @param {*} game : information de la partie (si game.attacked est à true, c'est que l'ennemi vient d'attaquer)
 * @param {*} player : information du joueur
 * @param {*} otherPlayers : information sur les autres joueurs présent dans la partie
 */
const gameUpdate = (game, player, otherPlayers)  => {
    document.querySelector("#enemy-life").innerHTML = "<meter min = 0 max=" + game.max_hp + " value=" + game.hp + "></meter>";
    document.querySelector("#your-life").innerHTML = "<meter min = 0 low = " + player.max_hp * 0.4 + " max=" + player.max_hp + " value=" + player.hp + "></meter>";
	console.log(game);
    console.log(player);
    console.log(otherPlayers);
	console.log(punchList)
	console.log(spriteList)
	other = otherPlayers.length;
	nbOther = spriteList.length;

	if ( other >= spriteList.length){
		for (let i = 0; i < other; i++){
			spriteList.push(new Rayman(posPlayer, game));
			posPlayer -= 5;
		}
	} else if (other < spriteList.length) {
		for (let i = other;spriteList.length > i; i++){
			spriteList[i].remove();
			spriteList.slice(1, i);
			posPlayer += 5;
		}
	}

	// Evite a la punchlist d'etre surchargee et de faire bugger le navigateur sans alterer les animations en cours
	if (punchList.length > 4){
		for (let i = 0; i <= punchList.length / 2; i++){
			punchList.shift();
		}
	}
	
	if (game.attacked){
		let ennemiAttack = new Ennemi(true, rayman.getX());
		punchList.push(ennemiAttack)
	}
}

const tick = () => {
	let speedX = -2;
	if (ground.complete) {
		floorX += speedX ;
		let height = canvas.height;
		let imgWidth = 2000;
		ctx.drawImage(ground, floorX, canvas.height - height, imgWidth, height);
		ctx.drawImage(ground, floorX + imgWidth , canvas.height - height, imgWidth, height);
		floorY = canvas.height - height;

		if (floorX <= -imgWidth) {
			floorX += imgWidth;
		}
	}

	rayman.tick()
	ennemi.tick();

	if (other != 0){
		for (let i = 0; i < other; i++){
			spriteList[i].tick()			
		}
	}
	
	for (let i = 0; i < punchList.length; i++) {
		punchList[i].tick();
	}

	window.requestAnimationFrame(tick);
}

