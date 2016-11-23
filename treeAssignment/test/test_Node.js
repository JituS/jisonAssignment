var Node = require('../src/Node.js');
var assert = require('chai').assert;

describe('Node', function(){
	it('should evaluate itself', function() {
		var node = new Node(1);
		var actual = node.evaluate(new Object());
		assert.equal(1, actual['_']);
	});
	it('should evaluate the tree', function() {
		var node = new Node('*', new Node(2), new Node(3));
		var actual = node.evaluate(new Object());
		assert.equal(6, actual['_']);
	});
	it('should evaluate the complex tree', function() {
		var node1 = new Node('*', new Node(2), new Node(3));
		var node2 = new Node('+', new Node(2), new Node(3));
		var node = new Node('*', node1, node2);
		var actual = node.evaluate(new Object());
		assert.equal(30, actual['_']);
	});
	it('should evaluate all expressions', function() {
		var node1 = new Node('-', new Node(1), new Node(2));
		var node2 = new Node('-', new Node(2), new Node(3));
		var node = new Node('*', node1, node2);
		var memory = new Object();
		var actual = node.evaluate(memory);
		assert.equal(1, actual['_']);
	});
	it('should strore assignment variables', function() {
		var node = new Node('=', new Node('x'), new Node(2));
		var memory = new Object();
		var actual = node.evaluate(memory);
		assert.equal(2, actual['x']);
	});
	it('should store assignment variables which has expression', function() {
		var node1 = new Node('*', new Node(2), new Node(2));
		var node2 = new Node('+', new Node(2), new Node(3));
		var node = new Node('*', node1, node2);
		var assignment = new Node('=', new Node('x'), node);
		var memory = new Object();
		var actual = assignment.evaluate(memory);
		assert.equal(20, actual['x']);
	});
	it('should tell if node has childs', function() {
		var node1 = new Node('*', new Node(2), new Node(2));
		var node2 = new Node(1);
		assert.isTrue(node1.hasChildren());
		assert.isFalse(node2.hasChildren());
	});
	it('should represent in js code', function() {
		var node1 = new Node('*', new Node(2), new Node(2));
		var node2 = new Node('+', new Node(2), new Node(3));
		var node = new Node('*', node1, node2);
		var assignment = new Node('=', new Node('x'), node);
		var actual = assignment.represent();
		var expected = 'var x = ((2 * 2) * (2 + 3));';
		assert.equal(expected, actual);	
	});
	it('should represent in words', function() {
		var node1 = new Node('*', new Node(2), new Node(2));
		var node2 = new Node('+', new Node(2), new Node(3));
		var node = new Node('*', node1, node2);
		var actual = node.toWords();
		var expected = '(( two *  two) * ( two +  three))';
		assert.equal(expected, actual);	
	});
})
