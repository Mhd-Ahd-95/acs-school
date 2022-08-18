import { makeStyles } from "@material-ui/core";

const drawerWidth = 240

export const useStyles = makeStyles(theme => ({
    btnMenu: {
        marginTop: theme.spacing(1)
    },
    Drawer: {
        width: drawerWidth,
    },
    linkText: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    },
    menuItem:{
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('lg')]:{
            display: 'block'
        },
        [theme.breakpoints.down('sm')]:{
            display: 'flex'
        }
    },
    userStatus: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginInline: theme.spacing(1),
        color: theme.palette.secondary.main,
    },
    userIcon: {
        marginRight: theme.spacing(1),
        fontSize: 35,
        color: theme.palette.text.primary
    },
    userTitle: {
        '& h3': {
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Palatino Linotype'
        },
        '& p': {
            marginTop: theme.spacing(-1),
            color: theme.palette.text.primary,
            fontSize: 14,
        },
    },
    iconLog:{
        display: 'none',
        [theme.breakpoints.down('sm')]:{
            display: 'block',
        }
    },
}))