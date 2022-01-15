
import parseTemplateToTokens from './parseTemplateToTokens.js';
import renderTemplate from './renderTemplate.js'
window.TemplateEngine={
	render(template,data){
		var tokens=parseTemplateToTokens(template)	
		return renderTemplate(tokens,data)	
	}
}