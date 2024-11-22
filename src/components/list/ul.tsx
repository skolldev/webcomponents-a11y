import { Component, h } from '@stencil/core';

@Component({
  tag: 'cc-ul',
  shadow: true,
})
export class MyComponent {
  render() {
    return (
      <ul>
        <slot />
      </ul>
    );
  }
}
