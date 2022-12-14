// // ArrayBuffer, binary arrays
// ArrayBuffer, binary arrays
// In web-development we meet binary data mostly while dealing with files (create, upload, download). Another typical use case is image processing.

// That’s all possible in JavaScript, and binary operations are high-performant.

// Although, there’s a bit of confusion, because there are many classes. To name a few:

// ArrayBuffer, Uint8Array, DataView, Blob, File, etc.
// Binary data in JavaScript is implemented in a non-standard way, compared to other languages. But when we sort things out, everything becomes fairly simple.

// The basic binary object is ArrayBuffer – a reference to a fixed-length contiguous memory area.

// We create it like this:

// let buffer = new ArrayBuffer(16); // create a buffer of length 16
// console.log(buffer.byteLength); // 16
// This allocates a contiguous memory area of 16 bytes and pre-fills it with zeroes.

// ArrayBuffer is not an array of something
// Let’s eliminate a possible source of confusion. ArrayBuffer has nothing in common with Array:

// It has a fixed length, we can’t increase or decrease it.
// It takes exactly that much space in the memory.
// To access individual bytes, another “view” object is needed, not buffer[index].
// ArrayBuffer is a memory area. What’s stored in it? It has no clue. Just a raw sequence of bytes.

// To manipulate an ArrayBuffer, we need to use a “view” object.

// A view object does not store anything on its own. It’s the “eyeglasses” that give an interpretation of the bytes stored in the ArrayBuffer.

// For instance:

// Uint8Array – treats each byte in ArrayBuffer as a separate number, with possible values from 0 to 255 (a byte is 8-bit, so it can hold only that much). Such value is called a “8-bit unsigned integer”.
// Uint16Array – treats every 2 bytes as an integer, with possible values from 0 to 65535. That’s called a “16-bit unsigned integer”.
// Uint32Array – treats every 4 bytes as an integer, with possible values from 0 to 4294967295. That’s called a “32-bit unsigned integer”.
// Float64Array – treats every 8 bytes as a floating point number with possible values from 5.0x10-324 to 1.8x10308.
// So, the binary data in an ArrayBuffer of 16 bytes can be interpreted as 16 “tiny numbers”, or 8 bigger numbers (2 bytes each), or 4 even bigger (4 bytes each), or 2 floating-point values with high precision (8 bytes each).

// ArrayBuffer is the core object, the root of everything, the raw binary data.

// But if we’re going to write into it, or iterate over it, basically for almost any operation – we must use a view, e.g:

// let buffer = new ArrayBuffer(16); // create a buffer of length 16

// let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

// console.log(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

// console.log(view.length); // 4, it stores that many integers
// console.log(view.byteLength); // 16, the size in bytes

// // let's write a value
// view[0] = 123456;

// // iterate over values
// for(let num of view) {
//   console.log(num); // 123456, then 0, 0, 0 (4 values total)
// }
// TypedArray
// The common term for all these views (Uint8Array, Uint32Array, etc) is TypedArray. They share the same set of methods and properties.

// Please note, there’s no constructor called TypedArray, it’s just a common “umbrella” term to represent one of views over ArrayBuffer: Int8Array, Uint8Array and so on, the full list will soon follow.

// When you see something like new TypedArray, it means any of new Int8Array, new Uint8Array, etc.

// Typed arrays behave like regular arrays: have indexes and are iterable.

// A typed array constructor (be it Int8Array or Float64Array, doesn’t matter) behaves differently depending on argument types.

// There are 5 variants of arguments:

// new TypedArray(buffer, [byteOffset], [length]);
// new TypedArray(object);
// new TypedArray(typedArray);
// new TypedArray(length);
// new TypedArray();
// If an ArrayBuffer argument is supplied, the view is created over it. We used that syntax already.

// Optionally we can provide byteOffset to start from (0 by default) and the length (till the end of the buffer by default), then the view will cover only a part of the buffer.

// If an Array, or any array-like object is given, it creates a typed array of the same length and copies the content.

// We can use it to pre-fill the array with the data:

// let arr = new Uint8Array([0, 1, 2, 3]);
// console.log( arr.length ); // 4, created binary array of the same length
// console.log( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values
// If another TypedArray is supplied, it does the same: creates a typed array of the same length and copies values. Values are converted to the new type in the process, if needed.

// let arr16 = new Uint16Array([1, 1000]);
// let arr8 = new Uint8Array(arr16);
// console.log( arr8[0] ); // 1
// console.log( arr8[1] ); // 232, tried to copy 1000, but can't fit 1000 into 8 bits (explanations below)
// For a numeric argument length – creates the typed array to contain that many elements. Its byte length will be length multiplied by the number of bytes in a single item TypedArray.BYTES_PER_ELEMENT:

// let arr = new Uint16Array(4); // create typed array for 4 integers
// console.log( Uint16Array.BYTES_PER_ELEMENT ); // 2 bytes per integer
// console.log( arr.byteLength ); // 8 (size in bytes)
// Without arguments, creates an zero-length typed array.

// We can create a TypedArray directly, without mentioning ArrayBuffer. But a view cannot exist without an underlying ArrayBuffer, so gets created automatically in all these cases except the first one (when provided).

// To access the underlying ArrayBuffer, there are following properties in TypedArray:

// buffer – references the ArrayBuffer.
// byteLength – the length of the ArrayBuffer.
// So, we can always move from one view to another:

// let arr8 = new Uint8Array([0, 1, 2, 3]);

// // another view on the same data
// let arr16 = new Uint16Array(arr8.buffer);
// Here’s the list of typed arrays:

// Uint8Array, Uint16Array, Uint32Array – for integer numbers of 8, 16 and 32 bits.
// Uint8ClampedArray – for 8-bit integers, “clamps” them on assignment (see below).
// Int8Array, Int16Array, Int32Array – for signed integer numbers (can be negative).
// Float32Array, Float64Array – for signed floating-point numbers of 32 and 64 bits.
// No int8 or similar single-valued types
// Please note, despite of the names like Int8Array, there’s no single-value type like int, or int8 in JavaScript.

// That’s logical, as Int8Array is not an array of these individual values, but rather a view on ArrayBuffer.

// Out-of-bounds behavior
// What if we attempt to write an out-of-bounds value into a typed array? There will be no error. But extra bits are cut-off.

// For instance, let’s try to put 256 into Uint8Array. In binary form, 256 is 100000000 (9 bits), but Uint8Array only provides 8 bits per value, that makes the available range from 0 to 255.

// For bigger numbers, only the rightmost (less significant) 8 bits are stored, and the rest is cut off:

// So we’ll get zero.

// For 257, the binary form is 100000001 (9 bits), the rightmost 8 get stored, so we’ll have 1 in the array:

// In other words, the number modulo 28 is saved.

// Here’s the demo:

// let uint8array = new Uint8Array(16);

// let num = 256;
// console.log(num.toString(2)); // 100000000 (binary representation)

// uint8array[0] = 256;
// uint8array[1] = 257;

// console.log(uint8array[0]); // 0
// console.log(uint8array[1]); // 1
// Uint8ClampedArray is special in this aspect, its behavior is different. It saves 255 for any number that is greater than 255, and 0 for any negative number. That behavior is useful for image processing.

// TypedArray methods
// TypedArray has regular Array methods, with notable exceptions.

// We can iterate, map, slice, find, reduce etc.

// There are few things we can’t do though:

// No splice – we can’t “delete” a value, because typed arrays are views on a buffer, and these are fixed, contiguous areas of memory. All we can do is to assign a zero.
// No concat method.
// There are two additional methods:

// arr.set(fromArr, [offset]) copies all elements from fromArr to the arr, starting at position offset (0 by default).
// arr.subarray([begin, end]) creates a new view of the same type from begin to end (exclusive). That’s similar to slice method (that’s also supported), but doesn’t copy anything – just creates a new view, to operate on the given piece of data.
// These methods allow us to copy typed arrays, mix them, create new arrays from existing ones, and so on.

// DataView
// DataView is a special super-flexible “untyped” view over ArrayBuffer. It allows to access the data on any offset in any format.

// For typed arrays, the constructor dictates what the format is. The whole array is supposed to be uniform. The i-th number is arr[i].
// With DataView we access the data with methods like .getUint8(i) or .getUint16(i). We choose the format at method call time instead of the construction time.
// The syntax:

// new DataView(buffer, [byteOffset], [byteLength])
// buffer – the underlying ArrayBuffer. Unlike typed arrays, DataView doesn’t create a buffer on its own. We need to have it ready.
// byteOffset – the starting byte position of the view (by default 0).
// byteLength – the byte length of the view (by default till the end of buffer).
// For instance, here we extract numbers in different formats from the same buffer:

// // binary array of 4 bytes, all have the maximal value 255
// let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

// let dataView = new DataView(buffer);

// // get 8-bit number at offset 0
// console.log( dataView.getUint8(0) ); // 255

// // now get 16-bit number at offset 0, it consists of 2 bytes, together interpreted as 65535
// console.log( dataView.getUint16(0) ); // 65535 (biggest 16-bit unsigned int)

// // get 32-bit number at offset 0
// console.log( dataView.getUint32(0) ); // 4294967295 (biggest 32-bit unsigned int)

// dataView.setUint32(0, 0); // set 4-byte number to zero, thus setting all bytes to 0
// DataView is great when we store mixed-format data in the same buffer. For example, when we store a sequence of pairs (16-bit integer, 32-bit float), DataView allows to access them easily.

// Summary
// ArrayBuffer is the core object, a reference to the fixed-length contiguous memory area.

// To do almost any operation on ArrayBuffer, we need a view.

// It can be a TypedArray:
// Uint8Array, Uint16Array, Uint32Array – for unsigned integers of 8, 16, and 32 bits.
// Uint8ClampedArray – for 8-bit integers, “clamps” them on assignment.
// Int8Array, Int16Array, Int32Array – for signed integer numbers (can be negative).
// Float32Array, Float64Array – for signed floating-point numbers of 32 and 64 bits.
// Or a DataView – the view that uses methods to specify a format, e.g. getUint8(offset).
// In most cases we create and operate directly on typed arrays, leaving ArrayBuffer under cover, as a “common denominator”. We can access it as .buffer and make another view if needed.

// There are also two additional terms, that are used in descriptions of methods that operate on binary data:

// ArrayBufferView is an umbrella term for all these kinds of views.
// BufferSource is an umbrella term for ArrayBuffer or ArrayBufferView.
// We’ll see these terms in the next chapters. BufferSource is one of the most common terms, as it means “any kind of binary data” – an ArrayBuffer or a view over it.

// Here’s a cheatsheet:

// ///////////////////////////////////////////////////////////////////

// // TextDecoder and TextEncoder
// TextDecoder and TextEncoder
// What if the binary data is actually a string? For instance, we received a file with textual data.

// The built-in TextDecoder object allows one to read the value into an actual JavaScript string, given the buffer and the encoding.

// We first need to create it:

// let decoder = new TextDecoder([label], [options]);
// label – the encoding, utf-8 by default, but big5, windows-1251 and many other are also supported.
// options – optional object:
// fatal – boolean, if true then throw an exception for invalid (non-decodable) characters, otherwise (default) replace them with character \uFFFD.
// ignoreBOM – boolean, if true then ignore BOM (an optional byte-order Unicode mark), rarely needed.
// …And then decode:

// let str = decoder.decode([input], [options]);
// input – BufferSource to decode.
// options – optional object:
// stream – true for decoding streams, when decoder is called repeatedly with incoming chunks of data. In that case a multi-byte character may occasionally split between chunks. This options tells TextDecoder to memorize “unfinished” characters and decode them when the next chunk comes.
// For instance:

// let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

// console.log( new TextDecoder().decode(uint8Array) ); // Hello
// let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

// console.log( new TextDecoder().decode(uint8Array) ); // 你好
// We can decode a part of the buffer by creating a subarray view for it:

// let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// // the string is in the middle
// // create a new view over it, without copying anything
// let binaryString = uint8Array.subarray(1, -1);

// console.log( new TextDecoder().decode(binaryString) ); // Hello
// TextEncoder
// TextEncoder does the reverse thing – converts a string into bytes.

// The syntax is:

// let encoder = new TextEncoder();
// The only encoding it supports is “utf-8”.

// It has two methods:

// encode(str) – returns Uint8Array from a string.
// encodeInto(str, destination) – encodes str into destination that must be Uint8Array.
// let encoder = new TextEncoder();

// let uint8Array = encoder.encode("Hello");
// console.log(uint8Array); // 72,101,108,108,111
// ///////////////////////////////////////////////////////////////////

// // Blob
// Blob
// ArrayBuffer and views are a part of ECMA standard, a part of JavaScript.

// In the browser, there are additional higher-level objects, described in File API, in particular Blob.

// Blob consists of an optional string type (a MIME-type usually), plus blobParts – a sequence of other Blob objects, strings and BufferSource.

// The constructor syntax is:

// new Blob(blobParts, options);
// blobParts is an array of Blob/BufferSource/String values.
// options optional object:
// type – Blob type, usually MIME-type, e.g. image/png,
// endings – whether to transform end-of-line to make the Blob correspond to current OS newlines (\r\n or \n). By default "transparent" (do nothing), but also can be "native" (transform).
// For example:

// // create Blob from a string
// let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// // please note: the first argument must be an array [...]
// // create Blob from a typed array and strings
// let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form

// let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
// We can extract Blob slices with:

// blob.slice([byteStart], [byteEnd], [contentType]);
// byteStart – the starting byte, by default 0.
// byteEnd – the last byte (exclusive, by default till the end).
// contentType – the type of the new blob, by default the same as the source.
// The arguments are similar to array.slice, negative numbers are allowed too.

// Blob objects are immutable
// We can’t change data directly in a Blob, but we can slice parts of a Blob, create new Blob objects from them, mix them into a new Blob and so on.

// This behavior is similar to JavaScript strings: we can’t change a character in a string, but we can make a new corrected string.

// Blob as URL
// A Blob can be easily used as a URL for <a>, <img> or other tags, to show its contents.

// Thanks to type, we can also download/upload Blob objects, and the type naturally becomes Content-Type in network requests.

// Let’s start with a simple example. By clicking on a link you download a dynamically-generated Blob with hello world contents as a file:

// <!-- download attribute forces the browser to download instead of navigating -->
// <a download="hello.txt" href='#' id="link">Download</a>

// <script>
// let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

// link.href = URL.createObjectURL(blob);
// </script>
// We can also create a link dynamically in JavaScript and simulate a click by link.click(), then download starts automatically.

// Here’s the similar code that causes user to download the dynamically created Blob, without any HTML:

// let link = document.createElement('a');
// link.download = 'hello.txt';

// let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

// link.href = URL.createObjectURL(blob);

// link.click();

// URL.revokeObjectURL(link.href);
// URL.createObjectURL takes a Blob and creates a unique URL for it, in the form blob:<origin>/<uuid>.

// That’s what the value of link.href looks like:

// blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
// For each URL generated by URL.createObjectURL the browser stores a URL → Blob mapping internally. So such URLs are short, but allow to access the Blob.

// A generated URL (and hence the link with it) is only valid within the current document, while it’s open. And it allows to reference the Blob in <img>, <a>, basically any other object that expects a URL.

// There’s a side effect though. While there’s a mapping for a Blob, the Blob itself resides in the memory. The browser can’t free it.

// The mapping is automatically cleared on document unload, so Blob objects are freed then. But if an app is long-living, then that doesn’t happen soon.

// So if we create a URL, that Blob will hang in memory, even if not needed any more.

// URL.revokeObjectURL(url) removes the reference from the internal mapping, thus allowing the Blob to be deleted (if there are no other references), and the memory to be freed.

// In the last example, we intend the Blob to be used only once, for instant downloading, so we call URL.revokeObjectURL(link.href) immediately.

// In the previous example with the clickable HTML-link, we don’t call URL.revokeObjectURL(link.href), because that would make the Blob url invalid. After the revocation, as the mapping is removed, the URL doesn’t work any more.

// Blob to base64
// An alternative to URL.createObjectURL is to convert a Blob into a base64-encoded string.

// That encoding represents binary data as a string of ultra-safe “readable” characters with ASCII-codes from 0 to 64. And what’s more important – we can use this encoding in “data-urls”.

// A data url has the form data:[<mediatype>][;base64],<data>. We can use such urls everywhere, on par with “regular” urls.

// For instance, here’s a smiley:

// <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
// The browser will decode the string and show the image:

// To transform a Blob into base64, we’ll use the built-in FileReader object. It can read data from Blobs in multiple formats. In the next chapter we’ll cover it more in-depth.

// Here’s the demo of downloading a blob, now via base-64:

// let link = document.createElement('a');
// link.download = 'hello.txt';

// let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

// let reader = new FileReader();
// reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

// reader.onload = function() {
//   link.href = reader.result; // data url
//   link.click();
// };
// Both ways of making a URL of a Blob are usable. But usually URL.createObjectURL(blob) is simpler and faster.

// URL.createObjectURL(blob)
// We need to revoke them if care about memory.
// Direct access to blob, no “encoding/decoding”
// Blob to data url
// No need to revoke anything.
// Performance and memory losses on big Blob objects for encoding.
// Image to blob
// We can create a Blob of an image, an image part, or even make a page screenshot. That’s handy to upload it somewhere.

// Image operations are done via <canvas> element:

// Draw an image (or its part) on canvas using canvas.drawImage.
// Call canvas method .toBlob(callback, format, quality) that creates a Blob and runs callback with it when done.
// In the example below, an image is just copied, but we could cut from it, or transform it on canvas prior to making a blob:

// // take any image
// let img = document.querySelector('img');

// // make <canvas> of the same size
// let canvas = document.createElement('canvas');
// canvas.width = img.clientWidth;
// canvas.height = img.clientHeight;

// let context = canvas.getContext('2d');

// // copy image to it (this method allows to cut image)
// context.drawImage(img, 0, 0);
// // we can context.rotate(), and do many other things on canvas

// // toBlob is async operation, callback is called when done
// canvas.toBlob(function(blob) {
//   // blob ready, download it
//   let link = document.createElement('a');
//   link.download = 'example.png';

//   link.href = URL.createObjectURL(blob);
//   link.click();

//   // delete the internal blob reference, to let the browser clear memory from it
//   URL.revokeObjectURL(link.href);
// }, 'image/png');
// If we prefer async/await instead of callbacks:

// let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
// For screenshotting a page, we can use a library such as https://github.com/niklasvh/html2canvas. What it does is just walks the page and draws it on <canvas>. Then we can get a Blob of it the same way as above.

// From Blob to ArrayBuffer
// The Blob constructor allows to create a blob from almost anything, including any BufferSource.

// But if we need to perform low-level processing, we can get the lowest-level ArrayBuffer from blob.arrayBuffer():

// // get arrayBuffer from blob
// const bufferPromise = await blob.arrayBuffer();

// // or
// blob.arrayBuffer().then(buffer => /* process the ArrayBuffer */);
// From Blob to stream
// When we read and write to a blob of more than 2 GB, the use of arrayBuffer becomes more memory intensive for us. At this point, we can directly convert the blob to a stream.

// A stream is a special object that allows to read from it (or write into it) portion by portion. It’s outside of our scope here, but here’s an example, and you can read more at https://developer.mozilla.org/en-US/docs/Web/API/Streams_API. Streams are convenient for data that is suitable for processing piece-by-piece.

// The Blob interface’s stream() method returns a ReadableStream which upon reading returns the data contained within the Blob.

// Then we can read from it, like this:

// // get readableStream from blob
// const readableStream = blob.stream();
// const stream = readableStream.getReader();

// while (true) {
//   // for each iteration: value is the next blob fragment
//   let { done, value } = await stream.read();
//   if (done) {
//     // no more data in the stream
//     console.log('all blob processed.');
//     break;
//   }

//    // do something with the data portion we've just read from the blob
//   console.log(value);
// }
// Summary
// While ArrayBuffer, Uint8Array and other BufferSource are “binary data”, a Blob represents “binary data with type”.

// That makes Blobs convenient for upload/download operations, that are so common in the browser.

// Methods that perform web-requests, such as XMLHttpRequest, fetch and so on, can work with Blob natively, as well as with other binary types.

// We can easily convert between Blob and low-level binary data types:

// We can make a Blob from a typed array using new Blob(...) constructor.
// We can get back ArrayBuffer from a Blob using blob.arrayBuffer(), and then create a view over it for low-level binary processing.
// Conversion streams are very useful when we need to handle large blob. You can easily create a ReadableStream from a blob. The Blob interface’s stream() method returns a ReadableStream which upon reading returns the data contained within the blob.
// ///////////////////////////////////////////////////////////////////

// // File and FileReader
// File and FileReader
// A File object inherits from Blob and is extended with filesystem-related capabilities.

// There are two ways to obtain it.

// First, there’s a constructor, similar to Blob:

// new File(fileParts, fileName, [options])
// fileParts – is an array of Blob/BufferSource/String values.
// fileName – file name string.
// options – optional object:
// lastModified – the timestamp (integer date) of last modification.
// Second, more often we get a file from <input type="file"> or drag’n’drop or other browser interfaces. In that case, the file gets this information from OS.

// As File inherits from Blob, File objects have the same properties, plus:

// name – the file name,
// lastModified – the timestamp of last modification.
// That’s how we can get a File object from <input type="file">:

// <input type="file" onchange="showFile(this)">

// <script>
// function showFile(input) {
//   let file = input.files[0];

//   console.log(`File name: ${file.name}`); // e.g my.png
//   console.log(`Last modified: ${file.lastModified}`); // e.g 1552830408824
// }
// </script>
// Please note:
// The input may select multiple files, so input.files is an array-like object with them. Here we have only one file, so we just take input.files[0].

// FileReader
// FileReader is an object with the sole purpose of reading data from Blob (and hence File too) objects.

// It delivers the data using events, as reading from disk may take time.

// The constructor:

// let reader = new FileReader(); // no arguments
// The main methods:

// readAsArrayBuffer(blob) – read the data in binary format ArrayBuffer.
// readAsText(blob, [encoding]) – read the data as a text string with the given encoding (utf-8 by default).
// readAsDataURL(blob) – read the binary data and encode it as base64 data url.
// abort() – cancel the operation.
// The choice of read* method depends on which format we prefer, how we’re going to use the data.

// readAsArrayBuffer – for binary files, to do low-level binary operations. For high-level operations, like slicing, File inherits from Blob, so we can call them directly, without reading.
// readAsText – for text files, when we’d like to get a string.
// readAsDataURL – when we’d like to use this data in src for img or another tag. There’s an alternative to reading a file for that, as discussed in chapter Blob: URL.createObjectURL(file).
// As the reading proceeds, there are events:

// loadstart – loading started.
// progress – occurs during reading.
// load – no errors, reading complete.
// abort – abort() called.
// error – error has occurred.
// loadend – reading finished with either success or failure.
// When the reading is finished, we can access the result as:

// reader.result is the result (if successful)
// reader.error is the error (if failed).
// The most widely used events are for sure load and error.

// Here’s an example of reading a file:

// <input type="file" onchange="readFile(this)">

// <script>
// function readFile(input) {
//   let file = input.files[0];

//   let reader = new FileReader();

//   reader.readAsText(file);

//   reader.onload = function() {
//     console.log(reader.result);
//   };

//   reader.onerror = function() {
//     console.log(reader.error);
//   };

// }
// </script>
// FileReader for blobs
// As mentioned in the chapter Blob, FileReader can read not just files, but any blobs.

// We can use it to convert a blob to another format:

// readAsArrayBuffer(blob) – to ArrayBuffer,
// readAsText(blob, [encoding]) – to string (an alternative to TextDecoder),
// readAsDataURL(blob) – to base64 data url.
// FileReaderSync is available inside Web Workers
// For Web Workers, there also exists a synchronous variant of FileReader, called FileReaderSync.

// Its reading methods read* do not generate events, but rather return a result, as regular functions do.

// That’s only inside a Web Worker though, because delays in synchronous calls, that are possible while reading from files, in Web Workers are less important. They do not affect the page.

// Summary
// File objects inherit from Blob.

// In addition to Blob methods and properties, File objects also have name and lastModified properties, plus the internal ability to read from filesystem. We usually get File objects from user input, like <input> or Drag’n’Drop events (ondragend).

// FileReader objects can read from a file or a blob, in one of three formats:

// String (readAsText).
// ArrayBuffer (readAsArrayBuffer).
// Data url, base-64 encoded (readAsDataURL).
// In many cases though, we don’t have to read the file contents. Just as we did with blobs, we can create a short url with URL.createObjectURL(file) and assign it to <a> or <img>. This way the file can be downloaded or shown up as an image, as a part of canvas etc.

// And if we’re going to send a File over a network, that’s also easy: network API like XMLHttpRequest or fetch natively accepts File objects.
// ///////////////////////////////////////////////////////////////////
