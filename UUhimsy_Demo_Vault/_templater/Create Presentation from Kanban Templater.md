---
aliases:
  - "[]"
tags:
  - presentation
created: 2023-09-13
modified: 2023-09-13
theme: black
transition: none
center: true
fragments: true
hash: true
width: 1024
height: 768
margin: 0.02
defaultTemplate: 
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
if (filePath) {
	const p = dv.page(filePath.path)
	const f = p.file;
	//If the Active page is a Kanban board
	if (p['kanban-plugin'] == 'board') {
		const items = f.tasks.filter(t => t.section.subpath == "Slides");
		for(i of items) {
			if (i.text.startsWith("[[") && i.text.endsWith("]]")) {
				//Remove the brackets around the note name
				const noteName = i.text.replace("[[","").replace("]]","")
				//get the note content 
				const noteTF = tp.file.find_tfile(noteName) 
				const noteContent = await app.vault.read(noteTF);
				//Remove frontmatter
				const noteContent_NoFrontMatter = noteContent.replace(/^---.*?\n---\n/s, "")
				tR += noteContent_NoFrontMatter;

			} else {
				tR += tp.file.find_tfile(i.text)
			}
		tR += "\n\n---\n\n "
		};

		tp.hooks.on_all_templates_executed(async () => {
			app.commands.executeCommandById('templater-obsidian:replace-in-file-templater');
		})
	}
}
-%>