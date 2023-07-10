import { NavBar } from '@/components/NavBar'
import { SideBar } from '@/components/SideBar'
import { Box } from '@mui/material'
import Head from 'next/head'
import {FC} from 'react'

interface props{
    children:JSX.Element | JSX.Element[],
    title?:string
}

export const Layout:FC<props> = ({children,title='OpenJira'}) => {
  return (
    <Box sx={{flexFlow:1}}>
        <Head>
            <title>{title}</title>
        </Head>
          <NavBar/>
          <SideBar/>
        <Box sx={{padding:'10px 20px'}}>
            {children}
        </Box>
    </Box>
  )
}
