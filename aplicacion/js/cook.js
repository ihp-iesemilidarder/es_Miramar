import {Storage,insertHTML,showMessage} from './init.js';
export const startCook=()=>{
    insertHTML(`
        <main id='UserCook'>
            <list-ingredients></list-ingredients>
        </main>
    `);
}