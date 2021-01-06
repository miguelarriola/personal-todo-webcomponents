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
  <i class="material-icons"></i>
`;

class Toggle extends HTMLElement {
  unpressedIcon = 'radio_button_unchecked';
  pressedIcon = 'check_circle_outline';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.icon = this.shadowRoot.querySelector('i');
    this.icon.textContent = this.unpressedIcon;
  }

  set pressed(value) {
    if (Boolean(value)) this.setAttribute('pressed', '');
    else this.removeAttribute('pressed');
  }

  get pressed() {
    return this.hasAttribute('pressed');
  }

  static get observedAttributes() {
    return ['pressed'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'pressed':
        if (this.pressed) this.icon.textContent = this.pressedIcon;
        else this.icon.textContent = this.unpressedIcon;
        break;
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  onClick() {
    this.pressed = !this.pressed;
    this.dispatchEvent(
      new CustomEvent('toggleChange', {
        detail: { pressed: this.pressed },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('td-toggle', Toggle);
