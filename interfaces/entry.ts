export interface Entry {  //los tipos de propiedades
    _id: string,
    description: string,
    createdAt: number,
    status: EntryStatus  // status puede recibir una de estos 3 estados 'pending' | 'in-progress' | 'finish'
}

export type EntryStatus = 'pending' | 'in-progress' | 'finish';