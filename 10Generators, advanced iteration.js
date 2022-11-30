// // Generators

// Generators
// Regular functions return only one, single value (or nothing).

// Generators can return (“yield”) multiple values, one after another, on-demand. They work great with iterables, allowing to create data streams with ease.

// Generator functions
// To create a generator, we need a special syntax construct: function*, so-called “generator function”.

// It looks like this:

// function* generateSequence() {
//   yield 1;
//   yield 2;
//   return 3;
// }
// Generator functions behave differently from regular ones. When such function is called, it doesn’t run its code. Instead it returns a special object, called “generator object”, to manage the execution.

// Here, take a look:

// function* generateSequence() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// // "generator function" creates "generator object"
// let generator = generateSequence();
// console.log(generator); // [object Generator]
// The function code execution hasn’t started yet:

// The main method of a generator is next(). When called, it runs the execution until the nearest yield <value> statement (value can be omitted, then it’s undefined). Then the function execution pauses, and the yielded value is returned to the outer code.

// The result of next() is always an object with two properties:

// value: the yielded value.
// done: true if the function code has finished, otherwise false.
// For instance, here we create the generator and get its first yielded value:

// function* generateSequence() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// let generator = generateSequence();

// let one = generator.next();

// console.log(JSON.stringify(one)); // {value: 1, done: false}
// As of now, we got the first value only, and the function execution is on the second line:

// Let’s call generator.next() again. It resumes the code execution and returns the next yield:

// let two = generator.next();

// console.log(JSON.stringify(two)); // {value: 2, done: false}

// And, if we call it a third time, the execution reaches the return statement that finishes the function:

// let three = generator.next();

// console.log(JSON.stringify(three)); // {value: 3, done: true}

// Now the generator is done. We should see it from done:true and process value:3 as the final result.

// New calls to generator.next() don’t make sense any more. If we do them, they return the same object: {done: true}.

// function* f(…) or function *f(…)?
// Both syntaxes are correct.

// But usually the first syntax is preferred, as the star * denotes that it’s a generator function, it describes the kind, not the name, so it should stick with the function keyword.

// Generators are iterable
// As you probably already guessed looking at the next() method, generators are iterable.

// We can loop over their values using for..of:

// function* generateSequence() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// let generator = generateSequence();

// for(let value of generator) {
//   console.log(value); // 1, then 2
// }
// Looks a lot nicer than calling .next().value, right?

// …But please note: the example above shows 1, then 2, and that’s all. It doesn’t show 3!

// It’s because for..of iteration ignores the last value, when done: true. So, if we want all results to be shown by for..of, we must return them with yield:

// function* generateSequence() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let generator = generateSequence();

// for(let value of generator) {
//   console.log(value); // 1, then 2, then 3
// }
// As generators are iterable, we can call all related functionality, e.g. the spread syntax ...:

// function* generateSequence() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let sequence = [0, ...generateSequence()];

// console.log(sequence); // 0, 1, 2, 3
// In the code above, ...generateSequence() turns the iterable generator object into an array of items (read more about the spread syntax in the chapter Rest parameters and spread syntax)

// Using generators for iterables
// Some time ago, in the chapter Iterables we created an iterable range object that returns values from..to.

// Here, let’s remember the code:

// let range = {
//   from: 1,
//   to: 5,

//   // for..of range calls this method once in the very beginning
//   [Symbol.iterator]() {
//     // ...it returns the iterator object:
//     // onward, for..of works only with that object, asking it for next values
//     return {
//       current: this.from,
//       last: this.to,

//       // next() is called on each iteration by the for..of loop
//       next() {
//         // it should return the value as an object {done:.., value :...}
//         if (this.current <= this.last) {
//           return { done: false, value: this.current++ };
//         } else {
//           return { done: true };
//         }
//       }
//     };
//   }
// };

// // iteration over range returns numbers from range.from to range.to
// console.log([...range]); // 1,2,3,4,5
// We can use a generator function for iteration by providing it as Symbol.iterator.

// Here’s the same range, but much more compact:

// let range = {
//   from: 1,
//   to: 5,

//   *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
//     for(let value = this.from; value <= this.to; value++) {
//       yield value;
//     }
//   }
// };

// console.log( [...range] ); // 1,2,3,4,5
// That works, because range[Symbol.iterator]() now returns a generator, and generator methods are exactly what for..of expects:

// it has a .next() method
// that returns values in the form {value: ..., done: true/false}
// That’s not a coincidence, of course. Generators were added to JavaScript language with iterators in mind, to implement them easily.

// The variant with a generator is much more concise than the original iterable code of range, and keeps the same functionality.

// Generators may generate values forever
// In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.

// That surely would require a break (or return) in for..of over such generator. Otherwise, the loop would repeat forever and hang.

// Generator composition
// Generator composition is a special feature of generators that allows to transparently “embed” generators in each other.

// For instance, we have a function that generates a sequence of numbers:

// function* generateSequence(start, end) {
//   for (let i = start; i <= end; i++) yield i;
// }
// Now we’d like to reuse it to generate a more complex sequence:

// first, digits 0..9 (with character codes 48…57),
// followed by uppercase alphabet letters A..Z (character codes 65…90)
// followed by lowercase alphabet letters a..z (character codes 97…122)
// We can use this sequence e.g. to create passwords by selecting characters from it (could add syntax characters as well), but let’s generate it first.

// In a regular function, to combine results from multiple other functions, we call them, store the results, and then join at the end.

// For generators, there’s a special yield* syntax to “embed” (compose) one generator into another.

// The composed generator:

// function* generateSequence(start, end) {
//   for (let i = start; i <= end; i++) yield i;
// }

// function* generatePasswordCodes() {

//   // 0..9
//   yield* generateSequence(48, 57);

//   // A..Z
//   yield* generateSequence(65, 90);

//   // a..z
//   yield* generateSequence(97, 122);

// }

// let str = '';

// for(let code of generatePasswordCodes()) {
//   str += String.fromCharCode(code);
// }

// console.log(str); // 0..9A..Za..z
// The yield* directive delegates the execution to another generator. This term means that yield* gen iterates over the generator gen and transparently forwards its yields outside. As if the values were yielded by the outer generator.

// The result is the same as if we inlined the code from nested generators:

// function* generateSequence(start, end) {
//   for (let i = start; i <= end; i++) yield i;
// }

// function* generateAlphaNum() {

//   // yield* generateSequence(48, 57);
//   for (let i = 48; i <= 57; i++) yield i;

//   // yield* generateSequence(65, 90);
//   for (let i = 65; i <= 90; i++) yield i;

//   // yield* generateSequence(97, 122);
//   for (let i = 97; i <= 122; i++) yield i;

// }

// let str = '';

// for(let code of generateAlphaNum()) {
//   str += String.fromCharCode(code);
// }

// console.log(str); // 0..9A..Za..z
// A generator composition is a natural way to insert a flow of one generator into another. It doesn’t use extra memory to store intermediate results.

// “yield” is a two-way street
// Until this moment, generators were similar to iterable objects, with a special syntax to generate values. But in fact they are much more powerful and flexible.

// That’s because yield is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.

// To do so, we should call generator.next(arg), with an argument. That argument becomes the result of yield.

// Let’s see an example:

// function* gen() {
//   // Pass a question to the outer code and wait for an answer
//   let result = yield "2 + 2 = ?"; // (*)

//   console.log(result);
// }

// let generator = gen();

// let question = generator.next().value; // <-- yield returns the value

// generator.next(4); // --> pass the result into the generator

// The first call generator.next() should be always made without an argument (the argument is ignored if passed). It starts the execution and returns the result of the first yield "2+2=?". At this point the generator pauses the execution, while staying on the line (*).
// Then, as shown at the picture above, the result of yield gets into the question variable in the calling code.
// On generator.next(4), the generator resumes, and 4 gets in as the result: let result = 4.
// Please note, the outer code does not have to immediately call next(4). It may take time. That’s not a problem: the generator will wait.

// For instance:

// // resume the generator after some time
// setTimeout(() => generator.next(4), 1000);
// As we can see, unlike regular functions, a generator and the calling code can exchange results by passing values in next/yield.

// To make things more obvious, here’s another example, with more calls:

// function* gen() {
//   let ask1 = yield "2 + 2 = ?";

//   console.log(ask1); // 4

//   let ask2 = yield "3 * 3 = ?"

//   console.log(ask2); // 9
// }

// let generator = gen();

// console.log( generator.next().value ); // "2 + 2 = ?"

// console.log( generator.next(4).value ); // "3 * 3 = ?"

// console.log( generator.next(9).done ); // true
// The execution picture:

// The first .next() starts the execution… It reaches the first yield.
// The result is returned to the outer code.
// The second .next(4) passes 4 back to the generator as the result of the first yield, and resumes the execution.
// …It reaches the second yield, that becomes the result of the generator call.
// The third next(9) passes 9 into the generator as the result of the second yield and resumes the execution that reaches the end of the function, so done: true.
// It’s like a “ping-pong” game. Each next(value) (excluding the first one) passes a value into the generator, that becomes the result of the current yield, and then gets back the result of the next yield.

// generator.throw
// As we observed in the examples above, the outer code may pass a value into the generator, as the result of yield.

// …But it can also initiate (throw) an error there. That’s natural, as an error is a kind of result.

// To pass an error into a yield, we should call generator.throw(err). In that case, the err is thrown in the line with that yield.

// For instance, here the yield of "2 + 2 = ?" leads to an error:

// function* gen() {
//   try {
//     let result = yield "2 + 2 = ?"; // (1)

//     console.log("The execution does not reach here, because the exception is thrown above");
//   } catch(e) {
//     console.log(e); // shows the error
//   }
// }

// let generator = gen();

// let question = generator.next().value;

// generator.throw(new Error("The answer is not found in my database")); // (2)
// The error, thrown into the generator at line (2) leads to an exception in line (1) with yield. In the example above, try..catch catches it and shows it.

// If we don’t catch it, then just like any exception, it “falls out” the generator into the calling code.

// The current line of the calling code is the line with generator.throw, labelled as (2). So we can catch it here, like this:

// function* generate() {
//   let result = yield "2 + 2 = ?"; // Error in this line
// }

// let generator = generate();

// let question = generator.next().value;

// try {
//   generator.throw(new Error("The answer is not found in my database"));
// } catch(e) {
//   console.log(e); // shows the error
// }
// If we don’t catch the error there, then, as usual, it falls through to the outer calling code (if any) and, if uncaught, kills the script.

// generator.return
// generator.return(value) finishes the generator execution and return the given value.

// function* gen() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// const g = gen();

// g.next();        // { value: 1, done: false }
// g.return('foo'); // { value: "foo", done: true }
// g.next();        // { value: undefined, done: true }
// If we again use generator.return() in a completed generator, it will return that value again (MDN).

// Often we don’t use it, as most of time we want to get all returning values, but it can be useful when we want to stop generator in a specific condition.

// Summary
// Generators are created by generator functions function* f(…) {…}.
// Inside generators (only) there exists a yield operator.
// The outer code and the generator may exchange results via next/yield calls.
// In modern JavaScript, generators are rarely used. But sometimes they come in handy, because the ability of a function to exchange data with the calling code during the execution is quite unique. And, surely, they are great for making iterable objects.

// Also, in the next chapter we’ll learn async generators, which are used to read streams of asynchronously generated data (e.g paginated fetches over a network) in for await ... of loops.

// In web-programming we often work with streamed data, so that’s another very important use case.

// ///////////////////////////////////////////////////////////////////

// // Async iteration and generators

// Async iteration and generators
// Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.

// Let’s see a simple example first, to grasp the syntax, and then review a real-life use case.

// Recall iterables
// Let’s recall the topic about iterables.

// The idea is that we have an object, such as range here:

// let range = {
//   from: 1,
//   to: 5
// };
// …And we’d like to use for..of loop on it, such as for(value of range), to get values from 1 to 5.

// In other words, we want to add an iteration ability to the object.

// That can be implemented using a special method with the name Symbol.iterator:

// This method is called in by the for..of construct when the loop is started, and it should return an object with the next method.
// For each iteration, the next() method is invoked for the next value.
// The next() should return a value in the form {done: true/false, value:<loop value>}, where done:true means the end of the loop.
// Here’s an implementation for the iterable range:

// let range = {
//   from: 1,
//   to: 5,

//   [Symbol.iterator]() { // called once, in the beginning of for..of
//     return {
//       current: this.from,
//       last: this.to,

//       next() { // called every iteration, to get the next value
//         if (this.current <= this.last) {
//           return { done: false, value: this.current++ };
//         } else {
//           return { done: true };
//         }
//       }
//     };
//   }
// };

// for(let value of range) {
//   console.log(value); // 1 then 2, then 3, then 4, then 5
// }
// If anything is unclear, please visit the chapter Iterables, it gives all the details about regular iterables.

// Async iterables
// Asynchronous iteration is needed when values come asynchronously: after setTimeout or another kind of delay.

// The most common case is that the object needs to make a network request to deliver the next value, we’ll see a real-life example of it a bit later.

// To make an object iterable asynchronously:

// Use Symbol.asyncIterator instead of Symbol.iterator.
// The next() method should return a promise (to be fulfilled with the next value).
// The async keyword handles it, we can simply make async next().
// To iterate over such an object, we should use a for await (let item of iterable) loop.
// Note the await word.
// As a starting example, let’s make an iterable range object, similar like the one before, but now it will return values asynchronously, one per second.

// All we need to do is to perform a few replacements in the code above:

// let range = {
//   from: 1,
//   to: 5,

//   [Symbol.asyncIterator]() { // (1)
//     return {
//       current: this.from,
//       last: this.to,

//       async next() { // (2)

//         // note: we can use "await" inside the async next:
//         await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

//         if (this.current <= this.last) {
//           return { done: false, value: this.current++ };
//         } else {
//           return { done: true };
//         }
//       }
//     };
//   }
// };

// (async () => {

//   for await (let value of range) { // (4)
//     console.log(value); // 1,2,3,4,5
//   }

// })()
// As we can see, the structure is similar to regular iterators:

// To make an object asynchronously iterable, it must have a method Symbol.asyncIterator (1).
// This method must return the object with next() method returning a promise (2).
// The next() method doesn’t have to be async, it may be a regular method returning a promise, but async allows us to use await, so that’s convenient. Here we just delay for a second (3).
// To iterate, we use for await(let value of range) (4), namely add “await” after “for”. It calls range[Symbol.asyncIterator]() once, and then its next() for values.
// Here’s a small table with the differences:

// Iterators	Async iterators
// Object method to provide iterator	Symbol.iterator	Symbol.asyncIterator
// next() return value is	any value	Promise
// to loop, use	for..of	for await..of
// The spread syntax ... doesn’t work asynchronously
// Features that require regular, synchronous iterators, don’t work with asynchronous ones.

// For instance, a spread syntax won’t work:

// console.log( [...range] ); // Error, no Symbol.iterator
// That’s natural, as it expects to find Symbol.iterator, not Symbol.asyncIterator.

// It’s also the case for for..of: the syntax without await needs Symbol.iterator.

// Recall generators
// Now let’s recall generators, as they allow to make iteration code much shorter. Most of the time, when we’d like to make an iterable, we’ll use generators.

// For sheer simplicity, omitting some important stuff, they are “functions that generate (yield) values”. They are explained in detail in the chapter Generators.

// Generators are labelled with function* (note the star) and use yield to generate a value, then we can use for..of to loop over them.

// This example generates a sequence of values from start to end:

// function* generateSequence(start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i;
//   }
// }

// for(let value of generateSequence(1, 5)) {
//   console.log(value); // 1, then 2, then 3, then 4, then 5
// }
// As we already know, to make an object iterable, we should add Symbol.iterator to it.

// let range = {
//   from: 1,
//   to: 5,
//   [Symbol.iterator]() {
//     return <object with next to make range iterable>
//   }
// }
// A common practice for Symbol.iterator is to return a generator, it makes the code shorter, as you can see:

// let range = {
//   from: 1,
//   to: 5,

//   *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
//     for(let value = this.from; value <= this.to; value++) {
//       yield value;
//     }
//   }
// };

// for(let value of range) {
//   console.log(value); // 1, then 2, then 3, then 4, then 5
// }
// Please see the chapter Generators if you’d like more details.

// In regular generators we can’t use await. All values must come synchronously, as required by the for..of construct.

// What if we’d like to generate values asynchronously? From network requests, for instance.

// Let’s switch to asynchronous generators to make it possible.

// Async generators (finally)
// For most practical applications, when we’d like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

// The syntax is simple: prepend function* with async. That makes the generator asynchronous.

// And then use for await (...) to iterate over it, like this:

// async function* generateSequence(start, end) {

//   for (let i = start; i <= end; i++) {

//     // Wow, can use await!
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     yield i;
//   }

// }

// (async () => {

//   let generator = generateSequence(1, 5);
//   for await (let value of generator) {
//     console.log(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
//   }

// })();
// As the generator is asynchronous, we can use await inside it, rely on promises, perform network requests and so on.

// Under-the-hood difference
// Technically, if you’re an advanced reader who remembers the details about generators, there’s an internal difference.

// For async generators, the generator.next() method is asynchronous, it returns promises.

// In a regular generator we’d use result = generator.next() to get values. In an async generator, we should add await, like this:

// result = await generator.next(); // result = {value: ..., done: true/false}
// That’s why async generators work with for await...of.

// Async iterable range
// Regular generators can be used as Symbol.iterator to make the iteration code shorter.

// Similar to that, async generators can be used as Symbol.asyncIterator to implement the asynchronous iteration.

// For instance, we can make the range object generate values asynchronously, once per second, by replacing synchronous Symbol.iterator with asynchronous Symbol.asyncIterator:

// let range = {
//   from: 1,
//   to: 5,

//   // this line is same as [Symbol.asyncIterator]: async function*() {
//   async *[Symbol.asyncIterator]() {
//     for(let value = this.from; value <= this.to; value++) {

//       // make a pause between values, wait for something
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       yield value;
//     }
//   }
// };

// (async () => {

//   for await (let value of range) {
//     console.log(value); // 1, then 2, then 3, then 4, then 5
//   }

// })();
// Now values come with a delay of 1 second between them.

// Please note:
// Technically, we can add both Symbol.iterator and Symbol.asyncIterator to the object, so it’s both synchronously (for..of) and asynchronously (for await..of) iterable.

// In practice though, that would be a weird thing to do.

// Real-life example: paginated data
// So far we’ve seen basic examples, to gain understanding. Now let’s review a real-life use case.

// There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) – “one page”, and provides a URL to the next page.

// This pattern is very common. It’s not about users, but just about anything.

// For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

// We should make a request to fetch in the form https://api.github.com/repos/<repo>/commits.
// It responds with a JSON of 30 commits, and also provides a link to the next page in the Link header.
// Then we can use that link for the next request, to get more commits, and so on.
// For our code, we’d like to have a simpler way to get commits.

// Let’s make a function fetchCommits(repo) that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it’ll be a simple async iteration for await..of.

// So the usage will be like this:

// for await (let commit of fetchCommits("username/repository")) {
//   // process commit
// }
// Here’s such function, implemented as async generator:

// async function* fetchCommits(repo) {
//   let url = `https://api.github.com/repos/${repo}/commits`;

//   while (url) {
//     const response = await fetch(url, { // (1)
//       headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
//     });

//     const body = await response.json(); // (2) response is JSON (array of commits)

//     // (3) the URL of the next page is in the headers, extract it
//     let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
//     nextPage = nextPage?.[1];

//     url = nextPage;

//     for(let commit of body) { // (4) yield commits one by one, until the page ends
//       yield commit;
//     }
//   }
// }
// More explanations about how it works:

// We use the browser fetch method to download the commits.

// The initial URL is https://api.github.com/repos/<repo>/commits, and the next page will be in the Link header of the response.
// The fetch method allows us to supply authorization and other headers if needed – here GitHub requires User-Agent.
// The commits are returned in JSON format.

// We should get the next page URL from the Link header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in Regular expressions).

// The next page URL may look like https://api.github.com/repositories/93253246/commits?page=2. It’s generated by GitHub itself.
// Then we yield the received commits one by one, and when they finish, the next while(url) iteration will trigger, making one more request.

// An example of use (shows commit authors in console):

// (async () => {

//   let count = 0;

//   for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

//     console.log(commit.author.login);

//     if (++count == 100) { // let's stop at 100 commits
//       break;
//     }
//   }

// })();

// // Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above
// That’s just what we wanted.

// The internal mechanics of paginated requests is invisible from the outside. For us it’s just an async generator that returns commits.

// Summary
// Regular iterators and generators work fine with the data that doesn’t take time to generate.

// When we expect the data to come asynchronously, with delays, their async counterparts can be used, and for await..of instead of for..of.

// Syntax differences between async and regular iterators:

// Iterable	Async Iterable
// Method to provide iterator	Symbol.iterator	Symbol.asyncIterator
// next() return value is	{value:…, done: true/false}	Promise that resolves to {value:…, done: true/false}
// Syntax differences between async and regular generators:

// Generators	Async generators
// Declaration	function*	async function*
// next() return value is	{value:…, done: true/false}	Promise that resolves to {value:…, done: true/false}
// In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

// We can use async generators to process such data. It’s also noteworthy that in some environments, like in browsers, there’s also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately

// ///////////////////////////////////////////////////////////////////
