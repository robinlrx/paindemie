<template>
	<transition name="fade">
		<section>
			<Lottie/>

			<Motion :src="lastVideoSrc()" :timerPause.sync="timerPause" :showNextComposant.sync="showSecondMotion" /> <!-- lastVideoSrc() -->

			<Motion v-if="showSecondMotion" :src="'assets/videos/partie-un-fin.mp4'" :timerPause.sync="timerPause" :showNextComposant.sync="showLastTuto" />

			<transition name="fade">
				<LastTuto v-if="showLastTuto" :showLastTuto.sync="showLastTuto" :timerPause.sync="timerPause" :showThirdMotion.sync="showThirdMotion" />
			</transition>

			<Motion v-if="showThirdMotion" :src="'assets/videos/intro-journal.mp4'" :timerPause.sync="timerPause" :showNextComposant.sync="showFirstPage" />

			<transition name="fade">
				<FirstPage v-if="showFirstPage" :showFirstPage.sync="showFirstPage" :showSecondPage.sync="showSecondPage" :timerPause.sync="timerPause"/>
			</transition>

			<transition name="fade">
				<SecondPage v-if="showSecondPage" :showSecondPage.sync="showSecondPage" :timerPause.sync="timerPause"/>
			</transition>
		</section>
	</transition>
</template>

<script>
import FirstPage from '@/components/newspaper/FirstPage.vue'
import SecondPage from '@/components/newspaper/SecondPage.vue'
import LastTuto from '@/components/LastTuto.vue'
import Motion from '@/components/Motion.vue'
import Lottie from '@/components/Lottie.vue'
export default {
	name: 'Newspaper',
	props: {
		numChoice: Object,
		myScore: Array,
		timerPause: Boolean
	},
	data () {
		return {
			showFirstPage: false,
			showSecondPage: false,
			showLastPage: false,
			showLastTuto: false,
			showSecondMotion: false,
			showThirdMotion: false
		}
	},
	components: {
		FirstPage,
		SecondPage,
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
