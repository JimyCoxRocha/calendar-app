import React from 'react'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}
) => {
    return (
        <Route 
            { ...rest }
            component= { 
                ( props ) => ( 
                    !isAuthenticated 
                    ?
                        <Component { ...props }/>
                    :
                        <Redirect to="/"/>
                )
            }
        />
    )

}
