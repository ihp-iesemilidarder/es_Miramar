import {insertHTML,showMessage,DB} from './init.js';
const printListTables=()=>{
    try{
        insertHTML(`
            <main id='UserWaiter'>
                <list-tables></list-tables>
            </main>
        `);        
    }catch(err){
        if(typeof Error){
            location.reload();
        }
    }

}

const printForm=()=>{
    insertHTML(`
        <form method='POST'>
            <label>Ocupado: <input type='checkbox'></label>
            <input type='number'  min='1' name='number' placeholder='numero'>
            <input type='number' min='1' name='people' placeholder='personas'>
            <input type='submit' value='añadir'>
        </form>
    `,document.querySelector('main#UserWaiter'));
}

const validateForm=(e)=>{
    e.preventDefault();
    let number = document.querySelector('main#UserWaiter form input[name="number"]').value;
    let people = document.querySelector('main#UserWaiter form input[name="people"]').value;
    let check = document.querySelector('main#UserWaiter form input[type="checkbox"]').checked;
    try{
        if(number == "" || people == ""){
            throw new Error('Hay campos vacios');
        }else{
            addTable(number,people,check);
        }
    }catch(err){
        if (typeof Error){
            showMessage(err,false);
        }
    }
}

async function addTable(number,people,check){
    try{
        let tables = await new DB(`mesas`).show();
        for(let table of tables){
            if(table.NUMERO==number){
                throw new Error('El numero de la mesa ya existe');
            }
        }
        let data = {
            NUMERO: number,
            PERSONAS: people,
            OCUPADO: check
        }
        await new DB('mesas').add(data);
        showMessage('Mesa añadida',true);
        let listTables = document.querySelector('main#UserWaiter list-tables > div');
        insertHTML(`<data-table class='table' number='${number}' busy='${check}' title='people: ${people}\nnumber: ${number}'></data-table>`,listTables);
        let form = document.querySelector('main#UserWaiter form');
        form.removeAttribute('style');
    }catch(err){
        if(typeof Error){
            showMessage(err,false);
        }else if(typeof Promise){
            showMessage('Se produjo un error al añadir la mesa',false);
        }
    }
}

export const startWaiter=()=>{
    printListTables();
    printForm();
    const form = document.querySelector('main#UserWaiter form');
    form.addEventListener('submit',validateForm);
}