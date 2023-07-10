import { EntryActionType } from "@/Context/Entries/EntriesReducer";
import { entry, entryStatus } from "@/Interfaces/EntrisInterfaces";
import entriesApi from "@/api/entriesApi";

type peticion={
    ok:boolean,
    entries?:entry[],
    entry?:entry
}

  export  const onLoadEntries=async()=>{


        try{
            const {data}=await entriesApi.get<peticion>('/entries');
            const action:EntryActionType={
                type:'set-entries',
                payload:data.entries as entry[]
            }

            return action;

        }catch(error){
            console.log(error);
        }

    }

export const onAddEntry=async(entrada:entry)=>{

    try{
        const {data}=await entriesApi.post<peticion>('/entries',entrada);
        const action:EntryActionType={
            type:'entry-add',
            payload:data.entry as entry
        }

        return action

    }catch(error){
        console.log(error);
    }

}

export const UpdateStatus=async(_id:string,status:entryStatus)=>{

    try{

        const {data}=await entriesApi.put<peticion>(`/entries/${_id}`,{status});

        return data.ok;

    }catch(error){
        console.log(error)
    }
}

export const UpdateEntry=async(entry:entry):Promise<entry | null>=>{
    try{

        console.log(entry);

        const {data}= await entriesApi.put<peticion>(`/entries/${entry._id}`,{...entry});

        return data.entry as entry;


    }catch(error){
        console.log(error);

        return null;

    }
}

