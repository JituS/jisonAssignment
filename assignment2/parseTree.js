function parseTree(tree) {
	if(!tree.left.parent && !tree.right.parent) {
		return ' (' + tree.left + tree.parent + tree.right + ' )';
	};
	if(tree.left.parent && tree.right.parent){
		return ' (' + parseTree(tree.left) + tree.parent + parseTree(tree.right) + ' )';
	}
	if(tree.left.parent && !tree.right.parent){
		return ' (' + parseTree(tree.left) + tree.parent + tree.right + ' )';
	}
	if(!tree.left.parent && tree.right.parent){
		return ' (' + tree.left + tree.parent + parseTree(tree.right) + ' )';
	}
}

module.exports = parseTree;
