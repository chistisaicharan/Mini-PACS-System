

const sequelize=require("../config/db")

const {DataTypes}=require("sequelize");

const usersTable=sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:{
                msg:"Please enter a valid email address"
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM("Doctor","Admin"),
        defaultValue:"Doctor"
    },
},{
    tableName:"users",
    timestamps:true,

    underscored:true
    
});


module.exports=usersTable;