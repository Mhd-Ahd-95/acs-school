import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    agenda:{
        border: `3px dotted ${theme.palette.primary.main}`,
        padding: theme.spacing(2)

    },
    text: {
        fontFamily: 'Palatino Linotype'
    },
    container: {
        marginBottom: theme.spacing(4)
    }
}))