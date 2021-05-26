import {Storage,insertHTML,showMessage} from './init.js';

const printListUsers=()=>{
    try{
        insertHTML(`
            <main id='UserAdmin'>
                <users-list class="containers"></users-list>
                <new-users class="containers"></new-users>
            </main>
        `);        
    }catch(err){
        if(typeof Error){
            location.reload();
        }
    }

}

export const startAdmin=()=>{
    printListUsers();
}