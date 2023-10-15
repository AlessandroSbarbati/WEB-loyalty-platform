module.exports= app=>{
  const jwt = require('../jwt/controllerJwt')
    const giftController = require("../controller/gift_controller");
    var router = require ("express").Router();

    router.post("/creaPremi", jwt.authenticateToken,giftController.creaPremi);
    router.get("/prendiPremi",jwt.authenticateToken, giftController.prendiPremi);
    router.post("/eliminaPremi",jwt.authenticateToken,giftController.eliminaPremi); 
    router.post("/modificaPremi",giftController.modificaPremio);



 
  app.use('/api/gift', router) ;
}
