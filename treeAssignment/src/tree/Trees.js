function Trees() {
	this.trees = [];
}

Trees.prototype.addTree = function(tree) {
	this.trees.push(tree);
}	

Trees.prototype.evaluate = function() {
	var memory = {};
	var memory = this.trees.reduce(function(memory, tree){
		return tree.evaluate(memory);
	}, memory);
	return memory['_'];
}

Trees.prototype.representInJs = function() {
	return this.trees.map(function(tree){
		return tree.represent();
	}).join('\n');
}

Trees.prototype.toWords = function() {
	return this.trees.map(function(tree){
		return tree.toWords();
	}).join('\n');
}

module.exports = Trees;