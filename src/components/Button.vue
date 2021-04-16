<template>
	<router-link class="btn" :to="buttonLink" tag="a" :class="[buttonSize, buttonStyle]" :disabled="isDisabled">
		<span>[</span><slot /><span>]</span>
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
	color: $red;
	background-color: $yellow;
	border: solid 3px $red;
	box-shadow: 3px 5px $red;
	span {
		color: $white;
	}
	&:hover {
		box-shadow: none;
		color: $yellow;
		background-color: $red;

		span {
			opacity: 0;
		}
	}
}
.button-style2 {
	color: $red;
	background-color: $yellow;
	border: solid 3px $red;
	box-shadow: 3px 5px $red;
	span {
		color: $white;
	}
	&:hover {
		box-shadow: none;
		color: $yellow;
		background-color: $red;
	}
}
.button-style3 {
	color: $red;
	background-color: $cream;
	border: solid 3px $red;
	box-shadow: 3px 5px $red;
	span {
		color: $yellow;
	}
	&:hover {
		box-shadow: none;
		color: $cream;
		background-color: $red;
	}
}
.btn {
	font-family: $chelsea-font;
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
