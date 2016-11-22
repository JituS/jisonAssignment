function Node(parent, left, right) {
	this.parent = parent;
	this.left = left;
	this.right = right;
}

var replaceValue = function(value, memory){
	if(typeof(value) == 'string'){ 
		if(memory[value]){
			return memory[value];
		}
		throw new ReferenceError(value + ' is not defined');
	};
	return value;
};

var add = function(left, right, memory){
	return left + right; 
};

var minus = function(left, right, memory){
	return left - right; 
};
var pow = function(left, right, memory){
	return Math.pow(left, right);
};

var mult = function(left, right, memory){
	return left * right; 
};
var divide = function(left, right, memory){
	return left / right; 
};
var equal = function(left, right, memory){
	return memory[left] = right;
};

var operations = {'+':add, '*' :mult,'/' :divide,'=' :equal, '^': pow};

Node.prototype = {
	evaluate : function(memory){
		if(this.hasChildren()){
			return (this.parent == '=')
				? this.evaluateAssignment(memory)
				: this.evaluateExpression(memory);
		}else{
			memory['_'] = replaceValue(this.parent, memory);
			return memory;
		}
	},
	hasChildren : function(){
		return !!this.left && !!this.right;
	},
	evaluateAssignment: function(memory){
		var left = this.left.parent;
		var right = this.right.evaluate(memory)['_'];
		memory['_'] = operations[this.parent](left, right, memory);
		return memory;
	},
	evaluateExpression: function(memory) {
		var left = this.left.evaluate(memory)['_']
		var right = this.right.evaluate(memory)['_']
		memory['_'] = operations[this.parent](left, right, memory);
		return memory;
	}
}

module.exports = Node;