import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import './custom-dropdown-item.ts';

import resetCSS from './../css-components/reset-css.js';

@customElement('custom-dropdown')
class CustomDropdown extends LitElement {
  static styles = [
    resetCSS,
    css`
      .custom-dropdown-wrapper {
        position: relative;
        &[direction="left"] {
          & .custom-dropdown-list {
            top: 0;
            left: auto;
            right: 100%;
          }
        }
        &[direction="right"] {
          & .custom-dropdown-list {
            top: 0;
            left: 100%;
            right: auto;
          }
        }
      }
      .custom-dropdown-list {
        width: var(--dropdown-list-width, 200px);
        background-color: var(--dropdown-list-background, white);
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 10;
        padding: 10px 10px 20px;
        border-radius: var(--dropdown-list-radius, 10px);
        box-shadow: var(--dropdown-box-shadow, 1px 1px 10px gray)
      }
    `
  ];

  @property({ attribute: 'button-label' })
  buttonLabel = 'Dropdown';

  @property({ attribute: 'trigger-type' })
  triggerType: 'button' | 'link' = 'button';


  @property()
  direction: 'down' | 'left' | 'right' = 'down';

  @property({ type: Array })
  items: User[] = [];

  @state()
  private _isExpanded = false;

  @state()
  private _classesWrapper = {
    'custom-dropdown-wrapper': true
  }
  
  @state()
  private _classesTrigger = {
    'custom-dropdown-trigger': true
  }
  
  @state()
  private _classesList = {
    'custom-dropdown-list': true
  }
  
  private _refCloseDropdown = this._closeDropdown.bind(this);

  render() {
    return html`
    <div class=${classMap(this._classesWrapper)} direction=${this.direction}>
      ${this.triggerType === 'link'
      ? html`<a 
            href="#"
            class=${classMap(this._classesTrigger)} 
            role="button"
            aria-expanded="${this._isExpanded}" 
            @click="${this._toggleDropdownHandler}">
              ${this.buttonLabel}
            </a>`
      : html`<button 
          class=${classMap(this._classesTrigger)} 
          type=${this.triggerType} 
          aria-expanded="${this._isExpanded}" 
          @click="${this._toggleDropdownHandler}">
            ${this.buttonLabel}
          </button>`
      }
      <ul class=${classMap(this._classesList)} ?hidden=${!this._isExpanded} @click=${this._clickItemHandler}>
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

    if (_changedProperties.has('direction')) {
      if (this.direction !== 'down' && this.direction !== 'left' && this.direction !== 'right') {
        this.direction = 'down';
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