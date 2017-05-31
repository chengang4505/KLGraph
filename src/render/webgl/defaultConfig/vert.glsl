attribute vec2 a_position;
//attribute vec2 a_uv;

//varying vec2 v_texCoord;
//varying float size;

void main() {
gl_Position = vec4(a_position,0,1);
//v_texCoord = a_uv;
}
