

const {Sequelize}=require("sequelize")

require("dotenv").config()

const dbname=process.env.DB_NAME;
const user=process.env.DB_USER;
const password=process.env.DB_PASSWORD;

const sequelize= new Sequelize(dbname,user,password,{
    host:"localhost",
    dialect:"mysql",
    logging:false
});

module.exports=sequelize;