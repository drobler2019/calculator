import html from './screen.html?raw';
import './screen.css';

export class Screen extends HTMLElement {

    connectedCallback(): void {
        this.innerHTML = html;
    }

}

customElements.define('screen-element', Screen);