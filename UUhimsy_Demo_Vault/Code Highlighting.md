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