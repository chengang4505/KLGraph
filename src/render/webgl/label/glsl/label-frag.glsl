 precision mediump float;

vec4 color = vec4(77, 72, 91,255);

varying vec2 v_texCoord;
uniform sampler2D u_image;


void main() {
    color = color / 255.0;
   float dist = texture2D(u_image, v_texCoord).r;
//   float alpha = smoothstep(0.55, 0.85, dist);
   gl_FragColor = color *dist;
}