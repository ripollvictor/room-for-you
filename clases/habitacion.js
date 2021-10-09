class Habitacion{
   constructor(precio,caracteristicas,metroscuadrados,vivienda){
       this.precio= precio
       this.caracteristicas = caracteristicas
       this.metroscuadrados = metroscuadrados
       this.vivienda = vivienda
   }

   getPrecio(){
       return this.precio
   }
   getCaracteristicas(){
       return this.caracteristicas
   }
   getMetrosCuadrados(){
       return this.metroscuadrados
   }
   getVivienda(){
       return this.vivienda
   }
   setPrecio(value){
       this.precio = value
   }
   setCaracteristicas(value){
       this.caracteristicas = value
   }
   setMetrosCuadrados(value){
       this.metroscuadrados = value
   }
   setVivienda(value){
       this.vivienda = value
   }

}