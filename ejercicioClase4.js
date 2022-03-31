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
        deleteById () {

        }
        deleteAll () {
    
        
        }
    }


let container = new Contenedor();
console.log(container.getById(3));
console.log(container.getAll());

container.save('Heladera', 1200);
container.save('Lavarropas', 7000);
container.save('Televisor', 12000);