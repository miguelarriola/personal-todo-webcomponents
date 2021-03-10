const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      /* wrapper */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      position: fixed;
      inset: 0;
      opacity: 1;
      visibility: visible;
      transition: visibility 0s, opacity 0.25s ease-in;
    }
    :host([hidden]) {
      opacity: 0;
      visibility: hidden;
    }
    .overlay {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      background: #0000009a;
    }
    .dialog {
      background: var(--background, #ffffff);
      border-radius: var(--content-margin, 12px);
      max-width: calc(var(--app-max-width, 768px) - var(--general-margin, 10px));
      margin: var(--general-margin, 10px);
      padding: var(--general-margin, 10px);
      position: fixed;
      word-wrap: break-word;
    }
  </style>
  <div class="overlay"></div>    
  <div class="dialog">
    <textarea>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </textarea>
  </div>
`;

class EditPanel extends HTMLElement {
  prop = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.prop = null;
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

customElements.define('td-edit-panel', EditPanel);

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
