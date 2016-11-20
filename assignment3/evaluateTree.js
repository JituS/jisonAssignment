var heap = {};
var replaceValue = function(value){
	if(typeof(value) != 'number'){ 
		if(heap[value]){
			return heap[value];
		};
		throw new ReferenceError(value + ' is not defined');
	};
	return value;
};

var operatorFunctions = {
	'+' : function(a, b){return replaceValue(a)+replaceValue(b)},
	'-' : function(a, b){return replaceValue(a)-replaceValue(b)},
	'*' : function(a, b){return replaceValue(a)*replaceValue(b)},
	'/' : function(a, b){return replaceValue(a)/replaceValue(b)},
	'=' : function(a, b){heap[a]=b; return b}
};

var parseTree = function(tree){
	if(!tree.left.parent && !tree.right.parent) {
		return operatorFunctions[tree.parent](tree.left, tree.right);
	}
	if(tree.left.parent && tree.right.parent){
		return operatorFunctions[tree.parent](parseTree(tree.left), parseTree(tree.right));
	}
	if(tree.left.parent && !tree.right.parent){
		return operatorFunctions[tree.parent](parseTree(tree.left), tree.right);
	}
	if(!tree.left.parent && tree.right.parent){
		return operatorFunctions[tree.parent](tree.left, parseTree(tree.right));
	}	
}

function evaluateTree(allTree) {
	var answer;
	allTree.forEach(function(tree){
		answer = parseTree(tree);
	});
	return answer;
}

module.exports = evaluateTree;
