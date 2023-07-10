import type { NextPage } from "next"
import {Card, CardContent, CardHeader, Grid, Typography} from '@mui/material'
import { Layout } from "@/layouts/Layout"
import { EntryList } from "@/components/EntryList"
import { useContext,useEffect } from 'react';
import { EntriesContext } from "@/Context/Entries/EntriesContext";
import { NewEntry } from "@/components/NewEntry";

const HomePage:NextPage=()=>{

  const {entries,refreshEntries}=useContext(EntriesContext);
  
  useEffect(()=>{
    refreshEntries();
  },[])


  return (
    <Layout title="Home-OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
            <Card sx={{height:'calc(100vh - 100px)'}}>
             <CardHeader title="Pendientes"/>
              <CardContent>
                <NewEntry/>
                <EntryList entries={entries} status={'pending'}/>
              </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Card sx={{height:'calc(100vh - 100px)'}}>
             <CardHeader title="En progreso"/>
             <CardContent>
                <EntryList entries={entries} status={'in-progress'}/>
              </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Card sx={{height:'calc(100vh - 100px)'}}>
             <CardHeader title="Completadas"/>
             <CardContent>
                <EntryList entries={entries} status={'finished'}/>
              </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage