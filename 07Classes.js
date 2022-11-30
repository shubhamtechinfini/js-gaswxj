// // Classes
// Class basic syntax
// In object-oriented programming, a class is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods).

// Wikipedia
// In practice, we often need to create many objects of the same kind, like users, or goods or whatever.

// As we already know from the chapter Constructor, operator "new", new function can help with that.

// But in the modern JavaScript, there’s a more advanced “class” construct, that introduces great new features which are useful for object-oriented programming.

// The “class” syntax
// The basic syntax is:

// class MyClass {
//   // class methods
//   constructor() { ... }
//   method1() { ... }
//   method2() { ... }
//   method3() { ... }
//   ...
// }
// Then use new MyClass() to create a new object with all the listed methods.

// The constructor() method is called automatically by new, so we can initialize the object there.

// For example:

// class User {

//   constructor(name) {
//     this.name = name;
//   }

//   sayHi() {
//     console.log(this.name);
//   }

// }

// // Usage:
// let user = new User("John");
// user.sayHi();
// When new User("John") is called:

// A new object is created.
// The constructor runs with the given argument and assigns it to this.name.
// …Then we can call object methods, such as user.sayHi().

// No comma between class methods
// A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error.

// The notation here is not to be confused with object literals. Within the class, no commas are required.

// What is a class?
// So, what exactly is a class? That’s not an entirely new language-level entity, as one might think.

// Let’s unveil any magic and see what a class really is. That’ll help in understanding many complex aspects.

// In JavaScript, a class is a kind of function.

// Here, take a look:

// class User {
//   constructor(name) { this.name = name; }
//   sayHi() { console.log(this.name); }
// }

// // proof: User is a function
// console.log(typeof User); // function
// What class User {...} construct really does is:

// Creates a function named User, that becomes the result of the class declaration. The function code is taken from the constructor method (assumed empty if we don’t write such method).
// Stores class methods, such as sayHi, in User.prototype.
// After new User object is created, when we call its method, it’s taken from the prototype, just as described in the chapter F.prototype. So the object has access to class methods.

// We can illustrate the result of class User declaration as:

// Here’s the code to introspect it:

// class User {
//   constructor(name) { this.name = name; }
//   sayHi() { console.log(this.name); }
// }

// // class is a function
// console.log(typeof User); // function

// // ...or, more precisely, the constructor method
// console.log(User === User.prototype.constructor); // true

// // The methods are in User.prototype, e.g:
// console.log(User.prototype.sayHi); // the code of the sayHi method

// // there are exactly two methods in the prototype
// console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
// Not just a syntactic sugar
// Sometimes people say that class is a “syntactic sugar” (syntax that is designed to make things easier to read, but doesn’t introduce anything new), because we could actually declare the same thing without using the class keyword at all:

// // rewriting class User in pure functions

// // 1. Create constructor function
// function User(name) {
//   this.name = name;
// }
// // a function prototype has "constructor" property by default,
// // so we don't need to create it

// // 2. Add the method to prototype
// User.prototype.sayHi = function() {
//   console.log(this.name);
// };

// // Usage:
// let user = new User("John");
// user.sayHi();
// The result of this definition is about the same. So, there are indeed reasons why class can be considered a syntactic sugar to define a constructor together with its prototype methods.

// Still, there are important differences.

// First, a function created by class is labelled by a special internal property [[IsClassConstructor]]: true. So it’s not entirely the same as creating it manually.

// The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with new:

// class User {
//   constructor() {}
// }

// console.log(typeof User); // function
// User(); // Error: Class constructor User cannot be invoked without 'new'
// Also, a string representation of a class constructor in most JavaScript engines starts with the “class…”

// class User {
//   constructor() {}
// }

// console.log(User); // class User { ... }
// There are other differences, we’ll see them soon.

// Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype".

// That’s good, because if we for..in over an object, we usually don’t want its class methods.

// Classes always use strict. All code inside the class construct is automatically in strict mode.

// Besides, class syntax brings many other features that we’ll explore later.

// Class Expression
// Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

// Here’s an example of a class expression:

// let User = class {
//   sayHi() {
//     console.log("Hello");
//   }
// };
// Similar to Named Function Expressions, class expressions may have a name.

// If a class expression has a name, it’s visible inside the class only:

// // "Named Class Expression"
// // (no such term in the spec, but that's similar to Named Function Expression)
// let User = class MyClass {
//   sayHi() {
//     console.log(MyClass); // MyClass name is visible only inside the class
//   }
// };

// new User().sayHi(); // works, shows MyClass definition

// console.log(MyClass); // error, MyClass name isn't visible outside of the class
// We can even make classes dynamically “on-demand”, like this:

// function makeClass(phrase) {
//   // declare a class and return it
//   return class {
//     sayHi() {
//       console.log(phrase);
//     }
//   };
// }

// // Create a new class
// let User = makeClass("Hello");

// new User().sayHi(); // Hello
// Getters/setters
// Just like literal objects, classes may include getters/setters, computed properties etc.

// Here’s an example for user.name implemented using get/set:

// class User {

//   constructor(name) {
//     // invokes the setter
//     this.name = name;
//   }

//   get name() {
//     return this._name;
//   }

//   set name(value) {
//     if (value.length < 4) {
//       console.log("Name is too short.");
//       return;
//     }
//     this._name = value;
//   }

// }

// let user = new User("John");
// console.log(user.name); // John

// user = new User(""); // Name is too short.
// Technically, such class declaration works by creating getters and setters in User.prototype.

// Computed names […]
// Here’s an example with a computed method name using brackets [...]:

// class User {

//   ['say' + 'Hi']() {
//     console.log("Hello");
//   }

// }

// new User().sayHi();
// Such features are easy to remember, as they resemble that of literal objects.

// Class fields
// Old browsers may need a polyfill
// Class fields are a recent addition to the language.

// Previously, our classes only had methods.

// “Class fields” is a syntax that allows to add any properties.

// For instance, let’s add name property to class User:

// class User {
//   name = "John";

//   sayHi() {
//     console.log(`Hello, ${this.name}!`);
//   }
// }

// new User().sayHi(); // Hello, John!
// So, we just write " = " in the declaration, and that’s it.

// The important difference of class fields is that they are set on individual objects, not User.prototype:

// class User {
//   name = "John";
// }

// let user = new User();
// console.log(user.name); // John
// console.log(User.prototype.name); // undefined
// We can also assign values using more complex expressions and function calls:

// class User {
//   name = prompt("Name, please?", "John");
// }

// let user = new User();
// console.log(user.name); // John
// Making bound methods with class fields
// As demonstrated in the chapter Function binding functions in JavaScript have a dynamic this. It depends on the context of the call.

// So if an object method is passed around and called in another context, this won’t be a reference to its object any more.

// For instance, this code will show undefined:

// class Button {
//   constructor(value) {
//     this.value = value;
//   }

//   click() {
//     console.log(this.value);
//   }
// }

// let button = new Button("hello");

// setTimeout(button.click, 1000); // undefined
// The problem is called "losing this".

// There are two approaches to fixing it, as discussed in the chapter Function binding:

// Pass a wrapper-function, such as setTimeout(() => button.click(), 1000).
// Bind the method to object, e.g. in the constructor.
// Class fields provide another, quite elegant syntax:

// class Button {
//   constructor(value) {
//     this.value = value;
//   }
//   click = () => {
//     console.log(this.value);
//   }
// }

// let button = new Button("hello");

// setTimeout(button.click, 1000); // hello
// The class field click = () => {...} is created on a per-object basis, there’s a separate function for each Button object, with this inside it referencing that object. We can pass button.click around anywhere, and the value of this will always be correct.

// That’s especially useful in browser environment, for event listeners.

// Summary
// The basic class syntax looks like this:

// class MyClass {
//   prop = value; // property

//   constructor(...) { // constructor
//     // ...
//   }

//   method(...) {} // method

//   get something(...) {} // getter method
//   set something(...) {} // setter method

//   [Symbol.iterator]() {} // method with computed name (symbol here)
//   // ...
// }
// MyClass is technically a function (the one that we provide as constructor), while methods, getters and setters are written to MyClass.prototype.

// In the next chapters we’ll learn more about classes, including inheritance and other features.
// //////////////////////////////////////

// // Class basic syntax
// Class inheritance
// Class inheritance is a way for one class to extend another class.

// So we can create new functionality on top of the existing.

// The “extends” keyword
// Let’s say we have class Animal:

// class Animal {
//   constructor(name) {
//     this.speed = 0;
//     this.name = name;
//   }
//   run(speed) {
//     this.speed = speed;
//     console.log(`${this.name} runs with speed ${this.speed}.`);
//   }
//   stop() {
//     this.speed = 0;
//     console.log(`${this.name} stands still.`);
//   }
// }

// let animal = new Animal("My animal");
// Here’s how we can represent animal object and Animal class graphically:

// …And we would like to create another class Rabbit.

// As rabbits are animals, Rabbit class should be based on Animal, have access to animal methods, so that rabbits can do what “generic” animals can do.

// The syntax to extend another class is: class Child extends Parent.

// Let’s create class Rabbit that inherits from Animal:

// class Rabbit extends Animal {
//   hide() {
//     console.log(`${this.name} hides!`);
//   }
// }

// let rabbit = new Rabbit("White Rabbit");

// rabbit.run(5); // White Rabbit runs with speed 5.
// rabbit.hide(); // White Rabbit hides!
// Object of Rabbit class have access both to Rabbit methods, such as rabbit.hide(), and also to Animal methods, such as rabbit.run().

// Internally, extends keyword works using the good old prototype mechanics. It sets Rabbit.prototype.[[Prototype]] to Animal.prototype. So, if a method is not found in Rabbit.prototype, JavaScript takes it from Animal.prototype.

// For instance, to find rabbit.run method, the engine checks (bottom-up on the picture):

// The rabbit object (has no run).
// Its prototype, that is Rabbit.prototype (has hide, but not run).
// Its prototype, that is (due to extends) Animal.prototype, that finally has the run method.
// As we can recall from the chapter Native prototypes, JavaScript itself uses prototypal inheritance for built-in objects. E.g. Date.prototype.[[Prototype]] is Object.prototype. That’s why dates have access to generic object methods.

// Any expression is allowed after extends
// Class syntax allows to specify not just a class, but any expression after extends.

// For instance, a function call that generates the parent class:

// function f(phrase) {
//   return class {
//     sayHi() { console.log(phrase); }
//   };
// }

// class User extends f("Hello") {}

// new User().sayHi(); // Hello
// Here class User inherits from the result of f("Hello").

// That may be useful for advanced programming patterns when we use functions to generate classes depending on many conditions and can inherit from them.

// Overriding a method
// Now let’s move forward and override a method. By default, all methods that are not specified in class Rabbit are taken directly “as is” from class Animal.

// But if we specify our own method in Rabbit, such as stop() then it will be used instead:

// class Rabbit extends Animal {
//   stop() {
//     // ...now this will be used for rabbit.stop()
//     // instead of stop() from class Animal
//   }
// }
// Usually, however, we don’t want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.

// Classes provide "super" keyword for that.

// super.method(...) to call a parent method.
// super(...) to call a parent constructor (inside our constructor only).
// For instance, let our rabbit autohide when stopped:

// class Animal {

//   constructor(name) {
//     this.speed = 0;
//     this.name = name;
//   }

//   run(speed) {
//     this.speed = speed;
//     console.log(`${this.name} runs with speed ${this.speed}.`);
//   }

//   stop() {
//     this.speed = 0;
//     console.log(`${this.name} stands still.`);
//   }

// }

// class Rabbit extends Animal {
//   hide() {
//     console.log(`${this.name} hides!`);
//   }

//   stop() {
//     super.stop(); // call parent stop
//     this.hide(); // and then hide
//   }
// }

// let rabbit = new Rabbit("White Rabbit");

// rabbit.run(5); // White Rabbit runs with speed 5.
// rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
// Now Rabbit has the stop method that calls the parent super.stop() in the process.

// Arrow functions have no super
// As was mentioned in the chapter Arrow functions revisited, arrow functions do not have super.

// If accessed, it’s taken from the outer function. For instance:

// class Rabbit extends Animal {
//   stop() {
//     setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
//   }
// }
// The super in the arrow function is the same as in stop(), so it works as intended. If we specified a “regular” function here, there would be an error:

// // Unexpected super
// setTimeout(function() { super.stop() }, 1000);
// Overriding constructor
// With constructors it gets a little bit tricky.

// Until now, Rabbit did not have its own constructor.

// According to the specification, if a class extends another class and has no constructor, then the following “empty” constructor is generated:

// class Rabbit extends Animal {
//   // generated for extending classes without own constructors
//   constructor(...args) {
//     super(...args);
//   }
// }
// As we can see, it basically calls the parent constructor passing it all the arguments. That happens if we don’t write a constructor of our own.

// Now let’s add a custom constructor to Rabbit. It will specify the earLength in addition to name:

// class Animal {
//   constructor(name) {
//     this.speed = 0;
//     this.name = name;
//   }
//   // ...
// }

// class Rabbit extends Animal {

//   constructor(name, earLength) {
//     this.speed = 0;
//     this.name = name;
//     this.earLength = earLength;
//   }

//   // ...
// }

// // Doesn't work!
// let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
// Whoops! We’ve got an error. Now we can’t create rabbits. What went wrong?

// The short answer is:

// Constructors in inheriting classes must call super(...), and (!) do it before using this.
// …But why? What’s going on here? Indeed, the requirement seems strange.

// Of course, there’s an explanation. Let’s get into details, so you’ll really understand what’s going on.

// In JavaScript, there’s a distinction between a constructor function of an inheriting class (so-called “derived constructor”) and other functions. A derived constructor has a special internal property [[ConstructorKind]]:"derived". That’s a special internal label.

// That label affects its behavior with new.

// When a regular function is executed with new, it creates an empty object and assigns it to this.
// But when a derived constructor runs, it doesn’t do this. It expects the parent constructor to do this job.
// So a derived constructor must call super in order to execute its parent (base) constructor, otherwise the object for this won’t be created. And we’ll get an error.

// For the Rabbit constructor to work, it needs to call super() before using this, like here:

// class Animal {

//   constructor(name) {
//     this.speed = 0;
//     this.name = name;
//   }

//   // ...
// }

// class Rabbit extends Animal {

//   constructor(name, earLength) {
//     super(name);
//     this.earLength = earLength;
//   }

//   // ...
// }

// // now fine
// let rabbit = new Rabbit("White Rabbit", 10);
// console.log(rabbit.name); // White Rabbit
// console.log(rabbit.earLength); // 10
// Overriding class fields: a tricky note
// Advanced note
// This note assumes you have a certain experience with classes, maybe in other programming languages.

// It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

// If you find it difficult to understand, just go on, continue reading, then return to it some time later.

// We can override not only methods, but also class fields.

// Although, there’s a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

// Consider this example:

// class Animal {
//   name = 'animal';

//   constructor() {
//     console.log(this.name); // (*)
//   }
// }

// class Rabbit extends Animal {
//   name = 'rabbit';
// }

// new Animal(); // animal
// new Rabbit(); // animal
// Here, class Rabbit extends Animal and overrides the name field with its own value.

// There’s no own constructor in Rabbit, so Animal constructor is called.

// What’s interesting is that in both cases: new Animal() and new Rabbit(), the console.log in the line (*) shows animal.

// In other words, the parent constructor always uses its own field value, not the overridden one.

// What’s odd about it?

// If it’s not clear yet, please compare with methods.

// Here’s the same code, but instead of this.name field we call this.showName() method:

// class Animal {
//   showName() {  // instead of this.name = 'animal'
//     console.log('animal');
//   }

//   constructor() {
//     this.showName(); // instead of console.log(this.name);
//   }
// }

// class Rabbit extends Animal {
//   showName() {
//     console.log('rabbit');
//   }
// }

// new Animal(); // animal
// new Rabbit(); // rabbit
// Please note: now the output is different.

// And that’s what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

// …But for class fields it’s not so. As said, the parent constructor always uses the parent field.

// Why is there a difference?

// Well, the reason is the field initialization order. The class field is initialized:

// Before constructor for the base class (that doesn’t extend anything),
// Immediately after super() for the derived class.
// In our case, Rabbit is the derived class. There’s no constructor() in it. As said previously, that’s the same as if there was an empty constructor with only super(...args).

// So, new Rabbit() calls super(), thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no Rabbit class fields yet, that’s why Animal fields are used.

// This subtle difference between fields and methods is specific to JavaScript.

// Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what’s going on, so we’re explaining it here.

// If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.

// Super: internals, [[HomeObject]]
// Advanced information
// If you’re reading the tutorial for the first time – this section may be skipped.

// It’s about the internal mechanisms behind inheritance and super.

// Let’s get a little deeper under the hood of super. We’ll see some interesting things along the way.

// First to say, from all that we’ve learned till now, it’s impossible for super to work at all!

// Yeah, indeed, let’s ask ourselves, how it should technically work? When an object method runs, it gets the current object as this. If we call super.method() then, the engine needs to get the method from the prototype of the current object. But how?

// The task may seem simple, but it isn’t. The engine knows the current object this, so it could get the parent method as this.__proto__.method. Unfortunately, such a “naive” solution won’t work.

// Let’s demonstrate the problem. Without classes, using plain objects for the sake of simplicity.

// You may skip this part and go below to the [[HomeObject]] subsection if you don’t want to know the details. That won’t harm. Or read on if you’re interested in understanding things in-depth.

// In the example below, rabbit.__proto__ = animal. Now let’s try: in rabbit.eat() we’ll call animal.eat(), using this.__proto__:

// let animal = {
//   name: "Animal",
//   eat() {
//     console.log(`${this.name} eats.`);
//   }
// };

// let rabbit = {
//   __proto__: animal,
//   name: "Rabbit",
//   eat() {
//     // that's how super.eat() could presumably work
//     this.__proto__.eat.call(this); // (*)
//   }
// };

// rabbit.eat(); // Rabbit eats.
// At the line (*) we take eat from the prototype (animal) and call it in the context of the current object. Please note that .call(this) is important here, because a simple this.__proto__.eat() would execute parent eat in the context of the prototype, not the current object.

// And in the code above it actually works as intended: we have the correct console.log.

// Now let’s add one more object to the chain. We’ll see how things break:

// let animal = {
//   name: "Animal",
//   eat() {
//     console.log(`${this.name} eats.`);
//   }
// };

// let rabbit = {
//   __proto__: animal,
//   eat() {
//     // ...bounce around rabbit-style and call parent (animal) method
//     this.__proto__.eat.call(this); // (*)
//   }
// };

// let longEar = {
//   __proto__: rabbit,
//   eat() {
//     // ...do something with long ears and call parent (rabbit) method
//     this.__proto__.eat.call(this); // (**)
//   }
// };

// longEar.eat(); // Error: Maximum call stack size exceeded
// The code doesn’t work anymore! We can see the error trying to call longEar.eat().

// It may be not that obvious, but if we trace longEar.eat() call, then we can see why. In both lines (*) and (**) the value of this is the current object (longEar). That’s essential: all object methods get the current object as this, not a prototype or something.

// So, in both lines (*) and (**) the value of this.__proto__ is exactly the same: rabbit. They both call rabbit.eat without going up the chain in the endless loop.

// Here’s the picture of what happens:

// Inside longEar.eat(), the line (**) calls rabbit.eat providing it with this=longEar.

// // inside longEar.eat() we have this = longEar
// this.__proto__.eat.call(this) // (**)
// // becomes
// longEar.__proto__.eat.call(this)
// // that is
// rabbit.eat.call(this);
// Then in the line (*) of rabbit.eat, we’d like to pass the call even higher in the chain, but this=longEar, so this.__proto__.eat is again rabbit.eat!

// // inside rabbit.eat() we also have this = longEar
// this.__proto__.eat.call(this) // (*)
// // becomes
// longEar.__proto__.eat.call(this)
// // or (again)
// rabbit.eat.call(this);
// …So rabbit.eat calls itself in the endless loop, because it can’t ascend any further.

// The problem can’t be solved by using this alone.

// [[HomeObject]]
// To provide the solution, JavaScript adds one more special internal property for functions: [[HomeObject]].

// When a function is specified as a class or object method, its [[HomeObject]] property becomes that object.

// Then super uses it to resolve the parent prototype and its methods.

// Let’s see how it works, first with plain objects:

// let animal = {
//   name: "Animal",
//   eat() {         // animal.eat.[[HomeObject]] == animal
//     console.log(`${this.name} eats.`);
//   }
// };

// let rabbit = {
//   __proto__: animal,
//   name: "Rabbit",
//   eat() {         // rabbit.eat.[[HomeObject]] == rabbit
//     super.eat();
//   }
// };

// let longEar = {
//   __proto__: rabbit,
//   name: "Long Ear",
//   eat() {         // longEar.eat.[[HomeObject]] == longEar
//     super.eat();
//   }
// };

// // works correctly
// longEar.eat();  // Long Ear eats.
// It works as intended, due to [[HomeObject]] mechanics. A method, such as longEar.eat, knows its [[HomeObject]] and takes the parent method from its prototype. Without any use of this.

// Methods are not “free”
// As we’ve known before, generally functions are “free”, not bound to objects in JavaScript. So they can be copied between objects and called with another this.

// The very existence of [[HomeObject]] violates that principle, because methods remember their objects. [[HomeObject]] can’t be changed, so this bond is forever.

// The only place in the language where [[HomeObject]] is used – is super. So, if a method does not use super, then we can still consider it free and copy between objects. But with super things may go wrong.

// Here’s the demo of a wrong super result after copying:

// let animal = {
//   sayHi() {
//     console.log(`I'm an animal`);
//   }
// };

// // rabbit inherits from animal
// let rabbit = {
//   __proto__: animal,
//   sayHi() {
//     super.sayHi();
//   }
// };

// let plant = {
//   sayHi() {
//     console.log("I'm a plant");
//   }
// };

// // tree inherits from plant
// let tree = {
//   __proto__: plant,
//   sayHi: rabbit.sayHi // (*)
// };

// tree.sayHi();  // I'm an animal (?!?)
// A call to tree.sayHi() shows “I’m an animal”. Definitely wrong.

// The reason is simple:

// In the line (*), the method tree.sayHi was copied from rabbit. Maybe we just wanted to avoid code duplication?
// Its [[HomeObject]] is rabbit, as it was created in rabbit. There’s no way to change [[HomeObject]].
// The code of tree.sayHi() has super.sayHi() inside. It goes up from rabbit and takes the method from animal.
// Here’s the diagram of what happens:

// Methods, not function properties
// [[HomeObject]] is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as method(), not as "method: function()".

// The difference may be non-essential for us, but it’s important for JavaScript.

// In the example below a non-method syntax is used for comparison. [[HomeObject]] property is not set and the inheritance doesn’t work:

// let animal = {
//   eat: function() { // intentionally writing like this instead of eat() {...
//     // ...
//   }
// };

// let rabbit = {
//   __proto__: animal,
//   eat: function() {
//     super.eat();
//   }
// };

// rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
// Summary
// To extend a class: class Child extends Parent:
// That means Child.prototype.__proto__ will be Parent.prototype, so methods are inherited.
// When overriding a constructor:
// We must call parent constructor as super() in Child constructor before using this.
// When overriding another method:
// We can use super.method() in a Child method to call Parent method.
// Internals:
// Methods remember their class/object in the internal [[HomeObject]] property. That’s how super resolves parent methods.
// So it’s not safe to copy a method with super from one object to another.
// Also:

// Arrow functions don’t have their own this or super, so they transparently fit into the surrounding context.
// //////////////////////////////////////

// // Class inheritance
// Static properties and methods
// We can also assign a method to the class as a whole. Such methods are called static.

// In a class declaration, they are prepended by static keyword, like this:

// class User {
//   static staticMethod() {
//     console.log(this === User);
//   }
// }

// User.staticMethod(); // true
// That actually does the same as assigning it as a property directly:

// class User { }

// User.staticMethod = function() {
//   console.log(this === User);
// };

// User.staticMethod(); // true
// The value of this in User.staticMethod() call is the class constructor User itself (the “object before dot” rule).

// Usually, static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it.

// For instance, we have Article objects and need a function to compare them.

// A natural solution would be to add Article.compare static method:

// class Article {
//   constructor(title, date) {
//     this.title = title;
//     this.date = date;
//   }

//   static compare(articleA, articleB) {
//     return articleA.date - articleB.date;
//   }
// }

// // usage
// let articles = [
//   new Article("HTML", new Date(2019, 1, 1)),
//   new Article("CSS", new Date(2019, 0, 1)),
//   new Article("JavaScript", new Date(2019, 11, 1))
// ];

// articles.sort(Article.compare);

// console.log( articles[0].title ); // CSS
// Here Article.compare method stands “above” articles, as a means to compare them. It’s not a method of an article, but rather of the whole class.

// Another example would be a so-called “factory” method.

// Let’s say, we need multiple ways to create an article:

// Create by given parameters (title, date etc).
// Create an empty article with today’s date.
// …or else somehow.
// The first way can be implemented by the constructor. And for the second one we can make a static method of the class.

// Such as Article.createTodays() here:

// class Article {
//   constructor(title, date) {
//     this.title = title;
//     this.date = date;
//   }

//   static createTodays() {
//     // remember, this = Article
//     return new this("Today's digest", new Date());
//   }
// }

// let article = Article.createTodays();

// console.log( article.title ); // Today's digest
// Now every time we need to create a today’s digest, we can call Article.createTodays(). Once again, that’s not a method of an article, but a method of the whole class.

// Static methods are also used in database-related classes to search/save/remove entries from the database, like this:

// // assuming Article is a special class for managing articles
// // static method to remove the article by id:
// Article.remove({id: 12345});
// Static methods aren’t available for individual objects
// Static methods are callable on classes, not on individual objects.

// E.g. such code won’t work:

// // ...
// article.createTodays(); /// Error: article.createTodays is not a function
// Static properties
// A recent addition
// This is a recent addition to the language. Examples work in the recent Chrome.
// Static properties are also possible, they look like regular class properties, but prepended by static:

// class Article {
//   static publisher = "Ilya Kantor";
// }

// console.log( Article.publisher ); // Ilya Kantor
// That is the same as a direct assignment to Article:

// Article.publisher = "Ilya Kantor";
// Inheritance of static properties and methods
// Static properties and methods are inherited.

// For instance, Animal.compare and Animal.planet in the code below are inherited and accessible as Rabbit.compare and Rabbit.planet:

// class Animal {
//   static planet = "Earth";

//   constructor(name, speed) {
//     this.speed = speed;
//     this.name = name;
//   }

//   run(speed = 0) {
//     this.speed += speed;
//     console.log(`${this.name} runs with speed ${this.speed}.`);
//   }

//   static compare(animalA, animalB) {
//     return animalA.speed - animalB.speed;
//   }

// }

// // Inherit from Animal
// class Rabbit extends Animal {
//   hide() {
//     console.log(`${this.name} hides!`);
//   }
// }

// let rabbits = [
//   new Rabbit("White Rabbit", 10),
//   new Rabbit("Black Rabbit", 5)
// ];

// rabbits.sort(Rabbit.compare);

// rabbits[0].run(); // Black Rabbit runs with speed 5.

// console.log(Rabbit.planet); // Earth
// Now when we call Rabbit.compare, the inherited Animal.compare will be called.

// How does it work? Again, using prototypes. As you might have already guessed, extends gives Rabbit the [[Prototype]] reference to Animal.

// So, Rabbit extends Animal creates two [[Prototype]] references:

// Rabbit function prototypally inherits from Animal function.
// Rabbit.prototype prototypally inherits from Animal.prototype.
// As a result, inheritance works both for regular and static methods.

// Here, let’s check that by code:

// class Animal {}
// class Rabbit extends Animal {}

// // for statics
// console.log(Rabbit.__proto__ === Animal); // true

// // for regular methods
// console.log(Rabbit.prototype.__proto__ === Animal.prototype); // true
// Summary
// Static methods are used for the functionality that belongs to the class “as a whole”. It doesn’t relate to a concrete class instance.

// For example, a method for comparison Article.compare(article1, article2) or a factory method Article.createTodays().

// They are labeled by the word static in class declaration.

// Static properties are used when we’d like to store class-level data, also not bound to an instance.

// The syntax is:

// class MyClass {
//   static property = ...;

//   static method() {
//     ...
//   }
// }
// Technically, static declaration is the same as assigning to the class itself:

// MyClass.property = ...
// MyClass.method = ...
// Static properties and methods are inherited.

// For class B extends A the prototype of the class B itself points to A: B.[[Prototype]] = A. So if a field is not found in B, the search continues in A.
// //////////////////////////////////////

// // Static properties and methods
// Private and protected properties and methods
// One of the most important principles of object oriented programming – delimiting internal interface from the external one.

// That is “a must” practice in developing anything more complex than a “hello world” app.

// To understand this, let’s break away from development and turn our eyes into the real world.

// Usually, devices that we’re using are quite complex. But delimiting the internal interface from the external one allows to use them without problems.

// A real-life example
// For instance, a coffee machine. Simple from outside: a button, a display, a few holes…And, surely, the result – great coffee! :)

// But inside… (a picture from the repair manual)

// A lot of details. But we can use it without knowing anything.

// Coffee machines are quite reliable, aren’t they? We can use one for years, and only if something goes wrong – bring it for repairs.

// The secret of reliability and simplicity of a coffee machine – all details are well-tuned and hidden inside.

// If we remove the protective cover from the coffee machine, then using it will be much more complex (where to press?), and dangerous (it can electrocute).

// As we’ll see, in programming objects are like coffee machines.

// But in order to hide inner details, we’ll use not a protective cover, but rather special syntax of the language and conventions.

// Internal and external interface
// In object-oriented programming, properties and methods are split into two groups:

// Internal interface – methods and properties, accessible from other methods of the class, but not from the outside.
// External interface – methods and properties, accessible also from outside the class.
// If we continue the analogy with the coffee machine – what’s hidden inside: a boiler tube, heating element, and so on – is its internal interface.

// An internal interface is used for the object to work, its details use each other. For instance, a boiler tube is attached to the heating element.

// But from the outside a coffee machine is closed by the protective cover, so that no one can reach those. Details are hidden and inaccessible. We can use its features via the external interface.

// So, all we need to use an object is to know its external interface. We may be completely unaware how it works inside, and that’s great.

// That was a general introduction.

// In JavaScript, there are two types of object fields (properties and methods):

// Public: accessible from anywhere. They comprise the external interface. Until now we were only using public properties and methods.
// Private: accessible only from inside the class. These are for the internal interface.
// In many other languages there also exist “protected” fields: accessible only from inside the class and those extending it (like private, but plus access from inheriting classes). They are also useful for the internal interface. They are in a sense more widespread than private ones, because we usually want inheriting classes to gain access to them.

// Protected fields are not implemented in JavaScript on the language level, but in practice they are very convenient, so they are emulated.

// Now we’ll make a coffee machine in JavaScript with all these types of properties. A coffee machine has a lot of details, we won’t model them to stay simple (though we could).

// Protecting “waterAmount”
// Let’s make a simple coffee machine class first:

// class CoffeeMachine {
//   waterAmount = 0; // the amount of water inside

//   constructor(power) {
//     this.power = power;
//     console.log( `Created a coffee-machine, power: ${power}` );
//   }

// }

// // create the coffee machine
// let coffeeMachine = new CoffeeMachine(100);

// // add water
// coffeeMachine.waterAmount = 200;
// Right now the properties waterAmount and power are public. We can easily get/set them from the outside to any value.

// Let’s change waterAmount property to protected to have more control over it. For instance, we don’t want anyone to set it below zero.

// Protected properties are usually prefixed with an underscore _.

// That is not enforced on the language level, but there’s a well-known convention between programmers that such properties and methods should not be accessed from the outside.

// So our property will be called _waterAmount:

// class CoffeeMachine {
//   _waterAmount = 0;

//   set waterAmount(value) {
//     if (value < 0) {
//       value = 0;
//     }
//     this._waterAmount = value;
//   }

//   get waterAmount() {
//     return this._waterAmount;
//   }

//   constructor(power) {
//     this._power = power;
//   }

// }

// // create the coffee machine
// let coffeeMachine = new CoffeeMachine(100);

// // add water
// coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10
// Now the access is under control, so setting the water amount below zero becomes impossible.

// Read-only “power”
// For power property, let’s make it read-only. It sometimes happens that a property must be set at creation time only, and then never modified.

// That’s exactly the case for a coffee machine: power never changes.

// To do so, we only need to make getter, but not the setter:

// class CoffeeMachine {
//   // ...

//   constructor(power) {
//     this._power = power;
//   }

//   get power() {
//     return this._power;
//   }

// }

// // create the coffee machine
// let coffeeMachine = new CoffeeMachine(100);

// console.log(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

// coffeeMachine.power = 25; // Error (no setter)
// Getter/setter functions
// Here we used getter/setter syntax.

// But most of the time get.../set... functions are preferred, like this:

// class CoffeeMachine {
//   _waterAmount = 0;

//   setWaterAmount(value) {
//     if (value < 0) value = 0;
//     this._waterAmount = value;
//   }

//   getWaterAmount() {
//     return this._waterAmount;
//   }
// }

// new CoffeeMachine().setWaterAmount(100);
// That looks a bit longer, but functions are more flexible. They can accept multiple arguments (even if we don’t need them right now).

// On the other hand, get/set syntax is shorter, so ultimately there’s no strict rule, it’s up to you to decide.

// Protected fields are inherited
// If we inherit class MegaMachine extends CoffeeMachine, then nothing prevents us from accessing this._waterAmount or this._power from the methods of the new class.

// So protected fields are naturally inheritable. Unlike private ones that we’ll see below.

// Private “#waterLimit”
// A recent addition
// This is a recent addition to the language. Not supported in JavaScript engines, or supported partially yet, requires polyfilling.
// There’s a finished JavaScript proposal, almost in the standard, that provides language-level support for private properties and methods.

// Privates should start with #. They are only accessible from inside the class.

// For instance, here’s a private #waterLimit property and the water-checking private method #fixWaterAmount:

// class CoffeeMachine {
//   #waterLimit = 200;

//   #fixWaterAmount(value) {
//     if (value < 0) return 0;
//     if (value > this.#waterLimit) return this.#waterLimit;
//   }

//   setWaterAmount(value) {
//     this.#waterLimit = this.#fixWaterAmount(value);
//   }

// }

// let coffeeMachine = new CoffeeMachine();

// // can't access privates from outside of the class
// coffeeMachine.#fixWaterAmount(123); // Error
// coffeeMachine.#waterLimit = 1000; // Error
// On the language level, # is a special sign that the field is private. We can’t access it from outside or from inheriting classes.

// Private fields do not conflict with public ones. We can have both private #waterAmount and public waterAmount fields at the same time.

// For instance, let’s make waterAmount an accessor for #waterAmount:

// class CoffeeMachine {

//   #waterAmount = 0;

//   get waterAmount() {
//     return this.#waterAmount;
//   }

//   set waterAmount(value) {
//     if (value < 0) value = 0;
//     this.#waterAmount = value;
//   }
// }

// let machine = new CoffeeMachine();

// machine.waterAmount = 100;
// console.log(machine.#waterAmount); // Error
// Unlike protected ones, private fields are enforced by the language itself. That’s a good thing.

// But if we inherit from CoffeeMachine, then we’ll have no direct access to #waterAmount. We’ll need to rely on waterAmount getter/setter:

// class MegaCoffeeMachine extends CoffeeMachine {
//   method() {
//     console.log( this.#waterAmount ); // Error: can only access from CoffeeMachine
//   }
// }
// In many scenarios such limitation is too severe. If we extend a CoffeeMachine, we may have legitimate reasons to access its internals. That’s why protected fields are used more often, even though they are not supported by the language syntax.

// Private fields are not available as this[name]
// Private fields are special.

// As we know, usually we can access fields using this[name]:

// class User {
//   ...
//   sayHi() {
//     let fieldName = "name";
//     console.log(`Hello, ${this[fieldName]}`);
//   }
// }
// With private fields that’s impossible: this['#name'] doesn’t work. That’s a syntax limitation to ensure privacy.

// Summary
// In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.

// It gives the following benefits:

// Protection for users, so that they don’t shoot themselves in the foot
// Imagine, there’s a team of developers using a coffee machine. It was made by the “Best CoffeeMachine” company, and works fine, but a protective cover was removed. So the internal interface is exposed.

// All developers are civilized – they use the coffee machine as intended. But one of them, John, decided that he’s the smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.

// That’s surely not John’s fault, but rather the person who removed the protective cover and let John do his manipulations.

// The same in programming. If a user of a class will change things not intended to be changed from the outside – the consequences are unpredictable.

// Supportable
// The situation in programming is more complex than with a real-life coffee machine, because we don’t just buy it once. The code constantly undergoes development and improvement.

// If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.

// If you’re a developer of such class, it’s great to know that private methods can be safely renamed, their parameters can be changed, and even removed, because no external code depends on them.

// For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface is the same.

// Hiding complexity
// People adore using things that are simple. At least from outside. What’s inside is a different thing.

// Programmers are not an exception.

// It’s always convenient when implementation details are hidden, and a simple, well-documented external interface is available.

// To hide an internal interface we use either protected or private properties:

// Protected fields start with _. That’s a well-known convention, not enforced at the language level. Programmers should only access a field starting with _ from its class and classes inheriting from it.
// Private fields start with #. JavaScript makes sure we can only access those from inside the class.
// Right now, private fields are not well-supported among browsers, but can be polyfilled.
// //////////////////////////////////////

// ///////////////////////////////////////

// // Private and protected properties and methods

// //////////////////////////////////////

// // Extending built-in classes
// Extending built-in classes
// Built-in classes like Array, Map and others are extendable also.

// For instance, here PowerArray inherits from the native Array:

// // add one more method to it (can do more)
// class PowerArray extends Array {
//   isEmpty() {
//     return this.length === 0;
//   }
// }

// let arr = new PowerArray(1, 2, 5, 10, 50);
// console.log(arr.isEmpty()); // false

// let filteredArr = arr.filter(item => item >= 10);
// console.log(filteredArr); // 10, 50
// console.log(filteredArr.isEmpty()); // false
// Please note a very interesting thing. Built-in methods like filter, map and others – return new objects of exactly the inherited type PowerArray. Their internal implementation uses the object’s constructor property for that.

// In the example above,

// arr.constructor === PowerArray
// When arr.filter() is called, it internally creates the new array of results using exactly arr.constructor, not basic Array. That’s actually very cool, because we can keep using PowerArray methods further on the result.

// Even more, we can customize that behavior.

// We can add a special static getter Symbol.species to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in map, filter and so on.

// If we’d like built-in methods like map or filter to return regular arrays, we can return Array in Symbol.species, like here:

// class PowerArray extends Array {
//   isEmpty() {
//     return this.length === 0;
//   }

//   // built-in methods will use this as the constructor
//   static get [Symbol.species]() {
//     return Array;
//   }
// }

// let arr = new PowerArray(1, 2, 5, 10, 50);
// console.log(arr.isEmpty()); // false

// // filter creates new array using arr.constructor[Symbol.species] as constructor
// let filteredArr = arr.filter(item => item >= 10);

// // filteredArr is not PowerArray, but Array
// console.log(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
// As you can see, now .filter returns Array. So the extended functionality is not passed any further.

// Other collections work similarly
// Other collections, such as Map and Set, work alike. They also use Symbol.species.

// No static inheritance in built-ins
// Built-in objects have their own static methods, for instance Object.keys, Array.isArray etc.

// As we already know, native classes extend each other. For instance, Array extends Object.

// Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article Static properties and methods.

// But built-in classes are an exception. They don’t inherit statics from each other.

// For example, both Array and Date inherit from Object, so their instances have methods from Object.prototype. But Array.[[Prototype]] does not reference Object, so there’s no, for instance, Array.keys() (or Date.keys()) static method.

// Here’s the picture structure for Date and Object:

// As you can see, there’s no link between Date and Object. They are independent, only Date.prototype inherits from Object.prototype.

// That’s an important difference of inheritance between built-in objects compared to what we get with extends.
// //////////////////////////////////////

// // Class checking: "instanceof"
// Class checking: "instanceof"
// The instanceof operator allows to check whether an object belongs to a certain class. It also takes inheritance into account.

// Such a check may be necessary in many cases. For example, it can be used for building a polymorphic function, the one that treats arguments differently depending on their type.

// The instanceof operator
// The syntax is:

// obj instanceof Class
// It returns true if obj belongs to the Class or a class inheriting from it.

// For instance:

// class Rabbit {}
// let rabbit = new Rabbit();

// // is it an object of Rabbit class?
// console.log( rabbit instanceof Rabbit ); // true
// It also works with constructor functions:

// // instead of class
// function Rabbit() {}

// console.log( new Rabbit() instanceof Rabbit ); // true
// …And with built-in classes like Array:

// let arr = [1, 2, 3];
// console.log( arr instanceof Array ); // true
// console.log( arr instanceof Object ); // true
// Please note that arr also belongs to the Object class. That’s because Array prototypically inherits from Object.

// Normally, instanceof examines the prototype chain for the check. We can also set a custom logic in the static method Symbol.hasInstance.

// The algorithm of obj instanceof Class works roughly as follows:

// If there’s a static method Symbol.hasInstance, then just call it: Class[Symbol.hasInstance](obj). It should return either true or false, and we’re done. That’s how we can customize the behavior of instanceof.

// For example:

// // setup instanceOf check that assumes that
// // anything with canEat property is an animal
// class Animal {
//   static [Symbol.hasInstance](obj) {
//     if (obj.canEat) return true;
//   }
// }

// let obj = { canEat: true };

// console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called
// Most classes do not have Symbol.hasInstance. In that case, the standard logic is used: obj instanceOf Class checks whether Class.prototype is equal to one of the prototypes in the obj prototype chain.

// In other words, compare one after another:

// obj.__proto__ === Class.prototype?
// obj.__proto__.__proto__ === Class.prototype?
// obj.__proto__.__proto__.__proto__ === Class.prototype?
// ...
// // if any answer is true, return true
// // otherwise, if we reached the end of the chain, return false
// In the example above rabbit.__proto__ === Rabbit.prototype, so that gives the answer immediately.

// In the case of an inheritance, the match will be at the second step:

// class Animal {}
// class Rabbit extends Animal {}

// let rabbit = new Rabbit();
// console.log(rabbit instanceof Animal); // true

// // rabbit.__proto__ === Animal.prototype (no match)
// // rabbit.__proto__.__proto__ === Animal.prototype (match!)
// Here’s the illustration of what rabbit instanceof Animal compares with Animal.prototype:

// By the way, there’s also a method objA.isPrototypeOf(objB), that returns true if objA is somewhere in the chain of prototypes for objB. So the test of obj instanceof Class can be rephrased as Class.prototype.isPrototypeOf(obj).

// It’s funny, but the Class constructor itself does not participate in the check! Only the chain of prototypes and Class.prototype matters.

// That can lead to interesting consequences when a prototype property is changed after the object is created.

// Like here:

// function Rabbit() {}
// let rabbit = new Rabbit();

// // changed the prototype
// Rabbit.prototype = {};

// // ...not a rabbit any more!
// console.log( rabbit instanceof Rabbit ); // false
// Bonus: Object.prototype.toString for the type
// We already know that plain objects are converted to string as [object Object]:

// let obj = {};

// console.log(obj); // [object Object]
// console.log(obj.toString()); // the same
// That’s their implementation of toString. But there’s a hidden feature that makes toString actually much more powerful than that. We can use it as an extended typeof and an alternative for instanceof.

// Sounds strange? Indeed. Let’s demystify.

// By specification, the built-in toString can be extracted from the object and executed in the context of any other value. And its result depends on that value.

// For a number, it will be [object Number]
// For a boolean, it will be [object Boolean]
// For null: [object Null]
// For undefined: [object Undefined]
// For arrays: [object Array]
// …etc (customizable).
// Let’s demonstrate:

// // copy toString method into a variable for convenience
// let objectToString = Object.prototype.toString;

// // what type is this?
// let arr = [];

// console.log( objectToString.call(arr) ); // [object Array]
// Here we used call as described in the chapter Decorators and forwarding, call/apply to execute the function objectToString in the context this=arr.

// Internally, the toString algorithm examines this and returns the corresponding result. More examples:

// let s = Object.prototype.toString;

// console.log( s.call(123) ); // [object Number]
// console.log( s.call(null) ); // [object Null]
// console.log( s.call(console.log) ); // [object Function]
// Symbol.toStringTag
// The behavior of Object toString can be customized using a special object property Symbol.toStringTag.

// For instance:

// let user = {
//   [Symbol.toStringTag]: "User"
// };

// console.log( {}.toString.call(user) ); // [object User]
// For most environment-specific objects, there is such a property. Here are some browser specific examples:

// // toStringTag for the environment-specific object and class:
// console.log( window[Symbol.toStringTag]); // Window
// console.log( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

// console.log( {}.toString.call(window) ); // [object Window]
// console.log( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
// As you can see, the result is exactly Symbol.toStringTag (if exists), wrapped into [object ...].

// At the end we have “typeof on steroids” that not only works for primitive data types, but also for built-in objects and even can be customized.

// We can use {}.toString.call instead of instanceof for built-in objects when we want to get the type as a string rather than just to check.

// Summary
// Let’s summarize the type-checking methods that we know:

// works for	returns
// typeof	primitives	string
// {}.toString	primitives, built-in objects, objects with Symbol.toStringTag	string
// instanceof	objects	true/false
// As we can see, {}.toString is technically a “more advanced” typeof.

// And instanceof operator really shines when we are working with a class hierarchy and want to check for the class taking into account inheritance.
// //////////////////////////////////////

// // Mixins
// Mixins
// In JavaScript we can only inherit from a single object. There can be only one [[Prototype]] for an object. And a class may extend only one other class.

// But sometimes that feels limiting. For instance, we have a class StreetSweeper and a class Bicycle, and want to make their mix: a StreetSweepingBicycle.

// Or we have a class User and a class EventEmitter that implements event generation, and we’d like to add the functionality of EventEmitter to User, so that our users can emit events.

// There’s a concept that can help here, called “mixins”.

// As defined in Wikipedia, a mixin is a class containing methods that can be used by other classes without a need to inherit from it.

// In other words, a mixin provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes.

// A mixin example
// The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.

// For instance here the mixin sayHiMixin is used to add some “speech” for User:

// // mixin
// let sayHiMixin = {
//   sayHi() {
//     console.log(`Hello ${this.name}`);
//   },
//   sayBye() {
//     console.log(`Bye ${this.name}`);
//   }
// };

// // usage:
// class User {
//   constructor(name) {
//     this.name = name;
//   }
// }

// // copy the methods
// Object.assign(User.prototype, sayHiMixin);

// // now User can say hi
// new User("Dude").sayHi(); // Hello Dude!
// There’s no inheritance, but a simple method copying. So User may inherit from another class and also include the mixin to “mix-in” the additional methods, like this:

// class User extends Person {
//   // ...
// }

// Object.assign(User.prototype, sayHiMixin);
// Mixins can make use of inheritance inside themselves.

// For instance, here sayHiMixin inherits from sayMixin:

// let sayMixin = {
//   say(phrase) {
//     console.log(phrase);
//   }
// };

// let sayHiMixin = {
//   __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

//   sayHi() {
//     // call parent method
//     super.say(`Hello ${this.name}`); // (*)
//   },
//   sayBye() {
//     super.say(`Bye ${this.name}`); // (*)
//   }
// };

// class User {
//   constructor(name) {
//     this.name = name;
//   }
// }

// // copy the methods
// Object.assign(User.prototype, sayHiMixin);

// // now User can say hi
// new User("Dude").sayHi(); // Hello Dude!
// Please note that the call to the parent method super.say() from sayHiMixin (at lines labelled with (*)) looks for the method in the prototype of that mixin, not the class.

// Here’s the diagram (see the right part):

// That’s because methods sayHi and sayBye were initially created in sayHiMixin. So even though they got copied, their [[HomeObject]] internal property references sayHiMixin, as shown in the picture above.

// As super looks for parent methods in [[HomeObject]].[[Prototype]], that means it searches sayHiMixin.[[Prototype]].

// EventMixin
// Now let’s make a mixin for real life.

// An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to “broadcast information” to anyone who wants it. So let’s make a mixin that allows us to easily add event-related functions to any class/object.

// The mixin will provide a method .trigger(name, [...data]) to “generate an event” when something important happens to it. The name argument is a name of the event, optionally followed by additional arguments with event data.
// Also the method .on(name, handler) that adds handler function as the listener to events with the given name. It will be called when an event with the given name triggers, and get the arguments from the .trigger call.
// …And the method .off(name, handler) that removes the handler listener.
// After adding the mixin, an object user will be able to generate an event "login" when the visitor logs in. And another object, say, calendar may want to listen for such events to load the calendar for the logged-in person.

// Or, a menu can generate the event "select" when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

// Here’s the code:

// let eventMixin = {
//   /**
//    * Subscribe to event, usage:
//    *  menu.on('select', function(item) { ... }
//   */
//   on(eventName, handler) {
//     if (!this._eventHandlers) this._eventHandlers = {};
//     if (!this._eventHandlers[eventName]) {
//       this._eventHandlers[eventName] = [];
//     }
//     this._eventHandlers[eventName].push(handler);
//   },

//   /**
//    * Cancel the subscription, usage:
//    *  menu.off('select', handler)
//    */
//   off(eventName, handler) {
//     let handlers = this._eventHandlers?.[eventName];
//     if (!handlers) return;
//     for (let i = 0; i < handlers.length; i++) {
//       if (handlers[i] === handler) {
//         handlers.splice(i--, 1);
//       }
//     }
//   },

//   /**
//    * Generate an event with the given name and data
//    *  this.trigger('select', data1, data2);
//    */
//   trigger(eventName, ...args) {
//     if (!this._eventHandlers?.[eventName]) {
//       return; // no handlers for that event name
//     }

//     // call the handlers
//     this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
//   }
// };
// .on(eventName, handler) – assigns function handler to run when the event with that name occurs. Technically, there’s an _eventHandlers property that stores an array of handlers for each event name, and it just adds it to the list.
// .off(eventName, handler) – removes the function from the handlers list.
// .trigger(eventName, ...args) – generates the event: all handlers from _eventHandlers[eventName] are called, with a list of arguments ...args.
// Usage:

// // Make a class
// class Menu {
//   choose(value) {
//     this.trigger("select", value);
//   }
// }
// // Add the mixin with event-related methods
// Object.assign(Menu.prototype, eventMixin);

// let menu = new Menu();

// // add a handler, to be called on selection:
// menu.on("select", value => console.log(`Value selected: ${value}`));

// // triggers the event => the handler above runs and shows:
// // Value selected: 123
// menu.choose("123");
// Now, if we’d like any code to react to a menu selection, we can listen for it with menu.on(...).

// And eventMixin mixin makes it easy to add such behavior to as many classes as we’d like, without interfering with the inheritance chain.

// Summary
// Mixin – is a generic object-oriented programming term: a class that contains methods for other classes.

// Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

// We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling as we have seen above.

// Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.
// //////////////////////////////////////
