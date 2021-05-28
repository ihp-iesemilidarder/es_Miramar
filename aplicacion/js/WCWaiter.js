import {Storage,insertHTML,showMessage,DB} from './init.js';

class ListTables extends HTMLElement{
    constructor(){
        super();
        this.html='';
    }

    printTable(table){
        this.html+=`<data-table class='table' number='${table.NUMERO}' busy='${table.OCUPADO}' title='people: ${table.PERSONAS}\nnumber: ${table.NUMERO}'></data-table>`;
    }

    showForm(){
        let form = document.querySelector('main#UserWaiter form');
        form.style.display='block';
    }

    async printTables(){
        this.html='<div>';
        let tables = await new DB(`mesas`).show();
        for(let table of tables){
            this.printTable(table);
        }
        this.html+='</div>';
        insertHTML(this.html,this);
        insertHTML(`<i class='fas fa-plus'></i>`,this);
        this.querySelector('i.fa-plus').addEventListener('click',()=>this.showForm());
    }

    connectedCallback(){
        this.printTables();
    }
}

class Table extends HTMLElement{
    constructor(){
        super();
        this.number = this.getAttribute('number');
        this.busy = this.getAttribute('busy');
    }

    manTable(){
        alert('table´s management');
    }

    eventTable(e){
        let dom = e.target.tagName;
        if(dom=='I'){
            this.delTable();
        }else{
            this.manTable();
        }
    }

    async delTable(){
        let id = await new DB(`mesas`).getId([this.number]);
        await new DB('mesas').delete(id);
        showMessage('Mesa eliminada',true);
        this.remove();
    }

    connectedCallback(){
        this.innerHTML+=`<i class='fas fa-times'></i>`;
        this.addEventListener('click',this.eventTable);
    }
}

window.customElements.define('list-tables',ListTables);
window.customElements.define('data-table',Table);