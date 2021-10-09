class Usuario{
   constructor(nombre, apellidos, tags , fechanacimiento,numerotelefono,email,contrasena){
      this.nombre = nombre
      this.apellidos = apellidos
      this.tags = tags
      this.fechanacimiento = fechanacimiento
      this.numerotelefono = numerotelefono
      this.email = email
      this.contrasena = contrasena
   }
   
   getNombre(){
       return this.nombre
   }

   getApellidos(){
       return this.apellidos
   }
   getTags(){
       return this
   }
   getFechaNacimiento(){
       return this.fechanacimiento
   }
   getNumerotelefono(){
       return this.numerotelefono
   }
   getEmail(){
       return this.email
   }
   getContrasena(){
       return this.contrasena
   }

}