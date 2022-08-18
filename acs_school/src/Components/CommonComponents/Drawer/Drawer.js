import React from 'react';
import { List, Drawer, Box, ListItem, ListItemIcon, Chip, ListItemText, Divider, IconButton, Typography } from '@material-ui/core';
import { useStyles } from './Drawer.Style'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { useNavigate } from 'react-router-dom';
import {
    Notifications as NotificationsIcon,
}
    from '@material-ui/icons';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import EventNoteIcon from '@mui/icons-material/EventNote';
import QuizIcon from '@mui/icons-material/Quiz';
import { NotificationContext } from '../../../Context/NotificationContext'
import {
    Menu as MenuIcon,
    AccountCircle as Account,
}
    from '@material-ui/icons';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout';
import global from '../../../global'
import { AuthContext } from '../../../Context/UserContext'

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

export function MobileDrawer(props) {

    const notificationContext = React.useContext(NotificationContext)

    const NewNotificationCount = notificationContext.filterNotification().length;

    const authUser = global.auth.user

    const AdminItems = [
        { divider: true },
        { Icons: HomeIcon, text: 'Home', url: '/admin' },
        { Icons: AdminPanelSettingsIcon, text: 'Personal Profile', url: '/admin/personal-profile' },
        { Icons: NotificationsIcon, text: 'Notifications', url: '/admin/notifications', label: NewNotificationCount },
        { divider: true },
        { Icons: GroupWorkIcon, text: 'Class-Course-Cycle', url: '/admin/class-course-cycle' },
        { Icons: HelpCenterIcon, text: 'Set Exam', url: '/admin/' },
        { divider: true },
        { Icons: HowToRegIcon, text: 'Registered students', url: '/admin/student-registered' },
        { Icons: PeopleAltIcon, text: 'Accounts', url: '/admin/accounts' },
        { Icons: SupervisorAccountIcon, text: 'Users', url: '/admin/users' },
        { Icons: ContactMailIcon, text: 'Sender Contact', url: '/admin/sender-contact' },
    ]

    const SupervisorItems = [
        { divider: true },
        { Icons: ViewAgendaIcon, text: 'Create Agenda', url: '/supervisor/create-agenda' },
        { Icons: EventNoteIcon, text: 'Show Agenda', url: '/supervisor/show-agenda' },
        { divider: true },
        { Icons: QuizIcon, text: 'Create Exam', url: '/supervisor/create-exam' },
    ]

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const classes = useStyles()

    const navigate = useNavigate()
    const authContext = React.useContext(AuthContext)
    const handleLogout = () => {
        authContext.handleAuth(false)
    }

    return (
        <Box>
            <IconButton onClick={handleClick} className={classes.menuItem}>
                <MenuIcon />
            </IconButton>
            <Drawer
                open={open}
                anchor='left'
                onClick={handleClose}
                classes={{ paper: classes.Drawer }}
                className={classes.Drawer}
            >
                <div className={classes.userStatus}>
                    <Account className={classes.userIcon} />
                    <div className={classes.userTitle}>
                        <Typography component='h3' color='textPrimary'>
                            {authUser.first_name} {authUser.last_name}
                        </Typography>
                        <Typography component='p' color='textPrimary'>
                            {authUser.email}
                        </Typography>
                    </div>
                </div>
                <List>
                    {authUser.user_role === 'Admin' ?
                        AdminItems.map(({ Icons, text, url, divider, label }, index) => (
                            divider ?
                                <Divider key={index} /> :
                                <StyledSelected button key={text} selected={text === props.active} onClick={() => navigate(url)}>
                                    <ListItemIcon >
                                        <Icons />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography style={{ fontFamily: 'Palatino Linotype' }}>{text}</Typography>
                                    </ListItemText>
                                    {label !== undefined &&
                                        <Chip label={label} size='small' color={label === 0 ? 'default' : 'primary'} />}
                                </StyledSelected>
                        ))
                        :
                        SupervisorItems.map(({ Icons, text, url, divider, label }, index) => (
                            divider ?
                                <Divider key={index} /> :
                                <StyledSelected button selected={text === props.active} key={text} onClick={() => navigate(url)}>
                                    <ListItemIcon >
                                        <Icons />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography style={{ fontFamily: 'Palatino Linotype' }}>{text}</Typography>
                                    </ListItemText>
                                    {label !== undefined &&
                                        <Chip label={label} size='small' color={label === 0 ? 'default' : 'primary'} />}
                                </StyledSelected>
                        ))
                    }
                </List>
                <List className={classes.iconLog}>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography style={{ fontFamily: 'Palatino Linotype' }}>Logout</Typography>
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    )
}