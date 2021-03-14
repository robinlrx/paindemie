<template>
	<section class="home">
		<Loader @click.native="loaderClick" v-bind:class="{display: visible}" />

		<div class="papi">
			<img src="../assets/img/papi.png" alt="">
		</div>
		<div class="txt-container">
			<div class="txt">
				<h1>PA<span>[i]</span>NDEMIE</h1>
				<h2>Eh papi c'est quoi une pandémie !?</h2>
				<router-link :to="'about'" tag="a">Lancer le jeu</router-link>
			</div>
		</div>

	</section>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
	name: 'Home',
	data () {
		return {
			visible: false
		}
	},
	components: {
		Loader
	},
	methods: {
		loaderClick () {
			console.log('test click')
			this.visible = !this.visible
		}
	}
}
</script>

<style lang="scss" scoped>

.display {
	display: none;
}

.home {
	width: 100%;
	height: 100vh;
	background-color: #2A6864;
	display: flex;
	// justify-content: center;
	// align-items: center;
	// border: solid yellow;

	.papi {
		width: 50%;
		// border: solid red;
		align-self: flex-end;

		img {
			width: 70%;
		}
	}

	.txt-container {
		width: 50%;
		// border: solid blue;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.txt {
	text-align: right;
	// border: solid yellow;
	width: max-content;

	h1 {
		font-family: 'Chelsea Market', cursive;
		font-size: 6rem;
		margin: 0;
		color: white;
		span {
			color: #FFCD1D;
		}
	}

	h2 {
		font-family: chantal, sans-serif;
		font-weight: 300;
		font-style: normal;
		color: white;
		font-size: 1.6rem;
		margin-top: 0;
		margin-bottom: 50px;
	}

	a {
		font-family: chantal, sans-serif;
		border: solid 3px #C84C16;
		font-weight: 300;
		font-size: 1.4rem;
		text-decoration: none;
		color: white;
		background-color: #C84C16;
		padding: 10px 50px;
		border-radius: 50px;
		transition: all .2s ease;

		&:hover {
		background-color: transparent;
		color: #C84C16;
		}
	}
}
</style>
