import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

import { Navbar } from '../ui/Navbar';
import { messages } from '../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventRestart, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";//importación para cambiar el idioma

const localizer = momentLocalizer(moment); // or globalizeLocalizer
moment.locale("es");

export const CalendarScreen = () => {
    const [lastView, setLastView] = useState( localStorage.getItem("lastWiew") || "month");
    const dispatch = useDispatch();
    //TODO: Leer dek store los eventos
    const { events, activeEvent } = useSelector( state => state.calendar );

    useEffect(() => {
        dispatch( eventStartLoading() );
        return () => {
            localStorage.setItem("token", "");
            dispatch( eventRestart() );
            
        }
    }, [dispatch]);

    const onDoubleClick = ( e )=>{
        dispatch( uiOpenModal() );
    }
    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) );

    }
    const onViewChange = (e) => {
        setLastView( e )
        localStorage.setItem("lastWiew", e);
    }

    const onSelectSlot = ( e ) => {
        dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor : "#367CF7",
            borderRaiud: "0px",
            opacity: 0.8,
            display: "block"
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages = { messages }
                eventPropGetter = { eventStyleGetter } //Evento Click
                components= {{
                    event: CalendarEvent//quiero que el evento event sea pasado a el componente
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent = { onSelectEvent }
                onSelectSlot = { onSelectSlot }
                selectable= { true }
                onView= { onViewChange }
                view= { lastView }
            />

            <AddNewFab />
            {
                (activeEvent) && <DeleteEventFab />
            }
            
            
            <CalendarModal />
        </div>
    )
}
