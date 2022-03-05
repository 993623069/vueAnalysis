//真正创建节点。将vnode创建为DOM，插入pivot这个元素之前
export default function createElement(vnode,pivot) {
	console.log('目的是把虚拟节点',vnode,'插入到标杆',pivot,'前')
	//创建一个DOM节点，这个节点现在还是孤儿节点
	var domNode =document.createElement(vnode.sel);
	//有子节点还是有文本？？
	if(vnode.text !== '' && (vnode.children == undefined || vnode.children.length === 0)){
		//它内部是文字
		domNode.innerText =vnode.text;
		//将孤儿节点上树，让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入到标签节点之前
	//	pivot.parentNode.insertBefore(domNode,pivot)
	}else if(Array.isArray(vnode.children) && vnode.children.length > 0){
          for(let i=0;i<vnode.children.length;i++){
          	//得到当前这个children
          	let ch=vnode.children[i];
          	//创建出它的DOM，一旦调用create Element意味者：elm属性有值了，创建出DOM了
          	let chDOM=createElement(ch);
          	//上树
          	domNode.appendChild(chDOM)
          }
	}
	//补充elm属性
	vnode.elm=domNode;
	//返回elm，elm属性是一个纯DOM对象
	return vnode.elm;
}