## Super Button Web Component with React

### Step 1:

We will create a sample React App or you can use any existing app.

> IMPORTANT: You would need to setup React Environment by either using webpack/babel or by installing **'create-react-app'** separately.

If you are using **create-react-app**:

Please create a new react app using following command:

```bash
create-react-app create react-hello-world
```


### Step 2:

Go the folder 'react-hello-world' and run the following command to start React app serve and open it in browser:

```bash
yarn start
```


### Step 3: 

Now, we should go to the file './src/App.js' and update it with the following code:

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { 
    superMan: 'No Name',
    isSuperManFlying: false
  };

  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  

  handleKeyPress(event) {
    this.setState({ superMan: event.target.value });
  }

  render() {
    const outerStyle = {
      textAlign: 'center'
    }

    return (
      <div style={outerStyle}>
        <div>
          <h3> Your Name </h3>
          <input onChange={this.handleKeyPress} />
          <div className="btns">
              
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

```

Also add the following file references to the **./public/index.html** file to include css and our web component:

```html
<head>
...
    <title>React App</title>
    
    <link rel="stylesheet" href="https://dl.dropbox.com/s/079n85aczd6o93x/superman.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.7/webcomponents-lite.js"></script>
    <script src="https://dl.dropbox.com/s/vpvxtmw715l5k38/super-button.js"></script>
...
</head>
```

Now, if you see the output of our app in the browser, there will be a superman figure and an input tag.

### Step 4:

Now, we will add our web component super button to our app.js render code. 

```html
    ...
        <super-button
        label-text="Start Flying">
            <img src="http://i.imgur.com/Js4qqR7.png" style={iconStyle} slot="icon" />
            <b>Superman</b>
        </super-button>
        <super-button
        label-text="Stop Flying">
            <img src="http://i.imgur.com/Js4qqR7.png" style={iconStyle} slot="icon" />
            <b>Superman</b>
        </super-button>
    ...

```

Add the following styles to file **App.js** in the start of render method:

```javascript
    const btnsStyle = {
        marginTop: '10px'
    }

    const iconStyle = {
        float: 'left',
        width: '30px'
    }
```

### Step 7:

Now, we will add few variables in the state of our app to derive colors of the web components:

```javascript
    ...

    class App extends Component {
        state = { 
            superMan: 'No Name',
            isSuperManFlying: false,
            startColor: 'gray',
            stopColor: 'red'
        };
    ...
    }
```

Also we have to add properties to our web components to reflect the colors:

```html
    <super-button
        label-text="Start Flying"
        color={this.state.startColor}
    >
        <img src="http://i.imgur.com/Js4qqR7.png" style={iconStyle} slot="icon" />
        <b>Superman</b>
    </super-button>
    <super-button
        label-text="Stop Flying"
        color={this.state.stopColor}
    >
    ...
```

### Step 8:

Now we will add the code to handle the **onBtnClick** event in React App to toggle the flying state of the superman:

```javascript
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
  ...
```

In order for React Components to listen to events, we have added event listener using **react refs** on the different web components we have made.

Please add the refs using the code for web components given below:

```html
...
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
...
```

Now you can see the exact output similar to the angular app in your browsers.
