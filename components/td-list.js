const listTpl = document.createElement('template');

listTpl.innerHTML = `
  <style>
    :host {
      display: block;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  </style>
  <td-task>Sacar al perro</td-task>
  <td-task>Estudiar el curso de APIS de Traversy Media</td-task>
  <td-task>Estudiar el curso de APIS de Traversy Media. Estudiar el curso de APIS de Traversy Media</td-task>
  <td-task>Crear API</td-task>
`;

class List extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(listTpl.content.cloneNode(true));
  }
}

customElements.define('td-list', List);
