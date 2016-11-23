var fs = require('fs');
var jison = require('jison');
var grammer = fs.readFileSync('expression.jison', 'utf8');
var parser = new jison.Parser(grammer);
var trees = parser.parse('x=2*x;y=x*5/x;y=y+1;y;');

function writeInJs(trees) {
	var jsCode = trees.map(function(tree){
		return tree.represent();
	}).join('\n');
	fs.writeFileSync('output.js',jsCode);
}

function evaluateTrees(trees) {
	var memory = {};
	var memory = trees.reduce(function(memory, tree){
		return tree.evaluate(memory);
	}, memory);
	return memory['_'];
}

function exprInWords(trees) {
	return trees.map(function(tree){
		return tree.toWords();
	});
}

writeInJs(trees);