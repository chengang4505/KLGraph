/**
 * Created by chengang on 17-3-29.
 */

import util from '../util'

var defaultConfig = {
    maxLevel:2,
};

function indexN(x,y,rect) {
    var x0 = rect.x,y0 = rect.y, w = rect.w, h = rect.h;
    var right = x > (x0+w/2);
    var top = y > (y0+h/2);
    return top << 1 | right;
}

function indexNs(pointRect,rect) {
    var points = [
        [pointRect.x,pointRect.y],
        [pointRect.x+pointRect.w/2,pointRect.y],
        [pointRect.x,pointRect.y+pointRect.h/2],
        [pointRect.x+pointRect.w/2,pointRect.y+pointRect.h/2],
    ];
    var map = {},n;
    points.forEach(function (e) {
        n = indexN(e[0],e[1],rect);
        map[n] = true;
    })

    return map;
}

function getIndexRect(index,rect) {
    var r;
    switch(index){
        case 0:
            r = {x:rect.x,y:rect.y,w:rect.w/2,h:rect.h/2};
            break;
        case 1:
            r = {x:rect.x+rect.w/2,y:rect.y,w:rect.w/2,h:rect.h/2};
            break;
        case 2:
            r = {x:rect.x,y:rect.y+rect.h/2,w:rect.w/2,h:rect.h/2};
            break;
        case 3:
            r = {x:rect.x+rect.w/2,y:rect.y+rect.h/2,w:rect.w/2,h:rect.h/2};
            break;
    }

    return r;
}


function createNode(level,rect) {
    return {
        level:level||0,
        rect:rect,
        elements:[],
        children:null,
    }
}

function pointRect(n) {
    return {
        x: n.x - n.size,
        y: n.y - n.size,
        w:n.size*2,
        h:n.size*2,
    };
}

export  default class Quad{
    constructor(option){
        this.option = util.extend(defaultConfig,option||{});
        this.root =null;
    }

    index(nodes,option){
        console.time('quadindex');
        option = option || {};

        var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        if(!option.rect){
            nodes.forEach(function (e) {
                if(e.x < x0) x0 = e.x;
                if(e.x > x1) x1 = e.x;
                if(e.y < y0) y0 = e.y;
                if(e.y > y1) y1 = e.y;
            });
            option.rect = {x:x0,y:y0,w:x1-x0,h:y1-y0};
        }


        this.root = createNode(0,option.rect);

        nodes.forEach(function (e) {
            this.insert(e,this.root);
        }.bind(this));
        console.timeEnd('quadindex');

    }

    insert(data,root){
        var pointR = pointRect(data);
        if(root.level < this.option.maxLevel){
            root.children = root.children || new Array(4);
            var indexs = indexNs(pointR,root.rect);
            var e ;
            for(var i in indexs) {
                e = +i;
                if(!root.children[e]) root.children[e] = createNode(root.level+1,getIndexRect(e,root.rect));
                this.insert(data,root.children[e]);
            }
        }else {
            root.elements.push({x:data.x,y:data.y,id:data.id});
        }
    }

    point(x,y){
        return this._point(x,y,this.root);
    }

    _point(x,y,root){
        if(root.children){
            var index = indexN(x,y,root.rect);
            return  root.children[index] ?  this._point(x,y,root.children[index]) : [];
        }else {
            return root.elements;
        }
    }
}