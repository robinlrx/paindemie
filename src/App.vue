<template>
	<div id="app">
		<!-- <div class="phone-hide">
			<p class="phone-message">Cette expérience n'est pas disponible sur tablette et mobile.</p>
		</div> -->
		<div id="nav">
			<router-link to="/">Home</router-link> |
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
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: red;

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
	position: absolute;
	height: 100vh;
	width: 100%;
	background-color: $dark-green;
	z-index: 1000;

	p {
		margin: auto;
		font-family: $chelsea-font;
		color: $violet;
		font-size: 2rem;
		padding: 20px;
	}
}
}
</style>
