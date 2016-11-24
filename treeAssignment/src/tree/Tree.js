var toJs = require('../utils/jsConverter.js');
var evaluater = require('../utils/treeEvaluater.js');
var inWords = require('../utils/inWords.js');

function Tree(parent, left, right) {
	this.parent = parent;
	this.left = left;
	this.right = right;
}

function represent(){
	if(this.parent == '=') {
		var left = this.left.parent;
		return toJs.initializationExpr(left, this.right.expression());
	}else{
		return toJs.consoleLog(this.expression());
	}
}

function evaluate(memory){
	return (this.parent == '=') 
		? evaluater.evaluateAssignment(this, memory) 
		: evaluater.evaluateExpression(this, memory);
}

function toWords() {
	var right = this.right ? this.right.toWords():'';
	return toJs.putInBracket(this.left.toWords() 
		+' '+ inWords(this.parent) +' '+ right) ;
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
