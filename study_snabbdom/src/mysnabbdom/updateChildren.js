
import patchVnode from './patchVnode'

//判断是否同一个虚拟节点
function checkSameVnode(a,b){
	return a.sel === b.sel && a.key === b.key;
}


export default function updateChildren(parentElm,oldCh,newCh){
   //旧前
   let oldStartIdx=0;
   //新前
   let newStartIdx=0;
   //旧后
   let oldEmdIdx=oldCh.length-1;
   //新后
   let newEndIdx=newCh.length-1;
   //旧前节点
   let oldStartVnode=oldCh[0];
   //旧后节点
   let oldEndVnode=oldCh[oldEmdIdx];
   //新前节点
   let newStartVnode=newCh[0];
   //新后节点
   let newEndVnode =newCh[newEndIdx];
   //开始大while了
   while(oldStartIdx <= oldEmdIdx && newStartIdx <= newEndIdx){
   	    //首先不是判断---命中，而是要略过已经加undefined标记的的东西
   	    if(oldStartVnode == null || oldCh[oldStartIdx] ==undefined){
   	    	oldStartVnode=oldCh[++oldStartIdx];
   	    }else if(oldEndVnode == null || oldCh[oldEndIdx]==undefined){
   	    	oldEndVnode=oldCh[--oldEndIdx];
   	    }else if(newStartVnode == null || newCh[newStartIdx] ==undefined){
   	    	newStartVnode=newCh[++newStartIdx];
   	    }else if(newEndVnode == null || newCh[newEndIdx] == undefined){
   	    	newEndVnode=newCh[--newEndIdx];
   	    }else if(checkSameVnode(oldStartVnode,newStartVnode)){
   	    	//新前和旧前
   	    	patchVnode(oldStartVnode,newStartVnode);
   	    	oldStartVnode=oldCh[++oldStartIdx];
   	    	newStartVnode=newCh[++newStartIdx];
   	    }else if(checkSameVnode(oldEndVnode,newEndVnode)){
   	    	//新后和旧后
   	    	patchVnode(oldEndVnode,newEndVnode);
   	    	oldEndVnode=oldCh[--oldEmdIdx];
   	    	newEndVnode=newCh[--newEndIdx];
   	    }else if(checkSameVnode(oldStartVnode,newStartVnode)){
   	    	//新后和旧前
   	    	patchVnode(oldEndVnode,newStartVnode);
   	    	//当3新节点与就前命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧后的后面
   	    	//如何移动节点？？只要你插入一个已经在DOM树上的节点，它就会被移动
   	    	parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
   	    	oldStartVnode=oldCh[++oldStartVnode];
   	    	newEndVnode=newCh[--newEndVnode];
   	    }else if(checkSameVnode(oldEndVnode,newStartVnode)){
   	    	//新前和旧后
   	    	patchVnode(oldEndVnode,newStartVnode);

            parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm.nextSibling);
   	    	oldEndVnode=oldCh[--oldEmdIdx];
   	    	newStartVnode=newCh[++newStartIdx];
   	    }else{
   	    	//四种都没有找到
   	    	//寻找key的map
   	    	if(!keyMap){
   	    		keyMap={};
   	    		//从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射的对象
   	    		for(let i=oldStartIdx;i<=oldEmdIdx;i++){
   	    			const key=oldCh[i].key;
   	    			if(key != undefined){
   	    				keyMap[key]=i
   	    			}
   	    		}
   	    	}
             //寻找当前这项(newStartIdx)这项在keyMap中的映射的位置序号
             const idxInOld=keyMap(newStartVnode.key);
   	    	if(idxInOld === undefined){
   	    		//判断，如果idxInOld是undefined表示它是全新的项
   	    		//被加入的项（就是newStartVnode这项）现不是真正的DOM节点
   	    		parentElm.innsertBefore(createElement(newStartVnode),oldStartVnode.elm)

   	    	}else{
   	    		//如果不是undefined，不是全新的项，而是要移动
   	    		const elmToMove =oldCh[idxInOld];
   	    	//	if(elmToMove.elm.nodeType ==1){
		                patchVnode(elmToMove,newStartVnode);
		                //把这项设置为undefined，表示我已经处理完这项了
		                oldCh[idxInOld]=undefined;
		                //移动，调用insertBefore也可以实现移动，
		                parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm
   	    	///	}
   	    	}
   	    	//指针下移，只移动新的头
   	    	newStartVnode=newCh[++newStartIdx]
   	    	//newStartIdx++;
   	    }
   }
   //继续看看有没有剩余的，循环结束了start还是比old小
   if(newStartIdx <= newEndIdx){
   	console.log('new还有剩余节点没有处理，要加载，要把所有剩余的节点，都要插入到oldStartIdx之前');
   	//插入的标杆
   	//const before=newCh(newEndIdx + 1)===null?null:newCh[newEndIdx+1].elm;
   	//遍历新的newCh,添加到老的没有处理的之前
   	for(let i=newStartIdx;i<=newEndIdx;i++){
   		//insertBefore方法可以自动识别null，如果是null就会自动排到队尾去，和appendChild是一致了
   		//newCh[i]现在还没有真正的DOM，所以要调用createElement()函数变为DOM
   		parentElm.insertBefore(createElement(newCh[i]),oldCh[oldStartIdx].elm);
   	}
   }else if(oldStartIdx <= oldEmdIdx;i++){
   	//批量删除oldStart和old指针之间的项
   	for(let i=oldStartIdx;i<=oldEmdIdx;i++){
   		oldCh[i] && parentElm.removeChild(oldCh[i].elm)
   	}
   }