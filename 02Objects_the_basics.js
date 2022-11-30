// Objects
// As we know from the chapter Data types, there are eight data types in JavaScript. Seven of them are called “primitive”, because their values contain only a single thing (be it a string or a number or whatever).

// In contrast, objects are used to store keyed collections of various data and more complex entities. In JavaScript, objects penetrate almost every aspect of the language. So we must understand them first before going in-depth anywhere else.

// An object can be created with figure brackets {…} with an optional list of properties. A property is a “key: value” pair, where key is a string (also called a “property name”), and value can be anything.

// We can imagine an object as a cabinet with signed files. Every piece of data is stored in its file by the key. It’s easy to find a file by its name or add/remove a file.

// An empty object (“empty cabinet”) can be created using one of two syntaxes:

// let user = new Object(); // "object constructor" syntax
// let user = {};  // "object literal" syntax

// Usually, the figure brackets {...} are used. That declaration is called an object literal.

// Literals and properties
// We can immediately put some properties into {...} as “key: value” pairs:

// let user = {     // an object
//   name: "John",  // by key "name" store value "John"
//   age: 30        // by key "age" store value 30
// };
// A property has a key (also known as “name” or “identifier”) before the colon ":" and a value to the right of it.

// In the user object, there are two properties:

// The first property has the name "name" and the value "John".
// The second one has the name "age" and the value 30.
// The resulting user object can be imagined as a cabinet with two signed files labeled “name” and “age”.

// We can add, remove and read files from it at any time.

// Property values are accessible using the dot notation:

// // get property values of the object:
// console.log( user.name ); // John
// console.log( user.age ); // 30
// The value can be of any type. Let’s add a boolean one:

// user.isAdmin = true;

// To remove a property, we can use the delete operator:

// delete user.age;

// We can also use multiword property names, but then they must be quoted:

// let user = {
//   name: "John",
//   age: 30,
//   "likes birds": true  // multiword property name must be quoted
// };

// The last property in the list may end with a comma:

// let user = {
//   name: "John",
//   age: 30,
// }
// That is called a “trailing” or “hanging” comma. Makes it easier to add/remove/move around properties, because all lines become alike.

// Square brackets
// For multiword properties, the dot access doesn’t work:

// // this would give a syntax error
// user.likes birds = true
// JavaScript doesn’t understand that. It thinks that we address user.likes, and then gives a syntax error when comes across unexpected birds.

// The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn’t start with a digit and doesn’t include special characters ($ and _ are allowed).

// There’s an alternative “square bracket notation” that works with any string:

// let user = {};

// // set
// user["likes birds"] = true;

// // get
// console.log(user["likes birds"]); // true

// // delete
// delete user["likes birds"];
// Now everything is fine. Please note that the string inside the brackets is properly quoted (any type of quotes will do).

// Square brackets also provide a way to obtain the property name as the result of any expression – as opposed to a literal string – like from a variable as follows:

// let key = "likes birds";

// // same as user["likes birds"] = true;
// user[key] = true;
// Here, the variable key may be calculated at run-time or depend on the user input. And then we use it to access the property. That gives us a great deal of flexibility.

// For instance:

// let user = {
//   name: "John",
//   age: 30
// };

// let key = prompt("What do you want to know about the user?", "name");

// // access by variable
// console.log( user[key] ); // John (if enter "name")
// The dot notation cannot be used in a similar way:

// let user = {
//   name: "John",
//   age: 30
// };

// let key = "name";
// console.log( user.key ) // undefined
// Computed properties
// We can use square brackets in an object literal, when creating an object. That’s called computed properties.

// For instance:

// let fruit = prompt("Which fruit to buy?", "apple");

// let bag = {
//   [fruit]: 5, // the name of the property is taken from the variable fruit
// };

// console.log( bag.apple ); // 5 if fruit="apple"
// The meaning of a computed property is simple: [fruit] means that the property name should be taken from fruit.

// So, if a visitor enters "apple", bag will become {apple: 5}.

// Essentially, that works the same as:

// let fruit = prompt("Which fruit to buy?", "apple");
// let bag = {};

// // take property name from the fruit variable
// bag[fruit] = 5;
// …But looks nicer.

// We can use more complex expressions inside square brackets:

// let fruit = 'apple';
// let bag = {
//   [fruit + 'Computers']: 5 // bag.appleComputers = 5
// };
// Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.

// So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

// Property value shorthand
// In real code, we often use existing variables as values for property names.

// For instance:

// function makeUser(name, age) {
//   return {
//     name: name,
//     age: age,
//     // ...other properties
//   };
// }

// let user = makeUser("John", 30);
// console.log(user.name); // John
// In the example above, properties have the same names as variables. The use-case of making a property from a variable is so common, that there’s a special property value shorthand to make it shorter.

// Instead of name:name we can just write name, like this:

// function makeUser(name, age) {
//   return {
//     name, // same as name: name
//     age,  // same as age: age
//     // ...
//   };
// }
// We can use both normal properties and shorthands in the same object:

// let user = {
//   name,  // same as name:name
//   age: 30
// };
// Property names limitations
// As we already know, a variable cannot have a name equal to one of the language-reserved words like “for”, “let”, “return” etc.

// But for an object property, there’s no such restriction:

// // these properties are all right
// let obj = {
//   for: 1,
//   let: 2,
//   return: 3
// };

// console.log( obj.for + obj.let + obj.return );  // 6
// In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

// Other types are automatically converted to strings.

// For instance, a number 0 becomes a string "0" when used as a property key:

// let obj = {
//   0: "test" // same as "0": "test"
// };

// // both console.logs access the same property (the number 0 is converted to string "0")
// console.log( obj["0"] ); // test
// console.log( obj[0] ); // test (same property)
// There’s a minor gotcha with a special property named __proto__. We can’t set it to a non-object value:

// let obj = {};
// obj.__proto__ = 5; // assign a number
// console.log(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
// As we see from the code, the assignment to a primitive 5 is ignored.

// We’ll cover the special nature of __proto__ in subsequent chapters, and suggest the ways to fix such behavior.

// Property existence test, “in” operator
// A notable feature of objects in JavaScript, compared to many other languages, is that it’s possible to access any property. There will be no error if the property doesn’t exist!

// Reading a non-existing property just returns undefined. So we can easily test whether the property exists:

// let user = {};

// console.log( user.noSuchProperty === undefined ); // true means "no such property"
// There’s also a special operator "in" for that.

// The syntax is:

// "key" in object
// For instance:

// let user = { name: "John", age: 30 };

// console.log( "age" in user ); // true, user.age exists
// console.log( "blabla" in user ); // false, user.blabla doesn't exist
// Please note that on the left side of in there must be a property name. That’s usually a quoted string.

// If we omit quotes, that means a variable should contain the actual name to be tested. For instance:

// let user = { age: 30 };

// let key = "age";
// console.log( key in user ); // true, property "age" exists
// Why does the in operator exist? Isn’t it enough to compare against undefined?

// Well, most of the time the comparison with undefined works fine. But there’s a special case when it fails, but "in" works correctly.

// It’s when an object property exists, but stores undefined:

// let obj = {
//   test: undefined
// };

// console.log( obj.test ); // it's undefined, so - no such property?

// console.log( "test" in obj ); // true, the property does exist!
// In the code above, the property obj.test technically exists. So the in operator works right.

// Situations like this happen very rarely, because undefined should not be explicitly assigned. We mostly use null for “unknown” or “empty” values. So the in operator is an exotic guest in the code.

// The "for..in" loop
// To walk over all keys of an object, there exists a special form of the loop: for..in. This is a completely different thing from the for(;;) construct that we studied before.

// The syntax:

// for (key in object) {
//   // executes the body for each key among object properties
// }
// For instance, let’s output all properties of user:

// let user = {
//   name: "John",
//   age: 30,
//   isAdmin: true
// };

// for (let key in user) {
//   // keys
//   console.log( key );  // name, age, isAdmin
//   // values for the keys
//   console.log( user[key] ); // John, 30, true
// }
// Note that all “for” constructs allow us to declare the looping variable inside the loop, like let key here.

// Also, we could use another variable name here instead of key. For instance, "for (let prop in obj)" is also widely used.

// Ordered like an object
// Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?

// The short answer is: “ordered in a special fashion”: integer properties are sorted, others appear in creation order. The details follow.

// As an example, let’s consider an object with the phone codes:

// let codes = {
//   "49": "Germany",
//   "41": "Switzerland",
//   "44": "Great Britain",
//   // ..,
//   "1": "USA"
// };

// for (let code in codes) {
//   console.log(code); // 1, 41, 44, 49
// }
// The object may be used to suggest a list of options to the user. If we’re making a site mainly for a German audience then we probably want 49 to be the first.

// But if we run the code, we see a totally different picture:

// USA (1) goes first
// then Switzerland (41) and so on.
// The phone codes go in the ascending sorted order, because they are integers. So we see 1, 41, 44, 49.

// Integer properties? What’s that?
// The “integer property” term here means a string that can be converted to-and-from an integer without a change.

// So, "49" is an integer property name, because when it’s transformed to an integer number and back, it’s still the same. But "+49" and "1.2" are not:

// // Number(...) explicitly converts to a number
// // Math.trunc is a built-in function that removes the decimal part
// console.log( String(Math.trunc(Number("49"))) ); // "49", same, integer property
// console.log( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
// console.log( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
// …On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:

// let user = {
//   name: "John",
//   surname: "Smith"
// };
// user.age = 25; // add one more

// // non-integer properties are listed in the creation order
// for (let prop in user) {
//   console.log( prop ); // name, surname, age
// }
// So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer. Adding a plus "+" sign before each code is enough.

// Like this:

// let codes = {
//   "+49": "Germany",
//   "+41": "Switzerland",
//   "+44": "Great Britain",
//   // ..,
//   "+1": "USA"
// };

// for (let code in codes) {
//   console.log( +code ); // 49, 41, 44, 1
// }
// Now it works as intended.

// Summary
// Objects are associative arrays with several special features.

// They store properties (key-value pairs), where:

// Property keys must be strings or symbols (usually strings).
// Values can be of any type.
// To access a property, we can use:

// The dot notation: obj.property.
// Square brackets notation obj["property"]. Square brackets allow taking the key from a variable, like obj[varWithKey].
// Additional operators:

// To delete a property: delete obj.prop.
// To check if a property with the given key exists: "key" in obj.
// To iterate over an object: for (let key in obj) loop.
// What we’ve studied in this chapter is called a “plain object”, or just Object.

// There are many other kinds of objects in JavaScript:

// Array to store ordered data collections,
// Date to store the information about the date and time,
// Error to store the information about an error.
// …And so on.
// They have their special features that we’ll study later. Sometimes people say something like “Array type” or “Date type”, but formally they are not types of their own, but belong to a single “object” data type. And they extend it in various ways.

// Objects in JavaScript are very powerful. Here we’ve just scratched the surface of a topic that is really huge. We’ll be closely working with objects and learning more about them in further parts of the tutorial.

// ///////////////////////////////////////

// Object references and copying
// One of the fundamental differences of objects versus primitives is that objects are stored and copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are always copied “as a whole value”.

// That’s easy to understand if we look a bit under the hood of what happens when we copy a value.

// Let’s start with a primitive, such as a string.

// Here we put a copy of message into phrase:

// let message = "Hello!";
// let phrase = message;
// As a result we have two independent variables, each one storing the string "Hello!".

// Quite an obvious result, right?

// Objects are not like that.

// A variable assigned to an object stores not the object itself, but its “address in memory” – in other words “a reference” to it.

// Let’s look at an example of such a variable:

// let user = {
//   name: "John"
// };
// And here’s how it’s actually stored in memory:

// The object is stored somewhere in memory (at the right of the picture), while the user variable (at the left) has a “reference” to it.

// We may think of an object variable, such as user, like a sheet of paper with the address of the object on it.

// When we perform actions with the object, e.g. take a property user.name, the JavaScript engine looks at what’s at that address and performs the operation on the actual object.

// Now here’s why it’s important.

// When an object variable is copied, the reference is copied, but the object itself is not duplicated.

// For instance:

// let user = { name: "John" };

// let admin = user; // copy the reference
// Now we have two variables, each storing a reference to the same object:

// As you can see, there’s still one object, but now with two variables that reference it.

// We can use either variable to access the object and modify its contents:

// let user = { name: 'John' };

// let admin = user;

// admin.name = 'Pete'; // changed by the "admin" reference

// console.log(user.name); // 'Pete', changes are seen from the "user" reference
// It’s as if we had a cabinet with two keys and used one of them (admin) to get into it and make changes. Then, if we later use another key (user), we are still opening the same cabinet and can access the changed contents.

// Comparison by reference
// Two objects are equal only if they are the same object.

// For instance, here a and b reference the same object, thus they are equal:

// let a = {};
// let b = a; // copy the reference

// console.log( a == b ); // true, both variables reference the same object
// console.log( a === b ); // true
// And here two independent objects are not equal, even though they look alike (both are empty):

// let a = {};
// let b = {}; // two independent objects

// console.log( a == b ); // false
// For comparisons like obj1 > obj2 or for a comparison against a primitive obj == 5, objects are converted to primitives. We’ll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely – usually they appear as a result of a programming mistake.

// Const objects can be modified
// An important side effect of storing objects as references is that an object declared as const can be modified.

// For instance:

// const user = {
//   name: "John"
// };

// user.name = "Pete"; // (*)

// console.log(user.name); // Pete
// It might seem that the line (*) would cause an error, but it does not. The value of user is constant, it must always reference the same object, but properties of that object are free to change.

// In other words, the const user gives an error only if we try to set user=... as a whole.

// That said, if we really need to make constant object properties, it’s also possible, but using totally different methods. We’ll mention that in the chapter Property flags and descriptors.

// Cloning and merging, Object.assign
// So, copying an object variable creates one more reference to the same object.

// But what if we need to duplicate an object?

// We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.

// Like this:

// let user = {
//   name: "John",
//   age: 30
// };

// let clone = {}; // the new empty object

// // let's copy all user properties into it
// for (let key in user) {
//   clone[key] = user[key];
// }

// // now clone is a fully independent object with the same content
// clone.name = "Pete"; // changed the data in it

// console.log( user.name ); // still John in the original object
// We can also use the method Object.assign.

// The syntax is:

// Object.assign(dest, src1[, src2, src3...])
// The first argument dest is a target object.
// Further arguments src1, ..., srcN (can be as many as needed) are source objects.
// It copies the properties of all source objects src1, ..., srcN into the target dest. In other words, properties of all arguments starting from the second are copied into the first object.
// The call returns dest.
// For instance, we can use it to merge several objects into one:

// let user = { name: "John" };

// let permissions1 = { canView: true };
// let permissions2 = { canEdit: true };

// // copies all properties from permissions1 and permissions2 into user
// Object.assign(user, permissions1, permissions2);

// // now user = { name: "John", canView: true, canEdit: true }
// If the copied property name already exists, it gets overwritten:

// let user = { name: "John" };

// Object.assign(user, { name: "Pete" });

// console.log(user.name); // now user = { name: "Pete" }
// We also can use Object.assign to replace for..in loop for simple cloning:

// let user = {
//   name: "John",
//   age: 30
// };

// let clone = Object.assign({}, user);
// It copies all properties of user into the empty object and returns it.

// There are also other methods of cloning an object, e.g. using the spread syntax clone = {...user}, covered later in the tutorial.

// Nested cloning
// Until now we assumed that all properties of user are primitive. But properties can be references to other objects.

// Like this:

// let user = {
//   name: "John",
//   sizes: {
//     height: 182,
//     width: 50
//   }
// };

// console.log( user.sizes.height ); // 182
// Now it’s not enough to copy clone.sizes = user.sizes, because user.sizes is an object, and will be copied by reference, so clone and user will share the same sizes:

// let user = {
//   name: "John",
//   sizes: {
//     height: 182,
//     width: 50
//   }
// };

// let clone = Object.assign({}, user);

// console.log( user.sizes === clone.sizes ); // true, same object

// // user and clone share sizes
// user.sizes.width = 60;    // change a property from one place
// console.log(clone.sizes.width); // 60, get the result from the other one
// To fix that and make user and clone truly separate objects, we should use a cloning loop that examines each value of user[key] and, if it’s an object, then replicate its structure as well. That is called a “deep cloning” or “structured cloning”. There’s structuredClone method that implements deep cloning.

// structuredClone
// The call structuredClone(object) clones the object with all nested properties.

// Here’s how we can use it in our example:

// let user = {
//   name: "John",
//   sizes: {
//     height: 182,
//     width: 50
//   }
// };

// let clone = structuredClone(user);

// console.log( user.sizes === clone.sizes ); // false, different objects

// // user and clone are totally unrelated now
// user.sizes.width = 60;    // change a property from one place
// console.log(clone.sizes.width); // 50, not related
// The structuredClone method can clone most data types, such as objects, arrays, primitive values.

// It also supports circular references, when an object property references the object itself (directly or via a chain or references).

// For instance:

// let user = {};
// // let's create a circular reference:
// // user.me references the user itself
// user.me = user;

// let clone = structuredClone(user);
// console.log(clone.me === clone); // true
// As you can see, clone.me references the clone, not the user! So the circular reference was cloned correctly as well.

// Although, there are cases when structuredClone fails.

// For instance, when an object has a function property:

// // error
// structuredClone({
//   f: function() {}
// });
// Function properties aren’t supported.

// To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance _.cloneDeep(obj) from the JavaScript library lodash.

// Summary
// Objects are assigned and copied by reference. In other words, a variable stores not the “object value”, but a “reference” (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

// All operations via copied references (like adding/removing properties) are performed on the same single object.

// To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy” (nested objects are copied by reference) or a “deep cloning” function structuredClone or use a custom cloning implementation, such as _.cloneDeep(obj).

// /////////////////////////////////////

// Garbage collection
// Memory management in JavaScript is performed automatically and invisibly to us. We create primitives, objects, functions… All that takes memory.

// What happens when something is not needed any more? How does the JavaScript engine discover it and clean it up?

// Reachability
// The main concept of memory management in JavaScript is reachability.

// Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

// There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.

// For instance:

// The currently executing function, its local variables and parameters.
// Other functions on the current chain of nested calls, their local variables and parameters.
// Global variables.
// (there are some other, internal ones as well)
// These values are called roots.

// Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

// For instance, if there’s an object in a global variable, and that object has a property referencing another object, that object is considered reachable. And those that it references are also reachable. Detailed examples to follow.

// There’s a background process in the JavaScript engine that is called garbage collector. It monitors all objects and removes those that have become unreachable.

// A simple example
// Here’s the simplest example:

// // user has a reference to the object
// let user = {
//   name: "John"
// };

// Here the arrow depicts an object reference. The global variable "user" references the object {name: "John"} (we’ll call it John for brevity). The "name" property of John stores a primitive, so it’s painted inside the object.

// If the value of user is overwritten, the reference is lost:

// user = null;

// Now John becomes unreachable. There’s no way to access it, no references to it. Garbage collector will junk the data and free the memory.

// Two references
// Now let’s imagine we copied the reference from user to admin:

// // user has a reference to the object
// let user = {
//   name: "John"
// };

// let admin = user;

// Now if we do the same:

// user = null;
// …Then the object is still reachable via admin global variable, so it must stay in memory. If we overwrite admin too, then it can be removed.

// Interlinked objects
// Now a more complex example. The family:

// function marry(man, woman) {
//   woman.husband = man;
//   man.wife = woman;

//   return {
//     father: man,
//     mother: woman
//   }
// }

// let family = marry({
//   name: "John"
// }, {
//   name: "Ann"
// });
// Function marry “marries” two objects by giving them references to each other and returns a new object that contains them both.

// The resulting memory structure:

// As of now, all objects are reachable.

// Now let’s remove two references:

// delete family.father;
// delete family.mother.husband;

// It’s not enough to delete only one of these two references, because all objects would still be reachable.

// But if we delete both, then we can see that John has no incoming reference any more:

// Outgoing references do not matter. Only incoming ones can make an object reachable. So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible.

// After garbage collection:

// Unreachable island
// It is possible that the whole island of interlinked objects becomes unreachable and is removed from the memory.

// The source object is the same as above. Then:

// family = null;
// The in-memory picture becomes:

// This example demonstrates how important the concept of reachability is.

// It’s obvious that John and Ann are still linked, both have incoming references. But that’s not enough.

// The former "family" object has been unlinked from the root, there’s no reference to it any more, so the whole island becomes unreachable and will be removed.

// Internal algorithms
// The basic garbage collection algorithm is called “mark-and-sweep”.

// The following “garbage collection” steps are regularly performed:

// The garbage collector takes roots and “marks” (remembers) them.
// Then it visits and “marks” all references from them.
// Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future.
// …And so on until every reachable (from the roots) references are visited.
// All objects except marked ones are removed.
// For instance, let our object structure look like this:

// We can clearly see an “unreachable island” to the right side. Now let’s see how “mark-and-sweep” garbage collector deals with it.

// The first step marks the roots:

// Then we follow their references and mark referenced objects:

// …And continue to follow further references, while possible:

// Now the objects that could not be visited in the process are considered unreachable and will be removed:

// We can also imagine the process as spilling a huge bucket of paint from the roots, that flows through all references and marks all reachable objects. The unmarked ones are then removed.

// That’s the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not introduce any delays into the code execution.

// Some of the optimizations:

// Generational collection – objects are split into two sets: “new ones” and “old ones”. In typical code, many objects have a short life span: they appear, do their job and die fast, so it makes sense to track new objects and clear the memory from them if that’s the case. Those that survive for long enough, become “old” and are examined less often.
// Incremental collection – if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine splits the whole set of existing objects into multiple parts. And then clear these parts one after another. There are many small garbage collections instead of a total one. That requires some extra bookkeeping between them to track changes, but we get many tiny delays instead of a big one.
// Idle-time collection – the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
// There exist other optimizations and flavours of garbage collection algorithms. As much as I’d like to describe them here, I have to hold off, because different engines implement different tweaks and techniques. And, what’s even more important, things change as engines develop, so studying deeper “in advance”, without a real need is probably not worth that. Unless, of course, it is a matter of pure interest, then there will be some links for you below.

// Summary
// The main things to know:

// Garbage collection is performed automatically. We cannot force or prevent it.
// Objects are retained in memory while they are reachable.
// Being referenced is not the same as being reachable (from a root): a pack of interlinked objects can become unreachable as a whole, as we’ve seen in the example above.
// Modern engines implement advanced algorithms of garbage collection.

// A general book “The Garbage Collection Handbook: The Art of Automatic Memory Management” (R. Jones et al) covers some of them.

// If you are familiar with low-level programming, more detailed information about V8’s garbage collector is in the article A tour of V8: Garbage Collection.

// The V8 blog also publishes articles about changes in memory management from time to time. Naturally, to learn more about garbage collection, you’d better prepare by learning about V8 internals in general and read the blog of Vyacheslav Egorov who worked as one of the V8 engineers. I’m saying: “V8”, because it is best covered by articles on the internet. For other engines, many approaches are similar, but garbage collection differs in many aspects.

// In-depth knowledge of engines is good when you need low-level optimizations. It would be wise to plan that as the next step after you’re familiar with the language.

// /////////////////////////////////////////////////

// Object methods, "this"
// Objects are usually created to represent entities of the real world, like users, orders and so on:

// let user = {
//   name: "John",
//   age: 30
// };
// And, in the real world, a user can act: select something from the shopping cart, login, logout etc.

// Actions are represented in JavaScript by functions in properties.

// Method examples
// For a start, let’s teach the user to say hello:

// let user = {
//   name: "John",
//   age: 30
// };

// user.sayHi = function() {
//   console.log("Hello!");
// };

// user.sayHi(); // Hello!
// Here we’ve just used a Function Expression to create a function and assign it to the property user.sayHi of the object.

// Then we can call it as user.sayHi(). The user can now speak!

// A function that is a property of an object is called its method.

// So, here we’ve got a method sayHi of the object user.

// Of course, we could use a pre-declared function as a method, like this:

// let user = {
//   // ...
// };

// // first, declare
// function sayHi() {
//   console.log("Hello!");
// }

// // then add as a method
// user.sayHi = sayHi;

// user.sayHi(); // Hello!
// Object-oriented programming
// When we write our code using objects to represent entities, that’s called object-oriented programming, in short: “OOP”.

// OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That’s architecture, and there are great books on that topic, like “Design Patterns: Elements of Reusable Object-Oriented Software” by E. Gamma, R. Helm, R. Johnson, J. Vissides or “Object-Oriented Analysis and Design with Applications” by G. Booch, and more.

// Method shorthand
// There exists a shorter syntax for methods in an object literal:

// // these objects do the same

// user = {
//   sayHi: function() {
//     console.log("Hello");
//   }
// };

// // method shorthand looks better, right?
// user = {
//   sayHi() { // same as "sayHi: function(){...}"
//     console.log("Hello");
//   }
// };
// As demonstrated, we can omit "function" and just write sayHi().

// To tell the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases, the shorter syntax is preferred.

// “this” in methods
// It’s common that an object method needs to access the information stored in the object to do its job.

// For instance, the code inside user.sayHi() may need the name of the user.

// To access the object, a method can use the this keyword.

// The value of this is the object “before dot”, the one used to call the method.

// For instance:

// let user = {
//   name: "John",
//   age: 30,

//   sayHi() {
//     // "this" is the "current object"
//     console.log(this.name);
//   }

// };

// user.sayHi(); // John
// Here during the execution of user.sayHi(), the value of this will be user.

// Technically, it’s also possible to access the object without this, by referencing it via the outer variable:

// let user = {
//   name: "John",
//   age: 30,

//   sayHi() {
//     console.log(user.name); // "user" instead of "this"
//   }

// };
// …But such code is unreliable. If we decide to copy user to another variable, e.g. admin = user and overwrite user with something else, then it will access the wrong object.

// That’s demonstrated below:

// let user = {
//   name: "John",
//   age: 30,

//   sayHi() {
//     console.log( user.name ); // leads to an error
//   }

// };

// let admin = user;
// user = null; // overwrite to make things obvious

// admin.sayHi(); // TypeError: Cannot read property 'name' of null
// If we used this.name instead of user.name inside the console.log, then the code would work.

// “this” is not bound
// In JavaScript, keyword this behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

// There’s no syntax error in the following example:

// function sayHi() {
//   console.log( this.name );
// }
// The value of this is evaluated during the run-time, depending on the context.

// For instance, here the same function is assigned to two different objects and has different “this” in the calls:

// let user = { name: "John" };
// let admin = { name: "Admin" };

// function sayHi() {
//   console.log( this.name );
// }

// // use the same function in two objects
// user.f = sayHi;
// admin.f = sayHi;

// // these calls have different this
// // "this" inside the function is the object "before the dot"
// user.f(); // John  (this == user)
// admin.f(); // Admin  (this == admin)

// admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
// The rule is simple: if obj.f() is called, then this is obj during the call of f. So it’s either user or admin in the example above.

// Calling without an object: this == undefined
// We can even call the function without an object at all:

// function sayHi() {
//   console.log(this);
// }

// sayHi(); // undefined
// In this case this is undefined in strict mode. If we try to access this.name, there will be an error.

// In non-strict mode the value of this in such case will be the global object (window in a browser, we’ll get to it later in the chapter Global object). This is a historical behavior that "use strict" fixes.

// Usually such call is a programming error. If there’s this inside a function, it expects to be called in an object context.

// The consequences of unbound this
// If you come from another programming language, then you are probably used to the idea of a "bound this", where methods defined in an object always have this referencing that object.

// In JavaScript this is “free”, its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is “before the dot”.

// The concept of run-time evaluated this has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

// Here our position is not to judge whether this language design decision is good or bad. We’ll understand how to work with it, how to get benefits and avoid problems.

// Arrow functions have no “this”
// Arrow functions are special: they don’t have their “own” this. If we reference this from such a function, it’s taken from the outer “normal” function.

// For instance, here arrow() uses this from the outer user.sayHi() method:

// let user = {
//   firstName: "Ilya",
//   sayHi() {
//     let arrow = () => console.log(this.firstName);
//     arrow();
//   }
// };

// user.sayHi(); // Ilya
// That’s a special feature of arrow functions, it’s useful when we actually do not want to have a separate this, but rather to take it from the outer context. Later in the chapter Arrow functions revisited we’ll go more deeply into arrow functions.

// Summary
// Functions that are stored in object properties are called “methods”.
// Methods allow objects to “act” like object.doSomething().
// Methods can reference the object as this.
// The value of this is defined at run-time.

// When a function is declared, it may use this, but that this has no value until the function is called.
// A function can be copied between objects.
// When a function is called in the “method” syntax: object.method(), the value of this during the call is object.
// Please note that arrow functions are special: they have no this. When this is accessed inside an arrow function, it is taken from outside.

// //////////////////////////////////

// Constructor, operator "new"
// The regular {...} syntax allows us to create one object. But often we need to create many similar objects, like multiple users or menu items and so on.

// That can be done using constructor functions and the "new" operator.

// Constructor function
// Constructor functions technically are regular functions. There are two conventions though:

// They are named with capital letter first.
// They should be executed only with "new" operator.
// For instance:

// function User(name) {
//   this.name = name;
//   this.isAdmin = false;
// }

// let user = new User("Jack");

// console.log(user.name); // Jack
// console.log(user.isAdmin); // false
// When a function is executed with new, it does the following steps:

// A new empty object is created and assigned to this.
// The function body executes. Usually it modifies this, adds new properties to it.
// The value of this is returned.
// In other words, new User(...) does something like:

// function User(name) {
//   // this = {};  (implicitly)

//   // add properties to this
//   this.name = name;
//   this.isAdmin = false;

//   // return this;  (implicitly)
// }
// So let user = new User("Jack") gives the same result as:

// let user = {
//   name: "Jack",
//   isAdmin: false
// };
// Now if we want to create other users, we can call new User("Ann"), new User("Alice") and so on. Much shorter than using literals every time, and also easy to read.

// That’s the main purpose of constructors – to implement reusable object creation code.

// Let’s note once again – technically, any function (except arrow functions, as they don’t have this) can be used as a constructor. It can be run with new, and it will execute the algorithm above. The “capital letter first” is a common agreement, to make it clear that a function is to be run with new.

// new function() { … }
// If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:

// // create a function and immediately call it with new
// let user = new function() {
//   this.name = "John";
//   this.isAdmin = false;

//   // ...other code for user creation
//   // maybe complex logic and statements
//   // local variables etc
// };
// This constructor can’t be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.

// Constructor mode test: new.target
// Advanced stuff
// The syntax from this section is rarely used, skip it unless you want to know everything.

// Inside a function, we can check whether it was called with new or without it, using a special new.target property.

// It is undefined for regular calls and equals the function if called with new:

// function User() {
//   console.log(new.target);
// }

// // without "new":
// User(); // undefined

// // with "new":
// new User(); // function User { ... }
// That can be used inside the function to know whether it was called with new, “in constructor mode”, or without it, “in regular mode”.

// We can also make both new and regular calls to do the same, like this:

// function User(name) {
//   if (!new.target) { // if you run me without new
//     return new User(name); // ...I will add new for you
//   }

//   this.name = name;
// }

// let john = User("John"); // redirects call to new User
// console.log(john.name); // John
// This approach is sometimes used in libraries to make the syntax more flexible. So that people may call the function with or without new, and it still works.

// Probably not a good thing to use everywhere though, because omitting new makes it a bit less obvious what’s going on. With new we all know that the new object is being created.

// Return from constructors
// Usually, constructors do not have a return statement. Their task is to write all necessary stuff into this, and it automatically becomes the result.

// But if there is a return statement, then the rule is simple:

// If return is called with an object, then the object is returned instead of this.
// If return is called with a primitive, it’s ignored.
// In other words, return with an object returns that object, in all other cases this is returned.

// For instance, here return overrides this by returning an object:

// function BigUser() {

//   this.name = "John";

//   return { name: "Godzilla" };  // <-- returns this object
// }

// console.log( new BigUser().name );  // Godzilla, got that object
// And here’s an example with an empty return (or we could place a primitive after it, doesn’t matter):

// function SmallUser() {

//   this.name = "John";

//   return; // <-- returns this
// }

// console.log( new SmallUser().name );  // John
// Usually constructors don’t have a return statement. Here we mention the special behavior with returning objects mainly for the sake of completeness.

// Omitting parentheses
// By the way, we can omit parentheses after new, if it has no arguments:

// let user = new User; // <-- no parentheses
// // same as
// let user = new User();
// Omitting parentheses here is not considered a “good style”, but the syntax is permitted by specification.

// Methods in constructor
// Using constructor functions to create objects gives a great deal of flexibility. The constructor function may have parameters that define how to construct the object, and what to put in it.

// Of course, we can add to this not only properties, but methods as well.

// For instance, new User(name) below creates an object with the given name and the method sayHi:

// function User(name) {
//   this.name = name;

//   this.sayHi = function() {
//     console.log( "My name is: " + this.name );
//   };
// }

// let john = new User("John");

// john.sayHi(); // My name is: John

// /*
// john = {
//    name: "John",
//    sayHi: function() { ... }
// }
// */
// To create complex objects, there’s a more advanced syntax, classes, that we’ll cover later.

// Summary
// Constructor functions or, briefly, constructors, are regular functions, but there’s a common agreement to name them with capital letter first.
// Constructor functions should only be called using new. Such a call implies a creation of empty this at the start and returning the populated one at the end.
// We can use constructor functions to make multiple similar objects.

// JavaScript provides constructor functions for many built-in language objects: like Date for dates, Set for sets and others that we plan to study.

// Objects, we’ll be back!
// In this chapter we only cover the basics about objects and constructors. They are essential for learning more about data types and functions in the next chapters.

// After we learn that, we return to objects and cover them in-depth in the chapters Prototypes, inheritance and Classes.

// ///////////////////////////////////////////

// Optional chaining '?.'
// A recent addition
// This is a recent addition to the language. Old browsers may need polyfills.
// The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist.

// The “non-existing property” problem
// If you’ve just started to read the tutorial and learn JavaScript, maybe the problem hasn’t touched you yet, but it’s quite common.

// As an example, let’s say we have user objects that hold the information about our users.

// Most of our users have addresses in user.address property, with the street user.address.street, but some did not provide them.

// In such case, when we attempt to get user.address.street, and the user happens to be without an address, we get an error:

// let user = {}; // a user without "address" property

// console.log(user.address.street); // Error!
// That’s the expected result. JavaScript works like this. As user.address is undefined, an attempt to get user.address.street fails with an error.

// In many practical cases we’d prefer to get undefined instead of an error here (meaning “no street”).

// …and another example. In Web development, we can get an object that corresponds to a web page element using a special method call, such as document.querySelector('.elem'), and it returns null when there’s no such element.

// // document.querySelector('.elem') is null if there's no element
// let html = document.querySelector('.elem').innerHTML; // error if it's null
// Once again, if the element doesn’t exist, we’ll get an error accessing .innerHTML property of null. And in some cases, when the absence of the element is normal, we’d like to avoid the error and just accept html = null as the result.

// How can we do this?

// The obvious solution would be to check the value using if or the conditional operator ?, before accessing its property, like this:

// let user = {};

// console.log(user.address ? user.address.street : undefined);
// It works, there’s no error… But it’s quite inelegant. As you can see, the "user.address" appears twice in the code.

// Here’s how the same would look for document.querySelector:

// let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
// We can see that the element search document.querySelector('.elem') is actually called twice here. Not good.

// For more deeply nested properties, it becomes even uglier, as more repetitions are required.

// E.g. let’s get user.address.street.name in a similar fashion.

// let user = {}; // user has no address

// console.log(user.address ? user.address.street ? user.address.street.name : null : null);
// That’s just awful, one may even have problems understanding such code.

// There’s a little better way to write it, using the && operator:

// let user = {}; // user has no address

// console.log( user.address && user.address.street && user.address.street.name ); // undefined (no error)
// AND’ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn’t ideal.

// As you can see, property names are still duplicated in the code. E.g. in the code above, user.address appears three times.

// That’s why the optional chaining ?. was added to the language. To solve this problem once and for all!

// Optional chaining
// The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

// Further in this article, for brevity, we’ll be saying that something “exists” if it’s not null and not undefined.

// In other words, value?.prop:

// works as value.prop, if value exists,
// otherwise (when value is undefined/null) it returns undefined.
// Here’s the safe way to access user.address.street using ?.:

// let user = {}; // user has no address

// console.log( user?.address?.street ); // undefined (no error)
// The code is short and clean, there’s no duplication at all.

// Here’s an example with document.querySelector:

// let html = document.querySelector('.elem')?.innerHTML; // will be undefined, if there's no element
// Reading the address with user?.address works even if user object doesn’t exist:

// let user = null;

// console.log( user?.address ); // undefined
// console.log( user?.address.street ); // undefined
// Please note: the ?. syntax makes optional the value before it, but not any further.

// E.g. in user?.address.street.name the ?. allows user to safely be null/undefined (and returns undefined in that case), but that’s only for user. Further properties are accessed in a regular way. If we want some of them to be optional, then we’ll need to replace more . with ?..

// Don’t overuse the optional chaining
// We should use ?. only where it’s ok that something doesn’t exist.

// For example, if according to our code logic user object must exist, but address is optional, then we should write user.address?.street, but not user?.address?.street.

// Then, if user happens to be undefined, we’ll see a programming error about it and fix it. Otherwise, if we overuse ?., coding errors can be silenced where not appropriate, and become more difficult to debug.

// The variable before ?. must be declared
// If there’s no variable user at all, then user?.anything triggers an error:

// // ReferenceError: user is not defined
// user?.address;
// The variable must be declared (e.g. let/const/var user or as a function parameter). The optional chaining works only for declared variables.

// Short-circuiting
// As it was said before, the ?. immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.

// So, if there are any further function calls or operations to the right of ?., they won’t be made.

// For instance:

// let user = null;
// let x = 0;

// user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++

// console.log(x); // 0, value not incremented
// Other variants: ?.(), ?.[]
// The optional chaining ?. is not an operator, but a special syntax construct, that also works with functions and square brackets.

// For example, ?.() is used to call a function that may not exist.

// In the code below, some of our users have admin method, and some don’t:

// let userAdmin = {
//   admin() {
//     console.log("I am admin");
//   }
// };

// let userGuest = {};

// userAdmin.admin?.(); // I am admin

// userGuest.admin?.(); // nothing happens (no such method)
// Here, in both lines we first use the dot (userAdmin.admin) to get admin property, because we assume that the user object exists, so it’s safe read from it.

// Then ?.() checks the left part: if the admin function exists, then it runs (that’s so for userAdmin). Otherwise (for userGuest) the evaluation stops without errors.

// The ?.[] syntax also works, if we’d like to use brackets [] to access properties instead of dot .. Similar to previous cases, it allows to safely read a property from an object that may not exist.

// let key = "firstName";

// let user1 = {
//   firstName: "John"
// };

// let user2 = null;

// console.log( user1?.[key] ); // John
// console.log( user2?.[key] ); // undefined
// Also we can use ?. with delete:

// delete user?.name; // delete user.name if user exists
// We can use ?. for safe reading and deleting, but not writing
// The optional chaining ?. has no use on the left side of an assignment.

// For example:

// let user = null;

// user?.name = "John"; // Error, doesn't work
// // because it evaluates to: undefined = "John"
// Summary
// The optional chaining ?. syntax has three forms:

// obj?.prop – returns obj.prop if obj exists, otherwise undefined.
// obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
// obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined.
// As we can see, all of them are straightforward and simple to use. The ?. checks the left part for null/undefined and allows the evaluation to proceed if it’s not so.

// A chain of ?. allows to safely access nested properties.

// Still, we should apply ?. carefully, only where it’s acceptable, according to our code logic, that the left part doesn’t exist. So that it won’t hide programming errors from us, if they occur.

// ////////////////////////////////////////

// Symbol type
// By specification, only two primitive types may serve as object property keys:

// string type, or
// symbol type.
// Otherwise, if one uses another type, such as number, it’s autoconverted to string. So that obj[1] is the same as obj["1"], and obj[true] is the same as obj["true"].

// Until now we’ve been using only strings.

// Now let’s explore symbols, see what they can do for us.

// Symbols
// A “symbol” represents a unique identifier.

// A value of this type can be created using Symbol():

// let id = Symbol();
// Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:

// // id is a symbol with the description "id"
// let id = Symbol("id");
// Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn’t affect anything.

// For instance, here are two symbols with the same description – they are not equal:

// let id1 = Symbol("id");
// let id2 = Symbol("id");

// console.log(id1 == id2); // false
// If you are familiar with Ruby or another language that also has some sort of “symbols” – please don’t be misguided. JavaScript symbols are different.

// So, to summarize, a symbol is a “primitive unique value” with an optional description. Let’s see where we can use them.

// Symbols don’t auto-convert to a string
// Most values in JavaScript support implicit conversion to a string. For instance, we can console.log almost any value, and it will work. Symbols are special. They don’t auto-convert.

// For instance, this console.log will show an error:

// let id = Symbol("id");
// console.log(id); // TypeError: Cannot convert a Symbol value to a string
// That’s a “language guard” against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

// If we really want to show a symbol, we need to explicitly call .toString() on it, like here:

// let id = Symbol("id");
// console.log(id.toString()); // Symbol(id), now it works
// Or get symbol.description property to show the description only:

// let id = Symbol("id");
// console.log(id.description); // id
// “Hidden” properties
// Symbols allow us to create “hidden” properties of an object, that no other part of code can accidentally access or overwrite.

// For instance, if we’re working with user objects, that belong to a third-party code. We’d like to add identifiers to them.

// Let’s use a symbol key for it:

// let user = { // belongs to another code
//   name: "John"
// };

// let id = Symbol("id");

// user[id] = 1;

// console.log( user[id] ); // we can access the data using the symbol as the key
// What’s the benefit of using Symbol("id") over a string "id"?

// As user objects belong to another codebase, it’s unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won’t be aware of newly defined symbols, so it’s safe to add symbols to the user objects.

// Also, imagine that another script wants to have its own identifier inside user, for its own purposes.

// Then that script can create its own Symbol("id"), like this:

// // ...
// let id = Symbol("id");

// user[id] = "Their id value";
// There will be no conflict between our and their identifiers, because symbols are always different, even if they have the same name.

// …But if we used a string "id" instead of a symbol for the same purpose, then there would be a conflict:

// let user = { name: "John" };

// // Our script uses "id" property
// user.id = "Our id value";

// // ...Another script also wants "id" for its purposes...

// user.id = "Their id value"
// // Boom! overwritten by another script!
// Symbols in an object literal
// If we want to use a symbol in an object literal {...}, we need square brackets around it.

// Like this:

// let id = Symbol("id");

// let user = {
//   name: "John",
//   [id]: 123 // not "id": 123
// };
// That’s because we need the value from the variable id as the key, not the string “id”.

// Symbols are skipped by for…in
// Symbolic properties do not participate in for..in loop.

// For instance:

// let id = Symbol("id");
// let user = {
//   name: "John",
//   age: 30,
//   [id]: 123
// };

// for (let key in user) console.log(key); // name, age (no symbols)

// // the direct access by the symbol works
// console.log( "Direct: " + user[id] ); // Direct: 123
// Object.keys(user) also ignores them. That’s a part of the general “hiding symbolic properties” principle. If another script or a library loops over our object, it won’t unexpectedly access a symbolic property.

// In contrast, Object.assign copies both string and symbol properties:

// let id = Symbol("id");
// let user = {
//   [id]: 123
// };

// let clone = Object.assign({}, user);

// console.log( clone[id] ); // 123
// There’s no paradox here. That’s by design. The idea is that when we clone an object or merge objects, we usually want all properties to be copied (including symbols like id).

// Global symbols
// As we’ve seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol "id" meaning exactly the same property.

// To achieve that, there exists a global symbol registry. We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

// In order to read (create if absent) a symbol from the registry, use Symbol.for(key).

// That call checks the global registry, and if there’s a symbol described as key, then returns it, otherwise creates a new symbol Symbol(key) and stores it in the registry by the given key.

// For instance:

// // read from the global registry
// let id = Symbol.for("id"); // if the symbol did not exist, it is created

// // read it again (maybe from another part of the code)
// let idAgain = Symbol.for("id");

// // the same symbol
// console.log( id === idAgain ); // true
// Symbols inside the registry are called global symbols. If we want an application-wide symbol, accessible everywhere in the code – that’s what they are for.

// That sounds like Ruby
// In some programming languages, like Ruby, there’s a single symbol per name.

// In JavaScript, as we can see, that’s true for global symbols.

// Symbol.keyFor
// We have seen that for global symbols, Symbol.for(key) returns a symbol by name. To do the opposite – return a name by global symbol – we can use: Symbol.keyFor(sym):

// For instance:

// // get symbol by name
// let sym = Symbol.for("name");
// let sym2 = Symbol.for("id");

// // get name by symbol
// console.log( Symbol.keyFor(sym) ); // name
// console.log( Symbol.keyFor(sym2) ); // id
// The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol. So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to find it and returns undefined.

// That said, all symbols have the description property.

// For instance:

// let globalSymbol = Symbol.for("name");
// let localSymbol = Symbol("name");

// console.log( Symbol.keyFor(globalSymbol) ); // name, global symbol
// console.log( Symbol.keyFor(localSymbol) ); // undefined, not global

// console.log( localSymbol.description ); // name
// System symbols
// There exist many “system” symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

// They are listed in the specification in the Well-known symbols table:

// Symbol.hasInstance
// Symbol.isConcatSpreadable
// Symbol.iterator
// Symbol.toPrimitive
// …and so on.
// For instance, Symbol.toPrimitive allows us to describe object to primitive conversion. We’ll see its use very soon.

// Other symbols will also become familiar when we study the corresponding language features.

// Summary
// Symbol is a primitive type for unique identifiers.

// Symbols are created with Symbol() call with an optional description (name).

// Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: Symbol.for(key) returns (creates if needed) a global symbol with key as the name. Multiple calls of Symbol.for with the same key return exactly the same symbol.

// Symbols have two main use cases:

// “Hidden” object properties.

// If we want to add a property into an object that “belongs” to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in for..in, so it won’t be accidentally processed together with other properties. Also it won’t be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

// So we can “covertly” hide something into objects that we need, but others should not see, using symbolic properties.

// There are many system symbols used by JavaScript which are accessible as Symbol.*. We can use them to alter some built-in behaviors. For instance, later in the tutorial we’ll use Symbol.iterator for iterables, Symbol.toPrimitive to setup object-to-primitive conversion and so on.

// Technically, symbols are not 100% hidden. There is a built-in method Object.getOwnPropertySymbols(obj) that allows us to get all symbols. Also there is a method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don’t use these methods.

// ///////////////////////////////////////////////////////

// Object to primitive conversion
// What happens when objects are added obj1 + obj2, subtracted obj1 - obj2 or printed using console.log(obj)?

// JavaScript doesn’t allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can’t implement a special object method to handle addition (or other operators).

// In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value.

// That’s an important limitation: the result of obj1 + obj2 (or another math operation) can’t be another object!

// E.g. we can’t make objects representing vectors or matrices (or achievements or whatever), add them and expect a “summed” object as the result. Such architectural feats are automatically “off the board”.

// So, because we can’t technically do much here, there’s no maths with objects in real projects. When it happens, with rare exceptions, it’s because of a coding mistake.

// In this chapter we’ll cover how an object converts to primitive and how to customize it.

// We have two purposes:

// It will allow us to understand what’s going on in case of coding mistakes, when such an operation happened accidentally.
// There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (Date objects). We’ll come across them later.
// Conversion rules
// In the chapter Type Conversions we’ve seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

// There’s no conversion to boolean. All objects are true in a boolean context, as simple as that. There exist only numeric and string conversions.
// The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, Date objects (to be covered in the chapter Date and time) can be subtracted, and the result of date1 - date2 is the time difference between two dates.
// As for the string conversion – it usually happens when we output an object with console.log(obj) and in similar contexts.
// We can implement string and numeric conversion by ourselves, using special object methods.

// Now let’s get into technical details, because it’s the only way to cover the topic in-depth.

// Hints
// How does JavaScript decide which conversion to apply?

// There are three variants of type conversion, that happen in various situations. They’re called “hints”, as described in the specification:

// "string"
// For an object-to-string conversion, when we’re doing an operation on an object that expects a string, like console.log:

// // output
// console.log(obj);

// // using object as a property key
// anotherObj[obj] = 123;
// "number"
// For an object-to-number conversion, like when we’re doing maths:

// // explicit conversion
// let num = Number(obj);

// // maths (except binary plus)
// let n = +obj; // unary plus
// let delta = date1 - date2;

// // less/greater comparison
// let greater = user1 > user2;
// Most built-in mathematical functions also include such conversion.

// "default"
// Occurs in rare cases when the operator is “not sure” what type to expect.

// For instance, binary plus + can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the "default" hint to convert it.

// Also, if an object is compared using == with a string, number or a symbol, it’s also unclear which conversion should be done, so the "default" hint is used.

// // binary plus uses the "default" hint
// let total = obj1 + obj2;

// // obj == number uses the "default" hint
// if (user == 1) { ... };
// The greater and less comparison operators, such as < >, can work with both strings and numbers too. Still, they use the "number" hint, not "default". That’s for historical reasons.

// In practice though, things are a bit simpler.

// All built-in objects except for one case (Date object, we’ll learn it later) implement "default" conversion the same way as "number". And we probably should do the same.

// Still, it’s important to know about all 3 hints, soon we’ll see why.

// To do the conversion, JavaScript tries to find and call three object methods:

// Call obj[Symbol.toPrimitive](hint) – the method with the symbolic key Symbol.toPrimitive (system symbol), if such method exists,
// Otherwise if hint is "string"
// try calling obj.toString() or obj.valueOf(), whatever exists.
// Otherwise if hint is "number" or "default"
// try calling obj.valueOf() or obj.toString(), whatever exists.
// Symbol.toPrimitive
// Let’s start from the first method. There’s a built-in symbol named Symbol.toPrimitive that should be used to name the conversion method, like this:

// obj[Symbol.toPrimitive] = function(hint) {
//   // here goes the code to convert this object to a primitive
//   // it must return a primitive value
//   // hint = one of "string", "number", "default"
// };
// If the method Symbol.toPrimitive exists, it’s used for all hints, and no more methods are needed.

// For instance, here user object implements it:

// let user = {
//   name: "John",
//   money: 1000,

//   [Symbol.toPrimitive](hint) {
//     console.log(`hint: ${hint}`);
//     return hint == "string" ? `{name: "${this.name}"}` : this.money;
//   }
// };

// // conversions demo:
// console.log(user); // hint: string -> {name: "John"}
// console.log(+user); // hint: number -> 1000
// console.log(user + 500); // hint: default -> 1500
// As we can see from the code, user becomes a self-descriptive string or a money amount, depending on the conversion. The single method user[Symbol.toPrimitive] handles all conversion cases.

// toString/valueOf
// If there’s no Symbol.toPrimitive then JavaScript tries to find methods toString and valueOf:

// For the "string" hint: call toString method, and if it doesn’t exist or if it returns an object instead of a primitive value, then call valueOf (so toString has the priority for string conversions).
// For other hints: call valueOf, and if it doesn’t exist or if it returns an object instead of a primitive value, then call toString (so valueOf has the priority for maths).
// Methods toString and valueOf come from ancient times. They are not symbols (symbols did not exist that long ago), but rather “regular” string-named methods. They provide an alternative “old-style” way to implement the conversion.

// These methods must return a primitive value. If toString or valueOf returns an object, then it’s ignored (same as if there were no method).

// By default, a plain object has following toString and valueOf methods:

// The toString method returns a string "[object Object]".
// The valueOf method returns the object itself.
// Here’s the demo:

// let user = {name: "John"};

// console.log(user); // [object Object]
// console.log(user.valueOf() === user); // true
// So if we try to use an object as a string, like in an console.log or so, then by default we see [object Object].

// The default valueOf is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don’t ask me why, that’s for historical reasons. So we can assume it doesn’t exist.

// Let’s implement these methods to customize the conversion.

// For instance, here user does the same as above using a combination of toString and valueOf instead of Symbol.toPrimitive:

// let user = {
//   name: "John",
//   money: 1000,

//   // for hint="string"
//   toString() {
//     return `{name: "${this.name}"}`;
//   },

//   // for hint="number" or "default"
//   valueOf() {
//     return this.money;
//   }

// };

// console.log(user); // toString -> {name: "John"}
// console.log(+user); // valueOf -> 1000
// console.log(user + 500); // valueOf -> 1500
// As we can see, the behavior is the same as the previous example with Symbol.toPrimitive.

// Often we want a single “catch-all” place to handle all primitive conversions. In this case, we can implement toString only, like this:

// let user = {
//   name: "John",

//   toString() {
//     return this.name;
//   }
// };

// console.log(user); // toString -> John
// console.log(user + 500); // toString -> John500
// In the absence of Symbol.toPrimitive and valueOf, toString will handle all primitive conversions.

// A conversion can return any primitive type
// The important thing to know about all primitive-conversion methods is that they do not necessarily return the “hinted” primitive.

// There is no control whether toString returns exactly a string, or whether Symbol.toPrimitive method returns a number for the hint "number".

// The only mandatory thing: these methods must return a primitive, not an object.

// Historical notes
// For historical reasons, if toString or valueOf returns an object, there’s no error, but such value is ignored (like if the method didn’t exist). That’s because in ancient times there was no good “error” concept in JavaScript.

// In contrast, Symbol.toPrimitive is stricter, it must return a primitive, otherwise there will be an error.

// Further conversions
// As we know already, many operators and functions perform type conversions, e.g. multiplication * converts operands to numbers.

// If we pass an object as an argument, then there are two stages of calculations:

// The object is converted to a primitive (using the rules described above).
// If the necessary for further calculations, the resulting primitive is also converted.
// For instance:

// let obj = {
//   // toString handles all conversions in the absence of other methods
//   toString() {
//     return "2";
//   }
// };

// console.log(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
// The multiplication obj * 2 first converts the object to primitive (that’s a string "2").
// Then "2" * 2 becomes 2 * 2 (the string is converted to number).
// Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

// let obj = {
//   toString() {
//     return "2";
//   }
// };

// console.log(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
// Summary
// The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

// There are 3 types (hints) of it:

// "string" (for console.log and other operations that need a string)
// "number" (for maths)
// "default" (few operators, usually objects implement it the same way as "number")
// The specification describes explicitly which operator uses which hint.

// The conversion algorithm is:

// Call obj[Symbol.toPrimitive](hint) if the method exists,
// Otherwise if hint is "string"
// try calling obj.toString() or obj.valueOf(), whatever exists.
// Otherwise if hint is "number" or "default"
// try calling obj.valueOf() or obj.toString(), whatever exists.
// All these methods must return a primitive to work (if defined).

// In practice, it’s often enough to implement only obj.toString() as a “catch-all” method for string conversions that should return a “human-readable” representation of an object, for logging or debugging purposes.
