var fs = require('fs');
var jison = require('jison');
var grammer = fs.readFileSync('expression.jison', 'utf8');
var parser = new jison.Parser(grammer);
var trees = parser.parse('a=10;a^5;a!;');

console.log('----------------JS representation------------------');
console.log(trees.representInJs());
console.log('----------------Evaluate------------------');
console.log(trees.evaluate());
console.log('------------------To Words----------------');
console.log(trees.toWords());
