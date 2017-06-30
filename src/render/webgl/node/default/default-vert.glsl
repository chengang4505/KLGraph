
 precision mediump float;
attribute vec2 a_position;
attribute vec4 a_color;
attribute vec2 a_uv;
attribute float a_selected;
attribute float a_flag;
attribute float a_size;
attribute float a_showicon;
attribute vec2 a_center;

uniform mat3 u_matrix;
uniform float u_camera_scale;
uniform float u_sample_ratio;

varying vec4 color;
varying float selected;
varying vec2 uv;
varying float flag;
varying float size;
varying float showicon;


void main() {

    float zindex = 0.1;

    if(a_selected > 0.5) zindex = 0.05;


    gl_Position = vec4((u_matrix*vec3((a_position+a_center),1)).xy,zindex,1);
    color = a_color/255.0;
    selected = a_selected;
    uv = a_uv;
    flag = a_flag;

    size = a_size / u_camera_scale ;
    showicon = a_showicon;
}
