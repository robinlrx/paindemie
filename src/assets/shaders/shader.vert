varying vec2 vUv;
varying vec3 vecPos;

void main() {
	vUv = uv;

	vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
	gl_Position = projectionMatrix * vec4(vecPos, 1.0);
}