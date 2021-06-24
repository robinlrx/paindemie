<template>
	<section class="rebus-container">
		<div class="small-cloud-container">
			<div class="rebus-txt">
				<p>La <span>quar</span>-<span>antaine</span> ?</p>
				<img src="../../../public/assets/img/rebus/rebus1.png" alt="">
			</div>
		</div>
		<div class="big-cloud-container">
			<textarea placeholder=". . ." v-model="femme" />
		</div>
		<Button @click.native="check()" :size=3 :type=1 class="button" ref="button" :link="''">C'EST GOOD</Button>
	</section>
</template>

<script>
// import AppInput from '@/components/ui/AppInput.vue'
import Button from '@/components/ui/AppButton.vue'
export default {
	name: 'Rebus',
	data () {
		return {
			input: document.getElementsByTagName('input'),
			badWords: ['quarantaine', 'pénurie', 'attestation'],
			femme: null
		}
	},
	props: {
		showRebus: Boolean
	},
	components: {
		Button
		// AppInput
	},
	methods: {
		check () {
			this.$emit('update:showRebus', false)
		}
	}

}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_variables.scss';

.rebus-container {
	width: 100%;
	height: 100vh;
	background-image: none;
	position: absolute;
}

.clouds {
	width: 100%;
	height: 100%;
}

.big-cloud-container, .small-cloud-container {
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
}

.small-cloud-container {
	background-image: url('../../../public/assets/img/rebus/rebus-smallcloud.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	z-index: 2;
	justify-content: flex-start;
	align-items: center;

	.rebus-txt {
		margin-left: 15%;

		img {
			width: 200px;
		}

		p {
			font-family: $chantal-font;
			color: $violet;
			font-size: 2rem;

			span {
				text-decoration: underline;
			}
		}
	}
}

.big-cloud-container {
	background-image: url('../../../public/assets/img/rebus/rebus-bigcloud.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	justify-content: center;
	align-items: center;

	textarea {
		font-family: $chantal-font;
		font-size: 1.5rem;
		position: relative;
		left: 20%;
		z-index: 3;
		border: none;
		background-color: transparent;
		width: 50%;
		height: 40%;
		resize: none;

		&:focus {
			outline: none;
		}
	}
}

.button {
	position: absolute;
	right: 20px;
	bottom: 10px;
}

</style>
