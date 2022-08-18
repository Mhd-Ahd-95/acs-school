import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    
    notificationItem: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.primary.outlineHover,
        }
    },
}))
