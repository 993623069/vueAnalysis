
import lookup from './lookup.js'
import parseArray from './parseArray.js'
export default function renderTemplate(tokens,data){
	var resultStr="";
  for(let i=0;i<tokens.length;i++){
  	let token=tokens[i]
  	if(token[0] ==='text'){
  		resultStr+=token[1]
  	}else if(token[0] ==='name'){
  		resultStr+=lookup(data,token[1])
  	}else if(token[0] ==='#'){
  		resultStr+=parseArray(token,data)
  	}
  	

  }
  return resultStr
}