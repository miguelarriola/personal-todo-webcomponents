const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: inline-block;
      height: 24px;
      width: 24px;
      padding: 12px;
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

  onStateChanged() {
    this.toggleIcon.textContent = this.pressed
      ? this.pressedIcon
      : this.unpressedIcon;
  }

  onClick() {
    this.pressed = !this.pressed;
    const options = { detail: { pressed: this.pressed }, bubbles: true };
    this.dispatchEvent(new CustomEvent('changed', options));
  }

  setDefault = () => {
    this.updateProperty('unpressedIcon', 'radio_button_unchecked');
    this.updateProperty('pressedIcon', 'check_circle_outline');
    this.updateProperty('pressed', false);
  };

  updateProperty = (property, defaultValue) => {
    if (this.hasOwnProperty(property)) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    } else {
      this[property] = defaultValue;
    }
  };

  notifyEvent = (name, detail) =>
    this.dispatchEvent(new CustomEvent(name, { detail }));
}

customElements.define('td-toggle-button', ToggleButton);
