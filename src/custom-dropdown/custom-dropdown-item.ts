import { LitElement, html, css } from "lit";

// Decorators
import { customElement, property, state,  } from 'lit/decorators.js';

// Directives
import { classMap } from 'lit/directives/class-map.js';

@customElement('custom-dropdown-item')
class CustomDropdownItem extends LitElement { 
  static styles = css`
  .custom-dropdown-item { 
    border-bottom: 1px solid black;
    padding: 10px;
  }
  .active {
    font-weight: bold;
  }
  `

  @property({ type: Boolean })
  selected = false;

  @property()
  customValue = '';

  render() {
    const classes = {
      'custom-dropdown-item': true,
      active: !!this.selected
    }
    return html`
      <li data-custom-value=${this.customValue} 
        class=${classMap(classes)}
        aria-selected=${this.selected}>
        <slot></slot>
      </li>
    `;
  }
}

declare global {
  interface HTMLTagElementName {
    'custom-dropdown-item': CustomDropdownItem
  }
}