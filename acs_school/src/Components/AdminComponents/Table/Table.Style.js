import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    placeholder: {
        width: '100%',
        height: 400,
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
    },
    tableContainer: {
        overflow: 'auto',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
    },
    tableLayout: {
        overflow: 'hidden',
        borderRadius: 4,
        boxShadow: '0px 2px 2px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    actionBtn: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1)
        }
    },
    tableFiltersPanel: {
        background: theme.palette.background.paper,
        border: '1px solid #dadada',
        borderRadius: 2,
        position: 'relative',
        padding: theme.spacing(2),
        margin: 0,
        width: '100%',
    }
}))

export const tableStyles = {
    headerStyle: {
        whiteSpace: 'nowrap',
        backgroundColor: '#3f51b5',
        color: '#fff',
    },
    rowStyle: {
        fontSize: 16
    },
}