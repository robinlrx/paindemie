<template>
	<div class="room">
		<Scene />
		<Objet />
		<!-- <Counter/> -->
	</div>
</template>

<script>
// @ is an alias to /src
import Scene from '@/components/Scene.vue'
import Objet from '@/components/Objet.vue'
// import Counter from '@/components/Counter.vue'

export default {
	components: {
		Scene,
		Objet
		// Counter
	}
}

</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

body{
	overflow-x: hidden;
}
</style>
