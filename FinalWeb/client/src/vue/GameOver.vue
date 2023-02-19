<template>
	<div id="background"></div>
    <div id="msg">
        <h1 v-if="this.state == this.win">GAGNÉ</h1>
        <h1 v-else>PERDU</h1>
        <button type="button" @click="backServer">RETOUR</button>
    </div>
</template>

<script>
export default {
	data () {
		return {
			state : "",
            win : "GAME_NOT_FOUND_WIN",
            lost : "GAME_NOT_FOUND_LOST",
		}
	},
	methods: {
		setMessage(status) {
            console.log(status);
			this.state = status;
		},
        backServer(){
            window.history.back();
        }     
	}
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap');
#background {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgb(65, 59, 59);
    opacity: 0.75;
}
#msg {
    position: absolute;
    height: 50px;
    width: 250px;
    background-color: #cfb284e5;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    border: solid 5px #6f5a41cc;
    padding-top: 15px;
    padding-bottom: 30px ;
    text-align: center;
}

button{
    height: 50px;
    width: 100px;
    background: #6f5a41;
    font-size: 1em;
    font-weight: 600;
    position: relative;
    top: -10px;
}
h1{
    font-family: 'Henny Penny', cursive;
    font-size: 2.5em;
    color: #6f5a41;
}

button {
    font-family: 'Poppins', Arial, Verdana;
    color: #cfb284;
}

</style>