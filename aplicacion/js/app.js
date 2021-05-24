import './webComponents.js';
import {main,enter} from './coverpage.js';

const init=()=>{
    try{
        enter();
    }catch(e){
        main();
    }    
}

init();