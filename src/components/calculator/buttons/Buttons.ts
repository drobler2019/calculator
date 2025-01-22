import html from './buttons.html?raw';
import './buttons.css';
import { Screen } from '../screen/Screen';

export class Button extends HTMLElement {

    private selector = '.buttons-container > div:first-child';

    private values: string[][] = [
        ['7', '8', '9', 'DEL'],
        ['4', '5', '6', '+'],
        ['1', '2', '3', '-'],
        ['.', '0', '/', 'x']
    ];

    constructor(private screen: Screen) {
        super();
    }

    connectedCallback(): void {
        this.innerHTML = html;
        this.buildButtons();
        this.selectButton();
    }

    selectButton(): void {
        const buttonsOperation = this.querySelector<HTMLDivElement>(this.selector)!;
        buttonsOperation.addEventListener('click', this);
    }

    handleEvent(event: MouseEvent): void {
        const element = event.target as Element;
        if (element.nodeName === 'BUTTON' || element.nodeName === 'P') {
            let value = '';
            if (element.nodeName === 'BUTTON') {
                value = element.firstChild!.textContent!;
            } else {
                value = element.textContent!;
            }
            const textContent = this.screen.firstElementChild!.firstElementChild!.textContent;
            if (textContent) {
                if (textContent === '0') {

                    if (!Number.isInteger(parseInt(value)))
                        return;

                    this.screen.firstElementChild!.firstElementChild!.textContent = value.toString();
                } else {
                    if (this.validValue(value, textContent)) {
                        return;
                    }
                    this.screen.firstElementChild!.firstElementChild!.textContent += value.toString();
                }
            }
        }
    }

    private buildButtons(): void {
        const buttonsOperation = this.querySelector<HTMLDivElement>(this.selector)!;
        this.values.forEach(buttons => {
            buttons.forEach(value => {
                const button = document.createElement('button');
                const p = document.createElement('p');
                p.textContent = value;
                button.append(p);
                buttonsOperation.append(button);
            })
        });
    }

    private validValue(newValue: string, lastValue: string): boolean {
        const lastPosition = lastValue.split("")[lastValue.length - 1];
        return !Number.isInteger(parseInt(lastPosition)) && !Number.isInteger(parseInt(newValue))
    }

}

customElements.define('buttons-element', Button);