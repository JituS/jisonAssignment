var fs = require('fs');
var jison = require('jison');
var grammer = fs.readFileSync('expression.jison', 'utf8');
var parser = new jison.Parser(grammer);
var trees = parser.parse('x=10;y=20;z=x+y;z+1;a=20;a+1*2/4;');
var memory = [];

var memory = trees.map(function(tree){
	return tree.represent();
});
fs.writeFileSync('output.js', memory.join('\n'));

