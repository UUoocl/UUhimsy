---
tags:
  - Reveal-Section
---

Number of pages:  {totalPagesIntro}

Dataview Query
```
<!-- <%*
dv = tp.app.plugins.getPlugin("dataview").api;
query = await dv.pages().length;
console.log(query)
query = query + 5
tR = tR.replace('{totalPagesIntro}',query)
%> --> 
```

<!-- <%*
dv = tp.app.plugins.getPlugin("dataview").api;
query = await dv.pages().length;
console.log(query)
query = query + 5
tR = tR.replace('{totalPagesIntro}',query)
%> --> 

---

Open Tasks

{open tasks}
<!-- <%*
dv = tp.app.plugins.getPlugin("dataview").api;
tasksQuery = "";
for(let task of dv.pages().file.tasks){
console.log(task)
tasksQuery += `�[[${task.text}]]

`
}
console.log(tasksQuery)
tR = tR.replace('{open tasks}',tasksQuery)
%> --> 


---

Code Highlighing and Dataview

```[1-7|8-11|17|19]
{file list}
```

<!-- <%*
dv = tp.app.plugins.getPlugin("dataview").api;
tasksQuery = "";
for(let note of dv.pages().file.name){
console.log(note)
tasksQuery += `- �[[${note}]]

`
}
console.log(tasksQuery)
tR = tR.replace('{file list}',tasksQuery)
%> --> 