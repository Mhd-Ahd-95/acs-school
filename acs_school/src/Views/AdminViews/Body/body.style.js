import {makeStyles} from '@material-ui/core'


export const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(14,14,2),
        paddingBlock: theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
            margin: theme.spacing(16,1,2)
        }
    },
    img:{
        width: '100%',
        height: theme.spacing(50),
    },
}))