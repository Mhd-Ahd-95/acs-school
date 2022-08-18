import React from 'react';
import { Container, Box } from '@material-ui/core';
import { useStyles } from './body.style'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'

function HomeAdmin() {

    const classes = useStyles();
    return (
        <CommonMain
            title='Home Admin'
            drawerActive='Home'
        >
            <Container maxWidth='lg' className={classes.container}  >
                <Box sx={{ maxWidth: '100%', flexGrow: 1, }}>
                    <img src="/images/image_home/admin.png" alt="admin" className={classes.img}></img>
                </Box>
            </Container>
        </CommonMain>
    )
}

export default HomeAdmin