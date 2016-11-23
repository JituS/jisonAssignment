var evaluater = {
	operations: {
		'+' : function (left, right){ return left + right; },
		'*' : function (left, right){ return left * right; },
		'/' : function (left, right){ return left / right; },
		'^' : function (left, right){ return Math.pow(left, right); },
		'-' : function (left, right){ return left - right; },
		'=' : function (left, right, memory){ return memory[left] = right; }
	},
	evaluateExpression : function(tree, memory) {
		var left = tree.left.evaluate(memory)['_']
		var right = tree.right.evaluate(memory)['_']
		memory['_'] = evaluater.operations[tree.parent](left, right);
		return memory;
	},
	evaluateAssignment : function(tree, memory){
		var left = tree.left.parent;
		var right = tree.right.evaluate(memory)['_'];
		memory['_'] = evaluater.operations[tree.parent](left, right, memory);
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

