import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user'
import { enviroment } from 'src/environments/environments';
import { Router, UrlTree } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../authentication/services/auth.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-benvenuto',
  templateUrl: './benvenuto.component.html',
  styleUrls: ['./benvenuto.component.scss']
})
export class BenvenutoComponent {
  displayedColumns: string[] = ['email', 'password'];
  data: any;
  form !: FormGroup
  
  response: any;

  //costruttore
  constructor(
    private formbuilder: FormBuilder,
    private httpclient: HttpClient,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  //ngOinit 
  ngOnInit(): void {
    this.initForm();
    
  }

  //initForm
  initForm() {
    this.form = this.formbuilder.group({
      codice: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    })
  }


  button() {
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const repassword = this.form.value.password;


    this.httpclient.post(`${enviroment.baseUrl}/user/registrazione`, {
      nome: nome,
      cognome: cognome,
      email: email,
      password: password
    }
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          console.log(this.data.status)
          console.log(this.data.messaggio)
          alert("Registrazione avvenuta con successo");
          this.resetData()

        }

      }, err => {
        this.data = err;
        if (this.data.status == 500) {
          console.log(this.data.status)
          console.log(this.data.messaggio)

        }
      }

    )
    console.log('funzia')
  }
  button2() {
    const codice = this.form.value.codice;
    const password = this.form.value.password;
    


    this.httpclient.post(`${enviroment.baseUrl}/employee/creazioneEmp`, {
      codice: codice,
      password: password,
      
    }
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          console.log(this.data.status)
          console.log(this.data.messaggio)
          alert("Registrazione avvenuta con successo");
          this.resetData()

        }

      }, err => {
        this.data = err;
        if (this.data.status == 500) {
          console.log(this.data.status)
          console.log(this.data.messaggio)

        }
      }

    )
    console.log('funzia')
  }

  logInAdmin() {
    const codice = this.form.value.codice;
    const password = this.form.value.password;
    this.httpclient.post(`${enviroment.baseUrl}/employee/logIn`, {
      codice: codice,
      password: password
    }).subscribe(
      response => {
        this.response = response;
        if (this.response.status == 200) {
          const employeeLogged = new Employee(this.response.data.id, this.response.data.codice);
          this.userService.setUser(employeeLogged);
          this.authService.saveToken(this.response.accessToken, this.response.refreshToken);
          alert("Log In avvenuto con successo");
          this.router.navigate(['mainpage']);
        } else {
          alert("Password o codice non corretti.");
        }
      }, err => {
        alert('Password o codice non corretti.');
      }
    );
  }

  logIn() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.httpclient.post(`${enviroment.baseUrl}/user/logIn`, { email: email, password: password }).subscribe(
      response => {
        this.response = response;
        if (this.response.status == 200) {
          const userLogged = new User(this.response.data.id, this.response.data.nome, this.response.data.cognome, this.response.data.email);
          this.userService.setUser(userLogged);
          this.authService.saveToken(this.response.accessToken, this.response.refreshToken);
          alert("Log In avvenuto con successo");
          this.router.navigate(['mainpage']);
          // this.router.navigate(['dash/user']);
        } else {
          alert("Password o email non corretti");
        }
      }, err => {
        alert('Password or email non corretti');
      }
    );
  }

  resetData() {
    this.form.reset()
    this.data = null
  }

}
