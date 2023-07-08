import {AppBar,Toolbar,IconButton, Typography} from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {useContext} from 'react'
import { UIContext } from '@/Context/UI/UIContext';

export const NavBar = () => {

  const {changeState}=useContext(UIContext);

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton onClick={changeState}>
                <MenuOutlinedIcon/>
            </IconButton>
            <Typography variant='h6'>OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}
