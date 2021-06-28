import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { types } from '../components/types/types';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        if( !!localStorage.getItem("token") ){
            dispatch( startChecking() );
        }else{
            dispatch( { type: types.authCheckingFinish } );
        }

    }, [ dispatch ]);

    if( checking ){
        return <h5>Espere...</h5>
    }

    return (
        <div>
            <Router>
                
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        isAuthenticated = { !!uid }
                        component={ LoginScreen }>
                    </PublicRoute>
                    
                    <PrivateRoute 
                        exact 
                        path="/" 
                        isAuthenticated = { !!uid }
                        component={ CalendarScreen }>
                    </PrivateRoute>
                    
                </Switch>
                {/* 
                    //Exact /login - LoginScreen
                    //Exact / -CalendarScreen
                */}
            </Router>
        </div>
    )
}
