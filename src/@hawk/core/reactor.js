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
  		console.log(node.parentElement)	
  		let parent = node.parentElement
		let iterable = observable[chunk[2]]
		for (var i = 0; i < iterable.length; i++) {
			let nodeClone = node.cloneNode(true)
			let content = nodeClone.textContent.replace(chunk[0],'')
			content = content.replace('{{','')
			content = content.replace('}}','')
			content = content.trim()
			if(content==''){
				nodeClone.textContent = nodeClone.textContent.replace(nodeClone.textContent,iterable[i])
			}else{
				if(content.charAt(0)=='.')
					content = content.substr(1)
				nodeClone.textContent = nodeClone.textContent.replace(nodeClone.textContent,this.resolveMethodChaining(iterable[i],content))
			}
			nodeClone.removeAttribute('h-for')
			parent.appendChild(nodeClone)
		}
  	}

  	resolveMethodChaining(chainedObject, pathString){
	    pathString = pathString.split('.');
	    var current = chainedObject;
	    while(pathString.length) {
	        if(typeof current !== 'object') return undefined;
	        current = current[pathString.shift()];
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