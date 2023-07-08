import {Box, Button,TextField} from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {useState,useContext} from 'react'
import { useForm } from '@/Hooks/useForm';
import { entry } from '@/Interfaces/EntrisInterfaces';
import { EntriesContext } from '@/Context/Entries/EntriesContext';
import { UIContext } from '@/Context/UI/UIContext';
import entriesApi from '@/api/entriesApi';

const initalState={
    description:''
}

export const NewEntry = () => {


    const [formUpload,setFormUpload]=useState<boolean>(false);

    const {description,onInputChange,onResetForm}=useForm(initalState);

    const {AddEntry}=useContext(EntriesContext);

    const {isAdding,ChangeAdding}=useContext(UIContext);



    const onAddForm=async()=>{
        setFormUpload(true);
        if(description.length>0){
            const Entry:entry={
                status:'pending',
                description,
                createdAt:Date.now()
            }
            AddEntry(Entry);
            onResetForm();
            ChangeAdding();
        }
    }

  return (
    <Box sx={{marginBottom:2,paddingX:1}}>
        {

           !isAdding ? <Button fullWidth variant='outlined' onClick={ChangeAdding} startIcon={<AddCircleOutlinedIcon/>}>
                    Agregar tarea
                </Button>
            :
            <>
                <TextField fullWidth sx={{marginTop:2,marginBottom:1} }
                placeholder='Nueva entrada' autoFocus multiline label="Nueva entrada"
                helperText="Ingrese un valor" name='description' value={description} onChange={onInputChange} error={description.length<=0 && formUpload ? true : false}/>

                <Box display='flex' justifyContent='space-between'>
                    <Button variant='text' onClick={ChangeAdding}>Cancelar</Button>
                    <Button onClick={onAddForm} variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon/>}>
                        Guardar
                    </Button>
                </Box>
            </>

        }

    </Box>
  )
}
