import {showMessage,DB} from './init.js';
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

export class ListUsersManager extends HTMLElement {

    constructor(){
        super();
        this.html=``;
    }

    connectedCallback(){
        this.printUsers();
    }

    async printUsers(){
        let json = await new DB(`empxtpus`).show();
        for(let el of json){
            this.html+=`<data-user name='${el._id.NOMBRE}' lastname='${el._id.APELLIDOS.toString().replace(/\,/gi,' ',)}' tpuesto='${el.id_tpuesto.NOMBRE}'></data-user>`;
        }
        this.innerHTML=this.html;
    }
}

async function idUser(nombre,apellidos){
    let json = await new DB(`empleados`).show();
    return json.find(el=>(el.NOMBRE==nombre && apellidos.includes(el.APELLIDOS[0]) && apellidos.includes(el.APELLIDOS[0])))._id;
}

export class Users extends HTMLElement {
    constructor(){
        super();
        this.html=``;
        this.name=this.getAttribute('name');
        this.lastname=this.getAttribute('lastname');
        this.tpuesto=this.getAttribute('tpuesto');
        this.buttonDel = this.querySelector('.delete');
    }

    connectedCallback(){
        this.printUser();
        this.addEventListener('click',this.eventDom);
        this.innerHTML=this.html;
    }
    // Print each user
    printUser(){
        this.html+=`
        <img src='img/user.png'>
        <div class='data'>
            <span class='name'>${this.name}</span>
            <span class='lastname'>${this.lastname}</span>
            <div class='select_tpuesto'><span class='tpuesto'>${this.tpuesto}</span></div>
        </div>
        <div>
            <i class='fas fa-user-edit modify'></i>
            <i class='fas fa-trash'></i>
        </div>`;
    }
    // the event of each user
    eventDom(e){
        e.preventDefault();
        let dom = String(e.target.classList);
        if(dom.includes("fa-trash")){
            this.delUser();
        }else if(dom.includes('modify')){
            this.editUser();
        }
    }

    // delete a user
    async delUser(){
        let json = await new DB(`empxtpus`).show();
        let tpuesto = this.querySelector(".data .tpuesto").textContent;
        let users = json.filter(el=>el.id_tpuesto.NOMBRE==tpuesto);

        // if there are more than one, this will be not remove
        if((users.length > 1) || (tpuesto != "admin")){
            let nombre = this.name;
            let apellidos = this.lastname;
            let idKey = await idUser(nombre,apellidos);
            try{
                await new DB(`empxtpus`).delete(idKey);
                await new DB(`empleados`).delete(idKey);
                showMessage(`Usuario eliminado correctamente`,true);
                this.remove();                
            }catch(err){
                showMessage(`Error al eliminar el usuario`,false);
            }
        }else{
            showMessage(`El ${tpuesto} no se puede eliminar`,false);
        }
    }

    // the event for edit a user
        activeEditable(name,lastname){
            name.setAttribute('contenteditable','');
            lastname.setAttribute('contenteditable',''); 

            this.printTpuestos();                  
        }

        disableEditable(name,lastname){
            name.removeAttribute('contenteditable');
            lastname.removeAttribute('contenteditable');
            this.querySelector('.data .select_tpuesto > div').remove();
            this.updateUser();
        }

    async updateUser(){
        let postData = {
            NOMBRE: this.querySelector('.data .name').textContent,
            APELLIDOS: this.querySelector('.data .lastname').textContent.split(' ')
        }
        let previousData = {
            nombre: this.name,
            apellidos: this.lastname.split(' ')
        }
        let postTpuesto = this.querySelector('.data .tpuesto').textContent;
        try{
            console.log(previousData);
            let id = await new DB(`empleados`).getId(Object.values(previousData));
            console.log(id);
            // update the 'empleados'
            await new DB(`empleados`).update(id,postData);
            // update the 'empxtpus'
            let idTpuestoCurrent = await new DB(`tpuestos`).getId([postTpuesto]);
            let dataTpuestoCurrent = {
                id_tpuesto: idTpuestoCurrent
            }
            await new DB(`empxtpus`).update(id,dataTpuestoCurrent);
            showMessage('empleado actualizado');
        }catch(err){
            if(typeof Promise) {
                showMessage('Error al actualizar el usuario',false);
            }
        }
    }

    editUser(){
        let spanName = this.querySelector('.data .name');
        let spanLastName = this.querySelector('.data .lastname');
        let icon = this.querySelector('i.modify');

        if(String(icon.classList).includes('fa-user-edit')){
            this.activeEditable(spanName,spanLastName);
 
        }else if(String(icon.classList).includes('fa-user-check')){
            this.disableEditable(spanName,spanLastName);
        }
        icon.classList.toggle('fa-user-check');
        icon.classList.toggle('fa-user-edit');
    }
    // print the tpuestos' select of each user
        async renameTpuesto(e){
            let dom = e.target;
            let text = dom.textContent;
            let tpuesto = dom.parentNode.parentNode.querySelector('span');
            tpuesto.textContent=text;
        }

        async printTpuestos(){
            let spanTpuesto = this.querySelector('.data .select_tpuesto');
            let selectors = document.createElement('div');
            let json = await new DB(`tpuestos`).show();
            for(let el of json){
                let span = document.createElement('span');
                let text = document.createTextNode(el.NOMBRE);
                span.append(text);
                span.addEventListener('click',this.renameTpuesto);
                selectors.appendChild(span);
            }
            spanTpuesto.appendChild(selectors);
        }
};

export class NewUsersManager extends HTMLElement {}
export class NewTpuManager extends HTMLElement {}
window.customElements.define("box-message", Message);
window.customElements.define("exposition-menu", Exposition);
window.customElements.define("exposition-card", Card);
window.customElements.define("users-list", ListUsersManager);
window.customElements.define("new-tpus", NewUsersManager);
window.customElements.define("new-users", NewTpuManager);
window.customElements.define('data-user',Users);