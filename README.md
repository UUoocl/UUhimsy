# UUhimsy
A guide to making whimsical presentations with Obsidian and OBS.  Combine Obsidian, OBS, Zoom, Javascript and automation tools to create presentations to entertain and engage your audience.  

This repo includes an Obsidian Vault and Plugin and an OBS Scene Collection.  

The examples in this repository feature the javaScript libraries [P5.js](https://p5js.org/) and [Cables.gl](https://cables.gl/). Both are free and open source tools for making beautiful interactive content.

![image](https://github.com/user-attachments/assets/cc50192c-9ba6-4c2f-bdc3-92f8751bcbc3)


Table of Contents
- [UUhimsy Features](#uuhimsy-features)
- [Required Software](#required-software)
- [Setup Obsidian](#setup-obsidian)
  - [How to use UUhimsy Plugin](#how-to-use-uuhimsy-plugin)
  - [Create Slide Tags](#create-slide-tags)
  - [Insert a Slide Tags](#insert-a-slide-tags)
- [Setup OBS](#setup-obs)
- [Keyboard and Mouse Visual Overlay](#keyboard-and-mouse-visual-overlay)
- [Get User Media](#get-user-media)
- [Using F13 - F24 keys in Windows](#using-f13---f24-keys-in-windows)


## UUhimsy Features
- Trigger OBS automation with Reveal.js Slides, Zoom meeting actions, Midi Devices, Game Controllers, MediaPipe and more.    

- A "Teleprompter" for scrolling slide notes 
- Screen Share
  - Mouse visual overlay
  - Keyboard Overlay
  - Follow Mouse
  - Zoom in on mouse

## Required Software
To use all the features enabled by UUhimsy, first install the required Apps and Plugins
All the required software is free to download and use. 

|[Obsidian](https://obsproject.com)
|:---|
|Obsidian plugins are downloaded in app 
|🔌 UUhimsy (Included in this repo, not yet available as a Community Plugin)
|🔌 Slides Extended
|🔌 Templater
|🔌 Dataview
|🔌 Kanban

|OBS|
|:---|
|[OBS](https://obsproject.com)
|OBS plugins
|🔌 [Source Dock](https://obsproject.com/forum/resources/source-dock.1317/)
|🔌 [Source Clone](https://obsproject.com/forum/resources/source-clone.1632/)
|🔌 [Downstream Keyer](https://obsproject.com/forum/resources/downstream-keyer.1254/)
|🔌 [Move Transition](https://obsproject.com/forum/resources/move.913/)
|🔌 [Advanced Scene Switcher](https://obsproject.com/forum/resources/advanced-scene-switcher.395/)
|🔌 [Advanced Mask](https://obsproject.com/forum/resources/advanced-masks.1856/)
|🔌 [Composite Blur](https://obsproject.com/forum/resources/composite-blur.1780/)
|🔌 [Stroke Glow Shadow](https://obsproject.com/forum/resources/stroke-glow-shadow.1800/)
|🔌 [Stroke Glow Shadow](https://obsproject.com/forum/resources/stroke-glow-shadow.1800/)
|🔌 [mac-background removal](https://obsproject.com/forum/resources/macos-background-removal.1691/)
|🔌 [LocalVocal](https://obsproject.com/forum/resources/localvocal-local-live-captions-translation-on-the-go.1769/)

**JavaScripts Libraries used by UUhimsy**

The JavaScript libraries used by UUhimsy are included in this repo.  
[P5js](https://p5js.org/), 
[cables](https://cables.gl/home), 
[Revealjs](https://revealjs.com/),
[teleprompter](https://github.com/manifestinteractive/teleprompter)

## Setup Obsidian

Download and Install Obsidian and the required Community Plugins. 

### How to use UUhimsy Plugin

**Connect to OBS** 

In the UUhimsy settings tab, configure the OBS launch parameters. The settings will be used in the "Open OBS" command.  

![image](https://github.com/user-attachments/assets/10e24711-c2d0-48a7-98c3-cd20de8d9bb4)

#### **OBS WebSocket Server (WSS) Settings**
  |Settings| Value |
  |---|---|
  |IP| 'localhost' or the host machines IP|
  |PORT| default 4455.  
  |Password| set a secure password.  
  
#### **OBS Launch Parameters**
  |Settings| Value |
  |---|---|
  |Name| If multiple instances of OBS are installed enter the custom OBS name. |
  |Folder Path|Windows Only. Enter the Folder Path to the OBS executable|
  |Collection| Enter an OBS Scene Collection name   
  |OBS Debug Port| OBS Browser Sources can be debugged at https://localhost:{Port}. Default Port = 9222  

#### **Open OBS**
  The UUhimsy Plugin features a command to open OBS.  

  Open the command palette and enter "**Open OBS**"

![image](https://github.com/user-attachments/assets/3352b9c9-1886-4c0e-aaf8-0a0c567474d2)

OBS should launch with the choosen parameters  

### Create Slide Tags

  UUhimsy uses slide tags to automate actions when a slide transitions.  For example, use a slide to change scenes in OBS when a slide transition starts. 

  In the UUhimsy settings, click the "Add UUhimsy scripts to Slides Extended Template" button.  

  Slide tags are created with commands. Open the Command Palette and choose a UUhimsy action. 

  |Slide tag| Command| Notes|
  |---|---|---|
  |OBS Scenes|"Get OBS Scene tags"|- A tag is made for each Scene starting with "scene\|\|\|" and  <br>- A tag is made for each Source in the "Input Camera" scene|
  |Apple Shortcut|"Get Apple Shortcuts Tags"|- A tag is made for each Shortcut starting with "uuhimsy". MacOS only feature.|
  |USB Camera: Pan, Tilt, Zoom |"**Start sending camera PTZ position to OBS**"|The utility application [UVC-Util](https://github.com/jtfrey/uvc-util) is included to retrieve Pan, Tilt, Zoom (PTZ) data from USB PTZ cameras. <br>  MacOS only feature.|
  |ZoomOSC|"Start OSC to OBS Websocket connection"| [ZoomOSC](https://www.liminalet.com/zoomosc) is a client by Zoom with an OSC interface. UUhimsy includes an OSC to WebSocket interface.|

### Insert a Slide Tags

  In a Slides Extended slide, position the cursor above the slide break indicator "---".
  Open the command palette, and choose "Insert slide exit tag" or "Insert slide entrance tag".  

  >[!NOTE] Tag Types
  >'Exit' tags run when a slide transition starts 
  >'Entrance' tags run when a slide transition ends

After choosing to insert a tag, then a list of tags appear in the command palette. Select the tag to insert

## Setup OBS

Download OBS and the required plugins.
> [!NOTE] 
> 
> macOS Installing plug-in note:
>  1. After Downloading a plug-in, expand the .zip file and in the expanded folder click to open the installer for your Mac.
>  2. A warning will appear that Apple could not verify the plug-in.  Click the "Done" button
>
>![image](https://github.com/user-attachments/assets/ceef4d62-0e3c-4fd8-9faf-14099fda2c78)
>
>3. Go to System Settings, 
>    1. choose Privacy & Security settings. 
>    2. scroll to the bottom of the settings page.
>    3. click "Open Anyway" 
>
> ![image](https://github.com/user-attachments/assets/e0c393c0-0302-41ac-9ed6-7ceb22f796e7)
> 

## [Keyboard and Mouse Visual Overlay](https://github.com/UUoocl/keyboard_and_mouse_visuals)

## Get User Media
In Obsidian, use the Templater command "Open insert template modal". In the modal window select "Open Get User Media Page"

This will open the "Get User Media Page" using the Slides Extended local server. 

[Using Get User Media Page](https://github.com/UUoocl/GUM)

## Using F13 - F24 keys in Windows 
PowerToys Keymanager file location "%USERPROFILE%\AppData\Local\Microsoft\PowerToys\Keyboard Manager\default.json"
replace the default.json file's content with the key mapping file in this repo. 

