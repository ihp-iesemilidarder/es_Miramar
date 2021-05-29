import './webComponents.js';
import './WCAdmin.js';
import './WCCover.js';
import './WCWaiter.js';
import './WCCook.js';

import {main,enter} from './coverpage.js';

const init=()=>{
    try{
        enter();
    }catch(e){
        main();
    }    
}

init();