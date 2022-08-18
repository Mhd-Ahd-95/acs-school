import React from 'react';
import RegistrationAPI from '../../../API/registration_api'
import ContactAPI from '../../../API/contact_api'
import { useSnackbar } from 'notistack';
import { Link } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Link as RouterLink } from 'react-router-dom';
import global from '../../../global'

export function GetNotificationContent(props) {
    const authUser = global.auth.user

    const { notification, notification_type } = props;

    const { enqueueSnackbar } = useSnackbar()

    const [infoReg, setInfoReg] = React.useState({});
    const [infoCont, setInfoCont] = React.useState({});

    const reg_id = notification.reference.registration_id
    const cont_id = notification.reference.contact_id

    const getStudentRegistration = React.useCallback(() => {
        if (Object.keys(notification.reference)[0] === 'registration_id') {
            RegistrationAPI.getRegistrationById(reg_id)
                .then((res) => {
                    setInfoReg(res.data)
                })
                .catch((err) => {
                    enqueueSnackbar(`Unexpected error — Try again!`, { variant: 'error', })
                })
        }
        else {
            ContactAPI.getContactById(cont_id)
                .then((res) => {
                    setInfoCont(res.data)
                })
                .catch((err) => {
                    enqueueSnackbar(`Failed to get contact — Try again!`, { variant: 'error', })
                })
        }

    }, [reg_id, cont_id])

    React.useEffect(() => {
        getStudentRegistration()
    }, [getStudentRegistration])


    return (


        notification_type === 'RegistrationNotification' && notification.notification_status === 'received' ?
            <>
                <span>
                    You have received a {' '}
                    <Link component={RouterLink} to={{ pathname: `/admin/registration-student/${notification.reference.registration_id}`, key: uuidv4() }}>
                        <strong>new registration Student</strong>
                    </Link>
                    {' '}his name is <b>{infoReg.student_name}</b>
                </span>
            </>
            : notification_type === 'RegistrationNotification' && notification.notification_status === 'open' ?
                <>
                    <span>
                        You have been seen {' '}
                        <Link component={RouterLink} to={{ pathname: `/admin/registration-student/${notification.reference.registration_id}`, key: uuidv4() }}>
                            <b>student's {infoReg.student_name}</b>
                        </Link>
                    </span>
                </>
                : notification_type === 'ContactNotification' && notification.notification_status === 'received' ?
                    <>
                        <span>
                            You have received a {' '}
                            <Link component={RouterLink} to={{ pathname: '/admin/contact', key: uuidv4() }}>
                                <b>new contact</b>
                            </Link>
                            {' '} from name <b>{infoCont.name}</b>
                        </span>
                    </>
                    : notification_type === 'ContactNotification' && notification.notification_status === 'open' ?
                        <>
                            <span>
                                You have been seen the message from {' '}
                                <Link component={RouterLink} to={{ pathname: '/admin/contact', key: uuidv4() }}>
                                    <b>sender {' '} {infoCont.name}</b>
                                </Link>
                            </span>
                        </>
                        : null

    )
}
