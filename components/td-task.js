const taskTpl = document.createElement('template');

taskTpl.innerHTML = `
  <style>
    :host {
      display: flex;
      padding: 2px 0 2px 0;
      margin-bottom: 4px;
      box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
      border-radius: 4px;
    }
    i {
      margin-right: 10px;
    }
    p {
      display: flex;
      margin: 0;
      padding: 12px 0 12px 0;
      align-items: center;
    }
  </style>
  <td-toggle></td-toggle>
  <p></p>
`;

class Task extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(taskTpl.content.cloneNode(true));
  }
}

customElements.define('td-task', Task);
