<template>
	<div id="list-server">
        <div id="header-server">
            <div class="etat"><h3>ETAT</h3></div>
            <div class="nom"> <h3>NOM DU SERVEUR</h3> </div>
            <div class="niveau"><h3>NIVEAU</h3></div>
            <div class="joueurs"><h3>JOUEURS</h3></div> 
        </div>
		<div v-bind:key="server.name" v-for="server in servers">
            <div id="info-server" v-on:click="connect(server.id)">
                <div class="etat" v-if="server.nb == server.max_users">
                    <img src="./../../img/icon/full.png" alt="">
                    <h3>Complet</h3>
                </div>
                <div class="etat" v-else>
                    <img src="./../../img/icon/free.png" alt="">
                    Disponnible</div>
                <div class="nom">{{server.name}}</div>
                <div class="niveau">{{server.level}}</div>
                <div class="joueurs">{{server.nb + "/" + server.max_users}}</div> 
            </div>
        </div>
	</div>
</template>

<script>
import {joinSiriusGame} from '../sirius-api';
export default {
	data () {
		return {
			servers : []
		}
	},
	methods: {
		generateList(server) {
			this.servers.push(server);
		},
        connect(id){
            joinSiriusGame(id);
        }
	}
};
</script>
<style scoped>
    #list-server { 
    grid-area: 2 / 4 / 2 / 4 ; 
    background-color:#262b2eef;
    border: 5px #262b2e solid;
    border-radius: 10px;
    height: 80vh;
    overflow: scroll;
    }
    #header-server, #info-server  {
        font-family: 'Poppins', Arial, Verdana;
        color: #fff;
        display: grid;
        grid-template-columns: 20% 50% 15% 15%;
        grid-template-rows: 3em;
        background: #40505898;
    }
    #header-server {
        position: relative;
        background: #262b2e;
    }
    #header-server > div, #info-server > div {
        text-align: center;
        margin: auto;
    }      
    #info-server {     
        border: 1px black solid;
        margin: 10px;
        border-radius: 5px;
        box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    }
    #info-server:hover {
        box-shadow: 0 0 10px rgba(49, 244, 35, 0.5);
        cursor: pointer;
    }

    .etat > img {
        height: 10px;
        margin-right: 10px;
    }

</style>