interface SeedData{
    entries:SeedEntry[]
}


interface SeedEntry{
    description:string,
    status:string,
    createdAt:number
}

export const seedData:SeedData={
    entries:[
        {
            description:'Texto uno de prueba efectivamente',
            status:'pending',
            createdAt:Date.now()
        },
        {   
            description:'Texto 2 de prueba nokas',
            status:'in-progress',
            createdAt:Date.now()
        },
        {   
            description:'Texto 3 de prueba sisas nokas',
            status:'finished',
            createdAt:Date.now()
        }
    ]
}