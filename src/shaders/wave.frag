precision highp float;

uniform float time;
uniform vec2 mouse;
uniform vec2 rez;

varying vec2 vUv;

void main() {
  
   vec3 color1 = vec3(0.152, 0.070, 0.235); // $violet
   vec3 color2 = vec3(0.831, 0.129, 0.717); // #d421b7

   float mouseProgress = (mouse.x + 1.) / 2.;
   float mixValue = smoothstep(mouseProgress - .01, mouseProgress + .01, vUv.x);

   vec3 finalColor = mix(color1, color2, mixValue);

   gl_FragColor = vec4(finalColor, 1.);

}