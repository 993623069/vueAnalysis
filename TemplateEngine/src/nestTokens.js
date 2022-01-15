/**
函数的功能是折叠tokens，将#和/之间的tokens能够整合起来，作为它的
*/
export default function nestTokens(tokens){
	var sections=[];
	var nestedTokens=[];
	//
	var collector=nestedTokens;
	for (var i = 0; i < tokens.length; i++) {
		let token=tokens[i]
		switch(token[0]){
			case '#':
			 collector.push(token)
			 sections.push(token)
			 collector = token[2]=[]
			 break;
			case '/':
			 sections.pop()
			collector = sections.length > 0?sections[sections.length -1][2]:nestedTokens;
			break;
			default:
             collector.push(token)
		}
	}
	return nestedTokens
}
