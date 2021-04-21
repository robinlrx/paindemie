<template>
	<div ref="container" v-on:click="onClick" v-on:mousemove="onMousemove">
		<canvas ref="canvas" class="canvas"></canvas>
	</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
	props: {
		etape: Object
	},
	data (e) {
		return {
			tall: 0,
			sprite: null,
			plane: null,
			rayCaster: new THREE.Raycaster(),
			mouse: new THREE.Vector2()
		}
	},
	mounted () {
		console.log('etape:', this.etape)
		// console.log('currentEtape:', this.currentEtape)
		this.init()
		this.addCoronaObject(new THREE.Vector3(this.etape.c1.x, this.etape.c1.y, this.etape.c1.z), 'choice1', this.etape.objet1.url)
		this.addCoronaObject(new THREE.Vector3(this.etape.c2.x, this.etape.c2.y, this.etape.c2.z), 'choice2', this.etape.objet2.url)
		if (this.etape.c3) {
			this.addCoronaObject(new THREE.Vector3(this.etape.c3.x, this.etape.c3.y, this.etape.c3.z), 'choice3', this.etape.objet3.url)
		}
	},
	methods: {
		init () {
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
			// this.renderer.shadowMap.enabled = true
			// this.renderer.shadowMap.type = PCFSoftShadowMap

			window.addEventListener('resize', () => {
				this.renderer.setSize(window.innerWidth, window.innerHeight)
				this.renderer.setPixelRatio(window.devicePixelRatio)
				this.camera.aspect = window.innerWidth / window.innerHeight
				this.camera.updateProjectionMatrix()
			})

			// Display axes
			const axesHelper = new THREE.AxesHelper(500)
			this.scene.add(axesHelper) // The X axis is red. The Y axis is green. The Z axis is blue.

			// Orbit controls
			const controls = new OrbitControls(this.camera, this.renderer.domElement)
			this.camera.position.set(0, 0, 5)
			controls.rotateSpeed = 0.5
			controls.enableZoom = false
			controls.enablePan = false
			// controls.minPolarAngle = 0 // vertical
			// controls.maxPolarAngle = Math.PI * 0.5 // vertical
			controls.minAzimuthAngle = Math.PI - 0.5 // radians (axe  horizontal)
			controls.maxAzimuthAngle = 0.5 // radians (axe  horizontal)
			controls.update()

			// Sphere
			const sphereGeometry = new THREE.SphereGeometry(50, 32, 32) // rayon , widthSeg, heightSeg
			const room = this.etape.imageScene
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

			const light = new THREE.PointLight(0xffffff, 1, 0)
			light.position.set(1, 1, 100)
			this.scene.add(light)

			// this.camera.position.z = 5
			this.update()
		},

		// Fonction pour les afficher les icones cliquables
		addCoronaObject (position, name, icon) {
			const manager = new THREE.LoadingManager()
			const iconsLoader = new THREE.TextureLoader(manager)
			const icons = iconsLoader.load(icon)
			// const spriteMaterial = new THREE.SpriteMaterial({
			// map: icons,
			// sizeAttenuation: true,
			// depthTest: false
			// })

			// this.sprite = new THREE.Sprite(spriteMaterial)
			// this.sprite.name = name
			// this.scene.add(this.sprite)

			const geometry = new THREE.PlaneBufferGeometry()
			const material = new THREE.MeshBasicMaterial({
				map: icons,
				transparent: true
			})
			this.plane = new THREE.Mesh(geometry, material)
			this.plane.name = name
			this.scene.add(this.plane)

			this.plane.position.copy(position.clone().multiplyScalar(40))
			this.plane.lookAt(this.camera.position)
			if (name === 'choice1') {
				this.plane.scale.set(this.etape.objet1.width / 30, this.etape.objet1.height / 30, 1)
			} else if (name === 'choice2') {
				this.plane.scale.set(this.etape.objet2.width / 30, this.etape.objet2.height / 30, 1)
			} else {
				this.plane.scale.set(this.etape.objet3.width / 30, this.etape.objet3.height / 30, 1)
			}
		},

		onClick (e) {
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			console.log('direction xyz point')
			console.log(this.rayCaster.ray.direction)
			this.rayCaster.setFromCamera(this.mouse, this.camera)
			const intersects = this.rayCaster.intersectObjects(this.scene.children)
			console.log(intersects)

			intersects.forEach(intersect => {
				// Si on clique sur un sprite (les icones)
				if (intersect.object.geometry.type === 'PlaneGeometry' && intersect.object.name === 'choice1') {
					console.log(`nom : ${intersect.object.name}`)
					console.log(intersect.object)
					this.$emit('objectClicked')
					this.$emit('buttonSend', intersect.object.name)
				} else if (intersect.object.geometry.type === 'PlaneGeometry' && intersect.object.name === 'choice2') {
					console.log(`nom : ${intersect.object.name}`)
					this.$emit('objectClicked')
					this.$emit('buttonSend', intersect.object.name)
				}
			})
		},
		// MouseMove
		onMousemove (e) {
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			this.rayCaster.setFromCamera(this.mouse, this.camera)
			const planes = this.scene.children.filter(obj => obj.name === 'choice2')
			const intersects = this.rayCaster.intersectObjects(planes)
			// Si on est sur un object
			// Alors intersects à une length
			intersects.forEach(plane => {
				console.log('intersection')
				plane.object.material.color.set(0x0066CC)
			})

			if (intersects.length === 0) {
				planes.forEach(ch => ch.object.material.color.set(0xffffff))
			}
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
