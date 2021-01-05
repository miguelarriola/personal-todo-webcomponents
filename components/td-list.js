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
  <td-task></td-task>
  <td-task></td-task>
  <td-task></td-task>
  <td-task></td-task>
  <td-task></td-task>
  <td-task></td-task>
  <td-task></td-task>
  <td-task></td-task>
`;

class List extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.listTasks();
  }

  async listTasks() {
    this.tasks = await getTasks();
    this.tasks.forEach(({ _id, done, title }) => {
      const task = document.createElement('td-task');
      task._id = _id;
      task.done = done;
      task.textContent = title;
      this.shadowRoot.appendChild(task);
    });
  }
}

customElements.define('td-list', List);
