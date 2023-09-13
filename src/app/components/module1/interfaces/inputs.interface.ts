export interface Inputs{
  label:string,                                //  saldra en el texto como titulo
  type?:string,                                //  tipo de input                         
  formcontrolname:string,                      //  nombre en el formulario  
  value?:string|number,                        //  valor que tendra el input
  disabled?:Boolean,                           //  estara habilitado el input
  listitems?:ArrayList[]                       //  lista  cargados no es necesario que lo pongas se carga desde la url 
  radiobutton?:ArrayList[]                     //  defines los radio buttons en array de la interface array list   
  checkbox?:ArrayList[]                        //  lista  cargados no es necesario que lo pongas se carga desde la url 
  url?:string,                                 //  url desde donde seran cargados
  description?:string                          //  segundo titulo por el momento se usa mas para los checkbox con una description por ejemplo el item que se dezplaza el grande
  itemsdescription?:ArrayList[]                //  la lista cargada de la urldescription        
  formcontrolnameload?:string                  //  (En proceso) nombre de formcontrolname que esperara para la carga
  urloadata?:string                            //  por el momento es la que llena el select de la descripcion del mismo dropdown de la opcion de arriba
  typeloadingdata?:string                      //  (En proceso) type de input que sera si espera algo de otro input        
  dataload?:ArrayList[]                        //  (En proceso) data cargada 
  event?:string                                // Que tipo de evento quiero que se use
} 
export interface ArrayList{
text:string,
value:string
status?:Boolean
}

