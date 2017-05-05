attribute vec2 a_position;
//attribute vec2 a_normal;
attribute vec4 a_color;
//attribute float a_size;
attribute vec2 a_uv;
attribute float a_dis;
attribute float a_flag;
attribute float a_dashed;

uniform mat3 u_matrix;

varying vec4 color;
varying vec2 uv;
varying float dis;
varying float flag;
varying float dashed;

void main() {

//vec2 pos  = a_position + a_normal * a_size;
gl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);
uv = a_uv;
dis = a_dis;
flag = a_flag;
color = a_color/255.0;
dashed = a_dashed;
}
