## Creating Simple Custom Element

### Step 1:
Create a Simple **super-button.html** file to hold the definition of our new web component.

```javascript
    // ES6 Classes to Define the new Element Behaviour
    class SuperButton extends HTMLElement {
        constructor() {
            super();
            console.log('New Super Button object has been instantiated.');
        }
    }

    window.customElements.define('super-button', SuperButton);
```

### Step 2:
Create a new **index.html** file to import and drive the use of the new Custom Element

```html
<!DOCTYPE>
<html>
    <head>
        <title>Testing - Web Components</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.7/webcomponents-lite.js"></script>
        <link rel="import" href="./super-button.html">
    </head>
    <body>
       Button: <super-button ></super-button>
    </body>
</html>
```

Open up the index.html using a dummy web server in a Browser.
Link for using minimal node web server [**http-server**](https://www.npmjs.com/package/http-server)

You can verify the creation of the instance of a button by seeing the console log.

![Console Log](https://i.imgur.com/5vAvAvE.png)


### Step 3:
Now we will add a new property/attribute to our custom element to display its Label Text

In **super-button.html** add the following code to the ES6 class.

```javascript
    connectedCallback() {
        this.textContent = this.labelText;
    }

    get labelText() {
        return this.getAttribute('label-text');
    }

    set labelText(value) {
        if(value) {
            this.setAttribute('label-text', value);
        }
    }
```

### Step 4: 
In the index.html, add the attribute label-text to the existing button and add another button instance. Again refresh the browser to view it.

```html
...
    <body>
        Button1: <super-button label-text="Super Button1"></super-button> <br />
        Button2: <super-button label-text="Super Button2"></super-button>
    </body>
...
```