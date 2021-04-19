<template>
	<router-link class="btn" :to="buttonLink" tag="a" :class="[buttonSize, buttonStyle]" :disabled="isDisabled">
		<svg>
			<path d="M594.846 4.28866L597.717 4.31394L595.278 75.6683L6.81547 74.3908C6.80113 74.2098 6.7853 74.0124 6.76795 73.7992C6.66461 72.529 6.50739 70.6972 6.2916 68.4462C5.86011 63.9452 5.19392 57.7632 4.25508 51.0416C3.32898 44.4112 2.63928 35.0701 2.18081 27.3531C1.952 23.5017 1.78148 20.0674 1.66817 17.596C1.61974 16.5395 1.58176 15.6592 1.55417 14.9978C32.2161 11.2821 78.8571 8.1417 119.128 5.82794C142.417 4.4899 163.599 3.42733 178.287 2.69056C189.336 2.13631 196.709 1.76644 198.539 1.60237C198.986 1.56223 200.926 1.53022 204.309 1.51378C207.643 1.49758 212.288 1.49601 218.057 1.50724C229.594 1.52969 245.614 1.60328 264.602 1.71295C302.579 1.93228 352.421 2.29589 401.999 2.68324C451.578 3.07059 500.892 3.48166 537.811 3.7959C556.271 3.95302 571.632 4.08593 582.378 4.17956C587.751 4.22637 591.97 4.26336 594.846 4.28866Z"/>
		</svg>
		<p><span>[</span><slot /><span>]</span></p>
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
// .button-size1 {
//   font-size: 1.4rem;
// }
// .button-size2 {
//   font-size: 1.2rem;
// }

.button-style1 {
	svg {
		path {
			fill:$yellow;
		}
	}
	p {
		color: $red;
		span {
			color: $white;
		}
	}
	&:hover {
		svg {
			path {
				fill:$red;
			}
		}
		p {
			color: $yellow;
			span {
				opacity: 0;
			}
		}
	}
}
.button-style2 {
	svg {
		path {
			fill:$yellow;
		}
	}
	p {
		color: $red;
		span {
			color: $white;
		}
	}
	&:hover {
		svg {
			path {
				fill:$red;
			}
		}
		p {
			color: $yellow;
		}
	}
}
.button-style3 {
	svg {
		path {
			fill:transparent;
		}
	}
	p {
		color: $red;
		span {
			color: $yellow;
		}
	}
	&:hover {
		svg {
			path {
				fill:$red;
			}
		}
		p {
			color: $cream;
		}
	}
}
.btn {
	font-family: $chelsea-font;
	font-weight: 300;
	font-size: 1.6rem;
	text-decoration: none;
	transition: all 0.3s ease-out;

	&:hover {
		transition: all 0.3s ease-out;
	}

	svg {
		width:600px;
		height:78px;
		// box-shadow: 5px 7px 0px 0px $red;

		path {
			stroke:$red;
			stroke-width: 3px;
			transition: all 0.3s ease-out;
		}
	}

	p {
		position: absolute;
		top: 0%;
		left: 13%;
	}
}
</style>
