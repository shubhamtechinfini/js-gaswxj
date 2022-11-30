// // Popups and window methods
// Popups and window methods
// A popup window is one of the oldest methods to show additional document to user.

// Basically, you just run:

// window.open('https://javascript.info/')
// …And it will open a new window with given URL. Most modern browsers are configured to open url in new tabs instead of separate windows.

// Popups exist from really ancient times. The initial idea was to show another content without closing the main window. As of now, there are other ways to do that: we can load content dynamically with fetch and show it in a dynamically generated <div>. So, popups is not something we use everyday.

// Also, popups are tricky on mobile devices, that don’t show multiple windows simultaneously.

// Still, there are tasks where popups are still used, e.g. for OAuth authorization (login with Google/Facebook/…), because:

// A popup is a separate window which has its own independent JavaScript environment. So opening a popup from a third-party, non-trusted site is safe.
// It’s very easy to open a popup.
// A popup can navigate (change URL) and send messages to the opener window.
// Popup blocking
// In the past, evil sites abused popups a lot. A bad page could open tons of popup windows with ads. So now most browsers try to block popups and protect the user.

// Most browsers block popups if they are called outside of user-triggered event handlers like onclick.

// For example:

// // popup blocked
// window.open('https://javascript.info');

// // popup allowed
// button.onclick = () => {
//   window.open('https://javascript.info');
// };
// This way users are somewhat protected from unwanted popups, but the functionality is not disabled totally.

// What if the popup opens from onclick, but after setTimeout? That’s a bit tricky.

// Try this code:

// // open after 3 seconds
// setTimeout(() => window.open('http://google.com'), 3000);
// The popup opens in Chrome, but gets blocked in Firefox.

// …If we decrease the delay, the popup works in Firefox too:

// // open after 1 seconds
// setTimeout(() => window.open('http://google.com'), 1000);
// The difference is that Firefox treats a timeout of 2000ms or less are acceptable, but after it – removes the “trust”, assuming that now it’s “outside of the user action”. So the first one is blocked, and the second one is not.

// window.open
// The syntax to open a popup is: window.open(url, name, params):

// url
// An URL to load into the new window.
// name
// A name of the new window. Each window has a window.name, and here we can specify which window to use for the popup. If there’s already a window with such name – the given URL opens in it, otherwise a new window is opened.
// params
// The configuration string for the new window. It contains settings, delimited by a comma. There must be no spaces in params, for instance: width=200,height=100.
// Settings for params:

// Position:
// left/top (numeric) – coordinates of the window top-left corner on the screen. There is a limitation: a new window cannot be positioned offscreen.
// width/height (numeric) – width and height of a new window. There is a limit on minimal width/height, so it’s impossible to create an invisible window.
// Window features:
// menubar (yes/no) – shows or hides the browser menu on the new window.
// toolbar (yes/no) – shows or hides the browser navigation bar (back, forward, reload etc) on the new window.
// location (yes/no) – shows or hides the URL field in the new window. FF and IE don’t allow to hide it by default.
// status (yes/no) – shows or hides the status bar. Again, most browsers force it to show.
// resizable (yes/no) – allows to disable the resize for the new window. Not recommended.
// scrollbars (yes/no) – allows to disable the scrollbars for the new window. Not recommended.
// There is also a number of less supported browser-specific features, which are usually not used. Check window.open in MDN for examples.

// Example: a minimalistic window
// Let’s open a window with minimal set of features, just to see which of them browser allows to disable:

// let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
// width=0,height=0,left=-1000,top=-1000`;

// open('/', 'test', params);
// Here most “window features” are disabled and window is positioned offscreen. Run it and see what really happens. Most browsers “fix” odd things like zero width/height and offscreen left/top. For instance, Chrome open such a window with full width/height, so that it occupies the full screen.

// Let’s add normal positioning options and reasonable width, height, left, top coordinates:

// let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
// width=600,height=300,left=100,top=100`;

// open('/', 'test', params);
// Most browsers show the example above as required.

// Rules for omitted settings:

// If there is no 3rd argument in the open call, or it is empty, then the default window parameters are used.
// If there is a string of params, but some yes/no features are omitted, then the omitted features assumed to have no value. So if you specify params, make sure you explicitly set all required features to yes.
// If there is no left/top in params, then the browser tries to open a new window near the last opened window.
// If there is no width/height, then the new window will be the same size as the last opened.
// Accessing popup from window
// The open call returns a reference to the new window. It can be used to manipulate its properties, change location and even more.

// In this example, we generate popup content from JavaScript:

// let newWin = window.open("about:blank", "hello", "width=200,height=200");

// newWin.document.write("Hello, world!");
// And here we modify the contents after loading:

// let newWindow = open('/', 'example', 'width=300,height=300')
// newWindow.focus();

// console.log(newWindow.location.href); // (*) about:blank, loading hasn't started yet

// newWindow.onload = function() {
//   let html = `<div style="font-size:30px">Welcome!</div>`;
//   newWindow.document.body.insertAdjacentHTML('afterbegin', html);
// };
// Please note: immediately after window.open, the new window isn’t loaded yet. That’s demonstrated by console.log in line (*). So we wait for onload to modify it. We could also use DOMContentLoaded handler for newWin.document.

// Same origin policy
// Windows may freely access content of each other only if they come from the same origin (the same protocol://domain:port).

// Otherwise, e.g. if the main window is from site.com, and the popup from gmail.com, that’s impossible for user safety reasons. For the details, see chapter Cross-window communication.

// Accessing window from popup
// A popup may access the “opener” window as well using window.opener reference. It is null for all windows except popups.

// If you run the code below, it replaces the opener (current) window content with “Test”:

// let newWin = window.open("about:blank", "hello", "width=200,height=200");

// newWin.document.write(
//   "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
// );
// So the connection between the windows is bidirectional: the main window and the popup have a reference to each other.

// Closing a popup
// To close a window: win.close().

// To check if a window is closed: win.closed.

// Technically, the close() method is available for any window, but window.close() is ignored by most browsers if window is not created with window.open(). So it’ll only work on a popup.

// The closed property is true if the window is closed. That’s useful to check if the popup (or the main window) is still open or not. A user can close it anytime, and our code should take that possibility into account.

// This code loads and then closes the window:

// let newWindow = open('/', 'example', 'width=300,height=300');

// newWindow.onload = function() {
//   newWindow.close();
//   console.log(newWindow.closed); // true
// };
// Moving and resizing
// There are methods to move/resize a window:

// win.moveBy(x,y)
// Move the window relative to current position x pixels to the right and y pixels down. Negative values are allowed (to move left/up).
// win.moveTo(x,y)
// Move the window to coordinates (x,y) on the screen.
// win.resizeBy(width,height)
// Resize the window by given width/height relative to the current size. Negative values are allowed.
// win.resizeTo(width,height)
// Resize the window to the given size.
// There’s also window.onresize event.

// Only popups
// To prevent abuse, the browser usually blocks these methods. They only work reliably on popups that we opened, that have no additional tabs.

// No minification/maximization
// JavaScript has no way to minify or maximize a window. These OS-level functions are hidden from Frontend-developers.

// Move/resize methods do not work for maximized/minimized windows.

// Scrolling a window
// We already talked about scrolling a window in the chapter Window sizes and scrolling.

// win.scrollBy(x,y)
// Scroll the window x pixels right and y down relative the current scroll. Negative values are allowed.
// win.scrollTo(x,y)
// Scroll the window to the given coordinates (x,y).
// elem.scrollIntoView(top = true)
// Scroll the window to make elem show up at the top (the default) or at the bottom for elem.scrollIntoView(false).
// There’s also window.onscroll event.

// Focus/blur on a window
// Theoretically, there are window.focus() and window.blur() methods to focus/unfocus on a window. And there are also focus/blur events that allow to catch the moment when the visitor focuses on a window and switches elsewhere.

// Although, in practice they are severely limited, because in the past evil pages abused them.

// For instance, look at this code:

// window.onblur = () => window.focus();
// When a user attempts to switch out of the window (window.onblur), it brings the window back into focus. The intention is to “lock” the user within the window.

// So browsers had to introduce many limitations to forbid the code like that and protect the user from ads and evils pages. They depend on the browser.

// For instance, a mobile browser usually ignores window.focus() completely. Also focusing doesn’t work when a popup opens in a separate tab rather than a new window.

// Still, there are some use cases when such calls do work and can be useful.

// For instance:

// When we open a popup, it might be a good idea to run newWindow.focus() on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
// If we want to track when a visitor actually uses our web-app, we can track window.onfocus/onblur. That allows us to suspend/resume in-page activities, animations etc. But please note that the blur event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.
// Summary
// Popup windows are used rarely, as there are alternatives: loading and displaying information in-page, or in iframe.

// If we’re going to open a popup, a good practice is to inform the user about it. An “opening window” icon near a link or button would allow the visitor to survive the focus shift and keep both windows in mind.

// A popup can be opened by the open(url, name, params) call. It returns the reference to the newly opened window.
// Browsers block open calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
// Browsers open a new tab by default, but if sizes are provided, then it’ll be a popup window.
// The popup may access the opener window using the window.opener property.
// The main window and the popup can freely read and modify each other if they have the same origin. Otherwise, they can change location of each other and exchange messages.
// To close the popup: use close() call. Also the user may close them (just like any other windows). The window.closed is true after that.

// Methods focus() and blur() allow to focus/unfocus a window. But they don’t work all the time.
// Events focus and blur allow to track switching in and out of the window. But please note that a window may still be visible even in the background state, after blur.
// ///////////////////////////////////////////////////////////////////

// // Cross-window communication
// Cross-window communication
// The “Same Origin” (same site) policy limits access of windows and frames to each other.

// The idea is that if a user has two pages open: one from john-smith.com, and another one is gmail.com, then they wouldn’t want a script from john-smith.com to read our mail from gmail.com. So, the purpose of the “Same Origin” policy is to protect users from information theft.

// Same Origin
// Two URLs are said to have the “same origin” if they have the same protocol, domain and port.

// These URLs all share the same origin:

// http://site.com
// http://site.com/
// http://site.com/my/page.html
// These ones do not:

// http://www.site.com (another domain: www. matters)
// http://site.org (another domain: .org matters)
// https://site.com (another protocol: https)
// http://site.com:8080 (another port: 8080)
// The “Same Origin” policy states that:

// if we have a reference to another window, e.g. a popup created by window.open or a window inside <iframe>, and that window comes from the same origin, then we have full access to that window.
// otherwise, if it comes from another origin, then we can’t access the content of that window: variables, document, anything. The only exception is location: we can change it (thus redirecting the user). But we cannot read location (so we can’t see where the user is now, no information leak).
// In action: iframe
// An <iframe> tag hosts a separate embedded window, with its own separate document and window objects.

// We can access them using properties:

// iframe.contentWindow to get the window inside the <iframe>.
// iframe.contentDocument to get the document inside the <iframe>, shorthand for iframe.contentWindow.document.
// When we access something inside the embedded window, the browser checks if the iframe has the same origin. If that’s not so then the access is denied (writing to location is an exception, it’s still permitted).

// For instance, let’s try reading and writing to <iframe> from another origin:

// <iframe src="https://example.com" id="iframe"></iframe>

// <script>
//   iframe.onload = function() {
//     // we can get the reference to the inner window
//     let iframeWindow = iframe.contentWindow; // OK
//     try {
//       // ...but not to the document inside it
//       let doc = iframe.contentDocument; // ERROR
//     } catch(e) {
//       console.log(e); // Security Error (another origin)
//     }

//     // also we can't READ the URL of the page in iframe
//     try {
//       // Can't read URL from the Location object
//       let href = iframe.contentWindow.location.href; // ERROR
//     } catch(e) {
//       console.log(e); // Security Error
//     }

//     // ...we can WRITE into location (and thus load something else into the iframe)!
//     iframe.contentWindow.location = '/'; // OK

//     iframe.onload = null; // clear the handler, not to run it after the location change
//   };
// </script>
// The code above shows errors for any operations except:

// Getting the reference to the inner window iframe.contentWindow – that’s allowed.
// Writing to location.
// Contrary to that, if the <iframe> has the same origin, we can do anything with it:

// <!-- iframe from the same site -->
// <iframe src="/" id="iframe"></iframe>

// <script>
//   iframe.onload = function() {
//     // just do anything
//     iframe.contentDocument.body.prepend("Hello, world!");
//   };
// </script>
// iframe.onload vs iframe.contentWindow.onload
// The iframe.onload event (on the <iframe> tag) is essentially the same as iframe.contentWindow.onload (on the embedded window object). It triggers when the embedded window fully loads with all resources.

// …But we can’t access iframe.contentWindow.onload for an iframe from another origin, so using iframe.onload.

// Windows on subdomains: document.domain
// By definition, two URLs with different domains have different origins.

// But if windows share the same second-level domain, for instance john.site.com, peter.site.com and site.com (so that their common second-level domain is site.com), we can make the browser ignore that difference, so that they can be treated as coming from the “same origin” for the purposes of cross-window communication.

// To make it work, each such window should run the code:

// document.domain = 'site.com';
// That’s all. Now they can interact without limitations. Again, that’s only possible for pages with the same second-level domain.

// Deprecated, but still working
// The document.domain property is in the process of being removed from the specification. The cross-window messaging (explained soon below) is the suggested replacement.

// That said, as of now all browsers support it. And the support will be kept for the future, not to break old code that relies on document.domain.

// Iframe: wrong document pitfall
// When an iframe comes from the same origin, and we may access its document, there’s a pitfall. It’s not related to cross-origin things, but important to know.

// Upon its creation an iframe immediately has a document. But that document is different from the one that loads into it!

// So if we do something with the document immediately, that will probably be lost.

// Here, look:

// <iframe src="/" id="iframe"></iframe>

// <script>
//   let oldDoc = iframe.contentDocument;
//   iframe.onload = function() {
//     let newDoc = iframe.contentDocument;
//     // the loaded document is not the same as initial!
//     console.log(oldDoc == newDoc); // false
//   };
// </script>
// We shouldn’t work with the document of a not-yet-loaded iframe, because that’s the wrong document. If we set any event handlers on it, they will be ignored.

// How to detect the moment when the document is there?

// The right document is definitely at place when iframe.onload triggers. But it only triggers when the whole iframe with all resources is loaded.

// We can try to catch the moment earlier using checks in setInterval:

// <iframe src="/" id="iframe"></iframe>

// <script>
//   let oldDoc = iframe.contentDocument;

//   // every 100 ms check if the document is the new one
//   let timer = setInterval(() => {
//     let newDoc = iframe.contentDocument;
//     if (newDoc == oldDoc) return;

//     console.log("New document is here!");

//     clearInterval(timer); // cancel setInterval, don't need it any more
//   }, 100);
// </script>
// Collection: window.frames
// An alternative way to get a window object for <iframe> – is to get it from the named collection window.frames:

// By number: window.frames[0] – the window object for the first frame in the document.
// By name: window.frames.iframeName – the window object for the frame with name="iframeName".
// For instance:

// <iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

// <script>
//   console.log(iframe.contentWindow == frames[0]); // true
//   console.log(iframe.contentWindow == frames.win); // true
// </script>
// An iframe may have other iframes inside. The corresponding window objects form a hierarchy.

// Navigation links are:

// window.frames – the collection of “children” windows (for nested frames).
// window.parent – the reference to the “parent” (outer) window.
// window.top – the reference to the topmost parent window.
// For instance:

// window.frames[0].parent === window; // true
// We can use the top property to check if the current document is open inside a frame or not:

// if (window == top) { // current window == window.top?
//   console.log('The script is in the topmost window, not in a frame');
// } else {
//   console.log('The script runs in a frame!');
// }
// The “sandbox” iframe attribute
// The sandbox attribute allows for the exclusion of certain actions inside an <iframe> in order to prevent it executing untrusted code. It “sandboxes” the iframe by treating it as coming from another origin and/or applying other limitations.

// There’s a “default set” of restrictions applied for <iframe sandbox src="...">. But it can be relaxed if we provide a space-separated list of restrictions that should not be applied as a value of the attribute, like this: <iframe sandbox="allow-forms allow-popups">.

// In other words, an empty "sandbox" attribute puts the strictest limitations possible, but we can put a space-delimited list of those that we want to lift.

// Here’s a list of limitations:

// allow-same-origin
// By default "sandbox" forces the “different origin” policy for the iframe. In other words, it makes the browser to treat the iframe as coming from another origin, even if its src points to the same site. With all implied restrictions for scripts. This option removes that feature.
// allow-top-navigation
// Allows the iframe to change parent.location.
// allow-forms
// Allows to submit forms from iframe.
// allow-scripts
// Allows to run scripts from the iframe.
// allow-popups
// Allows to window.open popups from the iframe
// See the manual for more.

// The example below demonstrates a sandboxed iframe with the default set of restrictions: <iframe sandbox src="...">. It has some JavaScript and a form.

// Please note that nothing works. So the default set is really harsh:

// Resultindex.htmlsandboxed.html

// Please note:
// The purpose of the "sandbox" attribute is only to add more restrictions. It cannot remove them. In particular, it can’t relax same-origin restrictions if the iframe comes from another origin.

// Cross-window messaging
// The postMessage interface allows windows to talk to each other no matter which origin they are from.

// So, it’s a way around the “Same Origin” policy. It allows a window from john-smith.com to talk to gmail.com and exchange information, but only if they both agree and call corresponding JavaScript functions. That makes it safe for users.

// The interface has two parts.

// postMessage
// The window that wants to send a message calls postMessage method of the receiving window. In other words, if we want to send the message to win, we should call win.postMessage(data, targetOrigin).

// Arguments:

// data
// The data to send. Can be any object, the data is cloned using the “structured serialization algorithm”. IE supports only strings, so we should JSON.stringify complex objects to support that browser.
// targetOrigin
// Specifies the origin for the target window, so that only a window from the given origin will get the message.
// The targetOrigin is a safety measure. Remember, if the target window comes from another origin, we can’t read its location in the sender window. So we can’t be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.

// Specifying targetOrigin ensures that the window only receives the data if it’s still at the right site. Important when the data is sensitive.

// For instance, here win will only receive the message if it has a document from the origin http://example.com:

// <iframe src="http://example.com" name="example">

// <script>
//   let win = window.frames.example;

//   win.postMessage("message", "http://example.com");
// </script>
// If we don’t want that check, we can set targetOrigin to *.

// <iframe src="http://example.com" name="example">

// <script>
//   let win = window.frames.example;

//   win.postMessage("message", "*");
// </script>
// onmessage
// To receive a message, the target window should have a handler on the message event. It triggers when postMessage is called (and targetOrigin check is successful).

// The event object has special properties:

// data
// The data from postMessage.
// origin
// The origin of the sender, for instance http://javascript.info.
// source
// The reference to the sender window. We can immediately source.postMessage(...) back if we want.
// To assign that handler, we should use addEventListener, a short syntax window.onmessage does not work.

// Here’s an example:

// window.addEventListener("message", function(event) {
//   if (event.origin != 'http://javascript.info') {
//     // something from an unknown domain, let's ignore it
//     return;
//   }

//   console.log( "received: " + event.data );

//   // can message back using event.source.postMessage(...)
// });
// The full example:

// Resultiframe.htmlindex.html

// Summary
// To call methods and access the content of another window, we should first have a reference to it.

// For popups we have these references:

// From the opener window: window.open – opens a new window and returns a reference to it,
// From the popup: window.opener – is a reference to the opener window from a popup.
// For iframes, we can access parent/children windows using:

// window.frames – a collection of nested window objects,
// window.parent, window.top are the references to parent and top windows,
// iframe.contentWindow is the window inside an <iframe> tag.
// If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

// Otherwise, only possible actions are:

// Change the location of another window (write-only access).
// Post a message to it.
// Exceptions are:

// Windows that share the same second-level domain: a.site.com and b.site.com. Then setting document.domain='site.com' in both of them puts them into the “same origin” state.
// If an iframe has a sandbox attribute, it is forcefully put into the “different origin” state, unless the allow-same-origin is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.
// The postMessage interface allows two windows with any origins to talk:

// The sender calls targetWin.postMessage(data, targetOrigin).

// If targetOrigin is not '*', then the browser checks if window targetWin has the origin targetOrigin.

// If it is so, then targetWin triggers the message event with special properties:

// origin – the origin of the sender window (like http://my.site.com)
// source – the reference to the sender window.
// data – the data, any object in everywhere except IE that supports only strings.
// We should use addEventListener to set the handler for this event inside the target window.
// ///////////////////////////////////////////////////////////////////

// // The clickjacking attack
// The clickjacking attack
// The “clickjacking” attack allows an evil page to click on a “victim site” on behalf of the visitor.

// Many sites were hacked this way, including Twitter, Facebook, Paypal and other sites. They have all been fixed, of course.

// The idea
// The idea is very simple.

// Here’s how clickjacking was done with Facebook:

// A visitor is lured to the evil page. It doesn’t matter how.
// The page has a harmless-looking link on it (like “get rich now” or “click here, very funny”).
// Over that link the evil page positions a transparent <iframe> with src from facebook.com, in such a way that the “Like” button is right above that link. Usually that’s done with z-index.
// In attempting to click the link, the visitor in fact clicks the button.
// The demo
// Here’s how the evil page looks. To make things clear, the <iframe> is half-transparent (in real evil pages it’s fully transparent):

// <style>
// iframe { /* iframe from the victim site */
//   width: 400px;
//   height: 100px;
//   position: absolute;
//   top:0; left:-20px;
//   opacity: 0.5; /* in real opacity:0 */
//   z-index: 1;
// }
// </style>

// <div>Click to get rich now:</div>

// <!-- The url from the victim site -->
// <iframe src="/clickjacking/facebook.html"></iframe>

// <button>Click here!</button>

// <div>...And you're cool (I'm a cool hacker actually)!</div>
// The full demo of the attack:

// Resultfacebook.htmlindex.html

// Here we have a half-transparent <iframe src="facebook.html">, and in the example we can see it hovering over the button. A click on the button actually clicks on the iframe, but that’s not visible to the user, because the iframe is transparent.

// As a result, if the visitor is authorized on Facebook (“remember me” is usually turned on), then it adds a “Like”. On Twitter that would be a “Follow” button.

// Here’s the same example, but closer to reality, with opacity:0 for <iframe>:

// Resultfacebook.htmlindex.html

// All we need to attack – is to position the <iframe> on the evil page in such a way that the button is right over the link. So that when a user clicks the link, they actually click the button. That’s usually doable with CSS.

// Clickjacking is for clicks, not for keyboard
// The attack only affects mouse actions (or similar, like taps on mobile).

// Keyboard input is much difficult to redirect. Technically, if we have a text field to hack, then we can position an iframe in such a way that text fields overlap each other. So when a visitor tries to focus on the input they see on the page, they actually focus on the input inside the iframe.

// But then there’s a problem. Everything that the visitor types will be hidden, because the iframe is not visible.

// People will usually stop typing when they can’t see their new characters printing on the screen.

// Old-school defences (weak)
// The oldest defence is a bit of JavaScript which forbids opening the page in a frame (so-called “framebusting”).

// That looks like this:

// if (top != window) {
//   top.location = window.location;
// }
// That is: if the window finds out that it’s not on top, then it automatically makes itself the top.

// This not a reliable defence, because there are many ways to hack around it. Let’s cover a few.

// Blocking top-navigation
// We can block the transition caused by changing top.location in beforeunload event handler.

// The top page (enclosing one, belonging to the hacker) sets a preventing handler to it, like this:

// window.onbeforeunload = function() {
//   return false;
// };
// When the iframe tries to change top.location, the visitor gets a message asking them whether they want to leave.

// In most cases the visitor would answer negatively because they don’t know about the iframe – all they can see is the top page, there’s no reason to leave. So top.location won’t change!

// In action:

// Resultiframe.htmlindex.html

// Sandbox attribute
// One of the things restricted by the sandbox attribute is navigation. A sandboxed iframe may not change top.location.

// So we can add the iframe with sandbox="allow-scripts allow-forms". That would relax the restrictions, permitting scripts and forms. But we omit allow-top-navigation so that changing top.location is forbidden.

// Here’s the code:

// <iframe sandbox="allow-scripts allow-forms" src="facebook.html"></iframe>
// There are other ways to work around that simple protection too.

// X-Frame-Options
// The server-side header X-Frame-Options can permit or forbid displaying the page inside a frame.

// It must be sent exactly as HTTP-header: the browser will ignore it if found in HTML <meta> tag. So, <meta http-equiv="X-Frame-Options"...> won’t do anything.

// The header may have 3 values:

// DENY
// Never ever show the page inside a frame.
// SAMEORIGIN
// Allow inside a frame if the parent document comes from the same origin.
// ALLOW-FROM domain
// Allow inside a frame if the parent document is from the given domain.
// For instance, Twitter uses X-Frame-Options: SAMEORIGIN.

// Here’s the result:

// <iframe src="https://twitter.com"></iframe>

// Depending on your browser, the iframe above is either empty or console.loging you that the browser won’t permit that page to be navigating in this way.

// Showing with disabled functionality
// The X-Frame-Options header has a side effect. Other sites won’t be able to show our page in a frame, even if they have good reasons to do so.

// So there are other solutions… For instance, we can “cover” the page with a <div> with styles height: 100%; width: 100%;, so that it will intercept all clicks. That <div> is to be removed if window == top or if we figure out that we don’t need the protection.

// Something like this:

// <style>
//   #protector {
//     height: 100%;
//     width: 100%;
//     position: absolute;
//     left: 0;
//     top: 0;
//     z-index: 99999999;
//   }
// </style>

// <div id="protector">
//   <a href="/" target="_blank">Go to the site</a>
// </div>

// <script>
//   // there will be an error if top window is from the different origin
//   // but that's ok here
//   if (top.document.domain == document.domain) {
//     protector.remove();
//   }
// </script>
// The demo:

// Resultiframe.htmlindex.html

// Samesite cookie attribute
// The samesite cookie attribute can also prevent clickjacking attacks.

// A cookie with such attribute is only sent to a website if it’s opened directly, not via a frame, or otherwise. More information in the chapter Cookies, document.cookie.

// If the site, such as Facebook, had samesite attribute on its authentication cookie, like this:

// Set-Cookie: authorization=secret; samesite
// …Then such cookie wouldn’t be sent when Facebook is open in iframe from another site. So the attack would fail.

// The samesite cookie attribute will not have an effect when cookies are not used. This may allow other websites to easily show our public, unauthenticated pages in iframes.

// However, this may also allow clickjacking attacks to work in a few limited cases. An anonymous polling website that prevents duplicate voting by checking IP addresses, for example, would still be vulnerable to clickjacking because it does not authenticate users using cookies.

// Summary
// Clickjacking is a way to “trick” users into clicking on a victim site without even knowing what’s happening. That’s dangerous if there are important click-activated actions.

// A hacker can post a link to their evil page in a message, or lure visitors to their page by some other means. There are many variations.

// From one perspective – the attack is “not deep”: all a hacker is doing is intercepting a single click. But from another perspective, if the hacker knows that after the click another control will appear, then they may use cunning messages to coerce the user into clicking on them as well.

// The attack is quite dangerous, because when we engineer the UI we usually don’t anticipate that a hacker may click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

// It is recommended to use X-Frame-Options: SAMEORIGIN on pages (or whole websites) which are not intended to be viewed inside frames.
// Use a covering <div> if we want to allow our pages to be shown in iframes, but still stay safe.
// ///////////////////////////////////////////////////////////////////
