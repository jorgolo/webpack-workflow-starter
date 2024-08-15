
class Modal extends window.HTMLElement {
  connectedCallback() {
    this.buttonCloseEl = this.querySelector('.button-close');
    this.attachListeners();
  }

  attachListeners() {
    this.buttonCloseEl.addEventListener('click', this.close.bind(this));
  }

  open() {
    this.classList.add('show');
  }

  close() {
    this.classList.remove('show');
  }
}

window.customElements.define('product-slider', Modal);
