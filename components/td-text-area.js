const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    ::slotted(textarea) {
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
    ::slotted(textarea)::-webkit-input-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    ::slotted(textarea):-moz-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    ::slotted(textarea)::-moz-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    ::slotted(textarea):-ms-input-placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
    ::slotted(textarea)::placeholder {
      font-family: var(--main-font);
      color: var(--dark-grey);
      font-size: var(--font-size);
    }
  </style>
  <slot></slot>
`;

class TextArea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('td-text-area', TextArea);
