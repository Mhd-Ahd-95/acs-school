import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(15, 1, 2),
        }
    },
    titleAgendaShow: {
        color: 'red',
        fontFamily: 'Palatino Linotype',
      },
      Checked: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontFamily: 'Palatino Linotype',
        fontSize: 20,
        textAlign: 'center',
      },
      title:{
        color: theme.palette.primary.main,
        fontFamily: 'Palatino Linotype',
        fontSize: 30,
        fontWeight: '600',
        padding: theme.spacing(1)
    }
}))