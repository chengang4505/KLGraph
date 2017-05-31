//#ifdef GL_OES_standard_derivatives
//#extension GL_OES_standard_derivatives : enable
//#endif

 precision mediump float;

varying vec4 color;
varying float selected;
varying vec2 uv;
varying float flag;
varying float size;
varying float showicon;



uniform sampler2D u_icons_texture;
uniform vec4 u_borderColor;
uniform float u_sample_ratio;

vec4 borderColor = u_borderColor/255.0;

void main()
{
   float r = 0.0;
   float alpha = 1.0;
   float blur = min(0.05,4.0/size) ;
   float border = min(0.75,0.06*size) ;

if(flag > 0.5 && flag < 1.5) //flag =1 base
{
    vec4 nodecolor = color;
    vec2 cxy = 2.0 * uv - 1.0;
    r = length(cxy);

    if(r > 1.0 ){
        discard;
    }

    if(r > 1.0-blur){
        alpha = 1.0 -  smoothstep(1.0-blur, 1.0, r) ;
     }


     if( selected > 0.5  && r > border && r < border + blur){
        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));
    }

     if( selected > 0.5  &&  r >= border + blur){
        nodecolor = borderColor;
     }

      gl_FragColor = nodecolor * alpha;

}else if(flag > 1.5 && flag < 2.5) {//flag =2 icon
    if(showicon < 0.5) discard;
    gl_FragColor = texture2D(u_icons_texture,uv).w * vec4(1,1,1,1);
}else if((flag > -0.5 && flag < 0.5)){//flat = 0 selected bg

    if(selected < 0.5) discard;

    vec2 cxy = 2.0 * uv - 1.0;
    r = length(cxy);

    if(r > 1.0 ){
        discard;
    }

    r = smoothstep(0.7,1.0,r);

     gl_FragColor = vec4(borderColor.rgb,0.8)*(1.0-r);
//     gl_FragColor = vec4(1.0,0.0,0.0,0.8);
}


//     gl_FragColor = vec4(1.0,0.0,0.0,1.0);


}
