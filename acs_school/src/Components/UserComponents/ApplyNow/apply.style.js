import { makeStyles } from "@material-ui/core";


export const useStyles = makeStyles(theme => ({
    root:{
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    title: {
        color: theme.palette.primary.main,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: theme.spacing(0.1),
        fontFamily: 'Palatino Linotype',
    },
    title1: {
        color: 'grey',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Palatino Linotype',
    },
    title2: {
        color: 'grey',
        fontSize: 20,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Palatino Linotype',
    },
    grid: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    title3: {
        color: theme.palette.primary.main,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: theme.spacing(0.1),
        fontFamily: 'Palatino Linotype',
    },
    title4: {
        color: theme.palette.primary.main,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: theme.spacing(2),
        letterSpacing: theme.spacing(0.1),
        fontFamily: 'Palatino Linotype',
    },
    title5: {
        color: 'grey',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: theme.spacing(2),
        letterSpacing: theme.spacing(0.1),
        fontFamily: 'Palatino Linotype',
    },
    title6: {
        color: 'grey',
        fontSize: 18,
        letterSpacing: theme.spacing(0.1),
        fontFamily: 'Palatino Linotype',
        [theme.breakpoints.down('xs')]:{
            marginRight: theme.spacing(2)
        }
    },
    tableTitle: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(4),
        marginBlock: theme.spacing(2)
    },
    names: {
        color: theme.palette.primary.contrastText,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Palatino Linotype',
        [theme.breakpoints.down('xs')]:{
            fontSize: 15
        }
    },
    tableTitle1: {
        marginBlock: theme.spacing(2)
    },
    subject: {
        backgroundColor: '#f1f2f2',
        borderRadius: theme.spacing(4),
        
    },
    name1: {
        color: theme.palette.primary.main,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Palatino Linotype',
        padding: theme.spacing(2)
    },
    nbD:{
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing(4) 
    },
    items: {
        fontSize: 15,
        color: theme.palette.primary.main,
        fontFamily: 'Palatino Linotype',
        padding: theme.spacing(1)
    },
    form: {
        [theme.breakpoints.up('xs')]:{
            margin : theme.spacing(2, 3, 0, 3)
        },
        [theme.breakpoints.down('xs')]:{
            margin : theme.spacing(2, 1, 0, 1)
        }
    }
}))