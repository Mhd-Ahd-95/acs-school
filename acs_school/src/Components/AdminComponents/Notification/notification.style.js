import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingBlock: props => props.dense ? theme.spacing(1) : theme.spacing(3),
        paddingInline:props => props.dense ? theme.spacing(2): theme.spacing(3),
        cursor: props => props.link ? 'pointer' : '',
        '&:hover': {
            backgroundColor: 'rgba(224, 224, 224, 1)'
        }
    },
    date: {
        fontSize: props => props.dense ? 10 : 14,
        color: theme.palette.primary.light
    },
    content: {
        marginBlock: props => props.dense? theme.spacing(0):theme.spacing(1),
        fontSize: props => props.dense ? 15 : 20,
        '& > .primary': {
            color: theme.palette.primary.dark,
        },
        '& > .secondary': {
            color: theme.palette.warning.main,
        },
        '& > .bold': {
            fontWeight: 600,
        }
    },
    actions: {
        display: 'flex',
        marginTop: theme.spacing(1),
        '& button': {
            marginRight: theme.spacing(1),
            padding: 0
        }
    },
    highlight: {
        display: 'block',
        position: 'absolute',
        width: props => props.dense ? 8 : 12,
        height: props => props.dense ? 8 : 12,
        borderRadius: '50%',
        top: theme.spacing(1),
        right: theme.spacing(1),
        background: theme.palette.primary.main
    },
    EachNotification: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(2)
    },
    title: {
        color: theme.palette.primary.main,
        padding: theme.spacing(2),
        fontSize: 30,
        fontFamily: 'Palatino Linotype',
        fontWeight: 'bold',
    },
    notificationItem: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.primary.outlineHover,
        }
    },
}))
