import { showMessage, DB } from './init.js';
export class ListUsersManager extends HTMLElement {

    constructor() {
        super();
        this.html = ``;
    }

    connectedCallback() {
        this.printUsers();
    }

    async printUsers() {
        let json = await new DB(`empxtpus`).show();
        for (let el of json) {
            this.html += `<data-user name='${el.id_empleado.NOMBRE}' lastname='${el.id_empleado.APELLIDOS.toString().replace(/\,/gi, ' ',)}' tpuesto='${el.id_tpuesto.NOMBRE}' password='new-password' gender='${el.id_empleado.GENERO}'></data-user>`;
        }
        this.innerHTML = this.html;
    }
}

async function idUser(nombre, apellidos) {
    let json = await new DB(`empleados`).show();
    return json.find(el => (el.NOMBRE == nombre && apellidos.includes(el.APELLIDOS[0]) && apellidos.includes(el.APELLIDOS[0])))._id;
}

export class Users extends HTMLElement {
    constructor() {
        super();
        this.html = ``;
        this.name = this.getAttribute('name');
        this.lastname = this.getAttribute('lastname');
        this.tpuesto = this.getAttribute('tpuesto');
        this.password = this.getAttribute('password');
        this.buttonDel = this.querySelector('.delete');
        this.gender = this.getAttribute('gender');
    }

    connectedCallback() {
        this.printUser();
        this.addEventListener('click', this.eventDom);
        this.innerHTML = this.html;
    }
    // Print each user
    printUser() {
        this.html += `
        <img src='img/user.png'>
        <div class='data'>
            <span class='name'>${this.name}</span>
            <span class='lastname'>${this.lastname}</span>
            <span class='password'>${this.password}</span>
            <span class='date'><input type='date' disabled></span>
            <div class='select_tpuesto'><span class='tpuesto'>${this.tpuesto}</span></div>
            <div class='select_gender'><span class='gender'>${this.gender}</span></div>
        </div>
        <div>
            <i class='fas fa-user-edit modify'></i>
            <i class='fas fa-trash'></i>
        </div>`;
    }
    // the event of each user
    eventDom(e) {
        e.preventDefault();
        let dom = String(e.target.classList);
        if (dom.includes("fa-trash")) {
            this.delUser();
        } else if (dom.includes('modify')) {
            this.editUser();
        }
    }

    // delete a user
    async delUser() {
        let json = await new DB(`empxtpus`).show();
        let tpuesto = this.querySelector(".data .tpuesto").textContent;
        let users = json.filter(el => el.id_tpuesto.NOMBRE == tpuesto);

        // if there are more than one, this will be not remove
        try {
            if (((users.length > 1) && (tpuesto == "admin")) || tpuesto != "admin") {
                let nombre = this.name;
                let apellidos = this.lastname;
                let idKeyEmpleado = await idUser(nombre, apellidos);
                let idKeyEmpxtpu = await new DB(`empxtpus`).getId([idKeyEmpleado]);
                try {
                    await new DB(`empxtpus`).delete(idKeyEmpxtpu);
                    await new DB(`empleados`).delete(idKeyEmpleado);
                    showMessage(`Usuario eliminado correctamente`, true);
                    this.remove();
                } catch (err) {
                    showMessage(`Error al eliminar el usuario`, false);
                }
            } else {
                throw new Error(`El ${tpuesto} no se puede eliminar`);
            }
        } catch (err) {
            if (typeof Error) {
                showMessage(err, false);
            }
        }

    }

    // the events for edit a user
        activeEditable(name, lastname, password, date) {
            name.setAttribute('contenteditable', '');
            lastname.setAttribute('contenteditable', '');
            password.setAttribute('contenteditable', '');
            date.removeAttribute('disabled');
            this.printTpuestos();
            this.printGender();
        }

        disableEditable(name, lastname, password, date) {
            name.removeAttribute('contenteditable');
            lastname.removeAttribute('contenteditable');
            password.removeAttribute('contenteditable');
            date.setAttribute('disabled', '');
            this.querySelector('.data .select_tpuesto > div').remove();
            this.querySelector('.data .select_gender > div').remove();
            this.updateUser();
        }

    async updateUser() {
        let password = this.querySelector('.data .password').textContent;
        let date = this.querySelector('.data .date input').value;
        let postData = {
            NOMBRE: this.querySelector('.data .name').textContent,
            APELLIDOS: this.querySelector('.data .lastname').textContent.split(' '),
            CONTRASENA: sha512(password),
            NACIMIENTO: new Date(date),
            GENERO: this.querySelector('.data .gender').textContent
        }
        let previousData = {
            nombre: this.name,
            apellidos: this.lastname.split(' ')
        }
        let currentTpuesto = this.querySelector('.data .tpuesto').textContent;
        let previousTpuesto = this.tpuesto;
        try {
            let id = await new DB(`empleados`).getId(Object.values(previousData));
            // update the 'empleados'
            if (password == 'new-password') delete postData['CONTRASENA'];
            let json = await new DB(`empxtpus`).show();
            let users = json.filter(el => el.id_tpuesto.NOMBRE == previousTpuesto);
            if ((previousTpuesto == 'admin' && users.length == 1) && currentTpuesto!="admin"){
                this.querySelector('.data .tpuesto').innerText=previousTpuesto;
                throw new Error(`Debe haber minimo un ${previousTpuesto} en el sistema`);
            }
            if (date == "") delete postData['NACIMIENTO'];
            await new DB(`empleados`).update(id, postData);
            // update the 'empxtpus'
            let idCurrentTpuesto = await new DB(`tpuestos`).getId([currentTpuesto]);
            let idPreviousTpuesto = await new DB(`tpuestos`).getId([previousTpuesto]);
            let idempxtpusCurrent = await new DB(`empxtpus`).getId([idPreviousTpuesto]);
            let dataTpuestoCurrent = {
                id_tpuesto: idCurrentTpuesto
            }
            await new DB(`empxtpus`).update(idempxtpusCurrent, dataTpuestoCurrent);
            showMessage('empleado actualizado');
        } catch (err) {
            if (typeof Error) {
                showMessage(err,false);
            } else if (typeof Promise) {
                showMessage('Error al actualizar el usuario', false);
            }
        }
    }

    editUser() {
        let spanName = this.querySelector('.data .name');
        let spanLastName = this.querySelector('.data .lastname');
        let spanPassword = this.querySelector('.data .password');
        let icon = this.querySelector('i.modify');
        let spanDate = this.querySelector('input[type="date"]');

        if (String(icon.classList).includes('fa-user-edit')) {
            this.activeEditable(spanName, spanLastName, spanPassword, spanDate);

        } else if (String(icon.classList).includes('fa-user-check')) {
            this.disableEditable(spanName, spanLastName, spanPassword, spanDate);
        }
        icon.classList.toggle('fa-user-check');
        icon.classList.toggle('fa-user-edit');
    }
    // print the tpuestos' select of each user
    async renameSelect(e) {
        let dom = e.target;
        let text = dom.textContent;
        let tpuesto = dom.parentNode.parentNode.querySelector('span');
        tpuesto.textContent = text;
    }

    async printTpuestos() {
        let spanTpuesto = this.querySelector('.data .select_tpuesto');
        let selectors = document.createElement('div');
        let json = await new DB(`tpuestos`).show();
        for (let el of json) {
            let span = document.createElement('span');
            let text = document.createTextNode(el.NOMBRE);
            span.append(text);
            span.addEventListener('click', this.renameSelect);
            selectors.appendChild(span);
        }
        spanTpuesto.appendChild(selectors);
    }

    printGender() {
        let spanGender = this.querySelector('.data .select_gender');
        let selectors = document.createElement('div');
        let spanF = document.createElement('span');
        let textF = document.createTextNode('F');
        spanF.append(textF);
        spanF.addEventListener('click', this.renameSelect);
        selectors.appendChild(spanF);
        let spanM = document.createElement('span');
        let textM = document.createTextNode('M');
        spanM.append(textM);
        spanM.addEventListener('click', this.renameSelect);
        selectors.appendChild(spanM);
        spanGender.appendChild(selectors);

    }
};

export class NewUsersManager extends HTMLElement {
    constructor() {
        super();
        this.html = ``;
        this.form;
    }

    async connectedCallback() {
        await this.printForm();
        this.addEventListener('click', await this.eventsForm);
        this.innerHTML = this.html;
    }

    async printTpuestos() {
        let tpuestos = await new DB(`tpuestos`).show();
        let html = ``;
        for (let tpuesto of tpuestos) {
            html += `<option value='${tpuesto.NOMBRE}'>${tpuesto.NOMBRE}</option>`;
        }
        return html;
    }

    async printForm() {
        this.html = `
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

    async eventsForm(e) {
        e.preventDefault();
        let name = e.target.getAttribute('name');
        switch (name) {
            case "submit": await this.addUser(); break;
        }
    }
    async addUser() {
        try {
            this.form = this.querySelector('form');
            let tpuesto = this.form['tpuesto'].value.trim();
            let name = this.form['name'].value.trim();
            let lastname1 = this.form['lastname1'].value.trim();
            let lastname2 = this.form['lastname2'].value.trim();
            let birth = this.form['birth'].value.trim();
            let gender = this.form['gender'].value.trim();
            let password = this.form['password'].value.trim();
            let data = {
                NOMBRE: name,
                APELLIDOS: [lastname1, lastname2],
                NACIMIENTO: new Date(birth),
                GENERO: gender,
                CONTRASENA: sha512(password)
            };
            if (
                name == '' || lastname1 == '' ||
                birth == '' || gender == '' || password == '' || tpuesto == ''
            ) {
                throw new Error('Hay campos vacios');
            } else if (lastname1.split(' ').length > 1 || lastname2.split(' ').length > 1) {
                throw new Error('Los apellidos tienen espacios');
            } else if (new Date(birth) > new Date()) {
                throw new Error('La fecha es actual o posterior');
            }
            if (await new DB(`empleados`).getId([data.NOMBRE, data.APELLIDOS, data.GENERO]) != false) {
                throw new Error('El usuario ya existe');
            };
            await new DB(`empleados`).add(data);
            // delete the birth, because will give error in the getId() 
            let data2 = data;
            delete data2['NACIMIENTO'];
            let empxtpus = {
                id_empleado: await new DB(`empleados`).getId(Object.values(data2)),
                id_tpuesto: await new DB(`tpuestos`).getId([tpuesto])
            }
            await new DB(`empxtpus`).add(empxtpus);
            document.querySelector('users-list').innerHTML += `
                        <data-user name='${name}' lastname='${lastname1} ${lastname2}' tpuesto='${tpuesto}' password='new-password' gender='${gender}'></data-user>
                    `;
            showMessage('Usuario añadido correctamente', true);
        } catch (err) {
            if (typeof Error) {
                showMessage(err, false);
            } else if (typeof Promise) {
                showMessage('Error al añadir usuario', false);
            }
        }

    }
}
window.customElements.define("users-list", ListUsersManager);
window.customElements.define("new-users", NewUsersManager);
window.customElements.define('data-user', Users);