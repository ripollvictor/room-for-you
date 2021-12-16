export class OfertaDB {
    constructor(id, ofertador, direccion, precio, imagenes = []) {
        this.id = id
        this.ofertador = ofertador
        this.direccion = direccion
        this.precio = precio
        this.imagenes = imagenes
    }
}