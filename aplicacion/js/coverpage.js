// imports
import {Storage,DateOperators,DB, insertHTML} from './init.js';
import {startSession} from './panel.js';
import './modules/sha512.js';

const formLogin=document.querySelector("body #popupForm form");
const buttonLogin=document.querySelector("body main button#showForm");
const popupForm=document.querySelector("body #popupForm");
const closeForm=document.querySelector('body #popupForm form .closeForm');
const menuPlates=document.querySelector('body exposition-menu[name="platos"] > div:last-child');
const menuDesserts=document.querySelector('body exposition-menu[name="postres"] > div:last-child');
const menuDrinks=document.querySelector('body exposition-menu[name="bebidas"] > div:last-child');


async function printPlates(){
    let plates = await new DB('platos').show();
    for(let plate of plates){
        let html=`
        <exposition-card
            src="comida1.jpeg"
            title="${plate.NOMBRE}"
            description="${plate.DESCRIPCION}"
            price="${plate.PRECIO}"
            others="${plate.COMENSALES}">
        </exposition-card>
        `;
        insertHTML(html,menuPlates);
    }
}

async function printDrinks(type){
    let drinks = await new DB('bebidas').show();
    for(let drink of drinks){
        let html=`
        <exposition-card
            src="${(type=='postres')?'postres.jpeg':'bebida.jpeg'}"
            title="${drink.NOMBRE}"
            description="${drink.DESCRIPCION}"
            price="${drink.PRECIO}"
            others="${drink.id_tbebida.NOMBRE}">
        </exposition-card>
        `;
        if(drink.id_tbebida.NOMBRE!='postres' && !type){
            insertHTML(html,menuDrinks);
        }else if(drink.id_tbebida.NOMBRE=='postres' && type=='postres'){
            insertHTML(html,menuDesserts);
        }
   }
}

//show menus
async function printMenu(){
    printPlates();
    printDrinks();
    printDrinks('postres');
}

// show or hide the form's popup
const eventForm=(e)=>{
    if(e=='show'){
        window.body.style.overflow='hidden';
        popupForm.style.display='block';
        formLogin.style.display='block';
    }else{
        window.body.removeAttribute('style');
        popupForm.removeAttribute('style');
        formLogin.removeAttribute('style');
    }
}

const tokenGeneator=(repeats=Number)=>{
    function random(){
        return Math.random().toString(36).substr(2);
    }
    let count = 0;
    let key = "";
    while(count<=repeats){
        key += random();
        count++;
    }
    return key;
}

// print the login's status
const resultLogin=(res=Boolean,text=String)=>{
    formLogin['loginButton'].value=text;
    if(res==true){
        formLogin['loginButton'].classList.remove('nologged');
        formLogin['loginButton'].classList.remove('logged');
        formLogin['loginButton'].classList.add('logged');
    }else{
        formLogin['loginButton'].classList.remove('logged');
        formLogin['loginButton'].classList.remove('nologged');
        formLogin['loginButton'].classList.add('nologged');
    }
};

export const enter=()=>{
    if(new Date() < new Date(new Storage("localStorage").show('dateExpire'))){
        window.body.removeAttribute('style');
        startSession();
    }else{
        new Storage("localStorage").delete(["keySession","dateExpire","userSession"]);
        throw new Error('Error');
    }
}

// Checks the exist of user typed in the form and his credentials
async function login(e){
    try{
        e.preventDefault();
        let password = sha512(formLogin['pass'].value);
        let user = formLogin['user'].value;
        let json = await new DB(`empxtpus`).show();
        if(json.find(el=>(el.id_empleado.NOMBRE==user && el.id_empleado.CONTRASENA==password))){
            resultLogin(true,'login successfully');
            new Storage("localStorage").add({
                keySession:tokenGeneator(5),
                dateExpire:new DateOperators().increment(0,0,0,1,.1,-1,-1),
                userSession: user,
                profile:json.find(el=>(el.id_empleado.NOMBRE==user)).id_tpuesto.NOMBRE
            });
            setTimeout(()=>enter(),1000);
        }else{
            resultLogin(false,'login failed');
        }        
    }catch(err){
        if(typeof Promise){
            resultLogin(false,'API error');
        }else{
            resultLogin(false,'Error unexpected during the login');
        }
    }
}

export const main=()=>{
    //popup form's events
    buttonLogin.addEventListener("click",()=>eventForm('show'));

    //login form's event
    formLogin.addEventListener("submit",login);
    closeForm.addEventListener('click',()=>eventForm('hide'));

    //printMenu
    printMenu();
}