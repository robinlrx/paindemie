<template>
	<div class="room">
		 <transition name="fade">
		<Scene />
		 </transition>
		<Objet />
		<Choices/>
		<!-- <Counter/> -->
	</div>
</template>

<script>
// @ is an alias to /src
import Scene from '@/components/Scene.vue'
import Objet from '@/components/Objet.vue'
import Choices from '@/components/Choices.vue'
// import Counter from '@/components/Counter.vue'

export default {
	components: {
		Scene,
		Objet,
		Choices
		// Counter
	}
}

</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

body{
	overflow-x: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
