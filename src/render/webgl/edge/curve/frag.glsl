#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

precision mediump float;
varying vec4 color;
varying vec2 uv;
varying float dis;
varying float flag;
varying float dashed;

uniform float u_camera_scale;



void main(){
        float a = 0.8;
        float width = a / u_camera_scale;
        float scale = 1.0;
        float base = 0.6;
        float smooth_factor = 0.4;

        if(flag > -0.5 && flag < 0.5){//curve
                vec2 px = dFdx(uv);
                vec2 py = dFdy(uv);

                float fx = 2.0 * uv.x * px.x - px.y;
                float fy = 2.0 * uv.y * py.x - py.y;

                float sd = (uv.x * uv.x - uv.y) / sqrt(fx * fx + fy * fy);

                float alpha = 1.0 - abs(sd) / width;
                if (alpha < 0.0 || uv.x < 0.0 || uv.x > 1.0) discard;

                float n = 800.0/dis;
                float dot = mod(uv.x*100.0,n);
                if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;

                if(alpha < 0.2) scale = smoothstep(0.0,smooth_factor,alpha);

                gl_FragColor = color*scale;

        }else if(flag > 0.5 && flag < 1.5){//arrow
                gl_FragColor = color;
        }


}