import { NextApiRequest,NextApiResponse } from "next";
import EntryModel,{IEntry} from "@/Models/Entry";
import { connectMongo,disconnectMongose } from "@/Database/Db";
import mongoose from "mongoose";

type Data={
    ok:boolean,
    entry?:IEntry,
    message?:string    
}

export default async function Handler(req:NextApiRequest,res:NextApiResponse<Data>){

    const {id:_id}=req.query;

        if(!mongoose.isValidObjectId(_id)){
            return res.status(400).json({
                ok:false,
                message:`El id ${_id} no es valido`
            })
        };

        switch(req.method){
            case 'PUT':
                return UpdateStatus(req,res)
            
            case 'GET':
                return getEntry(req,res)

            default:
                return res.status(400).json({
                    ok:false,
                    message:'Este metodo no existe'
                })

        }
}


const getEntry=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{

    const {id}=req.query;

    try{

        await connectMongo();


        const entry=await EntryModel.findById(id);

        if(!entry){
            return res.status(400).json({
                ok:false,
                message:'No existe esta entrada'
            });
        };


        await disconnectMongose();

        return res.status(200).json({
            ok:true,
            entry
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }


}

const UpdateStatus=async(req:NextApiRequest,res:NextApiResponse<Data>)=>{


    const {id:_id}=req.query;

    try{

        await connectMongo();

        const entry=await EntryModel.findById<IEntry>(_id).exec();


        if(!entry){
            return res.status(400).json({
                ok:false,
                message:'No existe esta entrada'
            })
        };

        const {
            description=entry.description,
            status=entry.status

        }=req.body;


        const newEntryUpdated=await EntryModel.findByIdAndUpdate<IEntry>(_id,{description,status},{runValidators:true,new:true});

        await disconnectMongose();

        return res.status(200).json({
            ok:true,
            entry:newEntryUpdated as IEntry
        });

    }catch(error){
        await disconnectMongose();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}