import { makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    container:{
        marginBlock: theme.spacing(15),
    },
    content: {
        marginBlock: theme.spacing(2)
    },
    root:{
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    login: {
        fontFamily: 'Palatino Linotype',
        fontSize: 27,
        marginBlock: theme.spacing(2),
        fontWeight: 'bold',
        color: theme.palette.primary.main
    },
}))