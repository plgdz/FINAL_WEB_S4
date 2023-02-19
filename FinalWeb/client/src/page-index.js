import {signin} from './sirius-api';
import {Rayman} from './sprite/Rayman.js'

let ray;
let log;
let op = 0;
let logo;
let title;
let size = 10;

window.addEventListener("load", () => {
    logo = document.createElement("div");
    logo.id = "titre";
    logo.style.position = "absolute";
    logo.style.left = 50 + "vw";
    logo.style.top = 25 + "vh";
    logo.style.opacity = 0;
    document.querySelector("#game").append(logo);
    title = document.querySelector("#titre");
    title.innerHTML = '<img src="img/logo.png" />';
    document.querySelector("img").style.width = 100 + "%";
    ray = new Rayman(47, false);
    log = document.querySelector("#container_form");
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }
    setTimeout(login,900);
    setTimeout(grow, 1000);
    tick();
});

const login = () => {
    if (op < 1){
        op += 0.1;
        log.style.opacity = op;
        setTimeout(login, 50);
    } 
    
}

const grow = () => {
    logo.style.opacity = 1;
    if (size < 500) {
        size += 20
        logo.style.height = size / 2 + "px";
        logo.style.width = size + "px";
        logo.style.transform = "translate(-50%, -20%)";
        setTimeout(grow, 50);    
    }
}

const tick = () => {
    ray.tick();
    window.requestAnimationFrame(tick);
}