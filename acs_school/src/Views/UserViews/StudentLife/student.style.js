import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme =>({
    root:{
        margin: theme.spacing(14, 2, 5),
        [theme.breakpoints.down('xs')]:{
          margin: theme.spacing(15, 1, 5),
        }        
},
    imgNutrition: {
        width: '300px',
        height: '270px',
        borderRadius: theme.spacing(0, 0, 15, 0),
        [theme.breakpoints.down('360')]:{
            width: '280px',
            height: '260px'
        },
        [theme.breakpoints.down('335')]:{
            width: '250px',
            height: '240px'
        },
        [theme.breakpoints.down('305')]:{
            width: '220px',
            height: '210px'
        },
        [theme.breakpoints.down('275')]:{
            width: '200px',
            height: '190px'
        }
    },
    nutrition: {
        fontSize: 27,
        color: theme.palette.primary.main,
        fontFamily:'Palatino Linotype',
        paddingBottom: theme.spacing(1),
        fontWeight: 'bold'
    },
    title:{
        fontSize: 35,
        fontFamily: 'Palatino Linotype',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(7)
    },
    nutritionText: {
        fontSize: 15,
        color: theme.palette.text.primary,
        fontFamily:'Palatino Linotype',
    },
    [theme.breakpoints.down('1032')]:{
        marginLeft:'10px'
    }
}))