import { getTasks } from '../services/taskService.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  </style>
`;

class List extends HTMLElement {
  tasks = [];

  // static get observedAttributes() {
  //   return ['tasks'];
  // }

  // set tasks(value) {
  //   this.tasks = [...this.tasks, value];
  // }

  // get tasks() {
  //   return this.hasAttribute('tasks');
  // }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // attributeChangedCallback(attrName, oldVal, newVal) {
  //   switch (attrName) {
  //     case 'on':
  //       this.render();
  //       break;
  //   }
  // }

  connectedCallback() {
    this.getTasks();
  }

  disconnectedCallback() {}

  async getTasks() {
    this.tasks = await getTasks();
    this.render();
  }

  onClick() {}

  render() {
    this.tasks.forEach(({ _id, done, title }) => {
      const task = document.createElement('td-task');
      task._id = _id;
      task.done = done;
      task.title = title;
      this.shadowRoot.appendChild(task);
    });
  }
}

customElements.define('td-list', List);
