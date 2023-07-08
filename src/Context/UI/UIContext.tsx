import {createContext} from 'react'

 interface ContextProps{
    sideMenuOpen:boolean,
    isAdding:boolean,
    isDragging:boolean,
    ChangeDragging:()=>void,
    ChangeAdding:()=>void,
    changeState:()=>void,
    onStopDragging:()=>void
}

export const UIContext=createContext({} as ContextProps);