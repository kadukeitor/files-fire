import React from 'react';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';

import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';

import Dropzone from 'react-dropzone';

import {checkFile, uploadFile, overwriteFile} from '../services/Firebase';

import ConfirmationDialog from "./ConfirmationDialog";

const styles = () => ({
    dropZone: {
        backgroundColor: '#e6e5e5',
        height: 256,
        minWidth: 256,
        display: 'grid'
    },
    dropZoneText: {
        margin: 'auto',
        textAlign: 'center'
    }
});

class UploadDialog extends React.Component {

    state = {
        file: null,
        uploading: false,
        openConfirmation: false,
        fileExisting: null
    };

    onDrop(accepted) {
        if (accepted && accepted.length) {
            const file = accepted[0];
            this.setState({file: file, uploading: true});
            checkFile(file)
                .then((fileExisting) => {
                    if (fileExisting) {
                        this.setState({openConfirmation: true, fileExisting: fileExisting});
                    } else {
                        uploadFile(file)
                            .then(() => {
                                this.handleClose();
                            })
                            .catch(() => {
                                this.handleClose();
                            });
                    }
                })
        } else {

        }
    }

    handleClose = () => {
        this.setState({uploading: false});
        this.props.onClose();
    };

    handleConfirm = (confirmed) => {
        this.setState({openConfirmation: false});
        if (confirmed) {
            overwriteFile(this.state.file, this.state.fileExisting)
                .then(() => {
                    this.handleClose();
                })
                .catch(() => {
                    this.handleClose();
                });
        } else {
            this.handleClose();
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    onClose={this.props.handleClose}
                    aria-labelledby="Upload"
                    aria-describedby="Upload"
                    open={this.props.open}
                >
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogContent>
                        {
                            this.state.uploading && <LinearProgress/>
                        }
                        <Dropzone onDrop={this.onDrop.bind(this)} className={classes.dropZone} multiple={false}
                                  disabled={this.state.uploading} maxSize={10 * 1024 * 1024}>
                            {
                                this.state.uploading ?
                                    <Typography className={classes.dropZoneText}>
                                        Uploading
                                    </Typography>
                                    :
                                    <Typography className={classes.dropZoneText}>
                                        Try dropping the file here<br/>or<br/>click to select the file to upload.
                                    </Typography>
                            }
                        </Dropzone>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" disabled={this.state.uploading}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <ConfirmationDialog
                    open={this.state.openConfirmation}
                    content={`This file exists, do you want to overwrite it?`}
                    onClose={this.handleConfirm}/>
            </div>
        );
    }
}

UploadDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadDialog);