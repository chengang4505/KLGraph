//#ifdef GL_OES_standard_derivatives
//#extension GL_OES_standard_derivatives : enable
//#endif

 precision mediump float;

varying vec4 color;
varying float img;
varying float selected;
varying vec2 uv;
varying float flag;
varying float showicon;


//uniform sampler2D u_textures[10];
uniform sampler2D u_icons_texture;
uniform vec4 u_borderColor;
uniform float u_sample_ratio;


vec4 borderColor = u_borderColor/255.0;

void main()
{
   float r = 0.0, alpha = 1.0,
   blur = 0.05 ,
   border = 0.75 ;


if(flag > 0.5 && flag < 1.5) //flag =1
{
    vec4 nodecolor = color;
    vec2 cxy = 2.0 * uv - 1.0;
    cxy = abs(cxy);


//     if( selected > 0.5  && r > border && r < border + blur){
//        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));
//    }

     if(  selected > 0.5 && (cxy.x > 0.65  ||  cxy.y > 0.65)){
        nodecolor = borderColor;
     }

      gl_FragColor = nodecolor * alpha;

}else if(flag > 1.5 && flag < 2.5) {//flag =2
    if(showicon < 0.5) discard;
    gl_FragColor = texture2D(u_icons_texture,uv).w * vec4(1,1,1,1);
}else if((flag > -0.5 && flag < 0.5)){//flat = 0 selected background

    if(selected < 0.5) discard;

     vec2 cxy = 2.0 * uv - 1.0;
     r = length(cxy);

     if(r > 1.0 ){
         discard;
     }

     r = smoothstep(0.6,1.0,r);

      gl_FragColor = vec4(1.0,0.0,0.0,0.3)*(1.0-r);
 }


}
