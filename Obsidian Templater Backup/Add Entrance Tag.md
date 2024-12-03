<%*_
const folder = "_templates";
const items = app.vault.getMarkdownFiles().filter(x => x.basename.startsWith("Entrance"));
const selectedItem = (await tp.system.suggester((item) => item.basename, items)).name;

// Get contents of file
const file = tp.file.find_tfile(selectedItem);
const content = await app.vault.read(file);

tR += content
_%>