import html from './buttons.html?raw';
import './buttons.css';
import { Screen } from '../screen/Screen';
import { Operation } from '../../../util/SymbolOperation';

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
        const [reset, send] = this.querySelectorAll<HTMLButtonElement>('.buttons-container > div:last-child button');
        buttonsOperation.addEventListener('click', this);
        reset.addEventListener('click', () => {
            const { firstElementChild: containerScreen } = this.screen;
            const { firstElementChild: pScreen } = containerScreen!;
            if (pScreen!.textContent) {
                pScreen!.textContent = '0';
            }
        })
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
            this.modifyScreen(value);
        }
    }

    private modifyScreen(value: string): void {
        const { firstElementChild: containerScreen } = this.screen;

        if (containerScreen) {
            const { firstElementChild: pScreen } = containerScreen;
            const paragraphElement = pScreen as HTMLParagraphElement;
            if (paragraphElement) {
                const textContent = paragraphElement.textContent;
                if (textContent) {
                    if (value === 'DEL' && textContent !== '0') {
                        this.deleteTextInScreen(paragraphElement, textContent);
                        return;
                    }
                    this.addTextInScreen(paragraphElement, textContent, value);
                }
            }
        }
    }

    private deleteTextInScreen(pScreen: HTMLParagraphElement, textContent: string): void {
        pScreen.textContent = textContent.slice(0, textContent.length - 1);
        if (textContent.length === 1) {
            pScreen.textContent = '0';
        }
    }

    private addTextInScreen(pScreen: HTMLParagraphElement, textContent: string, value: string): void {
        if (textContent === '0') {
            if (!Number.isInteger(parseInt(value))) {
                if (value === Operation.point) {
                    pScreen.textContent += value;
                }
                return;
            }
            pScreen.textContent = value.toString();
        } else {
            if (this.validValue(value, textContent)) {
                return;
            }
            pScreen.textContent += value.toString();
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