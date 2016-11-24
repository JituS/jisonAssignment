var Node = require('../src/tree/Node.js');
var Tree = require('../src/tree/Tree.js');
var assert = require('chai').assert;

describe('Node', function(){
	it('should evaluate itself', function() {
		var node = new Node(1);
		var actual = node.evaluate(new Object());
		assert.equal(1, actual['_']);
	});
	it('should evaluate the tree', function() {
		var tree = new Tree('*', new Node(2), new Node(3));
		var actual = tree.evaluate(new Object());
		assert.equal(6, actual['_']);
	});
	it('should evaluate the complex tree', function() {
		var tree1 = new Tree('*', new Node(2), new Node(3));
		var tree2 = new Tree('+', new Node(2), new Node(3));
		var tree = new Tree('*', tree1, tree2);
		var actual = tree.evaluate(new Object());
		assert.equal(30, actual['_']);
	});
	it('should evaluate all expressions', function() {
		var tree1 = new Tree('-', new Node(1), new Node(2));
		var tree2 = new Tree('-', new Node(2), new Node(3));
		var tree = new Tree('*', tree1, tree2);
		var memory = new Object();
		var actual = tree.evaluate(memory);
		assert.equal(1, actual['_']);
	});
	it('should strore assignment variables', function() {
		var tree = new Tree('=', new Node('x'), new Node(2));
		var memory = new Object();
		var actual = tree.evaluate(memory);
		assert.equal(2, actual['x']);
	});
	it('should store assignment variables which has expression', function() {
		var tree1 = new Tree('*', new Node(2), new Node(2));
		var tree2 = new Tree('+', new Node(2), new Node(3));
		var tree = new Tree('*', tree1, tree2);
		var assignment = new Tree('=', new Node('x'), tree);
		var memory = new Object();
		var actual = assignment.evaluate(memory);
		assert.equal(20, actual['x']);
	});
	it('should represent in js code', function() {
		var tree1 = new Tree('*', new Node(2), new Node(2));
		var tree2 = new Tree('+', new Node(2), new Node(3));
		var tree = new Tree('*', tree1, tree2);
		var assignmentTree = new Tree('=', new Node('x'), tree);
		var actual = assignmentTree.represent();
		var expected = 'var x = ((2 * 2) * (2 + 3));';
		assert.equal(expected, actual);	
	});
	it('should represent if expression is exponetial', function() {
		var tree = new Tree('^', new Node(2), new Node(2));
		var actual = tree.represent();
		var expected = 'console.log(Math.pow(2, 2));';
		assert.equal(expected, actual);	
	});
	it('should represent in words', function() {
		var tree1 = new Tree('*', new Node(2), new Node(2));
		var tree2 = new Tree('+', new Node(2), new Node(3));
		var tree = new Tree('*', tree1, tree2);
		var actual = tree.toWords();
		var expected = '(( two times  two) times ( two plus  three))';
		assert.equal(expected, actual);	
	});
	it('should represent in js consoleLog', function() {
		var node1 = new Node(1);
		var node2 = new Node(2);
		var tree = new Tree('+', node1, node2);
		var actual = tree.represent();
		var expected = 'console.log(1 + 2);';
		assert.equal(expected, actual);	
	});
	it('should represent in js factorial', function() {
		var node1 = new Node(1);
		var node2 = new Node(2);
		var tree = new Tree('!', node1);
		var actual = tree.represent();
		var expected = 'console.log(fact(1));';
		assert.equal(expected, actual);	
	});
})
