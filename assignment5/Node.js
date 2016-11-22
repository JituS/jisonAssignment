function Node(parent, left, right) {
	this.parent = parent;
	this.left = left;
	this.right = right;
}

var consoleLog = function(expr){
	return 'console.log' + expr + ';';
}

var initializationExpr = function(variable, expression){
	return 'var ' + variable + ' = ' +  expression + ';';
}

var putInBracket = function(expression) {
	return '(' + expression + ')';
}

var isAssignment = function(tree){
	return tree.parent == '=';
}

Node.prototype = {
	represent : function(){
		if(this.hasChildren()){
			return (isAssignment(this)) ? this.assignmentExpression(): consoleLog(this.expression());
		}else{
			return consoleLog(putInBracket(this.parent));
		}
	},
	hasChildren : function(){
		return !!this.left && !!this.right;
	},
	assignmentExpression: function(){
		var left = this.left.parent;
		return initializationExpr(left, this.right.expression());
	},
	expression: function() {
		if(this.hasChildren()){
			return putInBracket(this.left.expression() +' '+ this.parent +' '+ this.right.expression()) ;
		}
		return this.parent;
	}
}

module.exports = Node;