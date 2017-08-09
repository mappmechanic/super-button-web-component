## Lifecycle methods of a Custom Element

### Step 1:

Just add the disconnectedCallback to see a console whenever the custom element is unmounted or destroyed.

```javascript
...
    disconnectedCallback() {
        // Disconnected means unmounting of the component
        console.log('Disconnected callback hook for any book keeping');
    }
...
```

### Step 2:
In the connectedCallback update the element with its own HTML code

```javascript
...
    connectedCallback() {
        this.innerHTML = `
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
...
```

### Step 3:

Now we will add a new property/attribute **color** to define the color of our super button:

Add the following code to your **super-button.html** file inside the class:

```javascript
    connectedCallback() {
        ...
        this.updateColor(this.color);
    }
...
    get color() {
        return this.getAttribute('color');
    }

    set color(value) {
        this.setAttribute('color', newColor);
    }

    updateColor(newValue, oldValue) {
        const defaultColor = 'grey';
        const allowedColors = ['red','yellow','blue'];
        const newColor = allowedColors.indexOf(newValue) > -1 ? newValue : defaultColor;
        const btnContainer = this.querySelector('.button');
        if(btnContainer && oldValue) {
            btnContainer.classList.remove(oldValue);
        }
        if(btnContainer && newColor) {
            btnContainer.classList.add(newColor);
        }
    }
...
```

### Step 4:

Now we will add the attributeChangedCallback to listen for changes to the color attribute and the text attribute to update our button appropriately:

```javascript
    // Called for LabelText & Color Attribute
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'label-text': 
                    if(this.querySelector('.button') && newValue) {
                        this.querySelector('.button').textContent = newValue;
                    }
                break;
            case 'color': 
                    this.updateColor(newValue, oldValue);
                break;
        }
    }
```

### Step 5:
Now we will add some stubs or dummy code in **index.html** to have an input to change the button label to any text put in the input.

```html
...
    <link rel="import" href="./super-button.html">
    <script>
        function updateBtn1Label() {
            const newLabel = document.getElementById('newLabel').value;
            const superBtns = document.getElementsByTagName('super-button');
            superBtns[0].setAttribute('label-text', newLabel);
        };
    </script>
</head>
...
        <br /><br />
        Update Button1 Label <br />
        <input type="text" id="newLabel"><br />
        <button onclick="updateBtn1Label()">Update Label</button>
</body>
```

Nothing happens even now, so the caveat is that we need to add a static getter for observedAttributes on which we want to trigger attributeChangedCallback.

### Step 6:
Add the following code to **super-button.html** before the attributeChangedCallback method:

```javascript
    static get observedAttributes() {
        return ['label-text', 'color'];
    }
```

Now, refresh your browser and enter a new text in the input. On click of the update button, label text of first button will change.

### Step 7:

Now, we will add some stub/dummy code in **index.html** to drive changes to color attribute in runtime:

```html
    <script>
        ...
        function updateBtn2Color() {
            const newColor = document.getElementById('newColor').value;
            const superBtns = document.getElementsByTagName('super-button');
            superBtns[1].setAttribute('color', newColor);
        };
    </script>
    <body>
    ...
    <br /><br />
       New Color <br />
       <select id="newColor">
            <option value="">Default</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
       </select> <br />
       <button onclick="updateBtn2Color()">Update Color</button>
    </body>
```