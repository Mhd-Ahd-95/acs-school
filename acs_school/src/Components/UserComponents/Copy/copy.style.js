import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    copy: {
        padding: theme.spacing(5, 0, 5, 2),
        color: theme.palette.text.primary,
        '& h5':{
            fontSize: 16,
            letterSpacing: theme.spacing(0.1),
            fontFamily: 'Palatino Linotype',
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4,0,4,2),
            '& h5':{
                fontSize: 13,
                letterSpacing: theme.spacing(0.1),
                fontFamily: 'Palatino Linotype',
            },
        },
    }
}))