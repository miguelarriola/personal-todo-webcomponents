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
    .content {
      position: fixed;
      top: 0;
      width: 100%;
      box-sizing: border-box;
      padding: var(--content-margin, 12px);
      background-color: var(--background);
/*  */
      background-color: aquamarine;
      // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
/*  */
      outline: none;
      max-width: var(--app-max-width, 768px);
    }
    .button-bar {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--content-margin, 12px);; 
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
  </style>
  <div class="content">
    <div class="button-bar">
      <i id="go-back" class="button material-icons">arrow_back</i>
      <i id="confirm" class="button material-icons">delete_outline</i>
      <i id="confirm" class="button material-icons" disabled>check</i>
    </div>
    <textarea id="text-field" type="text" placeholder="New task" maxlength="240">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea>
  </div>
`;

class EditPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.textField = this.shadowRoot.querySelector('#text-field');
    this.goBackButton = this.shadowRoot.querySelector('#go-back');
    this.confirmButton = this.shadowRoot.querySelector('#confirm');
    this.inputForm = this.shadowRoot.querySelector('#input-form');
  }

  connectedCallback() {
    this.addEventListener('focus', this.onFocus);
    this.textField.addEventListener('input', () => this.updateBtnState());
    this.goBackButton.addEventListener('click', () => this.close());
    this.confirmButton.addEventListener('click', () => this.onConfirm());
  }

  disconnectedCallback() {
    this.removeEventListener('focus', this.onFocus);
    this.textField.removeEventListener('input', this.updateBtnState);
    this.goBackButton.removeEventListener('click', this.close);
    this.confirmButton.removeEventListener('click', this.onConfirm);
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

customElements.define('td-edit-panel', EditPanel);
