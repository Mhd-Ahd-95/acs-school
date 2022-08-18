import React from 'react';
import {
    Grid,
    Box,
    TextField,
    Typography,
    Divider,
}
    from '@material-ui/core'
import { LoadingButton } from '@mui/lab';
import { useStyles } from './course_cycle_class.style'
import AddIcon from '@mui/icons-material/Add';
import Icons from '../../../Components/AdminComponents/Table/Icons'
import Class_Course_Cycle from '../../../API/course_class_cycle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import { useSnackbar } from 'notistack';
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'
import { Table } from '../../../Components/AdminComponents/Table/Table'

export default function AddCCC() {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles();
    const [saveclass, setSaveclass] = React.useState(false);
    const [savecourse, setSavecourse] = React.useState(false);
    const [savecycle, setSavecycle] = React.useState(false);

    const [cls, setClass] = React.useState('');
    const [course, setCourse] = React.useState('');
    const [cycle, setCycle] = React.useState('');
    const [ListCycle, setListCycle] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [isLoadingCourse, setLoadingCourse] = React.useState(false);
    const [isLoadingCycle, setLoadingCycle] = React.useState(false);
    const [lstClass, setLstClass] = React.useState([]);
    const [lstCourse, setLstCourse] = React.useState([]);
    const [lstCycle, setLstCycle] = React.useState([]);

    const getAllClasses = React.useCallback(() => {
        setLoading(true)
        Class_Course_Cycle.getAllClasses()
            .then((res) => {
                const arr = res.data
                setLstClass(arr)
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to load Classes — Try again!`, { variant: 'error', })
            })
            .finally(() => { setLoading(false) })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        getAllClasses()
    }, [getAllClasses])


    const handleSubmitclass = (e) => {
        setSaveclass(true)
        e.preventDefault();
        const classData = {
            'cls_school': cls
        }
        Class_Course_Cycle.createClass(classData)
            .then((res) => {
                e.target.reset();
                enqueueSnackbar(`New class added successfully — Oops!`, { variant: 'success', });
                setSaveclass(false)
                getAllClasses()
            })
            .catch((err) => {
                setSaveclass(false)
                enqueueSnackbar(`Failed to add a new class — Try again!`, { variant: 'error', })
            })
    }

    const deleteClasses = (id) => {
        Class_Course_Cycle.deleteClass(id)
            .then(() => {
                getAllClasses()
                enqueueSnackbar(`Deleted successfully — Oops!`, { variant: 'success', })
            })
            .catch(err => {
                enqueueSnackbar(`Failed to delete Class — Try again!`, { variant: 'error', })
            })
    }

    const getAllCourses = React.useCallback(() => {
        setLoadingCourse(true)
        Class_Course_Cycle.getAllCourses()
            .then((res) => {
                const arr = res.data
                setLstCourse(arr)
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to load Courses — Try again!`, { variant: 'error', })
            })
            .finally(() => { setLoadingCourse(false) })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        getAllCourses()
    }, [getAllCourses])


    const handleSubmitCourses = (e) => {
        e.preventDefault();
        setSavecourse(true)
        const courseData = {
            'course': course
        }
        Class_Course_Cycle.createCourse(courseData)
            .then((res) => {
                e.target.reset();
                enqueueSnackbar(`New course added successfully — Oops!`, { variant: 'success', });
                setSavecourse(false)
                getAllCourses()
            })
            .catch((err) => {
                setSavecourse(false)
                enqueueSnackbar(`Failed to add new Course — Try again!`, { variant: 'error', })
            })
    }

    const deleteCourse = (id) => {
        Class_Course_Cycle.deleteCourse(id)
            .then(() => {
                getAllCourses()
                enqueueSnackbar(`Deleted successfully — Oops!`, { variant: 'success', })
            })
            .catch(err => {
                enqueueSnackbar(`Failed to delete Course — Try again!`, { variant: 'error', })
            })
    }


    const getAllCycles = React.useCallback(() => {
        setLoadingCycle(true)
        Class_Course_Cycle.getAllCycle()
            .then((res) => {
                const arr = res.data
                setLstCycle(arr)
            })
            .catch((err) => {
                enqueueSnackbar(`Failed to load Cycle — Try again!`, { variant: 'error', })
            })
            .finally(() => { setLoadingCycle(false) })
    }, [enqueueSnackbar])

    React.useEffect(() => {
        getAllCycles()
    }, [getAllCycles])


    const handleSubmitCycle = (e) => {
        e.preventDefault();
        setSavecycle(true)
        const cycleData = {
            'cycle_name': cycle,
            'cycle': ListCycle
        }
        Class_Course_Cycle.createCycle(cycleData)
            .then((res) => {
                e.target.reset();
                setSavecycle(false)
                enqueueSnackbar(`New Cycle added successfully — Oops!`, { variant: 'success', })
                setListCycle([])
                getAllCycles()
            })
            .catch((err) => {
                setSavecycle(false)
                enqueueSnackbar(`Failed to add new Cycle — Try again!`, { variant: 'error', })
            })
    }

    const deleteCycle = (id) => {
        Class_Course_Cycle.deleteCycle(id)
            .then(() => {
                getAllCycles()
                enqueueSnackbar(`Deleted successfully — Oops!`, { variant: 'success', })
            })
            .catch(err => {
                enqueueSnackbar(`Failed to delete Cycle — Try again!`, { variant: 'error', })
            })
    }

    const handleChangeCycle = (event) => {
        const {
            target: { value },
        } = event;
        setListCycle(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <CommonMain
            title='Class && Course'
            titlePage="School's Classes - Courses - Cycles"
            drawerActive='Class-Course-Cycle'
            noPaper
        >
            <Grid container component={Box} spacing={2} px={1}>
                <Grid item md={3} sm={12} xs={12}>
                    <Grid container component='form' onSubmit={(e) => handleSubmitclass(e)} spacing={1}>
                        <Grid item>
                            <Grid container component={Box} spacing={1}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Typography variant='h5' className={classes.title}>
                                        Classes
                                    </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Grid container component={Box} spacing={1}>
                                        <Grid item md={8} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                label='Class'
                                                name='class'
                                                fullWidth
                                                onChange={(e) => setClass(e.target.value)}
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <LoadingButton
                                                type='submit'
                                                variant='contained'
                                                loading={saveclass}
                                                loadingPosition='start'
                                                color='secondary'
                                                fullWidth
                                                style={{ fontFamily: 'Palatino Linotype' }}
                                                startIcon={<AddIcon />}

                                            >
                                                Add
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Table
                                        titletype='classes'
                                        data={lstClass}
                                        columns={[
                                            {
                                                cellStyle: { whiteSpace: 'nowrap' },
                                                title: 'Class Name',
                                                field: 'cls_school',
                                                filterPlaceholder: 'Filter',
                                                filtering: false
                                            }
                                        ]}
                                        isLoading={isLoading}
                                        options={{
                                            sorting: true,
                                            search: false,
                                            filtering: true,
                                        }}
                                        title={'classes'}
                                        actions={[{
                                            icon: Icons.Delete,
                                            onClick: (e, rowData) => {
                                                deleteClasses(rowData.id)
                                            }
                                        }]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={3} sm={12} xs={12}>
                    <Grid container component='form' onSubmit={(e) => handleSubmitCourses(e)} spacing={1}>
                        <Grid item>
                            <Grid container component={Box} spacing={1}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Typography variant='h5' className={classes.title}>
                                        Courses
                                    </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Grid container component={Box} spacing={1}>
                                        <Grid item md={8} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                label='Courses'
                                                name='course'
                                                onChange={(e) => setCourse(e.target.value)}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <LoadingButton
                                                type='submit'
                                                variant='contained'
                                                loading={savecourse}
                                                loadingPosition='start'
                                                color='secondary'
                                                fullWidth
                                                style={{ fontFamily: 'Palatino Linotype' }}
                                                startIcon={<AddIcon />}

                                            >
                                                Add
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Table
                                        titletype='courses'
                                        data={lstCourse}
                                        columns={[
                                            {
                                                cellStyle: { whiteSpace: 'nowrap' },
                                                title: 'Course Name',
                                                field: 'course',
                                                filterPlaceholder: 'Filter',
                                                filtering: false
                                            }
                                        ]}
                                        isLoading={isLoadingCourse}
                                        options={{
                                            sorting: true,
                                            search: false,
                                            filtering: true,
                                        }}
                                        title={'classes'}
                                        actions={[{
                                            icon: Icons.Delete,
                                            onClick: (e, rowData) => {
                                                deleteCourse(rowData.id)
                                            }
                                        }]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <Grid container component='form' onSubmit={(e) => handleSubmitCycle(e)} spacing={1}>
                        <Grid item>
                            <Grid container component={Box} spacing={1}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Typography variant='h5' className={classes.title}>
                                        Cycle
                                    </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Grid container component={Box} spacing={1}>
                                        <Grid item md={9} sm={12} xs={12}>
                                            <Grid container component={Box} spacing={1}>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <TextField
                                                        variant='outlined'
                                                        label='Cycle Name'
                                                        name='cycle'
                                                        onChange={(e) => setCycle(e.target.value)}
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <FormControl sx={{ width: '100%' }}>
                                                        <InputLabel required id="demo-multiple-checkbox-label">Cycle</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            value={ListCycle}
                                                            fullWidth
                                                            onChange={handleChangeCycle}
                                                            input={<OutlinedInput id="select-multiple-chip" label="Cycle" />}
                                                            renderValue={(selected) => selected.join('  , ')}
                                                            MenuProps={MenuProps}
                                                        >
                                                            {lstClass.map((cors) => (
                                                                <MenuItem key={cors.id} value={cors.cls_school}>
                                                                    <Checkbox checked={ListCycle.indexOf(cors.cls_school) > -1} />
                                                                    <ListItemText primary={cors.cls_school} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            <LoadingButton
                                                type='submit'
                                                variant='contained'
                                                loading={savecycle}
                                                loadingPosition='start'
                                                color='secondary'
                                                fullWidth
                                                style={{ fontFamily: 'Palatino Linotype' }}
                                                startIcon={<AddIcon />}

                                            >
                                                Add
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Table
                                        titletype='classes'
                                        data={lstCycle}
                                        columns={[
                                            {
                                                cellStyle: { whiteSpace: 'nowrap' },
                                                title: 'Cycle Name',
                                                field: 'cycle_name',
                                                filterPlaceholder: 'Filter',
                                                filtering: false
                                            },
                                            {
                                                cellStyle: { whiteSpace: 'nowrap' },
                                                title: 'Cycle List',
                                                field: 'cycle',
                                                filterPlaceholder: 'Filter',
                                                filtering: false,
                                                render: (rowData) => rowData.cycle.join(' , '),
                                            }
                                        ]}
                                        isLoading={isLoadingCycle}
                                        options={{
                                            sorting: true,
                                            search: false,
                                            filtering: true,
                                        }}
                                        title={'classes'}
                                        actions={[{
                                            icon: Icons.Delete,
                                            onClick: (e, rowData) => {
                                                deleteCycle(rowData.id)
                                            }
                                        }]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CommonMain>
    )
}