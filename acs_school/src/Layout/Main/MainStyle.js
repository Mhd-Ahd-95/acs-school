import { makeStyles } from '@material-ui/core'


export default makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.type === 'light' ? '#f9f9f9' : '#494949',
        margin: theme.spacing(13,0,7),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(15, 0, 7),
        }
    },
    paper: {
        margin: theme.spacing(0,2)
    },
    content: {
        // flexGrow: 1,
        minHeight: 500,
        // paddingInline: props => props.noPadding ? 0 : theme.spacing(4),
        // paddingBlock: props => props.noPadding ? 0 : theme.spacing(6),
        backgroundColor: theme.palette.type === 'light' ? '#f9f9f9' : '#494949'
    },
    title: {
        fontFamily: 'Palatino Linotype',
        fontSize: 30,
        fontWeight: '500',
        // color: 'grey',
        paddingLeft: theme.spacing(4)
    },
}))