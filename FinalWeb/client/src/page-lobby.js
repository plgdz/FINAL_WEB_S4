import {gameListLoop, joinSiriusGame, signout, registerLobbyCallbacks} from './sirius-api';
import {createApp} from 'vue';
import VueServer from './vue/AppLobby.vue';
import CardPlayer from './vue/VuePlayer.vue';

let appServer;
let appPlayer;

let listServ;
let vuePlayer;

let mountServ = false;

window.addEventListener("load", () => {
    registerLobbyCallbacks(listUpdate, playerInfo);
    gameListLoop();

    document.querySelector("#signout ").onclick = signout;
});

/**
 * Liste des parties du jeu. Cette fonction est appelée automatiquement à chaque 4 secondes environ.
 * Vous devrez modifier cette fonction afin d'utiliser Vue au lieu de manipuler le DOM directement.
 *
 * Chaque partie contient plusieurs informations (ex : level, name, id, etc)
 * @param {*} list de parties
 */
const listUpdate = list => {
    if(mountServ){
        listServ = appServer.unmount();
        mountServ = false;
    }
    appServer = createApp(VueServer);
    listServ = appServer.mount("#container");
    mountServ = true;

    list.forEach(game => {
        listServ.generateList(game);
    });
}


/**
 * Fonction automatiquement appelée 1 fois, permettant d'avoir des informations sur votre personnage
 * @param {*} data du joueur (sa classe, son nom, son niveau, etc)
 */
const playerInfo = data => {
    appPlayer = createApp(CardPlayer);
    vuePlayer = appPlayer.mount('#hero');

    vuePlayer.setPlayer(data);
}
