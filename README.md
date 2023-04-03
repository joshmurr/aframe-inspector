# Accelerate Editor A-Frame Inspector

This is a fork of [aframevr/aframe-inspector](https://github.com/aframevr/aframe-inspector) for use with the [Accelerate Editor](https://accelerate-editor.web.app/).

## Change Log

- The original Inspector would use A-Frame Watcher to update the HTML document as changes are saved in the Inspector. This version `postMessage`'s the changes instead which can the be grabbed by the parent Accelerate Editor window to update the live doc ([see line 78 in components/scenegraph/Toolbar.js here](https://github.com/joshmurr/aframe-inspector/blob/master/src/components/scenegraph/Toolbar.js#L78))>
- The ID of an entity is used as a reference to make changes in the live doc, so is `readonly` in the Inspector so the user cannot change it _in this view_. The ID can be changed in the live doc. [See line 145 of components/components/CommonComponents.js here](https://github.com/joshmurr/aframe-inspector/blob/master/src/components/components/CommonComponents.js#L145).
- The user can set the 'respawn limit' in the Inspector which sets a lower limit to trigger a respawn if the user is falling indefinitely. The respawn location can be set with the users position. [See components/BottomBar.js here](https://github.com/joshmurr/aframe-inspector/blob/master/src/components/scenegraph/BottomBar.js).
- The user can toggle whether to save the location of objects moved from grabbing in VR mode after dropping. This is toggleable because as of now (04/23) this is actually really annoying as it triggers a page reload. The toggle is read by A-Game and is the flag which tells it to `postMessage` or not. [See components/BottomBar.js here](https://github.com/joshmurr/aframe-inspector/blob/master/src/components/scenegraph/BottomBar.js).
