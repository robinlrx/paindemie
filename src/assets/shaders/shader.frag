precision highp float;

varying vec2 vUv;
uniform sampler2D textureSampler;
uniform vec2 u_resolution;
uniform float thickness;

void main() {

	float offset = thickness;
	vec4 outlineColor = vec4(1.0, 1.0, 1.0, 1.0);

	//canal RGB
	vec3 color = texture2D(textureSampler, vUv).rgb;

	//canal alpha
	float alpha = texture2D(textureSampler, vUv).a;

	//offset four direction
	vec2 uvLeft = vec2(vUv.x - offset, vUv.y);
	float alphaleft = texture2D(textureSampler, uvLeft).a;

	vec2 uvRight = vec2(vUv.x + offset, vUv.y);
	float alpharight = texture2D(textureSampler, uvRight).a;

	vec2 uvUp = vec2(vUv.x, vUv.y + offset);
	float alphaup = texture2D(textureSampler, uvUp).a;

	vec2 uvDown = vec2(vUv.x, vUv.y - offset);
	float alphadown = texture2D(textureSampler, uvDown).a;


	vec2 uvLeftUp = vec2(vUv.x - offset, vUv.y + offset);
	float alphaleftup = texture2D(textureSampler, uvLeftUp).a;

	vec2 uvRightUp = vec2(vUv.x + offset, vUv.y + offset);
	float alpharightup = texture2D(textureSampler, uvRightUp).a;

	vec2 uvRightDown = vec2(vUv.x + offset, vUv.y - offset);
	float alpharightdown = texture2D(textureSampler, uvRightDown).a;

	vec2 uvLeftDown = vec2(vUv.x - offset, vUv.y - offset);
	float alphaleftdown = texture2D(textureSampler, uvLeftDown).a;


	//Empile les masques
	float alphaMask = alphaleft + alpharight + alphaup + alphadown + alphaleftup + alpharightup + alphaleftdown + alpharightdown;
	alphaMask = clamp(alphaMask, 0.0, 1.0);
	alphaMask = alphaMask - alpha;

	//Couleur de contour
	vec4 outline = vec4(alphaMask) * outlineColor;

	//Compositing

	vec4 finalcolor = vec4(color - vec3(alphaMask), alpha);
	finalcolor = clamp(finalcolor, 0.0,1.0);

	vec4 finalImage = outline + finalcolor;

	//out
	gl_FragColor = finalImage;

}