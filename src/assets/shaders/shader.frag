#define PI 3.14159265359
//Nombre de copie de la texture pour faire le contour
#define SAMPLES 20

precision mediump float;

// our texture
uniform sampler2D textureSampler;

// the texCoords passed in from the vertex shader.
varying vec2 UVs;
uniform float thickness;

//boolean pour savoir si on survole ou non
uniform bool hover;

//Je vous ai mis plusieurs filtres possibles, à vous d'utiliser le bon
// https://timseverien.com/posts/2020-06-19-colour-correction-with-webgl/
vec3 adjustContrast(vec3 color, float value) {
return 0.5 + (1.0 + value) * (color - 0.5);
}

vec3 adjustBrightness(vec3 color, float value) {
return color + value;
}

vec3 adjustExposure(vec3 color, float value) {
return (1.0 + value) * color;
}

void main() {

	vec3 targetCol = vec3(1.0, 1.0, 1.0); //The color of the outline #ffffff
	vec4 finalCol = vec4(0);
	float rads = ((360.0 / float(SAMPLES)) * PI) / 180.0;	//radians based on SAMPLES

	// outline
	for(int i = 0; i < SAMPLES; i++)
	{
		if(finalCol.w < 0.9)
		{
			float r = float(i + 1) * rads;
			vec2 offset = vec2(cos(r), -sin(r)) * thickness; //calculate vector based on current radians and multiply by magnitude
			finalCol = texture2D(textureSampler, UVs + offset);	//render the texture to the pixel on an offset UV
			
			if(finalCol.w > 0.1)
			{
				finalCol.xyz = targetCol;
			}
		}
	}

	// image
	vec4 tex = texture2D(textureSampler, UVs);
	if(tex.w > 0.0)
	{
		finalCol = tex;   //if the centered texture's alpha is greater than 0, set finalcol to tex
		//Eclaircir les pixels si on survole
		if(hover){
		//finalCol.xyz = adjustContrast(finalCol.xyz, 0.5);
		finalCol.xyz = adjustBrightness(finalCol.xyz, 0.4);
		//finalCol.xyz = adjustExposure(finalCol.xyz, 0.5);
		}
	}

	gl_FragColor = finalCol;
}