
 precision mediump float;
attribute vec2 a_position;
attribute vec4 a_color;
attribute float a_size;
attribute float a_img;
attribute float a_selected;

uniform mat3 u_matrix;
uniform float u_camera_scale;
uniform float u_sample_ratio;

varying float size;
varying vec4 color;
varying float img;
varying float selected;

void main() {

gl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);
size = gl_PointSize  = 1.0/u_camera_scale * a_size*u_sample_ratio;
color = a_color/255.0;
img = a_img;
selected = a_selected;

}
