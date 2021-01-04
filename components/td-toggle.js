const toggleTpl = document.createElement('template');

toggleTpl.innerHTML = `
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
  iconOff = 'radio_button_unchecked';
  iconOn = 'check_circle_outline';

  static get observedAttributes() {
    return ['on'];
  }

  set on(value) {
    const isOn = Boolean(value);
    if (isOn) this.setAttribute('on', '');
    else this.removeAttribute('on');
  }

  get on() {
    return this.hasAttribute('on');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(toggleTpl.content.cloneNode(true));
    this.render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'on':
        this.render();
        break;
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.renoveEventListener('click', this.onClick);
  }

  onClick() {
    this.on = !this.on;
    this.dispatchEvent(
      new CustomEvent('change', { detail: { on: this.on }, bubbles: true })
    );
  }

  render() {
    const icon = this.shadowRoot.querySelector('i');
    if (this.on) icon.textContent = this.iconOn;
    else icon.textContent = this.iconOff;
  }
}

customElements.define('td-toggle', Toggle);
