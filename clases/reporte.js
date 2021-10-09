class Reporte{
    constructor(contenido,fecha,usuario,vivienda){
        this.contenido = contenido
        this.fecha = fecha
        this.usuario = usuario
        this.vivienda = vivienda
    }

    
    getContenido(){
        return this.contenido
    }
    getFecha(){
        return this.fecha
    }
    getUsuario(){
        return this.usuario
    }
    getVivienda(){
        return this.vivienda
    }

}