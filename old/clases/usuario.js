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
       return this.tags
   }
   getFechaNacimiento(){
       return this.fechanacimiento
   }
   getNumeroTelefono(){
       return this.numerotelefono
   }
   getEmail(){
       return this.email
   }
   getContrasena(){
       return this.contrasena
   }
   setNombre(value){
       this.nombre = value
   }
   setApellidos(value){
       this.apellidos = value
   }
   setTags(value){
       this.tags = value
   }
   setFechaNacimiento(value){
       this.fechanacimiento = value
   }
   setNumeroTelefono(values){
       this.numerotelefono = values
   }
   setEmail(value){
       this.email = value
    }
    setContrasena(value){
        this.contrasena = value
    }  
    
}
export function crearpersona() {
    var aux = new Usuario('pepe','botella','otaku',Date(1995,11,17),17232312,'poppy@gmail.com','2DEH2E2');
    return aux; 
}


