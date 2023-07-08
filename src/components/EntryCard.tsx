import { entry } from '@/Interfaces/EntrisInterfaces'
import {Card,CardActions,CardActionArea,CardContent,Typography} from '@mui/material'
import {FC,DragEvent, useContext} from 'react'
import { UIContext } from '@/Context/UI/UIContext'

export const EntryCard:FC<entry> = ({_id,description,status,createdAt}) => {
  
  const {ChangeDragging,onStopDragging}=useContext(UIContext);

  const onDragStart=(event:DragEvent)=>{
    event.dataTransfer.clearData();
    event.dataTransfer.setData('text/plain',_id);
    ChangeDragging();
  }


  const onDragEnd=()=>{
    onStopDragging();
  }
  
  return (
    <Card sx={{marginBottom:1}} draggable 
      onDragStart={onDragStart} onDragEnd={onDragEnd} >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:'pre-line'}}>{description}</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'end',paddingRight:2}}>
                <Typography variant='body2'>{'no'}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
