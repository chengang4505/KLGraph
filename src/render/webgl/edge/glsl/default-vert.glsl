attribute vec2 a_position;
attribute vec2 a_normal;
attribute vec4 a_color;
attribute float a_size;
attribute float a_dis;
attribute float a_dashed;
attribute float a_flag;
attribute float a_u;

uniform mat3 u_matrix;

varying vec4 color;
varying float dis;
varying float dashed;
varying float flag;
varying float u;

void main() {

vec2 pos  = a_position + a_normal * a_size;
gl_Position = vec4((u_matrix*vec3(pos,1)).xy,0,1);
dis = a_dis;
dashed = a_dashed;
flag = a_flag;
color = a_color/255.0;
u = a_u;
}
