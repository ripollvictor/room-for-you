class Vivienda{
   constructor(latitud,longitud,numero,escalera,piso,puerta,metroscruadrados,banos,tipo,fecharegistro){
        this.latitud = latitud
        this.longitud = longitud
        this.numero = numero
        this.escalera = escalera
        this.piso = piso
        this.puerta = puerta
        this.metroscruadrados = metroscruadrados
        this.banos = banos
        this.tipo = tipo
        this.fecharegistro = fecharegistro


   }
   getLatitud(){
       return this.latitud
   }
   getLongitud(){
       return this.longitud
   }
   getNumero(){
       return this.numero
   }
   getEscalera(){
       return this.escalera
   }

   getPiso(){
       return this.piso
   }

   getPuerta(){
       return this.puerta
   }

   getMetrosCuadrados(){
       return this.metroscruadrados
   }

   getBanos(){
       return this.banos
   }
   getTipo(){
       return this.tipo
   }
   getFechaRegistro(){
       return this.fecharegistro
   }

}