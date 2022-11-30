// // Form properties and methods
// Form properties and methods
// Forms and control elements, such as <input> have a lot of special properties and events.

// Working with forms will be much more convenient when we learn them.

// Navigation: form and elements
// Document forms are members of the special collection document.forms.

// That’s a so-called “named collection”: it’s both named and ordered. We can use both the name or the number in the document to get the form.

// document.forms.my; // the form with name="my"
// document.forms[0]; // the first form in the document
// When we have a form, then any element is available in the named collection form.elements.

// For instance:

// <form name="my">
//   <input name="one" value="1">
//   <input name="two" value="2">
// </form>

// <script>
//   // get the form
//   let form = document.forms.my; // <form name="my"> element

//   // get the element
//   let elem = form.elements.one; // <input name="one"> element

//   console.log(elem.value); // 1
// </script>
// There may be multiple elements with the same name. This is typical with radio buttons and checkboxes.

// In that case, form.elements[name] is a collection. For instance:

// <form>
//   <input type="radio" name="age" value="10">
//   <input type="radio" name="age" value="20">
// </form>

// <script>
// let form = document.forms[0];

// let ageElems = form.elements.age;

// console.log(ageElems[0]); // [object HTMLInputElement]
// </script>
// These navigation properties do not depend on the tag structure. All control elements, no matter how deep they are in the form, are available in form.elements.

// Fieldsets as “subforms”
// A form may have one or many <fieldset> elements inside it. They also have elements property that lists form controls inside them.

// For instance:

// <body>
//   <form id="form">
//     <fieldset name="userFields">
//       <legend>info</legend>
//       <input name="login" type="text">
//     </fieldset>
//   </form>

//   <script>
//     console.log(form.elements.login); // <input name="login">

//     let fieldset = form.elements.userFields;
//     console.log(fieldset); // HTMLFieldSetElement

//     // we can get the input by name both from the form and from the fieldset
//     console.log(fieldset.elements.login == form.elements.login); // true
//   </script>
// </body>
// Shorter notation: form.name
// There’s a shorter notation: we can access the element as form[index/name].

// In other words, instead of form.elements.login we can write form.login.

// That also works, but there’s a minor issue: if we access an element, and then change its name, then it is still available under the old name (as well as under the new one).

// That’s easy to see in an example:

// <form id="form">
//   <input name="login">
// </form>

// <script>
//   console.log(form.elements.login == form.login); // true, the same <input>

//   form.login.name = "username"; // change the name of the input

//   // form.elements updated the name:
//   console.log(form.elements.login); // undefined
//   console.log(form.elements.username); // input

//   // form allows both names: the new one and the old one
//   console.log(form.username == form.login); // true
// </script>
// That’s usually not a problem, however, because we rarely change names of form elements.

// Backreference: element.form
// For any element, the form is available as element.form. So a form references all elements, and elements reference the form.

// Here’s the picture:

// For instance:

// <form id="form">
//   <input type="text" name="login">
// </form>

// <script>
//   // form -> element
//   let login = form.login;

//   // element -> form
//   console.log(login.form); // HTMLFormElement
// </script>
// Form elements
// Let’s talk about form controls.

// input and textarea
// We can access their value as input.value (string) or input.checked (boolean) for checkboxes and radio buttons.

// Like this:

// input.value = "New value";
// textarea.value = "New text";

// input.checked = true; // for a checkbox or radio button
// Use textarea.value, not textarea.innerHTML
// Please note that even though <textarea>...</textarea> holds its value as nested HTML, we should never use textarea.innerHTML to access it.

// It stores only the HTML that was initially on the page, not the current value.

// select and option
// A <select> element has 3 important properties:

// select.options – the collection of <option> subelements,
// select.value – the value of the currently selected <option>,
// select.selectedIndex – the number of the currently selected <option>.
// They provide three different ways of setting a value for a <select>:

// Find the corresponding <option> element (e.g. among select.options) and set its option.selected to true.
// If we know a new value: set select.value to the new value.
// If we know the new option number: set select.selectedIndex to that number.
// Here is an example of all three methods:

// <select id="select">
//   <option value="apple">Apple</option>
//   <option value="pear">Pear</option>
//   <option value="banana">Banana</option>
// </select>

// <script>
//   // all three lines do the same thing
//   select.options[2].selected = true;
//   select.selectedIndex = 2;
//   select.value = 'banana';
//   // please note: options start from zero, so index 2 means the 3rd option.
// </script>
// Unlike most other controls, <select> allows to select multiple options at once if it has multiple attribute. This attribute is rarely used, though.

// For multiple selected values, use the first way of setting values: add/remove the selected property from <option> subelements.

// Here’s an example of how to get selected values from a multi-select:

// <select id="select" multiple>
//   <option value="blues" selected>Blues</option>
//   <option value="rock" selected>Rock</option>
//   <option value="classic">Classic</option>
// </select>

// <script>
//   // get all selected values from multi-select
//   let selected = Array.from(select.options)
//     .filter(option => option.selected)
//     .map(option => option.value);

//   console.log(selected); // blues,rock
// </script>
// The full specification of the <select> element is available in the specification https://html.spec.whatwg.org/multipage/forms.html#the-select-element.

// new Option
// In the specification there’s a nice short syntax to create an <option> element:

// option = new Option(text, value, defaultSelected, selected);
// This syntax is optional. We can use document.createElement('option') and set attributes manually. Still, it may be shorter, so here are the parameters:

// text – the text inside the option,
// value – the option value,
// defaultSelected – if true, then selected HTML-attribute is created,
// selected – if true, then the option is selected.
// The difference between defaultSelected and selected is that defaultSelected sets the HTML-attribute (that we can get using option.getAttribute('selected'), while selected sets whether the option is selected or not.

// In practice, one should usually set both values to true or false. (Or, simply omit them; both default to false.)

// For instance, here’s a new “unselected” option:

// let option = new Option("Text", "value");
// // creates <option value="value">Text</option>
// The same option, but selected:

// let option = new Option("Text", "value", true, true);
// Option elements have properties:

// option.selected
// Is the option selected.
// option.index
// The number of the option among the others in its <select>.
// option.text
// Text content of the option (seen by the visitor).
// References
// Specification: https://html.spec.whatwg.org/multipage/forms.html.
// Summary
// Form navigation:

// document.forms
// A form is available as document.forms[name/index].
// form.elements
// Form elements are available as form.elements[name/index], or can use just form[name/index]. The elements property also works for <fieldset>.
// element.form
// Elements reference their form in the form property.
// Value is available as input.value, textarea.value, select.value, etc. (For checkboxes and radio buttons, use input.checked to determine whether a value is selected.)

// For <select>, one can also get the value by the index select.selectedIndex or through the options collection select.options.

// These are the basics to start working with forms. We’ll meet many examples further in the tutorial.

// In the next chapter we’ll cover focus and blur events that may occur on any element, but are mostly handled on forms.
// ///////////////////////////////////////////////////////////////////

// // Focusing: focus/blur

// Focusing: focus/blur
// An element receives the focus when the user either clicks on it or uses the Tab key on the keyboard. There’s also an autofocus HTML attribute that puts the focus onto an element by default when a page loads and other means of getting the focus.

// Focusing on an element generally means: “prepare to accept the data here”, so that’s the moment when we can run the code to initialize the required functionality.

// The moment of losing the focus (“blur”) can be even more important. That’s when a user clicks somewhere else or presses Tab to go to the next form field, or there are other means as well.

// Losing the focus generally means: “the data has been entered”, so we can run the code to check it or even to save it to the server and so on.

// There are important peculiarities when working with focus events. We’ll do the best to cover them further on.

// Events focus/blur
// The focus event is called on focusing, and blur – when the element loses the focus.

// Let’s use them for validation of an input field.

// In the example below:

// The blur handler checks if the field has an email entered, and if not – shows an error.
// The focus handler hides the error message (on blur it will be checked again):
// <style>
//   .invalid { border-color: red; }
//   #error { color: red }
// </style>

// Your email please: <input type="email" id="input">

// <div id="error"></div>

// <script>
// input.onblur = function() {
//   if (!input.value.includes('@')) { // not email
//     input.classList.add('invalid');
//     error.innerHTML = 'Please enter a correct email.'
//   }
// };

// input.onfocus = function() {
//   if (this.classList.contains('invalid')) {
//     // remove the "error" indication, because the user wants to re-enter something
//     this.classList.remove('invalid');
//     error.innerHTML = "";
//   }
// };
// </script>

// Modern HTML allows us to do many validations using input attributes: required, pattern and so on. And sometimes they are just what we need. JavaScript can be used when we want more flexibility. Also we could automatically send the changed value to the server if it’s correct.

// Methods focus/blur
// Methods elem.focus() and elem.blur() set/unset the focus on the element.

// For instance, let’s make the visitor unable to leave the input if the value is invalid:

// <style>
//   .error {
//     background: red;
//   }
// </style>

// Your email please: <input type="email" id="input">
// <input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

// <script>
//   input.onblur = function() {
//     if (!this.value.includes('@')) { // not email
//       // show the error
//       this.classList.add("error");
//       // ...and put the focus back
//       input.focus();
//     } else {
//       this.classList.remove("error");
//     }
//   };
// </script>

// It works in all browsers except Firefox (bug).

// If we enter something into the input and then try to use Tab or click away from the <input>, then onblur returns the focus back.

// Please note that we can’t “prevent losing focus” by calling event.preventDefault() in onblur, because onblur works after the element lost the focus.

// In practice though, one should think well, before implementing something like this, because we generally should show errors to the user, but should not prevent their progress in filling our form. They may want to fill other fields first.

// JavaScript-initiated focus loss
// A focus loss can occur for many reasons.

// One of them is when the visitor clicks somewhere else. But also JavaScript itself may cause it, for instance:

// An console.log moves focus to itself, so it causes the focus loss at the element (blur event), and when the console.log is dismissed, the focus comes back (focus event).
// If an element is removed from DOM, then it also causes the focus loss. If it is reinserted later, then the focus doesn’t return.
// These features sometimes cause focus/blur handlers to misbehave – to trigger when they are not needed.

// The best recipe is to be careful when using these events. If we want to track user-initiated focus-loss, then we should avoid causing it ourselves.

// Allow focusing on any element: tabindex
// By default, many elements do not support focusing.

// The list varies a bit between browsers, but one thing is always correct: focus/blur support is guaranteed for elements that a visitor can interact with: <button>, <input>, <select>, <a> and so on.

// On the other hand, elements that exist to format something, such as <div>, <span>, <table> – are unfocusable by default. The method elem.focus() doesn’t work on them, and focus/blur events are never triggered.

// This can be changed using HTML-attribute tabindex.

// Any element becomes focusable if it has tabindex. The value of the attribute is the order number of the element when Tab (or something like that) is used to switch between them.

// That is: if we have two elements, the first has tabindex="1", and the second has tabindex="2", then pressing Tab while in the first element – moves the focus into the second one.

// The switch order is: elements with tabindex from 1 and above go first (in the tabindex order), and then elements without tabindex (e.g. a regular <input>).

// Elements without matching tabindex are switched in the document source order (the default order).

// There are two special values:

// tabindex="0" puts an element among those without tabindex. That is, when we switch elements, elements with tabindex=0 go after elements with tabindex ≥ 1.

// Usually it’s used to make an element focusable, but keep the default switching order. To make an element a part of the form on par with <input>.

// tabindex="-1" allows only programmatic focusing on an element. The Tab key ignores such elements, but method elem.focus() works.

// For instance, here’s a list. Click the first item and press Tab:

// Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
// <ul>
//   <li tabindex="1">One</li>
//   <li tabindex="0">Zero</li>
//   <li tabindex="2">Two</li>
//   <li tabindex="-1">Minus one</li>
// </ul>

// <style>
//   li { cursor: pointer; }
//   :focus { outline: 1px dashed green; }
// </style>

// The order is like this: 1 - 2 - 0. Normally, <li> does not support focusing, but tabindex full enables it, along with events and styling with :focus.

// The property elem.tabIndex works too
// We can add tabindex from JavaScript by using the elem.tabIndex property. That has the same effect.

// Delegation: focusin/focusout
// Events focus and blur do not bubble.

// For instance, we can’t put onfocus on the <form> to highlight it, like this:

// <!-- on focusing in the form -- add the class -->
// <form onfocus="this.className='focused'">
//   <input type="text" name="name" value="Name">
//   <input type="text" name="surname" value="Surname">
// </form>

// <style> .focused { outline: 1px solid red; } </style>

// The example above doesn’t work, because when user focuses on an <input>, the focus event triggers on that input only. It doesn’t bubble up. So form.onfocus never triggers.

// There are two solutions.

// First, there’s a funny historical feature: focus/blur do not bubble up, but propagate down on the capturing phase.

// This will work:

// <form id="form">
//   <input type="text" name="name" value="Name">
//   <input type="text" name="surname" value="Surname">
// </form>

// <style> .focused { outline: 1px solid red; } </style>

// <script>
//   // put the handler on capturing phase (last argument true)
//   form.addEventListener("focus", () => form.classList.add('focused'), true);
//   form.addEventListener("blur", () => form.classList.remove('focused'), true);
// </script>

// Second, there are focusin and focusout events – exactly the same as focus/blur, but they bubble.

// Note that they must be assigned using elem.addEventListener, not on<event>.

// So here’s another working variant:

// <form id="form">
//   <input type="text" name="name" value="Name">
//   <input type="text" name="surname" value="Surname">
// </form>

// <style> .focused { outline: 1px solid red; } </style>

// <script>
//   form.addEventListener("focusin", () => form.classList.add('focused'));
//   form.addEventListener("focusout", () => form.classList.remove('focused'));
// </script>

// Summary
// Events focus and blur trigger on an element focusing/losing focus.

// Their specials are:

// They do not bubble. Can use capturing state instead or focusin/focusout.
// Most elements do not support focus by default. Use tabindex to make anything focusable.
// The current focused element is available as document.activeElement.

// ///////////////////////////////////////////////////////////////////

// // Events: change, input, cut, copy, paste

// Events: change, input, cut, copy, paste
// Let’s cover various events that accompany data updates.

// Event: change
// The change event triggers when the element has finished changing.

// For text inputs that means that the event occurs when it loses focus.

// For instance, while we are typing in the text field below – there’s no event. But when we move the focus somewhere else, for instance, click on a button – there will be a change event:

// <input type="text" onchange="console.log(this.value)">
// <input type="button" value="Button">

// For other elements: select, input type=checkbox/radio it triggers right after the selection changes:

// <select onchange="console.log(this.value)">
//   <option value="">Select something</option>
//   <option value="1">Option 1</option>
//   <option value="2">Option 2</option>
//   <option value="3">Option 3</option>
// </select>

// Event: input
// The input event triggers every time after a value is modified by the user.

// Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.

// For instance:

// <input type="text" id="input"> oninput: <span id="result"></span>
// <script>
//   input.oninput = function() {
//     result.innerHTML = input.value;
//   };
// </script>

// If we want to handle every modification of an <input> then this event is the best choice.

// On the other hand, input event doesn’t trigger on keyboard input and other actions that do not involve value change, e.g. pressing arrow keys ⇦ ⇨ while in the input.

// Can’t prevent anything in oninput
// The input event occurs after the value is modified.

// So we can’t use event.preventDefault() there – it’s just too late, there would be no effect.

// Events: cut, copy, paste
// These events occur on cutting/copying/pasting a value.

// They belong to ClipboardEvent class and provide access to the data that is cut/copied/pasted.

// We also can use event.preventDefault() to abort the action, then nothing gets copied/pasted.

// For instance, the code below prevents all cut/copy/paste events and shows the text we’re trying to cut/copy/paste:

// <input type="text" id="input">
// <script>
//   input.onpaste = function(event) {
//     console.log("paste: " + event.clipboardData.getData('text/plain'));
//     event.preventDefault();
//   };

//   input.oncut = input.oncopy = function(event) {
//     console.log(event.type + '-' + document.getSelection());
//     event.preventDefault();
//   };
// </script>

// Please note: inside cut and copy event handlers a call to event.clipboardData.getData(...) returns an empty string. That’s because technically the data isn’t in the clipboard yet. If we use event.preventDefault() it won’t be copied at all.

// So the example above uses document.getSelection() to get the selected text. You can find more details about document selection in the article Selection and Range.

// It’s possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

// That’s because clipboardData implements DataTransfer interface, commonly used for drag’n’drop and copy/pasting. It’s a bit beyond our scope now, but you can find its methods in the DataTransfer specification.

// Also, there’s an additional asynchronous API of accessing the clipboard: navigator.clipboard. More about it in the specification Clipboard API and events, not supported by Firefox.

// Safety restrictions
// The clipboard is a “global” OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn’t see all that.

// So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

// It’s forbidden to generate “custom” clipboard events with dispatchEvent in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such “syntetic” events must not provide access to the clipboard.

// Even if someone decides to save event.clipboardData in an event handler, and then access it later – it won’t work.

// To reiterate, event.clipboardData works solely in the context of user-initiated event handlers.

// On the other hand, navigator.clipboard is the more recent API, meant for use in any context. It asks for user permission, if needed.

// Summary
// Data change events:

// Event	Description	Specials
// change	A value was changed.	For text inputs triggers on focus loss.
// input	For text inputs on every change.	Triggers immediately unlike change.
// cut/copy/paste	Cut/copy/paste actions.	The action can be prevented. The event.clipboardData property gives access to the clipboard. All browsers except Firefox also support navigator.clipboard.

// ///////////////////////////////////////////////////////////////////

// // Forms: event and method submit
// Forms: event and method submit
// The submit event triggers when the form is submitted, it is usually used to validate the form before sending it to the server or to abort the submission and process it in JavaScript.

// The method form.submit() allows to initiate form sending from JavaScript. We can use it to dynamically create and send our own forms to server.

// Let’s see more details of them.

// Event: submit
// There are two main ways to submit a form:

// The first – to click <input type="submit"> or <input type="image">.
// The second – press Enter on an input field.
// Both actions lead to submit event on the form. The handler can check the data, and if there are errors, show them and call event.preventDefault(), then the form won’t be sent to the server.

// In the form below:

// Go into the text field and press Enter.
// Click <input type="submit">.
// Both actions show console.log and the form is not sent anywhere due to return false:

// <form onsubmit="console.log('submit!');return false">
//   First: Enter in the input field <input type="text" value="text"><br>
//   Second: Click "submit": <input type="submit" value="Submit">
// </form>

// Relation between submit and click
// When a form is sent using Enter on an input field, a click event triggers on the <input type="submit">.

// That’s rather funny, because there was no click at all.

// Here’s the demo:

// <form onsubmit="return false">
//  <input type="text" size="30" value="Focus here and press enter">
//  <input type="submit" value="Submit" onclick="console.log('click')">
// </form>

// Method: submit
// To submit a form to the server manually, we can call form.submit().

// Then the submit event is not generated. It is assumed that if the programmer calls form.submit(), then the script already did all related processing.

// Sometimes that’s used to manually create and send a form, like this:

// let form = document.createElement('form');
// form.action = 'https://google.com/search';
// form.method = 'GET';

// form.innerHTML = '<input name="q" value="test">';

// // the form must be in the document to submit it
// document.body.append(form);

// form.submit();
// ///////////////////////////////////////////////////////////////////
