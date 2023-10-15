module.exports= app=>{
    const jwt = require('../jwt/controllerJwt')
    const userController = require("../controller/user_controller");
    var router = require ("express").Router();

    router.post("/registrazione",userController.registrazione);
    router.post("/creaUser",jwt.authenticateToken,userController.creaUser);
    router.post("/rimuoviUtenti",jwt.authenticateToken,userController.rimuoviUtenti);
    router.get("/prendiUtenti",jwt.authenticateToken,userController.prendiUtenti);
    router.post("/logIn",userController.logIn);
    router.post("/logOut",userController.logOut);
    router.post("/refreshToken",userController.refreshToken);
    router.get("/prendiDatiUtente/:id",jwt.authenticateToken,userController.prendiDatiUtenteId);
    router.post("/modificaEmail/:id",jwt.authenticateToken,userController.modificaEmail);
    router.post("/modificaPassword/:id",jwt.authenticateToken,userController.modficaPassword);







    
  
 
    app.use("/api/user", router)
}