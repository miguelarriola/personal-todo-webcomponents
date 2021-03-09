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
      max-width: var(--app-max-width, 768px);
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
    <form id="input-form">
      <input id="text-field" type="text" placeholder="New task" maxlength="240">
    </form>
    <div id="buttons">
      <i id="go-back" class="button material-icons">arrow_back</i>
      <i id="confirm" class="button material-icons" disabled>check</i>
    </div>
  </div>
`;

class BottomBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.overlay = this.shadowRoot.querySelector('#overlay');
    this.textField = this.shadowRoot.querySelector('#text-field');
    this.goBackButton = this.shadowRoot.querySelector('#go-back');
    this.confirmButton = this.shadowRoot.querySelector('#confirm');
    this.inputForm = this.shadowRoot.querySelector('#input-form');
  }

  connectedCallback() {
    this.addEventListener('focus', this.onFocus);
    this.overlay.addEventListener('click', () => this.close());
    this.textField.addEventListener('input', () => this.updateBtnState());
    this.goBackButton.addEventListener('click', () => this.close());
    this.confirmButton.addEventListener('click', () => this.onConfirm());
    this.inputForm.addEventListener('submit', (e) => this.onSubmit(e));
  }

  disconnectedCallback() {
    this.removeEventListener('focus', this.onFocus);
    this.overlay.removeEventListener('click', this.close);
    this.textField.removeEventListener('input', this.updateBtnState);
    this.goBackButton.removeEventListener('click', this.close);
    this.confirmButton.removeEventListener('click', this.onConfirm);
    this.inputForm.removeEventListener('submit', this.onSubmit);
  }

  onFocus() {
    this.textField.focus();
  }

  close() {
    this.clearTextField();
    this.hidden = true;
  }

  updateBtnState(e) {
    if (this.titleText) this.confirmButton.removeAttribute('disabled');
    else this.confirmButton.setAttribute('disabled', '');
  }

  onConfirm() {
    const title = this.titleText;
    if (title) {
      this.saveTask(title);
      this.close();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const title = this.titleText;
    if (title) {
      this.saveTask(title);
      this.clearTextField();
    }
  }

  clearTextField = () => {
    this.textField.value = '';
    this.updateBtnState();
  };

  get titleText() {
    return this.textField.value.trim();
  }

  saveTask = async (title) => {
    await setTask({ title });
    const taskAddedEvent = new CustomEvent('taskAdded', { bubbles: true });
    this.dispatchEvent(taskAddedEvent);
  };
}

customElements.define('td-bottom-bar', BottomBar);
