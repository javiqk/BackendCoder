class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName() { 
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascota() { 
        return this.mascotas.length;
    }
    addBook(nombre,autor) {
        this.libros.push({
            nombre,autor
        })
    }
    getBookNames() { 
        return this.libros.map(libro => libro.nombre)
    }
}

const usuario = new Usuario ('Javier', 'Cucarella')
console.log(usuario)

usuario.addBook ('Phyton', 'Roberto Gomez Bolaños');
usuario.addBook ('C++', 'Bruno Díaz');
console.log (usuario.getBookNames());
usuario.addMascota ('Pedro');
usuario.addMascota ('Carlos');
console.log (usuario.countMascota());
