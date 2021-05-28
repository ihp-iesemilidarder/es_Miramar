import {Storage,insertHTML,showMessage} from './init.js';
import {startAdmin} from './admin.js';
import {startWaiter} from './waiter.js';
import {startCook} from './cook.js';

// Look the user's profile and execute the function specified
const profile=()=>{
   let profile = new Storage("localStorage").show('profile');
   switch(profile){
        case "admin":
            startAdmin();
        break;
        case "camarero":
            startWaiter();
        break;
        case "cocinero":
            startCook();
        break;
   }
}

const eventLogout=()=>{
    new Storage("localStorage").deleteAll();
    showMessage("Cerraste la sessión",'#26ca26');
    setTimeout(()=>{
        location.reload();
    }, 3000);
}

const logout=()=>{
    insertHTML(`<i class="fas fa-sign-out-alt logoutSession"></i>`);
    document.querySelector('body i.logoutSession').addEventListener("click",()=>eventLogout());
}

export const startSession=()=>{
    body.innerHTML=``;
    logout();
    profile();
}

