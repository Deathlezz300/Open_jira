import { entry, entryStatus } from "@/Interfaces/EntrisInterfaces"
import { entries } from './EntriesProvider';

interface dataPayload{
    status:entryStatus,
    id:string
}

export type EntryActionType = 
    | { type: 'entry-add',payload:entry } 
    | { type: 'update-entry',payload:dataPayload }
    | {type:'set-entries',payload:entry[]}
    | {type:'change-entry',payload:entry}


export const entriesReducer = ( state: entries, action: EntryActionType ): entries => {

   switch (action?.type) {
      case 'entry-add':
         return {
            ...state,
            entries:[...state.entries,action.payload]
         }

      case 'set-entries':
         return {
            ...state,
            entries:action.payload
         }

      case 'update-entry':
          return {
             ...state,
             entries:state.entries.map(ent=>{
                 if(ent._id==action.payload.id){
                    return{
                        ...ent,
                        status:action.payload.status
                    }
                 }

                 return ent;
             })
           }

      case 'change-entry':
         return{
            ...state,
            entries:state.entries.map(ent=>{
               if(ent._id===action.payload._id){
                  return action.payload;
               }

               return ent;
            })
         }

       default:
          return state;
   }

}