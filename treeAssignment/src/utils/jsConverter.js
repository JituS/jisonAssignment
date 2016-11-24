var mathPow = function(left, right){
	return 'Math.pow(' + left + ', ' + right + ')' ;
}

function putInBracket(expr) {
	return '(' + expr + ')';
}

var operations = {
	'+' : function (left, right){ return putInBracket(left.expression() + ' + ' + right.expression()); },
	'*' : function (left, right){ return putInBracket(left.expression() + ' * ' + right.expression()); },
	'/' : function (left, right){ return putInBracket(left.expression() + ' / ' + right.expression()); },
	'^' : function (left, right){ return putInBracket(mathPow(left.expression(), right.expression())); },
	'-' : function (left, right){ return putInBracket(left.expression() - right.expression()); },
	'!' : function (left, right){ return putInBracket('fact(' + left.expression() + ')'); }
};

var toJs = {
	consoleLog: function(expr){
		return 'console.log' + expr + ';';
	},
	initializationExpr: function(variable, expression){
		return 'var ' + variable + ' = ' +  expression + ';';
	},
	putInBracket: putInBracket,
	assignmentExpression: function(tree){
		var left = tree.left.parent;
		return toJs.initializationExpr(left, tree.right || tree.right.expression());
	},
	operations: operations
};

module.exports = toJs;
