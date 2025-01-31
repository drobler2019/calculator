import './theme.css';
import template from './theme.html?raw';

export class Theme extends HTMLElement {

    private toggle?: HTMLDivElement;
    private aux = 0;
    private count = 0;
    private readonly buttonstheme = [
        'button-theme-2', 'del-theme-2', 'del-theme-3',
        'calculate-theme-2', 'calculate-theme-3', 'button-theme-3'
    ]

    connectedCallback(): void {
        this.innerHTML = template;
        const toggle = this.querySelector<HTMLDivElement>('.theme-change-toggle')!;
        this.toggle = toggle;
        toggle.addEventListener('click', this);


    }

    handleEvent(event: MouseEvent): void {
        if (event.type === 'click') {
            if (this.toggle) {
                this.count++;
                const child = this.toggle.firstElementChild! as HTMLDivElement;
                this.aux = 30 * this.count;
                if (child.style.transform === 'translateX(60px)') {
                    this.aux = 0;
                    this.count = 0;
                }
                child.style.transform = `translateX(${this.aux}px)`;
                this.toggleTheme();
            }
        }
    }

    private toggleTheme(): void {
        const body = document.querySelector('body')!;
        const screen = document.querySelector<HTMLElement>('.screen')!;
        const theme = document.querySelector<HTMLDivElement>('.theme-change-toggle')!;
        const buttonsContainer = document.querySelector<HTMLDivElement>('.buttons-container')!;
        switch (this.count) {
            case 0: this.defaultTheme(body, screen, theme, buttonsContainer); break;
            case 1: this.lightTheme(body, screen, theme, buttonsContainer, '2'); break;
            case 2: this.lightTheme(body, screen, theme, buttonsContainer, '3'); break;
        }
    }

    private defaultTheme(body: HTMLElement, screen: HTMLElement, theme: HTMLDivElement, buttonsContainer: HTMLDivElement): void {
        body.classList.remove('theme-2', 'theme-3');
        screen.classList.remove('screen-theme-2', 'screen-theme-3');
        theme.classList.remove('theme-change-toggle-2', 'theme-change-toggle-3');
        buttonsContainer.classList.remove('buttons-container-theme-2', 'buttons-container-theme-3');
        const buttonsValue = Array.from(buttonsContainer.querySelectorAll('button')!);
        buttonsValue.forEach(button => button.classList.remove(...this.buttonstheme));
    }

    private lightTheme(body: HTMLElement, screen: HTMLElement, theme: HTMLDivElement, buttonsContainer: HTMLDivElement, themeValue: string): void {
        body.classList.add('theme-' + themeValue);
        screen.classList.add('screen-theme-' + themeValue);
        theme.classList.add('theme-change-toggle-' + themeValue);
        const buttonsValue = Array.from(buttonsContainer.querySelectorAll('button')!);
        buttonsContainer.classList.add('buttons-container-theme-' + themeValue)
        buttonsValue.forEach(button => {
            const { firstElementChild } = button;
            if (firstElementChild!.textContent === 'DEL' || firstElementChild!.textContent === 'RESET') {
                button.classList.add('del-theme-' + themeValue);
            } else if (firstElementChild!.textContent === '=') {
                button.classList.add('calculate-theme-' + themeValue)
            } else {
                button.classList.add('button-theme-' + themeValue);
            }

        })
    }


}

customElements.define('theme-element', Theme);