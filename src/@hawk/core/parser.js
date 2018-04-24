/**
 *
 * Parser Class
 * @version 1.0.0
 *
 */

export class Parser {

	constructor(props) {
		this.props = props;
	}

  	query(queryString){
 		let el = document.getElementById(this.props.el)
 		return el.querySelectorAll(queryString);
 	}

 	directive(nameString, callback) {
 		const nameStringSimple = nameString.replace('[','').replace(']','')
	    const directives = this.query(nameString)
	    for (const node of directives) {
			callback(node,this.props,node.attributes[nameStringSimple].value)
	    }
	}

}