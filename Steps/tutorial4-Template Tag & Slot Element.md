## Template Tag & Slot Element Test

### Step 1:

Now firstly we will move all the HTML code and the CSS style code into a new **<template />** tag, which was initially passed to the innerHTML property of the shadowRoot object.

Add the following code to the beginning of the **super-button.html** file:

```html
...
<template id="superBtnTemplate">
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

        :host {
            display: inline-block;
            color: #000;
        }

        :host([color=red]) {
            margin-bottom:20px;
        }

        :host([color=red]) .button {
            border-color: var(--border-color)
        }
    </style>
</template>
...
```

### Step2: 

Now, we need access to this template element, so that we can append this element to the shadowRoot element at runtime when our web component has been initialised.

For this, we get access to the ownerDocument and find the **template** html element in it.

Add the following line in the starting of the script tag in the file **super-button.html**

```javascript
...
    <script>
    var importDoc = document.currentScript.ownerDocument;
...
```

Also, modify the constructor of the ES6 class and update it with the following code:

```javascript
...
 // ES6 Classes to Define the new Element Behaviour
    class SuperButton extends HTMLElement {
        constructor() {
            super();
            console.log('New Super Button object has been instantiated.');

            // Attach a shadow root to <super-button>.
            const shadowRoot = this.attachShadow({mode: 'open'});
            const htmlTemplate = importDoc.querySelector('template');
            shadowRoot.innerHTML = htmlTemplate.innerHTML;
        }
...
```
