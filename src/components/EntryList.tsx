import {Paper,List} from '@mui/material'
import { EntryCard } from './EntryCard'
import { FC, useMemo, DragEvent, useContext } from 'react';
import { entry, entryStatus } from '@/Interfaces/EntrisInterfaces' 
import { UIContext } from '@/Context/UI/UIContext'
import { EntriesContext } from '@/Context/Entries/EntriesContext';

interface props{
    status:entryStatus
    entries:entry[]
}

export const EntryList:FC<props> = ({status,entries}) => {
  
    const {isDragging,onStopDragging}=useContext(UIContext);

    const {onChangeStatus}=useContext(EntriesContext);

    const entrysByFilter=useMemo(()=>(
        entries.filter(ent=>ent.status===status)
    ),[entries])
  
    const allowDrop=(evento:DragEvent<HTMLDivElement>)=>{
        evento.preventDefault();
    }

    const onDropEntry=(evento:DragEvent<HTMLDivElement>)=>{
        const id=evento.dataTransfer.getData('text/plain')
        onChangeStatus(id,status);
        onStopDragging();
    }

    return (
    <div onDragOver={allowDrop} onDrop={onDropEntry}>
        <Paper sx={{height:'calc(100vh - 200px)',overflow:'scroll'
            ,backgroundColor:'transparent','&::-webkit-scrollbar': { display: 'none' },padding:'1px 5px'}}>
             <List sx={{opacity: isDragging ? 0.3 : 1,transition:'all .3s'}}>
                {
                    entrysByFilter.map(ent=>{
                        return  <EntryCard key={ent._id} _id={ent._id} description={ent.description} 
                        createdAt={ent.createdAt} status={ent.status}/> 
                    })
                }
             </List>
        </Paper>
    </div>
  )
}
