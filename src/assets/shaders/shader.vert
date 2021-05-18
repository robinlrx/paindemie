varying vec2 UVs;
varying vec3 vecPos;

void main() {
	// pass the texCoord to the fragment shader
	// The GPU will interpolate this value between points
	UVs = uv;

	vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
	gl_Position = projectionMatrix * vec4(vecPos, 1.0);
}