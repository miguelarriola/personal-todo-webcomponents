import { getTasks } from '../services/taskService.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .list-container {
      padding: 0;
      margin: 0;
    }
    .task-card {
      margin-bottom: 4px;
    }
  </style>
  <ul id="task-list" class="list-container"></ul>
  <td-edit-panel id="edit-panel"></td-edit-panel>
`;

class List extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.taskList = this.shadowRoot.querySelector('#task-list');
    this.editPanel = this.shadowRoot.querySelector('#edit-panel');
  }

  connectedCallback() {
    this.setDefault();
    this.taskList.addEventListener('showDetail', (e) => this.onShowDetail(e));
    this.taskList.addEventListener('itemChanged', () => this.onItemChanged());
    this.editPanel.addEventListener('itemChanged', () => this.onItemChanged());
  }

  disconnectedCallback() {
    this.taskList.removeEventListener('showDetail', this.onShowDetail);
    this.taskList.removeEventListener('itemChanged', this.onItemChanged);
    this.editPanel.removeEventListener('itemChanged', this.onItemChanged);
  }

  setDefault() {
    this.editPanel.hidden = true;
    this.listTasks();
  }

  async listTasks() {
    while (this.taskList.firstChild)
      this.taskList.removeChild(this.taskList.firstChild);
    this.tasks = await getTasks();
    this.tasks.forEach(({ _id, done, title }) => {
      const taskCard = document.createElement('td-task-card');
      taskCard.classList.add('task-card');
      taskCard.taskId = _id;
      taskCard.taskTitle = title;
      taskCard.taskDone = done;
      this.taskList.appendChild(taskCard);
    });
  }

  onShowDetail(e) {
    const { detail } = e;
    const { item } = detail;
    const { id } = item;
    this.editPanel.taskId = id;
    this.editPanel.hidden = false;
  }

  async onItemChanged() {
    this.listTasks();
  }
}

customElements.define('td-list', List);
