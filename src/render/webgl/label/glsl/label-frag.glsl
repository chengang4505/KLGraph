 precision mediump float;

vec4 color = vec4(77, 72, 91,255);

varying vec2 v_texCoord;
varying float size;


uniform sampler2D u_image;
uniform float u_camera_scale;


void main() {
    color = color / 255.0;

    float offset = size * u_camera_scale * 0.12;

    offset = pow(offset,1.5);

    offset = min((1.0-0.72),offset);

   float dist = texture2D(u_image, v_texCoord).r;
   float alpha = smoothstep(0.72 - offset, 0.72 + offset, dist);
   gl_FragColor = color *alpha;
}