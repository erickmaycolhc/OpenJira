import { UIState } from './';

type UIActionType =
  |{type: 'UI - Open Sibedar'}
  |{type: 'UI - Close Sibedar'}
  |{type: 'UI - Set IsAddingEntry', payload: boolean}
  |{type: 'UI - Star Dragging'}
  |{type: 'UI - End Dragging'}
  
export const uiReducer=(state:UIState, action:UIActionType):UIState =>{

  switch(action.type){ //llamo a action.type que es de tipo UIActionType y contiene  propiedades string abierto y cerrado
    case 'UI - Open Sibedar':  //cuando el caso esta en open 
      return {
         ...state,  //despliego toda las propiedades de state
         sidemenuOpen: true, // como state es de tipo UIState boleano pues le digo que es verdadero para abrir el menu

      }
  case 'UI - Close Sibedar': //igualmente pasa aqui pero para cerrar el menu
     return {
        ...state,
        sidemenuOpen: false,
     }

  case 'UI - Set IsAddingEntry':
    return {
      ...state,
      isAddingEntry: action.payload
    }

  case 'UI - Star Dragging':
    return {
      ...state,
      isDragging: true
    }
    case 'UI - End Dragging':
    return {
      ...state,
      isDragging: false
    }
  default:
    return state  //sino hubo ningún cambio pues que me retorne state 
  }
}