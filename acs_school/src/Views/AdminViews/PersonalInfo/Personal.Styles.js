import {makeStyles} from '@material-ui/core'


export const useStyles = makeStyles(theme => ({
    personal: {
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]:{
          padding: theme.spacing(2)
        }
    }
}))