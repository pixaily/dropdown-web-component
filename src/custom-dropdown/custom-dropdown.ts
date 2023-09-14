import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type User = {
  id: string,
  name: string,
  age: Number,
  selected: Boolean
}

@customElement('custom-dropdown')
class CustomDropdown extends LitElement {
  constructor() {
    super();
  }

  @property()
  buttonLabel = 'Dropdown';

  @property()
  triggerType = 'button';

  @state()
  _isExpanded = false;

  render() {
    return html`
    ${this.triggerType === 'link'
        ? html`<a href="#" role="button" aria-expanded="${this._isExpanded}" @click="${this._toggleDropdownHandler}">${this.buttonLabel}</a>`
        : html`<button type='button' aria-expanded="${this._isExpanded}" @click="${this._toggleDropdownHandler}">${this.buttonLabel}</button>`
    }
    `;
  }
  
  private _toggleDropdownHandler(e: Event) : void {
    e.preventDefault();
    this._isExpanded = !this._isExpanded;
  }
}