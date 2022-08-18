import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(14, 2, 2),
    [theme.breakpoints.down('xs')]:{
      margin: theme.spacing(15, 1, 2),
    }
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: 'Palatino Linotype',
    fontWeight: 'bold',
    paddingBottom: theme.spacing(2)
  },
  titlestudent: {
    color: theme.palette.text.paper,
    fontFamily: 'Palatino Linotype',
    fontWeight: 'bold',
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  item: {
    color: theme.palette.primary.main,
    fontSize: 23,
    padding: theme.spacing(1, 5),
    width: theme.spacing(40),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 1)
    }
  },
  action: {
    fontSize: 20,
    fontFamily: 'Palatino Linotype',
    [theme.breakpoints.down('xs')]: {
      fontSize: 15
    }
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
  title: {
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
    fontSize: 30,
    fontFamily: 'Palatino Linotype',
    fontWeight: 'bold',
  },
  key: {
    color: theme.palette.info.main,
    fontWeight: 600,
    fontSize: 16,
    fontFamily: 'Palatino Linotype',
},
sekeltonText: {
  height: 40,
  width: 250,
  [theme.breakpoints.down('xs')]:{
    width: 200
  }
}
}))