import { showMessage, DB } from './init.js';
export class Exposition extends HTMLElement {
    connectedCallback() {
        let nameExposition = this.getAttribute('name');
        this.insertAdjacentHTML("afterbegin", `
            <div>
                <h2>${nameExposition}</h2>
            </div>
        `);
    }
}
export class Card extends HTMLElement {
    connectedCallback() {
        let img = this.getAttribute('src');
        let title = this.getAttribute('title');
        let description = this.getAttribute('description');
        let ingredients = this.getAttribute('ingredients');
        this.insertAdjacentHTML("beforeend", `
            <img src="./img/${img}">
            <div class="container">
                <h3>${title}</h3> 
                <p>${description}</p> 
                <p>${ingredients}</p> 
            </div>
        `);
    }
}
window.customElements.define("exposition-menu", Exposition);
window.customElements.define("exposition-card", Card);