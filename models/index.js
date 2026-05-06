
const sequelize=require("../config/db");

const User=require("./usersTable");
const Patient=require("./patientsTable");
const Image=require("./imageTables");

// User-> Patients

User.hasMany(Patient,{
    foreignKey:"created_by",
    as:"patients",
    onDelete:"CASCADE"
});

Patient.belongsTo(User,{
    foreignKey:"created_by",
    as:"doctor"
});


// Patient -->images

Patient.hasMany(Image,{
    foreignKey:"patient_id",
    as:"images",
    onDelete:"CASCADE"
});

Image.belongsTo(Patient,{
    foreignKey:"patient_id",
    as:"patients"
});

module.exports={
    User,
    Patient,
    Image
}