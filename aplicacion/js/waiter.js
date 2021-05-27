import {Storage,insertHTML,showMessage} from './init.js';
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
            <input type='number' name='number' placeholder='numero'>
            <input type='number' name='people' placeholder='personas'>
            <input type='submit' value='añadir'>
        </form>
    `,document.querySelector('main#UserWaiter'));
}

const showForm=()=>{
    let addTable = document.querySelector('main#UserWaiter form');
    addTable.style.display='block';
}

export const startWaiter=()=>{
    printListTables();
    printForm();
}