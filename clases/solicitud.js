class Solicitud {
    constructor(estado,fecha,usuario,vivienda){
          this.estado = estado
          this.fecha = fecha
          this.usuario = usuario
          this.vivienda = vivienda
    }
// un usuario una vivienda
        getEstado(){
            return this.estado
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