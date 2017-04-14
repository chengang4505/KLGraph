attribute vec2 a_position;
attribute vec2 a_uv;

uniform mat3 u_matrix;
uniform sampler2D u_image;


varying vec2 v_texCoord;

void main() {
gl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);
v_texCoord = a_uv;
}
