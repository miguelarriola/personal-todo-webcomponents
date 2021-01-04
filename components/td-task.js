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
    i {
      margin-right: 10px;
    }
    p {
      display: flex;
      margin: 0;
      padding: 12px 12px 12px 0;
      align-items: center;
    }
  </style>
  <td-toggle></td-toggle>
  <p></p>
`;

class Task extends HTMLElement {
  toggle = null;

  static get observedAttributes() {
    return ['title'];
  }

  set title(value) {
    const title = String(value);
    this.setAttribute('title', title);
  }

  get title() {
    return this.getAttribute('title');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.toggle = this.shadowRoot.querySelector('td-toggle');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'title':
        this.render();
        break;
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
    this.toggle.addEventListener('change', this.onChange);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
    this.toggle.removeEventListener('change', (e) => this.onChange(e));
  }

  onClick() {
    // this.on = !this.on;
    // this.dispatchEvent(
    //   new CustomEvent('change', { detail: { on: this.on }, bubbles: true })
    // );
  }

  onChange(e) {
    console.log(e.detail);
  }

  render() {
    const title = this.shadowRoot.querySelector('p');
    title.textContent = this.title;
  }
}

customElements.define('td-task', Task);
