import { createContext } from 'react';


interface ContextProps{
   sidemenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;

   openSideMenu: () => void;
   closeSideMenu: () => void;
   setIsAddingEntry: (isAdding: boolean) => void
   startDragging: () => void
   endDragging: () => void

   //metodos
}


export const UIContext = createContext({} as ContextProps );