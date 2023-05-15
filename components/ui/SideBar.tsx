import {useContext} from 'react';
import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { UIContext } from '../../context/ui';


const menuItems:string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']


export const SideBar =()=>{

    const { sidemenuOpen, closeSideMenu} = useContext(UIContext);


    return (
        <Drawer // Drawer se puede utilizar para mostrar menús de navegación, filtros, paneles de configuración, entre otros elementos.
            anchor='left'
            open={sidemenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{width:250}}>   {/* box es un contenedor de
                elementos y proporciona opciones de diseño y estilo y duseño */}
                <Box sx={{padding: '5px 10px'}}>
                    <Typography variant='h4'>Menú</Typography> {/* Typography proporciona
                     opciones de estilo , diseño, tamaño, etc para el texto*/}
                </Box>

                <List> {/* List puede ser utilizado para mostrar una lista de elementos
                 como texto, imágenes, iconos, u otros componentes personalizados.*/}
                    {
                        menuItems.map((text,index)=>(
                            <ListItem button key={text}> 
                                <ListItemIcon>

                                    {index % 2 ? <InboxIcon/>:<MailIcon/>} 

                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))
                    }

                </List>

                <Divider/>
                <List>  
                    {
                        menuItems.map((text,index)=>(
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon/>:<MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))
                    }

                </List>
            </Box>
            
        </Drawer>
    )
     
    
}