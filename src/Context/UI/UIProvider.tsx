import React,{FC} from 'react'
import { UIContext } from './UIContext'
import { useState } from 'react'


interface props{
    children:JSX.Element[] | JSX.Element
}

export const UIProvider:FC<props> = ({children}) => {

    const [sideMenuOpen,SetSideMenuOpen]=useState<boolean>(false);
    const [isAdding,SetIsAdding]=useState<boolean>(false);
    const [isDragging,SetDragging]=useState<boolean>(false);

    const changeState=()=>{
        SetSideMenuOpen(!sideMenuOpen);
    }

    const ChangeAdding=()=>{
      SetIsAdding(!isAdding);
    }

    const ChangeDragging=()=>{
      SetDragging(true);
    }

    const onStopDragging=()=>{
      SetDragging(false);
    }

  return (
    <UIContext.Provider value={{sideMenuOpen,changeState,isAdding,ChangeAdding,isDragging,ChangeDragging,onStopDragging}}>
        {children}
    </UIContext.Provider>
  )
}
