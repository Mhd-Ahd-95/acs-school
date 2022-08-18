import React from 'react';
import { IconButton, MenuItem, Menu, Divider, Link } from '@material-ui/core';
import {
    Notifications as NotificationsIcon
}
    from '@material-ui/icons';
import NotificationAPI from '../../../API/notification_api';
import global from '../../../global'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { NotificationCard } from './details.notification';
import { v4 as uuidv4 } from 'uuid';
import {GetNotificationContent} from './GetNotificationContent';
import {NotificationContext} from '../../../Context/NotificationContext';


export function Notification(props) {

    const {handleDate} = global.methods

    const classes = props.classes;
    const [anchor, setAnchorEl] = React.useState(null);

    const notificationContext = React.useContext(NotificationContext)

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const navigate = useNavigate();

    const handleNavigate = (notification) => {
        if (notification.reference.registration_id) {
            if (notification.notification_status !== 'open') {
                navigate({ pathname: `/admin/student-registered/${notification.reference.registration_id}`, key: uuidv4() })
                const id = notification.notification_id
                const status = { notification_status : "open" }
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
                const status = { notification_status : "open" }
                NotificationAPI.updateNotification(id, status)
            }
            else {
                navigate({ pathname: `/admin/sender-contact/${notification.reference.contact_id}`, key: uuidv4() })
            }
        }
    }


    return (
        <>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <NotificationsIcon />
                {notificationContext.NewNotificationCount > 0 &&
                    <span className={classes.iconLabel}>{notificationContext.NewNotificationCount}</span>}
            </IconButton>
            <Menu
                keepMounted
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}

            >
                {notificationContext.recentNotification.length > 0 ?
                    notificationContext.recentNotification.map((notif, index) => (
                        <div key={index}
                            className={classes.notificationItem}
                            onClick={() => {
                                handleNavigate(notif);
                                handleClose()
                            }}
                        >
                            <NotificationCard
                                dense
                                noPaper
                                subject={notif.subject}
                                date={handleDate(notif.notification_date)}
                                content={<GetNotificationContent
                                    notification={notif}
                                    notification_type={notif.type_notification} />}
                                highlight={notif.notification_status === 'received'}
                                link={notif.reference.registration_id ? `/admin/registration-student/${notif.reference.registration_id}` : `/admin/contact`}
                            />
                            <Divider />
                        </div>
                    ))
                    : <div className={classes.noNotifications}> No new notifications. </div>}
                {notificationContext.recentNotification.length > 0 ?
                    <RouterLink
                        component={Link}
                        to='/admin/notifications'
                        style={{ textDecoration: 'none' }}
                    >
                        <MenuItem style={{ justifyContent: 'center', fontWeight: 500 }} className={classes.views}>
                            VIEW ALL
                        </MenuItem>
                    </RouterLink>
                    : null
                }
            </Menu>
        </>
    )
}

