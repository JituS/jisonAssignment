var toJs = {
	consoleLog: function(expr){
		return 'console.log' + expr + ';';
	},
	initializationExpr: function(variable, expression){
		return 'var ' + variable + ' = ' +  expression + ';';
	},
	putInBracket: function(expression) {
		return '(' + expression + ')';
	},
	assignmentExpression: function(tree){
		var left = tree.left.parent;
		return toJs.initializationExpr(left, toJs.expression(tree.right));
	},
	expression: function(tree) {
		if(tree.hasChildren()){
			return toJs.putInBracket(toJs.expression(tree.left) +
				' '+ tree.parent +
				' '+ toJs.expression(tree.right)) ;
		}
		return tree.parent;
	}
};

module.exports = toJs;
