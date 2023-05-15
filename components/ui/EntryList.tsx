import { List, Paper } from "@mui/material"
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { useContext, useEffect, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';
import {DragEvent} from 'react';
import { UIContext } from "@/context/ui";
import styles from './EntryList.module.css';

interface Props{
    status: EntryStatus
}

export const EntryList = ({status}:Props) =>{ 

    
    
    const {entries, updateEntry} = useContext(EntriesContext) //trayendo del EntriesContext su propiedad entries = Entry[]
    const { isDragging, endDragging} = useContext(UIContext);
    const EntriesByStatus = useMemo( () => entries.filter(entry => entry.status === status), [entries])

    const allowDrop = (event:DragEvent) =>{
        event.preventDefault();
    }

    const onDropEntry = (event:DragEvent) =>{
        const id = event.dataTransfer.getData('text');
        
        const entry = entries.find( entrada =>entrada._id === id)!; //el .find busca las entradas que en esta caso esta buscando al id
            entry.status = status; // el status que estoy recibiendo de la propertis que me dicen su estoy en pendiente, en proceso o completado
        updateEntry(entry); //encuentra al id y luego llamaamos a la función de actualizar 
        endDragging();
    }

    return(
        //TODO: aquí haremos drop
        <div
            onDrop={onDropEntry}
            onDragOver={ allowDrop} //para especificar que allí esta cayendo algo
            className= {isDragging ? styles.draggin: ''} //condicionando si es true 
        > {/* el sx={{}} es para darle estilos */}   {/* padding: '1px 5px' */}   {/*  overflow: 'scroll', que es la barra para bajar y subir */}  
            <Paper sx = {{ height:'calc(100vh - 180px)', backgroundColor:`transparent` , overflow: 'auto' ,  padding:2 }}>

                {/* TODO: cambiará dependiendo si esta haciendo drag o no */}                 
                <List sx={{opacity: isDragging ? 0.2: 1, transition: 'all .3s'}}>
               {
                 EntriesByStatus.map(entry =>(
                    <EntryCard key={entry._id } entry={entry}/>
                 ))
               }
                </List>
            </Paper>
        </div>
    )
}