import { makeStyles } from '@material-ui/core';


const drawerWidth = 240
export const    useStyles = makeStyles(theme => ({

    iconMenu: {
        // marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth
    },
    userStatus: {
        padding: theme.spacing(0,0,2),
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
    drawerItemIcon: {
        marginRight: theme.spacing(1),
        fontSize: 20
    },
    ItemDrawer :{
        textDecoration: 'none',
        color: theme.palette.text.primary, 
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
    
    iconLog:{
        display: 'none',
        [theme.breakpoints.down('sm')]:{
            display: 'block',
        }
    },
    drawerlogo: {
        display: 'flex',
        paddingLeft: theme.spacing(2),
        padding: theme.spacing(1,0,1,0)
    },
    logoImage: {
        width:'4vh',
        height: '8vh',
        display: 'flex',
        marginRight: theme.spacing(1),
        justifyContent: 'flex-start'
    },
    logoImage1: {
        width:'15vh',
        height: '8vh',
        display: 'flex',
        marginRight: theme.spacing(2),
        justifyContent: 'flex-start'
    },
    nameText: {
        color: theme.palette.text.primary,
    },
    userTitle: {
        '& h3': {
            fontSize: 22,
            color: '#5BAAF9',
            fontWeight: 'bold',
        },
        '& p': {
            marginTop: theme.spacing(-1),
            color: theme.palette.text.primary,
            fontSize: 14,
        },
    }
})) 