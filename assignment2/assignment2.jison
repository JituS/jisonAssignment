/* description: Parses end executes mathematical expressions. */

/* lexical grammar */

%{
    var toWords = require('./inWords.js');
    var parseTree = require('./parseTree.js');
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
        {console.log(parseTree($1));}
    ;

e
    : e plus e
        {$$ = {parent: ' plus', left: $1, right: $3};}
    | e times e
        {$$ = {parent: ' times', left: $1, right: $3};}
    | e by e
        {$$ = {parent: ' by', left: $1, right: $3};}
    | NUMBER
        {$$ = toWords($$);}
    ;