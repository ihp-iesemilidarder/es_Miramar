import {Storage,insertHTML,showMessage,DB} from './init.js';

class ListIngredients extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML='<h2>Gestión cocina</h2>';
    }
}
window.customElements.define('list-ingredients',ListIngredients);