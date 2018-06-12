import React from 'react';

import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import Firebase from '../services/Firebase';

import ConfirmationDialog from "./ConfirmationDialog";

import {withStyles} from '@material-ui/core/styles';
import {withUserContext} from "../contexts/User";

import {
    withRouter
} from "react-router-dom";

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class LayoutMenu extends React.Component {
    state = {
        anchorEl: null,
        open: false,
        openConfirmation: false,
        operation: null
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleSettings = () => {
        this.setState({anchorEl: null});
        const {history} = this.props;
        history.push("/settings");
    };

    handleSignOut = () => {
        this.setState({anchorEl: null, openConfirmation: true, operation: 'signOut'});
    };

    handleConfirm = (confirmed) => {
        this.setState({openConfirmation: false});
        if (confirmed) {
            if (this.state.operation === 'signOut') {
                Firebase.auth().signOut().then();
            }
        }
    };

    render() {
        const {user} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <Avatar alt="Profile" src={user.photoURL}/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem>{user.displayName || user.email}</MenuItem>
                    <Divider/>
                    <MenuItem onClick={this.handleSettings}>Settings</MenuItem>
                    <Divider/>
                    <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
                </Menu>
                <ConfirmationDialog
                    open={this.state.openConfirmation}
                    content={`Are you sure you want to logout ?`}
                    onClose={this.handleConfirm}/>
            </div>
        );
    }
}

LayoutMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withUserContext(withRouter(withStyles(styles, {withTheme: true})(LayoutMenu)));
