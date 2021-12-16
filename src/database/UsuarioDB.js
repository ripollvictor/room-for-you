
export class UsuarioDB {
    /**
     * 
     * @param {*} nombre 
     * @param {*} apellidos 
     * @param {*} email 
     * @param {Date} fechaNacimiento 
     * @param {*} fotoPerfil 
     * @param {*} telefono 
     */
    constructor(nombre, apellidos, email, fechaNacimiento, fotoPerfil, telefono = '') {
        this.nombre = nombre
        this.apellidos = apellidos
        this.email = email
        this.fechaNacimiento = fechaNacimiento
        this.fotoPerfil = fotoPerfil
        this.telefono = telefono
    }
}