---
tags:
  - Reveal
bg: transparent
---



![[reveal-white-text.svg|500]]

### The HTML Presentation Framework

<style>
	.small-font{
		font-size: small;
	}
</style>

 Created by [Hakim El Hattab](http://hakim.se) and [contributors](https://github.com/hakimel/reveal.js/graphs/contributors)
 

 <!-- element class="small-font" -->
 <!-- .slide:  data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)" -->
 <!-- slide data-scene-entrance="Reveal-Side" --> 
<!-- slide data-scene-exit="Reveal-OTS" --> 

 <!-- slide data-camera-exit="Wide" --> 
NOTE: Hello 
World!
extra 
text-654654
test test test 

6543221032103540

---

## Hello There

reveal.js enables you to create beautiful interactive slide decks using HTML. This presentation will show you examples of what it can do.

<aside class="notes">
    Shhh, these are your private notes 📝
  </aside>


note: more notes

<!-- slide data-scene-exit="Reveal-OTS" --> 

---
<!-- slide:   dataScene
Entrance="Reveal-Side" -->

<!-- Example of nested vertical slides -->
## Vertical Slides
Slides can be nested insdie of each other. 
Use the *Space* key to navigate through all slides.

![image](https://static.slid.es/reveal/arrow.png) 
<!-- element class="r-frame" style="background: rgba(255,255,255,0.1)" -->

--
## Basement Level 1
Nested slides are useful for adding additional detail underneath a high level horizontal slide.

--
## Basement Level 2
That's it, time to go back up.

![image](https://static.slid.es/reveal/arrow.png) 
<!-- element class="r-frame" style="background: rgba(255,255,255,0.1); transform: rotate(180deg);" -->

---
## Slides

Not a coder? Not a problem. There's a fully-featured visual editor for authoring these, try it out at [https://slides.com](https://slides.com)

<!-- slide data-camera-entrance="Wide" --> 
<!-- slide data-scene-entrance="Full Screen Slide UR" --> 


<!-- slide data-scene-exit="Full Screen Slide UL" --> 

---
<!-- .slide:  data-visibility="hidden" -->
## Hidden Slides
This slide is visible in the source, but hidden when the presentation is viewed. You can show all hidden slides by setting the `showHiddenSlides` config option to `true`.

---

<!-- .slide:  data-auto-animate -->
## Pretty Code <!-- element data-id="code-title" -->
```js
	import React, { useState } from 'react';
	function Example() {
	const [count, setCount] = useState(0);
	return (
	...
  );
}
```
<!-- element data-id="code-animation" -->

Code syntax highlighting courtesy of [highlight.js](https://highlightjs.org/usage/)

---

<!-- .slide:  data-auto-animate -->
## With Animations <!-- element data-id="code-title" -->
```js [|4,8-11|17|22-24]
import React, { useState } from 'react';

	function Example() {
	  const [count, setCount] = useState(0);

	  return (
		<div>
		  <p>You clicked {count} times</p>
		  <button onClick={() => setCount(count + 1)}>
			Click me
		  </button>
		</div>
	  );
	}

	function SecondExample() {
	  const [count, setCount] = useState(0);

	  return (
		<div>
		  <p>You clicked {count} times</p>
		  <button onClick={() => setCount(count + 1)}>
			Click me
		  </button>
		</div>
	  );
	}
</script>
```
<!-- element data-id="code-animation" -->

---
## Point of View

Press **ESC** to enter the slide overview. 

Hold down the **alt** key (**ctrl** in Linux) and click on any element to zoom towards it using [zoom.js](http://lab.hakim.se/zoom-js). Click again to zoom back out.

(NOTE：  Use ctrl + click in Linux.)

---

<!-- .slide:  data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)" -->
## Auto-Animate

Automatically animate matching elements across slides with  [Auto-Animate](https://revealjs.com/auto-animate/)

<div class="r-hstack justify-center">
	<div data-id="box1" style="background: #999; width: 50px; height: 50px; margin: 10px; border-radius: 5px;"></div>
	<div data-id="box2" style="background: #999; width: 50px; height: 50px; margin: 10px; border-radius: 5px;"></div>
	<div data-id="box3" style="background: #999; width: 50px; height: 50px; margin: 10px; border-radius: 5px;"></div>
</div>

---
<section data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)">
					<div class="r-hstack justify-center">
						<div data-id="box1" data-auto-animate-delay="0" style="background: cyan; width: 150px; height: 100px; margin: 10px;"></div>
						<div data-id="box2" data-auto-animate-delay="0.1" style="background: magenta; width: 150px; height: 100px; margin: 10px;"></div>
						<div data-id="box3" data-auto-animate-delay="0.2" style="background: yellow; width: 150px; height: 100px; margin: 10px;"></div>
					</div>
					<h2 style="margin-top: 20px;">Auto-Animate</h2>
</section>

---
<section data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)">
<div class="r-stack">
	<div data-id="box1" style="background: cyan; width: 300px; height: 300px;"></div>
	<div data-id="box2" style="background: magenta; width: 200px; height: 200px;"></div>
	<div data-id="box3" style="background: yellow; width: 100px; height: 100px;"></div>
</div>
<h2 style="margin-top: 20px;">Auto-Animate</h2>
</section>

---

<h2>Touch Optimized</h2>
<p>
	Presentations look great on touch devices, like mobile phones and tablets. Simply swipe through your slides.
</p>


---
## Markdown Support

Write content using inline or external Markdown.

Instructions and more info available in the [docs](https://revealjs.com/markdown/).

```html []
<section data-markdown>
  ## Markdown Support

  Write content using inline or external Markdown.
  Instructions and more info available in the [docs](https://revealjs.com/markdown/).
</section>
```
---

Add the <code>r-fit-text</code> class to auto-size text
## FIT TEXT <!-- element class="r-fit-text" -->

---
<!-- .slide: id="fragments" -->
## Fragments
Hit the next arrow...
	<p class="fragment">... to step through ...</p>
	<p><span class="fragment">... a</span> <span class="fragment">fragmented</span> <span class="fragment">slide.</span></p>

note: This slide has fragments which are also stepped through in the notes window.

--

## Fragment Styles

<p>There's different types of fragments, like:</p>
<p class="fragment grow">grow</p>
<p class="fragment shrink">shrink</p>
<p class="fragment fade-out">fade-out</p>
<p>
	<span style="display: inline-block;" class="fragment fade-right">fade-right, </span>
	<span style="display: inline-block;" class="fragment fade-up">up, </span>
	<span style="display: inline-block;" class="fragment fade-down">down, </span>
	<span style="display: inline-block;" class="fragment fade-left">left</span>
</p>
<p class="fragment fade-in-then-out">fade-in-then-out</p>
<p class="fragment fade-in-then-semi-out">fade-in-then-semi-out</p>
<p>Highlight <span class="fragment highlight-red">red</span> <span class="fragment highlight-blue">blue</span> <span class="fragment highlight-green">green</span></p>

---
<!-- .slide  id="transitions" -->
	<h2>Transition Styles</h2>
	<p>
		You can select from different transitions, like: <br>
		<a href="?transition=none#/transitions">None</a> -
		<a href="?transition=fade#/transitions">Fade</a> -
		<a href="?transition=slide#/transitions">Slide</a> -
		<a href="?transition=convex#/transitions">Convex</a> -
		<a href="?transition=concave#/transitions">Concave</a> -
		<a href="?transition=zoom#/transitions">Zoom</a>
	</p>

---
<!-- .slide  id="themes" -->

## Themes

<p>
	reveal.js comes with a few themes built in: <br>
	<!-- Hacks to swap themes after the page has loaded. Not flexible and only intended for the reveal.js demo deck. -->
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/black.css'); return false;">Black (default)</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/white.css'); return false;">White</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/league.css'); return false;">League</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/sky.css'); return false;">Sky</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/beige.css'); return false;">Beige</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/simple.css'); return false;">Simple</a> <br>
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/serif.css'); return false;">Serif</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/blood.css'); return false;">Blood</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/night.css'); return false;">Night</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/moon.css'); return false;">Moon</a> -
	<a href="#/themes" onclick="document.getElementById('theme').setAttribute('href','dist/theme/solarized.css'); return false;">[Solarized]()</a>
</p>

---

<!-- slide  bg="#dddddd" -->
## Slide Backgrounds

Set `data-background="#dddddd"` on a slide to change the background color. All CSS color formats are supported.

<a href="#" class="navigate-down">
	<img class="r-frame" style="background: rgba(255,255,255,0.1);" width="178" height="238" data-src="https://static.slid.es/reveal/arrow.png" alt="Down arrow">
</a>

--

<!-- .slide  data-background-gradient="linear-gradient(to bottom, #283b95, #17b2c3)" -->
## Gradient Backgrounds

> `<section data-background-gradient=
		"linear-gradient(to bottom, #ddd, #191919)">`
		
--
<!-- slide  bg="https://static.slid.es/reveal/image-placeholder.png" -->
## Image Backgrounds
```html
	<!-- .slide data-background="image.png" -->
```

--

<!-- .slide data-background="https://static.slid.es/reveal/image-placeholder.png" data-background-repeat="repeat" data-background-size="100px" -->
## Tiled Backgrounds

```html 
<!-- .slide data-background="https://static.slid.es/reveal/image-placeholder.png" data-background-repeat="repeat" data-background-size="100px" -->
```
<!-- element style="word-wrap: break-word;" -->

--

<!-- .slide data-background-video="https://static.slid.es/site/homepage/v1/homepage-video-editor.mp4" data-background-color="#000000" -->

<div style="background-color: rgba(0, 0, 0, 0.9); color: #fff; padding: 20px;">
<h2>Video Backgrounds</h2>

```html
<!-- .slide data-background-video="https://static.slid.es/site/homepage/v1/homepage-video-editor.mp4" data-background-color="#000000" -->
```
</div>
--

<!-- .slide data-background="http://i.giphy.com/90F8aUepslB84.gif" -->
## ... and GIFs!

---

<!-- slide template="[[tpl-con-2-1-box]]" -->

::: title
### _**This is the Title of this Slide**_
:::

::: left
![[assets/reveal-white-text.svg]]
:::

<style>
.small-indent > ul { 
   padding-left: 1em;
}
</style>

::: right
**Header #1**
- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
- tium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequa
- augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit a
- Nam quam nunc
Umsetzungsschritte
**Header #2**
- Curabitur
- condimentum
- Maecenas
**Header #3**
- justo
- rhoncus
- semper

:::<!-- element align="left" style="font-size: 13px;" class="small-indent" -->

::: source
###### Source: Copied from Lorem ipsum dolor Generator
:::

---
<grid  drag="30 25" drop="12 15" bg="#B565A7" rotate="-10">
Hello
</grid>

World! <!-- element drag="40 25" drop="-12 -25" bg="#D65076" rotate="40" -->


---
```[1-7|8-11|17|19]
- [[2024/11/2024-11-19.md|2024-11-19]]
- [[MD Table.md|MD Table]]
- [[Reveal demo deck.md|Reveal demo deck]]
- [[Welcome.md|Welcome]]
- [[_templates/Inline Styling small font.md|Inline Styling small font]]
- [[_templates/Slide Template-con-2-1-box.md|Slide Template-con-2-1-box]]
- [[_templates/Slide Template-Grid Hello World.md|Slide Template-Grid Hello World]]
- [[_templates/Templater Dataview to MD.md|Templater Dataview to MD]]
- [[_templates/templater 2.md|templater 2]]
- [[export/demo/dist/css/theme/README.md|README]]
- [[export/demo/plugin/chalkboard/README.md|README]]
- [[export/demo/plugin/chart/README.md|README]]
- [[export/demo/plugin/customcontrols/README.md|README]]
- [[export/demo/plugin/menu/CONTRIBUTING.md|CONTRIBUTING]]
- [[export/demo/plugin/menu/README.md|README]]
- [[Advanced Slides Documentation/Frontmatter Options.md|Frontmatter Options]]
- [[Advanced Slides Templates/tpl-con-2-1-box.md|tpl-con-2-1-box]]
- [[Projects/UUhimsy.md|UUhimsy]]
- [[Untitled.md|Untitled]]
```


---
<!-- .slide:  data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)" -->
final slide


> [!NOTE] Title
> Contents

<grid  drag="30 55" drop="12 15" bg="#B565A700" rotate="-10">

![[scare 2024-11-22 18.11.38.excalidraw.svg]]

</grid>

World! <!-- element drag="40 25" drop="-12 -25" bg="#D65076" rotate="40" -->


---
<!-- .slide:  data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)" -->

<grid  drag="50 50" drop="2 15" bg="#B565A700" rotate="0">

![[Drawing 2024-11-23 00.11.20.excalidraw.svg]]

</grid>

---
<!-- .slide:  data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)" -->

<grid  drag="90 90" drop="12 15" bg="#B565A700" rotate="0">

![[Drawing 2024-11-23 00.11.20.excalidraw.svg]]

</grid>

---

<!-- .slide:  data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)" -->

<grid  drag="90 90" drop="12 15" bg="#B565A700" rotate="0">

![[Drawing 2024-11-23 00.11.20.excalidraw.svg]]

</grid>

<grid  drag="80 10" drop="20 100" bg="#B565A700" rotate="0">

> A ridiculous  words that sill the qoute

</grid>
