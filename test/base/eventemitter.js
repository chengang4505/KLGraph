import test from 'ava';
import EventEmitter from '../../src/base/EventEmitter';

test('on',t => {
    var e = new EventEmitter();
    
    e.on('test',function () {
        
    })
    t.is(e._listener['test'].length,1);
})


test('emit',t => {
    t.plan(1);
    var e = new EventEmitter();
    e.on('test',function (data) {
        t.is(data,'testdata');
    });
    e.emit('test',['testdata']);
})

test('off',t => {
    var e = new EventEmitter();

    var listen1 = function () {};
    var listen2 = function () {};

    e.on('test',listen1);
    e.on('test',listen2);

    t.is(e._listener['test'].length,2);

    e.off('test',listen1);

    t.is(e._listener['test'].length,1);
    t.is(e._listener['test'].indexOf(listen1),-1);
})