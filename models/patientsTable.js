

const sequelize=require("../config/db")

const {DataTypes}=require("sequelize");


const patientsTable=sequelize.define("patient",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    gender:{
        type:DataTypes.ENUM("Male","Female","Others"),
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    created_by:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"id"
        }
    }
},{
    tableName:"patients",
    timestamps:true,
    underscored:true
});


module.exports=patientsTable