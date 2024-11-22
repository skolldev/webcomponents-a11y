import { Component, h } from '@stencil/core';

@Component({
  tag: 'cc-input',
  shadow: true,
})
export class MyComponent {
  render() {
    return <input id="email" />;
  }
}
