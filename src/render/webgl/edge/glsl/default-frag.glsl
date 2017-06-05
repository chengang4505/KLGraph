precision mediump float;
varying vec4 color;
varying float dis;
varying float dashed;
varying float flag;
varying float u;


void main(){

if(flag > -0.5 && flag < 0.5){//edge
    float n = 800.0/dis;
    float dot = mod(u*100.0,n);
    if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;
}

//gl_FragColor = vec4(u,u,u,1)*0.5;
gl_FragColor = vec4(color.rgb * color.a,color.a);

}