import {makeStyles} from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
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
    keytd: {
        [theme.breakpoints.down('310')]:{
            fontSize: 12,
        }
    }
}))