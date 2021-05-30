<template>
	<transition v-if="showPapi" name="fade">
        <div class="container">
			<video ref="papi" autoplay width="250">
				<source :src="this.numChoice.papi.url" type="video/mp4">
			</video>
			<transition name="fade">
				<div class="cloud-content" v-if="showCloud">
					<img class="cloud" src="../../public/assets/img/bulle.gif" alt="">
					<img class="object" :src="this.numChoice.objet.url" alt="">
					<img v-if="this.numChoice.objet.url2" class="object" :src="this.numChoice.objet.url2" alt="">
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		numChoice: Object,
		showPapi: Boolean
	},
	data () {
		return {
			showCloud: false
		}
	},
	mounted () {
		this.closePapi()
	},
	methods: {
		closePapi () {
			const papi = this.$refs.papi
			papi.onended = () => {
				this.$emit('update:showPapi', false)
			}
		},
		openCloud () {
			this.showCloud = true
		}
	},
	created: function () {
		setInterval(() => {
			this.openCloud()
		}, this.numChoice.papi.time)
	}
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.container {
	position: relative;
	width: 100vw;
	height: 100vh;
    z-index: 0;
}
video {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: auto;
    z-index: 0;
}

.cloud-content {
    position: absolute;
    width: 80%;
    z-index: 1;

    .cloud {
        width: 100%;
    }

    .object {
        position: absolute;
        left: 0%;
        top: 8%;
        width: 50%;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
