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
    #overlay {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    #content {
      position: fixed;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 6px var(--content-margin);
      background-color: var(--background);
      box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
      outline: none;
    }
    #text-field {
      width: 100%;
      padding: 6px 0;
      border: none;
      outline: none;
      background-color: var(--background);
      font-family: var(--main-font);
      color: var(--color);
      font-size: var(--font-size);
    }
    #text-field::placeholder {
        font-family: var(--main-font);
        color: var(--dark-grey);
        font-size: var(--font-size);
    }
    #buttons {
      display: flex;
      justify-content: space-between;
    }
    .button {
      width: var(--icon-dimension-36); 
      height: var(--icon-dimension-36); 
      border-radius: 50%;
      color: var(--primary); 
      font-size: var(--icon-dimension-36); 
      -webkit-tap-highlight-color: transparent;
    }
    .button:hover:not([disabled]){
      background-color: var(--light-grey);
      cursor: pointer;
    }
    .button[disabled] { 
      color: var(--icon-disabled);
    }
  </style>
  <div id="overlay"></div>
  <div id="content">
    <input id="text-field" type="text" placeholder="New task" maxlength="10">
    <div id="buttons">
      <i id="confirm" class="button material-icons">arrow_back</i>
      <i class="button material-icons" disabled>check</i>
    </div>
  </div>
`;

class BottomBar extends HTMLElement {
  myInput = {};

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.overlay = this.shadowRoot.querySelector('#overlay');
    this.textField = this.shadowRoot.querySelector('#text-field');
    this.confirmButton = this.shadowRoot.querySelector('#confirm');
  }

  connectedCallback() {
    this.addEventListener('focus', this.onFocus);
    this.overlay.addEventListener('click', this.close.bind(this));
    this.textField.addEventListener('input', (e) => this.onInput(e));
    this.confirmButton.addEventListener(
      'click',
      this.onAddButtonClick.bind(this)
    );
  }

  disconnectedCallback() {
    this.removeEventListener('focus', this.onFocus);
    this.overlay.removeEventListener('click', this.close);
    this.textField.removeEventListener('input', this.onInput);
    this.confirmButton.removeEventListener('click', this.onAddButtonClick);
  }

  onFocus() {
    this.textField.focus();
  }

  onInput(e) {
    if (this.titleText) this.confirmButton.disabled = false;
    else this.confirmButton.disabled = true;
  }

  onAddButtonClick() {
    this.saveTask();
    this.close();
  }

  close() {
    console.log('closing');
    this.hidden = true;
  }

  get titleText() {
    return this.textField.value.trim();
  }

  async saveTask() {
    const title = this.titleText;
    if (!title) return;
    await setTask({ title });
    const taskAddedEvent = new CustomEvent('taskAdded', { bubbles: true });
    this.dispatchEvent(taskAddedEvent);
    this.textField.value = '';
  }
}

customElements.define('td-bottom-bar', BottomBar);
