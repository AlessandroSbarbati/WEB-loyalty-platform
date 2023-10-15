import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Employee } from '../models/employee';

//Send data to root path.
@Injectable({
    providedIn : 'root'
})


export class UserService{

    private user : User | Employee | undefined; 

   
    constructor(){}

   
    setUser(user: User | Employee){
        this.user = user; 
    }

    getUser(){
        return this.user;
    }
}