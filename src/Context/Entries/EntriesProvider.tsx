import { FC, useReducer } from 'react';
import { EntriesContext } from './EntriesContext';
import { EntryActionType, entriesReducer } from './EntriesReducer';
import { entry, entryStatus } from '@/Interfaces/EntrisInterfaces';
import entriesApi from '@/api/entriesApi';
import { UpdateStatus, onAddEntry, onLoadEntries,UpdateEntry } from '@/Helpers/Entries';

export interface entries {
  entries:entry[]
}

const _INITIAL_STATE: entries = {
  entries:[]
}

interface props{
    children:JSX.Element | JSX.Element[]
}


export const EntriesProvider: FC<props> = ({ children }) => {
  
    const [state, dispatch] = useReducer(entriesReducer,_INITIAL_STATE);



    const AddEntry=async(entrada:entry)=>{
        const action=await onAddEntry(entrada) as EntryActionType;
        dispatch(action);
    }

    const onChangeStatus=async(id:string,status:entryStatus)=>{
      const action:EntryActionType={
        type:'update-entry',
        payload:{
          id,
          status
        }
      }
      const resp=await UpdateStatus(id,status) as boolean;
      if(resp){
        dispatch(action);
      }
    }

    const OnUpdateEntry=async(entry:entry)=>{

      const entrada=await UpdateEntry(entry);

      if(entrada){
        const action:EntryActionType={
          type:'change-entry',
          payload:entrada
        }
        dispatch(action);
      }

    }

    const refreshEntries=async()=>{
          const action=await onLoadEntries() as EntryActionType;
          dispatch(action);    
    }




  return (
    <EntriesContext.Provider value={{...state,AddEntry,onChangeStatus,refreshEntries,OnUpdateEntry}}>
      {children}
    </EntriesContext.Provider>
  );
};