import React from 'react';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/Add';

import {withStyles} from '@material-ui/core/styles';

import UploadDialog from "./UploadDialog";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
        right: theme.spacing.unit,
        bottom: theme.spacing.unit,
    }
});

class FilesAddButton extends React.Component {

    state = {
        openUpload: false
    };

    handleUpload = () => {
        this.setState({openUpload: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Tooltip title="Upload File">
                    <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={() => {
                        this.setState({openUpload: true});
                    }}>
                        <AddIcon/>
                    </Button>
                </Tooltip>
                <UploadDialog
                    open={this.state.openUpload}
                    onClose={this.handleUpload}/>
            </div>
        );
    }

}

export default withStyles(styles)(FilesAddButton);