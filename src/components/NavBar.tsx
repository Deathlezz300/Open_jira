import {AppBar,Toolbar,IconButton, Typography,Link} from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {useContext} from 'react'
import { UIContext } from '@/Context/UI/UIContext';
import NextLink from 'next/link';

export const NavBar = () => {

  const {changeState}=useContext(UIContext);

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton onClick={changeState}>
                <MenuOutlinedIcon/>
            </IconButton>
              <Link underline='none' href='/' component={NextLink} color="white" style={{textDecoration:'none'}}>
                <Typography variant='h6'>OpenJira</Typography>
              </Link>
        </Toolbar>
    </AppBar>
  )
}
