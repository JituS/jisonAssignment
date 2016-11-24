/* description: Parses end executes mathematical expressions. */

/* lexical grammar */

%{
    var Node = require(process.cwd() + '/tree/Node.js');
    var Trees = require(process.cwd() + '/tree/Trees.js');
    var Tree = require(process.cwd() + '/tree/Tree.js');
%}

%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
[a-z]                 return 'VAR';
"+"                   return '+';
"-"                   return '-';
"*"                   return '*';
"/"                   return '/';
"^"                   return '^';
"*"                   return '*';
"="                   return '=';
"!"                   return '!';
";"                   return ';';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' 
%left '/' 
%left '^' 
%left '!' 

%start expressions

%% /* language grammar */

expressions
    : statements EOF
        {return $1;}
    ;

trees
    : {$$ = new Trees()};

statements
    : statements assignmentExpression
        {$1.addTree($2);}
    | statements expression ';'
        {$1.addTree($2);}
    | trees
    ;   


assignmentExpression
    : VAR '=' expression ';'
        {
            $$ = new Tree('=', new Node($1), $3);
        }
    ;

expression
    : expression '+' expression
        {$$ = new Tree($2, $1, $3);}
    | expression '-' expression
        {$$ = new Tree($2, $1, $3);}
    | expression '*' expression
        {$$ = new Tree($2, $1, $3);}
    | expression '/' expression
        {$$ = new Tree($2, $1, $3);}
    | expression '^' expression
        {$$ = new Tree($2, $1, $3);}
    | expression '!'
        {$$ = new Tree($2, $1);}
    | NUMBER
        {$$ = new Node(+yytext);}
    | VAR
        {$$ = new Node(yytext);}
    ;
