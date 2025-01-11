---
tags:
  - Reveal-Section
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
