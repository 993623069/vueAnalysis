import h from './mysnabbdom/h.js';
import patch from './mysnabbdom/patch.js';

var myVodel =h('ul',{},[
      h('p',{},'哈哈'),
      h('p',{},'嘻嘻'),
      h('p',{},'呵呵'),
      h('p',{},h('span',{},[
          h('ol',{},[
             h('li',{},'h'),
              h('li',{},'h'),
              h('li',{},'h'),
               h('li',{},'h')
          	])
      	])),
	])
var myVode2 =h('ul',{},'你好')
// const myVodel = h('h1',{},'你好');
const container =document.getElementById('container')

patch(container,myVodel)
// const dele =document.getElementById('dele')
// dele.onclick=function(){
// 	patch(myVodel,myVode2)
// }