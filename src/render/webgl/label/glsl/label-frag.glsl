 precision mediump float;

//vec4 color = vec4(77, 72, 91,255);

varying vec2 v_texCoord;
varying float size;
varying vec4 label_color;


uniform sampler2D u_image;
uniform float u_camera_scale;


void main() {
    vec4 color = label_color / 255.0;

    float cutoff = 0.72;
    float offset = 6.0/size * u_camera_scale;

    offset = pow(offset,1.4);

    offset = min((1.0-cutoff),offset);

   float dist = texture2D(u_image, v_texCoord).r;
   float alpha = smoothstep(cutoff - offset, cutoff + offset, dist);
   gl_FragColor = color *alpha;
//   gl_FragColor =  vec4(0, 1,0,1);
}