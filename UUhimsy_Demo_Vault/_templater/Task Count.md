<%*
dv = this.app.plugins.plugins["dataview"].api;
query = dv.taskList(dv.pages("#project").file.tasks)
console.log(query)
tR += query;
%>

```dataviewjs

dv.taskList(dv.pages("#project").file.tasks)
```


