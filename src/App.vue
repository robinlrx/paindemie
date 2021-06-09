<template>
	<div id="app">
		<!-- <div class="phone-hide">
			<h4>Pa<span>[i]</span>ndemie</h4>
			<p class="phone-message">Cette expérience n'est pas disponible sur tablette et mobile.</p>
		</div> -->
		<div id="nav">
			<router-link to="/">Intro</router-link> |
			<router-link to="/home">Home</router-link> |
			<router-link to="/room">Room</router-link> |
			<router-link to="/loose">Loose</router-link>
		</div>
		<router-view/>
	</div>
</template>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

::after,
::before {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

::selection{
	background-color: $red;
	color: $cream;
}

html, body {
	margin: 0;
	padding: 0;
	overflow: hidden;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
	position: fixed;
	width: 100%;
	// A supprimer
	z-index: 4;

	a {
		font-weight: bold;
		color: $white;

		&.router-link-exact-active {
		color: $yellow;
		}
	}
}

.phone-hide {
	display: none;
}
@media (max-width: 1024px) {
.phone-hide {
	display: flex;
	flex-direction: column;
	gap: .5em;
	position: absolute;
	height: 100vh;
	width: 100%;
	background-color: $red;
	z-index: 10;
	justify-content: center;

	h4 {
		margin: 0;
		font-family: $chelsea-font;
		font-size: 2.5rem;
		color: $cream;
		letter-spacing: 5px;
		text-transform: uppercase;

		span {
			color: $yellow;
		}
	}

	p {
		margin: 0;
		font-family: $chelsea-font;
		color: $cream;
		font-size: 2rem;
		padding: 20px;
	}
}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
