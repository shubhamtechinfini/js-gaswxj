// // Cookies, document.cookie
// Cookies, document.cookie
// Cookies are small strings of data that are stored directly in the browser. They are a part of the HTTP protocol, defined by the RFC 6265 specification.

// Cookies are usually set by a web-server using the response Set-Cookie HTTP-header. Then, the browser automatically adds them to (almost) every request to the same domain using the Cookie HTTP-header.

// One of the most widespread use cases is authentication:

// Upon sign in, the server uses the Set-Cookie HTTP-header in the response to set a cookie with a unique “session identifier”.
// Next time when the request is sent to the same domain, the browser sends the cookie over the net using the Cookie HTTP-header.
// So the server knows who made the request.
// We can also access cookies from the browser, using document.cookie property.

// There are many tricky things about cookies and their options. In this chapter we’ll cover them in detail.

// Reading from document.cookie
// Does your browser store any cookies from this site? Let’s see:

// // At javascript.info, we use Google Analytics for statistics,
// // so there should be some cookies
// console.log( document.cookie ); // cookie1=value1; cookie2=value2;...
// The value of document.cookie consists of name=value pairs, delimited by ;. Each one is a separate cookie.

// To find a particular cookie, we can split document.cookie by ;, and then find the right name. We can use either a regular expression or array functions to do that.

// We leave it as an exercise for the reader. Also, at the end of the chapter you’ll find helper functions to manipulate cookies.

// Writing to document.cookie
// We can write to document.cookie. But it’s not a data property, it’s an accessor (getter/setter). An assignment to it is treated specially.

// A write operation to document.cookie updates only cookies mentioned in it, but doesn’t touch other cookies.

// For instance, this call sets a cookie with the name user and value John:

// document.cookie = "user=John"; // update only cookie named 'user'
// console.log(document.cookie); // show all cookies
// If you run it, then probably you’ll see multiple cookies. That’s because the document.cookie= operation does not overwrite all cookies. It only sets the mentioned cookie user.

// Technically, name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in encodeURIComponent function:

// // special characters (spaces), need encoding
// let name = "my name";
// let value = "John Smith"

// // encodes the cookie as my%20name=John%20Smith
// document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

// console.log(document.cookie); // ...; my%20name=John%20Smith
// Limitations
// There are few limitations:

// The name=value pair, after encodeURIComponent, should not exceed 4KB. So we can’t store anything huge in a cookie.
// The total number of cookies per domain is limited to around 20+, the exact limit depends on the browser.
// Cookies have several options, many of them are important and should be set.

// The options are listed after key=value, delimited by ;, like this:

// document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
// path
// path=/mypath
// The url path prefix must be absolute. It makes the cookie accessible for pages under that path. By default, it’s the current path.

// If a cookie is set with path=/admin, it’s visible at pages /admin and /admin/something, but not at /home or /adminpage.

// Usually, we should set path to the root: path=/ to make the cookie accessible from all website pages.

// domain
// domain=site.com
// A domain defines where the cookie is accessible. In practice though, there are limitations. We can’t set any domain.

// There’s no way to let a cookie be accessible from another 2nd-level domain, so other.com will never receive a cookie set at site.com.

// It’s a safety restriction, to allow us to store sensitive data in cookies that should be available only on one site.

// By default, a cookie is accessible only at the domain that set it.

// Please note, by default a cookie is also not shared to a subdomain as well, such as forum.site.com.

// // if we set a cookie at site.com website...
// document.cookie = "user=John"

// // ...we won't see it at forum.site.com
// console.log(document.cookie); // no user
// …But this can be changed. If we’d like to allow subdomains like forum.site.com to get a cookie set at site.com, that’s possible.

// For that to happen, when setting a cookie at site.com, we should explicitly set the domain option to the root domain: domain=site.com. Then all subdomains will see such cookie.

// For example:

// // at site.com
// // make the cookie accessible on any subdomain *.site.com:
// document.cookie = "user=John; domain=site.com"

// // later

// // at forum.site.com
// console.log(document.cookie); // has cookie user=John
// For historical reasons, domain=.site.com (with a dot before site.com) also works the same way, allowing access to the cookie from subdomains. That’s an old notation and should be used if we need to support very old browsers.

// To summarize, the domain option allows to make a cookie accessible at subdomains.

// expires, max-age
// By default, if a cookie doesn’t have one of these options, it disappears when the browser is closed. Such cookies are called “session cookies”

// To let cookies survive a browser close, we can set either the expires or max-age option.

// expires=Tue, 19 Jan 2038 03:14:07 GMT
// The cookie expiration date defines the time, when the browser will automatically delete it.

// The date must be exactly in this format, in the GMT timezone. We can use date.toUTCString to get it. For instance, we can set the cookie to expire in 1 day:

// // +1 day from now
// let date = new Date(Date.now() + 86400e3);
// date = date.toUTCString();
// document.cookie = "user=John; expires=" + date;
// If we set expires to a date in the past, the cookie is deleted.

// max-age=3600
// Is an alternative to expires and specifies the cookie’s expiration in seconds from the current moment.

// If set to zero or a negative value, the cookie is deleted:

// // cookie will die in +1 hour from now
// document.cookie = "user=John; max-age=3600";

// // delete cookie (let it expire right now)
// document.cookie = "user=John; max-age=0";
// secure
// secure
// The cookie should be transferred only over HTTPS.

// By default, if we set a cookie at http://site.com, then it also appears at https://site.com and vice versa.

// That is, cookies are domain-based, they do not distinguish between the protocols.

// With this option, if a cookie is set by https://site.com, then it doesn’t appear when the same site is accessed by HTTP, as http://site.com. So if a cookie has sensitive content that should never be sent over unencrypted HTTP, the secure flag is the right thing.

// // assuming we're on https:// now
// // set the cookie to be secure (only accessible over HTTPS)
// document.cookie = "user=John; secure";
// samesite
// That’s another security attribute samesite. It’s designed to protect from so-called XSRF (cross-site request forgery) attacks.

// To understand how it works and when it’s useful, let’s take a look at XSRF attacks.

// XSRF attack
// Imagine, you are logged into the site bank.com. That is: you have an authentication cookie from that site. Your browser sends it to bank.com with every request, so that it recognizes you and performs all sensitive financial operations.

// Now, while browsing the web in another window, you accidentally come to another site evil.com. That site has JavaScript code that submits a form <form action="https://bank.com/pay"> to bank.com with fields that initiate a transaction to the hacker’s account.

// The browser sends cookies every time you visit the site bank.com, even if the form was submitted from evil.com. So the bank recognizes you and actually performs the payment.

// That’s a so-called “Cross-Site Request Forgery” (in short, XSRF) attack.

// Real banks are protected from it of course. All forms generated by bank.com have a special field, a so-called “XSRF protection token”, that an evil page can’t generate or extract from a remote page. It can submit a form there, but can’t get the data back. The site bank.com checks for such token in every form it receives.

// Such a protection takes time to implement though. We need to ensure that every form has the required token field, and we must also check all requests.

// Enter cookie samesite option
// The cookie samesite option provides another way to protect from such attacks, that (in theory) should not require “xsrf protection tokens”.

// It has two possible values:

// samesite=strict (same as samesite without value)
// A cookie with samesite=strict is never sent if the user comes from outside the same site.

// In other words, whether a user follows a link from their mail or submits a form from evil.com, or does any operation that originates from another domain, the cookie is not sent.

// If authentication cookies have the samesite option, then a XSRF attack has no chances to succeed, because a submission from evil.com comes without cookies. So bank.com will not recognize the user and will not proceed with the payment.

// The protection is quite reliable. Only operations that come from bank.com will send the samesite cookie, e.g. a form submission from another page at bank.com.

// Although, there’s a small inconvenience.

// When a user follows a legitimate link to bank.com, like from their own notes, they’ll be surprised that bank.com does not recognize them. Indeed, samesite=strict cookies are not sent in that case.

// We could work around that by using two cookies: one for “general recognition”, only for the purposes of saying: “Hello, John”, and the other one for data-changing operations with samesite=strict. Then, a person coming from outside of the site will see a welcome, but payments must be initiated from the bank’s website, for the second cookie to be sent.

// samesite=lax
// A more relaxed approach that also protects from XSRF and doesn’t break the user experience.

// Lax mode, just like strict, forbids the browser to send cookies when coming from outside the site, but adds an exception.

// A samesite=lax cookie is sent if both of these conditions are true:

// The HTTP method is “safe” (e.g. GET, but not POST).

// The full list of safe HTTP methods is in the RFC7231 specification. Basically, these are the methods that should be used for reading, but not writing the data. They must not perform any data-changing operations. Following a link is always GET, the safe method.

// The operation performs a top-level navigation (changes URL in the browser address bar).

// That’s usually true, but if the navigation is performed in an <iframe>, then it’s not top-level. Also, JavaScript methods for network requests do not perform any navigation, hence they don’t fit.

// So, what samesite=lax does, is to basically allow the most common “go to URL” operation to have cookies. E.g. opening a website link from notes that satisfy these conditions.

// But anything more complicated, like a network request from another site or a form submission, loses cookies.

// If that’s fine for you, then adding samesite=lax will probably not break the user experience and add protection.

// Overall, samesite is a great option.

// There’s a drawback:

// samesite is ignored (not supported) by very old browsers, year 2017 or so.
// So if we solely rely on samesite to provide protection, then old browsers will be vulnerable.

// But we surely can use samesite together with other protection measures, like xsrf tokens, to add an additional layer of defence and then, in the future, when old browsers die out, we’ll probably be able to drop xsrf tokens.

// httpOnly
// This option has nothing to do with JavaScript, but we have to mention it for completeness.

// The web-server uses the Set-Cookie header to set a cookie. Also, it may set the httpOnly option.

// This option forbids any JavaScript access to the cookie. We can’t see such a cookie or manipulate it using document.cookie.

// That’s used as a precaution measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn’t be possible at all, hackers should not be able to inject their code into our site, but there may be bugs that let them do it.

// Normally, if such a thing happens, and a user visits a web-page with hacker’s JavaScript code, then that code executes and gains access to document.cookie with user cookies containing authentication information. That’s bad.

// But if a cookie is httpOnly, then document.cookie doesn’t see it, so it is protected.

// Appendix: Cookie functions
// Here’s a small set of functions to work with cookies, more convenient than a manual modification of document.cookie.

// There exist many cookie libraries for that, so these are for demo purposes. Fully working though.

// getCookie(name)
// The shortest way to access a cookie is to use a regular expression.

// The function getCookie(name) returns the cookie with the given name:

// // returns the cookie with the given name,
// // or undefined if not found
// function getCookie(name) {
//   let matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }
// Here new RegExp is generated dynamically, to match ; name=<value>.

// Please note that a cookie value is encoded, so getCookie uses a built-in decodeURIComponent function to decode it.

// setCookie(name, value, options)
// Sets the cookie’s name to the given value with path=/ by default (can be modified to add other defaults):

// function setCookie(name, value, options = {}) {

//   options = {
//     path: '/',
//     // add other defaults here if necessary
//     ...options
//   };

//   if (options.expires instanceof Date) {
//     options.expires = options.expires.toUTCString();
//   }

//   let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

//   for (let optionKey in options) {
//     updatedCookie += "; " + optionKey;
//     let optionValue = options[optionKey];
//     if (optionValue !== true) {
//       updatedCookie += "=" + optionValue;
//     }
//   }

//   document.cookie = updatedCookie;
// }

// // Example of use:
// setCookie('user', 'John', {secure: true, 'max-age': 3600});
// deleteCookie(name)
// To delete a cookie, we can call it with a negative expiration date:

// function deleteCookie(name) {
//   setCookie(name, "", {
//     'max-age': -1
//   })
// }
// Updating or deleting must use same path and domain
// Please note: when we update or delete a cookie, we should use exactly the same path and domain options as when we set it.

// Together: cookie.js.

// Appendix: Third-party cookies
// A cookie is called “third-party” if it’s placed by a domain other than the page the user is visiting.

// For instance:

// A page at site.com loads a banner from another site: <img src="https://ads.com/banner.png">.

// Along with the banner, the remote server at ads.com may set the Set-Cookie header with a cookie like id=1234. Such a cookie originates from the ads.com domain, and will only be visible at ads.com:

// Next time when ads.com is accessed, the remote server gets the id cookie and recognizes the user:

// What’s even more important is, when the user moves from site.com to another site other.com, which also has a banner, then ads.com gets the cookie, as it belongs to ads.com, thus recognizing the visitor and tracking him as he moves between sites:

// Third-party cookies are traditionally used for tracking and ads services, due to their nature. They are bound to the originating domain, so ads.com can track the same user between different sites, if they all access it.

// Naturally, some people don’t like being tracked, so browsers allow to disable such cookies.

// Also, some modern browsers employ special policies for such cookies:

// Safari does not allow third-party cookies at all.
// Firefox comes with a “black list” of third-party domains where it blocks third-party cookies.
// Please note:
// If we load a script from a third-party domain, like <script src="https://google-analytics.com/analytics.js">, and that script uses document.cookie to set a cookie, then such cookie is not third-party.

// If a script sets a cookie, then no matter where the script came from – the cookie belongs to the domain of the current webpage.

// Appendix: GDPR
// This topic is not related to JavaScript at all, just something to keep in mind when setting cookies.

// There’s a legislation in Europe called GDPR, that enforces a set of rules for websites to respect the users’ privacy. One of these rules is to require an explicit permission for tracking cookies from the user.

// Please note, that’s only about tracking/identifying/authorizing cookies.

// So, if we set a cookie that just saves some information, but neither tracks nor identifies the user, then we are free to do it.

// But if we are going to set a cookie with an authentication session or a tracking id, then a user must allow that.

// Websites generally have two variants of following GDPR. You must have seen them both already in the web:

// If a website wants to set tracking cookies only for authenticated users.

// To do so, the registration form should have a checkbox like “accept the privacy policy” (that describes how cookies are used), the user must check it, and then the website is free to set auth cookies.

// If a website wants to set tracking cookies for everyone.

// To do so legally, a website shows a modal “splash screen” for newcomers, and requires them to agree to the cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see such “must-click” modal splash screens instead of the content. But GDPR requires an explicit agreement.

// GDPR is not only about cookies, it’s about other privacy-related issues too, but that’s too much beyond our scope.

// Summary
// document.cookie provides access to cookies.

// Write operations modify only cookies mentioned in it.
// Name/value must be encoded.
// One cookie may not exceed 4KB in size. The number of cookies allowed on a domain is around 20+ (varies by browser).
// Cookie options:

// path=/, by default current path, makes the cookie visible only under that path.
// domain=site.com, by default a cookie is visible on the current domain only. If the domain is set explicitly, the cookie becomes visible on subdomains.
// expires or max-age sets the cookie expiration time. Without them the cookie dies when the browser is closed.
// secure makes the cookie HTTPS-only.
// samesite forbids the browser to send the cookie with requests coming from outside the site. This helps to prevent XSRF attacks.
// Additionally:

// Third-party cookies may be forbidden by the browser, e.g. Safari does that by default.
// When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.
// ///////////////////////////////////////////////////////////////////

// // LocalStorage, sessionStorage
// LocalStorage, sessionStorage
// Web storage objects localStorage and sessionStorage allow to save key/value pairs in the browser.

// What’s interesting about them is that the data survives a page refresh (for sessionStorage) and even a full browser restart (for localStorage). We’ll see that very soon.

// We already have cookies. Why additional objects?

// Unlike cookies, web storage objects are not sent to server with each request. Because of that, we can store much more. Most modern browsers allow at least 5 megabytes of data (or more) and have settings to configure that.
// Also unlike cookies, the server can’t manipulate storage objects via HTTP headers. Everything’s done in JavaScript.
// The storage is bound to the origin (domain/protocol/port triplet). That is, different protocols or subdomains infer different storage objects, they can’t access data from each other.
// Both storage objects provide same methods and properties:

// setItem(key, value) – store key/value pair.
// getItem(key) – get the value by key.
// removeItem(key) – remove the key with its value.
// clear() – delete everything.
// key(index) – get the key on a given position.
// length – the number of stored items.
// As you can see, it’s like a Map collection (setItem/getItem/removeItem), but also allows access by index with key(index).

// Let’s see how it works.

// localStorage demo
// The main features of localStorage are:

// Shared between all tabs and windows from the same origin.
// The data does not expire. It remains after the browser restart and even OS reboot.
// For instance, if you run this code…

// localStorage.setItem('test', 1);
// …And close/open the browser or just open the same page in a different window, then you can get it like this:

// console.log( localStorage.getItem('test') ); // 1
// We only have to be on the same origin (domain/port/protocol), the url path can be different.

// The localStorage is shared between all windows with the same origin, so if we set the data in one window, the change becomes visible in another one.

// Object-like access
// We can also use a plain object way of getting/setting keys, like this:

// // set key
// localStorage.test = 2;

// // get key
// console.log( localStorage.test ); // 2

// // remove key
// delete localStorage.test;
// That’s allowed for historical reasons, and mostly works, but generally not recommended, because:

// If the key is user-generated, it can be anything, like length or toString, or another built-in method of localStorage. In that case getItem/setItem work fine, while object-like access fails:

// let key = 'length';
// localStorage[key] = 5; // Error, can't assign length
// There’s a storage event, it triggers when we modify the data. That event does not happen for object-like access. We’ll see that later in this chapter.

// Looping over keys
// As we’ve seen, the methods provide “get/set/remove by key” functionality. But how to get all saved values or keys?

// Unfortunately, storage objects are not iterable.

// One way is to loop over them as over an array:

// for(let i=0; i<localStorage.length; i++) {
//   let key = localStorage.key(i);
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }
// Another way is to use for key in localStorage loop, just as we do with regular objects.

// It iterates over keys, but also outputs few built-in fields that we don’t need:

// // bad try
// for(let key in localStorage) {
//   console.log(key); // shows getItem, setItem and other built-in stuff
// }
// …So we need either to filter fields from the prototype with hasOwnProperty check:

// for(let key in localStorage) {
//   if (!localStorage.hasOwnProperty(key)) {
//     continue; // skip keys like "setItem", "getItem" etc
//   }
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }
// …Or just get the “own” keys with Object.keys and then loop over them if needed:

// let keys = Object.keys(localStorage);
// for(let key of keys) {
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }
// The latter works, because Object.keys only returns the keys that belong to the object, ignoring the prototype.

// Strings only
// Please note that both key and value must be strings.

// If were any other type, like a number, or an object, it gets converted to string automatically:

// localStorage.user = {name: "John"};
// console.log(localStorage.user); // [object Object]
// We can use JSON to store objects though:

// localStorage.user = JSON.stringify({name: "John"});

// // sometime later
// let user = JSON.parse( localStorage.user );
// console.log( user.name ); // John
// Also it is possible to stringify the whole storage object, e.g. for debugging purposes:

// // added formatting options to JSON.stringify to make the object look nicer
// console.log( JSON.stringify(localStorage, null, 2) );
// sessionStorage
// The sessionStorage object is used much less often than localStorage.

// Properties and methods are the same, but it’s much more limited:

// The sessionStorage exists only within the current browser tab.
// Another tab with the same page will have a different storage.
// But it is shared between iframes in the same tab (assuming they come from the same origin).
// The data survives page refresh, but not closing/opening the tab.
// Let’s see that in action.

// Run this code…

// sessionStorage.setItem('test', 1);
// …Then refresh the page. Now you can still get the data:

// console.log( sessionStorage.getItem('test') ); // after refresh: 1
// …But if you open the same page in another tab, and try again there, the code above returns null, meaning “nothing found”.

// That’s exactly because sessionStorage is bound not only to the origin, but also to the browser tab. For that reason, sessionStorage is used sparingly.

// Storage event
// When the data gets updated in localStorage or sessionStorage, storage event triggers, with properties:

// key – the key that was changed (null if .clear() is called).
// oldValue – the old value (null if the key is newly added).
// newValue – the new value (null if the key is removed).
// url – the url of the document where the update happened.
// storageArea – either localStorage or sessionStorage object where the update happened.
// The important thing is: the event triggers on all window objects where the storage is accessible, except the one that caused it.

// Let’s elaborate.

// Imagine, you have two windows with the same site in each. So localStorage is shared between them.

// You might want to open this page in two browser windows to test the code below.

// If both windows are listening for window.onstorage, then each one will react on updates that happened in the other one.

// // triggers on updates made to the same storage from other documents
// window.onstorage = event => { // can also use window.addEventListener('storage', event => {
//   if (event.key != 'now') return;
//   console.log(event.key + ':' + event.newValue + " at " + event.url);
// };

// localStorage.setItem('now', Date.now());
// Please note that the event also contains: event.url – the url of the document where the data was updated.

// Also, event.storageArea contains the storage object – the event is the same for both sessionStorage and localStorage, so event.storageArea references the one that was modified. We may even want to set something back in it, to “respond” to a change.

// That allows different windows from the same origin to exchange messages.

// Modern browsers also support Broadcast channel API, the special API for same-origin inter-window communication, it’s more full featured, but less supported. There are libraries that polyfill that API, based on localStorage, that make it available everywhere.

// Summary
// Web storage objects localStorage and sessionStorage allow to store key/value in the browser.

// Both key and value must be strings.
// The limit is 5mb+, depends on the browser.
// They do not expire.
// The data is bound to the origin (domain/port/protocol).
// localStorage	sessionStorage
// Shared between all tabs and windows with the same origin	Visible within a browser tab, including iframes from the same origin
// Survives browser restart	Survives page refresh (but not tab close)
// API:

// setItem(key, value) – store key/value pair.
// getItem(key) – get the value by key.
// removeItem(key) – remove the key with its value.
// clear() – delete everything.
// key(index) – get the key number index.
// length – the number of stored items.
// Use Object.keys to get all keys.
// We access keys as object properties, in that case storage event isn’t triggered.
// Storage event:

// Triggers on setItem, removeItem, clear calls.
// Contains all the data about the operation (key/oldValue/newValue), the document url and the storage object storageArea.
// Triggers on all window objects that have access to the storage except the one that generated it (within a tab for sessionStorage, globally for localStorage).
// ///////////////////////////////////////////////////////////////////

// // IndexedDB
// IndexedDB
// IndexedDB is a database that is built into a browser, much more powerful than localStorage.

// Stores almost any kind of values by keys, multiple key types.
// Supports transactions for reliability.
// Supports key range queries, indexes.
// Can store much bigger volumes of data than localStorage.
// That power is usually excessive for traditional client-server apps. IndexedDB is intended for offline apps, to be combined with ServiceWorkers and other technologies.

// The native interface to IndexedDB, described in the specification https://www.w3.org/TR/IndexedDB, is event-based.

// We can also use async/await with the help of a promise-based wrapper, like https://github.com/jakearchibald/idb. That’s pretty convenient, but the wrapper is not perfect, it can’t replace events for all cases. So we’ll start with events, and then, after we gain an understanding of IndexedDb, we’ll use the wrapper.

// Where’s the data?
// Technically, the data is usually stored in the visitor’s home directory, along with browser settings, extensions, etc.

// Different browsers and OS-level users have each their own independant storage.

// Open database
// To start working with IndexedDB, we first need to open (connect to) a database.

// The syntax:

// let openRequest = indexedDB.open(name, version);
// name – a string, the database name.
// version – a positive integer version, by default 1 (explained below).
// We can have many databases with different names, but all of them exist within the current origin (domain/protocol/port). Different websites can’t access each other’s databases.

// The call returns openRequest object, we should listen to events on it:

// success: database is ready, there’s the “database object” in openRequest.result, we should use it for further calls.
// error: opening failed.
// upgradeneeded: database is ready, but its version is outdated (see below).
// IndexedDB has a built-in mechanism of “schema versioning”, absent in server-side databases.

// Unlike server-side databases, IndexedDB is client-side, the data is stored in the browser, so we, developers, don’t have full-time access to it. So, when we have published a new version of our app, and the user visits our webpage, we may need to update the database.

// If the local database version is less than specified in open, then a special event upgradeneeded is triggered, and we can compare versions and upgrade data structures as needed.

// The upgradeneeded event also triggers when the database doesn’t yet exist (technically, its version is 0), so we can perform the initialization.

// Let’s say we published the first version of our app.

// Then we can open the database with version 1 and perform the initialization in an upgradeneeded handler like this:

// let openRequest = indexedDB.open("store", 1);

// openRequest.onupgradeneeded = function() {
//   // triggers if the client had no database
//   // ...perform initialization...
// };

// openRequest.onerror = function() {
//   console.error("Error", openRequest.error);
// };

// openRequest.onsuccess = function() {
//   let db = openRequest.result;
//   // continue working with database using db object
// };
// Then, later, we publish the 2nd version.

// We can open it with version 2 and perform the upgrade like this:

// let openRequest = indexedDB.open("store", 2);

// openRequest.onupgradeneeded = function(event) {
//   // the existing database version is less than 2 (or it doesn't exist)
//   let db = openRequest.result;
//   switch(event.oldVersion) { // existing db version
//     case 0:
//       // version 0 means that the client had no database
//       // perform initialization
//     case 1:
//       // client had version 1
//       // update
//   }
// };
// Please note: as our current version is 2, the onupgradeneeded handler has a code branch for version 0, suitable for users that are accessing for the first time and have no database, and also for version 1, for upgrades.

// And then, only if onupgradeneeded handler finishes without errors, openRequest.onsuccess triggers, and the database is considered successfully opened.

// To delete a database:

// let deleteRequest = indexedDB.deleteDatabase(name)
// // deleteRequest.onsuccess/onerror tracks the result
// We can’t open a database using an older open call version
// If the current user database has a higher version than in the open call, e.g. the existing DB version is 3, and we try to open(...2), then that’s an error, openRequest.onerror triggers.

// That’s rare, but such a thing may happen when a visitor loads outdated JavaScript code, e.g. from a proxy cache. So the code is old, but his database is new.

// To protect from errors, we should check db.version and suggest a page reload. Use proper HTTP caching headers to avoid loading the old code, so that you’ll never have such problems.

// Parallel update problem
// As we’re talking about versioning, let’s tackle a small related problem.

// Let’s say:

// A visitor opened our site in a browser tab, with database version 1.
// Then we rolled out an update, so our code is newer.
// And then the same visitor opens our site in another tab.
// So there’s a tab with an open connection to DB version 1, while the second one attempts to update it to version 2 in its upgradeneeded handler.

// The problem is that a database is shared between two tabs, as it’s the same site, same origin. And it can’t be both version 1 and 2. To perform the update to version 2, all connections to version 1 must be closed, including the one in the first tab.

// In order to organize that, the versionchange event triggers on the “outdated” database object. We should listen for it and close the old database connection (and probably suggest a page reload, to load the updated code).

// If we don’t listen for the versionchange event and don’t close the old connection, then the second, new connection won’t be made. The openRequest object will emit the blocked event instead of success. So the second tab won’t work.

// Here’s the code to correctly handle the parallel upgrade. It installs the onversionchange handler, that triggers if the current database connection becomes outdated (db version is updated elsewhere) and closes the connection.

// let openRequest = indexedDB.open("store", 2);

// openRequest.onupgradeneeded = ...;
// openRequest.onerror = ...;

// openRequest.onsuccess = function() {
//   let db = openRequest.result;

//   db.onversionchange = function() {
//     db.close();
//     console.log("Database is outdated, please reload the page.")
//   };

//   // ...the db is ready, use it...
// };

// openRequest.onblocked = function() {
//   // this event shouldn't trigger if we handle onversionchange correctly

//   // it means that there's another open connection to the same database
//   // and it wasn't closed after db.onversionchange triggered for it
// };
// …In other words, here we do two things:

// The db.onversionchange listener informs us about a parallel update attempt, if the current database version becomes outdated.
// The openRequest.onblocked listener informs us about the opposite situation: there’s a connection to an outdated version elsewhere, and it doesn’t close, so the newer connection can’t be made.
// We can handle things more gracefully in db.onversionchange, prompt the visitor to save the data before the connection is closed and so on.

// Or, an alternative approach would be to not close the database in db.onversionchange, but instead use the onblocked handler (in the new tab) to console.log the visitor, tell him that the newer version can’t be loaded until they close other tabs.

// These update collisions happen rarely, but we should at least have some handling for them, at least an onblocked handler, to prevent our script from dying silently.

// Object store
// To store something in IndexedDB, we need an object store.

// An object store is a core concept of IndexedDB. Counterparts in other databases are called “tables” or “collections”. It’s where the data is stored. A database may have multiple stores: one for users, another one for goods, etc.

// Despite being named an “object store”, primitives can be stored too.

// We can store almost any value, including complex objects.

// IndexedDB uses the standard serialization algorithm to clone-and-store an object. It’s like JSON.stringify, but more powerful, capable of storing much more datatypes.

// An example of an object that can’t be stored: an object with circular references. Such objects are not serializable. JSON.stringify also fails for such objects.

// There must be a unique key for every value in the store.

// A key must be one of these types – number, date, string, binary, or array. It’s a unique identifier, so we can search/remove/update values by the key.

// As we’ll see very soon, we can provide a key when we add a value to the store, similar to localStorage. But when we store objects, IndexedDB allows setting up an object property as the key, which is much more convenient. Or we can auto-generate keys.

// But we need to create an object store first.

// The syntax to create an object store:

// db.createObjectStore(name[, keyOptions]);
// Please note, the operation is synchronous, no await needed.

// name is the store name, e.g. "books" for books,
// keyOptions is an optional object with one of two properties:
// keyPath – a path to an object property that IndexedDB will use as the key, e.g. id.
// autoIncrement – if true, then the key for a newly stored object is generated automatically, as an ever-incrementing number.
// If we don’t supply keyOptions, then we’ll need to provide a key explicitly later, when storing an object.

// For instance, this object store uses id property as the key:

// db.createObjectStore('books', {keyPath: 'id'});
// An object store can only be created/modified while updating the DB version, in upgradeneeded handler.

// That’s a technical limitation. Outside of the handler we’ll be able to add/remove/update the data, but object stores can only be created/removed/altered during a version update.

// To perform a database version upgrade, there are two main approaches:

// We can implement per-version upgrade functions: from 1 to 2, from 2 to 3, from 3 to 4 etc. Then, in upgradeneeded we can compare versions (e.g. old 2, now 4) and run per-version upgrades step by step, for every intermediate version (2 to 3, then 3 to 4).
// Or we can just examine the database: get a list of existing object stores as db.objectStoreNames. That object is a DOMStringList that provides contains(name) method to check for existance. And then we can do updates depending on what exists and what doesn’t.
// For small databases the second variant may be simpler.

// Here’s the demo of the second approach:

// let openRequest = indexedDB.open("db", 2);

// // create/upgrade the database without version checks
// openRequest.onupgradeneeded = function() {
//   let db = openRequest.result;
//   if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
//     db.createObjectStore('books', {keyPath: 'id'}); // create it
//   }
// };
// To delete an object store:

// db.deleteObjectStore('books')
// Transactions
// The term “transaction” is generic, used in many kinds of databases.

// A transaction is a group of operations, that should either all succeed or all fail.

// For instance, when a person buys something, we need to:

// Subtract the money from their account.
// Add the item to their inventory.
// It would be pretty bad if we complete the 1st operation, and then something goes wrong, e.g. lights out, and we fail to do the 2nd. Both should either succeed (purchase complete, good!) or both fail (at least the person kept their money, so they can retry).

// Transactions can guarantee that.

// All data operations must be made within a transaction in IndexedDB.

// To start a transaction:

// db.transaction(store[, type]);
// store is a store name that the transaction is going to access, e.g. "books". Can be an array of store names if we’re going to access multiple stores.
// type – a transaction type, one of:
// readonly – can only read, the default.
// readwrite – can only read and write the data, but not create/remove/alter object stores.
// There’s also versionchange transaction type: such transactions can do everything, but we can’t create them manually. IndexedDB automatically creates a versionchange transaction when opening the database, for upgradeneeded handler. That’s why it’s a single place where we can update the database structure, create/remove object stores.

// Why are there different types of transactions?
// Performance is the reason why transactions need to be labeled either readonly and readwrite.

// Many readonly transactions are able to access the same store concurrently, but readwrite transactions can’t. A readwrite transaction “locks” the store for writing. The next transaction must wait before the previous one finishes before accessing the same store.

// After the transaction is created, we can add an item to the store, like this:

// let transaction = db.transaction("books", "readwrite"); // (1)

// // get an object store to operate on it
// let books = transaction.objectStore("books"); // (2)

// let book = {
//   id: 'js',
//   price: 10,
//   created: new Date()
// };

// let request = books.add(book); // (3)

// request.onsuccess = function() { // (4)
//   console.log("Book added to the store", request.result);
// };

// request.onerror = function() {
//   console.log("Error", request.error);
// };
// There were basically four steps:

// Create a transaction, mentioning all the stores it’s going to access, at (1).
// Get the store object using transaction.objectStore(name), at (2).
// Perform the request to the object store books.add(book), at (3).
// …Handle request success/error (4), then we can make other requests if needed, etc.
// Object stores support two methods to store a value:

// put(value, [key]) Add the value to the store. The key is supplied only if the object store did not have keyPath or autoIncrement option. If there’s already a value with the same key, it will be replaced.

// add(value, [key]) Same as put, but if there’s already a value with the same key, then the request fails, and an error with the name "ConstraintError" is generated.

// Similar to opening a database, we can send a request: books.add(book), and then wait for success/error events.

// The request.result for add is the key of the new object.
// The error is in request.error (if any).
// Transactions’ autocommit
// In the example above we started the transaction and made add request. But as we stated previously, a transaction may have multiple associated requests, that must either all succeed or all fail. How do we mark the transaction as finished, with no more requests to come?

// The short answer is: we don’t.

// In the next version 3.0 of the specification, there will probably be a manual way to finish the transaction, but right now in 2.0 there isn’t.

// When all transaction requests are finished, and the microtasks queue is empty, it is committed automatically.

// Usually, we can assume that a transaction commits when all its requests are complete, and the current code finishes.

// So, in the example above no special call is needed to finish the transaction.

// Transactions auto-commit principle has an important side effect. We can’t insert an async operation like fetch, setTimeout in the middle of a transaction. IndexedDB will not keep the transaction waiting till these are done.

// In the code below, request2 in the line (*) fails, because the transaction is already committed, and can’t make any request in it:

// let request1 = books.add(book);

// request1.onsuccess = function() {
//   fetch('/').then(response => {
//     let request2 = books.add(anotherBook); // (*)
//     request2.onerror = function() {
//       console.log(request2.error.name); // TransactionInactiveError
//     };
//   });
// };
// That’s because fetch is an asynchronous operation, a macrotask. Transactions are closed before the browser starts doing macrotasks.

// Authors of IndexedDB spec believe that transactions should be short-lived. Mostly for performance reasons.

// Notably, readwrite transactions “lock” the stores for writing. So if one part of the application initiated readwrite on books object store, then another part that wants to do the same has to wait: the new transaction “hangs” till the first one is done. That can lead to strange delays if transactions take a long time.

// So, what to do?

// In the example above we could make a new db.transaction right before the new request (*).

// But it will be even better, if we’d like to keep the operations together, in one transaction, to split apart IndexedDB transactions and “other” async stuff.

// First, make fetch, prepare the data if needed, afterwards create a transaction and perform all the database requests, it’ll work then.

// To detect the moment of successful completion, we can listen to transaction.oncomplete event:

// let transaction = db.transaction("books", "readwrite");

// // ...perform operations...

// transaction.oncomplete = function() {
//   console.log("Transaction is complete");
// };
// Only complete guarantees that the transaction is saved as a whole. Individual requests may succeed, but the final write operation may go wrong (e.g. I/O error or something).

// To manually abort the transaction, call:

// transaction.abort();
// That cancels all modification made by the requests in it and triggers transaction.onabort event.

// Error handling
// Write requests may fail.

// That’s to be expected, not only because of possible errors at our side, but also for reasons not related to the transaction itself. For instance, the storage quota may be exceeded. So we must be ready to handle such case.

// A failed request automatically aborts the transaction, canceling all its changes.

// In some situations, we may want to handle the failure (e.g. try another request), without canceling existing changes, and continue the transaction. That’s possible. The request.onerror handler is able to prevent the transaction abort by calling event.preventDefault().

// In the example below a new book is added with the same key (id) as the existing one. The store.add method generates a "ConstraintError" in that case. We handle it without canceling the transaction:

// let transaction = db.transaction("books", "readwrite");

// let book = { id: 'js', price: 10 };

// let request = transaction.objectStore("books").add(book);

// request.onerror = function(event) {
//   // ConstraintError occurs when an object with the same id already exists
//   if (request.error.name == "ConstraintError") {
//     console.log("Book with such id already exists"); // handle the error
//     event.preventDefault(); // don't abort the transaction
//     // use another key for the book?
//   } else {
//     // unexpected error, can't handle it
//     // the transaction will abort
//   }
// };

// transaction.onabort = function() {
//   console.log("Error", transaction.error);
// };
// Event delegation
// Do we need onerror/onsuccess for every request? Not every time. We can use event delegation instead.

// IndexedDB events bubble: request → transaction → database.

// All events are DOM events, with capturing and bubbling, but usually only bubbling stage is used.

// So we can catch all errors using db.onerror handler, for reporting or other purposes:

// db.onerror = function(event) {
//   let request = event.target; // the request that caused the error

//   console.log("Error", request.error);
// };
// …But what if an error is fully handled? We don’t want to report it in that case.

// We can stop the bubbling and hence db.onerror by using event.stopPropagation() in request.onerror.

// request.onerror = function(event) {
//   if (request.error.name == "ConstraintError") {
//     console.log("Book with such id already exists"); // handle the error
//     event.preventDefault(); // don't abort the transaction
//     event.stopPropagation(); // don't bubble error up, "chew" it
//   } else {
//     // do nothing
//     // transaction will be aborted
//     // we can take care of error in transaction.onabort
//   }
// };
// Searching
// There are two main types of search in an object store:

// By a key value or a key range. In our “books” storage that would be a value or range of values of book.id.
// By another object field, e.g. book.price. This required an additional data structure, named “index”.
// By key
// First let’s deal with the first type of search: by key.

// Searching methods support both exact key values and so-called “ranges of values” – IDBKeyRange objects that specify an acceptable “key range”.

// IDBKeyRange objects are created using following calls:

// IDBKeyRange.lowerBound(lower, [open]) means: ≥lower (or >lower if open is true)
// IDBKeyRange.upperBound(upper, [open]) means: ≤upper (or <upper if open is true)
// IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen]) means: between lower and upper. If the open flags is true, the corresponding key is not included in the range.
// IDBKeyRange.only(key) – a range that consists of only one key, rarely used.
// We’ll see practical examples of using them very soon.

// To perform the actual search, there are following methods. They accept a query argument that can be either an exact key or a key range:

// store.get(query) – search for the first value by a key or a range.
// store.getAll([query], [count]) – search for all values, limit by count if given.
// store.getKey(query) – search for the first key that satisfies the query, usually a range.
// store.getAllKeys([query], [count]) – search for all keys that satisfy the query, usually a range, up to count if given.
// store.count([query]) – get the total count of keys that satisfy the query, usually a range.
// For instance, we have a lot of books in our store. Remember, the id field is the key, so all these methods can search by id.

// Request examples:

// // get one book
// books.get('js')

// // get books with 'css' <= id <= 'html'
// books.getAll(IDBKeyRange.bound('css', 'html'))

// // get books with id < 'html'
// books.getAll(IDBKeyRange.upperBound('html', true))

// // get all books
// books.getAll()

// // get all keys, where id > 'js'
// books.getAllKeys(IDBKeyRange.lowerBound('js', true))
// Object store is always sorted
// An object store sorts values by key internally.

// So requests that return many values always return them in sorted by key order.

// By a field using an index
// To search by other object fields, we need to create an additional data structure named “index”.

// An index is an “add-on” to the store that tracks a given object field. For each value of that field, it stores a list of keys for objects that have that value. There will be a more detailed picture below.

// The syntax:

// objectStore.createIndex(name, keyPath, [options]);
// name – index name,
// keyPath – path to the object field that the index should track (we’re going to search by that field),
// option – an optional object with properties:
// unique – if true, then there may be only one object in the store with the given value at the keyPath. The index will enforce that by generating an error if we try to add a duplicate.
// multiEntry – only used if the value on keyPath is an array. In that case, by default, the index will treat the whole array as the key. But if multiEntry is true, then the index will keep a list of store objects for each value in that array. So array members become index keys.
// In our example, we store books keyed by id.

// Let’s say we want to search by price.

// First, we need to create an index. It must be done in upgradeneeded, just like an object store:

// openRequest.onupgradeneeded = function() {
//   // we must create the index here, in versionchange transaction
//   let books = db.createObjectStore('books', {keyPath: 'id'});
//   let index = books.createIndex('price_idx', 'price');
// };
// The index will track price field.
// The price is not unique, there may be multiple books with the same price, so we don’t set unique option.
// The price is not an array, so multiEntry flag is not applicable.
// Imagine that our inventory has 4 books. Here’s the picture that shows exactly what the index is:

// As said, the index for each value of price (second argument) keeps the list of keys that have that price.

// The index keeps itself up to date automatically, we don’t have to care about it.

// Now, when we want to search for a given price, we simply apply the same search methods to the index:

// let transaction = db.transaction("books"); // readonly
// let books = transaction.objectStore("books");
// let priceIndex = books.index("price_idx");

// let request = priceIndex.getAll(10);

// request.onsuccess = function() {
//   if (request.result !== undefined) {
//     console.log("Books", request.result); // array of books with price=10
//   } else {
//     console.log("No such books");
//   }
// };
// We can also use IDBKeyRange to create ranges and looks for cheap/expensive books:

// // find books where price <= 5
// let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
// Indexes are internally sorted by the tracked object field, price in our case. So when we do the search, the results are also sorted by price.

// Deleting from store
// The delete method looks up values to delete by a query, the call format is similar to getAll:

// delete(query) – delete matching values by query.
// For instance:

// // delete the book with id='js'
// books.delete('js');
// If we’d like to delete books based on a price or another object field, then we should first find the key in the index, and then call delete:

// // find the key where price = 5
// let request = priceIndex.getKey(5);

// request.onsuccess = function() {
//   let id = request.result;
//   let deleteRequest = books.delete(id);
// };
// To delete everything:

// books.clear(); // clear the storage.
// Cursors
// Methods like getAll/getAllKeys return an array of keys/values.

// But an object storage can be huge, bigger than the available memory. Then getAll will fail to get all records as an array.

// What to do?

// Cursors provide the means to work around that.

// A cursor is a special object that traverses the object storage, given a query, and returns one key/value at a time, thus saving memory.

// As an object store is sorted internally by key, a cursor walks the store in key order (ascending by default).

// The syntax:

// // like getAll, but with a cursor:
// let request = store.openCursor(query, [direction]);

// // to get keys, not values (like getAllKeys): store.openKeyCursor
// query is a key or a key range, same as for getAll.
// direction is an optional argument, which order to use:
// "next" – the default, the cursor walks up from the record with the lowest key.
// "prev" – the reverse order: down from the record with the biggest key.
// "nextunique", "prevunique" – same as above, but skip records with the same key (only for cursors over indexes, e.g. for multiple books with price=5 only the first one will be returned).
// The main difference of the cursor is that request.onsuccess triggers multiple times: once for each result.

// Here’s an example of how to use a cursor:

// let transaction = db.transaction("books");
// let books = transaction.objectStore("books");

// let request = books.openCursor();

// // called for each book found by the cursor
// request.onsuccess = function() {
//   let cursor = request.result;
//   if (cursor) {
//     let key = cursor.key; // book key (id field)
//     let value = cursor.value; // book object
//     console.log(key, value);
//     cursor.continue();
//   } else {
//     console.log("No more books");
//   }
// };
// The main cursor methods are:

// advance(count) – advance the cursor count times, skipping values.
// continue([key]) – advance the cursor to the next value in range matching (or immediately after key if given).
// Whether there are more values matching the cursor or not – onsuccess gets called, and then in result we can get the cursor pointing to the next record, or undefined.

// In the example above the cursor was made for the object store.

// But we also can make a cursor over an index. As we remember, indexes allow to search by an object field. Cursors over indexes do precisely the same as over object stores – they save memory by returning one value at a time.

// For cursors over indexes, cursor.key is the index key (e.g. price), and we should use cursor.primaryKey property for the object key:

// let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// // called for each record
// request.onsuccess = function() {
//   let cursor = request.result;
//   if (cursor) {
//     let primaryKey = cursor.primaryKey; // next object store key (id field)
//     let value = cursor.value; // next object store object (book object)
//     let key = cursor.key; // next index key (price)
//     console.log(key, value);
//     cursor.continue();
//   } else {
//     console.log("No more books");
//   }
// };
// Promise wrapper
// Adding onsuccess/onerror to every request is quite a cumbersome task. Sometimes we can make our life easier by using event delegation, e.g. set handlers on the whole transactions, but async/await is much more convenient.

// Let’s use a thin promise wrapper https://github.com/jakearchibald/idb further in this chapter. It creates a global idb object with promisified IndexedDB methods.

// Then, instead of onsuccess/onerror we can write like this:

// let db = await idb.openDB('store', 1, db => {
//   if (db.oldVersion == 0) {
//     // perform the initialization
//     db.createObjectStore('books', {keyPath: 'id'});
//   }
// });

// let transaction = db.transaction('books', 'readwrite');
// let books = transaction.objectStore('books');

// try {
//   await books.add(...);
//   await books.add(...);

//   await transaction.complete;

//   console.log('jsbook saved');
// } catch(err) {
//   console.log('error', err.message);
// }
// So we have all the sweet “plain async code” and “try…catch” stuff.

// Error handling
// If we don’t catch an error, then it falls through, till the closest outer try..catch.

// An uncaught error becomes an “unhandled promise rejection” event on window object.

// We can handle such errors like this:

// window.addEventListener('unhandledrejection', event => {
//   let request = event.target; // IndexedDB native request object
//   let error = event.reason; //  Unhandled error object, same as request.error
//   ...report about the error...
// });
// “Inactive transaction” pitfall
// As we already know, a transaction auto-commits as soon as the browser is done with the current code and microtasks. So if we put a macrotask like fetch in the middle of a transaction, then the transaction won’t wait for it to finish. It just auto-commits. So the next request in it would fail.

// For a promise wrapper and async/await the situation is the same.

// Here’s an example of fetch in the middle of the transaction:

// let transaction = db.transaction("inventory", "readwrite");
// let inventory = transaction.objectStore("inventory");

// await inventory.add({ id: 'js', price: 10, created: new Date() });

// await fetch(...); // (*)

// await inventory.add({ id: 'js', price: 10, created: new Date() }); // Error
// The next inventory.add after fetch (*) fails with an “inactive transaction” error, because the transaction is already committed and closed at that time.

// The workaround is the same as when working with native IndexedDB: either make a new transaction or just split things apart.

// Prepare the data and fetch all that’s needed first.
// Then save in the database.
// Getting native objects
// Internally, the wrapper performs a native IndexedDB request, adding onerror/onsuccess to it, and returns a promise that rejects/resolves with the result.

// That works fine most of the time. The examples are at the lib page https://github.com/jakearchibald/idb.

// In few rare cases, when we need the original request object, we can access it as promise.request property of the promise:

// let promise = books.add(book); // get a promise (don't await for its result)

// let request = promise.request; // native request object
// let transaction = request.transaction; // native transaction object

// // ...do some native IndexedDB voodoo...

// let result = await promise; // if still needed
// Summary
// IndexedDB can be thought of as a “localStorage on steroids”. It’s a simple key-value database, powerful enough for offline apps, yet simple to use.

// The best manual is the specification, the current one is 2.0, but few methods from 3.0 (it’s not much different) are partially supported.

// The basic usage can be described with a few phrases:

// Get a promise wrapper like idb.
// Open a database: idb.openDb(name, version, onupgradeneeded)
// Create object storages and indexes in onupgradeneeded handler or perform version update if needed.
// For requests:
// Create transaction db.transaction('books') (readwrite if needed).
// Get the object store transaction.objectStore('books').
// Then, to search by a key, call methods on the object store directly.
// To search by an object field, create an index.
// If the data does not fit in memory, use a cursor.
// Here’s a small demo app:

// Resultindex.html
// <!doctype html>
// <script src="https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js"></script>

// <button onclick="addBook()">Add a book</button>
// <button onclick="clearBooks()">Clear books</button>

// <p>Books list:</p>

// <ul id="listElem"></ul>

// <script>
// let db;

// init();

// async function init() {
//   db = await idb.openDb('booksDb', 1, db => {
//     db.createObjectStore('books', {keyPath: 'name'});
//   });

//   list();
// }

// async function list() {
//   let tx = db.transaction('books');
//   let bookStore = tx.objectStore('books');

//   let books = await bookStore.getAll();

//   if (books.length) {
//     listElem.innerHTML = books.map(book => `<li>
//         name: ${book.name}, price: ${book.price}
//       </li>`).join('');
//   } else {
//     listElem.innerHTML = '<li>No books yet. Please add books.</li>'
//   }

// }

// async function clearBooks() {
//   let tx = db.transaction('books', 'readwrite');
//   await tx.objectStore('books').clear();
//   await list();
// }

// async function addBook() {
//   let name = prompt("Book name?");
//   let price = +prompt("Book price?");

//   let tx = db.transaction('books', 'readwrite');

//   try {
//     await tx.objectStore('books').add({name, price});
//     await list();
//   } catch(err) {
//     if (err.name == 'ConstraintError') {
//       console.log("Such book exists already");
//       await addBook();
//     } else {
//       throw err;
//     }
//   }
// }

// window.addEventListener('unhandledrejection', event => {
//   console.log("Error: " + event.reason.message);
// });

// </script>
// ///////////////////////////////////////////////////////////////////
