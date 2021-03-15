import taskService from '../services/taskService.js';
import { formatString, notifyEvent_v2 } from '../helpers/componentHelpers.js';

const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: block;
    }
    .content {
      display: flex;
      padding: 2px 0 2px 0;
      border-radius: var(--corner-radius, 4px);
      box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
    }
    .title {
      display: flex;
      margin: 0;
      padding: var(--content-margin, 12px) var(--content-margin, 12px) var(--content-margin, 12px) 0;
      align-items: center;
    }
    .toggle[data-pressed="true"] ~ .title{
      text-decoration: line-through;
      color: var(--dark-grey, #B9BDC6);
    }
  </style>
  <div id="card-content" class="content">
    <td-toggle-button id="toggle-button" class="toggle"></td-toggle-button>
    <span id="task-title" class="title"></span>
  </div>
`;

class TaskCard extends HTMLElement {
  set taskDone(value) {
    this.toggleButton.pressed = value;
  }

  get taskDone() {
    return this.toggleButton.pressed;
  }

  set taskTitle(value) {
    this.taskTitleText.textContent = formatString(value);
  }

  get taskTitle() {
    return this.taskTitleText.textContent;
  }

  get task() {
    return { id: this.taskId, title: this.taskTitle, done: this.taskDone };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.cardContent = this.shadowRoot.querySelector('#card-content');
    this.toggleButton = this.shadowRoot.querySelector('#toggle-button');
    this.taskTitleText = this.shadowRoot.querySelector('#task-title');
  }

  connectedCallback() {
    this.cardContent.addEventListener('click', (e) => this.onClick(e));
  }

  disconnectedCallback() {
    this.cardContent.removeEventListener('click', this.onClick);
  }

  onClick(e) {
    if (e.target === this.toggleButton) this.hadleTaskToggled();
    else this.handleShowDetail();
  }

  async hadleTaskToggled() {
    if (this.taskDone) {
      const deletedTask = await taskService.delete(this.taskId);
      if (deletedTask) {
        const detail = { action: 'done', item: this.task };
        const options = { bubbles: true, detail };
        notifyEvent_v2.bind(this)('itemChanged', options);
      }
    }
  }

  handleShowDetail() {
    const detail = { action: 'show', item: this.task };
    const options = { bubbles: true, detail };
    notifyEvent_v2.bind(this)('showDetail', options);
  }
}

customElements.define('td-task-card', TaskCard);
