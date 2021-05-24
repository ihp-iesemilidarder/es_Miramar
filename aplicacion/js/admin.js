import {Storage,insertHTML,showMessage} from './init.js';

const printListUsers=()=>{
    insertHTML(`
        <main id='UserAdmin'>
            <users-list class="containers"></users-list>
            <new-users class="containers"></new-users>
        </main>
    `);
}

export const startAdmin=()=>{
    printListUsers();
}