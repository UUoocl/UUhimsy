---
aliases:
  - "[]"
tags:
  - presentation
created: 2023-09-13
modified: 2023-09-13
theme: mturk-slides
transition: none
center: false
fragments: true
hash: true
width: 1024
height: 768
margin: 0.02
defaultTemplate: "[[blankslide]]"
backgroundTransition: none
bg: transparent
reveald3:
  - runLastState: false
enableTitleSlide: false
title: TITLE GOES HERE
presenterName: PRESENTER NAME
venueName: Unknown
talkDate: Unknown
---

<%*
const dv = tp.app.plugins.getPlugin("dataview").api;
const filePath = tp.config.active_file;
console.log(tp.config.active_file)
const converted = [];
if (filePath) {
	const p = dv.page(filePath.path)
	const f = p.file;
	if (p['kanban-plugin'] == 'board') {
		const items = f.tasks.filter(t => t.section.subpath == "Slides");
		for(i of items) {
			if (i.text.startsWith("[[") && i.text.endsWith("]]")) {
				const noteName = i.text.replace("[[","").replace("]]","")
				
				const noteTF = tp.file.find_tfile(noteName) 
				const noteContent = await app.vault.read(noteTF);
				tR += noteContent;

				//converted.push(`!${i.text}`);
			} else {
				tR += tp.file.find_tfile(i.text)
				//converted.push(i.text);
			}
		tR += "\n\n---\n\n"
		console.log("item",i);
		};

		tp.hooks.on_all_templates_executed(async () => {
			let file = tp.file.find_tfile(tp.file.path(true));
			let newPresentationFile = tp.file.find_tfile(tp.file.title)
			newPresentationContent = await app.vault.read(newPresentationFile);

			app.commands.executeCommandById('templater-obsidian:replace-in-file-templater');

			file = tp.file.find_tfile(tp.file.path(true));
			newPresentationFile = tp.file.find_tfile(tp.file.title)
			newPresentationContent = await app.vault.read(newPresentationFile);
			tR = tR.replace("<!-- -->","")
			

		})
	}
}
-%>


