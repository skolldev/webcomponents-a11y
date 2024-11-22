import { Component, h, Prop, Event, EventEmitter, Listen, Element } from '@stencil/core';

@Component({
  tag: 'cc-modal',
  styleUrl: 'modal.css',
  shadow: true,
})
export class MyModal {
  @Prop() isOpen: boolean = false;
  @Event() closeModal: EventEmitter<void>;
  @Element() el: HTMLElement;
  private modalContainer!: HTMLElement;

  componentDidRender() {
    if (this.isOpen) {
      this.trapFocus();
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal.emit();
    }
  }

  private trapFocus() {
    const focusableElements = this.modalContainer.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // change all document to document to make the focus trap work in the shadow dom
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!(e.key === 'Tab' && focusableElements.length > 0)) {
        return;
      }

      const isShiftTab = e.shiftKey && document.activeElement === firstElement;
      const isTab = !e.shiftKey && document.activeElement === lastElement;

      if (isShiftTab) {
        lastElement.focus();
        e.preventDefault();
      } else if (isTab) {
        firstElement.focus();
        e.preventDefault();
      }
    });
  }

  render() {
    return (
      <div class={{ 'modal-backdrop': true, 'open': this.isOpen }}>
        <div class="modal" ref={el => (this.modalContainer = el as HTMLElement)}>
          <header>
            <h2>Shadow DOM Modal</h2>
            <button onClick={() => this.closeModal.emit()}>Close</button>
          </header>
          <section>
            <p>Tab through the elements below:</p>
            <button>Button 1</button>
            <button>Button 2</button>
            <a href="#">Link</a>
            <input type="text" placeholder="Input field" />
          </section>
        </div>
      </div>
    );
  }
}
