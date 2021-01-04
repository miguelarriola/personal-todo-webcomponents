const listTpl = document.createElement('template');

listTpl.innerHTML = `
  <style>
    :host {
      display: block;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  </style>
  <td-task></td-task>
  <td-task title="Sacar al perro Sacar al perro Sacar"></td-task>
`;

class List extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(listTpl.content.cloneNode(true));
  }
}

customElements.define('td-list', List);
