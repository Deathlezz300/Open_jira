import type { NextApiRequest, NextApiResponse } from 'next'
import { connectMongo, disconnectMongose } from '@/Database/Db'
import EntryModel from '@/Models/Entry'
import { seedData } from '@/Database/seed-data'

type Data = {
  mensaje:string
}

export default async function handler(req:NextApiRequest,res:NextApiResponse<Data>){
    
    if(process.env.NODE_ENV==='production'){
        return res.status(401).json({mensaje:'No tiene acceso a este servicio'})
    }

    await connectMongo();

    await EntryModel.deleteMany();

    await EntryModel.insertMany(seedData.entries);

    await disconnectMongose();

    res.status(200).json({mensaje:'Proceso realizado correctamente'})

}