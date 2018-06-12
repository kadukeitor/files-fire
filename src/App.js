import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import {UserContext, user} from './contexts/User';

import Firebase from './services/Firebase';

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

const PublicRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        <UserContext.Consumer>
            {user => (
                !user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}/>
                )
            )}
        </UserContext.Consumer>
    )}/>
);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        <UserContext.Consumer>
            {user => (
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/signIn',
                        state: {from: props.location}
                    }}/>
                )
            )}
        </UserContext.Consumer>
    )}/>
);

class App extends Component {

    state = {
        ready: false,
        user: user
    };

    componentDidMount() {
        this.unregisterAuthObserver = Firebase.auth()
            .onAuthStateChanged((user) => {
                this.setState({user: user, ready: true});
            });
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#ab47bc',
                    light: '#df78ef',
                    dark: '#790e8b',
                    contrastText: '#fff',
                },
            },
        });

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                {
                    this.state.ready ? (
                        <UserContext.Provider value={this.state.user}>
                            <Switch>
                                <PublicRoute path='/signIn' component={SignIn}/>
                                <PrivateRoute path='/settings' component={Settings}/>
                                <PrivateRoute path='/' component={Home}/>
                                <Redirect to={{pathname: '/'}}/>
                            </Switch>
                        </UserContext.Provider>
                    ) : (
                        <LinearProgress/>
                    )
                }
            </MuiThemeProvider>
        );

    }
}

export default App;