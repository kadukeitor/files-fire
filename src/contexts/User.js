import React from 'react';

export const user = null;

export const UserContext = React.createContext(
    user
);

export const withUserContext = (Component) => {
    return (props) => {
        return (
            <UserContext.Consumer>
                {(user) => {
                    return <Component {...props} user={user}/>
                }}
            </UserContext.Consumer>
        )
    }
};