import { namedKeyAttributeValues as keyValues } from '../helpers/textHelpers.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host { 
      display: block;
    }
    .textbox {
      padding: var(--margin-content);
      border-radius: var(--corner-radius);
      background-color: var(--light-grey);
      outline: none;
    }
    .textbox[contenteditable]:empty::before {
      content: "New task";
      color: var(--dark-grey);
    }
  </style>
  <div class="textbox" contenteditable></div>
`;

class TextArea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.textBox = this.shadowRoot.querySelector('.textbox');
    this.maxLength = 10;
  }

  set maxLength(value) {
    if (Number.isInteger(value)) this.setAttribute('maxLength', value);
    else this.this.setAttribute('maxLength', this.defaulMaxLength);
  }

  get maxLength() {
    return this.getAttribute('maxLength');
  }

  static get observedAttributes() {
    return ['maxLength'];
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
