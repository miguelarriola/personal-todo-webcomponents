const taskTpl = document.createElement('template');

taskTpl.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: flex;
      padding: 14px 10px 14px 10px;
      margin-bottom: 4px;
      box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
      border-radius: 4px;
    }
    i {
      margin-right: 10px;
    }
    div {
      display: flex;
      align-items: center;
    }
  </style>
  <i class="material-icons">radio_button_unchecked</i>
  <div>
    <slot></slot>
  </div>
`;

class Task extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(taskTpl.content.cloneNode(true));
  }
}

customElements.define('td-task', Task);
