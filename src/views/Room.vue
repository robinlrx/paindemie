<template>
	<div class="room">
		<Scene />
		<div class="objet">
			<img src="../assets/img/gel.png" alt="">
			<p>Eh papi c'est quoi ça !?</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Scene from '@/components/Scene.vue'

export default {
	components: {
		Scene
	}
}
</script>
<style lang="scss" scoped>
body{
	overflow-x: hidden;
}

.objet {
	z-index: 88;
	position: absolute;
	left: 2%;
	bottom: 0;
	display: flex;
	align-items: flex-end;
	// background-color: red;

	img {
		margin: auto;
		height: 150px;
	}

	p {
		margin-bottom: 0;
		font-family: chantal, sans-serif;
		color: #27123C;
		font-size: 1.8rem;
		background-color: rgba(229, 229, 229, .8);
		padding: 10px;
		border-radius: 10px;
	}
}
</style>
