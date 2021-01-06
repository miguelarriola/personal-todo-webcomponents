import { namedKeyAttributeValues as keyValues } from '../helpers/textHelpers.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    textarea {
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: var(--content-margin);
      -webkit-border-radius: var(--corner-radius);
      -moz-border-radius: var(--corner-radius);
      border-radius: var(--corner-radius);
      background-color: var(--light-grey);
      border: none;
      overflow: auto;
      outline: none;
      resize: none;
      font-family: var(--main-font);
      color: var(--color);
      font-size: var(--font-size);
    }
    ::-webkit-input-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    :-moz-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    ::-moz-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    :-ms-input-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    ::placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
  </style>
  <textarea placeholder="New task" rows="3"></textarea>
`;

class TextArea extends HTMLElement {
  defaultMaxLength = 5;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.textBox = this.shadowRoot.querySelector('textarea');
    this.textBox.setAttribute('maxlength', this.defaultMaxLength);
  }

  set maxLength(value) {
    console.log('set');
    if (Number(value).isInteger()) this.setAttribute('maxLength', value);
    else this.setAttribute('maxLength', this.defaultMaxLength);
  }

  get maxLength() {
    console.log('get');
    return this.getAttribute('maxLength');
  }

  static get observedAttributes() {
    return ['maxLength'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('change');
    switch (attrName) {
      case 'maxLength':
        this.textBox.setAttribute('maxlength', this.maxLength);
        break;
      default:
        break;
    }
  }

  connectedCallback() {
    this.textBox.addEventListener('keydown', (e) => this.onKeydown(e));
  }

  disconnectedCallback() {
    this.textBox.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown(event) {
    const { key } = event;

    if (key === 'Enter') event.preventDefault();
    const isKeyString = !keyValues.some((val) => key === val);
    const currentLength = this.textBox.textContent.length;
    if (isKeyString && currentLength + 1 > this.maxLength)
      event.preventDefault();
  }
}

customElements.define('td-text-area', TextArea);
