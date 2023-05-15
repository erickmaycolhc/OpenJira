import mongoose from "mongoose";


/*
*  0 = disconnected
*  1 = connected
*  2 = connecting
*  3 = disconnecting
*/

const mongoConnection = {
    isConnected: 0
}
//                 viendo estado de connection                         //
export const connect = async () => { // función asycn es cuando estoy pasando información DB y await
                                    // constante conectado

    if(mongoConnection.isConnected){
        console.log('ya estabamos conectados');
        return; 
    }

    if(mongoose.Connection.length > 0 ){
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if(mongoConnection.isConnected === 1){
            console.log('Usando conexión anterior')
            return;
        }
        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || ''); //cuando se utiliza "await" con una promesa, la función no continúa su ejecución hasta que la promesa se resuelve o rechaza. 
    mongoConnection.isConnected = 1
    console.log('conectado a MongoDB', process.env.MONGO_URL || '');

}



export const disconnect = async() =>{

    if(process.env.NODE_ENV === 'development') return;

    if(mongoConnection.isConnected === 0)return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Desconectado de MongoDB')
}