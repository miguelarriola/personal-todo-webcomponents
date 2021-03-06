const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  #textbox {
    padding: var(--content-margin);
    border-radius: var(--corner-radius);
    background-color: var(--light-grey);
    outline: none;
  }
  #textbox:empty::before {
    content: "New task";
    color: var(--dark-grey);
  }
  </style>
  <div id="textbox" contenteditable tabindex="0"></div>
  <div id="focusable" tabindex="0"></div>
`;

class TextField extends HTMLElement {
  set autofocus(value) {
    if (Boolean(value)) this.setAttribute('autofocus', '');
    else this.removeAttribute('autofocus');
  }

  get autofocus() {
    return this.hasAttribute('autofocus');
  }

  static get observedAttributes() {
    return ['autofocus'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.textBox = this.shadowRoot.querySelector('#textbox');
    this.focusable = this.shadowRoot.querySelector('#focusable');
    this.textStart = '';
    this.resetEvents();
    this.allowInput = true;
  }

  resetEvents() {
    this.counter = 1;
    this.myInput = {};
  }

  count(e) {
    this.myInput[e.type] = this.counter++;
  }

  submit(e) {
    e.preventDefault();
    alert(`Submitting from: ${e.type}`);
  }

  logEvent(e) {
    console.log(e);
  }

  cancelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'autofocus':
        this.textBox.focus();
        break;
    }
  }

  connectedCallback() {
    const { textBox } = this;
    textBox.addEventListener('keydown', (e) => this.onKeyDown(e));
    textBox.addEventListener('beforeinput', (e) => this.onBeforeInput(e));
    textBox.addEventListener('compositionstart', (e) =>
      this.onCompositionStart(e)
    );
    textBox.addEventListener('compositionupdate', (e) =>
      this.onCompositionUpdate(e)
    );
    textBox.addEventListener('compositionend', (e) => this.onCompositionEnd(e));
    textBox.addEventListener('input', (e) => this.onInput(e));
    textBox.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  onKeyDown(e) {}

  onBeforeInput(e) {}

  onCompositionStart(e) {
    this.logEvent(e);
  }

  onCompositionUpdate(e) {
    this.logEvent(e);
  }

  onCompositionEnd(e) {
    this.logEvent(e);
    this.handleEvent(e);
  }

  onInput(e) {}

  onKeyUp(e) {
    console.log('\n');
  }

  handleEvent(e) {
    const {
      data,
      target,
      target: { textContent },
    } = e;
    if (data.endsWith('\n')) {
      const replacement = data.slice(0, -1);
      console.log(`textContent: ${textContent}, ${textContent.length}`);
      console.log(`data: ${replacement}, ${replacement.length}`);
      target.textContent += '';
      // target.textContent = textContent.slice(0, -data.length);
    }
  }

  disconnectedCallback() {
    this.textBox.removeEventListener('keydown', this.onKeyDown);
    this.textBox.removeEventListener('beforeinput', this.onBeforeInput);
    this.textBox.removeEventListener(
      'compositionstart',
      this.onCompositionStart
    );
    this.textBox.removeEventListener(
      'compositionupdate',
      this.onCompositionupdate
    );
    this.textBox.removeEventListener('compositionend', this.onCompositionEnd);
    this.textBox.removeEventListener('input', this.onInput);
  }
}

customElements.define('td-text-field', TextField);
