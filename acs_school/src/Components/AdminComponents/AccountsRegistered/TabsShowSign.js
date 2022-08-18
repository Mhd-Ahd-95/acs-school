import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SignTeacher } from './SignUser/SignTeacher';
import { SignUser } from './SignUser/SignUser';
import { SignCoordinator } from './SignUser/SignCoordinator';
import { SignSupervisor } from './SignUser/SignSupervisor';
import { Footer } from '../Footer/footer';
import { Copy } from '../../../User/Components/Copy/copy';
import { Appbar } from '../AppBar/Appbar';
import { useStyles } from './SignUser/usersign.style'

export default function ShowUserRegistered() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    return (

        <>
            <Appbar />
            <Box className={classes.tabs}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Teacher" value="1"/>
                            <Tab label="Coordinator" value="2" />
                            <Tab label="Supervisor" value="3" />
                            <Tab label="User" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SignTeacher />
                    </TabPanel>
                    <TabPanel value="2">
                        <SignCoordinator />
                    </TabPanel>
                    <TabPanel value="3">
                        <SignSupervisor />
                    </TabPanel>
                    <TabPanel value="4">
                        <SignUser />
                    </TabPanel>
                </TabContext>
            </Box>
            <Footer />
            <Copy />
        </>
    );
}
