const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: flex;
      padding: 2px 0 2px 0;
      margin-bottom: 4px;
      box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
      border-radius: 4px;
    }
    .title {
      display: flex;
      margin: 0;
      padding: 12px 12px 12px 0;
      align-items: center;
    }
    :host([done]) > .title{
      text-decoration: line-through;
      color: #B9BDC6;
    }
  </style>
  <td-toggle></td-toggle>
  <slot class="title"></slot>
`;

class Task extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.toggle = this.shadowRoot.querySelector('td-toggle');
  }

  set _id(value) {
    this.setAttribute('_id', String(value));
  }

  get _id() {
    return this.getAttribute('_id');
  }

  set done(value) {
    if (Boolean(value)) this.setAttribute('done', '');
    else this.removeAttribute('done');
  }

  get done() {
    return this.hasAttribute('done');
  }

  static get observedAttributes() {
    return ['done'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      default:
    }
  }

  connectedCallback() {
    this.toggle.addEventListener('change', (e) => this.onChange(e));
  }

  disconnectedCallback() {
    this.toggle.removeEventListener('change', this.onChange);
  }

  onChange({ detail: { pressed } }) {
    this.done = pressed;
  }
}

customElements.define('td-task', Task);
