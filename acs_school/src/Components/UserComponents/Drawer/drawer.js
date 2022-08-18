import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Box,
    ListItemIcon,
    Typography,
}
    from '@material-ui/core';
import {
    Menu as MenuIcon,
    AccountCircle as Account,
}
    from '@material-ui/icons';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import DirectionsRailwayFilledIcon from '@mui/icons-material/DirectionsRailwayFilled';
import SchoolIcon from '@mui/icons-material/School';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useStyles } from './drawer.style.js';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'

const StyledSelected = withStyles((theme) => ({
    root: {
        '&.Mui-selected': {
            backgroundColor: '#3498db1a',
            color: theme.palette.primary.main,
            '& span': {
                fontWeight: 600,
            }
        }
    },
}))(MenuItem)

export function DrawerPro(props) {

    const navigate = useNavigate()

    const ListItems = [
        { Icon: HomeIcon, text: 'Home', url: '/' },
        { Icon: InfoIcon, text: 'About Us', url: '/about' },
        { Icon: ContactsIcon, text: 'Contact Us', url: '/contact' },
        { divider: true },
        { Icon: DirectionsRailwayFilledIcon, text: "ACS's Way", url: '/' },
        { Icon: SchoolIcon, text: 'Academic', url: '/' },
        { Icon: PeopleAltIcon, text: 'Student Life', url: '/student-life' },
        { Icon: ViewAgendaIcon, text: 'Agenda', url: '/agenda' },
        { Icon: OnlinePredictionIcon, text: 'Courses Online', url: '/' },
        { divider: true },
    ]
    const LinkLog = [
        { Icon: LoginIcon, text: 'LogIn', url: '/login' },
        { Icon: LogoutIcon, text: 'LogOut', url: '/' },
    ]
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleClick = () => {
        setOpen(true)
    }

    return (
        <Box>
            <IconButton
                size="medium"
                edge="start"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                className={classes.iconMenu}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={open}
                anchor='left'
                onClose={handleClose}
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
            >

                <div className={classes.userStatus}>
                    <Account className={classes.userIcon} />
                    <div className={classes.userTitle}>
                        <Typography component='h3' color='textPrimary'>
                            ACS
                        </Typography>
                        <Typography component='p' color='textPrimary'>
                            acs.akroum@gmail.com
                        </Typography>
                    </div>
                </div>
                <Divider />
                {/* <Box sx={{ margin: '10px' }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </Box> */}
                <List>

                    {ListItems.map(({ Icon, text, url, divider }, index) => (
                        divider ?
                            <Divider key={index} /> :
                            <StyledSelected button key={text} selected={text === props.active} onClick={() => navigate(url)} >
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography style={{ fontFamily: 'Palatino Linotype' }}>{text}</Typography>
                                </ListItemText>
                            </StyledSelected>
                    ))}
                </List>
                <List className={classes.iconLog}>
                    {LinkLog.map(({ Icon, text, url }) => (
                        <ListItem button key={text} onClick={() => navigate(url)}>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography style={{ fontFamily: 'Palatino Linotype' }}>{text}</Typography>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    )
}