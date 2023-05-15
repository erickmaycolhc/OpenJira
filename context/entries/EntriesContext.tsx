import { Entry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps{
   entries: Entry[];  //todo: falta el tipo de dato del arreglo
   addNewEntry: (description: string) => void;
   updateEntry: (entry: Entry, showSnackbar?:boolean) => void;
   deleteEntry: (entry: Entry,showSnackbar?:boolean) => void;
}


export const EntriesContext = createContext({} as ContextProps );