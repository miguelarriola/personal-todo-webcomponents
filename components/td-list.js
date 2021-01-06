import { getTasks, deleteTask } from '../services/taskService.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    ul {
      padding: 0;
      margin: 0;
    }
  </style>
  <ul></ul>
`;

class List extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.list = this.shadowRoot.querySelector('ul');
  }

  connectedCallback() {
    this.listTasks();
    this.addEventListener('taskDone', (e) => this.onTaskDone(e));
  }

  disconnectedCallback() {
    this.removeEventListener('taskDone', this.onTaskDone);
  }

  async onTaskDone({ detail: { _id } }) {
    await deleteTask(_id);
    this.listTasks();
  }

  async listTasks() {
    while (this.list.firstChild) this.list.removeChild(this.list.firstChild);
    this.tasks = await getTasks();
    this.tasks.forEach(({ _id, done, title }) => {
      const task = document.createElement('td-task');
      task._id = _id;
      task.done = done;
      task.textContent = title;
      this.list.appendChild(task);
    });
  }
}

customElements.define('td-list', List);
