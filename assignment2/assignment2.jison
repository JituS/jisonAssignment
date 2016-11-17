/* description: Parses end executes mathematical expressions. */

/* lexical grammar */

%{
var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty ','thirty ','forty ','fifty ', 'sixty ','seventy ','eighty ','ninety '];

function inHundred(number) {
    var word = '';
    word += (number[0] != 0) ? a[+number[0]] + 'hundred ' : '';
    word += (+number[1] < 2) ? a[+number.slice(1,3)] : b[+number[1]] + a[+number[2]];
    return word;
}

function toWords(number) {
    var stringNumber = ('000000000000' + number).substr(-12).match(/^(\d{3})(\d{3})(\d{3})(\d{3})$/).slice(1);
    var place = ['billion ', 'million ', 'thousand ', ' '];
    var inWord = '';
    stringNumber.forEach(function(each, index){
        inWord += (inHundred(each) != '') ? inHundred(each) + place[index] : '';
    });
    return inWord;
}
%}

%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
"+"                   return 'plus';
"*"                   return 'times';
"/"                   return 'by';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left 'plus' 
%left 'times' 
%left 'by' 

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {console.log($1);}
    ;

e
    : e plus e
        {$$ = '(' + $$ + ' plus ' + $3 + ')';
        console.log($1, $2, $3, '-----------add')}
    | e times e
        {$$ = '(' + $$ + ' times ' + $3 + ')';
        console.log($1, $2, $3, '-----------mult')}
    | e by e
        {$$ = '(' + $$ + ' by ' + $3 + ')';}
    | NUMBER
        {$$ = toWords($$);}
    ;