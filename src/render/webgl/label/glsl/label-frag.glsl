 precision mediump float;

vec4 color = vec4(77, 72, 91,255);

varying vec2 v_texCoord;
varying float size;


uniform sampler2D u_image;
uniform float u_camera_scale;


void main() {
    color = color / 255.0;

    float cutoff = 0.76;
    float offset = 8.0/size * u_camera_scale;

    offset = pow(offset,1.2);

    offset = min((1.0-cutoff),offset);

   float dist = texture2D(u_image, v_texCoord).r;
   float alpha = smoothstep(cutoff - offset, cutoff + offset, dist);
   gl_FragColor = color *alpha;
}