import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

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

	render() {
		return html`
			<h1>Hello, ${this.name}</h1>
			<custom-dropdown triggerType="link" buttonLabel='Custom Dropdown'></custom-dropdown>
			`;
	}
}
