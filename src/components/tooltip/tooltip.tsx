// tooltip-component.tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'cc-tooltip',
  shadow: true,
})
export class MyTooltip {
  @Prop() text: string;

  render() {
    return <span role="tooltip">{this.text}</span>;
  }
}
