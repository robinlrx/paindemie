<template>
	<div ref="container" v-on:click="onClick" @mouseover="onMouseOver">
		<canvas ref="canvas" class="canvas"></canvas>
	</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
	mounted () {
		this.init()
		this.addTooltip(new THREE.Vector3(0.9779594454558286, 0.056559551981131675, 0.20098840793295), 'bouton 1')
		this.addTooltip(new THREE.Vector3(-0.8552268622038501, 0.0684633860882658, 0.5137117663926783), 'bouton 2')
	},
	methods: {
		init () {
			const container = this.$refs.container
			console.log(container)
			// Setup Scene
			this.scene = new THREE.Scene()
			this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)

			this.renderer = new THREE.WebGLRenderer({
				canvas: this.$refs.canvas,
				alpha: true,
				antialias: true
			})
			this.renderer.setSize(window.innerWidth, window.innerHeight)
			this.renderer.setPixelRatio(window.devicePixelRatio)

			window.addEventListener('resize', () => {
				this.renderer.setSize(window.innerWidth, window.innerHeight)
				this.renderer.setPixelRatio(window.devicePixelRatio)
				this.camera.aspect = window.innerWidth / window.innerHeight
				this.camera.updateProjectionMatrix()
			})

			// Display axes
			const axesHelper = new THREE.AxesHelper(100)
			this.scene.add(axesHelper) // The X axis is red. The Y axis is green. The Z axis is blue.

			// Orbit controls
			const controls = new OrbitControls(this.camera, this.$refs.canvas)
			this.camera.position.set(-3, 0, 0)
			controls.rotateSpeed = 0.5
			controls.enableZoom = false
			controls.enablePan = false
			controls.update()

			// Sphere
			const sphereGeometry = new THREE.SphereGeometry(50, 32, 32) // rayon , widthSeg, heightSeg
			const room = require('../assets/img/360.jpg')
			const textureLoader = new THREE.TextureLoader()
			const texture = textureLoader.load(room)
			texture.wrapS = THREE.RepeatWrapping
			texture.repeat.x = -1
			const sphereMaterial = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide
			})
			// sphereMaterial.transparent = true
			const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
			this.scene.add(sphere)

			// // ici
			// addTooltip(position)

			// this.camera.position.z = 5
			this.update()
		},

		addTooltip (position, name) {
			const info = require('../assets/img/info.png')
			const map = new THREE.TextureLoader().load(info)
			const material = new THREE.SpriteMaterial({
				map: map
			})

			const sprite = new THREE.Sprite(material)
			sprite.name = name
			this.scene.add(sprite)

			// this.position = new THREE.Vector3(30, 0, 0)
			sprite.position.copy(position.clone().normalize().multiplyScalar(30))
			sprite.scale.multiplyScalar(2)
		},

		onClick (e) {
			const mouse = new THREE.Vector2(
				(e.clientX / window.innerWidth) * 2 - 1,
				-(e.clientY / window.innerHeight) * 2 + 1
			)
			// console.log(mouse)

			const rayCaster = new THREE.Raycaster()
			// console.log(rayCaster)
			// rayCaster.layers.set(1)
			// object.layers.enable(1)
			// console.log(rayCaster.ray.direction)
			rayCaster.setFromCamera(mouse, this.camera)
			const intersects = rayCaster.intersectObjects(this.scene.children)
			console.log(intersects)
			intersects.forEach(function (intersect) {
				if (intersect.object.type === 'Sprite') {
					console.log(intersect.object.name)
					alert(intersect.object.name)
				}
			})

			// console.log(rayCaster.setFromCamera(mouse))
			// const intersects = rayCaster.intersectObject(this.sphere)
			// if (intersects > 0) {
			//  console.log(intersects[0].point)
			//  this.addTooltip(intersects[0].point)
			// }
		},

		onMouseOver (e) {
		},

		update () {
			this.renderer.render(this.scene, this.camera)
			requestAnimationFrame(this.update)
		}
	}
}
</script>

<style scoped lang="scss">
div {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
