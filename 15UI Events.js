// // Mouse events
// Mouse events
// In this chapter we’ll get into more details about mouse events and their properties.

// Please note: such events may come not only from “mouse devices”, but are also from other devices, such as phones and tablets, where they are emulated for compatibility.

// Mouse event types
// We’ve already seen some of these events:

// mousedown/mouseup
// Mouse button is clicked/released over an element.
// mouseover/mouseout
// Mouse pointer comes over/out from an element.
// mousemove
// Every mouse move over an element triggers that event.
// click
// Triggers after mousedown and then mouseup over the same element if the left mouse button was used.
// dblclick
// Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.
// contextmenu
// Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it’s not exactly the mouse event.
// …There are several other events too, we’ll cover them later.

// Events order
// As you can see from the list above, a user action may trigger multiple events.

// For instance, a left-button click first triggers mousedown, when the button is pressed, then mouseup and click when it’s released.

// In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order mousedown → mouseup → click.

// Click the button below and you’ll see the events. Try double-click too.

// On the teststand below, all mouse events are logged, and if there is more than a 1 second delay between them, they are separated by a horizontal rule.

// Also, we can see the button property that allows us to detect the mouse button; it’s explained below.

// Mouse button
// Click-related events always have the button property, which allows to get the exact mouse button.

// We usually don’t use it for click and contextmenu events, because the former happens only on left-click, and the latter – only on right-click.

// On the other hand, mousedown and mouseup handlers may need event.button, because these events trigger on any button, so button allows to distinguish between “right-mousedown” and “left-mousedown”.

// The possible values of event.button are:

// Button state	event.button
// Left button (primary)	0
// Middle button (auxiliary)	1
// Right button (secondary)	2
// X1 button (back)	3
// X2 button (forward)	4
// Most mouse devices only have the left and right buttons, so possible values are 0 or 2. Touch devices also generate similar events when one taps on them.

// Also there’s event.buttons property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at MDN if you ever need it.

// The outdated event.which
// Old code may use event.which property that’s an old non-standard way of getting a button, with possible values:

// event.which == 1 – left button,
// event.which == 2 – middle button,
// event.which == 3 – right button.
// As of now, event.which is deprecated, we shouldn’t use it.

// Modifiers: shift, alt, ctrl and meta
// All mouse events include the information about pressed modifier keys.

// Event properties:

// shiftKey: Shift
// altKey: Alt (or Opt for Mac)
// ctrlKey: Ctrl
// metaKey: Cmd for Mac
// They are true if the corresponding key was pressed during the event.

// For instance, the button below only works on Alt+Shift+click:

// <button id="button">Alt+Shift+Click on me!</button>

// <script>
//   button.onclick = function(event) {
//     if (event.altKey && event.shiftKey) {
//       console.log('Hooray!');
//     }
//   };
// </script>

// Attention: on Mac it’s usually Cmd instead of Ctrl
// On Windows and Linux there are modifier keys Alt, Shift and Ctrl. On Mac there’s one more: Cmd, corresponding to the property metaKey.

// In most applications, when Windows/Linux uses Ctrl, on Mac Cmd is used.

// That is: where a Windows user presses Ctrl+Enter or Ctrl+A, a Mac user would press Cmd+Enter or Cmd+A, and so on.

// So if we want to support combinations like Ctrl+click, then for Mac it makes sense to use Cmd+click. That’s more comfortable for Mac users.

// Even if we’d like to force Mac users to Ctrl+click – that’s kind of difficult. The problem is: a left-click with Ctrl is interpreted as a right-click on MacOS, and it generates the contextmenu event, not click like Windows/Linux.

// So if we want users of all operating systems to feel comfortable, then together with ctrlKey we should check metaKey.

// For JS-code it means that we should check if (event.ctrlKey || event.metaKey).

// There are also mobile devices
// Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard – they work.

// But if their device doesn’t have it – then there should be a way to live without modifier keys.

// Coordinates: clientX/Y, pageX/Y
// All mouse events provide coordinates in two flavours:

// Window-relative: clientX and clientY.
// Document-relative: pageX and pageY.
// We already covered the difference between them in the chapter Coordinates.

// In short, document-relative coordinates pageX/Y are counted from the left-upper corner of the document, and do not change when the page is scrolled, while clientX/Y are counted from the current window left-upper corner. When the page is scrolled, they change.

// For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then clientX and clientY are 0, no matter how the page is scrolled.

// And if the mouse is in the center, then clientX and clientY are 250, no matter what place in the document it is. They are similar to position:fixed in that aspect.

// Move the mouse over the input field to see clientX/clientY (the example is in the iframe, so coordinates are relative to that iframe):

// <input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">

// Preventing selection on mousedown
// Double mouse click has a side effect that may be disturbing in some interfaces: it selects text.

// For instance, double-clicking on the text below selects it in addition to our handler:

// <span ondblclick="console.log('dblclick')">Double-click me</span>

// If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

// There are multiple ways to prevent the selection, that you can read in the chapter Selection and Range.

// In this particular case the most reasonable way is to prevent the browser action on mousedown. It prevents both these selections:

// Before...
// <b ondblclick="console.log('Click!')" onmousedown="return false">
//   Double-click me
// </b>
// ...After

// Now the bold element is not selected on double clicks, and pressing the left button on it won’t start the selection.

// Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that’s fine for users.

// Preventing copying
// If we want to disable selection to protect our page content from copy-pasting, then we can use another event: oncopy.

// <div oncopy="console.log('Copying forbidden!');return false">
//   Dear user,
//   The copying is forbidden for you.
//   If you know JS or HTML, then you can get everything from the page source though.
// </div>

// If you try to copy a piece of text in the <div>, that won’t work, because the default action oncopy is prevented.

// Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.

// Summary
// Mouse events have the following properties:

// Button: button.

// Modifier keys (true if pressed): altKey, ctrlKey, shiftKey and metaKey (Mac).

// If you want to handle Ctrl, then don’t forget Mac users, they usually use Cmd, so it’s better to check if (e.metaKey || e.ctrlKey).
// Window-relative coordinates: clientX/clientY.

// Document-relative coordinates: pageX/pageY.

// The default browser action of mousedown is text selection, if it’s not good for the interface, then it should be prevented.

// In the next chapter we’ll see more details about events that follow pointer movement and how to track element changes under it.
// ///////////////////////////////////////////////////////////////////

// // Moving the mouse: mouseover/out, mouseenter/leave
// Moving the mouse: mouseover/out, mouseenter/leave
// Let’s dive into more details about events that happen when the mouse moves between elements.

// Events mouseover/mouseout, relatedTarget
// The mouseover event occurs when a mouse pointer comes over an element, and mouseout – when it leaves.

// These events are special, because they have property relatedTarget. This property complements target. When a mouse leaves one element for another, one of them becomes target, and the other one – relatedTarget.

// For mouseover:

// event.target – is the element where the mouse came over.
// event.relatedTarget – is the element from which the mouse came (relatedTarget → target).
// For mouseout the reverse:

// event.target – is the element that the mouse left.
// event.relatedTarget – is the new under-the-pointer element, that mouse left for (target → relatedTarget).
// In the example below each face and its features are separate elements. When you move the mouse, you can see mouse events in the text area.

// Each event has the information about both target and relatedTarget:

// Resultscript.jsstyle.cssindex.html

// relatedTarget can be null
// The relatedTarget property can be null.

// That’s normal and just means that the mouse came not from another element, but from out of the window. Or that it left the window.

// We should keep that possibility in mind when using event.relatedTarget in our code. If we access event.relatedTarget.tagName, then there will be an error.

// Skipping elements
// The mousemove event triggers when the mouse moves. But that doesn’t mean that every pixel leads to an event.

// The browser checks the mouse position from time to time. And if it notices changes then triggers the events.

// That means that if the visitor is moving the mouse very fast then some DOM-elements may be skipped:

// If the mouse moves very fast from #FROM to #TO elements as painted above, then intermediate <div> elements (or some of them) may be skipped. The mouseout event may trigger on #FROM and then immediately mouseover on #TO.

// That’s good for performance, because there may be many intermediate elements. We don’t really want to process in and out of each one.

// On the other hand, we should keep in mind that the mouse pointer doesn’t “visit” all elements along the way. It can “jump”.

// In particular, it’s possible that the pointer jumps right inside the middle of the page from out of the window. In that case relatedTarget is null, because it came from “nowhere”:

// You can check it out “live” on a teststand below.

// Its HTML has two nested elements: the <div id="child"> is inside the <div id="parent">. If you move the mouse fast over them, then maybe only the child div triggers events, or maybe the parent one, or maybe there will be no events at all.

// Also move the pointer into the child div, and then move it out quickly down through the parent one. If the movement is fast enough, then the parent element is ignored. The mouse will cross the parent element without noticing it.

// Resultscript.jsstyle.cssindex.html

// If mouseover triggered, there must be mouseout
// In case of fast mouse movements, intermediate elements may be ignored, but one thing we know for sure: if the pointer “officially” entered an element (mouseover event generated), then upon leaving it we always get mouseout.

// Mouseout when leaving for a child
// An important feature of mouseout – it triggers, when the pointer moves from an element to its descendant, e.g. from #parent to #child in this HTML:

// <div id="parent">
//   <div id="child">...</div>
// </div>
// If we’re on #parent and then move the pointer deeper into #child, we get mouseout on #parent!

// That may seem strange, but can be easily explained.

// According to the browser logic, the mouse cursor may be only over a single element at any time – the most nested one and top by z-index.

// So if it goes to another element (even a descendant), then it leaves the previous one.

// Please note another important detail of event processing.

// The mouseover event on a descendant bubbles up. So, if #parent has mouseover handler, it triggers:

// You can see that very well in the example below: <div id="child"> is inside the <div id="parent">. There are mouseover/out handlers on #parent element that output event details.

// If you move the mouse from #parent to #child, you see two events on #parent:

// mouseout [target: parent] (left the parent), then
// mouseover [target: child] (came to the child, bubbled).
// Resultscript.jsstyle.cssindex.html

// As shown, when the pointer moves from #parent element to #child, two handlers trigger on the parent element: mouseout and mouseover:

// parent.onmouseout = function(event) {
//   /* event.target: parent element */
// };
// parent.onmouseover = function(event) {
//   /* event.target: child element (bubbled) */
// };
// If we don’t examine event.target inside the handlers, then it may seem that the mouse pointer left #parent element, and then immediately came back over it.

// But that’s not the case! The pointer is still over the parent, it just moved deeper into the child element.

// If there are some actions upon leaving the parent element, e.g. an animation runs in parent.onmouseout, we usually don’t want it when the pointer just goes deeper into #parent.

// To avoid it, we can check relatedTarget in the handler and, if the mouse is still inside the element, then ignore such event.

// Alternatively we can use other events: mouseenter and mouseleave, that we’ll be covering now, as they don’t have such problems.

// Events mouseenter and mouseleave
// Events mouseenter/mouseleave are like mouseover/mouseout. They trigger when the mouse pointer enters/leaves the element.

// But there are two important differences:

// Transitions inside the element, to/from descendants, are not counted.
// Events mouseenter/mouseleave do not bubble.
// These events are extremely simple.

// When the pointer enters an element – mouseenter triggers. The exact location of the pointer inside the element or its descendants doesn’t matter.

// When the pointer leaves an element – mouseleave triggers.

// This example is similar to the one above, but now the top element has mouseenter/mouseleave instead of mouseover/mouseout.

// As you can see, the only generated events are the ones related to moving the pointer in and out of the top element. Nothing happens when the pointer goes to the child and back. Transitions between descendants are ignored

// Resultscript.jsstyle.cssindex.html

// Event delegation
// Events mouseenter/leave are very simple and easy to use. But they do not bubble. So we can’t use event delegation with them.

// Imagine we want to handle mouse enter/leave for table cells. And there are hundreds of cells.

// The natural solution would be – to set the handler on <table> and process events there. But mouseenter/leave don’t bubble. So if such event happens on <td>, then only a handler on that <td> is able to catch it.

// Handlers for mouseenter/leave on <table> only trigger when the pointer enters/leaves the table as a whole. It’s impossible to get any information about transitions inside it.

// So, let’s use mouseover/mouseout.

// Let’s start with simple handlers that highlight the element under mouse:

// // let's highlight an element under the pointer
// table.onmouseover = function(event) {
//   let target = event.target;
//   target.style.background = 'pink';
// };

// table.onmouseout = function(event) {
//   let target = event.target;
//   target.style.background = '';
// };
// Here they are in action. As the mouse travels across the elements of this table, the current one is highlighted:

// Resultscript.jsstyle.cssindex.html

// In our case we’d like to handle transitions between table cells <td>: entering a cell and leaving it. Other transitions, such as inside the cell or outside of any cells, don’t interest us. Let’s filter them out.

// Here’s what we can do:

// Remember the currently highlighted <td> in a variable, let’s call it currentElem.
// On mouseover – ignore the event if we’re still inside the current <td>.
// On mouseout – ignore if we didn’t leave the current <td>.
// Here’s an example of code that accounts for all possible situations:

// // <td> under the mouse right now (if any)
// let currentElem = null;

// table.onmouseover = function(event) {
//   // before entering a new element, the mouse always leaves the previous one
//   // if currentElem is set, we didn't leave the previous <td>,
//   // that's a mouseover inside it, ignore the event
//   if (currentElem) return;

//   let target = event.target.closest('td');

//   // we moved not into a <td> - ignore
//   if (!target) return;

//   // moved into <td>, but outside of our table (possible in case of nested tables)
//   // ignore
//   if (!table.contains(target)) return;

//   // hooray! we entered a new <td>
//   currentElem = target;
//   onEnter(currentElem);
// };

// table.onmouseout = function(event) {
//   // if we're outside of any <td> now, then ignore the event
//   // that's probably a move inside the table, but out of <td>,
//   // e.g. from <tr> to another <tr>
//   if (!currentElem) return;

//   // we're leaving the element – where to? Maybe to a descendant?
//   let relatedTarget = event.relatedTarget;

//   while (relatedTarget) {
//     // go up the parent chain and check – if we're still inside currentElem
//     // then that's an internal transition – ignore it
//     if (relatedTarget == currentElem) return;

//     relatedTarget = relatedTarget.parentNode;
//   }

//   // we left the <td>. really.
//   onLeave(currentElem);
//   currentElem = null;
// };

// // any functions to handle entering/leaving an element
// function onEnter(elem) {
//   elem.style.background = 'pink';

//   // show that in textarea
//   text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
//   text.scrollTop = 1e6;
// }

// function onLeave(elem) {
//   elem.style.background = '';

//   // show that in textarea
//   text.value += `out <- ${elem.tagName}.${elem.className}\n`;
//   text.scrollTop = 1e6;
// }
// Once again, the important features are:

// It uses event delegation to handle entering/leaving of any <td> inside the table. So it relies on mouseover/out instead of mouseenter/leave that don’t bubble and hence allow no delegation.
// Extra events, such as moving between descendants of <td> are filtered out, so that onEnter/Leave runs only if the pointer leaves or enters <td> as a whole.
// Here’s the full example with all details:

// Resultscript.jsstyle.cssindex.html

// Try to move the cursor in and out of table cells and inside them. Fast or slow – doesn’t matter. Only <td> as a whole is highlighted, unlike the example before.

// Summary
// We covered events mouseover, mouseout, mousemove, mouseenter and mouseleave.

// These things are good to note:

// A fast mouse move may skip intermediate elements.
// Events mouseover/out and mouseenter/leave have an additional property: relatedTarget. That’s the element that we are coming from/to, complementary to target.
// Events mouseover/out trigger even when we go from the parent element to a child element. The browser assumes that the mouse can be only over one element at one time – the deepest one.

// Events mouseenter/leave are different in that aspect: they only trigger when the mouse comes in and out the element as a whole. Also they do not bubble.
// ///////////////////////////////////////////////////////////////////

// // Drag'n'Drop with mouse events
// Drag'n'Drop with mouse events
// Drag’n’Drop is a great interface solution. Taking something and dragging and dropping it is a clear and simple way to do many things, from copying and moving documents (as in file managers) to ordering (dropping items into a cart).

// In the modern HTML standard there’s a section about Drag and Drop with special events such as dragstart, dragend, and so on.

// These events allow us to support special kinds of drag’n’drop, such as handling dragging a file from OS file-manager and dropping it into the browser window. Then JavaScript can access the contents of such files.

// But native Drag Events also have limitations. For instance, we can’t prevent dragging from a certain area. Also we can’t make the dragging “horizontal” or “vertical” only. And there are many other drag’n’drop tasks that can’t be done using them. Also, mobile device support for such events is very weak.

// So here we’ll see how to implement Drag’n’Drop using mouse events.

// Drag’n’Drop algorithm
// The basic Drag’n’Drop algorithm looks like this:

// On mousedown – prepare the element for moving, if needed (maybe create a clone of it, add a class to it or whatever).
// Then on mousemove move it by changing left/top with position:absolute.
// On mouseup – perform all actions related to finishing the drag’n’drop.
// These are the basics. Later we’ll see how to add other features, such as highlighting current underlying elements while we drag over them.

// Here’s the implementation of dragging a ball:

// ball.onmousedown = function(event) {
//   // (1) prepare to moving: make absolute and on top by z-index
//   ball.style.position = 'absolute';
//   ball.style.zIndex = 1000;

//   // move it out of any current parents directly into body
//   // to make it positioned relative to the body
//   document.body.append(ball);

//   // centers the ball at (pageX, pageY) coordinates
//   function moveAt(pageX, pageY) {
//     ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
//     ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
//   }

//   // move our absolutely positioned ball under the pointer
//   moveAt(event.pageX, event.pageY);

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   // (2) move the ball on mousemove
//   document.addEventListener('mousemove', onMouseMove);

//   // (3) drop the ball, remove unneeded handlers
//   ball.onmouseup = function() {
//     document.removeEventListener('mousemove', onMouseMove);
//     ball.onmouseup = null;
//   };

// };
// If we run the code, we can notice something strange. On the beginning of the drag’n’drop, the ball “forks”: we start dragging its “clone”.

// Here’s an example in action:

// Try to drag’n’drop with the mouse and you’ll see such behavior.

// That’s because the browser has its own drag’n’drop support for images and some other elements. It runs automatically and conflicts with ours.

// To disable it:

// ball.ondragstart = function() {
//   return false;
// };
// Now everything will be all right.

// In action:

// Another important aspect – we track mousemove on document, not on ball. From the first sight it may seem that the mouse is always over the ball, and we can put mousemove on it.

// But as we remember, mousemove triggers often, but not for every pixel. So after swift move the pointer can jump from the ball somewhere in the middle of document (or even outside of the window).

// So we should listen on document to catch it.

// Correct positioning
// In the examples above the ball is always moved so that its center is under the pointer:

// ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
// ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
// Not bad, but there’s a side effect. To initiate the drag’n’drop, we can mousedown anywhere on the ball. But if “take” it from its edge, then the ball suddenly “jumps” to become centered under the mouse pointer.

// It would be better if we keep the initial shift of the element relative to the pointer.

// For instance, if we start dragging by the edge of the ball, then the pointer should remain over the edge while dragging.

// Let’s update our algorithm:

// When a visitor presses the button (mousedown) – remember the distance from the pointer to the left-upper corner of the ball in variables shiftX/shiftY. We’ll keep that distance while dragging.

// To get these shifts we can substract the coordinates:

// // onmousedown
// let shiftX = event.clientX - ball.getBoundingClientRect().left;
// let shiftY = event.clientY - ball.getBoundingClientRect().top;
// Then while dragging we position the ball on the same shift relative to the pointer, like this:

// // onmousemove
// // ball has position:absolute
// ball.style.left = event.pageX - shiftX + 'px';
// ball.style.top = event.pageY - shiftY + 'px';
// The final code with better positioning:

// ball.onmousedown = function(event) {

//   let shiftX = event.clientX - ball.getBoundingClientRect().left;
//   let shiftY = event.clientY - ball.getBoundingClientRect().top;

//   ball.style.position = 'absolute';
//   ball.style.zIndex = 1000;
//   document.body.append(ball);

//   moveAt(event.pageX, event.pageY);

//   // moves the ball at (pageX, pageY) coordinates
//   // taking initial shifts into account
//   function moveAt(pageX, pageY) {
//     ball.style.left = pageX - shiftX + 'px';
//     ball.style.top = pageY - shiftY + 'px';
//   }

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   // move the ball on mousemove
//   document.addEventListener('mousemove', onMouseMove);

//   // drop the ball, remove unneeded handlers
//   ball.onmouseup = function() {
//     document.removeEventListener('mousemove', onMouseMove);
//     ball.onmouseup = null;
//   };

// };

// ball.ondragstart = function() {
//   return false;
// };
// In action (inside <iframe>):

// The difference is especially noticeable if we drag the ball by its right-bottom corner. In the previous example the ball “jumps” under the pointer. Now it fluently follows the pointer from the current position.

// Potential drop targets (droppables)
// In previous examples the ball could be dropped just “anywhere” to stay. In real-life we usually take one element and drop it onto another. For instance, a “file” into a “folder” or something else.

// Speaking abstract, we take a “draggable” element and drop it onto “droppable” element.

// We need to know:

// where the element was dropped at the end of Drag’n’Drop – to do the corresponding action,
// and, preferably, know the droppable we’re dragging over, to highlight it.
// The solution is kind-of interesting and just a little bit tricky, so let’s cover it here.

// What may be the first idea? Probably to set mouseover/mouseup handlers on potential droppables?

// But that doesn’t work.

// The problem is that, while we’re dragging, the draggable element is always above other elements. And mouse events only happen on the top element, not on those below it.

// For instance, below are two <div> elements, red one on top of the blue one (fully covers). There’s no way to catch an event on the blue one, because the red is on top:

// <style>
//   div {
//     width: 50px;
//     height: 50px;
//     position: absolute;
//     top: 0;
//   }
// </style>
// <div style="background:blue" onmouseover="console.log('never works')"></div>
// <div style="background:red" onmouseover="console.log('over red!')"></div>

// The same with a draggable element. The ball is always on top over other elements, so events happen on it. Whatever handlers we set on lower elements, they won’t work.

// That’s why the initial idea to put handlers on potential droppables doesn’t work in practice. They won’t run.

// So, what to do?

// There’s a method called document.elementFromPoint(clientX, clientY). It returns the most nested element on given window-relative coordinates (or null if given coordinates are out of the window). If there are multiple overlapping elements on the same coordinates, then the topmost one is returned.

// We can use it in any of our mouse event handlers to detect the potential droppable under the pointer, like this:

// // in a mouse event handler
// ball.hidden = true; // (*) hide the element that we drag

// let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// // elemBelow is the element below the ball, may be droppable

// ball.hidden = false;
// Please note: we need to hide the ball before the call (*). Otherwise we’ll usually have a ball on these coordinates, as it’s the top element under the pointer: elemBelow=ball. So we hide it and immediately show again.

// We can use that code to check what element we’re “flying over” at any time. And handle the drop when it happens.

// An extended code of onMouseMove to find “droppable” elements:

// // potential droppable that we're flying over right now
// let currentDroppable = null;

// function onMouseMove(event) {
//   moveAt(event.pageX, event.pageY);

//   ball.hidden = true;
//   let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
//   ball.hidden = false;

//   // mousemove events may trigger out of the window (when the ball is dragged off-screen)
//   // if clientX/clientY are out of the window, then elementFromPoint returns null
//   if (!elemBelow) return;

//   // potential droppables are labeled with the class "droppable" (can be other logic)
//   let droppableBelow = elemBelow.closest('.droppable');

//   if (currentDroppable != droppableBelow) {
//     // we're flying in or out...
//     // note: both values can be null
//     //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
//     //   droppableBelow=null if we're not over a droppable now, during this event

//     if (currentDroppable) {
//       // the logic to process "flying out" of the droppable (remove highlight)
//       leaveDroppable(currentDroppable);
//     }
//     currentDroppable = droppableBelow;
//     if (currentDroppable) {
//       // the logic to process "flying in" of the droppable
//       enterDroppable(currentDroppable);
//     }
//   }
// }
// In the example below when the ball is dragged over the soccer goal, the goal is highlighted.

// Resultstyle.cssindex.html

// Now we have the current “drop target”, that we’re flying over, in the variable currentDroppable during the whole process and can use it to highlight or any other stuff.

// Summary
// We considered a basic Drag’n’Drop algorithm.

// The key components:

// Events flow: ball.mousedown → document.mousemove → ball.mouseup (don’t forget to cancel native ondragstart).
// At the drag start – remember the initial shift of the pointer relative to the element: shiftX/shiftY and keep it during the dragging.
// Detect droppable elements under the pointer using document.elementFromPoint.
// We can lay a lot on this foundation.

// On mouseup we can intellectually finalize the drop: change data, move elements around.
// We can highlight the elements we’re flying over.
// We can limit dragging by a certain area or direction.
// We can use event delegation for mousedown/up. A large-area event handler that checks event.target can manage Drag’n’Drop for hundreds of elements.
// And so on.
// There are frameworks that build architecture over it: DragZone, Droppable, Draggable and other classes. Most of them do the similar stuff to what’s described above, so it should be easy to understand them now. Or roll your own, as you can see that that’s easy enough to do, sometimes easier than adapting a third-party solution.
// ///////////////////////////////////////////////////////////////////

// // Pointer events
// Pointer events
// Pointer events are a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen, and so on.

// The brief history
// Let’s make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

// Long ago, in the past, there were only mouse events.

// Then touch devices became widespread, phones and tablets in particular. For the existing scripts to work, they generated (and still generate) mouse events. For instance, tapping a touchscreen generates mousedown. So touch devices worked well with web pages.

// But touch devices have more capabilities than a mouse. For example, it’s possible to touch multiple points at once (“multi-touch”). Although, mouse events don’t have necessary properties to handle such multi-touches.

// So touch events were introduced, such as touchstart, touchend, touchmove, that have touch-specific properties (we don’t cover them in detail here, because pointer events are even better).

// Still, it wasn’t enough, as there are many other devices, such as pens, that have their own features. Also, writing code that listens for both touch and mouse events was cumbersome.

// To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

// As of now, Pointer Events Level 2 specification is supported in all major browsers, while the newer Pointer Events Level 3 is in the works and is mostly compatible with Pointer Events level 2.

// Unless you develop for old browsers, such as Internet Explorer 10, or for Safari 12 or below, there’s no point in using mouse or touch events any more – we can switch to pointer events.

// Then your code will work well with both touch and mouse devices.

// That said, there are some important peculiarities that one should know in order to use Pointer Events correctly and avoid surprises. We’ll make note of them in this article.

// Pointer event types
// Pointer events are named similarly to mouse events:

// Pointer event	Similar mouse event
// pointerdown	mousedown
// pointerup	mouseup
// pointermove	mousemove
// pointerover	mouseover
// pointerout	mouseout
// pointerenter	mouseenter
// pointerleave	mouseleave
// pointercancel	-
// gotpointercapture	-
// lostpointercapture	-
// As we can see, for every mouse<event>, there’s a pointer<event> that plays a similar role. Also there are 3 additional pointer events that don’t have a corresponding mouse... counterpart, we’ll explain them soon.

// Replacing mouse<event> with pointer<event> in our code
// We can replace mouse<event> events with pointer<event> in our code and expect things to continue working fine with mouse.

// The support for touch devices will also “magically” improve. Although, we may need to add touch-action: none in some places in CSS. We’ll cover it below in the section about pointercancel.

// Pointer event properties
// Pointer events have the same properties as mouse events, such as clientX/Y, target, etc., plus some others:

// pointerId – the unique identifier of the pointer causing the event.

// Browser-generated. Allows us to handle multiple pointers, such as a touchscreen with stylus and multi-touch (examples will follow).

// pointerType – the pointing device type. Must be a string, one of: “mouse”, “pen” or “touch”.

// We can use this property to react differently on various pointer types.

// isPrimary – is true for the primary pointer (the first finger in multi-touch).

// Some pointer devices measure contact area and pressure, e.g. for a finger on the touchscreen, there are additional properties for that:

// width – the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it’s always 1.
// height – the height of the area where the pointer touches the device. Where unsupported, it’s always 1.
// pressure – the pressure of the pointer tip, in range from 0 to 1. For devices that don’t support pressure must be either 0.5 (pressed) or 0.
// tangentialPressure – the normalized tangential pressure.
// tiltX, tiltY, twist – pen-specific properties that describe how the pen is positioned relative the surface.
// These properties aren’t supported by most devices, so they are rarely used. You can find the details about them in the specification if needed.

// Multi-touch
// One of the things that mouse events totally don’t support is multi-touch: a user can touch in several places at once on their phone or tablet, or perform special gestures.

// Pointer Events allow handling multi-touch with the help of the pointerId and isPrimary properties.

// Here’s what happens when a user touches a touchscreen in one place, then puts another finger somewhere else on it:

// At the first finger touch:
// pointerdown with isPrimary=true and some pointerId.
// For the second finger and more fingers (assuming the first one is still touching):
// pointerdown with isPrimary=false and a different pointerId for every finger.
// Please note: the pointerId is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 pointerdown events, each with their respective coordinates and a different pointerId.

// The events associated with the first finger always have isPrimary=true.

// We can track multiple touching fingers using their pointerId. When the user moves and then removes a finger, we get pointermove and pointerup events with the same pointerId as we had in pointerdown.

// Here’s the demo that logs pointerdown and pointerup events:

// Please note: you must be using a touchscreen device, such as a phone or a tablet, to actually see the difference in pointerId/isPrimary. For single-touch devices, such as a mouse, there’ll be always same pointerId with isPrimary=true, for all pointer events.

// Event: pointercancel
// The pointercancel event fires when there’s an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated.

// Such causes are:

// The pointer device hardware was physically disabled.
// The device orientation changed (tablet rotated).
// The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.
// We’ll demonstrate pointercancel on a practical example to see how it affects us.

// Let’s say we’re implementing drag’n’drop for a ball, just as in the beginning of the article Drag'n'Drop with mouse events.

// Here is the flow of user actions and the corresponding events:

// The user presses on an image, to start dragging
// pointerdown event fires
// Then they start moving the pointer (thus dragging the image)
// pointermove fires, maybe several times
// And then the surprise happens! The browser has native drag’n’drop support for images, that kicks in and takes over the drag’n’drop process, thus generating pointercancel event.
// The browser now handles drag’n’drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
// No more pointermove events for us.
// So the issue is that the browser “hijacks” the interaction: pointercancel fires in the beginning of the “drag-and-drop” process, and no more pointermove events are generated.

// Here’s the drag’n’drop demo with loggin of pointer events (only up/down, move and cancel) in the textarea:

// We’d like to implement the drag’n’drop on our own, so let’s tell the browser not to take it over.

// Prevent the default browser action to avoid pointercancel.

// We need to do two things:

// Prevent native drag’n’drop from happening:
// We can do this by setting ball.ondragstart = () => false, just as described in the article Drag'n'Drop with mouse events.
// That works well for mouse events.
// For touch devices, there are other touch-related browser actions (besides drag’n’drop). To avoid problems with them too:
// Prevent them by setting #ball { touch-action: none } in CSS.
// Then our code will start working on touch devices.
// After we do that, the events will work as intended, the browser won’t hijack the process and doesn’t emit pointercancel.

// This demo adds these lines:

// As you can see, there’s no pointercancel any more.

// Now we can add the code to actually move the ball, and our drag’n’drop will work for mouse devices and touch devices.

// Pointer capturing
// Pointer capturing is a special feature of pointer events.

// The idea is very simple, but may seem quite odd at first, as nothing like that exists for any other event type.

// The main method is:

// elem.setPointerCapture(pointerId) – binds events with the given pointerId to elem. After the call all pointer events with the same pointerId will have elem as the target (as if happened on elem), no matter where in document they really happened.
// In other words, elem.setPointerCapture(pointerId) retargets all subsequent events with the given pointerId to elem.

// The binding is removed:

// automatically when pointerup or pointercancel events occur,
// automatically when elem is removed from the document,
// when elem.releasePointerCapture(pointerId) is called.
// Now what is it good for? It’s time to see a real-life example.

// Pointer capturing can be used to simplify drag’n’drop kind of interactions.

// Let’s recall how one can implement a custom slider, described in the Drag'n'Drop with mouse events.

// We can make a slider element to represent the strip and the “runner” (thumb) inside it:

// <div class="slider">
//   <div class="thumb"></div>
// </div>
// With styles, it looks like this:

// And here’s the working logic, as it was described, after replacing mouse events with similar pointer events:

// The user presses on the slider thumb – pointerdown triggers.
// Then they move the pointer – pointermove triggers, and our code moves the thumb element along.
// …As the pointer moves, it may leave the slider thumb element, go above or below it. The thumb should move strictly horizontally, remaining aligned with the pointer.
// In the mouse event based solution, to track all pointer movements, including when it goes above/below the thumb, we had to assign mousemove event handler on the whole document.

// That’s not a cleanest solution, though. One of the problems is that when a user moves the pointer around the document, it may trigger event handlers (such as mouseover) on some other elements, invoke totally unrelated UI functionality, and we don’t want that.

// This is the place where setPointerCapture comes into play.

// We can call thumb.setPointerCapture(event.pointerId) in pointerdown handler,
// Then future pointer events until pointerup/cancel will be retargeted to thumb.
// When pointerup happens (dragging complete), the binding is removed automatically, we don’t need to care about it.
// So, even if the user moves the pointer around the whole document, events handlers will be called on thumb. Nevertheless, coordinate properties of the event objects, such as clientX/clientY will still be correct – the capturing only affects target/currentTarget.

// Here’s the essential code:

// thumb.onpointerdown = function(event) {
//   // retarget all pointer events (until pointerup) to thumb
//   thumb.setPointerCapture(event.pointerId);

//   // start tracking pointer moves
//   thumb.onpointermove = function(event) {
//     // moving the slider: listen on the thumb, as all pointer events are retargeted to it
//     let newLeft = event.clientX - slider.getBoundingClientRect().left;
//     thumb.style.left = newLeft + 'px';
//   };

//   // on pointer up finish tracking pointer moves
//   thumb.onpointerup = function(event) {
//     thumb.onpointermove = null;
//     thumb.onpointerup = null;
//     // ...also process the "drag end" if needed
//   };
// };

// // note: no need to call thumb.releasePointerCapture,
// // it happens on pointerup automatically
// The full demo:

// In the demo, there’s also an additional element with onmouseover handler showing the current date.

// Please note: while you’re dragging the thumb, you may hover over this element, and its handler does not trigger.

// So the dragging is now free of side effects, thanks to setPointerCapture.

// At the end, pointer capturing gives us two benefits:

// The code becomes cleaner as we don’t need to add/remove handlers on the whole document any more. The binding is released automatically.
// If there are other pointer event handlers in the document, they won’t be accidentally triggered by the pointer while the user is dragging the slider.
// Pointer capturing events
// There’s one more thing to mention here, for the sake of completeness.

// There are two events associated with pointer capturing:

// gotpointercapture fires when an element uses setPointerCapture to enable capturing.
// lostpointercapture fires when the capture is released: either explicitly with releasePointerCapture call, or automatically on pointerup/pointercancel.
// Summary
// Pointer events allow handling mouse, touch and pen events simultaneously, with a single piece of code.

// Pointer events extend mouse events. We can replace mouse with pointer in event names and expect our code to continue working for mouse, with better support for other device types.

// For drag’n’drops and complex touch interactions that the browser may decide to hijack and handle on its own – remember to cancel the default action on events and set touch-action: none in CSS for elements that we engage.

// Additional abilities of pointer events are:

// Multi-touch support using pointerId and isPrimary.
// Device-specific properties, such as pressure, width/height, and others.
// Pointer capturing: we can retarget all pointer events to a specific element until pointerup/pointercancel.
// As of now, pointer events are supported in all major browsers, so we can safely switch to them, especially if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.
// ///////////////////////////////////////////////////////////////////

// // Keyboard: keydown and keyup
// Keyboard: keydown and keyup
// Before we get to keyboard, please note that on modern devices there are other ways to “input something”. For instance, people use speech recognition (especially on mobile devices) or copy/paste with the mouse.

// So if we want to track any input into an <input> field, then keyboard events are not enough. There’s another event named input to track changes of an <input> field, by any means. And it may be a better choice for such task. We’ll cover it later in the chapter Events: change, input, cut, copy, paste.

// Keyboard events should be used when we want to handle keyboard actions (virtual keyboard also counts). For instance, to react on arrow keys Up and Down or hotkeys (including combinations of keys).

// Teststand
// To better understand keyboard events, you can use the teststand below.

// Try different key combinations in the text field.

// Resultscript.jsstyle.cssindex.html

// Keydown and keyup
// The keydown events happens when a key is pressed down, and then keyup – when it’s released.

// event.code and event.key
// The key property of the event object allows to get the character, while the code property of the event object allows to get the “physical key code”.

// For instance, the same key Z can be pressed with or without Shift. That gives us two different characters: lowercase z and uppercase Z.

// The event.key is exactly the character, and it will be different. But event.code is the same:

// Key	event.key	event.code
// Z	z (lowercase)	KeyZ
// Shift+Z	Z (uppercase)	KeyZ
// If a user works with different languages, then switching to another language would make a totally different character instead of "Z". That will become the value of event.key, while event.code is always the same: "KeyZ".

// “KeyZ” and other key codes
// Every key has the code that depends on its location on the keyboard. Key codes described in the UI Events code specification.

// For instance:

// Letter keys have codes "Key<letter>": "KeyA", "KeyB" etc.
// Digit keys have codes: "Digit<number>": "Digit0", "Digit1" etc.
// Special keys are coded by their names: "Enter", "Backspace", "Tab" etc.
// There are several widespread keyboard layouts, and the specification gives key codes for each of them.

// Read the alphanumeric section of the spec for more codes, or just press a key in the teststand above.

// Case matters: "KeyZ", not "keyZ"
// Seems obvious, but people still make mistakes.

// Please evade mistypes: it’s KeyZ, not keyZ. The check like event.code=="keyZ" won’t work: the first letter of "Key" must be uppercase.

// What if a key does not give any character? For instance, Shift or F1 or others. For those keys, event.key is approximately the same as event.code:

// Key	event.key	event.code
// F1	F1	F1
// Backspace	Backspace	Backspace
// Shift	Shift	ShiftRight or ShiftLeft
// Please note that event.code specifies exactly which key is pressed. For instance, most keyboards have two Shift keys: on the left and on the right side. The event.code tells us exactly which one was pressed, and event.key is responsible for the “meaning” of the key: what it is (a “Shift”).

// Let’s say, we want to handle a hotkey: Ctrl+Z (or Cmd+Z for Mac). Most text editors hook the “Undo” action on it. We can set a listener on keydown and check which key is pressed.

// There’s a dilemma here: in such a listener, should we check the value of event.key or event.code?

// On one hand, the value of event.key is a character, it changes depending on the language. If the visitor has several languages in OS and switches between them, the same key gives different characters. So it makes sense to check event.code, it’s always the same.

// Like this:

// document.addEventListener('keydown', function(event) {
//   if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
//     console.log('Undo!')
//   }
// });
// On the other hand, there’s a problem with event.code. For different keyboard layouts, the same key may have different characters.

// For example, here are US layout (“QWERTY”) and German layout (“QWERTZ”) under it (from Wikipedia):

// For the same key, US layout has “Z”, while German layout has “Y” (letters are swapped).

// Literally, event.code will equal KeyZ for people with German layout when they press Y.

// If we check event.code == 'KeyZ' in our code, then for people with German layout such test will pass when they press Y.

// That sounds really odd, but so it is. The specification explicitly mentions such behavior.

// So, event.code may match a wrong character for unexpected layout. Same letters in different layouts may map to different physical keys, leading to different codes. Luckily, that happens only with several codes, e.g. keyA, keyQ, keyZ (as we’ve seen), and doesn’t happen with special keys such as Shift. You can find the list in the specification.

// To reliably track layout-dependent characters, event.key may be a better way.

// On the other hand, event.code has the benefit of staying always the same, bound to the physical key location. So hotkeys that rely on it work well even in case of a language switch.

// Do we want to handle layout-dependant keys? Then event.key is the way to go.

// Or we want a hotkey to work even after a language switch? Then event.code may be better.

// Auto-repeat
// If a key is being pressed for a long enough time, it starts to “auto-repeat”: the keydown triggers again and again, and then when it’s released we finally get keyup. So it’s kind of normal to have many keydown and a single keyup.

// For events triggered by auto-repeat, the event object has event.repeat property set to true.

// Default actions
// Default actions vary, as there are many possible things that may be initiated by the keyboard.

// For instance:

// A character appears on the screen (the most obvious outcome).
// A character is deleted (Delete key).
// The page is scrolled (PageDown key).
// The browser opens the “Save Page” dialog (Ctrl+S)
// …and so on.
// Preventing the default action on keydown can cancel most of them, with the exception of OS-based special keys. For instance, on Windows Alt+F4 closes the current browser window. And there’s no way to stop it by preventing the default action in JavaScript.

// For instance, the <input> below expects a phone number, so it does not accept keys except digits, +, () or -:

// <script>
// function checkPhoneKey(key) {
//   return (key >= '0' && key <= '9') || ['+','(',')','-'].includes(key);
// }
// </script>
// <input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">

// The onkeydown handler here uses checkPhoneKey to check for the key pressed. If it’s valid (from 0..9 or one of +-()), then it returns true, otherwise false.

// As we know, the false value returned from the event handler, assigned using a DOM property or an attribute, such as above, prevents the default action, so nothing appears in the <input> for keys that don’t pass the test. (The true value returned doesn’t affect anything, only returning false matters)

// Please note that special keys, such as Backspace, Left, Right, do not work in the input. That’s a side effect of the strict filter checkPhoneKey. These keys make it return false.

// Let’s relax the filter a little bit by allowing arrow keys Left, Right and Delete, Backspace:

// <script>
// function checkPhoneKey(key) {
//   return (key >= '0' && key <= '9') ||
//     ['+','(',')','-','ArrowLeft','ArrowRight','Delete','Backspace'].includes(key);
// }
// </script>
// <input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">

// Now arrows and deletion works well.

// Even though we have the key filter, one still can enter anything using a mouse and right-click + Paste. Mobile devices provide other means to enter values. So the filter is not 100% reliable.

// The alternative approach would be to track the oninput event – it triggers after any modification. There we can check the new input.value and modify it/highlight the <input> when it’s invalid. Or we can use both event handlers together.

// Legacy
// In the past, there was a keypress event, and also keyCode, charCode, which properties of the event object.

// There were so many browser incompatibilities while working with them, that developers of the specification had no way, other than deprecating all of them and creating new, modern events (described above in this chapter). The old code still works, as browsers keep supporting them, but there’s totally no need to use those any more.

// Mobile Keyboards
// When using virtual/mobile keyboards, formally known as IME (Input-Method Editor), the W3C standard states that a KeyboardEvent’s e.keyCode should be 229 and e.key should be "Unidentified".

// While some of these keyboards might still use the right values for e.key, e.code, e.keyCode… when pressing certain keys such as arrows or backspace, there’s no guarantee, so your keyboard logic might not always work on mobile devices.

// Summary
// Pressing a key always generates a keyboard event, be it symbol keys or special keys like Shift or Ctrl and so on. The only exception is Fn key that sometimes presents on a laptop keyboard. There’s no keyboard event for it, because it’s often implemented on lower level than OS.

// Keyboard events:

// keydown – on pressing the key (auto-repeats if the key is pressed for long),
// keyup – on releasing the key.
// Main keyboard event properties:

// code – the “key code” ("KeyA", "ArrowLeft" and so on), specific to the physical location of the key on keyboard.
// key – the character ("A", "a" and so on), for non-character keys, such as Esc, usually has the same value as code.
// In the past, keyboard events were sometimes used to track user input in form fields. That’s not reliable, because the input can come from various sources. We have input and change events to handle any input (covered later in the chapter Events: change, input, cut, copy, paste). They trigger after any kind of input, including copy-pasting or speech recognition.

// We should use keyboard events when we really want keyboard. For example, to react on hotkeys or special keys.
// ///////////////////////////////////////////////////////////////////

// // Scrolling
// Scrolling
// The scroll event allows reacting to a page or element scrolling. There are quite a few good things we can do here.

// For instance:

// Show/hide additional controls or information depending on where in the document the user is.
// Load more data when the user scrolls down till the end of the page.
// Here’s a small function to show the current scroll:

// window.addEventListener('scroll', function() {
//   document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
// });
// In action:

// Current scroll = 0px

// The scroll event works both on the window and on scrollable elements.

// Prevent scrolling
// How do we make something unscrollable?

// We can’t prevent scrolling by using event.preventDefault() in onscroll listener, because it triggers after the scroll has already happened.

// But we can prevent scrolling by event.preventDefault() on an event that causes the scroll, for instance keydown event for pageUp and pageDown.

// If we add an event handler to these events and event.preventDefault() in it, then the scroll won’t start.

// There are many ways to initiate a scroll, so it’s more reliable to use CSS, overflow property.

// Here are few tasks that you can solve or look through to see applications of onscroll.
// ///////////////////////////////////////////////////////////////////
