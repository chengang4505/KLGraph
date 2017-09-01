 precision mediump float;

varying vec2 v_texCoord;
varying float size;
varying vec4 label_color;


uniform sampler2D u_image;
uniform vec4 u_text_bg;
uniform float u_camera_scale;


void main() {
    vec4 color = label_color / 255.0;
    vec4 color_bg = u_text_bg/255.0;


    float cutoff = 0.76;
    float offset = 6.0/size * u_camera_scale;

    offset = pow(offset,1.2);

    offset = min((1.0-cutoff),offset);

   float dist = texture2D(u_image, v_texCoord).r;
   float alpha = smoothstep(cutoff - offset, cutoff + offset, dist);
//   gl_FragColor = color *alpha;
   gl_FragColor = mix(color_bg,color,alpha);
}