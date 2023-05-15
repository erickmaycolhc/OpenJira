import { grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const DarkTheme = createTheme({  //constante para cambiar de tema a oscuro
  palette:{
    mode: 'dark',

    secondary:   {
      main: '#19857b'
    },
    error:{
      main: red.A400
    },
    
  },
    components:{
      MuiAppBar:{
        defaultProps:{},
        styleOverrides:{
          root:{
            backgroundColor:'#4a148c'
          }
        }
      }
    }
  });