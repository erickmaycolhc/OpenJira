import { Entry } from '@/interfaces';
import { ReactElement, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '@/apis';
import {useSnackbar} from 'notistack';

export interface EntriesState{ //exportando los estados de las entradas
    entries: Entry[];

}

interface Props{ //validando el tipo de children
children: ReactElement
}

const Entries_INITIAL_STATE: EntriesState = { // las tareas con toda su info rellenada

    entries: [],
}

export const EntriesProvider = ({children}:Props) => {
    

    const [state, dispach] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const {enqueueSnackbar} = useSnackbar();

    const addNewEntry = async (description: string) =>{ //agregando nueva entrada con sus propiedades

            // const newEntry: Entry ={
            //     _id: uuidv4(),
            //     description: description,
            //     createdAt: Date.now(),
            //     status: 'pending'
            // }

            const {data} = await entriesApi.post<Entry>('/entries' , {description});  //traemos la info de data  y llamamos a la description

            dispach({type: 'Add-Entry', payload: data})  //enviamos la acción de agregar Entry
    }

    const updateEntry = async ( {_id, description, status}:Entry, showSnackbar= false) =>{  //actualizando las entradas
       
        try{
            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status}); // extramos info del api de tipo put
            dispach({type:'Entry-Update', payload: data})

            if(showSnackbar)
            enqueueSnackbar('Entrada Actualizada',{
                variant:'success',
                autoHideDuration: 1500,
                anchorOrigin:{
                    vertical: 'top',
                    horizontal:'right',
                }
            })
            
        } catch(error){
            console.log(error);
        }
    
    }

    const refrestEntries = async() =>{
            const {data} = await entriesApi.get('/entries')     //.get es una petición que solicita recursos de información
            dispach({type: 'Refresh-Data', payload: data})
        
    }
    useEffect(() => {  //sirve para disparar eventos o mejor dicho efectos secundarios
        refrestEntries();
        
    }, [])

    const deleteEntry = async(entry:Entry, showSnackbar= false)=>{
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${ entry._id }` )
 
            dispach({
                type: 'Delete-Data',
                payload: data
            })
 
            if( showSnackbar ) {
                enqueueSnackbar('Entrada borrada correctamente',{
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }
 
            
 
        } catch (error) {
            console.log({ error });
        }
    }

   
    

return (
        <EntriesContext.Provider value={{
            ...state,    //desplegando las propiedades de state
            //Methods
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}