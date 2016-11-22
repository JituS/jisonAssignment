function Tree(parent, left, right) {
	this.parent = parent;
	this.left = left;
	this.right = right;
}

var mapToValue = function(value, memory){
	if(typeof(value) == 'string'){ 
		if(memory[value]){
			return memory[value];
		};
		throw new ReferenceError(value + ' is not defined');
	};
	return value;
};

var add = function(left, right, memory){
	memory['_'] = left + right;
	return memory;
};

var minus = function(left, right, memory){
	memory['_'] = left - right;
	return memory;
};
var pow = function(left, right, memory){
	memory['_'] = Math.pow(left, right);
	return memory;
};

var mult = function(left, right, memory){
	memory['_'] = left * right;
	return memory;
};
var divide = function(left, right, memory){
	memory['_'] = left / right;
	return memory;
};
var equal = function(left, right, memory){
	memory[left] = right;
	memory['_'] = right;
	return memory;
};

var lookup = {'+' :add,'-' :minus,'*' :mult,'/' :divide,'=' :equal, '^': pow};

Tree.prototype = {
	evaluate : function(memory){
		var left = this.left.evaluate(memory)['_'];
		var right = this.right.evaluate(memory)['_'];
		if(this.parent != '='){
			return lookup[this.parent](mapToValue(left, memory), mapToValue(right, memory), memory);
		}else{
			return lookup[this.parent](left, mapToValue(right, memory), memory);
		}
	},
};

module.exports = Tree;
