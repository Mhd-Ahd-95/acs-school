import {makeStyles} from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
    paper:{
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    title:{
        color: theme.palette.primary.main,
        fontFamily: 'Palatino Linotype',
        fontWeight: 'bold',
        paddingBottom: theme.spacing(2)
    },
    item: {
        color: theme.palette.primary.main,
        fontSize: 23,
        padding: theme.spacing(1, 5),
        width: theme.spacing(40),
        [theme.breakpoints.down('xs')]:{
            padding: theme.spacing(1,1)
        }
    },
    action: {
        fontSize:20,
        fontFamily: 'Palatino Linotype',
        [theme.breakpoints.down('xs')]:{
            fontSize: 15
        }
    },
    key: {
        color: theme.palette.info.main,
        fontWeight: 600,
        fontSize: 16,
        fontFamily: 'Palatino Linotype',
    },
    sekeltonText: {
      height: 40,
      width: 250,
      [theme.breakpoints.down('xs')]:{
        width: 200
      }
    },
    className: {
        paddingLeft: '20px',
        [theme.breakpoints.down('xs')]:{
            paddingLeft: 0
        }
    },
    keytd: {
        [theme.breakpoints.down('310')]:{
            fontSize: 12,
        }
    }
}))