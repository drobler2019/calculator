import { ThemeCount } from '../util/Theme';
import './theme.css';
import template from './theme.html?raw';

export class Theme extends HTMLElement {

    private toggle?: HTMLDivElement;
    private aux = 0;
    private countTheme: ThemeCount = { count: 0, isPositive: true };

    connectedCallback(): void {
        this.innerHTML = template;
        const toggle = this.querySelector<HTMLDivElement>('.theme-change-toggle')!;
        this.toggle = toggle;
        toggle.addEventListener('click', this);
    }

    handleEvent(event: MouseEvent): void {
        if (event.type === 'click') {
            if (this.toggle) {
                if (this.countTheme.isPositive) {
                    this.countTheme.count++;
                } else {
                    this.countTheme.count--;
                }
                const child = this.toggle.firstElementChild! as HTMLDivElement;
                this.aux = 30 * this.countTheme.count;
                child.style.transform = `translateX(${this.aux}px)`;
                if (this.countTheme.count === 0) {
                    this.countTheme.isPositive = true;
                } else if (this.countTheme.count === 2) {
                    this.countTheme.isPositive = false;
                }
            }
        }
    }

    private validOperation() : void {
        
    }


}

customElements.define('theme-element', Theme);