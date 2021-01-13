const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: block;
    }
    div {
      padding: 10px;
    }
    h1 {
      text-align: center;
      margin: 0;
    }
    .material-icons.color-primary { 
      color: var(--primary); 
    }
    .material-icons.md-48 {
      font-size: var(--icon-dimension-48);
    } 
    .floatting-button{
      --button-bg-color: var(--background);
      --button-dimension: var(--icon-dimension-48);
      --button-padding: 0;
      -webkit-box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
    }
  </style>
  <div>
    <h1>ToDo</h1>
    <td-list></td-list>
  </div>
  <td-icon-button class="floatting-button">
    <i class="material-icons color-primary md-48">add</i>
  </td-icon-button>
  <td-bottom-bar></td-bottom-bar>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addBtn = this.shadowRoot.querySelector('td-floating-button');
  }
}

customElements.define('td-app', App);
