var toJs = require('./jsConverter.js');
var evaluater = require('./treeEvaluater.js');
var inWords = require('./inWords.js');

function Node(parent, left, right) {
	this.parent = parent;
	this.left = left;
	this.right = right;
}

function represent(){
	if(this.hasChildren()){
		return (this.parent == '=') 
			? toJs.assignmentExpression(this)
			: toJs.consoleLog(toJs.expression(this));
	}
	return toJs.consoleLog(toJs.putInBracket(this.parent));
}

function evaluate(memory){
	if(this.hasChildren()){
		return (this.parent == '=') 
			? evaluater.evaluateAssignment(this, memory) 
			: evaluater.evaluateExpression(this, memory);
	}
	memory['_'] = evaluater.replaceValue(this.parent, memory);
	return memory;
}

function hasChildren(){
	return !!this.left && !!this.right;
}

function toWords() {
	if(this.hasChildren()){
		return toJs.putInBracket(this.left.toWords() 
			+' '+ this.parent +' '+ this.right.toWords()) ;
	}
	return inWords(this.parent);

}

Node.prototype = {
	represent : represent,
	evaluate : evaluate,
	hasChildren : hasChildren,
	toWords : toWords
}

module.exports = Node;