<template>
	<transition name="fade"> <!--  v-if="showNewspaper" -->
		<section>
			<Lottie/>
			<Motion :src="'assets/videos/intro-scene/intro-1.mp4'" :timerPause.sync="timerPause" :showNextComposant.sync="showLastTuto" /> <!-- lastVideoSrc() -->
			<transition name="fade">
				<LastTuto v-if="showLastTuto" :showLastTuto.sync="showLastTuto" :timerPause.sync="timerPause" :showFirstPage.sync="showFirstPage" />
			</transition>
			<!-- <SecondPageTuto :timerPause.sync="timerPause" /> -->
			<FirstPage v-if="showFirstPage" :showFirstPage.sync="showFirstPage" :showSecondPage.sync="showSecondPage" :timerPause.sync="timerPause"/>
			<SecondPage v-if="showSecondPage" :showSecondPage.sync="showSecondPage" :showLastPage.sync="showLastPage"/>
			<LastPage :showLastPage.sync="showLastPage" />
		</section>
	</transition>
</template>

<script>
import FirstPage from '@/components/newspaper/FirstPage.vue'
import SecondPage from '@/components/newspaper/SecondPage.vue'
import LastPage from '@/components/newspaper/LastPage.vue'
// import FirstPageTuto from '@/components/newspaper/FirstPageTuto.vue'
// import SecondPageTuto from '@/components/newspaper/SecondPageTuto.vue'
import LastTuto from '@/components/LastTuto.vue'
import Motion from '@/components/Motion.vue'
import Lottie from '@/components/Lottie.vue'
export default {
	name: 'Newspaper',
	props: {
		showNewspaper: Boolean,
		numChoice: Object,
		myScore: Object,
		timerPause: Boolean
	},
	data () {
		return {
			showFirstPage: false,
			showSecondPage: false,
			showLastPage: false,
			showLastTuto: false
		}
	},
	components: {
		FirstPage,
		SecondPage,
		LastPage,
		// FirstPageTuto,
		// SecondPageTuto
		LastTuto,
		Motion,
		Lottie
	},
	methods: {
		lastVideoSrc () {
			if (this.myScore[7].answer === 1) {
				return this.numChoice.btn1.motionChoice
			} else {
				return this.numChoice.btn2.motionChoice
			}
		}
	},
	watch: {
		timerPause (newValue) {
			this.$emit('update:timerPause', newValue)
		}
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

section {
	cursor: default;
}

</style>
