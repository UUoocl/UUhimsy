---
tags:
  - dataview
  - example
---

``

```
```dataviewjs
let page = dv.current().file.path; 
let pages = new Set(); 
let stack = [page]; 
while (stack.length > 0) { 
let elem = stack.pop(); 
let meta = dv.page(elem); 
if (!meta) continue; 
for (let inlink of meta.file.inlinks.concat(meta.file.outlinks).array()) { 
console.log(inlink); 
if (pages.has(inlink.path)) continue; 
pages.add(inlink.path); 
stack.push(inlink.path); 
} } 
// Data is now the file metadata for every page that directly OR indirectly links to the current page. 
let data = dv.array(Array.from(pages)).map(p => dv.page(p));
```



```dataviewjs
for (let group of dv.pages().groupBy(p => p.genre)) { 
dv.header(3, group.key); 
dv.table(["Name", "Time Read", "Rating"], group.rows .sort(k => k.rating, 'desc') .map(k => [k.file.link, k["time-read"], k.rating])) 
}
```


```dataviewjs
dv.list(dv.pages("#Reveal-Section").file.name)
```


```dataviewjs
for(let note of dv.pages("#Reveal-Section").file){
	dv.paragraph(`- [ ] ${note.name}`)
}
```