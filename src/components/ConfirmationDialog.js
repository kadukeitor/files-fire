import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class ConfirmationDialog extends React.Component {

    handleClose = () => {
        this.props.onClose(false);
    };

    handleConfirm = () => {
        this.props.onClose(true);
    };

    render() {
        return (
            <Dialog
                onClose={this.props.handleClose}
                aria-labelledby="Confirmation"
                aria-describedby="Confirmation"
                open={this.props.open}
            >
                <DialogTitle id="alert-dialog-title">{this.props.title || 'Confirmation'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.content || 'Are your sure you want to proceed with this operation ?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={this.handleConfirm} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ConfirmationDialog;