const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: block;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: var(--content-margin);
      background-color: var(--background);
      box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
    }
    :host([hidden]) {
      display: none;
    }
    .material-icons.color-primary { 
      color: var(--primary); 
    }
  </style>
  <td-text-area>
    <textarea placeholder="New task" rows="3" maxlength="240"></textarea>
  </td-text-area>
  <td-icon-button class="hover-highlight">
    <i class="material-icons color-primary">add_circle</i>
  </td-icon-button>
`;

class BottomBar extends HTMLElement {
  prop = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set prop(value) {
    if (Boolean(value)) this.setAttribute('prop', '');
    else this.removeAttribute('prop');
  }

  get prop() {
    return this.hasAttribute('prop');
  }

  static get observedAttributes() {
    return ['prop'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'prop':
        break;
      default:
        break;
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  onClick() {}
}

customElements.define('td-bottom-bar', BottomBar);
