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
			<custom-dropdown
				trigger-type='button'
				button-label='Custom Dropdown'
				.items=${this.users}>
			</custom-dropdown>
			`;
	}
}
