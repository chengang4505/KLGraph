//#ifdef GL_OES_standard_derivatives
//#extension GL_OES_standard_derivatives : enable
//#endif

 precision mediump float;

varying float size;
varying float icons_uv[4];


uniform float u_sample_ratio;
uniform sampler2D u_icons_texture;


vec2 get_icon_uv(vec2 coord){
    float x1 = icons_uv[0];
    float y1 = icons_uv[1];
    float x2 = icons_uv[2];
    float y2 = icons_uv[3];

    float dx = x2-x1;
    float dy = y2-y1;

    return vec2(coord.x * dx + x1,coord.y * dy + y1);
}



void main()
{
    gl_FragColor = texture2D(u_icons_texture,get_icon_uv(gl_PointCoord)).w * vec4(1,1,1,1);
}
