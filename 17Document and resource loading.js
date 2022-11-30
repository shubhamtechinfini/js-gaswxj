// // Page: DOMContentLoaded, load, beforeunload, unload
// Page: DOMContentLoaded, load, beforeunload, unload
// The lifecycle of an HTML page has three important events:

// DOMContentLoaded – the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures <img> and stylesheets may not yet have loaded.
// load – not only HTML is loaded, but also all the external resources: images, styles etc.
// beforeunload/unload – the user is leaving the page.
// Each event may be useful:

// DOMContentLoaded event – DOM is ready, so the handler can lookup DOM nodes, initialize the interface.
// load event – external resources are loaded, so styles are applied, image sizes are known etc.
// beforeunload event – the user is leaving: we can check if the user saved the changes and ask them whether they really want to leave.
// unload – the user almost left, but we still can initiate some operations, such as sending out statistics.
// Let’s explore the details of these events.

// DOMContentLoaded
// The DOMContentLoaded event happens on the document object.

// We must use addEventListener to catch it:

// document.addEventListener("DOMContentLoaded", ready);
// // not "document.onDOMContentLoaded = ..."
// For instance:

// <script>
//   function ready() {
//     console.log('DOM is ready');

//     // image is not yet loaded (unless it was cached), so the size is 0x0
//     console.log(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
//   }

//   document.addEventListener("DOMContentLoaded", ready);
// </script>

// <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
// In the example, the DOMContentLoaded handler runs when the document is loaded, so it can see all the elements, including <img> below.

// But it doesn’t wait for the image to load. So console.log shows zero sizes.

// At first sight, the DOMContentLoaded event is very simple. The DOM tree is ready – here’s the event. There are few peculiarities though.

// DOMContentLoaded and scripts
// When the browser processes an HTML-document and comes across a <script> tag, it needs to execute before continuing building the DOM. That’s a precaution, as scripts may want to modify DOM, and even document.write into it, so DOMContentLoaded has to wait.

// So DOMContentLoaded definitely happens after such scripts:

// <script>
//   document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM ready!");
//   });
// </script>

// <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

// <script>
//   console.log("Library loaded, inline script executed");
// </script>
// In the example above, we first see “Library loaded…”, and then “DOM ready!” (all scripts are executed).

// Scripts that don’t block DOMContentLoaded
// There are two exceptions from this rule:

// Scripts with the async attribute, that we’ll cover a bit later, don’t block DOMContentLoaded.
// Scripts that are generated dynamically with document.createElement('script') and then added to the webpage also don’t block this event.
// DOMContentLoaded and styles
// External style sheets don’t affect DOM, so DOMContentLoaded does not wait for them.

// But there’s a pitfall. If we have a script after the style, then that script must wait until the stylesheet loads:

// <link type="text/css" rel="stylesheet" href="style.css">
// <script>
//   // the script doesn't execute until the stylesheet is loaded
//   console.log(getComputedStyle(document.body).marginTop);
// </script>
// The reason for this is that the script may want to get coordinates and other style-dependent properties of elements, like in the example above. Naturally, it has to wait for styles to load.

// As DOMContentLoaded waits for scripts, it now waits for styles before them as well.

// Built-in browser autofill
// Firefox, Chrome and Opera autofill forms on DOMContentLoaded.

// For instance, if the page has a form with login and password, and the browser remembered the values, then on DOMContentLoaded it may try to autofill them (if approved by the user).

// So if DOMContentLoaded is postponed by long-loading scripts, then autofill also awaits. You probably saw that on some sites (if you use browser autofill) – the login/password fields don’t get autofilled immediately, but there’s a delay till the page fully loads. That’s actually the delay until the DOMContentLoaded event.

// window.onload
// The load event on the window object triggers when the whole page is loaded including styles, images and other resources. This event is available via the onload property.

// The example below correctly shows image sizes, because window.onload waits for all images:

// <script>
//   window.onload = function() { // can also use window.addEventListener('load', (event) => {
//     console.log('Page loaded');

//     // image is loaded at this time
//     console.log(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
//   };
// </script>

// <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
// window.onunload
// When a visitor leaves the page, the unload event triggers on window. We can do something there that doesn’t involve a delay, like closing related popup windows.

// The notable exception is sending analytics.

// Let’s say we gather data about how the page is used: mouse clicks, scrolls, viewed page areas, and so on.

// Naturally, unload event is when the user leaves us, and we’d like to save the data on our server.

// There exists a special navigator.sendBeacon(url, data) method for such needs, described in the specification https://w3c.github.io/beacon/.

// It sends the data in background. The transition to another page is not delayed: the browser leaves the page, but still performs sendBeacon.

// Here’s how to use it:

// let analyticsData = { /* object with gathered data */ };

// window.addEventListener("unload", function() {
//   navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
// });
// The request is sent as POST.
// We can send not only a string, but also forms and other formats, as described in the chapter Fetch, but usually it’s a stringified object.
// The data is limited by 64kb.
// When the sendBeacon request is finished, the browser probably has already left the document, so there’s no way to get server response (which is usually empty for analytics).

// There’s also a keepalive flag for doing such “after-page-left” requests in fetch method for generic network requests. You can find more information in the chapter Fetch API.

// If we want to cancel the transition to another page, we can’t do it here. But we can use another event – onbeforeunload.

// window.onbeforeunload
// If a visitor initiated navigation away from the page or tries to close the window, the beforeunload handler asks for additional confirmation.

// If we cancel the event, the browser may ask the visitor if they are sure.

// You can try it by running this code and then reloading the page:

// window.onbeforeunload = function() {
//   return false;
// };
// For historical reasons, returning a non-empty string also counts as canceling the event. Some time ago browsers used to show it as a message, but as the modern specification says, they shouldn’t.

// Here’s an example:

// window.onbeforeunload = function() {
//   return "There are unsaved changes. Leave now?";
// };
// The behavior was changed, because some webmasters abused this event handler by showing misleading and annoying messages. So right now old browsers still may show it as a message, but aside of that – there’s no way to customize the message shown to the user.

// The event.preventDefault() doesn’t work from a beforeunload handler
// That may sound weird, but most browsers ignore event.preventDefault().

// Which means, following code may not work:

// window.addEventListener("beforeunload", (event) => {
//   // doesn't work, so this event handler doesn't do anything
//   event.preventDefault();
// });
// Instead, in such handlers one should set event.returnValue to a string to get the result similar to the code above:

// window.addEventListener("beforeunload", (event) => {
//   // works, same as returning from window.onbeforeunload
//   event.returnValue = "There are unsaved changes. Leave now?";
// });
// readyState
// What happens if we set the DOMContentLoaded handler after the document is loaded?

// Naturally, it never runs.

// There are cases when we are not sure whether the document is ready or not. We’d like our function to execute when the DOM is loaded, be it now or later.

// The document.readyState property tells us about the current loading state.

// There are 3 possible values:

// "loading" – the document is loading.
// "interactive" – the document was fully read.
// "complete" – the document was fully read and all resources (like images) are loaded too.
// So we can check document.readyState and setup a handler or execute the code immediately if it’s ready.

// Like this:

// function work() { /*...*/ }

// if (document.readyState == 'loading') {
//   // still loading, wait for the event
//   document.addEventListener('DOMContentLoaded', work);
// } else {
//   // DOM is ready!
//   work();
// }
// There’s also the readystatechange event that triggers when the state changes, so we can print all these states like this:

// // current state
// console.log(document.readyState);

// // print state changes
// document.addEventListener('readystatechange', () => console.log(document.readyState));
// The readystatechange event is an alternative mechanics of tracking the document loading state, it appeared long ago. Nowadays, it is rarely used.

// Let’s see the full events flow for the completeness.

// Here’s a document with <iframe>, <img> and handlers that log events:

// <script>
//   log('initial readyState:' + document.readyState);

//   document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
//   document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

//   window.onload = () => log('window onload');
// </script>

// <iframe src="iframe.html" onload="log('iframe onload')"></iframe>

// <img src="http://en.js.cx/clipart/train.gif" id="img">
// <script>
//   img.onload = () => log('img onload');
// </script>
// The working example is in the sandbox.

// The typical output:

// [1] initial readyState:loading
// [2] readyState:interactive
// [2] DOMContentLoaded
// [3] iframe onload
// [4] img onload
// [4] readyState:complete
// [4] window onload
// The numbers in square brackets denote the approximate time of when it happens. Events labeled with the same digit happen approximately at the same time (± a few ms).

// document.readyState becomes interactive right before DOMContentLoaded. These two things actually mean the same.
// document.readyState becomes complete when all resources (iframe and img) are loaded. Here we can see that it happens in about the same time as img.onload (img is the last resource) and window.onload. Switching to complete state means the same as window.onload. The difference is that window.onload always works after all other load handlers.
// Summary
// Page load events:

// The DOMContentLoaded event triggers on document when the DOM is ready. We can apply JavaScript to elements at this stage.
// Script such as <script>...</script> or <script src="..."></script> block DOMContentLoaded, the browser waits for them to execute.
// Images and other resources may also still continue loading.
// The load event on window triggers when the page and all resources are loaded. We rarely use it, because there’s usually no need to wait for so long.
// The beforeunload event on window triggers when the user wants to leave the page. If we cancel the event, browser asks whether the user really wants to leave (e.g we have unsaved changes).
// The unload event on window triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it’s rarely used. We can send out a network request with navigator.sendBeacon.
// document.readyState is the current state of the document, changes can be tracked in the readystatechange event:
// loading – the document is loading.
// interactive – the document is parsed, happens at about the same time as DOMContentLoaded, but before it.
// complete – the document and resources are loaded, happens at about the same time as window.onload, but before it.
// ///////////////////////////////////////////////////////////////////

// // Scripts: async, defer
// Scripts: async, defer
// In modern websites, scripts are often “heavier” than HTML: their download size is larger, and processing time is also longer.

// When the browser loads HTML and comes across a <script>...</script> tag, it can’t continue building the DOM. It must execute the script right now. The same happens for external scripts <script src="..."></script>: the browser must wait for the script to download, execute the downloaded script, and only then can it process the rest of the page.

// That leads to two important issues:

// Scripts can’t see DOM elements below them, so they can’t add handlers etc.
// If there’s a bulky script at the top of the page, it “blocks the page”. Users can’t see the page content till it downloads and runs:
// <p>...content before script...</p>

// <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

// <!-- This isn't visible until the script loads -->
// <p>...content after script...</p>
// There are some workarounds to that. For instance, we can put a script at the bottom of the page. Then it can see elements above it, and it doesn’t block the page content from showing:

// <body>
//   ...all content is above the script...

//   <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
// </body>
// But this solution is far from perfect. For example, the browser notices the script (and can start downloading it) only after it downloaded the full HTML document. For long HTML documents, that may be a noticeable delay.

// Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.

// Luckily, there are two <script> attributes that solve the problem for us: defer and async.

// defer
// The defer attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads “in the background”, and then runs when the DOM is fully built.

// Here’s the same example as above, but with defer:

// <p>...content before script...</p>

// <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

// <!-- visible immediately -->
// <p>...content after script...</p>
// In other words:

// Scripts with defer never block the page.
// Scripts with defer always execute when the DOM is ready (but before DOMContentLoaded event).
// The following example demonstrates the second part:

// <p>...content before scripts...</p>

// <script>
//   document.addEventListener('DOMContentLoaded', () => console.log("DOM ready after defer!"));
// </script>

// <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

// <p>...content after scripts...</p>
// The page content shows up immediately.
// DOMContentLoaded event handler waits for the deferred script. It only triggers when the script is downloaded and executed.
// Deferred scripts keep their relative order, just like regular scripts.

// Let’s say, we have two deferred scripts: the long.js and then small.js:

// <script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
// <script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
// Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The small.js probably finishes first.

// …But the defer attribute, besides telling the browser “not to block”, ensures that the relative order is kept. So even though small.js loads first, it still waits and runs after long.js executes.

// That may be important for cases when we need to load a JavaScript library and then a script that depends on it.

// The defer attribute is only for external scripts
// The defer attribute is ignored if the <script> tag has no src.

// async
// The async attribute is somewhat like defer. It also makes the script non-blocking. But it has important differences in the behavior.

// The async attribute means that a script is completely independent:

// The browser doesn’t block on async scripts (like defer).
// Other scripts don’t wait for async scripts, and async scripts don’t wait for them.
// DOMContentLoaded and async scripts don’t wait for each other:
// DOMContentLoaded may happen both before an async script (if an async script finishes loading after the page is complete)
// …or after an async script (if an async script is short or was in HTTP-cache)
// In other words, async scripts load in the background and run when ready. The DOM and other scripts don’t wait for them, and they don’t wait for anything. A fully independent script that runs when loaded. As simple, as it can get, right?

// Here’s an example similar to what we’ve seen with defer: two scripts long.js and small.js, but now with async instead of defer.

// They don’t wait for each other. Whatever loads first (probably small.js) – runs first:

// <p>...content before scripts...</p>

// <script>
//   document.addEventListener('DOMContentLoaded', () => console.log("DOM ready!"));
// </script>

// <script async src="https://javascript.info/article/script-async-defer/long.js"></script>
// <script async src="https://javascript.info/article/script-async-defer/small.js"></script>

// <p>...content after scripts...</p>
// The page content shows up immediately: async doesn’t block it.
// DOMContentLoaded may happen both before and after async, no guarantees here.
// A smaller script small.js goes second, but probably loads before long.js, so small.js runs first. Although, it might be that long.js loads first, if cached, then it runs first. In other words, async scripts run in the “load-first” order.
// Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don’t depend on our scripts, and our scripts shouldn’t wait for them:

// <!-- Google Analytics is usually added like this -->
// <script async src="https://google-analytics.com/analytics.js"></script>
// The async attribute is only for external scripts
// Just like defer, the async attribute is ignored if the <script> tag has no src.

// Dynamic scripts
// There’s one more important way of adding a script to the page.

// We can create a script and append it to the document dynamically using JavaScript:

// let script = document.createElement('script');
// script.src = "/article/script-async-defer/long.js";
// document.body.append(script); // (*)
// The script starts loading as soon as it’s appended to the document (*).

// Dynamic scripts behave as “async” by default.

// That is:

// They don’t wait for anything, nothing waits for them.
// The script that loads first – runs first (“load-first” order).
// This can be changed if we explicitly set script.async=false. Then scripts will be executed in the document order, just like defer.

// In this example, loadScript(src) function adds a script and also sets async to false.

// So long.js always runs first (as it’s added first):

// function loadScript(src) {
//   let script = document.createElement('script');
//   script.src = src;
//   script.async = false;
//   document.body.append(script);
// }

// // long.js runs first because of async=false
// loadScript("/article/script-async-defer/long.js");
// loadScript("/article/script-async-defer/small.js");
// Without script.async=false, scripts would execute in default, load-first order (the small.js probably first).

// Again, as with the defer, the order matters if we’d like to load a library and then another script that depends on it.

// Summary
// Both async and defer have one common thing: downloading of such scripts doesn’t block page rendering. So the user can read page content and get acquainted with the page immediately.

// But there are also essential differences between them:

// Order	DOMContentLoaded
// async	Load-first order. Their document order doesn’t matter – which loads first runs first	Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough.
// defer	Document order (as they go in the document).	Execute after the document is loaded and parsed (they wait if needed), right before DOMContentLoaded.
// In practice, defer is used for scripts that need the whole DOM and/or their relative execution order is important.

// And async is used for independent scripts, like counters or ads. And their relative execution order does not matter.

// Page without scripts should be usable
// Please note: if you’re using defer or async, then user will see the page before the script loads.

// In such case, some graphical components are probably not initialized yet.

// Don’t forget to put “loading” indication and disable buttons that aren’t functional yet. Let the user clearly see what he can do on the page, and what’s still getting ready.
// ///////////////////////////////////////////////////////////////////

// // Resource loading: onload and onerror
// Resource loading: onload and onerror
// The browser allows us to track the loading of external resources – scripts, iframes, pictures and so on.

// There are two events for it:

// onload – successful load,
// onerror – an error occurred.
// Loading a script
// Let’s say we need to load a third-party script and call a function that resides there.

// We can load it dynamically, like this:

// let script = document.createElement('script');
// script.src = "my.js";

// document.head.append(script);
// …But how to run the function that is declared inside that script? We need to wait until the script loads, and only then we can call it.

// Please note:
// For our own scripts we could use JavaScript modules here, but they are not widely adopted by third-party libraries.

// script.onload
// The main helper is the load event. It triggers after the script was loaded and executed.

// For instance:

// let script = document.createElement('script');

// // can load any script, from any domain
// script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
// document.head.append(script);

// script.onload = function() {
//   // the script creates a variable "_"
//   console.log( _.VERSION ); // shows library version
// };
// So in onload we can use script variables, run functions etc.

// …And what if the loading failed? For instance, there’s no such script (error 404) or the server is down (unavailable).

// script.onerror
// Errors that occur during the loading of the script can be tracked in an error event.

// For instance, let’s request a script that doesn’t exist:

// let script = document.createElement('script');
// script.src = "https://example.com/404.js"; // no such script
// document.head.append(script);

// script.onerror = function() {
//   console.log("Error loading " + this.src); // Error loading https://example.com/404.js
// };
// Please note that we can’t get HTTP error details here. We don’t know if it was an error 404 or 500 or something else. Just that the loading failed.

// Important:
// Events onload/onerror track only the loading itself.

// Errors that may occur during script processing and execution are out of scope for these events. That is: if a script loaded successfully, then onload triggers, even if it has programming errors in it. To track script errors, one can use window.onerror global handler.

// Other resources
// The load and error events also work for other resources, basically for any resource that has an external src.

// For example:

// let img = document.createElement('img');
// img.src = "https://js.cx/clipart/train.gif"; // (*)

// img.onload = function() {
//   console.log(`Image loaded, size ${img.width}x${img.height}`);
// };

// img.onerror = function() {
//   console.log("Error occurred while loading image");
// };
// There are some notes though:

// Most resources start loading when they are added to the document. But <img> is an exception. It starts loading when it gets a src (*).
// For <iframe>, the iframe.onload event triggers when the iframe loading finished, both for successful load and in case of an error.
// That’s for historical reasons.

// Crossorigin policy
// There’s a rule: scripts from one site can’t access contents of the other site. So, e.g. a script at https://facebook.com can’t read the user’s mailbox at https://gmail.com.

// Or, to be more precise, one origin (domain/port/protocol triplet) can’t access the content from another one. So even if we have a subdomain, or just another port, these are different origins with no access to each other.

// This rule also affects resources from other domains.

// If we’re using a script from another domain, and there’s an error in it, we can’t get error details.

// For example, let’s take a script error.js that consists of a single (bad) function call:

// // 📁 error.js
// noSuchFunction();
// Now load it from the same site where it’s located:

// <script>
// window.onerror = function(message, url, line, col, errorObj) {
//   console.log(`${message}\n${url}, ${line}:${col}`);
// };
// </script>
// <script src="/article/onload-onerror/crossorigin/error.js"></script>
// We can see a good error report, like this:

// Uncaught ReferenceError: noSuchFunction is not defined
// https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
// Now let’s load the same script from another domain:

// <script>
// window.onerror = function(message, url, line, col, errorObj) {
//   console.log(`${message}\n${url}, ${line}:${col}`);
// };
// </script>
// <script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
// The report is different, like this:

// Script error.
// , 0:0
// Details may vary depending on the browser, but the idea is the same: any information about the internals of a script, including error stack traces, is hidden. Exactly because it’s from another domain.

// Why do we need error details?

// There are many services (and we can build our own) that listen for global errors using window.onerror, save errors and provide an interface to access and analyze them. That’s great, as we can see real errors, triggered by our users. But if a script comes from another origin, then there’s not much information about errors in it, as we’ve just seen.

// Similar cross-origin policy (CORS) is enforced for other types of resources as well.

// To allow cross-origin access, the <script> tag needs to have the crossorigin attribute, plus the remote server must provide special headers.

// There are three levels of cross-origin access:

// No crossorigin attribute – access prohibited.
// crossorigin="anonymous" – access allowed if the server responds with the header Access-Control-Allow-Origin with * or our origin. Browser does not send authorization information and cookies to remote server.
// crossorigin="use-credentials" – access allowed if the server sends back the header Access-Control-Allow-Origin with our origin and Access-Control-Allow-Credentials: true. Browser sends authorization information and cookies to remote server.
// Please note:
// You can read more about cross-origin access in the chapter Fetch: Cross-Origin Requests. It describes the fetch method for network requests, but the policy is exactly the same.

// Such thing as “cookies” is out of our current scope, but you can read about them in the chapter Cookies, document.cookie.

// In our case, we didn’t have any crossorigin attribute. So the cross-origin access was prohibited. Let’s add it.

// We can choose between "anonymous" (no cookies sent, one server-side header needed) and "use-credentials" (sends cookies too, two server-side headers needed).

// If we don’t care about cookies, then "anonymous" is the way to go:

// <script>
// window.onerror = function(message, url, line, col, errorObj) {
//   console.log(`${message}\n${url}, ${line}:${col}`);
// };
// </script>
// <script crossorigin="anonymous" src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
// Now, assuming that the server provides an Access-Control-Allow-Origin header, everything’s fine. We have the full error report.

// Summary
// Images <img>, external styles, scripts and other resources provide load and error events to track their loading:

// load triggers on a successful load,
// error triggers on a failed load.
// The only exception is <iframe>: for historical reasons it always triggers load, for any load completion, even if the page is not found.

// The readystatechange event also works for resources, but is rarely used, because load/error events are simpler.
// ///////////////////////////////////////////////////////////////////
