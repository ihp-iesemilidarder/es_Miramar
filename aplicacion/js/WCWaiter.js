class ListTables extends HTMLElement{
    constructor(){
        super();
        this.html='';
    }

    printTables(){
        this.innerHTML=``;
    }

    connectedCallback(){
        this.printTables();
    }
}

window.customElements.define('list-tables',ListTables);