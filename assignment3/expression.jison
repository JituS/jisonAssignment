/* description: Parses end executes mathematical expressions. */

/* lexical grammar */

%{
    var heap = {};
    var allTrees = [];
    var evaluateTree = require('./evaluateTree.js');
%}

%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
[a-z]                 return 'STRING';
"+"                   return '+';
"-"                   return '-';
"*"                   return '*';
"/"                   return '/';
"*"                   return '*';
"="                   return '=';
";"                   return ';';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' 
%left '/' 

%start expressions

%% /* language grammar */

expressions
    : statement EOF
        {return console.log(evaluateTree(allTrees));}
    ;

statement
    : statement assignmentExpression 
    | statement expression ';'
        {
            allTrees.push($2);
        }
    |
    ;


assignmentExpression
    : STRING '=' expression ';'
        {
            $$ = {parent: '=', left: $1, right: $3};
            allTrees.push($$);
        }
    ;

expression
    : expression '+' expression
        {$$ = {parent: '+', left: $1, right: $3};}
    | expression '*' expression
        {$$ = {parent: '*', left: $1, right: $3};}
    | expression '/' expression
        {$$ = {parent: '/', left: $1, right: $3};}
    | expression '-' expression
        {$$ = {parent: '-', left: $1, right: $3};}
    | NUMBER
        {$$ = +yytext;}
    |STRING
    ;
