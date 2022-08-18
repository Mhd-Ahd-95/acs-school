import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    root: {
        position:'relative',
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    uploadButtonImg: {
        width: '100%',
        height: '220px',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #c4c4c4',
        boxShadow: 'none',
    },
    uploadButton: {
        width: '100%',
        height: '217px',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #c4c4c4',
        boxShadow: 'none',
    },
    uploadInput: {
        display: 'none',
    },
    imagePreview: {
        width: '100%'
    },
    imageHelper: {
        color: '#E74C3C',
        fontSize: '15px',
        margin: '0px 14px 0px',
    }
}))