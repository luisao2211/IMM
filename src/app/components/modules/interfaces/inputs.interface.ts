import { Cp } from "./cp.interface"

export interface Inputs{
  /**informacion del label */
  label:string, 
      /**informacion del segundo type mas usado en doubleselect */
  secondlabel?:string,                              
    /**informacion del type */
  type?:'text'|'number'|'radio'|'email'|'checkbox'|'select'|'date'|'time'|'checkboxdescription'|'doubleselect'|'cp'|'phone',
      /**nombre en el formulario */                                                      
  formcontrolname:string,   
  formcontrolcp?:string
  formcontrolmunicipy?:string
  formcontrolstate?:string

  /**valor que tendra el input */                    
  value?:string|number, 
  /** estara habilitado el input */                       
  disabled?:true|false,
  /** lista  cargados no es necesario que lo pongas se carga desde la url */                            
  listitems?:ArrayList[]
   /** lista  cargados no es necesario que lo pongas se carga desde la urloadata */                            
   secondlistitems?:ArrayList[]
   cps?:Cp[],
 /** defines los radio buttons en array de la interface array list  */                                             
  radiobutton?:ArrayList[]
 /** lista  cargados no es necesario que lo pongas se carga desde la urloadata*/                                              
  checkbox?:ArrayList[]
 /** url desde donde seran cargados*/                                              
  url?:string,
   /** url alterna a otros servicios*/                                              
  otherurl?:string
/** segundo titulo por el momento se usa mas para los checkbox con una description por ejemplo el item que se dezplaza el grande*/                                              
  description?:string
   /** la lista cargada de la urldescription*/                                              
  itemsdescription?:ArrayList[]
/**segundo nombre por si viene con otro mas usado en el doubleselect*/                                              
  secondcontrolname?:string
  /**por el momento es la que llena el select de la descripcion del mismo dropdown de la opcion de arriba*/
  width?:1|2|3|4|5|6|7|8|9|10                                           
  urloadata?:string
/**(En proceso) type de input que sera si espera algo de otro input  */                                              
  typeloadingdata?:string
   /** (En proceso) data cargada*/                                              
  dataload?:ArrayList[] 
     /** (En proceso) Que tipo de evento quiero que se use*/                                               
  event?:string                               
} 
export interface ArrayList{
 /** texto de la opcion*/                                               
text:string,
 /** valor de la opcion*/ 
value:string
 /** disabled o no disabled mas usado para los checkbox hasta ser activado para el uso del select*/ 

status?:Boolean 
}
export interface Crud{
  post:string,
  put?:string,
  delete?:string,
  get?:string,
}

