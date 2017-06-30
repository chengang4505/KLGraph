attribute vec2 a_position;
attribute vec2 a_uv;
attribute float a_size;
attribute vec4 a_color;

uniform mat3 u_matrix;
uniform sampler2D u_image;


varying vec2 v_texCoord;
varying float size;
varying vec4 label_color;

void main() {
gl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);
v_texCoord = a_uv;
size = a_size;
label_color = a_color;
}
