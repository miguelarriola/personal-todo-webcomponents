const KeyVal = Object.freeze({
  SPACE: ' ',
  TAB: 'Tab',
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
  UNIDENTIFIED: 'Unidentified',
});

// const specialKey = [KeyVal.TAB, KeyVal.BACKSPACE, KeyVal.DELETE].some(
//   (val) => key === val
// );

const States = Object.freeze({ EMPTY: 1, PARTLY_FULL: 2, FULL: 3 });

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
  defaulMaxLength = 5;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.textBox = this.shadowRoot.querySelector('.textbox');
    this.textBox.state = States.EMPTY;
    this.textBox.maxLength = this.defaulMaxLength;
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
    this.textBox.addEventListener('keyup', (e) => this.onKeyup(e));
  }

  disconnectedCallback() {
    this.textBox.removeEventListener('keydown', this.onKeydown);
    this.textBox.addEventListener('keyup', this.onKeyup());
  }

  onKeydown(event) {
    const { key } = event;

    if (key === 'Enter') event.preventDefault();

    // /[A-Za-z0-9°|¬!"#$%&/()=\'\?\\¡¿]/

    const isText = key.length === 1 || key === 'Dead';

    const text = this.textBox.textContent.trim();

    if (!specialKey && text.length + 1 > this.textBox.maxLength)
      event.preventDefault();
  }

  commitText() {
    const text = this.textBox.textContent.trim();
    const detail = {
      detail: { text },
      bubbles: true,
      composed: true,
    };
    console.log(detail);
    this.dispatchEvent(new CustomEvent('textCommited', detail));
  }

  onKeyup(event) {
    const text = this.textBox.textContent;
    if (text.length > this.textBox.maxLength) {
      const allowedText = text.slice(0, -1);
      this.textBox.textContent = allowedText;
    }
  }
}

customElements.define('td-text-area', TextArea);
