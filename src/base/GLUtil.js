'use strict';

import util from '../util'


export var GLComType = {
    FLOAT:{glType:'FLOAT',bytes:4},
    BYTE:{glType:'BYTE',bytes:1},
    SHORT:{glType:'SHORT',bytes:2},
    UNSIGNED_BYTE:{glType:'UNSIGNED_BYTE',bytes:1},
    UNSIGNED_SHORT:{glType:'UNSIGNED_SHORT',bytes:2},
};

export var GlType = {
    FLOAT:{components:1,glType:'FLOAT'},
    FLOAT_VEC2:{components:2,glType:'FLOAT_VEC2'},
    FLOAT_VEC3:{components:3,glType:'FLOAT_VEC3'},
    FLOAT_VEC4:{components:4,glType:'FLOAT_VEC4'},
    INT:{components:1,glType:'INT'},
    INT_VEC2:{components:2,glType:'INT_VEC2'},
    INT_VEC3:{components:3,glType:'INT_VEC3'},
    INT_VEC4:{components:4,glType:'INT_VEC4'},
    BOOL:{components:1,glType:'BOOL'},
    BOOL_VEC2:{components:2,glType:'BOOL_VEC2'},
    BOOL_VEC3:{components:3,glType:'BOOL_VEC3'},
    BOOL_VEC4:{components:4,glType:'BOOL_VEC4'},
    FLOAT_MAT2:{components:4,glType:'FLOAT_MAT2'},
    FLOAT_MAT3:{components:9,glType:'FLOAT_MAT3'},
    FLOAT_MAT4:{components:16,glType:'FLOAT_MAT4'},
    SAMPLER_2D:{components:1,glType:'SAMPLER_2D'},
    SAMPLER_CUBE:{components:1,glType:'SAMPLER_CUBE'},
};

function getType(gl,typeNum) {
    var type = 'FLOAT';
    for(var name in GlType){
        if(gl[name] == typeNum) return name;
    }
    console.error('gl type not found');
    return type;
}


export  function getActiveAttributes (gl,program) {
    var shaderAttrInfos = {};
    var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < numAttribs; ++i) {
        var attribInfo = gl.getActiveAttrib(program, i);
        if (!attribInfo) {
            continue;
        }

        shaderAttrInfos[attribInfo.name] = {};
        shaderAttrInfos[attribInfo.name].type = getType(gl,attribInfo.type);
        shaderAttrInfos[attribInfo.name].size = attribInfo.size;
        shaderAttrInfos[attribInfo.name].location = gl.getAttribLocation(program, attribInfo.name);
    }
    return shaderAttrInfos;
}
export function getActiveUniforms (gl,program) {
    var shaderUniformInfos = {};
    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < numUniforms; ++i) {
        var uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) {
            continue;
        }

        var name = uniformInfo.name;
        // remove the array suffix.
        if (name.substr(-3) === "[0]") {
            name = name.substr(0, name.length - 3);
        }

        shaderUniformInfos[name] = {};
        shaderUniformInfos[name].type = getType(gl,uniformInfo.type);
        shaderUniformInfos[name].size = uniformInfo.size;
        shaderUniformInfos[name].location = gl.getUniformLocation(program, name);
    }
    return shaderUniformInfos;
}

export function calTypeOffset(activeAttributes,config) {
    config = config || {};
    var offsetConfig = {
        config:{},
        strip:0
    };
    var type,num = 0;
    for(var attr in activeAttributes){
        type = activeAttributes[attr].type;
        offsetConfig.config[attr] = {};
        offsetConfig.config[attr].start = num;
        offsetConfig.config[attr].components = GlType[type].components;
        num += GlType[type].components;
    }
    offsetConfig.strip = num;
    return offsetConfig;
}

export function vertexAttribPointer(gl,activeAttributes,offsetConfig) {
    // debugger
    var config = offsetConfig.config;
    var strip = offsetConfig.strip;
    for(var attr in activeAttributes){
        gl.vertexAttribPointer(
            activeAttributes[attr].location,
            config[attr].components,
            gl.FLOAT, false, strip*4, config[attr].start*4
        );
        gl.enableVertexAttribArray(activeAttributes[attr].location);
    }

}

export function checkAttrValid(config,data){

    var type;
    var err = [];
    for(var attr in config){
        if(!config.hasOwnProperty(attr)){
            err.push('shader need attribute: ' + attr);
            continue;
        }

        if(data[attr] == undefined){
            err.push('attribute ['+attr+']: is undefined');
            continue;
        }

        type = config[attr].type;
        if(util.isArray(data[attr]) && data[attr].length != GlType[type].components*config[attr].size){
            err.push('attribute ['+attr+']: size need ' + GlType[type].components);
        }
    }

    return err.length ? err : null;
}


var uniformSetter = {
    FLOAT:function (gl,location,v) {gl.uniform1f(location, v);} ,
    FLOAT_VEC2:function (gl,location,v) {gl.uniform2fv(location, v);} ,
    FLOAT_VEC3:function (gl,location,v) {gl.uniform3fv(location, v);} ,
    FLOAT_VEC4:function (gl,location,v) {gl.uniform4fv(location, v);} ,
    FLOAT_MAT2:function (gl,location,v) {gl.uniformMatrix2fv(location, false, v);} ,
    FLOAT_MAT3:function (gl,location,v) {gl.uniformMatrix3fv(location, false, v);} ,
    FLOAT_MAT4:function (gl,location,v) {gl.uniformMatrix4fv(location, false, v);} ,
    SAMPLER_2D:function (gl,location,v) {
        if(v.length) gl.uniform1iv(location, v);
        else gl.uniform1i(location, v);
    } ,
};


export  function setUniforms(gl,activeUniforms,uniforms){
    var type;
    for(var attr in activeUniforms){
        type = activeUniforms[attr].type;
        uniformSetter[type](gl,activeUniforms[attr].location,uniforms[attr]);
    }
}
