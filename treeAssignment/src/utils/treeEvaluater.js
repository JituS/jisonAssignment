var operations = {
	'+' : function (left, right){ return left + right; },
	'*' : function (left, right){ return left * right; },
	'/' : function (left, right){ return left / right; },
	'^' : function (left, right){ return Math.pow(left, right); },
	'-' : function (left, right){ return left - right; },
	'=' : function (left, right, memory){ return memory[left] = right; }
};

var evaluater = {
	evaluateExpression : function(tree, memory) {
		var left = evaluater.replaceValue(tree.left.evaluate(memory)['_'], memory);
		var right = evaluater.replaceValue(tree.right.evaluate(memory)['_'], memory);
		memory['_'] = operations[tree.parent](left, right);
		return memory;
	},
	evaluateAssignment : function(tree, memory){
		var left = tree.left.parent;
		var right = tree.right.evaluate(memory)['_']; 
		memory['_'] = operations[tree.parent](left, right, memory);
		return memory;
	},
	replaceValue : function(value, memory){
		if(typeof(value) == 'string'){ 
			if(memory[value]){
				return memory[value];
			}
			throw new ReferenceError(value + ' is not defined');
		}
		return value;
	}
};

module.exports = evaluater;

