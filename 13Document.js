// // Browser environment, specs
// Browser environment, specs
// The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

// A platform may be a browser, or a web-server or another host, or even a “smart” coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a host environment.

// A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

// Here’s a bird’s-eye view of what we have when JavaScript runs in a web browser:

// There’s a “root” object called window. It has two roles:

// First, it is a global object for JavaScript code, as described in the chapter Global object.
// Second, it represents the “browser window” and provides methods to control it.
// For instance, we can use it as a global object:

// function sayHi() {
//   console.log("Hello");
// }

// // global functions are methods of the global object:
// window.sayHi();
// And we can use it as a browser window, to show the window height:

// console.log(window.innerHeight); // inner window height
// There are more window-specific methods and properties, which we’ll cover later.

// DOM (Document Object Model)
// The Document Object Model, or DOM for short, represents all page content as objects that can be modified.

// The document object is the main “entry point” to the page. We can change or create anything on the page using it.

// For instance:

// // change the background color to red
// document.body.style.background = "red";

// // change it back after 1 second
// setTimeout(() => document.body.style.background = "", 1000);
// Here, we used document.body.style, but there’s much, much more. Properties and methods are described in the specification: DOM Living Standard.

// DOM is not only for browsers
// The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use DOM too.

// For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.

// CSSOM for styling
// There’s also a separate specification, CSS Object Model (CSSOM) for CSS rules and stylesheets, that explains how they are represented as objects, and how to read and write them.

// The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that’s also possible.

// BOM (Browser Object Model)
// The Browser Object Model (BOM) represents additional objects provided by the browser (host environment) for working with everything except the document.

// For instance:

// The navigator object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: navigator.userAgent – about the current browser, and navigator.platform – about the platform (can help to differentiate between Windows/Linux/Mac etc).
// The location object allows us to read the current URL and can redirect the browser to a new one.
// Here’s how we can use the location object:

// console.log(location.href); // shows current URL
// if (confirm("Go to Wikipedia?")) {
//   location.href = "https://wikipedia.org"; // redirect the browser to another URL
// }
// The functions console.log/confirm/prompt are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

// Specifications
// The BOM is a part of the general HTML specification.

// Yes, you heard that right. The HTML spec at https://html.spec.whatwg.org is not only about the “HTML language” (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That’s “HTML in broad terms”. Also, some parts have additional specs listed at https://spec.whatwg.org.

// Summary
// Talking about standards, we have:

// DOM specification
// Describes the document structure, manipulations, and events, see https://dom.spec.whatwg.org.
// CSSOM specification
// Describes stylesheets and style rules, manipulations with them, and their binding to documents, see https://www.w3.org/TR/cssom-1/.
// HTML specification
// Describes the HTML language (e.g. tags) and also the BOM (browser object model) – various browser functions: setTimeout, console.log, location and so on, see https://html.spec.whatwg.org. It takes the DOM specification and extends it with many additional properties and methods.
// Additionally, some classes are described separately at https://spec.whatwg.org/.

// Please note these links, as there’s so much to learn that it’s impossible to cover everything and remember it all.

// When you’d like to read about a property or a method, the Mozilla manual at https://developer.mozilla.org/en-US/ is also a nice resource, but the corresponding spec may be better: it’s more complex and longer to read, but will make your fundamental knowledge sound and complete.

// To find something, it’s often convenient to use an internet search “WHATWG [term]” or “MDN [term]”, e.g https://google.com?q=whatwg+localstorage, https://google.com?q=mdn+localstorage.

// Now, we’ll get down to learning the DOM, because the document plays the central role in the UI.
// ///////////////////////////////////////////////////////////////////

// // DOM tree
// DOM tree
// The backbone of an HTML document is tags.

// According to the Document Object Model (DOM), every HTML tag is an object. Nested tags are “children” of the enclosing one. The text inside a tag is an object as well.

// All these objects are accessible using JavaScript, and we can use them to modify the page.

// For example, document.body is the object representing the <body> tag.

// Running this code will make the <body> red for 3 seconds:

// document.body.style.background = 'red'; // make the background red

// setTimeout(() => document.body.style.background = '', 3000); // return back
// Here we used style.background to change the background color of document.body, but there are many other properties, such as:

// innerHTML – HTML contents of the node.
// offsetWidth – the node width (in pixels)
// …and so on.
// Soon we’ll learn more ways to manipulate the DOM, but first we need to know about its structure.

// An example of the DOM
// Let’s start with the following simple document:

// <!DOCTYPE HTML>
// <html>
// <head>
//   <title>About elk</title>
// </head>
// <body>
//   The truth about elk.
// </body>
// </html>
// The DOM represents HTML as a tree structure of tags. Here’s how it looks:

// ▾
// HTML
// ▾
// HEAD
// #text ↵␣␣
// ▾
// TITLE
// #text About elk
// #text ↵
// #text ↵
// ▾
// BODY
// #text ↵␣␣The truth about elk.↵
// On the picture above, you can click on element nodes and their children will open/collapse.

// Every tree node is an object.

// Tags are element nodes (or just elements) and form the tree structure: <html> is at the root, then <head> and <body> are its children, etc.

// The text inside elements forms text nodes, labelled as #text. A text node contains only a string. It may not have children and is always a leaf of the tree.

// For instance, the <title> tag has the text "About elk".

// Please note the special characters in text nodes:

// a newline: ↵ (in JavaScript known as \n)
// a space: ␣
// Spaces and newlines are totally valid characters, like letters and digits. They form text nodes and become a part of the DOM. So, for instance, in the example above the <head> tag contains some spaces before <title>, and that text becomes a #text node (it contains a newline and some spaces only).

// There are only two top-level exclusions:

// Spaces and newlines before <head> are ignored for historical reasons.
// If we put something after </body>, then that is automatically moved inside the body, at the end, as the HTML spec requires that all content must be inside <body>. So there can’t be any spaces after </body>.
// In other cases everything’s straightforward – if there are spaces (just like any character) in the document, then they become text nodes in the DOM, and if we remove them, then there won’t be any.

// Here are no space-only text nodes:

// <!DOCTYPE HTML>
// <html><head><title>About elk</title></head><body>The truth about elk.</body></html>
// ▾
// HTML
// ▾
// HEAD
// ▾
// TITLE
// #text About elk
// ▾
// BODY
// #text The truth about elk.
// Spaces at string start/end and space-only text nodes are usually hidden in tools
// Browser tools (to be covered soon) that work with DOM usually do not show spaces at the start/end of the text and empty text nodes (line-breaks) between tags.

// Developer tools save screen space this way.

// On further DOM pictures we’ll sometimes omit them when they are irrelevant. Such spaces usually do not affect how the document is displayed.

// Autocorrection
// If the browser encounters malformed HTML, it automatically corrects it when making the DOM.

// For instance, the top tag is always <html>. Even if it doesn’t exist in the document, it will exist in the DOM, because the browser will create it. The same goes for <body>.

// As an example, if the HTML file is the single word "Hello", the browser will wrap it into <html> and <body>, and add the required <head>, and the DOM will be:

// ▾
// HTML
// ▾
// HEAD
// ▾
// BODY
// #text Hello
// While generating the DOM, browsers automatically process errors in the document, close tags and so on.

// A document with unclosed tags:

// <p>Hello
// <li>Mom
// <li>and
// <li>Dad
// …will become a normal DOM as the browser reads tags and restores the missing parts:

// ▾
// HTML
// ▾
// HEAD
// ▾
// BODY
// ▾
// P
// #text Hello
// ▾
// LI
// #text Mom
// ▾
// LI
// #text and
// ▾
// LI
// #text Dad
// Tables always have <tbody>
// An interesting “special case” is tables. By DOM specification they must have <tbody> tag, but HTML text may omit it. Then the browser creates <tbody> in the DOM automatically.

// For the HTML:

// <table id="table"><tr><td>1</td></tr></table>
// DOM-structure will be:

// ▾
// TABLE
// ▾
// TBODY
// ▾
// TR
// ▾
// TD
// #text 1
// You see? The <tbody> appeared out of nowhere. We should keep this in mind while working with tables to avoid surprises.

// Other node types
// There are some other node types besides elements and text nodes.

// For example, comments:

// <!DOCTYPE HTML>
// <html>
// <body>
//   The truth about elk.
//   <ol>
//     <li>An elk is a smart</li>
//     <!-- comment -->
//     <li>...and cunning animal!</li>
//   </ol>
// </body>
// </html>
// ▾
// HTML
// ▾
// HEAD
// ▾
// BODY
// #text ↵␣␣The truth about elk.↵␣␣
// ▾
// OL
// #text ↵␣␣␣␣
// ▾
// LI
// #text An elk is a smart
// #text ↵␣␣␣␣
// #comment comment
// #text ↵␣␣␣␣
// ▾
// LI
// #text ...and cunning animal!
// #text ↵␣␣
// #text ↵↵↵
// We can see here a new tree node type – comment node, labeled as #comment, between two text nodes.

// We may think – why is a comment added to the DOM? It doesn’t affect the visual representation in any way. But there’s a rule – if something’s in HTML, then it also must be in the DOM tree.

// Everything in HTML, even comments, becomes a part of the DOM.

// Even the <!DOCTYPE...> directive at the very beginning of HTML is also a DOM node. It’s in the DOM tree right before <html>. Few people know about that. We are not going to touch that node, we even don’t draw it on diagrams, but it’s there.

// The document object that represents the whole document is, formally, a DOM node as well.

// There are 12 node types. In practice we usually work with 4 of them:

// document – the “entry point” into DOM.
// element nodes – HTML-tags, the tree building blocks.
// text nodes – contain text.
// comments – sometimes we can put information there, it won’t be shown, but JS can read it from the DOM.
// See it for yourself
// To see the DOM structure in real-time, try Live DOM Viewer. Just type in the document, and it will show up as a DOM at an instant.

// Another way to explore the DOM is to use the browser developer tools. Actually, that’s what we use when developing.

// To do so, open the web page elk.html, turn on the browser developer tools and switch to the Elements tab.

// It should look like this:

// You can see the DOM, click on elements, see their details and so on.

// Please note that the DOM structure in developer tools is simplified. Text nodes are shown just as text. And there are no “blank” (space only) text nodes at all. That’s fine, because most of the time we are interested in element nodes.

// Clicking the  button in the left-upper corner allows us to choose a node from the webpage using a mouse (or other pointer devices) and “inspect” it (scroll to it in the Elements tab). This works great when we have a huge HTML page (and corresponding huge DOM) and would like to see the place of a particular element in it.

// Another way to do it would be just right-clicking on a webpage and selecting “Inspect” in the context menu.

// At the right part of the tools there are the following subtabs:

// Styles – we can see CSS applied to the current element rule by rule, including built-in rules (gray). Almost everything can be edited in-place, including the dimensions/margins/paddings of the box below.
// Computed – to see CSS applied to the element by property: for each property we can see a rule that gives it (including CSS inheritance and such).
// Event Listeners – to see event listeners attached to DOM elements (we’ll cover them in the next part of the tutorial).
// …and so on.
// The best way to study them is to click around. Most values are editable in-place.

// Interaction with console
// As we work the DOM, we also may want to apply JavaScript to it. Like: get a node and run some code to modify it, to see the result. Here are few tips to travel between the Elements tab and the console.

// For the start:

// Select the first <li> in the Elements tab.
// Press Esc – it will open console right below the Elements tab.
// Now the last selected element is available as $0, the previously selected is $1 etc.

// We can run commands on them. For instance, $0.style.background = 'red' makes the selected list item red, like this:

// That’s how to get a node from Elements in Console.

// There’s also a road back. If there’s a variable referencing a DOM node, then we can use the command inspect(node) in Console to see it in the Elements pane.

// Or we can just output the DOM node in the console and explore “in-place”, like document.body below:

// That’s for debugging purposes of course. From the next chapter on we’ll access and modify DOM using JavaScript.

// The browser developer tools are a great help in development: we can explore the DOM, try things and see what goes wrong.

// Summary
// An HTML/XML document is represented inside the browser as the DOM tree.

// Tags become element nodes and form the structure.
// Text becomes text nodes.
// …etc, everything in HTML has its place in DOM, even comments.
// We can use developer tools to inspect DOM and modify it manually.

// Here we covered the basics, the most used and important actions to start with. There’s an extensive documentation about Chrome Developer Tools at https://developers.google.com/web/tools/chrome-devtools. The best way to learn the tools is to click here and there, read menus: most options are obvious. Later, when you know them in general, read the docs and pick up the rest.

// DOM nodes have properties and methods that allow us to travel between them, modify them, move around the page, and more. We’ll get down to them in the next chapters.
// ///////////////////////////////////////////////////////////////////

// // Walking the DOM
// Walking the DOM
// The DOM allows us to do anything with elements and their contents, but first we need to reach the corresponding DOM object.

// All operations on the DOM start with the document object. That’s the main “entry point” to DOM. From it we can access any node.

// Here’s a picture of links that allow for travel between DOM nodes:

// Let’s discuss them in more detail.

// On top: documentElement and body
// The topmost tree nodes are available directly as document properties:

// <html> = document.documentElement
// The topmost document node is document.documentElement. That’s the DOM node of the <html> tag.
// <body> = document.body
// Another widely used DOM node is the <body> element – document.body.
// <head> = document.head
// The <head> tag is available as document.head.
// There’s a catch: document.body can be null
// A script cannot access an element that doesn’t exist at the moment of running.

// In particular, if a script is inside <head>, then document.body is unavailable, because the browser did not read it yet.

// So, in the example below the first console.log shows null:

// <html>

// <head>
//   <script>
//     console.log( "From HEAD: " + document.body ); // null, there's no <body> yet
//   </script>
// </head>

// <body>

//   <script>
//     console.log( "From BODY: " + document.body ); // HTMLBodyElement, now it exists
//   </script>

// </body>
// </html>
// In the DOM world null means “doesn’t exist”
// In the DOM, the null value means “doesn’t exist” or “no such node”.

// Children: childNodes, firstChild, lastChild
// There are two terms that we’ll use from now on:

// Child nodes (or children) – elements that are direct children. In other words, they are nested exactly in the given one. For instance, <head> and <body> are children of <html> element.
// Descendants – all elements that are nested in the given one, including children, their children and so on.
// For instance, here <body> has children <div> and <ul> (and few blank text nodes):

// <html>
// <body>
//   <div>Begin</div>

//   <ul>
//     <li>
//       <b>Information</b>
//     </li>
//   </ul>
// </body>
// </html>
// …And descendants of <body> are not only direct children <div>, <ul> but also more deeply nested elements, such as <li> (a child of <ul>) and <b> (a child of <li>) – the entire subtree.

// The childNodes collection lists all child nodes, including text nodes.

// The example below shows children of document.body:

// <html>
// <body>
//   <div>Begin</div>

//   <ul>
//     <li>Information</li>
//   </ul>

//   <div>End</div>

//   <script>
//     for (let i = 0; i < document.body.childNodes.length; i++) {
//       console.log( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
//     }
//   </script>
//   ...more stuff...
// </body>
// </html>
// Please note an interesting detail here. If we run the example above, the last element shown is <script>. In fact, the document has more stuff below, but at the moment of the script execution the browser did not read it yet, so the script doesn’t see it.

// Properties firstChild and lastChild give fast access to the first and last children.

// They are just shorthands. If there exist child nodes, then the following is always true:

// elem.childNodes[0] === elem.firstChild
// elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
// There’s also a special function elem.hasChildNodes() to check whether there are any child nodes.

// DOM collections
// As we can see, childNodes looks like an array. But actually it’s not an array, but rather a collection – a special array-like iterable object.

// There are two important consequences:

// We can use for..of to iterate over it:
// for (let node of document.body.childNodes) {
//   console.log(node); // shows all nodes from the collection
// }
// That’s because it’s iterable (provides the Symbol.iterator property, as required).

// Array methods won’t work, because it’s not an array:
// console.log(document.body.childNodes.filter); // undefined (there's no filter method!)
// The first thing is nice. The second is tolerable, because we can use Array.from to create a “real” array from the collection, if we want array methods:

// console.log( Array.from(document.body.childNodes).filter ); // function
// DOM collections are read-only
// DOM collections, and even more – all navigation properties listed in this chapter are read-only.

// We can’t replace a child by something else by assigning childNodes[i] = ....

// Changing DOM needs other methods. We will see them in the next chapter.

// DOM collections are live
// Almost all DOM collections with minor exceptions are live. In other words, they reflect the current state of DOM.

// If we keep a reference to elem.childNodes, and add/remove nodes into DOM, then they appear in the collection automatically.

// Don’t use for..in to loop over collections
// Collections are iterable using for..of. Sometimes people try to use for..in for that.

// Please, don’t. The for..in loop iterates over all enumerable properties. And collections have some “extra” rarely used properties that we usually do not want to get:

// <body>
// <script>
//   // shows 0, 1, length, item, values and more.
//   for (let prop in document.body.childNodes) console.log(prop);
// </script>
// </body>
// Siblings and the parent
// Siblings are nodes that are children of the same parent.

// For instance, here <head> and <body> are siblings:

// <html>
//   <head>...</head><body>...</body>
// </html>
// <body> is said to be the “next” or “right” sibling of <head>,
// <head> is said to be the “previous” or “left” sibling of <body>.
// The next sibling is in nextSibling property, and the previous one – in previousSibling.

// The parent is available as parentNode.

// For example:

// // parent of <body> is <html>
// console.log( document.body.parentNode === document.documentElement ); // true

// // after <head> goes <body>
// console.log( document.head.nextSibling ); // HTMLBodyElement

// // before <body> goes <head>
// console.log( document.body.previousSibling ); // HTMLHeadElement
// Element-only navigation
// Navigation properties listed above refer to all nodes. For instance, in childNodes we can see both text nodes, element nodes, and even comment nodes if they exist.

// But for many tasks we don’t want text or comment nodes. We want to manipulate element nodes that represent tags and form the structure of the page.

// So let’s see more navigation links that only take element nodes into account:

// The links are similar to those given above, just with Element word inside:

// children – only those children that are element nodes.
// firstElementChild, lastElementChild – first and last element children.
// previousElementSibling, nextElementSibling – neighbor elements.
// parentElement – parent element.
// Why parentElement? Can the parent be not an element?
// The parentElement property returns the “element” parent, while parentNode returns “any node” parent. These properties are usually the same: they both get the parent.

// With the one exception of document.documentElement:

// console.log( document.documentElement.parentNode ); // document
// console.log( document.documentElement.parentElement ); // null
// The reason is that the root node document.documentElement (<html>) has document as its parent. But document is not an element node, so parentNode returns it and parentElement does not.

// This detail may be useful when we want to travel up from an arbitrary element elem to <html>, but not to the document:

// while(elem = elem.parentElement) { // go up till <html>
//   console.log( elem );
// }
// Let’s modify one of the examples above: replace childNodes with children. Now it shows only elements:

// <html>
// <body>
//   <div>Begin</div>

//   <ul>
//     <li>Information</li>
//   </ul>

//   <div>End</div>

//   <script>
//     for (let elem of document.body.children) {
//       console.log(elem); // DIV, UL, DIV, SCRIPT
//     }
//   </script>
//   ...
// </body>
// </html>
// More links: tables
// Till now we described the basic navigation properties.

// Certain types of DOM elements may provide additional properties, specific to their type, for convenience.

// Tables are a great example of that, and represent a particularly important case:

// The <table> element supports (in addition to the given above) these properties:

// table.rows – the collection of <tr> elements of the table.
// table.caption/tHead/tFoot – references to elements <caption>, <thead>, <tfoot>.
// table.tBodies – the collection of <tbody> elements (can be many according to the standard, but there will always be at least one – even if it is not in the source HTML, the browser will put it in the DOM).
// <thead>, <tfoot>, <tbody> elements provide the rows property:

// tbody.rows – the collection of <tr> inside.
// <tr>:

// tr.cells – the collection of <td> and <th> cells inside the given <tr>.
// tr.sectionRowIndex – the position (index) of the given <tr> inside the enclosing <thead>/<tbody>/<tfoot>.
// tr.rowIndex – the number of the <tr> in the table as a whole (including all table rows).
// <td> and <th>:

// td.cellIndex – the number of the cell inside the enclosing <tr>.
// An example of usage:

// <table id="table">
//   <tr>
//     <td>one</td><td>two</td>
//   </tr>
//   <tr>
//     <td>three</td><td>four</td>
//   </tr>
// </table>

// <script>
//   // get td with "two" (first row, second column)
//   let td = table.rows[0].cells[1];
//   td.style.backgroundColor = "red"; // highlight it
// </script>
// The specification: tabular data.

// There are also additional navigation properties for HTML forms. We’ll look at them later when we start working with forms.

// Summary
// Given a DOM node, we can go to its immediate neighbors using navigation properties.

// There are two main sets of them:

// For all nodes: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
// For element nodes only: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.
// Some types of DOM elements, e.g. tables, provide additional properties and collections to access their content.
// ///////////////////////////////////////////////////////////////////

// // Searching: getElement*, querySelector*
// Searching: getElement*, querySelector*
// DOM navigation properties are great when elements are close to each other. What if they are not? How to get an arbitrary element of the page?

// There are additional searching methods for that.

// document.getElementById or just id
// If an element has the id attribute, we can get the element using the method document.getElementById(id), no matter where it is.

// For instance:

// <div id="elem">
//   <div id="elem-content">Element</div>
// </div>

// <script>
//   // get the element
//   let elem = document.getElementById('elem');

//   // make its background red
//   elem.style.background = 'red';
// </script>
// Also, there’s a global variable named by id that references the element:

// <div id="elem">
//   <div id="elem-content">Element</div>
// </div>

// <script>
//   // elem is a reference to DOM-element with id="elem"
//   elem.style.background = 'red';

//   // id="elem-content" has a hyphen inside, so it can't be a variable name
//   // ...but we can access it using square brackets: window['elem-content']
// </script>
// …That’s unless we declare a JavaScript variable with the same name, then it takes precedence:

// <div id="elem"></div>

// <script>
//   let elem = 5; // now elem is 5, not a reference to <div id="elem">

//   console.log(elem); // 5
// </script>
// Please don’t use id-named global variables to access elements
// This behavior is described in the specification, so it’s a kind of standard. But it is supported mainly for compatibility.

// The browser tries to help us by mixing namespaces of JS and DOM. That’s fine for simple scripts, inlined into HTML, but generally isn’t a good thing. There may be naming conflicts. Also, when one reads JS code and doesn’t have HTML in view, it’s not obvious where the variable comes from.

// Here in the tutorial we use id to directly reference an element for brevity, when it’s obvious where the element comes from.

// In real life document.getElementById is the preferred method.

// The id must be unique
// The id must be unique. There can be only one element in the document with the given id.

// If there are multiple elements with the same id, then the behavior of methods that use it is unpredictable, e.g. document.getElementById may return any of such elements at random. So please stick to the rule and keep id unique.

// Only document.getElementById, not anyElem.getElementById
// The method getElementById can be called only on document object. It looks for the given id in the whole document.

// querySelectorAll
// By far, the most versatile method, elem.querySelectorAll(css) returns all elements inside elem matching the given CSS selector.

// Here we look for all <li> elements that are last children:

// <ul>
//   <li>The</li>
//   <li>test</li>
// </ul>
// <ul>
//   <li>has</li>
//   <li>passed</li>
// </ul>
// <script>
//   let elements = document.querySelectorAll('ul > li:last-child');

//   for (let elem of elements) {
//     console.log(elem.innerHTML); // "test", "passed"
//   }
// </script>
// This method is indeed powerful, because any CSS selector can be used.

// Can use pseudo-classes as well
// Pseudo-classes in the CSS selector like :hover and :active are also supported. For instance, document.querySelectorAll(':hover') will return the collection with elements that the pointer is over now (in nesting order: from the outermost <html> to the most nested one).

// querySelector
// The call to elem.querySelector(css) returns the first element for the given CSS selector.

// In other words, the result is the same as elem.querySelectorAll(css)[0], but the latter is looking for all elements and picking one, while elem.querySelector just looks for one. So it’s faster and also shorter to write.

// matches
// Previous methods were searching the DOM.

// The elem.matches(css) does not look for anything, it merely checks if elem matches the given CSS-selector. It returns true or false.

// The method comes in handy when we are iterating over elements (like in an array or something) and trying to filter out those that interest us.

// For instance:

// <a href="http://example.com/file.zip">...</a>
// <a href="http://ya.ru">...</a>

// <script>
//   // can be any collection instead of document.body.children
//   for (let elem of document.body.children) {
//     if (elem.matches('a[href$="zip"]')) {
//       console.log("The archive reference: " + elem.href );
//     }
//   }
// </script>
// closest
// Ancestors of an element are: parent, the parent of parent, its parent and so on. The ancestors together form the chain of parents from the element to the top.

// The method elem.closest(css) looks for the nearest ancestor that matches the CSS-selector. The elem itself is also included in the search.

// In other words, the method closest goes up from the element and checks each of parents. If it matches the selector, then the search stops, and the ancestor is returned.

// For instance:

// <h1>Contents</h1>

// <div class="contents">
//   <ul class="book">
//     <li class="chapter">Chapter 1</li>
//     <li class="chapter">Chapter 2</li>
//   </ul>
// </div>

// <script>
//   let chapter = document.querySelector('.chapter'); // LI

//   console.log(chapter.closest('.book')); // UL
//   console.log(chapter.closest('.contents')); // DIV

//   console.log(chapter.closest('h1')); // null (because h1 is not an ancestor)
// </script>
// getElementsBy*
// There are also other methods to look for nodes by a tag, class, etc.

// Today, they are mostly history, as querySelector is more powerful and shorter to write.

// So here we cover them mainly for completeness, while you can still find them in the old scripts.

// elem.getElementsByTagName(tag) looks for elements with the given tag and returns the collection of them. The tag parameter can also be a star "*" for “any tags”.
// elem.getElementsByClassName(className) returns elements that have the given CSS class.
// document.getElementsByName(name) returns elements with the given name attribute, document-wide. Very rarely used.
// For instance:

// // get all divs in the document
// let divs = document.getElementsByTagName('div');
// Let’s find all input tags inside the table:

// <table id="table">
//   <tr>
//     <td>Your age:</td>

//     <td>
//       <label>
//         <input type="radio" name="age" value="young" checked> less than 18
//       </label>
//       <label>
//         <input type="radio" name="age" value="mature"> from 18 to 50
//       </label>
//       <label>
//         <input type="radio" name="age" value="senior"> more than 60
//       </label>
//     </td>
//   </tr>
// </table>

// <script>
//   let inputs = table.getElementsByTagName('input');

//   for (let input of inputs) {
//     console.log( input.value + ': ' + input.checked );
//   }
// </script>
// Don’t forget the "s" letter!
// Novice developers sometimes forget the letter "s". That is, they try to call getElementByTagName instead of getElementsByTagName.

// The "s" letter is absent in getElementById, because it returns a single element. But getElementsByTagName returns a collection of elements, so there’s "s" inside.

// It returns a collection, not an element!
// Another widespread novice mistake is to write:

// // doesn't work
// document.getElementsByTagName('input').value = 5;
// That won’t work, because it takes a collection of inputs and assigns the value to it rather than to elements inside it.

// We should either iterate over the collection or get an element by its index, and then assign, like this:

// // should work (if there's an input)
// document.getElementsByTagName('input')[0].value = 5;
// Looking for .article elements:

// <form name="my-form">
//   <div class="article">Article</div>
//   <div class="long article">Long article</div>
// </form>

// <script>
//   // find by name attribute
//   let form = document.getElementsByName('my-form')[0];

//   // find by class inside the form
//   let articles = form.getElementsByClassName('article');
//   console.log(articles.length); // 2, found two elements with class "article"
// </script>
// Live collections
// All methods "getElementsBy*" return a live collection. Such collections always reflect the current state of the document and “auto-update” when it changes.

// In the example below, there are two scripts.

// The first one creates a reference to the collection of <div>. As of now, its length is 1.
// The second scripts runs after the browser meets one more <div>, so its length is 2.
// <div>First div</div>

// <script>
//   let divs = document.getElementsByTagName('div');
//   console.log(divs.length); // 1
// </script>

// <div>Second div</div>

// <script>
//   console.log(divs.length); // 2
// </script>
// In contrast, querySelectorAll returns a static collection. It’s like a fixed array of elements.

// If we use it instead, then both scripts output 1:

// <div>First div</div>

// <script>
//   let divs = document.querySelectorAll('div');
//   console.log(divs.length); // 1
// </script>

// <div>Second div</div>

// <script>
//   console.log(divs.length); // 1
// </script>
// Now we can easily see the difference. The static collection did not increase after the appearance of a new div in the document.

// Summary
// There are 6 main methods to search for nodes in DOM:

// Method	Searches by...	Can call on an element?	Live?
// querySelector	CSS-selector	✔	-
// querySelectorAll	CSS-selector	✔	-
// getElementById	id	-	-
// getElementsByName	name	-	✔
// getElementsByTagName	tag or '*'	✔	✔
// getElementsByClassName	class	✔	✔
// By far the most used are querySelector and querySelectorAll, but getElement(s)By* can be sporadically helpful or found in the old scripts.

// Besides that:

// There is elem.matches(css) to check if elem matches the given CSS selector.
// There is elem.closest(css) to look for the nearest ancestor that matches the given CSS-selector. The elem itself is also checked.
// And let’s mention one more method here to check for the child-parent relationship, as it’s sometimes useful:

// elemA.contains(elemB) returns true if elemB is inside elemA (a descendant of elemA) or when elemA==elemB.
// ///////////////////////////////////////////////////////////////////

// // Node properties: type, tag and contents
// Node properties: type, tag and contents
// Let’s get a more in-depth look at DOM nodes.

// In this chapter we’ll see more into what they are and learn their most used properties.

// DOM node classes
// Different DOM nodes may have different properties. For instance, an element node corresponding to tag <a> has link-related properties, and the one corresponding to <input> has input-related properties and so on. Text nodes are not the same as element nodes. But there are also common properties and methods between all of them, because all classes of DOM nodes form a single hierarchy.

// Each DOM node belongs to the corresponding built-in class.

// The root of the hierarchy is EventTarget, that is inherited by Node, and other DOM nodes inherit from it.

// Here’s the picture, explanations to follow:

// The classes are:

// EventTarget – is the root “abstract” class for everything.

// Objects of that class are never created. It serves as a base, so that all DOM nodes support so-called “events”, we’ll study them later.

// Node – is also an “abstract” class, serving as a base for DOM nodes.

// It provides the core tree functionality: parentNode, nextSibling, childNodes and so on (they are getters). Objects of Node class are never created. But there are other classes that inherit from it (and so inherit the Node functionality).

// Document, for historical reasons often inherited by HTMLDocument (though the latest spec doesn’t dictate it) – is a document as a whole.

// The document global object belongs exactly to this class. It serves as an entry point to the DOM.

// CharacterData – an “abstract” class, inherited by:

// Text – the class corresponding to a text inside elements, e.g. Hello in <p>Hello</p>.
// Comment – the class for comments. They are not shown, but each comment becomes a member of DOM.
// Element – is the base class for DOM elements.

// It provides element-level navigation like nextElementSibling, children and searching methods like getElementsByTagName, querySelector.

// A browser supports not only HTML, but also XML and SVG. So the Element class serves as a base for more specific classes: SVGElement, XMLElement (we don’t need them here) and HTMLElement.

// Finally, HTMLElement is the basic class for all HTML elements. We’ll work with it most of the time.

// It is inherited by concrete HTML elements:

// HTMLInputElement – the class for <input> elements,
// HTMLBodyElement – the class for <body> elements,
// HTMLAnchorElement – the class for <a> elements,
// …and so on.
// There are many other tags with their own classes that may have specific properties and methods, while some elements, such as <span>, <section>, <article> do not have any specific properties, so they are instances of HTMLElement class.

// So, the full set of properties and methods of a given node comes as the result of the chain of inheritance.

// For example, let’s consider the DOM object for an <input> element. It belongs to HTMLInputElement class.

// It gets properties and methods as a superposition of (listed in inheritance order):

// HTMLInputElement – this class provides input-specific properties,
// HTMLElement – it provides common HTML element methods (and getters/setters),
// Element – provides generic element methods,
// Node – provides common DOM node properties,
// EventTarget – gives the support for events (to be covered),
// …and finally it inherits from Object, so “plain object” methods like hasOwnProperty are also available.
// To see the DOM node class name, we can recall that an object usually has the constructor property. It references the class constructor, and constructor.name is its name:

// console.log( document.body.constructor.name ); // HTMLBodyElement
// …Or we can just toString it:

// console.log( document.body ); // [object HTMLBodyElement]
// We also can use instanceof to check the inheritance:

// console.log( document.body instanceof HTMLBodyElement ); // true
// console.log( document.body instanceof HTMLElement ); // true
// console.log( document.body instanceof Element ); // true
// console.log( document.body instanceof Node ); // true
// console.log( document.body instanceof EventTarget ); // true
// As we can see, DOM nodes are regular JavaScript objects. They use prototype-based classes for inheritance.

// That’s also easy to see by outputting an element with console.dir(elem) in a browser. There in the console you can see HTMLElement.prototype, Element.prototype and so on.

// console.dir(elem) versus console.log(elem)
// Most browsers support two commands in their developer tools: console.log and console.dir. They output their arguments to the console. For JavaScript objects these commands usually do the same.

// But for DOM elements they are different:

// console.log(elem) shows the element DOM tree.
// console.dir(elem) shows the element as a DOM object, good to explore its properties.
// Try it on document.body.

// IDL in the spec
// In the specification, DOM classes aren’t described by using JavaScript, but a special Interface description language (IDL), that is usually easy to understand.

// In IDL all properties are prepended with their types. For instance, DOMString, boolean and so on.

// Here’s an excerpt from it, with comments:

// // Define HTMLInputElement
// // The colon ":" means that HTMLInputElement inherits from HTMLElement
// interface HTMLInputElement: HTMLElement {
//   // here go properties and methods of <input> elements

//   // "DOMString" means that the value of a property is a string
//   attribute DOMString accept;
//   attribute DOMString alt;
//   attribute DOMString autocomplete;
//   attribute DOMString value;

//   // boolean value property (true/false)
//   attribute boolean autofocus;
//   ...
//   // now the method: "void" means that the method returns no value
//   void select();
//   ...
// }
// The “nodeType” property
// The nodeType property provides one more, “old-fashioned” way to get the “type” of a DOM node.

// It has a numeric value:

// elem.nodeType == 1 for element nodes,
// elem.nodeType == 3 for text nodes,
// elem.nodeType == 9 for the document object,
// there are few other values in the specification.
// For instance:

// <body>
//   <script>
//   let elem = document.body;

//   // let's examine: what type of node is in elem?
//   console.log(elem.nodeType); // 1 => element

//   // and its first child is...
//   console.log(elem.firstChild.nodeType); // 3 => text

//   // for the document object, the type is 9
//   console.log( document.nodeType ); // 9
//   </script>
// </body>
// In modern scripts, we can use instanceof and other class-based tests to see the node type, but sometimes nodeType may be simpler. We can only read nodeType, not change it.

// Tag: nodeName and tagName
// Given a DOM node, we can read its tag name from nodeName or tagName properties:

// For instance:

// console.log( document.body.nodeName ); // BODY
// console.log( document.body.tagName ); // BODY
// Is there any difference between tagName and nodeName?

// Sure, the difference is reflected in their names, but is indeed a bit subtle.

// The tagName property exists only for Element nodes.
// The nodeName is defined for any Node:
// for elements it means the same as tagName.
// for other node types (text, comment, etc.) it has a string with the node type.
// In other words, tagName is only supported by element nodes (as it originates from Element class), while nodeName can say something about other node types.

// For instance, let’s compare tagName and nodeName for the document and a comment node:

// <body><!-- comment -->

//   <script>
//     // for comment
//     console.log( document.body.firstChild.tagName ); // undefined (not an element)
//     console.log( document.body.firstChild.nodeName ); // #comment

//     // for document
//     console.log( document.tagName ); // undefined (not an element)
//     console.log( document.nodeName ); // #document
//   </script>
// </body>
// If we only deal with elements, then we can use both tagName and nodeName – there’s no difference.

// The tag name is always uppercase except in XML mode
// The browser has two modes of processing documents: HTML and XML. Usually the HTML-mode is used for webpages. XML-mode is enabled when the browser receives an XML-document with the header: Content-Type: application/xml+xhtml.

// In HTML mode tagName/nodeName is always uppercased: it’s BODY either for <body> or <BoDy>.

// In XML mode the case is kept “as is”. Nowadays XML mode is rarely used.

// innerHTML: the contents
// The innerHTML property allows to get the HTML inside the element as a string.

// We can also modify it. So it’s one of the most powerful ways to change the page.

// The example shows the contents of document.body and then replaces it completely:

// <body>
//   <p>A paragraph</p>
//   <div>A div</div>

//   <script>
//     console.log( document.body.innerHTML ); // read the current contents
//     document.body.innerHTML = 'The new BODY!'; // replace it
//   </script>

// </body>
// We can try to insert invalid HTML, the browser will fix our errors:

// <body>

//   <script>
//     document.body.innerHTML = '<b>test'; // forgot to close the tag
//     console.log( document.body.innerHTML ); // <b>test</b> (fixed)
//   </script>

// </body>
// Scripts don’t execute
// If innerHTML inserts a <script> tag into the document – it becomes a part of HTML, but doesn’t execute.

// Beware: “innerHTML+=” does a full overwrite
// We can append HTML to an element by using elem.innerHTML+="more html".

// Like this:

// chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
// chatDiv.innerHTML += "How goes?";
// But we should be very careful about doing it, because what’s going on is not an addition, but a full overwrite.

// Technically, these two lines do the same:

// elem.innerHTML += "...";
// // is a shorter way to write:
// elem.innerHTML = elem.innerHTML + "..."
// In other words, innerHTML+= does this:

// The old contents is removed.
// The new innerHTML is written instead (a concatenation of the old and the new one).
// As the content is “zeroed-out” and rewritten from the scratch, all images and other resources will be reloaded.

// In the chatDiv example above the line chatDiv.innerHTML+="How goes?" re-creates the HTML content and reloads smile.gif (hope it’s cached). If chatDiv has a lot of other text and images, then the reload becomes clearly visible.

// There are other side-effects as well. For instance, if the existing text was selected with the mouse, then most browsers will remove the selection upon rewriting innerHTML. And if there was an <input> with a text entered by the visitor, then the text will be removed. And so on.

// Luckily, there are other ways to add HTML besides innerHTML, and we’ll study them soon.

// outerHTML: full HTML of the element
// The outerHTML property contains the full HTML of the element. That’s like innerHTML plus the element itself.

// Here’s an example:

// <div id="elem">Hello <b>World</b></div>

// <script>
//   console.log(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
// </script>
// Beware: unlike innerHTML, writing to outerHTML does not change the element. Instead, it replaces it in the DOM.

// Yeah, sounds strange, and strange it is, that’s why we make a separate note about it here. Take a look.

// Consider the example:

// <div>Hello, world!</div>

// <script>
//   let div = document.querySelector('div');

//   // replace div.outerHTML with <p>...</p>
//   div.outerHTML = '<p>A new element</p>'; // (*)

//   // Wow! 'div' is still the same!
//   console.log(div.outerHTML); // <div>Hello, world!</div> (**)
// </script>
// Looks really odd, right?

// In the line (*) we replaced div with <p>A new element</p>. In the outer document (the DOM) we can see the new content instead of the <div>. But, as we can see in line (**), the value of the old div variable hasn’t changed!

// The outerHTML assignment does not modify the DOM element (the object referenced by, in this case, the variable ‘div’), but removes it from the DOM and inserts the new HTML in its place.

// So what happened in div.outerHTML=... is:

// div was removed from the document.
// Another piece of HTML <p>A new element</p> was inserted in its place.
// div still has its old value. The new HTML wasn’t saved to any variable.
// It’s so easy to make an error here: modify div.outerHTML and then continue to work with div as if it had the new content in it. But it doesn’t. Such thing is correct for innerHTML, but not for outerHTML.

// We can write to elem.outerHTML, but should keep in mind that it doesn’t change the element we’re writing to (‘elem’). It puts the new HTML in its place instead. We can get references to the new elements by querying the DOM.

// nodeValue/data: text node content
// The innerHTML property is only valid for element nodes.

// Other node types, such as text nodes, have their counterpart: nodeValue and data properties. These two are almost the same for practical use, there are only minor specification differences. So we’ll use data, because it’s shorter.

// An example of reading the content of a text node and a comment:

// <body>
//   Hello
//   <!-- Comment -->
//   <script>
//     let text = document.body.firstChild;
//     console.log(text.data); // Hello

//     let comment = text.nextSibling;
//     console.log(comment.data); // Comment
//   </script>
// </body>
// For text nodes we can imagine a reason to read or modify them, but why comments?

// Sometimes developers embed information or template instructions into HTML in them, like this:

// <!-- if isAdmin -->
//   <div>Welcome, Admin!</div>
// <!-- /if -->
// …Then JavaScript can read it from data property and process embedded instructions.

// textContent: pure text
// The textContent provides access to the text inside the element: only text, minus all <tags>.

// For instance:

// <div id="news">
//   <h1>Headline!</h1>
//   <p>Martians attack people!</p>
// </div>

// <script>
//   // Headline! Martians attack people!
//   console.log(news.textContent);
// </script>
// As we can see, only text is returned, as if all <tags> were cut out, but the text in them remained.

// In practice, reading such text is rarely needed.

// Writing to textContent is much more useful, because it allows to write text the “safe way”.

// Let’s say we have an arbitrary string, for instance entered by a user, and want to show it.

// With innerHTML we’ll have it inserted “as HTML”, with all HTML tags.
// With textContent we’ll have it inserted “as text”, all symbols are treated literally.
// Compare the two:

// <div id="elem1"></div>
// <div id="elem2"></div>

// <script>
//   let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

//   elem1.innerHTML = name;
//   elem2.textContent = name;
// </script>
// The first <div> gets the name “as HTML”: all tags become tags, so we see the bold name.
// The second <div> gets the name “as text”, so we literally see <b>Winnie-the-Pooh!</b>.
// In most cases, we expect the text from a user, and want to treat it as text. We don’t want unexpected HTML in our site. An assignment to textContent does exactly that.

// The “hidden” property
// The “hidden” attribute and the DOM property specifies whether the element is visible or not.

// We can use it in HTML or assign it using JavaScript, like this:

// <div>Both divs below are hidden</div>

// <div hidden>With the attribute "hidden"</div>

// <div id="elem">JavaScript assigned the property "hidden"</div>

// <script>
//   elem.hidden = true;
// </script>
// Technically, hidden works the same as style="display:none". But it’s shorter to write.

// Here’s a blinking element:

// <div id="elem">A blinking element</div>

// <script>
//   setInterval(() => elem.hidden = !elem.hidden, 1000);
// </script>
// More properties
// DOM elements also have additional properties, in particular those that depend on the class:

// value – the value for <input>, <select> and <textarea> (HTMLInputElement, HTMLSelectElement…).
// href – the “href” for <a href="..."> (HTMLAnchorElement).
// id – the value of “id” attribute, for all elements (HTMLElement).
// …and much more…
// For instance:

// <input type="text" id="elem" value="value">

// <script>
//   console.log(elem.type); // "text"
//   console.log(elem.id); // "elem"
//   console.log(elem.value); // value
// </script>
// Most standard HTML attributes have the corresponding DOM property, and we can access it like that.

// If we want to know the full list of supported properties for a given class, we can find them in the specification. For instance, HTMLInputElement is documented at https://html.spec.whatwg.org/#htmlinputelement.

// Or if we’d like to get them fast or are interested in a concrete browser specification – we can always output the element using console.dir(elem) and read the properties. Or explore “DOM properties” in the Elements tab of the browser developer tools.

// Summary
// Each DOM node belongs to a certain class. The classes form a hierarchy. The full set of properties and methods come as the result of inheritance.

// Main DOM node properties are:

// nodeType
// We can use it to see if a node is a text or an element node. It has a numeric value: 1 for elements,3 for text nodes, and a few others for other node types. Read-only.
// nodeName/tagName
// For elements, tag name (uppercased unless XML-mode). For non-element nodes nodeName describes what it is. Read-only.
// innerHTML
// The HTML content of the element. Can be modified.
// outerHTML
// The full HTML of the element. A write operation into elem.outerHTML does not touch elem itself. Instead it gets replaced with the new HTML in the outer context.
// nodeValue/data
// The content of a non-element node (text, comment). These two are almost the same, usually we use data. Can be modified.
// textContent
// The text inside the element: HTML minus all <tags>. Writing into it puts the text inside the element, with all special characters and tags treated exactly as text. Can safely insert user-generated text and protect from unwanted HTML insertions.
// hidden
// When set to true, does the same as CSS display:none.
// DOM nodes also have other properties depending on their class. For instance, <input> elements (HTMLInputElement) support value, type, while <a> elements (HTMLAnchorElement) support href etc. Most standard HTML attributes have a corresponding DOM property.

// However, HTML attributes and DOM properties are not always the same, as we’ll see in the next chapter.
// ///////////////////////////////////////////////////////////////////

// // Attributes and properties
// Attributes and properties
// When the browser loads the page, it “reads” (another word: “parses”) the HTML and generates DOM objects from it. For element nodes, most standard HTML attributes automatically become properties of DOM objects.

// For instance, if the tag is <body id="page">, then the DOM object has body.id="page".

// But the attribute-property mapping is not one-to-one! In this chapter we’ll pay attention to separate these two notions, to see how to work with them, when they are the same, and when they are different.

// DOM properties
// We’ve already seen built-in DOM properties. There are a lot. But technically no one limits us, and if there aren’t enough, we can add our own.

// DOM nodes are regular JavaScript objects. We can alter them.

// For instance, let’s create a new property in document.body:

// document.body.myData = {
//   name: 'Caesar',
//   title: 'Imperator'
// };

// console.log(document.body.myData.title); // Imperator
// We can add a method as well:

// document.body.sayTagName = function() {
//   console.log(this.tagName);
// };

// document.body.sayTagName(); // BODY (the value of "this" in the method is document.body)
// We can also modify built-in prototypes like Element.prototype and add new methods to all elements:

// Element.prototype.sayHi = function() {
//   console.log(`Hello, I'm ${this.tagName}`);
// };

// document.documentElement.sayHi(); // Hello, I'm HTML
// document.body.sayHi(); // Hello, I'm BODY
// So, DOM properties and methods behave just like those of regular JavaScript objects:

// They can have any value.
// They are case-sensitive (write elem.nodeType, not elem.NoDeTyPe).
// HTML attributes
// In HTML, tags may have attributes. When the browser parses the HTML to create DOM objects for tags, it recognizes standard attributes and creates DOM properties from them.

// So when an element has id or another standard attribute, the corresponding property gets created. But that doesn’t happen if the attribute is non-standard.

// For instance:

// <body id="test" something="non-standard">
//   <script>
//     console.log(document.body.id); // test
//     // non-standard attribute does not yield a property
//     console.log(document.body.something); // undefined
//   </script>
// </body>
// Please note that a standard attribute for one element can be unknown for another one. For instance, "type" is standard for <input> (HTMLInputElement), but not for <body> (HTMLBodyElement). Standard attributes are described in the specification for the corresponding element class.

// Here we can see it:

// <body id="body" type="...">
//   <input id="input" type="text">
//   <script>
//     console.log(input.type); // text
//     console.log(body.type); // undefined: DOM property not created, because it's non-standard
//   </script>
// </body>
// So, if an attribute is non-standard, there won’t be a DOM-property for it. Is there a way to access such attributes?

// Sure. All attributes are accessible by using the following methods:

// elem.hasAttribute(name) – checks for existence.
// elem.getAttribute(name) – gets the value.
// elem.setAttribute(name, value) – sets the value.
// elem.removeAttribute(name) – removes the attribute.
// These methods operate exactly with what’s written in HTML.

// Also one can read all attributes using elem.attributes: a collection of objects that belong to a built-in Attr class, with name and value properties.

// Here’s a demo of reading a non-standard property:

// <body something="non-standard">
//   <script>
//     console.log(document.body.getAttribute('something')); // non-standard
//   </script>
// </body>
// HTML attributes have the following features:

// Their name is case-insensitive (id is same as ID).
// Their values are always strings.
// Here’s an extended demo of working with attributes:

// <body>
//   <div id="elem" about="Elephant"></div>

//   <script>
//     console.log( elem.getAttribute('About') ); // (1) 'Elephant', reading

//     elem.setAttribute('Test', 123); // (2), writing

//     console.log( elem.outerHTML ); // (3), see if the attribute is in HTML (yes)

//     for (let attr of elem.attributes) { // (4) list all
//       console.log( `${attr.name} = ${attr.value}` );
//     }
//   </script>
// </body>
// Please note:

// getAttribute('About') – the first letter is uppercase here, and in HTML it’s all lowercase. But that doesn’t matter: attribute names are case-insensitive.
// We can assign anything to an attribute, but it becomes a string. So here we have "123" as the value.
// All attributes including ones that we set are visible in outerHTML.
// The attributes collection is iterable and has all the attributes of the element (standard and non-standard) as objects with name and value properties.
// Property-attribute synchronization
// When a standard attribute changes, the corresponding property is auto-updated, and (with some exceptions) vice versa.

// In the example below id is modified as an attribute, and we can see the property changed too. And then the same backwards:

// <input>

// <script>
//   let input = document.querySelector('input');

//   // attribute => property
//   input.setAttribute('id', 'id');
//   console.log(input.id); // id (updated)

//   // property => attribute
//   input.id = 'newId';
//   console.log(input.getAttribute('id')); // newId (updated)
// </script>
// But there are exclusions, for instance input.value synchronizes only from attribute → property, but not back:

// <input>

// <script>
//   let input = document.querySelector('input');

//   // attribute => property
//   input.setAttribute('value', 'text');
//   console.log(input.value); // text

//   // NOT property => attribute
//   input.value = 'newValue';
//   console.log(input.getAttribute('value')); // text (not updated!)
// </script>
// In the example above:

// Changing the attribute value updates the property.
// But the property change does not affect the attribute.
// That “feature” may actually come in handy, because the user actions may lead to value changes, and then after them, if we want to recover the “original” value from HTML, it’s in the attribute.

// DOM properties are typed
// DOM properties are not always strings. For instance, the input.checked property (for checkboxes) is a boolean:

// <input id="input" type="checkbox" checked> checkbox

// <script>
//   console.log(input.getAttribute('checked')); // the attribute value is: empty string
//   console.log(input.checked); // the property value is: true
// </script>
// There are other examples. The style attribute is a string, but the style property is an object:

// <div id="div" style="color:red;font-size:120%">Hello</div>

// <script>
//   // string
//   console.log(div.getAttribute('style')); // color:red;font-size:120%

//   // object
//   console.log(div.style); // [object CSSStyleDeclaration]
//   console.log(div.style.color); // red
// </script>
// Most properties are strings though.

// Quite rarely, even if a DOM property type is a string, it may differ from the attribute. For instance, the href DOM property is always a full URL, even if the attribute contains a relative URL or just a #hash.

// Here’s an example:

// <a id="a" href="#hello">link</a>
// <script>
//   // attribute
//   console.log(a.getAttribute('href')); // #hello

//   // property
//   console.log(a.href ); // full URL in the form http://site.com/page#hello
// </script>
// If we need the value of href or any other attribute exactly as written in the HTML, we can use getAttribute.

// Non-standard attributes, dataset
// When writing HTML, we use a lot of standard attributes. But what about non-standard, custom ones? First, let’s see whether they are useful or not? What for?

// Sometimes non-standard attributes are used to pass custom data from HTML to JavaScript, or to “mark” HTML-elements for JavaScript.

// Like this:

// <!-- mark the div to show "name" here -->
// <div show-info="name"></div>
// <!-- and age here -->
// <div show-info="age"></div>

// <script>
//   // the code finds an element with the mark and shows what's requested
//   let user = {
//     name: "Pete",
//     age: 25
//   };

//   for(let div of document.querySelectorAll('[show-info]')) {
//     // insert the corresponding info into the field
//     let field = div.getAttribute('show-info');
//     div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
//   }
// </script>
// Also they can be used to style an element.

// For instance, here for the order state the attribute order-state is used:

// <style>
//   /* styles rely on the custom attribute "order-state" */
//   .order[order-state="new"] {
//     color: green;
//   }

//   .order[order-state="pending"] {
//     color: blue;
//   }

//   .order[order-state="canceled"] {
//     color: red;
//   }
// </style>

// <div class="order" order-state="new">
//   A new order.
// </div>

// <div class="order" order-state="pending">
//   A pending order.
// </div>

// <div class="order" order-state="canceled">
//   A canceled order.
// </div>
// Why would using an attribute be preferable to having classes like .order-state-new, .order-state-pending, .order-state-canceled?

// Because an attribute is more convenient to manage. The state can be changed as easy as:

// // a bit simpler than removing old/adding a new class
// div.setAttribute('order-state', 'canceled');
// But there may be a possible problem with custom attributes. What if we use a non-standard attribute for our purposes and later the standard introduces it and makes it do something? The HTML language is alive, it grows, and more attributes appear to suit the needs of developers. There may be unexpected effects in such case.

// To avoid conflicts, there exist data-* attributes.

// All attributes starting with “data-” are reserved for programmers’ use. They are available in the dataset property.

// For instance, if an elem has an attribute named "data-about", it’s available as elem.dataset.about.

// Like this:

// <body data-about="Elephants">
// <script>
//   console.log(document.body.dataset.about); // Elephants
// </script>
// Multiword attributes like data-order-state become camel-cased: dataset.orderState.

// Here’s a rewritten “order state” example:

// <style>
//   .order[data-order-state="new"] {
//     color: green;
//   }

//   .order[data-order-state="pending"] {
//     color: blue;
//   }

//   .order[data-order-state="canceled"] {
//     color: red;
//   }
// </style>

// <div id="order" class="order" data-order-state="new">
//   A new order.
// </div>

// <script>
//   // read
//   console.log(order.dataset.orderState); // new

//   // modify
//   order.dataset.orderState = "pending"; // (*)
// </script>
// Using data-* attributes is a valid, safe way to pass custom data.

// Please note that we can not only read, but also modify data-attributes. Then CSS updates the view accordingly: in the example above the last line (*) changes the color to blue.

// Summary
// Attributes – is what’s written in HTML.
// Properties – is what’s in DOM objects.
// A small comparison:

// Properties	Attributes
// Type	Any value, standard properties have types described in the spec	A string
// Name	Name is case-sensitive	Name is not case-sensitive
// Methods to work with attributes are:

// elem.hasAttribute(name) – to check for existence.
// elem.getAttribute(name) – to get the value.
// elem.setAttribute(name, value) – to set the value.
// elem.removeAttribute(name) – to remove the attribute.
// elem.attributes is a collection of all attributes.
// For most situations using DOM properties is preferable. We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:

// We need a non-standard attribute. But if it starts with data-, then we should use dataset.
// We want to read the value “as written” in HTML. The value of the DOM property may be different, for instance the href property is always a full URL, and we may want to get the “original” value.
// ///////////////////////////////////////////////////////////////////

// // Modifying the document
// Modifying the document
// DOM modification is the key to creating “live” pages.

// Here we’ll see how to create new elements “on the fly” and modify the existing page content.

// Example: show a message
// Let’s demonstrate using an example. We’ll add a message on the page that looks nicer than console.log.

// Here’s how it will look:

// <style>
// .console.log {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <div class="console.log">
//   <strong>Hi there!</strong> You've read an important message.
// </div>

// That was the HTML example. Now let’s create the same div with JavaScript (assuming that the styles are in the HTML/CSS already).

// Creating an element
// To create DOM nodes, there are two methods:

// document.createElement(tag)
// Creates a new element node with the given tag:

// let div = document.createElement('div');
// document.createTextNode(text)
// Creates a new text node with the given text:

// let textNode = document.createTextNode('Here I am');
// Most of the time we need to create element nodes, such as the div for the message.

// Creating the message
// Creating the message div takes 3 steps:

// // 1. Create <div> element
// let div = document.createElement('div');

// // 2. Set its class to "console.log"
// div.className = "console.log";

// // 3. Fill it with the content
// div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
// We’ve created the element. But as of now it’s only in a variable named div, not in the page yet. So we can’t see it.

// Insertion methods
// To make the div show up, we need to insert it somewhere into document. For instance, into <body> element, referenced by document.body.

// There’s a special method append for that: document.body.append(div).

// Here’s the full code:

// <style>
// .console.log {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <script>
//   let div = document.createElement('div');
//   div.className = "console.log";
//   div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

//   document.body.append(div);
// </script>
// Here we called append on document.body, but we can call append method on any other element, to put another element into it. For instance, we can append something to <div> by calling div.append(anotherElement).

// Here are more insertion methods, they specify different places where to insert:

// node.append(...nodes or strings) – append nodes or strings at the end of node,
// node.prepend(...nodes or strings) – insert nodes or strings at the beginning of node,
// node.before(...nodes or strings) –- insert nodes or strings before node,
// node.after(...nodes or strings) –- insert nodes or strings after node,
// node.replaceWith(...nodes or strings) –- replaces node with the given nodes or strings.
// Arguments of these methods are an arbitrary list of DOM nodes to insert, or text strings (that become text nodes automatically).

// Let’s see them in action.

// Here’s an example of using these methods to add items to a list and the text before/after it:

// <ol id="ol">
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
// </ol>

// <script>
//   ol.before('before'); // insert string "before" before <ol>
//   ol.after('after'); // insert string "after" after <ol>

//   let liFirst = document.createElement('li');
//   liFirst.innerHTML = 'prepend';
//   ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

//   let liLast = document.createElement('li');
//   liLast.innerHTML = 'append';
//   ol.append(liLast); // insert liLast at the end of <ol>
// </script>

// Here’s a visual picture of what the methods do:

// So the final list will be:

// before
// <ol id="ol">
//   <li>prepend</li>
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
//   <li>append</li>
// </ol>
// after
// As said, these methods can insert multiple nodes and text pieces in a single call.

// For instance, here a string and an element are inserted:

// <div id="div"></div>
// <script>
//   div.before('<p>Hello</p>', document.createElement('hr'));
// </script>
// Please note: the text is inserted “as text”, not “as HTML”, with proper escaping of characters such as <, >.

// So the final HTML is:

// &lt;p&gt;Hello&lt;/p&gt;
// <hr>
// <div id="div"></div>
// In other words, strings are inserted in a safe way, like elem.textContent does it.

// So, these methods can only be used to insert DOM nodes or text pieces.

// But what if we’d like to insert an HTML string “as html”, with all tags and stuff working, in the same manner as elem.innerHTML does it?

// insertAdjacentHTML/Text/Element
// For that we can use another, pretty versatile method: elem.insertAdjacentHTML(where, html).

// The first parameter is a code word, specifying where to insert relative to elem. Must be one of the following:

// "beforebegin" – insert html immediately before elem,
// "afterbegin" – insert html into elem, at the beginning,
// "beforeend" – insert html into elem, at the end,
// "afterend" – insert html immediately after elem.
// The second parameter is an HTML string, that is inserted “as HTML”.

// For instance:

// <div id="div"></div>
// <script>
//   div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
//   div.insertAdjacentHTML('afterend', '<p>Bye</p>');
// </script>
// …Would lead to:

// <p>Hello</p>
// <div id="div"></div>
// <p>Bye</p>
// That’s how we can append arbitrary HTML to the page.

// Here’s the picture of insertion variants:

// We can easily notice similarities between this and the previous picture. The insertion points are actually the same, but this method inserts HTML.

// The method has two brothers:

// elem.insertAdjacentText(where, text) – the same syntax, but a string of text is inserted “as text” instead of HTML,
// elem.insertAdjacentElement(where, elem) – the same syntax, but inserts an element.
// They exist mainly to make the syntax “uniform”. In practice, only insertAdjacentHTML is used most of the time. Because for elements and text, we have methods append/prepend/before/after – they are shorter to write and can insert nodes/text pieces.

// So here’s an alternative variant of showing a message:

// <style>
// .console.log {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <script>
//   document.body.insertAdjacentHTML("afterbegin", `<div class="console.log">
//     <strong>Hi there!</strong> You've read an important message.
//   </div>`);
// </script>
// Node removal
// To remove a node, there’s a method node.remove().

// Let’s make our message disappear after a second:

// <style>
// .console.log {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <script>
//   let div = document.createElement('div');
//   div.className = "console.log";
//   div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

//   document.body.append(div);
//   setTimeout(() => div.remove(), 1000);
// </script>
// Please note: if we want to move an element to another place – there’s no need to remove it from the old one.

// All insertion methods automatically remove the node from the old place.

// For instance, let’s swap elements:

// <div id="first">First</div>
// <div id="second">Second</div>
// <script>
//   // no need to call remove
//   second.after(first); // take #second and after it insert #first
// </script>
// Cloning nodes: cloneNode
// How to insert one more similar message?

// We could make a function and put the code there. But the alternative way would be to clone the existing div and modify the text inside it (if needed).

// Sometimes when we have a big element, that may be faster and simpler.

// The call elem.cloneNode(true) creates a “deep” clone of the element – with all attributes and subelements. If we call elem.cloneNode(false), then the clone is made without child elements.
// An example of copying the message:

// <style>
// .console.log {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <div class="console.log" id="div">
//   <strong>Hi there!</strong> You've read an important message.
// </div>

// <script>
//   let div2 = div.cloneNode(true); // clone the message
//   div2.querySelector('strong').innerHTML = 'Bye there!'; // change the clone

//   div.after(div2); // show the clone after the existing div
// </script>
// DocumentFragment
// DocumentFragment is a special DOM node that serves as a wrapper to pass around lists of nodes.

// We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.

// For example, getListContent below generates a fragment with <li> items, that are later inserted into <ul>:

// <ul id="ul"></ul>

// <script>
// function getListContent() {
//   let fragment = new DocumentFragment();

//   for(let i=1; i<=3; i++) {
//     let li = document.createElement('li');
//     li.append(i);
//     fragment.append(li);
//   }

//   return fragment;
// }

// ul.append(getListContent()); // (*)
// </script>
// Please note, at the last line (*) we append DocumentFragment, but it “blends in”, so the resulting structure will be:

// <ul>
//   <li>1</li>
//   <li>2</li>
//   <li>3</li>
// </ul>
// DocumentFragment is rarely used explicitly. Why append to a special kind of node, if we can return an array of nodes instead? Rewritten example:

// <ul id="ul"></ul>

// <script>
// function getListContent() {
//   let result = [];

//   for(let i=1; i<=3; i++) {
//     let li = document.createElement('li');
//     li.append(i);
//     result.push(li);
//   }

//   return result;
// }

// ul.append(...getListContent()); // append + "..." operator = friends!
// </script>
// We mention DocumentFragment mainly because there are some concepts on top of it, like template element, that we’ll cover much later.

// Old-school insert/remove methods
// Old school
// This information helps to understand old scripts, but not needed for new development.
// There are also “old school” DOM manipulation methods, existing for historical reasons.

// These methods come from really ancient times. Nowadays, there’s no reason to use them, as modern methods, such as append, prepend, before, after, remove, replaceWith, are more flexible.

// The only reason we list these methods here is that you can find them in many old scripts:

// parentElem.appendChild(node)
// Appends node as the last child of parentElem.

// The following example adds a new <li> to the end of <ol>:

// <ol id="list">
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
// </ol>

// <script>
//   let newLi = document.createElement('li');
//   newLi.innerHTML = 'Hello, world!';

//   list.appendChild(newLi);
// </script>
// parentElem.insertBefore(node, nextSibling)
// Inserts node before nextSibling into parentElem.

// The following code inserts a new list item before the second <li>:

// <ol id="list">
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
// </ol>
// <script>
//   let newLi = document.createElement('li');
//   newLi.innerHTML = 'Hello, world!';

//   list.insertBefore(newLi, list.children[1]);
// </script>
// To insert newLi as the first element, we can do it like this:

// list.insertBefore(newLi, list.firstChild);
// parentElem.replaceChild(node, oldChild)
// Replaces oldChild with node among children of parentElem.

// parentElem.removeChild(node)
// Removes node from parentElem (assuming node is its child).

// The following example removes first <li> from <ol>:

// <ol id="list">
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
// </ol>

// <script>
//   let li = list.firstElementChild;
//   list.removeChild(li);
// </script>
// All these methods return the inserted/removed node. In other words, parentElem.appendChild(node) returns node. But usually the returned value is not used, we just run the method.

// A word about “document.write”
// There’s one more, very ancient method of adding something to a web-page: document.write.

// The syntax:

// <p>Somewhere in the page...</p>
// <script>
//   document.write('<b>Hello from JS</b>');
// </script>
// <p>The end</p>
// The call to document.write(html) writes the html into page “right here and now”. The html string can be dynamically generated, so it’s kind of flexible. We can use JavaScript to create a full-fledged webpage and write it.

// The method comes from times when there was no DOM, no standards… Really old times. It still lives, because there are scripts using it.

// In modern scripts we can rarely see it, because of the following important limitation:

// The call to document.write only works while the page is loading.

// If we call it afterwards, the existing document content is erased.

// For instance:

// <p>After one second the contents of this page will be replaced...</p>
// <script>
//   // document.write after 1 second
//   // that's after the page loaded, so it erases the existing content
//   setTimeout(() => document.write('<b>...By this.</b>'), 1000);
// </script>
// So it’s kind of unusable at “after loaded” stage, unlike other DOM methods we covered above.

// That’s the downside.

// There’s an upside also. Technically, when document.write is called while the browser is reading (“parsing”) incoming HTML, and it writes something, the browser consumes it just as if it were initially there, in the HTML text.

// So it works blazingly fast, because there’s no DOM modification involved. It writes directly into the page text, while the DOM is not yet built.

// So if we need to add a lot of text into HTML dynamically, and we’re at page loading phase, and the speed matters, it may help. But in practice these requirements rarely come together. And usually we can see this method in scripts just because they are old.

// Summary
// Methods to create new nodes:

// document.createElement(tag) – creates an element with the given tag,
// document.createTextNode(value) – creates a text node (rarely used),
// elem.cloneNode(deep) – clones the element, if deep==true then with all descendants.
// Insertion and removal:

// node.append(...nodes or strings) – insert into node, at the end,
// node.prepend(...nodes or strings) – insert into node, at the beginning,
// node.before(...nodes or strings) –- insert right before node,
// node.after(...nodes or strings) –- insert right after node,
// node.replaceWith(...nodes or strings) –- replace node.
// node.remove() –- remove the node.
// Text strings are inserted “as text”.

// There are also “old school” methods:

// parent.appendChild(node)
// parent.insertBefore(node, nextSibling)
// parent.removeChild(node)
// parent.replaceChild(newElem, node)
// All these methods return node.

// Given some HTML in html, elem.insertAdjacentHTML(where, html) inserts it depending on the value of where:

// "beforebegin" – insert html right before elem,
// "afterbegin" – insert html into elem, at the beginning,
// "beforeend" – insert html into elem, at the end,
// "afterend" – insert html right after elem.
// Also there are similar methods, elem.insertAdjacentText and elem.insertAdjacentElement, that insert text strings and elements, but they are rarely used.

// To append HTML to the page before it has finished loading:

// document.write(html)
// After the page is loaded such a call erases the document. Mostly seen in old scripts.
// ///////////////////////////////////////////////////////////////////

// // Styles and classes
// Styles and classes
// Before we get into JavaScript’s ways of dealing with styles and classes – here’s an important rule. Hopefully it’s obvious enough, but we still have to mention it.

// There are generally two ways to style an element:

// Create a class in CSS and add it: <div class="...">
// Write properties directly into style: <div style="...">.
// JavaScript can modify both classes and style properties.

// We should always prefer CSS classes to style. The latter should only be used if classes “can’t handle it”.

// For example, style is acceptable if we calculate coordinates of an element dynamically and want to set them from JavaScript, like this:

// let top = /* complex calculations */;
// let left = /* complex calculations */;

// elem.style.left = left; // e.g '123px', calculated at run-time
// elem.style.top = top; // e.g '456px'
// For other cases, like making the text red, adding a background icon – describe that in CSS and then add the class (JavaScript can do that). That’s more flexible and easier to support.

// className and classList
// Changing a class is one of the most often used actions in scripts.

// In the ancient time, there was a limitation in JavaScript: a reserved word like "class" could not be an object property. That limitation does not exist now, but at that time it was impossible to have a "class" property, like elem.class.

// So for classes the similar-looking property "className" was introduced: the elem.className corresponds to the "class" attribute.

// For instance:

// <body class="main page">
//   <script>
//     console.log(document.body.className); // main page
//   </script>
// </body>
// If we assign something to elem.className, it replaces the whole string of classes. Sometimes that’s what we need, but often we want to add/remove a single class.

// There’s another property for that: elem.classList.

// The elem.classList is a special object with methods to add/remove/toggle a single class.

// For instance:

// <body class="main page">
//   <script>
//     // add a class
//     document.body.classList.add('article');

//     console.log(document.body.className); // main page article
//   </script>
// </body>
// So we can operate both on the full class string using className or on individual classes using classList. What we choose depends on our needs.

// Methods of classList:

// elem.classList.add/remove("class") – adds/removes the class.
// elem.classList.toggle("class") – adds the class if it doesn’t exist, otherwise removes it.
// elem.classList.contains("class") – checks for the given class, returns true/false.
// Besides, classList is iterable, so we can list all classes with for..of, like this:

// <body class="main page">
//   <script>
//     for (let name of document.body.classList) {
//       console.log(name); // main, and then page
//     }
//   </script>
// </body>
// Element style
// The property elem.style is an object that corresponds to what’s written in the "style" attribute. Setting elem.style.width="100px" works the same as if we had in the attribute style a string width:100px.

// For multi-word property the camelCase is used:

// background-color  => elem.style.backgroundColor
// z-index           => elem.style.zIndex
// border-left-width => elem.style.borderLeftWidth
// For instance:

// document.body.style.backgroundColor = prompt('background color?', 'green');
// Prefixed properties
// Browser-prefixed properties like -moz-border-radius, -webkit-border-radius also follow the same rule: a dash means upper case.

// For instance:

// button.style.MozBorderRadius = '5px';
// button.style.WebkitBorderRadius = '5px';
// Resetting the style property
// Sometimes we want to assign a style property, and later remove it.

// For instance, to hide an element, we can set elem.style.display = "none".

// Then later we may want to remove the style.display as if it were not set. Instead of delete elem.style.display we should assign an empty string to it: elem.style.display = "".

// // if we run this code, the <body> will blink
// document.body.style.display = "none"; // hide

// setTimeout(() => document.body.style.display = "", 1000); // back to normal
// If we set style.display to an empty string, then the browser applies CSS classes and its built-in styles normally, as if there were no such style.display property at all.

// Also there is a special method for that, elem.style.removeProperty('style property'). So, We can remove a property like this:

// document.body.style.background = 'red'; //set background to red

// setTimeout(() => document.body.style.removeProperty('background'), 1000); // remove background after 1 second
// Full rewrite with style.cssText
// Normally, we use style.* to assign individual style properties. We can’t set the full style like div.style="color: red; width: 100px", because div.style is an object, and it’s read-only.

// To set the full style as a string, there’s a special property style.cssText:

// <div id="div">Button</div>

// <script>
//   // we can set special style flags like "important" here
//   div.style.cssText=`color: red !important;
//     background-color: yellow;
//     width: 100px;
//     text-align: center;
//   `;

//   console.log(div.style.cssText);
// </script>
// This property is rarely used, because such assignment removes all existing styles: it does not add, but replaces them. May occasionally delete something needed. But we can safely use it for new elements, when we know we won’t delete an existing style.

// The same can be accomplished by setting an attribute: div.setAttribute('style', 'color: red...').

// Mind the units
// Don’t forget to add CSS units to values.

// For instance, we should not set elem.style.top to 10, but rather to 10px. Otherwise it wouldn’t work:

// <body>
//   <script>
//     // doesn't work!
//     document.body.style.margin = 20;
//     console.log(document.body.style.margin); // '' (empty string, the assignment is ignored)

//     // now add the CSS unit (px) - and it works
//     document.body.style.margin = '20px';
//     console.log(document.body.style.margin); // 20px

//     console.log(document.body.style.marginTop); // 20px
//     console.log(document.body.style.marginLeft); // 20px
//   </script>
// </body>
// Please note: the browser “unpacks” the property style.margin in the last lines and infers style.marginLeft and style.marginTop from it.

// Computed styles: getComputedStyle
// So, modifying a style is easy. But how to read it?

// For instance, we want to know the size, margins, the color of an element. How to do it?

// The style property operates only on the value of the "style" attribute, without any CSS cascade.

// So we can’t read anything that comes from CSS classes using elem.style.

// For instance, here style doesn’t see the margin:

// <head>
//   <style> body { color: red; margin: 5px } </style>
// </head>
// <body>

//   The red text
//   <script>
//     console.log(document.body.style.color); // empty
//     console.log(document.body.style.marginTop); // empty
//   </script>
// </body>
// …But what if we need, say, to increase the margin by 20px? We would want the current value of it.

// There’s another method for that: getComputedStyle.

// The syntax is:

// getComputedStyle(element, [pseudo])
// element
// Element to read the value for.
// pseudo
// A pseudo-element if required, for instance ::before. An empty string or no argument means the element itself.
// The result is an object with styles, like elem.style, but now with respect to all CSS classes.

// For instance:

// <head>
//   <style> body { color: red; margin: 5px } </style>
// </head>
// <body>

//   <script>
//     let computedStyle = getComputedStyle(document.body);

//     // now we can read the margin and the color from it

//     console.log( computedStyle.marginTop ); // 5px
//     console.log( computedStyle.color ); // rgb(255, 0, 0)
//   </script>

// </body>
// Computed and resolved values
// There are two concepts in CSS:

// A computed style value is the value after all CSS rules and CSS inheritance is applied, as the result of the CSS cascade. It can look like height:1em or font-size:125%.
// A resolved style value is the one finally applied to the element. Values like 1em or 125% are relative. The browser takes the computed value and makes all units fixed and absolute, for instance: height:20px or font-size:16px. For geometry properties resolved values may have a floating point, like width:50.5px.
// A long time ago getComputedStyle was created to get computed values, but it turned out that resolved values are much more convenient, and the standard changed.

// So nowadays getComputedStyle actually returns the resolved value of the property, usually in px for geometry.

// getComputedStyle requires the full property name
// We should always ask for the exact property that we want, like paddingLeft or marginTop or borderTopWidth. Otherwise the correct result is not guaranteed.

// For instance, if there are properties paddingLeft/paddingTop, then what should we get for getComputedStyle(elem).padding? Nothing, or maybe a “generated” value from known paddings? There’s no standard rule here.

// There are other inconsistencies. As an example, some browsers (Chrome) show 10px in the document below, and some of them (Firefox) – do not:

// <style>
//   body {
//     margin: 10px;
//   }
// </style>
// <script>
//   let style = getComputedStyle(document.body);
//   console.log(style.margin); // empty string in Firefox
// </script>
// Styles applied to :visited links are hidden!
// Visited links may be colored using :visited CSS pseudoclass.

// But getComputedStyle does not give access to that color, because otherwise an arbitrary page could find out whether the user visited a link by creating it on the page and checking the styles.

// JavaScript may not see the styles applied by :visited. And also, there’s a limitation in CSS that forbids applying geometry-changing styles in :visited. That’s to guarantee that there’s no side way for an evil page to test if a link was visited and hence to break the privacy.

// Summary
// To manage classes, there are two DOM properties:

// className – the string value, good to manage the whole set of classes.
// classList – the object with methods add/remove/toggle/contains, good for individual classes.
// To change the styles:

// The style property is an object with camelCased styles. Reading and writing to it has the same meaning as modifying individual properties in the "style" attribute. To see how to apply important and other rare stuff – there’s a list of methods at MDN.

// The style.cssText property corresponds to the whole "style" attribute, the full string of styles.

// To read the resolved styles (with respect to all classes, after all CSS is applied and final values are calculated):

// The getComputedStyle(elem, [pseudo]) returns the style-like object with them. Read-only.
// ///////////////////////////////////////////////////////////////////

// // Element size and scrolling
// Element size and scrolling
// There are many JavaScript properties that allow us to read information about element width, height and other geometry features.

// We often need them when moving or positioning elements in JavaScript.

// Sample element
// As a sample element to demonstrate properties we’ll use the one given below:

// <div id="example">
//   ...Text...
// </div>
// <style>
//   #example {
//     width: 300px;
//     height: 200px;
//     border: 25px solid #E8C48F;
//     padding: 20px;
//     overflow: auto;
//   }
// </style>
// It has the border, padding and scrolling. The full set of features. There are no margins, as they are not the part of the element itself, and there are no special properties for them.

// The element looks like this:

// You can open the document in the sandbox.

// Mind the scrollbar
// The picture above demonstrates the most complex case when the element has a scrollbar. Some browsers (not all) reserve the space for it by taking it from the content (labeled as “content width” above).

// So, without scrollbar the content width would be 300px, but if the scrollbar is 16px wide (the width may vary between devices and browsers) then only 300 - 16 = 284px remains, and we should take it into account. That’s why examples from this chapter assume that there’s a scrollbar. Without it, some calculations are simpler.

// The padding-bottom area may be filled with text
// Usually paddings are shown empty on our illustrations, but if there’s a lot of text in the element and it overflows, then browsers show the “overflowing” text at padding-bottom, that’s normal.

// Geometry
// Here’s the overall picture with geometry properties:

// Values of these properties are technically numbers, but these numbers are “of pixels”, so these are pixel measurements.

// Let’s start exploring the properties starting from the outside of the element.

// offsetParent, offsetLeft/Top
// These properties are rarely needed, but still they are the “most outer” geometry properties, so we’ll start with them.

// The offsetParent is the nearest ancestor that the browser uses for calculating coordinates during rendering.

// That’s the nearest ancestor that is one of the following:

// CSS-positioned (position is absolute, relative, fixed or sticky), or
// <td>, <th>, or <table>, or
// <body>.
// Properties offsetLeft/offsetTop provide x/y coordinates relative to offsetParent upper-left corner.

// In the example below the inner <div> has <main> as offsetParent and offsetLeft/offsetTop shifts from its upper-left corner (180):

// <main style="position: relative" id="main">
//   <article>
//     <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
//   </article>
// </main>
// <script>
//   console.log(example.offsetParent.id); // main
//   console.log(example.offsetLeft); // 180 (note: a number, not a string "180px")
//   console.log(example.offsetTop); // 180
// </script>

// There are several occasions when offsetParent is null:

// For not shown elements (display:none or not in the document).
// For <body> and <html>.
// For elements with position:fixed.
// offsetWidth/Height
// Now let’s move on to the element itself.

// These two properties are the simplest ones. They provide the “outer” width/height of the element. Or, in other words, its full size including borders.

// For our sample element:

// offsetWidth = 390 – the outer width, can be calculated as inner CSS-width (300px) plus paddings (2 * 20px) and borders (2 * 25px).
// offsetHeight = 290 – the outer height.
// Geometry properties are zero/null for elements that are not displayed
// Geometry properties are calculated only for displayed elements.

// If an element (or any of its ancestors) has display:none or is not in the document, then all geometry properties are zero (or null for offsetParent).

// For example, offsetParent is null, and offsetWidth, offsetHeight are 0 when we created an element, but haven’t inserted it into the document yet, or it (or its ancestor) has display:none.

// We can use this to check if an element is hidden, like this:

// function isHidden(elem) {
//   return !elem.offsetWidth && !elem.offsetHeight;
// }
// Please note that such isHidden returns true for elements that are on-screen, but have zero sizes.

// clientTop/Left
// Inside the element we have the borders.

// To measure them, there are properties clientTop and clientLeft.

// In our example:

// clientLeft = 25 – left border width
// clientTop = 25 – top border width

// …But to be precise – these properties are not border width/height, but rather relative coordinates of the inner side from the outer side.

// What’s the difference?

// It becomes visible when the document is right-to-left (the operating system is in Arabic or Hebrew languages). The scrollbar is then not on the right, but on the left, and then clientLeft also includes the scrollbar width.

// In that case, clientLeft would be not 25, but with the scrollbar width 25 + 16 = 41.

// Here’s the example in hebrew:

// clientWidth/Height
// These properties provide the size of the area inside the element borders.

// They include the content width together with paddings, but without the scrollbar:

// On the picture above let’s first consider clientHeight.

// There’s no horizontal scrollbar, so it’s exactly the sum of what’s inside the borders: CSS-height 200px plus top and bottom paddings (2 * 20px) total 240px.

// Now clientWidth – here the content width is not 300px, but 284px, because 16px are occupied by the scrollbar. So the sum is 284px plus left and right paddings, total 324px.

// If there are no paddings, then clientWidth/Height is exactly the content area, inside the borders and the scrollbar (if any).

// So when there’s no padding we can use clientWidth/clientHeight to get the content area size.

// scrollWidth/Height
// These properties are like clientWidth/clientHeight, but they also include the scrolled out (hidden) parts:

// On the picture above:

// scrollHeight = 723 – is the full inner height of the content area including the scrolled out parts.
// scrollWidth = 324 – is the full inner width, here we have no horizontal scroll, so it equals clientWidth.
// We can use these properties to expand the element wide to its full width/height.

// Like this:

// // expand the element to the full content height
// element.style.height = `${element.scrollHeight}px`;
// Click the button to expand the element:

// text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
// element.style.height = ${element.scrollHeight}px

// scrollLeft/scrollTop
// Properties scrollLeft/scrollTop are the width/height of the hidden, scrolled out part of the element.

// On the picture below we can see scrollHeight and scrollTop for a block with a vertical scroll.

// In other words, scrollTop is “how much is scrolled up”.

// scrollLeft/scrollTop can be modified
// Most of the geometry properties here are read-only, but scrollLeft/scrollTop can be changed, and the browser will scroll the element.

// If you click the element below, the code elem.scrollTop += 10 executes. That makes the element content scroll 10px down.

// Click
// Me
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// Setting scrollTop to 0 or a big value, such as 1e9 will make the element scroll to the very top/bottom respectively.

// Don’t take width/height from CSS
// We’ve just covered geometry properties of DOM elements, that can be used to get widths, heights and calculate distances.

// But as we know from the chapter Styles and classes, we can read CSS-height and width using getComputedStyle.

// So why not to read the width of an element with getComputedStyle, like this?

// let elem = document.body;

// console.log( getComputedStyle(elem).width ); // show CSS width for elem
// Why should we use geometry properties instead? There are two reasons:

// First, CSS width/height depend on another property: box-sizing that defines “what is” CSS width and height. A change in box-sizing for CSS purposes may break such JavaScript.

// Second, CSS width/height may be auto, for instance for an inline element:

// <span id="elem">Hello!</span>

// <script>
//   console.log( getComputedStyle(elem).width ); // auto
// </script>
// From the CSS standpoint, width:auto is perfectly normal, but in JavaScript we need an exact size in px that we can use in calculations. So here CSS width is useless.

// And there’s one more reason: a scrollbar. Sometimes the code that works fine without a scrollbar becomes buggy with it, because a scrollbar takes the space from the content in some browsers. So the real width available for the content is less than CSS width. And clientWidth/clientHeight take that into account.

// …But with getComputedStyle(elem).width the situation is different. Some browsers (e.g. Chrome) return the real inner width, minus the scrollbar, and some of them (e.g. Firefox) – CSS width (ignore the scrollbar). Such cross-browser differences is the reason not to use getComputedStyle, but rather rely on geometry properties.

// If your browser reserves the space for a scrollbar (most browsers for Windows do), then you can test it below.

// The element with text has CSS width:300px.

// On a Desktop Windows OS, Firefox, Chrome, Edge all reserve the space for the scrollbar. But Firefox shows 300px, while Chrome and Edge show less. That’s because Firefox returns the CSS width and other browsers return the “real” width.

// Please note that the described difference is only about reading getComputedStyle(...).width from JavaScript, visually everything is correct.

// Summary
// Elements have the following geometry properties:

// offsetParent – is the nearest positioned ancestor or td, th, table, body.
// offsetLeft/offsetTop – coordinates relative to the upper-left edge of offsetParent.
// offsetWidth/offsetHeight – “outer” width/height of an element including borders.
// clientLeft/clientTop – the distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so clientLeft includes its width too.
// clientWidth/clientHeight – the width/height of the content including paddings, but without the scrollbar.
// scrollWidth/scrollHeight – the width/height of the content, just like clientWidth/clientHeight, but also include scrolled-out, invisible part of the element.
// scrollLeft/scrollTop – width/height of the scrolled out upper part of the element, starting from its upper-left corner.
// All properties are read-only except scrollLeft/scrollTop that make the browser scroll the element if changed.
// ///////////////////////////////////////////////////////////////////

// // Window sizes and scrolling

// Window sizes and scrolling
// How do we find the width and height of the browser window? How do we get the full width and height of the document, including the scrolled out part? How do we scroll the page using JavaScript?

// For this type of information, we can use the root document element document.documentElement, that corresponds to the <html> tag. But there are additional methods and peculiarities to consider.

// Width/height of the window
// To get window width and height, we can use the clientWidth/clientHeight of document.documentElement:

// For instance, this button shows the height of your window:

// console.log(document.documentElement.clientHeight)

// Not window.innerWidth/innerHeight
// Browsers also support properties like window.innerWidth/innerHeight. They look like what we want, so why not to use them instead?

// If there exists a scrollbar, and it occupies some space, clientWidth/clientHeight provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

// window.innerWidth/innerHeight includes the scrollbar.

// If there’s a scrollbar, and it occupies some space, then these two lines show different values:

// console.log( window.innerWidth ); // full window width
// console.log( document.documentElement.clientWidth ); // window width minus the scrollbar
// In most cases, we need the available window width in order to draw or position something within scrollbars (if there are any), so we should use documentElement.clientHeight/clientWidth.

// DOCTYPE is important
// Please note: top-level geometry properties may work a little bit differently when there’s no <!DOCTYPE HTML> in HTML. Odd things are possible.

// In modern HTML we should always write DOCTYPE.

// Width/height of the document
// Theoretically, as the root document element is document.documentElement, and it encloses all the content, we could measure the document’s full size as document.documentElement.scrollWidth/scrollHeight.

// But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there’s no scroll, then documentElement.scrollHeight may be even less than documentElement.clientHeight! Weird, right?

// To reliably obtain the full document height, we should take the maximum of these properties:

// let scrollHeight = Math.max(
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );

// console.log('Full document height, with scrolled out part: ' + scrollHeight);
// Why so? Better don’t ask. These inconsistencies come from ancient times, not a “smart” logic.

// Get the current scroll
// DOM elements have their current scroll state in their scrollLeft/scrollTop properties.

// For document scroll, document.documentElement.scrollLeft/scrollTop works in most browsers, except older WebKit-based ones, like Safari (bug 5991), where we should use document.body instead of document.documentElement.

// Luckily, we don’t have to remember these peculiarities at all, because the scroll is available in the special properties, window.pageXOffset/pageYOffset:

// console.log('Current scroll from the top: ' + window.pageYOffset);
// console.log('Current scroll from the left: ' + window.pageXOffset);
// These properties are read-only.

// Also available as window properties scrollX and scrollY
// For historical reasons, both properties exist, but they are the same:

// window.pageXOffset is an alias of window.scrollX.
// window.pageYOffset is an alias of window.scrollY.
// Scrolling: scrollTo, scrollBy, scrollIntoView
// Important:
// To scroll the page with JavaScript, its DOM must be fully built.

// For instance, if we try to scroll the page with a script in <head>, it won’t work.

// Regular elements can be scrolled by changing scrollTop/scrollLeft.

// We can do the same for the page using document.documentElement.scrollTop/scrollLeft (except Safari, where document.body.scrollTop/Left should be used instead).

// Alternatively, there’s a simpler, universal solution: special methods window.scrollBy(x,y) and window.scrollTo(pageX,pageY).

// The method scrollBy(x,y) scrolls the page relative to its current position. For instance, scrollBy(0,10) scrolls the page 10px down.

// The button below demonstrates this:

// window.scrollBy(0,10)

// The method scrollTo(pageX,pageY) scrolls the page to absolute coordinates, so that the top-left corner of the visible part has coordinates (pageX, pageY) relative to the document’s top-left corner. It’s like setting scrollLeft/scrollTop.

// To scroll to the very beginning, we can use scrollTo(0,0).

// window.scrollTo(0,0)

// These methods work for all browsers the same way.

// scrollIntoView
// For completeness, let’s cover one more method: elem.scrollIntoView(top).

// The call to elem.scrollIntoView(top) scrolls the page to make elem visible. It has one argument:

// If top=true (that’s the default), then the page will be scrolled to make elem appear on the top of the window. The upper edge of the element will be aligned with the window top.
// If top=false, then the page scrolls to make elem appear at the bottom. The bottom edge of the element will be aligned with the window bottom.
// The button below scrolls the page to position itself at the window top:

// this.scrollIntoView()

// And this button scrolls the page to position itself at the bottom:

// this.scrollIntoView(false)

// Forbid the scrolling
// Sometimes we need to make the document “unscrollable”. For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

// To make the document unscrollable, it’s enough to set document.body.style.overflow = "hidden". The page will “freeze” at its current scroll position.

// Try it:

// document.body.style.overflow = ‘hidden’

// document.body.style.overflow = ‘’

// The first button freezes the scroll, while the second one releases it.

// We can use the same technique to freeze the scroll for other elements, not just for document.body.

// The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content “jumps” to fill it.

// That looks a bit odd, but can be worked around if we compare clientWidth before and after the freeze. If it increased (the scrollbar disappeared), then add padding to document.body in place of the scrollbar to keep the content width the same.

// Summary
// Geometry:

// Width/height of the visible part of the document (content area width/height): document.documentElement.clientWidth/clientHeight

// Width/height of the whole document, with the scrolled out part:

// let scrollHeight = Math.max(
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );
// Scrolling:

// Read the current scroll: window.pageYOffset/pageXOffset.

// Change the current scroll:

// window.scrollTo(pageX,pageY) – absolute coordinates,
// window.scrollBy(x,y) – scroll relative the current place,
// elem.scrollIntoView(top) – scroll to make elem visible (align with the top/bottom of the window).
// ///////////////////////////////////////////////////////////////////

// // Coordinates
// Coordinates
// To move elements around we should be familiar with coordinates.

// Most JavaScript methods deal with one of two coordinate systems:

// Relative to the window – similar to position:fixed, calculated from the window top/left edge.
// we’ll denote these coordinates as clientX/clientY, the reasoning for such name will become clear later, when we study event properties.
// Relative to the document – similar to position:absolute in the document root, calculated from the document top/left edge.
// we’ll denote them pageX/pageY.
// When the page is scrolled to the very beginning, so that the top/left corner of the window is exactly the document top/left corner, these coordinates equal each other. But after the document shifts, window-relative coordinates of elements change, as elements move across the window, while document-relative coordinates remain the same.

// On this picture we take a point in the document and demonstrate its coordinates before the scroll (left) and after it (right):

// When the document scrolled:

// pageY – document-relative coordinate stayed the same, it’s counted from the document top (now scrolled out).
// clientY – window-relative coordinate did change (the arrow became shorter), as the same point became closer to window top.
// Element coordinates: getBoundingClientRect
// The method elem.getBoundingClientRect() returns window coordinates for a minimal rectangle that encloses elem as an object of built-in DOMRect class.

// Main DOMRect properties:

// x/y – X/Y-coordinates of the rectangle origin relative to window,
// width/height – width/height of the rectangle (can be negative).
// Additionally, there are derived properties:

// top/bottom – Y-coordinate for the top/bottom rectangle edge,
// left/right – X-coordinate for the left/right rectangle edge.
// For instance click this button to see its window coordinates:

// If you scroll the page and repeat, you’ll notice that as window-relative button position changes, its window coordinates (y/top/bottom if you scroll vertically) change as well.

// Here’s the picture of elem.getBoundingClientRect() output:

// As you can see, x/y and width/height fully describe the rectangle. Derived properties can be easily calculated from them:

// left = x
// top = y
// right = x + width
// bottom = y + height
// Please note:

// Coordinates may be decimal fractions, such as 10.5. That’s normal, internally browser uses fractions in calculations. We don’t have to round them when setting to style.left/top.
// Coordinates may be negative. For instance, if the page is scrolled so that elem is now above the window, then elem.getBoundingClientRect().top is negative.
// Why derived properties are needed? Why does top/left exist if there’s x/y?
// Mathematically, a rectangle is uniquely defined with its starting point (x,y) and the direction vector (width,height). So the additional derived properties are for convenience.

// Technically it’s possible for width/height to be negative, that allows for “directed” rectangle, e.g. to represent mouse selection with properly marked start and end.

// Negative width/height values mean that the rectangle starts at its bottom-right corner and then “grows” left-upwards.

// Here’s a rectangle with negative width and height (e.g. width=-200, height=-100):

// As you can see, left/top do not equal x/y in such case.

// In practice though, elem.getBoundingClientRect() always returns positive width/height, here we mention negative width/height only for you to understand why these seemingly duplicate properties are not actually duplicates.

// Internet Explorer: no support for x/y
// Internet Explorer doesn’t support x/y properties for historical reasons.

// So we can either make a polyfill (add getters in DomRect.prototype) or just use top/left, as they are always the same as x/y for positive width/height, in particular in the result of elem.getBoundingClientRect().

// Coordinates right/bottom are different from CSS position properties
// There are obvious similarities between window-relative coordinates and CSS position:fixed.

// But in CSS positioning, right property means the distance from the right edge, and bottom property means the distance from the bottom edge.

// If we just look at the picture above, we can see that in JavaScript it is not so. All window coordinates are counted from the top-left corner, including these ones.

// elementFromPoint(x, y)
// The call to document.elementFromPoint(x, y) returns the most nested element at window coordinates (x, y).

// The syntax is:

// let elem = document.elementFromPoint(x, y);
// For instance, the code below highlights and outputs the tag of the element that is now in the middle of the window:

// let centerX = document.documentElement.clientWidth / 2;
// let centerY = document.documentElement.clientHeight / 2;

// let elem = document.elementFromPoint(centerX, centerY);

// elem.style.background = "red";
// console.log(elem.tagName);
// As it uses window coordinates, the element may be different depending on the current scroll position.

// For out-of-window coordinates the elementFromPoint returns null
// The method document.elementFromPoint(x,y) only works if (x,y) are inside the visible area.

// If any of the coordinates is negative or exceeds the window width/height, then it returns null.

// Here’s a typical error that may occur if we don’t check for it:

// let elem = document.elementFromPoint(x, y);
// // if the coordinates happen to be out of the window, then elem = null
// elem.style.background = ''; // Error!
// Using for “fixed” positioning
// Most of time we need coordinates in order to position something.

// To show something near an element, we can use getBoundingClientRect to get its coordinates, and then CSS position together with left/top (or right/bottom).

// For instance, the function createMessageUnder(elem, html) below shows the message under elem:

// let elem = document.getElementById("coords-show-mark");

// function createMessageUnder(elem, html) {
//   // create message element
//   let message = document.createElement('div');
//   // better to use a css class for the style here
//   message.style.cssText = "position:fixed; color: red";

//   // assign coordinates, don't forget "px"!
//   let coords = elem.getBoundingClientRect();

//   message.style.left = coords.left + "px";
//   message.style.top = coords.bottom + "px";

//   message.innerHTML = html;

//   return message;
// }

// // Usage:
// // add it for 5 seconds in the document
// let message = createMessageUnder(elem, 'Hello, world!');
// document.body.append(message);
// setTimeout(() => message.remove(), 5000);
// Click the button to run it:

// Button with id=“coords-show-mark”, the message will appear under it

// The code can be modified to show the message at the left, right, below, apply CSS animations to “fade it in” and so on. That’s easy, as we have all the coordinates and sizes of the element.

// But note the important detail: when the page is scrolled, the message flows away from the button.

// The reason is obvious: the message element relies on position:fixed, so it remains at the same place of the window while the page scrolls away.

// To change that, we need to use document-based coordinates and position:absolute.

// Document coordinates
// Document-relative coordinates start from the upper-left corner of the document, not the window.

// In CSS, window coordinates correspond to position:fixed, while document coordinates are similar to position:absolute on top.

// We can use position:absolute and top/left to put something at a certain place of the document, so that it remains there during a page scroll. But we need the right coordinates first.

// There’s no standard method to get the document coordinates of an element. But it’s easy to write it.

// The two coordinate systems are connected by the formula:

// pageY = clientY + height of the scrolled-out vertical part of the document.
// pageX = clientX + width of the scrolled-out horizontal part of the document.
// The function getCoords(elem) will take window coordinates from elem.getBoundingClientRect() and add the current scroll to them:

// // get document coordinates of the element
// function getCoords(elem) {
//   let box = elem.getBoundingClientRect();

//   return {
//     top: box.top + window.pageYOffset,
//     right: box.right + window.pageXOffset,
//     bottom: box.bottom + window.pageYOffset,
//     left: box.left + window.pageXOffset
//   };
// }
// If in the example above we used it with position:absolute, then the message would stay near the element on scroll.

// The modified createMessageUnder function:

// function createMessageUnder(elem, html) {
//   let message = document.createElement('div');
//   message.style.cssText = "position:absolute; color: red";

//   let coords = getCoords(elem);

//   message.style.left = coords.left + "px";
//   message.style.top = coords.bottom + "px";

//   message.innerHTML = html;

//   return message;
// }
// Summary
// Any point on the page has coordinates:

// Relative to the window – elem.getBoundingClientRect().
// Relative to the document – elem.getBoundingClientRect() plus the current page scroll.
// Window coordinates are great to use with position:fixed, and document coordinates do well with position:absolute.

// Both coordinate systems have their pros and cons; there are times we need one or the other one, just like CSS position absolute and fixed.
// ///////////////////////////////////////////////////////////////////
