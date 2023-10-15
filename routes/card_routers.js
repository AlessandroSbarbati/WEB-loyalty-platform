module.exports= app=>{
    const card_controller = require("../controller/card_controller");
    const jwt = require('../jwt/controllerJwt')

    var router = require ("express").Router();

    
    router.post('/createCardEmp',jwt.authenticateToken, card_controller.creaCartaEmp);
    router.post('/rimuoviCarta',jwt.authenticateToken, card_controller.rimuoviCarta);
    router.get('/prendiCarte',jwt.authenticateToken, card_controller.prendiCarte);
    router.post('/aggiungiPunti',jwt.authenticateToken, card_controller.aggiungiPunti);
    router.post('/rimuoviPunti',jwt.authenticateToken,card_controller.rimuoviPunti);
    router.get('/prendiCarta/:id',jwt.authenticateToken,card_controller.prendiCartaIdUtente);


    



 
  app.use('/api/card', router) ;
}
