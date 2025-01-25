import html from './buttons.html?raw';
import './buttons.css';
import { Screen } from '../screen/Screen';
import { Operation, operations } from '../../../util/SymbolOperation';

export class Button extends HTMLElement {

    private selector = '.buttons-container > div:first-child';
    private position = 0;
    private readonly SYNTAX_ERROR = 'Syntax Error';

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
        reset.addEventListener('click', () => this.reset());
        send.addEventListener('click', () => this.calculateResult());
    }

    handleEvent(event: MouseEvent): void {
        const element = event.target as HTMLElement;
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

    private calculateResult(): void {
        const pScreen = this.getScreenElement();
        if (pScreen) {
            const operation = pScreen.textContent!;
            try {
                pScreen.textContent = eval(operation.replace("x", "*"));
            } catch (error) {
                pScreen.textContent = 'Syntax Error';
            }
        }
    }

    private reset(): void {
        const pScreen = this.getScreenElement();
        if (pScreen!.textContent) {
            pScreen!.textContent = '0';
            this.position = 0;
        }
    }

    private modifyScreen(value: string): void {
        const pScreen = this.getScreenElement();
        if (pScreen) {
            const textContent = pScreen.textContent;
            if (textContent) {
                if (value === 'DEL' && textContent !== '0') {
                    if (pScreen.textContent === this.SYNTAX_ERROR) {
                        this.cleanScreenError();
                        return;
                    }
                    this.deleteTextInScreen(pScreen);
                    return;
                }
                this.addTextInScreen(pScreen, textContent, value);
            }
        }
    }

    private deleteTextInScreen(pScreen: HTMLParagraphElement): void {
        pScreen.textContent = pScreen.textContent!.slice(0, pScreen.textContent!.length - 1);
        if (this.position > 0) {
            let [findSymbol] = operations().map(operation => pScreen.textContent!.lastIndexOf(operation));
            if (findSymbol && findSymbol !== -1) {
                this.position = findSymbol;
            } else {
                this.position = 0;
            }
        }
        if (pScreen.textContent.length === 0) {
            pScreen.textContent = '0';
        }
    }

    private addTextInScreen(pScreen: HTMLParagraphElement, textContent: string, value: string): void {
        if (textContent && textContent === this.SYNTAX_ERROR) {
            this.cleanScreenError(value);
            return;
        }
        if (textContent === '0') {
            if (!Number.isInteger(parseInt(value))) {
                if (value === Operation.point) {
                    pScreen.textContent += value;
                }
                return;
            }
            pScreen.textContent = value;
        } else {
            if (this.validValue(value, textContent)) {
                return;
            }
            pScreen.textContent += value;
            if (this.validFormat(pScreen.textContent!)) {
                this.deleteTextInScreen(pScreen);
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

    private validFormat(lastValue: string): boolean {
        for (let x = this.position + 1; x < lastValue.length; x++) {
            if (lastValue[x] !== Operation.point && !Number.isInteger(parseInt(lastValue[x]))) {
                this.position = x;
                break;
            }
        }
        return this.validPointSymbol(lastValue, this.position);

    }

    private validPointSymbol(symbol: string, initialPosition: number): boolean {
        if (symbol.charAt(symbol.length - 1) === Operation.point) {
            const value = symbol.slice(initialPosition, symbol.length - 1);
            return (value.includes(Operation.point));
        }
        return false;
    }

    private cleanScreenError(value?: string): void {
        const pScreen = this.getScreenElement();
        if (pScreen) {
            if (pScreen.textContent === 'Syntax Error') {
                pScreen.textContent = value ??= '0';
            }
        }
    }

    private getScreenElement(): HTMLParagraphElement {
        const { firstElementChild: containerScreen } = this.screen;
        const { firstElementChild: pScreen } = containerScreen!;
        return pScreen as HTMLParagraphElement;
    }

}

customElements.define('buttons-element', Button);