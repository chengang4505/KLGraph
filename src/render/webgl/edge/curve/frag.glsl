#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

precision mediump float;
varying vec4 color;
varying vec2 uv;
varying float dis;
varying float flag;
varying float dashed;
varying float size;
varying float end_ratio;
varying float start_ratio;

uniform float u_camera_scale;



void main(){
        float width = size / u_camera_scale;
        float blur = clamp(0.6,0.05,width*1.0) ;
        width = width + blur;
        float blur_ratio = blur / width;
        float scale = 1.0;

        if(flag > -0.5 && flag < 0.5){//curve
                vec2 px = dFdx(uv);
                vec2 py = dFdy(uv);

                float fx = 2.0 * uv.x * px.x - px.y;
                float fy = 2.0 * uv.y * py.x - py.y;

                float sd = (uv.x * uv.x - uv.y) / sqrt(fx * fx + fy * fy);

                float alpha = 1.0 - abs(sd) / width;
                if (alpha < 0.0 || uv.x < end_ratio || uv.x > start_ratio) discard;

                float n = 800.0/dis;
                float dot = mod(uv.x*100.0,n);
                if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;

                if(alpha < blur_ratio) scale = smoothstep(0.0,blur_ratio,alpha);

                gl_FragColor = color*scale;

        }else if(flag > 0.5 && flag < 1.5){//arrow
                gl_FragColor = color;
        }


}