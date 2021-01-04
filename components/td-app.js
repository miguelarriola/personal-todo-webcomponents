const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
      padding: 10px;
    }
    h1 {
      text-align: center;
    }
  </style>
  <h1>ToDo</h1>
  <td-list></td-list>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('td-app', App);
