import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  //validando dos posibles respuestas
| {message:string}
| IEntry

export default function handler(  req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id} = req.query;   //desestructuramos el id 

    if(!mongoose.isValidObjectId(id)){ //si el objeto id no es valido  que me returne el mensaje
        return res.status(400).json({message:'El id no es valido' + id})
    }

    switch(req.method){  // si es de tipo de put que me retorne los datos
        case 'PUT': 
            return updateEntry( req, res); 
        case 'GET':
            return getEntry(req, res);
        case 'DELETE':
            return deleteEntry(req, res);
        
        default:
            return res.status(400).json({message:'Método no existe'})
    }

}

const getEntry = async (req:NextApiRequest, res:NextApiResponse) => {
    const {id} = req.query;


    await db.connect(); // nos conectamos
    const entryToGet = await Entry.findById(id);
    await db.disconnect();
    if( !entryToGet){ // condición para desconectarnos 
  
        return res.status(400).json({message: 'No hay entrada con ese id' + id});
    }

   
    return res.status(200).json(entryToGet);
    
}

const updateEntry = async( req:NextApiRequest, res:NextApiResponse<Data>) => {

    const {id} = req.query;
    await db.connect(); // nos conectamos


    const EntryToUpdate = await Entry.findById(id);

    if( !EntryToUpdate){ // condición para desconectarnos 
        await db.disconnect();
        return res.status(400).json({message: 'No hay entrada con ese id' + id});
    }

    const {
        description = EntryToUpdate.description,
        status = EntryToUpdate.status,
    } = req.body;


    try{
        const updateEntry = await Entry.findByIdAndUpdate(id, {description, status},{runValidators:true, new: true});
        await db.disconnect
        res.status(200).json(updateEntry!);
        
    } catch(error:any){
        await db.disconnect
        res.status(400).json({message: error.errors.status.message});
    }

    
}

const deleteEntry = async(req:NextApiRequest, res:NextApiResponse<Data>) =>{
    const {id} = req.query;

    await db.connect();

    const entryDBDelete = await Entry.findByIdAndDelete(id);
    await db.disconnect();

    if(!entryDBDelete){
        return res.status(400).json({message: 'No hay entrada con ese id'+ id})
    }
    return res.status(200).json(entryDBDelete);
}


