export class User {
    id: Number;
    nome: String;
    cognome: String;
    email: String;
    
    

    constructor(id: Number, nome: String, cognome: String, email: String,  ) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        
    }

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }



    getCognome() {
        return this.cognome;
    }

    getEmail() {
        return this.email;
    }

    
    
    
    setNome(nome: String){
        if(nome == ""){
            throw console.error("Nome can't be null.");
        }
        this.nome = nome; 
    }

   

    setEmail(email : String){
        if(email == null){
            throw console.error("Id can't be null.");
        }
        this.email = email; 
    }
}



