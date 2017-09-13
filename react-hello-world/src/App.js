import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { 
    superMan: 'No Name',
    isSuperManFlying: false,
    startColor: 'gray',
    stopColor: 'red'
  };

  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleFlying = this.toggleFlying.bind(this);
  }

  componentDidMount() {
    this.btn1.addEventListener('onBtnClick', () => this.toggleFlying(true));
    this.btn2.addEventListener('onBtnClick', () => this.toggleFlying(false));
  }
  
  toggleFlying(status) {
    this.setState({ isSuperManFlying: status });
  }
  
  handleKeyPress(event) {
    this.setState({ superMan: event.target.value });
  }

  render() {
    const outerStyle = {
      textAlign: 'center'
    }

    const btnsStyle = {
      marginTop: '10px'
    }

    const iconStyle = {
      float: 'left',
      width: '30px'
    }

    return (
      <div style={outerStyle}>
        <div>
          <h3> Your Name </h3>
          <input onChange={this.handleKeyPress} />
          <div className="btns" style={btnsStyle}>
              <super-button
                label-text="Start Flying"
                color={this.state.startColor}
                id="btn1" ref={(el) => this.btn1 = el}
                >
                  <img src="http://i.imgur.com/Js4qqR7.png" style={iconStyle} slot="icon" />
                  <b>Superman</b>
              </super-button>
              <super-button
                label-text="Stop Flying"
                color={this.state.stopColor}
                id="btn2" ref={(el) => this.btn2 = el}
                >
                  <img src="http://i.imgur.com/Js4qqR7.png" style={iconStyle} slot="icon" />
                  <b>Superman</b>
              </super-button>
          </div>
          <h2>{ this.state.superMan } is <span>not </span>flying.</h2>
        </div>
        <div className={ this.state.isSuperManFlying ? "superman superman_flying" : "superman" }>
        </div>
      </div>
    );
  }
}

export default App;
