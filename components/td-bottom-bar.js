import { setTask } from '../services/taskService.js';

const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }
    #content, #overlay {
      position: fixed;
      width: 100%;
      bottom: 0;
    }
    #overlay {
      height: 100%;
      top: 0;
      right: 0;
      left: 0;
    }
    #content {
      box-sizing: border-box;
      position: fixed;
      padding: var(--content-margin);
      background-color: var(--background);
      box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
      outline: none;
    }
    .material-icons.color-primary { 
      color: var(--primary); 
    }
    td-text-area {
      margin-right: 60px;
    }
    #add-button {
      position: fixed;
      bottom: 12px;
      right: -12px;
      transform: translateX(-50%);
      --button-dimension: var(--icon-dimension-36);
      --button-padding: 6px;
    }
    .material-icons.md-36 {
      font-size: var(--icon-dimension-36); 
    }
  </style>
  <div id="overlay"></div>
  <div id="content">
    <td-text-area tabindex="0">
      <textarea placeholder="New task" rows="3" maxlength="240"></textarea>
    </td-text-area>
    <td-icon-button id="add-button" class="hover-highlight" disabled tabindex="0">
      <i class="material-icons color-primary md-36">add_circle</i>
    </td-icon-button>
  </div>
`;

class BottomBar extends HTMLElement {
  myInput = {};

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.textArea = this.shadowRoot.querySelector('textarea');
    this.addButton = this.shadowRoot.querySelector('#add-button');
    this.overlay = this.shadowRoot.querySelector('#overlay');
  }

  connectedCallback() {
    this.addEventListener('focus', this.onFocus);
    this.textArea.addEventListener('input', (e) => this.onInput(e));
    this.addButton.addEventListener('click', this.onAddButtonClick.bind(this));
    this.overlay.addEventListener('click', this.close.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('focus', this.onFocus);
    this.textArea.removeEventListener('input', this.onInput);
    this.addButton.removeEventListener('click', this.onAddButtonClick);
    this.overlay.removeEventListener('click', this.close);
  }

  onFocus() {
    this.textArea.focus();
  }

  onInput(e) {
    if (this.titleText) this.addButton.disabled = false;
    else this.addButton.disabled = true;
  }

  onAddButtonClick() {
    this.saveTask();
    this.close();
  }

  close() {
    this.hidden = true;
  }

  get titleText() {
    return this.textArea.value.trim();
  }

  async saveTask() {
    const title = this.titleText;
    if (!title) return;
    await setTask({ title });
    const taskAddedEvent = new CustomEvent('taskAdded', { bubbles: true });
    this.dispatchEvent(taskAddedEvent);
    this.textArea.value = '';
  }
}

customElements.define('td-bottom-bar', BottomBar);
