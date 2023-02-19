<template>
	<div id="card-player">
        <h2>{{player.username}}</h2>
        <img src="./../../img/rayman.gif" alt="">
        <label for="exp">Experience</label>
        <meter id="exp" :min="0" :max="player.next_level_exp - player.base_level_exp" :value="exp"></meter>
        <div id="ligStat">
            <span>NIVEAU :</span>
            <span>{{player.level}}</span>
        </div>
        <div id="ligStat">
            <span>HP :</span>
            <span>{{player.hp}}</span>
        </div>
        <div id="ligStat">
            <span>AGILITE :</span>
            <span>{{player.char_agility}}</span>
        </div>
        <div id="ligStat">
            <span>ENERGIE :</span>
            <span>{{player.char_energy}}</span>
        </div>
        <div id="ligStat">
            <span>FORCE :</span>
            <span>{{player.char_strength}}</span>
        </div>
        <div id="ligStat">
            <span>VITALITE :</span>
            <span>{{player.char_vitality}}</span>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			player : [], 
            max : 0, 
            exp : 0,        
		}
	},
	methods: {
		setPlayer(data) {
            console.log(data);
			this.player = data;
            this.max = data.next_level_exp - data.base_level_exp;
            this.exp = data.exp - data.base_level_exp;
		},
	}
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap');
    #card-player {
        width: 50%;
        background-color: #262b2ece;
        position: relative;
        padding: 20px;
        text-align: center;
        border: 5px #262b2e solid;;
        border-radius: 10px;
    }
    h2 {
        color: #fff;
        font-family: 'Henny Penny', cursive;
        font-size: 3em;
        text-align: center;
    }
    img {
        width: 60%;
        display: block;
        margin: auto;
        margin-bottom: 20px;
    }
    label, #ligStat {
        color: #fff;
        font-family: 'Poppins', Arial, Verdana;
        font-weight: 700;
    }

    #ligStat {
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: .8em;
    }
    meter {
        width: 80%;
    }
</style>