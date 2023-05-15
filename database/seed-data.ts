
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string,
    status: string,
    createdAt: number
}

export const  seedData:SeedData = {
    entries: [
        {
            description: 'Pendientes - gaaaaaaaaaaaaa.',
            status:'pending',
            createdAt:Date.now(),
        },
        {
            description: 'En proceso - Raaaaaaaaaaaaaaaaa.',
            status:'in-progress',
            createdAt:Date.now() - 1000000,
        },
        {
            description: 'Completadas - zzZzZzZzZzZ.',
            status:'finish',
            createdAt:Date.now() - 100000,
        },
    ]
}