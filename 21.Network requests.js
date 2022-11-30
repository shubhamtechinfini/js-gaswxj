// // Fetch
// Fetch
// JavaScript can send network requests to the server and load new information whenever it’s needed.

// For example, we can use a network request to:

// Submit an order,
// Load user information,
// Receive latest updates from the server,
// …etc.
// …And all of that without reloading the page!

// There’s an umbrella term “AJAX” (abbreviated Asynchronous JavaScript And XML) for network requests from JavaScript. We don’t have to use XML though: the term comes from old times, that’s why that word is there. You may have heard that term already.

// There are multiple ways to send a network request and get information from the server.

// The fetch() method is modern and versatile, so we’ll start with it. It’s not supported by old browsers (can be polyfilled), but very well supported among the modern ones.

// The basic syntax is:

// let promise = fetch(url, [options])
// url – the URL to access.
// options – optional parameters: method, headers etc.
// Without options, this is a simple GET request, downloading the contents of the url.

// The browser starts the request right away and returns a promise that the calling code should use to get the result.

// Getting a response is usually a two-stage process.

// First, the promise, returned by fetch, resolves with an object of the built-in Response class as soon as the server responds with headers.

// At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don’t have the body yet.

// The promise rejects if the fetch was unable to make HTTP-request, e.g. network problems, or there’s no such site. Abnormal HTTP-statuses, such as 404 or 500 do not cause an error.

// We can see HTTP-status in response properties:

// status – HTTP status code, e.g. 200.
// ok – boolean, true if the HTTP status code is 200-299.
// For example:

// let response = await fetch(url);

// if (response.ok) { // if HTTP-status is 200-299
//   // get the response body (the method explained below)
//   let json = await response.json();
// } else {
//   console.log("HTTP-Error: " + response.status);
// }
// Second, to get the response body, we need to use an additional method call.

// Response provides multiple promise-based methods to access the body in various formats:

// response.text() – read the response and return as text,
// response.json() – parse the response as JSON,
// response.formData() – return the response as FormData object (explained in the next chapter),
// response.blob() – return the response as Blob (binary data with type),
// response.arrayBuffer() – return the response as ArrayBuffer (low-level representation of binary data),
// additionally, response.body is a ReadableStream object, it allows you to read the body chunk-by-chunk, we’ll see an example later.
// For instance, let’s get a JSON-object with latest commits from GitHub:

// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// let response = await fetch(url);

// let commits = await response.json(); // read response body and parse as JSON

// console.log(commits[0].author.login);
// Or, the same without await, using pure promises syntax:

// fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//   .then(response => response.json())
//   .then(commits => console.log(commits[0].author.login));
// To get the response text, await response.text() instead of .json():

// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// let text = await response.text(); // read response body as text

// console.log(text.slice(0, 80) + '...');
// As a show-case for reading in binary format, let’s fetch and show a logo image of “fetch” specification (see chapter Blob for details about operations on Blob):

// let response = await fetch('/article/fetch/logo-fetch.svg');

// let blob = await response.blob(); // download as Blob object

// // create <img> for it
// let img = document.createElement('img');
// img.style = 'position:fixed;top:10px;left:10px;width:100px';
// document.body.append(img);

// // show it
// img.src = URL.createObjectURL(blob);

// setTimeout(() => { // hide after three seconds
//   img.remove();
//   URL.revokeObjectURL(img.src);
// }, 3000);
// Important:
// We can choose only one body-reading method.

// If we’ve already got the response with response.text(), then response.json() won’t work, as the body content has already been processed.

// let text = await response.text(); // response body consumed
// let parsed = await response.json(); // fails (already consumed)
// Response headers
// The response headers are available in a Map-like headers object in response.headers.

// It’s not exactly a Map, but it has similar methods to get individual headers by name or iterate over them:

// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// // get one header
// console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8

// // iterate over all headers
// for (let [key, value] of response.headers) {
//   console.log(`${key} = ${value}`);
// }
// Request headers
// To set a request header in fetch, we can use the headers option. It has an object with outgoing headers, like this:

// let response = fetch(protectedUrl, {
//   headers: {
//     Authentication: 'secret'
//   }
// });
// …But there’s a list of forbidden HTTP headers that we can’t set:

// Accept-Charset, Accept-Encoding
// Access-Control-Request-Headers
// Access-Control-Request-Method
// Connection
// Content-Length
// Cookie, Cookie2
// Date
// DNT
// Expect
// Host
// Keep-Alive
// Origin
// Referer
// TE
// Trailer
// Transfer-Encoding
// Upgrade
// Via
// Proxy-*
// Sec-*
// These headers ensure proper and safe HTTP, so they are controlled exclusively by the browser.

// POST requests
// To make a POST request, or a request with another method, we need to use fetch options:

// method – HTTP-method, e.g. POST,
// body – the request body, one of:
// a string (e.g. JSON-encoded),
// FormData object, to submit the data as multipart/form-data,
// Blob/BufferSource to send binary data,
// URLSearchParams, to submit the data in x-www-form-urlencoded encoding, rarely used.
// The JSON format is used most of the time.

// For example, this code submits user object as JSON:

// let user = {
//   name: 'John',
//   surname: 'Smith'
// };

// let response = await fetch('/article/fetch/post/user', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user)
// });

// let result = await response.json();
// console.log(result.message);
// Please note, if the request body is a string, then Content-Type header is set to text/plain;charset=UTF-8 by default.

// But, as we’re going to send JSON, we use headers option to send application/json instead, the correct Content-Type for JSON-encoded data.

// Sending an image
// We can also submit binary data with fetch using Blob or BufferSource objects.

// In this example, there’s a <canvas> where we can draw by moving a mouse over it. A click on the “submit” button sends the image to the server:

// <body style="margin:0">
//   <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

//   <input type="button" value="Submit" onclick="submit()">

//   <script>
//     canvasElem.onmousemove = function(e) {
//       let ctx = canvasElem.getContext('2d');
//       ctx.lineTo(e.clientX, e.clientY);
//       ctx.stroke();
//     };

//     async function submit() {
//       let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
//       let response = await fetch('/article/fetch/post/image', {
//         method: 'POST',
//         body: blob
//       });

//       // the server responds with confirmation and the image size
//       let result = await response.json();
//       console.log(result.message);
//     }

//   </script>
// </body>

// Please note, here we don’t set Content-Type header manually, because a Blob object has a built-in type (here image/png, as generated by toBlob). For Blob objects that type becomes the value of Content-Type.

// The submit() function can be rewritten without async/await like this:

// function submit() {
//   canvasElem.toBlob(function(blob) {
//     fetch('/article/fetch/post/image', {
//       method: 'POST',
//       body: blob
//     })
//       .then(response => response.json())
//       .then(result => console.log(JSON.stringify(result, null, 2)))
//   }, 'image/png');
// }
// Summary
// A typical fetch request consists of two await calls:

// let response = await fetch(url, options); // resolves with response headers
// let result = await response.json(); // read body as json
// Or, without await:

// fetch(url, options)
//   .then(response => response.json())
//   .then(result => /* process result */)
// Response properties:

// response.status – HTTP code of the response,
// response.ok – true if the status is 200-299.
// response.headers – Map-like object with HTTP headers.
// Methods to get response body:

// response.text() – return the response as text,
// response.json() – parse the response as JSON object,
// response.formData() – return the response as FormData object (multipart/form-data encoding, see the next chapter),
// response.blob() – return the response as Blob (binary data with type),
// response.arrayBuffer() – return the response as ArrayBuffer (low-level binary data),
// Fetch options so far:

// method – HTTP-method,
// headers – an object with request headers (not any header is allowed),
// body – the data to send (request body) as string, FormData, BufferSource, Blob or UrlSearchParams object.
// In the next chapters we’ll see more options and use cases of fetch.
// ///////////////////////////////////////////////////////////////////

// // FormData
// FormData
// This chapter is about sending HTML forms: with or without files, with additional fields and so on.

// FormData objects can help with that. As you might have guessed, it’s the object to represent HTML form data.

// The constructor is:

// let formData = new FormData([form]);
// If HTML form element is provided, it automatically captures its fields.

// The special thing about FormData is that network methods, such as fetch, can accept a FormData object as a body. It’s encoded and sent out with Content-Type: multipart/form-data.

// From the server point of view, that looks like a usual form submission.

// Sending a simple form
// Let’s send a simple form first.

// As you can see, that’s almost one-liner:

// <form id="formElem">
//   <input type="text" name="name" value="John">
//   <input type="text" name="surname" value="Smith">
//   <input type="submit">
// </form>

// <script>
//   formElem.onsubmit = async (e) => {
//     e.preventDefault();

//     let response = await fetch('/article/formdata/post/user', {
//       method: 'POST',
//       body: new FormData(formElem)
//     });

//     let result = await response.json();

//     console.log(result.message);
//   };
// </script>

// In this example, the server code is not presented, as it’s beyond our scope. The server accepts the POST request and replies “User saved”.

// FormData Methods
// We can modify fields in FormData with methods:

// formData.append(name, value) – add a form field with the given name and value,
// formData.append(name, blob, fileName) – add a field as if it were <input type="file">, the third argument fileName sets file name (not form field name), as it were a name of the file in user’s filesystem,
// formData.delete(name) – remove the field with the given name,
// formData.get(name) – get the value of the field with the given name,
// formData.has(name) – if there exists a field with the given name, returns true, otherwise false
// A form is technically allowed to have many fields with the same name, so multiple calls to append add more same-named fields.

// There’s also method set, with the same syntax as append. The difference is that .set removes all fields with the given name, and then appends a new field. So it makes sure there’s only one field with such name, the rest is just like append:

// formData.set(name, value),
// formData.set(name, blob, fileName).
// Also we can iterate over formData fields using for..of loop:

// let formData = new FormData();
// formData.append('key1', 'value1');
// formData.append('key2', 'value2');

// // List key/value pairs
// for(let [name, value] of formData) {
//   console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
// }
// Sending a form with a file
// The form is always sent as Content-Type: multipart/form-data, this encoding allows to send files. So, <input type="file"> fields are sent also, similar to a usual form submission.

// Here’s an example with such form:

// <form id="formElem">
//   <input type="text" name="firstName" value="John">
//   Picture: <input type="file" name="picture" accept="image/*">
//   <input type="submit">
// </form>

// <script>
//   formElem.onsubmit = async (e) => {
//     e.preventDefault();

//     let response = await fetch('/article/formdata/post/user-avatar', {
//       method: 'POST',
//       body: new FormData(formElem)
//     });

//     let result = await response.json();

//     console.log(result.message);
//   };
// </script>

// Sending a form with Blob data
// As we’ve seen in the chapter Fetch, it’s easy to send dynamically generated binary data e.g. an image, as Blob. We can supply it directly as fetch parameter body.

// In practice though, it’s often convenient to send an image not separately, but as a part of the form, with additional fields, such as “name” and other metadata.

// Also, servers are usually more suited to accept multipart-encoded forms, rather than raw binary data.

// This example submits an image from <canvas>, along with some other fields, as a form, using FormData:

// <body style="margin:0">
//   <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

//   <input type="button" value="Submit" onclick="submit()">

//   <script>
//     canvasElem.onmousemove = function(e) {
//       let ctx = canvasElem.getContext('2d');
//       ctx.lineTo(e.clientX, e.clientY);
//       ctx.stroke();
//     };

//     async function submit() {
//       let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

//       let formData = new FormData();
//       formData.append("firstName", "John");
//       formData.append("image", imageBlob, "image.png");

//       let response = await fetch('/article/formdata/post/image-form', {
//         method: 'POST',
//         body: formData
//       });
//       let result = await response.json();
//       console.log(result.message);
//     }

//   </script>
// </body>

// Please note how the image Blob is added:

// formData.append("image", imageBlob, "image.png");
// That’s same as if there were <input type="file" name="image"> in the form, and the visitor submitted a file named "image.png" (3rd argument) with the data imageBlob (2nd argument) from their filesystem.

// The server reads form data and the file, as if it were a regular form submission.

// Summary
// FormData objects are used to capture HTML form and submit it using fetch or another network method.

// We can either create new FormData(form) from an HTML form, or create an object without a form at all, and then append fields with methods:

// formData.append(name, value)
// formData.append(name, blob, fileName)
// formData.set(name, value)
// formData.set(name, blob, fileName)
// Let’s note two peculiarities here:

// The set method removes fields with the same name, append doesn’t. That’s the only difference between them.
// To send a file, 3-argument syntax is needed, the last argument is a file name, that normally is taken from user filesystem for <input type="file">.
// Other methods are:

// formData.delete(name)
// formData.get(name)
// formData.has(name)
// That’s it!
// ///////////////////////////////////////////////////////////////////

// // Fetch: Download progress
// Fetch: Download progress
// The fetch method allows to track download progress.

// Please note: there’s currently no way for fetch to track upload progress. For that purpose, please use XMLHttpRequest, we’ll cover it later.

// To track download progress, we can use response.body property. It’s a ReadableStream – a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the Streams API specification.

// Unlike response.text(), response.json() and other methods, response.body gives full control over the reading process, and we can count how much is consumed at any moment.

// Here’s the sketch of code that reads the response from response.body:

// // instead of response.json() and other methods
// const reader = response.body.getReader();

// // infinite loop while the body is downloading
// while(true) {
//   // done is true for the last chunk
//   // value is Uint8Array of the chunk bytes
//   const {done, value} = await reader.read();

//   if (done) {
//     break;
//   }

//   console.log(`Received ${value.length} bytes`)
// }
// The result of await reader.read() call is an object with two properties:

// done – true when the reading is complete, otherwise false.
// value – a typed array of bytes: Uint8Array.
// Please note:
// Streams API also describes asynchronous iteration over ReadableStream with for await..of loop, but it’s not yet widely supported (see browser issues), so we use while loop.

// We receive response chunks in the loop, until the loading finishes, that is: until done becomes true.

// To log the progress, we just need for every received fragment value to add its length to the counter.

// Here’s the full working example that gets the response and logs the progress in console, more explanations to follow:

// // Step 1: start the fetch and obtain a reader
// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

// const reader = response.body.getReader();

// // Step 2: get total length
// const contentLength = +response.headers.get('Content-Length');

// // Step 3: read the data
// let receivedLength = 0; // received that many bytes at the moment
// let chunks = []; // array of received binary chunks (comprises the body)
// while(true) {
//   const {done, value} = await reader.read();

//   if (done) {
//     break;
//   }

//   chunks.push(value);
//   receivedLength += value.length;

//   console.log(`Received ${receivedLength} of ${contentLength}`)
// }

// // Step 4: concatenate chunks into single Uint8Array
// let chunksAll = new Uint8Array(receivedLength); // (4.1)
// let position = 0;
// for(let chunk of chunks) {
//   chunksAll.set(chunk, position); // (4.2)
//   position += chunk.length;
// }

// // Step 5: decode into a string
// let result = new TextDecoder("utf-8").decode(chunksAll);

// // We're done!
// let commits = JSON.parse(result);
// console.log(commits[0].author.login);
// Let’s explain that step-by-step:

// We perform fetch as usual, but instead of calling response.json(), we obtain a stream reader response.body.getReader().

// Please note, we can’t use both these methods to read the same response: either use a reader or a response method to get the result.

// Prior to reading, we can figure out the full response length from the Content-Length header.

// It may be absent for cross-origin requests (see chapter Fetch: Cross-Origin Requests) and, well, technically a server doesn’t have to set it. But usually it’s at place.

// Call await reader.read() until it’s done.

// We gather response chunks in the array chunks. That’s important, because after the response is consumed, we won’t be able to “re-read” it using response.json() or another way (you can try, there’ll be an error).

// At the end, we have chunks – an array of Uint8Array byte chunks. We need to join them into a single result. Unfortunately, there’s no single method that concatenates those, so there’s some code to do that:

// We create chunksAll = new Uint8Array(receivedLength) – a same-typed array with the combined length.
// Then use .set(chunk, position) method to copy each chunk one after another in it.
// We have the result in chunksAll. It’s a byte array though, not a string.

// To create a string, we need to interpret these bytes. The built-in TextDecoder does exactly that. Then we can JSON.parse it, if necessary.

// What if we need binary content instead of a string? That’s even simpler. Replace steps 4 and 5 with a single line that creates a Blob from all chunks:

// let blob = new Blob(chunks);
// At the end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.

// Once again, please note, that’s not for upload progress (no way now with fetch), only for download progress.

// Also, if the size is unknown, we should check receivedLength in the loop and break it once it reaches a certain limit. So that the chunks won’t overflow the memory.
// ///////////////////////////////////////////////////////////////////

// // Fetch: Abort

// Fetch: Abort
// As we know, fetch returns a promise. And JavaScript generally has no concept of “aborting” a promise. So how can we cancel an ongoing fetch? E.g. if the user actions on our site indicate that the fetch isn’t needed any more.

// There’s a special built-in object for such purposes: AbortController. It can be used to abort not only fetch, but other asynchronous tasks as well.

// The usage is very straightforward:

// The AbortController object
// Create a controller:

// let controller = new AbortController();
// A controller is an extremely simple object.

// It has a single method abort(),
// And a single property signal that allows to set event listeners on it.
// When abort() is called:

// controller.signal emits the "abort" event.
// controller.signal.aborted property becomes true.
// Generally, we have two parties in the process:

// The one that performs a cancelable operation, it sets a listener on controller.signal.
// The one that cancels: it calls controller.abort() when needed.
// Here’s the full example (without fetch yet):

// let controller = new AbortController();
// let signal = controller.signal;

// // The party that performs a cancelable operation
// // gets the "signal" object
// // and sets the listener to trigger when controller.abort() is called
// signal.addEventListener('abort', () => console.log("abort!"));

// // The other party, that cancels (at any point later):
// controller.abort(); // abort!

// // The event triggers and signal.aborted becomes true
// console.log(signal.aborted); // true
// As we can see, AbortController is just a mean to pass abort events when abort() is called on it.

// We could implement the same kind of event listening in our code on our own, without the AbortController object.

// But what’s valuable is that fetch knows how to work with the AbortController object. It’s integrated in it.

// Using with fetch
// To be able to cancel fetch, pass the signal property of an AbortController as a fetch option:

// let controller = new AbortController();
// fetch(url, {
//   signal: controller.signal
// });
// The fetch method knows how to work with AbortController. It will listen to abort events on signal.

// Now, to abort, call controller.abort():

// controller.abort();
// We’re done: fetch gets the event from signal and aborts the request.

// When a fetch is aborted, its promise rejects with an error AbortError, so we should handle it, e.g. in try..catch.

// Here’s the full example with fetch aborted after 1 second:

// // abort in 1 second
// let controller = new AbortController();
// setTimeout(() => controller.abort(), 1000);

// try {
//   let response = await fetch('/article/fetch-abort/demo/hang', {
//     signal: controller.signal
//   });
// } catch(err) {
//   if (err.name == 'AbortError') { // handle abort()
//     console.log("Aborted!");
//   } else {
//     throw err;
//   }
// }
// AbortController is scalable
// AbortController is scalable. It allows to cancel multiple fetches at once.

// Here’s a sketch of code that fetches many urls in parallel, and uses a single controller to abort them all:

// let urls = [...]; // a list of urls to fetch in parallel

// let controller = new AbortController();

// // an array of fetch promises
// let fetchJobs = urls.map(url => fetch(url, {
//   signal: controller.signal
// }));

// let results = await Promise.all(fetchJobs);

// // if controller.abort() is called from anywhere,
// // it aborts all fetches
// If we have our own asynchronous tasks, different from fetch, we can use a single AbortController to stop those, together with fetches.

// We just need to listen to its abort event in our tasks:

// let urls = [...];
// let controller = new AbortController();

// let ourJob = new Promise((resolve, reject) => { // our task
//   ...
//   controller.signal.addEventListener('abort', reject);
// });

// let fetchJobs = urls.map(url => fetch(url, { // fetches
//   signal: controller.signal
// }));

// // Wait for fetches and our task in parallel
// let results = await Promise.all([...fetchJobs, ourJob]);

// // if controller.abort() is called from anywhere,
// // it aborts all fetches and ourJob
// Summary
// AbortController is a simple object that generates an abort event on its signal property when the abort() method is called (and also sets signal.aborted to true).
// fetch integrates with it: we pass the signal property as the option, and then fetch listens to it, so it’s possible to abort the fetch.
// We can use AbortController in our code. The "call abort()" → “listen to abort event” interaction is simple and universal. We can use it even without fetch.
// ///////////////////////////////////////////////////////////////////

// // Fetch: Cross-Origin Requests
// Fetch: Cross-Origin Requests
// If we send a fetch request to another web-site, it will probably fail.

// For instance, let’s try fetching http://example.com:

// try {
//   await fetch('http://example.com');
// } catch(err) {
//   console.log(err); // Failed to fetch
// }
// Fetch fails, as expected.

// The core concept here is origin – a domain/port/protocol triplet.

// Cross-origin requests – those sent to another domain (even a subdomain) or protocol or port – require special headers from the remote side.

// That policy is called “CORS”: Cross-Origin Resource Sharing.

// Why is CORS needed? A brief history
// CORS exists to protect the internet from evil hackers.

// Seriously. Let’s make a very brief historical digression.

// For many years a script from one site could not access the content of another site.

// That simple, yet powerful rule was a foundation of the internet security. E.g. an evil script from website hacker.com could not access the user’s mailbox at website gmail.com. People felt safe.

// JavaScript also did not have any special methods to perform network requests at that time. It was a toy language to decorate a web page.

// But web developers demanded more power. A variety of tricks were invented to work around the limitation and make requests to other websites.

// Using forms
// One way to communicate with another server was to submit a <form> there. People submitted it into <iframe>, just to stay on the current page, like this:

// <!-- form target -->
// <iframe name="iframe"></iframe>

// <!-- a form could be dynamically generated and submited by JavaScript -->
// <form target="iframe" method="POST" action="http://another.com/…">
//   ...
// </form>
// So, it was possible to make a GET/POST request to another site, even without networking methods, as forms can send data anywhere. But as it’s forbidden to access the content of an <iframe> from another site, it wasn’t possible to read the response.

// To be precise, there were actually tricks for that, they required special scripts at both the iframe and the page. So the communication with the iframe was technically possible. Right now there’s no point to go into details, let these dinosaurs rest in peace.

// Using scripts
// Another trick was to use a script tag. A script could have any src, with any domain, like <script src="http://another.com/…">. It’s possible to execute a script from any website.

// If a website, e.g. another.com intended to expose data for this kind of access, then a so-called “JSONP (JSON with padding)” protocol was used.

// Here’s how it worked.

// Let’s say we, at our site, need to get the data from http://another.com, such as the weather:

// First, in advance, we declare a global function to accept the data, e.g. gotWeather.

// // 1. Declare the function to process the weather data
// function gotWeather({ temperature, humidity }) {
//   console.log(`temperature: ${temperature}, humidity: ${humidity}`);
// }
// Then we make a <script> tag with src="http://another.com/weather.json?callback=gotWeather", using the name of our function as the callback URL-parameter.

// let script = document.createElement('script');
// script.src = `http://another.com/weather.json?callback=gotWeather`;
// document.body.append(script);
// The remote server another.com dynamically generates a script that calls gotWeather(...) with the data it wants us to receive.

// // The expected answer from the server looks like this:
// gotWeather({
//   temperature: 25,
//   humidity: 78
// });
// When the remote script loads and executes, gotWeather runs, and, as it’s our function, we have the data.

// That works, and doesn’t violate security, because both sides agreed to pass the data this way. And, when both sides agree, it’s definitely not a hack. There are still services that provide such access, as it works even for very old browsers.

// After a while, networking methods appeared in browser JavaScript.

// At first, cross-origin requests were forbidden. But as a result of long discussions, cross-origin requests were allowed, but with any new capabilities requiring an explicit allowance by the server, expressed in special headers.

// Safe requests
// There are two types of cross-origin requests:

// Safe requests.
// All the others.
// Safe Requests are simpler to make, so let’s start with them.

// A request is safe if it satisfies two conditions:

// Safe method: GET, POST or HEAD
// Safe headers – the only allowed custom headers are:
// Accept,
// Accept-Language,
// Content-Language,
// Content-Type with the value application/x-www-form-urlencoded, multipart/form-data or text/plain.
// Any other request is considered “unsafe”. For instance, a request with PUT method or with an API-Key HTTP-header does not fit the limitations.

// The essential difference is that a safe request can be made with a <form> or a <script>, without any special methods.

// So, even a very old server should be ready to accept a safe request.

// Contrary to that, requests with non-standard headers or e.g. method DELETE can’t be created this way. For a long time JavaScript was unable to do such requests. So an old server may assume that such requests come from a privileged source, “because a webpage is unable to send them”.

// When we try to make a unsafe request, the browser sends a special “preflight” request that asks the server – does it agree to accept such cross-origin requests, or not?

// And, unless the server explicitly confirms that with headers, an unsafe request is not sent.

// Now we’ll go into details.

// CORS for safe requests
// If a request is cross-origin, the browser always adds the Origin header to it.

// For instance, if we request https://anywhere.com/request from https://javascript.info/page, the headers will look like:

// GET /request
// Host: anywhere.com
// Origin: https://javascript.info
// ...
// As you can see, the Origin header contains exactly the origin (domain/protocol/port), without a path.

// The server can inspect the Origin and, if it agrees to accept such a request, add a special header Access-Control-Allow-Origin to the response. That header should contain the allowed origin (in our case https://javascript.info), or a star *. Then the response is successful, otherwise it’s an error.

// The browser plays the role of a trusted mediator here:

// It ensures that the correct Origin is sent with a cross-origin request.
// It checks for permitting Access-Control-Allow-Origin in the response, if it exists, then JavaScript is allowed to access the response, otherwise it fails with an error.

// Here’s an example of a permissive server response:

// 200 OK
// Content-Type:text/html; charset=UTF-8
// Access-Control-Allow-Origin: https://javascript.info
// Response headers
// For cross-origin request, by default JavaScript may only access so-called “safe” response headers:

// Cache-Control
// Content-Language
// Content-Type
// Expires
// Last-Modified
// Pragma
// Accessing any other response header causes an error.

// Please note:
// There’s no Content-Length header in the list!

// This header contains the full response length. So, if we’re downloading something and would like to track the percentage of progress, then an additional permission is required to access that header (see below).

// To grant JavaScript access to any other response header, the server must send the Access-Control-Expose-Headers header. It contains a comma-separated list of unsafe header names that should be made accessible.

// For example:

// 200 OK
// Content-Type:text/html; charset=UTF-8
// Content-Length: 12345
// API-Key: 2c9de507f2c54aa1
// Access-Control-Allow-Origin: https://javascript.info
// Access-Control-Expose-Headers: Content-Length,API-Key
// With such an Access-Control-Expose-Headers header, the script is allowed to read the Content-Length and API-Key headers of the response.

// “Unsafe” requests
// We can use any HTTP-method: not just GET/POST, but also PATCH, DELETE and others.

// Some time ago no one could even imagine that a webpage could make such requests. So there may still exist webservices that treat a non-standard method as a signal: “That’s not a browser”. They can take it into account when checking access rights.

// So, to avoid misunderstandings, any “unsafe” request – that couldn’t be done in the old times, the browser does not make such requests right away. First, it sends a preliminary, so-called “preflight” request, to ask for permission.

// A preflight request uses the method OPTIONS, no body and three headers:

// Access-Control-Request-Method header has the method of the unsafe request.
// Access-Control-Request-Headers header provides a comma-separated list of its unsafe HTTP-headers.
// Origin header tells from where the request came. (such as https://javascript.info)
// If the server agrees to serve the requests, then it should respond with empty body, status 200 and headers:

// Access-Control-Allow-Origin must be either * or the requesting origin, such as https://javascript.info, to allow it.
// Access-Control-Allow-Methods must have the allowed method.
// Access-Control-Allow-Headers must have a list of allowed headers.
// Additionally, the header Access-Control-Max-Age may specify a number of seconds to cache the permissions. So the browser won’t have to send a preflight for subsequent requests that satisfy given permissions.

// Let’s see how it works step-by-step on the example of a cross-origin PATCH request (this method is often used to update data):

// let response = await fetch('https://site.com/service.json', {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//     'API-Key': 'secret'
//   }
// });
// There are three reasons why the request is unsafe (one is enough):

// Method PATCH
// Content-Type is not one of: application/x-www-form-urlencoded, multipart/form-data, text/plain.
// “Unsafe” API-Key header.
// Step 1 (preflight request)
// Prior to sending such a request, the browser, on its own, sends a preflight request that looks like this:

// OPTIONS /service.json
// Host: site.com
// Origin: https://javascript.info
// Access-Control-Request-Method: PATCH
// Access-Control-Request-Headers: Content-Type,API-Key
// Method: OPTIONS.
// The path – exactly the same as the main request: /service.json.
// Cross-origin special headers:
// Origin – the source origin.
// Access-Control-Request-Method – requested method.
// Access-Control-Request-Headers – a comma-separated list of “unsafe” headers.
// Step 2 (preflight response)
// The server should respond with status 200 and the headers:

// Access-Control-Allow-Origin: https://javascript.info
// Access-Control-Allow-Methods: PATCH
// Access-Control-Allow-Headers: Content-Type,API-Key.
// That allows future communication, otherwise an error is triggered.

// If the server expects other methods and headers in the future, it makes sense to allow them in advance by adding them to the list.

// For example, this response also allows PUT, DELETE and additional headers:

// 200 OK
// Access-Control-Allow-Origin: https://javascript.info
// Access-Control-Allow-Methods: PUT,PATCH,DELETE
// Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
// Access-Control-Max-Age: 86400
// Now the browser can see that PATCH is in Access-Control-Allow-Methods and Content-Type,API-Key are in the list Access-Control-Allow-Headers, so it sends out the main request.

// If there’s the header Access-Control-Max-Age with a number of seconds, then the preflight permissions are cached for the given time. The response above will be cached for 86400 seconds (one day). Within this timeframe, subsequent requests will not cause a preflight. Assuming that they fit the cached allowances, they will be sent directly.

// Step 3 (actual request)
// When the preflight is successful, the browser now makes the main request. The process here is the same as for safe requests.

// The main request has the Origin header (because it’s cross-origin):

// PATCH /service.json
// Host: site.com
// Content-Type: application/json
// API-Key: secret
// Origin: https://javascript.info
// Step 4 (actual response)
// The server should not forget to add Access-Control-Allow-Origin to the main response. A successful preflight does not relieve from that:

// Access-Control-Allow-Origin: https://javascript.info
// Then JavaScript is able to read the main server response.

// Please note:
// Preflight request occurs “behind the scenes”, it’s invisible to JavaScript.

// JavaScript only gets the response to the main request or an error if there’s no server permission.

// Credentials
// A cross-origin request initiated by JavaScript code by default does not bring any credentials (cookies or HTTP authentication).

// That’s uncommon for HTTP-requests. Usually, a request to http://site.com is accompanied by all cookies from that domain. Cross-origin requests made by JavaScript methods on the other hand are an exception.

// For example, fetch('http://another.com') does not send any cookies, even those (!) that belong to another.com domain.

// Why?

// That’s because a request with credentials is much more powerful than without them. If allowed, it grants JavaScript the full power to act on behalf of the user and access sensitive information using their credentials.

// Does the server really trust the script that much? Then it must explicitly allow requests with credentials with an additional header.

// To send credentials in fetch, we need to add the option credentials: "include", like this:

// fetch('http://another.com', {
//   credentials: "include"
// });
// Now fetch sends cookies originating from another.com with request to that site.

// If the server agrees to accept the request with credentials, it should add a header Access-Control-Allow-Credentials: true to the response, in addition to Access-Control-Allow-Origin.

// For example:

// 200 OK
// Access-Control-Allow-Origin: https://javascript.info
// Access-Control-Allow-Credentials: true
// Please note: Access-Control-Allow-Origin is prohibited from using a star * for requests with credentials. Like shown above, it must provide the exact origin there. That’s an additional safety measure, to ensure that the server really knows who it trusts to make such requests.

// Summary
// From the browser point of view, there are two kinds of cross-origin requests: “safe” and all the others.

// “Safe” requests must satisfy the following conditions:

// Method: GET, POST or HEAD.
// Headers – we can set only:
// Accept
// Accept-Language
// Content-Language
// Content-Type to the value application/x-www-form-urlencoded, multipart/form-data or text/plain.
// The essential difference is that safe requests were doable since ancient times using <form> or <script> tags, while unsafe were impossible for browsers for a long time.

// So, the practical difference is that safe requests are sent right away, with the Origin header, while for the other ones the browser makes a preliminary “preflight” request, asking for permission.

// For safe requests:

// → The browser sends the Origin header with the origin.
// ← For requests without credentials (not sent by default), the server should set:
// Access-Control-Allow-Origin to * or same value as Origin
// ← For requests with credentials, the server should set:
// Access-Control-Allow-Origin to same value as Origin
// Access-Control-Allow-Credentials to true
// Additionally, to grant JavaScript access to any response headers except Cache-Control, Content-Language, Content-Type, Expires, Last-Modified or Pragma, the server should list the allowed ones in Access-Control-Expose-Headers header.

// For unsafe requests, a preliminary “preflight” request is issued before the requested one:

// → The browser sends an OPTIONS request to the same URL, with the headers:
// Access-Control-Request-Method has requested method.
// Access-Control-Request-Headers lists unsafe requested headers.
// ← The server should respond with status 200 and the headers:
// Access-Control-Allow-Methods with a list of allowed methods,
// Access-Control-Allow-Headers with a list of allowed headers,
// Access-Control-Max-Age with a number of seconds to cache the permissions.
// Then the actual request is sent, and the previous “safe” scheme is applied.
// ///////////////////////////////////////////////////////////////////

// // Fetch API
// Fetch API
// So far, we know quite a bit about fetch.

// Let’s see the rest of API, to cover all its abilities.

// Please note:
// Please note: most of these options are used rarely. You may skip this chapter and still use fetch well.

// Still, it’s good to know what fetch can do, so if the need arises, you can return and read the details.

// Here’s the full list of all possible fetch options with their default values (alternatives in comments):

// let promise = fetch(url, {
//   method: "GET", // POST, PUT, DELETE, etc.
//   headers: {
//     // the content type header value is usually auto-set
//     // depending on the request body
//     "Content-Type": "text/plain;charset=UTF-8"
//   },
//   body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
//   referrer: "about:client", // or "" to send no Referer header,
//   // or an url from the current origin
//   referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
//   mode: "cors", // same-origin, no-cors
//   credentials: "same-origin", // omit, include
//   cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
//   redirect: "follow", // manual, error
//   integrity: "", // a hash, like "sha256-abcdef1234567890"
//   keepalive: false, // true
//   signal: undefined, // AbortController to abort request
//   window: window // null
// });
// An impressive list, right?

// We fully covered method, headers and body in the chapter Fetch.

// The signal option is covered in Fetch: Abort.

// Now let’s explore the remaining capabilities.

// referrer, referrerPolicy
// These options govern how fetch sets the HTTP Referer header.

// Usually that header is set automatically and contains the url of the page that made the request. In most scenarios, it’s not important at all, sometimes, for security purposes, it makes sense to remove or shorten it.

// The referrer option allows to set any Referer (within the current origin) or remove it.

// To send no referrer, set an empty string:

// fetch('/page', {
//   referrer: "" // no Referer header
// });
// To set another url within the current origin:

// fetch('/page', {
//   // assuming we're on https://javascript.info
//   // we can set any Referer header, but only within the current origin
//   referrer: "https://javascript.info/anotherpage"
// });
// The referrerPolicy option sets general rules for Referer.

// Requests are split into 3 types:

// Request to the same origin.
// Request to another origin.
// Request from HTTPS to HTTP (from safe to unsafe protocol).
// Unlike the referrer option that allows to set the exact Referer value, referrerPolicy tells the browser general rules for each request type.

// Possible values are described in the Referrer Policy specification:

// "no-referrer-when-downgrade" – the default value: full Referer is always sent, unless we send a request from HTTPS to HTTP (to the less secure protocol).
// "no-referrer" – never send Referer.
// "origin" – only send the origin in Referer, not the full page URL, e.g. only http://site.com instead of http://site.com/path.
// "origin-when-cross-origin" – send the full Referer to the same origin, but only the origin part for cross-origin requests (as above).
// "same-origin" – send the full Referer to the same origin, but no Referer for cross-origin requests.
// "strict-origin" – send only the origin, not the Referer for HTTPS→HTTP requests.
// "strict-origin-when-cross-origin" – for same-origin send the full Referer, for cross-origin send only the origin, unless it’s HTTPS→HTTP request, then send nothing.
// "unsafe-url" – always send the full url in Referer, even for HTTPS→HTTP requests.
// Here’s a table with all combinations:

// Value	To same origin	To another origin	HTTPS→HTTP
// "no-referrer"	-	-	-
// "no-referrer-when-downgrade" or "" (default)	full	full	-
// "origin"	origin	origin	origin
// "origin-when-cross-origin"	full	origin	origin
// "same-origin"	full	-	-
// "strict-origin"	origin	origin	-
// "strict-origin-when-cross-origin"	full	origin	-
// "unsafe-url"	full	full	full
// Let’s say we have an admin zone with a URL structure that shouldn’t be known from outside of the site.

// If we send a fetch, then by default it always sends the Referer header with the full url of our page (except when we request from HTTPS to HTTP, then no Referer).

// E.g. Referer: https://javascript.info/admin/secret/paths.

// If we’d like other websites know only the origin part, not the URL-path, we can set the option:

// fetch('https://another.com/page', {
//   // ...
//   referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
// });
// We can put it to all fetch calls, maybe integrate into JavaScript library of our project that does all requests and uses fetch inside.

// Its only difference compared to the default behavior is that for requests to another origin fetch sends only the origin part of the URL (e.g. https://javascript.info, without path). For requests to our origin we still get the full Referer (maybe useful for debugging purposes).

// Referrer policy is not only for fetch
// Referrer policy, described in the specification, is not just for fetch, but more global.

// In particular, it’s possible to set the default policy for the whole page using the Referrer-Policy HTTP header, or per-link, with <a rel="noreferrer">.

// mode
// The mode option is a safe-guard that prevents occasional cross-origin requests:

// "cors" – the default, cross-origin requests are allowed, as described in Fetch: Cross-Origin Requests,
// "same-origin" – cross-origin requests are forbidden,
// "no-cors" – only safe cross-origin requests are allowed.
// This option may be useful when the URL for fetch comes from a 3rd-party, and we want a “power off switch” to limit cross-origin capabilities.

// credentials
// The credentials option specifies whether fetch should send cookies and HTTP-Authorization headers with the request.

// "same-origin" – the default, don’t send for cross-origin requests,
// "include" – always send, requires Access-Control-Allow-Credentials from cross-origin server in order for JavaScript to access the response, that was covered in the chapter Fetch: Cross-Origin Requests,
// "omit" – never send, even for same-origin requests.
// cache
// By default, fetch requests make use of standard HTTP-caching. That is, it respects the Expires and Cache-Control headers, sends If-Modified-Since and so on. Just like regular HTTP-requests do.

// The cache options allows to ignore HTTP-cache or fine-tune its usage:

// "default" – fetch uses standard HTTP-cache rules and headers,
// "no-store" – totally ignore HTTP-cache, this mode becomes the default if we set a header If-Modified-Since, If-None-Match, If-Unmodified-Since, If-Match, or If-Range,
// "reload" – don’t take the result from HTTP-cache (if any), but populate the cache with the response (if the response headers permit this action),
// "no-cache" – create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
// "force-cache" – use a response from HTTP-cache, even if it’s stale. If there’s no response in HTTP-cache, make a regular HTTP-request, behave normally,
// "only-if-cached" – use a response from HTTP-cache, even if it’s stale. If there’s no response in HTTP-cache, then error. Only works when mode is "same-origin".
// redirect
// Normally, fetch transparently follows HTTP-redirects, like 301, 302 etc.

// The redirect option allows to change that:

// "follow" – the default, follow HTTP-redirects,
// "error" – error in case of HTTP-redirect,
// "manual" – allows to process HTTP-redirects manually. In case of redirect, we’ll get a special response object, with response.type="opaqueredirect" and zeroed/empty status and most other properies.
// integrity
// The integrity option allows to check if the response matches the known-ahead checksum.

// As described in the specification, supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on the browser.

// For example, we’re downloading a file, and we know that its SHA-256 checksum is “abcdef” (a real checksum is longer, of course).

// We can put it in the integrity option, like this:

// fetch('http://site.com/file', {
//   integrity: 'sha256-abcdef'
// });
// Then fetch will calculate SHA-256 on its own and compare it with our string. In case of a mismatch, an error is triggered.

// keepalive
// The keepalive option indicates that the request may “outlive” the webpage that initiated it.

// For example, we gather statistics on how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve the user experience.

// When the visitor leaves our page – we’d like to save the data to our server.

// We can use the window.onunload event for that:

// window.onunload = function() {
//   fetch('/analytics', {
//     method: 'POST',
//     body: "statistics",
//     keepalive: true
//   });
// };
// Normally, when a document is unloaded, all associated network requests are aborted. But the keepalive option tells the browser to perform the request in the background, even after it leaves the page. So this option is essential for our request to succeed.

// It has a few limitations:

// We can’t send megabytes: the body limit for keepalive requests is 64KB.
// If we need to gather a lot of statistics about the visit, we should send it out regularly in packets, so that there won’t be a lot left for the last onunload request.
// This limit applies to all keepalive requests together. In other words, we can perform multiple keepalive requests in parallel, but the sum of their body lengths should not exceed 64KB.
// We can’t handle the server response if the document is unloaded. So in our example fetch will succeed due to keepalive, but subsequent functions won’t work.
// In most cases, such as sending out statistics, it’s not a problem, as the server just accepts the data and usually sends an empty response to such requests.
// ///////////////////////////////////////////////////////////////////

// // URL objects
// URL objects
// The built-in URL class provides a convenient interface for creating and parsing URLs.

// There are no networking methods that require exactly a URL object, strings are good enough. So technically we don’t have to use URL. But sometimes it can be really helpful.

// Creating a URL
// The syntax to create a new URL object:

// new URL(url, [base])
// url – the full URL or only path (if base is set, see below),
// base – an optional base URL: if set and url argument has only path, then the URL is generated relative to base.
// For example:

// let url = new URL('https://javascript.info/profile/admin');
// These two URLs are same:

// let url1 = new URL('https://javascript.info/profile/admin');
// let url2 = new URL('/profile/admin', 'https://javascript.info');

// console.log(url1); // https://javascript.info/profile/admin
// console.log(url2); // https://javascript.info/profile/admin
// We can easily create a new URL based on the path relative to an existing URL:

// let url = new URL('https://javascript.info/profile/admin');
// let newUrl = new URL('tester', url);

// console.log(newUrl); // https://javascript.info/profile/tester
// The URL object immediately allows us to access its components, so it’s a nice way to parse the url, e.g.:

// let url = new URL('https://javascript.info/url');

// console.log(url.protocol); // https:
// console.log(url.host);     // javascript.info
// console.log(url.pathname); // /url
// Here’s the cheatsheet for URL components:

// href is the full url, same as url.toString()
// protocol ends with the colon character :
// search – a string of parameters, starts with the question mark ?
// hash starts with the hash character #
// there may be also user and password properties if HTTP authentication is present: http://login:password@site.com (not painted above, rarely used).
// We can pass URL objects to networking (and most other) methods instead of a string
// We can use a URL object in fetch or XMLHttpRequest, almost everywhere where a URL-string is expected.

// Generally, the URL object can be passed to any method instead of a string, as most methods will perform the string conversion, that turns a URL object into a string with full URL.

// SearchParams “?…”
// Let’s say we want to create a url with given search params, for instance, https://google.com/search?query=JavaScript.

// We can provide them in the URL string:

// new URL('https://google.com/search?query=JavaScript')
// …But parameters need to be encoded if they contain spaces, non-latin letters, etc (more about that below).

// So there’s a URL property for that: url.searchParams, an object of type URLSearchParams.

// It provides convenient methods for search parameters:

// append(name, value) – add the parameter by name,
// delete(name) – remove the parameter by name,
// get(name) – get the parameter by name,
// getAll(name) – get all parameters with the same name (that’s possible, e.g. ?user=John&user=Pete),
// has(name) – check for the existence of the parameter by name,
// set(name, value) – set/replace the parameter,
// sort() – sort parameters by name, rarely needed,
// …and it’s also iterable, similar to Map.
// An example with parameters that contain spaces and punctuation marks:

// let url = new URL('https://google.com/search');

// url.searchParams.set('q', 'test me!'); // added parameter with a space and !

// console.log(url); // https://google.com/search?q=test+me%21

// url.searchParams.set('tbs', 'qdr:y'); // added parameter with a colon :

// // parameters are automatically encoded
// console.log(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// // iterate over search parameters (decoded)
// for(let [name, value] of url.searchParams) {
//   console.log(`${name}=${value}`); // q=test me!, then tbs=qdr:y
// }
// Encoding
// There’s a standard RFC3986 that defines which characters are allowed in URLs and which are not.

// Those that are not allowed, must be encoded, for instance non-latin letters and spaces – replaced with their UTF-8 codes, prefixed by %, such as %20 (a space can be encoded by +, for historical reasons, but that’s an exception).

// The good news is that URL objects handle all that automatically. We just supply all parameters unencoded, and then convert the URL to string:

// // using some cyrillic characters for this example

// let url = new URL('https://ru.wikipedia.org/wiki/Тест');

// url.searchParams.set('key', 'ъ');
// console.log(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
// As you can see, both Тест in the url path and ъ in the parameter are encoded.

// The URL became longer, because each cyrillic letter is represented with two bytes in UTF-8, so there are two %.. entities.

// Encoding strings
// In old times, before URL objects appeared, people used strings for URLs.

// As of now, URL objects are often more convenient, but strings can still be used as well. In many cases using a string makes the code shorter.

// If we use a string though, we need to encode/decode special characters manually.

// There are built-in functions for that:

// encodeURI – encodes URL as a whole.
// decodeURI – decodes it back.
// encodeURIComponent – encodes a URL component, such as a search parameter, or a hash, or a pathname.
// decodeURIComponent – decodes it back.
// A natural question is: “What’s the difference between encodeURIComponent and encodeURI? When we should use either?”

// That’s easy to understand if we look at the URL, that’s split into components in the picture above:

// https://site.com:8080/path/page?p1=v1&p2=v2#hash
// As we can see, characters such as :, ?, =, &, # are allowed in URL.

// …On the other hand, if we look at a single URL component, such as a search parameter, these characters must be encoded, not to break the formatting.

// encodeURI encodes only characters that are totally forbidden in URL.
// encodeURIComponent encodes same characters, and, in addition to them, characters #, $, &, +, ,, /, :, ;, =, ? and @.
// So, for a whole URL we can use encodeURI:

// // using cyrillic characters in url path
// let url = encodeURI('http://site.com/привет');

// console.log(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
// …While for URL parameters we should use encodeURIComponent instead:

// let music = encodeURIComponent('Rock&Roll');

// let url = `https://google.com/search?q=${music}`;
// console.log(url); // https://google.com/search?q=Rock%26Roll
// Compare it with encodeURI:

// let music = encodeURI('Rock&Roll');

// let url = `https://google.com/search?q=${music}`;
// console.log(url); // https://google.com/search?q=Rock&Roll
// As we can see, encodeURI does not encode &, as this is a legit character in URL as a whole.

// But we should encode & inside a search parameter, otherwise, we get q=Rock&Roll – that is actually q=Rock plus some obscure parameter Roll. Not as intended.

// So we should use only encodeURIComponent for each search parameter, to correctly insert it in the URL string. The safest is to encode both name and value, unless we’re absolutely sure that it has only allowed characters.

// Encoding difference compared to URL
// Classes URL and URLSearchParams are based on the latest URI specification: RFC3986, while encode* functions are based on the obsolete version RFC2396.

// There are a few differences, e.g. IPv6 addresses are encoded differently:

// // valid url with IPv6 address
// let url = 'http://[2607:f8b0:4005:802::1007]/';

// console.log(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
// console.log(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
// As we can see, encodeURI replaced square brackets [...], that’s not correct, the reason is: IPv6 urls did not exist at the time of RFC2396 (August 1998).

// Such cases are rare, encode* functions work well most of the time.
// ///////////////////////////////////////////////////////////////////

// // XMLHttpRequest

// May 14, 2022
// XMLHttpRequest
// XMLHttpRequest is a built-in browser object that allows to make HTTP requests in JavaScript.

// Despite having the word “XML” in its name, it can operate on any data, not only in XML format. We can upload/download files, track progress and much more.

// Right now, there’s another, more modern method fetch, that somewhat deprecates XMLHttpRequest.

// In modern web-development XMLHttpRequest is used for three reasons:

// Historical reasons: we need to support existing scripts with XMLHttpRequest.
// We need to support old browsers, and don’t want polyfills (e.g. to keep scripts tiny).
// We need something that fetch can’t do yet, e.g. to track upload progress.
// Does that sound familiar? If yes, then all right, go on with XMLHttpRequest. Otherwise, please head on to Fetch.

// The basics
// XMLHttpRequest has two modes of operation: synchronous and asynchronous.

// Let’s see the asynchronous first, as it’s used in the majority of cases.

// To do the request, we need 3 steps:

// Create XMLHttpRequest:

// let xhr = new XMLHttpRequest();
// The constructor has no arguments.

// Initialize it, usually right after new XMLHttpRequest:

// xhr.open(method, URL, [async, user, password])
// This method specifies the main parameters of the request:

// method – HTTP-method. Usually "GET" or "POST".
// URL – the URL to request, a string, can be URL object.
// async – if explicitly set to false, then the request is synchronous, we’ll cover that a bit later.
// user, password – login and password for basic HTTP auth (if required).
// Please note that open call, contrary to its name, does not open the connection. It only configures the request, but the network activity only starts with the call of send.

// Send it out.

// xhr.send([body])
// This method opens the connection and sends the request to server. The optional body parameter contains the request body.

// Some request methods like GET do not have a body. And some of them like POST use body to send the data to the server. We’ll see examples of that later.

// Listen to xhr events for response.

// These three events are the most widely used:

// load – when the request is complete (even if HTTP status is like 400 or 500), and the response is fully downloaded.
// error – when the request couldn’t be made, e.g. network down or invalid URL.
// progress – triggers periodically while the response is being downloaded, reports how much has been downloaded.
// xhr.onload = function() {
//   console.log(`Loaded: ${xhr.status} ${xhr.response}`);
// };

// xhr.onerror = function() { // only triggers if the request couldn't be made at all
//   console.log(`Network Error`);
// };

// xhr.onprogress = function(event) { // triggers periodically
//   // event.loaded - how many bytes downloaded
//   // event.lengthComputable = true if the server sent Content-Length header
//   // event.total - total number of bytes (if lengthComputable)
//   console.log(`Received ${event.loaded} of ${event.total}`);
// };
// Here’s a full example. The code below loads the URL at /article/xmlhttprequest/example/load from the server and prints the progress:

// // 1. Create a new XMLHttpRequest object
// let xhr = new XMLHttpRequest();

// // 2. Configure it: GET-request for the URL /article/.../load
// xhr.open('GET', '/article/xmlhttprequest/example/load');

// // 3. Send the request over the network
// xhr.send();

// // 4. This will be called after the response is received
// xhr.onload = function() {
//   if (xhr.status != 200) { // analyze HTTP status of the response
//     console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
//   } else { // show the result
//     console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
//   }
// };

// xhr.onprogress = function(event) {
//   if (event.lengthComputable) {
//     console.log(`Received ${event.loaded} of ${event.total} bytes`);
//   } else {
//     console.log(`Received ${event.loaded} bytes`); // no Content-Length
//   }

// };

// xhr.onerror = function() {
//   console.log("Request failed");
// };
// Once the server has responded, we can receive the result in the following xhr properties:

// status
// HTTP status code (a number): 200, 404, 403 and so on, can be 0 in case of a non-HTTP failure.
// statusText
// HTTP status message (a string): usually OK for 200, Not Found for 404, Forbidden for 403 and so on.
// response (old scripts may use responseText)
// The server response body.
// We can also specify a timeout using the corresponding property:

// xhr.timeout = 10000; // timeout in ms, 10 seconds
// If the request does not succeed within the given time, it gets canceled and timeout event triggers.

// URL search parameters
// To add parameters to URL, like ?name=value, and ensure the proper encoding, we can use URL object:

// let url = new URL('https://google.com/search');
// url.searchParams.set('q', 'test me!');

// // the parameter 'q' is encoded
// xhr.open('GET', url); // https://google.com/search?q=test+me%21
// Response Type
// We can use xhr.responseType property to set the response format:

// "" (default) – get as string,
// "text" – get as string,
// "arraybuffer" – get as ArrayBuffer (for binary data, see chapter ArrayBuffer, binary arrays),
// "blob" – get as Blob (for binary data, see chapter Blob),
// "document" – get as XML document (can use XPath and other XML methods) or HTML document (based on the MIME type of the received data),
// "json" – get as JSON (parsed automatically).
// For example, let’s get the response as JSON:

// let xhr = new XMLHttpRequest();

// xhr.open('GET', '/article/xmlhttprequest/example/json');

// xhr.responseType = 'json';

// xhr.send();

// // the response is {"message": "Hello, world!"}
// xhr.onload = function() {
//   let responseObj = xhr.response;
//   console.log(responseObj.message); // Hello, world!
// };
// Please note:
// In the old scripts you may also find xhr.responseText and even xhr.responseXML properties.

// They exist for historical reasons, to get either a string or XML document. Nowadays, we should set the format in xhr.responseType and get xhr.response as demonstrated above.

// Ready states
// XMLHttpRequest changes between states as it progresses. The current state is accessible as xhr.readyState.

// All states, as in the specification:

// UNSENT = 0; // initial state
// OPENED = 1; // open called
// HEADERS_RECEIVED = 2; // response headers received
// LOADING = 3; // response is loading (a data packet is received)
// DONE = 4; // request complete
// An XMLHttpRequest object travels them in the order 0 → 1 → 2 → 3 → … → 3 → 4. State 3 repeats every time a data packet is received over the network.

// We can track them using readystatechange event:

// xhr.onreadystatechange = function() {
//   if (xhr.readyState == 3) {
//     // loading
//   }
//   if (xhr.readyState == 4) {
//     // request finished
//   }
// };
// You can find readystatechange listeners in really old code, it’s there for historical reasons, as there was a time when there were no load and other events. Nowadays, load/error/progress handlers deprecate it.

// Aborting request
// We can terminate the request at any time. The call to xhr.abort() does that:

// xhr.abort(); // terminate the request
// That triggers abort event, and xhr.status becomes 0.

// Synchronous requests
// If in the open method the third parameter async is set to false, the request is made synchronously.

// In other words, JavaScript execution pauses at send() and resumes when the response is received. Somewhat like console.log or prompt commands.

// Here’s the rewritten example, the 3rd parameter of open is false:

// let xhr = new XMLHttpRequest();

// xhr.open('GET', '/article/xmlhttprequest/hello.txt', false);

// try {
//   xhr.send();
//   if (xhr.status != 200) {
//     console.log(`Error ${xhr.status}: ${xhr.statusText}`);
//   } else {
//     console.log(xhr.response);
//   }
// } catch(err) { // instead of onerror
//   console.log("Request failed");
// }
// It might look good, but synchronous calls are used rarely, because they block in-page JavaScript till the loading is complete. In some browsers it becomes impossible to scroll. If a synchronous call takes too much time, the browser may suggest to close the “hanging” webpage.

// Many advanced capabilities of XMLHttpRequest, like requesting from another domain or specifying a timeout, are unavailable for synchronous requests. Also, as you can see, no progress indication.

// Because of all that, synchronous requests are used very sparingly, almost never. We won’t talk about them any more.

// HTTP-headers
// XMLHttpRequest allows both to send custom headers and read headers from the response.

// There are 3 methods for HTTP-headers:

// setRequestHeader(name, value)
// Sets the request header with the given name and value.

// For instance:

// xhr.setRequestHeader('Content-Type', 'application/json');
// Headers limitations
// Several headers are managed exclusively by the browser, e.g. Referer and Host. The full list is in the specification.

// XMLHttpRequest is not allowed to change them, for the sake of user safety and correctness of the request.

// Can’t remove a header
// Another peculiarity of XMLHttpRequest is that one can’t undo setRequestHeader.

// Once the header is set, it’s set. Additional calls add information to the header, don’t overwrite it.

// For instance:

// xhr.setRequestHeader('X-Auth', '123');
// xhr.setRequestHeader('X-Auth', '456');

// // the header will be:
// // X-Auth: 123, 456
// getResponseHeader(name)
// Gets the response header with the given name (except Set-Cookie and Set-Cookie2).

// For instance:

// xhr.getResponseHeader('Content-Type')
// getAllResponseHeaders()
// Returns all response headers, except Set-Cookie and Set-Cookie2.

// Headers are returned as a single line, e.g.:

// Cache-Control: max-age=31536000
// Content-Length: 4260
// Content-Type: image/png
// Date: Sat, 08 Sep 2012 16:53:16 GMT
// The line break between headers is always "\r\n" (doesn’t depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space ": ". That’s fixed in the specification.

// So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

// Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):

// let headers = xhr
//   .getAllResponseHeaders()
//   .split('\r\n')
//   .reduce((result, current) => {
//     let [name, value] = current.split(': ');
//     result[name] = value;
//     return result;
//   }, {});

// // headers['Content-Type'] = 'image/png'
// POST, FormData
// To make a POST request, we can use the built-in FormData object.

// The syntax:

// let formData = new FormData([form]); // creates an object, optionally fill from <form>
// formData.append(name, value); // appends a field
// We create it, optionally fill from a form, append more fields if needed, and then:

// xhr.open('POST', ...) – use POST method.
// xhr.send(formData) to submit the form to the server.
// For instance:

// <form name="person">
//   <input name="name" value="John">
//   <input name="surname" value="Smith">
// </form>

// <script>
//   // pre-fill FormData from the form
//   let formData = new FormData(document.forms.person);

//   // add one more field
//   formData.append("middle", "Lee");

//   // send it out
//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", "/article/xmlhttprequest/post/user");
//   xhr.send(formData);

//   xhr.onload = () => console.log(xhr.response);
// </script>
// The form is sent with multipart/form-data encoding.

// Or, if we like JSON more, then JSON.stringify and send as a string.

// Just don’t forget to set the header Content-Type: application/json, many server-side frameworks automatically decode JSON with it:

// let xhr = new XMLHttpRequest();

// let json = JSON.stringify({
//   name: "John",
//   surname: "Smith"
// });

// xhr.open("POST", '/submit')
// xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

// xhr.send(json);
// The .send(body) method is pretty omnivore. It can send almost any body, including Blob and BufferSource objects.

// Upload progress
// The progress event triggers only on the downloading stage.

// That is: if we POST something, XMLHttpRequest first uploads our data (the request body), then downloads the response.

// If we’re uploading something big, then we’re surely more interested in tracking the upload progress. But xhr.onprogress doesn’t help here.

// There’s another object, without methods, exclusively to track upload events: xhr.upload.

// It generates events, similar to xhr, but xhr.upload triggers them solely on uploading:

// loadstart – upload started.
// progress – triggers periodically during the upload.
// abort – upload aborted.
// error – non-HTTP error.
// load – upload finished successfully.
// timeout – upload timed out (if timeout property is set).
// loadend – upload finished with either success or error.
// Example of handlers:

// xhr.upload.onprogress = function(event) {
//   console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
// };

// xhr.upload.onload = function() {
//   console.log(`Upload finished successfully.`);
// };

// xhr.upload.onerror = function() {
//   console.log(`Error during the upload: ${xhr.status}`);
// };
// Here’s a real-life example: file upload with progress indication:

// <input type="file" onchange="upload(this.files[0])">

// <script>
// function upload(file) {
//   let xhr = new XMLHttpRequest();

//   // track upload progress
//   xhr.upload.onprogress = function(event) {
//     console.log(`Uploaded ${event.loaded} of ${event.total}`);
//   };

//   // track completion: both successful or not
//   xhr.onloadend = function() {
//     if (xhr.status == 200) {
//       console.log("success");
//     } else {
//       console.log("error " + this.status);
//     }
//   };

//   xhr.open("POST", "/article/xmlhttprequest/post/upload");
//   xhr.send(file);
// }
// </script>
// Cross-origin requests
// XMLHttpRequest can make cross-origin requests, using the same CORS policy as fetch.

// Just like fetch, it doesn’t send cookies and HTTP-authorization to another origin by default. To enable them, set xhr.withCredentials to true:

// let xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.open('POST', 'http://anywhere.com/request');
// ...
// See the chapter Fetch: Cross-Origin Requests for details about cross-origin headers.

// Summary
// Typical code of the GET-request with XMLHttpRequest:

// let xhr = new XMLHttpRequest();

// xhr.open('GET', '/my/url');

// xhr.send();

// xhr.onload = function() {
//   if (xhr.status != 200) { // HTTP error?
//     // handle error
//     console.log( 'Error: ' + xhr.status);
//     return;
//   }

//   // get the response from xhr.response
// };

// xhr.onprogress = function(event) {
//   // report progress
//   console.log(`Loaded ${event.loaded} of ${event.total}`);
// };

// xhr.onerror = function() {
//   // handle non-HTTP error (e.g. network down)
// };
// There are actually more events, the modern specification lists them (in the lifecycle order):

// loadstart – the request has started.
// progress – a data packet of the response has arrived, the whole response body at the moment is in response.
// abort – the request was canceled by the call xhr.abort().
// error – connection error has occurred, e.g. wrong domain name. Doesn’t happen for HTTP-errors like 404.
// load – the request has finished successfully.
// timeout – the request was canceled due to timeout (only happens if it was set).
// loadend – triggers after load, error, timeout or abort.
// The error, abort, timeout, and load events are mutually exclusive. Only one of them may happen.

// The most used events are load completion (load), load failure (error), or we can use a single loadend handler and check the properties of the request object xhr to see what happened.

// We’ve already seen another event: readystatechange. Historically, it appeared long ago, before the specification settled. Nowadays, there’s no need to use it, we can replace it with newer events, but it can often be found in older scripts.

// If we need to track uploading specifically, then we should listen to same events on xhr.upload object.
// ///////////////////////////////////////////////////////////////////

// // Resumable file upload
// Resumable file upload
// With fetch method it’s fairly easy to upload a file.

// How to resume the upload after lost connection? There’s no built-in option for that, but we have the pieces to implement it.

// Resumable uploads should come with upload progress indication, as we expect big files (if we may need to resume). So, as fetch doesn’t allow to track upload progress, we’ll use XMLHttpRequest.

// Not-so-useful progress event
// To resume upload, we need to know how much was uploaded till the connection was lost.

// There’s xhr.upload.onprogress to track upload progress.

// Unfortunately, it won’t help us to resume the upload here, as it triggers when the data is sent, but was it received by the server? The browser doesn’t know.

// Maybe it was buffered by a local network proxy, or maybe the remote server process just died and couldn’t process them, or it was just lost in the middle and didn’t reach the receiver.

// That’s why this event is only useful to show a nice progress bar.

// To resume upload, we need to know exactly the number of bytes received by the server. And only the server can tell that, so we’ll make an additional request.

// Algorithm
// First, create a file id, to uniquely identify the file we’re going to upload:

// let fileId = file.name + '-' + file.size + '-' + file.lastModified;
// That’s needed for resume upload, to tell the server what we’re resuming.

// If the name or the size or the last modification date changes, then there’ll be another fileId.

// Send a request to the server, asking how many bytes it already has, like this:

// let response = await fetch('status', {
//   headers: {
//     'X-File-Id': fileId
//   }
// });

// // The server has that many bytes
// let startByte = +await response.text();
// This assumes that the server tracks file uploads by X-File-Id header. Should be implemented at server-side.

// If the file doesn’t yet exist at the server, then the server response should be 0

// Then, we can use Blob method slice to send the file from startByte:

// xhr.open("POST", "upload", true);

// // File id, so that the server knows which file we upload
// xhr.setRequestHeader('X-File-Id', fileId);

// // The byte we're resuming from, so the server knows we're resuming
// xhr.setRequestHeader('X-Start-Byte', startByte);

// xhr.upload.onprogress = (e) => {
//   console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
// };

// // file can be from input.files[0] or another source
// xhr.send(file.slice(startByte));
// Here we send the server both file id as X-File-Id, so it knows which file we’re uploading, and the starting byte as X-Start-Byte, so it knows we’re not uploading it initially, but resuming.

// The server should check its records, and if there was an upload of that file, and the current uploaded size is exactly X-Start-Byte, then append the data to it.

// Here’s the demo with both client and server code, written on Node.js.

// It works only partially on this site, as Node.js is behind another server named Nginx, that buffers uploads, passing them to Node.js when fully complete.

// But you can download it and run locally for the full demonstration:

// Resultserver.jsuploader.jsindex.html

// As we can see, modern networking methods are close to file managers in their capabilities – control over headers, progress indicator, sending file parts, etc.

// We can implement resumable upload and much more.
// ///////////////////////////////////////////////////////////////////

// // Long polling
// Long polling
// Long polling is the simplest way of having persistent connection with server, that doesn’t use any specific protocol like WebSocket or Server Side Events.

// Being very easy to implement, it’s also good enough in a lot of cases.

// Regular Polling
// The simplest way to get new information from the server is periodic polling. That is, regular requests to the server: “Hello, I’m here, do you have any information for me?”. For example, once every 10 seconds.

// In response, the server first takes a notice to itself that the client is online, and second – sends a packet of messages it got till that moment.

// That works, but there are downsides:

// Messages are passed with a delay up to 10 seconds (between requests).
// Even if there are no messages, the server is bombed with requests every 10 seconds, even if the user switched somewhere else or is asleep. That’s quite a load to handle, speaking performance-wise.
// So, if we’re talking about a very small service, the approach may be viable, but generally, it needs an improvement.

// Long polling
// So-called “long polling” is a much better way to poll the server.

// It’s also very easy to implement, and delivers messages without delays.

// The flow:

// A request is sent to the server.
// The server doesn’t close the connection until it has a message to send.
// When a message appears – the server responds to the request with it.
// The browser makes a new request immediately.
// The situation when the browser sent a request and has a pending connection with the server, is standard for this method. Only when a message is delivered, the connection is reestablished.

// If the connection is lost, because of, say, a network error, the browser immediately sends a new request.

// A sketch of client-side subscribe function that makes long requests:

// async function subscribe() {
//   let response = await fetch("/subscribe");

//   if (response.status == 502) {
//     // Status 502 is a connection timeout error,
//     // may happen when the connection was pending for too long,
//     // and the remote server or a proxy closed it
//     // let's reconnect
//     await subscribe();
//   } else if (response.status != 200) {
//     // An error - let's show it
//     showMessage(response.statusText);
//     // Reconnect in one second
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     await subscribe();
//   } else {
//     // Get and show the message
//     let message = await response.text();
//     showMessage(message);
//     // Call subscribe() again to get the next message
//     await subscribe();
//   }
// }

// subscribe();
// As you can see, subscribe function makes a fetch, then waits for the response, handles it and calls itself again.

// Server should be ok with many pending connections
// The server architecture must be able to work with many pending connections.

// Certain server architectures run one process per connection, resulting in there being as many processes as there are connections, while each process consumes quite a bit of memory. So, too many connections will just consume it all.

// That’s often the case for backends written in languages like PHP and Ruby.

// Servers written using Node.js usually don’t have such problems.

// That said, it isn’t a programming language issue. Most modern languages, including PHP and Ruby allow to implement a proper backend. Just please make sure that your server architecture works fine with many simultaneous connections.

// Demo: a chat
// Here’s a demo chat, you can also download it and run locally (if you’re familiar with Node.js and can install modules):

// Resultbrowser.jsserver.jsindex.html

// Browser code is in browser.js.

// Area of usage
// Long polling works great in situations when messages are rare.

// If messages come very often, then the chart of requesting-receiving messages, painted above, becomes saw-like.

// Every message is a separate request, supplied with headers, authentication overhead, and so on.

// So, in this case, another method is preferred, such as Websocket or Server Sent Events.
// ///////////////////////////////////////////////////////////////////

// // WebSocket
// WebSocket
// The WebSocket protocol, described in the specification RFC 6455, provides a way to exchange data between browser and server via a persistent connection. The data can be passed in both directions as “packets”, without breaking the connection and the need of additional HTTP-requests.

// WebSocket is especially great for services that require continuous data exchange, e.g. online games, real-time trading systems and so on.

// A simple example
// To open a websocket connection, we need to create new WebSocket using the special protocol ws in the url:

// let socket = new WebSocket("ws://javascript.info");
// There’s also encrypted wss:// protocol. It’s like HTTPS for websockets.

// Always prefer wss://
// The wss:// protocol is not only encrypted, but also more reliable.

// That’s because ws:// data is not encrypted, visible for any intermediary. Old proxy servers do not know about WebSocket, they may see “strange” headers and abort the connection.

// On the other hand, wss:// is WebSocket over TLS, (same as HTTPS is HTTP over TLS), the transport security layer encrypts the data at the sender and decrypts it at the receiver. So data packets are passed encrypted through proxies. They can’t see what’s inside and let them through.

// Once the socket is created, we should listen to events on it. There are totally 4 events:

// open – connection established,
// message – data received,
// error – websocket error,
// close – connection closed.
// …And if we’d like to send something, then socket.send(data) will do that.

// Here’s an example:

// let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

// socket.onopen = function(e) {
//   console.log("[open] Connection established");
//   console.log("Sending to server");
//   socket.send("My name is John");
// };

// socket.onmessage = function(event) {
//   console.log(`[message] Data received from server: ${event.data}`);
// };

// socket.onclose = function(event) {
//   if (event.wasClean) {
//     console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//   } else {
//     // e.g. server process killed or network down
//     // event.code is usually 1006 in this case
//     console.log('[close] Connection died');
//   }
// };

// socket.onerror = function(error) {
//   console.log(`[error] ${error.message}`);
// };
// For demo purposes, there’s a small server server.js written in Node.js, for the example above, running. It responds with “Hello from server, John”, then waits 5 seconds and closes the connection.

// So you’ll see events open → message → close.

// That’s actually it, we can talk WebSocket already. Quite simple, isn’t it?

// Now let’s talk more in-depth.

// Opening a websocket
// When new WebSocket(url) is created, it starts connecting immediately.

// During the connection, the browser (using headers) asks the server: “Do you support Websocket?” And if the server replies “yes”, then the talk continues in WebSocket protocol, which is not HTTP at all.

// Here’s an example of browser headers for a request made by new WebSocket("wss://javascript.info/chat").

// GET /chat
// Host: javascript.info
// Origin: https://javascript.info
// Connection: Upgrade
// Upgrade: websocket
// Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
// Sec-WebSocket-Version: 13
// Origin – the origin of the client page, e.g. https://javascript.info. WebSocket objects are cross-origin by nature. There are no special headers or other limitations. Old servers are unable to handle WebSocket anyway, so there are no compatibility issues. But the Origin header is important, as it allows the server to decide whether or not to talk WebSocket with this website.
// Connection: Upgrade – signals that the client would like to change the protocol.
// Upgrade: websocket – the requested protocol is “websocket”.
// Sec-WebSocket-Key – a random browser-generated key, used to ensure that the server supports WebSocket protocol. It’s random to prevent proxies from caching any following communication.
// Sec-WebSocket-Version – WebSocket protocol version, 13 is the current one.
// WebSocket handshake can’t be emulated
// We can’t use XMLHttpRequest or fetch to make this kind of HTTP-request, because JavaScript is not allowed to set these headers.

// If the server agrees to switch to WebSocket, it should send code 101 response:

// 101 Switching Protocols
// Upgrade: websocket
// Connection: Upgrade
// Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
// Here Sec-WebSocket-Accept is Sec-WebSocket-Key, recoded using a special algorithm. Upon seeing it, the browser understands that the server really does support the WebSocket protocol.

// Afterwards, the data is transferred using the WebSocket protocol, we’ll see its structure (“frames”) soon. And that’s not HTTP at all.

// Extensions and subprotocols
// There may be additional headers Sec-WebSocket-Extensions and Sec-WebSocket-Protocol that describe extensions and subprotocols.

// For instance:

// Sec-WebSocket-Extensions: deflate-frame means that the browser supports data compression. An extension is something related to transferring the data, functionality that extends the WebSocket protocol. The header Sec-WebSocket-Extensions is sent automatically by the browser, with the list of all extensions it supports.

// Sec-WebSocket-Protocol: soap, wamp means that we’d like to transfer not just any data, but the data in SOAP or WAMP (“The WebSocket Application Messaging Protocol”) protocols. WebSocket subprotocols are registered in the IANA catalogue. So, this header describes the data formats that we’re going to use.

// This optional header is set using the second parameter of new WebSocket. That’s the array of subprotocols, e.g. if we’d like to use SOAP or WAMP:

// let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
// The server should respond with a list of protocols and extensions that it agrees to use.

// For example, the request:

// GET /chat
// Host: javascript.info
// Upgrade: websocket
// Connection: Upgrade
// Origin: https://javascript.info
// Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
// Sec-WebSocket-Version: 13
// Sec-WebSocket-Extensions: deflate-frame
// Sec-WebSocket-Protocol: soap, wamp
// Response:

// 101 Switching Protocols
// Upgrade: websocket
// Connection: Upgrade
// Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
// Sec-WebSocket-Extensions: deflate-frame
// Sec-WebSocket-Protocol: soap
// Here the server responds that it supports the extension “deflate-frame”, and only SOAP of the requested subprotocols.

// Data transfer
// WebSocket communication consists of “frames” – data fragments, that can be sent from either side, and can be of several kinds:

// “text frames” – contain text data that parties send to each other.
// “binary data frames” – contain binary data that parties send to each other.
// “ping/pong frames” are used to check the connection, sent from the server, the browser responds to these automatically.
// there’s also “connection close frame” and a few other service frames.
// In the browser, we directly work only with text or binary frames.

// WebSocket .send() method can send either text or binary data.

// A call socket.send(body) allows body in string or a binary format, including Blob, ArrayBuffer, etc. No settings are required: just send it out in any format.

// When we receive the data, text always comes as string. And for binary data, we can choose between Blob and ArrayBuffer formats.

// That’s set by socket.binaryType property, it’s "blob" by default, so binary data comes as Blob objects.

// Blob is a high-level binary object, it directly integrates with <a>, <img> and other tags, so that’s a sane default. But for binary processing, to access individual data bytes, we can change it to "arraybuffer":

// socket.binaryType = "arraybuffer";
// socket.onmessage = (event) => {
//   // event.data is either a string (if text) or arraybuffer (if binary)
// };
// Rate limiting
// Imagine, our app is generating a lot of data to send. But the user has a slow network connection, maybe on a mobile internet, outside of a city.

// We can call socket.send(data) again and again. But the data will be buffered (stored) in memory and sent out only as fast as network speed allows.

// The socket.bufferedAmount property stores how many bytes remain buffered at this moment, waiting to be sent over the network.

// We can examine it to see whether the socket is actually available for transmission.

// // every 100ms examine the socket and send more data
// // only if all the existing data was sent out
// setInterval(() => {
//   if (socket.bufferedAmount == 0) {
//     socket.send(moreData());
//   }
// }, 100);
// Connection close
// Normally, when a party wants to close the connection (both browser and server have equal rights), they send a “connection close frame” with a numeric code and a textual reason.

// The method for that is:

// socket.close([code], [reason]);
// code is a special WebSocket closing code (optional)
// reason is a string that describes the reason of closing (optional)
// Then the other party in the close event handler gets the code and the reason, e.g.:

// // closing party:
// socket.close(1000, "Work complete");

// // the other party
// socket.onclose = event => {
//   // event.code === 1000
//   // event.reason === "Work complete"
//   // event.wasClean === true (clean close)
// };
// Most common code values:

// 1000 – the default, normal closure (used if no code supplied),
// 1006 – no way to set such code manually, indicates that the connection was lost (no close frame).
// There are other codes like:

// 1001 – the party is going away, e.g. server is shutting down, or a browser leaves the page,
// 1009 – the message is too big to process,
// 1011 – unexpected error on server,
// …and so on.
// The full list can be found in RFC6455, §7.4.1.

// WebSocket codes are somewhat like HTTP codes, but different. In particular, codes lower than 1000 are reserved, there’ll be an error if we try to set such a code.

// // in case connection is broken
// socket.onclose = event => {
//   // event.code === 1006
//   // event.reason === ""
//   // event.wasClean === false (no closing frame)
// };
// Connection state
// To get connection state, additionally there’s socket.readyState property with values:

// 0 – “CONNECTING”: the connection has not yet been established,
// 1 – “OPEN”: communicating,
// 2 – “CLOSING”: the connection is closing,
// 3 – “CLOSED”: the connection is closed.
// Chat example
// Let’s review a chat example using browser WebSocket API and Node.js WebSocket module https://github.com/websockets/ws. We’ll pay the main attention to the client side, but the server is also simple.

// HTML: we need a <form> to send messages and a <div> for incoming messages:

// <!-- message form -->
// <form name="publish">
//   <input type="text" name="message">
//   <input type="submit" value="Send">
// </form>

// <!-- div with messages -->
// <div id="messages"></div>
// From JavaScript we want three things:

// Open the connection.
// On form submission – socket.send(message) for the message.
// On incoming message – append it to div#messages.
// Here’s the code:

// let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// // send message from the form
// document.forms.publish.onsubmit = function() {
//   let outgoingMessage = this.message.value;

//   socket.send(outgoingMessage);
//   return false;
// };

// // message received - show the message in div#messages
// socket.onmessage = function(event) {
//   let message = event.data;

//   let messageElem = document.createElement('div');
//   messageElem.textContent = message;
//   document.getElementById('messages').prepend(messageElem);
// }
// Server-side code is a little bit beyond our scope. Here we’ll use Node.js, but you don’t have to. Other platforms also have their means to work with WebSocket.

// The server-side algorithm will be:

// Create clients = new Set() – a set of sockets.
// For each accepted websocket, add it to the set clients.add(socket) and set message event listener to get its messages.
// When a message is received: iterate over clients and send it to everyone.
// When a connection is closed: clients.delete(socket).
// const ws = new require('ws');
// const wss = new ws.Server({noServer: true});

// const clients = new Set();

// http.createServer((req, res) => {
//   // here we only handle websocket connections
//   // in real project we'd have some other code here to handle non-websocket requests
//   wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
// });

// function onSocketConnect(ws) {
//   clients.add(ws);

//   ws.on('message', function(message) {
//     message = message.slice(0, 50); // max message length will be 50

//     for(let client of clients) {
//       client.send(message);
//     }
//   });

//   ws.on('close', function() {
//     clients.delete(ws);
//   });
// }
// Here’s the working example:

// You can also download it (upper-right button in the iframe) and run it locally. Just don’t forget to install Node.js and npm install ws before running.

// Summary
// WebSocket is a modern way to have persistent browser-server connections.

// WebSockets don’t have cross-origin limitations.
// They are well-supported in browsers.
// Can send/receive strings and binary data.
// The API is simple.

// Methods:

// socket.send(data),
// socket.close([code], [reason]).
// Events:

// open,
// message,
// error,
// close.
// WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it’s also possible to implement these capabilities manually.

// Sometimes, to integrate WebSocket into existing projects, people run a WebSocket server in parallel with the main HTTP-server, and they share a single database. Requests to WebSocket use wss://ws.site.com, a subdomain that leads to the WebSocket server, while https://site.com goes to the main HTTP-server.

// Surely, other ways of integration are also possible.
// ///////////////////////////////////////////////////////////////////

// // Server Sent Events
// Server Sent Events
// The Server-Sent Events specification describes a built-in class EventSource, that keeps connection with the server and allows to receive events from it.

// Similar to WebSocket, the connection is persistent.

// But there are several important differences:

// WebSocket	EventSource
// Bi-directional: both client and server can exchange messages	One-directional: only server sends data
// Binary and text data	Only text
// WebSocket protocol	Regular HTTP
// EventSource is a less-powerful way of communicating with the server than WebSocket.

// Why should one ever use it?

// The main reason: it’s simpler. In many applications, the power of WebSocket is a little bit too much.

// We need to receive a stream of data from server: maybe chat messages or market prices, or whatever. That’s what EventSource is good at. Also it supports auto-reconnect, something we need to implement manually with WebSocket. Besides, it’s a plain old HTTP, not a new protocol.

// Getting messages
// To start receiving messages, we just need to create new EventSource(url).

// The browser will connect to url and keep the connection open, waiting for events.

// The server should respond with status 200 and the header Content-Type: text/event-stream, then keep the connection and write messages into it in the special format, like this:

// data: Message 1

// data: Message 2

// data: Message 3
// data: of two lines
// A message text goes after data:, the space after the colon is optional.
// Messages are delimited with double line breaks \n\n.
// To send a line break \n, we can immediately send one more data: (3rd message above).
// In practice, complex messages are usually sent JSON-encoded. Line-breaks are encoded as \n within them, so multiline data: messages are not necessary.

// For instance:

// data: {"user":"John","message":"First line\n Second line"}
// …So we can assume that one data: holds exactly one message.

// For each such message, the message event is generated:

// let eventSource = new EventSource("/events/subscribe");

// eventSource.onmessage = function(event) {
//   console.log("New message", event.data);
//   // will log 3 times for the data stream above
// };

// // or eventSource.addEventListener('message', ...)
// Cross-origin requests
// EventSource supports cross-origin requests, like fetch and any other networking methods. We can use any URL:

// let source = new EventSource("https://another-site.com/events");
// The remote server will get the Origin header and must respond with Access-Control-Allow-Origin to proceed.

// To pass credentials, we should set the additional option withCredentials, like this:

// let source = new EventSource("https://another-site.com/events", {
//   withCredentials: true
// });
// Please see the chapter Fetch: Cross-Origin Requests for more details about cross-origin headers.

// Reconnection
// Upon creation, new EventSource connects to the server, and if the connection is broken – reconnects.

// That’s very convenient, as we don’t have to care about it.

// There’s a small delay between reconnections, a few seconds by default.

// The server can set the recommended delay using retry: in response (in milliseconds):

// retry: 15000
// data: Hello, I set the reconnection delay to 15 seconds
// The retry: may come both together with some data, or as a standalone message.

// The browser should wait that many milliseconds before reconnecting. Or longer, e.g. if the browser knows (from OS) that there’s no network connection at the moment, it may wait until the connection appears, and then retry.

// If the server wants the browser to stop reconnecting, it should respond with HTTP status 204.
// If the browser wants to close the connection, it should call eventSource.close():
// let eventSource = new EventSource(...);

// eventSource.close();
// Also, there will be no reconnection if the response has an incorrect Content-Type or its HTTP status differs from 301, 307, 200 and 204. In such cases the "error" event will be emitted, and the browser won’t reconnect.

// Please note:
// When a connection is finally closed, there’s no way to “reopen” it. If we’d like to connect again, just create a new EventSource.

// Message id
// When a connection breaks due to network problems, either side can’t be sure which messages were received, and which weren’t.

// To correctly resume the connection, each message should have an id field, like this:

// data: Message 1
// id: 1

// data: Message 2
// id: 2

// data: Message 3
// data: of two lines
// id: 3
// When a message with id: is received, the browser:

// Sets the property eventSource.lastEventId to its value.
// Upon reconnection sends the header Last-Event-ID with that id, so that the server may re-send following messages.
// Put id: after data:
// Please note: the id is appended below message data by the server, to ensure that lastEventId is updated after the message is received.

// Connection status: readyState
// The EventSource object has readyState property, that has one of three values:

// EventSource.CONNECTING = 0; // connecting or reconnecting
// EventSource.OPEN = 1;       // connected
// EventSource.CLOSED = 2;     // connection closed
// When an object is created, or the connection is down, it’s always EventSource.CONNECTING (equals 0).

// We can query this property to know the state of EventSource.

// Event types
// By default EventSource object generates three events:

// message – a message received, available as event.data.
// open – the connection is open.
// error – the connection could not be established, e.g. the server returned HTTP 500 status.
// The server may specify another type of event with event: ... at the event start.

// For example:

// event: join
// data: Bob

// data: Hello

// event: leave
// data: Bob
// To handle custom events, we must use addEventListener, not onmessage:

// eventSource.addEventListener('join', event => {
//   console.log(`Joined ${event.data}`);
// });

// eventSource.addEventListener('message', event => {
//   console.log(`Said: ${event.data}`);
// });

// eventSource.addEventListener('leave', event => {
//   console.log(`Left ${event.data}`);
// });
// Full example
// Here’s the server that sends messages with 1, 2, 3, then bye and breaks the connection.

// Then the browser automatically reconnects.

// Resultserver.jsindex.html

// Summary
// EventSource object automatically establishes a persistent connection and allows the server to send messages over it.

// It offers:

// Automatic reconnect, with tunable retry timeout.
// Message ids to resume events, the last received identifier is sent in Last-Event-ID header upon reconnection.
// The current state is in the readyState property.
// That makes EventSource a viable alternative to WebSocket, as the latter is more low-level and lacks such built-in features (though they can be implemented).

// In many real-life applications, the power of EventSource is just enough.

// Supported in all modern browsers (not IE).

// The syntax is:

// let source = new EventSource(url, [credentials]);
// The second argument has only one possible option: { withCredentials: true }, it allows sending cross-origin credentials.

// Overall cross-origin security is same as for fetch and other network methods.

// Properties of an EventSource object
// readyState
// The current connection state: either EventSource.CONNECTING (=0), EventSource.OPEN (=1) or EventSource.CLOSED (=2).
// lastEventId
// The last received id. Upon reconnection the browser sends it in the header Last-Event-ID.
// Methods
// close()
// Closes the connection.
// Events
// message
// Message received, the data is in event.data.
// open
// The connection is established.
// error
// In case of an error, including both lost connection (will auto-reconnect) and fatal errors. We can check readyState to see if the reconnection is being attempted.
// The server may set a custom event name in event:. Such events should be handled using addEventListener, not on<event>.

// Server response format
// The server sends messages, delimited by \n\n.

// A message may have following fields:

// data: – message body, a sequence of multiple data is interpreted as a single message, with \n between the parts.
// id: – renews lastEventId, sent in Last-Event-ID on reconnect.
// retry: – recommends a retry delay for reconnections in ms. There’s no way to set it from JavaScript.
// event: – event name, must precede data:.
// A message may include one or more fields in any order, but id: usually goes the last.
// ///////////////////////////////////////////////////////////////////
