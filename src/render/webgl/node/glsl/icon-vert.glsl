
 precision mediump float;
attribute vec2 a_position;
attribute float a_size;

attribute float a_icon_uvx1;
attribute float a_icon_uvx2;
attribute float a_icon_uvy1;
attribute float a_icon_uvy2;

uniform mat3 u_matrix;
uniform float u_camera_scale;
uniform float u_sample_ratio;

varying float icons_uv[4];
varying float size;

void main() {
gl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);
size = gl_PointSize  = 1.0/u_camera_scale * a_size*u_sample_ratio;

icons_uv[0] = a_icon_uvx1;
icons_uv[1] = a_icon_uvy1;
icons_uv[2] = a_icon_uvx2;
icons_uv[3] = a_icon_uvy2;
}