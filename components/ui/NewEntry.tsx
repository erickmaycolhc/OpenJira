import {Box, Button, TextField} from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';



export const NewEntry = () =>{
    
    const {addNewEntry} = useContext(EntriesContext)

    const {isAddingEntry , setIsAddingEntry} = useContext(UIContext)


    const [ inputValue, setInputValue] = useState('');
    
    const [ touched, setTouched] = useState(false); // touched es cuando ya lo preciona y cuando esta en false ya no

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value);
        
    }

    const onSave = () =>{
        
        if (inputValue.length <= 0 ) return
        // console.log({inputValue}); 
        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

    return (

        <Box sx={{marginBottom: 2, paddingX:2}}>
            
            {
                isAddingEntry //creamos una condición donde si isAddingEntry es verdaderos entonces me retorne la opción de agregar tarea 
                ? (
                    <>
                        <TextField
                            fullWidth // ocupe todo el espacio
                            sx={{marginTop: 2, marginBottom: 1}}
                            placeholder= 'Nueva entrada' // agregar un string de ayuda en el campo
                            autoFocus // recibe el enfoque y el cursor se colocará automaticamente en ese formulario
                            multiline // permite la escritura con multiples lineas
                            label='Nueva entrada'
                            helperText= {inputValue.length <= 0 && touched && 'Ingrese un valor'} //un string de ayuda en la parte de abajo
                            error = {inputValue.length <= 0 && touched}
                            value= {inputValue}
                            onChange={onTextFieldChanged} // es un evento para detectar cambios en los elementos de formulario y ejecutar una acción en respuesta a esos cambios
                            onBlur= {()=> setTouched(true)}
                        />

                        <Box display= 'flex' justifyContent= 'space-between'>

                        <Button 
                        variant= 'text' // variant se utiliza para especificar la variante que se aplicará al componente
                        onClick= {()=>setIsAddingEntry(false)} //cuando la función esta en false el boton cancelar no habré el campo de agregar tarea
                        >
                        Cancelar
                        </Button>

                        <Button 
                            variant= 'outlined'
                            color =  'secondary'
                            endIcon = {<SaveAsIcon/>} 
                            onClick = {onSave}
                        >
                        Guardar
                        </Button>

                            </Box> 
                        </>
                    ):(
                        <Button
                            startIcon= {<AddCircleOutlineIcon/>}
                            fullWidth
                            variant= 'outlined'
                            onClick={() => setIsAddingEntry(true)} //cuando la función esta en true el boton agregar tarea se habré el campo
                        >
                        Agregar Tarea
                        </Button>
                    )
            }

        </Box>
    )
}

