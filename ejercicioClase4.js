const fs = require('fs');


class Contenedor {
    constructor() {
        this.nombreArchivo = './productos.json';
        this.id = 1;
    }

    save(nombre, precio) {
        let producto = {nombre: nombre, precio: precio, id: this.id};
        let productos = [];

        try {
            let file = fs.readFileSync(this.nombreArchivo, 'utf-8');
            productos = JSON.parse(file);
        } catch (error) {
            console.log('Archivo inexistente');
        }

        productos.push(producto);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos));
        this.id++;
    }

    getById(id) {
        let productos = [];

        try {
            let file = fs.readFileSync(this.nombreArchivo, 'utf-8');
            productos = JSON.parse(file);
        } catch (error) {
            console.log('Archivo inexistente');
        }

        let producto = null;

        productos.forEach(prod => {
            if(prod.id == id) {
                producto = prod;
            }
        });

        return producto;
    }  
    getAll () {        
        const data = fs.readFileSync(this.nombreArchivo, 'utf-8');
        return data;
    }

    deleteById(x){
        let array= [];
        let e = x;
        try{
            let data = fs.readFileSync(this.nombreArchivo,'utf-8');
            array = JSON.parse(data);
        }
        catch{
            console.log("producto inexistente"); 
        }
        
        
        array.forEach(element => 
            {
           
                if(element.id == e)
                {
                    let id = element.id - 1
                    let removed = array.splice(id, 1);
                    console.log("Se eliminó el siguiente elemento: " + JSON.stringify(removed));
                    fs.writeFileSync(this.nombreArchivo,JSON.stringify(array))  
                    console.log(array);  
                }
            });
    }

    deleteAll(){
        let array= []
        try{
            let data = fs.readFileSync(this.nombreArchivo,'utf-8');
            array = JSON.parse(data);
        }
        catch{
            console.log("productos inexistentes"); 
        }
        array =[]
        console.log(array);
        fs.writeFileSync(this.nombreArchivo,JSON.stringify(array));
    }
    }


let container = new Contenedor();

container.save('Heladera', 1200);
container.save('Lavarropas', 7000);
container.save('Televisor', 12000);

console.log(container.getById(2));
container.getAll();
container.deleteById(1);
container.deleteAll();