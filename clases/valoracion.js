class Valoracion{
     constructor(puntuacion,comentario,fecha,usuario,vivienda){
         this.puntuacion = puntuacion
         this.comentario = comentario
         this.fecha = fecha
         this.usuario = usuario
         this.vivienda = vivienda
     }

     getPuntuacion(){
         return this.puntuacion
     }
     getComentario(){
         return this.comentario
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