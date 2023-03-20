import classnames from "classnames";
import objectAssign from "object-assign";
import React from "react";
import { saveBlob } from "../../lib/utils";

const LOCALSTORAGE_MOCAP_UI = "aframeinspectormocapuienabled";

function filterHelpers(scene, visible) {
  scene.traverse(o => {
    if (o.userData.source === "INSPECTOR") {
      o.visible = visible;
    }
  });
}

function getSceneName(scene) {
  return scene.id || slugify(window.location.host + window.location.pathname);
}

/**
 * Slugify the string removing non-word chars and spaces
 * @param  {string} text String to slugify
 * @return {string}      Slugified string
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "-") // Replace all non-word chars with -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Tools and actions.
 */
export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  exportSceneToGLTF() {
    ga("send", "event", "SceneGraph", "exportGLTF");
    const sceneName = getSceneName(AFRAME.scenes[0]);
    const scene = AFRAME.scenes[0].object3D;
    filterHelpers(scene, false);
    AFRAME.INSPECTOR.exporters.gltf.parse(
      scene,
      function(buffer) {
        filterHelpers(scene, true);
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        saveBlob(blob, sceneName + ".glb");
      },
      { binary: true }
    );
  }

  /**
   * NOTE: Post changes rather than use AFrame Watcher
   */
  writeChanges = () => {
    var changes = AFRAME.INSPECTOR.history.updates;
    var remove = AFRAME.INSPECTOR.remove.remove; // [<id>]
    for (const id of remove) {
      if (!changes[id]) changes[id] = {};
      changes[id].remove = true;
    }
    var message = {
      changes: changes.length < 1 ? {} : changes,
      target: "accelerate-editor"
    };
    parent.postMessage(JSON.stringify(message), "*");
  };

  toggleScenePlaying = () => {
    if (this.state.isPlaying) {
      AFRAME.scenes[0].pause();
      this.setState({ isPlaying: false });
      AFRAME.scenes[0].isPlaying = true;
      document.getElementById("aframeInspectorMouseCursor").play();
      return;
    }
    AFRAME.scenes[0].isPlaying = false;
    AFRAME.scenes[0].play();
    this.setState({ isPlaying: true });
  };

  render() {
    const watcherClassNames = classnames({
      button: true,
      fa: true,
      "fa-save": true
    });
    const watcherTitle = "Write changes to the document.";

    return (
      <div id="toolbar">
        <div className="toolbarActions">
          <a
            className="gltfIcon"
            title="Export to GLTF"
            onClick={this.exportSceneToGLTF}
          >
            <img src={"../../images/gltf.svg"} />
          </a>
          <a
            className={watcherClassNames}
            title={watcherTitle}
            onClick={this.writeChanges}
          />
        </div>
      </div>
    );
  }
}
