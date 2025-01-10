---
tags:
  - example
  - dataview
---
dataview code
```
`$= dv.pages().length`
```

> [!info] Number of pages: `$= dv.pages().length`


templater code:
```
<%*
dv = this.app.plugins.plugins["dataview"].api;
query = await dv.pages().length;
tR += query;
%>
```

 >[!info] 
	 output:  25
