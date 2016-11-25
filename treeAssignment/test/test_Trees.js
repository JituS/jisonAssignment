var Node = require('../src/tree/Node.js');
var Tree = require('../src/tree/Tree.js');
var Trees = require('../src/tree/Trees.js');
var assert = require('chai').assert;

var treeTypes = ['simpleExpression', 'assignmentExpression', 'ifCondition'];

describe('Trees', function(){

	it('should evaluate all trees', function() {
		var tree1 = new Tree('=', new Node('a'), new Node(3), 'assignmentExpression');
		var tree2 = new Tree('+', new Node('a'), new Node(3), 'simpleExpression');
		var trees = new Trees().addTree(tree1).addTree(tree2);
		var actual = trees.evaluate(new Object());
		assert.equal(6, actual['_']);
	});

	it('should give last evaluated trees result', function() {
		var tree1 = new Tree('*', new Node(2), new Node(3), 'simpleExpression');
		var tree2 = new Tree('-', new Node(6), new Node(1), 'simpleExpression');
		var trees = new Trees().addTree(tree1).addTree(tree2);
		var actual = trees.evaluate(new Object());
		assert.equal(5, actual['_']);
	});

	it('should evaluate the trees which has conditions', function() {
		var tree1 = new Tree('*', new Node(2), new Node(3), 'simpleExpression');
		var tree2 = new Tree('+', new Node(2), new Node(3), 'simpleExpression');
		var tree3 = new Tree(new Tree('>', new Node('true'), '', 'condition'), new Node(3), new Node(4),'ifCondition');
		var trees = new Trees().addTree(tree1).addTree(tree2).addTree(tree3);
		var actual = trees.evaluate(new Object());
		assert.equal(4, actual['_']);
	});

	it('should strore all the assignment variables', function() {
		var tree1 = new Tree('=', new Node('x'), new Node(2), 'assignmentExpression');
		var tree2 = new Tree('=', new Node('y'), new Node(3), 'assignmentExpression');
		var tree3 = new Tree('=', new Node('z'), new Node(4), 'assignmentExpression');
		var trees = new Trees().addTree(tree1).addTree(tree2).addTree(tree3);
		var memory = new Object();
		var actual = trees.evaluate(memory);
		assert.equal(2, actual['x']);
		assert.equal(3, actual['y']);
		assert.equal(4, actual['z']);
	});
})
