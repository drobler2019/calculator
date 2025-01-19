import './theme.css';
import template from './theme.html?raw';

export class Theme extends HTMLElement {

    connectedCallback(): void {
        // 0px -> 27px -> 57px
        this.innerHTML = template;
    }
    

}

customElements.define('theme-element', Theme);