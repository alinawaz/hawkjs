/**
 *
 * Reactor Class
 * @version 1.0.0
 *
 */

import {Parser} from './parser'

export class Reactor {

	constructor(props) {
		this.props = props;
	  	this.signals = {}
	  	this.parser = new Parser(props);
	  	this.boot(props);	  	
	}

	boot(props) {
		for (let key in props.data) {
		  	if (props.data.hasOwnProperty(key)) {
		    	this.globalize(props.data, key)
		  	}
		}
		this.dom()
	}

	globalize(obj, key) {
		let val = obj[key]
		let lastVal = val
		let me = this;
		Object.defineProperty(obj, key, {
		 	get () {
		 	 	return val 
		 	},
		  	set (newVal) {
		    	val = newVal
		    	me.notify(key)
		  	}
		})
	}

	react(node, observable, property) {
	    if(node.tagName=='INPUT'){
	      node.value = observable[property]
	      this.observe(property, () => node.value = observable[property])
	      node.onkeydown = function(e){
	        observable[property] = this.value;
	      };
	    }else if(node.directive=='if'){
	    	let variableName = node.getAttribute('h-if')
	    	this.observe(variableName, function(){
	    		if(!observable[variableName]){
 					node.style.display = 'none';
 				}else{
 					node.style.display = '';
 				}
	    	}) 			
	    }else if(node.directive=='for'){
	    	let me = this	
	    	let statement = node.getAttribute('h-for')	    	
  			let chunk = statement.split(' ')   
	    	me.processFor(node,observable,chunk)
	    	observable[chunk[2]].push = function(){
	    		Array.prototype.push.apply(this, arguments);
	    		me.processFor(node,observable,chunk)
	    		node.style.display = 'none'
	    	}
	    	observable[chunk[2]].splice = function(){
	    		Array.prototype.splice.apply(this, arguments);
	    		me.processFor(node,observable,chunk)
	    		node.style.display = 'none'
	    	}
	    	node.style.display = 'none'
	    }else{
	      node.textContent = observable[property]
	      this.observe(property, () => node.textContent = observable[property])
	    }
  	}

  	processFor(node, observable, chunk){   		
  		node.removeAttribute('style')
  		let childs = Array.from(node.parentElement.childNodes)
  		while(node.parentElement.childNodes.length>2){
  				node.parentElement.removeChild(node.parentElement.lastChild)
  		}
  		let parent = node.parentElement
		let iterable = observable[chunk[2]]		
		for (var i = 0; i < iterable.length; i++) {
			let nodeClone = node.cloneNode(true)
			nodeClone.innerHTML = this.resolveVariables(nodeClone.innerHTML, iterable[i])
			nodeClone.innerHTML = this.resolveClickEvent(this.props, nodeClone, nodeClone.innerHTML, iterable[i], chunk[0], i)
			nodeClone.removeAttribute('h-for')
			parent.appendChild(nodeClone)
		}
  	}

  	resolveBraces(content){
  		return content.substring(content.lastIndexOf("{{")+2,content.lastIndexOf("}}"))
  	}

  	resolveClickTag(content){
  		return content.substring(content.lastIndexOf('@click{')+7,content.lastIndexOf('}'))
  	}

  	resolveClickEvent(props, node, content, iterable, var_name, i){
  		let clickContent = this.resolveClickTag(content)
  		while(clickContent.trim() != ''){
			if (clickContent.indexOf('(') > -1){
				let param = clickContent.substring(clickContent.lastIndexOf('(')+1,clickContent.lastIndexOf(')'))
				let methodName = clickContent.replace('('+param+')', '')
				if (param.indexOf('.') > -1){
					if(param.split('.')[0] == var_name){
						param = this.resolveChaining(iterable, param)
					}					
				}else{
					if(param == var_name){
						param = iterable
					} 
				}				
				content = content.replace('@click{'+clickContent+'}', '')
				let method = props.methods[methodName].bind(Object.assign(props.data,props.methods))
				node.onclick = function(){
					method.apply(null, [param, i])
				}
			}else{
				content = content.replace('@click{'+clickContent+'}', '')
				node.onclick = props.methods[clickContent].bind(Object.assign(props.data,this.props.methods))
			}
			clickContent = this.resolveClickTag(content)
		}
  		return content
  	}

  	resolveVariables(content, iterable){
  		let braceContent = this.resolveBraces(content)
  		while(braceContent.trim() != ''){
			if (braceContent.indexOf('.') > -1){
				content = content.replace("{{"+braceContent+"}}", this.resolveChaining(iterable, braceContent))
			}else{
				content = content.replace("{{"+braceContent+"}}", iterable)
			}
			braceContent = this.resolveBraces(content)
		}
  		return content
  	}

  	resolveChaining(chainedObject, pathString){
	    pathString = pathString.split('.');
	    var current = chainedObject;
	    while(pathString.length) {
	        if(typeof current !== 'object') return undefined;
	        pathString.shift()
	        current = current[pathString.shift()]
	    }
	    return current;
	}

  	observe (property, signalHandler) {
    	if(!this.signals[property]) this.signals[property] = []
    	this.signals[property].push(signalHandler)
  	}

  	notify (signal) {
    	if(!this.signals[signal] || this.signals[signal].length < 1) return
    	this.signals[signal].forEach((signalHandler) => signalHandler())
  	}

 	dom() {
 		let me = this;
 		this.parser.directive('[h-text]',function(node, props, property){
 			node.directive = 'text'
 			me.react(node, props.data, property)
 		});
 		this.parser.directive('[h-model]',function(node, props, property){
 			node.directive = 'model'
 			me.react(node, props.data, property)
 		});
 		this.parser.directive('[h-if]',function(node, props, property){ 			
 			node.directive = 'if'
 			me.react(node, props.data, property)
 		});
 		this.parser.directive('[h-for]',function(node, props, property){ 			
 			node.directive = 'for'
 			me.react(node, props.data, property)
 		});
 		this.parser.directive('[h-click]',function(node, props, property){
 			let methodName = node.getAttribute('h-click')
 			node.directive = 'click'
 			node.onclick = props.methods[methodName].bind(Object.assign(props.data,props.methods))
 		});
	}

}