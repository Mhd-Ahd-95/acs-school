import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Grid, Typography, Hidden, IconButton, Menu, MenuItem, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { AppBarStyles } from './AppBar.Style';
import {
    AccountCircle as Account,
}
    from '@material-ui/icons'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { DrawerPro } from '../Drawer/drawer.js';
import { SearchModal } from '../Search/SearchModal'

export function Appbar(props) {

    const [shrink, setShrink] = useState(window.scrollY > 40)
    const [anchor, setAnchorMenu] = useState(null)
    const classes = AppBarStyles(shrink)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        window.onscroll = () => {
            window.scrollY > 40
                ? setShrink(true)
                : setShrink(false)
        }
        return () => window.onscroll = null
    }, [])

    const LinkItems = [
        { text: 'Home', url: '/' },
        { text: "About Us", url: '/about' },
        { text: "Contact Us", url: '/contact' },
    ]
    const handleClick = (e) => {
        setAnchorMenu(e.currentTarget)
    };
    const handleClose = (e) => {
        setAnchorMenu(null)
    };

    const handleCloseModal = () => {
        setOpen(false)
    }

    const LinkLog = [
        { Icon: LoginIcon, Text: 'LogIn', url: '/login' },
        { Icon: LogoutIcon, Text: 'LogOut', url: '' },
    ]
    return (
        <>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar >
                    <Grid container spacing={2}>
                        <Grid item md={2} sm={9} xs={12} className={classes.DrawerLogo} >
                            <DrawerPro
                                active={props.drawerActive}
                            />
                            <RouterLink to='/' className={classes.logo} >
                                <img src='/images/logo/acsv3.png' className={classes.logoImage} alt='logo' ></img>
                            </RouterLink>
                        </Grid>
                        <Hidden smDown>
                            <Grid item md={8}>
                                <ul className={classes.links}>
                                    {LinkItems.map(({ text, url }, index) => (
                                        <RouterLink to={url} key={index} className={classes.linksItem}>
                                            <Typography component='li' style={{ alignItems: 'center', fontFamily: 'Palatino Linotype' }}>
                                                {text}
                                            </Typography>
                                        </RouterLink>
                                    ))}
                                </ul>
                            </Grid>
                        </Hidden>
                        <Hidden xsDown>
                            <Grid item md={2} sm={3} className={classes.lastIcons}>
                                <span className={classes.iconsearch}>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        onClick={() => setOpen(true)}
                                    >
                                        <SearchRoundedIcon color="action" /><span style={{ fontSize: 12, textTransform: 'capitalize' }}>Search...</span>
                                    </Button>
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
                                        keepMounted
                                        id='user-menu'
                                        anchorEl={anchor}
                                        open={Boolean(anchor)}
                                        onClose={handleClose}
                                        getContentAnchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        {LinkLog.map(({ Icon, Text, url }, index) => (
                                            <RouterLink to={url} key={index} className={classes.userMenuItem}>
                                                <MenuItem onClick={handleClose}>
                                                    <span className={classes.menuIcon}>
                                                        <Icon />
                                                    </span>
                                                    <Typography color='textPrimary'> {Text} </Typography>
                                                </MenuItem>
                                            </RouterLink>
                                        ))}

                                    </Menu>
                                </span>
                            </Grid>
                        </Hidden>
                    </Grid>

                </Toolbar>
            </AppBar >
            <SearchModal
                open={open}
                handleClose={handleCloseModal}
            />
        </>
    )
}