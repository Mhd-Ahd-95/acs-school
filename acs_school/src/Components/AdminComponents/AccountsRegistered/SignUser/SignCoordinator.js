import React from 'react';
import {
    Paper,
    Table,
    TableContainer,
    TableBody,
    TablePagination,
    TableRow,
    TableCell,
    TableHead,
    IconButton,
    Modal,
    Grid,
    Button,
    Box,
    Typography,
    Tooltip,
    TextField,
}
    from '@material-ui/core';
import { useStyles } from './usersign.style';
import * as UserAPI from '../../../../API/user_api';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import DetailsIcon from '@mui/icons-material/Details';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';

const FormatDate = (d) => {
    return (moment(d).format('DD-MM-YYYY - h:mm A'))
}

export function SignCoordinator() {
    const tableHead = ['Details', 'First Name', 'Last Name', 'Email', 'Address', 'Phone', 'Date', 'Action']

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()
    const [openModal, setOpenModal] = React.useState(false);
    const [actionItem, setActionItem] = React.useState({});
    const [checking, setChecking] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [value, setValue] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleClick = (rowData) => {
        setActionItem(rowData)
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const [users, setUsers] = React.useState([]);
    const type = 'coordinator'
    const fetchAllUser = React.useCallback(() => {

        UserAPI.getUsersByType(type)
            .then(res => {
                setUsers(res.data)
            })
    }, [])

    React.useEffect(() => {
        setLoading(true)
        fetchAllUser()
    }, [fetchAllUser])

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [loading])

    const handleDeleteUser = (user_id) => {
        setChecking(true)
        UserAPI.deleteUser(user_id)
            .then(res => {
                fetchAllUser()
                setChecking(false)
                enqueueSnackbar(`User was deleted successfully — Oops!`, { variant: 'success', })
                setOpenModal(false)
            })
            .catch(err => {
                enqueueSnackbar(`  — Try again!`, { variant: 'error', })
            })
    }
    const navigate = useNavigate()

    return (
        <>
            {/* <Appbar /> */}

            <Paper elevation={3} >
                {loading ?
                    <Grid component={Box} py={15} container justifyContent='center'>
                        < CircularProgress />
                    </Grid >
                    :
                    <>
                        <Grid container component={Box} justifyContent='center' px={1} spacing={2}>
                            <Grid item component={Box} md={8} sm={6} xs={12}>
                                <Typography variant='h5' className={classes.title}>
                                    {type}
                                </Typography>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12} >
                                <Grid container spacing={2}>
                                    <Grid item component={Box} md={6} sm={12} xs={12} >
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            size='medium'
                                            onClick={() => navigate(`/admin/account/create/${type}`)}
                                            color='secondary'
                                            endIcon={<AddIcon />}
                                        >
                                            Add {type}
                                        </Button>
                                    </Grid>
                                    <Grid item component={Box} md={6} sm={12} xs={12}>
                                        <Button
                                            variant='contained'
                                            size='medium'
                                            onClick={() => setOpen(!open)}
                                            color='primary'
                                            fullWidth
                                            endIcon={open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                                        >
                                            Filters
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {open ?
                            <Grid container justifyContent='flex-end'>
                                <Grid item component={Box} md={5} sm={12} xs={12} py={1}>
                                    <Box style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                                        <TextField
                                            variant='outlined'
                                            label='Filter...'
                                            type='text'
                                            fullWidth
                                            name='filter'
                                            onChange={(e) => setValue(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            :
                            null
                        }
                        <Grid container component={Box} py={1}>
                            <TableContainer sx={{ maxWidth: 400 }}>
                                <Table stickyHeader aria-label='sticky table'>
                                    <TableHead>
                                        <TableRow>
                                            {tableHead.map((user, index) => (
                                                <TableCell key={index} className={classes.head}>
                                                    {user}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .filter((val) => {
                                                if (val === '') {
                                                    return val;
                                                }
                                                else if (
                                                    val.first_name.toLowerCase().includes(value.toLocaleLowerCase()) ||
                                                    val.phone.toLowerCase().includes(value.toLowerCase())
                                                ) {
                                                    return val
                                                }
                                            })
                                            .map((usr, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell>
                                                        <Tooltip title="Details">
                                                            <IconButton onClick={() => navigate(`/admin/${usr.user_role}/${usr.user_id}`)}>
                                                                <DetailsIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        {usr.first_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {usr.last_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {usr.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {usr.address}
                                                    </TableCell>
                                                    <TableCell>
                                                        {usr.phone}
                                                    </TableCell>
                                                    <TableCell>
                                                        {FormatDate(usr.creation_date)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title='Delete'>
                                                            <IconButton onClick={() => handleClick(usr)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                    <Modal open={openModal}>
                                        <Paper elevation={3} className={classes.modal}>
                                            <Grid container spacing={2} alignItems='center' >
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant='h5'
                                                        color='textPrimary'
                                                        align='center'
                                                        className={classes.titleModal}
                                                    >
                                                        Confirm Delete
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        component='p'
                                                        color='textPrimary'
                                                        align='center'
                                                        className={classes.questionModal}
                                                    >
                                                        Are you sure to delete ?
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    container
                                                    item xs={12}
                                                    component='form'
                                                >
                                                    <Grid container spacing={4} item justifyContent='center' style={{ padding: '10px' }}>
                                                        <Grid item xs={12} sm={5} lg={4}>
                                                            <LoadingButton
                                                                loading={checking}
                                                                loadingPosition='start'
                                                                variant='contained'
                                                                color='primary'
                                                                startIcon={<DeleteIcon />}
                                                                fullWidth
                                                                onClick={() => handleDeleteUser(actionItem.user_id)}
                                                            >
                                                                Confirm
                                                            </LoadingButton>
                                                        </Grid>
                                                        <Grid item xs={12} sm={5} lg={4}>
                                                            <Button
                                                                variant='contained'
                                                                color='secondary'
                                                                fullWidth
                                                                onClick={handleClose}
                                                                startIcon={<CancelIcon />}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid >
                                        </Paper>
                                    </Modal>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <TablePagination
                            rowsPerPageOptions={[4, 10, 15, 50]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                }
            </Paper>
            {/* <Footer />
            <Copy /> */}
        </>
    )
}