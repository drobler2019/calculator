import html from './buttons.html?raw';
import './buttons.css';

export class Button extends HTMLElement {

    private values: string[][] = [
        ['7', '8', '9', 'DEL'],
        ['4', '5', '6', '+'],
        ['1', '2', '3', '-'],
        ['.', '0', '/', 'x']
    ];

    connectedCallback(): void {
        this.innerHTML = html;
        this.buildButtons();
    }

    buildButtons(): void {
        const buttonsOperation = this.querySelector<HTMLDivElement>('.buttons-container > div:first-child')!;
        this.values.forEach(buttons => {
            buttons.forEach(value => {
                const button = document.createElement('button');
                const p = document.createElement('p');
                p.textContent = value;
                button.append(p);
                buttonsOperation.append(button);
            })
        })

    }
}

customElements.define('buttons-element', Button);