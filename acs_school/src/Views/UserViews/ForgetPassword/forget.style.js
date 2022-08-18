import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    root:{
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    nameForget: {
        color: theme.palette.primary.main,
        fontSize: 27,
        fontFamily: 'Palatino Linotype',
        fontWeight: 'bold'
    }
}))

