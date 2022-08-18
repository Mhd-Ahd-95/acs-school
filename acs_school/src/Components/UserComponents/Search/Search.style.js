import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles(theme => ({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        borderRadius: '20px',
        height: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        [theme.breakpoints.down('xs')]: {
            width: 200
        }
    }, 
    title: {
        padding: theme.spacing(1, 2, 3),
        textAlign: 'center',
    },
    search: {
        color: theme.palette.primary.main
    }
}))