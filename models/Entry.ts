import { Entry } from "@/interfaces";
import mongoose, { Model, Schema} from "mongoose";

export interface IEntry extends Entry{}   //extends es para añadir los tipos de Entry a Ientry

const entrySchema = new Schema({   // propiedades que tendrá en el mongo
    description: {type: String, required: true},
    createdAt: {type: Number, required: true},
    status: {
        type: String,
        enum: {
                 values: ['pending', 'in-progress', 'finish'],
                 message: '{VALUE} no es un estado permitido'
             },
             default: 'pending',
    }
    
}); 



const EntryModels:Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModels;