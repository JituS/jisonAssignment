const readline = require('readline');
var jison = require('jison');
var fs = require('fs');
var grammer = fs.readFileSync('expression.jison', 'utf8');
var parser = new jison.Parser(grammer);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>> '
});

var memory = new Object();
process.stdout.write('>> ');

rl.on('line', (input) => {
	try{
		var trees = parser.parse(input);
		try{
			memory = trees.evaluate(memory);
			console.log('>> '+memory['_']);
		}catch(e){
			console.log(e);
		}
	}catch(e){
		console.log('error on > ' + e.hash.loc.first_line + ' : ' + e.hash.loc.last_column);
	}
	process.stdout.write('>> ');
});

