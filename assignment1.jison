/* description: Parses end executes mathematical expressions. */

/* lexical grammar */


%{
 var tokens = [];   
%}

%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
"+"                   return '+';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' 

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {console.log($1);}
    ;

e
    : e '+' e
        {$$ = '( ' +$$+ ' + ' +$3 + ' )';
        }
    | NUMBER
        {$$ = +$$;}
    ;