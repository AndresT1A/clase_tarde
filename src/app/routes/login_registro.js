const connection = require("../../config/db");
const app = require("../../config/server");
const bcryptjs = require("bcryptjs");
module.exports=app =>{
    app.get('/',(req,res)=>{
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/indexlogeado.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/index.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
        
    })

    

    app.get('/config',(req,res)=>{
        connection.query
        res.render('../views/configadmin.ejs')
    })

    app.get('/agregaradmin',(req,res)=>{
        res.render('../views/agregaradmin.ejs')
    })

    app.get('/eliminaradmin',(req,res)=>{
        res.render('../views/eliminaradmin.ejs')
    })


    app.get('/formulario',(req,res)=>{
        res.render('../views/formulario.ejs')
    })

    app.get('/agregarproductos',(req,res)=>{

        connection.query('SELECT *FROM productos',(err,result)=>{
           console.log(result)
            res.render("../views/agregarproductos.ejs",{
                inventario:result,
            })
        })
        
    })

    app.get('/infoclientes',(req,res)=>{

        connection.query('SELECT *FROM cliente',(err,result)=>{
           console.log(result)
            res.render("../views/infoclientes.ejs",{
                clientes:result,
            })
        })
        
    })

    app.get('/eliminarproductos',(req,res)=>{

        connection.query('SELECT *FROM productos',(err,result)=>{
           console.log(result)
            res.render("../views/eliminarproductos.ejs",{
                inventario:result,
            })
        })
        
    })

    

    app.get('/registro',(req,res)=>{
        res.render('../views/registro.ejs')
    })

    app.get('/acercade', function(req, res, next) {
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/acercade.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/acercade.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
    });
      
    app.get('/productos', function(req, res, next) {
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/productos.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/productos.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
    });
      
    app.get('/politicas', function(req, res, next) {
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/politicas.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/politicas.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
    });

    app.get('/logout',(req,res)=>{
        req.session.destroy(()=>{
            res.redirect("/")
        })
    })


    app.post('/agregarproductos',(req,res)=>{
        
        console.log(req.body);
        
        const {item,elemento,precio,}=req.body;
        
        connection.query("INSERT INTO productos SET ?",{
            nombre_producto: item,
            cantidad: elemento,
            valor_unidad: precio
        },
         (error,results)=>{
           res.redirect('/agregarproductos')
        })
    })


    app.post('/eliminarproductos',(req,res)=>{
        
        console.log(req.body);
        
        const {id}=req.body;
        
        connection.query("DELETE FROM productos WHERE ?",{
            codigo_producto: id,

        },(error,results)=>{
           res.redirect('/eliminarproductos')
        })
    })

    app.post('/registro', async (req,res)=>{
        
        console.log(req.body);
        
        const {username,pass,nombres,apellidos,telefono,email}=req.body;
        console.log(username);
        let passwordHaash = await bcryptjs.hash(pass,8);
        connection.query("INSERT INTO cliente SET ?",{
            username: username,
            pass:passwordHaash,
            nombre:nombres,
            apellido:apellidos,
            telefono:telefono,
            email:email,
        }, async(error,results)=>{
            if (error){
                res.render("../views/registro.ejs",{
                    alert: false,
                    alertTitle: "Error",
                    alertMessage: "Error",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./registro"
                   })
            }else{
                res.render("../views/registro.ejs",{
                    alert: true,
                    alertTitle: "Registro Exitoso",
                    alertMessage: "¡Registro exitoso!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./formulario"
                   })
                
            }
        })
    })

    app.post('/agregaradmin', async (req,res)=>{
        
        console.log(req.body);
        
        const {username,pass,nombres,apellidos,telefono,email}=req.body;
        console.log(username);
        let passwordHaash = await bcryptjs.hash(pass,8);
        connection.query("INSERT INTO administrador SET ?",{
            username: username,
            pass:passwordHaash,
            nombre:nombres,
            apellido:apellidos,
            telefono:telefono,
            email:email,
        }, async(error,results)=>{
            if (error){
                res.render("../views/agregaradmin.ejs",{
                    alert: false,
                    alertTitle: "Error",
                    alertMessage: "Error",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./agregaradmin"
                   })
            }else{
                res.render("../views/agregaradmin.ejs",{
                    alert: true,
                    alertTitle: "Registro Exitoso",
                    alertMessage: "¡Registro exitoso!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./agregaradmin"
                   })
                
            }
        })
    })




    app.post('/eliminaradmin', async (req,res)=>{
        
        console.log(req.body);
        
        const {username}=req.body;
        console.log(username);
        
        connection.query("DELETE FROM administrador WHERE ?",{
            username: username,
        }, async(error,results)=>{
            if (error){
                res.render("../views/eliminaradmin.ejs",{
                    alert: false,
                    alertTitle: "Error",
                    alertMessage: "Error",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./eliminaradmin"
                   })
            }else{
                res.render("../views/eliminaradmin.ejs",{
                    alert: true,
                    alertTitle: "Usuario eliminado",
                    alertMessage: "Usuario eliminado",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./eliminaradmin"
                   })
                
            }
        })
    })

app.post('/auth',async (req,res)=>{
    const {username,pass,rol}=req.body;
    console.log(rol);
    if(rol=="admin"){
                if(username&&pass){
                    connection.query('SELECT * FROM administrador WHERE username = ?',[username],async(error,results) =>{
                        if(results.length===0){
                           res.render('../views/formulario.ejs',{
                               alert:true,
                               alertTitle:"Usuario y/o password incorrectos",
                               alertMessage:"Usuario y/o password incorrectos",
                               alertIcon:"error",
                               showConfirmButton:true,
                               timer:1500,
                               ruta:'formulario'
                           })
                           
                        } else{
                            req.session.loggedin=true;
                            req.session.username=results[0].username
                            console.log(req.session.username);
                            console.log(results[0].username)
                            res.render('../views/formulario.ejs',{
                                alert:true,
                                alertTitle:"Conexion Exitosa",
                                alertMessage:"Login Correcto",
                                alertIcon:"success",
                                showConfirmButton:false,
                                timer:1500,
                                ruta:'productos'
                            });
                            }
                        }
                    )}
            }
    let passwordHaash= await bcryptjs.hash(pass,8);
    if(username&&pass){
        connection.query('SELECT * FROM cliente WHERE username = ?',[username],async(error,results) =>{
            if(results.length===0 || !(await bcryptjs.compare(pass,results[0].pass))){
               res.render('../views/formulario.ejs',{
                   alert:true,
                   alertTitle:"Usuario y/o password incorrectos",
                   alertMessage:"Usuario y/o password incorrectos",
                   alertIcon:"error",
                   showConfirmButton:true,
                   timer:1500,
                   ruta:'formulario'
               })

            } else{
                req.session.loggedin=true;
                req.session.username=results[0].username
                
                res.render('../views/formulario.ejs',{
                    alert:true,
                    alertTitle:"Conexion Exitosa",
                    alertMessage:"Login Correcto",
                    alertIcon:"success",
                    showConfirmButton:false,
                    timer:1500,
                    ruta:'productos'
                });
                }
            }
        )}
            
    })
    
    
    
  
    
}


