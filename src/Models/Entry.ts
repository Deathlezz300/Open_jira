import { entry, entryStatus } from '@/Interfaces/EntrisInterfaces';
import mongoose ,{Model,Schema,model} from 'mongoose'

export interface IEntry extends entry{
    
}

const entrySchema=new Schema({
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:['pending','in-progress','finished'],
            message:'{VALUE} no es un estado permitido'
        },
        default:'pending'
    }
});

const EntryModel:Model<IEntry> = mongoose.models.Entry || model('Entry',entrySchema);

export default EntryModel;
