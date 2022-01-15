
import lookup from './lookup.js'
import renderTemplate from './renderTemplate.js'
export default function parseArray(token,data){
	var v = lookup(data,token[1]);
	var resultStr='';
	for(let i=0;i<v.length;i++){
		resultStr+=renderTemplate(token[2],{...v[i],'.':v[i]})
	}
	return resultStr;
}