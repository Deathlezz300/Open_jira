import { entry, entryStatus } from '@/Interfaces/EntrisInterfaces'
import {createContext} from 'react'

interface entries{
    entries:entry[],
    AddEntry:(entrada:entry)=>void,
    onChangeStatus:(id:string,status:entryStatus)=>void
}

export const EntriesContext=createContext({} as entries)