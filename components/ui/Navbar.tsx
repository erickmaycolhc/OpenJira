import { useContext, useEffect } from 'react';
import { AppBar, Toolbar, IconButton } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Typography from '@mui/material/Typography';
import { UIContext } from "@/context/ui";
import NextLink from 'next/link';
import Link from 'next/link';


export const Navbar =()=>{

    const { openSideMenu } = useContext(UIContext);



    return (
        <AppBar position="sticky" >
            <Toolbar>
                <IconButton
                 size='large'
                 edge='start'
                 onClick={openSideMenu}>
                    
                <MenuOutlinedIcon/>
                </IconButton>
                <Link    // esta es una mejor solución
                href="/"
                style={{ color: 'inherit', textDecoration: 'none' }}
                >
                <Typography variant="h6">OpenJira</Typography>
                </Link>
                {/* <NextLink href='/' passHref>  //utilizando NextLink y Link pero ya no funciona
                <Link underline='none' color= 'white'>
                <Typography variant='h6'>OpenJira</Typography>
                </Link>
                </NextLink> */}
            </Toolbar>
        </AppBar>
    )

}