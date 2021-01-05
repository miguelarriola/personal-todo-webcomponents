const template = document.createElement('template');

template.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    :host {
      display: inline-block;
      background-color: var(--background);
      height: 48px;
      width: 48px;
      border-radius: 50%;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
      -webkit-tap-highlight-color: transparent;
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
    }
    :host(:hover){
      cursor: pointer;
    }
    :host([hidden]) {
      display: none;
    }
    .material-icons.md-48 { 
      font-size: 48px;
    }
    .material-icons.contrast { 
      color: var(--primary);
    }
  </style>
  <i class="material-icons md-48 contrast"></i>
`;

class FloatingButton extends HTMLElement {
  iconName = 'add';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.icon = this.shadowRoot.querySelector('i');
    this.icon.textContent = this.iconName;
  }
}

customElements.define('td-floating-button', FloatingButton);
