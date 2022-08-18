

import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    root:{
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    imageManager: {
        paddingTop: theme.spacing(1),
        width: '150px',
        height: '170px',
        borderRadius: theme.spacing(0, 0, 5, 0)
    },
    name1: {
        fontSize: 14,
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontFamily: 'Palatino Linotype'
    },
    name2: {
        color: theme.palette.text.primary,
        fontSize: 11,
        fontFamily: 'Palatino Linotype'
    },
    simple: {
        color: theme.palette.text.primary,
        fontSize: 15,
        padding: theme.spacing(2, 2, 2, 0),
        fontFamily: 'Palatino Linotype'
    },
    text1: {
        color: theme.palette.text.primary,
        fontSize: 15,
        fontFamily: 'Palatino Linotype',
    },
    title: {
        fontSize: 18,
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontFamily: 'Palatino Linotype'
    },
    Skeleton:{
        marginLeft: theme.spacing(1)
    }
}))