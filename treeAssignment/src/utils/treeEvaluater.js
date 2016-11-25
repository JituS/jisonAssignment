var Memory = require('../tree/Memory.js');

var operations = {
	'+' : function (left, right){ return left + right; },
	'*' : function (left, right){ return left * right; },
	'%' : function (left, right){ return left % right; },
	'/' : function (left, right){ return left / right; },
	'^' : function (left, right){ return Math.pow(left, right); },
	'-' : function (left, right){ return left - right; },
	'!' : function (left){ return fact(left); },
	'>' : function (left, right){return left > right; },
	'==' : function (left, right){return left == right; },
	'>=' : function (left, right){return left >= right; },
	'<=' : function (left, right){return left <= right; },
	'<' : function (left, right){return left < right; }
};

function fact(number) {
	if(number == 1) return number;
	return fact(number - 1) * number;
}

function assignmentExpression(tree, memory) {
	var left = tree.left.parent;
	var right = tree.right.evaluate(memory).get('_'); 
	memory.add(left, right);
	memory.add('_', right);
	return memory;
}

function simpleExpression(tree, memory) {
	var left = tree.left.evaluate(memory).get('_');
	if(tree.right){
		var right = tree.right.evaluate(memory).get('_');
	}
	var result = operations[tree.parent](left, right);
	memory.add('_', result);
	return memory;
}

function condition(tree, memory) {
	var left = tree.left.evaluate(memory).get('_');
	if(tree.right){
		var right = tree.right.evaluate(memory).get('_');
	}
	var result = operations[tree.parent](left, right);
	memory.add('_', result);
	return memory;
}

function evaluateBlock(block, memory){
	if(block){
		block.evaluate(memory);
	}
	return memory;
}

function ifCondition(tree, memory){
	var parentMemory = [memory.self].concat(memory.parent);
	var newMemory = new Memory(parentMemory);
	if(tree.parent.evaluate(memory).get('_')){
		evaluateBlock(tree.left, newMemory)
	}else{
		evaluateBlock(tree.right, newMemory);
	}
	return memory;
}

function loop(tree, memory) {
	var parentMemory = [memory.self].concat(memory.parent);
	var newMemory = new Memory(parentMemory);
	while(tree.parent.evaluate(memory).get('_')){
		tree.left.evaluate(newMemory);
	}
	return memory;
}

function print(tree, memory) {
	console.log(tree.parent.evaluate(memory).get('_'));
	return memory;
}

var evaluater = {
	simpleExpression : simpleExpression,
	assignmentExpression : assignmentExpression,
	ifCondition: ifCondition,
	condition: condition,
	loop: loop,
	print: print
};

module.exports = evaluater;

