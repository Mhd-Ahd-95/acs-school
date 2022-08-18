
import { makeStyles } from '@material-ui/core';

export const AppBarStyles = makeStyles(theme => ({
    logoImage: {
        display: 'block',
        width: shrink => shrink ? '15vh' : '20vh',
    },
    appBar: {
        transition: 'font-size 200ms ease-in-out, width 200ms ease-in-out, padding-block 200ms ease-in-out, color 100ms ease',
        '& *': {
            transition: 'font-size 200ms ease-in-out, width 200ms ease-in-out, padding-block 200ms ease-in-out, color 100ms ease',
        },
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.dark,
        paddingBlock: shrink => shrink ? 0 : theme.spacing(1),
        '& button svg': {
            fontSize: shrink => shrink ? 24 : 30,
        }
    },
    logo: {
        marginLeft: theme.spacing(4),
    },
    
    lastIcons: {
        display: 'flex',
        justifyContent: 'center',
    },
    links: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'uppercase',
        // marginTop: theme.spacing(1)
    },
    linksItem: {
        textDecoration: 'none',
        marginInline: shrink => shrink ? theme.spacing(1) : theme.spacing(2),
        marginTop: shrink => shrink ? theme.spacing(1) : theme.spacing(1),
        color: theme.palette.text.primary,
        '& li': {
            fontSize: shrink => shrink ? 12 : 15,
            
            letterSpacing: '1px',
            '&:hover': {
                color: theme.palette.primary.main
            },
        },
        '&:hover': {
            color: theme.palette.primary.dark,
        }
    },
    userMenuItem: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        '& li': {
            display: 'flex',
            '& svg': {
                fontSize: 15,
                marginRight: theme.spacing(1)
            },
            '& p': {
                fontSize: 14,
            }
        }
    },
    menuIcon:{
        color: theme.palette.text.primary,
       
    },
    
    NotAccIcons: {
        marginTop: shrink => shrink ? theme.spacing(1) : theme.spacing(1),
    },
    iconsLink: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3),
        '&:hover': {
            color: theme.palette.primary.dark,
        },
        '& svg': {
            fontSize: 50,
        }
    },
    iconsearch: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(3),
    },
    DrawerLogo: {
        display: 'flex',
        [theme.breakpoints.down('xs')]:{
            justifyContent: 'flex-start',
        }
    }
}))