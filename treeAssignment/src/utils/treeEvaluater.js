var Memory = require('../tree/Memory.js');

var operations = {
	'+' : function (left, right){ return left + right; },
	'*' : function (left, right){ return left * right; },
	'/' : function (left, right){ return left / right; },
	'^' : function (left, right){ return Math.pow(left, right); },
	'-' : function (left, right){ return left - right; },
	'!' : function (left){ return fact(left); },
	'=' : function (left, right, memory){ memory.add(left, right); return right},
	'>' : function (left, right){return left > right; },
	'<' : function (left, right){return left < right; }
};

function fact(number) {
	if(number == 1) return number;
	return fact(number - 1) * number;
}

function replaceValue(value, memory) {
	if(typeof(value) == 'string'){ 
		if(memory.get(value)){
			return memory.get(value);
		}
		throw new ReferenceError(value + ' is not defined');
	}
	return value;
}

function assignmentExpression(tree, memory) {
	var left = tree.left.parent;
	var right = tree.right.evaluate(memory).get('_'); 
	var result = operations[tree.parent](left, right, memory);
	memory.add('_', result);
	return memory;
}

function simpleExpression(tree, memory) {
	var left = tree.left.evaluate(memory).get('_'), right;
	var leftValue = replaceValue(left, memory);
	if(tree.right){
		var right = tree.right.evaluate(memory).get('_')
		var rightValue = replaceValue(right, memory);
	}
	var result = operations[tree.parent](leftValue, rightValue);
	memory.add('_', result);
	return memory;
}

function condition(tree, memory) {
	var left = tree.left.evaluate(memory).get('_');
	var leftValue = replaceValue(left, memory);
	if(tree.right){
		var right = tree.right.evaluate(memory).get('_');
		var rightValue = replaceValue(right, memory);
	}
	var result = operations[tree.parent](leftValue, rightValue);
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

var evaluater = {
	simpleExpression : simpleExpression,
	assignmentExpression : assignmentExpression,
	replaceValue : replaceValue,
	ifCondition: ifCondition,
	condition: condition
};

module.exports = evaluater;

