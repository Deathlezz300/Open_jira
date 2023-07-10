import { entry } from '@/Interfaces/EntrisInterfaces'
import {Card,CardActions,CardActionArea,CardContent,Typography} from '@mui/material'
import {FC,DragEvent, useContext} from 'react'
import { UIContext } from '@/Context/UI/UIContext'
import { useRouter } from 'next/router'
import { GetFormatTiem } from '@/Helpers/DateFunction'

export const EntryCard:FC<entry> = ({_id,description,status,createdAt}) => {
  
  const {ChangeDragging,onStopDragging}=useContext(UIContext);

  const router=useRouter();

  const onDragStart=(event:DragEvent)=>{
    event.dataTransfer.clearData();
    event.dataTransfer.setData('text/plain',_id as string);
    ChangeDragging();
  }


  const onDragEnd=()=>{
    onStopDragging();
  }

  const onClickNavigate=()=>{
    router.push(`/entries/${_id}`);
  }
  
  return (
    <Card onClick={onClickNavigate} sx={{marginBottom:1}} draggable 
      onDragStart={onDragStart} onDragEnd={onDragEnd} >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:'pre-line'}}>{description}</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'end',paddingRight:2}}>
                <Typography variant='body2'>{GetFormatTiem(createdAt)}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
