import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import './custom-dropdown-item.ts';

@customElement('custom-dropdown')
class CustomDropdown extends LitElement {
  @property()
  buttonLabel = 'Dropdown';

  @property()
  triggerType = 'button';

  @property({ type: Array })
  items: User[] = [];

  @state()
  private _isExpanded = false;

  render() {
    return html`
    ${this.triggerType === 'link'
        ? html`<a href="#" role="button" aria-expanded="${this._isExpanded}" @click="${this._toggleDropdownHandler}">${this.buttonLabel}</a>`
        : html`<button type='button' aria-expanded="${this._isExpanded}" @click="${this._toggleDropdownHandler}">${this.buttonLabel}</button>`
    }
    <ul ?hidden=${!this._isExpanded} @click=${this._clickItemHandler}>
      ${this.items.map((item: User) => {
        return html`
          <custom-dropdown-item key=${item.id} customValue='${item.id}' .selected=${item.selected}>${item.name} ${item.age}</custom-dropdown-item>
        `
      })}
    </ul>
    `;
  }
  
  private _toggleDropdownHandler(e: Event) : void {
    e.preventDefault();
    this._isExpanded = !this._isExpanded;
  }

  private _clickItemHandler(e: Event): void {
    const id = (e.target as Element).getAttribute('key');
    
    this.items.forEach((item: User) => {
      if (item.id !== id) {
        item.selected = false;
      }
    })
    const currentItemIdx = this.items.findIndex((item: User) => item.id === id);

    if (currentItemIdx != -1) {
      this.items[currentItemIdx].selected = !this.items[currentItemIdx].selected
    }

    this.requestUpdate();
  }
}

declare global {
  interface HTMLTagElementName {
    'custom-dropdown': CustomDropdown
  }
}