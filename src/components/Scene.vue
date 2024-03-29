<template>
	<div ref="container" @click="onClick" @mousemove="onMousemove">
		<canvas ref="canvas" class="canvas"></canvas>
	</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import frag from '../assets/shaders/shader.frag'
import vert from '../assets/shaders/shader.vert'

export default {
	name: 'Scene',
	props: {
		etape: Object,
		showOups: Boolean
	},
	data () {
		return {
			sprite: null,
			plane: null,
			planes: null,
			shaderMaterial: null,
			rayCaster: new THREE.Raycaster(),
			mouse: new THREE.Vector2(),
			html: document.getElementsByTagName('html')[0],
			PCFSoftShadowMap: THREE.PCFSoftShadowMap,
			time: 0,
			tab: []
		}
	},
	mounted () {
		this.init()
		this.addCoronaObject(new THREE.Vector3(this.etape.c1.x, this.etape.c1.y, this.etape.c1.z), 'choice1', this.etape.objet1.url)
		if (this.etape.c2) {
			this.addCoronaObject(new THREE.Vector3(this.etape.c2.x, this.etape.c2.y, this.etape.c2.z), 'choice2', this.etape.objet2.url)
		}
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
			this.renderer.shadowMap.enabled = true
			this.renderer.shadowMap.type = this.PCFSoftShadowMap

			window.addEventListener('resize', () => {
				this.renderer.setSize(window.innerWidth, window.innerHeight)
				this.renderer.setPixelRatio(window.devicePixelRatio)
				this.camera.aspect = window.innerWidth / window.innerHeight
				this.camera.updateProjectionMatrix()
			})

			// Display axes
			// const axesHelper = new THREE.AxesHelper(500)
			// this.scene.add(axesHelper) // The X axis is red. The Y axis is green. The Z axis is blue.

			// Orbit controls
			const controls = new OrbitControls(this.camera, this.renderer.domElement)
			this.camera.position.set(0, 0, 5)
			controls.rotateSpeed = 0.5
			controls.enableZoom = false
			controls.enablePan = false
			controls.minAzimuthAngle = Math.PI - 0.5 // radians (horizontal axe)
			controls.maxAzimuthAngle = 0.5 // radians (horizontal axe)
			controls.update()

			// Sphere
			const sphereGeometry = new THREE.SphereGeometry(50, 32, 32) // rayon , widthSeg, heightSeg
			const room = this.etape.imageScene
			const textureLoader = new THREE.TextureLoader()
			const texture = textureLoader.load(room)
			texture.wrapS = THREE.RepeatWrapping
			texture.repeat.x = -1

			const sphereMaterial = new THREE.MeshLambertMaterial({
				map: texture,
				side: THREE.BackSide
			})

			const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
			sphere.receiveShadow = true
			sphere.material.shadowSide = THREE.DoubleSide
			this.scene.add(sphere)

			// Light
			const light = new THREE.PointLight({
				color: 0xffffff,
				intensity: 0.3,
				distance: 100
			})
			light.shadow.camera.near = 0.1
			light.shadow.camera.far = 100
			light.position.set(2, 2, 1)
			this.scene.add(light)
			light.castShadow = true

			// const sphereSize = 1
			// const pointLightHelper = new THREE.PointLightHelper(light, sphereSize)
			// this.scene.add(pointLightHelper)

			// const ambientLight = new THREE.AmbientLight({
			// color: 0xffffff,
			// intensity: 0.1
			// })
			// this.scene.add(ambientLight)

			this.update()
		},

		// Function to show clickable objects
		addCoronaObject (position, name, icon) {
			const manager = new THREE.LoadingManager()
			const iconsLoader = new THREE.TextureLoader(manager)
			const icons = iconsLoader.load(icon)

			const geometry = new THREE.PlaneBufferGeometry()
			this.shaderMaterial = new THREE.ShaderMaterial({
				uniforms: {
					textureSampler: { type: 't', value: icons },
					thickness: { type: 'f', value: 0.03 },
					hover: { type: 'b', value: false }
				},
				vertexShader: vert,
				fragmentShader: frag,
				transparent: true
			})
			// this.shaderMaterial.uniforms.textureSampler.value = icons
			// this.shaderMaterial.uniforms.thickness.value = 0.05
			this.plane = new THREE.Mesh(geometry, this.shaderMaterial)
			this.plane.name = name
			// this.plane.castShadow = true
			// this.plane.material.shadowSide = THREE.FrontSide
			this.scene.add(this.plane)

			this.plane.position.copy(position.clone().multiplyScalar(45))
			this.plane.lookAt(this.camera.position)
			if (name === 'choice1') {
				this.plane.scale.set(this.etape.objet1.width / 30, this.etape.objet1.height / 30, 1)
			} else if (name === 'choice2') {
				this.plane.scale.set(this.etape.objet2.width / 30, this.etape.objet2.height / 30, 1)
			} else {
				this.plane.scale.set(this.etape.objet3.width / 30, this.etape.objet3.height / 30, 1)
			}
			this.tab.push(this.plane)
		},

		onClick (e) {
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			// console.log('direction xyz point')
			// console.log(this.rayCaster.ray.direction)
			this.rayCaster.setFromCamera(this.mouse, this.camera)
			const intersects = this.rayCaster.intersectObjects(this.scene.children)
			// console.log(intersects)

			intersects.forEach(intersect => {
				// if click on a plane
				if (intersect.object.geometry.type === 'PlaneGeometry' && intersect.object.name === 'choice1') {
					console.log(`nom : ${intersect.object.name}`)
					console.log(intersect.object)
					this.$emit('objectClicked')
					this.$emit('buttonSend', intersect.object.name)
				} else if (intersect.object.geometry.type === 'PlaneGeometry' && intersect.object.name === 'choice2') {
					console.log(`nom : ${intersect.object.name}`)
					this.$emit('objectClicked')
					this.$emit('buttonSend', intersect.object.name)
				} else if (intersect.object.geometry.type === 'PlaneGeometry' && intersect.object.name === 'choice3') {
					console.log(`nom : ${intersect.object.name}`)
					this.$emit('update:showOups', true)
					this.$emit('onPenality', -5)
				}
			})
		},

		// MouseMove
		onMousemove (e) {
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			this.rayCaster.setFromCamera(this.mouse, this.camera)
			this.planes = this.scene.children.filter(obj => obj.geometry?.type === 'PlaneGeometry')

			const intersects = this.rayCaster.intersectObjects(this.planes)
			intersects.forEach(plane => {
				this.html.style.cursor = 'pointer'
				plane.object.material.uniforms.hover.value = true
			})

			if (intersects.length === 0) {
				this.html.style.cursor = 'move'
				this.planes.forEach((plane) => {
					plane.material.uniforms.hover.value = false
				})
			}
		},
		update () {
			// have the contour animation at each clickable object
			if (this.shaderMaterial !== null) {
				this.tab.forEach(item => {
					item.material.uniforms.thickness.value = 0.05 * (Math.sin(this.time * 0.1) + 1) * 0.5
				})
			}
			this.time++
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
