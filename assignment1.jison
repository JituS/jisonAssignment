/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  tokens = [] || tokens; return 'NUMBER';
"+"                   return '+';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' 

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {console.log(tokens.join());}
    ;

e
    : e '+' e
        {$$ = '( ' +$$+ ' + ' +$3 + ' )';
        tokens.push($$);
        console.log(tokens)}
    | NUMBER
        {$$ = +$$;}
    ;