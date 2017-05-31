 precision mediump float;

vec4 color = vec4(0.8,0.8,0.8,0.8);


uniform vec4 u_bg_color;


void main() {
    vec4 color = u_bg_color / 255.0;
    color = vec4(color.rgb * color.a,color.a);
   gl_FragColor = color;
}