import React from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    IconButton,
    Hidden,
    Menu,
    MenuItem,
    Typography,
}
    from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from './AppBar.Style'
import {
    AccountCircle as Account,
}
    from '@material-ui/icons'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { MobileDrawer } from '../Drawer/Drawer';
import { Notification } from '../../AdminComponents/Notification/notification'
import global from '../../../global'
import { AuthContext } from '../../../Context/UserContext'

export function CommonAppBar(props) {

    const authContext = React.useContext(AuthContext)
    const [shrink, setShrink] = React.useState(window.scrollY > 40)

    const [anchor, setAnchorEl] = React.useState(null)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    React.useEffect(() => {
        window.onscroll = () => {
            window.scrollY > 40
                ? setShrink(true)
                : setShrink(false)
        }
        return () => window.onscroll = null
    }, [])

    const classes = useStyles(shrink)
    const handleLogout = () => {
        authContext.handleAuth(false)
    }

    const SupervisorHeader = [
        { text: 'Create Agenda', url: '/supervisor/create-agenda' },
        { text: 'Show Agenda', url: '/supervisor/show-agenda' },
        { text: 'Create Exam', url: '/supervisor/create-exam' }
    ]

    const AdminHeader = [
        { text: 'Accounts', url: '/admin/accounts' },
        { text: 'Registered students', url: '/admin/student-registered' },
        { text: 'Sender Contact', url: '/admin/sender-contact' }
    ]

    const authUser = global.auth.user

    return (
        <AppBar className={classes.appbar} position='fixed'>
            <Toolbar>
                <Grid container spacing={2} direction='row'>
                    <Grid item md={2} sm={9} xs={12} className={classes.DrawerLogo} >
                        <MobileDrawer active={props.drawerActive} />
                        <div className={classes.logo} >
                            <img src='/images/logo/acsv3.png' className={classes.logoImage} alt='logo' />
                        </div>
                    </Grid>
                    {authUser.user_role === 'Admin' ?
                        <>
                            <Hidden smDown>
                                <Grid item md={8} >
                                    <ul className={classes.links}>
                                        {AdminHeader.map(({ text, url }, index) => (
                                            <RouterLink to={url} className={classes.linksItem} key={index}>
                                                <Typography component='li' style={{ alignItems: 'center', fontFamily: 'Palatino Linotype' }}>
                                                    {text}
                                                </Typography>
                                            </RouterLink>
                                        ))}
                                    </ul>
                                </Grid>
                            </Hidden>
                            <Hidden xsDown>
                                <Grid item className={classes.lastIcons} md={2} sm={3}>
                                    <span className={classes.iconsLink}>
                                        <Notification classes={classes} />
                                    </span>
                                    <span className={classes.iconsLink}>
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <Account />
                                        </IconButton>
                                        <Menu
                                            id='user-menu'
                                            keepMounted
                                            anchorEl={anchor}
                                            open={Boolean(anchor)}
                                            onClose={handleClose}
                                            getContentAnchorEl={null}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'center'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}

                                        >
                                            <RouterLink to='' className={classes.userMenuItem}>
                                                <MenuItem>
                                                    <span className={classes.iconMenu}>
                                                        <LoginIcon />
                                                    </span>
                                                    <Typography color='textPrimary'> Login </Typography>
                                                </MenuItem>
                                            </RouterLink>
                                            <div className={classes.userMenuItem}>
                                                <MenuItem onClick={handleLogout}>
                                                    <span className={classes.iconMenu}>
                                                        <LogoutIcon />
                                                    </span>
                                                    <Typography color='textPrimary'> Logout </Typography>
                                                </MenuItem>
                                            </div>
                                        </Menu>
                                    </span>
                                </Grid>
                            </Hidden>
                        </>
                        :
                        <Hidden smDown>
                            <Grid item md={9} >
                                <ul className={classes.links}>
                                    {SupervisorHeader.map(({ text, url }, index) => (
                                        <RouterLink to={url} className={classes.linksItem} key={index}>
                                            <Typography component='li' style={{ alignItems: 'center', fontFamily: 'Palatino Linotype' }}>
                                                {text}
                                            </Typography>
                                        </RouterLink>
                                    ))}
                                </ul>
                            </Grid>
                            <Grid item className={classes.lastIcons} md={1} sm={3}>
                                <span className={classes.iconsLink}>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <Account />
                                    </IconButton>
                                    <Menu
                                        id='user-menu'
                                        keepMounted
                                        anchorEl={anchor}
                                        open={Boolean(anchor)}
                                        onClose={handleClose}
                                        getContentAnchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}

                                    >
                                        <RouterLink to='' className={classes.userMenuItem}>
                                            <MenuItem>
                                                <span className={classes.iconMenu}>
                                                    <LoginIcon />
                                                </span>
                                                <Typography color='textPrimary'> Login </Typography>
                                            </MenuItem>
                                        </RouterLink>
                                        <div className={classes.userMenuItem}>
                                            <MenuItem onClick={handleLogout}>
                                                <span className={classes.iconMenu}>
                                                    <LogoutIcon />
                                                </span>
                                                <Typography color='textPrimary'> Logout </Typography>
                                            </MenuItem>
                                        </div>
                                    </Menu>
                                </span>
                            </Grid>
                        </Hidden>
                    }
                </Grid>
            </Toolbar >
        </AppBar >
    )
}