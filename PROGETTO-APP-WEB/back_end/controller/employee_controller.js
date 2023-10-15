const { request, response } = require('express')
const dbconnection = require('../config/dbconnection')
const bcrypt = require("bcrypt")
const Employee = require('../models/employees')
const secret = "xxjjkk123!!à"
const jwt = require('../jwt/controllerJwt')

//METODO CREAZIONE EMPLOYEE
exports.creazioneEmp = async (requeste, response) => {
    if (requeste.body.codice == "" || requeste.body.password == "") {
        response.status(400).send({
            messaggio: "dati assenti",
            status: 400,


        })
    }
    const codice = requeste.body.codice;
    const password = requeste.body.password + secret;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(codice)
    console.log(password)

    console.log(password)
    console.log(hashPassword)

    employee = {
        codice: codice,
        password: hashPassword,
        salt: salt,

    }
    Employee.create(employee).then(data => {
        response.status(201).send({
            status: 201,
            message: `employee creato`
        })
    }).catch(err => {
        response.status(500).send({
            status: 500,
            message: `errore creazione employee`,
        });


    })

}

//METODO LOGIN EMPLOYEE
exports.logIn = async (request, response) => {
    if (request.body.codice == "" || request.body.password == "") {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }
    const codice= request.body.codice
    const password= request.body.password
    
    const newPassword=password+secret

    Employee.findOne({
        where : {
            codice: codice
        }
    }).then((employee)=>{
        if(!employee){
            response.status(400).send({
                message: "employee non trovato",
                status : 400
            })
        }else{
            return bcrypt.compare(newPassword,employee.password).then((risultato)=>{
                if(!risultato){
                    response.status(404).send({
                        message: "password non corretta",
                        status : 404
                    })
                }else {
                    const accessToken = jwt.accessToken(employee)
                    const refreshToken = jwt.getRefreshToken(employee)
                    jwt.addToken(refreshToken)
                    const data = {
                        id: employee.id,
                        codice : employee.codice
                    }
                    response.status(200).send({
                        status :200,
                        data,
                        accessToken:accessToken,
                        refreshToken: refreshToken,
                    })
                }
                
                    
                

            })
        }
    })
}

//METODO LOGOUT EMPLOYEE
exports.logOut = async (request, response) => {
    let refreshToken = request.body.refreshToken;
  
    if (!refreshToken) {
        response.status(400).send({
        status: 400,
        message: "Content can't be empty!"
      });
      return;
    }
  
    let index = jwt.refreshTokens.indexOf(refreshToken);
  
    if (index == -1) {
        response.status(401).send({
        status: 401,
        message: "You are not authenticated.",
      });
    }
  
    jwt.refreshTokens.splice(index, 1);
    console.log(jwt.refreshTokens);
  
    response.status(200).send({
      status: 200,
      message: "Logout Successfull.",
    });
  }

  //METODO REFRESH TOKEN
    exports.refreshToken = async (req, res) => {
        let refreshToken = req.body.refreshToken;
      
        if (!refreshToken || !jwt.containsToken(refreshToken)) {
          return res.status(401).send({
            status: 401,
            message: "You are not authenticated.",
          });
        }
      
        let user = jwt.getUserByRefreshToken(refreshToken);
      
        jwt.refreshTokens = jwt.refreshTokens.filter(token => token !== refreshToken);
      
        let newAccessToken = jwt.accessToken(user);
        let newRefreshToken = jwt.getRefreshToken(user);
        jwt.refreshTokens.push(newRefreshToken);
        console.log("Nuovi Token : " + "\nAccessToken : " + newAccessToken + "\nRefreshToken : " + newRefreshToken);
        console.log(jwt.refreshTokens);
      
        return res.status(200).send({
          status: 200,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }

