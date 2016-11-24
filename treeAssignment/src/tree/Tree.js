var toJs = require('../utils/jsConverter.js');
var evaluater = require('../utils/treeEvaluater.js');
var inWords = require('../utils/inWords.js');

function Tree(parent, left, right, type) {
	this.parent = parent;
	this.left = left;
	this.right = right;
	this.type = type;
}

function represent(){
	return toJs['represent_'+this.type](this);
}

function evaluate(memory){
	return evaluater[this.type](this, memory);
}

function toWords() {
	var right = this.right ? this.right.toWords() : '';
	
	return toJs.putInBracket(this.left.toWords() 
		+ ' ' + inWords(this.parent) +' '+ right) ;
}

function expression(){
	var expression = toJs.operations[this.parent](this.left, this.right);
	return expression;
}

Tree.prototype = {
	represent : represent,
	evaluate : evaluate,
	toWords : toWords,
	expression: expression
}

module.exports = Tree;
