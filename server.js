
// import from app.js
const app=require("./app")
// import from db.js
const sequelize=require("./config/db")
require("dotenv").config()

const routes=require("./routes/auth_route");

app.use(routes);


require("./models/usersTable")
require("./models/patientsTable")
require("./models/imageTables")

require("./controllers/auth");

const port=process.env.PORT

sequelize.authenticate()
.then(()=>console.log("DB Connected Successfully"))
.catch((err)=>console.log("DB error",err))

sequelize.sync({alter:true})
.then(()=>console.log("Table synced successfully"))
.catch((err)=>console.log("Table Error",err))

app.listen(port,()=>{
    console.log(`Server is running on port is ${port}`);
});





