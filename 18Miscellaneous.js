// // Mutation observer
// Mutation observer
// MutationObserver is a built-in object that observes a DOM element and fires a callback when it detects a change.

// We’ll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.

// Syntax
// MutationObserver is easy to use.

// First, we create an observer with a callback-function:

// let observer = new MutationObserver(callback);
// And then attach it to a DOM node:

// observer.observe(node, config);
// config is an object with boolean options “what kind of changes to react on”:

// childList – changes in the direct children of node,
// subtree – in all descendants of node,
// attributes – attributes of node,
// attributeFilter – an array of attribute names, to observe only selected ones.
// characterData – whether to observe node.data (text content),
// Few other options:

// attributeOldValue – if true, pass both the old and the new value of attribute to callback (see below), otherwise only the new one (needs attributes option),
// characterDataOldValue – if true, pass both the old and the new value of node.data to callback (see below), otherwise only the new one (needs characterData option).
// Then after any changes, the callback is executed: changes are passed in the first argument as a list of MutationRecord objects, and the observer itself as the second argument.

// MutationRecord objects have properties:

// type – mutation type, one of
// "attributes": attribute modified
// "characterData": data modified, used for text nodes,
// "childList": child elements added/removed,
// target – where the change occurred: an element for "attributes", or text node for "characterData", or an element for a "childList" mutation,
// addedNodes/removedNodes – nodes that were added/removed,
// previousSibling/nextSibling – the previous and next sibling to added/removed nodes,
// attributeName/attributeNamespace – the name/namespace (for XML) of the changed attribute,
// oldValue – the previous value, only for attribute or text changes, if the corresponding option is set attributeOldValue/characterDataOldValue.
// For example, here’s a <div> with a contentEditable attribute. That attribute allows us to focus on it and edit.

// <div contentEditable id="elem">Click and <b>edit</b>, please</div>

// <script>
// let observer = new MutationObserver(mutationRecords => {
//   console.log(mutationRecords); // console.log(the changes)
// });

// // observe everything except attributes
// observer.observe(elem, {
//   childList: true, // observe direct children
//   subtree: true, // and lower descendants too
//   characterDataOldValue: true // pass old data to callback
// });
// </script>
// If we run this code in the browser, then focus on the given <div> and change the text inside <b>edit</b>, console.log will show one mutation:

// mutationRecords = [{
//   type: "characterData",
//   oldValue: "edit",
//   target: <text node>,
//   // other properties empty
// }];
// If we make more complex editing operations, e.g. remove the <b>edit</b>, the mutation event may contain multiple mutation records:

// mutationRecords = [{
//   type: "childList",
//   target: <div#elem>,
//   removedNodes: [<b>],
//   nextSibling: <text node>,
//   previousSibling: <text node>
//   // other properties empty
// }, {
//   type: "characterData"
//   target: <text node>
//   // ...mutation details depend on how the browser handles such removal
//   // it may coalesce two adjacent text nodes "edit " and ", please" into one node
//   // or it may leave them separate text nodes
// }];
// So, MutationObserver allows to react on any changes within DOM subtree.

// Usage for integration
// When such thing may be useful?

// Imagine the situation when you need to add a third-party script that contains useful functionality, but also does something unwanted, e.g. shows ads <div class="ads">Unwanted ads</div>.

// Naturally, the third-party script provides no mechanisms to remove it.

// Using MutationObserver, we can detect when the unwanted element appears in our DOM and remove it.

// There are other situations when a third-party script adds something into our document, and we’d like to detect, when it happens, to adapt our page, dynamically resize something etc.

// MutationObserver allows to implement this.

// Usage for architecture
// There are also situations when MutationObserver is good from architectural standpoint.

// Let’s say we’re making a website about programming. Naturally, articles and other materials may contain source code snippets.

// Such snippet in an HTML markup looks like this:

// ...
// <pre class="language-javascript"><code>
//   // here's the code
//   let hello = "world";
// </code></pre>
// ...
// For better readability and at the same time, to beautify it, we’ll be using a JavaScript syntax highlighting library on our site, like Prism.js. To get syntax highlighting for above snippet in Prism, Prism.highlightElem(pre) is called, which examines the contents of such pre elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.

// When exactly should we run that highlighting method? Well, we can do it on DOMContentLoaded event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements pre[class*="language"] and call Prism.highlightElem on them:

// // highlight all code snippets on the page
// document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
// Everything’s simple so far, right? We find code snippets in HTML and highlight them.

// Now let’s go on. Let’s say we’re going to dynamically fetch materials from a server. We’ll study methods for that later in the tutorial. For now it only matters that we fetch an HTML article from a webserver and display it on demand:

// let article = /* fetch new content from server */
// articleElem.innerHTML = article;
// The new article HTML may contain code snippets. We need to call Prism.highlightElem on them, otherwise they won’t get highlighted.

// Where and when to call Prism.highlightElem for a dynamically loaded article?

// We could append that call to the code that loads an article, like this:

// let article = /* fetch new content from server */
// articleElem.innerHTML = article;

// let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
// snippets.forEach(Prism.highlightElem);
// …But, imagine if we have many places in the code where we load our content – articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That’s not very convenient.

// And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we’d like to add syntax highlighting to it. No one likes patching third-party scripts.

// Luckily, there’s another option.

// We can use MutationObserver to automatically detect when code snippets are inserted into the page and highlight them.

// So we’ll handle the highlighting functionality in one place, relieving us from the need to integrate it.

// Dynamic highlight demo
// Here’s the working example.

// If you run this code, it starts observing the element below and highlighting any code snippets that appear there:

// let observer = new MutationObserver(mutations => {

//   for(let mutation of mutations) {
//     // examine new nodes, is there anything to highlight?

//     for(let node of mutation.addedNodes) {
//       // we track only elements, skip other nodes (e.g. text nodes)
//       if (!(node instanceof HTMLElement)) continue;

//       // check the inserted element for being a code snippet
//       if (node.matches('pre[class*="language-"]')) {
//         Prism.highlightElement(node);
//       }

//       // or maybe there's a code snippet somewhere in its subtree?
//       for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
//         Prism.highlightElement(elem);
//       }
//     }
//   }

// });

// let demoElem = document.getElementById('highlight-demo');

// observer.observe(demoElem, {childList: true, subtree: true});
// Here, below, there’s an HTML-element and JavaScript that dynamically fills it using innerHTML.

// Please run the previous code (above, observes that element), and then the code below. You’ll see how MutationObserver detects and highlights the snippet.

// A demo-element with id="highlight-demo", run the code above to observe it.

// The following code populates its innerHTML, that causes the MutationObserver to react and highlight its contents:

// let demoElem = document.getElementById('highlight-demo');

// // dynamically insert content with code snippets
// demoElem.innerHTML = `A code snippet is below:
//   <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
//   <div>Another one:</div>
//   <div>
//     <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
//   </div>
// `;
// Now we have MutationObserver that can track all highlighting in observed elements or the whole document. We can add/remove code snippets in HTML without thinking about it.

// Additional methods
// There’s a method to stop observing the node:

// observer.disconnect() – stops the observation.
// When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use

// observer.takeRecords() – gets a list of unprocessed mutation records – those that happened, but the callback has not handled them.
// These methods can be used together, like this:

// // get a list of unprocessed mutations
// // should be called before disconnecting,
// // if you care about possibly unhandled recent mutations
// let mutationRecords = observer.takeRecords();

// // stop tracking changes
// observer.disconnect();
// ...
// Records returned by observer.takeRecords() are removed from the processing queue
// The callback won’t be called for records, returned by observer.takeRecords().

// Garbage collection interaction
// Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.

// The mere fact that a DOM node is observed doesn’t prevent the garbage collection.

// Summary
// MutationObserver can react to changes in DOM – attributes, text content and adding/removing elements.

// We can use it to track changes introduced by other parts of our code, as well as to integrate with third-party scripts.

// MutationObserver can track any changes. The config “what to observe” options are used for optimizations, not to spend resources on unneeded callback invocations.
// ///////////////////////////////////////////////////////////////////

// // Selection and Range
// Selection and Range
// In this chapter we’ll cover selection in the document, as well as selection in form fields, such as <input>.

// JavaScript can access an existing selection, select/deselect DOM nodes as a whole or partially, remove the selected content from the document, wrap it into a tag, and so on.

// You can find some recipes for common tasks at the end of the chapter, in “Summary” section. Maybe that covers your current needs, but you’ll get much more if you read the whole text.

// The underlying Range and Selection objects are easy to grasp, and then you’ll need no recipes to make them do what you want.

// Range
// The basic concept of selection is Range, that is essentially a pair of “boundary points”: range start and range end.

// A Range object is created without parameters:

// let range = new Range();
// Then we can set the selection boundaries using range.setStart(node, offset) and range.setEnd(node, offset).

// As you might guess, further we’ll use the Range objects for selection, but first let’s create few such objects.

// Selecting the text partially
// The interesting thing is that the first argument node in both methods can be either a text node or an element node, and the meaning of the second argument depends on that.

// If node is a text node, then offset must be the position in its text.

// For example, given the element <p>Hello</p>, we can create the range containing the letters “ll” as follows:

// <p id="p">Hello</p>
// <script>
//   let range = new Range();
//   range.setStart(p.firstChild, 2);
//   range.setEnd(p.firstChild, 4);

//   // toString of a range returns its content as text
//   console.log(range); // ll
// </script>
// Here we take the first child of <p> (that’s the text node) and specify the text positions inside it:

// Selecting element nodes
// Alternatively, if node is an element node, then offset must be the child number.

// That’s handy for making ranges that contain nodes as a whole, not stop somewhere inside their text.

// For example, we have a more complex document fragment:

// <p id="p">Example: <i>italic</i> and <b>bold</b></p>

// Here’s its DOM structure with both element and text nodes:

// ▾
// P
// #text Example:␣
// ▾
// I
// #text italic
// #text ␣and␣
// ▾
// B
// #text bold
// Let’s make a range for "Example: <i>italic</i>".

// As we can see, this phrase consists of exactly two children of <p>, with indexes 0 and 1:

// The starting point has <p> as the parent node, and 0 as the offset.

// So we can set it as range.setStart(p, 0).

// The ending point also has <p> as the parent node, but 2 as the offset (it specifies the range up to, but not including offset).

// So we can set it as range.setEnd(p, 2).

// Here’s the demo. If you run it, you can see that the text gets selected:

// <p id="p">Example: <i>italic</i> and <b>bold</b></p>

// <script>
//   let range = new Range();

//   range.setStart(p, 0);
//   range.setEnd(p, 2);

//   // toString of a range returns its content as text, without tags
//   console.log(range); // Example: italic

//   // apply this range for document selection (explained later below)
//   document.getSelection().addRange(range);
// </script>
// Here’s a more flexible test stand where you can set range start/end numbers and explore other variants:

// <p id="p">Example: <i>italic</i> and <b>bold</b></p>

// From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
// <button id="button">Click to select</button>
// <script>
//   button.onclick = () => {
//     let range = new Range();

//     range.setStart(p, start.value);
//     range.setEnd(p, end.value);

//     // apply the selection, explained later below
//     document.getSelection().removeAllRanges();
//     document.getSelection().addRange(range);
//   };
// </script>

// E.g. selecting in the same <p> from offset 1 to 4 gives us the range <i>italic</i> and <b>bold</b>:

// Starting and ending nodes can be different
// We don’t have to use the same node in setStart and setEnd. A range may span across many unrelated nodes. It’s only important that the end is after the start in the document.

// Selecting a bigger fragment
// Let’s make a bigger selection in our example, like this:

// We already know how to do that. We just need to set the start and the end as a relative offset in text nodes.

// We need to create a range, that:

// starts from position 2 in <p> first child (taking all but two first letters of "Example: ")
// ends at the position 3 in <b> first child (taking first three letters of “bold”, but no more):
// <p id="p">Example: <i>italic</i> and <b>bold</b></p>

// <script>
//   let range = new Range();

//   range.setStart(p.firstChild, 2);
//   range.setEnd(p.querySelector('b').firstChild, 3);

//   console.log(range); // ample: italic and bol

//   // use this range for selection (explained later)
//   window.getSelection().addRange(range);
// </script>
// As you can see, it’s fairly easy to make a range of whatever we want.

// If we’d like to take nodes as a whole, we can pass elements in setStart/setEnd. Otherwise, we can work on the text level.

// Range properties
// The range object that we created in the example above has following properties:

// startContainer, startOffset – node and offset of the start,
// in the example above: first text node inside <p> and 2.
// endContainer, endOffset – node and offset of the end,
// in the example above: first text node inside <b> and 3.
// collapsed – boolean, true if the range starts and ends on the same point (so there’s no content inside the range),
// in the example above: false
// commonAncestorContainer – the nearest common ancestor of all nodes within the range,
// in the example above: <p>
// Range selection methods
// There are many convenient methods to manipulate ranges.

// We’ve already seen setStart and setEnd, here are other similar methods.

// Set range start:

// setStart(node, offset) set start at: position offset in node
// setStartBefore(node) set start at: right before node
// setStartAfter(node) set start at: right after node
// Set range end (similar methods):

// setEnd(node, offset) set end at: position offset in node
// setEndBefore(node) set end at: right before node
// setEndAfter(node) set end at: right after node
// Technically, setStart/setEnd can do anything, but more methods provide more convenience.

// In all these methods, node can be both a text or element node: for text nodes offset skips that many of characters, while for element nodes that many child nodes.

// Even more methods to create ranges:

// selectNode(node) set range to select the whole node
// selectNodeContents(node) set range to select the whole node contents
// collapse(toStart) if toStart=true set end=start, otherwise set start=end, thus collapsing the range
// cloneRange() creates a new range with the same start/end
// Range editing methods
// Once the range is created, we can manipulate its content using these methods:

// deleteContents() – remove range content from the document
// extractContents() – remove range content from the document and return as DocumentFragment
// cloneContents() – clone range content and return as DocumentFragment
// insertNode(node) – insert node into the document at the beginning of the range
// surroundContents(node) – wrap node around range content. For this to work, the range must contain both opening and closing tags for all elements inside it: no partial ranges like <i>abc.
// With these methods we can do basically anything with selected nodes.

// Here’s the test stand to see them in action:

// Click buttons to run methods on the selection, "resetExample" to reset it.

// <p id="p">Example: <i>italic</i> and <b>bold</b></p>

// <p id="result"></p>
// <script>
//   let range = new Range();

//   // Each demonstrated method is represented here:
//   let methods = {
//     deleteContents() {
//       range.deleteContents()
//     },
//     extractContents() {
//       let content = range.extractContents();
//       result.innerHTML = "";
//       result.append("extracted: ", content);
//     },
//     cloneContents() {
//       let content = range.cloneContents();
//       result.innerHTML = "";
//       result.append("cloned: ", content);
//     },
//     insertNode() {
//       let newNode = document.createElement('u');
//       newNode.innerHTML = "NEW NODE";
//       range.insertNode(newNode);
//     },
//     surroundContents() {
//       let newNode = document.createElement('u');
//       try {
//         range.surroundContents(newNode);
//       } catch(e) { console.log(e) }
//     },
//     resetExample() {
//       p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
//       result.innerHTML = "";

//       range.setStart(p.firstChild, 2);
//       range.setEnd(p.querySelector('b').firstChild, 3);

//       window.getSelection().removeAllRanges();
//       window.getSelection().addRange(range);
//     }
//   };

//   for(let method in methods) {
//     document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
//   }

//   methods.resetExample();
// </script>

// There also exist methods to compare ranges, but these are rarely used. When you need them, please refer to the spec or MDN manual.

// Selection
// Range is a generic object for managing selection ranges. Although, creating a Range doesn’t mean that we see a selection on screen.

// We may create Range objects, pass them around – they do not visually select anything on their own.

// The document selection is represented by Selection object, that can be obtained as window.getSelection() or document.getSelection(). A selection may include zero or more ranges. At least, the Selection API specification says so. In practice though, only Firefox allows to select multiple ranges in the document by using Ctrl+click (Cmd+click for Mac).

// Here’s a screenshot of a selection with 3 ranges, made in Firefox:

// Other browsers support at maximum 1 range. As we’ll see, some of Selection methods imply that there may be many ranges, but again, in all browsers except Firefox, there’s at maximum 1.

// Here’s a small demo that shows the current selection (select something and click) as text:

// console.log(document.getSelection())

// Selection properties
// As said, a selection may in theory contain multiple ranges. We can get these range objects using the method:

// getRangeAt(i) – get i-th range, starting from 0. In all browsers except Firefox, only 0 is used.
// Also, there exist properties that often provide better convenience.

// Similar to a range, a selection object has a start, called “anchor”, and the end, called “focus”.

// The main selection properties are:

// anchorNode – the node where the selection starts,
// anchorOffset – the offset in anchorNode where the selection starts,
// focusNode – the node where the selection ends,
// focusOffset – the offset in focusNode where the selection ends,
// isCollapsed – true if selection selects nothing (empty range), or doesn’t exist.
// rangeCount – count of ranges in the selection, maximum 1 in all browsers except Firefox.
// Selection end/start vs Range
// There’s an important differences of a selection anchor/focus compared with a Range start/end.

// As we know, Range objects always have their start before the end.

// For selections, that’s not always the case.

// Selecting something with a mouse can be done in both directions: either “left-to-right” or “right-to-left”.

// In other words, when the mouse button is pressed, and then it moves forward in the document, then its end (focus) will be after its start (anchor).

// E.g. if the user starts selecting with mouse and goes from “Example” to “italic”:

// …But the same selection could be done backwards: starting from “italic” to “Example” (backward direction), then its end (focus) will be before the start (anchor):

// Selection events
// There are events on to keep track of selection:

// elem.onselectstart – when a selection starts specifically on element elem (or inside it). For instance, when the user presses the mouse button on it and starts to move the pointer.
// Preventing the default action cancels the selection start. So starting a selection from this element becomes impossible, but the element is still selectable. The visitor just needs to start the selection from elsewhere.
// document.onselectionchange – whenever a selection changes or starts.
// Please note: this handler can be set only on document, it tracks all selections in it.
// Selection tracking demo
// Here’s a small demo. It tracks the current selection on the document and shows its boundaries:

// <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

// From <input id="from" disabled> – To <input id="to" disabled>
// <script>
//   document.onselectionchange = function() {
//     let selection = document.getSelection();

//     let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

//     // anchorNode and focusNode are text nodes usually
//     from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
//     to.value = `${focusNode?.data}, offset ${focusOffset}`;
//   };
// </script>
// Selection copying demo
// There are two approaches to copying the selected content:

// We can use document.getSelection().toString() to get it as text.
// Otherwise, to copy the full DOM, e.g. if we need to keep formatting, we can get the underlying ranges with getRangesAt(...). A Range object, in turn, has cloneContents() method that clones its content and returns as DocumentFragment object, that we can insert elsewhere.
// Here’s the demo of copying the selected content both as text and as DOM nodes:

// <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

// Cloned: <span id="cloned"></span>
// <br>
// As text: <span id="astext"></span>

// <script>
//   document.onselectionchange = function() {
//     let selection = document.getSelection();

//     cloned.innerHTML = astext.innerHTML = "";

//     // Clone DOM nodes from ranges (we support multiselect here)
//     for (let i = 0; i < selection.rangeCount; i++) {
//       cloned.append(selection.getRangeAt(i).cloneContents());
//     }

//     // Get as text
//     astext.innerHTML += selection;
//   };
// </script>
// Selection methods
// We can work with the selection by adding/removing ranges:

// getRangeAt(i) – get i-th range, starting from 0. In all browsers except Firefox, only 0 is used.
// addRange(range) – add range to selection. All browsers except Firefox ignore the call, if the selection already has an associated range.
// removeRange(range) – remove range from the selection.
// removeAllRanges() – remove all ranges.
// empty() – alias to removeAllRanges.
// There are also convenience methods to manipulate the selection range directly, without intermediate Range calls:

// collapse(node, offset) – replace selected range with a new one that starts and ends at the given node, at position offset.
// setPosition(node, offset) – alias to collapse.
// collapseToStart() – collapse (replace with an empty range) to selection start,
// collapseToEnd() – collapse to selection end,
// extend(node, offset) – move focus of the selection to the given node, position offset,
// setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset) – replace selection range with the given start anchorNode/anchorOffset and end focusNode/focusOffset. All content in-between them is selected.
// selectAllChildren(node) – select all children of the node.
// deleteFromDocument() – remove selected content from the document.
// containsNode(node, allowPartialContainment = false) – checks whether the selection contains node (partially if the second argument is true)
// For most tasks these methods are just fine, there’s no need to access the underlying Range object.

// For example, selecting the whole contents of the paragraph <p>:

// <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

// <script>
//   // select from 0th child of <p> to the last child
//   document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
// </script>
// The same thing using ranges:

// <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

// <script>
//   let range = new Range();
//   range.selectNodeContents(p); // or selectNode(p) to select the <p> tag too

//   document.getSelection().removeAllRanges(); // clear existing selection if any
//   document.getSelection().addRange(range);
// </script>
// To select something, remove the existing selection first
// If a document selection already exists, empty it first with removeAllRanges(). And then add ranges. Otherwise, all browsers except Firefox ignore new ranges.

// The exception is some selection methods, that replace the existing selection, such as setBaseAndExtent.

// Selection in form controls
// Form elements, such as input and textarea provide special API for selection, without Selection or Range objects. As an input value is a pure text, not HTML, there’s no need for such objects, everything’s much simpler.

// Properties:

// input.selectionStart – position of selection start (writeable),
// input.selectionEnd – position of selection end (writeable),
// input.selectionDirection – selection direction, one of: “forward”, “backward” or “none” (if e.g. selected with a double mouse click),
// Events:

// input.onselect – triggers when something is selected.
// Methods:

// input.select() – selects everything in the text control (can be textarea instead of input),

// input.setSelectionRange(start, end, [direction]) – change the selection to span from position start till end, in the given direction (optional).

// input.setRangeText(replacement, [start], [end], [selectionMode]) – replace a range of text with the new text.

// Optional arguments start and end, if provided, set the range start and end, otherwise user selection is used.

// The last argument, selectionMode, determines how the selection will be set after the text has been replaced. The possible values are:

// "select" – the newly inserted text will be selected.
// "start" – the selection range collapses just before the inserted text (the cursor will be immediately before it).
// "end" – the selection range collapses just after the inserted text (the cursor will be right after it).
// "preserve" – attempts to preserve the selection. This is the default.
// Now let’s see these methods in action.

// Example: tracking selection
// For example, this code uses onselect event to track selection:

// <textarea id="area" style="width:80%;height:60px">
// Selecting in this text updates values below.
// </textarea>
// <br>
// From <input id="from" disabled> – To <input id="to" disabled>

// <script>
//   area.onselect = function() {
//     from.value = area.selectionStart;
//     to.value = area.selectionEnd;
//   };
// </script>

// Please note:

// onselect triggers when something is selected, but not when the selection is removed.
// document.onselectionchange event should not trigger for selections inside a form control, according to the spec, as it’s not related to document selection and ranges. Some browsers generate it, but we shouldn’t rely on it.
// Example: moving cursor
// We can change selectionStart and selectionEnd, that sets the selection.

// An important edge case is when selectionStart and selectionEnd equal each other. Then it’s exactly the cursor position. Or, to rephrase, when nothing is selected, the selection is collapsed at the cursor position.

// So, by setting selectionStart and selectionEnd to the same value, we move the cursor.

// For example:

// <textarea id="area" style="width:80%;height:60px">
// Focus on me, the cursor will be at position 10.
// </textarea>

// <script>
//   area.onfocus = () => {
//     // zero delay setTimeout to run after browser "focus" action finishes
//     setTimeout(() => {
//       // we can set any selection
//       // if start=end, the cursor is exactly at that place
//       area.selectionStart = area.selectionEnd = 10;
//     });
//   };
// </script>

// Example: modifying selection
// To modify the content of the selection, we can use input.setRangeText() method. Of course, we can read selectionStart/End and, with the knowledge of the selection, change the corresponding substring of value, but setRangeText is more powerful and often more convenient.

// That’s a somewhat complex method. In its simplest one-argument form it replaces the user selected range and removes the selection.

// For example, here the user selection will be wrapped by *...*:

// <input id="input" style="width:200px" value="Select here and click the button">
// <button id="button">Wrap selection in stars *...*</button>

// <script>
// button.onclick = () => {
//   if (input.selectionStart == input.selectionEnd) {
//     return; // nothing is selected
//   }

//   let selected = input.value.slice(input.selectionStart, input.selectionEnd);
//   input.setRangeText(`*${selected}*`);
// };
// </script>

// With more arguments, we can set range start and end.

// In this example we find "THIS" in the input text, replace it and keep the replacement selected:

// <input id="input" style="width:200px" value="Replace THIS in text">
// <button id="button">Replace THIS</button>

// <script>
// button.onclick = () => {
//   let pos = input.value.indexOf("THIS");
//   if (pos >= 0) {
//     input.setRangeText("*THIS*", pos, pos + 4, "select");
//     input.focus(); // focus to make selection visible
//   }
// };
// </script>

// Example: insert at cursor
// If nothing is selected, or we use equal start and end in setRangeText, then the new text is just inserted, nothing is removed.

// We can also insert something “at the cursor” using setRangeText.

// Here’s a button that inserts "HELLO" at the cursor position and puts the cursor immediately after it. If the selection is not empty, then it gets replaced (we can detect it by comparing selectionStart!=selectionEnd and do something else instead):

// <input id="input" style="width:200px" value="Text Text Text Text Text">
// <button id="button">Insert "HELLO" at cursor</button>

// <script>
//   button.onclick = () => {
//     input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
//     input.focus();
//   };
// </script>

// Making unselectable
// To make something unselectable, there are three ways:

// Use CSS property user-select: none.

// <style>
// #elem {
//   user-select: none;
// }
// </style>
// <div>Selectable <div id="elem">Unselectable</div> Selectable</div>
// This doesn’t allow the selection to start at elem. But the user may start the selection elsewhere and include elem into it.

// Then elem will become a part of document.getSelection(), so the selection actually happens, but its content is usually ignored in copy-paste.

// Prevent default action in onselectstart or mousedown events.

// <div>Selectable <div id="elem">Unselectable</div> Selectable</div>

// <script>
//   elem.onselectstart = () => false;
// </script>
// This prevents starting the selection on elem, but the visitor may start it at another element, then extend to elem.

// That’s convenient when there’s another event handler on the same action that triggers the select (e.g. mousedown). So we disable the selection to avoid conflict, still allowing elem contents to be copied.

// We can also clear the selection post-factum after it happens with document.getSelection().empty(). That’s rarely used, as this causes unwanted blinking as the selection appears-disappears.

// References
// DOM spec: Range
// Selection API
// HTML spec: APIs for the text control selections
// Summary
// We covered two different APIs for selections:

// For document: Selection and Range objects.
// For input, textarea: additional methods and properties.
// The second API is very simple, as it works with text.

// The most used recipes are probably:

// Getting the selection:
// let selection = document.getSelection();

// let cloned = /* element to clone the selected nodes to */;

// // then apply Range methods to selection.getRangeAt(0)
// // or, like here, to all ranges to support multi-select
// for (let i = 0; i < selection.rangeCount; i++) {
//   cloned.append(selection.getRangeAt(i).cloneContents());
// }
// Setting the selection:
// let selection = document.getSelection();

// // directly:
// selection.setBaseAndExtent(...from...to...);

// // or we can create a range and:
// selection.removeAllRanges();
// selection.addRange(range);
// And finally, about the cursor. The cursor position in editable elements, like <textarea> is always at the start or the end of the selection. We can use it to get cursor position or to move the cursor by setting elem.selectionStart and elem.selectionEnd.
// ///////////////////////////////////////////////////////////////////

// // Event loop: microtasks and macrotasks
// Event loop: microtasks and macrotasks
// Browser JavaScript execution flow, as well as in Node.js, is based on an event loop.

// Understanding how event loop works is important for optimizations, and sometimes for the right architecture.

// In this chapter we first cover theoretical details about how things work, and then see practical applications of that knowledge.

// Event Loop
// The event loop concept is very simple. There’s an endless loop, where the JavaScript engine waits for tasks, executes them and then sleeps, waiting for more tasks.

// The general algorithm of the engine:

// While there are tasks:
// execute them, starting with the oldest task.
// Sleep until a task appears, then go to 1.
// That’s a formalization for what we see when browsing a page. The JavaScript engine does nothing most of the time, it only runs if a script/handler/event activates.

// Examples of tasks:

// When an external script <script src="..."> loads, the task is to execute it.
// When a user moves their mouse, the task is to dispatch mousemove event and execute handlers.
// When the time is due for a scheduled setTimeout, the task is to run its callback.
// …and so on.
// Tasks are set – the engine handles them – then waits for more tasks (while sleeping and consuming close to zero CPU).

// It may happen that a task comes while the engine is busy, then it’s enqueued.

// The tasks form a queue, so-called “macrotask queue” (v8 term):

// For instance, while the engine is busy executing a script, a user may move their mouse causing mousemove, and setTimeout may be due and so on, these tasks form a queue, as illustrated on the picture above.

// Tasks from the queue are processed on “first come – first served” basis. When the engine browser is done with the script, it handles mousemove event, then setTimeout handler, and so on.

// So far, quite simple, right?

// Two more details:

// Rendering never happens while the engine executes a task. It doesn’t matter if the task takes a long time. Changes to the DOM are painted only after the task is complete.
// If a task takes too long, the browser can’t do other tasks, such as processing user events. So after a time, it raises an console.log like “Page Unresponsive”, suggesting killing the task with the whole page. That happens when there are a lot of complex calculations or a programming error leading to an infinite loop.
// That was the theory. Now let’s see how we can apply that knowledge.

// Use-case 1: splitting CPU-hungry tasks
// Let’s say we have a CPU-hungry task.

// For example, syntax-highlighting (used to colorize code examples on this page) is quite CPU-heavy. To highlight the code, it performs the analysis, creates many colored elements, adds them to the document – for a large amount of text that takes a lot of time.

// While the engine is busy with syntax highlighting, it can’t do other DOM-related stuff, process user events, etc. It may even cause the browser to “hiccup” or even “hang” for a bit, which is unacceptable.

// We can avoid problems by splitting the big task into pieces. Highlight first 100 lines, then schedule setTimeout (with zero-delay) for the next 100 lines, and so on.

// To demonstrate this approach, for the sake of simplicity, instead of text-highlighting, let’s take a function that counts from 1 to 1000000000.

// If you run the code below, the engine will “hang” for some time. For server-side JS that’s clearly noticeable, and if you are running it in-browser, then try to click other buttons on the page – you’ll see that no other events get handled until the counting finishes.

// let i = 0;

// let start = Date.now();

// function count() {

//   // do a heavy job
//   for (let j = 0; j < 1e9; j++) {
//     i++;
//   }

//   console.log("Done in " + (Date.now() - start) + 'ms');
// }

// count();
// The browser may even show a “the script takes too long” warning.

// Let’s split the job using nested setTimeout calls:

// let i = 0;

// let start = Date.now();

// function count() {

//   // do a piece of the heavy job (*)
//   do {
//     i++;
//   } while (i % 1e6 != 0);

//   if (i == 1e9) {
//     console.log("Done in " + (Date.now() - start) + 'ms');
//   } else {
//     setTimeout(count); // schedule the new call (**)
//   }

// }

// count();
// Now the browser interface is fully functional during the “counting” process.

// A single run of count does a part of the job (*), and then re-schedules itself (**) if needed:

// First run counts: i=1...1000000.
// Second run counts: i=1000001..2000000.
// …and so on.
// Now, if a new side task (e.g. onclick event) appears while the engine is busy executing part 1, it gets queued and then executes when part 1 finished, before the next part. Periodic returns to the event loop between count executions provide just enough “air” for the JavaScript engine to do something else, to react to other user actions.

// The notable thing is that both variants – with and without splitting the job by setTimeout – are comparable in speed. There’s not much difference in the overall counting time.

// To make them closer, let’s make an improvement.

// We’ll move the scheduling to the beginning of the count():

// let i = 0;

// let start = Date.now();

// function count() {

//   // move the scheduling to the beginning
//   if (i < 1e9 - 1e6) {
//     setTimeout(count); // schedule the new call
//   }

//   do {
//     i++;
//   } while (i % 1e6 != 0);

//   if (i == 1e9) {
//     console.log("Done in " + (Date.now() - start) + 'ms');
//   }

// }

// count();
// Now when we start to count() and see that we’ll need to count() more, we schedule that immediately, before doing the job.

// If you run it, it’s easy to notice that it takes significantly less time.

// Why?

// That’s simple: as you remember, there’s the in-browser minimal delay of 4ms for many nested setTimeout calls. Even if we set 0, it’s 4ms (or a bit more). So the earlier we schedule it – the faster it runs.

// Finally, we’ve split a CPU-hungry task into parts – now it doesn’t block the user interface. And its overall execution time isn’t much longer.

// Use case 2: progress indication
// Another benefit of splitting heavy tasks for browser scripts is that we can show progress indication.

// As mentioned earlier, changes to DOM are painted only after the currently running task is completed, irrespective of how long it takes.

// On one hand, that’s great, because our function may create many elements, add them one-by-one to the document and change their styles – the visitor won’t see any “intermediate”, unfinished state. An important thing, right?

// Here’s the demo, the changes to i won’t show up until the function finishes, so we’ll see only the last value:

// <div id="progress"></div>

// <script>

//   function count() {
//     for (let i = 0; i < 1e6; i++) {
//       i++;
//       progress.innerHTML = i;
//     }
//   }

//   count();
// </script>
// …But we also may want to show something during the task, e.g. a progress bar.

// If we split the heavy task into pieces using setTimeout, then changes are painted out in-between them.

// This looks prettier:

// <div id="progress"></div>

// <script>
//   let i = 0;

//   function count() {

//     // do a piece of the heavy job (*)
//     do {
//       i++;
//       progress.innerHTML = i;
//     } while (i % 1e3 != 0);

//     if (i < 1e7) {
//       setTimeout(count);
//     }

//   }

//   count();
// </script>
// Now the <div> shows increasing values of i, a kind of a progress bar.

// Use case 3: doing something after the event
// In an event handler we may decide to postpone some actions until the event bubbled up and was handled on all levels. We can do that by wrapping the code in zero delay setTimeout.

// In the chapter Dispatching custom events we saw an example: custom event menu-open is dispatched in setTimeout, so that it happens after the “click” event is fully handled.

// menu.onclick = function() {
//   // ...

//   // create a custom event with the clicked menu item data
//   let customEvent = new CustomEvent("menu-open", {
//     bubbles: true
//   });

//   // dispatch the custom event asynchronously
//   setTimeout(() => menu.dispatchEvent(customEvent));
// };
// Macrotasks and Microtasks
// Along with macrotasks, described in this chapter, there are microtasks, mentioned in the chapter Microtasks.

// Microtasks come solely from our code. They are usually created by promises: an execution of .then/catch/finally handler becomes a microtask. Microtasks are used “under the cover” of await as well, as it’s another form of promise handling.

// There’s also a special function queueMicrotask(func) that queues func for execution in the microtask queue.

// Immediately after every macrotask, the engine executes all tasks from microtask queue, prior to running any other macrotasks or rendering or anything else.

// For instance, take a look:

// setTimeout(() => console.log("timeout"));

// Promise.resolve()
//   .then(() => console.log("promise"));

// console.log("code");
// What’s going to be the order here?

// code shows first, because it’s a regular synchronous call.
// promise shows second, because .then passes through the microtask queue, and runs after the current code.
// timeout shows last, because it’s a macrotask.
// The richer event loop picture looks like this (order is from top to bottom, that is: the script first, then microtasks, rendering and so on):

// All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

// That’s important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

// If we’d like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with queueMicrotask.

// Here’s an example with “counting progress bar”, similar to the one shown previously, but queueMicrotask is used instead of setTimeout. You can see that it renders at the very end. Just like the synchronous code:

// <div id="progress"></div>

// <script>
//   let i = 0;

//   function count() {

//     // do a piece of the heavy job (*)
//     do {
//       i++;
//       progress.innerHTML = i;
//     } while (i % 1e3 != 0);

//     if (i < 1e6) {
//       queueMicrotask(count);
//     }

//   }

//   count();
// </script>
// Summary
// A more detailed event loop algorithm (though still simplified compared to the specification):

// Dequeue and run the oldest task from the macrotask queue (e.g. “script”).
// Execute all microtasks:
// While the microtask queue is not empty:
// Dequeue and run the oldest microtask.
// Render changes if any.
// If the macrotask queue is empty, wait till a macrotask appears.
// Go to step 1.
// To schedule a new macrotask:

// Use zero delayed setTimeout(f).
// That may be used to split a big calculation-heavy task into pieces, for the browser to be able to react to user events and show progress between them.

// Also, used in event handlers to schedule an action after the event is fully handled (bubbling done).

// To schedule a new microtask

// Use queueMicrotask(f).
// Also promise handlers go through the microtask queue.
// There’s no UI or network event handling between microtasks: they run immediately one after another.

// So one may want to queueMicrotask to execute a function asynchronously, but within the environment state.

// Web Workers
// For long heavy calculations that shouldn’t block the event loop, we can use Web Workers.

// That’s a way to run code in another, parallel thread.

// Web Workers can exchange messages with the main process, but they have their own variables, and their own event loop.

// Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiple CPU cores simultaneously.
// ///////////////////////////////////////////////////////////////////
