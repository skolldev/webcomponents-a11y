import { Component, h } from '@stencil/core';

@Component({
  tag: 'cc-li',
  shadow: true,
})
export class MyComponent {
  render() {
    return (
      <li>
        <slot />
      </li>
    );
  }
}
