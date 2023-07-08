import { NextApiRequest,NextApiResponse } from "next";
import { connectMongo,disconnectMongose } from "@/Database/Db";
import EntryModel, { IEntry } from "@/Models/Entry";


type Data={
    ok:boolean,
    entries?:IEntry[]
    message?:string
    entry?:IEntry
}

export default  function Handler(req:NextApiRequest,res:NextApiResponse<Data>){

    switch(req.method){
        case 'GET':
            return getEntries(res)

        case 'POST':
            return saveEntry(req,res)

        default:
            return res.status(400).json({ok:false,message:'Endpoint no existe'})
    }


}


const getEntries=async(res:NextApiResponse<Data>)=>{

    try{

        await connectMongo();

        const entries=await EntryModel.find().sort({createdAt:'ascending'});

        await disconnectMongose();

        return res.status(200).json({
            ok:true,
            entries
        })

    }catch(error){
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}

const saveEntry=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{


    try{

        await connectMongo();

        const Entry=new EntryModel(req.body);
        await Entry.save()

        return res.status(201).json({
            ok:true,
            entry:Entry
        });

    }catch(error){
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

};
