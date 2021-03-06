var a = ['',' one',' two',' three',' four',' five',' six',' seven',' eight',' nine',' ten',' eleven',' twelve',' thirteen',' fourteen',' fifteen',' sixteen',' seventeen',' eighteen',' nineteen'];
var b = ['', '', ' twenty',' thirty',' forty',' fifty',' sixty',' seventy',' eighty',' ninety'];
var symbols = {'+': 'plus', '*': 'times', '/': 'divideBy', '^': 'to the power', '-': 'minus', '=': 'equals-to', '!': 'factorial'};

function inHundred(number) {
	var word ='';
	word += (number[0] != 0) ? a[+number[0]] + ' hundred' : '';
	word += (+number[1] < 2) ? a[+number.slice(1,3)] : b[+number[1]] + a[+number[2]];
	return word;
}

function toSymbol(string) {
	return symbols[string] || string;
}

function toWords(number) {
	if(typeof(number) != 'number'){
		return toSymbol(number);
	}
	var stringNumber = ('000000000000' + number).substr(-12).match(/^(\d{3})(\d{3})(\d{3})(\d{3})$/).slice(1);
	var place = [' billion', ' million', ' thousand', ''];
	var inWord = '';
	stringNumber.forEach(function(each, index){
		inWord += (inHundred(each) != '') ? inHundred(each) + place[index] : '';
	});
	return inWord;
}

module.exports = toWords;