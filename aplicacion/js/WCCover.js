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
        let grandparent = this.parentNode.parentNode.getAttribute('name');
        let img = this.getAttribute('src');
        let title = this.getAttribute('title');
        let description = this.getAttribute('description');
        let ingredients = this.getAttribute('price');
        let others = this.getAttribute('others');
        let tipo;
        switch(grandparent){
            case 'bebidas':
            case 'postres':
                tipo='tipo de bebida:';
                break;
            case 'platos':
                tipo='comensales:';
                break;
        }
        this.insertAdjacentHTML("beforeend", `
            <img src="./img/${img}">
            <div class="container">
                <h3>${title}</h3> 
                <p>${description}</p> 
                <p>${ingredients}€</p>
                <p>${tipo} ${others}</p> 
            </div>
        `);
    }
}
window.customElements.define("exposition-menu", Exposition);
window.customElements.define("exposition-card", Card);