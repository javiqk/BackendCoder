const fs= require('fs');
const express= require('express');
const { log } = require('console');
const {Router}= express;

const app= express();
const router= Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',router);

app.get('/',function(req,res){
    res.sendFile(__dirname,'/public/index.html');
})

const PORT= 8080
const server= app.listen(PORT,()=>{
    console.log('Servidor HTTP escuchando en el puerto ' + server.address().port)
})

server.on("Error",error=>console.log(`Se obtuvo el siguiente error ${error}`));




class Contenedor {
    constructor(){
        this.route= './productos.json';
        this.id= 1;
    }
    save(x){
        let array=[];
        let object=x;
            
                try{
                    
                    let data = fs.readFileSync(this.route,'utf-8');
                    array = JSON.parse(data);
                    console.log("Ingreso por TRY");
                    
                }
                catch{
                    console.log("catch error"); 
                }

        console.log(array);
        object.id= array.length + 1;
        array.push(object);

        let lastId= array.length + 1;
        fs.writeFileSync(this.route,JSON.stringify(array));

        this.id= lastId++;
    }
    

        getById(x){
        let array= [];
        let y = x;
            try{
                let data = fs.readFileSync(this.route,'utf-8');
                array = JSON.parse(data);
            }
            catch{
                console.log("catch error"); 
            }
        let object= null
               
        

                array.forEach(element => {
                if(  element.id==y ){
                object = element;}}); 

       if ( object == null){
           object= "Error, producto no encontrado";
       }
       return object;
        }

        deleteById(x){
        let array= [];
        let y = x;
        try{
            let data = fs.readFileSync(this.route,'utf-8');
            array = JSON.parse(data);
            console.log("Ingreso por TRY");
        }
        catch{
            console.log("catch error"); 
        }
        
        
        array.forEach(element => 
            {
           
                if(element.id == y)
                {
                    let id = element.id - 1
                    let removed = array.splice(id, 1);
                    console.log("delete item: " + JSON.stringify(removed));
                    fs.writeFileSync(this.route,JSON.stringify(array))  
                    console.log(array);  
                }
            });
    }

        edit(id,nombre,price){
        let y=id;
        let readFinal = fs.readFileSync(this.route,'utf-8')
        let allProducts = JSON.parse(readFinal);
        
        console.log(allProducts);

            allProducts.forEach(element => {
            if(element.id == y){
                element.title= nombre;
                element.price= price;}
                });
                console.log(allProducts)   
                fs.writeFileSync(this.route,JSON.stringify(allProducts));
                return allProducts;
    }

    read(){
        let readFinal = fs.readFileSync(this.route,'utf-8')
        let allProducts = JSON.parse(readFinal);
        return allProducts
        }

    random(){
        let data = fs.readFileSync(this.route,'utf-8')
        let allProducts = JSON.parse(data);
        let arrayAll= allProducts;
        let aleatorio = arrayAll[Math.floor(Math.random() * arrayAll.length)];
        return aleatorio;
    }
};

const contenedor= new Contenedor();

class NuevoObjeto{
    constructor(title, price){
        this.title=title;
        this.price=price;}}

        let container = new Contenedor();

        container.save('Heladera', 1200);
        container.save('Lavarropas', 7000);
        container.save('Televisor', 12000);



    router.get('/productos',(req,resp)=>{
        resp.json({Productos: contenedor.read()})
        });

    router.get('/productos/:num',(req,resp)=>{
        resp.json(contenedor.getById(req.params.num));
    });

    router.get('/productoRandom',(req,resp)=>{
        resp.send({Aleatorio: contenedor.random()})
    });

    router.post('/productos',(req,resp)=>{
        console.log(req.body);
       
        resp.send({Guardar: contenedor.save(req.body)})
        
    });

    router.delete('/productos/:num',(req,resp)=>{
        
        resp.json({Eliminar: contenedor.deleteById(req.params.num)})
        
    });

    router.put('/productos/:num',(req,resp)=>{
        let object = "Cocina";
        let price = 10000;
        resp.json({
            Editado: contenedor.edit(req.params.num,object,price)
        })
        
    });

