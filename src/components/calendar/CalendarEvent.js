import React from 'react'
import { useSelector } from 'react-redux';

export const CalendarEvent = ({ event }) => {
    const { name } = useSelector( state => state.auth );
    const { title } = event;
    return (
        <div>
            <strong>{ title }</strong>
            <br></br>
            <strong> - { name }</strong>
        </div>
    )
}
