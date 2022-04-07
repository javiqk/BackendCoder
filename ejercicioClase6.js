const express = require ("express");
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

    getAll () {        
        const data = fs.readFileSync(this.nombreArchivo, 'utf-8');
        return data;
    }
    random(){
        const data = fs.readFileSync(this.nombreArchivo,'utf-8')
        const products = JSON.parse(data);
        let arreglo = products;
        let rand = arreglo[Math.floor(Math.random() * products.length)];

        return rand;
    }
} 


let container = new Contenedor();

container.save('Heladera', 1200);
container.save('Lavarropas', 7000);
container.save('Televisor', 12000);

const app = express () ;
const PORT = 8080;

const server = app.listen (PORT, () =>{
    console.log("aplicación express escuchando en el puerto 8080");
})

server.on ("Error", error => console.log(`Se obtuvo el siguiente error ${error}`))

app.get("/", (req,resp) => {
    resp.send ({mensaje:"Bienvenidos Coders!!!!!"});
})

app.get("/productos", (req,resp) => {
    resp.send (container.getAll());
})

app.get("/productoRandom", (req, resp) => {
    resp.send(container.random());
})