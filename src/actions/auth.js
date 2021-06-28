import Swal from "sweetalert2"
import { fetchWithoutToken, fetchWithToken } from "../components/helpers/fetch"
import { types } from "../components/types/types"

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchWithoutToken( "auth", { email, password }, "POST" )
        const body = await resp.json();

        if( body.ok ){//Porque el API retorna un OK: y el token:
            localStorage.setItem( "token", body.token );
            localStorage.setItem( "token-init-date", new Date().getTime() );//Porque el token expira 2 horas después
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            Swal.fire("Error", body.msg, "error");
        }
        
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {
        const resp = await fetchWithoutToken( "auth/new", { email, password, name }, "POST");
        const body = await resp.json();

        if( body.ok === true ){
            console.log("Se ha creado el usuario");
            localStorage.setItem( "token", body.token );
            localStorage.setItem( "token-init-date", new Date().getTime() );//Porque el token expira 2 horas después
            
            dispatch( login({ 
                uid: body.uid, 
                name: body.name }));
        }else{
            Swal.fire("error", body.msg, "error");
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithToken( 'auth/renew' );
        const body = await resp.json();
        
        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = ( user ) => ({
    type: types.authLogin,
    payload: user

});

export const startAuthLogout = () => {
    return ( dispath ) => {
        localStorage.removeItem("token");
        localStorage.removeItem("token-init-date");

        dispath( authLogout() );
    }
}
export const authLogout = () => ({
    type: types.authLogout
})