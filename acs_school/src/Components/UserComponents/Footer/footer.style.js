
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: '#2c3e50',
        padding: theme.spacing(2),
    },
    itemIcon: {
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginLeft: '-34px',
        marginBlock: theme.spacing(1),
        '& li': {
            marginInline: theme.spacing(2),
            fontSize: 18,
            '& a': {
                textDecoration: 'none',
                color: theme.palette.secondary.contrastText,
                '&:hover': {
                    color: theme.palette.primary.main,
                },
            },
            '& svg': {
                fontSize: 42,
            },
            [theme.breakpoints.down('xs')]: {
                marginInline: theme.spacing(1),
                fontFamily: 'Palatino Linotype',
                fontSize: 16,
                '& svg': {
                    fontSize: 36,
                }
            }
        }
    },
    follow: {
        color:  theme.palette.secondary.contrastText,
        fontSize: 24,
        marginBlock: theme.spacing(1),
        fontFamily: 'Palatino Linotype'
    },
    
    designed: {
        color:  '#aaa',
        fontSize: 15,
        marginBlock: theme.spacing(1),
        fontFamily: 'Palatino Linotype'
    },
    apply: {
        fontSize: 25,
        marginBlock: theme.spacing(1),
        fontFamily: 'Palatino Linotype',
        '&:hover':{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.contrastText,    
            borderRadius: theme.spacing(15),
        },
    },

    btn:{
        marginTop: theme.spacing(-6.7),
    }
}))