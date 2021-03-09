const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: block;
    }
    .container {
      max-width: var(--app-max-width, 768px);
      margin: 0 auto;
      padding: 0;
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
    .floating-button{
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
  <div class="container">
    <div>
      <h1>ToDo</h1>
      <td-list></td-list>
    </div>
    <td-icon-button class="floating-button">
      <i class="material-icons color-primary md-48">add</i>
    </td-icon-button>
    <td-bottom-bar tabindex="-1" hidden></td-bottom-bar>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addButton = this.shadowRoot.querySelector('.floating-button');
    this.bottomBar = this.shadowRoot.querySelector('td-bottom-bar');
    this.taskList = this.shadowRoot.querySelector('td-list');
  }

  connectedCallback() {
    this.addButton.addEventListener('click', this.onClick.bind(this));
    this.bottomBar.addEventListener('taskAdded', this.onTaskAdded.bind(this));
  }

  disconnectedCallback() {
    this.addButton.removeEventListener('click', this.onClick);
    this.bottomBar.addEventListener('taskAdded', this.onTaskAdded);
  }

  onClick() {
    this.bottomBar.hidden = false;
    this.bottomBar.focus();
  }

  onTaskAdded() {
    this.taskList.listTasks();
  }
}

customElements.define('td-app', App);
