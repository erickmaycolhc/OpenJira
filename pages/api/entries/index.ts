
import { NextApiRequest, NextApiResponse} from 'next';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';


type Data =        //definición de tipo
   |{message: string} //puede lucir de esta manera la respuesta 
   | IEntry[]         // o también puede lucir de esta manera 
   | IEntry
      
  

export default function handler(  req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':  // para select data
            return getEntries(res);

        case 'POST': // para crear data
            return postEntries(req, res);
        
        case 'PUT': // para actualizar data
            return postEntries(req, res);

        default: 
            return res.status(400).json({message: 'Endpoint no existe'});
        
                 
    }
}
  

const getEntries = async (res: NextApiResponse<Data>) =>{

    await db.connect();                         //nos conectamos
    const entries = await Entry.find().sort({createdAt: 'ascending'})  // obtuvimos todas las entradas
    await db.disconnect();   //luego nos desconectamos

    res.status(200).json(entries);  //y traimos la respuesta 
}

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data> )=>{
    const {description = ''} = req.body;

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    });
    
   
    try{
        await db.connect();
        await newEntry.save();
        await db.disconnect();

        return res.status(201).json(newEntry);

    } catch (error){
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });
    }


}
