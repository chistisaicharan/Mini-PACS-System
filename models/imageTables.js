

const sequelize=require("../config/db")

const {DataTypes}=require("sequelize");


const Image=sequelize.define("Image",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    patient_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"patients",
            key:"id"

        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    },
    file_path:{
        type:DataTypes.STRING,
        allowNull:false
    },


},{
    tableName:"images",
    timestamps:true,
    underscored:true
});

module.exports=Image;