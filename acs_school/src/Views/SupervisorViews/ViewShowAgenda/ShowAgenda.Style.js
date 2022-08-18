import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
      btnAdd :{
        width: theme.spacing(1),
        height: theme.spacing(1),
        marginTop: '1px',
      },
      title:{
        color: theme.palette.text.paper,
        fontFamily: 'Palatino Linotype',
        fontSize: 30,
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
    }

}))