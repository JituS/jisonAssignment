var toJs = require('../utils/jsConverter.js');
var inWords = require('../utils/inWords.js');

function replaceValue(value, memory) {
	if(typeof(value) == 'string'){ 
		if(memory.get(value)){
			return memory.get(value);
		}
		throw new ReferenceError(value + ' is not defined');
	}
	return value;
}

function Node(parent) {
	this.parent = parent;
}

function represent(){
	return toJs.represent_simpleExpression(this);
}

function isBoolean(value){
	return value == 'true' || value == 'false';
}

function parseBoolean(value){
	return (value == 'true') ? true : false;
}

function evaluate(memory){
	if(isBoolean(this.parent)){
		memory.add('_', parseBoolean(this.parent));
		return memory;
	}
	var result = replaceValue(this.parent, memory);
	memory.add('_', result);
	return memory;
}

function toWords() {
	return inWords(this.parent);
}

function expression() {
	return this.parent;
}

Node.prototype = {
	represent : represent,
	evaluate : evaluate,
	toWords : toWords,
	expression: expression
}

module.exports = Node;