import { user } from './01JsFundamentals.js';
document.body.innerHTML = user;
// // 1Hello, world!
// //     2The “script” tag
// //     2Modern markup
// //     2External scripts

// // 1Code structure
// //     2Statements
// //     2Semicolons

// // 1The modern mode, "use strict"
// //     2“use strict”
// //     2Browser console
// //     2Should we “use strict”?

// //     2A variable
// let message;

// message = 'Hello'; // store the string 'Hello' in the variable named message

let message;
message = 'Hello!';

console.log(user); // shows the variable content
// let user = 'John',
//   age = 25,
//   message = 'Hello';

// let user = 'John';
// let age = 25;
// let message = 'Hello';
// //     2A real-life analogy
// //     2Variable naming
// //     2Constants
// const myBirthday = '18.04.1982';
// //         3Uppercase constants
// const COLOR_RED = '#F00';
// const COLOR_GREEN = '#0F0';
// const COLOR_BLUE = '#00F';
// const COLOR_ORANGE = '#FF7F00';

// // ...when we need to pick a color
// let color = COLOR_ORANGE;
// console.log(color); // #FF7F00

// //     2Name things right

// // 1Data types
// //     2Number
// //     2BigInt
// //     2String
// //     2Boolean (logical type)
// //     2The “null” value
// //     2The “undefined” value
// //     2Objects and Symbols
// //     2The typeof operator

// // 1Interaction: console.log, prompt, confirm
// //     2console.log
// //     2prompt
// //     2confirm

// // 1Type Conversions
// //     2String Conversion
// let value = true;
// console.log(typeof value); // boolean

// value = String(value); // now value is a string "true"
// console.log(typeof value); // string

// //     2Numeric Conversion
// let str = '123';
// console.log(typeof str); // string

// let num = Number(str); // becomes a number 123

// console.log(typeof num); // number

// //     2Boolean Conversion
// console.log(Boolean(1)); // true
// console.log(Boolean(0)); // false

// console.log(Boolean('hello')); // true
// console.log(Boolean('')); // false

// // 1Basic operators, maths
// //     2Terms: “unary”, “binary”, “operand”
// let x = 1;

// x = -x;
// console.log(x); // -1, unary negation was applied

// let x = 1,
//   y = 3;
// console.log(y - x); // 2, binary minus subtracts values
// //     2Maths
// //     3Remainder %
// console.log(5 % 2); // 1, a remainder of 5 divided by 2
// console.log(8 % 3); // 2, a remainder of 8 divided by 3
// //     3Exponentiation **
// console.log(2 ** 2); // 2² = 4
// console.log(2 ** 3); // 2³ = 8
// console.log(2 ** 4); // 2⁴ = 16

// console.log(4 ** (1 / 2)); // 2 (power of 1/2 is the same as a square root)
// console.log(8 ** (1 / 3)); // 2 (power of 1/3 is the same as a cubic root)
// //     2String concatenation with binary +

// let s = 'my' + 'string';
// console.log(s); // mystring

// console.log( '1' + 2 ); // "12"
// console.log( 2 + '1' ); // "21"

// console.log(2 + 2 + '1' ); // "41" and not "221"

// console.log('1' + 2 + 2); // "122" and not "14"

// console.log( 6 - '2' ); // 4, converts '2' to a number
// console.log( '6' / '2' ); // 3, converts both operands to numbers

// //     2Numeric conversion, unary +
// // No effect on numbers
// let x = 1;
// console.log( +x ); // 1

// let y = -2;
// console.log( +y ); // -2

// // Converts non-numbers
// console.log( +true ); // 1
// console.log( +"" );   // 0

// let apples = "2";
// let oranges = "3";

// // both values converted to numbers before the binary plus
// console.log( +apples + +oranges ); // 5

// // the longer variant
// // console.log( Number(apples) + Number(oranges) ); // 5

// //     2Operator precedence
// let x = 2 * 2 + 1;

// console.log( x ); // 5

// //     2Assignment
// //         3Assignment = returns a value
// let a = 1;
// let b = 2;

// let c = 3 - (a = b + 1);

// console.log( a ); // 3
// console.log( c ); // 0

// //         3Chaining assignments
// let a, b, c;

// a = b = c = 2 + 2;

// console.log( a ); // 4
// console.log( b ); // 4
// console.log( c ); // 4

// c = 2 + 2;
// b = c;
// a = c;

// //     2Modify-in-place
// let n = 2;
// n = n + 5;
// n = n * 2;

// let n = 2;
// n += 5; // now n = 7 (same as n = n + 5)
// n *= 2; // now n = 14 (same as n = n * 2)

// console.log( n ); // 14

// let n = 2;

// n *= 3 + 5; // right part evaluated first, same as n *= 8

// console.log( n ); // 16
// //     2Increment/decrement
// let counter = 2;
// counter++;        // works the same as counter = counter + 1, but is shorter
// console.log( counter ); // 3

// let counter = 2;
// counter--;        // works the same as counter = counter - 1, but is shorter
// console.log( counter ); // 1

// let counter = 1;
// let a = ++counter; // (*)

// console.log(a); // 2

// let counter = 1;
// let a = counter++; // (*) changed ++counter to counter++

// console.log(a); // 1

// let counter = 0;
// counter++;
// ++counter;
// console.log( counter ); // 2, the lines above did the same

// let counter = 0;
// console.log( ++counter ); // 1

// let counter = 0;
// console.log( counter++ ); // 0

// let counter = 1;
// console.log( 2 * ++counter ); // 4

// let counter = 1;
// console.log( 2 * counter++ ); // 2, because counter++ returns the "old" value

// let counter = 1;
// console.log( 2 * counter );
// counter++;

// //     2Bitwise operators
// let a = (1 + 2, 3 + 4);

// console.log( a ); // 7 (the result of 3 + 4)

// // three operations in one line
// for (a = 1, b = 3, c = a * b; a < 10; a++) {
//   ...
//  }
// //     2Comma

// // 1Comparisons
// //     2Boolean is the result
// console.log( 2 > 1 );  // true (correct)
// console.log( 2 == 1 ); // false (wrong)
// console.log( 2 != 1 ); // true (correct)
// //     2String comparison
// let result = 5 > 4; // assign the result of the comparison
// console.log( result ); // true
// //     2Comparison of different types
// console.log( '2' > 1 ); // true, string '2' becomes a number 2
// console.log( '01' == 1 ); // true, string '01' becomes a number 1
// console.log( true == 1 ); // true
// console.log( false == 0 ); // true
// //     2Strict equality
// console.log( 0 == false ); // true
// console.log( '' == false ); // true
// //     2Comparison with null and undefined
// console.log( null === undefined ); // false
// console.log( null == undefined ); // true
// //         3Strange result: null vs 0
// console.log( null > 0 );  // (1) false
// console.log( null == 0 ); // (2) false
// console.log( null >= 0 ); // (3) true
// //         3An incomparable undefined
// console.log( undefined > 0 ); // false (1)
// console.log( undefined < 0 ); // false (2)
// console.log( undefined == 0 ); // false (3)
// //         3Avoid problems

// // 1Conditional branching: if, '?'
// //     2The “if” statement
// let year = prompt('In which year was ECMAScript-2015 specification published?', '');

// if (year == 2015) console.log( 'You are right!' );
// if (year == 2015) {
//   console.log( "That's correct!" );
//   console.log( "You're so smart!" );
// }
// //     2Boolean conversion
// if (0) { // 0 is falsy
//   ...
// }
// if (1) { // 1 is truthy
//   ...
// }
// let cond = (year == 2015); // equality evaluates to true or false

// if (cond) {
//   ...
// }
// //     2The “else” clause
// let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

// if (year == 2015) {
//   console.log( 'You guessed it right!' );
// } else {
//   console.log( 'How can you be so wrong?' ); // any value except 2015
// }
// //     2Several conditions: “else if”
// let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

// if (year < 2015) {
//   console.log( 'Too early...' );
// } else if (year > 2015) {
//   console.log( 'Too late' );
// } else {
//   console.log( 'Exactly!' );
// }
// //     2Conditional operator ‘?’
// let accessAllowed;
// let age = prompt('How old are you?', '');

// if (age > 18) {
//   accessAllowed = true;
// } else {
//   accessAllowed = false;
// }

// console.log(accessAllowed);
// let result = condition ? value1 : value2;
// let accessAllowed = (age > 18) ? true : false;
// // the comparison operator "age > 18" executes first anyway
// // (no need to wrap it into parentheses)
// let accessAllowed = age > 18 ? true : false;
// // the same
// let accessAllowed = age > 18;
// //     2Multiple ‘?’
// let age = prompt('age?', 18);

// let message = (age < 3) ? 'Hi, baby!' :
//   (age < 18) ? 'Hello!' :
//   (age < 100) ? 'Greetings!' :
//   'What an unusual age!';

// console.log( message );

// if (age < 3) {
//   message = 'Hi, baby!';
// } else if (age < 18) {
//   message = 'Hello!';
// } else if (age < 100) {
//   message = 'Greetings!';
// } else {
//   message = 'What an unusual age!';
// }
// //     2Non-traditional use of ‘?’
// let company = prompt('Which company created JavaScript?', '');

// (company == 'Netscape') ?
//    console.log('Right!') : console.log('Wrong.');

//    let company = prompt('Which company created JavaScript?', '');

// if (company == 'Netscape') {
//   console.log('Right!');
// } else {
//   console.log('Wrong.');
// }

// // Logical operators
// // There are four logical operators in JavaScript: || (OR), && (AND), ! (NOT), ?? (Nullish Coalescing). Here we cover the first three, the ?? operator is in the next article.

// // Although they are called “logical”, they can be applied to values of any type, not only boolean. Their result can also be of any type.

// // Let’s see the details.

// // || (OR)
// // The “OR” operator is represented with two vertical line symbols:

// // result = a || b;
// // In classical programming, the logical OR is meant to manipulate boolean values only. If any of its arguments are true, it returns true, otherwise it returns false.

// // In JavaScript, the operator is a little bit trickier and more powerful. But first, let’s see what happens with boolean values.

// // There are four possible logical combinations:

// console.log( true || true );   // true
// console.log( false || true );  // true
// console.log( true || false );  // true
// console.log( false || false ); // false
// // As we can see, the result is always true except for the case when both operands are false.

// // If an operand is not a boolean, it’s converted to a boolean for the evaluation.

// // For instance, the number 1 is treated as true, the number 0 as false:

// if (1 || 0) { // works just like if( true || false )
//   console.log( 'truthy!' );
// }
// // Most of the time, OR || is used in an if statement to test if any of the given conditions is true.

// // For example:

// // let hour = 9;

// if (hour < 10 || hour > 18) {
//   console.log( 'The office is closed.' );
// }
// // We can pass more conditions:

// // let hour = 12;
// // let isWeekend = true;

// if (hour < 10 || hour > 18 || isWeekend) {
//   console.log( 'The office is closed.' ); // it is the weekend
// }
// // OR "||" finds the first truthy value
// // The logic described above is somewhat classical. Now, let’s bring in the “extra” features of JavaScript.

// // The extended algorithm works as follows.

// // Given multiple OR’ed values:

// // result = value1 || value2 || value3;
// // The OR || operator does the following:

// // Evaluates operands from left to right.
// // For each operand, converts it to boolean. If the result is true, stops and returns the original value of that operand.
// // If all operands have been evaluated (i.e. all were false), returns the last operand.
// // A value is returned in its original form, without the conversion.

// // In other words, a chain of OR || returns the first truthy value or the last one if no truthy value is found.

// // For instance:

// console.log( 1 || 0 ); // 1 (1 is truthy)

// console.log( null || 1 ); // 1 (1 is the first truthy value)
// console.log( null || 0 || 1 ); // 1 (the first truthy value)

// console.log( undefined || null || 0 ); // 0 (all falsy, returns the last value)
// // This leads to some interesting usage compared to a “pure, classical, boolean-only OR”.

// // Getting the first truthy value from a list of variables or expressions.

// // For instance, we have firstName, lastName and nickName variables, all optional (i.e. can be undefined or have falsy values).

// // Let’s use OR || to choose the one that has the data and show it (or "Anonymous" if nothing set):

// let firstName = "";
// let lastName = "";
// let nickName = "SuperCoder";

// console.log( firstName || lastName || nickName || "Anonymous"); // SuperCoder
// // If all variables were falsy, "Anonymous" would show up.

// // Short-circuit evaluation.

// // Another feature of OR || operator is the so-called “short-circuit” evaluation.

// // It means that || processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

// // The importance of this feature becomes obvious if an operand isn’t just a value, but an expression with a side effect, such as a variable assignment or a function call.

// // In the example below, only the second message is printed:

// true || console.log("not printed");
// false || console.log("printed");
// // In the first line, the OR || operator stops the evaluation immediately upon seeing true, so the console.log isn’t run.

// // Sometimes, people use this feature to execute commands only if the condition on the left part is falsy.

// // && (AND)
// // The AND operator is represented with two ampersands &&:

// // result = a && b;
// // In classical programming, AND returns true if both operands are truthy and false otherwise:

// console.log( true && true );   // true
// console.log( false && true );  // false
// console.log( true && false );  // false
// console.log( false && false ); // false
// // An example with if:

// let hour = 12;
// let minute = 30;

// if (hour == 12 && minute == 30) {
//   console.log( 'The time is 12:30' );
// }
// // Just as with OR, any value is allowed as an operand of AND:

// if (1 && 0) { // evaluated as true && false
//   console.log( "won't work, because the result is falsy" );
// }
// // AND “&&” finds the first falsy value
// // Given multiple AND’ed values:

// // result = value1 && value2 && value3;
// // The AND && operator does the following:

// // Evaluates operands from left to right.
// // For each operand, converts it to a boolean. If the result is false, stops and returns the original value of that operand.
// // If all operands have been evaluated (i.e. all were truthy), returns the last operand.
// // In other words, AND returns the first falsy value or the last value if none were found.

// // The rules above are similar to OR. The difference is that AND returns the first falsy value while OR returns the first truthy one.

// // Examples:

// // // if the first operand is truthy,
// // // AND returns the second operand:
// console.log( 1 && 0 ); // 0
// console.log( 1 && 5 ); // 5

// // // if the first operand is falsy,
// // // AND returns it. The second operand is ignored
// console.log( null && 5 ); // null
// console.log( 0 && "no matter what" ); // 0
// // We can also pass several values in a row. See how the first falsy one is returned:

// console.log( 1 && 2 && null && 3 ); // null
// // When all values are truthy, the last value is returned:

// console.log( 1 && 2 && 3 ); // 3, the last one
// // Precedence of AND && is higher than OR ||
// // The precedence of AND && operator is higher than OR ||.

// // So the code a && b || c && d is essentially the same as if the && expressions were in parentheses: (a && b) || (c && d).

// // Don’t replace if with || or &&
// // Sometimes, people use the AND && operator as a "shorter way to write if".

// // For instance:

// let x = 1;

// (x > 0) && console.log( 'Greater than zero!' );
// // The action in the right part of && would execute only if the evaluation reaches it. That is, only if (x > 0) is true.

// // So we basically have an analogue for:

// let x = 1;

// if (x > 0) console.log( 'Greater than zero!' );
// // Although, the variant with && appears shorter, if is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use if if we want if and use && if we want AND.

// // ! (NOT)
// // The boolean NOT operator is represented with an exclamation sign !.

// // The syntax is pretty simple:

// // result = !value;
// // The operator accepts a single argument and does the following:

// // Converts the operand to boolean type: true/false.
// // Returns the inverse value.
// // For instance:

// console.log( !true ); // false
// console.log( !0 ); // true
// // A double NOT !! is sometimes used for converting a value to boolean type:

// console.log( !!"non-empty string" ); // true
// console.log( !!null ); // false
// // That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

// // There’s a little more verbose way to do the same thing – a built-in Boolean function:

// console.log( Boolean("non-empty string") ); // true
// console.log( Boolean(null) ); // false
// // The precedence of NOT ! is the highest of all logical operators, so it always executes first, before && or ||.

// // 1Nullish coalescing operator '??'
// let user = 'John';

// console.log(user ?? 'Anonymous'); // John (user defined)

// let firstName = null;
// let lastName = null;
// let nickName = 'Supercoder';

// // shows the first defined value:
// console.log(firstName ?? lastName ?? nickName ?? 'Anonymous'); // Supercoder
// //     2Comparison with ||
// let firstName = null;
// let lastName = null;
// let nickName = 'Supercoder';

// // shows the first truthy value:
// console.log(firstName || lastName || nickName || 'Anonymous'); // Supercoder

// let height = 0;

// console.log(height || 100); // 100
// console.log(height ?? 100); // 0

// //     2Precedence
// let height = null;
// let width = null;

// // important: use parentheses
// let area = (height ?? 100) * (width ?? 50);

// console.log(area); // 5000

// // without parentheses
// let area = height ?? 100 * width ?? 50;

// // ...works this way (not what we want):
// let area = height ?? 100 * width ?? 50;

// //         3Using ?? with && or ||
// let x = (1 && 2) ?? 3; // Works

// console.log(x); // 2

// // Nullish coalescing operator '??'
// // A recent addition
// // This is a recent addition to the language. Old browsers may need polyfills.
// // The nullish coalescing operator is written as two question marks ??.

// // As it treats null and undefined similarly, we’ll use a special term here, in this article. For brevity, we’ll say that a value is “defined” when it’s neither null nor undefined.

// // The result of a ?? b is:

// // if a is defined, then a,
// // if a isn’t defined, then b.
// // In other words, ?? returns the first argument if it’s not null/undefined. Otherwise, the second one.

// // The nullish coalescing operator isn’t anything completely new. It’s just a nice syntax to get the first “defined” value of the two.

// // We can rewrite result = a ?? b using the operators that we already know, like this:

// result = (a !== null && a !== undefined) ? a : b;
// // Now it should be absolutely clear what ?? does. Let’s see where it helps.

// // The common use case for ?? is to provide a default value.

// // For example, here we show user if its value isn’t null/undefined, otherwise Anonymous:

// let user;

// alert(user ?? "Anonymous"); // Anonymous (user not defined)
// // Here’s the example with user assigned to a name:

// let user = "John";

// alert(user ?? "Anonymous"); // John (user defined)
// // We can also use a sequence of ?? to select the first value from a list that isn’t null/undefined.

// // Let’s say we have a user’s data in variables firstName, lastName or nickName. All of them may be not defined, if the user decided not to fill in the corresponding values.

// // We’d like to display the user name using one of these variables, or show “Anonymous” if all of them are null/undefined.

// // Let’s use the ?? operator for that:

// let firstName = null;
// let lastName = null;
// let nickName = "Supercoder";

// // shows the first defined value:
// alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
// // Comparison with ||
// // The OR || operator can be used in the same way as ??, as it was described in the previous chapter.

// // For example, in the code above we could replace ?? with || and still get the same result:

// let firstName = null;
// let lastName = null;
// let nickName = "Supercoder";

// // shows the first truthy value:
// alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
// // Historically, the OR || operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

// // On the other hand, the nullish coalescing operator ?? was added to JavaScript only recently, and the reason for that was that people weren’t quite happy with ||.

// // The important difference between them is that:

// // || returns the first truthy value.
// // ?? returns the first defined value.
// // In other words, || doesn’t distinguish between false, 0, an empty string "" and null/undefined. They are all the same – falsy values. If any of these is the first argument of ||, then we’ll get the second argument as the result.

// // In practice though, we may want to use default value only when the variable is null/undefined. That is, when the value is really unknown/not set.

// // For example, consider this:

// // let height = 0;

// alert(height || 100); // 100
// alert(height ?? 100); // 0
// // The height || 100 checks height for being a falsy value, and it’s 0, falsy indeed.
// // so the result of || is the second argument, 100.
// // The height ?? 100 checks height for being null/undefined, and it’s not,
// // so the result is height “as is”, that is 0.
// // In practice, the zero height is often a valid value, that shouldn’t be replaced with the default. So ?? does just the right thing.

// // Precedence
// // The precedence of the ?? operator is the same as ||. They both equal 3 in the MDN table.

// // That means that, just like ||, the nullish coalescing operator ?? is evaluated before = and ?, but after most other operations, such as +, *.

// // So we may need to add parentheses in expressions like this:

// let height = null;
// let width = null;

// // important: use parentheses
// let area = (height ?? 100) * (width ?? 50);

// alert(area); // 5000
// // Otherwise, if we omit parentheses, then as * has the higher precedence than ??, it would execute first, leading to incorrect results.

// // // without parentheses
// let area = height ?? 100 * width ?? 50;

// // // ...works this way (not what we want):
// let area = height ?? (100 * width) ?? 50;
// // Using ?? with && or ||
// // Due to safety reasons, JavaScript forbids using ?? together with && and || operators, unless the precedence is explicitly specified with parentheses.

// // The code below triggers a syntax error:

// let x = 1 && 2 ?? 3; // Syntax error
// // The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from || to ??.

// // Use explicit parentheses to work around it:

// let x = (1 && 2) ?? 3; // Works

// alert(x); // 2

// // Loops: while and for
// // We often need to repeat actions.

// // For example, outputting goods from a list one after another or just running the same code for each number from 1 to 10.

// // Loops are a way to repeat the same code multiple times.

// // The for…of and for…in loops
// // A small announcement for advanced readers.

// // This article covers only basic loops: while, do..while and for(..;..;..).

// // If you came to this article searching for other types of loops, here are the pointers:

// // See for…in to loop over object properties.
// // See for…of and iterables for looping over arrays and iterable objects.
// // Otherwise, please read on.

// // The “while” loop
// // The while loop has the following syntax:

// // while (condition) {
// //   // code
// //   // so-called "loop body"
// // }
// // While the condition is truthy, the code from the loop body is executed.

// // For instance, the loop below outputs i while i < 3:

// let i = 0;
// while (i < 3) { // shows 0, then 1, then 2
//   alert( i );
//   i++;
// }
// // A single execution of the loop body is called an iteration. The loop in the example above makes three iterations.

// // If i++ was missing from the example above, the loop would repeat (in theory) forever. In practice, the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.

// // Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by while.

// // For instance, a shorter way to write while (i != 0) is while (i):

// let i = 3;
// while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
//   alert( i );
//   i--;
// }
// // Curly braces are not required for a single-line body
// // If the loop body has a single statement, we can omit the curly braces {…}:

// let i = 3;
// while (i) alert(i--);
// // The “do…while” loop
// // The condition check can be moved below the loop body using the do..while syntax:

// // do {
// //   // loop body
// // } while (condition);
// // The loop will first execute the body, then check the condition, and, while it’s truthy, execute it again and again.

// // For example:

// let i = 0;
// do {
//   alert( i );
//   i++;
// } while (i < 3);
// // This form of syntax should only be used when you want the body of the loop to execute at least once regardless of the condition being truthy. Usually, the other form is preferred: while(…) {…}.

// // The “for” loop
// // The for loop is more complex, but it’s also the most commonly used loop.

// // It looks like this:

// // for (begin; condition; step) {
// //   // ... loop body ...
// // }
// // Let’s learn the meaning of these parts by example. The loop below runs alert(i) for i from 0 up to (but not including) 3:

// for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
//   alert(i);
// }
// // Let’s examine the for statement part-by-part:

// // part
// // begin	let i = 0	Executes once upon entering the loop.
// // condition	i < 3	Checked before every loop iteration. If false, the loop stops.
// // body	alert(i)	Runs again and again while the condition is truthy.
// // step	i++	Executes after the body on each iteration.
// // The general loop algorithm works like this:

// // Run begin
// // → (if condition → run body and run step)
// // → (if condition → run body and run step)
// // → (if condition → run body and run step)
// // → ...
// // That is, begin executes once, and then it iterates: after each condition test, body and step are executed.

// // If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.

// // Here’s exactly what happens in our case:

// // // for (let i = 0; i < 3; i++) alert(i)

// // run begin
// let i = 0
// // if condition → run body and run step
// if (i < 3) { alert(i); i++ }
// // if condition → run body and run step
// if (i < 3) { alert(i); i++ }
// // if condition → run body and run step
// if (i < 3) { alert(i); i++ }
// // ...finish, because now i == 3
// // Inline variable declaration
// // Here, the “counter” variable i is declared right in the loop. This is called an “inline” variable declaration. Such variables are visible only inside the loop.

// for (let i = 0; i < 3; i++) {
//   alert(i); // 0, 1, 2
// }
// alert(i); // error, no such variable
// Instead of defining a variable, we could use an existing one:

// let i = 0;

// for (i = 0; i < 3; i++) { // use an existing variable
//   alert(i); // 0, 1, 2
// }

// // alert(i); // 3, visible, because declared outside of the loop
// // Skipping parts
// // Any part of for can be skipped.

// // For example, we can omit begin if we don’t need to do anything at the loop start.

// // Like here:

// // let i = 0; // we have i already declared and assigned

// for (; i < 3; i++) { // no need for "begin"
//   alert( i ); // 0, 1, 2
// }
// // We can also remove the step part:

// let i = 0;

// for (; i < 3;) {
//   alert( i++ );
// }
// // This makes the loop identical to while (i < 3).

// // We can actually remove everything, creating an infinite loop:

// // for (;;) {
// //   // repeats without limits
// // }
// // Please note that the two for semicolons ; must be present. Otherwise, there would be a syntax error.

// // Breaking the loop
// // Normally, a loop exits when its condition becomes falsy.

// // But we can force the exit at any time using the special break directive.

// // For example, the loop below asks the user for a series of numbers, “breaking” when no number is entered:

// let sum = 0;

// while (true) {

//   let value = +prompt("Enter a number", '');

//   if (!value) break; // (*)

//   sum += value;

// }
// // alert( 'Sum: ' + sum );
// // The break directive is activated at the line (*) if the user enters an empty line or cancels the input. It stops the loop immediately, passing control to the first line after the loop. Namely, alert.

// // The combination “infinite loop + break as needed” is great for situations when a loop’s condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.

// // Continue to the next iteration
// // The continue directive is a “lighter version” of break. It doesn’t stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

// // We can use it if we’re done with the current iteration and would like to move on to the next one.

// // The loop below uses continue to output only odd values:

// for (let i = 0; i < 10; i++) {

//   // if true, skip the remaining part of the body
//   if (i % 2 == 0) continue;

//   alert(i); // 1, then 3, 5, 7, 9
// }
// // For even values of i, the continue directive stops executing the body and passes control to the next iteration of for (with the next number). So the alert is only called for odd values.

// // The continue directive helps decrease nesting
// // A loop that shows odd values could look like this:

// for (let i = 0; i < 10; i++) {

//   if (i % 2) {
//     alert( i );
//   }

// }
// // From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an if block instead of using continue.

// // But as a side effect, this created one more level of nesting (the alert call inside the curly braces). If the code inside of if is longer than a few lines, that may decrease the overall readability.

// // No break/continue to the right side of ‘?’
// // Please note that syntax constructs that are not expressions cannot be used with the ternary operator ?. In particular, directives such as break/continue aren’t allowed there.

// // For example, if we take this code:

// if (i > 5) {
//   alert(i);
// } else {
//   continue;
// }
// // …and rewrite it using a question mark:

// (i > 5) ? alert(i) : continue; // continue isn't allowed here
// // …it stops working: there’s a syntax error.

// // This is just another reason not to use the question mark operator ? instead of if.

// // Labels for break/continue
// // Sometimes we need to break out from multiple nested loops at once.

// // For example, in the code below we loop over i and j, prompting for the coordinates (i, j) from (0,0) to (2,2):

// for (let i = 0; i < 3; i++) {

//   for (let j = 0; j < 3; j++) {

//     let input = prompt(`Value at coords (${i},${j})`, '');

//     // what if we want to exit from here to Done (below)?
//   }
// }

// alert('Done!');
// // We need a way to stop the process if the user cancels the input.

// // The ordinary break after input would only break the inner loop. That’s not sufficient – labels, come to the rescue!

// // A label is an identifier with a colon before a loop:

// // labelName: for (...) {
// //   ...
// // }
// // The break <labelName> statement in the loop below breaks out to the label:

// outer: for (let i = 0; i < 3; i++) {

//   for (let j = 0; j < 3; j++) {

//     let input = prompt(`Value at coords (${i},${j})`, '');

//     // if an empty string or canceled, then break out of both loops
//     if (!input) break outer; // (*)

//     // do something with the value...
//   }
// }

// alert('Done!');
// // In the code above, break outer looks upwards for the label named outer and breaks out of that loop.

// // So the control goes straight from (*) to alert('Done!').

// // We can also move the label onto a separate line:

// // outer:
// // for (let i = 0; i < 3; i++) { ... }
// // The continue directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

// // Labels do not allow to “jump” anywhere
// // Labels do not allow us to jump into an arbitrary place in the code.

// // For example, it is impossible to do this:

// // break label; // jump to the label below (doesn't work)

// // label: for (...)
// // A break directive must be inside a code block. Technically, any labelled code block will do, e.g.:

// // label: {
// //   // ...
// //   break label; // works
// //   // ...
// // }
// // …Although, 99.9% of the time break is used inside loops, as we’ve seen in the examples above.

// // A continue is only possible from inside a loop.

// // 1The "switch" statement
// //     2The syntax
// //     2An example
// //     2Grouping of “case”
// //     2Type matters

// // 1Functions
// //     2Function Declaration
// //     2Local variables
// //     2Outer variables
// //     2Parameters
// //     2Default values
// //     3Alternative default parameters
// //     2Returning a value
// //     2Naming a function
// //     2Functions == Comments
// //     2Summary

// // 1Function expressions
// //     2Function is a value
// //     2Callback functions
// //     2Function Expression vs Function Declaration

// // 1Arrow functions, the basics
// //     2Multiline arrow functions

// // 1JavaScript specials
// //     2Code structure
// //     2Strict mode
// //     2Variables
// //     2Interaction
// //     2Operators
// //     2Loops
// //     2The “switch” construct
// //     2Functions
// //     2More to come

// let x = 1;

// x = -x;
// console.log(x); // -1, unary negation was applied

// [1, 2].forEach(console.log);

// let msg;
// msg = 'Hello';
// let user = 'John',
//   age = 25,
//   message = 'Hello';

// const myBirthday = '18.04.1982';
// const COLOR_RED = '#F00';
// const COLOR_GREEN = '#0F0';
// const COLOR_BLUE = '#00F';
// const COLOR_ORANGE = '#FF7F00';

// // ...when we need to pick a color
// let color = COLOR_ORANGE;

// // Number
// let n = 123;

// // BigInt

// // String
// let str = 'Hello';
// let str2 = 'Single quotes are ok too';
// let phrase = `can embed another ${str}`;

// // Boolean (logical type)
// let isGreater = 4 > 1;

// // The “null” value
// let age01 = null;

// // The “undefined” value
// // Objects and Symbols
// // The typeof operator

// let value = true;
// console.log(typeof value); // boolean

// value = String(value); // now value is a string "true"
// console.log(typeof value); // string

// console.log(2 ** 2); // 2² = 4
// console.log(2 ** 3); // 2³ = 8
// console.log(2 ** 4); // 2⁴ = 16

// // 2Terms: “unary”, “binary”, “operand”
// let ax = 1;

// ax = -ax;
// console.log(ax); // -1, unary negation was applied

// let bx = 1,
//   by = 3;
// console.log(by - bx); // 2, binary minus subtracts values
// // 2Maths
// // 3Remainder %
// console.log(5 % 2); // 1, a remainder of 5 divided by 2
// console.log(8 % 3); // 2, a remainder of 8 divided by 3
// // 3Exponentiation **
// // 2String concatenation with binary +
// console.log(4 ** (1 / 2)); // 2 (power of 1/2 is the same as a square root)
// console.log(8 ** (1 / 3)); // 2 (power of 1/3 is the same as a cubic root)
// // 2Numeric conversion, unary +
// // 2Operator precedence
// // 2Assignment
// // 3Assignment = returns a value
// // 3Chaining assignments
// // 2Modify-in-place
// // 2Increment/decrement
// // 2Bitwise operators

// ////Comparisons

// // Boolean is the result
// console.log(2 > 1); // true (correct)
// console.log(2 == 1); // false (wrong)
// console.log(2 != 1); // true (correct)

// // String comparison
// console.log('----String comparison----');
// console.log('Z' > 'A'); // true
// console.log('Glow' > 'Glee'); // true
// console.log('Bee' > 'Be'); // true

// // Comparison of different types
// console.log('----Comparison of different types----');
// console.log('2' > 1); // true, string '2' becomes a number 2
// console.log('01' == 1); // true, string '01' becomes a number 1

// // Strict equality
// // Comparison with null and undefined
