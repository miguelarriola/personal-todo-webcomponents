const template = document.createElement('template');

template.innerHTML = `
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
  </style>
  <div>
    <h1>ToDo</h1>
    <td-list></td-list>
  </div>
  <td-floating-button></td-floating-button>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addBtn = this.shadowRoot.querySelector('td-floating-button');
  }

  connectedCallback() {
    this.addBtn.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.addBtn.renoveEventListener('click', this.onClick);
  }

  onClick() {}
}

customElements.define('td-app', App);
