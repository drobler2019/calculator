import { Button } from "./buttons/Buttons";
import { Screen } from "./screen/Screen";

export class Calculator extends HTMLElement {
    connectedCallback(): void {
        const screen = new Screen();
        const buttons = new Button(screen);
        this.append(screen, buttons);
    }
}

customElements.define('calculator-element', Calculator);