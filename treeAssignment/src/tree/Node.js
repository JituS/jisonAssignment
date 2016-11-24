var toJs = require('../utils/jsConverter.js');
var evaluater = require('../utils/treeEvaluater.js');
var inWords = require('../utils/inWords.js');

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
		return parseBoolean(this.parent);
	}
	memory['_'] = evaluater.replaceValue(this.parent, memory);
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