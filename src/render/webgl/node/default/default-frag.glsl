//#ifdef GL_OES_standard_derivatives
//#extension GL_OES_standard_derivatives : enable
//#endif

 precision mediump float;

varying vec4 color;
varying float img;
varying float selected;
varying vec2 uv;
varying float flag;
varying float size;


uniform sampler2D u_textures[10];
uniform sampler2D u_icons_texture;
uniform vec4 u_borderColor;
uniform float u_sample_ratio;







//todo
vec4 getSampleColore(int index,vec2 uv){
    vec4 c;
    if(index == 0){
        c = texture2D(u_textures[0],uv);
    }else if(index == 1){
        c = texture2D(u_textures[1],uv);
    }else if(index == 2){
        c = texture2D(u_textures[2],uv);
    }else if(index == 3){
        c = texture2D(u_textures[3],uv);
    }else if(index == 4){
        c = texture2D(u_textures[4],uv);
    }else if(index == 5){
        c = texture2D(u_textures[5],uv);
    }
    return c;
}

vec4 borderColor = u_borderColor/255.0;

void main()
{
   float r = 0.0, alpha = 1.0,
   blur = min(0.05,4.0/size) ,
   border = min(0.75,0.04*size) ;

if(flag > 0.5 && flag < 1.5) //flag =1 base
{
    vec4 nodecolor = color;
    vec2 cxy = 2.0 * uv - 1.0;
    r = length(cxy);

    if(r > 1.0 ){
        discard;
    }

    if(img >= 0.0){
        nodecolor = getSampleColore(int(img),uv);
    }

    if(r > 1.0-blur && r <=1.0){
        alpha = 1.0 - smoothstep(1.0-blur, 1.0, r);
     }


     if( selected > 0.5  && r > border && r < border + blur){
        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));
    }

     if( selected > 0.5  &&  r >= border + blur){
        nodecolor = borderColor;
     }

      gl_FragColor = nodecolor * alpha;

}else if(flag > 1.5 && flag < 2.5) {//flag =2 icon
    gl_FragColor = texture2D(u_icons_texture,uv).w * vec4(1,1,1,1);
}


}
