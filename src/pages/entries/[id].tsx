import { Layout } from "@/layouts/Layout";
import {Grid,Card,CardHeader,FormLabel,CardContent,
    TextField,CardActions,Button,FormControl,RadioGroup,FormControlLabel,Radio,capitalize,IconButton} from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { entry, entryStatus } from "@/Interfaces/EntrisInterfaces";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useForm } from "@/Hooks/useForm";
import { GetServerSideProps } from 'next'
import {FC,useContext} from 'react'
import { GetEntryById } from "@/Database/DbEntries";
import { EntriesContext } from "@/Context/Entries/EntriesContext";
import { useRouter } from "next/router";
import { GetFormatTiem } from "@/Helpers/DateFunction";

const validaStatus:entryStatus[]=['pending','in-progress','finished'];



interface props{
    entry:entry
}

const EntryPage:FC<props>=({entry})=>{

    const router=useRouter();

    const {input,status,onInputChange}=useForm({input:entry.description,status:entry.status});

    const {OnUpdateEntry}=useContext(EntriesContext)

    const onUpdateEntry=()=>{
        if(input.length>0 && status.length>0){
            OnUpdateEntry({
                _id:entry._id,
                description:input,
                status,
                createdAt:entry.createdAt
            });
        }

        router.push('/');
    }

    return (
        <Layout title={input.substring(0,10)+'...'}>
            <Grid container justifyContent='center' sx={{marginTop:2}}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada:${input}`}
                            subheader={`Creada hace :${GetFormatTiem(entry.createdAt)}`}/>

                        <CardContent>
                            <TextField sx={{marginTop:2,marginBottom:1}}
                                fullWidth placeholder="Actualizar entrada" name="input" value={input} onChange={onInputChange}
                                multiline label="Actualizar entrada" autoFocus/>
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup name="status" value={status} onChange={onInputChange} row>
                                    {
                                        validaStatus.map(option=>{
                                            return <FormControlLabel label={capitalize(option)} value={option} control={<Radio/>} key={option}/>
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon/>}
                                variant="contained"
                                fullWidth
                                onClick={onUpdateEntry}
                                disabled={input.length<=0 ? true : false}>Save</Button>
                        </CardActions>
                    </Card>   
                </Grid>
            </Grid>
            
            <IconButton sx={{
                position:'fixed',
                bottom:30,
                right:30,
                backgroundColor:'error.dark'
            }}>
                <DeleteOutlinedIcon/>
            </IconButton>

        </Layout>
    )
}


//Esto se debe usar unicamente si se necesita pre renderizar una pagina que necesita data en tiempo real


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const {id}=params as {id:string};

    const entry=await GetEntryById(id);

    if(!entry){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;