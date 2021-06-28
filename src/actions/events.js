import Swal from "sweetalert2";
import { fetchWithToken } from "../components/helpers/fetch"
import { prepareEvents } from "../components/helpers/prepareEvents";
import { types } from "../components/types/types"

export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {
        const { uid, name } = getState().auth;
        try{
            const resp = await fetchWithToken("events", event, "POST");
            const body = await resp.json();
            if( body.ok ){
                event.id = body.eventoGuardado.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch( eventAddNew( event ) );//usamos el evento de arriba porque es el que se que funciona
            }
        }catch (error) {
            console.log( error );
        }
        
    }
}

const eventAddNew = ( event ) => (
    {
        type: types.eventAddNew,
        payload: event
    }
)
export const eventSetActive = ( event ) => (
    {
        type: types.eventSetActive,
        payload: event
    }
)
export const eventClearActiveEvent = ( event ) => (
    {
        type: types.eventClearActiveEvent
    }
)

export const eventStartUpdate = ( event ) => {
    return async( dispatch ) => {
        try{
            
            const resp = await fetchWithToken(`events/${ event.id }`, event, "PUT");
            const body = await resp.json();

            if( body.ok ) {
                dispatch( eventUpdated( event ) );
            }else{
                Swal.fire("Error", body.msg, "error");
            }

        }catch (error){
            console.log(error);
        }
    }
}

export const eventStartDelete = (  ) => {
    return async( dispatch, getState ) => {
        const { id } = getState().calendar.activeEvent;
        
        try{
            
            const resp = await fetchWithToken(`events/${ id }`, {}, "DELETE");
            const body = await resp.json();

            if( body.ok ) {
                dispatch( eventDeleted( id ) );
            }else{
                Swal.fire("Error", body.msg, "error");
            }

        }catch (error){
            console.log(error);
        }
    }
}

const eventUpdated = ( event ) => (
    {
        type: types.eventUpdated,
        payload: event
    }
)
const eventDeleted = (  ) => (
    {
        type: types.eventDeleted,
    }
)


export const eventStartLoading = () => {
    return async( dispatch ) => {
        try{
            const resp = await fetchWithToken( "events" );
            const body = await resp.json();
            const events = prepareEvents(body.msg);
            
            dispatch( eventLoaded( events ) );
        }catch (error){

        }
        //console.log( "????" );
    }
}

export const eventRestart = () => ({
    type: types.eventRestart
})

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})