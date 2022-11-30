// // Bezier curve
// Bezier curve
// Bezier curves are used in computer graphics to draw shapes, for CSS animation and in many other places.

// They are a very simple thing, worth to study once and then feel comfortable in the world of vector graphics and advanced animations.

// Some theory, please
// This article provides a theoretical, but very needed insight into what Bezier curves are, while the next one shows how we can use them for CSS animations.

// Please take your time to read and understand the concept, it’ll serve you well.

// Control points
// A bezier curve is defined by control points.

// There may be 2, 3, 4 or more.

// For instance, two points curve:

// Three points curve:

// Four points curve:

// If you look closely at these curves, you can immediately notice:

// Points are not always on curve. That’s perfectly normal, later we’ll see how the curve is built.

// The curve order equals the number of points minus one. For two points we have a linear curve (that’s a straight line), for three points – quadratic curve (parabolic), for four points – cubic curve.

// A curve is always inside the convex hull of control points:

// Because of that last property, in computer graphics it’s possible to optimize intersection tests. If convex hulls do not intersect, then curves do not either. So checking for the convex hulls intersection first can give a very fast “no intersection” result. Checking the intersection of convex hulls is much easier, because they are rectangles, triangles and so on (see the picture above), much simpler figures than the curve.

// The main value of Bezier curves for drawing – by moving the points the curve is changing in intuitively obvious way.

// Try to move control points using a mouse in the example below:

// As you can notice, the curve stretches along the tangential lines 1 → 2 and 3 → 4.

// After some practice it becomes obvious how to place points to get the needed curve. And by connecting several curves we can get practically anything.

// Here are some examples:

// De Casteljau’s algorithm
// There’s a mathematical formula for Bezier curves, but let’s cover it a bit later, because De Casteljau’s algorithm is identical to the mathematical definition and visually shows how it is constructed.

// First let’s see the 3-points example.

// Here’s the demo, and the explanation follow.

// Control points (1,2 and 3) can be moved by the mouse. Press the “play” button to run it.

// De Casteljau’s algorithm of building the 3-point bezier curve:

// Draw control points. In the demo above they are labeled: 1, 2, 3.

// Build segments between control points 1 → 2 → 3. In the demo above they are brown.

// The parameter t moves from 0 to 1. In the example above the step 0.05 is used: the loop goes over 0, 0.05, 0.1, 0.15, ... 0.95, 1.

// For each of these values of t:

// On each brown segment we take a point located on the distance proportional to t from its beginning. As there are two segments, we have two points.

// For instance, for t=0 – both points will be at the beginning of segments, and for t=0.25 – on the 25% of segment length from the beginning, for t=0.5 – 50%(the middle), for t=1 – in the end of segments.

// Connect the points. On the picture below the connecting segment is painted blue.

// For t=0.25	For t=0.5

// Now in the blue segment take a point on the distance proportional to the same value of t. That is, for t=0.25 (the left picture) we have a point at the end of the left quarter of the segment, and for t=0.5 (the right picture) – in the middle of the segment. On pictures above that point is red.

// As t runs from 0 to 1, every value of t adds a point to the curve. The set of such points forms the Bezier curve. It’s red and parabolic on the pictures above.

// That was a process for 3 points. But the same is for 4 points.

// The demo for 4 points (points can be moved by a mouse):

// The algorithm for 4 points:

// Connect control points by segments: 1 → 2, 2 → 3, 3 → 4. There will be 3 brown segments.
// For each t in the interval from 0 to 1:
// We take points on these segments on the distance proportional to t from the beginning. These points are connected, so that we have two green segments.
// On these segments we take points proportional to t. We get one blue segment.
// On the blue segment we take a point proportional to t. On the example above it’s red.
// These points together form the curve.
// The algorithm is recursive and can be generalized for any number of control points.

// Given N of control points:

// We connect them to get initially N-1 segments.
// Then for each t from 0 to 1, we take a point on each segment on the distance proportional to t and connect them. There will be N-2 segments.
// Repeat step 2 until there is only one point.
// These points make the curve.

// Run and pause examples to clearly see the segments and how the curve is built.

// A curve that looks like y=1/t:

// Zig-zag control points also work fine:

// Making a loop is possible:

// A non-smooth Bezier curve (yeah, that’s possible too):

// If there’s something unclear in the algorithm description, please look at the live examples above to see how the curve is built.

// As the algorithm is recursive, we can build Bezier curves of any order, that is: using 5, 6 or more control points. But in practice many points are less useful. Usually we take 2-3 points, and for complex lines glue several curves together. That’s simpler to develop and calculate.

// How to draw a curve through given points?
// To specify a Bezier curve, control points are used. As we can see, they are not on the curve, except the first and the last ones.

// Sometimes we have another task: to draw a curve through several points, so that all of them are on a single smooth curve. That task is called interpolation, and here we don’t cover it.

// There are mathematical formulas for such curves, for instance Lagrange polynomial. In computer graphics spline interpolation is often used to build smooth curves that connect many points.

// Maths
// A Bezier curve can be described using a mathematical formula.

// As we saw – there’s actually no need to know it, most people just draw the curve by moving points with a mouse. But if you’re into maths – here it is.

// Given the coordinates of control points Pi: the first control point has coordinates P1 = (x1, y1), the second: P2 = (x2, y2), and so on, the curve coordinates are described by the equation that depends on the parameter t from the segment [0,1].

// The formula for a 2-points curve:

// P = (1-t)P1 + tP2

// For 3 control points:

// P = (1−t)2P1 + 2(1−t)tP2 + t2P3

// For 4 control points:

// P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4

// These are vector equations. In other words, we can put x and y instead of P to get corresponding coordinates.

// For instance, the 3-point curve is formed by points (x,y) calculated as:

// x = (1−t)2x1 + 2(1−t)tx2 + t2x3
// y = (1−t)2y1 + 2(1−t)ty2 + t2y3
// Instead of x1, y1, x2, y2, x3, y3 we should put coordinates of 3 control points, and then as t moves from 0 to 1, for each value of t we’ll have (x,y) of the curve.

// For instance, if control points are (0,0), (0.5, 1) and (1, 0), the equations become:

// x = (1−t)2 * 0 + 2(1−t)t * 0.5 + t2 * 1 = (1-t)t + t2 = t
// y = (1−t)2 * 0 + 2(1−t)t * 1 + t2 * 0 = 2(1-t)t = –2t2 + 2t
// Now as t runs from 0 to 1, the set of values (x,y) for each t forms the curve for such control points.

// Summary
// Bezier curves are defined by their control points.

// We saw two definitions of Bezier curves:

// Using a drawing process: De Casteljau’s algorithm.
// Using a mathematical formulas.
// Good properties of Bezier curves:

// We can draw smooth lines with a mouse by moving control points.
// Complex shapes can be made of several Bezier curves.
// Usage:

// In computer graphics, modeling, vector graphic editors. Fonts are described by Bezier curves.
// In web development – for graphics on Canvas and in the SVG format. By the way, “live” examples above are written in SVG. They are actually a single SVG document that is given different points as parameters. You can open it in a separate window and see the source: demo.svg.
// In CSS animation to describe the path and speed of animation.
// ///////////////////////////////////////////////////////////////////

// // CSS-animations
// CSS-animations
// CSS animations make it possible to do simple animations without JavaScript at all.

// JavaScript can be used to control CSS animations and make them even better, with little code.

// CSS transitions
// The idea of CSS transitions is simple. We describe a property and how its changes should be animated. When the property changes, the browser paints the animation.

// That is, all we need is to change the property, and the fluid transition will be done by the browser.

// For instance, the CSS below animates changes of background-color for 3 seconds:

// .animated {
//   transition-property: background-color;
//   transition-duration: 3s;
// }
// Now if an element has .animated class, any change of background-color is animated during 3 seconds.

// Click the button below to animate the background:

// <button id="color">Click me</button>

// <style>
//   #color {
//     transition-property: background-color;
//     transition-duration: 3s;
//   }
// </style>

// <script>
//   color.onclick = function() {
//     this.style.backgroundColor = 'red';
//   };
// </script>

// There are 4 properties to describe CSS transitions:

// transition-property
// transition-duration
// transition-timing-function
// transition-delay
// We’ll cover them in a moment, for now let’s note that the common transition property allows declaring them together in the order: property duration timing-function delay, as well as animating multiple properties at once.

// For instance, this button animates both color and font-size:

// <button id="growing">Click me</button>

// <style>
// #growing {
//   transition: font-size 3s, color 2s;
// }
// </style>

// <script>
// growing.onclick = function() {
//   this.style.fontSize = '36px';
//   this.style.color = 'red';
// };
// </script>

// Now, let’s cover animation properties one by one.

// transition-property
// In transition-property, we write a list of properties to animate, for instance: left, margin-left, height, color. Or we could write all, which means “animate all properties”.

// Do note that, there are properties which can not be animated. However, most of the generally used properties are animatable.

// transition-duration
// In transition-duration we can specify how long the animation should take. The time should be in CSS time format: in seconds s or milliseconds ms.

// transition-delay
// In transition-delay we can specify the delay before the animation. For instance, if transition-delay is 1s and transition-duration is 2s, then the animation starts 1 second after the property change and the total duration will be 2 seconds.

// Negative values are also possible. Then the animation is shown immediately, but the starting point of the animation will be after given value (time). For example, if transition-delay is -1s and transition-duration is 2s, then animation starts from the halfway point and total duration will be 1 second.

// Here the animation shifts numbers from 0 to 9 using CSS translate property:

// Resultscript.jsstyle.cssindex.html

// The transform property is animated like this:

// #stripe.animate {
//   transform: translate(-90%);
//   transition-property: transform;
//   transition-duration: 9s;
// }
// In the example above JavaScript adds the class .animate to the element – and the animation starts:

// stripe.classList.add('animate');
// We could also start it from somewhere in the middle of the transition, from an exact number, e.g. corresponding to the current second, using a negative transition-delay.

// Here if you click the digit – it starts the animation from the current second:

// Resultscript.jsstyle.cssindex.html

// JavaScript does it with an extra line:

// stripe.onclick = function() {
//   let sec = new Date().getSeconds() % 10;
//   // for instance, -3s here starts the animation from the 3rd second
//   stripe.style.transitionDelay = '-' + sec + 's';
//   stripe.classList.add('animate');
// };
// transition-timing-function
// The timing function describes how the animation process is distributed along its timeline. Will it start slowly and then go fast, or vice versa.

// It appears to be the most complicated property at first. But it becomes very simple if we devote a bit time to it.

// That property accepts two kinds of values: a Bezier curve or steps. Let’s start with the curve, as it’s used more often.

// Bezier curve
// The timing function can be set as a Bezier curve with 4 control points that satisfy the conditions:

// First control point: (0,0).
// Last control point: (1,1).
// For intermediate points, the values of x must be in the interval 0..1, y can be anything.
// The syntax for a Bezier curve in CSS: cubic-bezier(x2, y2, x3, y3). Here we need to specify only 2nd and 3rd control points, because the 1st one is fixed to (0,0) and the 4th one is (1,1).

// The timing function describes how fast the animation process goes.

// The x axis is the time: 0 – the start, 1 – the end of transition-duration.
// The y axis specifies the completion of the process: 0 – the starting value of the property, 1 – the final value.
// The simplest variant is when the animation goes uniformly, with the same linear speed. That can be specified by the curve cubic-bezier(0, 0, 1, 1).

// Here’s how that curve looks:

// …As we can see, it’s just a straight line. As the time (x) passes, the completion (y) of the animation steadily goes from 0 to 1.

// The train in the example below goes from left to right with the permanent speed (click it):

// Resultstyle.cssindex.html

// The CSS transition is based on that curve:

// .train {
//   left: 0;
//   transition: left 5s cubic-bezier(0, 0, 1, 1);
//   /* click on a train sets left to 450px, thus triggering the animation */
// }
// …And how can we show a train slowing down?

// We can use another Bezier curve: cubic-bezier(0.0, 0.5, 0.5 ,1.0).

// The graph:

// As we can see, the process starts fast: the curve soars up high, and then slower and slower.

// Here’s the timing function in action (click the train):

// Resultstyle.cssindex.html

// CSS:

// .train {
//   left: 0;
//   transition: left 5s cubic-bezier(0, .5, .5, 1);
//   /* click on a train sets left to 450px, thus triggering the animation */
// }
// There are several built-in curves: linear, ease, ease-in, ease-out and ease-in-out.

// The linear is a shorthand for cubic-bezier(0, 0, 1, 1) – a straight line, which we described above.

// Other names are shorthands for the following cubic-bezier:

// ease*	ease-in	ease-out	ease-in-out
// (0.25, 0.1, 0.25, 1.0)	(0.42, 0, 1.0, 1.0)	(0, 0, 0.58, 1.0)	(0.42, 0, 0.58, 1.0)

// * – by default, if there’s no timing function, ease is used.

// So we could use ease-out for our slowing down train:

// .train {
//   left: 0;
//   transition: left 5s ease-out;
//   /* same as transition: left 5s cubic-bezier(0, .5, .5, 1); */
// }
// But it looks a bit differently.

// A Bezier curve can make the animation exceed its range.

// The control points on the curve can have any y coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.

// In the example below the animation code is:

// .train {
//   left: 100px;
//   transition: left 5s cubic-bezier(.5, -1, .5, 2);
//   /* click on a train sets left to 450px */
// }
// The property left should animate from 100px to 400px.

// But if you click the train, you’ll see that:

// First, the train goes back: left becomes less than 100px.
// Then it goes forward, a little bit farther than 400px.
// And then back again – to 400px.
// Resultstyle.cssindex.html

// Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

// We moved the y coordinate of the 2nd point below zero, and for the 3rd point we made it over 1, so the curve goes out of the “regular” quadrant. The y is out of the “standard” range 0..1.

// As we know, y measures “the completion of the animation process”. The value y = 0 corresponds to the starting property value and y = 1 – the ending value. So values y<0 move the property beyond the starting left and y>1 – past the final left.

// That’s a “soft” variant for sure. If we put y values like -99 and 99 then the train would jump out of the range much more.

// But how do we make a Bezier curve for a specific task? There are many tools.

// For instance, we can do it on the site https://cubic-bezier.com.
// Browser developer tools also have special support for Bezier curves in CSS:
// Open the developer tools with F12 (Mac: Cmd+Opt+I).
// Select the Elements tab, then pay attention to the Styles sub-panel at the right side.
// CSS properties with a word cubic-bezier will have an icon before this word.
// Click this icon to edit the curve.
// Steps
// The timing function steps(number of steps[, start/end]) allows splitting an transition into multiple steps.

// Let’s see that in an example with digits.

// Here’s a list of digits, without any animations, just as a source:

// Resultstyle.cssindex.html

// In the HTML, a stripe of digits is enclosed into a fixed-length <div id="digits">:

// <div id="digit">
//   <div id="stripe">0123456789</div>
// </div>
// The #digit div has a fixed width and a border, so it looks like a red window.

// We’ll make a timer: the digits will appear one by one, in a discrete way.

// To achieve that, we’ll hide the #stripe outside of #digit using overflow: hidden, and then shift the #stripe to the left step-by-step.

// There will be 9 steps, a step-move for each digit:

// #stripe.animate  {
//   transform: translate(-90%);
//   transition: transform 9s steps(9, start);
// }
// The first argument of steps(9, start) is the number of steps. The transform will be split into 9 parts (10% each). The time interval is automatically divided into 9 parts as well, so transition: 9s gives us 9 seconds for the whole animation – 1 second per digit.

// The second argument is one of two words: start or end.

// The start means that in the beginning of animation we need to make the first step immediately.

// In action:

// Resultstyle.cssindex.html

// A click on the digit changes it to 1 (the first step) immediately, and then changes in the beginning of the next second.

// The process is progressing like this:

// 0s – -10% (first change in the beginning of the 1st second, immediately)
// 1s – -20%
// …
// 8s – -90%
// (the last second shows the final value).
// Here, the first change was immediate because of start in the steps.

// The alternative value end would mean that the change should be applied not in the beginning, but at the end of each second.

// So the process for steps(9, end) would go like this:

// 0s – 0 (during the first second nothing changes)
// 1s – -10% (first change at the end of the 1st second)
// 2s – -20%
// …
// 9s – -90%
// Here’s steps(9, end) in action (note the pause before the first digit change):

// Resultstyle.cssindex.html

// There are also some pre-defined shorthands for steps(...):

// step-start – is the same as steps(1, start). That is, the animation starts immediately and takes 1 step. So it starts and finishes immediately, as if there were no animation.
// step-end – the same as steps(1, end): make the animation in a single step at the end of transition-duration.
// These values are rarely used, as they represent not a real animation, but rather a single-step change. We mention them here for completeness.

// Event: “transitionend”
// When the CSS animation finishes, the transitionend event triggers.

// It is widely used to do an action after the animation is done. Also we can join animations.

// For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

// The animation is initiated by the function go that re-runs each time the transition finishes, and flips the direction:

// boat.onclick = function() {
//   //...
//   let times = 1;

//   function go() {
//     if (times % 2) {
//       // sail to the right
//       boat.classList.remove('back');
//       boat.style.marginLeft = 100 * times + 200 + 'px';
//     } else {
//       // sail to the left
//       boat.classList.add('back');
//       boat.style.marginLeft = 100 * times - 200 + 'px';
//     }

//   }

//   go();

//   boat.addEventListener('transitionend', function() {
//     times++;
//     go();
//   });
// };
// The event object for transitionend has a few specific properties:

// event.propertyName
// The property that has finished animating. Can be good if we animate multiple properties simultaneously.
// event.elapsedTime
// The time (in seconds) that the animation took, without transition-delay.
// Keyframes
// We can join multiple simple animations together using the @keyframes CSS rule.

// It specifies the “name” of the animation and rules – what, when and where to animate. Then using the animation property, we can attach the animation to the element and specify additional parameters for it.

// Here’s an example with explanations:

// <div class="progress"></div>

// <style>
//   @keyframes go-left-right {        /* give it a name: "go-left-right" */
//     from { left: 0px; }             /* animate from left: 0px */
//     to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
//   }

//   .progress {
//     animation: go-left-right 3s infinite alternate;
//     /* apply the animation "go-left-right" to the element
//        duration 3 seconds
//        number of times: infinite
//        alternate direction every time
//     */

//     position: relative;
//     border: 2px solid green;
//     width: 50px;
//     height: 20px;
//     background: lime;
//   }
// </style>

// There are many articles about @keyframes and a detailed specification.

// You probably won’t need @keyframes often, unless everything is in constant motion on your sites.

// Performance
// Most CSS properties can be animated, because most of them are numeric values. For instance, width, color, font-size are all numbers. When you animate them, the browser gradually changes these numbers frame by frame, creating a smooth effect.

// However, not all animations will look as smooth as you’d like, because different CSS properties cost differently to change.

// In more technical details, when there’s a style change, the browser goes through 3 steps to render the new look:

// Layout: re-compute the geometry and position of each element, then
// Paint: re-compute how everything should look like at their places, including background, colors,
// Composite: render the final results into pixels on screen, apply CSS transforms if they exist.
// During a CSS animation, this process repeats every frame. However, CSS properties that never affect geometry or position, such as color, may skip the Layout step. If a color changes, the browser doesn’t calculate any new geometry, it goes to Paint → Composite. And there are few properties that directly go to Composite. You can find a longer list of CSS properties and which stages they trigger at https://csstriggers.com.

// The calculations may take time, especially on pages with many elements and a complex layout. And the delays are actually visible on most devices, leading to “jittery”, less fluid animations.

// Animations of properties that skip the Layout step are faster. It’s even better if Paint is skipped too.

// The transform property is a great choice, because:

// CSS transforms affect the target element box as a whole (rotate, flip, stretch, shift it).
// CSS transforms never affect neighbour elements.
// …So browsers apply transform “on top” of existing Layout and Paint calculations, in the Composite stage.

// In other words, the browser calculates the Layout (sizes, positions), paints it with colors, backgrounds, etc at the Paint stage, and then applies transform to element boxes that need it.

// Changes (animations) of the transform property never trigger Layout and Paint steps. More than that, the browser leverages the graphics accelerator (a special chip on the CPU or graphics card) for CSS transforms, thus making them very efficient.

// Luckily, the transform property is very powerful. By using transform on an element, you could rotate and flip it, stretch and shrink it, move it around, and much more. So instead of left/margin-left properties we can use transform: translateX(…), use transform: scale for increasing element size, etc.

// The opacity property also never triggers Layout (also skips Paint in Mozilla Gecko). We can use it for show/hide or fade-in/fade-out effects.

// Paring transform with opacity can usually solve most of our needs, providing fluid, good-looking animations.

// For example, here clicking on the #boat element adds the class with transform: translateX(300) and opacity: 0, thus making it move 300px to the right and disappear:

// <img src="https://js.cx/clipart/boat.png" id="boat">

// <style>
// #boat {
//   cursor: pointer;
//   transition: transform 2s ease-in-out, opacity 2s ease-in-out;
// }

// .move {
//   transform: translateX(300px);
//   opacity: 0;
// }
// </style>
// <script>
//   boat.onclick = () => boat.classList.add('move');
// </script>

// Here’s a more complex example, with @keyframes:

// <h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
// <style>
//   .animated {
//     animation: hello-goodbye 1.8s infinite;
//     width: fit-content;
//   }
//   @keyframes hello-goodbye {
//     0% {
//       transform: translateY(-60px) rotateX(0.7turn);
//       opacity: 0;
//     }
//     50% {
//       transform: none;
//       opacity: 1;
//     }
//     100% {
//       transform: translateX(230px) rotateZ(90deg) scale(0.5);
//       opacity: 0;
//     }
//   }
// </style>

// Summary
// CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.

// They are good for most animation tasks. We’re also able to use JavaScript for animations, the next chapter is devoted to that.

// Limitations of CSS animations compared to JavaScript animations:

// Merits
// Simple things done simply.
// Fast and lightweight for CPU.
// Demerits
// JavaScript animations are flexible. They can implement any animation logic, like an “explosion” of an element.
// Not just property changes. We can create new elements in JavaScript as part of the animation.
// In early examples in this chapter, we animate font-size, left, width, height, etc. In real life projects, we should use transform: scale() and transform: translate() for better performance.

// The majority of animations can be implemented using CSS as described in this chapter. And the transitionend event allows JavaScript to be run after the animation, so it integrates fine with the code.

// But in the next chapter we’ll do some JavaScript animations to cover more complex cases.
// ///////////////////////////////////////////////////////////////////

// // JavaScript animations
// JavaScript animations
// JavaScript animations can handle things that CSS can’t.

// For instance, moving along a complex path, with a timing function different from Bezier curves, or an animation on a canvas.

// Using setInterval
// An animation can be implemented as a sequence of frames – usually small changes to HTML/CSS properties.

// For instance, changing style.left from 0px to 100px moves the element. And if we increase it in setInterval, changing by 2px with a tiny delay, like 50 times per second, then it looks smooth. That’s the same principle as in the cinema: 24 frames per second is enough to make it look smooth.

// The pseudo-code can look like this:

// let timer = setInterval(function() {
//   if (animation complete) clearInterval(timer);
//   else increase style.left by 2px
// }, 20); // change by 2px every 20ms, about 50 frames per second
// More complete example of the animation:

// let start = Date.now(); // remember start time

// let timer = setInterval(function() {
//   // how much time passed from the start?
//   let timePassed = Date.now() - start;

//   if (timePassed >= 2000) {
//     clearInterval(timer); // finish the animation after 2 seconds
//     return;
//   }

//   // draw the animation at the moment timePassed
//   draw(timePassed);

// }, 20);

// // as timePassed goes from 0 to 2000
// // left gets values from 0px to 400px
// function draw(timePassed) {
//   train.style.left = timePassed / 5 + 'px';
// }
// Click for the demo:

// Resultindex.html

// Using requestAnimationFrame
// Let’s imagine we have several animations running simultaneously.

// If we run them separately, then even though each one has setInterval(..., 20), then the browser would have to repaint much more often than every 20ms.

// That’s because they have different starting time, so “every 20ms” differs between different animations. The intervals are not aligned. So we’ll have several independent runs within 20ms.

// In other words, this:

// setInterval(function() {
//   animate1();
//   animate2();
//   animate3();
// }, 20)
// …Is lighter than three independent calls:

// setInterval(animate1, 20); // independent animations
// setInterval(animate2, 20); // in different places of the script
// setInterval(animate3, 20);
// These several independent redraws should be grouped together, to make the redraw easier for the browser and hence load less CPU load and look smoother.

// There’s one more thing to keep in mind. Sometimes CPU is overloaded, or there are other reasons to redraw less often (like when the browser tab is hidden), so we really shouldn’t run it every 20ms.

// But how do we know about that in JavaScript? There’s a specification Animation timing that provides the function requestAnimationFrame. It addresses all these issues and even more.

// The syntax:

// let requestId = requestAnimationFrame(callback)
// That schedules the callback function to run in the closest time when the browser wants to do animation.

// If we do changes in elements in callback then they will be grouped together with other requestAnimationFrame callbacks and with CSS animations. So there will be one geometry recalculation and repaint instead of many.

// The returned value requestId can be used to cancel the call:

// // cancel the scheduled execution of callback
// cancelAnimationFrame(requestId);
// The callback gets one argument – the time passed from the beginning of the page load in milliseconds. This time can also be obtained by calling performance.now().

// Usually callback runs very soon, unless the CPU is overloaded or the laptop battery is almost discharged, or there’s another reason.

// The code below shows the time between first 10 runs for requestAnimationFrame. Usually it’s 10-20ms:

// <script>
//   let prev = performance.now();
//   let times = 0;

//   requestAnimationFrame(function measure(time) {
//     document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
//     prev = time;

//     if (times++ < 10) requestAnimationFrame(measure);
//   })
// </script>
// Structured animation
// Now we can make a more universal animation function based on requestAnimationFrame:

// function animate({timing, draw, duration}) {

//   let start = performance.now();

//   requestAnimationFrame(function animate(time) {
//     // timeFraction goes from 0 to 1
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;

//     // calculate the current animation state
//     let progress = timing(timeFraction)

//     draw(progress); // draw it

//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }

//   });
// }
// Function animate accepts 3 parameters that essentially describes the animation:

// duration
// Total time of animation. Like, 1000.

// timing(timeFraction)
// Timing function, like CSS-property transition-timing-function that gets the fraction of time that passed (0 at start, 1 at the end) and returns the animation completion (like y on the Bezier curve).

// For instance, a linear function means that the animation goes on uniformly with the same speed:

// function linear(timeFraction) {
//   return timeFraction;
// }
// Its graph:

// That’s just like transition-timing-function: linear. There are more interesting variants shown below.

// draw(progress)
// The function that takes the animation completion state and draws it. The value progress=0 denotes the beginning animation state, and progress=1 – the end state.

// This is that function that actually draws out the animation.

// It can move the element:

// function draw(progress) {
//   train.style.left = progress + 'px';
// }
// …Or do anything else, we can animate anything, in any way.

// Let’s animate the element width from 0 to 100% using our function.

// Click on the element for the demo:

// Resultanimate.jsindex.html

// The code for it:

// animate({
//   duration: 1000,
//   timing(timeFraction) {
//     return timeFraction;
//   },
//   draw(progress) {
//     elem.style.width = progress * 100 + '%';
//   }
// });
// Unlike CSS animation, we can make any timing function and any drawing function here. The timing function is not limited by Bezier curves. And draw can go beyond properties, create new elements for like fireworks animation or something.

// Timing functions
// We saw the simplest, linear timing function above.

// Let’s see more of them. We’ll try movement animations with different timing functions to see how they work.

// Power of n
// If we want to speed up the animation, we can use progress in the power n.

// For instance, a parabolic curve:

// function quad(timeFraction) {
//   return Math.pow(timeFraction, 2)
// }
// The graph:

// See in action (click to activate):

// …Or the cubic curve or even greater n. Increasing the power makes it speed up faster.

// Here’s the graph for progress in the power 5:

// In action:

// The arc
// Function:

// function circ(timeFraction) {
//   return 1 - Math.sin(Math.acos(timeFraction));
// }
// The graph:

// Back: bow shooting
// This function does the “bow shooting”. First we “pull the bowstring”, and then “shoot”.

// Unlike previous functions, it depends on an additional parameter x, the “elasticity coefficient”. The distance of “bowstring pulling” is defined by it.

// The code:

// function back(x, timeFraction) {
//   return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
// }
// The graph for x = 1.5:

// For animation we use it with a specific value of x. Example for x = 1.5:

// Bounce
// Imagine we are dropping a ball. It falls down, then bounces back a few times and stops.

// The bounce function does the same, but in the reverse order: “bouncing” starts immediately. It uses few special coefficients for that:

// function bounce(timeFraction) {
//   for (let a = 0, b = 1; 1; a += b, b /= 2) {
//     if (timeFraction >= (7 - 4 * a) / 11) {
//       return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
//     }
//   }
// }
// In action:

// Elastic animation
// One more “elastic” function that accepts an additional parameter x for the “initial range”.

// function elastic(x, timeFraction) {
//   return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
// }
// The graph for x=1.5:

// In action for x=1.5:

// Reversal: ease*
// So we have a collection of timing functions. Their direct application is called “easeIn”.

// Sometimes we need to show the animation in the reverse order. That’s done with the “easeOut” transform.

// easeOut
// In the “easeOut” mode the timing function is put into a wrapper timingEaseOut:

// timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)
// In other words, we have a “transform” function makeEaseOut that takes a “regular” timing function and returns the wrapper around it:

// // accepts a timing function, returns the transformed variant
// function makeEaseOut(timing) {
//   return function(timeFraction) {
//     return 1 - timing(1 - timeFraction);
//   }
// }
// For instance, we can take the bounce function described above and apply it:

// let bounceEaseOut = makeEaseOut(bounce);
// Then the bounce will be not in the beginning, but at the end of the animation. Looks even better:

// Resultstyle.cssindex.html

// Here we can see how the transform changes the behavior of the function:

// If there’s an animation effect in the beginning, like bouncing – it will be shown at the end.

// In the graph above the regular bounce has the red color, and the easeOut bounce is blue.

// Regular bounce – the object bounces at the bottom, then at the end sharply jumps to the top.
// After easeOut – it first jumps to the top, then bounces there.
// easeInOut
// We also can show the effect both in the beginning and the end of the animation. The transform is called “easeInOut”.

// Given the timing function, we calculate the animation state like this:

// if (timeFraction <= 0.5) { // first half of the animation
//   return timing(2 * timeFraction) / 2;
// } else { // second half of the animation
//   return (2 - timing(2 * (1 - timeFraction))) / 2;
// }
// The wrapper code:

// function makeEaseInOut(timing) {
//   return function(timeFraction) {
//     if (timeFraction < .5)
//       return timing(2 * timeFraction) / 2;
//     else
//       return (2 - timing(2 * (1 - timeFraction))) / 2;
//   }
// }

// bounceEaseInOut = makeEaseInOut(bounce);
// In action, bounceEaseInOut:

// Resultstyle.cssindex.html

// The “easeInOut” transform joins two graphs into one: easeIn (regular) for the first half of the animation and easeOut (reversed) – for the second part.

// The effect is clearly seen if we compare the graphs of easeIn, easeOut and easeInOut of the circ timing function:

// Red is the regular variant of circ (easeIn).
// Green – easeOut.
// Blue – easeInOut.
// As we can see, the graph of the first half of the animation is the scaled down easeIn, and the second half is the scaled down easeOut. As a result, the animation starts and finishes with the same effect.

// More interesting “draw”
// Instead of moving the element we can do something else. All we need is to write the proper draw.

// Here’s the animated “bouncing” text typing:

// Resultstyle.cssindex.html

// Summary
// For animations that CSS can’t handle well, or those that need tight control, JavaScript can help. JavaScript animations should be implemented via requestAnimationFrame. That built-in method allows to setup a callback function to run when the browser will be preparing a repaint. Usually that’s very soon, but the exact time depends on the browser.

// When a page is in the background, there are no repaints at all, so the callback won’t run: the animation will be suspended and won’t consume resources. That’s great.

// Here’s the helper animate function to setup most animations:

// function animate({timing, draw, duration}) {

//   let start = performance.now();

//   requestAnimationFrame(function animate(time) {
//     // timeFraction goes from 0 to 1
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;

//     // calculate the current animation state
//     let progress = timing(timeFraction);

//     draw(progress); // draw it

//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }

//   });
// }
// Options:

// duration – the total animation time in ms.
// timing – the function to calculate animation progress. Gets a time fraction from 0 to 1, returns the animation progress, usually from 0 to 1.
// draw – the function to draw the animation.
// Surely we could improve it, add more bells and whistles, but JavaScript animations are not applied on a daily basis. They are used to do something interesting and non-standard. So you’d want to add the features that you need when you need them.

// JavaScript animations can use any timing function. We covered a lot of examples and transformations to make them even more versatile. Unlike CSS, we are not limited to Bezier curves here.

// The same is about draw: we can animate anything, not just CSS properties.
// ///////////////////////////////////////////////////////////////////
