// Here are declared the constants and variables that will use in all the project.
window.API = "http://localhost:5000/miramar";
window.body = document.querySelector("body");

export class DB{

    constructor(collection){
        this.API=window.API+"/"+collection;
    }

    async show(id,filter){
        try{
            let idKey = (id)?`/${id}`:``;
            let res = await fetch(`${this.API}${idKey}`);
            let data = await res.json();
            let err = res.ca
            if(filter){
                return data.filter(el=>el[filter[0]]==filter[1]);
            }else{
                return data;
            }
        }catch(err){
            if(typeof Promise){
                showMessage(`error API`,false);
            }
        }

    }

   async getId(filter){
            console.log(filter);
            let res = await fetch(`${this.API}`);
            let data = await res.json();
            // variable that will contain the _id
            let id;
            let getObj;
            let check = 0;
            for(let obj of data){
                //get all current object's values
                let values = Object.values(obj);
                for(let word of filter){
                    for(let value of values){

                        // if the value is array
                        if(Array.isArray(value)){
                            
                            // iterate subvalues
                            for(let subvalue of value){

                                //if word is array
                                if(Array.isArray(word)){
                                    for(let subword of word){
                                        // compare the subvalues and subwords
                                        if(subvalue==subword){
                                            check++;
                                            getObj=obj;
                                        }                                        
                                    }
                                }else{
                                    if(subvalue==word){
                                        check++;
                                        getObj=obj;
                                    }  
                                }
                            }                            
                        }else{
                            if(Array.isArray(word)){
                                for(let subword of word){
                                    if(value==subword){
                                        check++;
                                        getObj=obj;
                                    }                                        
                                }
                            }else{
                                if(value==word){
                                    check++;
                                    getObj=obj;
                                }  
                            }
                        }
                    }
                }
                //if is equal, means than is object has the filter
                let count=0;
                for(let fil of filter){
                    if(Array.isArray(fil)){
                        for(let subfil of fil){
                            count++;
                        }
                    }else{
                        count++;
                    }
                }
                if(check==count){
                    id=getObj._id;
                    break;
                }else{
                    id=false;
                }
            }
            return id;
   }

    async delete(key){
        try{
            await fetch(`${this.API}/${key}`,{method:'DELETE'});
            return true;
        }catch(err){
            if(typeof Promise){
                return false;
            }
        }
    }

    async update(id,data){
        try{
            data["id"]=id;
            console.log(data);
            await fetch(this.API,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            });
            return true;
        }catch(err){
            if(typeof Promise){
                return false;
            }
        }
    }
}

// This class is responsible of add, remove, show variables in localStorage/sessionStorage
export class Storage {
    constructor(storageType = String) {
        this.storage = storageType;

    }

    add(obj = Object) {
        for (let el in obj) {
            window[this.storage].setItem(el, obj[el]);
        }
    }

    show(key = String) {
        return window[this.storage].getItem(key);
    }

    delete(listKeys = Array) {
        try {
            listKeys.foreach((key) => {
                window[this.storage].removeItem(key);
            });
        } catch (e) {
            null;
        }
    }

    deleteAll() {
        window[this.storage].clear();
    }

}

// This class is responsible of the dates' operators, increment y decrements dates 
export class DateOperators {
    constructor() {
        this.date = new Date();
        this.dateOperator = [ // get current date
            parseInt(this.date.getFullYear()),
            parseInt(this.date.getMonth()),
            parseInt(this.date.getDate()),
            parseInt(this.date.getHours()),
            parseInt(this.date.getMinutes()),
            parseInt(this.date.getSeconds()),
            parseInt(this.date.getMilliseconds())
        ];
    }

    increment(Year = Number, Month = Number, Day = Number, Hour = Number, Minute = Number, Seconds = Number, MSeconds = Number) {
        let params = [Year, Month, Day, Hour, Minute, Seconds, MSeconds];
        for (let x = 0; x <= this.dateOperator.length - 1; x++) {
            (params[x] == -1) ? this.dateOperator[x] = 0 : this.dateOperator[x] += params[x];
        }
        return new Date(this.dateOperator[0], this.dateOperator[1], this.dateOperator[2], this.dateOperator[3], this.dateOperator[4], this.dateOperator[5], this.dateOperator[6]);
    }

    decrement(Year = Number, Month = Number, Day = Number, Hour = Number, Minute = Number, Seconds = Number, MSeconds = Number) {
        let params = [Year, Month, Day, Hour++, Minute, Seconds, MSeconds];
        for (let x = 0; x <= this.dateOperator.length - 1; x++) {
            (params[x] == -1) ? this.dateOperator[x] = 0 : this.dateOperator[x] -= params[x];
        }
        return new Date(this.dateOperator[0], this.dateOperator[1], this.dateOperator[2], this.dateOperator[3], this.dateOperator[4], this.dateOperator[5], this.dateOperator[6]);
    }
}

// this function print HTML in the end the DOM 
export const insertHTML = (html) => {
    window.body.insertAdjacentHTML("beforeend", html);
}

// show a custom message
export const showMessage = (text, check=Boolean) => {
    let color='';
    if(check==false){
        color='rgb(255, 73, 73)';
    }else{
        color='#26ca26';
    }
    window.body.insertAdjacentHTML("beforeend", `<box-message style='background:${color};'>${text}</box-message>`);
}