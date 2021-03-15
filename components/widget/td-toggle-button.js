import {
  notifyEvent_v2,
  updateProperty,
} from '../../helpers/componentHelpers.js';

const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: inline-block;
      height: 24px;
      width: 24px;
      padding: var(--content-margin, 12px);
      border-radius: 50%;
      -webkit-tap-highlight-color: transparent;
    }
    :host(:hover){
      cursor: pointer;
      background-color: #f5f5f5;
    }
  </style>
  <i id="toggle-icon" class="material-icons"></i>
`;

class ToggleButton extends HTMLElement {
  set pressed(value) {
    this.dataset.pressed = Boolean(value);
  }

  get pressed() {
    return this.dataset.pressed === 'true';
  }

  static get observedAttributes() {
    return ['data-pressed'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.toggleIcon = this.shadowRoot.querySelector('#toggle-icon');
  }

  attributeChangedCallback() {
    this.onStateChanged();
  }

  connectedCallback() {
    this.setDefault();
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  setDefault = () => {
    updateProperty.bind(this)('unpressedIcon', 'radio_button_unchecked');
    updateProperty.bind(this)('pressedIcon', 'check_circle_outline');
    updateProperty.bind(this)('pressed', false);
  };

  onStateChanged() {
    if (this.pressed) this.toggleIcon.textContent = this.pressedIcon;
    else this.toggleIcon.textContent = this.unpressedIcon;
  }

  onClick() {
    this.pressed = !this.pressed;
    const options = { detail: { pressed: this.pressed }, bubbles: true };
    notifyEvent_v2.bind(this)('changed', options);
  }
}

customElements.define('td-toggle-button', ToggleButton);
