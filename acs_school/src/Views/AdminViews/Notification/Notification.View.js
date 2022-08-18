import React from 'react';
import { Container, Box, Typography, Grid } from '@material-ui/core';
import makeStyles from './Notification.Style';
import NotificationAPI from '../../../API/notification_api';
import { NotificationCard } from '../../../Components/AdminComponents/Notification/details.notification';
import { useNavigate } from 'react-router-dom';
import { GetNotificationContent } from '../../../Components/AdminComponents/Notification/GetNotificationContent';
import { v4 as uuidv4 } from 'uuid';
import global from '../../../global'
import { NotificationContext } from '../../../Context/NotificationContext'
import CommonMain from '../../../Layout/MainLayoutAS/MainLayout.AS'

export default function Notifications() {

    const classes = makeStyles()
    const handleDate = global.methods.handleDate
    const notificationContext = React.useContext(NotificationContext)

    const navigate = useNavigate();

    const handleNavigate = (notification) => {
        if (notification.reference.registration_id) {
            if (notification.notification_status !== 'open') {
                navigate({ pathname: `/admin/student-registered/${notification.reference.registration_id}`, key: uuidv4() })
                const id = notification.notification_id
                const status = { notification_status: "open" }
                NotificationAPI.updateNotification(id, status)
            }
            else {
                navigate({ pathname: `/admin/student-registered/${notification.reference.registration_id}`, key: uuidv4() })
            }
        }
        else {
            if (notification.notification_status !== 'open') {
                navigate({ pathname: `/admin/sender-contact/${notification.reference.contact_id}`, key: uuidv4() })
                const id = notification.notification_id
                const status = { notification_status: "open" }
                NotificationAPI.updateNotification(id, status)
            }
            else {
                navigate({ pathname: `/admin/sender-contact/${notification.reference.contact_id}`, key: uuidv4() })
            }
        }
    }

    return (
        <CommonMain
            title='notification'
            titlePage='Notifications'
            drawerActive='Notifications'
        >
            <Container maxWidth='md'>
                <Box pt={2} pb={4}>
                    {notificationContext.AllNotifications.length > 0 ?

                        notificationContext.AllNotifications.map(notif => (
                            <Box
                                pt={2}
                                className={classes.notificationItem}
                                key={notif.notification_id}
                                onClick={() => {
                                    handleNavigate(notif);
                                }}
                            >
                                <NotificationCard
                                    subject={notif.subject}
                                    date={handleDate(notif.notification_date)}
                                    content={<GetNotificationContent
                                        notification={notif}
                                        notification_type={notif.type_notification} />}
                                    highlight={notif.notification_status === 'received'} />
                            </Box>
                        ))

                        :
                        <Box mt={3} pt={2} pb={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <Typography component='p' align='center' display='block' style={{ fontFamily: 'Palatino Linotype', fontSize: 20 }}>
                                        You have no new notifications.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>}
                </Box>
            </Container>
        </CommonMain>
    )
}