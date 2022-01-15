
import Scanner from './Scanner.js';

import nestTokens from './nestTokens.js';
 export default function parseTemplateToTokens(template){
            var tokens=[]
 	//实列化一个扫描器，构造时候提供一个参数，这个参数就是模板字符串
		//也就是说这个扫描器就是针对这个模板字符串工作的
			var scanner=new Scanner(template)
			//测试canUtil
			var words
			//当scanner没有到头
			while(scanner.eos()){
		             words=scanner.scanUtil('{{')
		             if(words !== ''){
		             	var isInJJH=false;
		             	var _words='';
		             	for(var i=0;i<words.length;i++){
		             		   	if(words[i]== '<'){
                         		isInJJH=true
                         	}else if(words[i]=='>'){
                         		isInJJH=false;
                         	}
                         	  if(!/\s/.test(words[i])){
	                         	_words+=words[i]
	                         }else{
	                         	if(isInJJH){
	                         		_words+=' ';
	                         	}
                         
                         }
                       
		             	}
		             	tokens.push(['text',_words])
		             }
						
						scanner.scan('{{')
				          words=scanner.scanUtil('}}')
				       if(words !== ''){
		             	if(words[0] =='#'){
		             		 tokens.push(['#',words.substring(1)],)
		             	}else if(words[0] =='/'){
		             		 tokens.push(['/',words.substring(1)])
		             	}else{

                          tokens.push(['name',words])
                      }
				       }
						
					    scanner.scan('}}')
			}
			return nestTokens(tokens);
 }