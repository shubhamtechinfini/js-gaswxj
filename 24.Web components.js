// // From the orbital height
// From the orbital height
// This section describes a set of modern standards for “web components”.

// As of now, these standards are under development. Some features are well-supported and integrated into the modern HTML/DOM standard, while others are yet in draft stage. You can try examples in any browser, Google Chrome is probably the most up to date with these features. Guess, that’s because Google fellows are behind many of the related specifications.

// What’s common between…
// The whole component idea is nothing new. It’s used in many frameworks and elsewhere.

// Before we move to implementation details, take a look at this great achievement of humanity:

// That’s the International Space Station (ISS).

// And this is how it’s made inside (approximately):

// The International Space Station:

// Consists of many components.
// Each component, in its turn, has many smaller details inside.
// The components are very complex, much more complicated than most websites.
// Components are developed internationally, by teams from different countries, speaking different languages.
// …And this thing flies, keeps humans alive in space!

// How are such complex devices created?

// Which principles could we borrow to make our development same-level reliable and scalable? Or, at least, close to it?

// Component architecture
// The well known rule for developing complex software is: don’t make complex software.

// If something becomes complex – split it into simpler parts and connect in the most obvious way.

// A good architect is the one who can make the complex simple.

// We can split user interface into visual components: each of them has own place on the page, can “do” a well-described task, and is separate from the others.

// Let’s take a look at a website, for example Twitter.

// It naturally splits into components:

// Top navigation.
// User info.
// Follow suggestions.
// Submit form.
// (and also 6, 7) – messages.
// Components may have subcomponents, e.g. messages may be parts of a higher-level “message list” component. A clickable user picture itself may be a component, and so on.

// How do we decide, what is a component? That comes from intuition, experience and common sense. Usually it’s a separate visual entity that we can describe in terms of what it does and how it interacts with the page. In the case above, the page has blocks, each of them plays its own role, it’s logical to make these components.

// A component has:

// Its own JavaScript class.
// DOM structure, managed solely by its class, outside code doesn’t access it (“encapsulation” principle).
// CSS styles, applied to the component.
// API: events, class methods etc, to interact with other components.
// Once again, the whole “component” thing is nothing special.

// There exist many frameworks and development methodologies to build them, each with its own bells and whistles. Usually, special CSS classes and conventions are used to provide “component feel” – CSS scoping and DOM encapsulation.

// “Web components” provide built-in browser capabilities for that, so we don’t have to emulate them any more.

// Custom elements – to define custom HTML elements.
// Shadow DOM – to create an internal DOM for the component, hidden from the others.
// CSS Scoping – to declare styles that only apply inside the Shadow DOM of the component.
// Event retargeting and other minor stuff to make custom components better fit the development.
// In the next chapter we’ll go into details of “Custom Elements” – the fundamental and well-supported feature of web components, good on its own.
// ///////////////////////////////////////////////////////////////////

// // Custom elements
// Custom elements
// We can create custom HTML elements, described by our class, with its own methods and properties, events and so on.

// Once a custom element is defined, we can use it on par with built-in HTML elements.

// That’s great, as HTML dictionary is rich, but not infinite. There are no <easy-tabs>, <sliding-carousel>, <beautiful-upload>… Just think of any other tag we might need.

// We can define them with a special class, and then use as if they were always a part of HTML.

// There are two kinds of custom elements:

// Autonomous custom elements – “all-new” elements, extending the abstract HTMLElement class.
// Customized built-in elements – extending built-in elements, like a customized button, based on HTMLButtonElement etc.
// First we’ll cover autonomous elements, and then move to customized built-in ones.

// To create a custom element, we need to tell the browser several details about it: how to show it, what to do when the element is added or removed to page, etc.

// That’s done by making a class with special methods. That’s easy, as there are only few methods, and all of them are optional.

// Here’s a sketch with the full list:

// class MyElement extends HTMLElement {
//   constructor() {
//     super();
//     // element created
//   }

//   connectedCallback() {
//     // browser calls this method when the element is added to the document
//     // (can be called many times if an element is repeatedly added/removed)
//   }

//   disconnectedCallback() {
//     // browser calls this method when the element is removed from the document
//     // (can be called many times if an element is repeatedly added/removed)
//   }

//   static get observedAttributes() {
//     return [/* array of attribute names to monitor for changes */];
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     // called when one of attributes listed above is modified
//   }

//   adoptedCallback() {
//     // called when the element is moved to a new document
//     // (happens in document.adoptNode, very rarely used)
//   }

//   // there can be other element methods and properties
// }
// After that, we need to register the element:

// // let the browser know that <my-element> is served by our new class
// customElements.define("my-element", MyElement);
// Now for any HTML elements with tag <my-element>, an instance of MyElement is created, and the aforementioned methods are called. We also can document.createElement('my-element') in JavaScript.

// Custom element name must contain a hyphen -
// Custom element name must have a hyphen -, e.g. my-element and super-button are valid names, but myelement is not.

// That’s to ensure that there are no name conflicts between built-in and custom HTML elements.

// Example: “time-formatted”
// For example, there already exists <time> element in HTML, for date/time. But it doesn’t do any formatting by itself.

// Let’s create <time-formatted> element that displays the time in a nice, language-aware format:

// <script>
// class TimeFormatted extends HTMLElement { // (1)

//   connectedCallback() {
//     let date = new Date(this.getAttribute('datetime') || Date.now());

//     this.innerHTML = new Intl.DateTimeFormat("default", {
//       year: this.getAttribute('year') || undefined,
//       month: this.getAttribute('month') || undefined,
//       day: this.getAttribute('day') || undefined,
//       hour: this.getAttribute('hour') || undefined,
//       minute: this.getAttribute('minute') || undefined,
//       second: this.getAttribute('second') || undefined,
//       timeZoneName: this.getAttribute('time-zone-name') || undefined,
//     }).format(date);
//   }

// }

// customElements.define("time-formatted", TimeFormatted); // (2)
// </script>

// <!-- (3) -->
// <time-formatted datetime="2019-12-01"
//   year="numeric" month="long" day="numeric"
//   hour="numeric" minute="numeric" second="numeric"
//   time-zone-name="short"
// ></time-formatted>

// The class has only one method connectedCallback() – the browser calls it when <time-formatted> element is added to page (or when HTML parser detects it), and it uses the built-in Intl.DateTimeFormat data formatter, well-supported across the browsers, to show a nicely formatted time.
// We need to register our new element by customElements.define(tag, class).
// And then we can use it everywhere.
// Custom elements upgrade
// If the browser encounters any <time-formatted> elements before customElements.define, that’s not an error. But the element is yet unknown, just like any non-standard tag.

// Such “undefined” elements can be styled with CSS selector :not(:defined).

// When customElement.define is called, they are “upgraded”: a new instance of TimeFormatted is created for each, and connectedCallback is called. They become :defined.

// To get the information about custom elements, there are methods:

// customElements.get(name) – returns the class for a custom element with the given name,
// customElements.whenDefined(name) – returns a promise that resolves (without value) when a custom element with the given name becomes defined.
// Rendering in connectedCallback, not in constructor
// In the example above, element content is rendered (created) in connectedCallback.

// Why not in the constructor?

// The reason is simple: when constructor is called, it’s yet too early. The element is created, but the browser did not yet process/assign attributes at this stage: calls to getAttribute would return null. So we can’t really render there.

// Besides, if you think about it, that’s better performance-wise – to delay the work until it’s really needed.

// The connectedCallback triggers when the element is added to the document. Not just appended to another element as a child, but actually becomes a part of the page. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.

// Observing attributes
// In the current implementation of <time-formatted>, after the element is rendered, further attribute changes don’t have any effect. That’s strange for an HTML element. Usually, when we change an attribute, like a.href, we expect the change to be immediately visible. So let’s fix this.

// We can observe attributes by providing their list in observedAttributes() static getter. For such attributes, attributeChangedCallback is called when they are modified. It doesn’t trigger for other, unlisted attributes (that’s for performance reasons).

// Here’s a new <time-formatted>, that auto-updates when attributes change:

// <script>
// class TimeFormatted extends HTMLElement {

//   render() { // (1)
//     let date = new Date(this.getAttribute('datetime') || Date.now());

//     this.innerHTML = new Intl.DateTimeFormat("default", {
//       year: this.getAttribute('year') || undefined,
//       month: this.getAttribute('month') || undefined,
//       day: this.getAttribute('day') || undefined,
//       hour: this.getAttribute('hour') || undefined,
//       minute: this.getAttribute('minute') || undefined,
//       second: this.getAttribute('second') || undefined,
//       timeZoneName: this.getAttribute('time-zone-name') || undefined,
//     }).format(date);
//   }

//   connectedCallback() { // (2)
//     if (!this.rendered) {
//       this.render();
//       this.rendered = true;
//     }
//   }

//   static get observedAttributes() { // (3)
//     return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
//   }

//   attributeChangedCallback(name, oldValue, newValue) { // (4)
//     this.render();
//   }

// }

// customElements.define("time-formatted", TimeFormatted);
// </script>

// <time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

// <script>
// setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
// </script>

// The rendering logic is moved to render() helper method.
// We call it once when the element is inserted into page.
// For a change of an attribute, listed in observedAttributes(), attributeChangedCallback triggers.
// …and re-renders the element.
// At the end, we can easily make a live timer.
// Rendering order
// When HTML parser builds the DOM, elements are processed one after another, parents before children. E.g. if we have <outer><inner></inner></outer>, then <outer> element is created and connected to DOM first, and then <inner>.

// That leads to important consequences for custom elements.

// For example, if a custom element tries to access innerHTML in connectedCallback, it gets nothing:

// <script>
// customElements.define('user-info', class extends HTMLElement {

//   connectedCallback() {
//     console.log(this.innerHTML); // empty (*)
//   }

// });
// </script>

// <user-info>John</user-info>
// If you run it, the console.log is empty.

// That’s exactly because there are no children on that stage, the DOM is unfinished. HTML parser connected the custom element <user-info>, and is going to proceed to its children, but just didn’t yet.

// If we’d like to pass information to custom element, we can use attributes. They are available immediately.

// Or, if we really need the children, we can defer access to them with zero-delay setTimeout.

// This works:

// <script>
// customElements.define('user-info', class extends HTMLElement {

//   connectedCallback() {
//     setTimeout(() => console.log(this.innerHTML)); // John (*)
//   }

// });
// </script>

// <user-info>John</user-info>
// Now the console.log in line (*) shows “John”, as we run it asynchronously, after the HTML parsing is complete. We can process children if needed and finish the initialization.

// On the other hand, this solution is also not perfect. If nested custom elements also use setTimeout to initialize themselves, then they queue up: the outer setTimeout triggers first, and then the inner one.

// So the outer element finishes the initialization before the inner one.

// Let’s demonstrate that on example:

// <script>
// customElements.define('user-info', class extends HTMLElement {
//   connectedCallback() {
//     console.log(`${this.id} connected.`);
//     setTimeout(() => console.log(`${this.id} initialized.`));
//   }
// });
// </script>

// <user-info id="outer">
//   <user-info id="inner"></user-info>
// </user-info>
// Output order:

// outer connected.
// inner connected.
// outer initialized.
// inner initialized.
// We can clearly see that the outer element finishes initialization (3) before the inner one (4).

// There’s no built-in callback that triggers after nested elements are ready. If needed, we can implement such thing on our own. For instance, inner elements can dispatch events like initialized, and outer ones can listen and react on them.

// Customized built-in elements
// New elements that we create, such as <time-formatted>, don’t have any associated semantics. They are unknown to search engines, and accessibility devices can’t handle them.

// But such things can be important. E.g, a search engine would be interested to know that we actually show a time. And if we’re making a special kind of button, why not reuse the existing <button> functionality?

// We can extend and customize built-in HTML elements by inheriting from their classes.

// For example, buttons are instances of HTMLButtonElement, let’s build upon it.

// Extend HTMLButtonElement with our class:

// class HelloButton extends HTMLButtonElement { /* custom element methods */ }
// Provide the third argument to customElements.define, that specifies the tag:

// customElements.define('hello-button', HelloButton, {extends: 'button'});
// There may be different tags that share the same DOM-class, that’s why specifying extends is needed.

// At the end, to use our custom element, insert a regular <button> tag, but add is="hello-button" to it:

// <button is="hello-button">...</button>
// Here’s a full example:

// <script>
// // The button that says "hello" on click
// class HelloButton extends HTMLButtonElement {
//   constructor() {
//     super();
//     this.addEventListener('click', () => console.log("Hello!"));
//   }
// }

// customElements.define('hello-button', HelloButton, {extends: 'button'});
// </script>

// <button is="hello-button">Click me</button>

// <button is="hello-button" disabled>Disabled</button>

// Our new button extends the built-in one. So it keeps the same styles and standard features like disabled attribute.

// References
// HTML Living Standard: https://html.spec.whatwg.org/#custom-elements.
// Compatiblity: https://caniuse.com/#feat=custom-elementsv1.
// Summary
// Custom elements can be of two types:

// “Autonomous” – new tags, extending HTMLElement.

// Definition scheme:

// class MyElement extends HTMLElement {
//   constructor() { super(); /* ... */ }
//   connectedCallback() { /* ... */ }
//   disconnectedCallback() { /* ... */  }
//   static get observedAttributes() { return [/* ... */]; }
//   attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
//   adoptedCallback() { /* ... */ }
//  }
// customElements.define('my-element', MyElement);
// /* <my-element> */
// “Customized built-in elements” – extensions of existing elements.

// Requires one more .define argument, and is="..." in HTML:

// class MyButton extends HTMLButtonElement { /*...*/ }
// customElements.define('my-button', MyElement, {extends: 'button'});
// /* <button is="my-button"> */
// Custom elements are well-supported among browsers. There’s a polyfill https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs.
// ///////////////////////////////////////////////////////////////////

// // Shadow DOM
// Shadow DOM
// Shadow DOM serves for encapsulation. It allows a component to have its very own “shadow” DOM tree, that can’t be accidentally accessed from the main document, may have local style rules, and more.

// Built-in shadow DOM
// Did you ever think how complex browser controls are created and styled?

// Such as <input type="range">:

// The browser uses DOM/CSS internally to draw them. That DOM structure is normally hidden from us, but we can see it in developer tools. E.g. in Chrome, we need to enable in Dev Tools “Show user agent shadow DOM” option.

// Then <input type="range"> looks like this:

// What you see under #shadow-root is called “shadow DOM”.

// We can’t get built-in shadow DOM elements by regular JavaScript calls or selectors. These are not regular children, but a powerful encapsulation technique.

// In the example above, we can see a useful attribute pseudo. It’s non-standard, exists for historical reasons. We can use it style subelements with CSS, like this:

// <style>
// /* make the slider track red */
// input::-webkit-slider-runnable-track {
//   background: red;
// }
// </style>

// <input type="range">

// Once again, pseudo is a non-standard attribute. Chronologically, browsers first started to experiment with internal DOM structures to implement controls, and then, after time, shadow DOM was standardized to allow us, developers, to do the similar thing.

// Further on, we’ll use the modern shadow DOM standard, covered by DOM spec and other related specifications.

// Shadow tree
// A DOM element can have two types of DOM subtrees:

// Light tree – a regular DOM subtree, made of HTML children. All subtrees that we’ve seen in previous chapters were “light”.
// Shadow tree – a hidden DOM subtree, not reflected in HTML, hidden from prying eyes.
// If an element has both, then the browser renders only the shadow tree. But we can setup a kind of composition between shadow and light trees as well. We’ll see the details later in the chapter Shadow DOM slots, composition.

// Shadow tree can be used in Custom Elements to hide component internals and apply component-local styles.

// For example, this <show-hello> element hides its internal DOM in shadow tree:

// <script>
// customElements.define('show-hello', class extends HTMLElement {
//   connectedCallback() {
//     const shadow = this.attachShadow({mode: 'open'});
//     shadow.innerHTML = `<p>
//       Hello, ${this.getAttribute('name')}
//     </p>`;
//   }
// });
// </script>

// <show-hello name="John"></show-hello>

// That’s how the resulting DOM looks in Chrome dev tools, all the content is under “#shadow-root”:

// First, the call to elem.attachShadow({mode: …}) creates a shadow tree.

// There are two limitations:

// We can create only one shadow root per element.
// The elem must be either a custom element, or one of: “article”, “aside”, “blockquote”, “body”, “div”, “footer”, “h1…h6”, “header”, “main” “nav”, “p”, “section”, or “span”. Other elements, like <img>, can’t host shadow tree.
// The mode option sets the encapsulation level. It must have any of two values:

// "open" – the shadow root is available as elem.shadowRoot.

// Any code is able to access the shadow tree of elem.

// "closed" – elem.shadowRoot is always null.

// We can only access the shadow DOM by the reference returned by attachShadow (and probably hidden inside a class). Browser-native shadow trees, such as <input type="range">, are closed. There’s no way to access them.

// The shadow root, returned by attachShadow, is like an element: we can use innerHTML or DOM methods, such as append, to populate it.

// The element with a shadow root is called a “shadow tree host”, and is available as the shadow root host property:

// // assuming {mode: "open"}, otherwise elem.shadowRoot is null
// console.log(elem.shadowRoot.host === elem); // true
// Encapsulation
// Shadow DOM is strongly delimited from the main document:

// Shadow DOM elements are not visible to querySelector from the light DOM. In particular, Shadow DOM elements may have ids that conflict with those in the light DOM. They must be unique only within the shadow tree.
// Shadow DOM has own stylesheets. Style rules from the outer DOM don’t get applied.
// For example:

// <style>
//   /* document style won't apply to the shadow tree inside #elem (1) */
//   p { color: red; }
// </style>

// <div id="elem"></div>

// <script>
//   elem.attachShadow({mode: 'open'});
//     // shadow tree has its own style (2)
//   elem.shadowRoot.innerHTML = `
//     <style> p { font-weight: bold; } </style>
//     <p>Hello, John!</p>
//   `;

//   // <p> is only visible from queries inside the shadow tree (3)
//   console.log(document.querySelectorAll('p').length); // 0
//   console.log(elem.shadowRoot.querySelectorAll('p').length); // 1
// </script>
// The style from the document does not affect the shadow tree.
// …But the style from the inside works.
// To get elements in shadow tree, we must query from inside the tree.
// References
// DOM: https://dom.spec.whatwg.org/#shadow-trees
// Compatibility: https://caniuse.com/#feat=shadowdomv1
// Shadow DOM is mentioned in many other specifications, e.g. DOM Parsing specifies that shadow root has innerHTML.
// Summary
// Shadow DOM is a way to create a component-local DOM.

// shadowRoot = elem.attachShadow({mode: open|closed}) – creates shadow DOM for elem. If mode="open", then it’s accessible as elem.shadowRoot property.
// We can populate shadowRoot using innerHTML or other DOM methods.
// Shadow DOM elements:

// Have their own ids space,
// Invisible to JavaScript selectors from the main document, such as querySelector,
// Use styles only from the shadow tree, not from the main document.
// Shadow DOM, if exists, is rendered by the browser instead of so-called “light DOM” (regular children). In the chapter Shadow DOM slots, composition we’ll see how to compose them.
// ///////////////////////////////////////////////////////////////////

// // Template element
// Template element
// A built-in <template> element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.

// In theory, we could create any invisible element somewhere in HTML for HTML markup storage purposes. What’s special about <template>?

// First, its content can be any valid HTML, even if it normally requires a proper enclosing tag.

// For example, we can put there a table row <tr>:

// <template>
//   <tr>
//     <td>Contents</td>
//   </tr>
// </template>
// Usually, if we try to put <tr> inside, say, a <div>, the browser detects the invalid DOM structure and “fixes” it, adds <table> around. That’s not what we want. On the other hand, <template> keeps exactly what we place there.

// We can put styles and scripts into <template> as well:

// <template>
//   <style>
//     p { font-weight: bold; }
//   </style>
//   <script>
//     console.log("Hello");
//   </script>
// </template>
// The browser considers <template> content “out of the document”: styles are not applied, scripts are not executed, <video autoplay> is not run, etc.

// The content becomes live (styles apply, scripts run etc) when we insert it into the document.

// Inserting template
// The template content is available in its content property as a DocumentFragment – a special type of DOM node.

// We can treat it as any other DOM node, except one special property: when we insert it somewhere, its children are inserted instead.

// For example:

// <template id="tmpl">
//   <script>
//     console.log("Hello");
//   </script>
//   <div class="message">Hello, world!</div>
// </template>

// <script>
//   let elem = document.createElement('div');

//   // Clone the template content to reuse it multiple times
//   elem.append(tmpl.content.cloneNode(true));

//   document.body.append(elem);
//   // Now the script from <template> runs
// </script>
// Let’s rewrite a Shadow DOM example from the previous chapter using <template>:

// <template id="tmpl">
//   <style> p { font-weight: bold; } </style>
//   <p id="message"></p>
// </template>

// <div id="elem">Click me</div>

// <script>
//   elem.onclick = function() {
//     elem.attachShadow({mode: 'open'});

//     elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)

//     elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
//   };
// </script>

// In the line (*) when we clone and insert tmpl.content, as its DocumentFragment, its children (<style>, <p>) are inserted instead.

// They form the shadow DOM:

// <div id="elem">
//   #shadow-root
//     <style> p { font-weight: bold; } </style>
//     <p id="message"></p>
// </div>
// Summary
// To summarize:

// <template> content can be any syntactically correct HTML.
// <template> content is considered “out of the document”, so it doesn’t affect anything.
// We can access template.content from JavaScript, clone it to reuse in a new component.
// The <template> tag is quite unique, because:

// The browser checks HTML syntax inside it (as opposed to using a template string inside a script).
// …But still allows use of any top-level HTML tags, even those that don’t make sense without proper wrappers (e.g. <tr>).
// The content becomes interactive: scripts run, <video autoplay> plays etc, when inserted into the document.
// The <template> element does not feature any iteration mechanisms, data binding or variable substitutions, but we can implement those on top of it.
// ///////////////////////////////////////////////////////////////////

// // Shadow DOM slots, composition
// Shadow DOM slots, composition
// Many types of components, such as tabs, menus, image galleries, and so on, need the content to render.

// Just like built-in browser <select> expects <option> items, our <custom-tabs> may expect the actual tab content to be passed. And a <custom-menu> may expect menu items.

// The code that makes use of <custom-menu> can look like this:

// <custom-menu>
//   <title>Candy menu</title>
//   <item>Lollipop</item>
//   <item>Fruit Toast</item>
//   <item>Cup Cake</item>
// </custom-menu>
// …Then our component should render it properly, as a nice menu with given title and items, handle menu events, etc.

// How to implement it?

// We could try to analyze the element content and dynamically copy-rearrange DOM nodes. That’s possible, but if we’re moving elements to shadow DOM, then CSS styles from the document do not apply in there, so the visual styling may be lost. Also that requires some coding.

// Luckily, we don’t have to. Shadow DOM supports <slot> elements, that are automatically filled by the content from light DOM.

// Named slots
// Let’s see how slots work on a simple example.

// Here, <user-card> shadow DOM provides two slots, filled from light DOM:

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `
//       <div>Name:
//         <slot name="username"></slot>
//       </div>
//       <div>Birthday:
//         <slot name="birthday"></slot>
//       </div>
//     `;
//   }
// });
// </script>

// <user-card>
//   <span slot="username">John Smith</span>
//   <span slot="birthday">01.01.2001</span>
// </user-card>

// In the shadow DOM, <slot name="X"> defines an “insertion point”, a place where elements with slot="X" are rendered.

// Then the browser performs “composition”: it takes elements from the light DOM and renders them in corresponding slots of the shadow DOM. At the end, we have exactly what we want – a component that can be filled with data.

// Here’s the DOM structure after the script, not taking composition into account:

// <user-card>
//   #shadow-root
//     <div>Name:
//       <slot name="username"></slot>
//     </div>
//     <div>Birthday:
//       <slot name="birthday"></slot>
//     </div>
//   <span slot="username">John Smith</span>
//   <span slot="birthday">01.01.2001</span>
// </user-card>
// We created the shadow DOM, so here it is, under #shadow-root. Now the element has both light and shadow DOM.

// For rendering purposes, for each <slot name="..."> in shadow DOM, the browser looks for slot="..." with the same name in the light DOM. These elements are rendered inside the slots:

// The result is called “flattened” DOM:

// <user-card>
//   #shadow-root
//     <div>Name:
//       <slot name="username">
//         <!-- slotted element is inserted into the slot -->
//         <span slot="username">John Smith</span>
//       </slot>
//     </div>
//     <div>Birthday:
//       <slot name="birthday">
//         <span slot="birthday">01.01.2001</span>
//       </slot>
//     </div>
// </user-card>
// …But the flattened DOM exists only for rendering and event-handling purposes. It’s kind of “virtual”. That’s how things are shown. But the nodes in the document are actually not moved around!

// That can be easily checked if we run querySelectorAll: nodes are still at their places.

// // light DOM <span> nodes are still at the same place, under `<user-card>`
// console.log( document.querySelectorAll('user-card span').length ); // 2
// So, the flattened DOM is derived from shadow DOM by inserting slots. The browser renders it and uses for style inheritance, event propagation (more about that later). But JavaScript still sees the document “as is”, before flattening.

// Only top-level children may have slot="…" attribute
// The slot="..." attribute is only valid for direct children of the shadow host (in our example, <user-card> element). For nested elements it’s ignored.

// For example, the second <span> here is ignored (as it’s not a top-level child of <user-card>):

// <user-card>
//   <span slot="username">John Smith</span>
//   <div>
//     <!-- invalid slot, must be direct child of user-card -->
//     <span slot="birthday">01.01.2001</span>
//   </div>
// </user-card>
// If there are multiple elements in light DOM with the same slot name, they are appended into the slot, one after another.

// For example, this:

// <user-card>
//   <span slot="username">John</span>
//   <span slot="username">Smith</span>
// </user-card>
// Gives this flattened DOM with two elements in <slot name="username">:

// <user-card>
//   #shadow-root
//     <div>Name:
//       <slot name="username">
//         <span slot="username">John</span>
//         <span slot="username">Smith</span>
//       </slot>
//     </div>
//     <div>Birthday:
//       <slot name="birthday"></slot>
//     </div>
// </user-card>
// Slot fallback content
// If we put something inside a <slot>, it becomes the fallback, “default” content. The browser shows it if there’s no corresponding filler in light DOM.

// For example, in this piece of shadow DOM, Anonymous renders if there’s no slot="username" in light DOM.

// <div>Name:
//   <slot name="username">Anonymous</slot>
// </div>
// Default slot: first unnamed
// The first <slot> in shadow DOM that doesn’t have a name is a “default” slot. It gets all nodes from the light DOM that aren’t slotted elsewhere.

// For example, let’s add the default slot to our <user-card> that shows all unslotted information about the user:

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `
//     <div>Name:
//       <slot name="username"></slot>
//     </div>
//     <div>Birthday:
//       <slot name="birthday"></slot>
//     </div>
//     <fieldset>
//       <legend>Other information</legend>
//       <slot></slot>
//     </fieldset>
//     `;
//   }
// });
// </script>

// <user-card>
//   <div>I like to swim.</div>
//   <span slot="username">John Smith</span>
//   <span slot="birthday">01.01.2001</span>
//   <div>...And play volleyball too!</div>
// </user-card>

// All the unslotted light DOM content gets into the “Other information” fieldset.

// Elements are appended to a slot one after another, so both unslotted pieces of information are in the default slot together.

// The flattened DOM looks like this:

// <user-card>
//   #shadow-root
//     <div>Name:
//       <slot name="username">
//         <span slot="username">John Smith</span>
//       </slot>
//     </div>
//     <div>Birthday:
//       <slot name="birthday">
//         <span slot="birthday">01.01.2001</span>
//       </slot>
//     </div>
//     <fieldset>
//       <legend>Other information</legend>
//       <slot>
//         <div>I like to swim.</div>
//         <div>...And play volleyball too!</div>
//       </slot>
//     </fieldset>
// </user-card>
// Menu example
// Now let’s back to <custom-menu>, mentioned at the beginning of the chapter.

// We can use slots to distribute elements.

// Here’s the markup for <custom-menu>:

// <custom-menu>
//   <span slot="title">Candy menu</span>
//   <li slot="item">Lollipop</li>
//   <li slot="item">Fruit Toast</li>
//   <li slot="item">Cup Cake</li>
// </custom-menu>
// The shadow DOM template with proper slots:

// <template id="tmpl">
//   <style> /* menu styles */ </style>
//   <div class="menu">
//     <slot name="title"></slot>
//     <ul><slot name="item"></slot></ul>
//   </div>
// </template>
// <span slot="title"> goes into <slot name="title">.
// There are many <li slot="item"> in the <custom-menu>, but only one <slot name="item"> in the template. So all such <li slot="item"> are appended to <slot name="item"> one after another, thus forming the list.
// The flattened DOM becomes:

// <custom-menu>
//   #shadow-root
//     <style> /* menu styles */ </style>
//     <div class="menu">
//       <slot name="title">
//         <span slot="title">Candy menu</span>
//       </slot>
//       <ul>
//         <slot name="item">
//           <li slot="item">Lollipop</li>
//           <li slot="item">Fruit Toast</li>
//           <li slot="item">Cup Cake</li>
//         </slot>
//       </ul>
//     </div>
// </custom-menu>
// One might notice that, in a valid DOM, <li> must be a direct child of <ul>. But that’s flattened DOM, it describes how the component is rendered, such thing happens naturally here.

// We just need to add a click handler to open/close the list, and the <custom-menu> is ready:

// customElements.define('custom-menu', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});

//     // tmpl is the shadow DOM template (above)
//     this.shadowRoot.append( tmpl.content.cloneNode(true) );

//     // we can't select light DOM nodes, so let's handle clicks on the slot
//     this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
//       // open/close the menu
//       this.shadowRoot.querySelector('.menu').classList.toggle('closed');
//     };
//   }
// });
// Here’s the full demo:

// Of course, we can add more functionality to it: events, methods and so on.

// Updating slots
// What if the outer code wants to add/remove menu items dynamically?

// The browser monitors slots and updates the rendering if slotted elements are added/removed.

// Also, as light DOM nodes are not copied, but just rendered in slots, the changes inside them immediately become visible.

// So we don’t have to do anything to update rendering. But if the component code wants to know about slot changes, then slotchange event is available.

// For example, here the menu item is inserted dynamically after 1 second, and the title changes after 2 seconds:

// <custom-menu id="menu">
//   <span slot="title">Candy menu</span>
// </custom-menu>

// <script>
// customElements.define('custom-menu', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `<div class="menu">
//       <slot name="title"></slot>
//       <ul><slot name="item"></slot></ul>
//     </div>`;

//     // shadowRoot can't have event handlers, so using the first child
//     this.shadowRoot.firstElementChild.addEventListener('slotchange',
//       e => console.log("slotchange: " + e.target.name)
//     );
//   }
// });

// setTimeout(() => {
//   menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Lollipop</li>')
// }, 1000);

// setTimeout(() => {
//   menu.querySelector('[slot="title"]').innerHTML = "New menu";
// }, 2000);
// </script>
// The menu rendering updates each time without our intervention.

// There are two slotchange events here:

// At initialization:

// slotchange: title triggers immediately, as the slot="title" from the light DOM gets into the corresponding slot.

// After 1 second:

// slotchange: item triggers, when a new <li slot="item"> is added.

// Please note: there’s no slotchange event after 2 seconds, when the content of slot="title" is modified. That’s because there’s no slot change. We modify the content inside the slotted element, that’s another thing.

// If we’d like to track internal modifications of light DOM from JavaScript, that’s also possible using a more generic mechanism: MutationObserver.

// Slot API
// Finally, let’s mention the slot-related JavaScript methods.

// As we’ve seen before, JavaScript looks at the “real” DOM, without flattening. But, if the shadow tree has {mode: 'open'}, then we can figure out which elements assigned to a slot and, vise-versa, the slot by the element inside it:

// node.assignedSlot – returns the <slot> element that the node is assigned to.
// slot.assignedNodes({flatten: true/false}) – DOM nodes, assigned to the slot. The flatten option is false by default. If explicitly set to true, then it looks more deeply into the flattened DOM, returning nested slots in case of nested components and the fallback content if no node assigned.
// slot.assignedElements({flatten: true/false}) – DOM elements, assigned to the slot (same as above, but only element nodes).
// These methods are useful when we need not just show the slotted content, but also track it in JavaScript.

// For example, if <custom-menu> component wants to know, what it shows, then it could track slotchange and get the items from slot.assignedElements:

// <custom-menu id="menu">
//   <span slot="title">Candy menu</span>
//   <li slot="item">Lollipop</li>
//   <li slot="item">Fruit Toast</li>
// </custom-menu>

// <script>
// customElements.define('custom-menu', class extends HTMLElement {
//   items = []

//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `<div class="menu">
//       <slot name="title"></slot>
//       <ul><slot name="item"></slot></ul>
//     </div>`;

//     // triggers when slot content changes
//     this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
//       let slot = e.target;
//       if (slot.name == 'item') {
//         this.items = slot.assignedElements().map(elem => elem.textContent);
//         console.log("Items: " + this.items);
//       }
//     });
//   }
// });

// // items update after 1 second
// setTimeout(() => {
//   menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cup Cake</li>')
// }, 1000);
// </script>
// Summary
// Usually, if an element has shadow DOM, then its light DOM is not displayed. Slots allow to show elements from light DOM in specified places of shadow DOM.

// There are two kinds of slots:

// Named slots: <slot name="X">...</slot> – gets light children with slot="X".
// Default slot: the first <slot> without a name (subsequent unnamed slots are ignored) – gets unslotted light children.
// If there are many elements for the same slot – they are appended one after another.
// The content of <slot> element is used as a fallback. It’s shown if there are no light children for the slot.
// The process of rendering slotted elements inside their slots is called “composition”. The result is called a “flattened DOM”.

// Composition does not really move nodes, from JavaScript point of view the DOM is still same.

// JavaScript can access slots using methods:

// slot.assignedNodes/Elements() – returns nodes/elements inside the slot.
// node.assignedSlot – the reverse property, returns slot by a node.
// If we’d like to know what we’re showing, we can track slot contents using:

// slotchange event – triggers the first time a slot is filled, and on any add/remove/replace operation of the slotted element, but not its children. The slot is event.target.
// MutationObserver to go deeper into slot content, watch changes inside it.
// Now, as we know how to show elements from light DOM in shadow DOM, let’s see how to style them properly. The basic rule is that shadow elements are styled inside, and light elements – outside, but there are notable exceptions.

// We’ll see the details in the next chapter.
// ///////////////////////////////////////////////////////////////////

// // Shadow DOM styling
// Shadow DOM styling
// Shadow DOM may include both <style> and <link rel="stylesheet" href="…"> tags. In the latter case, stylesheets are HTTP-cached, so they are not redownloaded for multiple components that use same template.

// As a general rule, local styles work only inside the shadow tree, and document styles work outside of it. But there are few exceptions.

// :host
// The :host selector allows to select the shadow host (the element containing the shadow tree).

// For instance, we’re making <custom-dialog> element that should be centered. For that we need to style the <custom-dialog> element itself.

// That’s exactly what :host does:

// <template id="tmpl">
//   <style>
//     /* the style will be applied from inside to the custom-dialog element */
//     :host {
//       position: fixed;
//       left: 50%;
//       top: 50%;
//       transform: translate(-50%, -50%);
//       display: inline-block;
//       border: 1px solid red;
//       padding: 10px;
//     }
//   </style>
//   <slot></slot>
// </template>

// <script>
// customElements.define('custom-dialog', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
//   }
// });
// </script>

// <custom-dialog>
//   Hello!
// </custom-dialog>

// Cascading
// The shadow host (<custom-dialog> itself) resides in the light DOM, so it’s affected by document CSS rules.

// If there’s a property styled both in :host locally, and in the document, then the document style takes precedence.

// For instance, if in the document we had:

// <style>
// custom-dialog {
//   padding: 0;
// }
// </style>
// …Then the <custom-dialog> would be without padding.

// It’s very convenient, as we can setup “default” component styles in its :host rule, and then easily override them in the document.

// The exception is when a local property is labelled !important, for such properties, local styles take precedence.

// :host(selector)
// Same as :host, but applied only if the shadow host matches the selector.

// For example, we’d like to center the <custom-dialog> only if it has centered attribute:

// <template id="tmpl">
//   <style>
//     :host([centered]) {
//       position: fixed;
//       left: 50%;
//       top: 50%;
//       transform: translate(-50%, -50%);
//       border-color: blue;
//     }

//     :host {
//       display: inline-block;
//       border: 1px solid red;
//       padding: 10px;
//     }
//   </style>
//   <slot></slot>
// </template>

// <script>
// customElements.define('custom-dialog', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
//   }
// });
// </script>

// <custom-dialog centered>
//   Centered!
// </custom-dialog>

// <custom-dialog>
//   Not centered.
// </custom-dialog>

// Now the additional centering styles are only applied to the first dialog: <custom-dialog centered>.

// To summarize, we can use :host-family of selectors to style the main element of the component. These styles (unless !important) can be overridden by the document.

// Styling slotted content
// Now let’s consider the situation with slots.

// Slotted elements come from light DOM, so they use document styles. Local styles do not affect slotted content.

// In the example below, slotted <span> is bold, as per document style, but does not take background from the local style:

// <style>
//   span { font-weight: bold }
// </style>

// <user-card>
//   <div slot="username"><span>John Smith</span></div>
// </user-card>

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `
//       <style>
//       span { background: red; }
//       </style>
//       Name: <slot name="username"></slot>
//     `;
//   }
// });
// </script>

// The result is bold, but not red.

// If we’d like to style slotted elements in our component, there are two choices.

// First, we can style the <slot> itself and rely on CSS inheritance:

// <user-card>
//   <div slot="username"><span>John Smith</span></div>
// </user-card>

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `
//       <style>
//       slot[name="username"] { font-weight: bold; }
//       </style>
//       Name: <slot name="username"></slot>
//     `;
//   }
// });
// </script>

// Here <p>John Smith</p> becomes bold, because CSS inheritance is in effect between the <slot> and its contents. But in CSS itself not all properties are inherited.

// Another option is to use ::slotted(selector) pseudo-class. It matches elements based on two conditions:

// That’s a slotted element, that comes from the light DOM. Slot name doesn’t matter. Just any slotted element, but only the element itself, not its children.
// The element matches the selector.
// In our example, ::slotted(div) selects exactly <div slot="username">, but not its children:

// <user-card>
//   <div slot="username">
//     <div>John Smith</div>
//   </div>
// </user-card>

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `
//       <style>
//       ::slotted(div) { border: 1px solid red; }
//       </style>
//       Name: <slot name="username"></slot>
//     `;
//   }
// });
// </script>

// Please note, ::slotted selector can’t descend any further into the slot. These selectors are invalid:

// ::slotted(div span) {
//   /* our slotted <div> does not match this */
// }

// ::slotted(div) p {
//   /* can't go inside light DOM */
// }
// Also, ::slotted can only be used in CSS. We can’t use it in querySelector.

// CSS hooks with custom properties
// How do we style internal elements of a component from the main document?

// Selectors like :host apply rules to <custom-dialog> element or <user-card>, but how to style shadow DOM elements inside them?

// There’s no selector that can directly affect shadow DOM styles from the document. But just as we expose methods to interact with our component, we can expose CSS variables (custom CSS properties) to style it.

// Custom CSS properties exist on all levels, both in light and shadow.

// For example, in shadow DOM we can use --user-card-field-color CSS variable to style fields, and the outer document can set its value:

// <style>
//   .field {
//     color: var(--user-card-field-color, black);
//     /* if --user-card-field-color is not defined, use black color */
//   }
// </style>
// <div class="field">Name: <slot name="username"></slot></div>
// <div class="field">Birthday: <slot name="birthday"></slot></div>
// Then, we can declare this property in the outer document for <user-card>:

// user-card {
//   --user-card-field-color: green;
// }
// Custom CSS properties pierce through shadow DOM, they are visible everywhere, so the inner .field rule will make use of it.

// Here’s the full example:

// <style>
//   user-card {
//     --user-card-field-color: green;
//   }
// </style>

// <template id="tmpl">
//   <style>
//     .field {
//       color: var(--user-card-field-color, black);
//     }
//   </style>
//   <div class="field">Name: <slot name="username"></slot></div>
//   <div class="field">Birthday: <slot name="birthday"></slot></div>
// </template>

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
//   }
// });
// </script>

// <user-card>
//   <span slot="username">John Smith</span>
//   <span slot="birthday">01.01.2001</span>
// </user-card>

// Summary
// Shadow DOM can include styles, such as <style> or <link rel="stylesheet">.

// Local styles can affect:

// shadow tree,
// shadow host with :host and :host() pseudoclasses,
// slotted elements (coming from light DOM), ::slotted(selector) allows to select slotted elements themselves, but not their children.
// Document styles can affect:

// shadow host (as it lives in the outer document)
// slotted elements and their contents (as that’s also in the outer document)
// When CSS properties conflict, normally document styles have precedence, unless the property is labelled as !important. Then local styles have precedence.

// CSS custom properties pierce through shadow DOM. They are used as “hooks” to style the component:

// The component uses a custom CSS property to style key elements, such as var(--component-name-title, <default value>).
// Component author publishes these properties for developers, they are same important as other public component methods.
// When a developer wants to style a title, they assign --component-name-title CSS property for the shadow host or above.
// Profit!
// ///////////////////////////////////////////////////////////////////

// // Shadow DOM and events
// Shadow DOM and events
// The idea behind shadow tree is to encapsulate internal implementation details of a component.

// Let’s say, a click event happens inside a shadow DOM of <user-card> component. But scripts in the main document have no idea about the shadow DOM internals, especially if the component comes from a 3rd-party library.

// So, to keep the details encapsulated, the browser retargets the event.

// Events that happen in shadow DOM have the host element as the target, when caught outside of the component.

// Here’s a simple example:

// <user-card></user-card>

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `<p>
//       <button>Click me</button>
//     </p>`;
//     this.shadowRoot.firstElementChild.onclick =
//       e => console.log("Inner target: " + e.target.tagName);
//   }
// });

// document.onclick =
//   e => console.log("Outer target: " + e.target.tagName);
// </script>

// If you click on the button, the messages are:

// Inner target: BUTTON – internal event handler gets the correct target, the element inside shadow DOM.
// Outer target: USER-CARD – document event handler gets shadow host as the target.
// Event retargeting is a great thing to have, because the outer document doesn’t have to know about component internals. From its point of view, the event happened on <user-card>.

// Retargeting does not occur if the event occurs on a slotted element, that physically lives in the light DOM.

// For example, if a user clicks on <span slot="username"> in the example below, the event target is exactly this span element, for both shadow and light handlers:

// <user-card id="userCard">
//   <span slot="username">John Smith</span>
// </user-card>

// <script>
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `<div>
//       <b>Name:</b> <slot name="username"></slot>
//     </div>`;

//     this.shadowRoot.firstElementChild.onclick =
//       e => console.log("Inner target: " + e.target.tagName);
//   }
// });

// userCard.onclick = e => console.log(`Outer target: ${e.target.tagName}`);
// </script>

// If a click happens on "John Smith", for both inner and outer handlers the target is <span slot="username">. That’s an element from the light DOM, so no retargeting.

// On the other hand, if the click occurs on an element originating from shadow DOM, e.g. on <b>Name</b>, then, as it bubbles out of the shadow DOM, its event.target is reset to <user-card>.

// Bubbling, event.composedPath()
// For purposes of event bubbling, flattened DOM is used.

// So, if we have a slotted element, and an event occurs somewhere inside it, then it bubbles up to the <slot> and upwards.

// The full path to the original event target, with all the shadow elements, can be obtained using event.composedPath(). As we can see from the name of the method, that path is taken after the composition.

// In the example above, the flattened DOM is:

// <user-card id="userCard">
//   #shadow-root
//     <div>
//       <b>Name:</b>
//       <slot name="username">
//         <span slot="username">John Smith</span>
//       </slot>
//     </div>
// </user-card>
// So, for a click on <span slot="username">, a call to event.composedPath() returns an array: [span, slot, div, shadow-root, user-card, body, html, document, window]. That’s exactly the parent chain from the target element in the flattened DOM, after the composition.

// Shadow tree details are only provided for {mode:'open'} trees
// If the shadow tree was created with {mode: 'closed'}, then the composed path starts from the host: user-card and upwards.

// That’s the similar principle as for other methods that work with shadow DOM. Internals of closed trees are completely hidden.

// event.composed
// Most events successfully bubble through a shadow DOM boundary. There are few events that do not.

// This is governed by the composed event object property. If it’s true, then the event does cross the boundary. Otherwise, it only can be caught from inside the shadow DOM.

// If you take a look at UI Events specification, most events have composed: true:

// blur, focus, focusin, focusout,
// click, dblclick,
// mousedown, mouseup mousemove, mouseout, mouseover,
// wheel,
// beforeinput, input, keydown, keyup.
// All touch events and pointer events also have composed: true.

// There are some events that have composed: false though:

// mouseenter, mouseleave (they do not bubble at all),
// load, unload, abort, error,
// select,
// slotchange.
// These events can be caught only on elements within the same DOM, where the event target resides.

// Custom events
// When we dispatch custom events, we need to set both bubbles and composed properties to true for it to bubble up and out of the component.

// For example, here we create div#inner in the shadow DOM of div#outer and trigger two events on it. Only the one with composed: true makes it outside to the document:

// <div id="outer"></div>

// <script>
// outer.attachShadow({mode: 'open'});

// let inner = document.createElement('div');
// outer.shadowRoot.append(inner);

// /*
// div(id=outer)
//   #shadow-dom
//     div(id=inner)
// */

// document.addEventListener('test', event => console.log(event.detail));

// inner.dispatchEvent(new CustomEvent('test', {
//   bubbles: true,
//   composed: true,
//   detail: "composed"
// }));

// inner.dispatchEvent(new CustomEvent('test', {
//   bubbles: true,
//   composed: false,
//   detail: "not composed"
// }));
// </script>
// Summary
// Events only cross shadow DOM boundaries if their composed flag is set to true.

// Built-in events mostly have composed: true, as described in the relevant specifications:

// UI Events https://www.w3.org/TR/uievents.
// Touch Events https://w3c.github.io/touch-events.
// Pointer Events https://www.w3.org/TR/pointerevents.
// …And so on.
// Some built-in events that have composed: false:

// mouseenter, mouseleave (also do not bubble),
// load, unload, abort, error,
// select,
// slotchange.
// These events can be caught only on elements within the same DOM.

// If we dispatch a CustomEvent, then we should explicitly set composed: true.

// Please note that in case of nested components, one shadow DOM may be nested into another. In that case composed events bubble through all shadow DOM boundaries. So, if an event is intended only for the immediate enclosing component, we can also dispatch it on the shadow host and set composed: false. Then it’s out of the component shadow DOM, but won’t bubble up to higher-level DOM.
// ///////////////////////////////////////////////////////////////////
