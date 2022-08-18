import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    background: {
        backgroundImage: `url('/images/image_home/school.jpeg')`
    },
    root: {
        position: 'absolute',
        height: '100%',

    },
    leftWrapper: {
        backgroundColor: '#3498db',
        opacity: '85%',
        height: '100%',
        padding: theme.spacing(3),
        color: theme.palette.secondary.contrastText,
        '& h3': {
            '& b': {
                color: '#0A2AB1',
                fontSize: 55,
            }
        }
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 200,
        fontFamily: 'Palatino Linotype',
    },
    dividerColor: {
        backgroundColor: theme.palette.secondary.contrastText
    },
    rightWrapper: {
        height: '100%',
        padding: theme.spacing(7,4),
        backgroundColor: theme.palette.background.paper
    },
    title: {
        fontFamily: 'Palatino Linotype',
        fontSize: 35,
        fontWeight: '500',
        textTransform: 'uppercase',
        [theme.breakpoints.down('xs')]:{
            padding: theme.spacing(2,0)
        }
    },
    titleforget: {
        fontFamily: 'Palatino Linotype',
        fontSize: 25,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]:{
            padding: theme.spacing(2,0)
        }
    }
}))