import React from "react";

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    const respawnLimit = localStorage.getItem("respawnLimit") || -1;
    this.state = {
      respawnLimit,
      savePositionFromVR: false
    };
  }

  updateRespawnLimit = e => {
    this.setState({
      respawnLimit: e.target.value
    });
  };

  saveToLocalStorage = () => {
    localStorage.setItem("respawnLimit", this.state.respawnLimit);
  };

  updateSavePositionFromVR = e => {
    this.setState({
      savePositionFromVR: e.target.checked
    });
    console.log(this.state);
  };

  render() {
    return (
      <div id="bottombar">
        <div className="item">
          <label htmlFor="quantity">Respawn if fallen below:</label>
          <input
            type="number"
            id="falling-respawn-limit"
            name="falling-respawn-limit"
            min="-1"
            max="1000"
            value={this.state.respawnLimit}
            onChange={this.updateRespawnLimit}
            onBlur={this.saveToLocalStorage}
            onSubmit={this.saveToLocalStorage}
          />
        </div>

        <div className="item">
          <label htmlFor="savePositionFromVR">
            Save changes from VR movement?
          </label>
          <input
            type="checkbox"
            id="save-position-from-vr"
            name="save-position-from-vr"
          />
        </div>
      </div>
    );
  }
}
