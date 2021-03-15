<template>
	<div ref="container" v-on:click="onClick" @mouseover="onMouseOver">
		<canvas ref="canvas" class="canvas"></canvas>
	</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import router from '../router/index'

const info = require('../assets/img/brevage.svg')
const info2 = require('../assets/img/manger.svg')
const info3 = require('../assets/img/info.png')
// const url = './'
// const url2 = 'https://www.robinleroux.fr'
// const url3 = './choices'

export default {
	mounted () {
		this.init()
		this.addCoronaObject(new THREE.Vector3(0.9779594454558286, 0.056559551981131675, 0.20098840793295), 'bouton', info)
		this.addCoronaObject(new THREE.Vector3(-0.8552268622038501, 0.0684633860882658, 0.5137117663926783), 'bouton', info2)
		this.addCoronaObject(new THREE.Vector3(0.8832757217121453, -0.45176804771973644, -0.1254178236670794), 'bouton 3', info3)
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
			const room = require('../assets/img/room.jpg')
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

			// this.camera.position.z = 5
			this.update()
		},

		// Fonction pour les afficher les icones cliquables
		addCoronaObject (position, name, icon, route) {
			const icons = new THREE.TextureLoader().load(icon)
			const spriteMaterial = new THREE.SpriteMaterial({
				map: icons
			})

			const sprite = new THREE.Sprite(spriteMaterial)
			sprite.name = name
			// sprite.userData = { route: route } // on peut mettre nos données
			this.scene.add(sprite)

			// this.position = new THREE.Vector3(30, 0, 0)
			sprite.position.copy(position.clone().normalize().multiplyScalar(30))
			sprite.scale.multiplyScalar(2)
		},

		onClick (e) {
			const mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)

			const rayCaster = new THREE.Raycaster()
			// console.log(rayCaster)
			console.log('direction xyz point')
			console.log(rayCaster.ray.direction)
			rayCaster.setFromCamera(mouse, this.camera)
			const intersects = rayCaster.intersectObjects(this.scene.children)
			console.log(intersects)

			intersects.forEach(function (intersect) {
				// Si on clique sur un sprite (les icones)
				if (intersect.object.type === 'Sprite' && intersect.object.name === 'bouton') {
					console.log(`nom : ${intersect.object.name}`)
					// console.log(`route : ${intersect.object.userData.route}`)
					console.log(intersect.object)
					// const route = intersect.object.userData.route // Avoir accès a l'objet route dans intersect
					// window.open(route)
					// window.location.assign(route)
					// window.location = intersect.object.userData.URL
					router.push('/choices')
				}
				if (intersect.object.type === 'Sprite' && intersect.object.name === 'bouton 3') {
					console.log(`nom : ${intersect.object.name}`)
					// console.log(`route : ${intersect.object.userData.route}`)
					console.log(intersect.object)
					// const route = intersect.object.userData.route // Avoir accès a l'objet route dans intersect
					// window.open(route)
					// window.location.assign(route)
					// window.location = intersect.object.userData.URL
					router.push('/')
				}
			})

			// console.log(rayCaster.setFromCamera(mouse))
			// const intersects = rayCaster.intersectObject(this.sphere)
			// if (intersects > 0) {
			//  console.log(intersects[0].point)
			//  this.addCoronaObject(intersects[0].point)
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
