// // Recursion and stack
// Recursion and stack
// Let’s return to functions and study them more in-depth.

// Our first topic will be recursion.

// If you are not new to programming, then it is probably familiar and you could skip this chapter.

// Recursion is a programming pattern that is useful in situations when a task can be naturally split into several tasks of the same kind, but simpler. Or when a task can be simplified into an easy action plus a simpler variant of the same task. Or, as we’ll see soon, to deal with certain data structures.

// When a function solves a task, in the process it can call many other functions. A partial case of this is when a function calls itself. That’s called recursion.

// Two ways of thinking
// For something simple to start with – let’s write a function pow(x, n) that raises x to a natural power of n. In other words, multiplies x by itself n times.

// pow(2, 2) = 4
// pow(2, 3) = 8
// pow(2, 4) = 16
// There are two ways to implement it.

// Iterative thinking: the for loop:

// function pow(x, n) {
//   let result = 1;

//   // multiply result by x n times in the loop
//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }

//   return result;
// }

// console.log( pow(2, 3) ); // 8
// Recursive thinking: simplify the task and call self:

// function pow(x, n) {
//   if (n == 1) {
//     return x;
//   } else {
//     return x * pow(x, n - 1);
//   }
// }

// console.log( pow(2, 3) ); // 8
// Please note how the recursive variant is fundamentally different.

// When pow(x, n) is called, the execution splits into two branches:

//               if n==1  = x
//              /
// pow(x, n) =
//              \
//               else     = x * pow(x, n - 1)
// If n == 1, then everything is trivial. It is called the base of recursion, because it immediately produces the obvious result: pow(x, 1) equals x.
// Otherwise, we can represent pow(x, n) as x * pow(x, n - 1). In maths, one would write xn = x * xn-1. This is called a recursive step: we transform the task into a simpler action (multiplication by x) and a simpler call of the same task (pow with lower n). Next steps simplify it further and further until n reaches 1.
// We can also say that pow recursively calls itself till n == 1.

// For example, to calculate pow(2, 4) the recursive variant does these steps:

// pow(2, 4) = 2 * pow(2, 3)
// pow(2, 3) = 2 * pow(2, 2)
// pow(2, 2) = 2 * pow(2, 1)
// pow(2, 1) = 2
// So, the recursion reduces a function call to a simpler one, and then – to even more simpler, and so on, until the result becomes obvious.

// Recursion is usually shorter
// A recursive solution is usually shorter than an iterative one.

// Here we can rewrite the same using the conditional operator ? instead of if to make pow(x, n) more terse and still very readable:

// function pow(x, n) {
//   return (n == 1) ? x : (x * pow(x, n - 1));
// }
// The maximal number of nested calls (including the first one) is called recursion depth. In our case, it will be exactly n.

// The maximal recursion depth is limited by JavaScript engine. We can rely on it being 10000, some engines allow more, but 100000 is probably out of limit for the majority of them. There are automatic optimizations that help alleviate this (“tail calls optimizations”), but they are not yet supported everywhere and work only in simple cases.

// That limits the application of recursion, but it still remains very wide. There are many tasks where recursive way of thinking gives simpler code, easier to maintain.

// The execution context and stack
// Now let’s examine how recursive calls work. For that we’ll look under the hood of functions.

// The information about the process of execution of a running function is stored in its execution context.

// The execution context is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of this (we don’t use it here) and few other internal details.

// One function call has exactly one execution context associated with it.

// When a function makes a nested call, the following happens:

// The current function is paused.
// The execution context associated with it is remembered in a special data structure called execution context stack.
// The nested call executes.
// After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped.
// Let’s see what happens during the pow(2, 3) call.

// pow(2, 3)
// In the beginning of the call pow(2, 3) the execution context will store variables: x = 2, n = 3, the execution flow is at line 1 of the function.

// We can sketch it as:

// Context: { x: 2, n: 3, at line 1 } pow(2, 3)
// That’s when the function starts to execute. The condition n == 1 is falsy, so the flow continues into the second branch of if:

// function pow(x, n) {
//   if (n == 1) {
//     return x;
//   } else {
//     return x * pow(x, n - 1);
//   }
// }

// console.log( pow(2, 3) );
// The variables are same, but the line changes, so the context is now:

// Context: { x: 2, n: 3, at line 5 } pow(2, 3)
// To calculate x * pow(x, n - 1), we need to make a subcall of pow with new arguments pow(2, 2).

// pow(2, 2)
// To do a nested call, JavaScript remembers the current execution context in the execution context stack.

// Here we call the same function pow, but it absolutely doesn’t matter. The process is the same for all functions:

// The current context is “remembered” on top of the stack.
// The new context is created for the subcall.
// When the subcall is finished – the previous context is popped from the stack, and its execution continues.
// Here’s the context stack when we entered the subcall pow(2, 2):

// Context: { x: 2, n: 2, at line 1 } pow(2, 2)
// Context: { x: 2, n: 3, at line 5 } pow(2, 3)
// The new current execution context is on top (and bold), and previous remembered contexts are below.

// When we finish the subcall – it is easy to resume the previous context, because it keeps both variables and the exact place of the code where it stopped.

// Please note:
// Here in the picture we use the word “line”, as in our example there’s only one subcall in line, but generally a single line of code may contain multiple subcalls, like pow(…) + pow(…) + somethingElse(…).

// So it would be more precise to say that the execution resumes “immediately after the subcall”.

// pow(2, 1)
// The process repeats: a new subcall is made at line 5, now with arguments x=2, n=1.

// A new execution context is created, the previous one is pushed on top of the stack:

// Context: { x: 2, n: 1, at line 1 } pow(2, 1)
// Context: { x: 2, n: 2, at line 5 } pow(2, 2)
// Context: { x: 2, n: 3, at line 5 } pow(2, 3)
// There are 2 old contexts now and 1 currently running for pow(2, 1).

// The exit
// During the execution of pow(2, 1), unlike before, the condition n == 1 is truthy, so the first branch of if works:

// function pow(x, n) {
//   if (n == 1) {
//     return x;
//   } else {
//     return x * pow(x, n - 1);
//   }
// }
// There are no more nested calls, so the function finishes, returning 2.

// As the function finishes, its execution context is not needed anymore, so it’s removed from the memory. The previous one is restored off the top of the stack:

// Context: { x: 2, n: 2, at line 5 } pow(2, 2)
// Context: { x: 2, n: 3, at line 5 } pow(2, 3)
// The execution of pow(2, 2) is resumed. It has the result of the subcall pow(2, 1), so it also can finish the evaluation of x * pow(x, n - 1), returning 4.

// Then the previous context is restored:

// Context: { x: 2, n: 3, at line 5 } pow(2, 3)
// When it finishes, we have a result of pow(2, 3) = 8.

// The recursion depth in this case was: 3.

// As we can see from the illustrations above, recursion depth equals the maximal number of context in the stack.

// Note the memory requirements. Contexts take memory. In our case, raising to the power of n actually requires the memory for n contexts, for all lower values of n.

// A loop-based algorithm is more memory-saving:

// function pow(x, n) {
//   let result = 1;

//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }

//   return result;
// }
// The iterative pow uses a single context changing i and result in the process. Its memory requirements are small, fixed and do not depend on n.

// Any recursion can be rewritten as a loop. The loop variant usually can be made more effective.

// …But sometimes the rewrite is non-trivial, especially when function uses different recursive subcalls depending on conditions and merges their results or when the branching is more intricate. And the optimization may be unneeded and totally not worth the efforts.

// Recursion can give a shorter code, easier to understand and support. Optimizations are not required in every place, mostly we need a good code, that’s why it’s used.

// Recursive traversals
// Another great application of the recursion is a recursive traversal.

// Imagine, we have a company. The staff structure can be presented as an object:

// let company = {
//   sales: [{
//     name: 'John',
//     salary: 1000
//   }, {
//     name: 'Alice',
//     salary: 1600
//   }],

//   development: {
//     sites: [{
//       name: 'Peter',
//       salary: 2000
//     }, {
//       name: 'Alex',
//       salary: 1800
//     }],

//     internals: [{
//       name: 'Jack',
//       salary: 1300
//     }]
//   }
// };
// In other words, a company has departments.

// A department may have an array of staff. For instance, sales department has 2 employees: John and Alice.

// Or a department may split into subdepartments, like development has two branches: sites and internals. Each of them has their own staff.

// It is also possible that when a subdepartment grows, it divides into subsubdepartments (or teams).

// For instance, the sites department in the future may be split into teams for siteA and siteB. And they, potentially, can split even more. That’s not on the picture, just something to have in mind.

// Now let’s say we want a function to get the sum of all salaries. How can we do that?

// An iterative approach is not easy, because the structure is not simple. The first idea may be to make a for loop over company with nested subloop over 1st level departments. But then we need more nested subloops to iterate over the staff in 2nd level departments like sites… And then another subloop inside those for 3rd level departments that might appear in the future? If we put 3-4 nested subloops in the code to traverse a single object, it becomes rather ugly.

// Let’s try recursion.

// As we can see, when our function gets a department to sum, there are two possible cases:

// Either it’s a “simple” department with an array of people – then we can sum the salaries in a simple loop.
// Or it’s an object with N subdepartments – then we can make N recursive calls to get the sum for each of the subdeps and combine the results.
// The 1st case is the base of recursion, the trivial case, when we get an array.

// The 2nd case when we get an object is the recursive step. A complex task is split into subtasks for smaller departments. They may in turn split again, but sooner or later the split will finish at (1).

// The algorithm is probably even easier to read from the code:

// let company = { // the same object, compressed for brevity
//   sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
//   development: {
//     sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
//     internals: [{name: 'Jack', salary: 1300}]
//   }
// };

// // The function to do the job
// function sumSalaries(department) {
//   if (Array.isArray(department)) { // case (1)
//     return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
//   } else { // case (2)
//     let sum = 0;
//     for (let subdep of Object.values(department)) {
//       sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
//     }
//     return sum;
//   }
// }

// console.log(sumSalaries(company)); // 7700
// The code is short and easy to understand (hopefully?). That’s the power of recursion. It also works for any level of subdepartment nesting.

// Here’s the diagram of calls:

// We can easily see the principle: for an object {...} subcalls are made, while arrays [...] are the “leaves” of the recursion tree, they give immediate result.

// Note that the code uses smart features that we’ve covered before:

// Method arr.reduce explained in the chapter Array methods to get the sum of the array.
// Loop for(val of Object.values(obj)) to iterate over object values: Object.values returns an array of them.
// Recursive structures
// A recursive (recursively-defined) data structure is a structure that replicates itself in parts.

// We’ve just seen it in the example of a company structure above.

// A company department is:

// Either an array of people.
// Or an object with departments.
// For web-developers there are much better-known examples: HTML and XML documents.

// In the HTML document, an HTML-tag may contain a list of:

// Text pieces.
// HTML-comments.
// Other HTML-tags (that in turn may contain text pieces/comments or other tags etc).
// That’s once again a recursive definition.

// For better understanding, we’ll cover one more recursive structure named “Linked list” that might be a better alternative for arrays in some cases.

// Linked list
// Imagine, we want to store an ordered list of objects.

// The natural choice would be an array:

// let arr = [obj1, obj2, obj3];
// …But there’s a problem with arrays. The “delete element” and “insert element” operations are expensive. For instance, arr.unshift(obj) operation has to renumber all elements to make room for a new obj, and if the array is big, it takes time. Same with arr.shift().

// The only structural modifications that do not require mass-renumbering are those that operate with the end of array: arr.push/pop. So an array can be quite slow for big queues, when we have to work with the beginning.

// Alternatively, if we really need fast insertion/deletion, we can choose another data structure called a linked list.

// The linked list element is recursively defined as an object with:

// value.
// next property referencing the next linked list element or null if that’s the end.
// For instance:

// let list = {
//   value: 1,
//   next: {
//     value: 2,
//     next: {
//       value: 3,
//       next: {
//         value: 4,
//         next: null
//       }
//     }
//   }
// };
// Graphical representation of the list:

// An alternative code for creation:

// let list = { value: 1 };
// list.next = { value: 2 };
// list.next.next = { value: 3 };
// list.next.next.next = { value: 4 };
// list.next.next.next.next = null;
// Here we can even more clearly see that there are multiple objects, each one has the value and next pointing to the neighbour. The list variable is the first object in the chain, so following next pointers from it we can reach any element.

// The list can be easily split into multiple parts and later joined back:

// let secondList = list.next.next;
// list.next.next = null;

// To join:

// list.next.next = secondList;
// And surely we can insert or remove items in any place.

// For instance, to prepend a new value, we need to update the head of the list:

// let list = { value: 1 };
// list.next = { value: 2 };
// list.next.next = { value: 3 };
// list.next.next.next = { value: 4 };

// // prepend the new value to the list
// list = { value: "new item", next: list };

// To remove a value from the middle, change next of the previous one:

// list.next = list.next.next;

// We made list.next jump over 1 to value 2. The value 1 is now excluded from the chain. If it’s not stored anywhere else, it will be automatically removed from the memory.

// Unlike arrays, there’s no mass-renumbering, we can easily rearrange elements.

// Naturally, lists are not always better than arrays. Otherwise everyone would use only lists.

// The main drawback is that we can’t easily access an element by its number. In an array that’s easy: arr[n] is a direct reference. But in the list we need to start from the first item and go next N times to get the Nth element.

// …But we don’t always need such operations. For instance, when we need a queue or even a deque – the ordered structure that must allow very fast adding/removing elements from both ends, but access to its middle is not needed.

// Lists can be enhanced:

// We can add property prev in addition to next to reference the previous element, to move back easily.
// We can also add a variable named tail referencing the last element of the list (and update it when adding/removing elements from the end).
// …The data structure may vary according to our needs.
// Summary
// Terms:

// Recursion is a programming term that means calling a function from itself. Recursive functions can be used to solve tasks in elegant ways.

// When a function calls itself, that’s called a recursion step. The basis of recursion is function arguments that make the task so simple that the function does not make further calls.

// A recursively-defined data structure is a data structure that can be defined using itself.

// For instance, the linked list can be defined as a data structure consisting of an object referencing a list (or null).

// list = { value, next -> list }
// Trees like HTML elements tree or the department tree from this chapter are also naturally recursive: they have branches and every branch can have other branches.

// Recursive functions can be used to walk them as we’ve seen in the sumSalary example.

// Any recursive function can be rewritten into an iterative one. And that’s sometimes required to optimize stuff. But for many tasks a recursive solution is fast enough and easier to write and support.

// //////////////////////////////////////////////

// // Rest parameters and spread syntax
// Rest parameters and spread syntax
// Many JavaScript built-in functions support an arbitrary number of arguments.

// For instance:

// Math.max(arg1, arg2, ..., argN) – returns the greatest of the arguments.
// Object.assign(dest, src1, ..., srcN) – copies properties from src1..N into dest.
// …and so on.
// In this chapter we’ll learn how to do the same. And also, how to pass arrays to such functions as parameters.

// Rest parameters ...
// A function can be called with any number of arguments, no matter how it is defined.

// Like here:

// function sum(a, b) {
//   return a + b;
// }

// console.log( sum(1, 2, 3, 4, 5) );
// There will be no error because of “excessive” arguments. But of course in the result only the first two will be counted.

// The rest of the parameters can be included in the function definition by using three dots ... followed by the name of the array that will contain them. The dots literally mean “gather the remaining parameters into an array”.

// For instance, to gather all arguments into array args:

// function sumAll(...args) { // args is the name for the array
//   let sum = 0;

//   for (let arg of args) sum += arg;

//   return sum;
// }

// console.log( sumAll(1) ); // 1
// console.log( sumAll(1, 2) ); // 3
// console.log( sumAll(1, 2, 3) ); // 6
// We can choose to get the first parameters as variables, and gather only the rest.

// Here the first two arguments go into variables and the rest go into titles array:

// function showName(firstName, lastName, ...titles) {
//   console.log( firstName + ' ' + lastName ); // Julius Caesar

//   // the rest go into titles array
//   // i.e. titles = ["Consul", "Imperator"]
//   console.log( titles[0] ); // Consul
//   console.log( titles[1] ); // Imperator
//   console.log( titles.length ); // 2
// }

// showName("Julius", "Caesar", "Consul", "Imperator");
// The rest parameters must be at the end
// The rest parameters gather all remaining arguments, so the following does not make sense and causes an error:

// function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
//   // error
// }
// The ...rest must always be last.

// The “arguments” variable
// There is also a special array-like object named arguments that contains all arguments by their index.

// For instance:

// function showName() {
//   console.log( arguments.length );
//   console.log( arguments[0] );
//   console.log( arguments[1] );

//   // it's iterable
//   // for(let arg of arguments) console.log(arg);
// }

// // shows: 2, Julius, Caesar
// showName("Julius", "Caesar");

// // shows: 1, Ilya, undefined (no second argument)
// showName("Ilya");
// In old times, rest parameters did not exist in the language, and using arguments was the only way to get all arguments of the function. And it still works, we can find it in the old code.

// But the downside is that although arguments is both array-like and iterable, it’s not an array. It does not support array methods, so we can’t call arguments.map(...) for example.

// Also, it always contains all arguments. We can’t capture them partially, like we did with rest parameters.

// So when we need these features, then rest parameters are preferred.

// Arrow functions do not have "arguments"
// If we access the arguments object from an arrow function, it takes them from the outer “normal” function.

// Here’s an example:

// function f() {
//   let showArg = () => console.log(arguments[0]);
//   showArg();
// }

// f(1); // 1
// As we remember, arrow functions don’t have their own this. Now we know they don’t have the special arguments object either.

// Spread syntax
// We’ve just seen how to get an array from the list of parameters.

// But sometimes we need to do exactly the reverse.

// For instance, there’s a built-in function Math.max that returns the greatest number from a list:

// console.log( Math.max(3, 5, 1) ); // 5
// Now let’s say we have an array [3, 5, 1]. How do we call Math.max with it?

// Passing it “as is” won’t work, because Math.max expects a list of numeric arguments, not a single array:

// let arr = [3, 5, 1];

// console.log( Math.max(arr) ); // NaN
// And surely we can’t manually list items in the code Math.max(arr[0], arr[1], arr[2]), because we may be unsure how many there are. As our script executes, there could be a lot, or there could be none. And that would get ugly.

// Spread syntax to the rescue! It looks similar to rest parameters, also using ..., but does quite the opposite.

// When ...arr is used in the function call, it “expands” an iterable object arr into the list of arguments.

// For Math.max:

// let arr = [3, 5, 1];

// console.log( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)
// We also can pass multiple iterables this way:

// let arr1 = [1, -2, 3, 4];
// let arr2 = [8, 3, -8, 1];

// console.log( Math.max(...arr1, ...arr2) ); // 8
// We can even combine the spread syntax with normal values:

// let arr1 = [1, -2, 3, 4];
// let arr2 = [8, 3, -8, 1];

// console.log( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
// Also, the spread syntax can be used to merge arrays:

// let arr = [3, 5, 1];
// let arr2 = [8, 9, 15];

// let merged = [0, ...arr, 2, ...arr2];

// console.log(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
// In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

// For instance, here we use the spread syntax to turn the string into array of characters:

// let str = "Hello";

// console.log( [...str] ); // H,e,l,l,o
// The spread syntax internally uses iterators to gather elements, the same way as for..of does.

// So, for a string, for..of returns characters and ...str becomes "H","e","l","l","o". The list of characters is passed to array initializer [...str].

// For this particular task we could also use Array.from, because it converts an iterable (like a string) into an array:

// let str = "Hello";

// // Array.from converts an iterable into an array
// console.log( Array.from(str) ); // H,e,l,l,o
// The result is the same as [...str].

// But there’s a subtle difference between Array.from(obj) and [...obj]:

// Array.from operates on both array-likes and iterables.
// The spread syntax works only with iterables.
// So, for the task of turning something into an array, Array.from tends to be more universal.

// Copy an array/object
// Remember when we talked about Object.assign() in the past?

// It is possible to do the same thing with the spread syntax.

// let arr = [1, 2, 3];

// let arrCopy = [...arr]; // spread the array into a list of parameters
//                         // then put the result into a new array

// // do the arrays have the same contents?
// console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// // are the arrays equal?
// console.log(arr === arrCopy); // false (not same reference)

// // modifying our initial array does not modify the copy:
// arr.push(4);
// console.log(arr); // 1, 2, 3, 4
// console.log(arrCopy); // 1, 2, 3
// Note that it is possible to do the same thing to make a copy of an object:

// let obj = { a: 1, b: 2, c: 3 };

// let objCopy = { ...obj }; // spread the object into a list of parameters
//                           // then return the result in a new object

// // do the objects have the same contents?
// console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// // are the objects equal?
// console.log(obj === objCopy); // false (not same reference)

// // modifying our initial object does not modify the copy:
// obj.d = 4;
// console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
// console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
// This way of copying an object is much shorter than let objCopy = Object.assign({}, obj) or for an array let arrCopy = Object.assign([], arr) so we prefer to use it whenever we can.

// Summary
// When we see "..." in the code, it is either rest parameters or the spread syntax.

// There’s an easy way to distinguish between them:

// When ... is at the end of function parameters, it’s “rest parameters” and gathers the rest of the list of arguments into an array.
// When ... occurs in a function call or alike, it’s called a “spread syntax” and expands an array into a list.
// Use patterns:

// Rest parameters are used to create functions that accept any number of arguments.
// The spread syntax is used to pass an array to functions that normally require a list of many arguments.
// Together they help to travel between a list and an array of parameters with ease.

// All arguments of a function call are also available in “old-style” arguments: array-like iterable object.
// //////////////////////////////////////////////

// // Variable scope, closure
// Variable scope, closure
// JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.

// We already know that a function can access variables outside of it (“outer” variables).

// But what happens if outer variables change since a function is created? Will the function get newer values or the old ones?

// And what if a function is passed along as an argument and called from another place of code, will it get access to outer variables at the new place?

// Let’s expand our knowledge to understand these scenarios and more complex ones.

// We’ll talk about let/const variables here
// In JavaScript, there are 3 ways to declare a variable: let, const (the modern ones), and var (the remnant of the past).

// In this article we’ll use let variables in examples.
// Variables, declared with const, behave the same, so this article is about const too.
// The old var has some notable differences, they will be covered in the article The old "var".
// Code blocks
// If a variable is declared inside a code block {...}, it’s only visible inside that block.

// For example:

// {
//   // do some job with local variables that should not be seen outside

//   let message = "Hello"; // only visible in this block

//   console.log(message); // Hello
// }

// console.log(message); // Error: message is not defined
// We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

// {
//   // show message
//   let message = "Hello";
//   console.log(message);
// }

// {
//   // show another message
//   let message = "Goodbye";
//   console.log(message);
// }
// There’d be an error without blocks
// Please note, without separate blocks there would be an error, if we use let with the existing variable name:

// // show message
// let message = "Hello";
// console.log(message);

// // show another message
// let message = "Goodbye"; // Error: variable already declared
// console.log(message);
// For if, for, while and so on, variables declared in {...} are also only visible inside:

// if (true) {
//   let phrase = "Hello!";

//   console.log(phrase); // Hello!
// }

// console.log(phrase); // Error, no such variable!
// Here, after if finishes, the console.log below won’t see the phrase, hence the error.

// That’s great, as it allows us to create block-local variables, specific to an if branch.

// The similar thing holds true for for and while loops:

// for (let i = 0; i < 3; i++) {
//   // the variable i is only visible inside this for
//   console.log(i); // 0, then 1, then 2
// }

// console.log(i); // Error, no such variable
// Visually, let i is outside of {...}. But the for construct is special here: the variable, declared inside it, is considered a part of the block.

// Nested functions
// A function is called “nested” when it is created inside another function.

// It is easily possible to do this with JavaScript.

// We can use it to organize our code, like this:

// function sayHiBye(firstName, lastName) {

//   // helper nested function to use below
//   function getFullName() {
//     return firstName + " " + lastName;
//   }

//   console.log( "Hello, " + getFullName() );
//   console.log( "Bye, " + getFullName() );

// }
// Here the nested function getFullName() is made for convenience. It can access the outer variables and so can return the full name. Nested functions are quite common in JavaScript.

// What’s much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.

// Below, makeCounter creates the “counter” function that returns the next number on each invocation:

// function makeCounter() {
//   let count = 0;

//   return function() {
//     return count++;
//   };
// }

// let counter = makeCounter();

// console.log( counter() ); // 0
// console.log( counter() ); // 1
// console.log( counter() ); // 2
// Despite being simple, slightly modified variants of that code have practical uses, for instance, as a random number generator to generate random values for automated tests.

// How does this work? If we create multiple counters, will they be independent? What’s going on with the variables here?

// Understanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let’s go a bit in-depth.

// Lexical Environment
// Here be dragons!
// The in-depth technical explanation lies ahead.

// As far as I’d like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.

// For clarity, the explanation is split into multiple steps.

// Step 1. Variables
// In JavaScript, every running function, code block {...}, and the script as a whole have an internal (hidden) associated object known as the Lexical Environment.

// The Lexical Environment object consists of two parts:

// Environment Record – an object that stores all local variables as its properties (and some other information like the value of this).
// A reference to the outer lexical environment, the one associated with the outer code.
// A “variable” is just a property of the special internal object, Environment Record. “To get or change a variable” means “to get or change a property of that object”.

// In this simple code without functions, there is only one Lexical Environment:

// This is the so-called global Lexical Environment, associated with the whole script.

// On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that’s why the arrow points to null.

// As the code starts executing and goes on, the Lexical Environment changes.

// Here’s a little bit longer code:

// Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

// When the script starts, the Lexical Environment is pre-populated with all declared variables.
// Initially, they are in the “Uninitialized” state. That’s a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with let. It’s almost the same as if the variable didn’t exist.
// Then let phrase definition appears. There’s no assignment yet, so its value is undefined. We can use the variable from this point forward.
// phrase is assigned a value.
// phrase changes the value.
// Everything looks simple for now, right?

// A variable is a property of a special internal object, associated with the currently executing block/function/script.
// Working with variables is actually working with the properties of that object.
// Lexical Environment is a specification object
// “Lexical Environment” is a specification object: it only exists “theoretically” in the language specification to describe how things work. We can’t get this object in our code and manipulate it directly.

// JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.

// Step 2. Function Declarations
// A function is also a value, like a variable.

// The difference is that a Function Declaration is instantly fully initialized.

// When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike let, that is unusable till the declaration).

// That’s why we can use a function, declared as Function Declaration, even before the declaration itself.

// For example, here’s the initial state of the global Lexical Environment when we add a function:

// Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as let say = function(name)....

// Step 3. Inner and outer Lexical Environment
// When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

// For instance, for say("John"), it looks like this (the execution is at the line, labelled with an arrow):

// During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

// The inner Lexical Environment corresponds to the current execution of say. It has a single property: name, the function argument. We called say("John"), so the value of the name is "John".
// The outer Lexical Environment is the global Lexical Environment. It has the phrase variable and the function itself.
// The inner Lexical Environment has a reference to the outer one.

// When the code wants to access a variable – the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.

// If a variable is not found anywhere, that’s an error in strict mode (without use strict, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

// In this example the search proceeds as follows:

// For the name variable, the console.log inside say finds it immediately in the inner Lexical Environment.
// When it wants to access phrase, then there is no phrase locally, so it follows the reference to the outer Lexical Environment and finds it there.

// Step 4. Returning a function
// Let’s return to the makeCounter example.

// function makeCounter() {
//   let count = 0;

//   return function() {
//     return count++;
//   };
// }

// let counter = makeCounter();
// At the beginning of each makeCounter() call, a new Lexical Environment object is created, to store variables for this makeCounter run.

// So we have two nested Lexical Environments, just like in the example above:

// What’s different is that, during the execution of makeCounter(), a tiny nested function is created of only one line: return count++. We don’t run it yet, only create.

// All functions remember the Lexical Environment in which they were made. Technically, there’s no magic here: all functions have the hidden property named [[Environment]], that keeps the reference to the Lexical Environment where the function was created:

// So, counter.[[Environment]] has the reference to {count: 0} Lexical Environment. That’s how the function remembers where it was created, no matter where it’s called. The [[Environment]] reference is set once and forever at function creation time.

// Later, when counter() is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from counter.[[Environment]]:

// Now when the code inside counter() looks for count variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer makeCounter() call, where it finds and changes it.

// A variable is updated in the Lexical Environment where it lives.

// Here’s the state after the execution:

// If we call counter() multiple times, the count variable will be increased to 2, 3 and so on, at the same place.

// Closure
// There is a general programming term “closure”, that developers generally should know.

// A closure is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax).

// That is: they automatically remember where they were created using a hidden [[Environment]] property, and then their code can access outer variables.

// When on an interview, a frontend developer gets a question about “what’s a closure?”, a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the [[Environment]] property and how Lexical Environments work.

// Garbage collection
// Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That’s because there are no references to it. As any JavaScript object, it’s only kept in memory while it’s reachable.

// However, if there’s a nested function that is still reachable after the end of a function, then it has [[Environment]] property that references the lexical environment.

// In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

// For example:

// function f() {
//   let value = 123;

//   return function() {
//     console.log(value);
//   }
// }

// let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// // of the corresponding f() call
// Please note that if f() is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:

// function f() {
//   let value = Math.random();

//   return function() { console.log(value); };
// }

// // 3 functions in array, every one of them links to Lexical Environment
// // from the corresponding f() run
// let arr = [f(), f(), f()];
// A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.

// In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the value) is cleaned from memory:

// function f() {
//   let value = 123;

//   return function() {
//     console.log(value);
//   }
// }

// let g = f(); // while g function exists, the value stays in memory

// g = null; // ...and now the memory is cleaned up
// Real-life optimizations
// As we’ve seen, in theory while a function is alive, all outer variables are also retained.

// But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it’s obvious from the code that an outer variable is not used – it is removed.

// An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.

// Try running the example below in Chrome with the Developer Tools open.

// When it pauses, in the console type console.log(value).

// function f() {
//   let value = Math.random();

//   function g() {
//     debugger; // in console: type console.log(value); No such variable!
//   }

//   return g;
// }

// let g = f();
// g();
// As you could see – there is no such variable! In theory, it should be accessible, but the engine optimized it out.

// That may lead to funny (if not such time-consuming) debugging issues. One of them – we can see a same-named outer variable instead of the expected one:

// let value = "Surprise!";

// function f() {
//   let value = "the closest value";

//   function g() {
//     debugger; // in console: type console.log(value); Surprise!
//   }

//   return g;
// }

// let g = f();
// g();
// This feature of V8 is good to know. If you are debugging with Chrome/Edge/Opera, sooner or later you will meet it.

// That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.
// //////////////////////////////////////////////

// // The old "var"
// The old "var"
// This article is for understanding old scripts
// The information in this article is useful for understanding old scripts.

// That’s not how we write new code.

// In the very first chapter about variables, we mentioned three ways of variable declaration:

// let
// const
// var
// The var declaration is similar to let. Most of the time we can replace let by var or vice-versa and expect things to work:

// var message = "Hi";
// console.log(message); // Hi
// But internally var is a very different beast, that originates from very old times. It’s generally not used in modern scripts, but still lurks in the old ones.

// If you don’t plan on meeting such scripts you may even skip this chapter or postpone it.

// On the other hand, it’s important to understand differences when migrating old scripts from var to let, to avoid odd errors.

// “var” has no block scope
// Variables, declared with var, are either function-scoped or global-scoped. They are visible through blocks.

// For instance:

// if (true) {
//   var test = true; // use "var" instead of "let"
// }

// console.log(test); // true, the variable lives after if
// As var ignores code blocks, we’ve got a global variable test.

// If we used let test instead of var test, then the variable would only be visible inside if:

// if (true) {
//   let test = true; // use "let"
// }

// console.log(test); // ReferenceError: test is not defined
// The same thing for loops: var cannot be block- or loop-local:

// for (var i = 0; i < 10; i++) {
//   var one = 1;
//   // ...
// }

// console.log(i);   // 10, "i" is visible after loop, it's a global variable
// console.log(one); // 1, "one" is visible after loop, it's a global variable
// If a code block is inside a function, then var becomes a function-level variable:

// function sayHi() {
//   if (true) {
//     var phrase = "Hello";
//   }

//   console.log(phrase); // works
// }

// sayHi();
// console.log(phrase); // ReferenceError: phrase is not defined
// As we can see, var pierces through if, for or other code blocks. That’s because a long time ago in JavaScript, blocks had no Lexical Environments, and var is a remnant of that.

// “var” tolerates redeclarations
// If we declare the same variable with let twice in the same scope, that’s an error:

// let user;
// let user; // SyntaxError: 'user' has already been declared
// With var, we can redeclare a variable any number of times. If we use var with an already-declared variable, it’s just ignored:

// var user = "Pete";

// var user = "John"; // this "var" does nothing (already declared)
// // ...it doesn't trigger an error

// console.log(user); // John
// “var” variables can be declared below their use
// var declarations are processed when the function starts (or script starts for globals).

// In other words, var variables are defined from the beginning of the function, no matter where the definition is (assuming that the definition is not in the nested function).

// So this code:

// function sayHi() {
//   phrase = "Hello";

//   console.log(phrase);

//   var phrase;
// }
// sayHi();
// …Is technically the same as this (moved var phrase above):

// function sayHi() {
//   var phrase;

//   phrase = "Hello";

//   console.log(phrase);
// }
// sayHi();
// …Or even as this (remember, code blocks are ignored):

// function sayHi() {
//   phrase = "Hello"; // (*)

//   if (false) {
//     var phrase;
//   }

//   console.log(phrase);
// }
// sayHi();
// People also call such behavior “hoisting” (raising), because all var are “hoisted” (raised) to the top of the function.

// So in the example above, if (false) branch never executes, but that doesn’t matter. The var inside it is processed in the beginning of the function, so at the moment of (*) the variable exists.

// Declarations are hoisted, but assignments are not.

// That’s best demonstrated with an example:

// function sayHi() {
//   console.log(phrase);

//   var phrase = "Hello";
// }

// sayHi();
// The line var phrase = "Hello" has two actions in it:

// Variable declaration var
// Variable assignment =.
// The declaration is processed at the start of function execution (“hoisted”), but the assignment always works at the place where it appears. So the code works essentially like this:

// function sayHi() {
//   var phrase; // declaration works at the start...

//   console.log(phrase); // undefined

//   phrase = "Hello"; // ...assignment - when the execution reaches it.
// }

// sayHi();
// Because all var declarations are processed at the function start, we can reference them at any place. But variables are undefined until the assignments.

// In both examples above, console.log runs without an error, because the variable phrase exists. But its value is not yet assigned, so it shows undefined.

// IIFE
// In the past, as there was only var, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called “immediately-invoked function expressions” (abbreviated as IIFE).

// That’s not something we should use nowadays, but you can find them in old scripts.

// An IIFE looks like this:

// (function() {

//   var message = "Hello";

//   console.log(message); // Hello

// })();
// Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

// The Function Expression is wrapped with parenthesis (function {...}), because when JavaScript engine encounters "function" in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

// // Tries to declare and immediately call a function
// function() { // <-- SyntaxError: Function statements require a function name

//   var message = "Hello";

//   console.log(message); // Hello

// }();
// Even if we say: “okay, let’s add a name”, that won’t work, as JavaScript does not allow Function Declarations to be called immediately:

// // syntax error because of parentheses below
// function go() {

// }(); // <-- can't call Function Declaration immediately
// So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it’s a Function Expression: it needs no name and can be called immediately.

// There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

// // Ways to create IIFE

// (function() {
//   console.log("Parentheses around the function");
// })();

// (function() {
//   console.log("Parentheses around the whole thing");
// }());

// !function() {
//   console.log("Bitwise NOT operator starts the expression");
// }();

// +function() {
//   console.log("Unary plus starts the expression");
// }();
// In all the above cases we declare a Function Expression and run it immediately. Let’s note again: nowadays there’s no reason to write such code.

// Summary
// There are two main differences of var compared to let/const:

// var variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
// var declarations are processed at function start (script start for globals).
// There’s one more very minor difference related to the global object, that we’ll cover in the next chapter.

// These differences make var worse than let most of the time. Block-level variables is such a great thing. That’s why let was introduced in the standard long ago, and is now a major way (along with const) to declare a variable.
// //////////////////////////////////////////////

// // Global object
// Global object
// The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

// In a browser it is named window, for Node.js it is global, for other environments it may have another name.

// Recently, globalThis was added to the language, as a standardized name for a global object, that should be supported across all environments. It’s supported in all major browsers.

// We’ll use window here, assuming that our environment is a browser. If your script may run in other environments, it’s better to use globalThis instead.

// All properties of the global object can be accessed directly:

// console.log("Hello");
// // is the same as
// window.console.log("Hello");
// In a browser, global functions and variables declared with var (not let/const!) become the property of the global object:

// var gVar = 5;

// console.log(window.gVar); // 5 (became a property of the global object)
// Function declarations have the same effect (statements with function keyword in the main code flow, not function expressions).

// Please don’t rely on that! This behavior exists for compatibility reasons. Modern scripts use JavaScript modules where such a thing doesn’t happen.

// If we used let instead, such thing wouldn’t happen:

// let gLet = 5;

// console.log(window.gLet); // undefined (doesn't become a property of the global object)
// If a value is so important that you’d like to make it available globally, write it directly as a property:

// // make current user information global, to let all scripts access it
// window.currentUser = {
//   name: "John"
// };

// // somewhere else in code
// console.log(currentUser.name);  // John

// // or, if we have a local variable with the name "currentUser"
// // get it from window explicitly (safe!)
// console.log(window.currentUser.name); // John
// That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets “input” variables and produces certain “outcome” is clearer, less prone to errors and easier to test than if it uses outer or global variables.

// Using for polyfills
// We use the global object to test for support of modern language features.

// For instance, test if a built-in Promise object exists (it doesn’t in really old browsers):

// if (!window.Promise) {
//   console.log("Your browser is really old!");
// }
// If there’s none (say, we’re in an old browser), we can create “polyfills”: add functions that are not supported by the environment, but exist in the modern standard.

// if (!window.Promise) {
//   window.Promise = ... // custom implementation of the modern language feature
// }
// Summary
// The global object holds variables that should be available everywhere.

// That includes JavaScript built-ins, such as Array and environment-specific values, such as window.innerHeight – the window height in the browser.

// The global object has a universal name globalThis.

// …But more often is referred by “old-school” environment-specific names, such as window (browser) and global (Node.js).

// We should store values in the global object only if they’re truly global for our project. And keep their number at minimum.

// In-browser, unless we’re using modules, global functions and variables declared with var become a property of the global object.

// To make our code future-proof and easier to understand, we should access properties of the global object directly, as window.x.
// //////////////////////////////////////////////

// // Function object, NFE
// Function object, NFE
// As we already know, a function in JavaScript is a value.

// Every value in JavaScript has a type. What type is a function?

// In JavaScript, functions are objects.

// A good way to imagine functions is as callable “action objects”. We can not only call them, but also treat them as objects: add/remove properties, pass by reference etc.

// The “name” property
// Function objects contain some useable properties.

// For instance, a function’s name is accessible as the “name” property:

// function sayHi() {
//   console.log("Hi");
// }

// console.log(sayHi.name); // sayHi
// What’s kind of funny, the name-assigning logic is smart. It also assigns the correct name to a function even if it’s created without one, and then immediately assigned:

// let sayHi = function() {
//   console.log("Hi");
// };

// console.log(sayHi.name); // sayHi (there's a name!)
// It also works if the assignment is done via a default value:

// function f(sayHi = function() {}) {
//   console.log(sayHi.name); // sayHi (works!)
// }

// f();
// In the specification, this feature is called a “contextual name”. If the function does not provide one, then in an assignment it is figured out from the context.

// Object methods have names too:

// let user = {

//   sayHi() {
//     // ...
//   },

//   sayBye: function() {
//     // ...
//   }

// }

// console.log(user.sayHi.name); // sayHi
// console.log(user.sayBye.name); // sayBye
// There’s no magic though. There are cases when there’s no way to figure out the right name. In that case, the name property is empty, like here:

// // function created inside array
// let arr = [function() {}];

// console.log( arr[0].name ); // <empty string>
// // the engine has no way to set up the right name, so there is none
// In practice, however, most functions do have a name.

// The “length” property
// There is another built-in property “length” that returns the number of function parameters, for instance:

// function f1(a) {}
// function f2(a, b) {}
// function many(a, b, ...more) {}

// console.log(f1.length); // 1
// console.log(f2.length); // 2
// console.log(many.length); // 2
// Here we can see that rest parameters are not counted.

// The length property is sometimes used for introspection in functions that operate on other functions.

// For instance, in the code below the ask function accepts a question to ask and an arbitrary number of handler functions to call.

// Once a user provides their answer, the function calls the handlers. We can pass two kinds of handlers:

// A zero-argument function, which is only called when the user gives a positive answer.
// A function with arguments, which is called in either case and returns an answer.
// To call handler the right way, we examine the handler.length property.

// The idea is that we have a simple, no-arguments handler syntax for positive cases (most frequent variant), but are able to support universal handlers as well:

// function ask(question, ...handlers) {
//   let isYes = confirm(question);

//   for(let handler of handlers) {
//     if (handler.length == 0) {
//       if (isYes) handler();
//     } else {
//       handler(isYes);
//     }
//   }

// }

// // for positive answer, both handlers are called
// // for negative answer, only the second one
// ask("Question?", () => console.log('You said yes'), result => console.log(result));
// This is a particular case of so-called polymorphism – treating arguments differently depending on their type or, in our case depending on the length. The idea does have a use in JavaScript libraries.

// Custom properties
// We can also add properties of our own.

// Here we add the counter property to track the total calls count:

// function sayHi() {
//   console.log("Hi");

//   // let's count how many times we run
//   sayHi.counter++;
// }
// sayHi.counter = 0; // initial value

// sayHi(); // Hi
// sayHi(); // Hi

// console.log( `Called ${sayHi.counter} times` ); // Called 2 times
// A property is not a variable
// A property assigned to a function like sayHi.counter = 0 does not define a local variable counter inside it. In other words, a property counter and a variable let counter are two unrelated things.

// We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds.

// Function properties can replace closures sometimes. For instance, we can rewrite the counter function example from the chapter Variable scope, closure to use a function property:

// function makeCounter() {
//   // instead of:
//   // let count = 0

//   function counter() {
//     return counter.count++;
//   };

//   counter.count = 0;

//   return counter;
// }

// let counter = makeCounter();
// console.log( counter() ); // 0
// console.log( counter() ); // 1
// The count is now stored in the function directly, not in its outer Lexical Environment.

// Is it better or worse than using a closure?

// The main difference is that if the value of count lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it’s bound to a function, then such a thing is possible:

// function makeCounter() {

//   function counter() {
//     return counter.count++;
//   };

//   counter.count = 0;

//   return counter;
// }

// let counter = makeCounter();

// counter.count = 10;
// console.log( counter() ); // 10
// So the choice of implementation depends on our aims.

// Named Function Expression
// Named Function Expression, or NFE, is a term for Function Expressions that have a name.

// For instance, let’s take an ordinary Function Expression:

// let sayHi = function(who) {
//   console.log(`Hello, ${who}`);
// };
// And add a name to it:

// let sayHi = function func(who) {
//   console.log(`Hello, ${who}`);
// };
// Did we achieve anything here? What’s the purpose of that additional "func" name?

// First let’s note, that we still have a Function Expression. Adding the name "func" after function did not make it a Function Declaration, because it is still created as a part of an assignment expression.

// Adding such a name also did not break anything.

// The function is still available as sayHi():

// let sayHi = function func(who) {
//   console.log(`Hello, ${who}`);
// };

// sayHi("John"); // Hello, John
// There are two special things about the name func, that are the reasons for it:

// It allows the function to reference itself internally.
// It is not visible outside of the function.
// For instance, the function sayHi below calls itself again with "Guest" if no who is provided:

// let sayHi = function func(who) {
//   if (who) {
//     console.log(`Hello, ${who}`);
//   } else {
//     func("Guest"); // use func to re-call itself
//   }
// };

// sayHi(); // Hello, Guest

// // But this won't work:
// func(); // Error, func is not defined (not visible outside of the function)
// Why do we use func? Maybe just use sayHi for the nested call?

// Actually, in most cases we can:

// let sayHi = function(who) {
//   if (who) {
//     console.log(`Hello, ${who}`);
//   } else {
//     sayHi("Guest");
//   }
// };
// The problem with that code is that sayHi may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:

// let sayHi = function(who) {
//   if (who) {
//     console.log(`Hello, ${who}`);
//   } else {
//     sayHi("Guest"); // Error: sayHi is not a function
//   }
// };

// let welcome = sayHi;
// sayHi = null;

// welcome(); // Error, the nested sayHi call doesn't work any more!
// That happens because the function takes sayHi from its outer lexical environment. There’s no local sayHi, so the outer variable is used. And at the moment of the call that outer sayHi is null.

// The optional name which we can put into the Function Expression is meant to solve exactly these kinds of problems.

// Let’s use it to fix our code:

// let sayHi = function func(who) {
//   if (who) {
//     console.log(`Hello, ${who}`);
//   } else {
//     func("Guest"); // Now all fine
//   }
// };

// let welcome = sayHi;
// sayHi = null;

// welcome(); // Hello, Guest (nested call works)
// Now it works, because the name "func" is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function.

// The outer code still has its variable sayHi or welcome. And func is an “internal function name”, the way for the function to can call itself reliably.

// There’s no such thing for Function Declaration
// The “internal name” feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an “internal” name.

// Sometimes, when we need a reliable internal name, it’s the reason to rewrite a Function Declaration to Named Function Expression form.

// Summary
// Functions are objects.

// Here we covered their properties:

// name – the function name. Usually taken from the function definition, but if there’s none, JavaScript tries to guess it from the context (e.g. an assignment).
// length – the number of arguments in the function definition. Rest parameters are not counted.
// If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

// Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

// They create a “main” function and attach many other “helper” functions to it. For instance, the jQuery library creates a function named $. The lodash library creates a function _, and then adds _.clone, _.keyBy and other properties to it (see the docs when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.

// So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.
// //////////////////////////////////////////////

// // The "new Function" syntax
// The "new Function" syntax
// There’s one more way to create a function. It’s rarely used, but sometimes there’s no alternative.

// Syntax
// The syntax for creating a function:

// let func = new Function ([arg1, arg2, ...argN], functionBody);
// The function is created with the arguments arg1...argN and the given functionBody.

// It’s easier to understand by looking at an example. Here’s a function with two arguments:

// let sum = new Function('a', 'b', 'return a + b');

// console.log( sum(1, 2) ); // 3
// And here there’s a function without arguments, with only the function body:

// let sayHi = new Function('console.log("Hello")');

// sayHi(); // Hello
// The major difference from other ways we’ve seen is that the function is created literally from a string, that is passed at run time.

// All previous declarations required us, programmers, to write the function code in the script.

// But new Function allows to turn any string into a function. For example, we can receive a new function from a server and then execute it:

// let str = ... receive the code from a server dynamically ...

// let func = new Function(str);
// func();
// It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications.

// Closure
// Usually, a function remembers where it was born in the special property [[Environment]]. It references the Lexical Environment from where it’s created (we covered that in the chapter Variable scope, closure).

// But when a function is created using new Function, its [[Environment]] is set to reference not the current Lexical Environment, but the global one.

// So, such function doesn’t have access to outer variables, only to the global ones.

// function getFunc() {
//   let value = "test";

//   let func = new Function('console.log(value)');

//   return func;
// }

// getFunc()(); // error: value is not defined
// Compare it with the regular behavior:

// function getFunc() {
//   let value = "test";

//   let func = function() { console.log(value); };

//   return func;
// }

// getFunc()(); // "test", from the Lexical Environment of getFunc
// This special feature of new Function looks strange, but appears very useful in practice.

// Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script (that’s why we don’t use regular functions), but will be known in the process of execution. We may receive it from the server or from another source.

// Our new function needs to interact with the main script.

// What if it could access the outer variables?

// The problem is that before JavaScript is published to production, it’s compressed using a minifier – a special program that shrinks code by removing extra comments, spaces and – what’s important, renames local variables into shorter ones.

// For instance, if a function has let userName, minifier replaces it with let a (or another letter if this one is occupied), and does it everywhere. That’s usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don’t break anything. They’re not just a dumb find-and-replace.

// So if new Function had access to outer variables, it would be unable to find renamed userName.

// If new Function had access to outer variables, it would have problems with minifiers.

// Besides, such code would be architecturally bad and prone to errors.

// To pass something to a function, created as new Function, we should use its arguments.
// //////////////////////////////////////////////

// // Scheduling: setTimeout and setInterval
// Scheduling: setTimeout and setInterval
// We may decide to execute a function not right now, but at a certain time later. That’s called “scheduling a call”.

// There are two methods for it:

// setTimeout allows us to run a function once after the interval of time.
// setInterval allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.
// These methods are not a part of JavaScript specification. But most environments have the internal scheduler and provide these methods. In particular, they are supported in all browsers and Node.js.

// setTimeout
// The syntax:

// let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
// Parameters:

// func|code
// Function or a string of code to execute. Usually, that’s a function. For historical reasons, a string of code can be passed, but that’s not recommended.
// delay
// The delay before run, in milliseconds (1000 ms = 1 second), by default 0.
// arg1, arg2…
// Arguments for the function (not supported in IE9-)
// For instance, this code calls sayHi() after one second:

// function sayHi() {
//   console.log('Hello');
// }

// setTimeout(sayHi, 1000);
// With arguments:

// function sayHi(phrase, who) {
//   console.log( phrase + ', ' + who );
// }

// setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
// If the first argument is a string, then JavaScript creates a function from it.

// So, this will also work:

// setTimeout("console.log('Hello')", 1000);
// But using strings is not recommended, use arrow functions instead of them, like this:

// setTimeout(() => console.log('Hello'), 1000);
// Pass a function, but don’t run it
// Novice developers sometimes make a mistake by adding brackets () after the function:

// // wrong!
// setTimeout(sayHi(), 1000);
// That doesn’t work, because setTimeout expects a reference to a function. And here sayHi() runs the function, and the result of its execution is passed to setTimeout. In our case the result of sayHi() is undefined (the function returns nothing), so nothing is scheduled.

// Canceling with clearTimeout
// A call to setTimeout returns a “timer identifier” timerId that we can use to cancel the execution.

// The syntax to cancel:

// let timerId = setTimeout(...);
// clearTimeout(timerId);
// In the code below, we schedule the function and then cancel it (changed our mind). As a result, nothing happens:

// let timerId = setTimeout(() => console.log("never happens"), 1000);
// console.log(timerId); // timer identifier

// clearTimeout(timerId);
// console.log(timerId); // same identifier (doesn't become null after canceling)
// As we can see from console.log output, in a browser the timer identifier is a number. In other environments, this can be something else. For instance, Node.js returns a timer object with additional methods.

// Again, there is no universal specification for these methods, so that’s fine.

// For browsers, timers are described in the timers section of HTML5 standard.

// setInterval
// The setInterval method has the same syntax as setTimeout:

// let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
// All arguments have the same meaning. But unlike setTimeout it runs the function not only once, but regularly after the given interval of time.

// To stop further calls, we should call clearInterval(timerId).

// The following example will show the message every 2 seconds. After 5 seconds, the output is stopped:

// // repeat with the interval of 2 seconds
// let timerId = setInterval(() => console.log('tick'), 2000);

// // after 5 seconds stop
// setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 5000);
// Time goes on while console.log is shown
// In most browsers, including Chrome and Firefox the internal timer continues “ticking” while showing console.log/confirm/prompt.

// So if you run the code above and don’t dismiss the console.log window for some time, then the next console.log will be shown immediately as you do it. The actual interval between console.logs will be shorter than 2 seconds.

// Nested setTimeout
// There are two ways of running something regularly.

// One is setInterval. The other one is a nested setTimeout, like this:

// /** instead of:
// let timerId = setInterval(() => console.log('tick'), 2000);
// */

// let timerId = setTimeout(function tick() {
//   console.log('tick');
//   timerId = setTimeout(tick, 2000); // (*)
// }, 2000);
// The setTimeout above schedules the next call right at the end of the current one (*).

// The nested setTimeout is a more flexible method than setInterval. This way the next call may be scheduled differently, depending on the results of the current one.

// For instance, we need to write a service that sends a request to the server every 5 seconds asking for data, but in case the server is overloaded, it should increase the interval to 10, 20, 40 seconds…

// Here’s the pseudocode:

// let delay = 5000;

// let timerId = setTimeout(function request() {
//   ...send request...

//   if (request failed due to server overload) {
//     // increase the interval to the next run
//     delay *= 2;
//   }

//   timerId = setTimeout(request, delay);

// }, delay);
// And if the functions that we’re scheduling are CPU-hungry, then we can measure the time taken by the execution and plan the next call sooner or later.

// Nested setTimeout allows to set the delay between the executions more precisely than setInterval.

// Let’s compare two code fragments. The first one uses setInterval:

// let i = 1;
// setInterval(function() {
//   func(i++);
// }, 100);
// The second one uses nested setTimeout:

// let i = 1;
// setTimeout(function run() {
//   func(i++);
//   setTimeout(run, 100);
// }, 100);
// For setInterval the internal scheduler will run func(i++) every 100ms:

// Did you notice?

// The real delay between func calls for setInterval is less than in the code!

// That’s normal, because the time taken by func's execution “consumes” a part of the interval.

// It is possible that func's execution turns out to be longer than we expected and takes more than 100ms.

// In this case the engine waits for func to complete, then checks the scheduler and if the time is up, runs it again immediately.

// In the edge case, if the function always executes longer than delay ms, then the calls will happen without a pause at all.

// And here is the picture for the nested setTimeout:

// The nested setTimeout guarantees the fixed delay (here 100ms).

// That’s because a new call is planned at the end of the previous one.

// Garbage collection and setInterval/setTimeout callback
// When a function is passed in setInterval/setTimeout, an internal reference is created to it and saved in the scheduler. It prevents the function from being garbage collected, even if there are no other references to it.

// // the function stays in memory until the scheduler calls it
// setTimeout(function() {...}, 100);
// For setInterval the function stays in memory until clearInterval is called.

// There’s a side effect. A function references the outer lexical environment, so, while it lives, outer variables live too. They may take much more memory than the function itself. So when we don’t need the scheduled function anymore, it’s better to cancel it, even if it’s very small.

// Zero delay setTimeout
// There’s a special use case: setTimeout(func, 0), or just setTimeout(func).

// This schedules the execution of func as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.

// So the function is scheduled to run “right after” the current script.

// For instance, this outputs “Hello”, then immediately “World”:

// setTimeout(() => console.log("World"));

// console.log("Hello");
// The first line “puts the call into calendar after 0ms”. But the scheduler will only “check the calendar” after the current script is complete, so "Hello" is first, and "World" – after it.

// There are also advanced browser-related use cases of zero-delay timeout, that we’ll discuss in the chapter Event loop: microtasks and macrotasks.

// Zero delay is in fact not zero (in a browser)
// In the browser, there’s a limitation of how often nested timers can run. The HTML5 standard says: “after five nested timers, the interval is forced to be at least 4 milliseconds.”.

// Let’s demonstrate what it means with the example below. The setTimeout call in it re-schedules itself with zero delay. Each call remembers the real time from the previous one in the times array. What do the real delays look like? Let’s see:

// let start = Date.now();
// let times = [];

// setTimeout(function run() {
//   times.push(Date.now() - start); // remember delay from the previous call

//   if (start + 100 < Date.now()) console.log(times); // show the delays after 100ms
//   else setTimeout(run); // else re-schedule
// });

// // an example of the output:
// // 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
// First timers run immediately (just as written in the spec), and then we see 9, 15, 20, 24.... The 4+ ms obligatory delay between invocations comes into play.

// The similar thing happens if we use setInterval instead of setTimeout: setInterval(f) runs f few times with zero-delay, and afterwards with 4+ ms delay.

// That limitation comes from ancient times and many scripts rely on it, so it exists for historical reasons.

// For server-side JavaScript, that limitation does not exist, and there exist other ways to schedule an immediate asynchronous job, like setImmediate for Node.js. So this note is browser-specific.

// Summary
// Methods setTimeout(func, delay, ...args) and setInterval(func, delay, ...args) allow us to run the func once/regularly after delay milliseconds.
// To cancel the execution, we should call clearTimeout/clearInterval with the value returned by setTimeout/setInterval.
// Nested setTimeout calls are a more flexible alternative to setInterval, allowing us to set the time between executions more precisely.
// Zero delay scheduling with setTimeout(func, 0) (the same as setTimeout(func)) is used to schedule the call “as soon as possible, but after the current script is complete”.
// The browser limits the minimal delay for five or more nested calls of setTimeout or for setInterval (after 5th call) to 4ms. That’s for historical reasons.
// Please note that all scheduling methods do not guarantee the exact delay.

// For example, the in-browser timer may slow down for a lot of reasons:

// The CPU is overloaded.
// The browser tab is in the background mode.
// The laptop is on battery saving mode.
// All that may increase the minimal timer resolution (the minimal delay) to 300ms or even 1000ms depending on the browser and OS-level performance settings.
// //////////////////////////////////////////////

// // Decorators and forwarding, call/apply
// Decorators and forwarding, call/apply
// JavaScript gives exceptional flexibility when dealing with functions. They can be passed around, used as objects, and now we’ll see how to forward calls between them and decorate them.

// Transparent caching
// Let’s say we have a function slow(x) which is CPU-heavy, but its results are stable. In other words, for the same x it always returns the same result.

// If the function is called often, we may want to cache (remember) the results to avoid spending extra-time on recalculations.

// But instead of adding that functionality into slow() we’ll create a wrapper function, that adds caching. As we’ll see, there are many benefits of doing so.

// Here’s the code, and explanations follow:

// function slow(x) {
//   // there can be a heavy CPU-intensive job here
//   console.log(`Called with ${x}`);
//   return x;
// }

// function cachingDecorator(func) {
//   let cache = new Map();

//   return function(x) {
//     if (cache.has(x)) {    // if there's such key in cache
//       return cache.get(x); // read the result from it
//     }

//     let result = func(x);  // otherwise call func

//     cache.set(x, result);  // and cache (remember) the result
//     return result;
//   };
// }

// slow = cachingDecorator(slow);

// console.log( slow(1) ); // slow(1) is cached and the result returned
// console.log( "Again: " + slow(1) ); // slow(1) result returned from cache

// console.log( slow(2) ); // slow(2) is cached and the result returned
// console.log( "Again: " + slow(2) ); // slow(2) result returned from cache
// In the code above cachingDecorator is a decorator: a special function that takes another function and alters its behavior.

// The idea is that we can call cachingDecorator for any function, and it will return the caching wrapper. That’s great, because we can have many functions that could use such a feature, and all we need to do is to apply cachingDecorator to them.

// By separating caching from the main function code we also keep the main code simpler.

// The result of cachingDecorator(func) is a “wrapper”: function(x) that “wraps” the call of func(x) into caching logic:

// From an outside code, the wrapped slow function still does the same. It just got a caching aspect added to its behavior.

// To summarize, there are several benefits of using a separate cachingDecorator instead of altering the code of slow itself:

// The cachingDecorator is reusable. We can apply it to another function.
// The caching logic is separate, it did not increase the complexity of slow itself (if there was any).
// We can combine multiple decorators if needed (other decorators will follow).
// Using “func.call” for the context
// The caching decorator mentioned above is not suited to work with object methods.

// For instance, in the code below worker.slow() stops working after the decoration:

// // we'll make worker.slow caching
// let worker = {
//   someMethod() {
//     return 1;
//   },

//   slow(x) {
//     // scary CPU-heavy task here
//     console.log("Called with " + x);
//     return x * this.someMethod(); // (*)
//   }
// };

// // same code as before
// function cachingDecorator(func) {
//   let cache = new Map();
//   return function(x) {
//     if (cache.has(x)) {
//       return cache.get(x);
//     }
//     let result = func(x); // (**)
//     cache.set(x, result);
//     return result;
//   };
// }

// console.log( worker.slow(1) ); // the original method works

// worker.slow = cachingDecorator(worker.slow); // now make it caching

// console.log( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
// The error occurs in the line (*) that tries to access this.someMethod and fails. Can you see why?

// The reason is that the wrapper calls the original function as func(x) in the line (**). And, when called like that, the function gets this = undefined.

// We would observe a similar symptom if we tried to run:

// let func = worker.slow;
// func(2);
// So, the wrapper passes the call to the original method, but without the context this. Hence the error.

// Let’s fix it.

// There’s a special built-in function method func.call(context, …args) that allows to call a function explicitly setting this.

// The syntax is:

// func.call(context, arg1, arg2, ...)
// It runs func providing the first argument as this, and the next as the arguments.

// To put it simply, these two calls do almost the same:

// func(1, 2, 3);
// func.call(obj, 1, 2, 3)
// They both call func with arguments 1, 2 and 3. The only difference is that func.call also sets this to obj.

// As an example, in the code below we call sayHi in the context of different objects: sayHi.call(user) runs sayHi providing this=user, and the next line sets this=admin:

// function sayHi() {
//   console.log(this.name);
// }

// let user = { name: "John" };
// let admin = { name: "Admin" };

// // use call to pass different objects as "this"
// sayHi.call( user ); // John
// sayHi.call( admin ); // Admin
// And here we use call to call say with the given context and phrase:

// function say(phrase) {
//   console.log(this.name + ': ' + phrase);
// }

// let user = { name: "John" };

// // user becomes this, and "Hello" becomes the first argument
// say.call( user, "Hello" ); // John: Hello
// In our case, we can use call in the wrapper to pass the context to the original function:

// let worker = {
//   someMethod() {
//     return 1;
//   },

//   slow(x) {
//     console.log("Called with " + x);
//     return x * this.someMethod(); // (*)
//   }
// };

// function cachingDecorator(func) {
//   let cache = new Map();
//   return function(x) {
//     if (cache.has(x)) {
//       return cache.get(x);
//     }
//     let result = func.call(this, x); // "this" is passed correctly now
//     cache.set(x, result);
//     return result;
//   };
// }

// worker.slow = cachingDecorator(worker.slow); // now make it caching

// console.log( worker.slow(2) ); // works
// console.log( worker.slow(2) ); // works, doesn't call the original (cached)
// Now everything is fine.

// To make it all clear, let’s see more deeply how this is passed along:

// After the decoration worker.slow is now the wrapper function (x) { ... }.
// So when worker.slow(2) is executed, the wrapper gets 2 as an argument and this=worker (it’s the object before dot).
// Inside the wrapper, assuming the result is not yet cached, func.call(this, x) passes the current this (=worker) and the current argument (=2) to the original method.
// Going multi-argument
// Now let’s make cachingDecorator even more universal. Till now it was working only with single-argument functions.

// Now how to cache the multi-argument worker.slow method?

// let worker = {
//   slow(min, max) {
//     return min + max; // scary CPU-hogger is assumed
//   }
// };

// // should remember same-argument calls
// worker.slow = cachingDecorator(worker.slow);
// Previously, for a single argument x we could just cache.set(x, result) to save the result and cache.get(x) to retrieve it. But now we need to remember the result for a combination of arguments (min,max). The native Map takes single value only as the key.

// There are many solutions possible:

// Implement a new (or use a third-party) map-like data structure that is more versatile and allows multi-keys.
// Use nested maps: cache.set(min) will be a Map that stores the pair (max, result). So we can get result as cache.get(min).get(max).
// Join two values into one. In our particular case we can just use a string "min,max" as the Map key. For flexibility, we can allow to provide a hashing function for the decorator, that knows how to make one value from many.
// For many practical applications, the 3rd variant is good enough, so we’ll stick to it.

// Also we need to pass not just x, but all arguments in func.call. Let’s recall that in a function() we can get a pseudo-array of its arguments as arguments, so func.call(this, x) should be replaced with func.call(this, ...arguments).

// Here’s a more powerful cachingDecorator:

// let worker = {
//   slow(min, max) {
//     console.log(`Called with ${min},${max}`);
//     return min + max;
//   }
// };

// function cachingDecorator(func, hash) {
//   let cache = new Map();
//   return function() {
//     let key = hash(arguments); // (*)
//     if (cache.has(key)) {
//       return cache.get(key);
//     }

//     let result = func.call(this, ...arguments); // (**)

//     cache.set(key, result);
//     return result;
//   };
// }

// function hash(args) {
//   return args[0] + ',' + args[1];
// }

// worker.slow = cachingDecorator(worker.slow, hash);

// console.log( worker.slow(3, 5) ); // works
// console.log( "Again " + worker.slow(3, 5) ); // same (cached)
// Now it works with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments. An interesting way to handle this will be covered below).

// There are two changes:

// In the line (*) it calls hash to create a single key from arguments. Here we use a simple “joining” function that turns arguments (3, 5) into the key "3,5". More complex cases may require other hashing functions.
// Then (**) uses func.call(this, ...arguments) to pass both the context and all arguments the wrapper got (not just the first one) to the original function.
// func.apply
// Instead of func.call(this, ...arguments) we could use func.apply(this, arguments).

// The syntax of built-in method func.apply is:

// func.apply(context, args)
// It runs the func setting this=context and using an array-like object args as the list of arguments.

// The only syntax difference between call and apply is that call expects a list of arguments, while apply takes an array-like object with them.

// So these two calls are almost equivalent:

// func.call(context, ...args);
// func.apply(context, args);
// They perform the same call of func with given context and arguments.

// There’s only a subtle difference regarding args:

// The spread syntax ... allows to pass iterable args as the list to call.
// The apply accepts only array-like args.
// …And for objects that are both iterable and array-like, such as a real array, we can use any of them, but apply will probably be faster, because most JavaScript engines internally optimize it better.

// Passing all arguments along with the context to another function is called call forwarding.

// That’s the simplest form of it:

// let wrapper = function() {
//   return func.apply(this, arguments);
// };
// When an external code calls such wrapper, it is indistinguishable from the call of the original function func.

// Borrowing a method
// Now let’s make one more minor improvement in the hashing function:

// function hash(args) {
//   return args[0] + ',' + args[1];
// }
// As of now, it works only on two arguments. It would be better if it could glue any number of args.

// The natural solution would be to use arr.join method:

// function hash(args) {
//   return args.join();
// }
// …Unfortunately, that won’t work. Because we are calling hash(arguments), and arguments object is both iterable and array-like, but not a real array.

// So calling join on it would fail, as we can see below:

// function hash() {
//   console.log( arguments.join() ); // Error: arguments.join is not a function
// }

// hash(1, 2);
// Still, there’s an easy way to use array join:

// function hash() {
//   console.log( [].join.call(arguments) ); // 1,2
// }

// hash(1, 2);
// The trick is called method borrowing.

// We take (borrow) a join method from a regular array ([].join) and use [].join.call to run it in the context of arguments.

// Why does it work?

// That’s because the internal algorithm of the native method arr.join(glue) is very simple.

// Taken from the specification almost “as-is”:

// Let glue be the first argument or, if no arguments, then a comma ",".
// Let result be an empty string.
// Append this[0] to result.
// Append glue and this[1].
// Append glue and this[2].
// …Do so until this.length items are glued.
// Return result.
// So, technically it takes this and joins this[0], this[1] …etc together. It’s intentionally written in a way that allows any array-like this (not a coincidence, many methods follow this practice). That’s why it also works with this=arguments.

// Decorators and function properties
// It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like func.calledCount or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

// E.g. in the example above if slow function had any properties on it, then cachingDecorator(slow) is a wrapper without them.

// Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

// There exists a way to create decorators that keep access to function properties, but this requires using a special Proxy object to wrap a function. We’ll discuss it later in the article Proxy and Reflect.

// Summary
// Decorator is a wrapper around a function that alters its behavior. The main job is still carried out by the function.

// Decorators can be seen as “features” or “aspects” that can be added to a function. We can add one or add many. And all this without changing its code!

// To implement cachingDecorator, we studied methods:

// func.call(context, arg1, arg2…) – calls func with given context and arguments.
// func.apply(context, args) – calls func passing context as this and array-like args into a list of arguments.
// The generic call forwarding is usually done with apply:

// let wrapper = function() {
//   return original.apply(this, arguments);
// };
// We also saw an example of method borrowing when we take a method from an object and call it in the context of another object. It is quite common to take array methods and apply them to arguments. The alternative is to use rest parameters object that is a real array.

// There are many decorators there in the wild. Check how well you got them by solving the tasks of this chapter.
// //////////////////////////////////////////////

// // Function binding
// Function binding
// When passing object methods as callbacks, for instance to setTimeout, there’s a known problem: "losing this".

// In this chapter we’ll see the ways to fix it.

// Losing “this”
// We’ve already seen examples of losing this. Once a method is passed somewhere separately from the object – this is lost.

// Here’s how it may happen with setTimeout:

// let user = {
//   firstName: "John",
//   sayHi() {
//     console.log(`Hello, ${this.firstName}!`);
//   }
// };

// setTimeout(user.sayHi, 1000); // Hello, undefined!
// As we can see, the output shows not “John” as this.firstName, but undefined!

// That’s because setTimeout got the function user.sayHi, separately from the object. The last line can be rewritten as:

// let f = user.sayHi;
// setTimeout(f, 1000); // lost user context
// The method setTimeout in-browser is a little special: it sets this=window for the function call (for Node.js, this becomes the timer object, but doesn’t really matter here). So for this.firstName it tries to get window.firstName, which does not exist. In other similar cases, usually this just becomes undefined.

// The task is quite typical – we want to pass an object method somewhere else (here – to the scheduler) where it will be called. How to make sure that it will be called in the right context?

// Solution 1: a wrapper
// The simplest solution is to use a wrapping function:

// let user = {
//   firstName: "John",
//   sayHi() {
//     console.log(`Hello, ${this.firstName}!`);
//   }
// };

// setTimeout(function() {
//   user.sayHi(); // Hello, John!
// }, 1000);
// Now it works, because it receives user from the outer lexical environment, and then calls the method normally.

// The same, but shorter:

// setTimeout(() => user.sayHi(), 1000); // Hello, John!
// Looks fine, but a slight vulnerability appears in our code structure.

// What if before setTimeout triggers (there’s one second delay!) user changes value? Then, suddenly, it will call the wrong object!

// let user = {
//   firstName: "John",
//   sayHi() {
//     console.log(`Hello, ${this.firstName}!`);
//   }
// };

// setTimeout(() => user.sayHi(), 1000);

// // ...the value of user changes within 1 second
// user = {
//   sayHi() { console.log("Another user in setTimeout!"); }
// };

// // Another user in setTimeout!
// The next solution guarantees that such thing won’t happen.

// Solution 2: bind
// Functions provide a built-in method bind that allows to fix this.

// The basic syntax is:

// // more complex syntax will come a little later
// let boundFunc = func.bind(context);
// The result of func.bind(context) is a special function-like “exotic object”, that is callable as function and transparently passes the call to func setting this=context.

// In other words, calling boundFunc is like func with fixed this.

// For instance, here funcUser passes a call to func with this=user:

// let user = {
//   firstName: "John"
// };

// function func() {
//   console.log(this.firstName);
// }

// let funcUser = func.bind(user);
// funcUser(); // John
// Here func.bind(user) as a “bound variant” of func, with fixed this=user.

// All arguments are passed to the original func “as is”, for instance:

// let user = {
//   firstName: "John"
// };

// function func(phrase) {
//   console.log(phrase + ', ' + this.firstName);
// }

// // bind this to user
// let funcUser = func.bind(user);

// funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)
// Now let’s try with an object method:

// let user = {
//   firstName: "John",
//   sayHi() {
//     console.log(`Hello, ${this.firstName}!`);
//   }
// };

// let sayHi = user.sayHi.bind(user); // (*)

// // can run it without an object
// sayHi(); // Hello, John!

// setTimeout(sayHi, 1000); // Hello, John!

// // even if the value of user changes within 1 second
// // sayHi uses the pre-bound value which is reference to the old user object
// user = {
//   sayHi() { console.log("Another user in setTimeout!"); }
// };
// In the line (*) we take the method user.sayHi and bind it to user. The sayHi is a “bound” function, that can be called alone or passed to setTimeout – doesn’t matter, the context will be right.

// Here we can see that arguments are passed “as is”, only this is fixed by bind:

// let user = {
//   firstName: "John",
//   say(phrase) {
//     console.log(`${phrase}, ${this.firstName}!`);
//   }
// };

// let say = user.say.bind(user);

// say("Hello"); // Hello, John! ("Hello" argument is passed to say)
// say("Bye"); // Bye, John! ("Bye" is passed to say)
// Convenience method: bindAll
// If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

// for (let key in user) {
//   if (typeof user[key] == 'function') {
//     user[key] = user[key].bind(user);
//   }
// }
// JavaScript libraries also provide functions for convenient mass binding , e.g. _.bindAll(object, methodNames) in lodash.

// Partial functions
// Until now we have only been talking about binding this. Let’s take it a step further.

// We can bind not only this, but also arguments. That’s rarely done, but sometimes can be handy.

// The full syntax of bind:

// let bound = func.bind(context, [arg1], [arg2], ...);
// It allows to bind context as this and starting arguments of the function.

// For instance, we have a multiplication function mul(a, b):

// function mul(a, b) {
//   return a * b;
// }
// Let’s use bind to create a function double on its base:

// function mul(a, b) {
//   return a * b;
// }

// let double = mul.bind(null, 2);

// console.log( double(3) ); // = mul(2, 3) = 6
// console.log( double(4) ); // = mul(2, 4) = 8
// console.log( double(5) ); // = mul(2, 5) = 10
// The call to mul.bind(null, 2) creates a new function double that passes calls to mul, fixing null as the context and 2 as the first argument. Further arguments are passed “as is”.

// That’s called partial function application – we create a new function by fixing some parameters of the existing one.

// Please note that we actually don’t use this here. But bind requires it, so we must put in something like null.

// The function triple in the code below triples the value:

// function mul(a, b) {
//   return a * b;
// }

// let triple = mul.bind(null, 3);

// console.log( triple(3) ); // = mul(3, 3) = 9
// console.log( triple(4) ); // = mul(3, 4) = 12
// console.log( triple(5) ); // = mul(3, 5) = 15
// Why do we usually make a partial function?

// The benefit is that we can create an independent function with a readable name (double, triple). We can use it and not provide the first argument every time as it’s fixed with bind.

// In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

// For instance, we have a function send(from, to, text). Then, inside a user object we may want to use a partial variant of it: sendTo(to, text) that sends from the current user.

// Going partial without context
// What if we’d like to fix some arguments, but not the context this? For example, for an object method.

// The native bind does not allow that. We can’t just omit the context and jump to arguments.

// Fortunately, a function partial for binding only arguments can be easily implemented.

// Like this:

// function partial(func, ...argsBound) {
//   return function(...args) { // (*)
//     return func.call(this, ...argsBound, ...args);
//   }
// }

// // Usage:
// let user = {
//   firstName: "John",
//   say(time, phrase) {
//     console.log(`[${time}] ${this.firstName}: ${phrase}!`);
//   }
// };

// // add a partial method with fixed time
// user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

// user.sayNow("Hello");
// // Something like:
// // [10:00] John: Hello!
// The result of partial(func[, arg1, arg2...]) call is a wrapper (*) that calls func with:

// Same this as it gets (for user.sayNow call it’s user)
// Then gives it ...argsBound – arguments from the partial call ("10:00")
// Then gives it ...args – arguments given to the wrapper ("Hello")
// So easy to do it with the spread syntax, right?

// Also there’s a ready _.partial implementation from lodash library.

// Summary
// Method func.bind(context, ...args) returns a “bound variant” of function func that fixes the context this and first arguments if given.

// Usually we apply bind to fix this for an object method, so that we can pass it somewhere. For example, to setTimeout.

// When we fix some arguments of an existing function, the resulting (less universal) function is called partially applied or partial.

// Partials are convenient when we don’t want to repeat the same argument over and over again. Like if we have a send(from, to) function, and from should always be the same for our task, we can get a partial and go on with it.
// //////////////////////////////////////////////

// // Arrow functions revisited
// Arrow functions revisited
// Let’s revisit arrow functions.

// Arrow functions are not just a “shorthand” for writing small stuff. They have some very specific and useful features.

// JavaScript is full of situations where we need to write a small function that’s executed somewhere else.

// For instance:

// arr.forEach(func) – func is executed by forEach for every array item.
// setTimeout(func) – func is executed by the built-in scheduler.
// …there are more.
// It’s in the very spirit of JavaScript to create a function and pass it somewhere.

// And in such functions we usually don’t want to leave the current context. That’s where arrow functions come in handy.

// Arrow functions have no “this”
// As we remember from the chapter Object methods, "this", arrow functions do not have this. If this is accessed, it is taken from the outside.

// For instance, we can use it to iterate inside an object method:

// let group = {
//   title: "Our Group",
//   students: ["John", "Pete", "Alice"],

//   showList() {
//     this.students.forEach(
//       student => console.log(this.title + ': ' + student)
//     );
//   }
// };

// group.showList();
// Here in forEach, the arrow function is used, so this.title in it is exactly the same as in the outer method showList. That is: group.title.

// If we used a “regular” function, there would be an error:

// let group = {
//   title: "Our Group",
//   students: ["John", "Pete", "Alice"],

//   showList() {
//     this.students.forEach(function(student) {
//       // Error: Cannot read property 'title' of undefined
//       console.log(this.title + ': ' + student);
//     });
//   }
// };

// group.showList();
// The error occurs because forEach runs functions with this=undefined by default, so the attempt to access undefined.title is made.

// That doesn’t affect arrow functions, because they just don’t have this.

// Arrow functions can’t run with new
// Not having this naturally means another limitation: arrow functions can’t be used as constructors. They can’t be called with new.

// Arrow functions VS bind
// There’s a subtle difference between an arrow function => and a regular function called with .bind(this):

// .bind(this) creates a “bound version” of the function.
// The arrow => doesn’t create any binding. The function simply doesn’t have this. The lookup of this is made exactly the same way as a regular variable search: in the outer lexical environment.
// Arrows have no “arguments”
// Arrow functions also have no arguments variable.

// That’s great for decorators, when we need to forward a call with the current this and arguments.

// For instance, defer(f, ms) gets a function and returns a wrapper around it that delays the call by ms milliseconds:

// function defer(f, ms) {
//   return function() {
//     setTimeout(() => f.apply(this, arguments), ms);
//   };
// }

// function sayHi(who) {
//   console.log('Hello, ' + who);
// }

// let sayHiDeferred = defer(sayHi, 2000);
// sayHiDeferred("John"); // Hello, John after 2 seconds
// The same without an arrow function would look like:

// function defer(f, ms) {
//   return function(...args) {
//     let ctx = this;
//     setTimeout(function() {
//       return f.apply(ctx, args);
//     }, ms);
//   };
// }
// Here we had to create additional variables args and ctx so that the function inside setTimeout could take them.

// Summary
// Arrow functions:

// Do not have this
// Do not have arguments
// Can’t be called with new
// They also don’t have super, but we didn’t study it yet. We will on the chapter Class inheritance
// That’s because they are meant for short pieces of code that do not have their own “context”, but rather work in the current one. And they really shine in that use case.
