---

kanban-plugin: board

---

## Slides


## Candidate Slides

{presentation_sections}

<%*
const dv = tp.app.plugins.getPlugin("dataview").api;
let sections="";

//create a card for each note with a 'Reveal-Section' tag
for(let page of dv.pages("#Reveal-Section").file.name){
	sections += `- [ ] [[${page}]]
`
}
tR = tR.replace('{presentation_sections}',sections);

-%>


%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[false,false]}
```
%%