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
	'-' : function (left, right){ return putInBracket(left.expression() + ' - ' + right.expression()); },
	'!' : function (left, right){ return putInBracket('fact(' + left.expression() + ')'); },
	'>' : function (left, right){ return putInBracket(left.expression() + ' > ' +  right.expression()); },
	'<' : function (left, right){ return putInBracket(left.expression() + ' < ' +  right.expression()); }
};

function representIfBlock(tree){
	var condition = tree.parent.expression();
	var ifBlock = tree.left.representInJs();
	return 'if ' + condition + '{\n\t' +  ifBlock + '\n}';
}
function representElseBlock(tree){
	return (tree.right) 
		? 'else' + '{\n\t' +  tree.right.representInJs() + '\n}\n'
		: '';
}

var toJs = {
	represent_simpleExpression: function(expr){
		return 'console.log(' + expr.expression() + ');';
	},
	represent_assignmentExpression: function(tree){
		var variable = tree.left.parent;
		var right = tree.right.expression()
		return 'var ' + variable + ' = ' +  right + ';';
	},
	represent_ifCondition: function(tree){
		var ifBlock = representIfBlock(tree);
		var elseBlock = representElseBlock(tree);
		return ifBlock + elseBlock;
	},
	putInBracket: putInBracket,
	operations: operations
};

module.exports = toJs;
