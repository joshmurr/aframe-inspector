import React from "react";

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    const respawnLimit = localStorage.getItem("respawnLimit") || -1;
    this.state = {
      respawnLimit
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

  render() {
    return (
      <div id="bottombar">
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
    );
  }
}
