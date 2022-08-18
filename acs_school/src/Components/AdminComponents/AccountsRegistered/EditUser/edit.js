import React from 'react';
import { Appbar } from '../../AppBar/Appbar'
import { Footer } from '../../Footer/footer'
import { Copy } from '../../../../User/Components/Copy/copy'
import {
    Paper,
    Container,
    Grid,
    TextField,
    Box,
    Typography,
    IconButton,
    Button
}
    from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import { useStyles } from './edit.style';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { LoadingButton } from '@mui/lab';
import { useParams } from "react-router-dom";
import * as UserAPI from '../../../../API/user_api';
import * as Class_Courses from '../../../../API/course_class_cycle'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import {useSnackbar} from 'notistack';

export function DetailsEdit() {
    const classes = useStyles()

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

    const {enqueueSnackbar} = useSnackbar()
    const [courses, setCourses] = React.useState([])
    const [firstname, setFirstName] = React.useState()
    const [lastname, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [cls, setCls] = React.useState([]);
    const [userRole, setUserRole] = React.useState('');
    const [fatherName, setFatherName] = React.useState('');
    const [motherName, setMotherName] = React.useState('');
    const [inputFields, setInputFields] = React.useState([
        { firstName: '', middleName: '', lastname: '', className: '' }
    ]);

    const [save, setSave] = React.useState(false);
    const params = useParams()

    const handleChangeClass = (event) => {
        const {
            target: { value }
        } = event;
        setCls(typeof value === 'string' ? value.split(' , ') : value);
    }

    const handleChangeCourses = (event) => {
        const {
            target: { value }
        } = event;
        setCourses(typeof value === 'string' ? value.split(' , ') : value);
    }

    const id = params.user_id
    React.useEffect(() => {
        UserAPI.getUser(id)
            .then(res => {
                const item = res.data
                setInputFields(item.students_info)
                setFatherName(item.father_name)
                setMotherName(item.mother_name)
                setFirstName(item.first_name)
                setLastName(item.last_name)
                setEmail(item.email)
                setPhone(item.phone)
                setAddress(item.address)
                setCls(item.classes)
                setCourses(item.courses)
                setUserRole(item.user_role)
                setPassword(item.password)
            })
    }, [id])

    const handleUpdateUser = (e) => {
        e.preventDefault()
        setSave(true)
        const id = params.user_id
        const updateUser = {
            'students_info': inputFields,
            'father_name': fatherName,
            'mother_name': motherName,
            'email': email,
            'first_name': firstname,
            'last_name': lastname,
            'password': password,
            'address': address,
            'phone': phone,
            'user_role': userRole,
            'courses': courses,
            'classes': cls
        }
        UserAPI.updateUser(id, updateUser)
            .then((res) => {
                setSave(false)
                enqueueSnackbar(`Your Updated has been successfully — Perfect!`, { variant: 'success', })
                setDisabled(true)
            })
            .catch((err) => {
                setSave(false)
                enqueueSnackbar(` error — Try again!` , { variant: 'error', })
            })
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { firstName: '', middleName: '', lastName: '', className: '' }])
    }
    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1)
        setInputFields(values)
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value
        setInputFields(values)
    }

    const [allClasses, setAllClasses] = React.useState([]);
    const [allCourses, setAllCourses] = React.useState([]);

    const getAllClass = React.useCallback(() => {
        Class_Courses.getAllClasses()
            .then((res) => {
                setAllClasses(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(`  — Try again!`, {variant: 'error',})
             })
    }, [])
    React.useEffect(() => {
        getAllClass()
    }, [getAllClass])

    const getAllCourse = React.useCallback(() => {
        Class_Courses.getAllCourses()
            .then((res) => {
                setAllCourses(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(` — Try again!`, {variant: 'error',})
             })
    }, [])
    React.useEffect(() => {
        getAllCourse()
    }, [getAllCourse])

    const [disabled, setDisabled] = React.useState(true)

    const handleUndisable = () => {
        setDisabled(false)
    }


    return (
        <>
            <Appbar />

            <Paper elevation={3} className={classes.paper}>
                <Container maxWidth='md'>
                    <Typography variant='h5' className={classes.title}>
                        {userRole} Info
                    </Typography>
                    <Grid container component='form' onSubmit={(e) => handleUpdateUser(e)} spacing={2} direction='column' justifyContent='center'>
                        {inputFields != null ?
                            <Grid item component={Box} py={2}>
                                {inputFields.map((field, i) => (
                                    <Grid container spacing={2} key={i}>
                                        <Grid item component={Box} md={3} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                label='Frist Name'
                                                name='firstName'
                                                fullWidth
                                                required
                                                value={field.firstName}
                                                onChange={(e) => handleChangeInput(i, e)}
                                                disabled={disabled}
                                            />
                                        </Grid>
                                        <Grid item component={Box} md={3} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                label='Middle Name'
                                                name='middleName'
                                                fullWidth
                                                required
                                                value={field.middleName}
                                                onChange={(e) => handleChangeInput(i, e)}
                                                disabled={disabled}
                                            />
                                        </Grid>
                                        <Grid item component={Box} md={3} sm={12} xs={12}>
                                            <TextField
                                                variant='outlined'
                                                label='Last Name'
                                                name='lastname'
                                                fullWidth
                                                required
                                                value={field.lastname}
                                                onChange={(e) => handleChangeInput(i, e)}
                                                disabled={disabled}
                                            />
                                        </Grid>
                                        <Grid item component={Box} md={3} sm={12} xs={12}>
                                            <Grid container>
                                                <Grid item md={12} sm={12} xs={12}>
                                                    <TextField
                                                        variant='outlined'
                                                        fullWidth
                                                        label='Class Name'
                                                        required
                                                        select
                                                        name='className'
                                                        disabled={disabled}
                                                        value={field.className}
                                                        onChange={e => handleChangeInput(i, e)}
                                                    >
                                                        {allClasses.map((value) => (
                                                            <MenuItem value={value.cls_school} key={value.id}>
                                                                {value.cls_school}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                            </Grid>
                                            <Grid container justifyContent='flex-end' spacing={2}>
                                                {inputFields.length > 1 ?
                                                <Grid item md={3} sm={1} xs={2}>
                                                    <IconButton disabled={disabled} className={classes.btnAdd} onClick={() => handleRemoveFields(i)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </Grid>
                                                : null
                                                }
                                                <Grid item md={3} sm={2} xs={2}>
                                                    <IconButton disabled={disabled} className={classes.btnAdd} onClick={() => handleAddFields()}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                            :
                            null
                        }
                        <Grid item container component={Box} spacing={2} direction='row'>
                            {fatherName && motherName != null ?
                                <>
                                    <Grid item component={Box} py={2} md={6} sm={12} xs={12}>
                                        <TextField
                                            variant='outlined'
                                            fullWidth
                                            label='Father Name'
                                            onChange={(e) => setFatherName(e.target.value)}
                                            type='text'
                                            name='fathername'
                                            value={fatherName || ''}
                                            required
                                            disabled={disabled}
                                        />
                                    </Grid>
                                    <Grid item component={Box} py={2} md={6} sm={12} xs={12}>
                                        <TextField
                                            variant='outlined'
                                            fullWidth
                                            label='Mother Name'
                                            onChange={(e) => setMotherName(e.target.value)}
                                            type='text'
                                            value={motherName || ''}
                                            name='mothername'
                                            required
                                            disabled={disabled}
                                        />
                                    </Grid>
                                </>
                                :
                                null
                            }
                            {firstname && lastname != null ?
                                <>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <TextField

                                            variant='outlined'
                                            label='First Name'
                                            type='text'
                                            disabled={disabled}
                                            name='firstName'
                                            value={firstname || ''}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <TextField
                                            variant='outlined'
                                            label='Last Name'
                                            type='text'
                                            name='lastname'
                                            disabled={disabled}
                                            value={lastname || ''}
                                            onChange={(e) => setLastName(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </>
                                :
                                null
                            }
                        </Grid>
                        <Grid item component={Box} py={2}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                required
                                label='Email'
                                value={email || ''}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                name='email'
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item container component={Box} spacing={2} direction='row'>
                            <Grid item md={6} sm={12} xs={12}>
                                <TextField
                                    variant='outlined'
                                    label='Address'
                                    type='text'
                                    disabled={disabled}
                                    value={address || ''}
                                    name='address'
                                    onChange={(e) => setAddress(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <TextField
                                    variant='outlined'
                                    label='Phone'
                                    type='text'
                                    disabled={disabled}
                                    name='phone'
                                    value={phone || ''}
                                    onChange={(e) => setPhone(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        {courses && cls != null ?
                            <>
                                <Grid item component={Box} py={2}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel required id="demo-multiple-checkbox-label">Class</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={cls}
                                            name='classes'
                                            disabled={disabled}
                                            onChange={handleChangeClass}
                                            input={<OutlinedInput id="select-multiple-chip" label="Class" />}
                                            renderValue={(selected) => selected.join('  , ')}
                                            MenuProps={MenuProps}
                                        >
                                            {allClasses.map((clss) => (
                                                <MenuItem key={clss.id} value={clss.cls_school}>
                                                    <Checkbox checked={cls.indexOf(clss.cls_school) > -1} />
                                                    <ListItemText primary={clss.cls_school} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item component={Box} py={2}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel required id="demo-multiple-checkbox-label">Course</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={courses}
                                            disabled={disabled}
                                            onChange={handleChangeCourses}
                                            input={<OutlinedInput id="select-multiple-chip" label="Course" />}
                                            renderValue={(selected) => selected.join('  , ')}
                                            MenuProps={MenuProps}
                                        >
                                            {allCourses.map((cors) => (
                                                <MenuItem key={cors.id} value={cors.course}>
                                                    <Checkbox checked={courses.indexOf(cors.course) > -1} />
                                                    <ListItemText primary={cors.course} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                            :
                            <>
                            </>
                        }
                        <Grid item component={Box} py={2}>
                            <Grid container justifyContent='flex-end' spacing={3}>
                                <Grid item component={Box} md={3} sm={12} xs={12}>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        style={{ fontFamily: 'Palatino Linotype' }}
                                        fullWidth
                                        onClick={handleUndisable}
                                        startIcon={<UpgradeIcon />}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                                <Grid item component={Box} md={3} sm={12} xs={12} >
                                    <LoadingButton
                                        type='submit'
                                        variant='contained'
                                        loading={save}
                                        loadingPosition='start'
                                        color='primary'
                                        fullWidth
                                        style={{ fontFamily: 'Palatino Linotype' }}
                                        startIcon={<SaveIcon />}
                                    >
                                        Save
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <Footer />
            <Copy />
        </>
    )
}