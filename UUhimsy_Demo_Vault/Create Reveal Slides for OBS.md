---
tags:
  - slidesExtended
---

#slidesExtended

# Optional Features
## Create Dataview "Variables"

## Create Templater scripts
## Create "Refresh on Start" Notes

# Making slides

## Create Slides Note

## Export Slides
![[Pasted image 20241123153033.png]]
![[Pasted image 20241123153102.png]]

## Add OBS and Reveal Scripts
### Add Script Tags
After exporting the Slides Extended Presentation, add the OBS and Reveal Slides scripts elements to the Index.html file.

Paste these tags before the `</body>` in the index.html file .
```js
<script src="obs_webSocket_details/websocketDetails.js"></script>

<script src="obs_webSocket_details/obs-ws.js"></script>

<script src="obs_webSocket_details/obsConnect.js"></script>

<script src="obs_webSocket_details/startConnection.js"></script>

<script src="js/revealSlideControls.js"></script>
```

Use a text editor, like [VS Code](https://code.visualstudio.com/) to edit the index.html file. 

## copy Scripts to Export Folder

