import React from 'react';
import NotificationAPI from '../API/notification_api'

export const NotificationContext = React.createContext();


export const NotificationContextProvider = (props) => {

    const [notifications, setNotifcations] = React.useState([])

    const getAllNotifications = React.useCallback(() => {
        NotificationAPI.getNotification()
            .then((res) => {
                const result = res.data
                setNotifcations(result)
            })
    }, [])

    React.useEffect(() => {
        getAllNotifications()
        // const intervalNotif = setInterval(() => {
        //     getAllNotifications()
        // }, 15000)
        // return () => clearInterval(intervalNotif);
    }, [getAllNotifications])

    const filterNotification = () => notifications.filter(notification => notification.notification_status === 'received')
    const sortNotification = () => notifications.sort((a, b) => new Date(b.notification_date) - new Date(a.notification_date))
    const recentNotification = sortNotification().slice(0, 5);
    const AllNotifications = sortNotification();
    const NewNotificationCount = filterNotification().length;

    return <NotificationContext.Provider value={{
        notifications,
        filterNotification,
        sortNotification,
        recentNotification,
        AllNotifications,
        NewNotificationCount,
    }}>
        {props.children}
    </NotificationContext.Provider>
}