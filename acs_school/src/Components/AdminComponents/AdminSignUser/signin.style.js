import {makeStyles} from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(14, 2, 2),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 2),
        }
      },
    title:{
        color: theme.palette.primary.main,
        fontFamily: 'Palatino Linotype',
        fontSize: 30,
        padding: theme.spacing(2)
    },
    btnAdd :{
      width: theme.spacing(1),
      height: theme.spacing(1),
      marginTop: '1px',
    }
}))