import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { ref, createRef } from 'lit/directives/ref.js';

import './custom-dropdown-item.ts';

@customElement('custom-dropdown')
class CustomDropdown extends LitElement {
  @property({ attribute: 'button-label' })
  buttonLabel = 'Dropdown';

  @property({ attribute: 'trigger-type' })
  triggerType: 'button' | 'link' = 'button';

  @property({ type: Array })
  items: User[] = [];

  @state()
  private _isExpanded = false;
  
  private _refCloseDropdown = this._closeDropdown.bind(this);

  render() {
    return html`
    <div class="custom-dropdown-wrapper test">
      ${this.triggerType === 'link'
          ? html`<a href="#" role="button" aria-expanded="${this._isExpanded}" @click="${this._toggleDropdownHandler}">${this.buttonLabel}</a>`
          : html`<button type=${this.triggerType} aria-expanded="${this._isExpanded}" @click="${this._toggleDropdownHandler}">${this.buttonLabel}</button>`
      }
      <ul ?hidden=${!this._isExpanded} @click=${this._clickItemHandler}>
        ${this.items.map((item: User) => {
          return html`
            <custom-dropdown-item key=${item.id} customValue='${item.id}' .selected=${item.selected}>${item.name} ${item.age}</custom-dropdown-item>
          `
        })}
      </ul>
    </div>
    `;
  }
  
  private _toggleDropdownHandler(e: Event) : void {
    e.preventDefault();

    this._isExpanded = !this._isExpanded;
  }
  
  private _closeDropdown(e: Event) {
    const eventPath = e.composedPath();

    if(!eventPath.includes(this.renderRoot)) {
      this._isExpanded = false;
    }
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

    // Close after selecting
    // this._isExpanded = false;

    this.requestUpdate('items');
  }

  willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {

    if (_changedProperties.has('buttonLabel') && this.buttonLabel.length < 1) {
      this.buttonLabel = 'Dropdown'
    }

    if (_changedProperties.has('triggerType')) {
      if (this.triggerType !== 'link') {
        this.triggerType = 'button'
      }
    }
  }
  
  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    if (_changedProperties.has('_isExpanded')) {
      if (this._isExpanded) {
        document.addEventListener('click', this._refCloseDropdown);
      } else {
        document.removeEventListener('click', this._refCloseDropdown);
      }
    } 
  }
}

declare global {
  interface HTMLTagElementName {
    'custom-dropdown': CustomDropdown
  }
}