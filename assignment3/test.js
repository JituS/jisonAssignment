var expect = require('chai').expect;

var Node = require('./Node.js');

describe('Node',function(){
	describe('converte',function(){
		it('should evaluate the tree',function(){
			var tree = new Node('+', new Node(1), new Node(1));
		 	var memory = new Object();
		 	tree.evaluate(memory);
		 	expect(2).to.be.equal(memory['_']);
		});
		it('should evaluate the complex tree',function(){
			var tree1 = new Node('+', new Node(1), new Node(1));
			var tree2 = new Node('*', new Node(3), new Node(2));
			var tree = new Node('+', tree1, tree2);
		 	var memory = new Object();
		 	tree.evaluate(memory);
		 	expect(8).to.be.equal(memory['_']);
		});
		it('should evaluate the multiple trees',function(){
			var tree1 = new Node('=', new Node('x'), new Node(5));
			var tree2 = new Node('=', new Node('y'), new Node('*', new Node('x'), new Node(4)));
			var trees = [tree1, tree2];
		 	var memory = new Object();
		 	trees.forEach(function(tree){
		 		tree.evaluate(memory);
		 	});
		 	expect(20).to.be.equal(memory['_']);
		});
	});
});