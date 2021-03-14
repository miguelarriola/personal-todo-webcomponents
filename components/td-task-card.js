import { notifyEvent, fallBackValue } from '../helpers/componentHelpers.js';

const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: block;
    }
    .card-content {
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
  <div class="card-content">
  <td-toggle-button id="toggle-button" class="toggle"></td-toggle-button>
  <span id="task-title" class="title"></span>
  </div>
`;

class TaskCard extends HTMLElement {
  task = {};

  set taskId(value) {
    this.task.id = fallBackValue(value);
  }

  get taskId() {
    return this.task.id;
  }

  set taskDone(value) {
    this.task.done = Boolean(value);
  }

  get taskDone() {
    return this.this.task.done;
  }

  set taskTitle(value) {
    this.taskTitleText.textContent = this.task.title = fallBackValue(value);
  }

  get taskTitle() {
    return (this.task.title = this.taskTitleText.textContent);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.toggleButton = this.shadowRoot.querySelector('#toggle-button');
    this.taskTitleText = this.shadowRoot.querySelector('#task-title');
  }

  connectedCallback() {
    this.addEventListener('click', (e) => this.onClick(e));
    this.toggleButton.addEventListener('changed', (e) =>
      this.onToggleChange(e)
    );
  }

  disconnectedCallback() {
    this.toggleButton.removeEventListener('click', this.onClick);
    this.toggleButton.removeEventListener('changed', this.onToggleChange);
  }

  onStateChange() {
    console.log('onStateChange');
  }

  onToggleChange(e) {
    const {
      detail: { pressed },
    } = e;
  }

  onClick(e) {
    console.log(e.target);
  }
}

customElements.define('td-task-card', TaskCard);
