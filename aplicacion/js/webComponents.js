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
            this.html+=`<data-user name='${el.id_empleado.NOMBRE}' lastname='${el.id_empleado.APELLIDOS.toString().replace(/\,/gi,' ',)}' tpuesto='${el.id_tpuesto.NOMBRE}' password='new-password'></data-user>`;
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
        this.password=this.getAttribute('password');
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
            <span class='password'>${this.password}</span>
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
            let idKeyEmpleado = await idUser(nombre,apellidos);
            let idKeyEmpxtpu = await new DB(`empxtpus`).getId([idKeyEmpleado]);
            try{
                console.log(idKeyEmpxtpu,idKeyEmpleado);
                await new DB(`empxtpus`).delete(idKeyEmpxtpu);
                //await new DB(`empleados`).delete(idKeyEmpleado);
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
        activeEditable(name,lastname,password){
            name.setAttribute('contenteditable','');
            lastname.setAttribute('contenteditable','');
            password.setAttribute('contenteditable',''); 

            this.printTpuestos();                  
        }

        disableEditable(name,lastname,password){
            name.removeAttribute('contenteditable');
            lastname.removeAttribute('contenteditable');
            password.removeAttribute('contenteditable');
            this.querySelector('.data .select_tpuesto > div').remove();
            this.updateUser();
        }

    async updateUser(){
        let password = this.querySelector('.data .password').textContent;
        let postData = {
            NOMBRE: this.querySelector('.data .name').textContent,
            APELLIDOS: this.querySelector('.data .lastname').textContent.split(' '),
            CONTRASENA: sha512(password)
        }
        let previousData = {
            nombre: this.name,
            apellidos: this.lastname.split(' ')
        }
        let postTpuesto = this.querySelector('.data .tpuesto').textContent;
        try{
            let id = await new DB(`empleados`).getId(Object.values(previousData));
            // update the 'empleados'
            if(password=='new-password') delete postData['CONTRASENA'];
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
        let spanPassword = this.querySelector('.data .password');
        let icon = this.querySelector('i.modify');

        if(String(icon.classList).includes('fa-user-edit')){
            this.activeEditable(spanName,spanLastName,spanPassword);
 
        }else if(String(icon.classList).includes('fa-user-check')){
            this.disableEditable(spanName,spanLastName,spanPassword);
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

export class NewUsersManager extends HTMLElement {
    constructor(){
        super();
        this.html=``;
        this.form;
    }

    async connectedCallback(){
        await this.printForm();
        this.addEventListener('click', await this.eventsForm);
        this.innerHTML=this.html;
    }

    async printTpuestos(){
        let tpuestos = await new DB(`tpuestos`).show();
        let html = ``;
        for(let tpuesto of tpuestos){
            html+=`<option value='${tpuesto.NOMBRE}'>${tpuesto.NOMBRE}</option>`;
        }
        return html;
    }

    async  printForm(){
        this.html=`
            <form method='POST' id='formUser'>
                <input type='text' name='name' id='name' placeholder='nombre'>
                <div id='lastname'>
                    <input type='text' name='lastname1' id='lastname1' placeholder='1º apellido'>
                    <input type='text' name='lastname2' id='lastname2' placeholder='2º apellido'>
                </div>
                <input type='date' name='birth' id='birth' placeholder='fecha de nacimiento'>
                <input type='password' name='password' id='password' placeholder='contraseña'>
                <select id='gender' name='gender'>
                    <option disabled selected value=''>-- genero --</option>
                    <option value='F'>Femenino</option>
                    <option value='M'>Masculino</option>
                </select>
                <select id='tpuesto' name='tpuesto'>
                    <option disabled selected value=''>-- tpuesto --</option>
                    ${await this.printTpuestos()}
                </select>
                <input type='submit' name='submit' value='Añadir'>
            </form>
        `;
    }

    async eventsForm(e){
        e.preventDefault();
        let name = e.target.getAttribute('name');
        switch(name){
            case "submit": await this.addUser(); break;
        }
    }
    async addUser(){
        this.form = this.querySelector('form');
        let tpuesto = this.form['tpuesto'].value.trim();
        let name = this.form['name'].value.trim();
        let lastname1 = this.form['lastname1'].value.trim();
        let lastname2 = this.form['lastname2'].value.trim();
        let birth = this.form['birth'].value.trim();
        let gender = this.form['gender'].value.trim();
        let password = this.form['password'].value.trim();
        let data = {
            NOMBRE:name,
            APELLIDOS:[lastname1,lastname2],
            NACIMIENTO: new Date(birth),
            GENERO:gender,
            CONTRASENA:sha512(password)
        };
        if(
            name=='' || lastname1=='' || lastname2=='' ||
            birth=='' || gender=='' || password=='' || tpuesto==''
        ){
            showMessage('Hay campos vacios',false);
        }else if(lastname1.split(' ').length > 1 || lastname2.split(' ').length > 1){
            showMessage('Los apellidos tienen espacios',false);
            return false;        
        } else if(new Date(birth) > new Date()){
            showMessage('La fecha es actual o posterior',false);
            return false;
        }else{
            try{
                await new DB(`empleados`).add(data);
                // delete the birth, because will give error in the getId() 
                let data2 = data;
                delete data2['NACIMIENTO'];
                let empxtpus = {
                    id_empleado:await new DB(`empleados`).getId(Object.values(data2)),
                    id_tpuesto:await new DB(`tpuestos`).getId([tpuesto])
                }
                await new DB(`empxtpus`).add(empxtpus);
                document.querySelector('users-list').innerHTML+=`
                    <data-user name='${name}' lastname='${lastname1} ${lastname2}' tpuesto='${tpuesto}' password='new-password'></data-user>
                `;
                showMessage('Usuario añadido correctamente',true);
            }catch(err){
                if(typeof Promise){
                    showMessage('Error al añadir usuario',false);
                }else if(typeof Error){
                    showMessage('Error inesperado durante el envio',false);
                }
            }
        }
    }
}
window.customElements.define("box-message", Message);
window.customElements.define("exposition-menu", Exposition);
window.customElements.define("exposition-card", Card);
window.customElements.define("users-list", ListUsersManager);
window.customElements.define("new-users", NewUsersManager);
window.customElements.define('data-user',Users);