import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import './types.ts'
import './custom-dropdown/custom-dropdown.ts'

@customElement("my-element")
export class MyElement extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
			}
			.custom-dropdowns {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.custom-dropdown-right {
				align-self: flex-end;
			}
			.custom-dropdown-left {
				align-self: flex-start;
			}
		`
	];

	@property() name = "World";

	private users: User[] = [{
		id: '123adsa',
		name: 'John',
		age: 23,
		selected: false
	},
	{
		id: '213adsa',
		name: 'Jack',
		age: 32,
		selected: false
	},
	{
		id: '312adsa',
		name: 'Jimmy',
		age: 28,
		selected: false
	}]

	render() {
		return html`
			<h1>Hello, ${this.name}</h1>
			<div class="custom-dropdowns">
				<custom-dropdown
					class="custom-dropdown-right"
					trigger-type="button"
					button-label="Dropdown Button"
					direction="left"
					.items=${this.users}>
				</custom-dropdown>
				<custom-dropdown
					class="custom-dropdown-left"
					trigger-type="link"
					direction="right"
					button-label="Dropdown link"
					.items=${this.users}>
				</custom-dropdown>
				<custom-dropdown
					direction=""
					.items=${this.users}>
				</custom-dropdown>
			</div>
			`;
	}
}
