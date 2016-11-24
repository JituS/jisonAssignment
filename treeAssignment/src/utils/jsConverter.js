var mathPow = function(left, right){
	return 'Math.pow(' + left + ', ' + right + ')' ;
}
var operations = {
	'+' : function (left, right){ return toJs.putInBracket(left + ' + ' + right); },
	'*' : function (left, right){ return toJs.putInBracket(left + ' * ' + right); },
	'/' : function (left, right){ return left + ' / ' + right; },
	'^' : function (left, right){ return toJs.putInBracket(mathPow(left, right)); },
	'-' : function (left, right){ return left - right; },
};

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
		return toJs.initializationExpr(left, tree.right.expression());
	},
	operations: operations
};

module.exports = toJs;
