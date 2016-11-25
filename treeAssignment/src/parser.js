var fs = require('fs');
var jison = require('jison');
var Memory = require('./tree/Memory.js');
var grammer = fs.readFileSync('expression.jison', 'utf8');
var parser = new jison.Parser(grammer);
var foo = fs.readFileSync(process.argv[2],'utf8');
var trees = parser.parse(foo);
// console.log(trees.evaluate(new Object()));

// 'a=2;b=1;if 5 > 3 {b=10;b;a;};b;'
// console.log('----------------JS representation------------------');
// console.log(trees.representInJs());
// console.log('----------------Evaluate------------------');
console.log(trees.evaluate(new Memory()));
// console.log('------------------To Words----------------');
// console.log(trees.toWords());
