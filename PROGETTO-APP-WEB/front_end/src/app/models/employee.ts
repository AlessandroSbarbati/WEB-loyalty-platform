export class Employee{
    id: Number;
    codice : String;
   

    constructor(id: Number, codice: String, ){
        this.id = id; 
        this.codice = codice; 
       
    }

    getId(){
        return this.id;
    }
    

    getCodice(){
        return this.codice; 
    }

    setCodice(codice : String){
        if(codice == null){
            throw console.error("Id can't be null.");
        }
        this.codice = codice; 
    }
}