import {makeStyles} from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
    root:{
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    nameLog: {
        fontFamily: 'Palatino Linotype',
        fontSize: 27,
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    forget: {
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        fontSize: 20,
        '&:hover':{
            color: theme.palette.primary.main,
            textDecoration: 'underline'
        }
    },
    iconForget: {
        color: theme.palette.text.primary,
        paddingRight: theme.spacing(1),
    },
    linkforegt:{
        textDecoration: 'none',
        listStyle: 'none',
    }
}))