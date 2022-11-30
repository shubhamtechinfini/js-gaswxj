// Methods of primitives
// JavaScript allows us to work with primitives (strings, numbers, etc.) as if they were objects. They also provide methods to call as such. We will study those soon, but first we’ll see how it works because, of course, primitives are not objects (and here we will make it even clearer).

// Let’s look at the key distinctions between primitives and objects.

// A primitive

// Is a value of a primitive type.
// There are 7 primitive types: string, number, bigint, boolean, symbol, null and undefined.
// An object

// Is capable of storing multiple values as properties.
// Can be created with {}, for instance: {name: "John", age: 30}. There are other kinds of objects in JavaScript: functions, for example, are objects.
// One of the best things about objects is that we can store a function as one of its properties.

// let john = {
//   name: "John",
//   sayHi: function() {
//     console.log("Hi buddy!");
//   }
// };

// john.sayHi(); // Hi buddy!
// So here we’ve made an object john with the method sayHi.

// Many built-in objects already exist, such as those that work with dates, errors, HTML elements, etc. They have different properties and methods.

// But, these features come with a cost!

// Objects are “heavier” than primitives. They require additional resources to support the internal machinery.

// A primitive as an object
// Here’s the paradox faced by the creator of JavaScript:

// There are many things one would want to do with a primitive, like a string or a number. It would be great to access them using methods.
// Primitives must be as fast and lightweight as possible.
// The solution looks a little bit awkward, but here it is:

// Primitives are still primitive. A single value, as desired.
// The language allows access to methods and properties of strings, numbers, booleans and symbols.
// In order for that to work, a special “object wrapper” that provides the extra functionality is created, and then is destroyed.
// The “object wrappers” are different for each primitive type and are called: String, Number, Boolean, Symbol and BigInt. Thus, they provide different sets of methods.

// For instance, there exists a string method str.toUpperCase() that returns a capitalized str.

// Here’s how it works:

// let str = "Hello";

// console.log( str.toUpperCase() ); // HELLO
// Simple, right? Here’s what actually happens in str.toUpperCase():

// The string str is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string, and has useful methods, like toUpperCase().
// That method runs and returns a new string (shown by console.log).
// The special object is destroyed, leaving the primitive str alone.
// So primitives can provide methods, but they still remain lightweight.

// The JavaScript engine highly optimizes this process. It may even skip the creation of the extra object at all. But it must still adhere to the specification and behave as if it creates one.

// A number has methods of its own, for instance, toFixed(n) rounds the number to the given precision:

// let n = 1.23456;

// console.log( n.toFixed(2) ); // 1.23
// We’ll see more specific methods in chapters Numbers and Strings.

// Constructors String/Number/Boolean are for internal use only
// Some languages like Java allow us to explicitly create “wrapper objects” for primitives using a syntax like new Number(1) or new Boolean(false).

// In JavaScript, that’s also possible for historical reasons, but highly unrecommended. Things will go crazy in several places.

// For instance:

// console.log( typeof 0 ); // "number"

// console.log( typeof new Number(0) ); // "object"!
// Objects are always truthy in if, so here the console.log will show up:

// let zero = new Number(0);

// if (zero) { // zero is true, because it's an object
//   console.log( "zero is truthy!?!" );
// }
// On the other hand, using the same functions String/Number/Boolean without new is totally fine and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).

// For example, this is entirely valid:

// let num = Number("123"); // convert a string to number
// null/undefined have no methods
// The special primitives null and undefined are exceptions. They have no corresponding “wrapper objects” and provide no methods. In a sense, they are “the most primitive”.

// An attempt to access a property of such value would give the error:

// console.log(null.test); // error
// Summary
// Primitives except null and undefined provide many helpful methods. We will study those in the upcoming chapters.
// Formally, these methods work via temporary objects, but JavaScript engines are well tuned to optimize that internally, so they are not expensive to call.

// /////////////////////////////////////////////////////////////

// Numbers
// In modern JavaScript, there are two types of numbers:

// Regular numbers in JavaScript are stored in 64-bit format IEEE-754, also known as “double precision floating point numbers”. These are numbers that we’re using most of the time, and we’ll talk about them in this chapter.

// BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can’t safely exceed (253-1) or be less than -(253-1), as we mentioned earlier in the chapter Data types. As bigints are used in few special areas, we devote them a special chapter BigInt.

// So here we’ll talk about regular numbers. Let’s expand our knowledge of them.

// More ways to write a number
// Imagine we need to write 1 billion. The obvious way is:

// let billion = 1000000000;
// We also can use underscore _ as the separator:

// let billion = 1_000_000_000;
// Here the underscore _ plays the role of the “syntactic sugar”, it makes the number more readable. The JavaScript engine simply ignores _ between digits, so it’s exactly the same one billion as above.

// In real life though, we try to avoid writing long sequences of zeroes. We’re too lazy for that. We’ll try to write something like "1bn" for a billion or "7.3bn" for 7 billion 300 million. The same is true for most large numbers.

// In JavaScript, we can shorten a number by appending the letter "e" to it and specifying the zeroes count:

// let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes

// console.log( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)
// In other words, e multiplies the number by 1 with the given zeroes count.

// 1e3 === 1 * 1000; // e3 means *1000
// 1.23e6 === 1.23 * 1000000; // e6 means *1000000
// Now let’s write something very small. Say, 1 microsecond (one millionth of a second):

// let mсs = 0.000001;
// Just like before, using "e" can help. If we’d like to avoid writing the zeroes explicitly, we could write the same as:

// let mcs = 1e-6; // five zeroes to the left from 1
// If we count the zeroes in 0.000001, there are 6 of them. So naturally it’s 1e-6.

// In other words, a negative number after "e" means a division by 1 with the given number of zeroes:

// // -3 divides by 1 with 3 zeroes
// 1e-3 === 1 / 1000; // 0.001

// // -6 divides by 1 with 6 zeroes
// 1.23e-6 === 1.23 / 1000000; // 0.00000123

// // an example with a bigger number
// 1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
// Hex, binary and octal numbers
// Hexadecimal numbers are widely used in JavaScript to represent colors, encode characters, and for many other things. So naturally, there exists a shorter way to write them: 0x and then the number.

// For instance:

// console.log( 0xff ); // 255
// console.log( 0xFF ); // 255 (the same, case doesn't matter)
// Binary and octal numeral systems are rarely used, but also supported using the 0b and 0o prefixes:

// let a = 0b11111111; // binary form of 255
// let b = 0o377; // octal form of 255

// console.log( a == b ); // true, the same number 255 at both sides
// There are only 3 numeral systems with such support. For other numeral systems, we should use the function parseInt (which we will see later in this chapter).

// toString(base)
// The method num.toString(base) returns a string representation of num in the numeral system with the given base.

// For example:

// let num = 255;

// console.log( num.toString(16) );  // ff
// console.log( num.toString(2) );   // 11111111
// The base can vary from 2 to 36. By default it’s 10.

// Common use cases for this are:

// base=16 is used for hex colors, character encodings etc, digits can be 0..9 or A..F.

// base=2 is mostly for debugging bitwise operations, digits can be 0 or 1.

// base=36 is the maximum, digits can be 0..9 or A..Z. The whole latin alphabet is used to represent a number. A funny, but useful case for 36 is when we need to turn a long numeric identifier into something shorter, for example to make a short url. Can simply represent it in the numeral system with base 36:

// console.log( 123456..toString(36) ); // 2n9c
// Two dots to call a method
// Please note that two dots in 123456..toString(36) is not a typo. If we want to call a method directly on a number, like toString in the example above, then we need to place two dots .. after it.

// If we placed a single dot: 123456.toString(36), then there would be an error, because JavaScript syntax implies the decimal part after the first dot. And if we place one more dot, then JavaScript knows that the decimal part is empty and now goes the method.

// Also could write (123456).toString(36).

// Rounding
// One of the most used operations when working with numbers is rounding.

// There are several built-in functions for rounding:

// Math.floor
// Rounds down: 3.1 becomes 3, and -1.1 becomes -2.
// Math.ceil
// Rounds up: 3.1 becomes 4, and -1.1 becomes -1.
// Math.round
// Rounds to the nearest integer: 3.1 becomes 3, 3.6 becomes 4, the middle case: 3.5 rounds up to 4 too.
// Math.trunc (not supported by Internet Explorer)
// Removes anything after the decimal point without rounding: 3.1 becomes 3, -1.1 becomes -1.
// Here’s the table to summarize the differences between them:

// Math.floor	Math.ceil	Math.round	Math.trunc
// 3.1	3	4	3	3
// 3.6	3	4	4	3
// -1.1	-2	-1	-1	-1
// -1.6	-2	-1	-2	-1
// These functions cover all of the possible ways to deal with the decimal part of a number. But what if we’d like to round the number to n-th digit after the decimal?

// For instance, we have 1.2345 and want to round it to 2 digits, getting only 1.23.

// There are two ways to do so:

// Multiply-and-divide.

// For example, to round the number to the 2nd digit after the decimal, we can multiply the number by 100, call the rounding function and then divide it back.

// let num = 1.23456;

// console.log( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
// The method toFixed(n) rounds the number to n digits after the point and returns a string representation of the result.

// let num = 12.34;
// console.log( num.toFixed(1) ); // "12.3"
// This rounds up or down to the nearest value, similar to Math.round:

// let num = 12.36;
// console.log( num.toFixed(1) ); // "12.4"
// Please note that the result of toFixed is a string. If the decimal part is shorter than required, zeroes are appended to the end:

// let num = 12.34;
// console.log( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits
// We can convert it to a number using the unary plus or a Number() call, e.g write +num.toFixed(5).

// Imprecise calculations
// Internally, a number is represented in 64-bit format IEEE-754, so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

// If a number is really huge, it may overflow the 64-bit storage and become a special numeric value Infinity:

// console.log( 1e500 ); // Infinity
// What may be a little less obvious, but happens quite often, is the loss of precision.

// Consider this (falsy!) equality test:

// console.log( 0.1 + 0.2 == 0.3 ); // false
// That’s right, if we check whether the sum of 0.1 and 0.2 is 0.3, we get false.

// Strange! What is it then if not 0.3?

// console.log( 0.1 + 0.2 ); // 0.30000000000000004
// Ouch! Imagine you’re making an e-shopping site and the visitor puts $0.10 and $0.20 goods into their cart. The order total will be $0.30000000000000004. That would surprise anyone.

// But why does this happen?

// A number is stored in memory in its binary form, a sequence of bits – ones and zeroes. But fractions like 0.1, 0.2 that look simple in the decimal numeric system are actually unending fractions in their binary form.

// What is 0.1? It is one divided by ten 1/10, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: 1/3. It becomes an endless fraction 0.33333(3).

// So, division by powers 10 is guaranteed to work well in the decimal system, but division by 3 is not. For the same reason, in the binary numeral system, the division by powers of 2 is guaranteed to work, but 1/10 becomes an endless binary fraction.

// There’s just no way to store exactly 0.1 or exactly 0.2 using the binary system, just like there is no way to store one-third as a decimal fraction.

// The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don’t allow us to see that “tiny precision loss”, but it exists.

// We can see this in action:

// console.log( 0.1.toFixed(20) ); // 0.10000000000000000555
// And when we sum two numbers, their “precision losses” add up.

// That’s why 0.1 + 0.2 is not exactly 0.3.

// Not only JavaScript
// The same issue exists in many other programming languages.

// PHP, Java, C, Perl, Ruby give exactly the same result, because they are based on the same numeric format.

// Can we work around the problem? Sure, the most reliable method is to round the result with the help of a method toFixed(n):

// let sum = 0.1 + 0.2;
// console.log( sum.toFixed(2) ); // "0.30"
// Please note that toFixed always returns a string. It ensures that it has 2 digits after the decimal point. That’s actually convenient if we have an e-shopping and need to show $0.30. For other cases, we can use the unary plus to coerce it into a number:

// let sum = 0.1 + 0.2;
// console.log( +sum.toFixed(2) ); // 0.3
// We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we’re doing maths with integers, the error somewhat decreases, but we still get it on division:

// console.log( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
// console.log( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
// So, multiply/divide approach reduces the error, but doesn’t remove it totally.

// Sometimes we could try to evade fractions at all. Like if we’re dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut “tails” when needed.

// The funny thing
// Try running this:

// // Hello! I'm a self-increasing number!
// console.log( 9999999999999999 ); // shows 10000000000000000
// This suffers from the same issue: a loss of precision. There are 64 bits for the number, 52 of them can be used to store digits, but that’s not enough. So the least significant digits disappear.

// JavaScript doesn’t trigger an error in such events. It does its best to fit the number into the desired format, but unfortunately, this format is not big enough.

// Two zeroes
// Another funny consequence of the internal representation of numbers is the existence of two zeroes: 0 and -0.

// That’s because a sign is represented by a single bit, so it can be set or not set for any number including a zero.

// In most cases the distinction is unnoticeable, because operators are suited to treat them as the same.

// Tests: isFinite and isNaN
// Remember these two special numeric values?

// Infinity (and -Infinity) is a special numeric value that is greater (less) than anything.
// NaN represents an error.
// They belong to the type number, but are not “normal” numbers, so there are special functions to check for them:

// isNaN(value) converts its argument to a number and then tests it for being NaN:

// console.log( isNaN(NaN) ); // true
// console.log( isNaN("str") ); // true
// But do we need this function? Can’t we just use the comparison === NaN? Unfortunately not. The value NaN is unique in that it does not equal anything, including itself:

// console.log( NaN === NaN ); // false
// isFinite(value) converts its argument to a number and returns true if it’s a regular number, not NaN/Infinity/-Infinity:

// console.log( isFinite("15") ); // true
// console.log( isFinite("str") ); // false, because a special value: NaN
// console.log( isFinite(Infinity) ); // false, because a special value: Infinity
// Sometimes isFinite is used to validate whether a string value is a regular number:

// let num = +prompt("Enter a number", '');

// // will be true unless you enter Infinity, -Infinity or not a number
// console.log( isFinite(num) );
// Please note that an empty or a space-only string is treated as 0 in all numeric functions including isFinite.

// Number.isNaN and Number.isFinite
// Number.isNaN and Number.isFinite methods are the more “strict” versions of isNaN and isFinite functions. They do not autoconvert their argument into a number, but check if it belongs to the number type instead.

// Number.isNaN(value) returns true if the argument belongs to the number type and it is NaN. In any other case it returns false.

// console.log( Number.isNaN(NaN) ); // true
// console.log( Number.isNaN("str" / 2) ); // true

// // Note the difference:
// console.log( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
// console.log( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
// Number.isFinite(value) returns true if the argument belongs to the number type and it is not NaN/Infinity/-Infinity. In any other case it returns false.

// console.log( Number.isFinite(123) ); // true
// console.log( Number.isFinite(Infinity) ); //false
// console.log( Number.isFinite(2 / 0) ); // false

// // Note the difference:
// console.log( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
// console.log( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
// In a way, Number.isNaN and Number.isFinite are simpler and more straightforward than isNaN and isFinite functions. In practice though, isNaN and isFinite are mostly used, as they’re shorter to write.

// Comparison with Object.is
// There is a special built-in method Object.is that compares values like ===, but is more reliable for two edge cases:

// It works with NaN: Object.is(NaN, NaN) === true, that’s a good thing.
// Values 0 and -0 are different: Object.is(0, -0) === false, technically that’s true, because internally the number has a sign bit that may be different even if all other bits are zeroes.
// In all other cases, Object.is(a, b) is the same as a === b.

// We mention Object.is here, because it’s often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses Object.is (internally called SameValue).

// parseInt and parseFloat
// Numeric conversion using a plus + or Number() is strict. If a value is not exactly a number, it fails:

// console.log( +"100px" ); // NaN
// The sole exception is spaces at the beginning or at the end of the string, as they are ignored.

// But in real life we often have values in units, like "100px" or "12pt" in CSS. Also in many countries the currency symbol goes after the amount, so we have "19€" and would like to extract a numeric value out of that.

// That’s what parseInt and parseFloat are for.

// They “read” a number from a string until they can’t. In case of an error, the gathered number is returned. The function parseInt returns an integer, whilst parseFloat will return a floating-point number:

// console.log( parseInt('100px') ); // 100
// console.log( parseFloat('12.5em') ); // 12.5

// console.log( parseInt('12.3') ); // 12, only the integer part is returned
// console.log( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
// There are situations when parseInt/parseFloat will return NaN. It happens when no digits could be read:

// console.log( parseInt('a123') ); // NaN, the first symbol stops the process
// The second argument of parseInt(str, radix)
// The parseInt() function has an optional second parameter. It specifies the base of the numeral system, so parseInt can also parse strings of hex numbers, binary numbers and so on:

// console.log( parseInt('0xff', 16) ); // 255
// console.log( parseInt('ff', 16) ); // 255, without 0x also works

// console.log( parseInt('2n9c', 36) ); // 123456
// Other math functions
// JavaScript has a built-in Math object which contains a small library of mathematical functions and constants.

// A few examples:

// Math.random()
// Returns a random number from 0 to 1 (not including 1).

// console.log( Math.random() ); // 0.1234567894322
// console.log( Math.random() ); // 0.5435252343232
// console.log( Math.random() ); // ... (any random numbers)
// Math.max(a, b, c...) and Math.min(a, b, c...)
// Returns the greatest and smallest from the arbitrary number of arguments.

// console.log( Math.max(3, 5, -10, 0, 1) ); // 5
// console.log( Math.min(1, 2) ); // 1
// Math.pow(n, power)
// Returns n raised to the given power.

// console.log( Math.pow(2, 10) ); // 2 in power 10 = 1024
// There are more functions and constants in Math object, including trigonometry, which you can find in the docs for the Math object.

// Summary
// To write numbers with many zeroes:

// Append "e" with the zeroes count to the number. Like: 123e6 is the same as 123 with 6 zeroes 123000000.
// A negative number after "e" causes the number to be divided by 1 with given zeroes. E.g. 123e-6 means 0.000123 (123 millionths).
// For different numeral systems:

// Can write numbers directly in hex (0x), octal (0o) and binary (0b) systems.
// parseInt(str, base) parses the string str into an integer in numeral system with given base, 2 ≤ base ≤ 36.
// num.toString(base) converts a number to a string in the numeral system with the given base.
// For regular number tests:

// isNaN(value) converts its argument to a number and then tests it for being NaN
// Number.isNaN(value) checks whether its argument belongs to the number type, and if so, tests it for being NaN
// isFinite(value) converts its argument to a number and then tests it for not being NaN/Infinity/-Infinity
// Number.isFinite(value) checks whether its argument belongs to the number type, and if so, tests it for not being NaN/Infinity/-Infinity
// For converting values like 12pt and 100px to a number:

// Use parseInt/parseFloat for the “soft” conversion, which reads a number from a string and then returns the value they could read before the error.
// For fractions:

// Round using Math.floor, Math.ceil, Math.trunc, Math.round or num.toFixed(precision).
// Make sure to remember there’s a loss of precision when working with fractions.
// More mathematical functions:

// See the Math object when you need them. The library is very small, but can cover basic needs.

// ///////////////////////////////////////////////////

// Strings
// Strings
// In JavaScript, the textual data is stored as strings. There is no separate type for a single character.

// The internal format for strings is always UTF-16, it is not tied to the page encoding.

// Quotes
// Let’s recall the kinds of quotes.

// Strings can be enclosed within either single quotes, double quotes or backticks:

// let single = 'single-quoted';
// let double = "double-quoted";

// let backticks = `backticks`;
// Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in ${…}:

// function sum(a, b) {
//   return a + b;
// }

// console.log(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
// Another advantage of using backticks is that they allow a string to span multiple lines:

// let guestList = `Guests:
//  * John
//  * Pete
//  * Mary
// `;

// console.log(guestList); // a list of guests, multiple lines
// Looks natural, right? But single or double quotes do not work this way.

// If we use them and try to use multiple lines, there’ll be an error:

// let guestList = "Guests: // Error: Unexpected token ILLEGAL
//   * John";
// Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

// Backticks also allow us to specify a “template function” before the first backtick. The syntax is: func`string`. The function func is called automatically, receives the string and embedded expressions and can process them. This is called “tagged templates”. This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the manual.

// Special characters
// It is still possible to create multiline strings with single and double quotes by using a so-called “newline character”, written as \n, which denotes a line break:

// let guestList = "Guests:\n * John\n * Pete\n * Mary";

// console.log(guestList); // a multiline list of guests, same as above
// As a simpler example, these two lines are equal, just written differently:

// let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// // two lines using a normal newline and backticks
// let str2 = `Hello
// World`;

// console.log(str1 == str2); // true
// There are other, less common “special” characters:

// Character	Description
// \n	New line
// \r	In Windows text files a combination of two characters \r\n represents a new break, while on non-Windows OS it’s just \n. That’s for historical reasons, most Windows software also understands \n.
// \', \", \`	Quotes
// \\	Backslash
// \t	Tab
// \b, \f, \v	Backspace, Form Feed, Vertical Tab – mentioned for completeness, coming from old times, not used nowadays (you can forget them right now).
// As you can see, all special characters start with a backslash character \. It is also called an “escape character”.

// Because it’s so special, if we need to show an actual backslash \ within the string, we need to double it:

// console.log( `The backslash: \\` ); // The backslash: \
// So-called “escaped” quotes \', \", \` are used to insert a quote into the same-quoted string.

// For instance:

// console.log( 'I\'m the Walrus!' ); // I'm the Walrus!
// As you can see, we have to prepend the inner quote by the backslash \', because otherwise it would indicate the string end.

// Of course, only the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:

// console.log( "I'm the Walrus!" ); // I'm the Walrus!
// Besides these special characters, there’s also a special notation for Unicode codes \u…, we’ll cover it a bit later in this chapter.

// String length
// The length property has the string length:

// console.log( `My\n`.length ); // 3
// Note that \n is a single “special” character, so the length is indeed 3.

// length is a property
// People with a background in some other languages sometimes mistype by calling str.length() instead of just str.length. That doesn’t work.

// Please note that str.length is a numeric property, not a function. There is no need to add parenthesis after it.

// Accessing characters
// To get a character at position pos, use square brackets [pos] or call the method str.charAt(pos). The first character starts from the zero position:

// let str = `Hello`;

// // the first character
// console.log( str[0] ); // H
// console.log( str.charAt(0) ); // H

// // the last character
// console.log( str[str.length - 1] ); // o
// The square brackets are a modern way of getting a character, while charAt exists mostly for historical reasons.

// The only difference between them is that if no character is found, [] returns undefined, and charAt returns an empty string:

// let str = `Hello`;

// console.log( str[1000] ); // undefined
// console.log( str.charAt(1000) ); // '' (an empty string)
// We can also iterate over characters using for..of:

// for (let char of "Hello") {
//   console.log(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
// }
// Strings are immutable
// Strings can’t be changed in JavaScript. It is impossible to change a character.

// Let’s try it to show that it doesn’t work:

// let str = 'Hi';

// str[0] = 'h'; // error
// console.log( str[0] ); // doesn't work
// The usual workaround is to create a whole new string and assign it to str instead of the old one.

// For instance:

// let str = 'Hi';

// str = 'h' + str[1]; // replace the string

// console.log( str ); // hi
// In the following sections we’ll see more examples of this.

// Changing the case
// Methods toLowerCase() and toUpperCase() change the case:

// console.log( 'Interface'.toUpperCase() ); // INTERFACE
// console.log( 'Interface'.toLowerCase() ); // interface
// Or, if we want a single character lowercased:

// console.log( 'Interface'[0].toLowerCase() ); // 'i'
// Searching for a substring
// There are multiple ways to look for a substring within a string.

// str.indexOf
// The first method is str.indexOf(substr, pos).

// It looks for the substr in str, starting from the given position pos, and returns the position where the match was found or -1 if nothing can be found.

// For instance:

// let str = 'Widget with id';

// console.log( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
// console.log( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

// console.log( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)
// The optional second parameter allows us to start searching from a given position.

// For instance, the first occurrence of "id" is at position 1. To look for the next occurrence, let’s start the search from position 2:

// let str = 'Widget with id';

// console.log( str.indexOf('id', 2) ) // 12
// If we’re interested in all occurrences, we can run indexOf in a loop. Every new call is made with the position after the previous match:

// let str = 'As sly as a fox, as strong as an ox';

// let target = 'as'; // let's look for it

// let pos = 0;
// while (true) {
//   let foundPos = str.indexOf(target, pos);
//   if (foundPos == -1) break;

//   console.log( `Found at ${foundPos}` );
//   pos = foundPos + 1; // continue the search from the next position
// }
// The same algorithm can be layed out shorter:

// let str = "As sly as a fox, as strong as an ox";
// let target = "as";

// let pos = -1;
// while ((pos = str.indexOf(target, pos + 1)) != -1) {
//   console.log( pos );
// }
// str.lastIndexOf(substr, position)
// There is also a similar method str.lastIndexOf(substr, position) that searches from the end of a string to its beginning.

// It would list the occurrences in the reverse order.

// There is a slight inconvenience with indexOf in the if test. We can’t put it in the if like this:

// let str = "Widget with id";

// if (str.indexOf("Widget")) {
//     console.log("We found it"); // doesn't work!
// }
// The console.log in the example above doesn’t show because str.indexOf("Widget") returns 0 (meaning that it found the match at the starting position). Right, but if considers 0 to be false.

// So, we should actually check for -1, like this:

// let str = "Widget with id";

// if (str.indexOf("Widget") != -1) {
//     console.log("We found it"); // works now!
// }
// includes, startsWith, endsWith
// The more modern method str.includes(substr, pos) returns true/false depending on whether str contains substr within.

// It’s the right choice if we need to test for the match, but don’t need its position:

// console.log( "Widget with id".includes("Widget") ); // true

// console.log( "Hello".includes("Bye") ); // false
// The optional second argument of str.includes is the position to start searching from:

// console.log( "Widget".includes("id") ); // true
// console.log( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
// The methods str.startsWith and str.endsWith do exactly what they say:

// console.log( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
// console.log( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
// Getting a substring
// There are 3 methods in JavaScript to get a substring: substring, substr and slice.

// str.slice(start [, end])
// Returns the part of the string from start to (but not including) end.

// For instance:

// let str = "stringify";
// console.log( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
// console.log( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
// If there is no second argument, then slice goes till the end of the string:

// let str = "stringify";
// console.log( str.slice(2) ); // 'ringify', from the 2nd position till the end
// Negative values for start/end are also possible. They mean the position is counted from the string end:

// let str = "stringify";

// // start at the 4th position from the right, end at the 1st from the right
// console.log( str.slice(-4, -1) ); // 'gif'
// str.substring(start [, end])
// Returns the part of the string between start and end (not including end).

// This is almost the same as slice, but it allows start to be greater than end (in this case it simply swaps start and end values).

// For instance:

// let str = "stringify";

// // these are same for substring
// console.log( str.substring(2, 6) ); // "ring"
// console.log( str.substring(6, 2) ); // "ring"

// // ...but not for slice:
// console.log( str.slice(2, 6) ); // "ring" (the same)
// console.log( str.slice(6, 2) ); // "" (an empty string)
// Negative arguments are (unlike slice) not supported, they are treated as 0.

// str.substr(start [, length])
// Returns the part of the string from start, with the given length.

// In contrast with the previous methods, this one allows us to specify the length instead of the ending position:

// let str = "stringify";
// console.log( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
// The first argument may be negative, to count from the end:

// let str = "stringify";
// console.log( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
// This method resides in the Annex B of the language specification. It means that only browser-hosted Javascript engines should support it, and it’s not recommended to use it. In practice, it’s supported everywhere.

// Let’s recap these methods to avoid any confusion:

// method	selects…	negatives
// slice(start, end)	from start to end (not including end)	allows negatives
// substring(start, end)	between start and end (not including end)	negative values mean 0
// substr(start, length)	from start get length characters	allows negative start
// Which one to choose?
// All of them can do the job. Formally, substr has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

// Of the other two variants, slice is a little bit more flexible, it allows negative arguments and shorter to write.

// So, for practical use it’s enough to remember only slice.

// Comparing strings
// As we know from the chapter Comparisons, strings are compared character-by-character in alphabetical order.

// Although, there are some oddities.

// A lowercase letter is always greater than the uppercase:

// console.log( 'a' > 'Z' ); // true
// Letters with diacritical marks are “out of order”:

// console.log( 'Österreich' > 'Zealand' ); // true
// This may lead to strange results if we sort these country names. Usually people would expect Zealand to come after Österreich in the list.

// To understand what happens, let’s review the internal representation of strings in JavaScript.

// All strings are encoded using UTF-16. That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

// str.codePointAt(pos)
// Returns a decimal number representing the code for the character at position pos:

// // different case letters have different codes
// console.log( "Z".codePointAt(0) ); // 90
// console.log( "z".codePointAt(0) ); // 122
// console.log( "z".codePointAt(0).toString(16) ); // 7a (if we need a more commonly used hex value of the code)
// String.fromCodePoint(code)
// Creates a character by its numeric code

// console.log( String.fromCodePoint(90) ); // Z
// console.log( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
// We can also add Unicode characters by their codes using \u followed by the hex code:

// // 90 is 5a in hexadecimal system
// console.log( '\u005a' ); // Z
// Now let’s see the characters with codes 65..220 (the latin alphabet and a little bit extra) by making a string of them:

// let str = '';

// for (let i = 65; i <= 220; i++) {
//   str += String.fromCodePoint(i);
// }
// console.log( str );
// // ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// // ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
// See? Capital characters go first, then a few special ones, then lowercase characters, and Ö near the end of the output.

// Now it becomes obvious why a > Z.

// The characters are compared by their numeric code. The greater code means that the character is greater. The code for a (97) is greater than the code for Z (90).

// All lowercase letters go after uppercase letters because their codes are greater.
// Some letters like Ö stand apart from the main alphabet. Here, its code is greater than anything from a to z.
// Correct comparisons
// The “right” algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.

// So, the browser needs to know the language to compare.

// Luckily, all modern browsers (IE10- requires the additional library Intl.js) support the internationalization standard ECMA-402.

// It provides a special method to compare strings in different languages, following their rules.

// The call str.localeCompare(str2) returns an integer indicating whether str is less, equal or greater than str2 according to the language rules:

// Returns a negative number if str is less than str2.
// Returns a positive number if str is greater than str2.
// Returns 0 if they are equivalent.
// For instance:

// console.log( 'Österreich'.localeCompare('Zealand') ); // -1
// This method actually has two additional arguments specified in the documentation, which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should "a" and "á" be treated as the same etc.

// Internals, Unicode
// Advanced knowledge
// The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.

// Unicode characters
// As we already mentioned, JavaScript strings are based on Unicode.

// Each character is represented by a byte sequence of 1-4 bytes.

// JavaScript allows us to specify a character not only by directly including it into a stirng, but also by its hexadecimal Unicode code using these three notations:

// \xXX – a character whose Unicode code point is U+00XX.

// XX is two hexadecimal digits with value between 00 and FF, so \xXX notation can be used only for the first 256 Unicode characters (including all 128 ASCII characters).

// These first 256 characters include latin alphabet, most basic syntax characters and some others. For example, "\x7A" is the same as "z" (Unicode U+007A).

// \uXXXX – a character whose Unicode code point is U+XXXX (a character with the hex code XXXX in UTF-16 encoding).

// XXXX must be exactly 4 hex digits with the value between 0000 and FFFF, so \uXXXX notation can be used for the first 65536 Unicode characters. Characters with Unicode value greater than U+FFFF can also be represented with this notation, but in this case we will need to use a so called surrogate pair (we will talk about surrogate pairs later in this chapter).

// \u{X…XXXXXX} – a character with any given Unicode code point (a character with the given hex code in UTF-32 encoding).

// X…XXXXXX must be a hexadecimal value of 1 to 6 bytes between 0 and 10FFFF (the highest code point defined by Unicode). This notation allows us to easily represent all existing Unicode characters.

// Examples with Unicode:

// console.log( "\uA9" ); // ©, the copyright symbol

// console.log( "\u00A9" ); // ©, the same as above, using the 4-digit hex notation
// console.log( "\u044F" ); // я, the cyrillic alphabet letter
// console.log( "\u2191" ); // ↑, the arrow up symbol

// console.log( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long Unicode)
// console.log( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
// Surrogate pairs
// All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

// Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. But 2 bytes only allow 65536 combinations and that’s not enough for every possible symbol of Unicode.

// So rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters called “a surrogate pair”.

// As a side effect, the length of such symbols is 2:

// console.log( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
// console.log( '😂'.length ); // 2, FACE WITH TEARS OF JOY
// console.log( '𩷶'.length ); // 2, a rare Chinese hieroglyph
// That’s because surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

// We actually have a single symbol in each of the strings above, but the length property shows a length of 2.

// Getting a symbol can also be tricky, because most language features treat surrogate pairs as two characters.

// For example, here we can see two odd characters in the output:

// console.log( '𝒳'[0] ); // shows strange symbols...
// console.log( '𝒳'[1] ); // ...pieces of the surrogate pair
// Pieces of a surrogate pair have no meaning without each other. So the console.logs in the example above actually display garbage.

// Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of 0xd800..0xdbff, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval 0xdc00..0xdfff. These intervals are reserved exclusively for surrogate pairs by the standard.

// So the methods String.fromCodePoint and str.codePointAt were added in JavaScript to deal with surrogate pairs.

// They are essentially the same as String.fromCharCode and str.charCodeAt, but they treat surrogate pairs correctly.

// One can see the difference here:

// // charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:

// console.log( '𝒳'.charCodeAt(0).toString(16) ); // d835

// // codePointAt is surrogate-pair aware
// console.log( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair
// That said, if we take from position 1 (and that’s rather incorrect here), then they both return only the 2nd part of the pair:

// console.log( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
// console.log( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// // meaningless 2nd half of the pair
// You will find more ways to deal with surrogate pairs later in the chapter Iterables. There are probably special libraries for that too, but nothing famous enough to suggest here.

// Takeaway: splitting strings at an arbitrary point is dangerous
// We can’t just split a string at an arbitrary position, e.g. take str.slice(0, 4) and expect it to be a valid string, e.g.:

// console.log( 'hi 😂'.slice(0, 4) ); //  hi [?]
// Here we can see a garbage character (first half of the smile surrogate pair) in the output.

// Just be aware of it if you intend to reliably work with surrogate pairs. May not be a big problem, but at least you should understand what happens.

// Diacritical marks and normalization
// In many languages, there are symbols that are composed of the base character with a mark above/under it.

// For instance, the letter a can be the base character for these characters: àáâäãåā.

// Most common “composite” characters have their own code in the Unicode table. But not all of them, because there are too many possible combinations.

// To support arbitrary compositions, Unicode standard allows us to use several Unicode characters: the base character followed by one or many “mark” characters that “decorate” it.

// For instance, if we have S followed by the special “dot above” character (code \u0307), it is shown as Ṡ.

// console.log( 'S\u0307' ); // Ṡ
// If we need an additional mark above the letter (or below it) – no problem, just add the necessary mark character.

// For instance, if we append a character “dot below” (code \u0323), then we’ll have “S with dots above and below”: Ṩ.

// For example:

// console.log( 'S\u0307\u0323' ); // Ṩ
// This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

// For instance:

// let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
// let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

// console.log( `s1: ${s1}, s2: ${s2}` );

// console.log( s1 == s2 ); // false though the characters look identical (?!)
// To solve this, there exists a “Unicode normalization” algorithm that brings each string to the single “normal” form.

// It is implemented by str.normalize().

// console.log( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
// It’s funny that in our situation normalize() actually brings together a sequence of 3 characters to one: \u1e68 (S with two dots).

// console.log( "S\u0307\u0323".normalize().length ); // 1

// console.log( "S\u0307\u0323".normalize() == "\u1e68" ); // true
// In reality, this is not always the case. The reason being that the symbol Ṩ is “common enough”, so Unicode creators included it in the main table and gave it the code.

// If you want to learn more about normalization rules and variants – they are described in the appendix of the Unicode standard: Unicode Normalization Forms, but for most practical purposes the information from this section is enough.

// Summary
// There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions ${…}.
// Strings in JavaScript are encoded using UTF-16, with surrogate pairs for rare characters (and these cause glitches).
// We can use special characters like \n and insert letters by their Unicode using \u....
// To get a character, use: [].
// To get a substring, use: slice or substring.
// To lowercase/uppercase a string, use: toLowerCase/toUpperCase.
// To look for a substring, use: indexOf, or includes/startsWith/endsWith for simple checks.
// To compare strings according to the language, use: localeCompare, otherwise they are compared by character codes.
// There are several other helpful methods in strings:

// str.trim() – removes (“trims”) spaces from the beginning and end of the string.
// str.repeat(n) – repeats the string n times.
// …and more to be found in the manual.
// Strings also have methods for doing search/replace with regular expressions. But that’s big topic, so it’s explained in a separate tutorial section Regular expressions.

// ///////////////////////////////////////////////////
// Arrays
// Arrays
// Objects allow you to store keyed collections of values. That’s fine.

// But quite often we find that we need an ordered collection, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.

// It is not convenient to use an object here, because it provides no methods to manage the order of elements. We can’t insert a new property “between” the existing ones. Objects are just not meant for such use.

// There exists a special data structure named Array, to store ordered collections.

// Declaration
// There are two syntaxes for creating an empty array:

// let arr = new Array();
// let arr = [];
// Almost all the time, the second syntax is used. We can supply initial elements in the brackets:

// let fruits = ["Apple", "Orange", "Plum"];
// Array elements are numbered, starting with zero.

// We can get an element by its number in square brackets:

// let fruits = ["Apple", "Orange", "Plum"];

// console.log( fruits[0] ); // Apple
// console.log( fruits[1] ); // Orange
// console.log( fruits[2] ); // Plum
// We can replace an element:

// fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
// …Or add a new one to the array:

// fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
// The total count of the elements in the array is its length:

// let fruits = ["Apple", "Orange", "Plum"];

// console.log( fruits.length ); // 3
// We can also use console.log to show the whole array.

// let fruits = ["Apple", "Orange", "Plum"];

// console.log( fruits ); // Apple,Orange,Plum
// An array can store elements of any type.

// For instance:

// // mix of values
// let arr = [ 'Apple', { name: 'John' }, true, function() { console.log('hello'); } ];

// // get the object at index 1 and then show its name
// console.log( arr[1].name ); // John

// // get the function at index 3 and run it
// arr[3](); // hello
// Trailing comma
// An array, just like an object, may end with a comma:

// let fruits = [
//   "Apple",
//   "Orange",
//   "Plum",
// ];
// The “trailing comma” style makes it easier to insert/remove items, because all lines become alike.

// Get last elements with “at”
// A recent addition
// This is a recent addition to the language. Old browsers may need polyfills.
// Let’s say we want the last element of the array.

// Some programming languages allow to use negative indexes for the same purpose, like fruits[-1].

// Although, in JavaScript it won’t work. The result will be undefined, because the index in square brackets is treated literally.

// We can explicitly calculate the last element index and then access it: fruits[fruits.length - 1].

// let fruits = ["Apple", "Orange", "Plum"];

// console.log( fruits[fruits.length-1] ); // Plum
// A bit cumbersome, isn’t it? We need to write the variable name twice.

// Luckily, there’s a shorter syntax: fruits.at(-1):

// let fruits = ["Apple", "Orange", "Plum"];

// // same as fruits[fruits.length-1]
// console.log( fruits.at(-1) ); // Plum
// In other words, arr.at(i):

// is exactly the same as arr[i], if i >= 0.
// for negative values of i, it steps back from the end of the array.
// Methods pop/push, shift/unshift
// A queue is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:

// push appends an element to the end.
// shift get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st.

// Arrays support both operations.

// In practice we need it very often. For example, a queue of messages that need to be shown on-screen.

// There’s another use case for arrays – the data structure named stack.

// It supports two operations:

// push adds an element to the end.
// pop takes an element from the end.
// So new elements are added or taken always from the “end”.

// A stack is usually illustrated as a pack of cards: new cards are added to the top or taken from the top:

// For stacks, the latest pushed item is received first, that’s also called LIFO (Last-In-First-Out) principle. For queues, we have FIFO (First-In-First-Out).

// Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements, both to/from the beginning or the end.

// In computer science, the data structure that allows this, is called deque.

// Methods that work with the end of the array:

// pop
// Extracts the last element of the array and returns it:

// let fruits = ["Apple", "Orange", "Pear"];

// console.log( fruits.pop() ); // remove "Pear" and console.log it

// console.log( fruits ); // Apple, Orange
// Both fruits.pop() and fruits.at(-1) return the last element of the array, but fruits.pop() also modifies the array by removing it.

// push
// Append the element to the end of the array:

// let fruits = ["Apple", "Orange"];

// fruits.push("Pear");

// console.log( fruits ); // Apple, Orange, Pear
// The call fruits.push(...) is equal to fruits[fruits.length] = ....

// Methods that work with the beginning of the array:

// shift
// Extracts the first element of the array and returns it:

// let fruits = ["Apple", "Orange", "Pear"];

// console.log( fruits.shift() ); // remove Apple and console.log it

// console.log( fruits ); // Orange, Pear
// unshift
// Add the element to the beginning of the array:

// let fruits = ["Orange", "Pear"];

// fruits.unshift('Apple');

// console.log( fruits ); // Apple, Orange, Pear
// Methods push and unshift can add multiple elements at once:

// let fruits = ["Apple"];

// fruits.push("Orange", "Peach");
// fruits.unshift("Pineapple", "Lemon");

// // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
// console.log( fruits );
// Internals
// An array is a special kind of object. The square brackets used to access a property arr[0] actually come from the object syntax. That’s essentially the same as obj[key], where arr is the object, while numbers are used as keys.

// They extend objects providing special methods to work with ordered collections of data and also the length property. But at the core it’s still an object.

// Remember, there are only eight basic data types in JavaScript (see the Data types chapter for more info). Array is an object and thus behaves like an object.

// For instance, it is copied by reference:

// let fruits = ["Banana"]

// let arr = fruits; // copy by reference (two variables reference the same array)

// console.log( arr === fruits ); // true

// arr.push("Pear"); // modify the array by reference

// console.log( fruits ); // Banana, Pear - 2 items now
// …But what makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another, just as depicted on the illustrations in this chapter, and there are other optimizations as well, to make arrays work really fast.

// But they all break if we quit working with an array as with an “ordered collection” and start working with it as if it were a regular object.

// For instance, technically we can do this:

// let fruits = []; // make an array

// fruits[99999] = 5; // assign a property with the index far greater than its length

// fruits.age = 25; // create a property with an arbitrary name
// That’s possible, because arrays are objects at their base. We can add any properties to them.

// But the engine will see that we’re working with the array as with a regular object. Array-specific optimizations are not suited for such cases and will be turned off, their benefits disappear.

// The ways to misuse an array:

// Add a non-numeric property like arr.test = 5.
// Make holes, like: add arr[0] and then arr[1000] (and nothing between them).
// Fill the array in the reverse order, like arr[1000], arr[999] and so on.
// Please think of arrays as special structures to work with the ordered data. They provide special methods for that. Arrays are carefully tuned inside JavaScript engines to work with contiguous ordered data, please use them this way. And if you need arbitrary keys, chances are high that you actually require a regular object {}.

// Performance
// Methods push/pop run fast, while shift/unshift are slow.

// Why is it faster to work with the end of an array than with its beginning? Let’s see what happens during the execution:

// fruits.shift(); // take 1 element from the start
// It’s not enough to take and remove the element with the index 0. Other elements need to be renumbered as well.

// The shift operation must do 3 things:

// Remove the element with the index 0.
// Move all elements to the left, renumber them from the index 1 to 0, from 2 to 1 and so on.
// Update the length property.

// The more elements in the array, the more time to move them, more in-memory operations.

// The similar thing happens with unshift: to add an element to the beginning of the array, we need first to move existing elements to the right, increasing their indexes.

// And what’s with push/pop? They do not need to move anything. To extract an element from the end, the pop method cleans the index and shortens length.

// The actions for the pop operation:

// fruits.pop(); // take 1 element from the end

// The pop method does not need to move anything, because other elements keep their indexes. That’s why it’s blazingly fast.

// The similar thing with the push method.

// Loops
// One of the oldest ways to cycle array items is the for loop over indexes:

// let arr = ["Apple", "Orange", "Pear"];

// for (let i = 0; i < arr.length; i++) {
//   console.log( arr[i] );
// }
// But for arrays there is another form of loop, for..of:

// let fruits = ["Apple", "Orange", "Plum"];

// // iterates over array elements
// for (let fruit of fruits) {
//   console.log( fruit );
// }
// The for..of doesn’t give access to the number of the current element, just its value, but in most cases that’s enough. And it’s shorter.

// Technically, because arrays are objects, it is also possible to use for..in:

// let arr = ["Apple", "Orange", "Pear"];

// for (let key in arr) {
//   console.log( arr[key] ); // Apple, Orange, Pear
// }
// But that’s actually a bad idea. There are potential problems with it:

// The loop for..in iterates over all properties, not only the numeric ones.

// There are so-called “array-like” objects in the browser and in other environments, that look like arrays. That is, they have length and indexes properties, but they may also have other non-numeric properties and methods, which we usually don’t need. The for..in loop will list them though. So if we need to work with array-like objects, then these “extra” properties can become a problem.

// The for..in loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it’s still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.

// Generally, we shouldn’t use for..in for arrays.

// A word about “length”
// The length property automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the greatest numeric index plus one.

// For instance, a single element with a large index gives a big length:

// let fruits = [];
// fruits[123] = "Apple";

// console.log( fruits.length ); // 124
// Note that we usually don’t use arrays like that.

// Another interesting thing about the length property is that it’s writable.

// If we increase it manually, nothing interesting happens. But if we decrease it, the array is truncated. The process is irreversible, here’s the example:

// let arr = [1, 2, 3, 4, 5];

// arr.length = 2; // truncate to 2 elements
// console.log( arr ); // [1, 2]

// arr.length = 5; // return length back
// console.log( arr[3] ); // undefined: the values do not return
// So, the simplest way to clear the array is: arr.length = 0;.

// new Array()
// There is one more syntax to create an array:

// let arr = new Array("Apple", "Pear", "etc");
// It’s rarely used, because square brackets [] are shorter. Also, there’s a tricky feature with it.

// If new Array is called with a single argument which is a number, then it creates an array without items, but with the given length.

// Let’s see how one can shoot themselves in the foot:

// let arr = new Array(2); // will it create an array of [2] ?

// console.log( arr[0] ); // undefined! no elements.

// console.log( arr.length ); // length 2
// To avoid such surprises, we usually use square brackets, unless we really know what we’re doing.

// Multidimensional arrays
// Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:

// let matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];

// console.log( matrix[1][1] ); // 5, the central element
// toString
// Arrays have their own implementation of toString method that returns a comma-separated list of elements.

// For instance:

// let arr = [1, 2, 3];

// console.log( arr ); // 1,2,3
// console.log( String(arr) === '1,2,3' ); // true
// Also, let’s try this:

// console.log( [] + 1 ); // "1"
// console.log( [1] + 1 ); // "11"
// console.log( [1,2] + 1 ); // "1,21"
// Arrays do not have Symbol.toPrimitive, neither a viable valueOf, they implement only toString conversion, so here [] becomes an empty string, [1] becomes "1" and [1,2] becomes "1,2".

// When the binary plus "+" operator adds something to a string, it converts it to a string as well, so the next step looks like this:

// console.log( "" + 1 ); // "1"
// console.log( "1" + 1 ); // "11"
// console.log( "1,2" + 1 ); // "1,21"
// Don’t compare arrays with ==
// Arrays in JavaScript, unlike some other programming languages, shouldn’t be compared with operator ==.

// This operator has no special treatment for arrays, it works with them as with any objects.

// Let’s recall the rules:

// Two objects are equal == only if they’re references to the same object.
// If one of the arguments of == is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter Object to primitive conversion.
// …With an exception of null and undefined that equal == each other and nothing else.
// The strict comparison === is even simpler, as it doesn’t convert types.

// So, if we compare arrays with ==, they are never the same, unless we compare two variables that reference exactly the same array.

// For example:

// console.log( [] == [] ); // false
// console.log( [0] == [0] ); // false
// These arrays are technically different objects. So they aren’t equal. The == operator doesn’t do item-by-item comparison.

// Comparison with primitives may give seemingly strange results as well:

// console.log( 0 == [] ); // true

// console.log('0' == [] ); // false
// Here, in both cases, we compare a primitive with an array object. So the array [] gets converted to primitive for the purpose of comparison and becomes an empty string ''.

// Then the comparison process goes on with the primitives, as described in the chapter Type Conversions:

// // after [] was converted to ''
// console.log( 0 == '' ); // true, as '' becomes converted to number 0

// console.log('0' == '' ); // false, no type conversion, different strings
// So, how to compare arrays?

// That’s simple: don’t use the == operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.

// Summary
// Array is a special kind of object, suited to storing and managing ordered data items.

// The declaration:

// // square brackets (usual)
// let arr = [item1, item2...];

// // new Array (exceptionally rare)
// let arr = new Array(item1, item2...);
// The call to new Array(number) creates an array with the given length, but without elements.

// The length property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.
// If we shorten length manually, the array is truncated.
// Getting the elements:

// we can get element by its index, like arr[0]
// also we can use at(i) method that allows negative indexes. For negative values of i, it steps back from the end of the array. If i >= 0, it works same as arr[i].
// We can use an array as a deque with the following operations:

// push(...items) adds items to the end.
// pop() removes the element from the end and returns it.
// shift() removes the element from the beginning and returns it.
// unshift(...items) adds items to the beginning.
// To loop over the elements of the array:

// for (let i=0; i<arr.length; i++) – works fastest, old-browser-compatible.
// for (let item of arr) – the modern syntax for items only,
// for (let i in arr) – never use.
// To compare arrays, don’t use the == operator (as well as >, < and others), as they have no special treatment for arrays. They handle them as any objects, and it’s not what we usually want.

// Instead you can use for..of loop to compare arrays item-by-item.

// We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter Array methods.

// ///////////////////////////////////////////////////
// Array methods
// Array methods
// Arrays provide a lot of methods. To make things easier, in this chapter they are split into groups.

// Add/remove items
// We already know methods that add and remove items from the beginning or the end:

// arr.push(...items) – adds items to the end,
// arr.pop() – extracts an item from the end,
// arr.shift() – extracts an item from the beginning,
// arr.unshift(...items) – adds items to the beginning.
// Here are a few others.

// splice
// How to delete an element from the array?

// The arrays are objects, so we can try to use delete:

// let arr = ["I", "go", "home"];

// delete arr[1]; // remove "go"

// console.log( arr[1] ); // undefined

// // now arr = ["I",  , "home"];
// console.log( arr.length ); // 3
// The element was removed, but the array still has 3 elements, we can see that arr.length == 3.

// That’s natural, because delete obj.key removes a value by the key. It’s all it does. Fine for objects. But for arrays we usually want the rest of elements to shift and occupy the freed place. We expect to have a shorter array now.

// So, special methods should be used.

// The arr.splice method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.

// The syntax is:

// arr.splice(start[, deleteCount, elem1, ..., elemN])
// It modifies arr starting from the index start: removes deleteCount elements and then inserts elem1, ..., elemN at their place. Returns the array of removed elements.

// This method is easy to grasp by examples.

// Let’s start with the deletion:

// let arr = ["I", "study", "JavaScript"];

// arr.splice(1, 1); // from index 1 remove 1 element

// console.log( arr ); // ["I", "JavaScript"]
// Easy, right? Starting from the index 1 it removed 1 element.

// In the next example we remove 3 elements and replace them with the other two:

// let arr = ["I", "study", "JavaScript", "right", "now"];

// // remove 3 first elements and replace them with another
// arr.splice(0, 3, "Let's", "dance");

// console.log( arr ) // now ["Let's", "dance", "right", "now"]
// Here we can see that splice returns the array of removed elements:

// let arr = ["I", "study", "JavaScript", "right", "now"];

// // remove 2 first elements
// let removed = arr.splice(0, 2);

// console.log( removed ); // "I", "study" <-- array of removed elements
// The splice method is also able to insert the elements without any removals. For that we need to set deleteCount to 0:

// let arr = ["I", "study", "JavaScript"];

// // from index 2
// // delete 0
// // then insert "complex" and "language"
// arr.splice(2, 0, "complex", "language");

// console.log( arr ); // "I", "study", "complex", "language", "JavaScript"
// Negative indexes allowed
// Here and in other array methods, negative indexes are allowed. They specify the position from the end of the array, like here:

// let arr = [1, 2, 5];

// // from index -1 (one step from the end)
// // delete 0 elements,
// // then insert 3 and 4
// arr.splice(-1, 0, 3, 4);

// console.log( arr ); // 1,2,3,4,5
// slice
// The method arr.slice is much simpler than similar-looking arr.splice.

// The syntax is:

// arr.slice([start], [end])
// It returns a new array copying to it all items from index start to end (not including end). Both start and end can be negative, in that case position from array end is assumed.

// It’s similar to a string method str.slice, but instead of substrings it makes subarrays.

// For instance:

// let arr = ["t", "e", "s", "t"];

// console.log( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

// console.log( arr.slice(-2) ); // s,t (copy from -2 till the end)
// We can also call it without arguments: arr.slice() creates a copy of arr. That’s often used to obtain a copy for further transformations that should not affect the original array.

// concat
// The method arr.concat creates a new array that includes values from other arrays and additional items.

// The syntax is:

// arr.concat(arg1, arg2...)
// It accepts any number of arguments – either arrays or values.

// The result is a new array containing items from arr, then arg1, arg2 etc.

// If an argument argN is an array, then all its elements are copied. Otherwise, the argument itself is copied.

// For instance:

// let arr = [1, 2];

// // create an array from: arr and [3,4]
// console.log( arr.concat([3, 4]) ); // 1,2,3,4

// // create an array from: arr and [3,4] and [5,6]
// console.log( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// // create an array from: arr and [3,4], then add values 5 and 6
// console.log( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
// Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:

// let arr = [1, 2];

// let arrayLike = {
//   0: "something",
//   length: 1
// };

// console.log( arr.concat(arrayLike) ); // 1,2,[object Object]
// …But if an array-like object has a special Symbol.isConcatSpreadable property, then it’s treated as an array by concat: its elements are added instead:

// let arr = [1, 2];

// let arrayLike = {
//   0: "something",
//   1: "else",
//   [Symbol.isConcatSpreadable]: true,
//   length: 2
// };

// console.log( arr.concat(arrayLike) ); // 1,2,something,else
// Iterate: forEach
// The arr.forEach method allows to run a function for every element of the array.

// The syntax:

// arr.forEach(function(item, index, array) {
//   // ... do something with item
// });
// For instance, this shows each element of the array:

// // for each element call console.log
// ["Bilbo", "Gandalf", "Nazgul"].forEach(console.log);
// And this code is more elaborate about their positions in the target array:

// ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
//   console.log(`${item} is at index ${index} in ${array}`);
// });
// The result of the function (if it returns any) is thrown away and ignored.

// Searching in array
// Now let’s cover methods that search in an array.

// indexOf/lastIndexOf and includes
// The methods arr.indexOf and arr.includes have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:

// arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
// arr.includes(item, from) – looks for item starting from index from, returns true if found.
// Usually these methods are used with only one argument: the item to search. By default, the search is from the beginning.

// For instance:

// let arr = [1, 0, false];

// console.log( arr.indexOf(0) ); // 1
// console.log( arr.indexOf(false) ); // 2
// console.log( arr.indexOf(null) ); // -1

// console.log( arr.includes(1) ); // true
// Please note that indexOf uses the strict equality === for comparison. So, if we look for false, it finds exactly false and not the zero.

// If we want to check if item exists in the array, and don’t need the exact index, then arr.includes is preferred.

// The method arr.lastIndexOf is the same as indexOf, but looks for from right to left.

// let fruits = ['Apple', 'Orange', 'Apple']

// console.log( fruits.indexOf('Apple') ); // 0 (first Apple)
// console.log( fruits.lastIndexOf('Apple') ); // 2 (last Apple)
// The includes method handles NaN correctly
// A minor, but noteworthy feature of includes is that it correctly handles NaN, unlike indexOf:

// const arr = [NaN];
// console.log( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
// console.log( arr.includes(NaN) );// true (correct)
// That’s because includes was added to JavaScript much later and uses the more up to date comparison algorithm internally.

// find and findIndex/findLastIndex
// Imagine we have an array of objects. How do we find an object with the specific condition?

// Here the arr.find(fn) method comes in handy.

// The syntax is:

// let result = arr.find(function(item, index, array) {
//   // if true is returned, item is returned and iteration is stopped
//   // for falsy scenario returns undefined
// });
// The function is called for elements of the array, one after another:

// item is the element.
// index is its index.
// array is the array itself.
// If it returns true, the search is stopped, the item is returned. If nothing found, undefined is returned.

// For example, we have an array of users, each with the fields id and name. Let’s find the one with id == 1:

// let users = [
//   {id: 1, name: "John"},
//   {id: 2, name: "Pete"},
//   {id: 3, name: "Mary"}
// ];

// let user = users.find(item => item.id == 1);

// console.log(user.name); // John
// In real life arrays of objects is a common thing, so the find method is very useful.

// Note that in the example we provide to find the function item => item.id == 1 with one argument. That’s typical, other arguments of this function are rarely used.

// The arr.findIndex method has the same syntax, but returns the index where the element was found instead of the element itself. The value of -1 is returned if nothing is found.

// The arr.findLastIndex method is like findIndex, but searches from right to left, similar to lastIndexOf.

// Here’s an example:

// let users = [
//   {id: 1, name: "John"},
//   {id: 2, name: "Pete"},
//   {id: 3, name: "Mary"},
//   {id: 4, name: "John"}
// ];

// // Find the index of the first John
// console.log(users.findIndex(user => user.name == 'John')); // 0

// // Find the index of the last John
// console.log(users.findLastIndex(user => user.name == 'John')); // 3
// filter
// The find method looks for a single (first) element that makes the function return true.

// If there may be many, we can use arr.filter(fn).

// The syntax is similar to find, but filter returns an array of all matching elements:

// let results = arr.filter(function(item, index, array) {
//   // if true item is pushed to results and the iteration continues
//   // returns empty array if nothing found
// });
// For instance:

// let users = [
//   {id: 1, name: "John"},
//   {id: 2, name: "Pete"},
//   {id: 3, name: "Mary"}
// ];

// // returns array of the first two users
// let someUsers = users.filter(item => item.id < 3);

// console.log(someUsers.length); // 2
// Transform an array
// Let’s move on to methods that transform and reorder an array.

// map
// The arr.map method is one of the most useful and often used.

// It calls the function for each element of the array and returns the array of results.

// The syntax is:

// let result = arr.map(function(item, index, array) {
//   // returns the new value instead of item
// });
// For instance, here we transform each element into its length:

// let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
// console.log(lengths); // 5,7,6
// sort(fn)
// The call to arr.sort() sorts the array in place, changing its element order.

// It also returns the sorted array, but the returned value is usually ignored, as arr itself is modified.

// For instance:

// let arr = [ 1, 2, 15 ];

// // the method reorders the content of arr
// arr.sort();

// console.log( arr );  // 1, 15, 2
// Did you notice anything strange in the outcome?

// The order became 1, 15, 2. Incorrect. But why?

// The items are sorted as strings by default.

// Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed "2" > "15".

// To use our own sorting order, we need to supply a function as the argument of arr.sort().

// The function should compare two arbitrary values and return:

// function compare(a, b) {
//   if (a > b) return 1; // if the first value is greater than the second
//   if (a == b) return 0; // if values are equal
//   if (a < b) return -1; // if the first value is less than the second
// }
// For instance, to sort as numbers:

// function compareNumeric(a, b) {
//   if (a > b) return 1;
//   if (a == b) return 0;
//   if (a < b) return -1;
// }

// let arr = [ 1, 2, 15 ];

// arr.sort(compareNumeric);

// console.log(arr);  // 1, 2, 15
// Now it works as intended.

// Let’s step aside and think what’s happening. The arr can be array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of some items. To sort it, we need an ordering function that knows how to compare its elements. The default is a string order.

// The arr.sort(fn) method implements a generic sorting algorithm. We don’t need to care how it internally works (an optimized quicksort or Timsort most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the fn which does the comparison.

// By the way, if we ever want to know which elements are compared – nothing prevents from console.loging them:

// [1, -2, 15, 2, 0, 8].sort(function(a, b) {
//   console.log( a + " <> " + b );
//   return a - b;
// });
// The algorithm may compare an element with multiple others in the process, but it tries to make as few comparisons as possible.

// A comparison function may return any number
// Actually, a comparison function is only required to return a positive number to say “greater” and a negative number to say “less”.

// That allows to write shorter functions:

// let arr = [ 1, 2, 15 ];

// arr.sort(function(a, b) { return a - b; });

// console.log(arr);  // 1, 2, 15
// Arrow functions for the best
// Remember arrow functions? We can use them here for neater sorting:

// arr.sort( (a, b) => a - b );
// This works exactly the same as the longer version above.

// Use localeCompare for strings
// Remember strings comparison algorithm? It compares letters by their codes by default.

// For many alphabets, it’s better to use str.localeCompare method to correctly sort letters, such as Ö.

// For example, let’s sort a few countries in German:

// let countries = ['Österreich', 'Andorra', 'Vietnam'];

// console.log( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

// console.log( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
// reverse
// The method arr.reverse reverses the order of elements in arr.

// For instance:

// let arr = [1, 2, 3, 4, 5];
// arr.reverse();

// console.log( arr ); // 5,4,3,2,1
// It also returns the array arr after the reversal.

// split and join
// Here’s the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: John, Pete, Mary. But for us an array of names would be much more comfortable than a single string. How to get it?

// The str.split(delim) method does exactly that. It splits the string into an array by the given delimiter delim.

// In the example below, we split by a comma followed by space:

// let names = 'Bilbo, Gandalf, Nazgul';

// let arr = names.split(', ');

// for (let name of arr) {
//   console.log( `A message to ${name}.` ); // A message to Bilbo  (and other names)
// }
// The split method has an optional second numeric argument – a limit on the array length. If it is provided, then the extra elements are ignored. In practice it is rarely used though:

// let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

// console.log(arr); // Bilbo, Gandalf
// Split into letters
// The call to split(s) with an empty s would split the string into an array of letters:

// let str = "test";

// console.log( str.split('') ); // t,e,s,t
// The call arr.join(glue) does the reverse to split. It creates a string of arr items joined by glue between them.

// For instance:

// let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

// let str = arr.join(';'); // glue the array into a string using ;

// console.log( str ); // Bilbo;Gandalf;Nazgul
// reduce/reduceRight
// When we need to iterate over an array – we can use forEach, for or for..of.

// When we need to iterate and return the data for each element – we can use map.

// The methods arr.reduce and arr.reduceRight also belong to that breed, but are a little bit more intricate. They are used to calculate a single value based on the array.

// The syntax is:

// let value = arr.reduce(function(accumulator, item, index, array) {
//   // ...
// }, [initial]);
// The function is applied to all array elements one after another and “carries on” its result to the next call.

// Arguments:

// accumulator – is the result of the previous function call, equals initial the first time (if initial is provided).
// item – is the current array item.
// index – is its position.
// array – is the array.
// As function is applied, the result of the previous function call is passed to the next one as the first argument.

// So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end it becomes the result of reduce.

// Sounds complicated?

// The easiest way to grasp that is by example.

// Here we get a sum of an array in one line:

// let arr = [1, 2, 3, 4, 5];

// let result = arr.reduce((sum, current) => sum + current, 0);

// console.log(result); // 15
// The function passed to reduce uses only 2 arguments, that’s typically enough.

// Let’s see the details of what’s going on.

// On the first run, sum is the initial value (the last argument of reduce), equals 0, and current is the first array element, equals 1. So the function result is 1.
// On the second run, sum = 1, we add the second array element (2) to it and return.
// On the 3rd run, sum = 3 and we add one more element to it, and so on…
// The calculation flow:

// Or in the form of a table, where each row represents a function call on the next array element:

// sum	current	result
// the first call	0	1	1
// the second call	1	2	3
// the third call	3	3	6
// the fourth call	6	4	10
// the fifth call	10	5	15
// Here we can clearly see how the result of the previous call becomes the first argument of the next one.

// We also can omit the initial value:

// let arr = [1, 2, 3, 4, 5];

// // removed initial value from reduce (no 0)
// let result = arr.reduce((sum, current) => sum + current);

// console.log( result ); // 15
// The result is the same. That’s because if there’s no initial, then reduce takes the first element of the array as the initial value and starts the iteration from the 2nd element.

// The calculation table is the same as above, minus the first row.

// But such use requires an extreme care. If the array is empty, then reduce call without initial value gives an error.

// Here’s an example:

// let arr = [];

// // Error: Reduce of empty array with no initial value
// // if the initial value existed, reduce would return it for the empty arr.
// arr.reduce((sum, current) => sum + current);
// So it’s advised to always specify the initial value.

// The method arr.reduceRight does the same, but goes from right to left.

// Array.isArray
// Arrays do not form a separate language type. They are based on objects.

// So typeof does not help to distinguish a plain object from an array:

// console.log(typeof {}); // object
// console.log(typeof []); // object (same)
// …But arrays are used so often that there’s a special method for that: Array.isArray(value). It returns true if the value is an array, and false otherwise.

// console.log(Array.isArray({})); // false

// console.log(Array.isArray([])); // true
// Most methods support “thisArg”
// Almost all array methods that call functions – like find, filter, map, with a notable exception of sort, accept an optional additional parameter thisArg.

// That parameter is not explained in the sections above, because it’s rarely used. But for completeness we have to cover it.

// Here’s the full syntax of these methods:

// arr.find(func, thisArg);
// arr.filter(func, thisArg);
// arr.map(func, thisArg);
// // ...
// // thisArg is the optional last argument
// The value of thisArg parameter becomes this for func.

// For example, here we use a method of army object as a filter, and thisArg passes the context:

// let army = {
//   minAge: 18,
//   maxAge: 27,
//   canJoin(user) {
//     return user.age >= this.minAge && user.age < this.maxAge;
//   }
// };

// let users = [
//   {age: 16},
//   {age: 20},
//   {age: 23},
//   {age: 30}
// ];

// // find users, for who army.canJoin returns true
// let soldiers = users.filter(army.canJoin, army);

// console.log(soldiers.length); // 2
// console.log(soldiers[0].age); // 20
// console.log(soldiers[1].age); // 23
// If in the example above we used users.filter(army.canJoin), then army.canJoin would be called as a standalone function, with this=undefined, thus leading to an instant error.

// A call to users.filter(army.canJoin, army) can be replaced with users.filter(user => army.canJoin(user)), that does the same. The latter is used more often, as it’s a bit easier to understand for most people.

// Summary
// A cheat sheet of array methods:

// To add/remove elements:

// push(...items) – adds items to the end,
// pop() – extracts an item from the end,
// shift() – extracts an item from the beginning,
// unshift(...items) – adds items to the beginning.
// splice(pos, deleteCount, ...items) – at index pos deletes deleteCount elements and inserts items.
// slice(start, end) – creates a new array, copies elements from index start till end (not inclusive) into it.
// concat(...items) – returns a new array: copies all members of the current one and adds items to it. If any of items is an array, then its elements are taken.
// To search among elements:

// indexOf/lastIndexOf(item, pos) – look for item starting from position pos, return the index or -1 if not found.
// includes(value) – returns true if the array has value, otherwise false.
// find/filter(func) – filter elements through the function, return first/all values that make it return true.
// findIndex is like find, but returns the index instead of a value.
// To iterate over elements:

// forEach(func) – calls func for every element, does not return anything.
// To transform the array:

// map(func) – creates a new array from results of calling func for every element.
// sort(func) – sorts the array in-place, then returns it.
// reverse() – reverses the array in-place, then returns it.
// split/join – convert a string to array and back.
// reduce/reduceRight(func, initial) – calculate a single value over the array by calling func for each element and passing an intermediate result between the calls.
// Additionally:

// Array.isArray(value) checks value for being an array, if so returns true, otherwise false.
// Please note that methods sort, reverse and splice modify the array itself.

// These methods are the most used ones, they cover 99% of use cases. But there are few others:

// arr.some(fn)/arr.every(fn) check the array.

// The function fn is called on each element of the array similar to map. If any/all results are true, returns true, otherwise false.

// These methods behave sort of like || and && operators: if fn returns a truthy value, arr.some() immediately returns true and stops iterating over the rest of items; if fn returns a falsy value, arr.every() immediately returns false and stops iterating over the rest of items as well.

// We can use every to compare arrays:

// function arraysEqual(arr1, arr2) {
//   return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
// }

// console.log( arraysEqual([1, 2], [1, 2])); // true
// arr.fill(value, start, end) – fills the array with repeating value from index start to end.

// arr.copyWithin(target, start, end) – copies its elements from position start till position end into itself, at position target (overwrites existing).

// arr.flat(depth)/arr.flatMap(fn) create a new flat array from a multidimensional array.

// For the full list, see the manual.

// From the first sight it may seem that there are so many methods, quite difficult to remember. But actually that’s much easier.

// Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.

// Afterwards whenever you need to do something with an array, and you don’t know how – come here, look at the cheat sheet and find the right method. Examples will help you to write it correctly. Soon you’ll automatically remember the methods, without specific efforts from your side.

// ///////////////////////////////////////////////////
// Iterables
// Iterables
// Iterable objects are a generalization of arrays. That’s a concept that allows us to make any object useable in a for..of loop.

// Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

// If an object isn’t technically an array, but represents a collection (list, set) of something, then for..of is a great syntax to loop over it, so let’s see how to make it work.

// Symbol.iterator
// We can easily grasp the concept of iterables by making one of our own.

// For instance, we have an object that is not an array, but looks suitable for for..of.

// Like a range object that represents an interval of numbers:

// let range = {
//   from: 1,
//   to: 5
// };

// // We want the for..of to work:
// // for(let num of range) ... num=1,2,3,4,5
// To make the range object iterable (and thus let for..of work) we need to add a method to the object named Symbol.iterator (a special built-in symbol just for that).

// When for..of starts, it calls that method once (or errors if not found). The method must return an iterator – an object with the method next.
// Onward, for..of works only with that returned object.
// When for..of wants the next value, it calls next() on that object.
// The result of next() must have the form {done: Boolean, value: any}, where done=true means that the loop is finished, otherwise value is the next value.
// Here’s the full implementation for range with remarks:

// let range = {
//   from: 1,
//   to: 5
// };

// // 1. call to for..of initially calls this
// range[Symbol.iterator] = function() {

//   // ...it returns the iterator object:
//   // 2. Onward, for..of works only with the iterator object below, asking it for next values
//   return {
//     current: this.from,
//     last: this.to,

//     // 3. next() is called on each iteration by the for..of loop
//     next() {
//       // 4. it should return the value as an object {done:.., value :...}
//       if (this.current <= this.last) {
//         return { done: false, value: this.current++ };
//       } else {
//         return { done: true };
//       }
//     }
//   };
// };

// // now it works!
// for (let num of range) {
//   console.log(num); // 1, then 2, 3, 4, 5
// }
// Please note the core feature of iterables: separation of concerns.

// The range itself does not have the next() method.
// Instead, another object, a so-called “iterator” is created by the call to range[Symbol.iterator](), and its next() generates values for the iteration.
// So, the iterator object is separate from the object it iterates over.

// Technically, we may merge them and use range itself as the iterator to make the code simpler.

// Like this:

// let range = {
//   from: 1,
//   to: 5,

//   [Symbol.iterator]() {
//     this.current = this.from;
//     return this;
//   },

//   next() {
//     if (this.current <= this.to) {
//       return { done: false, value: this.current++ };
//     } else {
//       return { done: true };
//     }
//   }
// };

// for (let num of range) {
//   console.log(num); // 1, then 2, 3, 4, 5
// }
// Now range[Symbol.iterator]() returns the range object itself: it has the necessary next() method and remembers the current iteration progress in this.current. Shorter? Yes. And sometimes that’s fine too.

// The downside is that now it’s impossible to have two for..of loops running over the object simultaneously: they’ll share the iteration state, because there’s only one iterator – the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.

// Infinite iterators
// Infinite iterators are also possible. For instance, the range becomes infinite for range.to = Infinity. Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.

// There are no limitations on next, it can return more and more values, that’s normal.

// Of course, the for..of loop over such an iterable would be endless. But we can always stop it using break.

// String is iterable
// Arrays and strings are most widely used built-in iterables.

// For a string, for..of loops over its characters:

// for (let char of "test") {
//   // triggers 4 times: once for each character
//   console.log( char ); // t, then e, then s, then t
// }
// And it works correctly with surrogate pairs!

// let str = '𝒳😂';
// for (let char of str) {
//     console.log( char ); // 𝒳, and then 😂
// }
// Calling an iterator explicitly
// For deeper understanding, let’s see how to use an iterator explicitly.

// We’ll iterate over a string in exactly the same way as for..of, but with direct calls. This code creates a string iterator and gets values from it “manually”:

// let str = "Hello";

// // does the same as
// // for (let char of str) console.log(char);

// let iterator = str[Symbol.iterator]();

// while (true) {
//   let result = iterator.next();
//   if (result.done) break;
//   console.log(result.value); // outputs characters one by one
// }
// That is rarely needed, but gives us more control over the process than for..of. For instance, we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

// Iterables and array-likes
// Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.

// Iterables are objects that implement the Symbol.iterator method, as described above.
// Array-likes are objects that have indexes and length, so they look like arrays.
// When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.

// For instance, strings are both iterable (for..of works on them) and array-like (they have numeric indexes and length).

// But an iterable may be not array-like. And vice versa an array-like may be not iterable.

// For example, the range in the example above is iterable, but not array-like, because it does not have indexed properties and length.

// And here’s the object that is array-like, but not iterable:

// let arrayLike = { // has indexes and length => array-like
//   0: "Hello",
//   1: "World",
//   length: 2
// };

// // Error (no Symbol.iterator)
// for (let item of arrayLike) {}
// Both iterables and array-likes are usually not arrays, they don’t have push, pop etc. That’s rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with range using array methods. How to achieve that?

// Array.from
// There’s a universal method Array.from that takes an iterable or array-like value and makes a “real” Array from it. Then we can call array methods on it.

// For instance:

// let arrayLike = {
//   0: "Hello",
//   1: "World",
//   length: 2
// };

// let arr = Array.from(arrayLike); // (*)
// console.log(arr.pop()); // World (method works)
// Array.from at the line (*) takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.

// The same happens for an iterable:

// // assuming that range is taken from the example above
// let arr = Array.from(range);
// console.log(arr); // 1,2,3,4,5 (array toString conversion works)
// The full syntax for Array.from also allows us to provide an optional “mapping” function:

// Array.from(obj[, mapFn, thisArg])
// The optional second argument mapFn can be a function that will be applied to each element before adding it to the array, and thisArg allows us to set this for it.

// For instance:

// // assuming that range is taken from the example above

// // square each number
// let arr = Array.from(range, num => num * num);

// console.log(arr); // 1,4,9,16,25
// Here we use Array.from to turn a string into an array of characters:

// let str = '𝒳😂';

// // splits str into array of characters
// let chars = Array.from(str);

// console.log(chars[0]); // 𝒳
// console.log(chars[1]); // 😂
// console.log(chars.length); // 2
// Unlike str.split, it relies on the iterable nature of the string and so, just like for..of, correctly works with surrogate pairs.

// Technically here it does the same as:

// let str = '𝒳😂';

// let chars = []; // Array.from internally does the same loop
// for (let char of str) {
//   chars.push(char);
// }

// console.log(chars);
// …But it is shorter.

// We can even build surrogate-aware slice on it:

// function slice(str, start, end) {
//   return Array.from(str).slice(start, end).join('');
// }

// let str = '𝒳😂𩷶';

// console.log( slice(str, 1, 3) ); // 😂𩷶

// // the native method does not support surrogate pairs
// console.log( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
// ///////////////////////////////////////////////////
// Map and Set
// Map and Set
// Till now, we’ve learned about the following complex data structures:

// Objects are used for storing keyed collections.
// Arrays are used for storing ordered collections.
// But that’s not enough for real life. That’s why Map and Set also exist.

// Map
// Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

// Methods and properties are:

// new Map() – creates the map.
// map.set(key, value) – stores the value by the key.
// map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the value by the key.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.
// For instance:

// let map = new Map();

// map.set('1', 'str1');   // a string key
// map.set(1, 'num1');     // a numeric key
// map.set(true, 'bool1'); // a boolean key

// // remember the regular Object? it would convert keys to string
// // Map keeps the type, so these two are different:
// console.log( map.get(1)   ); // 'num1'
// console.log( map.get('1') ); // 'str1'

// console.log( map.size ); // 3
// As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

// map[key] isn’t the right way to use a Map
// Although map[key] also works, e.g. we can set map[key] = 2, this is treating map as a plain JavaScript object, so it implies all corresponding limitations (only string/symbol keys and so on).

// So we should use map methods: set, get and so on.

// Map can also use objects as keys.

// For instance:

// let john = { name: "John" };

// // for every user, let's store their visits count
// let visitsCountMap = new Map();

// // john is the key for the map
// visitsCountMap.set(john, 123);

// console.log( visitsCountMap.get(john) ); // 123
// Using objects as keys is one of the most notable and important Map features. The same does not count for Object. String as a key in Object is fine, but we can’t use another Object as a key in Object.

// Let’s try:

// let john = { name: "John" };
// let ben = { name: "Ben" };

// let visitsCountObj = {}; // try to use an object

// visitsCountObj[ben] = 234; // try to use ben object as the key
// visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

// // That's what got written!
// console.log( visitsCountObj["[object Object]"] ); // 123
// As visitsCountObj is an object, it converts all Object keys, such as john and ben above, to same string "[object Object]". Definitely not what we want.

// How Map compares keys
// To test keys for equivalence, Map uses the algorithm SameValueZero. It is roughly the same as strict equality ===, but the difference is that NaN is considered equal to NaN. So NaN can be used as the key as well.

// This algorithm can’t be changed or customized.

// Chaining
// Every map.set call returns the map itself, so we can “chain” the calls:

// map.set('1', 'str1')
//   .set(1, 'num1')
//   .set(true, 'bool1');
// Iteration over Map
// For looping over a map, there are 3 methods:

// map.keys() – returns an iterable for keys,
// map.values() – returns an iterable for values,
// map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.
// For instance:

// let recipeMap = new Map([
//   ['cucumber', 500],
//   ['tomatoes', 350],
//   ['onion',    50]
// ]);

// // iterate over keys (vegetables)
// for (let vegetable of recipeMap.keys()) {
//   console.log(vegetable); // cucumber, tomatoes, onion
// }

// // iterate over values (amounts)
// for (let amount of recipeMap.values()) {
//   console.log(amount); // 500, 350, 50
// }

// // iterate over [key, value] entries
// for (let entry of recipeMap) { // the same as of recipeMap.entries()
//   console.log(entry); // cucumber,500 (and so on)
// }
// The insertion order is used
// The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.

// Besides that, Map has a built-in forEach method, similar to Array:

// // runs the function for each (key, value) pair
// recipeMap.forEach( (value, key, map) => {
//   console.log(`${key}: ${value}`); // cucumber: 500 etc
// });
// Object.entries: Map from Object
// When a Map is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

// // array of [key, value] pairs
// let map = new Map([
//   ['1',  'str1'],
//   [1,    'num1'],
//   [true, 'bool1']
// ]);

// console.log( map.get('1') ); // str1
// If we have a plain object, and we’d like to create a Map from it, then we can use built-in method Object.entries(obj) that returns an array of key/value pairs for an object exactly in that format.

// So we can create a map from an object like this:

// let obj = {
//   name: "John",
//   age: 30
// };

// let map = new Map(Object.entries(obj));

// console.log( map.get('name') ); // John
// Here, Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ]. That’s what Map needs.

// Object.fromEntries: Object from Map
// We’ve just seen how to create Map from a plain object with Object.entries(obj).

// There’s Object.fromEntries method that does the reverse: given an array of [key, value] pairs, it creates an object from them:

// let prices = Object.fromEntries([
//   ['banana', 1],
//   ['orange', 2],
//   ['meat', 4]
// ]);

// // now prices = { banana: 1, orange: 2, meat: 4 }

// console.log(prices.orange); // 2
// We can use Object.fromEntries to get a plain object from Map.

// E.g. we store the data in a Map, but we need to pass it to a 3rd-party code that expects a plain object.

// Here we go:

// let map = new Map();
// map.set('banana', 1);
// map.set('orange', 2);
// map.set('meat', 4);

// let obj = Object.fromEntries(map.entries()); // make a plain object (*)

// // done!
// // obj = { banana: 1, orange: 2, meat: 4 }

// console.log(obj.orange); // 2
// A call to map.entries() returns an iterable of key/value pairs, exactly in the right format for Object.fromEntries.

// We could also make line (*) shorter:

// let obj = Object.fromEntries(map); // omit .entries()
// That’s the same, because Object.fromEntries expects an iterable object as the argument. Not necessarily an array. And the standard iteration for map returns same key/value pairs as map.entries(). So we get a plain object with same key/values as the map.

// Set
// A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

// Its main methods are:

// new Set(iterable) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
// set.add(value) – adds a value, returns the set itself.
// set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
// set.has(value) – returns true if the value exists in the set, otherwise false.
// set.clear() – removes everything from the set.
// set.size – is the elements count.
// The main feature is that repeated calls of set.add(value) with the same value don’t do anything. That’s the reason why each value appears in a Set only once.

// For example, we have visitors coming, and we’d like to remember everyone. But repeated visits should not lead to duplicates. A visitor must be “counted” only once.

// Set is just the right thing for that:

// let set = new Set();

// let john = { name: "John" };
// let pete = { name: "Pete" };
// let mary = { name: "Mary" };

// // visits, some users come multiple times
// set.add(john);
// set.add(pete);
// set.add(mary);
// set.add(john);
// set.add(mary);

// // set keeps only unique values
// console.log( set.size ); // 3

// for (let user of set) {
//   console.log(user.name); // John (then Pete and Mary)
// }
// The alternative to Set could be an array of users, and the code to check for duplicates on every insertion using arr.find. But the performance would be much worse, because this method walks through the whole array checking every element. Set is much better optimized internally for uniqueness checks.

// Iteration over Set
// We can loop over a set either with for..of or using forEach:

// let set = new Set(["oranges", "apples", "bananas"]);

// for (let value of set) console.log(value);

// // the same with forEach:
// set.forEach((value, valueAgain, set) => {
//   console.log(value);
// });
// Note the funny thing. The callback function passed in forEach has 3 arguments: a value, then the same value valueAgain, and then the target object. Indeed, the same value appears in the arguments twice.

// That’s for compatibility with Map where the callback passed forEach has three arguments. Looks a bit strange, for sure. But this may help to replace Map with Set in certain cases with ease, and vice versa.

// The same methods Map has for iterators are also supported:

// set.keys() – returns an iterable object for values,
// set.values() – same as set.keys(), for compatibility with Map,
// set.entries() – returns an iterable object for entries [value, value], exists for compatibility with Map.
// Summary
// Map – is a collection of keyed values.

// Methods and properties:

// new Map([iterable]) – creates the map, with optional iterable (e.g. array) of [key,value] pairs for initialization.
// map.set(key, value) – stores the value by the key, returns the map itself.
// map.get(key)-- returns the value by the key,undefinedifkey` doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the value by the key, returns true if key existed at the moment of the call, otherwise false.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.
// The differences from a regular Object:

// Any keys, objects can be keys.
// Additional convenient methods, the size property.
// Set – is a collection of unique values.

// Methods and properties:

// new Set([iterable]) – creates the set, with optional iterable (e.g. array) of values for initialization.
// set.add(value) – adds a value (does nothing if value exists), returns the set itself.
// set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
// set.has(value) – returns true if the value exists in the set, otherwise false.
// set.clear() – removes everything from the set.
// set.size – is the elements count.
// Iteration over Map and Set is always in the insertion order, so we can’t say that these collections are unordered, but we can’t reorder elements or directly get an element by its number.

// ///////////////////////////////////////////////////
// WeakMap and WeakSet
// WeakMap and WeakSet
// As we know from the chapter Garbage collection, JavaScript engine keeps a value in memory while it is “reachable” and can potentially be used.

// For instance:

// let john = { name: "John" };

// // the object can be accessed, john is the reference to it

// // overwrite the reference
// john = null;

// // the object will be removed from memory
// Usually, properties of an object or elements of an array or another data structure are considered reachable and kept in memory while that data structure is in memory.

// For instance, if we put an object into an array, then while the array is alive, the object will be alive as well, even if there are no other references to it.

// Like this:

// let john = { name: "John" };

// let array = [ john ];

// john = null; // overwrite the reference

// // the object previously referenced by john is stored inside the array
// // therefore it won't be garbage-collected
// // we can get it as array[0]
// Similar to that, if we use an object as the key in a regular Map, then while the Map exists, that object exists as well. It occupies memory and may not be garbage collected.

// For instance:

// let john = { name: "John" };

// let map = new Map();
// map.set(john, "...");

// john = null; // overwrite the reference

// // john is stored inside the map,
// // we can get it by using map.keys()
// WeakMap is fundamentally different in this aspect. It doesn’t prevent garbage-collection of key objects.

// Let’s see what it means on examples.

// WeakMap
// The first difference between Map and WeakMap is that keys must be objects, not primitive values:

// let weakMap = new WeakMap();

// let obj = {};

// weakMap.set(obj, "ok"); // works fine (object key)

// // can't use a string as the key
// weakMap.set("test", "Whoops"); // Error, because "test" is not an object
// Now, if we use an object as the key in it, and there are no other references to that object – it will be removed from memory (and from the map) automatically.

// let john = { name: "John" };

// let weakMap = new WeakMap();
// weakMap.set(john, "...");

// john = null; // overwrite the reference

// // john is removed from memory!
// Compare it with the regular Map example above. Now if john only exists as the key of WeakMap – it will be automatically deleted from the map (and memory).

// WeakMap does not support iteration and methods keys(), values(), entries(), so there’s no way to get all keys or values from it.

// WeakMap has only the following methods:

// weakMap.get(key)
// weakMap.set(key, value)
// weakMap.delete(key)
// weakMap.has(key)
// Why such a limitation? That’s for technical reasons. If an object has lost all other references (like john in the code above), then it is to be garbage-collected automatically. But technically it’s not exactly specified when the cleanup happens.

// The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically, the current element count of a WeakMap is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

// Now, where do we need such a data structure?

// Use case: additional data
// The main area of application for WeakMap is an additional data storage.

// If we’re working with an object that “belongs” to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then WeakMap is exactly what’s needed.

// We put the data to a WeakMap, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

// weakMap.set(john, "secret documents");
// // if john dies, secret documents will be destroyed automatically
// Let’s look at an example.

// For instance, we have code that keeps a visit count for users. The information is stored in a map: a user object is the key and the visit count is the value. When a user leaves (its object gets garbage collected), we don’t want to store their visit count anymore.

// Here’s an example of a counting function with Map:

// // 📁 visitsCount.js
// let visitsCountMap = new Map(); // map: user => visits count

// // increase the visits count
// function countUser(user) {
//   let count = visitsCountMap.get(user) || 0;
//   visitsCountMap.set(user, count + 1);
// }
// And here’s another part of the code, maybe another file using it:

// // 📁 main.js
// let john = { name: "John" };

// countUser(john); // count his visits

// // later john leaves us
// john = null;
// Now, john object should be garbage collected, but remains in memory, as it’s a key in visitsCountMap.

// We need to clean visitsCountMap when we remove users, otherwise it will grow in memory indefinitely. Such cleaning can become a tedious task in complex architectures.

// We can avoid it by switching to WeakMap instead:

// // 📁 visitsCount.js
// let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// // increase the visits count
// function countUser(user) {
//   let count = visitsCountMap.get(user) || 0;
//   visitsCountMap.set(user, count + 1);
// }
// Now we don’t have to clean visitsCountMap. After john object becomes unreachable, by all means except as a key of WeakMap, it gets removed from memory, along with the information by that key from WeakMap.

// Use case: caching
// Another common example is caching. We can store (“cache”) results from a function, so that future calls on the same object can reuse it.

// To achieve that, we can use Map (not optimal scenario):

// // 📁 cache.js
// let cache = new Map();

// // calculate and remember the result
// function process(obj) {
//   if (!cache.has(obj)) {
//     let result = /* calculations of the result for */ obj;

//     cache.set(obj, result);
//   }

//   return cache.get(obj);
// }

// // Now we use process() in another file:

// // 📁 main.js
// let obj = {/* let's say we have an object */};

// let result1 = process(obj); // calculated

// // ...later, from another place of the code...
// let result2 = process(obj); // remembered result taken from cache

// // ...later, when the object is not needed any more:
// obj = null;

// console.log(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
// For multiple calls of process(obj) with the same object, it only calculates the result the first time, and then just takes it from cache. The downside is that we need to clean cache when the object is not needed any more.

// If we replace Map with WeakMap, then this problem disappears. The cached result will be removed from memory automatically after the object gets garbage collected.

// // 📁 cache.js
// let cache = new WeakMap();

// // calculate and remember the result
// function process(obj) {
//   if (!cache.has(obj)) {
//     let result = /* calculate the result for */ obj;

//     cache.set(obj, result);
//   }

//   return cache.get(obj);
// }

// // 📁 main.js
// let obj = {/* some object */};

// let result1 = process(obj);
// let result2 = process(obj);

// // ...later, when the object is not needed any more:
// obj = null;

// // Can't get cache.size, as it's a WeakMap,
// // but it's 0 or soon be 0
// // When obj gets garbage collected, cached data will be removed as well
// WeakSet
// WeakSet behaves similarly:

// It is analogous to Set, but we may only add objects to WeakSet (not primitives).
// An object exists in the set while it is reachable from somewhere else.
// Like Set, it supports add, has and delete, but not size, keys() and no iterations.
// Being “weak”, it also serves as additional storage. But not for arbitrary data, rather for “yes/no” facts. A membership in WeakSet may mean something about the object.

// For instance, we can add users to WeakSet to keep track of those who visited our site:

// let visitedSet = new WeakSet();

// let john = { name: "John" };
// let pete = { name: "Pete" };
// let mary = { name: "Mary" };

// visitedSet.add(john); // John visited us
// visitedSet.add(pete); // Then Pete
// visitedSet.add(john); // John again

// // visitedSet has 2 users now

// // check if John visited?
// console.log(visitedSet.has(john)); // true

// // check if Mary visited?
// console.log(visitedSet.has(mary)); // false

// john = null;

// // visitedSet will be cleaned automatically
// The most notable limitation of WeakMap and WeakSet is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent WeakMap/WeakSet from doing their main job – be an “additional” storage of data for objects which are stored/managed at another place.

// Summary
// WeakMap is Map-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

// WeakSet is Set-like collection that stores only objects and removes them once they become inaccessible by other means.

// Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.

// That comes at the cost of not having support for clear, size, keys, values…

// WeakMap and WeakSet are used as “secondary” data structures in addition to the “primary” object storage. Once the object is removed from the primary storage, if it is only found as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.

// ///////////////////////////////////////////////////
// Object.keys, values, entries
// Object.keys, values, entries
// Let’s step away from the individual data structures and talk about the iterations over them.

// In the previous chapter we saw methods map.keys(), map.values(), map.entries().

// These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.

// They are supported for:

// Map
// Set
// Array
// Plain objects also support similar methods, but the syntax is a bit different.

// Object.keys, values, entries
// For plain objects, the following methods are available:

// Object.keys(obj) – returns an array of keys.
// Object.values(obj) – returns an array of values.
// Object.entries(obj) – returns an array of [key, value] pairs.
// Please note the distinctions (compared to map for example):

// Map	Object
// Call syntax	map.keys()	Object.keys(obj), but not obj.keys()
// Returns	iterable	“real” Array
// The first difference is that we have to call Object.keys(obj), and not obj.keys().

// Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like data that implements its own data.values() method. And we still can call Object.values(data) on it.

// The second difference is that Object.* methods return “real” array objects, not just an iterable. That’s mainly for historical reasons.

// For instance:

// let user = {
//   name: "John",
//   age: 30
// };
// Object.keys(user) = ["name", "age"]
// Object.values(user) = ["John", 30]
// Object.entries(user) = [ ["name","John"], ["age",30] ]
// Here’s an example of using Object.values to loop over property values:

// let user = {
//   name: "John",
//   age: 30
// };

// // loop over values
// for (let value of Object.values(user)) {
//   console.log(value); // John, then 30
// }
// Object.keys/values/entries ignore symbolic properties
// Just like a for..in loop, these methods ignore properties that use Symbol(...) as keys.

// Usually that’s convenient. But if we want symbolic keys too, then there’s a separate method Object.getOwnPropertySymbols that returns an array of only symbolic keys. Also, there exist a method Reflect.ownKeys(obj) that returns all keys.

// Transforming objects
// Objects lack many methods that exist for arrays, e.g. map, filter and others.

// If we’d like to apply them, then we can use Object.entries followed by Object.fromEntries:

// Use Object.entries(obj) to get an array of key/value pairs from obj.
// Use array methods on that array, e.g. map, to transform these key/value pairs.
// Use Object.fromEntries(array) on the resulting array to turn it back into an object.
// For example, we have an object with prices, and would like to double them:

// let prices = {
//   banana: 1,
//   orange: 2,
//   meat: 4,
// };

// let doublePrices = Object.fromEntries(
//   // convert prices to array, map each key/value pair into another pair
//   // and then fromEntries gives back the object
//   Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
// );

// console.log(doublePrices.meat); // 8
// It may look difficult at first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.

// ///////////////////////////////////////////////////
// Destructuring assignment
// Destructuring assignment
// The two most used data structures in JavaScript are Object and Array.

// Objects allow us to create a single entity that stores data items by key.
// Arrays allow us to gather data items into an ordered list.
// Although, when we pass those to a function, it may need not be an object/array as a whole. It may need individual pieces.

// Destructuring assignment is a special syntax that allows us to “unpack” arrays or objects into a bunch of variables, as sometimes that’s more convenient.

// Destructuring also works great with complex functions that have a lot of parameters, default values, and so on. Soon we’ll see that.

// Array destructuring
// Here’s an example of how an array is destructured into variables:

// // we have an array with the name and surname
// let arr = ["John", "Smith"]

// // destructuring assignment
// // sets firstName = arr[0]
// // and surname = arr[1]
// let [firstName, surname] = arr;

// console.log(firstName); // John
// console.log(surname);  // Smith
// Now we can work with variables instead of array members.

// It looks great when combined with split or other array-returning methods:

// let [firstName, surname] = "John Smith".split(' ');
// console.log(firstName); // John
// console.log(surname);  // Smith
// As you can see, the syntax is simple. There are several peculiar details though. Let’s see more examples, to better understand it.

// “Destructuring” does not mean “destructive”.
// It’s called “destructuring assignment,” because it “destructurizes” by copying items into variables. But the array itself is not modified.

// It’s just a shorter way to write:

// // let [firstName, surname] = arr;
// let firstName = arr[0];
// let surname = arr[1];
// Ignore elements using commas
// Unwanted elements of the array can also be thrown away via an extra comma:

// // second element is not needed
// let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// console.log( title ); // Consul
// In the code above, the second element of the array is skipped, the third one is assigned to title, and the rest of the array items is also skipped (as there are no variables for them).

// Works with any iterable on the right-side
// …Actually, we can use it with any iterable, not only arrays:

// let [a, b, c] = "abc"; // ["a", "b", "c"]
// let [one, two, three] = new Set([1, 2, 3]);
// That works, because internally a destructuring assignment works by iterating over the right value. It’s a kind of syntax sugar for calling for..of over the value to the right of = and assigning the values.

// Assign to anything at the left-side
// We can use any “assignables” on the left side.

// For instance, an object property:

// let user = {};
// [user.name, user.surname] = "John Smith".split(' ');

// console.log(user.name); // John
// console.log(user.surname); // Smith
// Looping with .entries()
// In the previous chapter we saw the Object.entries(obj) method.

// We can use it with destructuring to loop over keys-and-values of an object:

// let user = {
//   name: "John",
//   age: 30
// };

// // loop over keys-and-values
// for (let [key, value] of Object.entries(user)) {
//   console.log(`${key}:${value}`); // name:John, then age:30
// }
// The similar code for a Map is simpler, as it’s iterable:

// let user = new Map();
// user.set("name", "John");
// user.set("age", "30");

// // Map iterates as [key, value] pairs, very convenient for destructuring
// for (let [key, value] of user) {
//   console.log(`${key}:${value}`); // name:John, then age:30
// }
// Swap variables trick
// There’s a well-known trick for swapping values of two variables using a destructuring assignment:

// let guest = "Jane";
// let admin = "Pete";

// // Let's swap the values: make guest=Pete, admin=Jane
// [guest, admin] = [admin, guest];

// console.log(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
// Here we create a temporary array of two variables and immediately destructure it in swapped order.

// We can swap more than two variables this way.

// The rest ‘…’
// Usually, if the array is longer than the list at the left, the “extra” items are omitted.

// For example, here only two items are taken, and the rest is just ignored:

// let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// console.log(name1); // Julius
// console.log(name2); // Caesar
// // Further items aren't assigned anywhere
// If we’d like also to gather all that follows – we can add one more parameter that gets “the rest” using three dots "...":

// let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// // rest is array of items, starting from the 3rd one
// console.log(rest[0]); // Consul
// console.log(rest[1]); // of the Roman Republic
// console.log(rest.length); // 2
// The value of rest is the array of the remaining array elements.

// We can use any other variable name in place of rest, just make sure it has three dots before it and goes last in the destructuring assignment.

// let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// // now titles = ["Consul", "of the Roman Republic"]
// Default values
// If the array is shorter than the list of variables at the left, there’ll be no errors. Absent values are considered undefined:

// let [firstName, surname] = [];

// console.log(firstName); // undefined
// console.log(surname); // undefined
// If we want a “default” value to replace the missing one, we can provide it using =:

// // default values
// let [name = "Guest", surname = "Anonymous"] = ["Julius"];

// console.log(name);    // Julius (from array)
// console.log(surname); // Anonymous (default used)
// Default values can be more complex expressions or even function calls. They are evaluated only if the value is not provided.

// For instance, here we use the prompt function for two defaults:

// // runs only prompt for surname
// let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

// console.log(name);    // Julius (from array)
// console.log(surname); // whatever prompt gets
// Please note: the prompt will run only for the missing value (surname).

// Object destructuring
// The destructuring assignment also works with objects.

// The basic syntax is:

// let {var1, var2} = {var1:…, var2:…}
// We should have an existing object on the right side, that we want to split into variables. The left side contains an object-like “pattern” for corresponding properties. In the simplest case, that’s a list of variable names in {...}.

// For instance:

// let options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };

// let {title, width, height} = options;

// console.log(title);  // Menu
// console.log(width);  // 100
// console.log(height); // 200
// Properties options.title, options.width and options.height are assigned to the corresponding variables.

// The order does not matter. This works too:

// // changed the order in let {...}
// let {height, width, title} = { title: "Menu", height: 200, width: 100 }
// The pattern on the left side may be more complex and specify the mapping between properties and variables.

// If we want to assign a property to a variable with another name, for instance, make options.width go into the variable named w, then we can set the variable name using a colon:

// let options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };

// // { sourceProperty: targetVariable }
// let {width: w, height: h, title} = options;

// // width -> w
// // height -> h
// // title -> title

// console.log(title);  // Menu
// console.log(w);      // 100
// console.log(h);      // 200
// The colon shows “what : goes where”. In the example above the property width goes to w, property height goes to h, and title is assigned to the same name.

// For potentially missing properties we can set default values using "=", like this:

// let options = {
//   title: "Menu"
// };

// let {width = 100, height = 200, title} = options;

// console.log(title);  // Menu
// console.log(width);  // 100
// console.log(height); // 200
// Just like with arrays or function parameters, default values can be any expressions or even function calls. They will be evaluated if the value is not provided.

// In the code below prompt asks for width, but not for title:

// let options = {
//   title: "Menu"
// };

// let {width = prompt("width?"), title = prompt("title?")} = options;

// console.log(title);  // Menu
// console.log(width);  // (whatever the result of prompt is)
// We also can combine both the colon and equality:

// let options = {
//   title: "Menu"
// };

// let {width: w = 100, height: h = 200, title} = options;

// console.log(title);  // Menu
// console.log(w);      // 100
// console.log(h);      // 200
// If we have a complex object with many properties, we can extract only what we need:

// let options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };

// // only extract title as a variable
// let { title } = options;

// console.log(title); // Menu
// The rest pattern “…”
// What if the object has more properties than we have variables? Can we take some and then assign the “rest” somewhere?

// We can use the rest pattern, just like we did with arrays. It’s not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.

// It looks like this:

// let options = {
//   title: "Menu",
//   height: 200,
//   width: 100
// };

// // title = property named title
// // rest = object with the rest of properties
// let {title, ...rest} = options;

// // now title="Menu", rest={height: 200, width: 100}
// console.log(rest.height);  // 200
// console.log(rest.width);   // 100
// Gotcha if there’s no let
// In the examples above variables were declared right in the assignment: let {…} = {…}. Of course, we could use existing variables too, without let. But there’s a catch.

// This won’t work:

// let title, width, height;

// // error in this line
// {title, width, height} = {title: "Menu", width: 200, height: 100};
// The problem is that JavaScript treats {...} in the main code flow (not inside another expression) as a code block. Such code blocks can be used to group statements, like this:

// {
//   // a code block
//   let message = "Hello";
//   // ...
//   console.log( message );
// }
// So here JavaScript assumes that we have a code block, that’s why there’s an error. We want destructuring instead.

// To show JavaScript that it’s not a code block, we can wrap the expression in parentheses (...):

// let title, width, height;

// // okay now
// ({title, width, height} = {title: "Menu", width: 200, height: 100});

// console.log( title ); // Menu
// Nested destructuring
// If an object or an array contain other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

// In the code below options has another object in the property size and an array in the property items. The pattern on the left side of the assignment has the same structure to extract values from them:

// let options = {
//   size: {
//     width: 100,
//     height: 200
//   },
//   items: ["Cake", "Donut"],
//   extra: true
// };

// // destructuring assignment split in multiple lines for clarity
// let {
//   size: { // put size here
//     width,
//     height
//   },
//   items: [item1, item2], // assign items here
//   title = "Menu" // not present in the object (default value is used)
// } = options;

// console.log(title);  // Menu
// console.log(width);  // 100
// console.log(height); // 200
// console.log(item1);  // Cake
// console.log(item2);  // Donut
// All properties of options object except extra that is absent in the left part, are assigned to corresponding variables:

// Finally, we have width, height, item1, item2 and title from the default value.

// Note that there are no variables for size and items, as we take their content instead.

// Smart function parameters
// There are times when a function has many parameters, most of which are optional. That’s especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.

// Here’s a bad way to write such function:

// function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
//   // ...
// }
// In real-life, the problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still… Another problem is how to call a function when most parameters are ok by default.

// Like this?

// // undefined where default values are fine
// showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
// That’s ugly. And becomes unreadable when we deal with more parameters.

// Destructuring comes to the rescue!

// We can pass parameters as an object, and the function immediately destructurizes them into variables:

// // we pass object to function
// let options = {
//   title: "My menu",
//   items: ["Item1", "Item2"]
// };

// // ...and it immediately expands it to variables
// function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
//   // title, items – taken from options,
//   // width, height – defaults used
//   console.log( `${title} ${width} ${height}` ); // My Menu 200 100
//   console.log( items ); // Item1, Item2
// }

// showMenu(options);
// We can also use more complex destructuring with nested objects and colon mappings:

// let options = {
//   title: "My menu",
//   items: ["Item1", "Item2"]
// };

// function showMenu({
//   title = "Untitled",
//   width: w = 100,  // width goes to w
//   height: h = 200, // height goes to h
//   items: [item1, item2] // items first element goes to item1, second to item2
// }) {
//   console.log( `${title} ${w} ${h}` ); // My Menu 100 200
//   console.log( item1 ); // Item1
//   console.log( item2 ); // Item2
// }

// showMenu(options);
// The full syntax is the same as for a destructuring assignment:

// function({
//   incomingProperty: varName = defaultValue
//   ...
// })
// Then, for an object of parameters, there will be a variable varName for property incomingProperty, with defaultValue by default.

// Please note that such destructuring assumes that showMenu() does have an argument. If we want all values by default, then we should specify an empty object:

// showMenu({}); // ok, all values are default

// showMenu(); // this would give an error
// We can fix this by making {} the default value for the whole object of parameters:

// function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
//   console.log( `${title} ${width} ${height}` );
// }

// showMenu(); // Menu 100 200
// In the code above, the whole arguments object is {} by default, so there’s always something to destructurize.

// ///////////////////////////////////////////////////
// Date and time
// Date and time
// Let’s meet a new built-in object: Date. It stores the date, time and provides methods for date/time management.

// For instance, we can use it to store creation/modification times, to measure time, or just to print out the current date.

// Creation
// To create a new Date object call new Date() with one of the following arguments:

// new Date()
// Without arguments – create a Date object for the current date and time:

// let now = new Date();
// console.log( now ); // shows current date/time
// new Date(milliseconds)
// Create a Date object with the time equal to number of milliseconds (1/1000 of a second) passed after the Jan 1st of 1970 UTC+0.

// // 0 means 01.01.1970 UTC+0
// let Jan01_1970 = new Date(0);
// console.log( Jan01_1970 );

// // now add 24 hours, get 02.01.1970 UTC+0
// let Jan02_1970 = new Date(24 * 3600 * 1000);
// console.log( Jan02_1970 );
// An integer number representing the number of milliseconds that has passed since the beginning of 1970 is called a timestamp.

// It’s a lightweight numeric representation of a date. We can always create a date from a timestamp using new Date(timestamp) and convert the existing Date object to a timestamp using the date.getTime() method (see below).

// Dates before 01.01.1970 have negative timestamps, e.g.:

// // 31 Dec 1969
// let Dec31_1969 = new Date(-24 * 3600 * 1000);
// console.log( Dec31_1969 );
// new Date(datestring)
// If there is a single argument, and it’s a string, then it is parsed automatically. The algorithm is the same as Date.parse uses, we’ll cover it later.

// let date = new Date("2017-01-26");
// console.log(date);
// // The time is not set, so it's assumed to be midnight GMT and
// // is adjusted according to the timezone the code is run in
// // So the result could be
// // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// // or
// // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
// new Date(year, month, date, hours, minutes, seconds, ms)
// Create the date with the given components in the local time zone. Only the first two arguments are obligatory.

// The year should have 4 digits. For compatibility, 2 digits are also accepted and considered 19xx, e.g. 98 is the same as 1998 here, but always using 4 digits is strongly encouraged.
// The month count starts with 0 (Jan), up to 11 (Dec).
// The date parameter is actually the day of month, if absent then 1 is assumed.
// If hours/minutes/seconds/ms is absent, they are assumed to be equal 0.
// For instance:

// new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
// new Date(2011, 0, 1); // the same, hours etc are 0 by default
// The maximal precision is 1 ms (1/1000 sec):

// let date = new Date(2011, 0, 1, 2, 3, 4, 567);
// console.log( date ); // 1.01.2011, 02:03:04.567
// Access date components
// There are methods to access the year, month and so on from the Date object:

// getFullYear()
// Get the year (4 digits)
// getMonth()
// Get the month, from 0 to 11.
// getDate()
// Get the day of month, from 1 to 31, the name of the method does look a little bit strange.
// getHours(), getMinutes(), getSeconds(), getMilliseconds()
// Get the corresponding time components.
// Not getYear(), but getFullYear()
// Many JavaScript engines implement a non-standard method getYear(). This method is deprecated. It returns 2-digit year sometimes. Please never use it. There is getFullYear() for the year.

// Additionally, we can get a day of week:

// getDay()
// Get the day of week, from 0 (Sunday) to 6 (Saturday). The first day is always Sunday, in some countries that’s not so, but can’t be changed.
// All the methods above return the components relative to the local time zone.

// There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0: getUTCFullYear(), getUTCMonth(), getUTCDay(). Just insert the "UTC" right after "get".

// If your local time zone is shifted relative to UTC, then the code below shows different hours:

// // current date
// let date = new Date();

// // the hour in your current time zone
// console.log( date.getHours() );

// // the hour in UTC+0 time zone (London time without daylight savings)
// console.log( date.getUTCHours() );
// Besides the given methods, there are two special ones that do not have a UTC-variant:

// getTime()
// Returns the timestamp for the date – a number of milliseconds passed from the January 1st of 1970 UTC+0.

// getTimezoneOffset()
// Returns the difference between UTC and the local time zone, in minutes:

// // if you are in timezone UTC-1, outputs 60
// // if you are in timezone UTC+3, outputs -180
// console.log( new Date().getTimezoneOffset() );
// Setting date components
// The following methods allow to set date/time components:

// setFullYear(year, [month], [date])
// setMonth(month, [date])
// setDate(date)
// setHours(hour, [min], [sec], [ms])
// setMinutes(min, [sec], [ms])
// setSeconds(sec, [ms])
// setMilliseconds(ms)
// setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)
// Every one of them except setTime() has a UTC-variant, for instance: setUTCHours().

// As we can see, some methods can set multiple components at once, for example setHours. The components that are not mentioned are not modified.

// For instance:

// let today = new Date();

// today.setHours(0);
// console.log(today); // still today, but the hour is changed to 0

// today.setHours(0, 0, 0, 0);
// console.log(today); // still today, now 00:00:00 sharp.
// Autocorrection
// The autocorrection is a very handy feature of Date objects. We can set out-of-range values, and it will auto-adjust itself.

// For instance:

// let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
// console.log(date); // ...is 1st Feb 2013!
// Out-of-range date components are distributed automatically.

// Let’s say we need to increase the date “28 Feb 2016” by 2 days. It may be “2 Mar” or “1 Mar” in case of a leap-year. We don’t need to think about it. Just add 2 days. The Date object will do the rest:

// let date = new Date(2016, 1, 28);
// date.setDate(date.getDate() + 2);

// console.log( date ); // 1 Mar 2016
// That feature is often used to get the date after the given period of time. For instance, let’s get the date for “70 seconds after now”:

// let date = new Date();
// date.setSeconds(date.getSeconds() + 70);

// console.log( date ); // shows the correct date
// We can also set zero or even negative values. For example:

// let date = new Date(2016, 0, 2); // 2 Jan 2016

// date.setDate(1); // set day 1 of month
// console.log( date );

// date.setDate(0); // min day is 1, so the last day of the previous month is assumed
// console.log( date ); // 31 Dec 2015
// Date to number, date diff
// When a Date object is converted to number, it becomes the timestamp same as date.getTime():

// let date = new Date();
// console.log(+date); // the number of milliseconds, same as date.getTime()
// The important side effect: dates can be subtracted, the result is their difference in ms.

// That can be used for time measurements:

// let start = new Date(); // start measuring time

// // do the job
// for (let i = 0; i < 100000; i++) {
//   let doSomething = i * i * i;
// }

// let end = new Date(); // end measuring time

// console.log( `The loop took ${end - start} ms` );
// Date.now()
// If we only want to measure time, we don’t need the Date object.

// There’s a special method Date.now() that returns the current timestamp.

// It is semantically equivalent to new Date().getTime(), but it doesn’t create an intermediate Date object. So it’s faster and doesn’t put pressure on garbage collection.

// It is used mostly for convenience or when performance matters, like in games in JavaScript or other specialized applications.

// So this is probably better:

// let start = Date.now(); // milliseconds count from 1 Jan 1970

// // do the job
// for (let i = 0; i < 100000; i++) {
//   let doSomething = i * i * i;
// }

// let end = Date.now(); // done

// console.log( `The loop took ${end - start} ms` ); // subtract numbers, not dates
// Benchmarking
// If we want a reliable benchmark of CPU-hungry function, we should be careful.

// For instance, let’s measure two functions that calculate the difference between two dates: which one is faster?

// Such performance measurements are often called “benchmarks”.

// // we have date1 and date2, which function faster returns their difference in ms?
// function diffSubtract(date1, date2) {
//   return date2 - date1;
// }

// // or
// function diffGetTime(date1, date2) {
//   return date2.getTime() - date1.getTime();
// }
// These two do exactly the same thing, but one of them uses an explicit date.getTime() to get the date in ms, and the other one relies on a date-to-number transform. Their result is always the same.

// So, which one is faster?

// The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.

// Let’s measure:

// function diffSubtract(date1, date2) {
//   return date2 - date1;
// }

// function diffGetTime(date1, date2) {
//   return date2.getTime() - date1.getTime();
// }

// function bench(f) {
//   let date1 = new Date(0);
//   let date2 = new Date();

//   let start = Date.now();
//   for (let i = 0; i < 100000; i++) f(date1, date2);
//   return Date.now() - start;
// }

// console.log( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
// console.log( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
// Wow! Using getTime() is so much faster! That’s because there’s no type conversion, it is much easier for engines to optimize.

// Okay, we have something. But that’s not a good benchmark yet.

// Imagine that at the time of running bench(diffSubtract) CPU was doing something in parallel, and it was taking resources. And by the time of running bench(diffGetTime) that work has finished.

// A pretty real scenario for a modern multi-process OS.

// As a result, the first benchmark will have less CPU resources than the second. That may lead to wrong results.

// For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.

// For example, like this:

// function diffSubtract(date1, date2) {
//   return date2 - date1;
// }

// function diffGetTime(date1, date2) {
//   return date2.getTime() - date1.getTime();
// }

// function bench(f) {
//   let date1 = new Date(0);
//   let date2 = new Date();

//   let start = Date.now();
//   for (let i = 0; i < 100000; i++) f(date1, date2);
//   return Date.now() - start;
// }

// let time1 = 0;
// let time2 = 0;

// // run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
// for (let i = 0; i < 10; i++) {
//   time1 += bench(diffSubtract);
//   time2 += bench(diffGetTime);
// }

// console.log( 'Total time for diffSubtract: ' + time1 );
// console.log( 'Total time for diffGetTime: ' + time2 );
// Modern JavaScript engines start applying advanced optimizations only to “hot code” that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to add a heat-up run:

// // added for "heating up" prior to the main loop
// bench(diffSubtract);
// bench(diffGetTime);

// // now benchmark
// for (let i = 0; i < 10; i++) {
//   time1 += bench(diffSubtract);
//   time2 += bench(diffGetTime);
// }
// Be careful doing microbenchmarking
// Modern JavaScript engines perform many optimizations. They may tweak results of “artificial tests” compared to “normal usage”, especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won’t need microbenchmarks at all.

// The great pack of articles about V8 can be found at http://mrale.ph.

// Date.parse from a string
// The method Date.parse(str) can read a date from a string.

// The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:

// YYYY-MM-DD – is the date: year-month-day.
// The character "T" is used as the delimiter.
// HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
// The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.
// Shorter variants are also possible, like YYYY-MM-DD or YYYY-MM or even YYYY.

// The call to Date.parse(str) parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns NaN.

// For instance:

// let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

// console.log(ms); // 1327611110417  (timestamp)
// We can instantly create a new Date object from the timestamp:

// let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

// console.log(date);
// Summary
// Date and time in JavaScript are represented with the Date object. We can’t create “only date” or “only time”: Date objects always carry both.
// Months are counted from zero (yes, January is a zero month).
// Days of week in getDay() are also counted from zero (that’s Sunday).
// Date auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
// Dates can be subtracted, giving their difference in milliseconds. That’s because a Date becomes the timestamp when converted to a number.
// Use Date.now() to get the current timestamp fast.
// Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

// Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has performance.now() that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):

// console.log(`Loading started ${performance.now()}ms ago`);
// // Something like: "Loading started 34731.26000000001ms ago"
// // .26 is microseconds (260 microseconds)
// // more than 3 digits after the decimal point are precision errors, only the first 3 are correct
// Node.js has microtime module and other ways. Technically, almost any device and environment allows to get more precision, it’s just not in Date.

// ///////////////////////////////////////////////////
// JSON methods, toJSON
// JSON methods, toJSON
// Let’s say we have a complex object, and we’d like to convert it into a string, to send it over a network, or just to output it for logging purposes.

// Naturally, such a string should include all important properties.

// We could implement the conversion like this:

// let user = {
//   name: "John",
//   age: 30,

//   toString() {
//     return `{name: "${this.name}", age: ${this.age}}`;
//   }
// };

// console.log(user); // {name: "John", age: 30}
// …But in the process of development, new properties are added, old properties are renamed and removed. Updating such toString every time can become a pain. We could try to loop over properties in it, but what if the object is complex and has nested objects in properties? We’d need to implement their conversion as well.

// Luckily, there’s no need to write the code to handle all this. The task has been solved already.

// JSON.stringify
// The JSON (JavaScript Object Notation) is a general format to represent values and objects. It is described as in RFC 4627 standard. Initially it was made for JavaScript, but many other languages have libraries to handle it as well. So it’s easy to use JSON for data exchange when the client uses JavaScript and the server is written on Ruby/PHP/Java/Whatever.

// JavaScript provides methods:

// JSON.stringify to convert objects into JSON.
// JSON.parse to convert JSON back into an object.
// For instance, here we JSON.stringify a student:

// let student = {
//   name: 'John',
//   age: 30,
//   isAdmin: false,
//   courses: ['html', 'css', 'js'],
//   spouse: null
// };

// let json = JSON.stringify(student);

// console.log(typeof json); // we've got a string!

// console.log(json);
// /* JSON-encoded object:
// {
//   "name": "John",
//   "age": 30,
//   "isAdmin": false,
//   "courses": ["html", "css", "js"],
//   "spouse": null
// }
// */
// The method JSON.stringify(student) takes the object and converts it into a string.

// The resulting json string is called a JSON-encoded or serialized or stringified or marshalled object. We are ready to send it over the wire or put into a plain data store.

// Please note that a JSON-encoded object has several important differences from the object literal:

// Strings use double quotes. No single quotes or backticks in JSON. So 'John' becomes "John".
// Object property names are double-quoted also. That’s obligatory. So age:30 becomes "age":30.
// JSON.stringify can be applied to primitives as well.

// JSON supports following data types:

// Objects { ... }
// Arrays [ ... ]
// Primitives:
// strings,
// numbers,
// boolean values true/false,
// null.
// For instance:

// // a number in JSON is just a number
// console.log( JSON.stringify(1) ) // 1

// // a string in JSON is still a string, but double-quoted
// console.log( JSON.stringify('test') ) // "test"

// console.log( JSON.stringify(true) ); // true

// console.log( JSON.stringify([1, 2, 3]) ); // [1,2,3]
// JSON is data-only language-independent specification, so some JavaScript-specific object properties are skipped by JSON.stringify.

// Namely:

// Function properties (methods).
// Symbolic keys and values.
// Properties that store undefined.
// let user = {
//   sayHi() { // ignored
//     console.log("Hello");
//   },
//   [Symbol("id")]: 123, // ignored
//   something: undefined // ignored
// };

// console.log( JSON.stringify(user) ); // {} (empty object)
// Usually that’s fine. If that’s not what we want, then soon we’ll see how to customize the process.

// The great thing is that nested objects are supported and converted automatically.

// For instance:

// let meetup = {
//   title: "Conference",
//   room: {
//     number: 23,
//     participants: ["john", "ann"]
//   }
// };

// console.log( JSON.stringify(meetup) );
// /* The whole structure is stringified:
// {
//   "title":"Conference",
//   "room":{"number":23,"participants":["john","ann"]},
// }
// */
// The important limitation: there must be no circular references.

// For instance:

// let room = {
//   number: 23
// };

// let meetup = {
//   title: "Conference",
//   participants: ["john", "ann"]
// };

// meetup.place = room;       // meetup references room
// room.occupiedBy = meetup; // room references meetup

// JSON.stringify(meetup); // Error: Converting circular structure to JSON
// Here, the conversion fails, because of circular reference: room.occupiedBy references meetup, and meetup.place references room:

// Excluding and transforming: replacer
// The full syntax of JSON.stringify is:

// let json = JSON.stringify(value[, replacer, space])
// value
// A value to encode.
// replacer
// Array of properties to encode or a mapping function function(key, value).
// space
// Amount of space to use for formatting
// Most of the time, JSON.stringify is used with the first argument only. But if we need to fine-tune the replacement process, like to filter out circular references, we can use the second argument of JSON.stringify.

// If we pass an array of properties to it, only these properties will be encoded.

// For instance:

// let room = {
//   number: 23
// };

// let meetup = {
//   title: "Conference",
//   participants: [{name: "John"}, {name: "Alice"}],
//   place: room // meetup references room
// };

// room.occupiedBy = meetup; // room references meetup

// console.log( JSON.stringify(meetup, ['title', 'participants']) );
// // {"title":"Conference","participants":[{},{}]}
// Here we are probably too strict. The property list is applied to the whole object structure. So the objects in participants are empty, because name is not in the list.

// Let’s include in the list every property except room.occupiedBy that would cause the circular reference:

// let room = {
//   number: 23
// };

// let meetup = {
//   title: "Conference",
//   participants: [{name: "John"}, {name: "Alice"}],
//   place: room // meetup references room
// };

// room.occupiedBy = meetup; // room references meetup

// console.log( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
// /*
// {
//   "title":"Conference",
//   "participants":[{"name":"John"},{"name":"Alice"}],
//   "place":{"number":23}
// }
// */
// Now everything except occupiedBy is serialized. But the list of properties is quite long.

// Fortunately, we can use a function instead of an array as the replacer.

// The function will be called for every (key, value) pair and should return the “replaced” value, which will be used instead of the original one. Or undefined if the value is to be skipped.

// In our case, we can return value “as is” for everything except occupiedBy. To ignore occupiedBy, the code below returns undefined:

// let room = {
//   number: 23
// };

// let meetup = {
//   title: "Conference",
//   participants: [{name: "John"}, {name: "Alice"}],
//   place: room // meetup references room
// };

// room.occupiedBy = meetup; // room references meetup

// console.log( JSON.stringify(meetup, function replacer(key, value) {
//   console.log(`${key}: ${value}`);
//   return (key == 'occupiedBy') ? undefined : value;
// }));

// /* key:value pairs that come to replacer:
// :             [object Object]
// title:        Conference
// participants: [object Object],[object Object]
// 0:            [object Object]
// name:         John
// 1:            [object Object]
// name:         Alice
// place:        [object Object]
// number:       23
// occupiedBy: [object Object]
// */
// Please note that replacer function gets every key/value pair including nested objects and array items. It is applied recursively. The value of this inside replacer is the object that contains the current property.

// The first call is special. It is made using a special “wrapper object”: {"": meetup}. In other words, the first (key, value) pair has an empty key, and the value is the target object as a whole. That’s why the first line is ":[object Object]" in the example above.

// The idea is to provide as much power for replacer as possible: it has a chance to analyze and replace/skip even the whole object if necessary.

// Formatting: space
// The third argument of JSON.stringify(value, replacer, space) is the number of spaces to use for pretty formatting.

// Previously, all stringified objects had no indents and extra spaces. That’s fine if we want to send an object over a network. The space argument is used exclusively for a nice output.

// Here space = 2 tells JavaScript to show nested objects on multiple lines, with indentation of 2 spaces inside an object:

// let user = {
//   name: "John",
//   age: 25,
//   roles: {
//     isAdmin: false,
//     isEditor: true
//   }
// };

// console.log(JSON.stringify(user, null, 2));
// /* two-space indents:
// {
//   "name": "John",
//   "age": 25,
//   "roles": {
//     "isAdmin": false,
//     "isEditor": true
//   }
// }
// */

// /* for JSON.stringify(user, null, 4) the result would be more indented:
// {
//     "name": "John",
//     "age": 25,
//     "roles": {
//         "isAdmin": false,
//         "isEditor": true
//     }
// }
// */
// The third argument can also be a string. In this case, the string is used for indentation instead of a number of spaces.

// The space parameter is used solely for logging and nice-output purposes.

// Custom “toJSON”
// Like toString for string conversion, an object may provide method toJSON for to-JSON conversion. JSON.stringify automatically calls it if available.

// For instance:

// let room = {
//   number: 23
// };

// let meetup = {
//   title: "Conference",
//   date: new Date(Date.UTC(2017, 0, 1)),
//   room
// };

// console.log( JSON.stringify(meetup) );
// /*
//   {
//     "title":"Conference",
//     "date":"2017-01-01T00:00:00.000Z",  // (1)
//     "room": {"number":23}               // (2)
//   }
// */
// Here we can see that date (1) became a string. That’s because all dates have a built-in toJSON method which returns such kind of string.

// Now let’s add a custom toJSON for our object room (2):

// let room = {
//   number: 23,
//   toJSON() {
//     return this.number;
//   }
// };

// let meetup = {
//   title: "Conference",
//   room
// };

// console.log( JSON.stringify(room) ); // 23

// console.log( JSON.stringify(meetup) );
// /*
//   {
//     "title":"Conference",
//     "room": 23
//   }
// */
// As we can see, toJSON is used both for the direct call JSON.stringify(room) and when room is nested in another encoded object.

// JSON.parse
// To decode a JSON-string, we need another method named JSON.parse.

// The syntax:

// let value = JSON.parse(str, [reviver]);
// str
// JSON-string to parse.
// reviver
// Optional function(key,value) that will be called for each (key, value) pair and can transform the value.
// For instance:

// // stringified array
// let numbers = "[0, 1, 2, 3]";

// numbers = JSON.parse(numbers);

// console.log( numbers[1] ); // 1
// Or for nested objects:

// let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

// let user = JSON.parse(userData);

// console.log( user.friends[1] ); // 1
// The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. But they must obey the same JSON format.

// Here are typical mistakes in hand-written JSON (sometimes we have to write it for debugging purposes):

// let json = `{
//   name: "John",                     // mistake: property name without quotes
//   "surname": 'Smith',               // mistake: single quotes in value (must be double)
//   'isAdmin': false                  // mistake: single quotes in key (must be double)
//   "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
//   "friends": [0,1,2,3]              // here all fine
// }`;
// Besides, JSON does not support comments. Adding a comment to JSON makes it invalid.

// There’s another format named JSON5, which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.

// The regular JSON is that strict not because its developers are lazy, but to allow easy, reliable and very fast implementations of the parsing algorithm.

// Using reviver
// Imagine, we got a stringified meetup object from the server.

// It looks like this:

// // title: (meetup title), date: (meetup date)
// let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
// …And now we need to deserialize it, to turn back into JavaScript object.

// Let’s do it by calling JSON.parse:

// let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

// let meetup = JSON.parse(str);

// console.log( meetup.date.getDate() ); // Error!
// Whoops! An error!

// The value of meetup.date is a string, not a Date object. How could JSON.parse know that it should transform that string into a Date?

// Let’s pass to JSON.parse the reviving function as the second argument, that returns all values “as is”, but date will become a Date:

// let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

// let meetup = JSON.parse(str, function(key, value) {
//   if (key == 'date') return new Date(value);
//   return value;
// });

// console.log( meetup.date.getDate() ); // now works!
// By the way, that works for nested objects as well:

// let schedule = `{
//   "meetups": [
//     {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
//     {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
//   ]
// }`;

// schedule = JSON.parse(schedule, function(key, value) {
//   if (key == 'date') return new Date(value);
//   return value;
// });

// console.log( schedule.meetups[1].date.getDate() ); // works!
// Summary
// JSON is a data format that has its own independent standard and libraries for most programming languages.
// JSON supports plain objects, arrays, strings, numbers, booleans, and null.
// JavaScript provides methods JSON.stringify to serialize into JSON and JSON.parse to read from JSON.
// Both methods support transformer functions for smart reading/writing.
// If an object has toJSON, then it is called by JSON.stringify.
