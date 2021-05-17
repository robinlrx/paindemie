<template>
	<transition name="fade">
		<section class="papi" :style="{'background-image': 'url(' + this.etape.papi + ')'}">

            <div class="cloud-content">
                <img class="cloud" src="../../public/assets/img/nuage-papi.png" alt="">
                <img class="object" :src="this.etape.objet1.url" alt="">
            </div>

		</section>
	</transition>
</template>

<script>

export default {
	props: {
		// numChoice: Object
		etape: Object
	},
	data () {
		return {
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.papi {
	width: 100%;
	height: 100vh;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;

    .cloud-content {
        position: absolute;
        width: 800px;
        border: solid 2px red;

        .cloud {
            width: 100%;
        }

        .object {
            position: absolute;
            border: solid 2px green;
            left: 200px;
            top: 60px

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
