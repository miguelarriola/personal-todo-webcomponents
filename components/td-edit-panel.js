import taskService from '../services/taskService.js';

const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: block;
      box-sizing: border-box;
    }
    :host([hidden]) {
      display: none;
    }
    .overlay {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: var(--background);
    }
    .content {
      display: block;
      position: fixed;
      box-sizing: border-box;
      z-index: 1;
      top: 0;
      max-width: var(--app-max-width, 768px);
      width: 100%;
      height: 100%;
      padding: var(--content-margin, 12px);
      background-color: var(--background);
      outline: none;
    }
    .button-bar {
      display: flex;
      box-sizing: border-box;
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
    .button:hover:not([data-disabled=true]){
      background-color: var(--light-grey);
      cursor: pointer;
    }
    .button[data-disabled=true] { 
      color: var(--icon-disabled);
    }
    #text-field {
      width: 100%;
      height: 40%;
      padding: 0;
      border: none;
      outline: none;
      overflow: auto;
      resize: none;
      background-color: var(--background);
      font-family: var(--main-font);
      color: var(--color);
      font-size: var(--font-size);
      box-sizing: border-box;
    }
    #text-field::placeholder {
        font-family: var(--main-font);
        color: var(--dark-grey);
        font-size: var(--font-size);
    }
  </style>
  <div class="overlay"></div>
  <div class="content">
    <div class="button-bar">
      <i id="go-back" class="button material-icons" title="Go back">arrow_back</i>
      <i id="delete" class="button material-icons" title="Delete task">delete_outline</i>
      <i id="confirm" class="button material-icons" title="Confirm changes">check</i>
    </div>
    <textarea id="text-field" placeholder="Title task" maxlength="240"></textarea>
  </div>
`;

class EditPanel extends HTMLElement {
  set taskId(value) {
    this.dataset.taskId = value ? this.formatString(value) : '';
  }

  get taskId() {
    return this.dataset.taskId.trim();
  }

  set taskTitle(value) {
    this.textField.value = value ? this.formatString(value) : '';
  }

  get taskTitle() {
    return this.formatString(this.textField.value);
  }

  set confirmButtonState(value) {
    this.confirmButton.dataset.disabled = Boolean(value);
  }

  get confirmButtonState() {
    return this.confirmButton.dataset.disabled === 'true';
  }

  static get observedAttributes() {
    return ['data-task-id'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.goBackButton = this.shadowRoot.querySelector('#go-back');
    this.deleteButton = this.shadowRoot.querySelector('#delete');
    this.confirmButton = this.shadowRoot.querySelector('#confirm');
    this.textField = this.shadowRoot.querySelector('#text-field');
  }

  attributeChangedCallback() {
    this.onTaskIdChanged();
  }

  connectedCallback() {
    this.setDefault();
    this.goBackButton.addEventListener('click', () => this.onGoBack());
    this.deleteButton.addEventListener('click', () => this.onDelete());
    this.confirmButton.addEventListener('click', () => this.onConfirm());
    this.textField.addEventListener('input', () => this.onInput());
    this.textField.addEventListener('keydown', (e) => this.onKeydown(e));
  }

  disconnectedCallback() {
    this.goBackButton.removeEventListener('click', this.onGoBack);
    this.deleteButton.removeEventListener('click', this.onDelete);
    this.confirmButton.removeEventListener('click', this.onConfirm);
    this.textField.removeEventListener('input', this.onInput);
    this.textField.removeEventListener('keydown', (e) => this.onKeydown(e));
  }

  setDefault() {
    this.taskId = '';
    this.taskTitle = '';
  }

  async onTaskIdChanged() {
    const fetchedTask = await taskService.get(this.taskId);
    this.taskTitle = fetchedTask?.title;
    this.onInput();
  }

  onGoBack() {
    this.setDefault();
    this.hidden = true;
  }

  async onDelete() {
    const deletedTask = await taskService.delete(this.taskId);
    if (deletedTask) {
      this.notifyEvent('itemChanged', {
        action: 'delete',
        item: this.composeTask(deletedTask),
      });
    }
    this.onGoBack();
  }

  async onConfirm() {
    if (this.confirmButtonState) return;
    const updatedTask = await taskService.update(this.taskId, {
      title: this.taskTitle,
    });
    if (updatedTask) {
      this.notifyEvent('itemChanged', {
        action: 'update',
        item: this.composeTask(updatedTask),
      });
      this.onGoBack();
    }
  }

  onInput() {
    this.confirmButtonState = !Boolean(this.taskTitle);
    this.textField.value = this.textField.value.replace(/(\r\n|\n|\r)/gm, ' ');
  }

  onKeydown(e) {
    if (e.key === 'Enter') this.onConfirm();
  }

  formatString = (string) =>
    String(string)
      .trim()
      .replace(/(\r\n|\n|\r)/gm, ' ');

  notifyEvent = (name, detail) =>
    this.dispatchEvent(new CustomEvent(name, { detail }));

  composeTask = ({ _id, title }) => ({ id: _id, title });
}

customElements.define('td-edit-panel', EditPanel);
