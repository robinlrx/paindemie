<template>
	<div class="room">
		<Scene />
		<Objet />
		<div>
		<Jauge/>
		<Timer/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Scene from '@/components/Scene.vue'
import Objet from '@/components/Objet.vue'
import Jauge from '@/components/Jauge.vue'
import Timer from '@/components/Timer.vue'

export default {
	components: {
		Scene,
		Objet,
		Jauge,
		Timer
	}
}

</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

</style>
