import { ChangeEvent, useState, useMemo, useContext } from 'react';
import {GetServerSideProps} from 'next';
import { Layout } from "@/components/layouts";
import { capitalize, RadioGroup, FormLabel, FormControl, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControlLabel, Radio, IconButton} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Entry, EntryStatus } from "../../interfaces/entry";
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';
interface Props{
    entry: Entry
}
export const EntryPage = ({entry}:Props) => {

  const {updateEntry, deleteEntry} = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])
  // useMemo sirve para memorizar el resultado de una función y retornar ese resultado en el futuro siempre y cuando las dependencias no hayan cambiado. 

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) =>{
    setInputValue(event.target.value);
    
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) =>{
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {
    if(inputValue.trim().length === 0) return;// si no hay ningun string que se desabilite el boton save
    const updatedEntry:Entry ={  //updatedEntry tiene que tener propiedades de tipo Entry
          ...entry, //desplegamos entry
          status,
          description:inputValue
      } 

    updateEntry(updatedEntry, true);

  }

  const onDelete = () =>{
      deleteEntry(entry,true)
  }


  const validStatus: EntryStatus[] = ["pending", "in-progress", "finish"];

  return (
    <>
      <Layout title={inputValue.substring(0,20) + '...'}>
        <Grid container justifyContent={"center"} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card
            sx={{
              position:"relative",
             
            }}
            >
              <CardHeader
                title={`Entrada:`}
                subheader={`Creada: ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
              
              />
                <IconButton
                  onClick={onDelete}
                  sx={{
                    position:"absolute",
                    marginBottom:'220px',
                    bottom: 30,
                    right: 30,
                    backgroundColor: "error.dark",
                  }}
                 >
                  <DeleteIcon />
                </IconButton>
            

              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth // para agarrar todo el espacio posible
                  placeholder="Nueva Entrada"
                  autoFocus
                  multiline
                  label="Nueva entrada"
                  value={inputValue}
                  onChange={onInputValueChanged}
                  helperText={isNotValid && 'Ingrese un valor'} // si no hay string en el campo que me aparezca la ayuda
                  onBlur={ () => setTouched(true)}
                  error = {isNotValid } //cambiar el color del input  cuando sea igual o menor 0 caracteres de string
                />

                <FormControl>
                  <FormLabel>Estado:</FormLabel>
                  <RadioGroup 
                  
                    row
                    value={status}
                    onChange={onStatusChanged}
                  >
                    {validStatus.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                      
                    ))}
                    
                  </RadioGroup>
                  
                </FormControl>
                
              </CardContent>

              <CardActions>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled = {inputValue.length <= 0} // si no hay string que me se desabilite la opci+on de guardar
                >
                  save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

      
      </Layout>
    </>
  );
};



export const getServerSideProps: GetServerSideProps = async ({params})=> {

  const {id} = params as {id:string};

  const entry = await dbEntries.getEntryById(id);


  if (!entry){ //si no tenemos un valor en la entrada entonces hace la redirección 
    return {
      redirect:{
        destination: '/',
        permanent:false, 
      }
    }
  }

  return {
    props:{
      entry
    }
  }
}



export default EntryPage;
