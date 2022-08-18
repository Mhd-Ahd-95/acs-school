import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    appbar: {
        backgroundColor: theme.palette.background.paper,
        transition: 'font-size 200ms ease-in-out, width 200ms ease-in-out, padding-block 200ms ease-in-out, color 100ms ease',
        '& *': {
            transition: 'font-size 200ms ease-in-out, width 200ms ease-in-out, padding-block 200ms ease-in-out, color 100ms ease',
        },
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.secondary.dark,
        paddingBlock: shrink => shrink ? 0 : theme.spacing(1),
        '& button svg': {
            fontSize: shrink => shrink ? 24 : 30,
        }
    },
   
    logoImage:{
        width: shrink => shrink ? '15vh' : '20vh',
    },
    logo:{
        marginLeft: theme.spacing(4)
    },
    lastIcons: {
        display: 'flex',
        justifyContent: 'flex-end',
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
    iconMenu:{
        color: theme.palette.text.primary
    },

    btnMenu :{
        display: 'flex',
        justifyContent: 'flex-start',
    },
    iconsLink: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(0),
        },
        '&:hover': {
            color: theme.palette.primary.dark,
        },
        '& svg': {
            fontSize: 50,
        }
    },
    DrawerLogo: {
        display: 'flex',
        [theme.breakpoints.down('xs')]:{
            justifyContent: 'flex-start',
        }
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
    links: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'uppercase',
        // marginTop: theme.spacing(1)
    },
    iconLabel: {

        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: '2px solid #fff',
        borderRadius: '50%',
        fontSize: shrink => shrink ? 10:12,
        width: shrink => shrink ? 13:17 ,
        height: shrink => shrink ? 13:17 ,
        bottom: shrink => shrink ? 25:27 ,
        right: shrink => shrink ? 6:4.5 ,
    },
    notificationItem: {
        maxWidth: 400,
        userSelect: 'none',
        cursor: 'pointer',
        transition: theme.transitions.create(['background'], {
            duration: theme.transitions.duration.short
        }),
        '&:hover': {
            background: theme.palette.primary.outlineHover,
        }
    },
    views: {
        color: theme.palette.primary.light,
        fontSize: 18,
        fontFamily: 'Palatino Linotype'
    },
    noNotifications: {
        width: 200,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.light,
    }
}))