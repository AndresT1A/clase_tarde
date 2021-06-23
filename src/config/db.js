const mysql= require('mysql');

const connection=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
});

connection.connect((err)=>{
    if(err){
        console.log("El error de la conexion a BD es: "+err.message)
        return;
    }
    console.log("Conectado exitosamente a la BD");
}),

module.exports=connection;