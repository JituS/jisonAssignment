var fs = require('fs');
var jison = require('jison');
var grammer = fs.readFileSync('expression.jison', 'utf8');
var parser = new jison.Parser(grammer);
var trees = parser.parse('x=2;y=x^3;y+8;');
var memory = new Object();

var memory = trees.reduce(function(memory, tree){
	return tree.evaluate(memory);
}, memory);

console.log(memory['_']);

