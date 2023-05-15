import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | {type: 'Add-Entry' , payload: Entry}
  | {type: 'Entry-Update' , payload: Entry}
  | {type: 'Refresh-Data' , payload: Entry[]}
  | {type: 'Delete-Data', payload:Entry}


export const entriesReducer=(state:EntriesState, action:EntriesActionType):EntriesState =>{

  switch(action.type){
    case 'Add-Entry':
      return {
         ...state,
         entries: [...state.entries, action.payload]
      }
    
    case 'Entry-Update':
      return {
        ...state,
        entries: state.entries.map(entry => {   // creando un nuevo array 
          if( entry._id === action.payload._id){  // asignando el nuevo status con el id
            entry.status = action.payload.status  //regresando la nueva acción que estoy llamando 'status'
            entry.description = action.payload.description  //regresando la nueva accción que estoy llamando 'description'
          }
          return entry;
        })
      }
      case 'Delete-Data':
        return {
          ...state,
          entries: state.entries.filter(entry => entry._id !==action.payload._id)
        }

      case 'Refresh-Data':
        return {
          ...state,
          entries: [ ...action.payload ]
        }

  default:
    return state;
  }
}