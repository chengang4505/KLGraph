attribute vec2 a_position;
attribute vec2 a_normal;
attribute vec4 a_color;
attribute float a_size;

uniform mat3 u_matrix;

varying vec4 color;

void main() {

vec2 pos  = a_position + a_normal * a_size;
gl_Position = vec4((u_matrix*vec3(pos,1)).xy,0,1);

color = a_color/255.0;
}
