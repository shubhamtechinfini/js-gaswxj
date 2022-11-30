// // Introduction to browser events
// Introduction to browser events
// An event is a signal that something has happened. All DOM nodes generate such signals (but events are not limited to DOM).

// Here’s a list of the most useful DOM events, just to take a look at:

// Mouse events:

// click – when the mouse clicks on an element (touchscreen devices generate it on a tap).
// contextmenu – when the mouse right-clicks on an element.
// mouseover / mouseout – when the mouse cursor comes over / leaves an element.
// mousedown / mouseup – when the mouse button is pressed / released over an element.
// mousemove – when the mouse is moved.
// Keyboard events:

// keydown and keyup – when a keyboard key is pressed and released.
// Form element events:

// submit – when the visitor submits a <form>.
// focus – when the visitor focuses on an element, e.g. on an <input>.
// Document events:

// DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built.
// CSS events:

// transitionend – when a CSS-animation finishes.
// There are many other events. We’ll get into more details of particular events in upcoming chapters.

// Event handlers
// To react on events we can assign a handler – a function that runs in case of an event.

// Handlers are a way to run JavaScript code in case of user actions.

// There are several ways to assign a handler. Let’s see them, starting from the simplest one.

// HTML-attribute
// A handler can be set in HTML with an attribute named on<event>.

// For instance, to assign a click handler for an input, we can use onclick, like here:

// <input value="Click me" onclick="console.log('Click!')" type="button">
// On mouse click, the code inside onclick runs.

// Please note that inside onclick we use single quotes, because the attribute itself is in double quotes. If we forget that the code is inside the attribute and use double quotes inside, like this: onclick="console.log("Click!")", then it won’t work right.

// An HTML-attribute is not a convenient place to write a lot of code, so we’d better create a JavaScript function and call it there.

// Here a click runs the function countRabbits():

// <script>
//   function countRabbits() {
//     for(let i=1; i<=3; i++) {
//       console.log("Rabbit number " + i);
//     }
//   }
// </script>

// <input type="button" onclick="countRabbits()" value="Count rabbits!">

// As we know, HTML attribute names are not case-sensitive, so ONCLICK works as well as onClick and onCLICK… But usually attributes are lowercased: onclick.

// DOM property
// We can assign a handler using a DOM property on<event>.

// For instance, elem.onclick:

// <input id="elem" type="button" value="Click me">
// <script>
//   elem.onclick = function() {
//     console.log('Thank you');
//   };
// </script>

// If the handler is assigned using an HTML-attribute then the browser reads it, creates a new function from the attribute content and writes it to the DOM property.

// So this way is actually the same as the previous one.

// These two code pieces work the same:

// Only HTML:

// <input type="button" onclick="console.log('Click!')" value="Button">

// HTML + JS:

// <input type="button" id="button" value="Button">
// <script>
//   button.onclick = function() {
//     console.log('Click!');
//   };
// </script>

// In the first example, the HTML attribute is used to initialize the button.onclick, while in the second example – the script, that’s all the difference.

// As there’s only one onclick property, we can’t assign more than one event handler.

// In the example below adding a handler with JavaScript overwrites the existing handler:

// <input type="button" id="elem" onclick="console.log('Before')" value="Click me">
// <script>
//   elem.onclick = function() { // overwrites the existing handler
//     console.log('After'); // only this will be shown
//   };
// </script>

// To remove a handler – assign elem.onclick = null.

// Accessing the element: this
// The value of this inside a handler is the element. The one which has the handler on it.

// In the code below button shows its contents using this.innerHTML:

// <button onclick="console.log(this.innerHTML)">Click me</button>

// Possible mistakes
// If you’re starting to work with events – please note some subtleties.

// We can set an existing function as a handler:

// function sayThanks() {
//   console.log('Thanks!');
// }

// elem.onclick = sayThanks;
// But be careful: the function should be assigned as sayThanks, not sayThanks().

// // right
// button.onclick = sayThanks;

// // wrong
// button.onclick = sayThanks();
// If we add parentheses, then sayThanks() becomes a function call. So the last line actually takes the result of the function execution, that is undefined (as the function returns nothing), and assigns it to onclick. That doesn’t work.

// …On the other hand, in the markup we do need the parentheses:

// <input type="button" id="button" onclick="sayThanks()">
// The difference is easy to explain. When the browser reads the attribute, it creates a handler function with body from the attribute content.

// So the markup generates this property:

// button.onclick = function() {
//   sayThanks(); // <-- the attribute content goes here
// };
// Don’t use setAttribute for handlers.

// Such a call won’t work:

// // a click on <body> will generate errors,
// // because attributes are always strings, function becomes a string
// document.body.setAttribute('onclick', function() { console.log(1) });
// DOM-property case matters.

// Assign a handler to elem.onclick, not elem.ONCLICK, because DOM properties are case-sensitive.

// addEventListener
// The fundamental problem of the aforementioned ways to assign handlers is that we can’t assign multiple handlers to one event.

// Let’s say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.

// We’d like to assign two event handlers for that. But a new DOM property will overwrite the existing one:

// input.onclick = function() { console.log(1); }
// // ...
// input.onclick = function() { console.log(2); } // replaces the previous handler
// Developers of web standards understood that long ago and suggested an alternative way of managing handlers using the special methods addEventListener and removeEventListener which aren’t bound by such constraint.

// The syntax to add a handler:

// element.addEventListener(event, handler, [options]);
// event
// Event name, e.g. "click".
// handler
// The handler function.
// options
// An additional optional object with properties:
// once: if true, then the listener is automatically removed after it triggers.
// capture: the phase where to handle the event, to be covered later in the chapter Bubbling and capturing. For historical reasons, options can also be false/true, that’s the same as {capture: false/true}.
// passive: if true, then the handler will not call preventDefault(), we’ll explain that later in Browser default actions.
// To remove the handler, use removeEventListener:

// element.removeEventListener(event, handler, [options]);
// Removal requires the same function
// To remove a handler we should pass exactly the same function as was assigned.

// This doesn’t work:

// elem.addEventListener( "click" , () => console.log('Thanks!'));
// // ....
// elem.removeEventListener( "click", () => console.log('Thanks!'));
// The handler won’t be removed, because removeEventListener gets another function – with the same code, but that doesn’t matter, as it’s a different function object.

// Here’s the right way:

// function handler() {
//   console.log( 'Thanks!' );
// }

// input.addEventListener("click", handler);
// // ....
// input.removeEventListener("click", handler);
// Please note – if we don’t store the function in a variable, then we can’t remove it. There’s no way to “read back” handlers assigned by addEventListener.

// Multiple calls to addEventListener allow it to add multiple handlers, like this:

// <input id="elem" type="button" value="Click me"/>

// <script>
//   function handler1() {
//     console.log('Thanks!');
//   };

//   function handler2() {
//     console.log('Thanks again!');
//   }

//   elem.onclick = () => console.log("Hello");
//   elem.addEventListener("click", handler1); // Thanks!
//   elem.addEventListener("click", handler2); // Thanks again!
// </script>
// As we can see in the example above, we can set handlers both using a DOM-property and addEventListener. But generally we use only one of these ways.

// For some events, handlers only work with addEventListener
// There exist events that can’t be assigned via a DOM-property. Only with addEventListener.

// For instance, the DOMContentLoaded event, that triggers when the document is loaded and the DOM has been built.

// // will never run
// document.onDOMContentLoaded = function() {
//   console.log("DOM built");
// };
// // this way it works
// document.addEventListener("DOMContentLoaded", function() {
//   console.log("DOM built");
// });
// So addEventListener is more universal. Although, such events are an exception rather than the rule.

// Event object
// To properly handle an event we’d want to know more about what’s happened. Not just a “click” or a “keydown”, but what were the pointer coordinates? Which key was pressed? And so on.

// When an event happens, the browser creates an event object, puts details into it and passes it as an argument to the handler.

// Here’s an example of getting pointer coordinates from the event object:

// <input type="button" value="Click me" id="elem">

// <script>
//   elem.onclick = function(event) {
//     // show event type, element and coordinates of the click
//     console.log(event.type + " at " + event.currentTarget);
//     console.log("Coordinates: " + event.clientX + ":" + event.clientY);
//   };
// </script>
// Some properties of event object:

// event.type
// Event type, here it’s "click".
// event.currentTarget
// Element that handled the event. That’s exactly the same as this, unless the handler is an arrow function, or its this is bound to something else, then we can get the element from event.currentTarget.
// event.clientX / event.clientY
// Window-relative coordinates of the cursor, for pointer events.
// There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events – another one, we’ll study them later when as we move on to the details of different events.

// The event object is also available in HTML handlers
// If we assign a handler in HTML, we can also use the event object, like this:

// <input type="button" onclick="console.log(event.type)" value="Event type">

// That’s possible because when the browser reads the attribute, it creates a handler like this: function(event) { console.log(event.type) }. That is: its first argument is called "event", and the body is taken from the attribute.

// Object handlers: handleEvent
// We can assign not just a function, but an object as an event handler using addEventListener. When an event occurs, its handleEvent method is called.

// For instance:

// <button id="elem">Click me</button>

// <script>
//   let obj = {
//     handleEvent(event) {
//       console.log(event.type + " at " + event.currentTarget);
//     }
//   };

//   elem.addEventListener('click', obj);
// </script>
// As we can see, when addEventListener receives an object as the handler, it calls obj.handleEvent(event) in case of an event.

// We could also use objects of a custom class, like this:

// <button id="elem">Click me</button>

// <script>
//   class Menu {
//     handleEvent(event) {
//       switch(event.type) {
//         case 'mousedown':
//           elem.innerHTML = "Mouse button pressed";
//           break;
//         case 'mouseup':
//           elem.innerHTML += "...and released.";
//           break;
//       }
//     }
//   }

//   let menu = new Menu();

//   elem.addEventListener('mousedown', menu);
//   elem.addEventListener('mouseup', menu);
// </script>
// Here the same object handles both events. Please note that we need to explicitly setup the events to listen using addEventListener. The menu object only gets mousedown and mouseup here, not any other types of events.

// The method handleEvent does not have to do all the job by itself. It can call other event-specific methods instead, like this:

// <button id="elem">Click me</button>

// <script>
//   class Menu {
//     handleEvent(event) {
//       // mousedown -> onMousedown
//       let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
//       this[method](event);
//     }

//     onMousedown() {
//       elem.innerHTML = "Mouse button pressed";
//     }

//     onMouseup() {
//       elem.innerHTML += "...and released.";
//     }
//   }

//   let menu = new Menu();
//   elem.addEventListener('mousedown', menu);
//   elem.addEventListener('mouseup', menu);
// </script>
// Now event handlers are clearly separated, that may be easier to support.

// Summary
// There are 3 ways to assign event handlers:

// HTML attribute: onclick="...".
// DOM property: elem.onclick = function.
// Methods: elem.addEventListener(event, handler[, phase]) to add, removeEventListener to remove.
// HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can’t write lots of code in there.

// DOM properties are ok to use, but we can’t assign more than one handler of the particular event. In many cases that limitation is not pressing.

// The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance transitionend and DOMContentLoaded (to be covered). Also addEventListener supports objects as event handlers. In that case the method handleEvent is called in case of the event.

// No matter how you assign the handler – it gets an event object as the first argument. That object contains the details about what’s happened.

// We’ll learn more about events in general and about different types of events in the next chapters.

// ///////////////////////////////////////////////////////////////////

// // Bubbling and capturing
// Bubbling and capturing
// Let’s start with an example.

// This handler is assigned to <div>, but also runs if you click any nested tag like <em> or <code>:

// <div onclick="console.log('The handler!')">
//   <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
// </div>

// Isn’t it a bit strange? Why does the handler on <div> run if the actual click was on <em>?

// Bubbling
// The bubbling principle is simple.

// When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

// Let’s say we have 3 nested elements FORM > DIV > P with a handler on each of them:

// <style>
//   body * {
//     margin: 10px;
//     border: 1px solid blue;
//   }
// </style>

// <form onclick="console.log('form')">FORM
//   <div onclick="console.log('div')">DIV
//     <p onclick="console.log('p')">P</p>
//   </div>
// </form>

// A click on the inner <p> first runs onclick:

// On that <p>.
// Then on the outer <div>.
// Then on the outer <form>.
// And so on upwards till the document object.

// So if we click on <p>, then we’ll see 3 console.logs: p → div → form.

// The process is called “bubbling”, because events “bubble” from the inner element up through parents like a bubble in the water.

// Almost all events bubble.
// The key word in this phrase is “almost”.

// For instance, a focus event does not bubble. There are other examples too, we’ll meet them. But still it’s an exception, rather than a rule, most events do bubble.

// event.target
// A handler on a parent element can always get the details about where it actually happened.

// The most deeply nested element that caused the event is called a target element, accessible as event.target.

// Note the differences from this (=event.currentTarget):

// event.target – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
// this – is the “current” element, the one that has a currently running handler on it.
// For instance, if we have a single handler form.onclick, then it can “catch” all clicks inside the form. No matter where the click happened, it bubbles up to <form> and runs the handler.

// In form.onclick handler:

// this (=event.currentTarget) is the <form> element, because the handler runs on it.
// event.target is the actual element inside the form that was clicked.
// Check it out:

// Resultscript.jsexample.cssindex.html

// It’s possible that event.target could equal this – it happens when the click is made directly on the <form> element.

// Stopping bubbling
// A bubbling event goes from the target element straight up. Normally it goes upwards till <html>, and then to document object, and some events even reach window, calling all handlers on the path.

// But any handler may decide that the event has been fully processed and stop the bubbling.

// The method for it is event.stopPropagation().

// For instance, here body.onclick doesn’t work if you click on <button>:

// <body onclick="console.log(`the bubbling doesn't reach here`)">
//   <button onclick="event.stopPropagation()">Click me</button>
// </body>

// event.stopImmediatePropagation()
// If an element has multiple event handlers on a single event, then even if one of them stops the bubbling, the other ones still execute.

// In other words, event.stopPropagation() stops the move upwards, but on the current element all other handlers will run.

// To stop the bubbling and prevent handlers on the current element from running, there’s a method event.stopImmediatePropagation(). After it no other handlers execute.

// Don’t stop bubbling without a need!
// Bubbling is convenient. Don’t stop it without a real need: obvious and architecturally well thought out.

// Sometimes event.stopPropagation() creates hidden pitfalls that later may become problems.

// For instance:

// We create a nested menu. Each submenu handles clicks on its elements and calls stopPropagation so that the outer menu won’t trigger.
// Later we decide to catch clicks on the whole window, to track users’ behavior (where people click). Some analytic systems do that. Usually the code uses document.addEventListener('click'…) to catch all clicks.
// Our analytic won’t work over the area where clicks are stopped by stopPropagation. Sadly, we’ve got a “dead zone”.
// There’s usually no real need to prevent the bubbling. A task that seemingly requires that may be solved by other means. One of them is to use custom events, we’ll cover them later. Also we can write our data into the event object in one handler and read it in another one, so we can pass to handlers on parents information about the processing below.

// Capturing
// There’s another phase of event processing called “capturing”. It is rarely used in real code, but sometimes can be useful.

// The standard DOM Events describes 3 phases of event propagation:

// Capturing phase – the event goes down to the element.
// Target phase – the event reached the target element.
// Bubbling phase – the event bubbles up from the element.
// Here’s the picture, taken from the specification, of the capturing (1), target (2) and bubbling (3) phases for a click event on a <td> inside a table:

// That is: for a click on <td> the event first goes through the ancestors chain down to the element (capturing phase), then it reaches the target and triggers there (target phase), and then it goes up (bubbling phase), calling handlers on its way.

// Until now, we only talked about bubbling, because the capturing phase is rarely used.

// In fact, the capturing phase was invisible for us, because handlers added using on<event>-property or using HTML attributes or using two-argument addEventListener(event, handler) don’t know anything about capturing, they only run on the 2nd and 3rd phases.

// To catch an event on the capturing phase, we need to set the handler capture option to true:

// elem.addEventListener(..., {capture: true})

// // or, just "true" is an alias to {capture: true}
// elem.addEventListener(..., true)
// There are two possible values of the capture option:

// If it’s false (default), then the handler is set on the bubbling phase.
// If it’s true, then the handler is set on the capturing phase.
// Note that while formally there are 3 phases, the 2nd phase (“target phase”: the event reached the element) is not handled separately: handlers on both capturing and bubbling phases trigger at that phase.

// Let’s see both capturing and bubbling in action:

// <style>
//   body * {
//     margin: 10px;
//     border: 1px solid blue;
//   }
// </style>

// <form>FORM
//   <div>DIV
//     <p>P</p>
//   </div>
// </form>

// <script>
//   for(let elem of document.querySelectorAll('*')) {
//     elem.addEventListener("click", e => console.log(`Capturing: ${elem.tagName}`), true);
//     elem.addEventListener("click", e => console.log(`Bubbling: ${elem.tagName}`));
//   }
// </script>

// The code sets click handlers on every element in the document to see which ones are working.

// If you click on <p>, then the sequence is:

// HTML → BODY → FORM → DIV -> P (capturing phase, the first listener):
// P → DIV → FORM → BODY → HTML (bubbling phase, the second listener).
// Please note, the P shows up twice, because we’ve set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.

// There’s a property event.eventPhase that tells us the number of the phase on which the event was caught. But it’s rarely used, because we usually know it in the handler.

// To remove the handler, removeEventListener needs the same phase
// If we addEventListener(..., true), then we should mention the same phase in removeEventListener(..., true) to correctly remove the handler.

// Listeners on the same element and same phase run in their set order
// If we have multiple event handlers on the same phase, assigned to the same element with addEventListener, they run in the same order as they are created:

// elem.addEventListener("click", e => console.log(1)); // guaranteed to trigger first
// elem.addEventListener("click", e => console.log(2));
// The event.stopPropagation() during the capturing also prevents the bubbling
// The event.stopPropagation() method and its sibling event.stopImmediatePropagation() can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

// In other words, normally the event goes first down (“capturing”) and then up (“bubbling”). But if event.stopPropagation() is called during the capturing phase, then the event travel stops, no bubbling will occur.

// Summary
// When an event happens – the most nested element where it happens gets labeled as the “target element” (event.target).

// Then the event moves down from the document root to event.target, calling handlers assigned with addEventListener(..., true) on the way (true is a shorthand for {capture: true}).
// Then handlers are called on the target element itself.
// Then the event bubbles up from event.target to the root, calling handlers assigned using on<event>, HTML attributes and addEventListener without the 3rd argument or with the 3rd argument false/{capture:false}.
// Each handler can access event object properties:

// event.target – the deepest element that originated the event.
// event.currentTarget (=this) – the current element that handles the event (the one that has the handler on it)
// event.eventPhase – the current phase (capturing=1, target=2, bubbling=3).
// Any event handler can stop the event by calling event.stopPropagation(), but that’s not recommended, because we can’t really be sure we won’t need it above, maybe for completely different things.

// The capturing phase is used very rarely, usually we handle events on bubbling. And there’s a logical explanation for that.

// In real world, when an accident happens, local authorities react first. They know best the area where it happened. Then higher-level authorities if needed.

// The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular <td> may be suited for that exactly <td>, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.

// Bubbling and capturing lay the foundation for “event delegation” – an extremely powerful event handling pattern that we study in the next chapter.
// ///////////////////////////////////////////////////////////////////

// // Event delegation

// Event delegation
// Capturing and bubbling allow us to implement one of the most powerful event handling patterns called event delegation.

// The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.

// In the handler we get event.target to see where the event actually happened and handle it.

// Let’s see an example – the Ba-Gua diagram reflecting the ancient Chinese philosophy.

// Here it is:

// The HTML is like this:

// <table>
//   <tr>
//     <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
//   </tr>
//   <tr>
//     <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>
//     <td class="n">...</td>
//     <td class="ne">...</td>
//   </tr>
//   <tr>...2 more lines of this kind...</tr>
//   <tr>...2 more lines of this kind...</tr>
// </table>
// The table has 9 cells, but there could be 99 or 9999, doesn’t matter.

// Our task is to highlight a cell <td> on click.

// Instead of assign an onclick handler to each <td> (can be many) – we’ll setup the “catch-all” handler on <table> element.

// It will use event.target to get the clicked element and highlight it.

// The code:

// let selectedTd;

// table.onclick = function(event) {
//   let target = event.target; // where was the click?

//   if (target.tagName != 'TD') return; // not on TD? Then we're not interested

//   highlight(target); // highlight it
// };

// function highlight(td) {
//   if (selectedTd) { // remove the existing highlight if any
//     selectedTd.classList.remove('highlight');
//   }
//   selectedTd = td;
//   selectedTd.classList.add('highlight'); // highlight the new td
// }
// Such a code doesn’t care how many cells there are in the table. We can add/remove <td> dynamically at any time and the highlighting will still work.

// Still, there’s a drawback.

// The click may occur not on the <td>, but inside it.

// In our case if we take a look inside the HTML, we can see nested tags inside <td>, like <strong>:

// <td>
//   <strong>Northwest</strong>
//   ...
// </td>
// Naturally, if a click happens on that <strong> then it becomes the value of event.target.

// In the handler table.onclick we should take such event.target and find out whether the click was inside <td> or not.

// Here’s the improved code:

// table.onclick = function(event) {
//   let td = event.target.closest('td'); // (1)

//   if (!td) return; // (2)

//   if (!table.contains(td)) return; // (3)

//   highlight(td); // (4)
// };
// Explanations:

// The method elem.closest(selector) returns the nearest ancestor that matches the selector. In our case we look for <td> on the way up from the source element.
// If event.target is not inside any <td>, then the call returns immediately, as there’s nothing to do.
// In case of nested tables, event.target may be a <td>, but lying outside of the current table. So we check if that’s actually our table’s <td>.
// And, if it’s so, then highlight it.
// As the result, we have a fast, efficient highlighting code, that doesn’t care about the total number of <td> in the table.

// Delegation example: actions in markup
// There are other uses for event delegation.

// Let’s say, we want to make a menu with buttons “Save”, “Load”, “Search” and so on. And there’s an object with methods save, load, search… How to match them?

// The first idea may be to assign a separate handler to each button. But there’s a more elegant solution. We can add a handler for the whole menu and data-action attributes for buttons that has the method to call:

// <button data-action="save">Click to Save</button>
// The handler reads the attribute and executes the method. Take a look at the working example:

// <div id="menu">
//   <button data-action="save">Save</button>
//   <button data-action="load">Load</button>
//   <button data-action="search">Search</button>
// </div>

// <script>
//   class Menu {
//     constructor(elem) {
//       this._elem = elem;
//       elem.onclick = this.onClick.bind(this); // (*)
//     }

//     save() {
//       console.log('saving');
//     }

//     load() {
//       console.log('loading');
//     }

//     search() {
//       console.log('searching');
//     }

//     onClick(event) {
//       let action = event.target.dataset.action;
//       if (action) {
//         this[action]();
//       }
//     };
//   }

//   new Menu(menu);
// </script>

// Please note that this.onClick is bound to this in (*). That’s important, because otherwise this inside it would reference the DOM element (elem), not the Menu object, and this[action] would not be what we need.

// So, what advantages does delegation give us here?

// We don’t need to write the code to assign a handler to each button. Just make a method and put it in the markup.
// The HTML structure is flexible, we can add/remove buttons at any time.
// We could also use classes .action-save, .action-load, but an attribute data-action is better semantically. And we can use it in CSS rules too.

// The “behavior” pattern
// We can also use event delegation to add “behaviors” to elements declaratively, with special attributes and classes.

// The pattern has two parts:

// We add a custom attribute to an element that describes its behavior.
// A document-wide handler tracks events, and if an event happens on an attributed element – performs the action.
// Behavior: Counter
// For instance, here the attribute data-counter adds a behavior: “increase value on click” to buttons:

// Counter: <input type="button" value="1" data-counter>
// One more counter: <input type="button" value="2" data-counter>

// <script>
//   document.addEventListener('click', function(event) {

//     if (event.target.dataset.counter != undefined) { // if the attribute exists...
//       event.target.value++;
//     }

//   });
// </script>

// If we click a button – its value is increased. Not buttons, but the general approach is important here.

// There can be as many attributes with data-counter as we want. We can add new ones to HTML at any moment. Using the event delegation we “extended” HTML, added an attribute that describes a new behavior.

// For document-level handlers – always addEventListener
// When we assign an event handler to the document object, we should always use addEventListener, not document.on<event>, because the latter will cause conflicts: new handlers overwrite old ones.

// For real projects it’s normal that there are many handlers on document set by different parts of the code.

// Behavior: Toggler
// One more example of behavior. A click on an element with the attribute data-toggle-id will show/hide the element with the given id:

// <button data-toggle-id="subscribe-mail">
//   Show the subscription form
// </button>

// <form id="subscribe-mail" hidden>
//   Your mail: <input type="email">
// </form>

// <script>
//   document.addEventListener('click', function(event) {
//     let id = event.target.dataset.toggleId;
//     if (!id) return;

//     let elem = document.getElementById(id);

//     elem.hidden = !elem.hidden;
//   });
// </script>

// Let’s note once again what we did. Now, to add toggling functionality to an element – there’s no need to know JavaScript, just use the attribute data-toggle-id.

// That may become really convenient – no need to write JavaScript for every such element. Just use the behavior. The document-level handler makes it work for any element of the page.

// We can combine multiple behaviors on a single element as well.

// The “behavior” pattern can be an alternative to mini-fragments of JavaScript.

// Summary
// Event delegation is really cool! It’s one of the most helpful patterns for DOM events.

// It’s often used to add the same handling for many similar elements, but not only for that.

// The algorithm:

// Put a single handler on the container.
// In the handler – check the source element event.target.
// If the event happened inside an element that interests us, then handle the event.
// Benefits:

// Simplifies initialization and saves memory: no need to add many handlers.
// Less code: when adding or removing elements, no need to add/remove handlers.
// DOM modifications: we can mass add/remove elements with innerHTML and the like.
// The delegation has its limitations of course:

// First, the event must be bubbling. Some events do not bubble. Also, low-level handlers should not use event.stopPropagation().
// Second, the delegation may add CPU load, because the container-level handler reacts on events in any place of the container, no matter whether they interest us or not. But usually the load is negligible, so we don’t take it into account.
// ///////////////////////////////////////////////////////////////////

// // Browser default actions

// Browser default actions
// Many events automatically lead to certain actions performed by the browser.

// For instance:

// A click on a link – initiates navigation to its URL.
// A click on a form submit button – initiates its submission to the server.
// Pressing a mouse button over a text and moving it – selects the text.
// If we handle an event in JavaScript, we may not want the corresponding browser action to happen, and want to implement another behavior instead.

// Preventing browser actions
// There are two ways to tell the browser we don’t want it to act:

// The main way is to use the event object. There’s a method event.preventDefault().
// If the handler is assigned using on<event> (not by addEventListener), then returning false also works the same.
// In this HTML, a click on a link doesn’t lead to navigation; the browser doesn’t do anything:

// <a href="/" onclick="return false">Click here</a>
// or
// <a href="/" onclick="event.preventDefault()">here</a>

// In the next example we’ll use this technique to create a JavaScript-powered menu.

// Returning false from a handler is an exception
// The value returned by an event handler is usually ignored.

// The only exception is return false from a handler assigned using on<event>.

// In all other cases, return value is ignored. In particular, there’s no sense in returning true.

// Example: the menu
// Consider a site menu, like this:

// <ul id="menu" class="menu">
//   <li><a href="/html">HTML</a></li>
//   <li><a href="/javascript">JavaScript</a></li>
//   <li><a href="/css">CSS</a></li>
// </ul>
// Here’s how it looks with some CSS:

// Menu items are implemented as HTML-links <a>, not buttons <button>. There are several reasons to do so, for instance:

// Many people like to use “right click” – “open in a new window”. If we use <button> or <span>, that doesn’t work.
// Search engines follow <a href="..."> links while indexing.
// So we use <a> in the markup. But normally we intend to handle clicks in JavaScript. So we should prevent the default browser action.

// Like here:

// menu.onclick = function(event) {
//   if (event.target.nodeName != 'A') return;

//   let href = event.target.getAttribute('href');
//   console.log( href ); // ...can be loading from the server, UI generation etc

//   return false; // prevent browser action (don't go to the URL)
// };
// If we omit return false, then after our code executes the browser will do its “default action” – navigating to the URL in href. And we don’t need that here, as we’re handling the click by ourselves.

// By the way, using event delegation here makes our menu very flexible. We can add nested lists and style them using CSS to “slide down”.

// Follow-up events
// Certain events flow one into another. If we prevent the first event, there will be no second.

// For instance, mousedown on an <input> field leads to focusing in it, and the focus event. If we prevent the mousedown event, there’s no focus.

// Try to click on the first <input> below – the focus event happens. But if you click the second one, there’s no focus.

// <input value="Focus works" onfocus="this.value=''">
// <input onmousedown="return false" onfocus="this.value=''" value="Click me">

// That’s because the browser action is canceled on mousedown. The focusing is still possible if we use another way to enter the input. For instance, the Tab key to switch from the 1st input into the 2nd. But not with the mouse click any more.

// The “passive” handler option
// The optional passive: true option of addEventListener signals the browser that the handler is not going to call preventDefault().

// Why might that be needed?

// There are some events like touchmove on mobile devices (when the user moves their finger across the screen), that cause scrolling by default, but that scrolling can be prevented using preventDefault() in the handler.

// So when the browser detects such event, it has first to process all handlers, and then if preventDefault is not called anywhere, it can proceed with scrolling. That may cause unnecessary delays and “jitters” in the UI.

// The passive: true options tells the browser that the handler is not going to cancel scrolling. Then browser scrolls immediately providing a maximally fluent experience, and the event is handled by the way.

// For some browsers (Firefox, Chrome), passive is true by default for touchstart and touchmove events.

// event.defaultPrevented
// The property event.defaultPrevented is true if the default action was prevented, and false otherwise.

// There’s an interesting use case for it.

// You remember in the chapter Bubbling and capturing we talked about event.stopPropagation() and why stopping bubbling is bad?

// Sometimes we can use event.defaultPrevented instead, to signal other event handlers that the event was handled.

// Let’s see a practical example.

// By default the browser on contextmenu event (right mouse click) shows a context menu with standard options. We can prevent it and show our own, like this:

// <button>Right-click shows browser context menu</button>

// <button oncontextmenu="console.log('Draw our menu'); return false">
//   Right-click shows our context menu
// </button>

// Now, in addition to that context menu we’d like to implement document-wide context menu.

// Upon right click, the closest context menu should show up.

// <p>Right-click here for the document context menu</p>
// <button id="elem">Right-click here for the button context menu</button>

// <script>
//   elem.oncontextmenu = function(event) {
//     event.preventDefault();
//     console.log("Button context menu");
//   };

//   document.oncontextmenu = function(event) {
//     event.preventDefault();
//     console.log("Document context menu");
//   };
// </script>

// The problem is that when we click on elem, we get two menus: the button-level and (the event bubbles up) the document-level menu.

// How to fix it? One of solutions is to think like: “When we handle right-click in the button handler, let’s stop its bubbling” and use event.stopPropagation():

// <p>Right-click for the document menu</p>
// <button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

// <script>
//   elem.oncontextmenu = function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     console.log("Button context menu");
//   };

//   document.oncontextmenu = function(event) {
//     event.preventDefault();
//     console.log("Document context menu");
//   };
// </script>

// Now the button-level menu works as intended. But the price is high. We forever deny access to information about right-clicks for any outer code, including counters that gather statistics and so on. That’s quite unwise.

// An alternative solution would be to check in the document handler if the default action was prevented? If it is so, then the event was handled, and we don’t need to react on it.

// <p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
// <button id="elem">Right-click for the button menu</button>

// <script>
//   elem.oncontextmenu = function(event) {
//     event.preventDefault();
//     console.log("Button context menu");
//   };

//   document.oncontextmenu = function(event) {
//     if (event.defaultPrevented) return;

//     event.preventDefault();
//     console.log("Document context menu");
//   };
// </script>

// Now everything also works correctly. If we have nested elements, and each of them has a context menu of its own, that would also work. Just make sure to check for event.defaultPrevented in each contextmenu handler.

// event.stopPropagation() and event.preventDefault()
// As we can clearly see, event.stopPropagation() and event.preventDefault() (also known as return false) are two different things. They are not related to each other.

// Nested context menus architecture
// There are also alternative ways to implement nested context menus. One of them is to have a single global object with a handler for document.oncontextmenu, and also methods that allow us to store other handlers in it.

// The object will catch any right-click, look through stored handlers and run the appropriate one.

// But then each piece of code that wants a context menu should know about that object and use its help instead of the own contextmenu handler.

// Summary
// There are many default browser actions:

// mousedown – starts the selection (move the mouse to select).
// click on <input type="checkbox"> – checks/unchecks the input.
// submit – clicking an <input type="submit"> or hitting Enter inside a form field causes this event to happen, and the browser submits the form after it.
// keydown – pressing a key may lead to adding a character into a field, or other actions.
// contextmenu – the event happens on a right-click, the action is to show the browser context menu.
// …there are more…
// All the default actions can be prevented if we want to handle the event exclusively by JavaScript.

// To prevent a default action – use either event.preventDefault() or return false. The second method works only for handlers assigned with on<event>.

// The passive: true option of addEventListener tells the browser that the action is not going to be prevented. That’s useful for some mobile events, like touchstart and touchmove, to tell the browser that it should not wait for all handlers to finish before scrolling.

// If the default action was prevented, the value of event.defaultPrevented becomes true, otherwise it’s false.
// ///////////////////////////////////////////////////////////////////

// // Dispatching custom events
// Dispatching custom events
// We can not only assign handlers, but also generate events from JavaScript.

// Custom events can be used to create “graphical components”. For instance, a root element of our own JS-based menu may trigger events telling what happens with the menu: open (menu open), select (an item is selected) and so on. Another code may listen for the events and observe what’s happening with the menu.

// We can generate not only completely new events, that we invent for our own purposes, but also built-in ones, such as click, mousedown etc. That may be helpful for automated testing.

// Event constructor
// Built-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in Event class.

// We can create Event objects like this:

// let event = new Event(type[, options]);
// Arguments:

// type – event type, a string like "click" or our own like "my-event".

// options – the object with two optional properties:

// bubbles: true/false – if true, then the event bubbles.
// cancelable: true/false – if true, then the “default action” may be prevented. Later we’ll see what it means for custom events.
// By default both are false: {bubbles: false, cancelable: false}.

// dispatchEvent
// After an event object is created, we should “run” it on an element using the call elem.dispatchEvent(event).

// Then handlers react on it as if it were a regular browser event. If the event was created with the bubbles flag, then it bubbles.

// In the example below the click event is initiated in JavaScript. The handler works same way as if the button was clicked:

// <button id="elem" onclick="console.log('Click!');">Autoclick</button>

// <script>
//   let event = new Event("click");
//   elem.dispatchEvent(event);
// </script>
// event.isTrusted
// There is a way to tell a “real” user event from a script-generated one.

// The property event.isTrusted is true for events that come from real user actions and false for script-generated events.

// Bubbling example
// We can create a bubbling event with the name "hello" and catch it on document.

// All we need is to set bubbles to true:

// <h1 id="elem">Hello from the script!</h1>

// <script>
//   // catch on document...
//   document.addEventListener("hello", function(event) { // (1)
//     console.log("Hello from " + event.target.tagName); // Hello from H1
//   });

//   // ...dispatch on elem!
//   let event = new Event("hello", {bubbles: true}); // (2)
//   elem.dispatchEvent(event);

//   // the handler on document will activate and display the message.

// </script>
// Notes:

// We should use addEventListener for our custom events, because on<event> only exists for built-in events, document.onhello doesn’t work.
// Must set bubbles:true, otherwise the event won’t bubble up.
// The bubbling mechanics is the same for built-in (click) and custom (hello) events. There are also capturing and bubbling stages.

// MouseEvent, KeyboardEvent and others
// Here’s a short list of classes for UI Events from the UI Event specification:

// UIEvent
// FocusEvent
// MouseEvent
// WheelEvent
// KeyboardEvent
// …
// We should use them instead of new Event if we want to create such events. For instance, new MouseEvent("click").

// The right constructor allows to specify standard properties for that type of event.

// Like clientX/clientY for a mouse event:

// let event = new MouseEvent("click", {
//   bubbles: true,
//   cancelable: true,
//   clientX: 100,
//   clientY: 100
// });

// console.log(event.clientX); // 100
// Please note: the generic Event constructor does not allow that.

// Let’s try:

// let event = new Event("click", {
//   bubbles: true, // only bubbles and cancelable
//   cancelable: true, // work in the Event constructor
//   clientX: 100,
//   clientY: 100
// });

// console.log(event.clientX); // undefined, the unknown property is ignored!
// Technically, we can work around that by assigning directly event.clientX=100 after creation. So that’s a matter of convenience and following the rules. Browser-generated events always have the right type.

// The full list of properties for different UI events is in the specification, for instance, MouseEvent.

// Custom events
// For our own, completely new events types like "hello" we should use new CustomEvent. Technically CustomEvent is the same as Event, with one exception.

// In the second argument (object) we can add an additional property detail for any custom information that we want to pass with the event.

// For instance:

// <h1 id="elem">Hello for John!</h1>

// <script>
//   // additional details come with the event to the handler
//   elem.addEventListener("hello", function(event) {
//     console.log(event.detail.name);
//   });

//   elem.dispatchEvent(new CustomEvent("hello", {
//     detail: { name: "John" }
//   }));
// </script>
// The detail property can have any data. Technically we could live without, because we can assign any properties into a regular new Event object after its creation. But CustomEvent provides the special detail field for it to evade conflicts with other event properties.

// Besides, the event class describes “what kind of event” it is, and if the event is custom, then we should use CustomEvent just to be clear about what it is.

// event.preventDefault()
// Many browser events have a “default action”, such as navigating to a link, starting a selection, and so on.

// For new, custom events, there are definitely no default browser actions, but a code that dispatches such event may have its own plans what to do after triggering the event.

// By calling event.preventDefault(), an event handler may send a signal that those actions should be canceled.

// In that case the call to elem.dispatchEvent(event) returns false. And the code that dispatched it knows that it shouldn’t continue.

// Let’s see a practical example – a hiding rabbit (could be a closing menu or something else).

// Below you can see a #rabbit and hide() function that dispatches "hide" event on it, to let all interested parties know that the rabbit is going to hide.

// Any handler can listen for that event with rabbit.addEventListener('hide',...) and, if needed, cancel the action using event.preventDefault(). Then the rabbit won’t disappear:

// <pre id="rabbit">
//   |\   /|
//    \|_|/
//    /. .\
//   =\_Y_/=
//    {>o<}
// </pre>
// <button onclick="hide()">Hide()</button>

// <script>
//   function hide() {
//     let event = new CustomEvent("hide", {
//       cancelable: true // without that flag preventDefault doesn't work
//     });
//     if (!rabbit.dispatchEvent(event)) {
//       console.log('The action was prevented by a handler');
//     } else {
//       rabbit.hidden = true;
//     }
//   }

//   rabbit.addEventListener('hide', function(event) {
//     if (confirm("Call preventDefault?")) {
//       event.preventDefault();
//     }
//   });
// </script>

// Please note: the event must have the flag cancelable: true, otherwise the call event.preventDefault() is ignored.

// Events-in-events are synchronous
// Usually events are processed in a queue. That is: if the browser is processing onclick and a new event occurs, e.g. mouse moved, then its handling is queued up, corresponding mousemove handlers will be called after onclick processing is finished.

// The notable exception is when one event is initiated from within another one, e.g. using dispatchEvent. Such events are processed immediately: the new event handlers are called, and then the current event handling is resumed.

// For instance, in the code below the menu-open event is triggered during the onclick.

// It’s processed immediately, without waiting for onclick handler to end:

// <button id="menu">Menu (click me)</button>

// <script>
//   menu.onclick = function() {
//     console.log(1);

//     menu.dispatchEvent(new CustomEvent("menu-open", {
//       bubbles: true
//     }));

//     console.log(2);
//   };

//   // triggers between 1 and 2
//   document.addEventListener('menu-open', () => console.log('nested'));
// </script>

// The output order is: 1 → nested → 2.

// Please note that the nested event menu-open is caught on the document. The propagation and handling of the nested event is finished before the processing gets back to the outer code (onclick).

// That’s not only about dispatchEvent, there are other cases. If an event handler calls methods that trigger other events – they are processed synchronously too, in a nested fashion.

// Let’s say we don’t like it. We’d want onclick to be fully processed first, independently from menu-open or any other nested events.

// Then we can either put the dispatchEvent (or another event-triggering call) at the end of onclick or, maybe better, wrap it in the zero-delay setTimeout:

// <button id="menu">Menu (click me)</button>

// <script>
//   menu.onclick = function() {
//     console.log(1);

//     setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
//       bubbles: true
//     })));

//     console.log(2);
//   };

//   document.addEventListener('menu-open', () => console.log('nested'));
// </script>
// Now dispatchEvent runs asynchronously after the current code execution is finished, including menu.onclick, so event handlers are totally separate.

// The output order becomes: 1 → 2 → nested.

// Summary
// To generate an event from code, we first need to create an event object.

// The generic Event(name, options) constructor accepts an arbitrary event name and the options object with two properties:

// bubbles: true if the event should bubble.
// cancelable: true if the event.preventDefault() should work.
// Other constructors of native events like MouseEvent, KeyboardEvent and so on accept properties specific to that event type. For instance, clientX for mouse events.

// For custom events we should use CustomEvent constructor. It has an additional option named detail, we should assign the event-specific data to it. Then all handlers can access it as event.detail.

// Despite the technical possibility of generating browser events like click or keydown, we should use them with great care.

// We shouldn’t generate browser events as it’s a hacky way to run handlers. That’s bad architecture most of the time.

// Native events might be generated:

// As a dirty hack to make 3rd-party libraries work the needed way, if they don’t provide other means of interaction.
// For automated testing, to “click the button” in the script and see if the interface reacts correctly.
// Custom events with our own names are often generated for architectural purposes, to signal what happens inside our menus, sliders, carousels etc.
// ///////////////////////////////////////////////////////////////////
