 precision mediump float;

vec4 color = vec4(77, 72, 91,255);

varying vec2 v_texCoord;
uniform sampler2D u_image;


void main() {
    color = color / 255.0;
   vec4 color0 = texture2D(u_image, v_texCoord);
   gl_FragColor = color * color0.w;
}