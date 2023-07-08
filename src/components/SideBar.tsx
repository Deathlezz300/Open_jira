import {Drawer,Box, Typography,List,ListItem,ListItemIcon, ListItemText, Divider} from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import {useContext} from 'react'
import { UIContext } from '@/Context/UI/UIContext';

const MenuItems=['Inbox','Starred','Send Email','Drafts']

export const SideBar = () => {

  const {sideMenuOpen,changeState}=useContext(UIContext);

  return (
    <Drawer anchor='left' open={sideMenuOpen} onClose={changeState}>
        <Box sx={{width:250}}>
            <Box sx={{padding:'5px 10px'}}>
                <Typography variant='h4'>Menú</Typography>
            </Box>
            <List>
                {
                    MenuItems.map((text,index)=>(
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlinedIcon/> : <MailOutlinedIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))
                }
            </List>
            <Divider/>
            <List>
                {
                    MenuItems.map((text,index)=>(
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlinedIcon/> : <MailOutlinedIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))
                }
            </List>
        </Box>        
    </Drawer>
  )
}
