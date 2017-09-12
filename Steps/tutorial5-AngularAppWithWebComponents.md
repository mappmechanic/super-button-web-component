## Super Button Web Component with Angular

### Step 1:

We will create a sample Angular App or you can use any existing app.

> IMPORTANT: You would need to setup Angular Environment by installing @angular/cli separately.

Please create a new angular app using following command:

```bash
ng new SampleHelloWorld
```


### Step 2:

Go the folder './SampleHelloWorld' and run the following command to start Angular serve and open it in browser:

```bash
ng serve
```


### Step 3: 

Now, we should go to the file './src/app/app.component.html' and update with the following template:

```html
<div style="text-align:center">
  <div>
    <h3> Your Name </h3>
    <input [(ngModel)]="superMan" />
    <div class="btns">

    </div>
    <h2>{{ superMan }} is <span *ngIf="!isSuperManFlying">not </span>flying.</h2>
  </div>
  <div
    class="superman"
    [ngClass]="{'superman_flying': isSuperManFlying }"
    >
  </div>
</div>
```

Also add the following css file reference to the file **index.html**:

```html
<head>
...
  <link rel="stylesheet" href="https://dl.dropbox.com/s/079n85aczd6o93x/superman.css">
...
</head>
```

### Step 4:

Now, in our main Angular Module we would need to add **FormsModule** to **imports** and CUSTOM_ELEMENTS_SCHEMA to **schemas**.

Please update the code in the file **app.module.ts** to the following:

```typescript
...
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
...
```

### Step 5:

We have to import the CDN version of our web component and the polyfill to use it in our app.

Please add following code to the **index.html** file inside head tag:

```html
...
  <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.7/webcomponents-lite.js"></script>
  <script src="https://dl.dropbox.com/s/vpvxtmw715l5k38/super-button.js"></script>
...
```

### Step 6:

Now, we will add our web component super button to our app template code. 

```html
    ...
        <super-button
          label-text="Start Flying">
            <img src="http://i.imgur.com/Js4qqR7.png" class="icon" slot="icon" />
            <b>Superman</b>
        </super-button>
        <super-button
          label-text="Stop Flying">
            <img src="http://i.imgur.com/Js4qqR7.png" class="icon" slot="icon" />
            <b>Superman</b>
        </super-button>
    ...

```

### Step 7:

Now, we will add few variables & an event in the main **app.component.ts** file:

```typescript
    export class AppComponent {
        superMan = 'No Name';
        yourName = '';
        isSuperManFlying = false;
        flyColor: String = 'grey';
        stopColor: String = 'red';

        toggleFlying(status: boolean) {
            this.isSuperManFlying = status;
        }
    }
```

Add the following styles to file **styles.css** in the root project folder:

```css
  .btns {
    margin-top: 10px;
  }

  .icon {
    width:30px;
    float: left;
  }

```

### Step 8:

Now add the properties **[attr.color]** and **(onBtnClick)="toggleFlying(true)"** on the super button components in the file **app.component.html** as follow:

```html
...
<super-button
    label-text="Start Flying"
    [attr.color]="flyColor"
    (onBtnClick)="toggleFlying(true)">
    <img src="http://i.imgur.com/Js4qqR7.png" class="icon" slot="icon" />
    <b>Superman</b>
</super-button>
<super-button
    label-text="Stop Flying"
    [attr.color]="stopColor"
    (onBtnClick)="toggleFlying(false)">
    <img src="http://i.imgur.com/Js4qqR7.png" class="icon" slot="icon" />
    <b>Superman</b>
</super-button>
...
```