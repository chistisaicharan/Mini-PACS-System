

const sequelize=require("../config/db")

const {DataTypes}=require("sequelize");


const imageTable=sequelize.define("image",{
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

        }
    },
    file_path:{
        type:DataTypes.STRING,
        allowNull:false
    },
    upload_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

},{
    tableName:"images",
    timestamps:true,
    underscored:true
});

module.exports=imageTable