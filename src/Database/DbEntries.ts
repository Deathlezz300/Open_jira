import { isValidObjectId } from "mongoose"
import { connectMongo, disconnectMongose } from "./Db";
import EntryModel, { IEntry } from "@/Models/Entry";

export const GetEntryById=async(id:string):Promise<IEntry | null>=>{

    if(!isValidObjectId(id)){
        return null;
    }

    await connectMongo();


    const entry=await EntryModel.findById(id).lean();

    await disconnectMongose();

    //Serializar la data que me regrese el objectId
    return JSON.parse(JSON.stringify(entry));

}