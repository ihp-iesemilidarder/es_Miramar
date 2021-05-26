import { showMessage, DB } from './init.js';
export class Message extends HTMLElement {
    connectedCallback() {
        null;
        this.animate([{
            left: "-100%",
            transition: "1s"
        }], {
            duration: 1000,
            delay: 2000
        });
        setTimeout(() => {
            this.remove();
        }, 3000);
    }
}
window.customElements.define("box-message", Message);