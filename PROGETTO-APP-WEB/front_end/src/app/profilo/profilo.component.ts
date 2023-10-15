import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments.prod';
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent {

  
  //variabili
  TabUser: User[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'email'];

  userType: User | Employee | undefined;

  isEmployee: boolean | undefined;

  user: User | undefined

  mostraFormModificaP= false
  mostraFormModifica = false
  mostraInfo = true
  showInformation = true;
  data: any;
  form !: FormGroup

  //condizioni div iniziali
  mostraCarta = true
  creaUtente = false
  eliminaUtente = false

  //costruttore
  constructor(
    private formbuilder: FormBuilder,
    private httpclient: HttpClient,
    private userService: UserService,
  ) {

  }


  // metodi per cambiare le condizioni dei div 
  mostraUtenti() {
    this.mostraCarta = true
    this.creaUtente = false
    this.eliminaUtente = false

  }
  creaUtenti() {
    this.creaUtente = true
    this.mostraCarta = false
    this.eliminaUtente = false


  }
  eliminaUtenti() {
    this.eliminaUtente = true
    this.creaUtente = false
    this.mostraCarta = false

  }

  mostraFormEmail() {
    this.mostraFormModifica = true
    this.mostraFormModificaP= false
    this.showInformation = false


  }
  mostraFormPass(){
    this.mostraFormModificaP= true
    this.mostraFormModifica = false
    this.showInformation = false
  }
  mostraInformazioni(){
    this.showInformation=true
    this.mostraFormModifica=false
    this.mostraFormModificaP=false

  }

  //metodo ngInit
  ngOnInit(): void {

    this.initForm();
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
      this.fetchData();


    } else if (this.userType instanceof User) {
      this.isEmployee = false;
      this.prendiDati();
    }

  }


  //initForm
  initForm() {
    this.form = this.formbuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })

  }

  //metodo che permette all'utente di visualizzare i suoi dati
  prendiDati() {
    if (this.userType instanceof User) {
      const token = localStorage.getItem('accessToken');
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };
      console.log(this.userType.id)
      this.httpclient.get(`${enviroment.baseUrl}/user/prendiDatiUtente/${this.userType.id}`, httpOptions).subscribe(
        response => {
          this.data = response;
          if (this.data.status == 200) {

            this.user = this.data.data

          }
        }
      )
    }

  }

  //metodo che permette all'employee di vedere la lista di utenti
  fetchData() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    this.httpclient.get<any>(`${enviroment.baseUrl}/user/prendiUtenti`, httpOptions).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          console.log(response)
          if (Array.isArray(this.data.risultato)) {
            this.TabUser = this.data.risultato;
            console.log(this.data);
            console.log(this.TabUser);
          } else {
            console.error('I dati ricevuti non sono un array.');
          }
        }
      },
      error => {
        console.error('Errore durante la richiesta HTTP:', error);
      }
    );
  }

  //metodo che permette all'employee di creare un cliente nuovo
  button() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const repassword = this.form.value.password;



    if (password != repassword) {
      alert("password non coincidono")
      return
    }
    this.httpclient.post(`${enviroment.baseUrl}/user/creaUser`, {
      nome: nome,
      cognome: cognome,
      email: email,
      password: password
    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("account creato con successo")
          this.fetchData()
          this.mostraUtenti()
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.resetData()

        }

      }, err => {
        this.data = err;
        if (this.data.status == 401) {
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.resetData()

        }
      }

    )

  }

  //metodo che permette all'employee di eliminare un utente
  buttondelete() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nome = this.form.value.nome;
    const email = this.form.value.email;

    this.httpclient.post(`${enviroment.baseUrl}/user/rimuoviUtenti`, {
      nome: nome,
      email: email

    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("utente eliminato con successo")
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.fetchData()
          this.mostraUtenti()
          this.resetData()

        }

      }, err => {
        this.data = err;
        if (this.data.status == 401) {
          console.log(this.data.status)
          console.log(this.data.messaggio)

        }
      }

    )
  }

  //METODO PER MODIFICARE EMAIL
  updateEmail() {
    const newEmail = this.form.value.email;
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    if (this.userType instanceof User) {
      this.httpclient.post(`${enviroment.baseUrl}/user/modificaEmail/${this.userType.id}`, { email: newEmail }, httpOptions).subscribe(response => {
        this.data = response;
        if (this.data.status == 200) {

          alert("Email aggiornata con successo.");
          this.closeUpdateEmail();
        }
      }, err => {
        this.data = err;
        if (this.data.status == 400) {
          alert("I campi sono vuoti. Operazione non valida.");
          this.closeUpdateEmail();
        } else if (this.data.status == 404) {
          alert("qualcosa è andato storto");
          this.closeUpdateEmail();
        }
      });
    }
  }

  modificaPassowordUser() {
    if (this.userType instanceof User) {
      if (this.form.value.password === this.form.value.confirmPassword) {
        const newPassword = this.form.value.confirmPassword;
        const oldPassword = this.form.value.oldPassword;
        const token = localStorage.getItem('accessToken');
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
        };

        this.httpclient.post(`${enviroment.baseUrl}/user/modificaPassword/${this.userType.id}`, { oldPassword: oldPassword, newPassword: newPassword }, httpOptions).subscribe(response => {
          this.data = response;
          if (this.data.status == 200) {
            alert("Password aggiornata con successo");
          }
        }, err => {
          this.data = err;
          if (this.data.status == 400) {
            alert("I campi sono vuoti. Operazione non valida.");
            this.closeUpdatePassword();
          } else if (this.data.status == 404) {
            alert("Password errata. Riprovare.");
            this.closeUpdatePassword();
          } else if (this.data.status == 500) {
            alert("Something went wrong.");
            this.closeUpdatePassword();
          }
        });
      } else {
        alert("Le password non corrispondono. Riprova.");
      }
      this.closeUpdatePassword();
    }
  }

  closeUpdatePassword() {
    this.mostraFormModificaP = false;
    this.resetData();

  }


  closeUpdateEmail() {
    this.mostraFormModifica = false;
    this.resetData();

  }
  annulla() {
    this.mostraFormModifica = false;
    this.mostraFormModificaP = false;
    this.showInformation = true
    this.resetData();
  }

  //resetta la form 
  resetData() {
    this.form.reset()
    this.data = null
  }



}
