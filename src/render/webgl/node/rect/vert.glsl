
 precision mediump float;
attribute vec2 a_position;
attribute vec4 a_color;
attribute vec4 a_icon_color;
attribute float a_img;
attribute vec2 a_uv;
attribute float a_selected;
attribute float a_flag;
attribute float a_showicon;

uniform mat3 u_matrix;
uniform float u_camera_scale;
uniform float u_sample_ratio;

varying vec4 color;
varying vec4 icon_color;
varying float img;
varying float selected;
varying vec2 uv;
varying float flag;
varying float showicon;


void main() {


    gl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);
    color = a_color/255.0;
    img = a_img;
    selected = a_selected;
    uv = a_uv;
    flag = a_flag;
    showicon = a_showicon;
    icon_color = a_icon_color/255.0;
}
