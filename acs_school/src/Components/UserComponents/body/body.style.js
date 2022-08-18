

import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    root:{
        margin: theme.spacing(14, 2, 5),
        paddingBlock: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    container: {
        marginTop: theme.spacing(2)
    },
    slider: {
        height: theme.spacing(60),
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        width: '100%',
        [theme.breakpoints.down('xs')]:{
            height: theme.spacing(50)
        }
    },
    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        [theme.breakpoints.down('xs')]:{
          width:200
        }
    }
}))