//#ifdef GL_OES_standard_derivatives
//#extension GL_OES_standard_derivatives : enable
//#endif

 precision mediump float;

varying float size;

uniform float u_sample_ratio;


vec4 color = vec4(0.0,1.0,0.0,1.0);

void main()
{
   float r = 0.0, alpha = 1.0,blur = 4.0 * u_sample_ratio / size ;
   vec4 nodecolor = color;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = length(cxy);


    if(size > 4.0){
        if(r > 1.0 ){
            discard;
        }

        if(r > 1.0-blur && r <=1.0){
            alpha = 1.0 - smoothstep(1.0-blur, 1.0, r);
        }
    }
    gl_FragColor = nodecolor * alpha;
}
