var operations = {
	'+' : function (left, right){ return left + right; },
	'*' : function (left, right){ return left * right; },
	'/' : function (left, right){ return left / right; },
	'^' : function (left, right){ return Math.pow(left, right); },
	'-' : function (left, right){ return left - right; },
	'!' : function (left){ return fact(left); },
	'=' : function (left, right, memory){ return memory[left] = right; }
};

function fact(number) {
	if(number == 1) return number;
	return fact(number - 1) + number;
}

function replaceValue(value, memory) {
	if(typeof(value) == 'string'){ 
		if(memory[value]){
			return memory[value];
		}
		throw new ReferenceError(value + ' is not defined');
	}
	return value;
}

function evaluateAssignment(tree, memory) {
	var left = tree.left.parent;
	var right = tree.right.evaluate(memory)['_']; 
	memory['_'] = operations[tree.parent](left, right, memory);
	return memory;
}

function evaluateExpression(tree, memory) {
	var left = replaceValue(tree.left.evaluate(memory)['_'], memory), right;
	if(tree.right){
		var right = replaceValue(tree.right.evaluate(memory)['_'], memory);
	}
	memory['_'] = operations[tree.parent](left, right);
	return memory;
}

var evaluater = {
	evaluateExpression : evaluateExpression,
	evaluateAssignment : evaluateAssignment,
	replaceValue : replaceValue
};

module.exports = evaluater;

