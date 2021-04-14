<template>
	<router-link class="btn" :to="buttonLink" tag="a" :class="[buttonSize, buttonStyle]" :disabled="isDisabled">
		<slot />
	</router-link>
</template>

<script>
export default {
	name: 'Button',
	props: {
		size: {
			type: Number,
			required: false,
			default: 1
		},
		type: {
			type: Number,
			required: false,
			default: 1
		},
		link: {
			type: String,
			required: false
		},
		// eslint-disable-next-line vue/require-prop-type-constructor
		isDisabled: false
	},
	data: () => {
		return {}
	},
	computed: {
		buttonSize: function () {
			return 'button-size' + this.$props.size
		},
		buttonStyle: function () {
			return 'button-style' + this.$props.type
		},
		buttonLink: function () {
			return this.$props.link
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.button-size1 {
  font-size: 1.4rem;
}
.button-size2 {
  font-size: 1.2rem;
}
.button-style1 {
	color: $white;
	background-color: $orange;
	border: solid 3px $orange;
	&:hover {
		background-color: transparent;
		color: $orange;
	}
}
.button-style2 {
	background-color: transparent;
	color: $white;
	border: 3px solid $white;
	&:hover {
		background-color: $white;
		color: rgba(0, 0, 0, 0.5);
	}
}
// .button-style3 {
// background-color: transparent;
// color: $invoxia-blue;
// border: 3px solid $invoxia-blue;
// }
.btn {
	font-family: $chantal-font;
	font-weight: 300;
	text-decoration: none;
	padding: 10px 50px;
	border-radius: 50px;
	transition: all 0.3s ease-out;
	&:hover {
		transition: all 0.3s ease-out;
	}
}
</style>
