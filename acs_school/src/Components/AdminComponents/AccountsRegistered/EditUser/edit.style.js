import {makeStyles} from '@material-ui/core'


export const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(14, 2, 2),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 2),
        }
      },
    title: {
      fontSize: 30,
      fontFamily: 'Palatino Linotype',
      fontWeight: '600',
      color: theme.palette.text.paper,
      padding: theme.spacing(3),
      textTransform: 'capitalize',
    },
    selected: {
        width: theme.spacing(114)
    }
}))