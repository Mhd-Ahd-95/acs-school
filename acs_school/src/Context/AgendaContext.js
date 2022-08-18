import React from 'react'
import moment from 'moment';

export const AgendaContext = React.createContext();

export const HandleShowAgendaForStudent = (props) => {

    const currentDate = new Date();
    const tomorrow = moment(currentDate, 'YYYY-MM-DD').add(1, 'days');
    const lastDate = moment(tomorrow._d).format('YYYY-MM-DD')

    const handleClick = (showAgenda = false) => {
        if (showAgenda === true) {
            localStorage.setItem(lastDate, showAgenda)
        }
        else {
            localStorage.setItem(lastDate, showAgenda)
        }
    }

    return <AgendaContext.Provider value={{ handleClick }}>
        {props.children}
    </AgendaContext.Provider>
}