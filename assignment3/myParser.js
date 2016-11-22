var fs = require('fs');
var jison = require('jison');
var evaluateTree = require('./evaluateTree.js');
var grammer = fs.readFileSync('expression.jison', 'utf8');
var parser = new jison.Parser(grammer);
var trees = parser.parse('x=10;y=x+20;y;');
var memory = new Object();
var newM =  trees.reduce(function(memory, tree) {
	return tree.evaluate(memory);
}, memory);
console.log(newM);
