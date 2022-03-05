
import updateChildren from './updateChildren'

export default function patchVnode(oldVnode,newVnode){
		//判断新旧vnode是否是同一个对象
		if(oldVnode === newVnode) return;
		//判断新vnode有没有text属性
		if(newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)){
			//新vnode有text
			console.log('新vnode有text属性')
			if(newVnode.text !== oldVnode.text){
				oldVnode.elm.innerText=newVnode.text;
			}
		}else{
			//新vnode没有text属性，有children
			console.log('新vnode没有text属性')
			//判断老的有没有children
			if(oldVnode.children !== undefined && oldVnode.children.length > 0){
				//老的有children，此时就是很复杂的情况，就是新老都有children
				updateChildren(oldVnode.elm,oldVnode.children,newVnode.children);
			}else{
				//老的没有children，新的有children
				//清空老的节点的内容
				oldVnode.elm.innerHTML='';
				//遍历新的vnode的子节点，创建DOM上树
				for(let i=0;i<newVnode.children.length;i++){
	                let dom=createElement(vnode.children);
				        oldVnode.elm.appendChild(dom);
				}
			
			}
		}
}