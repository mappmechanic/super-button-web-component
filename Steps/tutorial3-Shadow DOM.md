## Shadow DOM for the Web Component

### Step 1:

We will add a conflicting css style in our **index.html** file to understand the importance of Shadow DOM:

```html
...
    <style>
        body {
            color: #999;
        }

        .button {
            font-size: 30px;
        }
    </style>
...
```

### Step 2:
We will move the setting of the innerHTML of the property from connectedCallback to the constructor using a shadowRoot.

The updated code should look like this below:

```javascript
...
    constructor() {
            super();
            console.log('New Super Button object has been instantiated.');

            // Attach a shadow root to <super-button>.
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = `
            <div class="button">
                ${this.labelText}
            </div>
            <style>
                .button { 
                    width: 150px; 
                    cursor: pointer;
                    border-radius: 10px; 
                    text-align: center; 
                    padding: 5px; 
                    border: 1px solid #999;
                    box-shadow: 0px 4px 2px -2px;
                }
                .grey { background: #e5e5e5 }
                .red { background: #ea5e4c }
                .yellow { background: #ffc60e }
                .blue { background: #93cefc }
            </style>
            `;
        }

        connectedCallback() {
            this.updateColor(this.color);
        }
...
```

### Step 3:

If we run the above code in our browser, it will show null and nothing will work. This happens as the Shadow DOM is not accessible using the **this.querySelector** method.

Now, we have to modify the Shadow DOM using the DOM API methods on the shadowRoot instead of the component itself.

Replace **this.querySelector..** with **this.shadowRoot.querySelector...** in your code.


The updated methods will look like these:

```javascript
...
    updateColor(newValue, oldValue) {
        ...
        const newColor = allowedColors.indexOf(newValue) > -1 ? newValue : defaultColor;
        const btnContainer = this.shadowRoot.querySelector('.button');
        if(btnContainer && oldValue) {
            btnContainer.classList.remove(oldValue);
        }
        ...
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'label-text': 
                    if(this.shadowRoot.querySelector('.button') && newValue) {
                        this.shadowRoot.querySelector('.button').textContent = newValue;
                    }
                break;
            case 'color': 
                    this.updateColor(newValue, oldValue);
                break;
        }
    }
..

```

### Step 4:
Now we will try that the inherited properties from body should not cripple our Shadow DOM.

Add the following styles to the style block when assigning to shadowRoot's inner HTML

```css
    :host {
        display: inline-block;
        color: #000;
    }

    :host([color=red]) {
        margin-bottom:20px;
    }
```

### Step 5:
We will see how we can create style hooks using CSS custom properties. This will be used to customise the appearance of our web components using some custom css properties from the consumers.

In the index.html style block add the following css:

```css
     super-button {
        --border-color: maroon;
    }
```

In our super-button.html, we will write the CSS to utilise this variable:

```css
    :host([color=red]) .button {
        border-color: var(--border-color)
    }
```