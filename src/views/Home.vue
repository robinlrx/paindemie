<template>
	<section class="home">
		<Loader/>

		<div class="papi">
			<img src="../assets/img/papi.png" alt="">
		</div>
		<div class="txt-container">
			<div class="txt">
				<h1>PA<span>[i]</span>NDEMIE</h1>
				<h2>Eh papi c'est quoi une pandémie !?</h2>
				<router-link :to="'room'" tag="a">Lancer le jeu</router-link>
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
		}
	},
	components: {
		Loader
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.home {
	width: 100%;
	height: 100vh;
	background-color: $dark-green;
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
		font-family: $chelsea-font;
		font-size: 6rem;
		margin: 0;
		color: $white;
		span {
			color: $yellow;
		}
	}

	h2 {
		font-family: $chantal-font;
		font-weight: 300;
		font-style: normal;
		color: white;
		font-size: 1.6rem;
		margin-top: 0;
		margin-bottom: 50px;
	}

	a {
		font-family: $chantal-font;
		border: solid 3px $orange;
		font-weight: 300;
		font-size: 1.4rem;
		text-decoration: none;
		color: white;
		background-color: $orange;
		padding: 10px 50px;
		border-radius: 50px;
		transition: all .2s ease;

		&:hover {
		background-color: transparent;
		color: $orange;
		}
	}
}
</style>
