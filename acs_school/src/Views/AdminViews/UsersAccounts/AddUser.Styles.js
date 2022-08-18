import {makeStyles} from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(14, 2, 2),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 2),
        }
      },
    title:{
        color: theme.palette.primary.main,
        fontFamily: 'Palatino Linotype',
        fontSize: 30,
        padding: theme.spacing(2)
    },
    btnAdd :{
      width: theme.spacing(1),
      height: theme.spacing(1),
      marginTop: '1px',
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      [theme.breakpoints.down('xs')]: {
        width: 200
      }
    },
    titleModal: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontSize: 25,
      fontFamily: 'Palatino Linotype',
      fontWeight: 'bold',
      letterSpacing: theme.spacing(0.1),
      padding: theme.spacing(1)
    },
    questionModal: {
      fontSize: 20,
      color: theme.palette.text.primary,
      fontFamily: 'Palatino Linotype',
      letterSpacing: theme.spacing(0.1),
    },
}))