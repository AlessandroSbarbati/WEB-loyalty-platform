const express = require ('express')
const app = express();
const db=require("./config/dbconnection")
//parse requests of content-type application/json
app.use(express.json());

//parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Richiamo modelli per init: 


require("./routes/employee_routes")(app)
require("./routes/gift_routes")(app)
require("./routes/user_routes")(app)
require("./routes/card_routers")(app)



db.sync().then(() => {
    console.log('online');
}).catch((err) => {
    console.log('error' + err.message)
});




app.listen(3000)
