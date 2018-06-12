import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import ConfirmationDialog from "./ConfirmationDialog";

import {deleteFile, downloadFile} from '../services/Firebase';

class FileMenu extends React.Component {

    state = {
        anchorEl: null,
        openConfirmation: false,
        operation: null
    };

    handleOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleDelete = () => {
        this.handleClose();
        this.setState({openConfirmation: true, operation: 'delete'});
    };

    handleDownload = () => {
        this.handleClose();
        downloadFile(this.props.file);
    };

    handleConfirm = (confirmed) => {
        this.setState({openConfirmation: false});
        if (confirmed) {
            if (this.state.operation === 'delete') {
                deleteFile(this.props.file);
            }
        }
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <IconButton aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleOpen}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleDownload}>Download</MenuItem>
                    <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                </Menu>
                <ConfirmationDialog
                    open={this.state.openConfirmation}
                    content={`Are you sure you want to remove ${this.props.file.name} ?`}
                    onClose={this.handleConfirm}/>
            </div>
        );
    }
}

export default FileMenu;
