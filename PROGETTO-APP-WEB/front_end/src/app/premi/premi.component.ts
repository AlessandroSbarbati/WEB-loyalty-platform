import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments.prod';
import { Gift } from 'src/app/models/gift';
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-premi',
  templateUrl: './premi.component.html',
  styleUrls: ['./premi.component.scss']
})

export class PremiComponent implements OnInit {

  userType: User | Employee | undefined;

  isEmployee: boolean | undefined;

  //VARIABILE ASSOCIATA PER LE RESPONSE
  data: any

  isUser: any
  //VARIABILI PER FORMGROUP
  form !: FormGroup
  form2 !: FormGroup
  form3 !: FormGroup

  //BOOLEAN USATI DAI METODI PER VISUALIZZARE I DIV 
  modificaRegalo = false
  creaRegalo = false
  eliminaRegalo = false
  mostraRegalo = true

  //VARIABILE PER VISUALIZZARE TUTTI I REGALI 
  cardGift: Gift[] = [];

  //COSTRUTTORE
  constructor(
    private formbuilder: FormBuilder,
    private httpclient: HttpClient,
    private userService: UserService,

  ) {

  }
  //METODI CHE CAMBIANO LE CONDIZIONI PER VISUALIZZARE I DIV 
  modificaRegali(giftId: Number ) {
    this.modificaRegalo = !this.modificaRegalo
    this.creaRegalo = false
    this.eliminaRegalo = false
    this.mostraRegalo = false
  }

  mostraCreaGift() {
    this.creaRegalo = true
    this.eliminaRegalo = false
    this.modificaRegalo = false
    this.mostraRegalo = false
  }

  eliminaRegali() {
    this.eliminaRegalo = true
    this.creaRegalo = false
    this.modificaRegalo = false
    this.mostraRegalo = false

  }

  mostraRegali() {
    this.mostraRegalo = !this.mostraRegalo
    this.eliminaRegalo = false
    this.creaRegalo = false
    this.modificaRegalo = false

  }

  ngOnInit(): void {
    this.initForm();
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
      this.fetchDataEmp();

      
    } else if (this.userType instanceof User) {
      this.isEmployee = false;
      this.fetchData();
    }
  }
  //DIVERSE FORM
  initForm() {
    this.form3 = this.formbuilder.group({
      nomeRegalo: ['', Validators.required],
      descrizione: ['', Validators.required],
      numeroPunti: ['', Validators.required],

    })

    this.form2 = this.formbuilder.group({
      nomeRegalo: ['', Validators.required]
    })
    this.form = this.formbuilder.group({
      nomeRegalo: ['', Validators.required],
      descrizione: ['', Validators.required],
      numeroPunti: ['', Validators.required],

    })
  }

  //VISUALIZZA REGALI EMP
  fetchDataEmp() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    if(this.userType instanceof Employee){
    this.httpclient.get<any>(`${enviroment.baseUrl}/gift/prendiPremi`, httpOptions).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          console.log(response)
          if (Array.isArray(this.data.risultato)) {
            this.cardGift = this.data.risultato;
            console.log(this.data);
            console.log(this.cardGift);
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
}

  //VISUALIZZA REGALI USER
  fetchData() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    if(this.userType instanceof User){
    this.httpclient.get<any>(`${enviroment.baseUrl}/gift/prendiPremi`, httpOptions).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          console.log(response)
          if (Array.isArray(this.data.risultato)) {
            this.cardGift = this.data.risultato;
            console.log(this.data);
            console.log(this.cardGift);
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
}

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'email'];

  //BOTTONE CHE PERMETTE DI CREARE DEI PREMI 
  button() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nomeRegalo = this.form.value.nomeRegalo;
    const descrizione = this.form.value.descrizione;
    const numeroPunti = this.form.value.numeroPunti;
    this.httpclient.post(`${enviroment.baseUrl}/gift/creaPremi`, {
      nomeRegalo: nomeRegalo,
      descrizione: descrizione,
      numeroPunti: numeroPunti
    },httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("premio creato")
          this.fetchDataEmp()
          this.mostraRegali()
          console.log(this.data.status)
          console.log(this.data.messaggio)
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
    console.log('funzia')
  }

  //BOTTONE CHE PERMETTE DI ELIMINARE DEI REGALI 
  buttonDelete() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nomeRegalo = this.form2.value.nomeRegalo;
  
    this.httpclient.post(`${enviroment.baseUrl}/gift/eliminaPremi`,
     {nomeRegalo: nomeRegalo},httpOptions).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("premio eliminato")
          this.fetchDataEmp()
          this.eliminaRegalo=false
          

          console.log(this.data.status)
          console.log(this.data.messaggio)

        }

      }, err => {
        this.data = err;
        if (this.data.status == 401) {
          console.log(this.data.status)
          console.log(this.data.messaggio)

        }
      }

    )
    console.log('funzia')
  }

  //RESETTA TUTTE LE FORM
  resetData(){
    this.form.reset()
    this.form2.reset()
    this.form3.reset()
    this.data= null
  }
}




















