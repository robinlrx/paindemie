#define PI 3.14159265359
//Nombre de copie de la texture pour faire le contour
#define SAMPLES 20

precision mediump float;

// our texture
uniform sampler2D textureSampler;

// the texCoords passed in from the vertex shader.
varying vec2 UVs;
uniform float thickness;

void main() {

	vec3 targetCol = vec3(0.423, 0.074, 0.247); //The color of the outline #6C133F
	vec4 finalCol = vec4(0);
	float rads = ((360.0 / float(SAMPLES)) * PI) / 180.0;	//radians based on SAMPLES

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

	vec4 tex = texture2D(textureSampler, UVs);
	if(tex.w > 0.0)
	{
		finalCol = tex;   //if the centered texture's alpha is greater than 0, set finalcol to tex
	}

	gl_FragColor = finalCol;
}