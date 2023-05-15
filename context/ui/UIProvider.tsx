import { ReactElement, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState{
        sidemenuOpen: boolean;
        isAddingEntry:boolean;
        isDragging: boolean;

}
interface prop{
        children: ReactElement
}

const UI_INITIAL_STATE: UIState ={
        sidemenuOpen: false,
        isAddingEntry: false,
        isDragging: false,
}

export const UIProvider = ({children}:prop) =>{

const [state, dispach] = useReducer(uiReducer, UI_INITIAL_STATE);

const openSideMenu= () =>{
        dispach({type: 'UI - Open Sibedar'}); // enviamos la opción de abrir menu
}

const closeSideMenu = () =>{
        dispach({type: 'UI - Close Sibedar'})// enviamos la opción de cerrar menu
}

const setIsAddingEntry = (isAdding:boolean) =>{

        dispach({type: 'UI - Set IsAddingEntry', payload: isAdding})

}

const startDragging = () => {
        dispach({type:'UI - Star Dragging'}) // dispatch es una función que se utiliza para enviar acciones a un store en Redux, lo que permite actualizar el estado de la aplicación de forma predecible y centralizada.
}
const endDragging = () => {
        dispach({type:'UI - End Dragging'})
}



        return(
                <UIContext.Provider value={{
                ...state,

                //metodos 
                openSideMenu,
                closeSideMenu,
                
                setIsAddingEntry,
                startDragging,
                endDragging,

                }}>

                {children}

                </UIContext.Provider>
        )
}