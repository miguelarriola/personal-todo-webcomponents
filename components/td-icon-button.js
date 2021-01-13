const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      width: var(--button-dimension,var(--icon-dimension));
      height: var(--button-dimension,var(--icon-dimension));
      padding: var(--button-padding,var(--content-margin));
      background-color: var(--button-bg-color,transparent);
      border-radius: var(--button-corner,50%);
      -webkit-tap-highlight-color: transparent;
    }
    :host(:hover){
      cursor: pointer;
    }
    :host(.hover-highlight:hover){
      background-color: var(--light-grey);
    }
    [hidden]{
      display: none;
    }
  </style>
  <slot id="icon"></slot>
  <slot id="icon2" name="icon2" hidden></slot>
`;

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.icon = this.shadowRoot.querySelector('#icon');
    this.icon2 = this.shadowRoot.querySelector('#icon2');
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
        this.icon.hidden = !this.icon.hidden;
        this.icon2.hidden = !this.icon2.hidden;
        break;
    }
  }

  connectedCallback() {
    if (this.hasAttribute('toggle'))
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

customElements.define('td-icon-button', Button);
